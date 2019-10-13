import { useCallback } from 'react'

export const useGoBack = (history: any) => {
  return useCallback(() => {
    history.goBack()
  }, [history])
}

export default { useGoBack }
