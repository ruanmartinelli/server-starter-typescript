import { config } from '@app/config'
import * as pino from 'pino'

export const logger = pino(config.logging)
