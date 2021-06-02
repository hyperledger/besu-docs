---
description: Hyperledger Besu private network using the Clique (Proof of Authority) consensus protocol
---

# Create a private network using the Clique (Proof of Authority) consensus protocol

A private network provides a configurable network for testing. This private network uses the
[Clique (Proof of Authority) consensus protocol].

!!!important

    The steps in this tutorial create an isolated, but not protected or secure, Ethereum private
    network. We recommend running the private network behind a properly configured firewall.

## Prerequisites

* [Hyperledger Besu](../../HowTo/Get-Started/Installation-Options/Install-Binaries.md)
* [Curl (or similar webservice client)](https://curl.haxx.se/download.html).

## Steps

Listed on the right-hand side of the page are the steps to create a private network using Clique.

### 1. Create directories

Each node requires a data directory for the blockchain data. When the node starts, Besu saves the
[node key](../../Concepts/Node-Keys.md) in this directory.

Create directories for your private network, each of the three nodes, and a data directory for each
node:

```bash
Clique-Network/
├── Node-1
│   ├── data
├── Node-2
│   ├── data
└── Node-3
    ├── data
```

### 2. Get the address for Node-1

In Clique networks, you must include the address of at least one initial signer in the genesis
file. For this Clique network, we'll use Node-1 as the initial signer. This requires obtaining the
address for Node-1.

To get the address for Node-1, in the `Node-1` directory, use the
[`public-key export-address`](../../Reference/CLI/CLI-Subcommands.md#export-address) subcommand to
write the node address to the specified file (`node1Address` in this example).

=== "MacOS"

    ```bash
    besu --data-path=data public-key export-address --to=data/node1Address
    ```

=== "Windows"

    ```bash
    besu --data-path=data public-key export-address --to=data\node1Address
    ```

### 3. Create the genesis file

The genesis file defines the genesis block of the blockchain (that is, the start of the
blockchain). The
[Clique genesis file](../../HowTo/Configure/Consensus-Protocols/Clique.md#genesis-file) includes
the address of Node-1 as the initial signer in the `extraData` field.

All nodes in a network must use the same genesis file.

Copy the following genesis definition to a file called `cliqueGenesis.json` and save it in the
`Clique-Network` directory:

```json
{
  "config":{
    "chainId":1337,
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
}
```

In `extraData`, replace `<Node 1 Address>` with the
[address for Node-1](#2-get-address-for-node-1), excluding the 0x prefix.

!!! example

    ```json
    {
      ...
    "extraData":"0x0000000000000000000000000000000000000000000000000000000000000000b9b81ee349c3807e46bc71aa2632203c5b4620340000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      ...
    }
    ```

!!! warning

    Do not use the accounts in `alloc` in the genesis file on MainNet or any public network except
    for testing. The private keys display, which means the accounts are not secure.

### 4. Start the first node as the bootnode

Start Node-1:

=== "MacOS"

    ```bash
    besu --data-path=data --genesis-file=../cliqueGenesis.json --network-id 123 --rpc-http-enabled --rpc-http-api=ETH,NET,CLIQUE --host-allowlist="*" --rpc-http-cors-origins="all"
    ```

=== "Windows"

    ```bash
    besu --data-path=data --genesis-file=..\cliqueGenesis.json --network-id 123 --rpc-http-enabled --rpc-http-api=ETH,NET,CLIQUE --host-allowlist="*" --rpc-http-cors-origins="all"
    ```

The command line enables:

* The JSON-RPC API using the
  [`--rpc-http-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) option
* The ETH, NET, and CLIQUE APIs using the
  [`--rpc-http-api`](../../Reference/CLI/CLI-Syntax.md#rpc-http-api) option
* All-host access to the HTTP JSON-RPC API using the
  [`--host-allowlist`](../../Reference/CLI/CLI-Syntax.md#host-allowlist) option
* All-domain access to the node through the HTTP JSON-RPC API using the
  [`--rpc-http-cors-origins`](../../Reference/CLI/CLI-Syntax.md#rpc-http-cors-origins) option.

When the node starts, the [enode URL](../../Concepts/Node-Keys.md#enode-url) displays.
Copy the enode URL to specify Node-1 as the bootnode in the following steps.

![Node 1 Enode URL](../../images/EnodeStartup.png)

### 5. Start Node-2

Start another terminal, change to the `Node-2` directory and start Node-2 specifying the Node-1
enode URL copied when starting Node-1 as the bootnode:

=== "MacOS"

    ```bash
    besu --data-path=data --genesis-file=../cliqueGenesis.json --bootnodes=<Node-1 Enode URL> --network-id 123 --p2p-port=30304 --rpc-http-enabled --rpc-http-api=ETH,NET,CLIQUE --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8546
    ```

=== "Windows"

    ```bash
    besu --data-path=data --genesis-file=..\cliqueGenesis.json --bootnodes=<Node-1 Enode URL> --network-id 123 --p2p-port=30304 --rpc-http-enabled --rpc-http-api=ETH,NET,CLIQUE --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8546
    ```

The command line specifies:

* A Different port to Node-1 for P2P discovery using the
  [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) option.
* A Different port to Node-1 for HTTP JSON-RPC using the
  [`--rpc-http-port`](../../Reference/CLI/CLI-Syntax.md#rpc-http-port) option.
* The enode URL of Node-1 using the
  [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) option.
* The data directory for Node-2 using the
  [`--data-path`](../../Reference/CLI/CLI-Syntax.md#data-path) option.
* Other options as for [Node-1](#5-start-first-node-as-bootnode).

### 6. Start Node-3

Start another terminal, change to the `Node-3` directory and start Node-3 specifying the Node-1
enode URL copied when starting Node-1 as the bootnode:

=== "MacOS"

    ```bash
    besu --data-path=data --genesis-file=../cliqueGenesis.json --bootnodes=<Node-1 Enode URL> --network-id 123 --p2p-port=30305 --rpc-http-enabled --rpc-http-api=ETH,NET,CLIQUE --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8547
    ```

=== "Windows"

    ```bash
    besu --data-path=data --genesis-file=..\cliqueGenesis.json --bootnodes=<Node-1 Enode URL> --network-id 123 --p2p-port=30305 --rpc-http-enabled --rpc-http-api=ETH,NET,CLIQUE --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8547
    ```

The command line specifies:

* A different port to Node-1 and Node-2 for P2P discovery using the
  [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) option.
* A different port to Node-1 and Node-2 for HTTP JSON-RPC using the
  [`--rpc-http-port`](../../Reference/CLI/CLI-Syntax.md#rpc-http-port) option.
* The data directory for Node-3 using the
  [`--data-path`](../../Reference/CLI/CLI-Syntax.md#data-path) option.
* The bootnode as for [Node-2](#6-start-node-2)
* Other options as for [Node-1](#5-start-first-node-as-bootnode).

### 7. Confirm the private network is working

Start another terminal, use curl to call the JSON-RPC API
[`net_peerCount`](../../Reference/API-Methods.md#net_peercount) method and confirm the nodes are
functioning as peers:

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' localhost:8545
```

The result confirms Node-1 has two peers (Node-2 and Node-3):

```json
{
  "jsonrpc" : "2.0",
  "id" : 1,
  "result" : "0x2"
}
```

## Next steps

Look at the logs displayed to confirm Node-1 is producing blocks and Node-2 and Node-3 are
importing blocks.

Use the [Clique API to add] Node-2 or Node-3 as a signer.

!!! note

    To add Node-2 or Node-3 as a signer you need the
    [node address as when specifying Node-1](#2-get-address-for-node-1) as the initial signer.

Import accounts to MetaMask and send transactions, as described in the
[private network example tutorial].

!!! info

    Besu does not support
    [private key management](../../HowTo/Send-Transactions/Account-Management.md).

## Stop the nodes

When finished using the private network, stop all nodes using ++ctrl+c++ in each terminal window.

!!!tip

    To restart the Clique network in the future, start from
    [4. Start First Node as Bootnode](#4-start-first-node-as-bootnode).

<!-- Links -->
[Clique (Proof of Authority) consensus protocol]: ../../HowTo/Configure/Consensus-Protocols/Clique.md
[Clique API to add]: ../../HowTo/Configure/Consensus-Protocols/Clique.md#adding-and-removing-signers
[private network example tutorial]: ../Examples/Private-Network-Example.md#creating-a-transaction-using-metamask
