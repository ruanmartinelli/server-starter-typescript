import 'dotenv/config'
import { toNumber } from 'lodash'
import { Env } from './util/enum'

export const env: string = process.env.NODE_ENV || Env.Development

export interface Config {
  app: {
    name: string
    port: number
    env: string
    concurrency: number
  }

  logging: {
    enabled: boolean
    prettyPrint: boolean
  }
}

export const config: Config = {
  app: {
    name: 'App',
    env,
    port: toNumber(process.env.PORT || '3000'),
    concurrency: toNumber(process.env.CONCURRENCY || '1'),
  },

  logging: {
    enabled: env === Env.Test ? false : true, // No logging on test env
    prettyPrint: true,
  },
}
