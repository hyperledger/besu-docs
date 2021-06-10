---
description: Hyperledger Besu command line interface reference
---

# Hyperledger Besu command line

This reference describes the syntax of the Hyperledger Besu Command Line Interface (CLI) options
and subcommands.

## Specifying options

You can specify Besu options:

* On the command line
* As an [environment variable](#besu-environment-variables)
* In a [configuration file](../../HowTo/Configure/Using-Configuration-File.md).

If you specify an option in more than one place, the order of priority is command line, environment
variable, configuration file.

### Besu environment variables

For each command line option, the equivalent environment variable is:

* Upper-case
* `_` replaces `-`
* Has a `BESU_` prefix

For example, set `--miner-coinbase` using the `BESU_MINER_COINBASE` environment variable.

## Options

To start a Besu node run:

```bash
besu [OPTIONS] [COMMAND]
```

### `api-gas-price-blocks`

=== "Syntax"

    ```bash
    --api-gas-price-blocks=<INTEGER>
    ```

=== "Example"

    ```bash
    --api-gas-price-blocks=50
    ```

=== "Environment Variable"

    ```bash
    BESU_API_GAS_PRICE_BLOCKS=50
    ```

=== "Example Configuration File"

    ```bash
    api-gas-price-blocks=50
    ```

Number of blocks back from the head block to examine for [`eth_gasPrice`](../API-Methods.md#eth_gasprice).
The default is `100`.

### `api-gas-price-max`

=== "Syntax"

    ```bash
    --api-gas-price-max=<INTEGER>
    ```

=== "Example"

    ```bash
    --api-gas-price-max=20000
    ```

=== "Environment Variable"

    ```bash
    BESU_API_GAS_PRICE_MAX=20000
    ```

=== "Example Configuration File"

    ```bash
    api-gas-price-max=20000
    ```

Maximum gas price to return for [`eth_gasPrice`](../API-Methods.md#eth_gasprice), regardless of the
percentile value measured. The default is `500000000000` (500 GWei).

### `api-gas-price-percentile`

=== "Syntax"

    ```bash
    --api-gas-price-percentile=<DOUBLE>
    ```

=== "Example"

    ```bash
    --api-gas-price-percentile=75
    ```

=== "Environment Variable"

    ```bash
    BESU_API_GAS_PRICE_PERCENTILE=75
    ```

=== "Example Configuration File"

    ```bash
    api-gas-price-percentile=75
    ```

Percentile value to measure for [`eth_gasPrice`](../API-Methods.md#eth_gasprice).
The default is `50.0`.

For [`eth_gasPrice`](../API-Methods.md#eth_gasprice), to return the:

* Highest gas price in [`--api-gas-price-blocks`](#api-gas-price-blocks), set to `100`.
* Lowest gas price in [`--api-gas-price-blocks`](#api-gas-price-blocks), set to `0`.

### `auto-log-bloom-caching-enabled`

=== "Syntax"

    ```bash
    --auto-log-bloom-caching-enabled=false
    ```

=== "Environment Variable"

    ```bash
    BESU_AUTO_LOG_BLOOM_CACHING_ENABLED=false
    ```

=== "Example Configuration File"

    ```bash
    auto-log-bloom-caching-enabled=false
    ```

Enables or disables automatic log bloom caching. APIs such as
[`eth_getLogs`](../API-Methods.md#eth_getlogs) and
[`eth_getFilterLogs`](../API-Methods.md#eth_getfilterlogs) use the cache for improved performance.
The default is `true`.

If automatic log bloom caching is enabled and a log bloom query reaches the end of the cache, Besu
performs an uncached query for logs not yet written to the cache.

Automatic log bloom caching has a small impact on performance. If you are not querying logs blooms
for a large number of blocks, you might want to disable automatic log bloom caching.

### `banned-node-ids`

=== "Syntax"

    ```bash
    --banned-node-ids=<bannedNodeId>[,<bannedNodeId>...]...
    ```

=== "Command Line"

    ```bash
    --banned-nodeids=0xc35c3...d615f,0xf42c13...fc456
    ```

=== "Environment Variable"

    ```bash
    BESU_BANNED_NODEIDS=0xc35c3...d615f,0xf42c13...fc456
    ```

=== "Configuration File"

    ```bash
    banned-nodeids=["0xc35c3...d615f","0xf42c13...fc456"]
    ```

A list of node IDs with which this node will not peer. The node ID is the public key of the node.
You can specify the banned node IDs with or without the `0x` prefix.

!!!tip

    The singular `--banned-node-id` and plural `--banned-node-ids` are available and are two names
    for the same option.

### `bootnodes`

=== "Syntax"

    ```bash
    --bootnodes[=<enode://id@host:port>[,<enode://id@host:port>...]...]
    ```

=== "Command Line"

    ```bash
    --bootnodes=enode://c35c3...d615f@1.2.3.4:30303,enode://f42c13...fc456@1.2.3.5:30303
    ```

=== "Environment Variable"

    ```bash
    BESU_BOOTNODES=enode://c35c3...d615f@1.2.3.4:30303,enode://f42c13...fc456@1.2.3.5:30303
    ```

=== "Example Configuration File"

    ```bash
    bootnodes=["enode://c35c3...d615f@1.2.3.4:30303","enode://f42c13...fc456@1.2.3.5:30303"]
    ```

A list of comma-separated [enode URLs](../../Concepts/Node-Keys.md#enode-url) for
[P2P discovery bootstrap](../../HowTo/Find-and-Connect/Bootnodes.md).

When connecting to MainNet or public testnets, the default is a predefined list of enode URLs.

In private networks defined using [`--genesis-file`](#genesis-file) or when using
[`--network=dev`](#network), the default is an empty list of bootnodes.

### `color-enabled`

=== "Syntax"

    ```bash
    --color-enabled=false
    ```

=== "Environment Variable"

    ```bash
    BESU_COLOR_ENABLED=false
    ```

=== "Example Configuration File"

    ```bash
    color-enabled=false
    ```

Enables or disables color output to console.
The default is `true`.

### `compatibility-eth64-forkid-enabled`

=== "Syntax"

    ```bash
    --compatibility-eth64-forkid-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --compatibility-eth64-forkid-enabled=true
    ```

=== "Environment Variable"

    ```bash
    BESU_COMPATIBILITY_ETH64_FORKID_ENABLED=true
    ```

=== "Example Configuration File"

    ```bash
    compatibility-eth64-forkid-enabled=true
    ```

Enables the legacy Eth/64 fork ID. For any networks with nodes using Besu v1.4 or earlier and nodes
using Besu v20.10.1 or later, either:

* All nodes must be upgraded to v20.10.1 or later.
* All nodes using v20.10.1 or later must have `--compatibility-eth64-forkid-enabled` set to `true`.

The default is `false`.

!!! caution

    If networks have Besu nodes using v1.4 or earlier and other Besu nodes using v20.10.1 or later,
    the nodes on different versions cannot communicate unless `--compatibility-eth64-forkid-enabled`
    is set to `true`. 

### `config-file`

=== "Syntax"

    ```bash
    --config-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --config-file=/home/me/me_node/config.toml
    ```

=== "Environment Variable"

    ```bash
    BESU_CONFIG_FILE=/home/me/me_node/config.toml
    ```

The path to the [TOML configuration file](../../HowTo/Configure/Using-Configuration-File.md).
The default is `none`.

### `data-path`

=== "Syntax"

    ```bash
    --data-path=<PATH>
    ```

=== "Command Line"

    ```bash
    --data-path=/home/me/me_node
    ```

=== "Environment Variable"

    ```bash
    BESU_DATA_PATH=/home/me/me_node
    ```

=== "Configuration File"

    ```bash
    data-path="/home/me/me_node"
    ```

The path to the Besu data directory. The default is the directory you installed Besu in, or
`/opt/besu/database` if using the [Besu Docker image](../../HowTo/Get-Started/Installation-Options/Run-Docker-Image.md).

### `discovery-dns-url`

=== "Syntax"

    ```bash
    --discovery-dns-url=<enrtree URL>
    ```

=== "Environment Variable"

    ```bash
    BESU_DISCOVERY_DNS-URL=enrtree://AM5FCQLWIZX2QFPNJAP7VUERCCRNGRHWZG3YYHIUV7BVDQ5FDPRT2@nodes.example.org
    ```

=== "Example Configuration File"

    ```bash
    discovery-dns-url="enrtree://AM5FCQLWIZX2QFPNJAP7VUERCCRNGRHWZG3YYHIUV7BVDQ5FDPRT2@nodes.example.org"
    ```

The `enrtree` URL of the DNS node list for [node discovery via DNS](https://eips.ethereum.org/EIPS/eip-1459).
The default is `null`.

### `discovery-enabled`

=== "Syntax"

    ```bash
    --discovery-enabled=false
    ```

=== "Environment Variable"

    ```bash
    BESU_DISCOVERY_ENABLED=false
    ```

=== "Example Configuration File"

    ```bash
    discovery-enabled=false
    ```

Enables or disables P2P discovery.
The default is `true`.

### `fast-sync-min-peers`

=== "Syntax"

    ```bash
    --fast-sync-min-peers=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --fast-sync-min-peers=2
    ```

=== "Environment Variable"

    ```bash
    BESU_FAST_SYNC_MIN_PEERS=2
    ```

=== "Example Configuration File"

    ```bash
    fast-sync-min-peers=2
    ```

The minimum number of peers required before starting fast sync. The default is 5.

!!! note

    If synchronizing in FAST mode, most historical world state data is unavailable. Any methods
    attempting to access unavailable world state data return `null`.

### `genesis-file`

Use the genesis file to create a custom network.

!!!tip

    To use a public Ethereum network such as Rinkeby, use the [`--network`](#network) option. The
    network option defines the genesis file for public networks.

=== "Syntax"

    ```bash
    --genesis-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --genesis-file=/home/me/me_node/customGenesisFile.json
    ```

=== "Environment Variable"

    ```bash
    BESU_GENESIS_FILE=/home/me/me_node/customGenesisFile.json
    ```

=== "Configuration File"

    ```bash
    genesis-file="/home/me/me_node/customGenesisFile.json"
    ```

The path to the genesis file.

!!!important

    You cannot use the [`--genesis-file`](#genesis-file) and [`--network`](#network) options at the
    same time.

### `graphql-http-cors-origins`

=== "Syntax"

    ```bash
    --graphql-http-cors-origins=<graphQLHttpCorsAllowedOrigins>
    ```

=== "Command Line"

    ```bash
    --graphql-http-cors-origins="http://medomain.com","https://meotherdomain.com"
    ```

=== "Environment Variable"

    ```bash
    BESU_GRAPHQL_HTTP_CORS_ORIGINS="http://medomain.com","https://meotherdomain.com"
    ```

=== "Configuration File"

    ```bash
    graphql-http-cors-origins=["http://medomain.com","https://meotherdomain.com"]
    ```

A list of comma-separated origin domain URLs for CORS validation. The default is none.

### `graphql-http-enabled`

=== "Syntax"

    ```bash
    --graphql-http-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_GRAPHQL_HTTP_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    graphql-http-enabled=true
    ```

Enables the GraphQL HTTP service. The default is `false`.

The default GraphQL HTTP service endpoint is `http://127.0.0.1:8547/graphql` if set to `true`.

### `graphql-http-host`

=== "Syntax"

    ```bash
    --graphql-http-host=<HOST>
    ```

=== "Command Line"

    ```bash
    # to listen on all interfaces
    --graphql-http-host=0.0.0.0
    ```

=== "Environment Variable"

    ```bash
    # to listen on all interfaces
    BESU_GRAPHQL_HTTP_HOST=0.0.0.0
    ```

=== "Configuration File"

    ```bash
    graphql-http-host="0.0.0.0"
    ```

Host for GraphQL HTTP to listen on.
The default is 127.0.0.1.

To allow remote connections, set to `0.0.0.0`

### `graphql-http-port`

=== "Syntax"

    ```bash
    --graphql-http-port=<PORT>
    ```

=== "Command Line"

    ```bash
    # to listen on port 6175
    --graphql-http-port=6175
    ```

=== "Environment Variable"

    ```bash
    # to listen on port 6175
    BESU_GRAPHQL_HTTP_PORT=6175
    ```

=== "Configuration File"

    ```bash
    graphql-http-port="6175"
    ```

The GraphQL HTTP listening port (TCP). The default is 8547. Ports must be
[exposed appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### `help`

=== "Syntax"

    ```bash
    -h, --help
    ```

Show the help message and exit.

### `host-allowlist`

=== "Syntax"

    ```bash
    --host-allowlist=<hostname>[,<hostname>...]... or "*"
    ```

=== "Command Line"

    ```bash
    --host-allowlist=medomain.com,meotherdomain.com
    ```

=== "Environment Variable"

    ```bash
    BESU_HOST_ALLOWLIST=medomain.com,meotherdomain.com
    ```

=== "Configuration File"

    ```bash
    host-allowlist=["medomain.com", "meotherdomain.com"]
    ```

A comma-separated list of hostnames to
[access to the JSON-RPC API](../../HowTo/Interact/APIs/API.md#host-allowlist) and
[pull Besu metrics](../../HowTo/Monitor/Metrics.md). By
default, Besu accepts access from `localhost` and `127.0.0.1`.

!!!note

    If using [Prometheus](https://prometheus.io/) to pull metrics from a node, you must specify all
    the other nodes you want to pull metrics from in the list of allowed hostnames.

!!!tip

    To allow all hostnames, use `"*"`. We don't recommend allowing all hostnames for production
    environments.

### `identity`

=== "Syntax"

    ```bash
    --identity=<String>
    ```

=== "Command Line"

    ```bash
    --identity=MyNode
    ```

=== "Environment Variable"

    ```bash
    BESU_IDENTITY=MyNode
    ```

=== "Configuration File"

    ```bash
    identity="MyNode"
    ```

The name for the node. If specified, it's the second section of the client ID provided by some
Ethereum network explorers. For example, in the client ID
`besu/MyNode/v1.3.4/linux-x86_64/oracle_openjdk-java-11`, the node name is `MyNode`.

If a name is not specified, the name section is not included in the client ID. For example,
`besu/v1.3.4/linux-x86_64/oracle_openjdk-java-11`.

### `key-value-storage`

=== "Syntax"

    ```bash
    --key-value-storage=<keyValueStorageName>
    ```

=== "Command Line"

    ```bash
    --key-value-storage=rocksdb
    ```

=== "Environment Variable"

    ```bash
    BESU_KEY_VALUE_STORAGE=rocksdb
    ```

=== "Configuration File"

    ```bash
    key-value-storage="rocksdb"
    ```

The key-value storage to use. Use this option only if using a storage system provided with a
plugin. The default is `rocksdb`.

For development use only, the `memory` option provides ephemeral storage for sync testing and debugging.

### `logging`

=== "Syntax"

    ```bash
    -l, --logging=<LEVEL>
    ```

=== "Command Line"

    ```bash
    --logging=DEBUG
    ```

=== "Environment Variable"

    ```bash
    BESU_LOGGING=DEBUG
    ```

=== "Example Configuration File"

    ```bash
    logging="DEBUG"
    ```

Sets logging verbosity. Log levels are `OFF`, `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`,
`ALL`. The default is `INFO`.

### `max-peers`

=== "Syntax"

    ```bash
    --max-peers=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --max-peers=42
    ```

=== "Environment Variable"

    ```bash
    BESU_MAX_PEERS=42
    ```

=== "Configuration File"

    ```bash
    max-peers=42
    ```

The maximum number of P2P connections you can establish. The default is 25.

### `metrics-category`

=== "Syntax"

    ```bash
    --metrics-category=<metrics-category>[,metrics-category...]...
    ```

=== "Command Line"

    ```bash
    --metrics-category=BLOCKCHAIN,PEERS,PROCESS
    ```

=== "Environment Variable"

    ```bash
    BESU_METRICS_CATEGORY=BLOCKCHAIN,PEERS,PROCESS
    ```

=== "Configuration File"

    ```bash
    metrics-category=["BLOCKCHAIN","PEERS","PROCESS"]
    ```

A comma-separated list of categories for which to track metrics. The defaults are `BLOCKCHAIN`,
`ETHEREUM`, `EXECUTORS`, `JVM`, `NETWORK`, `PEERS`, `PERMISSIONING`, `PROCESS`, `PRUNER`, `RPC`,
`SYNCHRONIZER`, and `TRANSACTION_POOL`.

Other categories are `KVSTORE_ROCKSDB`, `KVSTORE_PRIVATE_ROCKSDB`, `KVSTORE_ROCKSDB_STATS`, and
`KVSTORE_PRIVATE_ROCKSDB_STATS`.

Categories containing `PRIVATE` track metrics when you enable
[private transactions](../../Concepts/Privacy/Privacy-Overview.md).

### `metrics-enabled`

=== "Syntax"

    ```bash
    --metrics-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_METRICS_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    metrics-enabled=true
    ```

Enables the
[metrics exporter](../../HowTo/Monitor/Metrics.md#monitor-node-performance-using-prometheus). The
default is `false`.

You cannot specify `--metrics-enabled` with `--metrics-push-enabled`. That is, you can enable
either Prometheus polling or Prometheus push gateway support, but not both at once.

### `metrics-host`

=== "Syntax"

    ```bash
    --metrics-host=<HOST>
    ```

=== "Command Line"

    ```bash
    --metrics-host=127.0.0.1
    ```

=== "Environment Variable"

    ```bash
    BESU_METRICS_HOST=127.0.0.1
    ```

=== "Configuration File"

    ```bash
    metrics-host="127.0.0.1"
    ```

The host on which [Prometheus](https://prometheus.io/) accesses
[Besu metrics](../../HowTo/Monitor/Metrics.md#monitor-node-performance-using-prometheus). The
metrics server respects the [`--host-allowlist` option](#host-allowlist).

The default is `127.0.0.1`.

### `metrics-port`

=== "Syntax"

    ```bash
    --metrics-port=<PORT>
    ```

=== "Command Line"

    ```bash
    --metrics-port=6174
    ```

=== "Environment Variable"

    ```bash
    BESU_METRICS_PORT=6174
    ```

=== "Configuration File"

    ```bash
    metrics-port="6174"
    ```

The port (TCP) on which [Prometheus](https://prometheus.io/) accesses
[Besu metrics](../../HowTo/Monitor/Metrics.md#monitor-node-performance-using-prometheus). The
default is `9545`. Ports must be
[exposed appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### `metrics-protocol`

=== "Syntax"

    ```bash
    --metrics-protocol=<metrics-protocol>
    ```

=== "Command Line"

    ```bash
    --metrics-port=OPENTELEMETRY
    ```

=== "Environment Variable"

    ```bash
    BESU_METRICS_PORT=OPENTELEMETRY
    ```

=== "Configuration File"

    ```bash
    metrics-port="OPENTELEMETRY"
    ```

Metrics protocol to use.
One of `PROMETHEUS`, `OPENTELEMETRY`, or `NONE`.
Defaults to `PROMETHEUS`.

### `metrics-push-enabled`

=== "Syntax"

    ```bash
    --metrics-push-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --metrics-push-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_METRICS_PUSH_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    metrics-push-enabled=true
    ```

Enables or disables [push gateway integration].

You cannot specify `--metrics-push-enabled` with `--metrics-enabled`. That is, you can enable
either Prometheus polling or Prometheus push gateway support, but not both at once.

### `metrics-push-host`

=== "Syntax"

    ```bash
    --metrics-push-host=<HOST>
    ```

=== "Command Line"

    ```bash
    --metrics-push-host=127.0.0.1
    ```

=== "Environment Variable"

    ```bash
    BESU_METRICS_PUSH_HOST=127.0.0.1
    ```

=== "Configuration File"

    ```bash
    metrics-push-host="127.0.0.1"
    ```

The host of the [Prometheus Push Gateway](https://github.com/prometheus/pushgateway). The default
is `127.0.0.1`. The metrics server respects the [`--host-allowlist` option](#host-allowlist).

!!! note

    When pushing metrics, ensure you set `--metrics-push-host` to the machine on which the push
    gateway is. Generally, this is a different machine to the machine on which Besu is running.

### `metrics-push-interval`

=== "Syntax"

    ```bash
    --metrics-push-interval=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --metrics-push-interval=30
    ```

=== "Environment Variable"

    ```bash
    BESU_METRICS_PUSH_INTERVAL=30
    ```

=== "Configuration File"

    ```bash
    metrics-push-interval=30
    ```

The interval, in seconds, to push metrics when in `push` mode. The default is 15.

### `metrics-push-port`

=== "Syntax"

    ```bash
    --metrics-push-port=<PORT>
    ```

=== "Command Line"

    ```bash
    --metrics-push-port=6174
    ```

=== "Environment Variable"

    ```bash
    BESU_METRICS_PUSH_PORT=6174
    ```

=== "Configuration File"

    ```bash
    metrics-push-port="6174"
    ```

The port (TCP) of the [Prometheus Push Gateway](https://github.com/prometheus/pushgateway). The
default is `9001`. Ports must be
[exposed appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### `metrics-push-prometheus-job`

=== "Syntax"

    ```bash
    --metrics-prometheus-job=<metricsPrometheusJob>
    ```

=== "Command Line"

    ```bash
    --metrics-prometheus-job="my-custom-job"
    ```

=== "Environment Variable"

    ```bash
    BESU_METRICS_PROMETHEUS_JOB="my-custom-job"
    ```

=== "Configuration File"

    ```bash
    metrics-prometheus-job="my-custom-job"
    ```

The job name when in `push` mode. The default is `besu-client`.

### `min-block-occupancy-ratio`

=== "Syntax"

    ```bash
    --min-block-occupancy-ratio=<minBlockOccupancyRatio>
    ```

=== "Command Line"

    ```bash
    --min-block-occupancy-ratio=0.5
    ```

=== "Environment Variable"

    ```bash
    BESU_MIN_BLOCK_OCCUPANCY_RATIO=0.5
    ```

=== "Configuration File"

    ```bash
    min-block-occupancy-ratio="0.5"
    ```

Minimum occupancy ratio for a mined block if the transaction pool is not empty. When filling a block
during mining, the occupancy ratio indicates the threshold at which the node stops waiting for smaller transactions
to fill the remaining space. The default is 0.8.

### `miner-coinbase`

=== "Syntax"

    ```bash
    --miner-coinbase=<Ethereum account address>
    ```

=== "Command Line"

    ```bash
    --miner-coinbase=fe3b557e8fb62b89f4916b721be55ceb828dbd73
    ```

=== "Environment Variable"

    ```bash
    BESU_MINER_COINBASE=fe3b557e8fb62b89f4916b721be55ceb828dbd73
    ```

=== "Configuration File"

    ```bash
    miner-coinbase="0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
    ```

The account you pay mining rewards to. You must specify a valid coinbase when you enable mining
using the [`--miner-enabled`](#miner-enabled) option or the
[`miner_start`](../API-Methods.md#miner_start) JSON-RPC API method.

!!!note

    Besu ignores this option in networks using
    [Clique](../../HowTo/Configure/Consensus-Protocols/Clique.md) or
    [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md) consensus protocols.

### `miner-enabled`

=== "Syntax"

    ```bash
    --miner-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_MINER_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    miner-enabled=true
    ```

Enables mining when you start the node.
The default is `false`.

### `miner-extra-data`

=== "Syntax"

    ```bash
    --miner-extra-data=<Extra data>
    ```

=== "Command Line"

    ```bash
    --miner-extra-data=0x444F4E27542050414E4943202120484F444C2C20484F444C2C20484F444C2021
    ```

=== "Environment Variable"

    ```bash
    BESU_MINER_EXTRA_DATA=0x444F4E27542050414E4943202120484F444C2C20484F444C2C20484F444C2021
    ```

=== "Configuration File"

    ```bash
    miner-extra-data="0x444F4E27542050414E4943202120484F444C2C20484F444C2C20484F444C2021"
    ```

A hex string representing the 32 bytes included in the extra data field of a mined block. The
default is 0x.

### `miner-stratum-enabled`

=== "Syntax"

    ```bash
    --miner-stratum-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_MINER_STRATUM_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    miner-stratum-enabled=true
    ```

Enables a node to perform stratum mining.
The default is `false`.

### `miner-stratum-host`

=== "Syntax"

    ```bash
    --miner-stratum-host=<HOST>
    ```

=== "Command Line"

    ```bash
    --miner-stratum-host=192.168.1.132
    ```

=== "Environment Variable"

    ```bash
    BESU_MINER_STRATUM_HOST=192.168.1.132
    ```

=== "Configuration File"

    ```bash
    miner-stratum-host="192.168.1.132"
    ```

The host of the stratum mining service.
The default is `0.0.0.0`.

### `miner-stratum-port`

=== "Syntax"

    ```bash
    --miner-stratum-port=<PORT>
    ```

=== "Command Line"

    ```bash
    --miner-stratum-port=8010
    ```

=== "Environment Variable"

    ```bash
    BESU_MINER_STRATUM_PORT=8010
    ```

=== "Configuration File"

    ```bash
    miner-stratum-port="8010"
    ```

The port of the stratum mining service. The default is `8008`. You must
[expose ports appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### `min-gas-price`

=== "Syntax"

    ```bash
    --min-gas-price=<minTransactionGasPrice>
    ```

=== "Command Line"

    ```bash
    --min-gas-price=1337
    ```

=== "Environment Variable"

    ```bash
    BESU_MIN_GAS_PRICE=1337
    ```

=== "Configuration File"

    ```bash
    min-gas-price=1337
    ```

The minimum price a transaction offers to include it in a mined block. The minimum gas price is the
lowest value [`eth_gasPrice`](../API-Methods.md#eth_gasprice) can return. The default is 1000
Wei.

!!! important
    In a [free gas network](../../HowTo/Configure/FreeGas.md), ensure the minimum gas price is set to zero for every node.
    Any node with a minimum gas price set higher than zero will silently drop transactions with a zero gas price.
    You can query a node's gas configuration using [`eth_gasPrice`](../API-Methods.md#eth_gasprice).

### `nat-method`

=== "Syntax"

    ```bash
    --nat-method=UPNP
    ```

=== "Example Configuration File"

    ```bash
    nat-method="UPNP"
    ```

Specify the method for handling [NAT environments](../../HowTo/Find-and-Connect/Specifying-NAT.md).
The options are:

* [`UPNP`](../../HowTo/Find-and-Connect/Specifying-NAT.md#upnp)
* [`KUBERNETES`](../../HowTo/Find-and-Connect/Specifying-NAT.md#kubernetes)
* [`DOCKER`](../../HowTo/Find-and-Connect/Specifying-NAT.md#docker)
* [`AUTO`](../../HowTo/Find-and-Connect/Specifying-NAT.md#auto)
* [`NONE`](../../HowTo/Find-and-Connect/Specifying-NAT.md#none).

The default is `AUTO`. `NONE` disables NAT functionality.

!!!tip

    UPnP support is often disabled by default in networking firmware. If disabled by default,
    explicitly enable UPnP support.

!!!notes

    Specifying `UPNP` might introduce delays during node startup, especially on networks without a
    UPnP gateway device.

    You must specify `DOCKER` when using the
    [Besu Docker image](../../HowTo/Get-Started/Installation-Options/Run-Docker-Image.md).

### `network`

=== "Syntax"

    ```bash
    --network=<NETWORK>
    ```

=== "Command Line"

    ```bash
    --network=rinkeby
    ```

=== "Environment Variable"

    ```bash
    BESU_NETWORK=rinkeby
    ```

=== "Configuration File"

    ```bash
    network="rinkeby"
    ```

The predefined network configuration.
The default is `mainnet`.

Possible values are:

| Network   | Chain | Type        | Default Sync Mode  | Description                                                    |
|:----------|:------|:------------|:-------------------|:---------------------------------------------------------------|
| `mainnet` | ETH   | Production  | [FAST](#sync-mode) | The main network                                               |
| `ropsten` | ETH   | Test        | [FAST](#sync-mode) | A PoW network similar to the current main Ethereum network     |
| `rinkeby` | ETH   | Test        | [FAST](#sync-mode) | A PoA network using Clique                                     |
| `goerli`  | ETH   | Test        | [FAST](#sync-mode) | A PoA network using Clique                                     |
| `dev`     | ETH   | Development | [FULL](#sync-mode) | A PoW network with a low difficulty to enable local CPU mining |
| `classic` | ETC   | Production  | [FAST](#sync-mode) | The main Ethereum Classic network                              |
| `mordor ` | ETC   | Test        | [FAST](#sync-mode) | A PoW network                                                  |
| `kotti`   | ETC   | Test        | [FAST](#sync-mode) | A PoA network using Clique                                     |
| `astor`   | ETC   | Test        | [FAST](#sync-mode) | A PoW network                                                  |

!!!tip

    Values are case insensitive, so either `mainnet` or `MAINNET` works.

!!!important

    You cannot use the [`--network`](#network) and [`--genesis-file`](#genesis-file) options at the
    same time.

### `network-id`

=== "Syntax"

    ```bash
    --network-id=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --network-id=8675309
    ```

=== "Environment Variable"

    ```bash
    BESU_NETWORK_ID=8675309
    ```

=== "Configuration File"

    ```bash
    network-id="8675309"
    ```

The [P2P network identifier](../../Concepts/NetworkID-And-ChainID.md).

Use this option to override the default network ID. The default value is the same as the chain ID
defined in the genesis file.

### `node-private-key-file`

=== "Syntax"

    ```bash
    --node-private-key-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --node-private-key-file=/home/me/me_node/myPrivateKey
    ```

=== "Environment Variable"

    ```bash
    BESU_NODE_PRIVATE_KEY_FILE=/home/me/me_node/myPrivateKey
    ```

=== "Configuration File"

    ```bash
    node-private-key-file="/home/me/me_node/myPrivateKey"
    ```

The private key file for the node. The default is the key file in the [data directory](#data-path).
If no key file exists, Besu creates a key file containing the generated private key, otherwise, the
existing key file specifies the node private key.

!!!attention

    The private key is not encrypted.

This option is ignored if [`--security-module`](#security-module) is set to
a non-default value.

### `p2p-enabled`

=== "Syntax"

    ```bash
    --p2p-enabled=<true|false>
    ```

=== "Command line"

    ```bash
    --p2p-enabled=false
    ```

=== "Environment Variable"

    ```bash
    BESU_P2P_ENABLED=false
    ```

=== "Configuration File"

    ```bash
    p2p-enabled=false
    ```

Enables or disables all P2P communication.
The default is true.

### `p2p-host`

=== "Syntax"

    ```bash
    --p2p-host=<HOST>
    ```

=== "Command Line"

    ```bash
    # to listen on all interfaces
    --p2p-host=0.0.0.0
    ```

=== "Environment Variable"

    ```bash
    # to listen on all interfaces
    BESU_P2P_HOST=0.0.0.0
    ```

=== "Configuration File"

    ```bash
    p2p-host="0.0.0.0"
    ```

The advertised host that can be used to access the node from outside the network in
[P2P communication](../../HowTo/Find-and-Connect/Configuring-Ports.md#p2p-networking).
The default is 127.0.0.1.

!!! info

    If [`--nat-method`](#nat-method) is set to [`NONE`](../../HowTo/Find-and-Connect/Specifying-NAT.md#none),
    `--p2p-host` is not overridden and must be specified for the node to be accessed from outside the network.

### `p2p-interface`

=== "Syntax"

    ```bash
    --p2p-interface=<HOST>
    ```

=== "Command Line"

    ```bash
    --p2p-interface=192.168.1.132
    ```

=== "Environment Variable"

    ```bash
    BESU_P2P_INTERFACE=192.168.1.132
    ```

=== "Configuration File"

    ```bash
    p2p-interface="192.168.1.132"
    ```

The network interface on which the node listens for
[P2P communication](../../HowTo/Find-and-Connect/Configuring-Ports.md#p2p-networking). Use the
option to specify the required network interface when the device that Besu is running on has
multiple network interfaces. The default is 0.0.0.0 (all interfaces).

### `p2p-port`

=== "Syntax"

    ```bash
    --p2p-port=<PORT>
    ```

=== "Command Line"

    ```bash
    # to listen on port 1789
    --p2p-port=1789
    ```

=== "Environment Variable"

    ```bash
    # to listen on port 1789
    BESU_P2P_PORT=1789
    ```

=== "Configuration File"

    ```bash
    p2p-port="1789"
    ```

The P2P listening ports (UDP and TCP). The default is 30303. You must
[expose ports appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### `permissions-accounts-config-file`

=== "Syntax"

    ```bash
    --permissions-accounts-config-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --permissions-accounts-config-file=/home/me/me_configFiles/myPermissionsFile
    ```

=== "Environment Variable"

    ```bash
    BESU_PERMISSIONS_ACCOUNTS_CONFIG_FILE=/home/me/me_configFiles/myPermissionsFile
    ```

=== "Configuration File"

    ```bash
    permissions-accounts-config-file="/home/me/me_configFiles/myPermissionsFile"
    ```

The [accounts permissions configuration file]. The default is the `permissions_config.toml` file in
the [data directory](#data-path).

!!! tip

    `--permissions-accounts-config-file` and
    [`--permissions-nodes-config-file`](#permissions-nodes-config-file) can use the same file.

### `permissions-accounts-config-file-enabled`

=== "Syntax"

    ```bash
    --permissions-accounts-config-file-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --permissions-accounts-config-file-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_PERMISSIONS_ACCOUNTS_CONFIG_FILE_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    permissions-accounts-config-file-enabled=true
    ```

Enables or disables file-based account level permissions. The default is `false`.

### `permissions-accounts-contract-address`

=== "Syntax"

    ```bash
    --permissions-accounts-contract-address=<ContractAddress>
    ```

=== "Command Line"

    ```bash
    --permissions-accounts-contract-address=xyz
    ```

=== "Environment Variable"

    ```bash
    BESU_PERMISSIONS_ACCOUNTS_CONTRACT_ADDRESS=xyz
    ```

=== "Configuration File"

    ```bash
    permissions-accounts-contract-address=xyz
    ```

The contract address for
[onchain account permissioning](../../Concepts/Permissioning/Onchain-Permissioning.md).

### `permissions-accounts-contract-enabled`

=== "Syntax"

    ```bash
    --permissions-accounts-contract-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --permissions-accounts-contract-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_PERMISSIONS_ACCOUNTS_CONTRACT_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    permissions-accounts-contract-enabled=true
    ```

Enables or disables contract-based
[onchain account permissioning](../../Concepts/Permissioning/Onchain-Permissioning.md). The default
is `false`.

### `permissions-nodes-config-file`

=== "Syntax"

    ```bash
    --permissions-nodes-config-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --permissions-nodes-config-file=/home/me/me_configFiles/myPermissionsFile
    ```

=== "Environment Variable"

    ```bash
    BESU_PERMISSIONS_NODES_CONFIG_FILE=/home/me/me_configFiles/myPermissionsFile
    ```

=== "Configuration File"

    ```bash
    permissions-nodes-config-file="/home/me/me_configFiles/myPermissionsFile"
    ```

The [nodes permissions configuration file]. The default is the `permissions_config.toml` file in
the [data directory](#data-path).

!!! tip

    `--permissions-nodes-config-file` and
    [`--permissions-accounts-config-file`](#permissions-accounts-config-file) can use the same
    file.

### `permissions-nodes-config-file-enabled`

=== "Syntax"

    ```bash
    --permissions-nodes-config-file-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --permissions-nodes-config-file-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_PERMISSIONS_NODES_CONFIG_FILE_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    permissions-nodes-config-file-enabled=true
    ```

Enables or disables file-based node level permissions. The default is `false`.

### `permissions-nodes-contract-address`

=== "Syntax"

    ```bash
    --permissions-nodes-contract-address=<ContractAddress>
    ```

=== "Command Line"

    ```bash
    --permissions-nodes-contract-address=xyz
    ```

=== "Environment Variable"

    ```bash
    BESU_PERMISSIONS_NODES_CONTRACT_ADDRESS=xyz
    ```

=== "Configuration File"

    ```bash
    permissions-nodes-contract-address=xyz
    ```

The contract address for
[onchain node permissioning](../../Concepts/Permissioning/Onchain-Permissioning.md).

### `permissions-nodes-contract-enabled`

=== "Syntax"

    ```bash
    --permissions-nodes-contract-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --permissions-nodes-contract-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_PERMISSIONS_NODES_CONTRACT_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    permissions-nodes-contract-enabled=true
    ```

Enables or disables contract-based
[onchain node permissioning](../../Concepts/Permissioning/Onchain-Permissioning.md). The default is
`false`.

### `permissions-nodes-contract-version`

=== "Syntax"

    ```bash
    --permissions-nodes-contract-version=<ContractVersion>
    ```

=== "Command Line"

    ```bash
    --permissions-nodes-contract-version=2
    ```

=== "Environment Variable"

    ```bash
    BESU_PERMISSIONS_NODES_CONTRACT_VERSION=2
    ```

=== "Configuration File"

    ```bash
    permissions-nodes-contract-version=2
    ```

Version of the EEA [node permissioning interface](../../HowTo/Limit-Access/Specify-Perm-Version.md).
The default is 1.

### `privacy-enabled`

=== "Syntax"

    ```bash
    --privacy-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --privacy-enabled=false
    ```

=== "Environment Variable"

    ```bash
    BESU_PRIVACY_ENABLED=false
    ```

=== "Configuration File"

    ```bash
    privacy-enabled=false
    ```

Enables or disables [private transactions](../../Concepts/Privacy/Privacy-Overview.md). The default
is false.

!!! important

    Using private transactions with [pruning](../../Concepts/Pruning.md) and/or Fast Sync is not
    supported.

### `privacy-marker-transaction-signing-key-file`

=== "Syntax"

    ```bash
    --privacy-marker-transaction-signing-key-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --privacy-marker-transaction-signing-key-file=/home/me/me_node/myPrivateKey
    ```

=== "Environment Variable"

    ```bash
    BESU_PRIVACY_MARKER_TRANSACTION_SIGNING_KEY_FILE=/home/me/me_node/myPrivateKey
    ```

=== "Configuration File"

    ```bash
    privacy-marker-transaction-signing-key-file="/home/me/me_node/myPrivateKey"
    ```

`<FILE>` is the name of the private key file used to
[sign Privacy Marker Transactions](../../HowTo/Use-Privacy/Sign-Privacy-Marker-Transactions.md).

!!! note

    This can be the same file used by [`--node-private-key-file`](#node-private-key-file), or a
    different key file to identify who signed the privacy marker transaction.

You must specify this option if you're using:

* a privacy network where you pay gas. Also, the associated account must contain adequate funds.
* [account permissioning] and privacy. You must include the corresponding public key in the
    accounts allowlist.

If you do not specify this option (for example, in a free gas network), Besu signs each transaction
with a different randomly generated key.

### `privacy-multi-tenancy-enabled`

=== "Syntax"

    ```bash
    --privacy-multi-tenancy-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --privacy-multi-tenancy-enabled=false
    ```

=== "Environment Variable"

    ```bash
    BESU_PRIVACY_MULTI_TENANCY_ENABLED=false
    ```

=== "Configuration File"

    ```bash
    privacy-multi-tenancy-enabled=false
    ```

Enables or disables [multi-tenancy](../../Concepts/Privacy/Multi-Tenancy.md) for private
transactions. The default is `false`.

### `privacy-flexible-groups-enabled`

=== "Syntax"

    ```bash
    --privacy-flexible-groups-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --privacy-flexible-groups-enabled=true
    ```

=== "Environment Variable"

    ```bash
    BESU_PRIVACY_FLEXIBLE_GROUPS_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    privacy-flexible-groups-enabled=true
    ```

Set to enable [flexible privacy groups](../../Concepts/Privacy/Flexible-PrivacyGroups.md). Default is `false`.

Deprecated syntax for this option is `--privacy-onchain-groups-enabled`.

### `privacy-public-key-file`

=== "Syntax"

    ```bash
    --privacy-public-key-file=<privacyPublicKeyFile>
    ```

=== "Command Line"

    ```bash
    --privacy-public-key-file=Tessera/nodeKey.pub
    ```

=== "Environment Variable"

    ```bash
    BESU_PRIVACY_PUBLIC_KEY_FILE=Tessera/nodeKey.pub
    ```

=== "Configuration File"

    ```bash
    privacy-public-key-file="Tessera/nodeKey.pub"
    ```

The [public key of the Tessera node](https://docs.tessera.consensys.net/).

!!! important

    You cannot specify `privacy-public-key-file` when
    [`--privacy-multi-tenancy-enabled`](#privacy-multi-tenancy-enabled) is `true`

### `privacy-tls-enabled`

=== "Syntax"

    ```bash
    --privacy-tls-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --privacy-tls-enabled=false
    ```

=== "Environment Variable"

    ```bash
    BESU_PRIVACY_TLS_ENABLED=false
    ```

=== "Configuration File"

    ```bash
    privacy-tls-enabled=false
    ```

Enables or disables [TLS on communication with the Private Transaction Manager]. The default is
false.

### `privacy-tls-keystore-file`

=== "Syntax"

    ```bash
    --privacy-tls-keystore-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --privacy--keystore-file=/home/me/me_node/key
    ```

=== "Environment Variable"

    ```bash
    BESU_PRIVACY_TLS_KEYSTORE_FILE=/home/me/me_node/key
    ```

=== "Configuration File"

    ```bash
    privacy-tls-keystore-file="/home/me/me_node/key"
    ```

The keystore file (in PKCS #12 format) containing the private key and the certificate presented
during authentication.

You must specify `privacy-tls-keystore-file` if [`--privacy-tls-enabled`](#privacy-tls-enabled) is
`true`.

### `privacy-tls-keystore-password-file`

=== "Syntax"

    ```bash
    --privacy-tls-keystore-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --privacy-tls-keystore-password-file=/home/me/me_node/password
    ```

=== "Environment Variable"

    ```bash
    BESU_PRIVACY_TLS_KEYSTORE_PASSWORD_FILE=/home/me/me_node/password
    ```

=== "Configuration File"

    ```bash
    privacy-tls-keystore-password-file="/home/me/me_node/password"
    ```

The path to the file containing the password to decrypt the keystore.

### `privacy-tls-known-enclave-file`

=== "Syntax"

    ```bash
    --privacy-tls-known-enclave-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --privacy-tls-known-enclave-file=/home/me/me_node/knownEnclave
    ```

=== "Environment Variable"

    ```bash
    BESU_PRIVACY_TLS_KNOWN_ENCLAVE_FILE=/home/me/me_node/knownEnclave
    ```

=== "Configuration File"

    ```bash
    privacy-tls-known-enclave-file="/home/me/me_node/knownEnclave"
    ```

The path to the file containing the hostnames, ports, and SHA256 certificate fingerprints of the
[authorized privacy enclave](../../HowTo/Configure/Configure-TLS.md#create-the-known-servers-file).

### `privacy-url`

=== "Syntax"

    ```bash
    --privacy-url=<privacyUrl>
    ```

=== "Command Line"

    ```bash
    --privacy-url=http://127.0.0.1:8888
    ```

=== "Environment Variable"

    ```bash
    BESU_PRIVACY_URL=http://127.0.0.1:8888
    ```

=== "Configuration File"

    ```bash
    privacy-url="http://127.0.0.1:8888"
    ```

The URL on which the
[Tessera node](../../Tutorials/Privacy/Configuring-Privacy.md#3-create-tessera-configuration-files) is
running.

### `pruning-block-confirmations`

=== "Syntax"

    ```bash
    --pruning-block-confirmations=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --pruning-block-confirmations=5
    ```

=== "Environment Variable"

    ```bash
    BESU_PRUNING_BLOCK_CONFIRMATIONS=5
    ```

=== "Configuration File"

    ```bash
    pruning-block-confirmations=5
    ```

The minimum number of confirmations on a block before marking of newly-stored or in-use state trie
nodes that cannot be pruned. The default is 10.

!!! important
    Using pruning with [private transactions](../../Concepts/Privacy/Privacy-Overview.md) is not
    supported.

### `pruning-blocks-retained`

=== "Syntax"

    ```bash
    --pruning-blocks-retained=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --pruning-blocks-retained=10000
    ```

=== "Environment Variable"

    ```bash
    BESU_PRUNING_BLOCKS_RETAINED=10000
    ```

=== "Configuration File"

    ```bash
    pruning-blocks-retained=10000
    ```

The minimum number of recent blocks to keep the entire world state for. The default is 1024.

!!! important
    Using pruning with [private transactions](../../Concepts/Privacy/Privacy-Overview.md) is not
    supported.

### `pruning-enabled`

=== "Syntax"

    ```bash
    --pruning-enabled
    ```

=== "Command Line"

    ```bash
    --pruning-enabled=true
    ```

=== "Environment Variable"

    ```bash
    BESU_PRUNING_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    pruning-enabled=true
    ```

Enables [pruning](../../Concepts/Pruning.md) to reduce storage required for the world state.
Defaults to `false`.

!!! important

    Using pruning with [private transactions](../../Concepts/Privacy/Privacy-Overview.md) is not
    supported.

### `random-peer-priority-enabled`

=== "Syntax"

    ```bash
    --random-peer-priority-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --random-peer-priority-enabled=true
    ```

=== "Environment Variable"

    ```bash
    BESU_RANDOM_PEER_PRIORITY_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    random-peer-priority-enabled=true
    ```

Allows for incoming connections to be prioritized randomly. Enable in small, stable networks to prevent
impenetrable peer groups forming. The default is `false`.

### `remote-connections-limit-enabled`

=== "Syntax"

    ```bash
    --remote-connections-limit-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --remote-connections-limit-enabled=false
    ```

=== "Environment Variable"

    ```bash
    BESU_REMOTE_CONNECTIONS_LIMIT_ENABLED=false
    ```

=== "Configuration File"

    ```bash
    remote-connections-limit-enabled=false
    ```

Enables or disables limiting the percentage of remote P2P connections initiated by peers. The
default is true.

!!! tip

    In private and permissioned networks with a level of trust between peers, disabling the remote connection limits
    may increase the speed at which nodes can join the network.

!!! important

    To prevent eclipse attacks, ensure you enable the remote connections limit when connecting to
    any public network, and especially when using [`--sync-mode`](#sync-mode) and
    [`--fast-sync-min-peers`](#fast-sync-min-peers).

### `remote-connections-max-percentage`

=== "Syntax"

    ```bash
    --remote-connections-max-percentage=<DOUBLE>
    ```

=== "Command Line"

    ```bash
    --remote-connections-max-percentage=25
    ```

=== "Environment Variable"

    ```bash
    BESU_REMOTE_CONNECTIONS_MAX_PERCENTAGE=25
    ```

=== "Configuration File"

    ```bash
    remote-connections-max-percentage=25
    ```

The percentage of remote P2P connections you can establish with the node. Must be between 0 and
100, inclusive. The default is 60.

### `reorg-logging-threshold`

=== "Syntax"

    ```bash
    --reorg-logging-threshold=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --reorg-logging-threshold=3
    ```

=== "Environment Variable"

    ```bash
    BESU_REORG_LOGGING_THRESHOLD=3
    ```

=== "Configuration File"

    ```bash
    reorg-logging-threshold=3
    ```

Minimum depth of chain reorganizations to log. The default is 6.

### `required-block`

=== "Syntax"

    ```bash
    --required-block, --required-blocks[=BLOCK=HASH[,BLOCK=HASH...]...]
    ```

=== "Command Line"

    ```bash
    --required-block=6485846=0x43f0cd1e5b1f9c4d5cda26c240b59ee4f1b510d0a185aa8fd476d091b0097a80
    ```

=== "Environment Variable"

    ```bash
    BESU_REQUIRED_BLOCK=6485846=0x43f0cd1e5b1f9c4d5cda26c240b59ee4f1b510d0a185aa8fd476d091b0097a80
    ```

=== "Configuration File"

    ```bash
    required-block="6485846=0x43f0cd1e5b1f9c4d5cda26c240b59ee4f1b510d0a185aa8fd476d091b0097a80"
    ```

Requires a peer with the specified block number to have the specified hash when connecting, or Besu
rejects that peer.

### `revert-reason-enabled`

=== "Syntax"

    ```bash
    --revert-reason-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --revert-reason-enabled=true
    ```

=== "Environment Variable"

    ```bash
    BESU_REVERT_REASON_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    revert-reason-enabled=true
    ```

Enables including the [revert reason](../../HowTo/Send-Transactions/Revert-Reason.md) in the
transaction receipt, [`eth_estimateGas`](../API-Methods.md#eth_estimategas) error response,
[`eth_call`](../API-Methods.md#eth_call) error response, and [`trace`](../Trace-Types.md#trace) response.
The default is `false`.

!!! caution

    Enabling revert reason may use a significant amount of memory. We do not recommend enabling
    revert reason when connected to public Ethereum networks.

### `rpc-http-api`

=== "Syntax"

    ```bash
    --rpc-http-api=<api name>[,<api name>...]...
    ```

=== "Command Line"

    ```bash
    --rpc-http-api=ETH,NET,WEB3
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_API=ETH,NET,WEB3
    ```

=== "Configuration File"

    ```bash
    rpc-http-api=["ETH","NET","WEB3"]
    ```

A comma-separated list of APIs to enable on the HTTP JSON-RPC channel. When you use this option
you must also specify the `--rpc-http-enabled` option. The available API options are: `ADMIN`,
`CLIQUE`, `DEBUG`, `EEA`, `ETH`, `IBFT`, `MINER`, `NET`, `PERM`, `PLUGINS`, `PRIV`, `TRACE`,
`TXPOOL`, and `WEB3`. The default is: `ETH`, `NET`, `WEB3`.

!!!tip

    The singular `--rpc-http-api` and plural `--rpc-http-apis` are available and are two names for
    the same option.

### `rpc-http-authentication-credentials-file`

=== "Syntax"

    ```bash
    --rpc-http-authentication-credentials-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --rpc-http-authentication-credentials-file=/home/me/me_node/auth.toml
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_AUTHENTICATION_CREDENTIALS_FILE=/home/me/me_node/auth.toml
    ```

=== "Configuration File"

    ```bash
    rpc-http-authentication-credentials-file="/home/me/me_node/auth.toml"
    ```

The [credentials file](../../HowTo/Interact/APIs/Authentication.md#credentials-file) for JSON-RPC
API [authentication](../../HowTo/Interact/APIs/Authentication.md).

### `rpc-http-authentication-enabled`

=== "Syntax"

    ```bash
    --rpc-http-authentication-enabled
    ```

=== "Command Line"

    ```bash
    --rpc-http-authentication-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_AUTHENTICATION_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    rpc-http-authentication-enabled=true
    ```

Enables [authentication](../../HowTo/Interact/APIs/Authentication.md) for the HTTP JSON-RPC
service.

### `rpc-http-authentication-jwt-public-key-file`

=== "Syntax"

    ```bash
    --rpc-http-authentication-jwt-public-key-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --rpc-http-authentication-jwt-public-key-file=publicKey.pem
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_AUTHENTICATION-JWT-PUBLIC-KEY-FILE="publicKey.pem"
    ```

=== "Configuration File"

    ```bash
    rpc-http-authentication-jwt-public-key-file="publicKey.pem"
    ```

The [JWT provider's public key file] used for JSON-RPC HTTP authentication with an external JWT.

### `rpc-http-cors-origins`

=== "Syntax"

    ```bash
    --rpc-http-cors-origins=<url>[,<url>...]... or all or "*"
    ```

=== "Command Line"

    ```bash

    $# You can allow one or more domains with a comma-separated list.

    --rpc-http-cors-origins="http://medomain.com","https://meotherdomain.com"
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_CORS_ORIGINS="http://medomain.com","https://meotherdomain.com"
    ```

=== "Configuration File"

    ```bash
    rpc-http-cors-origins=["http://medomain.com","https://meotherdomain.com"]
    ```

=== "Remix Example"

    ```bash

    $# The following allows Remix to interact with your Besu node.

    --rpc-http-cors-origins="http://remix.ethereum.org"
    ```

A list of domain URLs for CORS validation. You must enclose the URLs in double quotes and separate
them with commas.

Listed domains can access the node using JSON-RPC. If your client interacts with Besu using a
browser app (such as Remix or a block explorer), add the client domain to the list.

The default value is `"none"`. If you do not list any domains, browser apps cannot interact
with your Besu node.

!!!note

    To run a local Besu node as a backend for MetaMask and use MetaMask anywhere, set
    `--rpc-http-cors-origins` to `"all"` or `"*"`. To allow a specific domain to use MetaMask with
    the Besu node, set `--rpc-http-cors-origins` to the client domain.

!!!tip

    For testing and development purposes, use `"all"` or `"*"` to accept requests from any domain.
    We don't recommend accepting requests from any domain for production environments.

### `rpc-http-enabled`

=== "Syntax"

    ```bash
    --rpc-http-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    rpc-http-enabled=true
    ```

Enables the HTTP JSON-RPC service.
The default is `false`.

### `rpc-http-host`

=== "Syntax"

    ```bash
    --rpc-http-host=<HOST>
    ```

=== "Command Line"

    ```bash
    # to listen on all interfaces
    --rpc-http-host=0.0.0.0
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_HOST=0.0.0.0
    ```

=== "Configuration File"

    ```bash
    rpc-http-host="0.0.0.0"
    ```

Specifies the host on which HTTP JSON-RPC listens. The default is 127.0.0.1.

To allow remote connections, set to `0.0.0.0`.

!!! caution

    Setting the host to `0.0.0.0` exposes the RPC connection on your node to any remote connection.
    In a production environment, ensure you are using a firewall to avoid exposing your node to the
    internet.

### `rpc-http-max-active-connections`

=== "Syntax"

    ```bash
    --rpc-http-max-active-connections=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --rpc-http-max-active-connections=100
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_MAX_ACTIVE_CONNECTIONS=100
    ```

=== "Configuration File"

    ```toml
    rpc-http-max-active-connections=100
    ```

The maximum number of allowed HTTP JSON-RPC connections. Once this limit is reached, incoming connections are rejected. The default is 80.

### `rpc-http-port`

=== "Syntax"

    ```bash
    --rpc-http-port=<PORT>
    ```

=== "Command Line"

    ```bash
    # to listen on port 3435
    --rpc-http-port=3435
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_PORT=3435
    ```

=== "Configuration File"

    ```bash
    rpc-http-port="3435"
    ```

The HTTP JSON-RPC listening port (TCP). The default is 8545. You must
[expose ports appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### `rpc-http-tls-ca-clients-enabled`

=== "Syntax"

    ```bash
    --rpc-http-tls-ca-clients-enabled[=<true|false>]
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_TLS_CA_CLIENTS_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    rpc-http-tls-ca-clients-enabled=true
    ```

Enables clients with trusted CA certificates to connect. The default is `false`.

!!! note

    You must enable client authentication using the
    [`---rpc-http-tls-client-auth-enabled`](#rpc-http-tls-client-auth-enabled) option.

### `rpc-http-tls-client-auth-enabled`

=== "Syntax"

    ```bash
    --rpc-http-tls-client-auth-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_TLS_CLIENT_AUTH_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    rpc-http-tls-client-auth-enabled=true
    ```

Enables TLS client authentication for the JSON-RPC HTTP service. The default is `false`.

!!! note

    You must specify [`--rpc-http-tls-ca-clients-enabled`](#rpc-http-tls-ca-clients-enabled) and/or
    [`rpc-http-tls-known-clients-file`](#rpc-http-tls-known-clients-file).

### `rpc-http-tls-enabled`

=== "Syntax"

    ```bash
    --rpc-http-tls-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_TLS_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    rpc-http-tls-enabled=true
    ```

Enables TLS for the JSON-RPC HTTP service. The default is `false`.

!!! note

    [`--rpc-http-enabled`](#rpc-http-enabled) must be enabled.

### `rpc-http-tls-keystore-file`

=== "Syntax"

    ```bash
    --rpc-http-tls-keystore-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --rpc-http-tls-keystore-file=/home/me/me_node/keystore.pfx
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_TLS_KEYSTORE_FILE=/home/me/me_node/keystore.pfx
    ```

=== "Configuration File"

    ```bash
    rpc-http-tls-keystore-file="/home/me/me_node/keystore.pfx"
    ```

The Keystore file (in PKCS #12 format) that contains private key and the certificate presented to
the client during authentication.

### `rpc-http-tls-keystore-password-file`

=== "Syntax"

    ```bash
    --rpc-http-tls-keystore-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --rpc-http-tls-keystore-password-file=/home/me/me_node/password
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_TLS_KEYSTORE_PASSWORD_FILE=/home/me/me_node/password
    ```

=== "Configuration File"

    ```bash
    rpc-http-tls-keystore-password-file="/home/me/me_node/password"
    ```

The path to the file containing the password to decrypt the keystore.

### `rpc-http-tls-known-clients-file`

=== "Syntax"

    ```bash
    --rpc-http-tls-known-clients-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --rpc-http-tls-known-clients-file=/home/me/me_node/knownClients
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_TLS_KNOWN_CLIENTS_FILE=/home/me/me_node/knownClients
    ```

=== "Configuration File"

    ```bash
    rpc-http-tls-known-clients-file="/home/me/me_node/knownClients"
    ```

The path to the file used to
[authenticate clients](../../HowTo/Configure/Configure-TLS.md#create-the-known-clients-file) using
self-signed certificates or non-public certificates.

Must contain the certificates's Common Name, and SHA-256 fingerprint in the format
`<CommonName> <hex-string>`.

!!! note

    You must enable client authentication using the
    [`---rpc-http-tls-client-auth-enabled`](#rpc-http-tls-client-auth-enabled) option.

### `rpc-tx-feecap`

=== "Syntax"

    ```bash
    --rpc-tx-feecap=<MAX_FEE>
    ```

=== "Command Line"

    ```bash
    --rpc-tx-feecap=1200000000000000000
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_TX_FEECAP=1200000000000000000
    ```

=== "Configuration File"

    ```bash
    rpc-tx-feecap=1200000000000000000
    ```

Sets the maximum transaction fee (in Wei) accepted for transactions submitted through the
[`eth_sendRawTransaction`](../API-Methods.md#eth_sendrawtransaction) RPC. Defaults to 1000000000000000000 (1 ether).

If set to 0, then this option is ignored and no cap is applied.

### `rpc-ws-api`

=== "Syntax"

    ```bash
    --rpc-ws-api=<api name>[,<api name>...]...
    ```

=== "Command Line"

    ```bash
    --rpc-ws-api=ETH,NET,WEB3
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_WS_API=ETH,NET,WEB3
    ```

=== "Configuration File"

    ```bash
    rpc-ws-api=["ETH","NET","WEB3"]
    ```

A comma-separated list of APIs to enable on the WebSockets channel. When you use this option
you must also specify the `--rpc-ws-enabled` option. The available API options are: `ADMIN`,
`CLIQUE`, `DEBUG`, `EEA`, `ETH`, `IBFT`, `MINER`, `NET`, `PERM`, `PLUGINS`, `PRIV`, `TRACE`,
`TXPOOL`, and `WEB3`. The default is: `ETH`, `NET`, `WEB3`.

!!!tip

    The singular `--rpc-ws-api` and plural `--rpc-ws-apis` options are available and are two names
    for the same option.

### `rpc-ws-authentication-credentials-file`

=== "Syntax"

    ```bash
    --rpc-ws-authentication-credentials-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --rpc-ws-authentication-credentials-file=/home/me/me_node/auth.toml
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_WS_AUTHENTICATION_CREDENTIALS_FILE=/home/me/me_node/auth.toml
    ```

=== "Configuration File"

    ```bash
    rpc-ws-authentication-credentials-file="/home/me/me_node/auth.toml"
    ```

The path to the [credentials file](../../HowTo/Interact/APIs/Authentication.md#credentials-file)
for JSON-RPC API [authentication](../../HowTo/Interact/APIs/Authentication.md).

### `rpc-ws-authentication-enabled`

=== "Syntax"

    ```bash
    --rpc-ws-authentication-enabled
    ```

=== "Command Line"

    ```bash
    --rpc-ws-authentication-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_WS_AUTHENTICATION_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    rpc-ws-authentication-enabled=true
    ```

Enables [authentication](../../HowTo/Interact/APIs/Authentication.md) for the WebSockets JSON-RPC
service.

!!! note

    `wscat` does not support headers. [Authentication](../../HowTo/Interact/APIs/Authentication.md)
    requires you to pass an authentication token in the request header. To use authentication with
    WebSockets, you need an app that supports headers.

### `rpc-ws-authentication-jwt-public-key-file`

=== "Syntax"

    ```bash
    --rpc-http-authentication-jwt-public-key-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --rpc-http-authentication-jwt-public-key-file=publicKey.pem
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_HTTP_AUTHENTICATION-JWT-PUBLIC-KEY-FILE="publicKey.pem"
    ```

=== "Configuration File"

    ```bash
    rpc-http-authentication-jwt-public-key-file="publicKey.pem"
    ```

The [JWT provider's public key file] used for JSON-RPC Websocket authentication with an external
JWT.

### `rpc-ws-enabled`

=== "Syntax"

    ```bash
    --rpc-ws-enabled
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_WS_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    rpc-ws-enabled=true
    ```

Enables the WebSockets JSON-RPC service. The default is `false`.

### `rpc-ws-host`

=== "Syntax"

    ```bash
    --rpc-ws-host=<HOST>
    ```

=== "Command Line"

    ```bash
    # to listen on all interfaces
    --rpc-ws-host=0.0.0.0
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_WS_HOST=0.0.0.0
    ```

=== "Configuration File"

    ```bash
    rpc-ws-host="0.0.0.0"
    ```

The host for Websocket WS-RPC to listen on. The default is 127.0.0.1.

To allow remote connections, set to `0.0.0.0`

### `rpc-ws-max-active-connections`

=== "Syntax"

    ```bash
    --rpc-ws-max-active-connections=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --rpc-ws-max-active-connections=100
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_WS_MAX_ACTIVE_CONNECTIONS=100
    ```

=== "Configuration File"

    ```toml
    rpc-ws-max-active-connections=100
    ```

The maximum number of WebSocket connections allowed for JSON-RPC. Once this limit is reached, incoming connections are rejected. The default is 80.

### `rpc-ws-port`

=== "Syntax"

    ```bash
    --rpc-ws-port=<PORT>
    ```

=== "Command Line"

    ```bash
    # to listen on port 6174
    --rpc-ws-port=6174
    ```

=== "Environment Variable"

    ```bash
    BESU_RPC_WS_PORT=6174
    ```

=== "Configuration File"

    ```bash
    rpc-ws-port="6174"
    ```

The Websockets JSON-RPC listening port (TCP). The default is 8546. You must
[expose ports appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### `security-module`

=== "Syntax"

    ```bash
    --security-module=<NAME>
    ```

=== "Command Line"

    ```bash
    --security-module=security_module
    ```

=== "Environment Variable"

    ```bash
    BESU_SECURITY_MODULE=security_module
    ```

=== "Configuration File"

    ```bash
    security-module="security_module"
    ```

Name of the security module [plugin] to use. For example, a Hardware Security Module (HSM) or V3 filestore
plugin

Defaults to using the node's local private key file specified using
[`--node-private-key-file`](#node-private-key-file).

### `static-nodes-file`

=== "Syntax"

    ```bash
    --static-nodes-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --static-nodes-file=~/besudata/static-nodes.json
    ```

=== "Environment Variable"

    ```bash
    BESU_STATIC_NODES_FILE=~/besudata/static-nodes.json
    ```

=== "Configuration File"

    ```bash
    static-nodes-file="~/besudata/static-nodes.json"
    ```

Static nodes JSON file containing the [static nodes](../../HowTo/Find-and-Connect/Static-Nodes.md) for this node to
connect to. Defaults to `datapath/static-nodes.json`.

### `sync-mode`

=== "Syntax"

    ```bash
    --sync-mode=FAST
    ```

=== "Command Line"

    ```bash
    --sync-mode=FAST
    ```

=== "Environment Variable"

    ```bash
    BESU_SYNC_MODE=FAST
    ```

=== "Configuration File"

    ```bash
    sync-mode="FAST"
    ```

The synchronization mode. The options are `FAST` and `FULL`.

* The default is `FULL` when connecting to a private network by not using the [`--network`](#network)
  option and specifying the [`--genesis-file`](#genesis-file) option.
* The default is `FAST` when using the [`--network`](#network) option
  with named networks, except for the `dev` development network. `FAST` is also the default if Ethereum mainnet
  is being connected to by not specifying the [`--network`](#network) and [`--genesis-file`](#genesis-file)
  options.

!!! note

    When running Besu on some cloud providers, a known [RocksDB](https://github.com/facebook/rocksdb/issues/6435)
    issue causes fast sync to fail occasionally. The following error is displayed repeatedly:

    ```
    ...
    EthScheduler-Services-1 (importBlock) | ERROR | PipelineChainDownloader | Chain download failed. Restarting after short delay.
    java.util.concurrent.CompletionException: org.hyperledger.besu.plugin.services.exception.StorageException: org.rocksdb.RocksDBException: block checksum mismatch:
    ....
    ```

    The failure has been seen on AWS and Digital Ocean. A full restart of the AWS VM is required to
    restart the fast sync. Fast sync is not [currently supported on Digital Ocean](https://github.com/hyperledger/besu/blob/master/CHANGELOG.md#143).

!!! important

    Using fast sync with
    [private transactions](../../Concepts/Privacy/Privacy-Overview.md) or on Digital Ocean Droplets
    is not supported.

### `target-gas-limit`

=== "Syntax"

    ```bash
    --target-gas-limit=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --target-gas-limit=8000000
    ```

=== "Environment Variable"

    ```bash
    BESU_TARGET_GAS_LIMIT=8000000
    ```

=== "Configuration File"

    ```bash
    target-gas-limit="8000000"
    ```

The gas limit toward which Besu will gradually move on an existing network, if enough miners are in
agreement. To change the block gas limit set in the genesis file without creating a new network,
use `target-gas-limit`. The gas limit between blocks can change only 1/1024th, so the target tells
the block creator how to set the gas limit in its block. If the values are the same or within
1/1024th, Besu sets the limit to the specified value. Otherwise, the limit moves as far as it can
within that constraint.

If a value for `target-gas-limit` is not specified, the block gas limit remains at the value
specified in the [genesis file](../Config-Items.md#genesis-block-parameters).

Use the [`miner_changeTargetGasLimit`](../API-Methods.md#miner_changetargetgaslimit) API to update
the `target-gas-limit` while Besu is running. Alternatively restart Besu with an updated
`target-gas-limit` value.

### `tx-pool-max-size`

=== "Syntax"

    ```bash
    --tx-pool-max-size=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --tx-pool-max-size=2000
    ```

=== "Environment Variable"

    ```bash
    BESU_TX_POOL_MAX_SIZE=2000
    ```

=== "Configuration File"

    ```bash
    tx-pool-max-size="2000"
    ```

The maximum number of transactions kept in the transaction pool. The default is 4096.

### `tx-pool-hashes-max-size`

=== "Syntax"

    ```bash
    --tx-pool-hashes-max-size=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --tx-pool-hashes-max-size=2000
    ```

=== "Environment Variable"

    ```bash
    BESU_TX_POOL_HASHES_MAX_SIZE=2000
    ```

=== "Configuration File"

    ```bash
    tx-pool-hashes-max-size="2000"
    ```

The maximum number of transaction hashes kept in the transaction pool. The default is 4096.

### `tx-pool-price-bump`

=== "Syntax"

    ```bash
    --tx-pool-price-bump=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --tx-pool-price-bump=25
    ```

=== "Environment Variable"

    ```bash
    BESU_TX_POOL_PRICE_BUMP=25
    ```

=== "Configuration File"

    ```bash
    tx-pool-price-bump=25
    ```

The price bump percentage to replace an existing transaction. The default is 10.

### `tx-pool-retention-hours`

=== "Syntax"

    ```bash
    --tx-pool-retention-hours=<INTEGER>
    ```

=== "Command Line"

    ```bash
    --tx-pool-retention-hours=5
    ```

=== "Environment Variable"

    ```bash
    BESU_TX_POOL_RETENTION_HOURS=5
    ```

=== "Configuration File"

    ```bash
    tx-pool-retention-hours=5
    ```

The maximum period, in hours, to hold pending transactions in the transaction pool. The default is
13.

### `Xdns-enabled`

=== "Syntax"

    ```bash
    --Xdns-enabled=[<true|false>]
    ```

=== "Command Line"

    ```bash
    --Xdns-enabled=true
    ```

=== "Environment Variable"

    ```bash
    BESU_XDNS_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    Xdns-enabled=true
    ```

Enables DNS support. The default is `false`.

!!! important

    Use domain names in private networks only because public networks require using IP addresses.
    This is an early access feature. Some functionality may be updated before the feature is fully
    released.

Use DNS with a trusted DNS provider in private networks because of limitations where IP addresses
can change. For example, when using Kubernetes pods.

### `Xdns-update-enabled`

=== "Syntax"

    ```bash
    --Xdns-update-enabled=[<true|false>]
    ```

=== "Command Line"

    ```bash
    --Xdns-update-enabled=true
    ```

=== "Environment Variable"

    ```bash
    BESU_XDNS_UPDATE_ENABLED=true
    ```

=== "Configuration File"

    ```bash
    Xdns-update-enabled=true
    ```

Allow Besu to continuously query the DNS to ensure updates to IP addresses are automatically
detected. The default is `false`.

[`Xdns-enabled`](#Xdns-enabled) must be set to `true`.

!!! important

    This is an early access feature. Some functionality may be updated before the feature is fully released.

### `version`

=== "Syntax"

    ```bash
    -V, --version
    ```

Print version information and exit.

<!-- Links -->
[push gateway integration]: ../../HowTo/Monitor/Metrics.md#running-prometheus-with-besu-in-push-mode
[accounts permissions configuration file]: ../../HowTo/Limit-Access/Local-Permissioning.md#permissions-configuration-file
[nodes permissions configuration file]: ../../HowTo/Limit-Access/Local-Permissioning.md#permissions-configuration-file
[account permissioning]: ../../Concepts/Permissioning/Permissioning-Overview.md#account-permissioning
[TLS on communication with the Private Transaction Manager]: ../../Concepts/Privacy/Privacy-Overview.md#private-transaction-manager
[JWT provider's public key file]: ../../HowTo/Interact/APIs/Authentication.md#jwt-public-key-authentication
[plugin]: ../Plugin-API-Interfaces.md
