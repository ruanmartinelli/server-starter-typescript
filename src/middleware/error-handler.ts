import { HttpError, NotFoundError } from '@app/util/error'
import { logger } from '@app/util/logger'
import { Context } from 'koa'
import { pick } from 'lodash'
import { v4 as uuidV4 } from 'uuid'

export async function errorHandler(ctx: Context, next: () => Promise<void>) {
  try {
    await next()

    if (ctx.status && ctx.status === 404) {
      throw new NotFoundError()
    }
  } catch (err) {
    /* istanbul ignore else */

    // Hey, I know this error
    if (err instanceof HttpError) {
      ctx.status = err.status

      ctx.body = {
        message: err.message,
        code: err.code,
      }
    } else {
      // Hmmm, this one is new

      logger.error(
        {
          transactionId: uuidV4(),
          ...pick(ctx.request, ['body', 'headers', 'method', 'url']),
        },
        'Unandled error',
      )

      ctx.status = 500

      ctx.body = {
        message: 'Internal Server Error',
        code: 'E_SERVER',
      }
    }
  }
}
