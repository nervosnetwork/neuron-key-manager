import * as path from 'path'
import app from 'app'

const { NODE_ENV } = process.env

const isTestMode = NODE_ENV === 'test'
const isDevMode = !app.isPackaged && !isTestMode

const fileBase = (() => {
  if (isTestMode) {
    return 'test/'
  }
  if (!isDevMode) {
    return ''
  }
  return 'dev/'
})()

interface ENV {
  isDevMode: boolean
  fileBasePath: string
  mainURL: string
  testnet: boolean
  isTestMode: boolean
}
const env: ENV = {
  isDevMode,
  fileBasePath: path.resolve(app.getPath('userData'), fileBase),
  mainURL: isDevMode ? 'http://localhost:3000' : `file://${path.join(__dirname, '../dist/neuron-ui/index.html')}`,
  testnet: false,
  isTestMode,
}

export default env
