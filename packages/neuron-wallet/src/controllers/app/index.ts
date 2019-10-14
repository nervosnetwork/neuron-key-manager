import {
  dialog,
  shell,
  Menu,
  MessageBoxOptions,
  MessageBoxReturnValue,
  SaveDialogOptions,
  SaveDialogReturnValue,
} from 'electron'
import app from 'app'

import WalletsService from 'services/wallets'
import WalletsController from 'controllers/wallets'

import { ResponseCode } from 'utils/const'
import WindowManager from 'models/window-manager'
import env from 'env'
import CommandSubject from 'models/subjects/command'

import { URL, contextMenuTemplate } from './options'

export default class AppController {
  public static getInitState = async () => {
    const walletsService = WalletsService.getInstance()
    const [
      currentWallet = null,
      wallets = [],
    ] = await Promise.all([
      walletsService.getCurrent(),
      walletsService.getAll(),
    ])

    const addresses: Controller.Address[] = await (currentWallet
      ? WalletsController.getAllAddresses(currentWallet.id).then(res => res.result)
      : [])


    const initState = {
      currentWallet,
      wallets: [...wallets.map(({ name, id }, idx: number) => ({ id, name, idx: idx }))],
      addresses,
    }

    return { status: ResponseCode.Success, result: initState }
  }

  public static handleViewError = (error: string) => {
    if (env.isDevMode) {
      console.error(error)
    }
  }

  public static isMainWindow = (winID: number) => {
    return WindowManager.mainWindow && winID === WindowManager.mainWindow.id
  }

  public static showMessageBox(options: MessageBoxOptions, callback?: (returnValue: MessageBoxReturnValue) => void) {
    dialog.showMessageBox(options).then(callback)
  }

  public static showSaveDialog(options: SaveDialogOptions, callback?: (returnValue: SaveDialogReturnValue) => void) {
    dialog.showSaveDialog(options).then(callback)
  }

  public static navTo(url: string) {
    if (WindowManager.mainWindow) {
      CommandSubject.next({ winID: WindowManager.mainWindow.id, type: 'nav', payload: url })
    }
  }

  public static openExternal(url: string) {
    shell.openExternal(url)
  }

  public static async contextMenu(params: { type: string; id: string }) {
    if (!params || params.id === undefined) {
      return
    }
    const { id, type } = params
    switch (type) {
      case 'copyMainnetAddress':
      case 'walletList':
      case 'addressList': {
        const menu = Menu.buildFromTemplate(await contextMenuTemplate[type](id))
        menu.popup()
        break
      }
      default: {
        break
      }
    }
  }

  public static showAbout() {
    const options = {
      type: 'info',
      title: app.getName(),
      message: app.getName(),
      detail: app.getVersion(),
      buttons: ['OK'],
      cancelId: 0,
    }
    AppController.showMessageBox(options)
  }

  public static createWallet() {
    AppController.navTo(URL.CreateWallet)
  }

  public static importWallet(type: 'mnemonic' | 'keystore') {
    if (type === 'mnemonic') {
      AppController.navTo(URL.ImportMnemonic)
    } else if (type === 'keystore') {
      AppController.navTo(URL.ImportKeystore)
    }
  }
}

/* eslint-disable */
declare global {
  module Controller {
    type AppMethod = Exclude<keyof typeof AppController, keyof typeof Object>
  }
}
/* eslint-enable */
