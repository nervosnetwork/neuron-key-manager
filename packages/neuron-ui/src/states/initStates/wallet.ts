import { currentWallet } from 'services/localCache'

const wallet = currentWallet.load()

export const walletState: State.Wallet = {
  name: wallet.name || '',
  id: wallet.id || '',
  address: wallet.address,
}

export default walletState
