---
description: Starting Hyperledger Besu
---

# Start Hyperledger Besu

Nodes can connect to the Ethereum Mainnet, public testnets such as Ropsten, or private networks.

Use the [`besu`](../reference/cli/options.md) command with the required command line options
to start a node. Alternatively, use the [launcher](#besu-launcher) to start Besu interactively
with the most common options.

## Prerequisites

[Besu installed](install/binary-distribution.md)

## Local block data

When connecting to a network other than the network previously connected to, you must either delete
the local block data or use the [`--data-path`](../../global/reference/cli/options.md#data-path) option
to specify a different data directory.

To delete the local block data, delete the `database` directory in the
`besu/build/distribution/besu-<version>` directory.

## Genesis configuration

Besu specifies the genesis configuration, and sets the network ID and bootnodes when connecting to
[Ropsten](#run-a-node-on-ropsten-testnet), [Rinkeby](#run-a-node-on-rinkeby-testnet),
[Goerli](#run-a-node-on-goerli-testnet), [Kiln](#run-a-node-on-kiln-testnet),
[Sepolia](#run-a-node-on-sepolia-testnet), and [Mainnet](#run-a-node-on-ethereum-mainnet).

When you specify [`--network=dev`](../../global/reference/cli/options.md#network), Besu uses the
development mode genesis configuration with a fixed low difficulty. A node started with
[`--network=dev`](../../global/reference/cli/options.md#network) has an empty bootnodes list by
default.

The genesis files defining the genesis configurations are in the
[Besu source files](https://github.com/hyperledger/besu/tree/master/config/src/main/resources).

To define a genesis configuration, create a genesis file (for example, `genesis.json`) and specify
the file using the [`--genesis-file`](../../global/reference/cli/options.md#genesis-file) option.

## Syncing and storage

By default, Besu syncs to the current state of the blockchain using
[fast sync](../../public-networks/how-to/connect/sync-node.md#fast-synchronization) in:

- Networks specified using [`--network`](../../global/reference/cli/options.md#network) except for the `dev`
  development network.
- Ethereum Mainnet.

We recommend using [snap sync](../../public-networks/how-to/connect/sync-node.md#snap-synchronization) for a faster sync, by starting Besu
with [`--sync-mode=X_SNAP`](../../global/reference/cli/options.md#sync-mode).

By default, Besu stores data in the [Forest of Tries](../../public-networks/concepts/data-storage-formats.md#forest-of-tries) format.
We recommend using [Bonsai Tries](../../public-networks/concepts/data-storage-formats.md#bonsai-tries) for lower storage requirements,
by starting Besu with [`--data-storage-format=BONSAI`](../../global/reference/cli/options.md#data-storage-format).

## Confirm node is running

If you started Besu with the
[`--rpc-http-enabled`](../../global/reference/cli/options.md#rpc-http-enabled) option, use
[cURL](https://curl.haxx.se/) to call [JSON-RPC API methods](../reference/api/index.md) to
confirm the node is running.

!!!example

    * `eth_chainId` returns the chain ID of the network.

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' localhost:8545
        ```

    * `eth_syncing` returns the starting, current, and highest block.

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' localhost:8545
        ```

        For example, after connecting to Mainnet, `eth_syncing` will return something similar to:

        ```json
        {
          "jsonrpc" : "2.0",
          "id" : 1,
          "result" : {
            "startingBlock" : "0x0",
            "currentBlock" : "0x2d0",
            "highestBlock" : "0x66c0"
          }
        }
        ```

## Run a node for testing

To run a node that mines blocks at a rate suitable for testing purposes:

```bash
besu --network=dev --miner-enabled --miner-coinbase=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-cors-origins="all" --host-allowlist="*" --rpc-ws-enabled --rpc-http-enabled --data-path=/tmp/tmpDatdir
```

You can also use the following [configuration file](../how-to/configure/configuration-file.md)
on the command line to start a node with the same options as above:

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

!!! caution

    The following settings are a security risk in production environments:

    * Enabling the HTTP JSON-RPC service
      ([`--rpc-http-enabled`](../../reference/cli/options.md#rpc-http-enabled)) and setting
      [`--rpc-http-host`](../../reference/cli/options.md#rpc-http-host) to 0.0.0.0 exposes the
      RPC connection on your node to any remote connection.
    * Setting [`--host-allowlist`](../../reference/cli/options.md#host-allowlist) to `"*"`
      allows JSON-RPC API access from any host.
    * Setting
      [`--rpc-http-cors-origins`](../../reference/cli/options.md#rpc-http-cors-origins) to
      `"all"` or `"*"` allows cross-origin resource sharing (CORS) access from any domain.

## Run a node on Ropsten testnet

To run a node on Ropsten:

```bash
besu --network=ropsten
```

To run a node on Ropsten with the HTTP JSON-RPC service enabled and allow Remix to access the node:

```bash
besu  --network=ropsten --rpc-http-enabled --rpc-http-cors-origins "http://remix.ethereum.org"
```

## Run a node on Rinkeby testnet

To run a node on Rinkeby specifying a data directory:

```bash
besu --network=rinkeby --data-path=<path>/<rinkebydata-path>
```

Where `<path>` and `<rinkebydata-path>` are the path and directory to save the Rinkeby chain data
to.

## Run a node on Goerli testnet

To run a node on [Goerli](https://github.com/goerli/testnet) specifying a data directory:

```bash
besu --network=goerli --data-path=<path>/<goerlidata-path>
```

Where `<path>` and `<goerlidata-path>` are the path and directory to save the Goerli chain data to.

## Run a node on Sepolia testnet

To run a node on [Sepolia](https://github.com/goerli/sepolia) specifying a data directory:

```bash
besu --network=sepolia --data-path=<path>/<sepoliadata-path>
```

Where `<path>` and `<sepoliadata-path>` are the path and directory to save the Sepolia chain data
to.

## Run a node on Ethereum Mainnet

To run a node on the Ethereum Mainnet:

```bash
besu
```

To run a node on Mainnet with the HTTP JSON-RPC service enabled and available for localhost only:

```bash
besu --rpc-http-enabled
```

## Besu launcher

Use the Besu launcher to interactively configure and start a node with the most common options. The
launcher asks a series of questions and generates a [configuration file](../how-to/configure/configuration-file.md).

To run the Besu launcher:

```bash
besu --Xlauncher
```

Answer each question, or press ++Enter++ to accept the default value.

```bash
? Which Ethereum network would you like to use ? rinkeby
? Which synchronization mode? fast
? Do you want to enable pruning? no
? What is the data directory ? /Users/me/besu
? Do you want to enable the JSON-RPC HTTP service ? yes
? Do you want to configure the JSON-RPC options now ? yes
? What is the JSON RPC HTTP host address ? 127.0.0.1
? What is the JSON RPC HTTP port ? 8545
? Select the list of APIs to enable on JSON-RPC HTTP service [eth, net, web3]
? Do you want to enable the JSON-RPC Websocket service ? no
? Do you want to enable GraphQL functionality ? no
? Do you want to use Ethstats ? no
? Do you want to enable NAT ? no
? Do you want to enable mining ? no
```

If a configuration file is already present in the directory where the command is executed,
Besu will start and use the values in the configuration file. To force the launcher to interact
during a restart, use the `--Xlauncher-force` option, or delete the configuration
file.
