---
description: Starting Hyperledger Besu
---

# Starting Hyperledger Besu

You can use Besu nodes for varying purposes, as described in the [Overview](../../index.md). Nodes
can connect to the Ethereum MainNet, public testnets such as Ropsten, or private networks.

Use the [`besu`](../../Reference/CLI/CLI-Syntax.md) command with the required command line options
to start a node. Alternatively, use the [launcher](#besu-launcher) to start Besu interactively
with the most common options.

## Prerequisites

[Besu Installed](Installation-Options/Install-Binaries.md)

## Local block data

When connecting to a network other than the network previously connected to, you must either delete
the local block data or use the [`--data-path`](../../Reference/CLI/CLI-Syntax.md#data-path) option
to specify a different data directory.

To delete the local block data, delete the `database` directory in the
`besu/build/distribution/besu-<version>` directory.

## Genesis configuration

Besu specifies the genesis configuration, and sets the network ID and bootnodes when connecting to
[MainNet](#run-a-node-on-ethereum-mainnet), [Goerli](#run-a-node-on-goerli-testnet),
[Rinkeby](#run-a-node-on-rinkeby-testnet), and [Ropsten](#run-a-node-on-ropsten-testnet).

When you specify [`--network=dev`](../../Reference/CLI/CLI-Syntax.md#network), Besu uses the
development mode genesis configuration with a fixed low difficulty. A node started with
[`--network=dev`](../../Reference/CLI/CLI-Syntax.md#network) has an empty bootnodes list by
default.

The genesis files defining the genesis configurations are in the
[Besu source files](https://github.com/hyperledger/besu/tree/master/config/src/main/resources).

To define a genesis configuration, create a genesis file (for example, `genesis.json`) and specify
the file using the [`--genesis-file`](../../Reference/CLI/CLI-Syntax.md#genesis-file) option.

## Confirm node is running

If you started Besu with the
[`--rpc-http-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) option, use
[cURL](https://curl.haxx.se/) to call [JSON-RPC API methods](../../Reference/API-Methods.md) to
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

        For example, after connecting to mainnet `eth_syncing` will return something similar to:

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

You can also use the following [configuration file](../Configure/Using-Configuration-File.md)
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
      ([`--rpc-http-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled)) and setting
      [`--rpc-http-host`](../../Reference/CLI/CLI-Syntax.md#rpc-http-host) to 0.0.0.0 exposes the
      RPC connection on your node to any remote connection.
    * Setting [`--host-allowlist`](../../Reference/CLI/CLI-Syntax.md#host-allowlist) to `"*"`
      allows JSON-RPC API access from any host.
    * Setting
      [`--rpc-http-cors-origins`](../../Reference/CLI/CLI-Syntax.md#rpc-http-cors-origins) to
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

## Run a node on Ethereum MainNet

To run a node on the Ethereum MainNet:

```bash
besu
```

To run a node on MainNet with the HTTP JSON-RPC service enabled and available for localhost only:

```bash
besu --rpc-http-enabled
```

## Besu launcher

Use the Besu launcher to interactively configure and start a node with the most common options. The
launcher asks a series of questions and generates a [configuration file](../Configure/Using-Configuration-File.md).

To run the Besu launcher:

```bash
besu --Xlauncher
```

Answer each of question, or press **Enter** to accept the default value.

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
Besu will start and use the values in the configuration file. To force the launcher to ask
the questions during a restart, use the `--Xlauncher-force` option, or delete the configuration
file.
