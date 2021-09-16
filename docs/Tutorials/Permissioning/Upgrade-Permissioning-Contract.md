---
description: Upgrade the permissioning contract for onchain permissioning
---

# Upgrade the permissioning contracts - v2.0 +

The following tutorial describes the steps to upgrade the permissioning contracts to the latest
version when using onchain permissioning contracts, which (from version 2.0.1 onward) include separated storage.

## Prerequisites

For the development server to run the dapp:

<!-- vale off -->
* [Node.js](https://nodejs.org/en/) v10.16.0 or later
<!-- vale on -->
* [Yarn](https://yarnpkg.com/en/) v1.15 or later
* Browser with [MetaMask installed](https://metamask.io/).

## Steps

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

1. Legacy: If they exist, rename the following environment variables:
    * `PANTHEON_NODE_PERM_ACCOUNT` to `BESU_NODE_PERM_ACCOUNT`
    * `PANTHEON_NODE_PERM_KEY` to `BESU_NODE_PERM_KEY`
    * `PANTHEON_NODE_PERM_ENDPOINT` to `BESU_NODE_PERM_ENDPOINT`.

!!! important

    This step is only required if upgrading from v1 of the node permissioning contract
    to v2 (because the interface changed, a new NodeIngress contract must be deployed).

1. If migrating from v1 to v2, delete the following environment variable:
    * `NODE_INGRESS_CONTRACT_ADDRESS`.

#### 4. Optional: export current allowlists

!!! note

    If you want to export the current allowlists to assist in migrating.

1. Export the current allowlists by setting the following environment variables:

    ```bash
    RETAIN_ADMIN_CONTRACT=true
    RETAIN_NODE_RULES_CONTRACT=true
    RETAIN_ACCOUNT_RULES_CONTRACT=true
    ```

1. Log the current rules to console:

    ```bash
    truffle migrate
    ```

    The existing rules will be logged to console, but no contracts will be deployed. Save these existing rules to enter at the next step.

1. Set initial values for updated deployment:

    Using the values from the previous step, set the following environment variables as required:

    ```bash
    INITIAL_ADMIN_ACCOUNTS=
    INITIAL_ALLOWLISTED_ACCOUNTS=
    INITIAL_ALLOWLISTED_NODES=
    ```

1. Update environment variables for contracts that are to be deployed. For example:

    ```bash
        RETAIN_ADMIN_CONTRACT=true
        RETAIN_NODE_RULES_CONTRACT=false
        RETAIN_ACCOUNT_RULES_CONTRACT=false
    ```

1. Deploy the updated Rules contracts using truffle:

    ```bash
    truffle migrate
    ```

    !!! important

        This will set the storage owner to the newly deployed contract version.        

### 5. Deploy the contracts

If using a `.env` file to configure [environment variables](#3-update-environment-variables), then
copy the file to the `permissioning-smart-contracts` directory.

In the `permissioning-smart-contracts` directory, deploy the Admin, Rules, and Ingress
contracts:

```bash
yarn truffle migrate --reset
```

!!! important

    If migrating from v1 to v2, copy the `NodeIngress` contract address which is displayed in the output. This must be specified when restarting the Besu nodes.

!!! note

    These steps apply only if upgrading from v2.0.1 or later, with separate storage contracts.

1. Set the storage contract address environment variables to ensure that the storage contracts are not re-deployed. For example:

    ```bash
    ACCOUNT_STORAGE_CONTRACT_ADDRESS=0x7153CCD1a20Bbb2f6dc89c1024de368326EC6b4F
    NODE_STORAGE_CONTRACT_ADDRESS=0xE0bF6021e023a197DBb3fABE64efA880E13D3f4b
    ```

    These addresses will be logged when the contracts are deployed.

    !!! tip

        You can use environment variables to retain existing contracts if required. For example:

        * `RETAIN_ADMIN_CONTRACT` to retain the current admin list
        * `RETAIN_NODE_RULES_CONTRACT` to retain the current Node rules contract
        * `RETAIN_ACCOUNT_RULES_CONTRACT` to retain the current Account rules contract

1. Deploy the updated Rules contracts using truffle:

    ```bash
    truffle migrate
    ```

    !!! important

        This will set the storage owner to the newly deployed contract version.

### 5. Start the Permissioning Management Dapp

In the `permissioning-smart-contracts` directory, start the webserver serving the Dapp:

    ```bash
    yarn start
    ```

The Dapp displays at [`http://localhost:3000`](http://localhost:3000).

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

In the [Permissioning Management Dapp](#5-start-the-permissioning-management-dapp)
add the [nodes to the allowlist].

<!--link-->
[nodes to the allowlist]: ../../../HowTo/Limit-Access/Updating-Permission-Lists.md#update-nodes-allowlist
