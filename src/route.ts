import { status } from '@app/controller/'
import { FastifyInstance } from 'fastify'

export const routes = (app: FastifyInstance, _opts: any, done: Function) => {
  app.route({
    method: 'GET',
    url: '/',
    handler: status,
  })

  done()
}
