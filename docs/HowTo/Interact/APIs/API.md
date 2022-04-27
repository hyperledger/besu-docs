---
description: Hyperledger Besu API
---

# Access the Hyperledger Besu API

Access the [Hyperledger Besu API](../../../Reference/API-Methods.md) using:

* [JSON-RPC over HTTP, WebSockets or IPC](Using-JSON-RPC-API.md)
* [RPC Pub/Sub over WebSockets](RPC-PubSub.md)
* [GraphQL over HTTP](GraphQL.md).

The following sections provide information about JSON-RPC, RPC Pub/Sub, and GraphQL.

## Enable API access

To enable API access, use the
[`--rpc-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled),
[`--ws-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-enabled),
[`--graphql-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#graphql-http-enabled), and
`--Xrpc-ipc-enabled` options.

!!! caution

    `--Xrpc-ipc-enabled` is an experimental option.

## Service hosts

To specify the host the API service listens on, use the
[`--rpc-http-host`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-host),
[`--rpc-ws-host`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-host), and
[`--graphql-http-host`](../../../Reference/CLI/CLI-Syntax.md#graphql-http-host) options. The
default host is `127.0.0.1`.

To allow remote connections, set the host to `0.0.0.0`.

!!! caution

    Setting the host to `0.0.0.0` exposes the API service connection on your node to any remote
    connection. In a production environment, ensure you use a firewall to avoid exposing your node
    to the internet.

## Service ports

To specify the port the API service listens on, use the
[`--rpc-http-port`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-port),
[`--rpc-ws-port`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-port), and
[`--graphql-http-port`](../../../Reference/CLI/CLI-Syntax.md#graphql-http-port) options.

The default ports are:

* 8545 for JSON-RPC over HTTP.
* 8546 for JSON-RPC over WebSocket.
* 8547 for GraphQL over HTTP.

Ports must be [exposed appropriately](../../Find-and-Connect/Managing-Peers.md#port-configuration).

## Socket path

To specify the socket path for the IPC socket, use the `--Xrpc-ipc-path` option.
The default path is `besu.ipc`.

!!! caution

    `--Xrpc-ipc-path` is an experimental option.

## Host allowlist

To prevent DNS rebinding attacks, Besu checks incoming HTTP request host headers, WebSocket connections, and GraphQL
requests.
Besu accepts requests only when hostnames specified using the
[`--host-allowlist`](../../../Reference/CLI/CLI-Syntax.md#host-allowlist) option matches the request host headers.
By default, Besu accepts requests and connections from `localhost` and `127.0.0.1`.

!!! important

    This isn't a permissioning feature.
    If you want to restrict access to the API, we recommend using the [Besu authentication mechanism](Authentication.md)
    with username and password authentication or JWT public key authentication.

If your application publishes RPC ports, specify the hostnames when starting Besu.

!!! example

    ```bash
    besu --host-allowlist=example.com
    ```

Specify "*" for `--host-allowlist` to effectively disable host protection.

!!! caution

    Specifying "*" for `--host-allowlist` is not recommended for production code.

## Not supported by Besu

### Account management

Account management relies on private key management in the client, which is not supported by Besu.

To send signed transactions, use
[`eth_sendRawTransaction`](../../../Reference/API-Methods.md#eth_sendrawtransaction).
`eth_sendTransaction` is not implemented.

For [account management](../../Send-Transactions/Account-Management.md), use third-party wallets.

### Protocols

Besu does not support the Whisper and Swarm protocols.
