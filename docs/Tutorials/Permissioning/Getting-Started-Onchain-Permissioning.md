---
description: Setting up and using Hyperledger Besu onchain Permissioning
---

# Get started with onchain permissioning

The following steps describe bootstrapping a local permissioned network using a Hyperledger Besu
node and a development server to run the Permissioning Management Dapp.

!!! note

    Production environments require a webserver to [host the Permissioning Management Dapp](../../HowTo/Deploy/Production.md).

To start a network with onchain permissioning:

1. [Install the prerequisites](#prerequisites)
1. [Add the ingress contracts to the genesis file](#add-the-ingress-contracts-to-genesis-file)
1. [Set the environment variables](#set-the-environment-variables)
1. [Start first node with onchain permissioning and the JSON-RPC HTTP service enabled]
1. [Clone the permissioning contracts repository and install dependencies]
1. [Build the project](#build-the-project)
1. [Deploy the permissioning contracts](#deploy-the-contracts)
1. [Start the webserver for the Permissioning Management Dapp]
1. [Add the first node to the nodes whitelist](#add-the-first-node-to-the-whitelist).

## Prerequisites

For the development server to run the dapp:

* [NodeJS](https://nodejs.org/en/) v10.16.0 or later
* [Yarn](https://yarnpkg.com/en/) v1.15 or later
* Browser with [MetaMask installed](https://metamask.io/).

## Add the ingress contracts to the genesis file

!!! tip

    If the network is using only account or nodes permissioning, add only the relevant ingress
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

!!! important

    The specified node must be a miner (PoW networks) or validator (PoA networks).

    If your network is not a [free gas network](../../HowTo/Configure/FreeGas.md), the account used
    to interact with the permissioning contracts must have a balance.

## Onchain permissioning command line options

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

    The account that deploys the contracts is automatically an
    [admin account](#update-accounts-or-admin-accounts-whitelists).

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
    variable in the _Whitelisted Accounts_ and _Admin Accounts_ tabs.

!!! note

    Only [admin accounts](#update-accounts-or-admin-accounts-whitelists) can add or remove nodes
    from the whitelist.

## Add the first node to the whitelist

The first node must [add itself to the whitelist] before adding other nodes.

<!-- Links -->
[Start first node with onchain permissioning and the JSON-RPC HTTP service enabled]: #onchain-permissioning-command-line-options
[Clone the permissioning contracts repository and install dependencies]: #clone-the-contracts-and-install-dependencies
[Start the webserver for the Permissioning Management Dapp]: #start-the-webserver-for-the-permissioning-management-dapp
[add itself to the whitelist]: ../../HowTo/Limit-Access/Updating-Whitelists.md#update-nodes-whitelist

