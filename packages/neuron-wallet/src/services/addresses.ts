import { AddressPrefix } from '@nervosnetwork/ckb-sdk-utils'
import { AccountExtendedPublicKey } from 'models/keys/key'
import Address, { AddressType } from 'models/keys/address'
import LockUtils from 'models/lock-utils'
import AddressDao, { Address as AddressInterface } from 'database/address/dao'
import env from 'env'
import AddressEntity, { AddressVersion } from 'database/address/entities/address'
import AddressCreatedSubject from 'models/subjects/address-created-subject'

export interface AddressMetaInfo {
  walletId: string
  addressType: AddressType
  addressIndex: number
  accountExtendedPublicKey: AccountExtendedPublicKey
}

export default class AddressService {
  public static isAddressUsed = async (address: string, walletId: string): Promise<boolean> => {
    const addressEntity = await AddressDao.findByAddress(address, walletId)
    return !!addressEntity
  }

  public static generateAndSave = async (
    walletId: string,
    extendedKey: AccountExtendedPublicKey,
    isImporting: boolean | undefined,
  ) => {
    const addresses = AddressService.generateAddresses(walletId, extendedKey)
    const allAddresses: AddressInterface[] = [
      ...addresses.mainnetReceiving,
    ]
    await AddressDao.create(allAddresses)

    // TODO: notify address created and pass addressWay
    AddressService.notifyAddressCreated(allAddresses, isImporting)
  }

  private static notifyAddressCreated = (addresses: AddressInterface[], isImporting: boolean | undefined) => {
    const addrs = addresses
      .filter(addr => addr.version === AddressVersion.Mainnet)
      .map(addr => {
        const address = addr
        address.isImporting = isImporting
        return address
      })
    AddressCreatedSubject.getSubject().next(addrs)
  }

  /* eslint no-await-in-loop: "off" */
  /* eslint no-restricted-syntax: "off" */
  public static updateTxCountAndBalances = async (addresses: string[]) => {
    let addrs: AddressEntity[] = []
    for (const address of addresses) {
      const ads = await AddressDao.updateTxCountAndBalance(address)
      addrs = addrs.concat(ads)
    }
    return addrs
  }

  // Generate both receiving and change addresses.
  public static generateAddresses = (
    walletId: string,
    extendedKey: AccountExtendedPublicKey,
  ) => {
    const receiving = Array.from({ length: 1 }).map((_, idx) => {
      const addressMetaInfo: AddressMetaInfo = {
        walletId,
        addressType: AddressType.Receiving,
        addressIndex: idx + 0,
        accountExtendedPublicKey: extendedKey,
      }
      return AddressService.toAddress(addressMetaInfo)
    })
    const mainnetReceiving = receiving.map(arr => arr[1])
    return {
      mainnetReceiving,
    }
  }

  private static toAddress = (addressMetaInfo: AddressMetaInfo): AddressInterface[] => {
    const path: string = Address.pathFor(addressMetaInfo.addressType, addressMetaInfo.addressIndex)
    const testnetAddress: string = addressMetaInfo.accountExtendedPublicKey.address(
      addressMetaInfo.addressType,
      addressMetaInfo.addressIndex,
      AddressPrefix.Testnet
    ).address

    const mainnetAddress: string = addressMetaInfo.accountExtendedPublicKey.address(
      addressMetaInfo.addressType,
      addressMetaInfo.addressIndex,
      AddressPrefix.Mainnet
    ).address

    const addressToParse = env.testnet ? testnetAddress : mainnetAddress
    const blake160: string = LockUtils.addressToBlake160(addressToParse)

    const testnetAddressInfo: AddressInterface = {
      walletId: addressMetaInfo.walletId,
      address: testnetAddress,
      path,
      addressType: addressMetaInfo.addressType,
      addressIndex: addressMetaInfo.addressIndex,
      txCount: 0,
      liveBalance: '0',
      sentBalance: '0',
      pendingBalance: '0',
      balance: '0',
      totalBalance: '0',
      blake160,
      version: AddressVersion.Testnet,
    }

    const mainnetAddressInfo = {
      ...testnetAddressInfo,
      address: mainnetAddress,
      version: AddressVersion.Mainnet,
    }

    return [testnetAddressInfo, mainnetAddressInfo]
  }

  public static allAddresses = async (): Promise<AddressInterface[]> => {
    const addressEntities = await AddressDao.allAddresses(AddressVersion.Mainnet)

    return addressEntities.map(addr => addr.toInterface())
  }

  public static allAddressesByWalletId = async (walletId: string): Promise<AddressInterface[]> => {
    const addressEntities = await AddressDao.allAddressesByWalletId(walletId, AddressVersion.Mainnet)

    return addressEntities.map(addr => addr.toInterface())
  }

  public static usedAddresses = async (walletId: string): Promise<AddressInterface[]> => {
    const addressEntities = await AddressDao.usedAddressesByWalletId(walletId, AddressVersion.Mainnet)

    return addressEntities.map(addr => addr.toInterface())
  }

  public static deleteByWalletId = async (walletId: string) => {
    return AddressDao.deleteByWalletId(walletId)
  }

  public static findByAddresses = async (addresses: string[]) => {
    const entities = await AddressDao.findByAddresses(addresses)
    return entities.map(entity => entity.toInterface())
  }
}
