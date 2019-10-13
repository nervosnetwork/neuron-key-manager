import app from './app'
import wallet from './wallet'
import settings from './settings'

export * from './app'
export * from './wallet'
export * from './settings'

const initStates = {
  app,
  wallet,
  settings,
}

export default initStates
