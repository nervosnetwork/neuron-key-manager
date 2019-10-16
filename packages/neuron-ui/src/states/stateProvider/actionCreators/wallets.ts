import { AppActions, StateDispatch } from 'states/stateProvider/reducer'
import {
  getWalletList,
  createWallet,
  importMnemonic,
  importKeystore,
  getCurrentWallet,
  updateWallet,
  setCurrentWallet as setRemoteCurrentWallet,
  deleteWallet as deleteRemoteWallet,
  backupWallet as backupRemoteWallet,
  showErrorMessage,
} from 'services/remote'
import { WalletWizardPath } from 'components/WalletWizard'
import i18n from 'utils/i18n'
import { wallets as walletsCache, currentWallet as currentWalletCache } from 'services/localCache'
import { Routes } from 'utils/const'
import { failureResToNotification } from 'utils/formatters'
import { NeuronWalletActions } from '../reducer'
import { addNotification, addPopup } from './app'

export const updateCurrentWallet = () => (dispatch: StateDispatch, history: any) => {
  getCurrentWallet().then(res => {
    if (res.status === 1) {
      const payload = res.result || { name: '', id: '', address: '' }
      if (!payload || !payload.id) {
        history.push(`${Routes.WalletWizard}${WalletWizardPath.Welcome}`)
      }
      dispatch({
        type: NeuronWalletActions.UpdateCurrentWallet,
        payload,
      })
      currentWalletCache.save(payload)
    } else {
      addNotification(failureResToNotification(res))(dispatch)
    }
  })
}

export const createWalletWithMnemonic = (params: Controller.ImportMnemonicParams) => (
  _dispatch: StateDispatch,
  history: any
) => {
  return createWallet(params).then(res => {
    if (res.status === 1) {
      history.push(Routes.Receive)
    } else if (res.status > 0) {
      showErrorMessage(i18n.t(`messages.error`), i18n.t(`messages.codes.${res.status}`))
    } else if (res.message) {
      const msg = typeof res.message === 'string' ? res.message : res.message.content || ''
      if (msg) {
        showErrorMessage(i18n.t(`messages.error`), msg)
      }
    }
  })
}

export const importWalletWithMnemonic = (params: Controller.ImportMnemonicParams) => async (
  _dispatch: StateDispatch,
  history: any
) => {
  return importMnemonic(params).then(res => {
    if (res.status === 1) {
      history.push(Routes.Receive)
    } else if (res.status > 0) {
      showErrorMessage(i18n.t(`messages.error`), i18n.t(`messages.codes.${res.status}`))
    } else if (res.message) {
      const msg = typeof res.message === 'string' ? res.message : res.message.content || ''
      if (msg) {
        showErrorMessage(i18n.t(`messages.error`), msg)
      }
    }
  })
}

export const importWalletWithKeystore = (params: Controller.ImportKeystoreParams) => async (
  _dispatch: StateDispatch,
  history: any
) => {
  return importKeystore(params).then(res => {
    if (res.status === 1) {
      history.push(Routes.Receive)
    } else if (res.status > 0) {
      showErrorMessage(i18n.t(`messages.error`), i18n.t(`messages.codes.${res.status}`))
    } else if (res.message) {
      const msg = typeof res.message === 'string' ? res.message : res.message.content || ''
      if (msg) {
        showErrorMessage(i18n.t(`messages.error`), msg)
      }
    }
  })
}

export const updateWalletList = () => (dispatch: StateDispatch, history: any) => {
  getWalletList().then(res => {
    if (res.status === 1) {
      const payload = res.result || []
      if (!payload.length) {
        history.push(`${Routes.WalletWizard}${WalletWizardPath.Welcome}`)
      }
      dispatch({
        type: NeuronWalletActions.UpdateWalletList,
        payload,
      })
      walletsCache.save(payload)
    } else {
      addNotification(failureResToNotification(res))(dispatch)
    }
  })
}

export const updateWalletProperty = (params: Controller.UpdateWalletParams) => (
  dispatch: StateDispatch,
  history?: any
) => {
  updateWallet(params).then(res => {
    if (res.status) {
      addPopup('update-wallet-successfully')(dispatch)
      if (history) {
        history.push(Routes.Receive)
      }
    } else {
      addNotification(failureResToNotification(res))(dispatch)
    }
  })
}
export const setCurrentWallet = (id: string) => (dispatch: StateDispatch) => {
  setRemoteCurrentWallet(id).then(res => {
    if (res.status) {
      dispatch({
        type: AppActions.Ignore,
        payload: null,
      })
    } else {
      addNotification(failureResToNotification(res))(dispatch)
    }
  })
}

export const deleteWallet = (params: Controller.DeleteWalletParams) => (dispatch: StateDispatch) => {
  dispatch({
    type: AppActions.DismissPasswordRequest,
    payload: null,
  })
  deleteRemoteWallet(params).then(res => {
    if (res.status) {
      addPopup('delete-wallet-successfully')(dispatch)
    } else {
      addNotification(failureResToNotification(res))(dispatch)
    }
  })
}

export const backupWallet = (params: Controller.BackupWalletParams) => (dispatch: StateDispatch) => {
  dispatch({
    type: AppActions.DismissPasswordRequest,
    payload: null,
  })
  backupRemoteWallet(params).then(res => {
    if (res.status) {
      dispatch({
        type: AppActions.Ignore,
        payload: null,
      })
    } else {
      addNotification(failureResToNotification(res))(dispatch)
    }
  })
}
export default {
  createWalletWithMnemonic,
  importWalletWithMnemonic,
  updateCurrentWallet,
  updateWalletList,
  updateWallet,
  setCurrentWallet,
  deleteWallet,
  backupWallet,
}
