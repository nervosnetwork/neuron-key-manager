import fs from 'fs'
import { SaveDialogReturnValue } from 'electron'
import AppController from 'controllers/app'
import WalletsService, { Wallet, WalletProperties, FileKeystoreWallet } from 'services/wallets'
import Keystore from 'models/keys/keystore'
import Keychain from 'models/keys/keychain'
import { validateMnemonic, mnemonicToSeedSync } from 'models/keys/mnemonic'
import { AccountExtendedPublicKey, ExtendedPrivateKey } from 'models/keys/key'
import { CatchControllerError } from 'decorators'
import { ResponseCode } from 'utils/const'
import {
  CurrentWalletNotSet,
  IsRequired,
  WalletNotFound,
  InvalidMnemonic,
  ServiceHasNoResponse,
  EmptyPassword,
  IncorrectPassword,
  InvalidJSON,
} from 'exceptions'
import i18n from 'utils/i18n'
import WalletCreatedSubject from 'models/subjects/wallet-created-subject'

/**
 * @class WalletsController
 * @description handle messages from wallets channel
 */
export default class WalletsController {
  @CatchControllerError
  public static async getAll(): Promise<Controller.Response<Pick<Wallet, 'id' | 'name'>[]>> {
    const walletsService = WalletsService.getInstance()
    const wallets = walletsService.getAll()
    if (!wallets) {
      throw new ServiceHasNoResponse('Wallet')
    }
    return {
      status: ResponseCode.Success,
      result: wallets.map(({ name, id }) => ({ name, id })),
    }
  }

  @CatchControllerError
  public static async get(id: string): Promise<Controller.Response<Wallet>> {
    const walletsService = WalletsService.getInstance()
    if (typeof id === 'undefined') {
      throw new IsRequired('ID')
    }

    const wallet = walletsService.get(id)
    if (!wallet) {
      throw new WalletNotFound(id)
    }
    return {
      status: ResponseCode.Success,
      result: wallet,
    }
  }

  @CatchControllerError
  public static async importMnemonic({
    name,
    password,
    mnemonic,
  }: {
    name: string
    password: string
    mnemonic: string
  }): Promise<Controller.Response<Omit<WalletProperties, 'extendedKey'>>> {
    const result = await WalletsController.createByMnemonic({
      name,
      password,
      mnemonic,
    })

    WalletCreatedSubject.getSubject().next('import')

    return result
  }

  @CatchControllerError
  public static async create({
    name,
    password,
    mnemonic,
  }: {
    name: string
    password: string
    mnemonic: string
  }): Promise<Controller.Response<Omit<WalletProperties, 'extendedKey'>>> {
    const result = await WalletsController.createByMnemonic({
      name,
      password,
      mnemonic,
    })

    WalletCreatedSubject.getSubject().next('create')

    return result
  }

  private static async createByMnemonic({
    name,
    password,
    mnemonic,
  }: {
    name: string
    password: string
    mnemonic: string
  }): Promise<Controller.Response<Omit<WalletProperties, 'extendedKey'>>> {
    if (!validateMnemonic(mnemonic)) {
      throw new InvalidMnemonic()
    }

    const seed = mnemonicToSeedSync(mnemonic)
    const masterKeychain = Keychain.fromSeed(seed)
    if (!masterKeychain.privateKey) {
      throw new InvalidMnemonic()
    }
    const extendedKey = new ExtendedPrivateKey(
      masterKeychain.privateKey.toString('hex'),
      masterKeychain.chainCode.toString('hex')
    )
    const keystore = Keystore.create(extendedKey, password)

    const accountKeychain = masterKeychain.derivePath(AccountExtendedPublicKey.ckbAccountPath)
    const accountExtendedPublicKey = new AccountExtendedPublicKey(
      accountKeychain.publicKey.toString('hex'),
      accountKeychain.chainCode.toString('hex')
    )

    const walletsService = WalletsService.getInstance()
    const address = walletsService.generateAddress(accountExtendedPublicKey)
    const wallet = walletsService.create({
      id: '',
      name,
      address,
      extendedKey: accountExtendedPublicKey.serialize(),
      keystore,
    })

    return {
      status: ResponseCode.Success,
      result: {
        id: wallet.id,
        name: wallet.name,
        address: wallet.address
      },
    }
  }

  @CatchControllerError
  public static async importKeystore({
    name,
    password,
    keystorePath,
  }: {
    name: string
    password: string
    keystorePath: string
  }): Promise<Controller.Response<Wallet>> {
    if (password === undefined) {
      throw new IsRequired('Password')
    }
    const keystore = fs.readFileSync(keystorePath, 'utf8')
    try {
      JSON.parse(keystore)
    } catch {
      throw new InvalidJSON()
    }
    const keystoreObject = Keystore.fromJson(keystore)
    const masterPrivateKey = keystoreObject.extendedPrivateKey(password)
    const masterKeychain = new Keychain(
      Buffer.from(masterPrivateKey.privateKey, 'hex'),
      Buffer.from(masterPrivateKey.chainCode, 'hex')
    )
    const accountKeychain = masterKeychain.derivePath(AccountExtendedPublicKey.ckbAccountPath)
    const accountExtendedPublicKey = new AccountExtendedPublicKey(
      accountKeychain.publicKey.toString('hex'),
      accountKeychain.chainCode.toString('hex')
    )

    const walletsService = WalletsService.getInstance()
    const address = walletsService.generateAddress(accountExtendedPublicKey)
    const wallet = walletsService.create({
      id: '',
      name,
      address,
      extendedKey: accountExtendedPublicKey.serialize(),
      keystore: keystoreObject,
    })

    WalletCreatedSubject.getSubject().next('import')

    return {
      status: ResponseCode.Success,
      result: wallet,
    }
  }

  // TODO: update addresses?
  @CatchControllerError
  public static async update({
    id,
    name,
    password,
    newPassword,
  }: {
    id: string
    password: string
    name: string
    newPassword?: string
  }): Promise<Controller.Response<Wallet>> {
    const walletsService = WalletsService.getInstance()
    const wallet = walletsService.get(id)
    if (!wallet) {
      throw new WalletNotFound(id)
    }

    const props = {
      name: name || wallet.name,
      address: wallet.address,
      keystore: wallet.loadKeystore(),
    }

    if (newPassword) {
      const extendedPrivateKey = wallet!.loadKeystore().extendedPrivateKey(password)
      props.keystore = Keystore.create(extendedPrivateKey, newPassword)
    }

    walletsService.update(id, props)
    return {
      status: ResponseCode.Success,
      result: walletsService.get(id),
    }
  }

  @CatchControllerError
  public static async delete({
    id = '',
    password = '',
  }: Controller.Params.DeleteWallet): Promise<Controller.Response<any>> {
    if (password === '') {
      throw new EmptyPassword()
    }
    const walletsService = WalletsService.getInstance()
    if (!walletsService.validate({ id, password })) {
      throw new IncorrectPassword()
    }
    await walletsService.delete(id)

    return {
      status: ResponseCode.Success,
    }
  }

  @CatchControllerError
  public static async backup({
    id = '',
    password = '',
  }: Controller.Params.BackupWallet): Promise<Controller.Response<boolean>> {
    const walletsService = WalletsService.getInstance()
    const wallet = walletsService.get(id)

    if (!walletsService.validate({ id, password })) {
      throw new IncorrectPassword()
    }

    const keystore = wallet.loadKeystore()
    return new Promise(resolve => {
      AppController.showSaveDialog(
        {
          title: i18n.t('messages.save-keystore'),
          defaultPath: wallet.name,
        },
        (returnValue: SaveDialogReturnValue) => {
          if (returnValue.filePath) {
            fs.writeFileSync(returnValue.filePath, JSON.stringify(keystore))
            resolve({
              status: ResponseCode.Success,
              result: true,
            })
          }
        }
      )
    })
  }

  @CatchControllerError
  public static async getCurrent() {
    const currentWallet = WalletsService.getInstance().getCurrent() || null
    return {
      status: ResponseCode.Success,
      result: currentWallet,
    }
  }

  @CatchControllerError
  public static async activate(id: string) {
    const walletsService = WalletsService.getInstance()
    walletsService.setCurrent(id)
    const currentWallet = walletsService.getCurrent() as FileKeystoreWallet
    if (!currentWallet || id !== currentWallet.id) {
      throw new CurrentWalletNotSet()
    }
    return {
      status: ResponseCode.Success,
      result: currentWallet.toJSON(),
    }
  }
}

/* eslint-disable */
declare global {
  module Controller {
    type WalletsMethod = Exclude<keyof typeof WalletsController, keyof typeof Object | 'service'>
  }
}
/* eslint-enable */
