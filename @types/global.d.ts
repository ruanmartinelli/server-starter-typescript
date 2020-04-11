import { FastifyReply, FastifyRequest } from 'fastify'
import { ServerResponse } from 'http'

declare global {
  interface Reply extends FastifyReply<ServerResponse> {}
  interface Request extends FastifyRequest {}
}
