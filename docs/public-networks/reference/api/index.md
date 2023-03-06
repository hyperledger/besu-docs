---
description: Hyperledger Besu JSON-RPC API methods reference
tags:
  - private networks
---

# Besu API methods

!!! attention

    * This reference contains API methods that apply to both public and private networks.
      For private-network-specific API methods, see the
      [private network API reference](../../../private-networks/reference/api/index.md).
    * All JSON-RPC HTTP examples use the default host and port endpoint `http://127.0.0.1:8545`. If
      using the [--rpc-http-host](../cli/options.md#rpc-http-host) or
      [--rpc-http-port](../cli/options.md#rpc-http-port) options, update the endpoint.
    * Most example requests are made against private networks.
      Depending on network configuration and activity, your example results might be different.

--8<-- "global/postman.md"

## `ADMIN` methods

The `ADMIN` API methods provide administrative functionality to manage your node.

!!! note

    The `ADMIN` API methods are not enabled by default for JSON-RPC. To enable the `ADMIN` API
    methods, use the [`--rpc-http-api`](../cli/options.md#rpc-http-api) or
    [`--rpc-ws-api`](../cli/options.md#rpc-ws-api) options.

### `admin_addPeer`

Adds a [static node](../../how-to/connect/static-nodes.md).

!!! caution

    If connections are timing out, ensure the node ID in the
    [enode URL](../../concepts/node-keys.md#enode-url) is correct.

#### Parameters

`enode`: *string* - [enode URL](../../concepts/node-keys.md#enode-url) of peer to add

#### Returns

`result`: *boolean* - `true` if peer added or `false` if peer already a
[static node](../../how-to/connect/static-nodes.md)

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"admin_addPeer","params":["enode://f59c0ab603377b6ec88b89d5bb41b98fc385030ab1e4b03752db6f7dab364559d92c757c13116ae6408d2d33f0138e7812eb8b696b2a22fe3332c4b5127b22a3@127.0.0.1:30304"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"admin_addPeer","params":["enode://f59c0ab603377b6ec88b89d5bb41b98fc385030ab1e4b03752db6f7dab364559d92c757c13116ae6408d2d33f0138e7812eb8b696b2a22fe3332c4b5127b22a3@127.0.0.1:30304"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": true
        }
        ```

### `admin_changeLogLevel`

Changes the log level without restarting Besu. You can change the log level for all logs, or you
can change the log level for specific packages or classes.

You can specify only one log level per RPC call.

#### Parameters

* `level`: *string* - [log level](../cli/options.md#logging)

* `log_filter`: *array* - (optional) packages or classes for which to change the log level

#### Returns

`result`: *string* - `Success` if the log level has changed, otherwise `error`

!!! example

    The following example changes the debug level for specified classes to `DEBUG`.

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0", "method":"admin_changeLogLevel", "params":["DEBUG", ["org.hyperledger.besu.ethereum.eth.manager","org.hyperledger.besu.ethereum.p2p.rlpx.connections.netty.ApiHandler"]], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0", "method":"admin_changeLogLevel", "params":["DEBUG", ["org.hyperledger.besu.ethereum.eth.manager","org.hyperledger.besu.ethereum.p2p.rlpx.connections.netty.ApiHandler"]], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": "Success"
        }
        ```

    The following example changes the debug level of all logs to `WARN`.

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"admin_changeLogLevel","params":["WARN"], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"admin_changeLogLevel","params":["WARN"], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": "Success"
        }
        ```

### `admin_generateLogBloomCache`

Generates cached log bloom indexes for blocks. APIs such as [`eth_getLogs`](#eth_getlogs) and
[`eth_getFilterLogs`](#eth_getfilterlogs) use the cache for improved performance.

!!! tip

    Manually executing `admin_generateLogBloomCache` is not required unless the
    [`--auto-log-bloom-caching-enabled`](../cli/options.md#auto-log-bloom-caching-enabled) command
    line option is set to false.

!!! note

    Each index file contains 100000 blocks. The last fragment of blocks less than 100000 are not
    indexed.

#### Parameters

* `startBlock`: *string* - block to start generating indexes

* `endBlock`: *string* - block to stop generating indexes

#### Returns

`result`: *object* - log bloom index details:

* `startBlock`: *string* - starting block for the last requested cache generation

* `endBlock`: *string* - ending block for the last requested cache generation

* `currentBlock`: *string* - most recent block added to the cache

* `indexing`: *boolean* - indicates if indexing is in progress

* *boolean* - indicates acceptance of the request from this call to generate the cache

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{jsonrpc":"2.0","method":"admin_generateLogBloomCache", "params":["0x0", "0x10000"], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"admin_generateLogBloomCache", "params":["0x0", "0x10000"], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "startBlock": "0x0",
            "endBlock": "0x10000",
            "currentBlock": "0x0",
            "indexing": true,
            "requestAccepted": true
          }
        }
        ```

### `admin_logsRemoveCache`

Removes cache files for the specified range of blocks.

#### Parameters

* `fromBlock`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

* `toBlock`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

You can skip a parameter by using an empty string, `""`.
If you specify:

* No parameters, the call removes cache files for all blocks.

* Only `fromBlock`, the call removes cache files for the specified block.

* Only `toBlock`, the call removes cache files from the genesis block to the specified block.

#### Returns

`result`: *object* - `Cache Removed` status or `error`.

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"admin_logsRemoveCache","params":["1", "100"], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"admin_logsRemoveCache","params":["1", "100"], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "Status": "Cache Removed"
          }
        }
        ```

### `admin_logsRepairCache`

Repairs cached logs by fixing all segments starting with the specified block number.

#### Parameters

`startBlock`: *string* - decimal index of the starting block to fix; defaults to the head block

#### Returns

`result`: *object* -  status of the repair request; `Started` or `Already running`

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"admin_logsRepairCache","params":["1200"], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"admin_logsRepairCache","params":["1200"], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "Status": "Started"
          }
        }
        ```

### `admin_nodeInfo`

Returns networking information about the node. The information includes general information about
the node and specific information from each running Ethereum sub-protocol (for example, `eth`).

#### Parameters

None

#### Returns

`result`: *object* - node object with the following fields:

* `enode`: *string* - [enode URL](../../concepts/node-keys.md#enode-url) of the node

* `listenAddr`: *string* - host and port for the node

* `name`: *string* - client name

* `id`: *string* - [node public key](../../concepts/node-keys.md#node-public-key)

* `ports`: *object* - peer discovery and listening
  [ports](../../how-to/connect/manage-peers.md#port-configuration)

* `protocols`: *object* - list of objects containing information for each Ethereum sub-protocol

!!! note

    If the node is running locally, the host of the `enode` and `listenAddr` display as `[::]` in
    the result. When advertising externally, the external address displayed for the `enode` and
    `listenAddr` is defined by [`--nat-method`](../../how-to/connect/specify-nat.md).

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"admin_nodeInfo","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"admin_nodeInfo","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "enode": "enode://87ec35d558352cc55cd1bf6a472557797f91287b78fe5e86760219124563450ad1bb807e4cc61e86c574189a851733227155551a14b9d0e1f62c5e11332a18a3@[::]:30303",
            "listenAddr": "[::]:30303",
            "name": "besu/v1.0.1-dev-0d2294a5/osx-x86_64/oracle-java-1.8",
            "id": "87ec35d558352cc55cd1bf6a472557797f91287b78fe5e86760219124563450ad1bb807e4cc61e86c574189a851733227155551a14b9d0e1f62c5e11332a18a3",
            "ports": {
              "discovery": 30303,
              "listener": 30303
            },
            "protocols": {
              "eth": {
                "config": {
                  "chainId": 2018,
                  "homesteadBlock": 0,
                  "daoForkBlock": 0,
                  "daoForkSupport": true,
                  "eip150Block": 0,
                  "eip155Block": 0,
                  "eip158Block": 0,
                  "byzantiumBlock": 0,
                  "constantinopleBlock": 0,
                  "constantinopleFixBlock": 0,
                  "ethash": {
                    "fixeddifficulty": 100
                  }
                },
                "difficulty": 78536,
                "genesis": "0x43ee12d45470e57c86a0dfe008a5b847af9e372d05e8ba8f01434526eb2bea0f",
                "head": "0xc6677651f16d07ae59cab3a5e1f0b814ed2ec27c00a93297b2aa2e29707844d9",
                "network": 2018
              }
            }
          }
        }
        ```

### `admin_peers`

Returns networking information about connected remote nodes.

#### Parameters

None

#### Returns

`result`: *array* of *objects* - list of objects returned for each remote node, with the following fields.

* `version`: *string* - P2P protocol version

* `name`: *string* - client name

* `caps`: *array* of *strings* - list of Ethereum sub-protocol capabilities

* `network`: *object* - local and remote addresses established at time of bonding with the peer (the remote
  address might not match the hex value for `port`; it depends on which node
  initiated the connection.)

* `port`: *string* - port on the remote node on which P2P discovery is listening

* `id`: *string* - node public key (excluding the `0x` prefix, the node public key is the ID in the
  [enode URL](../../concepts/node-keys.md#enode-url) `enode://<id ex 0x>@<host>:<port>`.)

* `protocols`: *object* - [current state of peer](../../how-to/connect/manage-peers.md#monitor-peer-connections)
  including `difficulty` and `head` (`head` is the hash of the highest known block for the peer.)

* `enode`: *string* - enode URL of the remote node

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"admin_peers","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"admin_peers","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": [
            {
              "version": "0x5",
              "name": "besu/v20.10.4-dev-0905d1b2/osx-x86_64/adoptopenjdk-java-11",
              "caps": [
                "eth/62",
                "eth/63",
                "eth/64",
                "eth/65",
                "IBF/1"
              ],
              "network": {
                "localAddress": "192.168.1.229:50115",
                "remoteAddress": "168.61.153.255:40303"
              },
              "port": "0x765f",
              "id": "0xe143eadaf670d49afa3327cae2e655b083f5a89dac037c9af065914a9f8e6bceebcfe7ae2258bd22a9cd18b6a6de07b9790e71de49b78afa456e401bd2fb22fc",
              "protocols": {
                "eth": {
                  "difficulty": "0x1ac",
                  "head": "0x964090ae9277aef43f47f1b8c28411f162243d523118605f0b1231dbfdf3611a",
                  "version": 65
                }
              },
              "enode": "enode://e143eadaf670d49afa3327cae2e655b083f5a89dac037c9af065914a9f8e6bceebcfe7ae2258bd22a9cd18b6a6de07b9790e71de49b78afa456e401bd2fb22fc@127.0.0.1:30303"
            }
          ]
        }
        ```

### `admin_removePeer`

Removes a [static node](../../how-to/connect/static-nodes.md).

#### Parameters

`enode`: *string* - [enode URL](../../concepts/node-keys.md#enode-url) of peer to remove

#### Returns

`result`: *boolean* - `true` if peer removed or `false` if peer not a
[static node](../../how-to/connect/static-nodes.md)

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"admin_removePeer","params":["enode://f59c0ab603377b6ec88b89d5bb41b98fc385030ab1e4b03752db6f7dab364559d92c757c13116ae6408d2d33f0138e7812eb8b696b2a22fe3332c4b5127b22a3@127.0.0.1:30304"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"admin_removePeer","params":["enode://f59c0ab603377b6ec88b89d5bb41b98fc385030ab1e4b03752db6f7dab364559d92c757c13116ae6408d2d33f0138e7812eb8b696b2a22fe3332c4b5127b22a3@127.0.0.1:30304"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": true
        }
        ```

## `DEBUG` methods

The `DEBUG` API methods allow you to inspect and debug the network.
The `DEBUG` API is a more verbose alternative to the [`TRACE` API](#trace-methods), and its main purpose is
compatibility with tools such as [Remix](https://remix.ethereum.org/).
Where these APIs overlap, we recommend using the [`TRACE` API](#trace-methods) for production use over the
`DEBUG` API. Specifically, we recommend `trace_block` over `debug_traceBlock`, and `trace_transaction` over
`debug_traceTransaction`.

!!! note

    The `DEBUG` API methods are not enabled by default for JSON-RPC. To enable the `DEBUG` API
    methods, use the [`--rpc-http-api`](../cli/options.md#rpc-http-api) or
    [`--rpc-ws-api`](../cli/options.md#rpc-ws-api) options.

### `debug_accountAt`

Returns account information at the specified index of the specified block.

#### Parameters

* `blockHashOrNumber`: *string* - block hash or number at which to retrieve account information

* `txIndex`: *number* - transaction index at which to retrieve account information

* `address`: *string* - contract or account address for which to retrieve information

#### Returns

`result`: *object* - account details object with the following fields:

* `code`: *data* - code for the account. Displays `0x0` if the address is an externally owned account.

* `nonce`: *quantity* - number of transactions made by the account before this one

* `balance`: *quantity* - balance of the account in Wei

* `codehash`: *data* - code hash for the account

!!! example

    This example uses an externally owned account address for the `address` parameter.

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_accountAt","params":["0xc8df1f061abb4d0c107b2b1a794ade8780b3120e681f723fe55a7be586d95ba6", 0, "0xbcde5374fce5edbc8e2a8697c15331677e6ebf0b"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_accountAt","params":["0xc8df1f061abb4d0c107b2b1a794ade8780b3120e681f723fe55a7be586d95ba6", 0, "0xbcde5374fce5edbc8e2a8697c15331677e6ebf0b"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "code": "0x0",
            "nonce": "0x5",
            "balance": "0xad78ebc5ac6200000",
            "codehash" : "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
          }
        }
        ```

    This example uses a contract address for the `address` parameter.

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_accountAt","params":["0x2b76b3a2fc44c0e21ea183d06c846353279a7acf12abcc6fb9d5e8fb14ae2f8c", 0, "0x0e0d2c8f7794e82164f11798276a188147fbd415"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_accountAt","params":["0x2b76b3a2fc44c0e21ea183d06c846353279a7acf12abcc6fb9d5e8fb14ae2f8c", 0, "0x0e0d2c8f7794e82164f11798276a188147fbd415"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "code": "0x608060405234801561001057600080fd5b506004361061002b5760003560e01c8063b27b880414610030575b600080fd5b61004a60048036038101906100459190610108565b61004c565b005b60606000806000604051935036600085376000803686885af490503d9150816000853e806000811461007d57610093565b60008311156100925761012085019350836040525b5b5060008114156100ec578473ffffffffffffffffffffffffffffffffffffffff167f410d96db3f80b0f89b36888c4d8a94004268f8d42309ac39b7bcba706293e099856040516100e3919061016e565b60405180910390a25b5050505050565b60008135905061010281610227565b92915050565b60006020828403121561011e5761011d610211565b5b600061012c848285016100f3565b91505092915050565b600061014082610190565b61014a818561019b565b935061015a8185602086016101de565b61016381610216565b840191505092915050565b600060208201905081810360008301526101888184610135565b905092915050565b600081519050919050565b600082825260208201905092915050565b60006101b7826101be565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b838110156101fc5780820151818401526020810190506101e1565b8381111561020b576000848401525b50505050565b600080fd5b6000601f19601f8301169050919050565b610230816101ac565b811461023b57600080fd5b5056fea2646970667358221220fdfb5c371055342507b8fb9ca7b0c234f79819bd5cb05c0d467fb605de979eb564736f6c63430008060033",
            "nonce": "0x1",
            "balance": "0x0",
            "codehash" : "0xf5f334d41776ed2828fc910d488a05c57fe7c2352aab2d16e30539d7726e1562"
          }
        }
        ```

### `debug_accountRange`

[Retesteth](https://github.com/ethereum/retesteth/wiki/Retesteth-Overview) uses
`debug_accountRange` to implement debugging.

Returns the accounts for a specified block.

#### Parameters

* `blockHashOrNumber`: *string* - block hash or number at which to retrieve account information

* `txIndex`: *number* - transaction index at which to retrieve account information

* `address`: *string* - address hash from which to start

* `limit`: *integer* - maximum number of account entries to return

#### Returns

`result`: *object* - account details object with the following fields:

* `addressMap`: *map* of *strings* to *strings* - map of address hashes and account addresses

* `nextKey`: *string* - hash of the next address if any addresses remain in the state, otherwise
  zero

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_accountRange","params":["12345", 0, "0", 5],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_accountRange","params":["12345", 0, "0", 5],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "addressMap": {
              "0x005e5...86960": "0x0000000000000000000000000000000000000000",
              "0x021fe...6ffe3": "0x0000000000000000000000000000000000000000",
              "0x028e6...ab776": "0x0000000000000000000000000000000000000000",
              "0x02cb5...bc4d8": "0x0000000000000000000000000000000000000000",
              "0x03089...23fd5": "0x0000000000000000000000000000000000000000"
            },
            "nextKey": "0x04242954a5cb9748d3f66bcd4583fd3830287aa585bebd9dd06fa6625976be49"
          }
        }
        ```

### `debug_batchSendRawTransaction`

Sends a list of [signed transactions](../../how-to/send-transactions.md).
This is used to quickly load a network with a lot of transactions.
This does the same thing as calling [`eth_sendRawTransaction`](#eth_sendrawtransaction) multiple times.

#### Parameters

`data`: *string* -  signed transaction data array

#### Returns

`result`: *array* of *objects* - object returned for each transaction, with the following fields:

* `index`: *string* - index of the transaction in the request parameters array

* `success`: *boolean* - indicates whether or not the transaction has been added to the transaction pool

* `errorMessage`: *string* - (optional) error message

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_batchSendRawTransaction","params":["0xf868808203e882520894627306090abab3a6e1400e9345bc60c78a8bef57872386f26fc10000801ba0ac74ecfa0e9b85785f042c143ead4780931234cc9a032fce99fab1f45e0d90faa02fd17e8eb433d4ca47727653232045d4f81322619c0852d3fe8ddcfcedb66a43","0x416","0xf868018203e882520894627306090abab3a6e1400e9345bc60c78a8bef57872386f26fc10000801ca0b24ea1bee8fe36984c36acbf80979a4509f23fc17141851e08d505c0df158aa0a00472a05903d4cd7a811bd4d5c59cc105d93f5943f3393f253e92e65fc36e7ce0","0xf868808203e882520894627306090abab3a6e1400e9345bc60c78a8bef5787470de4df820000801ca0f7936b4de04792e3c65095cfbfd1399d231368f5f05f877588c0c8509f6c98c9a01834004dead527c8da1396eede42e1c60e41f38a77c2fd13a6e495479c729b99"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"debug_batchSendRawTransaction","params":["0xf868808203e882520894627306090abab3a6e1400e9345bc60c78a8bef57872386f26fc10000801ba0ac74ecfa0e9b85785f042c143ead4780931234cc9a032fce99fab1f45e0d90faa02fd17e8eb433d4ca47727653232045d4f81322619c0852d3fe8ddcfcedb66a43","0x416","0xf868018203e882520894627306090abab3a6e1400e9345bc60c78a8bef57872386f26fc10000801ca0b24ea1bee8fe36984c36acbf80979a4509f23fc17141851e08d505c0df158aa0a00472a05903d4cd7a811bd4d5c59cc105d93f5943f3393f253e92e65fc36e7ce0","0xf868808203e882520894627306090abab3a6e1400e9345bc60c78a8bef5787470de4df820000801ca0f7936b4de04792e3c65095cfbfd1399d231368f5f05f877588c0c8509f6c98c9a01834004dead527c8da1396eede42e1c60e41f38a77c2fd13a6e495479c729b99"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": [
            {
              "index": 0,
              "success": true
            },
            {
              "index": 1,
              "success": false,
              "errorMessage": "Invalid raw transaction hex"
            },
            {
              "index": 2,
              "success": true
            },
            {
              "index": 3,
              "success": false,
              "errorMessage": "TRANSACTION_REPLACEMENT_UNDERPRICED"
            }
          ]
        }
        ```

### `debug_getBadBlocks`

Returns a list of invalid blocks.
This is used to detect and analyze consensus flaws.

#### Parameters

None

#### Returns

`result`: *array* of *objects* - list of [block objects](objects.md#block-object)

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_getBadBlocks","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"debug_getBadBlocks","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": [
            {
              "block": {
                "number": "0xd",
                "hash": "0x85c2edc1ca74b4863cab46ff6ed4df514a698aa7c29a9bce58742a33af07d7e6",
                "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "parentHash": "0x544a2f7a4c8defc0d8da44aa0c0db7c36b56db2605c01ed266e919e936579d31",
                "nonce": "0x0000000000000000",
                "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
                "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "transactionsRoot": "0x02c387e001cbe2a8296bfa2e18afbc3480d0e49588b05556148b0bf7c17dec41",
                "stateRoot": "0x861ab7e868e3c23f84b7c4ed86b52a6a4f063633bc45ef29212c33459df84ea5",
                "receiptsRoot": "0xccd2d33763dc0ac3fe02d4ecbbcd7d2bdc6f57db635ba31007184679303721d7",
                "miner": "0x0000000000000000000000000000000000000000",
                "difficulty": "0x1",
                "totalDifficulty": "0x1",
                "extraData": "0x00000000000000000000000000000000000000000000000000000000000000008c6a091f07e4ba3930f2f5fabbfc5b1c70986319096760ba200a6abc0d30e33c2d501702d1b58d7f75807bdbf981044557628611319121170b96466ec06bb3fd01",
                "size": "0x3a0",
                "gasLimit": "0xffffffffffff",
                "gasUsed": "0x1a488",
                "timestamp": "0x5f5b6824",
                "uncles": [],
                "transactions": [
                  {
                    "blockHash": "0x85c2edc1ca74b4863cab46ff6ed4df514a698aa7c29a9bce58742a33af07d7e6",
                    "blockNumber": "0xd",
                    "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
                    "gas": "0x1a49e",
                    "gasPrice": "0x3e8",
                    "hash": "0xdd8cf045113754c306ba9ac8ac8786235e33bc5c087678084ef260a2a583f127",
                    "input": "0x608060405234801561001057600080fd5b5060c78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636057361d146037578063b05784b8146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea26469706673582212208dea039245bf78c381278382d7056eef5083f7d243d8958817ef447e0a403bd064736f6c63430006060033",
                    "nonce": "0x0",
                    "to": null,
                    "transactionIndex": "0x0",
                    "value": "0x0",
                    "v": "0xf9d",
                    "r": "0xa7a15050302ca4b7d3842d35cdd3cbf25b2c48c0c37f96d78beb6a6a6bc4f1c7",
                    "s": "0x130d29294b2b6a2b7e89f501eb27772f7abf37bfa28a1ce300daade975589fca"
                  }
                ]
              },
              "hash": "0x85c2edc1ca74b4863cab46ff6ed4df514a698aa7c29a9bce58742a33af07d7e6",
              "rlp": "0xf9039df9025ca0544a2f7a4c8defc0d8da44aa0c0db7c36b56db2605c01ed266e919e936579d31a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347940000000000000000000000000000000000000000a0861ab7e868e3c23f84b7c4ed86b52a6a4f063633bc45ef29212c33459df84ea5a002c387e001cbe2a8296bfa2e18afbc3480d0e49588b05556148b0bf7c17dec41a0ccd2d33763dc0ac3fe02d4ecbbcd7d2bdc6f57db635ba31007184679303721d7b9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010d86ffffffffffff8301a488845f5b6824b86100000000000000000000000000000000000000000000000000000000000000008c6a091f07e4ba3930f2f5fabbfc5b1c70986319096760ba200a6abc0d30e33c2d501702d1b58d7f75807bdbf981044557628611319121170b96466ec06bb3fd01a00000000000000000000000000000000000000000000000000000000000000000880000000000000000f9013af90137808203e88301a49e8080b8e6608060405234801561001057600080fd5b5060c78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636057361d146037578063b05784b8146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea26469706673582212208dea039245bf78c381278382d7056eef5083f7d243d8958817ef447e0a403bd064736f6c63430006060033820f9da0a7a15050302ca4b7d3842d35cdd3cbf25b2c48c0c37f96d78beb6a6a6bc4f1c7a0130d29294b2b6a2b7e89f501eb27772f7abf37bfa28a1ce300daade975589fcac0"
            },
            {
              "block": {
                "number": "0x8",
                "hash": "0x601a3ae9b6eceb2476d249e1cffe058ba3ff2c9c1b28b1ec7a0259fdd1d90121",
                "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "parentHash": "0x98ae440cd7b904d842daa6c263608969a3c8ce6a9acd6bd1f99b394f5f28a207",
                "nonce": "0x0000000000000000",
                "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
                "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "transactionsRoot": "0x8ee998cc699a1f9310a1079458780b3ebee8756f96a0905f5224b89d0eb17486",
                "stateRoot": "0x140a9783291704223eb759e3a0db5471a520d349fc17ac2f77ff8582472e3bac",
                "receiptsRoot": "0x2b5c77f6e7764d2468178fab7253346b9b8bb6a34b63946f6bdc2f5ad398bfc3",
                "miner": "0x0000000000000000000000000000000000000000",
                "difficulty": "0x2",
                "totalDifficulty": "0x2",
                "extraData": "0x00000000000000000000000000000000000000000000000000000000000000004d04551bdd9ae08af1fd661e49d4ab662c98c532c7ec0e4656a27e4de7d330af578ab1e4f5e49e085ff1d78673c7388ed9ccf017fbe89e53066bfa4018142c0701",
                "size": "0x3a0",
                "gasLimit": "0xffffffffffff",
                "gasUsed": "0x1a4c9",
                "timestamp": "0x5f5b6b80",
                "uncles": [],
                "transactions": [
                  {
                    "blockHash": "0x601a3ae9b6eceb2476d249e1cffe058ba3ff2c9c1b28b1ec7a0259fdd1d90121",
                    "blockNumber": "0x8",
                    "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
                    "gas": "0x1a4c9",
                    "gasPrice": "0x3e8",
                    "hash": "0x675e336a4281b29c619dfd4ccfbd2f930f3728b20caf9e0067284aa3224e6758",
                    "input": "0x608060405234801561001057600080fd5b5060c78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636057361d146037578063b05784b8146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea26469706673582212208dea039245bf78c381278382d7056eef5083f7d243d8958817ef447e0a403bd064736f6c63430006060033",
                    "nonce": "0x0",
                    "to": null,
                    "transactionIndex": "0x0",
                    "value": "0x0",
                    "v": "0xf9d",
                    "r": "0x2e30624c0305e64812e1d9e325ba6e50410314634b008edcb50f45be71fa0d4",
                    "s": "0x50e205faed23c219ba15610de2451d458cbd4221207b2168344cfc972a7973c0"
                  }
                ]
              },
              "hash": "0x601a3ae9b6eceb2476d249e1cffe058ba3ff2c9c1b28b1ec7a0259fdd1d90121",
              "rlp": "0xf9039df9025ca098ae440cd7b904d842daa6c263608969a3c8ce6a9acd6bd1f99b394f5f28a207a01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347940000000000000000000000000000000000000000a0140a9783291704223eb759e3a0db5471a520d349fc17ac2f77ff8582472e3baca08ee998cc699a1f9310a1079458780b3ebee8756f96a0905f5224b89d0eb17486a02b5c77f6e7764d2468178fab7253346b9b8bb6a34b63946f6bdc2f5ad398bfc3b9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020886ffffffffffff8301a4c9845f5b6b80b86100000000000000000000000000000000000000000000000000000000000000004d04551bdd9ae08af1fd661e49d4ab662c98c532c7ec0e4656a27e4de7d330af578ab1e4f5e49e085ff1d78673c7388ed9ccf017fbe89e53066bfa4018142c0701a00000000000000000000000000000000000000000000000000000000000000000880000000000000000f9013af90137808203e88301a4c98080b8e6608060405234801561001057600080fd5b5060c78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80636057361d146037578063b05784b8146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b60686088565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea26469706673582212208dea039245bf78c381278382d7056eef5083f7d243d8958817ef447e0a403bd064736f6c63430006060033820f9da002e30624c0305e64812e1d9e325ba6e50410314634b008edcb50f45be71fa0d4a050e205faed23c219ba15610de2451d458cbd4221207b2168344cfc972a7973c0c0"
            }
          ]
        }
        ```

### `debug_metrics`

Returns metrics providing information on the internal operation of Besu.

The available metrics might change over time.
The JVM metrics might vary based on the JVM implementation used.

The metric types are:

* Timer

* Counter

* Gauge

#### Parameters

None

#### Returns

`result`: *object* - metrics object

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_metrics","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_metrics","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "jvm": {
              "memory_bytes_init": {
                "heap": 268435456,
                "nonheap": 2555904
              },
              "threads_current": 41,
              "memory_bytes_used": {
                "heap": 696923976,
                "nonheap": 63633456
              },
              "memory_pool_bytes_used": {
                "PS Eden Space": 669119360,
                "Code Cache": 19689024,
                "Compressed Class Space": 4871144,
                "PS Survivor Space": 2716320,
                "PS Old Gen": 25088296,
                "Metaspace": 39073288
              },
              ...
            },
            "process": {
              "open_fds": 546,
              "cpu_seconds_total": 67.148992,
              "start_time_seconds": 1543897699.589,
              "max_fds": 10240
            },
            "rpc": {
              "request_time": {
                "debug_metrics": {
                  "bucket": {
                    "+Inf": 2,
                    "0.01": 1,
                    "0.075": 2,
                    "0.75": 2,
                    "0.005": 1,
                    "0.025": 2,
                    "0.1": 2,
                    "1.0": 2,
                    "0.05": 2,
                    "10.0": 2,
                    "0.25": 2,
                    "0.5": 2,
                    "5.0": 2,
                    "2.5": 2,
                    "7.5": 2
                  },
                  "count": 2,
                  "sum": 0.015925392
                }
              }
            },
            "blockchain": {
              "difficulty_total": 3533501,
              "announcedBlock_ingest": {
                "bucket": {
                  "+Inf": 0,
                  "0.01": 0,
                  "0.075": 0,
                  "0.75": 0,
                  "0.005": 0,
                  "0.025": 0,
                  "0.1": 0,
                  "1.0": 0,
                  "0.05": 0,
                  "10.0": 0,
                  "0.25": 0,
                  "0.5": 0,
                  "5.0": 0,
                  "2.5": 0,
                  "7.5": 0
                },
                "count": 0,
                "sum": 0
              },
              "height": 1908793
            },
            "peers": {
              "disconnected_total": {
                "remote": {
                  "SUBPROTOCOL_TRIGGERED": 5
                },
                "local": {
                  "TCP_SUBSYSTEM_ERROR": 1,
                  "SUBPROTOCOL_TRIGGERED": 2,
                  "USELESS_PEER": 3
                }
              },
              "peer_count_current": 2,
              "connected_total": 10
            }
          }
        }
        ```

### `debug_replayBlock`

Re-imports the block matching the specified block number, by rolling the head of the local chain
back to the block right before the specified block, then importing the specified block.

#### Parameters

`blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *string* - `Success` or `error`

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_replayBlock","params":["0x1"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_replayBlock","params":["0x1"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : "Success"
        }
        ```

### `debug_setHead`

Sets the current head of the local chain to the block matching the specified block number.

#### Parameters

`blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *string* - `Success` or `error`

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_setHead","params":["0x1"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_setHead","params":["0x1"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : "Success"
        }
        ```

### `debug_standardTraceBlockToFile`

Generates files containing the block trace. A separate file is generated for each
transaction in the block.

You can also specify a trace file for a specific transaction in a block.

Use [`debug_standardTraceBadBlockToFile`](#debug_standardtracebadblocktofile) to view the trace for
an invalid block.

#### Parameters

`blockHash`: *string* - block hash

`txHash`: *string* - (optional) transaction hash; if omitted, a trace file is generated for each
transaction in the block.

`disableMemory`: *boolean* - (optional) specifies whether to capture EVM memory during the trace; defaults to `true`

#### Returns

`result`: *string* - location of the generated trace files

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_standardTraceBlockToFile","params":["0x2dc0b6c43144e314a86777b4bd4f987c0790a6a0b21560671d221ed81a23f2dc", {
        "txHash": "0x4ff04c4aec9517721179c8dd435f47fbbfc2ed26cd4926845ab687420d5580a6", "disableMemory": false}], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_standardTraceBlockToFile","params":["0x2dc0b6c43144e314a86777b4bd4f987c0790a6a0b21560671d221ed81a23f2dc", {
        "txHash": "0x4ff04c4aec9517721179c8dd435f47fbbfc2ed26cd4926845ab687420d5580a6", "disableMemory": false}], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": [
            "/Users/me/mynode/goerli/data/traces/block_0x2dc0b6c4-4-0x4ff04c4a-1612820117332"
          ]
        }
        ```

### `debug_standardTraceBadBlockToFile`

Generates files containing the block trace of invalid blocks.
A separate file is generated for each
transaction in the block.

Use [`debug_standardTraceBlockToFile`](#debug_standardtraceblocktofile) to view the trace for a
valid block.

#### Parameters

`blockHash`: *string* - block hash

#### Returns

`result`: *string* - location of the generated trace files

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_standardTraceBadBlockToFile","params":["0x53741e9e94791466d117c5f9e41a2ed1de3f73d39920c621dfc2f294e7779baa"], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_standardTraceBadBlockToFile","params":["0x53741e9e94791466d117c5f9e41a2ed1de3f73d39920c621dfc2f294e7779baa"], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": [
            "/Users/me/mynode/goerli/data/traces/block_0x53741e9e-0-0x407ec43d-1600951088172"
          ]
        }
        ```

### `debug_storageRangeAt`

[Remix](https://remix.ethereum.org/) uses `debug_storageRangeAt` to implement debugging.
Use the *Debugger* tab in Remix instead of calling `debug_storageRangeAt` directly.

Returns the contract storage for the specified range.

#### Parameters

* `blockHash`: *string* - block hash

* `txIndex`: *number* - transaction index from which to start

* `address`: *string* - contract address

* `startKey`: *string* - start key

* `limit`: *number* - number of storage entries to return

#### Returns

`result`: *object* - [range object](objects.md#range-object).

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_storageRangeAt","params":["0x2b76b3a2fc44c0e21ea183d06c846353279a7acf12abcc6fb9d5e8fb14ae2f8c",0,"0x0e0d2c8f7794e82164f11798276a188147fbd415","0x0000000000000000000000000000000000000000000000000000000000000000",1], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_storageRangeAt","params":["0x2b76b3a2fc44c0e21ea183d06c846353279a7acf12abcc6fb9d5e8fb14ae2f8c",0,"0x0e0d2c8f7794e82164f11798276a188147fbd415","0x0000000000000000000000000000000000000000000000000000000000000000",1], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "storage": {
              "0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563": {
                "key": null,
                "value": "0x0000000000000000000000000000000000000000000000000000000000000001"
              }
            },
            "nextKey": "0xb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf6"
          }
        }
        ```

### `debug_traceTransaction`

[Remix](https://remix.ethereum.org/) uses `debug_traceTransaction` to implement debugging.
Use the *Debugger* tab in Remix instead of calling `debug_traceTransaction` directly.

Reruns the transaction with the same state as when the transaction executed.

#### Parameters

* `transactionHash`: *string* - transaction hash

* `options`: *object* - request options object with the following fields (all optional and default to `false`):

    * `disableStorage`: *boolean* - `true` disables storage capture.

    * `disableMemory`: *boolean* - `true` disables memory capture.

    * `disableStack` : *boolean* - `true` disables stack capture.

#### Returns

`result`: *object* - [trace object](objects.md#trace-object)

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_traceTransaction","params":["0x2cc6c94c21685b7e0f8ddabf277a5ccf98db157c62619cde8baea696a74ed18e",{"disableStorage":true}],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_traceTransaction","params":["0x2cc6c94c21685b7e0f8ddabf277a5ccf98db157c62619cde8baea696a74ed18e",{"disableStorage":true}],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : {
            "gas" : 21000,
            "failed" : false,
            "returnValue" : "",
            "structLogs" : [ {
              "pc" : 0,
              "op" : "STOP",
              "gas" : 0,
              "gasCost" : 0,
              "depth" : 1,
              "stack" : [ ],
              "memory" : [ ],
              "storage" : null
            } ]
          }
        }
        ```

### `debug_traceBlock`

Returns full trace of all invoked opcodes of all transactions included in the block.

#### Parameters

* `block`: *string* - RLP of the block

* `options`: *object* - request options object with the following fields (all optional and default to `false`):

    * `disableStorage`: *boolean* - `true` disables storage capture.

    * `disableMemory`: *boolean* - `true` disables memory capture.

    * `disableStack` : *boolean* - `true` disables stack capture.

#### Returns

`result`: *object* - [trace object](objects.md#trace-object)

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_traceBlock","params":["0xf90277f90208a05a41d0e66b4120775176c09fcf39e7c0520517a13d2b57b18d33d342df038bfca01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d4934794e6a7a1d47ff21b6321162aea7c6cb457d5476bcaa00e0df2706b0a4fb8bd08c9246d472abbe850af446405d9eba1db41db18b4a169a04513310fcb9f6f616972a3b948dc5d547f280849a87ebb5af0191f98b87be598a0fe2bf2a941abf41d72637e5b91750332a30283efd40c424dc522b77e6f0ed8c4b9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000860153886c1bbd82b44382520b8252088455c426598b657468706f6f6c2e6f7267a0b48c515a9dde8d346c3337ea520aa995a4738bb595495506125449c1149d6cf488ba4f8ecd18aab215f869f86780862d79883d2000825208945df9b87991262f6ba471f09758cde1c0fc1de734827a69801ca088ff6cf0fefd94db46111149ae4bfc179e9b94721fffd821d38d16464b3f71d0a045e0aff800961cfce805daef7016b9b675c137a6a41a548f7b60a3484c06a33ac0"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_traceBlock","params":["0xf90277f90208a05a41d0e66b4120775176c09fcf39e7c0520517a13d2b57b18d33d342df038bfca01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d4934794e6a7a1d47ff21b6321162aea7c6cb457d5476bcaa00e0df2706b0a4fb8bd08c9246d472abbe850af446405d9eba1db41db18b4a169a04513310fcb9f6f616972a3b948dc5d547f280849a87ebb5af0191f98b87be598a0fe2bf2a941abf41d72637e5b91750332a30283efd40c424dc522b77e6f0ed8c4b9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000860153886c1bbd82b44382520b8252088455c426598b657468706f6f6c2e6f7267a0b48c515a9dde8d346c3337ea520aa995a4738bb595495506125449c1149d6cf488ba4f8ecd18aab215f869f86780862d79883d2000825208945df9b87991262f6ba471f09758cde1c0fc1de734827a69801ca088ff6cf0fefd94db46111149ae4bfc179e9b94721fffd821d38d16464b3f71d0a045e0aff800961cfce805daef7016b9b675c137a6a41a548f7b60a3484c06a33ac0"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : {
            "gas" : 21000,
            "failed" : false,
            "returnValue" : "",
            "structLogs" : [ {
              "pc" : 0,
              "op" : "STOP",
              "gas" : 0,
              "gasCost" : 0,
              "depth" : 1,
              "stack" : [ ],
              "memory" : [ ],
              "storage" : null
            } ]
          }
        }
        ```

### `debug_traceBlockByHash`

Returns full trace of all invoked opcodes of all transactions included in the block.

#### Parameters

* `blockHash`: *string* - block hash

* `options`: *object* - request options object with the following fields (all optional and default to `false`):

    * `disableStorage`: *boolean* - `true` disables storage capture.

    * `disableMemory`: *boolean* - `true` disables memory capture.

    * `disableStack` : *boolean* - `true` disables stack capture.

#### Returns

`result`: *array* of *objects* - list of [trace objects](objects.md#trace-object)

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_traceBlockByHash","params":["0xaceb3b2c9b25b0589230873921eb894b28722011b8df63977145517d754875a5"], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_traceBlockByHash","params":["0xaceb3b2c9b25b0589230873921eb894b28722011b8df63977145517d754875a5"], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": [
            {
              "gas": 21000,
              "failed": false,
              "returnValue": "",
              "structLogs": [
                {
                  "pc": 0,
                  "op": "STOP",
                  "gas": 0,
                  "gasCost": 0,
                  "depth": 1,
                  "stack": [],
                  "memory": [],
                  "storage": {},
                  "reason": null
                }
              ]
            }
          ]
        }
        ```

### `debug_traceBlockByNumber`

Returns full trace of all invoked opcodes of all transactions included in the block.

#### Parameters

* `blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

* `options`: *object* - request options object with the following fields (all optional and default to `false`):

    * `disableStorage`: *boolean* - `true` disables storage capture.

    * `disableMemory`: *boolean* - `true` disables memory capture.

    * `disableStack` : *boolean* - `true` disables stack capture.

#### Returns

`result`: *array* of *objects* - list of [trace objects](objects.md#trace-object)

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"debug_traceBlockByNumber","params":["0x7224",{"disableStorage":true}], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"debug_traceBlockByNumber","params":["0x7224",{"disableStorage":true}], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": [
            {
              "gas": 21000,
              "failed": false,
              "returnValue": "",
              "structLogs": [
                {
                  "pc": 0,
                  "op": "STOP",
                  "gas": 0,
                  "gasCost": 0,
                  "depth": 1,
                  "stack": [],
                  "memory": [],
                  "storage": null,
                  "reason": null
                }
              ]
            }
          ]
        }
        ```

## `ETH` methods

The `ETH` API methods allow you to interact with the blockchain.

!!! note

    Methods with an equivalent [GraphQL](../../how-to/use-besu-api/graphql.md) query include a GraphQL
    request and result in the method example. The parameter and result descriptions apply to the
    JSON-RPC requests. The GraphQL specification is defined in the [schema].

### `eth_accounts`

Returns a list of account addresses a client owns.

!!!note

    This method returns an empty object because Besu
    [doesn't support key management](../../how-to/send-transactions.md) inside the
    client.

    To provide access to your key store and and then sign transactions, use
    [EthSigner](http://docs.ethsigner.consensys.net/en/latest/) with Besu.

#### Parameters

None

#### Returns

`result`: *array* of *strings* - list of 20-byte account addresses owned by the client

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : [ ]
        }
        ```

### `eth_blockNumber`

Returns the index corresponding to the block number of the current chain head.

#### Parameters

None

#### Returns

`result`: *string* - hexadecimal integer representing the index corresponding to the block
number of the current chain head

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":51}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":51}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 51,
          "result" : "0x2377"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block{number}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block {
            number
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "number" : 16221
            }
          }
        }
        ```

### `eth_call`

Invokes a contract function locally and does not change the state of the blockchain.

You can interact with contracts using [`eth_sendRawTransaction`](#eth_sendrawtransaction) or `eth_call`.

If revert reason is enabled with [`--revert-reason-enabled`](../cli/options.md#revert-reason-enabled),
the `eth_call` error response includes the [revert reason](../../../private-networks/how-to/send-transactions/revert-reason.md).

#### Parameters

`call`: *object* - [transaction call object](objects.md#transaction-call-object)

`blockNumber` or `blockHash`: *string* - integer representing a block number, block hash, or one of
the string tags `latest`, `earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

!!! note

    By default, `eth_call` does not fail if the sender account has an insufficient balance.
    This is done by setting the balance of the account to a large amount of ether.
    To enforce balance rules, set the [`strict` parameter](objects.md#transaction-call-object) in the transaction call object to `true`.

#### Returns

`result`: *string* - return value of the executed contract

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x69498dd54bd25aa0c886cf1f8b8ae0856d55ff13","value":"0x1"}, "latest"],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_call","params":[{"to":"0x69498dd54bd25aa0c886cf1f8b8ae0856d55ff13","value":"0x1"}, "latest"],"id":53}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 53,
            "result": "0x"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block {number call (data : {from : \"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b\", to: \"0x69498dd54bd25aa0c886cf1f8b8ae0856d55ff13\", data :\"0x12a7b914\"}){data status}}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block {
            number
            call(data: {from: "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", to: "0x69498dd54bd25aa0c886cf1f8b8ae0856d55ff13", data: "0x12a7b914"}) {
              data
              status
            }
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "number" : 17449,
              "call" : {
                "data" : "0x",
                "status" : 1
              }
            }
          }
        }
        ```

!!! example "Example of a simulated contract creation"

    The following example creates a simulated contract by not including the `to` parameter from the
    [transaction call object](objects.md#transaction-call-object) in the `call` parameter.
    Besu simulates the data to create the contract.

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{"from":"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73", "data":"0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555034801561005057600080fd5b5061021e806100606000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063445df0ac146100465780638da5cb5b14610064578063fdacd576146100ae575b600080fd5b61004e6100dc565b6040518082815260200191505060405180910390f35b61006c6100e2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100da600480360360208110156100c457600080fd5b8101908080359060200190929190505050610107565b005b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260338152602001806101b76033913960400191505060405180910390fd5b806001819055505056fe546869732066756e6374696f6e206973207265737472696374656420746f2074686520636f6e74726163742773206f776e6572a265627a7a7231582007302f208a10686769509b529e1878bda1859883778d70dedd1844fe790c9bde64736f6c63430005100032","gas":"0x439cf","gasPrice":"0x0"},"latest"],"id":53}' http://127.0.0.1:8545
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 53,
          "result": "0x608060405234801561001057600080fd5b50600436106100415760003560e01c8063445df0ac146100465780638da5cb5b14610064578063fdacd576146100ae575b600080fd5b61004e6100dc565b6040518082815260200191505060405180910390f35b61006c6100e2565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6100da600480360360208110156100c457600080fd5b8101908080359060200190929190505050610107565b005b60015481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146101ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260338152602001806101b76033913960400191505060405180910390fd5b806001819055505056fe546869732066756e6374696f6e206973207265737472696374656420746f2074686520636f6e74726163742773206f776e6572a265627a7a7231582007302f208a10686769509b529e1878bda1859883778d70dedd1844fe790c9bde64736f6c63430005100032"
        }
        ```

### `eth_chainId`

Returns the [chain ID](../../concepts/network-and-chain-id.md).

#### Parameters

None

#### Returns

`result`: *string* - chain ID in hexadecimal

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":51}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":51}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 51,
          "result" : "0x7e2"
        }
        ```

### `eth_coinbase`

Returns the client coinbase address. The coinbase address is the account to pay mining rewards to.

To set a coinbase address, start Besu with the `--miner-coinbase` option set to a valid Ethereum
account address. You can get the Ethereum account address from a client such as MetaMask or
Etherscan. For example:

!!!example

    ```bash
    besu --miner-coinbase="0xfe3b557e8fb62b89f4916b721be55ceb828dbd73" --rpc-http-enabled
    ```

#### Parameters

None

#### Returns

`result`: *string* - coinbase address

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
        }
        ```

### `eth_estimateGas`

Returns an estimate of the gas required for a transaction to complete. The estimation process
does not use gas and the transaction is not added to the blockchain. The resulting estimate can be
greater than the amount of gas the transaction ends up using, for reasons including EVM mechanics
and node performance.

The `eth_estimateGas` call does not send a transaction. You must call
[`eth_sendRawTransaction`](#eth_sendrawtransaction) to execute the transaction.

If revert reason is enabled with [`--revert-reason-enabled`](../cli/options.md#revert-reason-enabled),
the `eth_estimateGas` error response includes the [revert reason](../../../private-networks/how-to/send-transactions/revert-reason.md).

#### Parameters

For `eth_estimateGas`, all fields are optional because setting a gas limit
is irrelevant to the estimation process (unlike transactions, in which gas limits apply).

`call`: *object* - [transaction call object](objects.md#transaction-call-object)

#### Returns

`result`: *string* -  amount of gas used

!!! example "Example of cost estimate of a value transaction"

    The following example returns an estimate of 21000 wei (`0x5208`) for the transaction.

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{"from":"0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73","to":"0x44Aa93095D6749A706051658B970b941c72c1D53","value":"0x1"}],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_estimateGas","params":[{"from":"0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73","to":"0x44Aa93095D6749A706051658B970b941c72c1D53","value":"0x1"}],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : "0x5208"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block{estimateGas (data: {from :\"0x6295ee1b4f6dd65047762f924ecd367c17eabf8f\", to :\"0x8888f1f195afa192cfee860698584c030f4c9db1\"})}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block {
            estimateGas(data: {from: "0x6295ee1b4f6dd65047762f924ecd367c17eabf8f", to: "0x8888f1f195afa192cfee860698584c030f4c9db1"})
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "estimateGas" : 21000
            }
          }
        }
        ```

!!! example "Example of cost estimate of deploying a simple storage smart contract"

    The following example request estimates the cost of deploying a simple storage smart contract to
    the network. The data field contains the hash of the compiled contract you want to deploy. (You can
    get the compiled contract hash from your IDE, for example, **Remix > Compile tab > details >
    WEB3DEPLOY**.) The result is 113355 wei.

    === "curl HTTP request"

        ```bash
        curl -X POST \
        http://127.0.0.1:8545 \
        -H 'Content-Type: application/json' \
        -d '{
          "jsonrpc": "2.0",
          "method": "eth_estimateGas",
          "params": [{
            "from": "0x8bad598904ec5d93d07e204a366d084a80c7694e",
            "data": "0x608060405234801561001057600080fd5b5060e38061001f6000396000f3fe6080604052600436106043576000357c0100000000000000000000000000000000000000000000000000000000900480633fa4f24514604857806355241077146070575b600080fd5b348015605357600080fd5b50605a60a7565b6040518082815260200191505060405180910390f35b348015607b57600080fd5b5060a560048036036020811015609057600080fd5b810190808035906020019092919050505060ad565b005b60005481565b806000819055505056fea165627a7a7230582020d7ad478b98b85ca751c924ef66bcebbbd8072b93031073ef35270a4c42f0080029"
          }],
          "id": 1
        }'
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": "0x1bacb"
        }
        ```

### `eth_feeHistory`

Returns base fee per gas and transaction effective priority fee per gas history
for the requested block range, allowing you to track trends over time.

#### Parameters

* `blockCount`: *integer* - Number of blocks in the requested range. Between 1 and 1024 blocks can be requested in a single query.
If blocks in the specified block range are not available, then only the fee history for available blocks is returned.

* `newestBlock`: *string* - Integer representing the highest number block of the requested range or one of the string tags `latest`,
  `earliest`, or `pending`, as described in
  [Block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter).

#### Returns

`result`: *object* - [Fee history results object](objects.md#fee-history-results-object).

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_feeHistory","params":[2, "latest"],"id":28}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_feeHistory","params":[2, "latest"],"id":28}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 28,
          "result" : {
            "oldestBlock" : "0x53cbe6",
            "baseFeePerGas" : ["0x7", "0x7", "0x7" ]
            "gasUsedRatio" : [ 0.0011536265162931602, 0.10653990633315608 ]
          }
        }
        ```

### `eth_gasPrice`

Returns a percentile gas unit price for the most recent blocks, in Wei. By default,
the last 100 blocks are examined and the 50th percentile gas unit price (that is, the median value)
is returned.

If there are no blocks, the value for [`--min-gas-price`](../cli/options.md#min-gas-price) is returned.
The value returned is restricted to values between [`--min-gas-price`](../cli/options.md#min-gas-price)
and [`--api-gas-price-max`](../cli/options.md#api-gas-price-max). By default, 1000 Wei and
500GWei.

Use the [`--api-gas-price-blocks`](../cli/options.md#api-gas-price-blocks), [`--api-gas-price-percentile`](../cli/options.md#api-gas-price-percentile)
, and [`--api-gas-price-max`](../cli/options.md#api-gas-price-max) command line
options to configure the `eth_gasPrice` default values.

#### Parameters

None

#### Returns

`result`: *string* - percentile gas unit price for the most recent blocks, in Wei, as a hexadecimal value

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : "0x3e8"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{gasPrice}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          gasPrice
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "gasPrice" : "0x3e8"
          }
        }
        ```

### `eth_getBalance`

Returns the account balance of the specified address.

#### Parameters

* `address`: *string* - 20-byte account address from which to retrieve the balance

* `blockNumber` or `blockHash`: *string*  - integer representing a block number, block hash, or one
of the string tags `latest`, `earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *string* - current balance, in Wei, as a hexadecimal value

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xfe3b557e8fb62b89f4916b721be55ceb828dbd73", "latest"],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getBalance","params":["0xfe3b557e8fb62b89f4916b721be55ceb828dbd73", "latest"],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : "0x1cfe56f3795885980000"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{ account ( address: \"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73\") { balance } }"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          account(address: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73") {
            balance
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data": {
            "account": {
              "balance": "0x1ce96a1ffe7620d00000"
            }
          }
        }
        ```

### `eth_getBlockByHash`

Returns information about the block matching the specified block hash.

#### Parameters

* `hash`: *string* - 32-byte hash of a block

* `verbose`: *boolean* - if `true`, returns the full [transaction objects](objects.md#transaction-object);
if `false`, returns the transaction hashes

#### Returns

`result`: *object* - [block object](objects.md#block-object), or `null` when there is no
block

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xd5f1812548be429cbdc6376b29611fc49e06f1359758c4ceaaa3b393e2239f9c", false],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xd5f1812548be429cbdc6376b29611fc49e06f1359758c4ceaaa3b393e2239f9c", false],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : {
            "number" : "0x68b3",
            "hash" : "0xd5f1812548be429cbdc6376b29611fc49e06f1359758c4ceaaa3b393e2239f9c",
            "mixHash" : "0x24900fb3da77674a861c428429dce0762707ecb6052325bbd9b3c64e74b5af9d",
            "parentHash" : "0x1f68ac259155e2f38211ddad0f0a15394d55417b185a93923e2abe71bb7a4d6d",
            "nonce" : "0x378da40ff335b070",
            "sha3Uncles" : "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
            "logsBloom" : "0x00000000000000100000004080000000000500000000000000020000100000000800001000000004000001000000000000000800040010000020100000000400000010000000000000000040000000000000040000000000000000000000000000000400002400000000000000000000000000000004000004000000000000840000000800000080010004000000001000000800000000000000000000000000000000000800000000000040000000020000000000000000000800000400000000000000000000000600000400000000002000000000000000000000004000000000000000100000000000000000000000000000000000040000900010000000",
            "transactionsRoot" : "0x4d0c8e91e16bdff538c03211c5c73632ed054d00a7e210c0eb25146c20048126",
            "stateRoot" : "0x91309efa7e42c1f137f31fe9edbe88ae087e6620d0d59031324da3e2f4f93233",
            "receiptsRoot" : "0x68461ab700003503a305083630a8fb8d14927238f0bc8b6b3d246c0c64f21f4a",
            "miner" : "0xb42b6c4a95406c78ff892d270ad20b22642e102d",
            "difficulty" : "0x66e619a",
            "totalDifficulty" : "0x1e875d746ae",
            "extraData" : "0xd583010502846765746885676f312e37856c696e7578",
            "size" : "0x334",
            "gasLimit" : "0x47e7c4",
            "gasUsed" : "0x37993",
            "timestamp" : "0x5835c54d",
            "uncles" : [ ],
            "transactions" : [ "0xa0807e117a8dd124ab949f460f08c36c72b710188f01609595223b325e58e0fc", "0xeae6d797af50cb62a596ec3939114d63967c374fa57de9bc0f4e2b576ed6639d" ],
            "baseFeePerGas" : "0x7"
          }
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block (hash : \"0xb0efed1fc9326fee967cb2d845d4ebe57c5350a0670c8e86f8052dea6f219f92\") {number transactions{hash} timestamp difficulty totalDifficulty gasUsed gasLimit hash nonce ommerCount logsBloom mixHash ommerHash extraData stateRoot receiptsRoot transactionCount transactionsRoot}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block(hash: "0xb0efed1fc9326fee967cb2d845d4ebe57c5350a0670c8e86f8052dea6f219f92") {
            number
            transactions {
              hash
            }
            timestamp
            difficulty
            totalDifficulty
            gasUsed
            gasLimit
            hash
            nonce
            ommerCount
            logsBloom
            mixHash
            ommerHash
            extraData
            stateRoot
            receiptsRoot
            transactionCount
            transactionsRoot
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "number" : 17607,
              "transactions" : [ ],
              "timestamp" : "0x5cdbdfb5",
              "difficulty" : "0x1",
              "totalDifficulty" : "0x44c8",
              "gasUsed" : 0,
              "gasLimit" : 4700000,
              "hash" : "0xb0efed1fc9326fee967cb2d845d4ebe57c5350a0670c8e86f8052dea6f219f92",
              "nonce" : "0x0000000000000000",
              "ommerCount" : 0,
              "logsBloom" : "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              "mixHash" : "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
              "ommerHash" : "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
              "extraData" : "0xf882a00000000000000000000000000000000000000000000000000000000000000000d5949811ebc35d7b06b3fa8dc5809a1f9c52751e1deb808400000000f843b841fae6d25da0b91e3e88669d0a765c98479d86d53e9ea1f3fb6b36d7ff22fa622a3da0c49c20e5562c774e90acae8ad487936f6b6019cd8a782db684693cba1e9800",
              "stateRoot" : "0xa7086c266aed46cd3bc45579178f8acb36d9d147de575a3ecbf8c7e6f1c737fc",
              "receiptsRoot" : "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
              "transactionCount" : 0,
              "transactionsRoot" : "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
              "baseFeePerGas" : "0x7"
            }
          }
        }
        ```

### `eth_getBlockByNumber`

Returns information about the block matching the specified block number.

#### Parameters

* `blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, `pending`, `finalized`, or `safe` as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

* `verbose`: *boolean* - if `true`, returns the full [transaction objects](objects.md#transaction-object);
if `false`, returns only the hashes of the transactions.

#### Returns

`result`: *object* - [block object](objects.md#block-object), or `null` when there is no
block.

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x68B3", true],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x68B3", true],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : {
            "number" : "0x68b3",
            "hash" : "0xd5f1812548be429cbdc6376b29611fc49e06f1359758c4ceaaa3b393e2239f9c",
            "mixHash" : "0x24900fb3da77674a861c428429dce0762707ecb6052325bbd9b3c64e74b5af9d",
            "parentHash" : "0x1f68ac259155e2f38211ddad0f0a15394d55417b185a93923e2abe71bb7a4d6d",
            "nonce" : "0x378da40ff335b070",
            "sha3Uncles" : "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
            "logsBloom" : "0x00000000000000100000004080000000000500000000000000020000100000000800001000000004000001000000000000000800040010000020100000000400000010000000000000000040000000000000040000000000000000000000000000000400002400000000000000000000000000000004000004000000000000840000000800000080010004000000001000000800000000000000000000000000000000000800000000000040000000020000000000000000000800000400000000000000000000000600000400000000002000000000000000000000004000000000000000100000000000000000000000000000000000040000900010000000",
            "transactionsRoot" : "0x4d0c8e91e16bdff538c03211c5c73632ed054d00a7e210c0eb25146c20048126",
            "stateRoot" : "0x91309efa7e42c1f137f31fe9edbe88ae087e6620d0d59031324da3e2f4f93233",
            "receiptsRoot" : "0x68461ab700003503a305083630a8fb8d14927238f0bc8b6b3d246c0c64f21f4a",
            "miner" : "0xb42b6c4a95406c78ff892d270ad20b22642e102d",
            "difficulty" : "0x66e619a",
            "totalDifficulty" : "0x1e875d746ae",
            "extraData" : "0xd583010502846765746885676f312e37856c696e7578",
            "size" : "0x334",
            "gasLimit" : "0x47e7c4",
            "gasUsed" : "0x37993",
            "timestamp" : "0x5835c54d",
            "uncles" : [ ],
            "transactions" : [ ],
            "baseFeePerGas" : "0x7"
          }
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block (number : 100) {transactions{hash} timestamp difficulty totalDifficulty gasUsed gasLimit hash nonce ommerCount logsBloom mixHash ommerHash extraData stateRoot receiptsRoot transactionCount transactionsRoot ommers{hash} ommerAt(index : 1){hash} miner{address} account(address: \"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73\"){balance} parent{hash} }}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block(number: 100) {
            transactions {
              hash
            }
            timestamp
            difficulty
            totalDifficulty
            gasUsed
            gasLimit
            hash
            nonce
            ommerCount
            logsBloom
            mixHash
            ommerHash
            extraData
            stateRoot
            receiptsRoot
            transactionCount
            transactionsRoot
            ommers {
              hash
            }
            ommerAt(index: 1) {
              hash
            }
            miner {
              address
            }
            account(address: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73") {
              balance
            }
            parent {
              hash
            }
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "transactions" : [ ],
              "timestamp" : "0x5cd10933",
              "difficulty" : "0x1",
              "totalDifficulty" : "0x65",
              "gasUsed" : 0,
              "gasLimit" : 4700000,
              "hash" : "0x63b3ea2bc37fec8f82680eb823652da6af8acebb4f6c4d0ff659c55be473c8b0",
              "nonce" : "0x0000000000000000",
              "ommerCount" : 0,
              "logsBloom" : "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              "mixHash" : "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
              "ommerHash" : "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
              "extraData" : "0xf882a00000000000000000000000000000000000000000000000000000000000000000d5949811ebc35d7b06b3fa8dc5809a1f9c52751e1deb808400000000f843b8414d877d8d0ced37ea138fab55a978f3740367a24a31731322ecdc3368f11e0d4966c9ce17ae59a76fb94eb436e8a386868f6bd6b0a5678e58daf49f5dd940558b00",
              "stateRoot" : "0xd650578a04b39f50cc979155f4510ec28c2c0a7c1e5fdbf84609bc7b1c430f48",
              "receiptsRoot" : "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
              "transactionCount" : 0,
              "transactionsRoot" : "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
              "ommers" : [ ],
              "ommerAt" : null,
              "miner" : {
                "address" : "0x9811ebc35d7b06b3fa8dc5809a1f9c52751e1deb"
              },
              "account" : {
                "balance" : "0xad0f47f269cbf31ac"
              },
              "parent" : {
                "hash" : "0x7bca25e1fa5e395fd6029eb496a70b6b5495843976bf9e49b993c723ded29d9e"
              },
              "baseFeePerGas" : "0x7"
            }
          }
        }
        ```

### `eth_getBlockTransactionCountByHash`

Returns the number of transactions in the block matching the specified block hash.

#### Parameters

`hash`: *string* - 32-byte block hash

#### Returns

`result`: *number* - integer representing the number of transactions in the specified block,
or `null` if no matching block hash is found

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : null
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block(hash:\"0xe455c14f757b0b9b67774baad1be1c180a4c1657df52259dbb685bf375408097\"){transactionCount}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block(hash: "0xe455c14f757b0b9b67774baad1be1c180a4c1657df52259dbb685bf375408097") {
            transactionCount
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "transactionCount" : 1
            }
          }
        }
        ```

### `eth_getBlockTransactionCountByNumber`

Returns the number of transactions in a block matching the specified block number.

#### Parameters

`blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *string* - integer representing the number of transactions in the specified block,
or `null` if no matching block number is found

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":51}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0xe8"],"id":51}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 51,
          "result" : "0x8"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block(number:232){transactionCount}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block(number: 232) {
            transactionCount
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "transactionCount" : 1
            }
          }
        }
        ```

### `eth_getCode`

Returns the code of the smart contract at the specified address.
Besu stores compiled smart contract code as a hexadecimal value.

#### Parameters

`address`: *string* - 20-byte contract address

`blockNumber` or `blockHash`: *string* - integer representing a block number, block hash, or one of
the string tags `latest`, `earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *data* - code stored at the specified address

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xa50a51c09a5c451c52bb714527e1974b686d8e77", "latest"],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getCode","params":["0xa50a51c09a5c451c52bb714527e1974b686d8e77", "latest"],"id":53}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 53,
            "result": "0x60806040526004361060485763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633fa4f2458114604d57806355241077146071575b600080fd5b348015605857600080fd5b50605f6088565b60408051918252519081900360200190f35b348015607c57600080fd5b506086600435608e565b005b60005481565b60008190556040805182815290517f199cd93e851e4c78c437891155e2112093f8f15394aa89dab09e38d6ca0727879181900360200190a1505600a165627a7a723058209d8929142720a69bde2ab3bfa2da6217674b984899b62753979743c0470a2ea70029"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{"query": "{account(address: \"0xa50a51c09a5c451c52bb714527e1974b686d8e77\"){ code }}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          account(address: "0xa50a51c09a5c451c52bb714527e1974b686d8e77") {
            code
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "account" : {
              "code" : "0x60806040526004361060485763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633fa4f2458114604d57806355241077146071575b600080fd5b348015605857600080fd5b50605f6088565b60408051918252519081900360200190f35b348015607c57600080fd5b506086600435608e565b005b60005481565b60008190556040805182815290517f199cd93e851e4c78c437891155e2112093f8f15394aa89dab09e38d6ca0727879181900360200190a1505600a165627a7a723058209d8929142720a69bde2ab3bfa2da6217674b984899b62753979743c0470a2ea70029"
            }
          }
        }
        ```

### `eth_getFilterChanges`

Polls the specified filter and returns an array of changes that have occurred since the last poll.

#### Parameters

`filterId`: *string* - filter ID

#### Returns

`result`: *array* of *strings* or *objects* - if nothing changed since the last poll, an empty list; otherwise:

* For filters created with `eth_newBlockFilter`, returns block hashes.

* For filters created with `eth_newPendingTransactionFilter`, returns transaction hashes.

* For filters created with `eth_newFilter`, returns [log objects](objects.md#log-object).

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0xf8bf5598d9e04fbe84523d42640b9b0e"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0xf8bf5598d9e04fbe84523d42640b9b0e"],"id":1}
        ```

    === "JSON result"

        !!! example "Example result from a filter created with `eth_newBlockFilter`"

            ```json
            {
              "jsonrpc": "2.0",
              "id": 1,
              "result": [
                "0xda2bfe44bf85394f0d6aa702b5af89ae50ae22c0928c18b8903d9269abe17e0b",
                "0x88cd3a37306db1306f01f7a0e5b25a9df52719ad2f87b0f88ee0e6753ed4a812",
                "0x4d4c731fe129ff32b425e6060d433d3fde278b565bbd1fd624d5a804a34f8786"
              ]
            }
            ```

        !!! example "Example result from a filter created with `eth_newPendingTransactionFilter`"

            ```json
            {
              "jsonrpc": "2.0",
              "id": 1,
              "result": [
                "0x1e977049b6db09362da09491bee3949d9362080ce3f4fc19721196d508580d46",
                "0xa3abc4b9a4e497fd58dc59cdff52e9bb5609136bcd499e760798aa92802769be"
              ]
            }
            ```

        !!! example "Example result from a filter created with `eth_newFilter`"

            ```json
            {
              "jsonrpc": "2.0",
              "id": 1,
              "result": [
                {
                  "logIndex": "0x0",
                  "removed": false,
                  "blockNumber": "0x233",
                  "blockHash": "0xfc139f5e2edee9e9c888d8df9a2d2226133a9bd87c88ccbd9c930d3d4c9f9ef5",
                  "transactionHash": "0x66e7a140c8fa27fe98fde923defea7562c3ca2d6bb89798aabec65782c08f63d",
                  "transactionIndex": "0x0",
                  "address": "0x42699a7612a82f1d9c36148af9c77354759b210b",
                  "data": "0x0000000000000000000000000000000000000000000000000000000000000004",
                  "topics": [
                    "0x04474795f5b996ff80cb47c148d4c5ccdbe09ef27551820caa9c2f8ed149cce3"
                  ]
                },
                {
                  "logIndex": "0x0",
                  "removed": false,
                  "blockNumber": "0x238",
                  "blockHash": "0x98b0ec0f9fea0018a644959accbe69cd046a8582e89402e1ab0ada91cad644ed",
                  "transactionHash": "0xdb17aa1c2ce609132f599155d384c0bc5334c988a6c368056d7e167e23eee058",
                  "transactionIndex": "0x0",
                  "address": "0x42699a7612a82f1d9c36148af9c77354759b210b",
                  "data": "0x0000000000000000000000000000000000000000000000000000000000000007",
                  "topics": [
                    "0x04474795f5b996ff80cb47c148d4c5ccdbe09ef27551820caa9c2f8ed149cce3"
                  ]
                }
              ]
            }
            ```

### `eth_getFilterLogs`

Returns an array of [logs](../../concepts/events-and-logs.md) for the specified filter.

Leave the [`--auto-log-bloom-caching-enabled`](../cli/options.md#auto-log-bloom-caching-enabled)
command line option at the default value of `true` to improve log retrieval performance.

!!! note

    `eth_getFilterLogs` is only used for filters created with `eth_newFilter`. To specify a filter
    object and get logs without creating a filter, use `eth_getLogs`.

#### Parameters

`filterId`: *string* - filter ID

#### Returns

`result`: *array* of *objects* - list of [log objects](objects.md#log-object)

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x5ace5de3985749b6a1b2b0d3f3e1fb69"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x5ace5de3985749b6a1b2b0d3f3e1fb69"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : [ {
            "logIndex" : "0x0",
            "removed" : false,
            "blockNumber" : "0xb3",
            "blockHash" : "0xe7cd776bfee2fad031d9cc1c463ef947654a031750b56fed3d5732bee9c61998",
            "transactionHash" : "0xff36c03c0fba8ac4204e4b975a6632c862a3f08aa01b004f570cc59679ed4689",
            "transactionIndex" : "0x0",
            "address" : "0x2e1f232a9439c3d459fceca0beef13acc8259dd8",
            "data" : "0x0000000000000000000000000000000000000000000000000000000000000003",
            "topics" : [ "0x04474795f5b996ff80cb47c148d4c5ccdbe09ef27551820caa9c2f8ed149cce3" ]
          }, {
            "logIndex" : "0x0",
            "removed" : false,
            "blockNumber" : "0xb6",
            "blockHash" : "0x3f4cf35e7ed2667b0ef458cf9e0acd00269a4bc394bb78ee07733d7d7dc87afc",
            "transactionHash" : "0x117a31d0dbcd3e2b9180c40aca476586a648bc400aa2f6039afdd0feab474399",
            "transactionIndex" : "0x0",
            "address" : "0x2e1f232a9439c3d459fceca0beef13acc8259dd8",
            "data" : "0x0000000000000000000000000000000000000000000000000000000000000005",
            "topics" : [ "0x04474795f5b996ff80cb47c148d4c5ccdbe09ef27551820caa9c2f8ed149cce3" ]
          } ]
        }
        ```

### `eth_getLogs`

Returns an array of [logs](../../concepts/events-and-logs.md) matching a specified filter object.

Leave the [`--auto-log-bloom-caching-enabled`](../cli/options.md#auto-log-bloom-caching-enabled)
command line option at the default value of `true` to improve log retrieval performance.

!!! important
    Using `eth_getLogs` to get logs from a large range of blocks, especially an entire chain from
    its genesis block, might cause Besu to hang for an indeterminable amount of time while generating
    the response.
    We recommend setting a range limit using the [`--rpc-max-logs-range`](../cli/options.md#rpc-max-logs-range)
    option (or leaving it at its default value of 1000).

#### Parameters

`filterOptions`: *object* - [filter options object](objects.md#filter-options-object)

#### Returns

`result`: *array* of *objects* - list of [log objects](objects.md#log-object)

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"fromBlock":"earliest", "toBlock":"latest", "address": "0x2e1f232a9439c3d459fceca0beef13acc8259dd8", "topics":[]}], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getLogs","params":[{"fromBlock":"earliest", "toBlock":"latest", "address": "0x2e1f232a9439c3d459fceca0beef13acc8259dd8", "topics":[]}], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : [ {
            "logIndex" : "0x0",
            "removed" : false,
            "blockNumber" : "0xb3",
            "blockHash" : "0xe7cd776bfee2fad031d9cc1c463ef947654a031750b56fed3d5732bee9c61998",
            "transactionHash" : "0xff36c03c0fba8ac4204e4b975a6632c862a3f08aa01b004f570cc59679ed4689",
            "transactionIndex" : "0x0",
            "address" : "0x2e1f232a9439c3d459fceca0beef13acc8259dd8",
            "data" : "0x0000000000000000000000000000000000000000000000000000000000000003",
            "topics" : [ "0x04474795f5b996ff80cb47c148d4c5ccdbe09ef27551820caa9c2f8ed149cce3" ]
          }, {
            "logIndex" : "0x0",
            "removed" : false,
            "blockNumber" : "0xb6",
            "blockHash" : "0x3f4cf35e7ed2667b0ef458cf9e0acd00269a4bc394bb78ee07733d7d7dc87afc",
            "transactionHash" : "0x117a31d0dbcd3e2b9180c40aca476586a648bc400aa2f6039afdd0feab474399",
            "transactionIndex" : "0x0",
            "address" : "0x2e1f232a9439c3d459fceca0beef13acc8259dd8",
            "data" : "0x0000000000000000000000000000000000000000000000000000000000000005",
            "topics" : [ "0x04474795f5b996ff80cb47c148d4c5ccdbe09ef27551820caa9c2f8ed149cce3" ]
          } ]
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{"query": "{logs(filter:{fromBlock: 1486000, toBlock: 1486010, addresses: [\"0x7ef66b77759e12caf3ddb3e4aff524e577c59d8d\"], topics: [[\"0x8a22ee899102a366ac8ad0495127319cb1ff2403cfae855f83a89cda1266674d\"]]}) {index topics data account{address} transaction{hash} }}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          logs(filter: {fromBlock: 1486000, toBlock: 1486010, addresses: ["0x7ef66b77759e12caf3ddb3e4aff524e577c59d8d"], topics: [["0x8a22ee899102a366ac8ad0495127319cb1ff2403cfae855f83a89cda1266674d"]]}) {
            index
            topics
            data
            account {
              address
            }
            transaction {
              hash
            }
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data": {
            "logs": [
              {
                "index": 0,
                "topics": [
                  "0x8a22ee899102a366ac8ad0495127319cb1ff2403cfae855f83a89cda1266674d",
                  "0x0000000000000000000000000000000000000000000000000000000000000004",
                  "0x0000000000000000000000000000000000000000000000000000000000508918"
                ],
                "data": "0xa5a04999ec29a8bd19ce32b859280ef9dbb464d846be06f64a1b1012ec08ab03",
                "account": {
                  "address": "0x7ef66b77759e12caf3ddb3e4aff524e577c59d8d"
                },
                "transaction": {
                  "hash": "0x36a2186344c6a32760e7700fdf3685936220876c51ff39d071eb48c17f7e802f"
                }
              },
              {
                "index": 0,
                "topics": [
                  "0x8a22ee899102a366ac8ad0495127319cb1ff2403cfae855f83a89cda1266674d",
                  "0x0000000000000000000000000000000000000000000000000000000000000003",
                  "0x0000000000000000000000000000000000000000000000000000000000648c72"
                ],
                "data": "0x0ee96b660ad82c8010c90760a03edfbb40b4af5e3634a8c214e4ac7fa1f61492",
                "account": {
                  "address": "0x7ef66b77759e12caf3ddb3e4aff524e577c59d8d"
                },
                "transaction": {
                  "hash": "0x9e2cc9e84a9e78839d6f4b591dfd98cc7a454a8ee3cd6ccd0a18e662e22d3818"
                }
              }
            ]
          }
        }
        ```

### `eth_getMinerDataByBlockHash`

Returns miner data for the specified block.

#### Parameters

`hash`: *string* - 32-byte block hash

#### Returns

`result`: *object* - [miner data object](objects.md#miner-data-object)

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method": "eth_getMinerDataByBlockHash","params": ["0xbf137c3a7a1ebdfac21252765e5d7f40d115c2757e4a4abee929be88c624fdb7"],"id": 1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method": "eth_getMinerDataByBlockHash","params": ["0xbf137c3a7a1ebdfac21252765e5d7f40d115c2757e4a4abee929be88c624fdb7"],"id": 1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "netBlockReward": "0x47c6f3739f3da800",
            "staticBlockReward": "0x4563918244f40000",
            "transactionFee": "0x38456548220800",
            "uncleInclusionReward": "0x22b1c8c1227a000",
            "uncleRewards": [
              {
                "hash": "0x2422d43b4f72e19faf4368949a804494f67559405046b39c6d45b1bd53044974",
                "coinbase": "0x0c062b329265c965deef1eede55183b3acb8f611"
              }
            ],
            "coinbase": "0xb42b6c4a95406c78ff892d270ad20b22642e102d",
            "extraData": "0xd583010502846765746885676f312e37856c696e7578",
            "difficulty": "0x7348c20",
            "totalDifficulty": "0xa57bcfdd96"
          }
        }
        ```

### `eth_getMinerDataByBlockNumber`

Returns miner data for the specified block.

#### Parameters

`blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *object* - [miner data object](objects.md#miner-data-object)

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method": "eth_getMinerDataByBlockNumber","params": ["0x7689D2"],"id": 1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method": "eth_getMinerDataByBlockNumber","params": ["0x7689D2"],"id": 1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "netBlockReward": "0x47c6f3739f3da800",
            "staticBlockReward": "0x4563918244f40000",
            "transactionFee": "0x38456548220800",
            "uncleInclusionReward": "0x22b1c8c1227a000",
            "uncleRewards": [
              {
                "hash": "0x2422d43b4f72e19faf4368949a804494f67559405046b39c6d45b1bd53044974",
                "coinbase": "0x0c062b329265c965deef1eede55183b3acb8f611"
              }
            ],
            "coinbase": "0xb42b6c4a95406c78ff892d270ad20b22642e102d",
            "extraData": "0xd583010502846765746885676f312e37856c696e7578",
            "difficulty": "0x7348c20",
            "totalDifficulty": "0xa57bcfdd96"
          }
        }
        ```

### `eth_getProof`

Returns the account and storage values of the specified account, including the Merkle proof.

The API allows IoT devices or mobile apps which are unable to run light clients to verify responses
from untrusted sources, by using a trusted block hash.

#### Parameters

`address`: *string* - 20-byte address of the account or contract

`keys`: *array* of *strings* - list of 32-byte storage keys to generate proofs for

`blockNumber` or `blockHash`: *string* - integer representing a block number, block hash, or one of
the string tags `latest`, `earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *object* - account details object with the following fields:

* `balance`: *string* - account balance

* `codeHash`: *string* - 32-byte hash of the account code

* `nonce`: *string* - number of transactions sent from the account

* `storageHash`: *string* - 32-byte SHA3 of the `storageRoot`

* `accountProof`: *array* of *strings* - list of RLP-encoded Merkle tree nodes, starting with the `stateRoot`

* `storageProof`: *array* of *objects* - list of storage entry objects with the following fields:

    * `key`: *string* - storage key

    * `value`: *string* - storage value

    * `proof`: *array* of *strings* - list of RLP-encoded Merkle tree nodes, starting with the `storageHash`

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method": "eth_getProof","params": [
        "0a8156e7ee392d885d10eaa86afd0e323afdcd95", ["0x0000000000000000000000000000000000000000000000000000000000000347"], "latest"],"id": 1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method": "eth_getProof","params": [
        "0a8156e7ee392d885d10eaa86afd0e323afdcd95", ["0x0000000000000000000000000000000000000000000000000000000000000347"], "latest"],"id": 1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": {
            "accountProof": [
              "0xf90211a0...608d898380",
              "0xf90211a0...ec33f19580",
              "0xf901d1a0...9e55584480",
              "0xf8718080...18e5777142"
            ],
            "address": "0x0a8156e7ee392d885d10eaa86afd0e323afdcd95",
            "balance": "0x0",
            "codeHash": "0x2b6975dcaf69f9bb9a3b30bb6a37b305ce440250bf0dd2f23338cb18e5777142",
            "nonce": "0x5f",
            "storageHash": "0x917688de43091589aa58c1dfd315105bc9de4478b9ba7471616a4d8a43d46203",
            "storageProof": [
              {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000347",
                "value": "0x0",
                "proof": [
                  "0xf90211a0...5176779280",
                  "0xf901f1a0...c208d86580",
                  "0xf8d180a0...1ce6808080"
                ]
              }
            ]
          }
        }
        ```

### `eth_getStorageAt`

Returns the value of a storage position at a specified address.

#### Parameters

`address`: *string* - 20-byte storage address

`index`: *string* - integer index of the storage position

`blockNumber` or `blockHash`: *string* - integer representing a block number, block hash, or one of
the string tags `latest`, `earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result` : *string* - value at the specified storage position

!!! example

    Calculating the correct position depends on the storage you want to retrieve.

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method": "eth_getStorageAt","params": ["0x‭3B3F3E‬","0x0","latest"],"id": 53}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method": "eth_getStorageAt","params": ["0x‭3B3F3E‬","0x0","latest"],"id": 53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : "0x0000000000000000000000000000000000000000000000000000000000000000"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{account(address: \"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73\") {storage(slot: \"0x04\")}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          account(address: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73") {
            storage(slot: "0x04")
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "account" : {
              "storage" : "0x0000000000000000000000000000000000000000000000000000000000000000"
            }
          }
        }
        ```

### `eth_getTransactionByBlockHashAndIndex`

Returns transaction information for the specified block hash and transaction index position.

#### Parameters

`block`: *string* - 32-byte hash of a block

`index`: *string* - integer representing the transaction index position

#### Returns

`result`: *object* - [transaction object](objects.md#transaction-object), or `null` when there is no
transaction

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0xbf137c3a7a1ebdfac21252765e5d7f40d115c2757e4a4abee929be88c624fdb7", "0x2"], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0xbf137c3a7a1ebdfac21252765e5d7f40d115c2757e4a4abee929be88c624fdb7", "0x2"], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : {
            "blockHash" : "0xbf137c3a7a1ebdfac21252765e5d7f40d115c2757e4a4abee929be88c624fdb7",
            "blockNumber" : "0x1442e",
            "chainId": 2018,
            "from" : "0x70c9217d814985faef62b124420f8dfbddd96433",
            "gas" : "0x3d090",
            "gasPrice" : "0x57148a6be",
            "hash" : "0xfc766a71c406950d4a4955a340a092626c35083c64c7be907060368a5e6811d6",
            "input" : "0x51a34eb8000000000000000000000000000000000000000000000029b9e659e41b780000",
            "nonce" : "0x2cb2",
            "to" : "0xcfdc98ec7f01dab1b67b36373524ce0208dc3953",
            "transactionIndex" : "0x2",
            "value" : "0x0",
            "v" : "0x2a",
            "r" : "0xa2d2b1021e1428740a7c67af3c05fe3160481889b25b921108ac0ac2c3d5d40a",
            "s" : "0x63186d2aaefe188748bfb4b46fb9493cbc2b53cf36169e8501a5bc0ed941b484"
          }
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{"query": "{ block(hash: \"0x9270651f9c6fa36232c379d0ecf69b519383aa275815a65f1e03114346668f69\") { transactionAt(index: 0) {block{hash}  hash } } }"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block(hash: "0x9270651f9c6fa36232c379d0ecf69b519383aa275815a65f1e03114346668f69") {
            transactionAt(index: 0) {
              block {
                hash
              }
              hash
            }
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "transactionAt" : {
                "block" : {
                  "hash" : "0x9270651f9c6fa36232c379d0ecf69b519383aa275815a65f1e03114346668f69"
                },
                "hash" : "0x5f5366af89e8777d5ae62a1af94a0876bdccbc22417bed0aff361eefa3e37f86"
              }
            }
          }
        }
        ```

### `eth_getTransactionByBlockNumberAndIndex`

Returns transaction information for the specified block number and transaction index position.

#### Parameters

`blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

`index`: *string* - transaction index position

#### Returns

`result`: *object* - [transaction object](objects.md#transaction-object), or `null` when there is no
transaction

!!! example

    This request returns the third transaction in the 82990 block on the Ropsten testnet. You can
    also view this [block](https://ropsten.etherscan.io/txs?block=82990) and [transaction] on
    Etherscan.

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["82990", "0x2"], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["82990", "0x2"], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : {
            "blockHash" : "0xbf137c3a7a1ebdfac21252765e5d7f40d115c2757e4a4abee929be88c624fdb7",
            "blockNumber" : "0x1442e",
            "chainId": 2018,
            "from" : "0x70c9217d814985faef62b124420f8dfbddd96433",
            "gas" : "0x3d090",
            "gasPrice" : "0x57148a6be",
            "hash" : "0xfc766a71c406950d4a4955a340a092626c35083c64c7be907060368a5e6811d6",
            "input" : "0x51a34eb8000000000000000000000000000000000000000000000029b9e659e41b780000",
            "nonce" : "0x2cb2",
            "to" : "0xcfdc98ec7f01dab1b67b36373524ce0208dc3953",
            "transactionIndex" : "0x2",
            "value" : "0x0",
            "v" : "0x2a",
            "r" : "0xa2d2b1021e1428740a7c67af3c05fe3160481889b25b921108ac0ac2c3d5d40a",
            "s" : "0x63186d2aaefe188748bfb4b46fb9493cbc2b53cf36169e8501a5bc0ed941b484"
          }
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{"query": "{block(number:20303) {transactionAt(index: 0) {block{hash} hash}}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block(number: 20303) {
            transactionAt(index: 0) {
              block {
                hash
              }
              hash
            }
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "transactionAt" : {
              "block" : {
                "hash" : "0x9270651f9c6fa36232c379d0ecf69b519383aa275815a65f1e03114346668f69"
              },
              "hash" : "0x5f5366af89e8777d5ae62a1af94a0876bdccbc22417bed0aff361eefa3e37f86"
              }
            }
          }
        }
        ```

### `eth_getTransactionByHash`

Returns transaction information for the specified transaction hash.

#### Parameters

`transaction`: *string* - 32-byte transaction hash

#### Returns

`result`: *object* - [transaction object](objects.md#transaction-object), or `null` when there is no
transaction

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xa52be92809541220ee0aaaede6047d9a6c5d0cd96a517c854d944ee70a0ebb44"],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0xa52be92809541220ee0aaaede6047d9a6c5d0cd96a517c854d944ee70a0ebb44"],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : {
            "blockHash" : "0x510efccf44a192e6e34bcb439a1947e24b86244280762cbb006858c237093fda",
            "blockNumber" : "0x422",
            "chainId": 2018,
            "from" : "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
            "gas" : "0x5208",
            "gasPrice" : "0x3b9aca00",
            "hash" : "0xa52be92809541220ee0aaaede6047d9a6c5d0cd96a517c854d944ee70a0ebb44",
            "input" : "0x",
            "nonce" : "0x1",
            "to" : "0x627306090abab3a6e1400e9345bc60c78a8bef57",
            "transactionIndex" : "0x0",
            "value" : "0x4e1003b28d9280000",
            "v" : "0xfe7",
            "r" : "0x84caf09aefbd5e539295acc67217563438a4efb224879b6855f56857fa2037d3",
            "s" : "0x5e863be3829812c81439f0ae9d8ecb832b531d651fb234c848d1bf45e62be8b9"
          }
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{"query": "{transaction(hash : \"0x03d80b9ca0a71435399a268609d6d7896f7155d2147cc22b780672bcb59b170d\") { block{hash} gas gasPrice hash nonce value from {address} to {address} status}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          transaction(hash: "0x03d80b9ca0a71435399a268609d6d7896f7155d2147cc22b780672bcb59b170d") {
            block {
              hash
            }
            gas
            gasPrice
            hash
            nonce
            value
            from {
              address
            }
            to {
              address
            }
            status
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "transaction" : {
              "block" : {
                "hash" : "0xb1ef35744bade6980c3a933024b2557a8c724a19e5fdd2116bac712aa5e57198"
              },
              "gas" : 21000,
              "gasPrice" : "0x2540be400",
              "hash" : "0x03d80b9ca0a71435399a268609d6d7896f7155d2147cc22b780672bcb59b170d",
              "nonce" : 6,
              "value" : "0x8ac7230489e80000",
              "from" : {
                "address" : "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
              },
              "to" : {
                "address" : "0x9d8f8572f345e1ae53db1dfa4a7fce49b467bd7f"
              },
              "status" : 1
            }
          }
        }
        ```

### `eth_getTransactionCount`

Returns the number of transactions sent from a specified address. Use the `pending` tag to get the
next account nonce not used by any pending transactions.

#### Parameters

`address`: *string* - 20-byte account address

`blockNumber` or `blockHash`: *string* - integer representing a block number, block hash, or one of
the string tags `latest`, `earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *string* - integer representing the number of transactions sent from the specified address

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0xc94770007dda54cF92009BFF0dE90c06F603a09f","latest"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : "0x1"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{ account (address:\"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73\"){transactionCount}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          account(address: "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73") {
            transactionCount
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "account" : {
              "transactionCount" : 5
            }
          }
        }
        ```

### `eth_getTransactionReceipt`

Returns the receipt of a transaction by transaction hash. Receipts for pending transactions are not
available.

If you enabled [revert reason](../../../private-networks/how-to/send-transactions/revert-reason.md), the receipt includes
available revert reasons in the response.

#### Parameters

`transaction`: *string* - 32-byte hash of a transaction

#### Returns

`result`: *object* - [transaction receipt object](objects.md#transaction-receipt-object), or `null` when
there is no receipt

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x504ce587a65bdbdb6414a0c6c16d86a04dd79bfcc4f2950eec9634b30ce5370f"],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x504ce587a65bdbdb6414a0c6c16d86a04dd79bfcc4f2950eec9634b30ce5370f"],"id":53}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": {
                "blockHash": "0xe7212a92cfb9b06addc80dec2a0dfae9ea94fd344efeb157c41e12994fcad60a",
                "blockNumber": "0x50",
                "contractAddress": null,
                "cumulativeGasUsed": "0x5208",
                "from": "0x627306090abab3a6e1400e9345bc60c78a8bef57",
                "gasUsed": "0x5208",
                "effectiveGasPrice": "0x1",
                "logs": [],
                "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "status": "0x1",
                "to": "0xf17f52151ebef6c7334fad080c5704d77216b732",
                "transactionHash": "0xc00e97af59c6f88de163306935f7682af1a34c67245e414537d02e422815efc3",
                "transactionIndex": "0x0"
            }
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{"query": "{transaction(hash: \"0x5f5366af89e8777d5ae62a1af94a0876bdccbc22417bed0aff361eefa3e37f86\") {block{hash logsBloom} hash createdContract{address} cumulativeGasUsed gas gasUsed logs{topics} from{address} to{address} index}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          transaction(hash: "0x5f5366af89e8777d5ae62a1af94a0876bdccbc22417bed0aff361eefa3e37f86") {
            block {
              hash
              logsBloom
            }
            hash
            createdContract {
              address
            }
            cumulativeGasUsed
            gas
            gasUsed
            logs {
              topics
            }
            from {
              address
            }
            to {
              address
            }
            index
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "transaction" : {
              "block" : {
                "hash" : "0x9270651f9c6fa36232c379d0ecf69b519383aa275815a65f1e03114346668f69",
                "logsBloom" : "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
              },
              "hash" : "0x5f5366af89e8777d5ae62a1af94a0876bdccbc22417bed0aff361eefa3e37f86",
              "createdContract" : null,
              "cumulativeGasUsed" : 21000,
              "gas" : 21000,
              "gasUsed" : 21000,
              "effectiveGasPrice": "0x1",
              "logs" : [ ],
              "from" : {
                "address" : "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
              },
              "to" : {
                "address" : "0x9d8f8572f345e1ae53db1dfa4a7fce49b467bd7f"
              },
              "index" : 0
            }
          }
        }
        ```

### `eth_getUncleByBlockHashAndIndex`

Returns uncle specified by block hash and index.

#### Parameters

`block`: *string* - 32-byte block hash

`uncleIndex`: *string* - index of the uncle

#### Returns

`result`: *object* - [block object](objects.md#block-object)

!!! note

    Uncles don't contain individual transactions.

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0xc48fb64230a82f65a08e7280bd8745e7fea87bc7c206309dee32209fe9a985f7", "0x0"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0xc48fb64230a82f65a08e7280bd8745e7fea87bc7c206309dee32209fe9a985f7", "0x0"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc":"2.0",
          "id":1,
          "result":{
            "difficulty":"0x76b123df93230",
            "extraData":"0x50505945206e616e6f706f6f6c2e6f7267",
            "gasLimit":"0x7a121d",
            "gasUsed":"0x7a0175",
            "hash":"0xc20189c0b1a4a23116ab3b177e929137f6e826f17fc4c2e880e7258c620e9817",
            "logsBloom":"0x890086c024487ca422be846a201a10e41bc2882902312116c1119609482031e9c000e2a708004a10281024028020c505727a12570c4810121c59024490b040894406a1c23c37a0094810921da3923600c71c03044b40924280038d07ab91964a008084264a01641380798840805a284cce201a8026045451002500113a00de441001320805ca2840037000111640d090442c11116d2112948084240242340400236ce81502063401dcc214b9105194d050884721c1208800b20501a4201400276004142f118e60808284506979a86e050820101c170c185e2310005205a82a2100382422104182090184800c02489e033440218142140045801c024cc1818485",
            "miner":"0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5",
            "mixHash":"0xf557cc827e058862aa3ea1bd6088fb8766f70c0eac4117c56cf85b7911f82a14",
            "nonce":"0xd320b48904347cdd",
            "number":"0x768964",
            "parentHash":"0x98d752708b3677df8f439c4529f999b94663d5494dbfc08909656db3c90f6255",
            "receiptsRoot":"0x0f838f0ceb73368e7fc8d713a7761e5be31e3b4beafe1a6875a7f275f82da45b",
            "sha3Uncles":"0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
            "size":"0x21a",
            "stateRoot":"0xa0c7d4fca79810c89c517eff8dadb9c6d6f4bcc27c2edfb301301e1cf7dec642",
            "timestamp":"0x5cdcbba6",
            "totalDifficulty":"0x229ad33cabd4c40d23d",
            "transactionsRoot":"0x866e38e91d01ef0387b8e07ccf35cd910224271ccf2b7477b8c8439e8b70f365",
            "uncles":[]
          }
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block(hash:\"0xc48fb64230a82f65a08e7280bd8745e7fea87bc7c206309dee32209fe9a985f7\"){ ommerAt(index: 0) {difficulty extraData gasLimit gasUsed hash logsBloom mixHash nonce number receiptsRoot stateRoot timestamp totalDifficulty transactionsRoot}}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block(hash: "0xc48fb64230a82f65a08e7280bd8745e7fea87bc7c206309dee32209fe9a985f7") {
            ommerAt(index: 0) {
              difficulty
              extraData
              gasLimit
              gasUsed
              hash
              logsBloom
              mixHash
              nonce
              number
              receiptsRoot
              stateRoot
              timestamp
              totalDifficulty
              transactionsRoot
            }
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data": {
            "block": {
              "difficulty": "0x1",
              "extraData": "0xf882a00000000000000000000000000000000000000000000000000000000000000000d5949811ebc35d7b06b3fa8dc5809a1f9c52751e1deb808400000000f843b8418e98ef756acdae1e510b1df4b507b7af04eb3802db7fa0f3e73e7d0721b3645e76f4eb3d0dbf0de75620c4405bd5a663247cdd9616482c883053856d857f884a01",
              "gasLimit": 4700000,
              "gasUsed": 0,
              "hash": "0x0efe67972b982eb6be5df84e5238eb07475f86afa8a7de708f6a13ac0ff60d6c",
              "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
              "nonce": "0x0000000000000000",
              "number": 200,
              "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
              "stateRoot": "0xd650578a04b39f50cc979155f4510ec28c2c0a7c1e5fdbf84609bc7b1c430f48",
              "timestamp": "0x5cd109fb",
              "totalDifficulty": "0xc9",
              "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
            }
          }
        }
        ```

### `eth_getUncleByBlockNumberAndIndex`

Returns uncle specified by block number and index.

#### Parameters

* `blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

* `uncleIndex`: *string* - index of the uncle

#### Returns

`result`: *object* - [block object](objects.md#block-object)

!!! note

    Uncles do not contain individual transactions.

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x7689D2", "0x0"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x7689D2", "0x0"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc":"2.0",
          "id":1,
          "result":{
            "difficulty":"0x77daec467bf93",
            "extraData":"0x50505945206e616e6f706f6f6c2e6f7267",
            "gasLimit":"0x7a121d",
            "gasUsed":"0x7a0f7b",
            "hash":"0x42d83ae9c0743f4b1f9c61ff7ea8b164c1bab3627decd49233760680be006ecf",
            "logsBloom":"0x888200800000340120220008640200500408006100038400100581c000080240080a0014e8002010080004088040004022402a000c18010001400100002a041141a0610a0052900600041018c0002a0003090020404c00206010010513d00020005380124e08050480710000000108401012b0901c1424006000083a10a8c1040100a0440081050210124400040044304070004001100000012600806008061d0320800000b40042160600002480000000800000c0002100200940801c000820800048024904710000400640490026000a44300309000286088010c2300060003011380006400200812009144042204810209020410a84000410520c08802941",
            "miner":"0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5",
            "mixHash":"0xf977fcdb52868be410b75ef2becc35cc312f13ab0a6ce400ecd9d445f66fa3f2",
            "nonce":"0x628b28403bf1e3d3",
            "number":"0x7689d0",
            "parentHash":"0xb32cfdfbf4adb05d30f02fcc6fe039cc6666402142954051c1a1cb9cc91aa11e",
            "receiptsRoot":"0x9c7c8361d1a24ea2841432234c81974a9920d3eba2b2b1c496b5f925a95cb4ac",
            "sha3Uncles":"0x7d972aa1b182b7e93f1db043f03fbdbfac6874fe7e67e162141bcc0aefa6336b",
            "size":"0x21a",
            "stateRoot":"0x74e97b77813146344d75acb5a52a006cc6dfaca678a10fb8a484a8443e919272",
            "timestamp":"0x5cdcc0a7",
            "totalDifficulty":"0x229b0583b4bd2698ca0",
            "transactionsRoot":"0x1d21626afddf05e5866de66ca3fcd98f1caf5357eba0cc6ec675606e116a891b",
            "uncles":[]
          }
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block(number:2587){ ommerAt(index: 0) {difficulty extraData gasLimit gasUsed hash logsBloom mixHash nonce number receiptsRoot stateRoot timestamp totalDifficulty transactionsRoot}}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block(number: 2587) {
            ommerAt(index: 0) {
              difficulty
              extraData
              gasLimit
              gasUsed
              hash
              logsBloom
              mixHash
              nonce
              number
              receiptsRoot
              stateRoot
              timestamp
              totalDifficulty
              transactionsRoot
            }
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "ommerAt" : null
            }
          }
        }
        ```

### `eth_getUncleCountByBlockHash`

Returns the number of uncles in a block from a block matching the given block hash.

#### Parameters

`block`: *string* - 32-byte block hash

#### Returns

`result`: *string* - integer representing the number of uncles in the specified block

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : 0x0
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block(hash:\"0x65c08d792e4192b9ece6b6f2390da7da464208b22d88490be8add9373917b426\"){ommerCount}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block(hash: "0x65c08d792e4192b9ece6b6f2390da7da464208b22d88490be8add9373917b426") {
            ommerCount
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "ommerCount" : 2
            }
          }
        }
        ```

### `eth_getUncleCountByBlockNumber`

Returns the number of uncles in a block matching the specified block number.

#### Parameters

`blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *string* - integer representing the number of uncles in the specified block

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : "0x1"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block(number:\"0x59fd\"){ommerCount}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          block(number: "0x59fd") {
            ommerCount
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "block" : {
              "ommerCount" : 0
            }
          }
        }
        ```

### `eth_getWork`

Returns the hash of the current block, the seed hash, and the required target boundary condition.

#### Parameters

None

#### Returns

`result`: *array* of *strings* - array with the following items:

* `header`: *string* - 32-byte hash of the current block header (PoW-hash)

* `seed`: *string* - 32-byte seed hash used for the DAG

* `target`: *string* - 32-byte required target boundary condition: 2^256 / difficulty

* `blockNumber`: *string* - hexadecimal integer representing the current block number

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getWork","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_getWork","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": [
            "0xce5e32ca59cb86799a1879e90150b2c3b882852173e59865e9e79abb67a9d636",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            "0x00a3d70a3d70a3d70a3d70a3d70a3d70a3d70a3d70a3d70a3d70a3d70a3d70a3",
            "0x42"
          ]
        }
        ```

### `eth_hashrate`

Returns the number of hashes per second with which the node is mining.

When the stratum server is enabled, this method returns the cumulative hashrate of all sealers
reporting their hashrate.

#### Parameters

None

#### Returns

`result`: *string* - number of hashes per second

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": "0x12b"
        }
        ```

### `eth_mining`

Whether the client is actively mining new blocks. Besu pauses mining while the client synchronizes
with the network regardless of command settings or methods called.

#### Parameters

None

#### Returns

`result`: *boolean* - indicates if the client is actively mining new blocks

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_mining","params":[],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : true
        }
        ```

### `eth_newBlockFilter`

Creates a filter to retrieve new block hashes.
To poll for new blocks, use [`eth_getFilterChanges`](#eth_getfilterchanges).

#### Parameters

None

#### Returns

`result`: *string* - filter ID

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": "0x9d78b6780f844228b96ecc65a320a825"
        }
        ```

### `eth_newFilter`

Creates a [log filter](../../concepts/events-and-logs.md).
To poll for logs associated with the created filter, use [`eth_getFilterChanges`](#eth_getfilterchanges).
To get all logs associated with the filter, use [`eth_getFilterLogs`](#eth_getfilterlogs).

#### Parameters

`filterOptions`: *object* - [filter options object](objects.md#filter-options-object)

!!! note

    `fromBlock` and `toBlock` in the filter options object default to `latest`.

#### Returns

`result`: *string* - filter ID

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"fromBlock":"earliest", "toBlock":"latest", "topics":[]}],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_newFilter","params":[{"fromBlock":"earliest", "toBlock":"latest", "topics":[]}],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": "0x1ddf0c00989044e9b41cc0ae40272df3"
        }
        ```

### `eth_newPendingTransactionFilter`

Creates a filter to retrieve new pending transactions hashes.
To poll for new pending transactions, use [`eth_getFilterChanges`](#eth_getfilterchanges).

#### Parameters

None

#### Returns

`result`: *string* - filter ID

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": "0x443d6a77c4964707a8554c92f7e4debd"
        }
        ```

### `eth_protocolVersion`

Returns current Ethereum protocol version.

#### Parameters

None

#### Returns

`result`: *string* - Ethereum protocol version

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": "0x3f"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{protocolVersion}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          protocolVersion
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "protocolVersion" : 63
          }
        }
        ```

### `eth_sendRawTransaction`

Sends a [signed transaction](../../how-to/send-transactions.md).
A transaction can send ether, deploy a contract, or interact with a contract.
Set the maximum transaction fee for transactions using the [`--rpc-tx-feecap`](../cli/options.md#rpc-tx-feecap) CLI option.

You can interact with contracts using `eth_sendRawTransaction` or [`eth_call`](#eth_call).

To avoid exposing your private key, create signed transactions offline and send the signed
transaction data using `eth_sendRawTransaction`.

!!! important

    Besu doesn't implement [`eth_sendTransaction`](../../how-to/send-transactions.md).

    [EthSigner](https://docs.ethsigner.consensys.net/) provides transaction signing and implements
    [`eth_sendTransaction`](https://docs.ethsigner.consensys.net/Using-EthSigner/Using-EthSigner/#eth_sendtransaction).

#### Parameters

`transaction`: *string* -  signed transaction serialized to hexadecimal format

!!! note

    [Creating and sending transactions](../../how-to/send-transactions.md) includes
    examples of creating signed transactions using the
    [web3.js](https://github.com/ethereum/web3.js/) library.

#### Returns

`result`: *string* - 32-byte transaction hash

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "id":1,
          "jsonrpc": "2.0",
          "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "mutation {sendRawTransaction(data: \"0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833\")}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        mutation {
          sendRawTransaction(data: "0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833")
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "sendRawTransaction" : "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
          }
        }
        ```

### `eth_submitHashrate`

Submits the mining hashrate. This is used by mining software such as [Ethminer](https://github.com/ethereum-mining/ethminer).

#### Parameters

* `hashrate`: *string* - 32-byte hexadecimal string representation of the hashrate

* `id`: *string* - 32-byte random hexadecimal ID identifying the client

#### Returns

`result`: *boolean* - indicates if submission is successful

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0", "method":"eth_submitHashrate", "params":["0x0000000000000000000000000000000000000000000000000000000000500000", "0x59daa26581d0acd1fce254fb7e85952f4c09d0915afd33d3886cd914bc7d283c"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0", "method":"eth_submitHashrate", "params":["0x0000000000000000000000000000000000000000000000000000000000500000", "0x59daa26581d0acd1fce254fb7e85952f4c09d0915afd33d3886cd914bc7d283c"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc":"2.0",
          "id":1,
          "result": true
        }
        ```

### `eth_submitWork`

Submits a proof of work (Ethash) solution.
This is used by mining software such as [Ethminer](https://github.com/ethereum-mining/ethminer).

#### Parameters

* `nonce`: *string* - retrieved 8-byte nonce

* `header`: *string* - 32-byte hash of the block header (PoW-hash)

* `digest`: *string* - 32-bytes mix digest

#### Returns

`result`: *boolean* - indicates if the provided solution is valid

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0", "method":"eth_submitWork", "params":["0x0000000000000001", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "0xD1GE5700000000000000000000000000D1GE5700000000000000000000000000"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0", "method":"eth_submitWork", "params":["0x0000000000000001", "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "0xD1GE5700000000000000000000000000D1GE5700000000000000000000000000"],"id":73}
        ```

    === "JSON result"

        ```json
        {
          "id":1,
          "jsonrpc":"2.0",
          "result": true
        }
        ```

### `eth_syncing`

Returns an object with data about the synchronization status, or `false` if not synchronizing.

!!! note

    Once the node reaches the head of the chain, `eth_syncing` returns false, indicating that there is no active syncing target.

#### Parameters

None

#### Returns

`result`: *object* or *boolean* - synchronization status data object with the following fields, or `false` if not
synchronizing:

* `startingBlock`: *string* - index of the highest block on the blockchain when the network
  synchronization starts

* `currentBlock`: *string* - index of the latest block (also known as the best block) for the
  current node (this is the same index that [`eth_blockNumber`](#eth_blocknumber) returns.)

* `highestBlock`: *string* - index of the highest known block in the peer network (that is, the
  highest block so far discovered among peer nodes. This is the same value as `currentBlock` if
  the current node has no peers.)

* `pulledStates`: *string* - if fast synchronizing, the number of state entries fetched so far,
  or `null` if this is not known or not relevant (if full synchronizing or fully synchronized, this
  field is not returned.)

* `knownStates`: *string* - if fast synchronizing, the number of states the node knows of so
  far, or `null` if this is not known or not relevant (if full synchronizing or fully synchronized,
  this field is not returned.)

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":51}' http://127.0.0.1:8545
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":51}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 51,
          "result" : {
            "startingBlock" : "0x0",
            "currentBlock" : "0x1518",
            "highestBlock" : "0x9567a3",
            "pulledStates" : "0x203ca",
            "knownStates" : "0x200636"
          }
        }
        ```

    === "curl GraphQL"

        ```bash
        curl -X POST -H "Content-Type: application/json" --data '{ "query": "{syncing{startingBlock currentBlock highestBlock pulledStates knownStates}}"}' http://localhost:8547/graphql
        ```

    === "GraphQL"

        ```text
        {
          syncing {
            startingBlock
            currentBlock
            highestBlock
            pulledStates
            knownStates
          }
        }
        ```

    === "GraphQL result"

        ```json
        {
          "data" : {
            "syncing" : {
              "startingBlock" : 0,
              "currentBlock" : 5400,
              "highestBlock" : 9791395,
              "pullStates" : 132042,
              "knownStates" : 2098742
            }
          }
        }
        ```

### `eth_uninstallFilter`

Uninstalls a filter with the specified ID.
When a filter is no longer required, call this method.

Filters time out when not requested by [`eth_getFilterChanges`](#eth_getfilterchanges) or
[`eth_getFilterLogs`](#eth_getfilterlogs) for 10 minutes.

#### Parameters

`filterId`: *string* - filter ID

#### Returns

`result`: *boolean* - indicates if the filter is successfully uninstalled

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0x70355a0b574b437eaa19fe95adfedc0a"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0x70355a0b574b437eaa19fe95adfedc0a"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : true
        }
        ```

## `MINER` methods

The `MINER` API methods allow you to control the node’s mining operation.

!!! note

    The `MINER` API methods are not enabled by default for JSON-RPC. To enable the `MINER` API
    methods, use the [`--rpc-http-api`](../cli/options.md#rpc-http-api) or
    [`--rpc-ws-api`](../cli/options.md#rpc-ws-api) options.

### `miner_changeTargetGasLimit`

Updates the target gas limit set using the [`--target-gas-limit`](../cli/options.md#target-gas-limit)
command line option.

#### Parameters

`gasPrice`: *number* - target gas price in Wei

#### Returns

`result`: *string* - `Success` or `error`

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"miner_changeTargetGasLimit","params":[800000], "id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"miner_changeTargetGasLimit","params":[800000], "id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : "Success"
        }
        ```

### `miner_setCoinbase`

Sets the coinbase, the address for the mining rewards.

!!! note

    You can also use `miner_setEtherbase` as an alternative method. They both work the same way.
    Etherbase is a historic name for coinbase.

#### Parameters

`coinbase`: *string* - Account address you pay mining rewards to

#### Returns

`result`: *boolean* - `true` when address is set

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"miner_setCoinbase","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"miner_setCoinbase","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": true
        }
        ```

### `miner_start`

Starts the mining process. To start mining, you must first specify a miner coinbase using the
[`--miner-coinbase`](../cli/options.md#miner-coinbase) command line option or using [`miner_setCoinbase`](#miner_setcoinbase).

#### Parameters

None

#### Returns

`result`: *boolean* - `true` if mining starts, or if the node is already mining

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"miner_start","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"miner_start","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": true
        }
        ```

### `miner_stop`

Stops the mining process on the client.

#### Parameters

None

#### Returns

`result`: *boolean* - `true` if mining stops, or if the node is not mining

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"miner_stop","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"miner_stop","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": true
        }
        ```

## `NET` methods

The `NET` API methods provide network-related information.

### `net_enode`

Returns the [enode URL](../../concepts/node-keys.md#enode-url).

#### Parameters

None

#### Returns

`result`: *string* - [enode URL](../../concepts/node-keys.md#enode-url) of the node

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"net_enode","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"net_enode","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : "enode://6a63160d0ccef5e4986d270937c6c8d60a9a4d3b25471cda960900d037c61988ea14da67f69dbfb3497c465d0de1f001bb95598f74b68a39a5156a608c42fa1b@127.0.0.1:30303"
        }
        ```

### `net_listening`

Whether the client is actively listening for network connections.

#### Parameters

None

#### Returns

`result`: *boolean* - indicates if the client is actively listening for network connections

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"net_listening","params":[],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : true
        }
        ```

### `net_peerCount`

Returns the number of peers currently connected to the client.

#### Parameters

None

#### Returns

`result`: *string* - number of connected peers in hexadecimal

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : "0x5"
        }
        ```

### `net_services`

Returns enabled services (for example, `jsonrpc`) and the host and port for each service.

!!! note

    The [`--nat-method`](../cli/options.md#nat-method) setting affects the JSON-RPC and P2P host and
    port values, but not the metrics host and port values.

#### Parameters

None

#### Returns

`result`: *object* - enabled services

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"net_services","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"net_services","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": {
                "jsonrpc": {
                    "host": "127.0.0.1",
                    "port": "8545"
                },
                "p2p" : {
                    "host" : "127.0.0.1",
                    "port" : "30303"
                },
                "metrics" : {
                    "host": "127.0.0.1",
                    "port": "9545"
                }
            }
        }
        ```

### `net_version`

Returns the [network ID](../../concepts/network-and-chain-id.md).

#### Parameters

None

#### Returns

`result`: *string* - current network ID

| Network ID | Chain | Network | Description
|------------|-------|---------|-------------------------------|
| `1`        | ETH   | Mainnet | Main Ethereum network         |
| `5`        | ETH   | Goerli  | PoS test network              |
| `11155111` | ETH   | Sepolia | PoS test network              |
| `2018`     | ETH   | Dev     | PoW development network       |
| `1`        | ETC   | Classic | Main Ethereum Classic network |
| `7`        | ETC   | Mordor  | PoW test network              |
| `6`        | ETC   | Kotti   | PoA test network using Clique |
| `212`      | ETC   | Astor   | PoW test network              |

!!! note

    For almost all networks, network ID and chain ID are the same.

    The only networks in the table above with different network and chain IDs are
    Classic with a chain ID of `61` and Mordor with a chain ID of `63`.

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"net_version","params":[],"id":53}
        ```

    === "JSON result for Mainnet"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 51,
          "result" : "1"
        }
        ```

    === "JSON result for Goerli"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : "5"
        }
        ```

## `PLUGINS` methods

The `PLUGINS` API methods provide plugin-related functionality.

!!! note

    The `PLUGINS` API methods are not enabled by default for JSON-RPC. To enable the `PLUGINS` API
    methods, use the [`--rpc-http-api`](../cli/options.md#rpc-http-api) or
    [`--rpc-ws-api`](../cli/options.md#rpc-ws-api) options.

### `plugins_reloadPluginConfig`

Reloads specified plugin configuration.

#### Parameters

`plugin`: *string* - plugin

#### Returns

`result`: *string* - `Success`

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"plugins_reloadPluginConfig","params":["tech.pegasys.plus.plugin.kafka.KafkaPlugin"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"plugins_reloadPluginConfig","params":["tech.pegasys.plus.plugin.kafka.KafkaPlugin"],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": "Success"
        }
        ```

## `TRACE` methods

The `TRACE` API is a more concise alternative to the [`DEBUG` API](#debug-methods).

!!! note

    The `TRACE` API methods are not enabled by default for JSON-RPC. To enable the `TRACE` API
    methods, use the [`--rpc-http-api`](../cli/options.md#rpc-http-api) or
    [`--rpc-ws-api`](../cli/options.md#rpc-ws-api) options.

### `trace_block`

Provides transaction processing of [type `trace`](../trace-types.md#trace) for the specified block.

!!! important

    Your node must be an archive node (that is, synchronized without pruning or fast sync) or the
    requested block must be within the number of [blocks retained](../cli/options.md#pruning-blocks-retained)
    with [pruning enabled](../cli/options.md#pruning-enabled) (by default, 1024).

#### Parameters

`blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *array* of *objects* - list of [calls to other contracts](../trace-types.md#trace) containing
one object per call, in transaction execution order; if revert reason is enabled with
[`--revert-reason-enabled`](../cli/options.md#revert-reason-enabled),
the returned list items include the [revert reason](../../../private-networks/how-to/send-transactions/revert-reason.md).

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"trace_block","params":["0x6"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"trace_block","params":["0x6"],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "result": [
              {
                "action": {
                  "callType": "call",
                  "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
                  "gas": "0xffad82",
                  "input": "0x0000000000000000000000000000000000000999",
                  "to": "0x0020000000000000000000000000000000000000",
                  "value": "0x0"
                },
                "blockHash": "0x71512d31e18f828cef069a87bc2c7514a8ca334f9ee72625efdf5cc2d43768dd",
                "blockNumber": 6,
                "result": {
                  "gasUsed": "0x7536",
                  "output": "0x"
                },
                "subtraces": 1,
                "traceAddress": [],
                "transactionHash": "0x91eeabc671e2dd2b1c8ddebb46ba59e8cb3e7d189f80bcc868a9787728c6e59e",
                "transactionPosition": 0,
                "type": "call"
              },
              {
                "action": {
                  "address": "0x0020000000000000000000000000000000000000",
                  "balance": "0x300",
                  "refundAddress": "0x0000000000000999000000000000000000000000"
                },
                "blockHash": "0x71512d31e18f828cef069a87bc2c7514a8ca334f9ee72625efdf5cc2d43768dd",
                "blockNumber": 6,
                "result": null,
                "subtraces": 0,
                "traceAddress": [
                  0
                ],
                "transactionHash": "0x91eeabc671e2dd2b1c8ddebb46ba59e8cb3e7d189f80bcc868a9787728c6e59e",
                "transactionPosition": 0,
                "type": "suicide"
              },
              {
                "action": {
                  "author": "0x0000000000000000000000000000000000000000",
                  "rewardType": "block",
                  "value": "0x1bc16d674ec80000"
                },
                "blockHash": "0x71512d31e18f828cef069a87bc2c7514a8ca334f9ee72625efdf5cc2d43768dd",
                "blockNumber": 6,
                "result": null,
                "subtraces": 0,
                "traceAddress": [],
                "transactionHash": null,
                "transactionPosition": null,
                "type": "reward"
              }
            ],
            "id": 1
          }
        ```

### `trace_call`

Executes the given call and returns a number of possible traces for it.

!!! important

    The requested transaction must be contained in a block within the number of
    [blocks retained](../cli/options.md#pruning-blocks-retained) with [pruning enabled](../cli/options.md#pruning-enabled)
    (by default, 1024).

#### Parameters

* `call`: *object* - [transaction call object](objects.md#transaction-call-object)

* `blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

* `options`: *array* of *strings* - list of tracing options; tracing options are
[`trace`, `vmTrace`, and `stateDiff`](../trace-types.md). Specify any
combination of the three options including none of them.

#### Returns

`result`: *array* of *objects* - list of [calls to other contracts](../trace-types.md#trace) containing
one object per call, in transaction execution order

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"trace_call","params":[{"from":"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73","to":0x0010000000000000000000000000000000000000","gas":"0xfffff2","gasPrice":"0xef","value":"0x0","data":"0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002","nonce":"0x0"},["trace"],"latest"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"trace_call","params":[{"from":"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73","to":0x0010000000000000000000000000000000000000","gas":"0xfffff2","gasPrice":"0xef","value":"0x0","data":"0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002","nonce":"0x0"},["trace"],"latest"],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "result": {
              "output" : "0x",
              "stateDiff" : null,
              "trace" : [ {
                "action" : {
                  "callType" : "call",
                  "from" : "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
                  "gas" : "0xffabba",
                  "input" : "0x0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002",
                  "to" : "0x0010000000000000000000000000000000000000",
                  "value" : "0x0"
              },
              "result" : {
                "gasUsed" : "0x9c58",
                "output" : "0x"
              },
              "subtraces" : 0,
              "traceAddress" : [ ],
              "type" : "call"
            } ],
            "vmTrace" : null
            },
        "id" : 2
        },
        ```

### `trace_callMany`

Performs multiple call traces on top of the same block. You can trace dependent transactions.

!!! important

    The requested block must be within the number of [blocks retained](../cli/options.md#pruning-blocks-retained)
    with [pruning enabled](../cli/options.md#pruning-enabled)
    (by default, 1024).

#### Parameters

* `options`: *array* of *strings* - list of tracing options; tracing options are
  [`trace`, `vmTrace`, and `stateDiff`](../trace-types.md). Specify any
  combination of the three options including none of them.

* `blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
  `earliest`, or `pending`, as described in
  [block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: *array* of *objects* - list of [calls to other contracts](../trace-types.md#trace) containing
one object per call, in transaction execution order

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"trace_callMany","params":[[[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]],[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]]],"latest"],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"trace_callMany","params":[[[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]],[{"from":"0x407d73d8a49eeb85d32cf465507dd71d507100c1","to":"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b","value":"0x186a0"},["trace"]]],"latest"],"latest"],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "result": [
              {
              "output" : "0x",
              "stateDiff" : null,
              "trace" : [ {
                "action" : {
                  "callType" : "call",
                  "from" : "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
                  "gas" : "0x1dcd12f8",
                  "input" : "0x",
                  "to" : "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
                  "value" : "0x186a0"
              },
              "result" : {
                "gasUsed" : "0x0",
                "output" : "0x"
              },
              "subtraces" : 0,
              "traceAddress" : [ ],
              "type" : "call"
            } ],
            "vmTrace" : null
            },
            {
              "output" : "0x",
              "stateDiff" : null,
              "trace" : [ {
                "action" : {
                  "callType" : "call",
                  "from" : "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
                  "gas" : "0x1dcd12f8",
                  "input" : "0x",
                  "to" : "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
                  "value" : "0x186a0"
              },
              "result" : {
                "gasUsed" : "0x0",
                "output" : "0x"
              },
              "subtraces" : 0,
              "traceAddress" : [ ],
              "type" : "call"
            } ],
            "vmTrace" : null
            },
          ],
        "id" : 1
        },
        ```

### `trace_filter`

Returns traces matching the specified filter.

!!! important

    Your node must be an archive node (that is, synchronized without pruning or fast sync) or the
    requested block must be within the number of [blocks retained](../cli/options.md#pruning-blocks-retained)
    with [pruning enabled](../cli/options.md#pruning-enabled) (by default, 1024).

#### Parameters

`traceFilterOptions`: *object* - [trace filter options object](objects.md#trace-filter-options-object)

#### Returns

`result`: *array* of *objects* - list of [calls to other contracts](../trace-types.md#trace) containing
one object per call, in transaction execution order

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"trace_filter","params":[{"fromBlock":"0x1","toBlock":"0x21","after":2,"count":2,"fromAddress":["0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"]}],"id":415}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"trace_filter","params":[{"fromBlock":"0x1","toBlock":"0x21","after":2,"count":2,"fromAddress":["0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"]}],"id":415}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "result": [
              {
                "action": {
                  "callType": "call",
                  "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
                  "gas": "0xffad82",
                  "input": "0x0000000000000000000000000000000000000999",
                  "to": "0x0020000000000000000000000000000000000000",
                  "value": "0x0"
                },
                "blockHash": "0xcd5d9c7acdcbd3fb4b24a39e05a38e32235751bb0c9e4f1aa16dc598a2c2a9e4",
                "blockNumber": 6,
                "result": {
                  "gasUsed": "0x7536",
                  "output": "0x"
                },
                "subtraces": 1,
                "traceAddress": [],
                "transactionHash": "0x91eeabc671e2dd2b1c8ddebb46ba59e8cb3e7d189f80bcc868a9787728c6e59e",
                "transactionPosition": 0,
                "type": "call"
              },
              {
                "action": {
                  "callType": "call",
                  "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
                  "gas": "0xffad52",
                  "input": "0xf000000000000000000000000000000000000000000000000000000000000001",
                  "to": "0x0030000000000000000000000000000000000000",
                  "value": "0x0"
                },
                "blockHash": "0xeed85fe57db751442c826cfe4fdf43b10a5c2bc8b6fd3a8ccced48eb3fb35885",
                "blockNumber": 7,
                "result": {
                  "gasUsed": "0x1b",
                  "output": "0xf000000000000000000000000000000000000000000000000000000000000002"
                },
                "subtraces": 0,
                "traceAddress": [],
                "transactionHash": "0x47f4d445ea1812cb1ddd3464ab23d2bfc6ed408a8a9db1c497f94e8e06e85286",
                "transactionPosition": 0,
                "type": "call"
              }
            ],
            "id": 415
        }
        ```

### `trace_get`

Returns trace at given position.

!!! important

    Your node must be an archive node (that is, synchronized without pruning or fast sync) or the
    requested transaction must be contained in a block within
    the number of [blocks retained](../cli/options.md#pruning-blocks-retained) with
    [pruning enabled](../cli/options.md#pruning-enabled) (by default, 1024).

#### Parameters

* `transaction`: *string* - transaction hash

* `indexPositions`: *array* - Index positions of the traces

#### Returns

`result`: *array* of *objects* - list of [calls to other contracts](../trace-types.md#trace) containing
one object per call, in the order called by the transaction

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"trace_get","params":["0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",["0x0"]],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"trace_get","params":["0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",["0x0"]],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "result": {
              "action" : {
                "callType" : "call",
                "from" : "0x1c39ba39e4735cb65978d4db400ddd70a72dc750",
                "gas" : "0x13e99",
                "input" : "0x16c72721",
                "to" : "0x2bd2326c993dfaef84f696526064ff22eba5b362",
                "value" : "0x0"
              },
              "blockHash" : "0x7eb25504e4c202cf3d62fd585d3e238f592c780cca82dacb2ed3cb5b38883add"
              "blockNumber": 3068185,
              "result": {
                "gasUsed": "0x183",
                "output" : "0x0000000000000000000000000000000000000000000000000000000000000001"
              },
              "subtraces" : 0,
              "traceAddress" : [
                0
              ],
              "transactionHash": "0x17104ac9d3312d8c136b7f44d4b8b47852618065ebfa534bd2d3b5ef218ca1f3",
              "transactionPosition": 2,
              "type" : "call"
            },
        "id" : 1
        },
        ```

### `trace_rawTransaction`

Traces a call to `eth_sendRawTransaction` without making the call, returning the traces.

!!! important

    The requested transaction must be contained in a block within
    the number of [blocks retained](../cli/options.md#pruning-blocks-retained) with
    [pruning enabled](../cli/options.md#pruning-enabled) (by default, 1024).

#### Parameters

* `data` - *string* - Raw transaction data

* `options`: *array* of *strings* - list of tracing options; tracing options are
  [`trace`, `vmTrace`, and `stateDiff`](../trace-types.md). Specify any
  combination of the three options including none of them.

#### Returns

`result`: *array* of *objects* - list of [calls to other contracts](../trace-types.md#trace) containing
one object per call, in the order called by the transaction

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"trace_rawTransaction","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",["trace"]],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"trace_rawTransaction","params":["0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",["trace"]],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "result": {
              "output" : "0x"
              "stateDiff": null,
              "from" : "0x1c39ba39e4735cb65978d4db400ddd70a72dc750",
              "trace": [{
                "action": { ... },
                "result": {
                  "gasUsed": "0x0",
                  "output": "0x"
                }
              "subtraces": 0,
              "traceAddress": [],
              "type": "call"
            }],
            "vmTrace": null
            },
        "id" : 1
        },
        ```

### `trace_replayBlockTransactions`

Provides transaction processing tracing per block.

!!! important

    The requested block must be within the number of [blocks retained](../cli/options.md#pruning-blocks-retained)
    with [pruning enabled](../cli/options.md#pruning-enabled) (by default, 1024).

#### Parameters

* `blockNumber`: *string* - integer representing a block number or one of the string tags `latest`,
`earliest`, or `pending`, as described in
[block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter)

* `options`: *array* of *strings* - list of tracing options; tracing options are
[`trace`, `vmTrace`, and `stateDiff`](../trace-types.md). Specify any
combination of the three options including none of them.

#### Returns

`result`: *array* of *objects* - list of [transaction trace objects](objects.md#transaction-trace-object) containing
one object per transaction, in transaction execution order; if revert reason is enabled with
[`--revert-reason-enabled`](../cli/options.md#revert-reason-enabled),
the [`trace`](../trace-types.md#trace) list items in the returned transaction trace object include the
[revert reason](../../../private-networks/how-to/send-transactions/revert-reason.md).

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc": "2.0", "method": "trace_replayBlockTransactions","params": ["0x12",["trace","vmTrace","stateDiff"]],"id": 1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc": "2.0", "method": "trace_replayBlockTransactions","params": ["0x12",["trace","vmTrace","stateDiff"]],"id": 1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result":[
              {
                "output":"0x",
                "vmTrace":{
                  "code":"0x7f3940be4289e4c3587d88c1856cc95352461992db0a584c281226faefe560b3016000527f14c4d2c102bdeb2354bfc3dc96a95e4512cf3a8461e0560e2272dbf884ef3905601052600851",
                  "ops":[
                    {
                      "cost":3,
                      "ex":{
                        "mem":null,
                        "push":[
                          "0x8"
                        ],
                        "store":null,
                        "used":16756175
                      },
                      "pc":72,
                      "sub":null
                    },
                    ...
                  ]
                },
                "trace":[
                  {
                    "action":{
                      "callType":"call",
                      "from":"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
                      "gas":"0xffadea",
                      "input":"0x",
                      "to":"0x0100000000000000000000000000000000000000",
                      "value":"0x0"
                    },
                    "result":{
                      "gasUsed":"0x1e",
                      "output":"0x"
                    },
                    "subtraces":0,
                    "traceAddress":[
                    ],
                    "type":"call"
                  }
                ],
                "stateDiff":{
                  "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73":{
                    "balance":{
                      "*":{
                        "from":"0xffffffffffffffffffffffffffffffffc3e12a20b",
                        "to":"0xffffffffffffffffffffffffffffffffc3dc5f091"
                      }
                    },
                    "code":"=",
                    "nonce":{
                      "*":{
                        "from":"0x14",
                        "to":"0x15"
                      }
                    },
                    "storage":{
                    }
                  }
                },
                "transactionHash":"0x2a5079cc535c429f668f13a7fb9a28bdba6831b5462bd04f781777b332a8fcbd",
              },
              {...}
            ]
        }
        ```

### `trace_transaction`

Provides transaction processing of [type `trace`](../trace-types.md#trace) for the specified transaction.

!!! important

    Your node must be an archive node (that is, synchronized without pruning or fast sync) or the
    requested transaction must be contained in a block within
    the number of [blocks retained](../cli/options.md#pruning-blocks-retained) with
    [pruning enabled](../cli/options.md#pruning-enabled) (by default, 1024).

#### Parameters

`transaction`: *string* - transaction hash

#### Returns

`result`: *array* of *objects* - list of [calls to other contracts](../trace-types.md#trace) containing
one object per call, in the order called by the transaction; if revert reason is enabled with
[`--revert-reason-enabled`](../cli/options.md#revert-reason-enabled),
the returned list items include the [revert reason](../../../private-networks/how-to/send-transactions/revert-reason.md).

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc": "2.0", "method": "trace_transaction","params": ["0x4c253746668dca6ac3f7b9bc18248b558a95b5fc881d140872c2dff984d344a7"],"id": 1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc": "2.0", "method": "trace_transaction","params": ["0x4c253746668dca6ac3f7b9bc18248b558a95b5fc881d140872c2dff984d344a7"],"id": 1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "result": [
              {
                "action": {
                  "creationMethod": "create",
                  "from": "0x627306090abab3a6e1400e9345bc60c78a8bef57",
                  "gas": "0xff2e26",
                  "init": "0x60006000600060006000732c2b9c9a4a25e24b174f26114e8926a9f2128fe45af2600060006000600060007300a00000000000000000000000000000000000005af2",
                  "value": "0x0"
                },
                "blockHash": "0x7e9a993adc6f043c0a9b6a385e6ed3fa370586c55823251b8fa7033cf89d414e",
                "blockNumber": 19,
                "result": {
                  "address": "0x30753e4a8aad7f8597332e813735def5dd395028",
                  "code": "0x",
                  "gasUsed": "0x1c39"
                },
                "subtraces": 2,
                "traceAddress": [],
                "transactionHash": "0x4c253746668dca6ac3f7b9bc18248b558a95b5fc881d140872c2dff984d344a7",
                "transactionPosition": 3,
                "type": "create"
              },
              {
                "action": {
                  "callType": "callcode",
                  "from": "0x30753e4a8aad7f8597332e813735def5dd395028",
                  "gas": "0xfb2ea9",
                  "input": "0x",
                  "to": "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4",
                  "value": "0x0"
                },
                "blockHash": "0x7e9a993adc6f043c0a9b6a385e6ed3fa370586c55823251b8fa7033cf89d414e",
                "blockNumber": 19,
                "result": {
                  "gasUsed": "0x138e",
                  "output": "0x"
                },
                "subtraces": 1,
                "traceAddress": [
                  0
                ],
                "transactionHash": "0x4c253746668dca6ac3f7b9bc18248b558a95b5fc881d140872c2dff984d344a7",
                "transactionPosition": 3,
                "type": "call"
              },
              {
                "action": {
                  "address": "0x30753e4a8aad7f8597332e813735def5dd395028",
                  "balance": "0x0",
                  "refundAddress": "0x0000000000000000000000000000000000000000"
                },
                "blockHash": "0x7e9a993adc6f043c0a9b6a385e6ed3fa370586c55823251b8fa7033cf89d414e",
                "blockNumber": 19,
                "result": null,
                "subtraces": 0,
                "traceAddress": [
                  0,
                  0
                ],
                "transactionHash": "0x4c253746668dca6ac3f7b9bc18248b558a95b5fc881d140872c2dff984d344a7",
                "transactionPosition": 3,
                "type": "suicide"
              },
              {
                "action": {
                  "callType": "callcode",
                  "from": "0x30753e4a8aad7f8597332e813735def5dd395028",
                  "gas": "0xfb18a5",
                  "input": "0x",
                  "to": "0x00a0000000000000000000000000000000000000",
                  "value": "0x0"
                },
                "blockHash": "0x7e9a993adc6f043c0a9b6a385e6ed3fa370586c55823251b8fa7033cf89d414e",
                "blockNumber": 19,
                "result": {
                  "gasUsed": "0x30b",
                  "output": "0x"
                },
                "subtraces": 0,
                "traceAddress": [
                  1
                ],
                "transactionHash": "0x4c253746668dca6ac3f7b9bc18248b558a95b5fc881d140872c2dff984d344a7",
                "transactionPosition": 3,
                "type": "call"
              }
            ],
            "id": 1
        }
        ```

## `TXPOOL` methods

The `TXPOOL` API methods allow you to inspect the contents of the transaction pool.

!!! note

    The `TXPOOL` API methods are not enabled by default for JSON-RPC. To enable the `TXPOOL` API
    methods, use the [`--rpc-http-api`](../cli/options.md#rpc-http-api) or
    [`--rpc-ws-api`](../cli/options.md#rpc-ws-api) options.

### `txpool_besuPendingTransactions`

Lists pending transactions that match the supplied filter conditions.

#### Parameters

* `numResults`: *number* - integer representing the maximum number of results to return

* `fields`: *object* - object of fields used to create the filter condition

Each field in the object corresponds to a field name containing an operator, and a value for the operator.
A field name can only be specified once, and can only contain one operator.
For example, you cannot query transactions with a gas price between 8 and 9 Gwei by using both the
`gt` and `lt` operator in the same field name instance.

All filters must be satisfied for a transaction to be returned.

| Field name | Value                                     | Value type            | Supported operators |
|------------|-------------------------------------------|:---------------------:|---------------------|
| `from`     | Address of the sender.                    | *Data*, 20&nbsp;bytes | `eq`                |
| `to`       | Address of the receiver, or `"contract_creation"`.| *Data*, 20&nbsp;bytes |`eq`, `action`|
| `gas`      | Gas provided by the sender.               | *Quantity*            | `eq`, `gt`, `lt`    |
| `gasPrice` | Gas price, in wei, provided by the sender.| *Quantity*            | `eq`, `gt`, `lt`    |
| `value`    | Value transferred, in wei.                | *Quantity*            | `eq`, `gt`, `lt`    |
| `nonce`    | Number of transactions made by the sender.| *Quantity*            | `eq`, `gt`, `lt`    |

Supported operators:

* `eq` (equal to)

* `lt` (less than)

* `gt` (greater than)

* `action`

!!! note

    The only supported `action` is `"contract_creation"`.

#### Returns

`result`: *array* of *objects* - list of objects with
[details of the pending transaction](objects.md#pending-transaction-object)

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"txpool_besuPendingTransactions","params":[2,{"from":{"eq":"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"},"gas":{"lt":"0x5209"},"nonce":{"gt":"0x1"}}],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"txpool_besuPendingTransactions","params":[2,{"from":{"eq":"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"},"gas":{"lt":"0x5209"},"nonce":{"gt":"0x1"}}],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc": "2.0",
          "id": 1,
          "result": [
            {
              "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
              "gas": "0x5208",
              "gasPrice": "0xab5d04c00",
              "hash": "0xb7b2f4306c1c228ec94043da73b582594007091a7dfe024b1f8d6d772284e54b",
              "input": "0x",
              "nonce": "0x2",
              "to": "0xf8be4ebda7f62d79a665294ec1263bfdb59aabf2",
              "value": "0x0",
              "v": "0xfe8",
              "r": "0x5beb711e652c6cf0a589d3cea904eefc4f45ce4372652288701d08cc4412086d",
              "s": "0x3af14a56e63aa5fb7dcb444a89708363a9d2c1eba1f777c67690288415080ded"
            }
          ]
        }
        ```

### `txpool_besuStatistics`

Lists statistics about the node transaction pool.

#### Parameters

None

#### Returns

`result`: *object* - transaction pool statistics object with the following fields:

* `maxSize`: *number* - maximum number of transactions kept in the transaction pool; use the
  [`--tx-pool-max-size`](../cli/options.md#tx-pool-max-size) option to configure the maximum size.

* `localCount`: *number* - number of transactions submitted directly to this node

* `remoteCount`: *number* - number of transactions received from remote nodes

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"txpool_besuStatistics","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"txpool_besuStatistics","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": {
                "maxSize": 4096,
                "localCount": 1,
                "remoteCount": 0
            }
        }
        ```

### `txpool_besuTransactions`

Lists transactions in the node transaction pool.

#### Parameters

None

#### Returns

`result`: *array* of *objects* - list of transactions

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"txpool_besuTransactions","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"txpool_besuTransactions","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": [
                {
                    "hash": "0x8a66830098be4006a3f63a03b6e9b67aa721e04bd6b46d420b8f1937689fb4f1",
                    "isReceivedFromLocalSource": true,
                    "addedToPoolAt": "2019-03-21T01:35:50.911Z"
                },
                {
                    "hash": "0x41ee803c3987ceb5bcea0fad7a76a8106a2a6dd654409007d9931032ea54579b",
                    "isReceivedFromLocalSource": true,
                    "addedToPoolAt": "2019-03-21T01:36:00.374Z"
                }
            ]
        }
        ```

## `WEB3` methods

The `WEB3` API methods provide functionality for the Ethereum ecosystem.

### `web3_clientVersion`

Returns the current client version.

#### Parameters

None

#### Returns

`result`: *string* - current client version

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : "besu/<version>"
        }
        ```

### `web3_sha3`

Returns a [SHA3](https://en.wikipedia.org/wiki/SHA-3) hash of the specified data.
The result value is a [Keccak-256](https://keccak.team/keccak.html) hash, not the standardized SHA3-256.

#### Parameters

`data`: *string* - data to convert to a SHA3 hash

#### Returns

`result`: *string* - SHA3 result of the input data

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c00"],"id":53}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c00"],"id":53}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 53,
          "result" : "0x5e39a0a66544c0668bde22d61c47a8710000ece931f13b84d3b2feb44ec96d3f"
        }
        ```

## Miscellaneous methods

### `rpc_modules`

Lists [enabled APIs](../../how-to/use-besu-api/json-rpc.md#api-methods-enabled-by-default)
and the version of each.

#### Parameters

None

#### Returns

`result`: *map* of *strings* to *strings* - enabled APIs and their versions

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}' http://127.0.0.1:8545
        ```

    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","method":"rpc_modules","params":[],"id":1}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": {
                "web3": "1.0",
                "eth": "1.0",
                "net": "1.0"
            }
        }
        ```

<!-- Links -->
[schema]: https://github.com/hyperledger/besu/blob/750580dcca349d22d024cc14a8171b2fa74b505a/ethereum/api/src/main/resources/schema.graphqls
[eth_sendRawTransaction or eth_call]: ../../how-to/send-transactions.md#eth_call-or-eth_sendrawtransaction
[transaction]: https://ropsten.etherscan.io/tx/0xfc766a71c406950d4a4955a340a092626c35083c64c7be907060368a5e6811d6
