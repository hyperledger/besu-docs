---
description: How to enable and use the Engine API
---

# Engine API

The Engine API allows communication between [consensus and execution layers](../../../Concepts/Merge.md#execution-and-consensus-clients) of the [post-Merge](../../../Concepts/Merge.md) Ethereum Client.
These [API methods](../../../Reference/Engine-API-Methods.md) are a separate subsection of the [JSON-RPC API](API.md).

## Configuring the Engine API

To configure the Engine API for use, specify the [service ports](#service-ports) and [host allowlist](#host-allowlist).
You must also [enable the JSON-RPC](API.md#enabling-api-access).
Ensure the [`ETH` method is enabled](Using-JSON-RPC-API.md#api-methods-enabled-by-default) (It is enabled by default).

### Service ports

To specify the port the Engine API service listens on, use the
[`--engine-rpc-http-port`](../../../Reference/CLI/CLI-Syntax.md#engine-rpc-http-port) or 
[`--engine-rpc-ws-port`](../../../Reference/CLI/CLI-Syntax.md#engine-rpc-ws-port) options.

The default ports are:

* 8550 over HTTP
* 8551 over WebSockets

### Host allowlist

To prevent DNS rebinding attacks, Besu checks incoming HTTP request host headers, WebSockets connections, and GraphQL
requests.
Besu accepts requests only when hostnames specified using the
[`--engine-host-allowlist`](../../../Reference/CLI/CLI-Syntax.md#engine-host-allowlist) option matches the request host headers.
By default, Besu accepts requests and connections from `localhost` and `127.0.0.1`.

!!! important

    This isn't a permissioning feature.
    If you want to restrict access to the Engine API, we recommend using [authentication](#authentication).

If your application publishes RPC ports, specify the hostnames when starting Besu.

Specify "*" for `--engine-host-allowlist` to effectively disable host protection.

!!! caution

    Specifying "*" for `--engine-host-allowlist` is not recommended for production code.

## Authentication

By default, [Authentication](Authentication.md) for the Engine API is disabled.
To enable, set the [`--engine-jwt-enabled`](../../../Reference/CLI/CLI-Syntax.md#engine-jwt-enabled) to `true`.

Set the [JWT secret](Authentication.md#jwt-public-key-authentication) by using the [`--engine-jwt-secret`](../../../Reference/CLI/CLI-Syntax.md#engine-jwt-secret) option.
