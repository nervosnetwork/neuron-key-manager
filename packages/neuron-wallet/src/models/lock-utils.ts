import Core from '@nervosnetwork/ckb-sdk-core'

const core = new Core("http://127.0.0.1:8114")

export default class LockUtils {
  static blake160ToAddress(blake160: string): string {
    const prefix = core.utils.AddressPrefix.Mainnet
    return core.utils.bech32Address(blake160, {
      prefix,
      type: core.utils.AddressType.HashIdx,
      codeHashIndex: '0x00',
    })
  }

  static addressToBlake160(address: string): string {
    const result: string = core.utils.parseAddress(address, 'hex') as string
    const hrp: string = `0100`
    let blake160: string = result.slice(hrp.length + 2, result.length)
    if (!blake160.startsWith('0x')) {
      blake160 = `0x${blake160}`
    }
    return blake160
  }
}
