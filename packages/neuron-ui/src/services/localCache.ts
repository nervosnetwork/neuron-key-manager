export enum LocalCacheKey {
  Addresses = 'addresses',
  Wallets = 'wallets',
  CurrentWallet = 'currentWallet',
}

export const addresses = {
  save: (addressList: State.Address[]) => {
    if (!Array.isArray(addressList)) {
      return false
    }
    const addressesStr = JSON.stringify(addressList)
    window.localStorage.setItem(LocalCacheKey.Addresses, addressesStr)
    return true
  },
  load: () => {
    const addressesStr = window.localStorage.getItem(LocalCacheKey.Addresses) || `[]`
    try {
      const addressList = JSON.parse(addressesStr)
      if (!Array.isArray(addressList)) {
        throw new TypeError(`Addresses should be type fo Address[]`)
      }
      return addressList
    } catch (err) {
      console.error(err)
      return []
    }
  },
}

export const wallets = {
  save: (walletList: State.WalletIdentity[]) => {
    if (!Array.isArray(walletList)) {
      return false
    }
    const walletsStr = JSON.stringify(walletList)
    window.localStorage.setItem(LocalCacheKey.Wallets, walletsStr)
    return true
  },
  load: () => {
    const walletsStr = window.localStorage.getItem(LocalCacheKey.Wallets) || `[]`
    try {
      const walletList = JSON.parse(walletsStr)
      if (!Array.isArray(walletList)) {
        throw new TypeError(`Wallets should be type of WalletIdentity[]`)
      }
      return walletList
    } catch (err) {
      console.error(err)
      return []
    }
  },
}

export const currentWallet = {
  save: (wallet: State.WalletIdentity | null) => {
    const walletStr = JSON.stringify({ id: '', name: '', ...wallet })
    window.localStorage.setItem(LocalCacheKey.CurrentWallet, walletStr)
    return true
  },
  load: (): { [index: string]: string } => {
    const walletStr = window.localStorage.getItem(LocalCacheKey.CurrentWallet) || '{}'
    try {
      return JSON.parse(walletStr)
    } catch (err) {
      console.error(`Cannot parse current wallet`)
      return {}
    }
  },
}

export default {
  LocalCacheKey,
  addresses,
  wallets,
  currentWallet,
}
