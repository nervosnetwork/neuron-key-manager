import winston, { format } from 'winston'
import path from 'path'
import env from '../env'
import app from '../app'

const { isDevMode } = env

let basePath
if (isDevMode) {
  basePath = './'
} else {
  try {
    basePath = app.getPath('logs')
  } catch {
    basePath = path.join(app.getPath('userData'), 'logs')
  }
}

const { combine, timestamp, json } = format

const logger = winston.createLogger({
  level: 'info',
  defaultMeta: {
    service: 'neuron-wallet',
  },
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: path.resolve(basePath, 'combined.log'),
    }),
    new winston.transports.File({
      filename: path.resolve(basePath, 'error.log'),
      level: 'error',
    }),
  ],
})

export default logger