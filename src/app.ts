import { config } from '@app/config'
import { errorHandler } from '@app/middleware/error-handler'
import { logger } from '@app/util/logger'
import * as koaCors from '@koa/cors'
import { Server } from 'http'
import * as Koa from 'koa'
import * as koaBody from 'koa-body'
import * as koaHelmet from 'koa-helmet'
import { routes } from './route'
import { checkEnv } from './util/check-env'

// tslint:disable-next-line no-var-requires
const koaRespond = require('koa-respond')

export default class App {
  public app: Koa
  public port: number
  private server?: Server

  constructor(port?: number) {
    this.app = new Koa()
    this.port = port || config.app.port
    this.setup()
  }

  public setup() {
    this.app.use(koaHelmet())
    this.app.use(koaCors({ origin: '*' }))
    this.app.use(koaRespond())
    this.app.use(errorHandler)
    this.app.use(routes)
    this.app.use(koaBody())
    this.app.on('error', err =>
      logger.error({ err }, 'Unhandled application error'),
    )
  }

  /**
   * Handle fatal errors.
   */
  public fatal(err: Error) {
    process.removeAllListeners('uncaughtException')
    process.removeAllListeners('unhandledRejection')
    logger.error('Fatal error:', err)
  }

  /**
   * Starts the server.
   */
  public async start() {
    // Unexpected termination
    process.once('uncaughtException', this.fatal)
    process.once('unhandledRejection', this.fatal)

    // Expected termination
    process.once('SIGINT', () => this.stop())
    process.once('SIGTERM', () => this.stop())

    checkEnv()

    return new Promise(
      resolve =>
        (this.server = this.app.listen(this.port, () => {
          logger.info(
            `"${config.app.name}" listening on port ${this.port} on "${
              config.app.env
            }" environment`,
          )
          resolve()
        })),
    )
  }

  /**
   * Stops the server.
   */
  public stop() {
    if (!this.server) {
      return
    }

    this.server.close()

    process.removeAllListeners('SIGINT')
    process.removeAllListeners('SIGTERM')
  }
}
