---
description: How to access the Hyperledger Besu API using JSON-RPC
---

# JSON-RPC over HTTP and WebSockets

To enable JSON-RPC over HTTP or WebSockets, use the
[`--rpc-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) and
[`--rpc-ws-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-enabled) options.

{!global/Postman.md!}

## Geth console

The geth console is a REPL (Read, Evaluate, & Print Loop) JavaScript console. Use JSON-RPC APIs
supported by geth and Hyperledger Besu directly in the console.

To use the geth console with Besu:

1. Start Besu with the
   [`--rpc-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) option.
1. Specify which APIs to enable using the
   [`--rpc-http-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-api) option.
1. Start the geth console specifying the JSON-RPC endpoint:

   ```bash
    geth attach http://localhost:8545
   ```

Use the geth console to call [JSON-RPC API methods](../../../Reference/API-Methods.md) that geth
and Besu share.

!!! example

    ```bash
    eth.syncing
    ```

## JSON-RPC authentication

Besu disables [Authentication](Authentication.md) by default.

## HTTP and WebSocket requests

### HTTP

To make RPC requests over HTTP, you can use [`curl`](https://curl.haxx.se/download.html).

!!! example

    === "Syntax"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","id":<request-ID>,"method":"<method-name>","params":[<method-parameters>]}' <JSON-RPC-http-endpoint:port>
        ```

    === "curl HTTP request"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","id":"1","method":"eth_blockNumber","params":[]}' http://127.0.0.1:8555
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc":"2.0",
          "id":"1",
          "result":"0x60e"
        }
        ```

You can use `curl` to make multiple RPC requests over HTTP at the same time.
Send the requests as an array, and receive an array of responses.

!!! example

    === "curl HTTP request"

        ```bash
        curl -X POST --data '[{"jsonrpc":"2.0","id":"1","method":"eth_blockNumber","params":[]}, {"jsonrpc":"2.0","id":"2","method":"admin_peers","params":[]}]' http://127.0.0.1:8555
        ```

    === "JSON result"

        ```json
        [{
          "jsonrpc":"2.0",
          "id":"1",
          "result":"0x60e"
        },{
          "jsonrpc":"2.0",
          "id":"2",
          "result":[]
        }]
        ```

### WebSockets

To make RPC requests over WebSockets, you can use [`wscat`](https://github.com/websockets/wscat), a
Node.js based command-line tool.

First connect to the WebSockets server using `wscat` (you only need to connect once per session):

```bash
wscat -c ws://<JSON-RPC-ws-endpoint:port>
```

After you establish a connection, the terminal displays a '>' prompt.
Send individual requests as a JSON data package at each prompt.

!!! Example

    === "Syntax"
    
        ```bash
        {"jsonrpc":"2.0","id":<request-ID>,"method":"<method-name>","params":[<method-parameters>]}
        ```
    
    === "wscat WS request"

        ```bash
        {"jsonrpc":"2.0","id":"1","method":"eth_blockNumber","params":[]}
        ```

    === "JSON result"

        ```json
        {
          "jsonrpc":"2.0",
          "id":"1",
          "result":"0x23"
        }
        ```

You can use `wscat` to make multiple RPC requests over WebSockets at the same time.
Send the requests as an array, and receive an array of responses.

!!! example

    === "wscat WS request"

        ```bash
        [{"jsonrpc":"2.0","id":"1","method":"eth_blockNumber","params":[]}, {"jsonrpc":"2.0","id":"2","method":"admin_peers","params":[]}]
        ```

    === "JSON result"

        ```json
        [{
          "jsonrpc":"2.0",
          "id":"1",
          "result":"0x23"
        },{
          "jsonrpc":"2.0",
          "id":"2",
          "result":[]
        }]
        ```

!!! note

    `wscat` does not support headers. [Authentication](Authentication.md) requires you to pass an
    authentication token in the request header. To use authentication with WebSockets, you require
    an app that supports headers.

## Readiness and liveness endpoints

Besu provides readiness and liveness endpoints to confirm the Besu node status. Both return a
`200 OK` status when ready or live and a `503 Service Unavailable` status if not ready or live.

### Readiness

By default, the readiness check requires a connected peer and the node to be within two blocks of
the best known block. If you have
[disabled P2P communication](../../../Reference/CLI/CLI-Syntax.md#p2p-enabled), you do not need
peers. A live node with P2P disabled is always ready.

Use the query parameters `minPeers` and `maxBlocksBehind` to adjust the number of peers required
and the number of blocks tolerance.

=== "Readiness Endpoint"

    ```bash
    http://<JSON-RPC-HTTP-endpoint:port>/readiness
    ```

=== "curl Request Example"

    ```bash
    curl -v 'http://localhost:8545/readiness'
    ```

=== "Query Parameters Example"

    ```bash
    curl -v 'http://localhost:8545/readiness?minPeers=0&maxBlocksBehind=10'
    ```

### Liveness

The liveness check requires the JSON-RPC server to be up.

=== "Liveness Endpoint"

    ```bash
    http://<JSON-RPC-HTTP-endpoint:port>/liveness
    ```

=== "curl Request Example"

    ```bash
    curl -v 'http://localhost:8545/liveness'
    ```

## API methods enabled by default

Besu enables the `ETH`, `NET`, and `WEB3` API methods by default.

To enable the `ADMIN`, `CLIQUE`, `DEBUG`, `EEA`, `IBFT`, `MINER`, `PERM`, `PLUGINS`, `PRIV`,
`TRACE`, and `TXPOOL` API methods, use the
[`--rpc-http-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`--rpc-ws-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) options.

## Block parameter

When you make requests that might have different results depending on the block accessed, the block
parameter specifies the block. Methods such as
[`eth_getTransactionByBlockNumberAndIndex`](../../../Reference/API-Methods.md#eth_gettransactionbyblocknumberandindex)
have a block parameter.

The block parameter can have the following values:

* `blockNumber` : `quantity` - The block number, specified in hexadecimal or decimal. 0 represents
  the genesis block.
* `earliest` : `tag` - The earliest (genesis) block.
* `latest` : `tag` - The last block mined.
* `pending` : `tag` - The last block mined plus pending transactions. Use only with
  [`eth_getTransactionCount`](../../../Reference/API-Methods.md#eth_gettransactioncount).

!!! note

    If [synchronizing in FAST mode](../../../Reference/CLI/CLI-Syntax.md#sync-mode), most
    historical world state data is unavailable. Any methods attempting to access unavailable world
    state data return `null`.
