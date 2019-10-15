export const failureResToNotification = (res: any): State.Message => {
  return {
    type: 'alert',
    timestamp: +new Date(),
    code: res.status,
    content: typeof res.message !== 'string' ? res.message.content : res.message,
    meta: typeof res.message !== 'string' ? res.message.meta : undefined,
  }
}

export default {
  failureResToNotification,
}
