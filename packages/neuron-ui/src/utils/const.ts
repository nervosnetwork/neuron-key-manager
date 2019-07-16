export const MAX_NETWORK_NAME_LENGTH = 28
export const ADDRESS_LENGTH = 50
export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 50
export const PAGE_SIZE = 15
export const UNREMOVABLE_NETWORK = 'Testnet'
export const UNREMOVABLE_NETWORK_ID = '0'
export const MIN_CELL_WIDTH = 100
export const BUTTON_GAP = 20

export enum ConnectStatus {
  Online = 'online',
  Offline = 'offline',
}

export enum Channel {
  Initiate = 'initiate',
  NavTo = 'navTo',
  App = 'app',
  Chain = 'chain',
  Networks = 'networks',
  Transactions = 'transactions',
  Wallets = 'wallets',
  Helpers = 'helpers',
  DataUpdate = 'dataUpdate',
}

export enum Routes {
  Launch = '/',
  Overview = '/overview',
  WalletWizard = '/wizard',
  Wallet = '/wallet',
  Send = '/send',
  Receive = '/receive',
  History = '/history',
  Transaction = '/transaction',
  Addresses = '/addresses',
  Settings = '/settings',
  SettingsGeneral = '/settings/general',
  SettingsWallets = '/settings/wallets',
  SettingsNetworks = '/settings/networks',
  CreateWallet = '/wallets/new',
  ImportWallet = '/wallets/import',
  NetworkEditor = '/network',
  WalletEditor = '/editwallet',
  Prompt = '/prompt',
}

export enum CapacityUnit {
  CKB = 'ckb',
  CKKB = 'ckkb',
  CKGB = 'ckgb',
}

export const PlaceHolders = {
  send: {
    Address: 'eg: ckt1q9gry5zgzrccrjnvnhktjx6remmktn9h6s2fupurhzmgm9',
    Amount: 'eg: 100',
  },
}

export enum Message {
  NameRequired = 'messages.name-required',
  URLRequired = 'messages.url-required',
  LengthOfNameShouldBeLessThanOrEqualTo = 'messages.length-of-name-should-be-less-than-or-equal-to',
  NetworkNameUsed = 'messages.network-name-used',
  AtLeastOneAddressNeeded = 'messages.at-least-one-address-needed',
  InvalidAddress = 'messages.invalid-address',
  InvalidAmount = 'messages.invalid-amount',
  AmountNotEnough = 'messages.amount-not-enough',
  IsUnremovable = 'messages.is-unremovable',
  ProtocolRequired = 'messages.protocol-required',
}

export enum MnemonicAction {
  Create = 'create',
  Verify = 'verify',
  Import = 'import',
}

export const FULL_SCREENS = [
  `${Routes.Transaction}/`,
  `/wizard/`,
  `${Routes.Settings}/`,
  `${Routes.WalletEditor}/`,
  `${Routes.NetworkEditor}/`,
]