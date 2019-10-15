declare namespace State {
  interface Transaction {
    type: 'send' | 'receive'
    createdAt: string
    updatedAt: string
    timestamp: string
    value: string
    hash: string
    description: string
    blockNumber: string
    status: 'pending' | 'success' | 'failed'
  }

  interface DetailedOutput {
    capacity: string
    lock: {
      args: string[]
      codeHash: string
    }
    lockHash: string
    outPoint: {
      index: string
      txHash: string
    }
  }
  interface DetailedTransaction extends Transaction {
    blockHash: string
    blockNumber: string
    deps: any[]
    inputs: {
      capacity: string | null
      lockHash: string | null
      previousOutput: {
        blockHash: string | null
        cell: {
          txHash: string
          index: string
        } | null
      }
    }[]
    inputsCount: string
    outputs: DetailedOutput[]
    outputsCount: string
    witnesses: string[]
  }
  interface Output {
    address: string
    amount: string
    unit: any
  }
  type MessageType = 'success' | 'warning' | 'alert'
  interface Message<Code = number, Meta = { [key: string]: string | undefined }> {
    type: MessageType
    timestamp: number
    code?: Code
    content?: string
    meta?: Meta
  }

  interface Popup {
    timestamp: Date
    text: string
  }

  interface App {
    passwordRequest: {
      actionType: 'send' | 'backup' | 'delete' | null
      walletID: string
      password: string
    }
    messages: {
      [index: string]: Message | null
    }
    popups: Popup[]
    notifications: Message[]
    loadings: {
      sending: boolean
      addressList: boolean
      transactionList: boolean
      network: boolean
    }
    showTopAlert: boolean
    showAllNotifications: boolean
    isAllowedToFetchList: boolean
  }

  interface WalletIdentity {
    id: string
    name: string
  }

  interface Address {
    address: string
    identifier: string
    description: string
    type: 0 | 1 // 0 for receiving, 1 for change
    txCount: number
    balance: string
    index: number
  }

  interface Wallet extends WalletIdentity {
    balance: string
    addresses: Address[]
  }

  interface Settings {
    wallets: WalletIdentity[]
  }

  interface AppWithNeuronWallet {
    app: App
    settings: Settings
    wallet: Wallet
  }
}

declare namespace CustomRouter {
  interface Route {
    name: string
    path: string
    params?: string
    exact?: boolean
    comp: React.FunctionComponent<any>
  }
}
