import app from './app'
import wallets from './wallets'

export * from './app'
export * from './wallets'
export const actionCreators = {
  ...app,
  ...wallets,
}

export default actionCreators
