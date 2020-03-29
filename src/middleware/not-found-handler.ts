import { NotFoundError } from '@app/util/error'

export async function notFoundHandler(request: Request, reply: Reply) {
  const error = new NotFoundError()

  reply.status(404)
  reply.send({
    code: error.code,
    message: error.message,
  })
}
