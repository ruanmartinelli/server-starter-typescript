import { HttpError } from '@app/util/error'
import { logger } from '@app/util/logger'
import { pick } from 'lodash'
import { v4 as uuidV4 } from 'uuid'

/* istanbul ignore next */
export async function errorHandler(
  error: Error,
  request: Request,
  reply: Reply,
) {
  // Known error
  if (error instanceof HttpError) {
    reply.status(error.status)
    reply.send({
      message: error.message,
      code: error.code,
    })
  } else {
    // Unknown error
    logger.error(
      {
        transactionId: uuidV4(),
        ...pick(request, ['body', 'headers', 'method', 'url']),
      },
      'Unandled error',
    )

    reply.status(500)
    reply.send({
      message: 'Internal Server Error',
      code: 'E_SERVER',
    })
  }
}
