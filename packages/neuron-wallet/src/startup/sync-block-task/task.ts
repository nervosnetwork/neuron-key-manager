import { remote } from 'electron'
import { initConnection as initAddressConnection } from 'database/address/ormconfig'
import AddressesUsedSubject from 'models/subjects/addresses-used-subject'
import { register as registerAddressListener } from 'listeners/address'

// register to listen address updates
registerAddressListener()

const { addressesUsedSubject } = remote.require('./startup/sync-block-task/params')

// pass to task a main process subject
AddressesUsedSubject.setSubject(addressesUsedSubject)

export const run = async () => {
  await initAddressConnection()
}

run()

export default run
