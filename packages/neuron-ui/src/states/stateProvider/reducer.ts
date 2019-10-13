import initStates from 'states/initStates'

export enum NeuronWalletActions {
  InitAppState = 'initAppState',
  // wallets
  UpdateCurrentWallet = 'updateCurrentWallet',
  UpdateWalletList = 'updateWalletList',
}
export enum AppActions {
  UpdateMessage = 'updateMessage',
  AddNotification = 'addNotification',
  DismissNotification = 'dismissNotification',
  ClearNotifications = 'clearNotifications',
  RequestPassword = 'requestPassword',
  DismissPasswordRequest = 'dismissPasswordRequest',
  UpdatePassword = 'updatePassword',
  UpdateLoadings = 'updateLoadings',

  PopIn = 'popIn',
  PopOut = 'popOut',
  ToggleTopAlertVisibility = 'toggleTopAlertVisibility',
  ToggleAllNotificationVisibility = 'toggleAllNotificationVisibility',
  ToggleIsAllowedToFetchList = 'toggleIsAllowedToFetchList',
  Ignore = 'ignore',
}

export type StateActions = NeuronWalletActions | AppActions

export type StateDispatch = React.Dispatch<{ type: StateActions; payload: any }> // TODO: add type of payload
export type StateWithDispatch = State.AppWithNeuronWallet & { dispatch: StateDispatch }

export const reducer = (
  state: State.AppWithNeuronWallet,
  { type, payload }: { type: StateActions; payload: any }
): State.AppWithNeuronWallet => {
  const { app, wallet, settings } = state
  if (process.env.NODE_ENV === 'development' && window.localStorage.getItem('log-action')) {
    console.group(`type: ${type}`)
    console.info(payload)
    console.groupEnd()
  }
  switch (type) {
    // Actions of Neuron Wallet
    case NeuronWalletActions.InitAppState: {
      const { wallets, wallet: incomingWallet } = payload
      return {
        ...state,
        wallet: incomingWallet || wallet,
        settings: {
          wallets,
        },
      }
    }
    case NeuronWalletActions.UpdateCurrentWallet: {
      return {
        ...state,
        wallet: {
          ...wallet,
          ...payload,
        },
      }
    }
    case NeuronWalletActions.UpdateWalletList: {
      return {
        ...state,
        settings: {
          ...settings,
          wallets: payload,
        },
      }
    }
    case AppActions.RequestPassword: {
      return {
        ...state,
        app: {
          ...app,
          passwordRequest: payload,
        },
      }
    }
    case AppActions.DismissPasswordRequest: {
      return {
        ...state,
        app: {
          ...app,
          passwordRequest: initStates.app.passwordRequest,
        },
      }
    }
    case AppActions.UpdatePassword: {
      return {
        ...state,
        app: {
          ...app,
          passwordRequest: {
            ...app.passwordRequest,
            password: payload,
          },
        },
      }
    }
    case AppActions.UpdateMessage: {
      /**
       * payload: {type,content, timestamp}
       */
      return {
        ...state,
        app: {
          ...app,
          messages: {
            ...app.messages,
            ...payload,
          },
        },
      }
    }
    case AppActions.AddNotification: {
      /**
       * payload: { type, content }
       */
      // NOTICE: for simplicty, only one notification will be displayed
      return {
        ...state,
        app: {
          ...app,
          notifications: [...app.notifications, payload],
          showTopAlert: true,
        },
      }
    }
    case AppActions.DismissNotification: {
      /**
       * payload: timstamp
       */
      return {
        ...state,
        app: {
          ...app,
          messages: {
            ...app.messages,
          },
          notifications: app.notifications.filter(({ timestamp }) => timestamp !== payload),
          showAllNotifications: app.notifications.length > 1,
          showTopAlert:
            app.notifications.findIndex(message => message.timestamp === payload) === app.notifications.length - 1
              ? false
              : app.showTopAlert,
        },
      }
    }
    case AppActions.ClearNotifications: {
      return {
        ...state,
        app: {
          ...app,
          messages: {
            ...app.messages,
          },
          notifications: [],
        },
      }
    }
    case AppActions.UpdateLoadings: {
      return {
        ...state,
        app: {
          ...app,
          loadings: {
            ...app.loadings,
            ...payload,
          },
        },
      }
    }
    case AppActions.PopIn: {
      return {
        ...state,
        app: {
          ...app,
          popups: [...app.popups, payload],
        },
      }
    }
    case AppActions.PopOut: {
      return {
        ...state,
        app: {
          ...app,
          popups: app.popups.slice(1),
        },
      }
    }
    case AppActions.ToggleTopAlertVisibility: {
      const showTopAlert = payload === undefined ? !app.showTopAlert : payload
      return {
        ...state,
        app: {
          ...app,
          showTopAlert,
          notifications: showTopAlert ? app.notifications : app.notifications.slice(0, -1),
        },
      }
    }
    case AppActions.ToggleAllNotificationVisibility: {
      return {
        ...state,
        app: {
          ...app,
          showAllNotifications: payload === undefined ? !app.showAllNotifications : payload,
        },
      }
    }
    case AppActions.ToggleIsAllowedToFetchList: {
      return {
        ...state,
        app: {
          ...app,
          isAllowedToFetchList: payload === undefined ? !app.isAllowedToFetchList : payload,
        },
      }
    }
    default: {
      return state
    }
  }
}
