---
description: Upgrade the permissioning contract for onchain permissioning
---

# Upgrade the permissioning contracts - Interface v1

The following tutorial describes the steps to upgrade the permissioning contracts to the latest
version when using onchain permissioning.

The following instructions assume that the user is upgrading contracts that
implement version 1 of the [permissioning contract interface](../../../HowTo/Limit-Access/Specify-Perm-Version.md).

## Prerequisites

For the development server to run the dapp:

<!-- vale off -->
* [Node.js](https://nodejs.org/en/) v10.16.0 or later
<!-- vale on -->
* [Yarn](https://yarnpkg.com/en/) v1.15 or later
* Browser with [MetaMask installed](https://metamask.io/).

## Steps

Listed on the right-hand side of the page are the steps to create a permissioned network.

### 1. Get the latest contracts and install dependencies

!!! note

    Pull the latest changes if you already have a cloned repository using the `git pull` command
    inside the `permissioning-smart-contracts` directory.

1. Clone the `permissioning-smart-contracts` repository:

    ```bash
    git clone https://github.com/ConsenSys/permissioning-smart-contracts.git
    ```

1. Change into the `permissioning-smart-contracts` directory and run:

    ```bash
    yarn install
    ```

### 2. Build the project

In the `permissioning-smart-contracts` directory, build the project:

```bash
yarn run build
```

### 3. Update environment variables

!!! important

    This step is only required if upgrading from v1.1.0 or earlier release of the
    permissioning contract to v2.0.0 or later.

1. If they exist, delete the following environment variables:
    * `ACCOUNT_INGRESS_CONTRACT_ADDRESS`
    * `NODE_INGRESS_CONTRACT_ADDRESS`.

1. If they exist, rename the following environment variables:
    * `PANTHEON_NODE_PERM_ACCOUNT` to `BESU_NODE_PERM_ACCOUNT`
    * `PANTHEON_NODE_PERM_KEY` to `BESU_NODE_PERM_KEY`
    * `PANTHEON_NODE_PERM_ENDPOINT` to `BESU_NODE_PERM_ENDPOINT`.

### 4. Deploy the contract

If using a `.env` file to configure [environment variables](#3-update-environment-variables), then
copy the file to the `permissioning-smart-contracts` directory.

In the `permissioning-smart-contracts` directory, deploy the Admin, Rules, and ingress
contracts:

```bash
yarn truffle migrate --reset
```

!!! important

    Copy the `NodeIngress` and `AccountIngress` contract addresses which are displayed in the
    output. These must be specified when restarting the nodes.

### 5. Start the permissioning management dapp

1. In the `permissioning-smart-contracts` directory, start the Web server serving the dapp:

    ```bash
    yarn start
    ```

The dapp displays at [`http://localhost:3000`](http://localhost:3000).

### 6. Restart Besu nodes

Restart the Besu nodes and include the updated [`NodeIngress` and `AccountIngress`](#4-deploy-the-contract)
contract addresses and [permissioning contract interface](../../../HowTo/Limit-Access/Specify-Perm-Version.md)
version.

```cmd
besu --data-path=data --genesis-file=../cliqueGenesis.json --permissions-accounts-contract-enabled --permissions-accounts-contract-address "0x3d49d1eF2adE060a33c6E6Aa213513A7EE9a6241" --permissions-nodes-contract-enabled  --permissions-nodes-contract-address "0x4E72770760c011647D4873f60A3CF6cDeA896CD8" --permissions-nodes-contract-version=2 --rpc-http-enabled --rpc-http-cors-origins="*" --rpc-http-api=ADMIN,ETH,NET,PERM,CLIQUE --host-allowlist="*"
```

In the command, the following options have been updated:

* The address of the permissioned accounts contract (`AccountIngress` contract address) using
    [`--permissions-accounts-contract-address`](../../../Reference/CLI/CLI-Syntax.md#permissions-accounts-contract-address)
* The address of the permissioned nodes contract (`NodeIngress` contract address) using
    [`--permissions-nodes-contract-address`](../../../Reference/CLI/CLI-Syntax.md#permissions-nodes-contract-address)
* Set [`--permissions-nodes-contract-version`](../../../Reference/CLI/CLI-Syntax.md#permissions-nodes-contract-version)
    to `2`.

### 7. Add nodes to the allowlist

In the [permissioning management dapp started earlier](#5-start-the-permissioning-management-dapp)
add the [nodes to the allowlist].

<!--link-->
[nodes to the allowlist]: ../../../HowTo/Limit-Access/Updating-Permission-Lists.md#update-nodes-allowlist
