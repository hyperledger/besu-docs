---
title: Start Besu
description: Start Besu on a private Ethereum network.
sidebar_position: 3
tags:
  - private networks
---

# Start Besu

Use the [`besu`](../reference/cli/options.md) command with the required command line options to start a node.

## Prerequisites

[Besu installed](install/binary-distribution.md)

## Local block data

When connecting to a network other than the network previously connected to, you must either delete the local block data or use the [`--data-path`](../../public-networks/reference/cli/options.md#data-path) option to specify a different data directory.

To delete the local block data, delete the `database` directory in the `besu/build/distribution/besu-<version>` directory.

## Genesis configuration

To define a genesis configuration, create a [genesis file](../../public-networks/concepts/genesis-file.md) (for example, `genesis.json`) and specify the file using the [`--genesis-file`](../../public-networks/reference/cli/options.md#genesis-file) option.

When you specify [`--network=dev`](../../public-networks/reference/cli/options.md#network), Besu uses the development mode genesis configuration with a fixed low difficulty. A node started with [`--network=dev`](../../public-networks/reference/cli/options.md#network) has an empty bootnodes list by default.

Predefined genesis configurations for named networks are in the [Besu source files](https://github.com/hyperledger/besu/tree/master/config/src/main/resources).

## Confirm node is running

If you started Besu with the [`--rpc-http-enabled`](../../public-networks/reference/cli/options.md#rpc-http-enabled) option, use [cURL](https://curl.haxx.se/) to call [JSON-RPC API methods](../reference/api/index.md) to confirm the node is running.

- `eth_chainId` returns the chain ID of the network.

  ```bash
  curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' localhost:8545
  ```

- `eth_syncing` returns the starting, current, and highest block.

  ```bash
  curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' localhost:8545
  ```

  For example, after connecting to Mainnet, `eth_syncing` will return something similar to:

  ```json
  {
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "startingBlock": "0x0",
      "currentBlock": "0x2d0",
      "highestBlock": "0x66c0"
    }
  }
  ```

## Run a node for testing

To run a node that mines blocks at a rate suitable for testing purposes:

```bash
besu --network=dev --miner-enabled --miner-coinbase=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-cors-origins="all" --host-allowlist="*" --rpc-ws-enabled --rpc-http-enabled --data-path=/tmp/tmpDatdir
```

You can also use the following [configuration file](../../public-networks/how-to/configuration-file.md) on the command line to start a node with the same options as above:

```toml
network="dev"
miner-enabled=true
miner-coinbase="0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
rpc-http-cors-origins=["all"]
host-allowlist=["*"]
rpc-ws-enabled=true
rpc-http-enabled=true
data-path="/tmp/tmpdata-path"
```

:::caution

The following settings are a security risk in production environments:

- Enabling the HTTP JSON-RPC service ([`--rpc-http-enabled`](../../public-networks/reference/cli/options.md#rpc-http-enabled)) and setting [`--rpc-http-host`](../../public-networks/reference/cli/options.md#rpc-http-host) to 0.0.0.0 exposes the RPC connection on your node to any remote connection.
- Setting [`--host-allowlist`](../../public-networks/reference/cli/options.md#host-allowlist) to `"*"` allows JSON-RPC API access from any host.
- Setting [`--rpc-http-cors-origins`](../../public-networks/reference/cli/options.md#rpc-http-cors-origins) to `"all"` or `"*"` allows cross-origin resource sharing (CORS) access from any domain.

:::

## Run a node on a private network

To run a node on your private network specifying a genesis file and data directory:

```bash
besu --genesis-file=<path>/genesis.json --data-path=<data-path> --rpc-http-enabled --bootnodes=<bootnodes>
```

Where `<data-path>` is the path to the directory to save the chain data to. Ensure you configure a peer discovery method, such as [bootnodes](../how-to/configure/bootnodes.md).

:::note

You might need to set [`--tx-pool-limit-by-account-percentage`](../../public-networks/reference/cli/options.md#tx-pool-limit-by-account-percentage) to 1. The default value is suitable for Mainnet, but may cause issues on private networks.

:::
