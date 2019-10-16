export const MAX_WALLET_NAME_LENGTH = 20
export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 50

export enum Routes {
  Launch = '/',
  WalletWizard = '/wizard',
  Wallet = '/wallet',
  Receive = '/receive',
  CreateWallet = '/wallets/new',
  ImportWallet = '/wallets/import',
  ImportKeystore = '/keystore/import',
  Prompt = '/prompt',
}

export enum MnemonicAction {
  Create = 'create',
  Verify = 'verify',
  Import = 'import',
}

export const FULL_SCREENS = [`/wizard/`, `/keystore/`]

export enum ErrorCode {
  // Parameter validation errors from neuron-ui
  FieldRequired = 201,
  FieldUsed = 202,
  FieldTooLong = 203,
  FieldTooShort = 204,
  FieldInvalid = 205,
  DecimalExceed = 206,
  NotNegative = 207,
  ProtocolRequired = 208,
  NoWhiteSpaces = 209,
  FieldIrremovable = 301,
  FailToLaunch = 302,
  FieldNotFound = 303,
  CameraUnavailable = 304,
  AddressIsEmpty = 305,
}
