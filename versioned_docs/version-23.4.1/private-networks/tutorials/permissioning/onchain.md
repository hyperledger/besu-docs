---
title: Get started with onchain permissioning
sidebar_position: 1
description: Setting up and using Hyperledger Besu onchain permissioning
tags:
  - private networks
---

# Get started with onchain permissioning

The following steps describe bootstrapping a permissioned network using a Hyperledger Besu node.

This tutorial configures permissioning on a [IBFT 2.0 proof of authority (PoA)] network.

## Prerequisites

- [Node.js](https://nodejs.org/en/) v10.16.0 or later
- [Yarn](https://yarnpkg.com/en/) v1.15 or later
- Browser with [MetaMask installed](https://metamask.io/)

## Steps

### 1. Create folders

Each node requires a data directory for the blockchain data.

Create directories for your permissioned network and each of the three nodes, and a data directory for each node:

```bash
Permissioned-Network/
├── Node-1
│   ├── data
├── Node-2
│   ├── data
└── Node-3
│   ├── data
└── Node-4
    ├── data
```

### 2. Create the configuration file

The configuration file defines the [IBFT 2.0 genesis file](../../how-to/configure/consensus/ibft.md#genesis-file) and the number of node key pairs to generate.

The configuration file has two nested JSON nodes. The first is the `genesis` property defining the IBFT 2.0 genesis file, except for the `extraData` string, which Besu generates automatically in the resulting genesis file. The second is the `blockchain` property defining the number of key pairs to generate.

Copy the following configuration file definition to a file called `ibftConfigFile.json` and save it in the `Permissioned-Network` directory:

```json
{
  "genesis": {
    "config": {
      "chainId": 1337,
      "berlinBlock": 0,
      "ibft2": {
        "blockperiodseconds": 2,
        "epochlength": 30000,
        "requesttimeoutseconds": 4
      }
    },
    "nonce": "0x0",
    "timestamp": "0x58ee40ba",
    "gasLimit": "0x47b760",
    "difficulty": "0x1",
    "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
      "fe3b557e8fb62b89f4916b721be55ceb828dbd73": {
        "privateKey": "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
        "comment": "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
        "balance": "0xad78ebc5ac6200000"
      },
      "627306090abaB3A6e1400e9345bC60c78a8BEf57": {
        "privateKey": "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
        "comment": "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
        "balance": "90000000000000000000000"
      },
      "f17f52151EbEF6C7334FAD080c5704D77216b732": {
        "privateKey": "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f",
        "comment": "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
        "balance": "90000000000000000000000"
      }
    }
  },
  "blockchain": {
    "nodes": {
      "generate": true,
      "count": 4
    }
  }
}
```

:::critical Security warning

Don't use the accounts in the genesis file on Mainnet or any public network except for testing. The private keys display, which means the accounts are not secure.

:::

### 3. Generate node keys and a genesis file

In the `Permissioned-Network` directory, generate the node key and genesis file:

```bash
besu operator generate-blockchain-config --config-file=ibftConfigFile.json --to=networkFiles --private-key-file-name=key
```

Besu creates the following in the `networkFiles` directory:

- `genesis.json` - The genesis file including the `extraData` property specifying the four nodes are validators.
- A directory for each node named using the node address and containing the public and private key for each node.

```bash
networkFiles/
├── genesis.json
└── keys
    ├── 0x438821c42b812fecdcea7fe8235806a412712fc0
    │   ├── key
    │   └── key.pub
    ├── 0xca9c2dfa62f4589827c0dd7dcf48259aa29f22f5
    │   ├── key
    │   └── key.pub
    ├── 0xcd5629bd37155608a0c9b28c4fd19310d53b3184
    │   ├── key
    │   └── key.pub
    └── 0xe96825c5ab8d145b9eeca1aba7ea3695e034911a
        ├── key
        └── key.pub
```

### 4. Copy the genesis file to the Permissioned-Network directory

Copy the `genesis.json` file to the `Permisssioned-Network` directory.

### 5. Add the Ingress contracts to the genesis file

:::tip

If the network is using only account or node permissioning, add only the relevant Ingress contract to the genesis file.

:::

Add the Ingress contracts to the genesis file for your network by copying them from [`genesis.json`](https://github.com/ConsenSys/permissioning-smart-contracts/blob/e6c2d4d5a728c11cdb8e97a07ddda3c0bfb57b5d/genesis.json) in the [`permissioning-smart-contracts` repository](https://github.com/ConsenSys/permissioning-smart-contracts) to the `alloc` section of the contract:

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

:::info

To support the permissioning contracts, ensure your genesis file includes at least the `constantinopleFixBlock` milestone.

The permissioning contract has multiple interfaces, and each interface maps to a specific version of the [Enterprise Ethereum Alliance Client Specification](https://entethalliance.org/technical-specifications/). Ensure that you specify the [permissioning contract interface](../../how-to/use-permissioning/onchain.md) being used when starting Besu.

:::

### 6. Copy the node private keys to the node directories

For each node, copy the key files to the `data` directory for that node

```bash
Permissioned-Network/
├── genesis.json
├── Node-1
│   ├── data
│   │    ├── key
│   │    ├── key.pub
├── Node-2
│   ├── data
│   │    ├── key
│   │    ├── key.pub
├── Node-3
│   ├── data
│   │    ├── key
│   │    ├── key.pub
├── Node-4
│   ├── data
│   │    ├── key
│   │    ├── key.pub
```

### 7. Start Node-1

:::info

The specified node must be producing blocks, that is, be a miner (PoW networks) or validator (PoA networks).

To allow MetaMask to connect, the node must have JSON-RPC HTTP enabled, and have `--rpc-http-cors-origins` set to allow MetaMask.

If your network is not a [free gas network](../../how-to/configure/free-gas.md), the account used to interact with the permissioning contracts must have a balance.

:::

Start the first node with command line options to enable onchain permissioning and the location of the **data** folder and genesis file:

```cmd
besu --data-path=data --genesis-file=../genesis.json --permissions-accounts-contract-enabled --permissions-accounts-contract-address "0x0000000000000000000000000000000000008888" --permissions-nodes-contract-enabled  --permissions-nodes-contract-address "0x0000000000000000000000000000000000009999" --permissions-nodes-contract-version=2 --rpc-http-enabled --rpc-http-cors-origins="*" --rpc-http-api=ADMIN,ETH,NET,PERM,IBFT --host-allowlist="*"
```

On the command line:

- Enable onchain accounts permissioning using [`--permissions-accounts-contract-enabled`](../../reference/cli/options.md#permissions-accounts-contract-enabled).
- Set the address of the Account Ingress contract in the genesis file using [`--permissions-accounts-contract-address`](../../reference/cli/options.md#permissions-accounts-contract-address).
- Enable onchain nodes permissioning using [`--permissions-nodes-contract-enabled`](../../reference/cli/options.md#permissions-nodes-contract-enabled).
- Set the address of the Node Ingress contract in the genesis file using [`--permissions-nodes-contract-address`](../../reference/cli/options.md#permissions-nodes-contract-address).
- Set the version of the [permissioning contract interface](../../how-to/use-permissioning/onchain.md#specify-the-permissioning-contract-interface-version) using [`--permissions-nodes-contract-version`](../../reference/cli/options.md#permissions-nodes-contract-version).
- Enable the JSON-RPC API using [`--rpc-http-enabled`](../../../public-networks/reference/cli/options.md#rpc-http-enabled).
- Enable the `ADMIN`, `ETH`, `NET`, `PERM`, and `IBFT` APIs using [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api).
- Allow all-host access to the HTTP JSON-RPC API using [`--host-allowlist`](../../../public-networks/reference/cli/options.md#host-allowlist).
- Allow all-domain access to the node through the HTTP JSON-RPC API using [`--rpc-http-cors-origins`](../../../public-networks/reference/cli/options.md#rpc-http-cors-origins).

When the node starts, the [enode URL](../../../public-networks/concepts/node-keys.md#enode-url) displays. Copy the enode URL to use when starting Node-2, Node-3, and Node-4.

### 8. Start Node-2

Use the following command to start Node-2:

```cmd
besu --data-path=data --genesis-file=../genesis.json --bootnodes=<Node-1 Enode URL> --permissions-accounts-contract-enabled --permissions-accounts-contract-address "0x0000000000000000000000000000000000008888" --permissions-nodes-contract-enabled  --permissions-nodes-contract-address "0x0000000000000000000000000000000000009999" --permissions-nodes-contract-version=2 --rpc-http-enabled --rpc-http-cors-origins="*" --rpc-http-api=ADMIN,ETH,NET,PERM,IBFT --host-allowlist="*" --p2p-port=30304 --rpc-http-port=8546
```

The command line specifies:

- A different port to Node-1 for P2P discovery using [`--p2p-port`](../../../public-networks/reference/cli/options.md#p2p-port).
- A different port to Node-1 for HTTP JSON-RPC using [`--rpc-http-port`](../../../public-networks/reference/cli/options.md#rpc-http-port).
- The enode URL of Node-1 using [`--bootnodes`](../../../public-networks/reference/cli/options.md#bootnodes).
- Other options as for [Node-1](#7-start-node-1).

### 9. Start Node-3

Use the following command to start Node-3:

```cmd
besu --data-path=data --genesis-file=../genesis.json --bootnodes=<Node-1 Enode URL> --permissions-accounts-contract-enabled --permissions-accounts-contract-address "0x0000000000000000000000000000000000008888" --permissions-nodes-contract-enabled  --permissions-nodes-contract-address "0x0000000000000000000000000000000000009999" --permissions-nodes-contract-version=2 --rpc-http-enabled --rpc-http-cors-origins="*" --rpc-http-api=ADMIN,ETH,NET,PERM,IBFT --host-allowlist="*" --p2p-port=30305 --rpc-http-port=8547
```

The command line specifies:

- A different port to Node-1 and Node-2 for P2P discovery using [`--p2p-port`](../../../public-networks/reference/cli/options.md#p2p-port).
- A different port to Node-1 and Node-2 for HTTP JSON-RPC using [`--rpc-http-port`](../../../public-networks/reference/cli/options.md#rpc-http-port).
- The enode URL of Node-1 using [`--bootnodes`](../../../public-networks/reference/cli/options.md#bootnodes).
- Other options as for [Node-1](#7-start-node-1).

### 10. Start Node-4

Use the following command to start Node-4:

```cmd
besu --data-path=data --genesis-file=../genesis.json --bootnodes=<Node-1 Enode URL> --permissions-accounts-contract-enabled --permissions-accounts-contract-address "0x0000000000000000000000000000000000008888" --permissions-nodes-contract-enabled  --permissions-nodes-contract-address "0x0000000000000000000000000000000000009999" --permissions-nodes-contract-version=2 --rpc-http-enabled --rpc-http-cors-origins="*" --rpc-http-api=ADMIN,ETH,NET,PERM,IBFT --host-allowlist="*" --p2p-port=30306 --rpc-http-port=8548
```

The command line specifies:

- A different port to Node-1, Node-2, and Node-3 for P2P discovery using [`--p2p-port`](../../../public-networks/reference/cli/options.md#p2p-port).
- A different port to Node-1, Node-2, and Node-3 for HTTP JSON-RPC using [`--rpc-http-port`](../../../public-networks/reference/cli/options.md#rpc-http-port).
- The enode URL of Node-1 using [`--bootnodes`](../../../public-networks/reference/cli/options.md#bootnodes).
- Other options as for [Node-1](#7-start-node-1).

:::tip

If your nodes are having trouble connecting as peers, update the `--bootnodes` option for each node to include all four enode URLs.

:::

### 11. Clone the contracts and install dependencies

Clone the `permissioning-smart-contracts` repository:

```bash
git clone https://github.com/ConsenSys/permissioning-smart-contracts.git
```

Change into the `permissioning-smart-contracts` directory.

### 12. Set the environment variables

Create the following environment variables and set to the specified values:

- `BESU_NODE_PERM_ACCOUNT` - Account to deploy the permissioning contracts and become the first admin account.
- `BESU_NODE_PERM_KEY` - Private key of the account to deploy the permissioning contracts.
- `ACCOUNT_INGRESS_CONTRACT_ADDRESS` - Address of the Account Ingress contract in the genesis file.
- `NODE_INGRESS_CONTRACT_ADDRESS` - Address of the Node Ingress contract in the genesis file.
- `BESU_NODE_PERM_ENDPOINT` - Required only if your node is not using the default JSON-RPC host and port (`http://127.0.0.1:8545`). Set to JSON-RPC host and port. When bootstrapping the network, Besu uses the specified node to deploy the contracts and is the first node in the network.
- `CHAIN_ID` - The chain ID from the genesis file.
- `INITIAL_ALLOWLISTED_NODES`(optional) - The enode URLs of permitted nodes. Specify multiple nodes (Node-1, Node-2, Node-3) as a comma-separated list.

:::tip

A simple way to set multiple environment variables is to create a file called `.env` with the required settings:

```env
NODE_INGRESS_CONTRACT_ADDRESS=0x0000000000000000000000000000000000009999
ACCOUNT_INGRESS_CONTRACT_ADDRESS=0x0000000000000000000000000000000000008888
BESU_NODE_PERM_ACCOUNT=627306090abaB3A6e1400e9345bC60c78a8BEf57
BESU_NODE_PERM_KEY=c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
BESU_NODE_PERM_ENDPOINT=http://127.0.0.1:8545
CHAIN_ID=1337
INITIAL_ALLOWLISTED_NODES=enode://c35c3...d615f@1.2.3.4:30303,enode://f42c13...fc456@1.2.3.5:30303
```

If using a `.env` file, save the file to the `permissioning-smart-contracts` directory.

:::

### 13. Deploy the contracts

In the `permissioning-smart-contracts` directory, while your network is running, deploy the Admin and Rules contracts:

```bash
yarn truffle migrate --reset --network besu
```

This also updates the Ingress contract with the name and version of the Admin and Rules contracts. The migration logs the addresses of the Admin and Rules contracts.

:::important

The account that deploys the contracts is automatically an admin account.

:::

<!-- Links -->

[Node-1, Node-2, Node-3, and Node-4 to the allowlist]: ../../how-to/use-permissioning/onchain.md#update-nodes-allowlist
[IBFT 2.0 proof of authority (PoA)]: ../../how-to/configure/consensus/ibft.md
