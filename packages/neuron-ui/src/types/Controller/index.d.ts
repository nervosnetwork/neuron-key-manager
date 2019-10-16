declare namespace Controller {
  interface CreateWalletParams {
    name: string
    mnemonic: string
    password: string
  }
  interface ImportMnemonicParams {
    name: string
    mnemonic: string
    password: string
  }

  interface ImportKeystoreParams {
    name: string
    keystorePath: string
    password: string
  }
  interface UpdateWalletParams {
    id: string
    password?: string
    newPassword?: string
    name?: string
  }

  interface DeleteWalletParams {
    id: string
    password: string
  }

  interface BackupWalletParams {
    id: string
    password: string
  }

  type SetCurrentWalletParams = string
}
