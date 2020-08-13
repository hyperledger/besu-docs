---
description: Hyperledger Besu private network using Ethash (Proof of Work) Consensus Protocol tutorial
---

# Create a private network using the Ethash (Proof of Work) consensus protocol

A private network provides a configurable network for testing. By configuring a low difficulty and
enabling mining, this allows for fast block creation.

You can test multi-block and multi-user scenarios on a private network before moving to one of the
public testnets.

!!!important

    The steps in this tutorial create an isolated, but not protected or secure, Ethereum private
    network. We recommend running the private network behind a properly configured firewall.

## Prerequisites

* [Hyperledger Besu](../../HowTo/Get-Started/Install-Binaries.md)
* [Curl (or similar web service client)](https://curl.haxx.se/download.html).

## Steps

Listed on the right-hand side of the page are the steps to create a private network using Ethash.

### 1. Create directories

Each node requires a data directory for the blockchain data. When the node starts, Besu saves the
[node key](../../Concepts/Node-Keys.md) in this directory.

Create directories for your private network, each of the three nodes, and a data directory for each
node:

```bash
Private-Network/
├── Node-1
│   ├── data
├── Node-2
│   ├── data
└── Node-3
    ├── data
```

### 2. Create a genesis file

The genesis file defines the genesis block of the blockchain (that is, the start of the
blockchain). The genesis file includes entries for configuring the blockchain, such as the mining
difficulty and initial accounts and balances.

All nodes in a network must use the same genesis file. The
[network ID](../../Concepts/NetworkID-And-ChainID.md) defaults to the `chainID` in the genesis
file. The `fixeddifficulty` enables fast block mining.

Copy the following genesis definition to a file called `privateNetworkGenesis.json` and save it in
the `Private-Network` directory:

```json
{
  "config": {
      "constantinoplefixblock": 0,
      "ethash": {
        "fixeddifficulty": 1000
      },
       "chainID": 1981
   },
  "nonce": "0x42",
  "gasLimit": "0x1000000",
  "difficulty": "0x10000",
  "alloc": {
    "fe3b557e8fb62b89f4916b721be55ceb828dbd73": {
      "privateKey": "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
      "comment": "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
      "balance": "0xad78ebc5ac6200000"
    },
    "f17f52151EbEF6C7334FAD080c5704D77216b732": {
      "privateKey": "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f",
      "comment": "private key and this comment are ignored.  In a real chain, the private key should NOT be stored",
      "balance": "90000000000000000000000"
    }
  }
}
```

!!! warning

    Do not use the accounts in `alloc` in the genesis file on MainNet or any public network except
    for testing. The private keys display, which means the accounts are not secure.

### 3. Start the first node as a bootnode

Start Node-1:

=== "MacOS"

    ```bash
    besu --data-path=data --genesis-file=../privateNetworkGenesis.json --miner-enabled --miner-coinbase fe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-enabled --host-allowlist="*" --rpc-http-cors-origins="all"
    ```

=== "Windows"

    ```bash
    besu --data-path=data --genesis-file=..\privateNetworkGenesis.json --miner-enabled --miner-coinbase fe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-enabled --host-allowlist="*" --rpc-http-cors-origins="all"
    ```

The command line enables:

* Mining and specifies the account to pay mining rewards to using the
  [`--miner-enabled`](../../Reference/CLI/CLI-Syntax.md#miner-enabled) and
  [`--miner-coinbase`](../../Reference/CLI/CLI-Syntax.md#miner-coinbase) options.
* JSON-RPC API using the [`--rpc-http-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled)
  option.
* All-host access to the HTTP JSON-RPC API using the
  [`--host-allowlist`](../../Reference/CLI/CLI-Syntax.md#host-allowlist) option.
* All-domain access to the node through the HTTP JSON-RPC API using the
  [`--rpc-http-cors-origins`](../../Reference/CLI/CLI-Syntax.md#rpc-http-cors-origins) option.

!!! info

    The miner coinbase account is one of the accounts defined in the genesis file.

When the node starts, the [enode URL](../../Concepts/Node-Keys.md#enode-url) displays. Copy the
enode URL to specify Node-1 as the bootnode in the following steps.

![Node 1 Enode URL](../../images/EnodeStartup.png)

### 4. Start Node-2

Start another terminal, change to the `Node-2` directory and start Node-2 specifying the Node-1
enode URL copied when starting Node-1 as the bootnode:

=== "MacOS"

    ```bash
    besu --data-path=data --genesis-file=../privateNetworkGenesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30304
    ```

=== "Windows"

    ```bash
    besu --data-path=data --genesis-file=..\privateNetworkGenesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30304
    ```

The command line specifies:

* A different port to Node-1 for P2P peer discovery using the
  [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) option.
* The enode URL for Node-1 using the
  [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) option.
* A data directory for Node-2 using the
  [`--data-path`](../../Reference/CLI/CLI-Syntax.md#data-path) option.
* A genesis file as for Node-1.

### 5. Start Node-3

Start another terminal, change to the `Node-3` directory and start Node-3 specifying the Node-1
enode URL copied when starting Node-1 as the bootnode:

=== "MacOS"

    ```bash
    besu --data-path=data --genesis-file=../privateNetworkGenesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30305
    ```

=== "Windows"

    ```bash
    besu --data-path=data --genesis-file=..\privateNetworkGenesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30305
    ```

The command line specifies:

* A different port to Node-1 and Node-2 for P2P peer discovery.
* A data directory for Node-3 using the
  [`--data-path`](../../Reference/CLI/CLI-Syntax.md#data-path) option.
* A bootnode and genesis file as for Node-2.

### 6. Confirm the private network is working

Start another terminal, use curl to call the JSON-RPC API
[`net_peerCount`](../../Reference/API-Methods.md#net_peercount) method and confirm the nodes are
functioning as peers:

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' localhost:8545
```

The result confirms Node-1 (the node running the JSON-RPC service) has two peers (Node-2 and
Node-3):

```json
{
  "jsonrpc" : "2.0",
  "id" : 1,
  "result" : "0x2"
}
```

## Next steps

Import accounts to MetaMask and send transactions as described in the
[private network example tutorial].

!!! info

    Besu does not support
    [private key management](../../HowTo/Send-Transactions/Account-Management.md).

Send transactions using `eth_sendRawTransaction` to
[send ether or, deploy or invoke contracts](../../HowTo/Send-Transactions/Transactions.md).

Use the [JSON-RPC API](../../HowTo/Interact/APIs/Using-JSON-RPC-API.md).

Start a node with the [`--rpc-ws-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-enabled) option
and use the [RPC Pub/Sub API](../../HowTo/Interact/APIs/RPC-PubSub.md).

## Stop the nodes

When finished using the private network, stop all nodes using ++ctrl+c++ in each terminal window.

!!!tip

    To restart the private network in the future, start from
    [3. Start the first node as a bootnode](#3-start-the-first-node-as-a-bootnode).

<!-- Links -->
[private network example tutorial]: ../Examples/Private-Network-Example.md#creating-a-transaction-using-metamask
