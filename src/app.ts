import * as fastify from 'fastify'

import { config } from '@app/config'
import { errorHandler } from '@app/middleware/error-handler'
import { notFoundHandler } from '@app/middleware/not-found-handler'
import { logger } from '@app/util/logger'
import { routes } from '@app/route'
import { checkEnv } from '@app/util/check-env'

export default class App {
  public app: fastify.FastifyInstance
  public port: number

  constructor(port?: number) {
    this.app = fastify()
    this.port = port || config.app.port
    this.setup()
  }

  public setup() {
    this.app.register(require('fastify-helmet'))
    this.app.register(require('fastify-cors'))
    this.app.register(routes, { prefix: '/v1' })

    this.app.setErrorHandler(errorHandler)
    this.app.setNotFoundHandler(notFoundHandler)
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

    try {
      await this.app.listen(
        this.port,
        '0.0.0.0',
        (err: fastify.FastifyError) => err && this.fatal(err),
      )

      logger.info(
        `"${config.app.name}" listening on port ${this.port} on "${config.app.env}" environment`,
      )
    } catch (err) {
      logger.error(err)
    }
  }

  /**
   * Stops the server.
   */
  public stop() {
    if (!this.app) {
      return
    }

    this.app.close()

    process.removeAllListeners('SIGINT')
    process.removeAllListeners('SIGTERM')
  }
}
