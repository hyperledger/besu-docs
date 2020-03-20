---
description: Hyperledger Besu API
---

# Access the Hyperledger Besu API

Access the [Hyperledger Besu API](../../../Reference/API-Methods.md) using:

* [JSON-RPC over HTTP or WebSockets](Using-JSON-RPC-API.md)
* [RPC Pub/Sub over WebSockets](RPC-PubSub.md)
* [GraphQL over HTTP](GraphQL.md).

The following sections provide information about JSON-RPC, RPC Pub/Sub, and GraphQL.

## Enabling API access

To enable API access, use the
[`--rpc-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled),
[`--ws-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-enabled), and
[`--graphql-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#graphql-http-enabled) options.

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

* 8545 for JSON-RPC over HTTP
* 8546 for JSON-RPC over WebSockets
* 8547 for GraphQL over HTTP.

Ports must be [exposed appropriately](../../Find-and-Connect/Managing-Peers.md#port-configuration).

## Host whitelist

To prevent DNS rebinding, Besu accepts incoming HTTP requests, WebSockets connections, and GraphQL
requests only from hostnames specified using the
[`--host-whitelist`](../../../Reference/CLI/CLI-Syntax.md#host-whitelist) option. Besu accepts
incoming requests and connections from `localhost` and `127.0.0.1` by default.

If your application publishes RPC ports, specify the hostnames when starting Besu.

!!! example

    ```bash
    besu --host-whitelist=example.com
    ```

Specify "*" for `--host-whitelist` to effectively disable host protection.

!!! caution

    Specifying "*" for `--host-whitelist` is not recommended for production code.

## Not supported by Besu

### Account management

Account management relies on private key management in the client, which is not supported by Besu.

To send signed transactions, use
[`eth_sendRawTransaction`](../../../Reference/API-Methods.md#eth_sendrawtransaction).
`eth_sendTransaction` is not implemented.

For [account management](../../Send-Transactions/Account-Management.md), use third-party wallets.

### Protocols

Besu does not support the Whisper and Swarm protocols.