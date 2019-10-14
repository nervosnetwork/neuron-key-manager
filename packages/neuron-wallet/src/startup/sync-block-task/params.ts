import { AddressesUsedSubject } from 'models/subjects/addresses-used-subject'
import AddressDbChangedSubject from 'models/subjects/address-db-changed-subject'
import WalletCreatedSubject from 'models/subjects/wallet-created-subject'
import AddressCreatedSubject from 'models/subjects/address-created-subject'

export const addressesUsedSubject = AddressesUsedSubject.getSubject()
export const addressDbChangedSubject = AddressDbChangedSubject.getSubject()
export const walletCreatedSubject = WalletCreatedSubject.getSubject()
export const addressCreatedSubject = AddressCreatedSubject.getSubject()
