# Neuron Key Manager

[![Azure Pipelines Build Status](https://dev.azure.com/nervosnetwork/neuron/_apis/build/status/nervosnetwork.neuron-key-manager?branchName=develop)](https://dev.azure.com/nervosnetwork/neuron-key-manager/_build/latest?definitionId=8&branchName=develop)
[![Telegram Group](https://cdn.rawgit.com/Patrolavia/telegram-badge/8fe3382b/chat.svg)](https://t.me/nervos_ckb_dev)

---

## Quick Start

### Prerequisites

You will need `node >= 12` and `yarn >= 1.14` to build and run Neuron Key Manager.

#### Lerna

This project uses [lerna](https://github.com/lerna/lerna/) for package management. It can be installed either globally or locally within the project:

```sh
$ yarn global add lerna # install lerna globally
# or
$ yarn add lerna --exact --ignore-workspace-root-check # install lerna locally within the project
```

#### Install Dependencies

After lerna has been installed, run this to install and link dependencies:

```sh
$ yarn bootstrap
```

### Start Neuron Key Manager

```sh
$ yarn start
```

This command will start two tasks:

1. start `neuron-ui`, which is the React UI layer.
2. start `neuron-wallet`, which is the core wallet layer.

You can also start them independently:

```sh
# start neuron-ui at `http://localhost:3000`
$ yarn start:ui
```

```sh
# start neuron-wallet
$ yarn start:wallet
```

### Test

```sh
# launch the test runner.
$ yarn test
```

## Download Neuron Key Manager

If you don't want to bother building from source, you can download a binary from [releases](https://github.com/nervosnetwork/neuron-key-manager/releases). We offer pre-built binaries for Windows, Linux and macOS.

## License

Neuron Key Manager is released under the terms of the MIT license. See [COPYING](COPYING) for more information or see [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).
