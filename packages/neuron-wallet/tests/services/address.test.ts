import AddressService from '../../src/services/addresses'
import initConnection, { getConnection } from '../../src/database/address/ormconfig'
import AddressEntity, { AddressVersion } from '../../src/database/address/entities/address'
import AddressDao, { Address } from '../../src/database/address/dao'
import { AddressType } from '../../src/models/keys/address'
import { AccountExtendedPublicKey } from '../../src/models/keys/key'

const walletId = '1'
const extendedKey = new AccountExtendedPublicKey(
  '03e5b310636a0f6e7dcdfffa98f28d7ed70df858bb47acf13db830bfde3510b3f3',
  '37e85a19f54f0a242a35599abac64a71aacc21e3a5860dd024377ffc7e6827d8'
)

describe('Key tests', () => {
  it('toAddress', () => {
    const metaInfo = {
      walletId,
      accountExtendedPublicKey: extendedKey,
      addressType: AddressType.Receiving,
      addressIndex: 0,
    }

    // @ts-ignore
    const addrs = AddressService.toAddress(metaInfo)
    expect(addrs.length).toEqual(2)
    expect(addrs[0].version).toEqual(AddressVersion.Testnet)
    expect(addrs[1].version).toEqual(AddressVersion.Mainnet)
    expect(addrs[0].path).toEqual(addrs[1].path)
  })
})

describe('Key tests with db', () => {
  const address: Address = {
    walletId: '1',
    address: 'ckt1qyqrdsefa43s6m882pcj53m4gdnj4k440axqswmu83',
    path: "m/44'/309'/0'/0/0",
    addressType: AddressType.Receiving,
    addressIndex: 0,
    txCount: 0,
    liveBalance: '0',
    sentBalance: '0',
    pendingBalance: '0',
    balance: '0',
    totalBalance: '0',
    blake160: '0x36c329ed630d6ce750712a477543672adab57f4c',
    version: AddressVersion.Testnet,
  }

  const usedAddress: Address = {
    walletId: '2',
    address: 'ckt1qyqrdsefa43s6m882pcj53m4gdnj4k440axqswmu83',
    path: "m/44'/309'/0'/0/0",
    addressType: AddressType.Receiving,
    addressIndex: 0,
    txCount: 1,
    liveBalance: '0',
    sentBalance: '0',
    pendingBalance: '0',
    balance: '0',
    totalBalance: '0',
    blake160: '0x36c329ed630d6ce750712a477543672adab57f4c',
    version: AddressVersion.Testnet,
  }

  beforeAll(async () => {
    await initConnection()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.synchronize()
  })

  const generate = async (id: string = walletId) => {
    await AddressService.generateAndSave(id, extendedKey)
  }

  it('generateAndSave', async () => {
    await generate()

    const all = await getConnection()
      .getRepository(AddressEntity)
      .createQueryBuilder('address')
      .getMany()

    expect(all.length).toEqual((2 + 1) * 2)
  })

  it('checkAndGenerateSave', async () => {
    await generate()

    const all = await getConnection()
      .getRepository(AddressEntity)
      .createQueryBuilder('address')
      .getMany()

    const usedAll = all
      .filter(one => one.addressType === AddressType.Receiving)
      .map(one => {
        const entity = one
        entity.txCount = 1
        return entity
      })
    await getConnection().manager.save(usedAll)

    const final = await getConnection()
      .getRepository(AddressEntity)
      .createQueryBuilder('address')
      .getMany()

    expect(final.length).toEqual((2 + 1) * 2 * 2)
  })

  it('generateAndSave with two wallet', async () => {
    await generate()
    await generate('2')
    const all = await getConnection()
      .getRepository(AddressEntity)
      .createQueryBuilder('address')
      .getMany()

    expect(all.length).toEqual((2 + 1) * 2 * 2)
  })
  it('allAddresses', async () => {
    await generate()
    await generate('2')
    const all = await AddressService.allAddresses()
    expect(all.length).toEqual(6)
  })

  it('allAddressesByWalletId', async () => {
    await generate()
    await generate('2')
    const all = await AddressService.allAddressesByWalletId(walletId)
    expect(all.length).toEqual(3)
  })
})
