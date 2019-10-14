import 'reflect-metadata'
import { debounceTime } from 'rxjs/operators'

import { updateApplicationMenu } from 'utils/application-menu'
import WindowManager from 'models/window-manager'
import createMainWindow from 'startup/create-main-window'
import createSyncBlockTask from 'startup/sync-block-task/create'
import initConnection from 'database/address/ormconfig'
import { WalletListSubject, CurrentWalletSubject } from 'models/subjects/wallets'
import dataUpdateSubject from 'models/subjects/data-update'
import app from 'app'
import { changeLanguage } from 'utils/i18n'

const openWindow = () => {
  if (!WindowManager.mainWindow) {
    WindowManager.mainWindow = createMainWindow()
    WindowManager.mainWindow.on('closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
      if (WindowManager.mainWindow) {
        WindowManager.mainWindow.removeAllListeners()
        WindowManager.mainWindow = null
      }
    })
  }
}

app.on('ready', async () => {
  changeLanguage(app.getLocale())
  updateApplicationMenu()

  WalletListSubject.pipe(debounceTime(50)).subscribe(() => {
    dataUpdateSubject.next({ dataType: 'wallets', actionType: 'update' })
  })

  CurrentWalletSubject.pipe(debounceTime(50)).subscribe(async ({ currentWallet = null }) => {
    if (currentWallet) {
      dataUpdateSubject.next({ dataType: 'current-wallet', actionType: 'update' })
    }
  })

  await initConnection()
  createSyncBlockTask()
  openWindow()
})

app.on('activate', openWindow)
