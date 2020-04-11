export async function status(request: Request, reply: Reply) {
  reply.send({ version: '0.0.1' })
}
