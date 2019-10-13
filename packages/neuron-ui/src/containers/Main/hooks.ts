import { useEffect } from 'react'

import { StateDispatch, AppActions } from 'states/stateProvider/reducer'
import { updateCurrentWallet, updateWalletList, initAppState } from 'states/stateProvider/actionCreators'

import { getWinID } from 'services/remote'
import { DataUpdate as DataUpdateSubject, Command as CommandSubject } from 'services/subjects'

export const useOnCurrentWalletChange = ({
  walletID,
  history,
  dispatch,
}: {
  walletID: string
  i18n: any
  history: any

  dispatch: StateDispatch
}) => {
  useEffect(() => {
    if (walletID) {
      initAppState()(dispatch, history)
    } else {
      initAppState()(dispatch, history)
    }
  }, [walletID, dispatch, history])
}

export const useSubscription = ({
  walletID,
  history,
  dispatch,
}: {
  walletID: string
  history: any
  dispatch: StateDispatch
}) => {
  useEffect(() => {
    const dataUpdateSubscription = DataUpdateSubject.subscribe(({ dataType, walletID: walletIDOfMessage }: any) => {
      if (walletIDOfMessage && walletIDOfMessage !== walletID) {
        return
      }
      switch (dataType) {
        case 'address': {
          break
        }
        case 'current-wallet': {
          updateCurrentWallet()(dispatch, history)
          break
        }
        case 'wallets': {
          updateWalletList()(dispatch, history)
          updateCurrentWallet()(dispatch, history)
          break
        }
        default: {
          break
        }
      }
    })

    const commandSubscription = CommandSubject.subscribe(({ winID, type, payload }: Subject.CommandMetaInfo) => {
      if (winID && getWinID() === winID) {
        switch (type) {
          case 'nav': {
            history.push(payload)
            break
          }
          case 'delete-wallet': {
            dispatch({
              type: AppActions.RequestPassword,
              payload: {
                walletID: payload || '',
                actionType: 'delete',
              },
            })
            break
          }
          case 'backup-wallet': {
            dispatch({
              type: AppActions.RequestPassword,
              payload: {
                walletID: payload || '',
                actionType: 'backup',
              },
            })
            break
          }
          default: {
            break
          }
        }
      }
    })
    return () => {
      dataUpdateSubscription.unsubscribe()
      commandSubscription.unsubscribe()
    }
  }, [walletID, history, dispatch])
}

export default {
  useOnCurrentWalletChange,
  useSubscription,
}
