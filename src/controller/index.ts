import { Context } from 'koa'

class Index {
  public status(ctx: Context) {
    ctx.ok({ version: '0.0.1' })
  }
}

export const index = new Index()
