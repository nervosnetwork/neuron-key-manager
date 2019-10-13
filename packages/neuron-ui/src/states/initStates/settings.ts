import { wallets } from 'services/localCache'

export const settingsState: State.Settings = {
  wallets: wallets.load(),
}

export default settingsState
