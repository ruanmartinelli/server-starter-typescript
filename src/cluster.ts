// ts-lint:disable
import 'module-alias/register'

import App from '@app/app'
import { config } from '@app/config'
import { logger } from '@app/util/logger'
import * as throng from 'throng'

/**
 * Start a worker process.
 */
function start(id: number) {
  const app = new App()
  app.start().catch(app.fatal)
  logger.info(`Started worker ${id}`)
}

/**
 * Start the master process.
 */
function master() {
  logger.info(`Master process started`)
}

throng({
  workers: config.app.concurrency,
  grace: config.app.port,
  master,
  start,
})
