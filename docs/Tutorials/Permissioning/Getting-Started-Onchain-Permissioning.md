---
description: Setting up and using Hyperledger Besu onchain Permissioning
---

# Get started with onchain permissioning

The following steps describe bootstrapping a permissioned network using a Hyperledger Besu
node and a development server to run the Permissioning Management Dapp.

!!! note

    Production environments require a webserver to [host the Permissioning Management Dapp](../../HowTo/Deploy/Production.md).

To start a network with onchain permissioning:

1. [Install the prerequisites](#prerequisites)
1. [Add the ingress contracts to the genesis file](#add-the-ingress-contracts-to-the-genesis-file)
1. [Set the environment variables](#set-the-environment-variables)
1. [Start first node with onchain permissioning and the JSON-RPC HTTP service enabled]
1. [Clone the permissioning contracts repository and install dependencies]
1. [Build the project](#build-the-project)
1. [Deploy the permissioning contracts](#deploy-the-contracts)
1. [Start the webserver for the Permissioning Management Dapp]
1. [Add the first node to the nodes allowlist](#add-the-first-node-to-the-allowlist).

## Prerequisites

For the development server to run the dapp:

* [NodeJS](https://nodejs.org/en/) v10.16.0 or later
* [Yarn](https://yarnpkg.com/en/) v1.15 or later
* Browser with [MetaMask installed](https://metamask.io/).

## Add the ingress contracts to the genesis file

!!! tip

    If the network is using only account or node permissioning, add only the relevant ingress
    contract to the genesis file.

Add the Ingress contracts to the genesis file for your network by copying them from
[`genesis.json`](https://github.com/PegaSysEng/permissioning-smart-contracts/blob/master/genesis.json)
in the [`permissioning-smart-contracts` repository](https://github.com/PegaSysEng/permissioning-smart-contracts):

```json
"0x0000000000000000000000000000000000008888": {
      "comment": "Account Ingress smart contract",
      "balance": "0",
      "code": <stripped>,
      "storage": {
         <stripped>
      }
}

"0x0000000000000000000000000000000000009999": {
      "comment": "Node Ingress smart contract",
      "balance": "0",
      "code": <stripped>,
      "storage": {
         <stripped>
      }
}
```

!!! important

    To support the permissioning contracts, ensure your genesis file includes at least the
    `constantinopleFixBlock` milestone.

## Set the environment variables

Create the following environment variables and set to the specified values:

* `BESU_NODE_PERM_ACCOUNT` - account to deploy the permissioning contracts and become the first
  admin account.
* `BESU_NODE_PERM_KEY` - private key of the account to deploy the permissioning contracts.
* `ACCOUNT_INGRESS_CONTRACT_ADDRESS` - address of the Account Ingress contract in the genesis file.
* `NODE_INGRESS_CONTRACT_ADDRESS` - address of the Node Ingress contract in the genesis file.
* `BESU_NODE_PERM_ENDPOINT` - required only if your node is not using the default JSON-RPC host and
  port (`http://127.0.0.1:8545`). Set to JSON-RPC host and port. When bootstrapping the network,
  Besu uses the specified node to deploy the contracts and is the first node in the network.
* `CHAIN_ID` The chainID from the genesis file.

!!! tip

    A simple way to set multiple environment variables is to create a file called `.env` with the required settings

    ```env
    NODE_INGRESS_CONTRACT_ADDRESS=0x0000000000000000000000000000000000009999
    ACCOUNT_INGRESS_CONTRACT_ADDRESS=0x0000000000000000000000000000000000008888
    BESU_NODE_PERM_ACCOUNT=627306090abaB3A6e1400e9345bC60c78a8BEf57
    BESU_NODE_PERM_KEY=c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
    CHAIN_ID=2018
    ```

## Onchain permissioning command line options

!!! important

    The specified node must be producing blocks, that is, be a miner (PoW networks) or validator (PoA networks).

    To allow MetaMask to connect, the node must have JSON-RPC HTTP enabled, and have `--rpc-http-cors-origins` set to allow MetaMask.

    If your network is not a [free gas network](../../HowTo/Configure/FreeGas.md), the account used
    to interact with the permissioning contracts must have a balance.

To enable account and/or node permissioning, all nodes participating in a permissioned network must
include the command line options:

* [`--permissions-accounts-contract-enabled`](../../Reference/CLI/CLI-Syntax.md#permissions-accounts-contract-enabled)
  to enable onchain accounts permissioning
* [`--permissions-accounts-contract-address`](../../Reference/CLI/CLI-Syntax.md#permissions-accounts-contract-address)
  set to the address of the Account Ingress contract in the genesis file
  (`"0x0000000000000000000000000000000000008888"`)
* [`--permissions-nodes-contract-enabled`](../../Reference/CLI/CLI-Syntax.md#permissions-nodes-contract-enabled)
  to enable onchain nodes permissioning
* [`--permissions-nodes-contract-address`](../../Reference/CLI/CLI-Syntax.md#permissions-nodes-contract-address)
  set to the address of the Node Ingress contract in the genesis file
  (`"0x0000000000000000000000000000000000009999"`). Start your first node with command line options
  to enable onchain permissioning and the JSON-RPC HTTP host and port matching environment variable
  `BESU_NODE_PERM_ENDPOINT`.

example command line:

```cmd
besu --permissions-accounts-contract-enabled --permissions-accounts-contract-address "0x0000000000000000000000000000000000008888" --permissions-nodes-contract-enabled  --permissions-nodes-contract-address "0x0000000000000000000000000000000000009999" --genesis-file=genesis.json --rpc-http-enabled --rpc-http-cors-origins="*" --miner-enabled --miner-coinbase=fe3b557e8fb62b89f4916b721be55ceb828dbd73
```

## Clone the contracts and install dependencies

1. Clone the `permissioning-smart-contracts` repository:

    ```bash
    git clone https://github.com/PegaSysEng/permissioning-smart-contracts.git
    ```

1. Change into the `permissioning-smart-contracts` directory and run:

    ```bash
    yarn install
    ```

## Build the project

In the `permissioning-smart-contracts` directory, build the project:

```bash
yarn run build
```

## Deploy the contracts

In the `permissioning-smart-contracts` directory, deploy the Admin and Rules contracts:

```bash
yarn truffle migrate --reset
```

This also updates the Ingress contract with the name and version of the Admin and Rules contracts.
The migration logs the addresses of the Admin and Rules contracts.

!!! important

    The account that deploys the contracts is automatically an [admin account].

## Start the webserver for the Permissioning Management Dapp

!!! note

    Production environments require a webserver to
    [host the Permissioning Management Dapp](../../HowTo/Deploy/Production.md).

1. In the `permissioning-smart-contracts` directory, start the webserver serving the Dapp:

    ```bash
    yarn start
    ```

    The Dapp displays at [http://localhost:3000](http://localhost:3000).

1. Ensure MetaMask connects to your local node (by default `http://localhost:8545`).

    A MetaMask notification displays requesting permission for Besu Permissioning to connect to your
    account.

1. Click the _Connect_ button.

    The Dapp displays with the account specified by the `BESU_NODE_PERM_ACCOUNT` environment
    variable in the _Accounts_ and _Admins_ tabs.

!!! note

    Only [admin accounts] can add or remove nodes from the permission list.

## Add the first node to the allowlist

The first node must [add itself to the allowlist] before adding other nodes.

<!-- Links -->
[Start first node with onchain permissioning and the JSON-RPC HTTP service enabled]: #onchain-permissioning-command-line-options
[Clone the permissioning contracts repository and install dependencies]: #clone-the-contracts-and-install-dependencies
[Start the webserver for the Permissioning Management Dapp]: #start-the-webserver-for-the-permissioning-management-dapp
[add itself to the allowlist]: ../../HowTo/Limit-Access/Updating-Permission-Lists.md#update-node-permission-lists
[admin accounts]: ../../HowTo/Limit-Access/Updating-Permission-Lists.md#update-node-permission-lists
