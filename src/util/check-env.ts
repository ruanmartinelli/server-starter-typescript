import * as joi from 'joi'
import { Env } from './enum'

// prettier-ignore
const envSchema = joi
  .object({
    PORT: joi.number().allow(''),
    NODE_ENV: joi.string().allow(Object.values(Env)),
    CONCURRENCY: joi.number().allow(''),
  })
  .unknown()
  .required()

/**
 * Checks if all the required environment variables are present on `process.env`.
 */
export function checkEnv() {
  const { error: err } = joi.validate(process.env, envSchema)

  if (err) {
    throw new Error(`${err.details[0].message}`)
  }
}
