declare module Controller {
  interface Response<T = any> {
    status: number
    message?:
      | string
      | {
          content?: string
          meta?: { [key: string]: string }
        }
    result?: T
  }

  namespace Params {
    interface BackupWallet {
      id: string
      password: string
    }
    interface DeleteWallet {
      id: string
      password: string
    }
  }

  interface Wallet {
    id: string
    name: string
  }
}
