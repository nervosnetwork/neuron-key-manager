import { bech32Address, AddressPrefix, parseAddress, AddressType } from '@nervosnetwork/ckb-sdk-utils'

export default class LockUtils {
  static blake160ToAddress(blake160: string): string {
    const prefix = AddressPrefix.Mainnet
    return bech32Address(blake160, {
      prefix,
      type: AddressType.HashIdx,
      codeHashIndex: '0x00',
    })
  }

  static addressToBlake160(address: string): string {
    const result: string = parseAddress(address, 'hex') as string
    const hrp: string = `0100`
    let blake160: string = result.slice(hrp.length + 2, result.length)
    if (!blake160.startsWith('0x')) {
      blake160 = `0x${blake160}`
    }
    return blake160
  }
}
