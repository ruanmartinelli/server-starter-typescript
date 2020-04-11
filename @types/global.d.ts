import { FastifyReply, FastifyRequest } from 'fastify'
import { ServerResponse } from 'http'

declare global {
  type Reply = FastifyReply<ServerResponse>
  type Request = FastifyRequest
}
