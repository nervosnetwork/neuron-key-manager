export default {
  translation: {
    keywords: {
      wallet: 'Wallet',
      password: 'Password',
      'wallet-name': 'Wallet Name',
    },
    'application-menu': {
      neuron: {
        about: 'About {{app}}',
        preferences: 'Preferences...',
        quit: 'Quit {{app}}',
      },
      wallet: {
        label: 'Wallet',
        select: 'Select Wallet',
        'create-new': 'Create New Wallet',
        import: 'Import Wallet',
        backup: 'Backup Current Wallet',
        delete: 'Delete Current Wallet',
        'change-password': 'Change Password',
      },
      edit: {
        label: 'Edit',
        cut: 'Cut',
        copy: 'Copy',
        paste: 'Paste',
      },
      view: {
        label: 'View',
        fullscreen: 'Fullscreen',
        'address-book': 'Address Book',
      },
      window: {
        label: 'Window',
        minimize: 'Minimize',
        close: 'Close Window',
      },
      help: {
        label: 'Help',
        sourceCode: 'Source Code',
      },
      develop: {
        develop: 'Develop',
        forceReload: 'Force Reload',
        reload: 'Reload',
        toggleDevTools: 'Toggle DevTools',
      },
    },
    services: {
      transactions: 'Transactions',
      wallets: 'Wallets',
    },
    messages: {
      'failed-to-load-networks': 'Failed to load networks',
      'Networks-will-be-reset': 'Networks will be reset',
      'wallet-password-less-than-min-length': 'Password must be at least {{minPasswordLength}} characters',
      'wallet-password-more-than-max-length': 'Password up to {{maxPasswordLength}} characters',
      'wallet-password-letter-complexity':
        'Password must contain a combination of uppercase and lowercase letters, numbers and special symbols.',
      'current-wallet-not-set': 'Current wallet is not set',
      'incorrect-password': 'Password is incorrect',
      'current-key-has-no-data': 'Current Key has no data',
      'invalid-address': 'Address {{address}} is invalid',
      'codehash-not-loaded': 'codehash is not loaded',
      'wallet-not-found': 'Wallet {{id}} not found',
      'no-active-wallet': 'No active wallet',
      'wallet-incorrect-password': 'Incorrect password',
      'failed-to-create-mnemonic': 'Failed to create mnemonic',
      'failed-to-activate-wallet': 'Failed to activate wallet',
      'failed-to-delete-wallet': 'Failed to delete wallet',
      'network-not-found': 'Network of ID {{id}} is not found',
      'invalid-name': '{{field}} name is invalid',
      'default-network-unremovable': 'Default network is unremovable',
      'lack-of-default-network': 'Lack of default network',
      'active-network-not-set': 'Active network is not set',
      'transaction-not-found': 'Transaction {{hash}} is not found',
      'service-not-respond': '{{service}} service not respond',
      'parameters-of-sending-transactions-are-required': 'Parameters of sending transactions are required',
      'is-required': '{{field}} is required',
      'invalid-format': '{{field}} is in invalid format',
      'used-name': '{{field}} name is used',
      'missing-required-argument': 'Missing required argument',
      'save-keystore': 'Save Keystore',
      'invalid-mnemonic': 'Mnemonic is invalid',
      'unsupported-cipher': 'Unsupported cipher',
      'capacity-not-enough': 'Capacity is not enough',
      'should-be-type-of': '{{field}} should be type of {{type}}',
    },
    contextMenu: {
      select: 'Select',
      backup: 'Backup',
      edit: 'Edit',
      delete: 'Delete',
      'copy-address': 'Copy address',
      'request-payment': 'Request Payment',
      'spend-from': 'Spend From',
      'view-on-explorer': 'View On Explorer',
    },
    messageBox: {
      button: {
        confirm: 'OK',
        discard: 'Cancel',
      },
      'send-capacity': {
        title: 'Send Transaction',
      },
      'remove-network': {
        title: 'Remove Network',
        message: 'Network of name: {{name}}, address: {{address}} will be removed.',
        alert: 'This is the current network, by removing it, the connection will be switched to the default network',
      },
      'remove-wallet': {
        title: 'Delete the wallet',
        password: 'Password',
      },
      'backup-keystore': {
        title: 'Backup the Keystore',
        password: 'Password',
      },
    },
    prompt: {
      password: {
        label: 'Input your password',
        submit: 'Submit',
        cancel: 'Cancel',
      },
    },
  },
}
