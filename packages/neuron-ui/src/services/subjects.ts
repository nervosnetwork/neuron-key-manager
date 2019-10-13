const FallbackSubject = {
  subscribe: (args: any) => {
    console.warn('remote is not supported')
    console.info(JSON.stringify(args))
    return {
      unsubscribe: () => {
        console.info('unsubscribe')
      },
    }
  },
}

const SubjectConstructor = <T>(
  channel: 'data-updated' | 'current-wallet-updated' | 'wallet-list-updated' | 'command'
) => {
  return window.ipcRenderer
    ? {
        subscribe: (handler: (data: T) => void) => {
          window.ipcRenderer.on(channel, (_e: Event, data: T) => {
            handler(data)
          })
          return {
            unsubscribe: () => {
              window.ipcRenderer.removeAllListeners(channel)
            },
          }
        },
      }
    : FallbackSubject
}
export const DataUpdate = SubjectConstructor<Subject.DataUpdateMetaInfo>('data-updated')
export const CurrentWallet = SubjectConstructor<any>('current-wallet-updated')
export const WalletList = SubjectConstructor<any[]>('wallet-list-updated')
export const Command = SubjectConstructor<Subject.CommandMetaInfo>('command')

export default {
  DataUpdate,
  CurrentWallet,
  WalletList,
  Command,
}
