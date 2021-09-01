---
description: Setting up and using Hyperledger Besu onchain permissioning
---

# Get started with onchain permissioning

The following steps describe bootstrapping a permissioned network using a Hyperledger Besu
node and a development server to run the Permissioning Management Dapp.

This tutorial configures permissioning on a [Clique Proof-of-Authority (PoA)] network.

!!! note

    Production environments require a webserver to [host the Permissioning Management Dapp](../../HowTo/Deploy/Production.md).

## Prerequisites

For the development server to run the dapp:

<!-- vale off -->
* [Node.js](https://nodejs.org/en/) v10.16.0 or later
<!-- vale on -->
* [Yarn](https://yarnpkg.com/en/) v1.15 or later
* Browser with [MetaMask installed](https://metamask.io/).

## Steps

Listed on the right-hand side of the page are the steps to create a permissioned network.

### 1. Create folders

Each node requires a data directory for the blockchain data. When the node starts, Besu saves the
[node key](../../Concepts/Node-Keys.md) in this directory.

Create directories for your permissioned network, each of the three nodes, and a data directory for
each node:

```bash
Permissioned-Network/
├── Node-1
│   ├── data
├── Node-2
│   ├── data
└── Node-3
    ├── data
```

### 2. Get the address of Node-1

In networks using Clique, you must include the address of at least one initial signer in the
genesis file. For this network, we'll use Node-1 as the initial signer. This requires obtaining the
address for Node-1.

To retrieve the address for Node-1, in the `Node-1` directory, use the
[`public-key export-address`](../../Reference/CLI/CLI-Syntax.md#public-key) subcommand to write the
node address to the specified file (`nodeAddress1` in this example).

=== "MacOS"

    ```bash
    besu --data-path=data public-key export-address --to=data/nodeAddress1
    ```

=== "Windows"

    ```bash
    besu --data-path=data public-key export-address --to=data\nodeAddress1
    ```

### 3. Create the genesis file

The genesis file defines the genesis block of the blockchain (that is, the start of the
blockchain). The
[Clique genesis file](../../HowTo/Configure/Consensus-Protocols/Clique.md#genesis-file) includes
the address of Node-1 as the initial signer in the `extraData` field.

All nodes in a network must use the same genesis file.

Copy the following genesis definition to a file called `cliqueGenesis.json` and save it in the
`Permissioned-Network` directory:

```json
{
  "config":{
    "chainId":1981,
    "constantinoplefixblock": 0,
    "clique":{
      "blockperiodseconds":15,
      "epochlength":30000
    }
  },
  "coinbase":"0x0000000000000000000000000000000000000000",
  "difficulty":"0x1",

"extraData":"0x0000000000000000000000000000000000000000000000000000000000000000<Node 1 Address>0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit":"0xa00000",
  "mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
  "nonce":"0x0",
  "timestamp":"0x5c51a607",
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
   },
  "number":"0x0",
  "gasUsed":"0x0",
  "parentHash":"0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

### 4. Add the ingress contracts to the genesis file

!!! tip

    If the network is using only account or node permissioning, add only the relevant ingress
    contract to the genesis file.

Add the Ingress contracts to the genesis file for your network by copying them from
[`genesis.json`](https://github.com/ConsenSys/permissioning-smart-contracts/blob/master/genesis.json)
in the [`permissioning-smart-contracts` repository](https://github.com/ConsenSys/permissioning-smart-contracts) to
the `alloc` section of the contract:

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

    The permissioning contract has multiple interfaces, and each interface maps to a specific
    version of the Enterprise [Ethereum Alliance Client Specification](https://entethalliance.org/technical-specifications/).
    Ensure that you specify the [permissioning contract interface](../../HowTo/Limit-Access/Specify-Perm-Version.md)
    being used when starting Besu.

### 5. Set the environment variables

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
    BESU_NODE_PERM_ENDPOINT=http://127.0.0.1:9545
    CHAIN_ID=2018
    ```

### 6. Start Node-1

!!! important

    The specified node must be producing blocks, that is, be a miner (PoW networks) or validator (PoA networks).

    To allow MetaMask to connect, the node must have JSON-RPC HTTP enabled, and have `--rpc-http-cors-origins` set to allow MetaMask.

    If your network is not a [free gas network](../../HowTo/Configure/FreeGas.md), the account used
    to interact with the permissioning contracts must have a balance.

Start the first node with command line options to enable onchain permissioning and the location of
the **data** folder and genesis file:

```cmd
besu --data-path=data --genesis-file=../cliqueGenesis.json --permissions-accounts-contract-enabled --permissions-accounts-contract-address "0x0000000000000000000000000000000000008888" --permissions-nodes-contract-enabled  --permissions-nodes-contract-address "0x0000000000000000000000000000000000009999" --permissions-nodes-contract-version=2 --rpc-http-enabled --rpc-http-cors-origins="*" --rpc-http-api=ADMIN,ETH,NET,PERM,CLIQUE --host-allowlist="*"
```

In the command line:

* Enable onchain accounts permissioning using the
    [`--permissions-accounts-contract-enabled`](../../Reference/CLI/CLI-Syntax.md#permissions-accounts-contract-enabled)
    option
* Set the address of the Account Ingress contract in the genesis file using
    [`--permissions-accounts-contract-address`](../../Reference/CLI/CLI-Syntax.md#permissions-accounts-contract-address)
* Enable onchain nodes permissioning using the
    [`--permissions-nodes-contract-enabled`](../../Reference/CLI/CLI-Syntax.md#permissions-nodes-contract-enabled)
    option
* Set the address of the Node Ingress contract in the genesis file using
    [`--permissions-nodes-contract-address`](../../Reference/CLI/CLI-Syntax.md#permissions-nodes-contract-address)
* Set the version of the [permissioning contract interface](../../HowTo/Limit-Access/Specify-Perm-Version.md)
    being used with the [`--permissions-nodes-contract-version`](../../Reference/CLI/CLI-Syntax.md#permissions-nodes-contract-version)
    option
* Enable the JSON-RPC API using the
    [`--rpc-http-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) option
* Enable the ADMIN, ETH, NET, PERM, and CLIQUE APIs using the
    [`--rpc-http-api`](../../Reference/CLI/CLI-Syntax.md#rpc-http-api) option
* Allow all-host access to the HTTP JSON-RPC API using the
    [`--host-allowlist`](../../Reference/CLI/CLI-Syntax.md#host-allowlist) option
* Allow all-domain access to the node through the HTTP JSON-RPC API using the
    [`--rpc-http-cors-origins`](../../Reference/CLI/CLI-Syntax.md#rpc-http-cors-origins) option.

When the node starts, the [enode URL](../../Concepts/Node-Keys.md#enode-url) displays. Copy the
enode URL because it's required when starting Node-2 and Node-3.

### 7. Clone the contracts and install dependencies

1. Clone the `permissioning-smart-contracts` repository:

    ```bash
    git clone https://github.com/ConsenSys/permissioning-smart-contracts.git
    ```

1. Change into the `permissioning-smart-contracts` directory and run:

    ```bash
    yarn install
    ```

### 8. Build the project

In the `permissioning-smart-contracts` directory, build the project:

```bash
yarn run build
```

### 9. Deploy the contracts

If using a `.env` file to configure [environment variables](#5-set-the-environment-variables), then
copy the file to the `permissioning-smart-contracts` directory.

In the `permissioning-smart-contracts` directory, deploy the Admin and Rules contracts:

```bash
yarn truffle migrate --reset
```

This also updates the Ingress contract with the name and version of the Admin and Rules contracts.
The migration logs the addresses of the Admin and Rules contracts.

!!! important

    The account that deploys the contracts is automatically an [admin account].

### 9. Start the permissioning management dapp

!!! note

    Production environments require a Web server to
    [host the permissioning management dapp](../../HowTo/Deploy/Production.md).

1. In the `permissioning-smart-contracts` directory, start the webserver serving the dapp:

    ```bash
    yarn start
    ```

    The dapp displays at [`http://localhost:3000`](http://localhost:3000).

1. Ensure MetaMask connects to your local node (by default [`http://localhost:8545`](http://localhost:8545)).

    A MetaMask notification displays requesting permission for Besu Permissioning to connect to your
    account.

1. Click the _Connect_ button.

    The Dapp displays with the account specified by the `BESU_NODE_PERM_ACCOUNT` environment
    variable in the _Accounts_ and _Admins_ tabs.

!!! note

    Only an [admin account] can add or remove nodes from the allowlist.

### 10. Start Node-2

Use the following command to start Node-2:

```cmd
besu --data-path=data --genesis-file=../cliqueGenesis.json --bootnodes=<Node-1 Enode URL> --permissions-accounts-contract-enabled --permissions-accounts-contract-address "0x0000000000000000000000000000000000008888" --permissions-nodes-contract-enabled  --permissions-nodes-contract-address "0x0000000000000000000000000000000000009999" --permissions-nodes-contract-version=2 --rpc-http-enabled --rpc-http-cors-origins="*" --rpc-http-api=ADMIN,ETH,NET,PERM,CLIQUE --host-allowlist="*" --p2p-port=30304 --rpc-http-port=8546
```

The command line specifies:

* A Different port to Node-1 for P2P discovery using the
  [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) option.
* A Different port to Node-1 for HTTP JSON-RPC using the
  [`--rpc-http-port`](../../Reference/CLI/CLI-Syntax.md#rpc-http-port) option.
* The enode URL of Node-1 using the
  [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) option.
* Other options as for [Node-1](#6-start-node-1)

### 11. Start Node-3

Use the following command to start Node-3:

```cmd
besu --data-path=data --genesis-file=../cliqueGenesis.json --bootnodes=<Node-1 Enode URL> --permissions-accounts-contract-enabled --permissions-accounts-contract-address "0x0000000000000000000000000000000000008888" --permissions-nodes-contract-enabled  --permissions-nodes-contract-address "0x0000000000000000000000000000000000009999" --permissions-nodes-contract-version=2 --rpc-http-enabled --rpc-http-cors-origins="*" --rpc-http-api=ADMIN,ETH,NET,PERM,CLIQUE --host-allowlist="*" --p2p-port=30305 --rpc-http-port=8547
```

The command line specifies:

* A Different port to Node-1 and Node-2 for P2P discovery using the
  [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) option.
* A Different port to Node-1 and Node-2 for HTTP JSON-RPC using the
  [`--rpc-http-port`](../../Reference/CLI/CLI-Syntax.md#rpc-http-port) option.
* The enode URL of Node-1 using the
  [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) option.
* Other options as for [Node-1](#6-start-node-1)

### 12. Add nodes to the allowlist

In the [permissioning management dapp started earlier](#9-start-the-permissioning-management-dapp)
add [Node-1, Node-2, and Node-3 to the allowlist].

<!-- Links -->
[Start first node with onchain permissioning and the JSON-RPC HTTP service enabled]: #onchain-permissioning-command-line-options
[Clone the permissioning contracts repository and install dependencies]: #clone-the-contracts-and-install-dependencies
[Start the webserver for the Permissioning Management Dapp]: #start-the-webserver-for-the-permissioning-management-dapp
[Node-1, Node-2, and Node-3 to the allowlist]: ../../HowTo/Limit-Access/Updating-Permission-Lists.md#update-nodes-allowlist
[admin account]: ../../HowTo/Limit-Access/Updating-Permission-Lists.md#update-nodes-allowlist
[Clique Proof-of-Authority (PoA)]: ../../HowTo/Configure/Consensus-Protocols/Clique.md
