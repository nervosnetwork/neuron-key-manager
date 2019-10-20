import { Menu, MenuItemConstructorOptions } from 'electron'
import app from 'app'
import env from 'env'
import i18n from 'utils/i18n'
import AppController from 'controllers/app'
import WalletsService from 'services/wallets'
import { ExternalURL } from 'utils/const'

const isMac = process.platform === 'darwin'

const separator: MenuItemConstructorOptions = {
  type: 'separator',
}

const generateTemplate = () => {
  const walletsService = WalletsService.getInstance()
  const currentWallet = walletsService.getCurrent()
  const hasWallet = currentWallet !== undefined

  const appMenuItem: MenuItemConstructorOptions = {
    id: 'app',
    label: app.getName(),
    submenu: [
      {
        id: 'about',
        label: i18n.t('application-menu.neuron.about', {
          app: app.getName(),
        }),
        role: 'about',
        click: () => {
          if (AppController) {
            AppController.showAbout()
          }
        },
      },
      separator,
      {
        label: i18n.t('application-menu.neuron.quit', {
          app: app.getName(),
        }),
        role: 'quit',
      },
    ],
  }

  const walletMenuItem: MenuItemConstructorOptions = {
    id: 'wallet',
    label: i18n.t('application-menu.wallet.label'),
    submenu: [
      {
        id: 'backup',
        label: i18n.t('application-menu.wallet.backup'),
        enabled: hasWallet,
        click: () => { walletsService.requestPassword(currentWallet!.id, 'backup-wallet') }
      },
      {
        id: 'delete',
        label: i18n.t('application-menu.wallet.delete'),
        enabled: hasWallet,
        click: () => { walletsService.requestPassword(currentWallet!.id, 'delete-wallet') }
      },
    ],
  }

  const editMenuItem: MenuItemConstructorOptions = {
    id: 'edit',
    label: i18n.t('application-menu.edit.label'),
    submenu: [
      {
        label: i18n.t('application-menu.edit.cut'),
        role: 'cut',
      },
      {
        label: i18n.t('application-menu.edit.copy'),
        role: 'copy',
      },
      {
        label: i18n.t('application-menu.edit.paste'),
        role: 'paste',
      },
      separator,
      {
        label: i18n.t('application-menu.edit.selectall'),
        role: 'selectAll',
      },
    ],
  }

  const helpSubmenu: MenuItemConstructorOptions[] = [
    {
      label: i18n.t('application-menu.help.nervos-website'),
      click: () => {
        if (AppController) {
          AppController.openExternal(ExternalURL.Website)
        }
      },
    },
    {
      label: i18n.t('application-menu.help.source-code'),
      click: () => {
        if (AppController) {
          AppController.openExternal(ExternalURL.Repository)
        }
      },
    },
  ]
  if (!isMac) {
    helpSubmenu.push(separator)
    helpSubmenu.push({
      id: 'about',
      label: i18n.t('application-menu.neuron.about', {
        app: app.getName(),
      }),
      role: 'about',
      click: () => {
        if (AppController) {
          AppController.showAbout()
        }
      },
    })
  }

  const helpMenuItem: MenuItemConstructorOptions = {
    id: 'help',
    label: i18n.t('application-menu.help.label'),
    role: 'help',
    submenu: helpSubmenu,
  }

  const developMenuItem: MenuItemConstructorOptions = {
    id: 'develop',
    label: i18n.t('application-menu.develop.develop'),
    submenu: [
      {
        label: i18n.t('application-menu.develop.reload'),
        role: 'reload',
      },
      {
        label: i18n.t('application-menu.develop.force-reload'),
        role: 'forceReload',
      },
      {
        label: i18n.t('application-menu.develop.toggle-dev-tools'),
        role: 'toggleDevTools',
      },
    ],
  }

  const applicationMenuTemplate = env.isDevMode
    ? [walletMenuItem, editMenuItem, developMenuItem, helpMenuItem]
    : [walletMenuItem, editMenuItem, helpMenuItem]

  if (isMac) {
    applicationMenuTemplate.unshift(appMenuItem)
  }
  return applicationMenuTemplate
}

export const updateApplicationMenu = () => {
  const applicationMenu = Menu.buildFromTemplate(generateTemplate())
  Menu.setApplicationMenu(applicationMenu)
}

export default {
  updateApplicationMenu,
}
