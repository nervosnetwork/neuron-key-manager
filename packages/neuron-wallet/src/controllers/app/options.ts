import { MenuItemConstructorOptions, clipboard } from 'electron'
import { bech32Address, AddressPrefix, AddressType } from '@nervosnetwork/ckb-sdk-utils'

import i18n from 'utils/i18n'

export enum URL {
  CreateWallet = '/wizard/mnemonic/create',
  ImportMnemonic = '/wizard/mnemonic/import',
  ImportKeystore = '/keystore/import',
}

export const contextMenuTemplate: {
  [key: string]: (id: string) => Promise<MenuItemConstructorOptions[]>
} = {
  copyMainnetAddress: async (identifier: string) => {
    const address = bech32Address(identifier, {
      prefix: AddressPrefix.Mainnet,
      type: AddressType.HashIdx,
      codeHashIndex: '0x00',
    })
    return [
      {
        label: i18n.t('contextMenu.copy-address'),
        click: () => {
          clipboard.writeText(address)
        },
      },
    ]
  },
}

export default { URL }
