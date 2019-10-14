import { remote } from 'electron'

export const { addressChangeSubject, addressesUsedSubject } = remote.require(
  './startup/sync-block-task/params'
)
