import { BrowserWindow } from 'electron'

export default class WindowManager {
  public static mainWindow: BrowserWindow | null

  public static dataUpdated = (meta: {
    dataType: 'current-wallet' | 'wallets' | 'address'
  }) => {
    if (WindowManager.mainWindow) {
      WindowManager.mainWindow.webContents.send('data-updated', meta)
    }
  }

  public static sendCommand = (command: {
    winID: number
    type: 'nav' | 'delete-wallet' | 'backup-wallet'
    payload: string | null
  }) => {
    if (WindowManager.mainWindow) {
      WindowManager.mainWindow.webContents.send('command', command)
    }
  }
}
