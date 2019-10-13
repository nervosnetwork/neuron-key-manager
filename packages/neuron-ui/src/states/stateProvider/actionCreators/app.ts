import { NeuronWalletActions, AppActions, StateDispatch } from 'states/stateProvider/reducer'
import { getNeuronWalletState } from 'services/remote'
import initStates from 'states/initStates'
import { Routes, ErrorCode } from 'utils/const'
import { WalletWizardPath } from 'components/WalletWizard'
import { wallets as walletsCache, currentWallet as currentWalletCache } from 'services/localCache'

export const initAppState = () => (dispatch: StateDispatch, history: any) => {
  getNeuronWalletState()
    .then(res => {
      if (res.status) {
        const { wallets = [], currentWallet: wallet = initStates.wallet, addresses = [] } = res.result
        dispatch({
          type: NeuronWalletActions.InitAppState,
          payload: {
            wallet: { ...wallet, balance: 0, addresses },
            wallets,
          },
        })
        if (!wallet) {
          history.push(`${Routes.WalletWizard}${WalletWizardPath.Welcome}`)
        } else {
          history.push(Routes.Receive)
        }

        currentWalletCache.save(wallet)
        walletsCache.save(wallets)
      } else {
        history.push(`${Routes.WalletWizard}${WalletWizardPath.Welcome}`)
      }
    })
    .catch(() => {
      history.push(`${Routes.WalletWizard}${WalletWizardPath.Welcome}`)
    })
}

export const addPopup = (text: string) => (dispatch: StateDispatch) => {
  dispatch({
    type: AppActions.PopIn,
    payload: { text: `messages.${text}`, timestamp: Date.now() },
  })
  setTimeout(() => {
    dispatch({
      type: AppActions.PopOut,
      payload: null,
    })
  }, 8000)
}

export const addNotification = (message: State.Message<ErrorCode>) => (dispatch: StateDispatch) => {
  dispatch({
    type: AppActions.AddNotification,
    payload: message,
  })
}
export const dismissNotification = (timestamp: number) => (dispatch: StateDispatch) => {
  dispatch({
    type: AppActions.DismissNotification,
    payload: timestamp,
  })
}

export const toggleTopAlertVisibility = (show?: boolean) => (dispatch: StateDispatch) => {
  dispatch({
    type: AppActions.ToggleTopAlertVisibility,
    payload: show,
  })
}

export const toggleAllNotificationVisibility = (show?: boolean) => (dispatch: StateDispatch) => {
  dispatch({
    type: AppActions.ToggleAllNotificationVisibility,
    payload: show,
  })
}

export const toggleIsAllowedToFetchList = (allowed?: boolean) => (dispatch: StateDispatch) => {
  dispatch({
    type: AppActions.ToggleIsAllowedToFetchList,
    payload: allowed,
  })
}

export default {
  initAppState,
  addNotification,
  addPopup,
  dismissNotification,
  toggleTopAlertVisibility,
  toggleAllNotificationVisibility,
  toggleIsAllowedToFetchList,
}
