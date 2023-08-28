---
title: Upgrade permissioning contracts
sidebar_position: 2
description: Upgrade the permissioning contracts for onchain permissioning
tags:
  - private networks
---

# Upgrade permissioning contracts

The following tutorial describes the steps to upgrade the onchain permissioning contracts to the latest version.

:::caution Please use this as reference material only!

The [permissioning-contract-repo](https://github.com/ConsenSys/permissioning-smart-contracts) has been archived and is intended as reference material only.
Please update all dependencies in there before proceeding. 

In addition we also recommend using [Hardhat](https://hardhat.org/hardhat-runner/docs/guides/deploying) instead of [Truffle](https://trufflesuite.com/),
as the development environment. Please refer to the [Quorum Dev Quickstart](../../tutorials/quickstart.md) for an example.

:::

## Prerequisites

<!-- vale off -->

- [Node.js](https://nodejs.org/en/) v10.16.0 or later
<!-- vale on -->
- [Yarn](https://yarnpkg.com/en/) v1.15 or later
- Browser with [MetaMask installed](https://metamask.io/).


## Steps


### 1. Get the latest contracts and install dependencies

:::note

Pull the latest changes if you already have a cloned repository using the `git pull` command inside the `permissioning-smart-contracts` directory.

:::

1. Clone the `permissioning-smart-contracts` repository:

   ```bash
   git clone https://github.com/ConsenSys/permissioning-smart-contracts.git
   ```

### 3. Update environment variables

If using a `.env` file to configure environment variables, then the file must be in the `permissioning-smart-contracts` directory.

:::tip

You can use environment variables to retain existing contracts if required. For example:

- `RETAIN_ADMIN_CONTRACT=true` to retain the current admin list
- `RETAIN_NODE_RULES_CONTRACT=true` to retain the current Node rules contract
- `RETAIN_ACCOUNT_RULES_CONTRACT=true` to retain the current Account rules contract

:::

1.  Legacy: If they exist, rename the following environment variables:

    - `PANTHEON_NODE_PERM_ACCOUNT` to `BESU_NODE_PERM_ACCOUNT`
    - `PANTHEON_NODE_PERM_KEY` to `BESU_NODE_PERM_KEY`
    - `PANTHEON_NODE_PERM_ENDPOINT` to `BESU_NODE_PERM_ENDPOINT`

2.  If updating from v1 to v2, you need to re-deploy the `NodeIngress` contract. In order to do this, first delete the `NODE_INGRESS_CONTRACT_ADDRESS` environment variable.

    :::important

    This step is only required if upgrading from v1 of the node permissioning contract to v2 (because the interface changed, a new `NodeIngress` contract must be deployed).

    :::

### 4. Optional: Export current allowlists

:::note

This step enables you to export the current allowlists to assist in updating.

:::

1. Export the current allowlists by setting the following environment variables:

   ```bash
   RETAIN_ADMIN_CONTRACT=true
   RETAIN_NODE_RULES_CONTRACT=true
   RETAIN_ACCOUNT_RULES_CONTRACT=true
   ```

2. Log the current allowlists to console:

   ```bash
   truffle migrate --reset
   ```

   The migration scripts will log the existing allowlists to the console, but no contracts will be deployed.

3. Set initial values for updated deployment using the values logged in the previous step:

   ```bash
   INITIAL_ADMIN_ACCOUNTS=<list-of-admins>
   INITIAL_ALLOWLISTED_ACCOUNTS=<list-of-accounts>
   INITIAL_ALLOWLISTED_NODES=<list-of-enode-urls>
   ```

4. Update environment variables for contracts that are to be deployed. For example:

   ```bash
   RETAIN_ADMIN_CONTRACT=true
   RETAIN_NODE_RULES_CONTRACT=false
   RETAIN_ACCOUNT_RULES_CONTRACT=false
   ```

### 5. Deploy the contracts

1.  In the `permissioning-smart-contracts` directory, deploy the contracts:

    ```bash
    truffle migrate --reset
    ```

    :::important

    - If updating from v1 to v2, the new `NodeIngress` contract address must be specified when restarting the Besu nodes. Copy this address from the migration output. For example:

    ```bash
    > Deployed NodeIngress contract to address = 0x12B1f953395080A13AeED0dC4d0bb14e787A91cF
    ```

    - If upgrading from v2 (using separate storage contracts) copy the `Storage` contract addresses displayed in the output. For example:

    ```
    > Deployed NodeStorage contract to address = 0x4F3e35A3Be3C1b77Ade39969D175C743ad3484Ee
    ...
    > Deployed AccountStorage contract to address = 0x2362187023D738034B516438Af187356b31E8Fb8
    ```

    :::

1.  Set the storage contract address environment variables to ensure that the storage contracts are not re-deployed. For example:

    ```bash
    NODE_STORAGE_CONTRACT_ADDRESS=0xE0bF6021e023a197DBb3fABE64efA880E13D3f4b
    ACCOUNT_STORAGE_CONTRACT_ADDRESS=0x7153CCD1a20Bbb2f6dc89c1024de368326EC6b4F
    ```

1.  Deploy the updated contracts:

    ```bash
    truffle migrate --reset
    ```

### 6. Restart Besu nodes

Restart the Besu nodes with the updated [`NodeIngress`](#5-deploy-the-contracts) contract address and [permissioning contract interface](../../how-to/use-permissioning/onchain.md#specify-the-permissioning-contract-interface-version) version 2.

```besu
cmd besu --data-path=data --genesis-file=../genesis.json --permissions-accounts-contract-enabled --permissions-accounts-contract-address "0x0000000000000000000000000000000000008888" --permissions-nodes-contract-enabled --permissions-nodes-contract-address "0x4E72770760c011647D4873f60A3CF6cDeA896CD8" --permissions-nodes-contract-version=2 --rpc-http-enabled --rpc-http-cors-origins="*" --rpc-http-api=ADMIN,ETH,NET,PERM,IBFT --host-allowlist="*"
```

<!--link-->

[nodes to the allowlist]: ../../how-to/use-permissioning/onchain.md#update-nodes-allowlist
