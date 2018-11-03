import * as koa from 'koa'

declare module 'koa' {
  export interface Context {
    disableBodyParser?: boolean
    valid: { body?: any; query?: any; params?: any }
    ok(body: any): void
    created(body: any): void
    noContent(): void
  }

  export interface Request {
    rawBody: string
    body?: any
  }
}
