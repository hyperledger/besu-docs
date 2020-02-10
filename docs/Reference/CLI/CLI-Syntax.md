description: Hyperledger Besu command line interface reference
<!--- END of page meta data -->

# Hyperledger Besu Command Line

This reference describes the syntax of the Hyperledger Besu Command Line Interface (CLI) options and subcommands.

## Specifying Options

Besu options can be specified: 

* On the command line 
* As an [environment variable](#besu-environment-variables) 
* In a [configuration file](../../HowTo/Configure/Using-Configuration-File.md).

If an option is specified in multiple places, the order of priority is command line, environment variable, 
configuration file. 

### Besu Environment Variables

For each command line option, the equivalent environment variable is: 

* Upper-case
* `-` is replaced by `_` 
* Has a `BESU_` prefix

For example, set `--miner-coinbase` using the `BESU_MINER_COINBASE` environment variable. 

## Options

To start a Besu node run:

```bash
besu [OPTIONS] [COMMAND]
```
### banned-node-ids

```bash tab="Syntax"
--banned-node-ids=<bannedNodeId>[,<bannedNodeId>...]...
```

```bash tab="Command Line"
--banned-nodeids=0xc35c3...d615f,0xf42c13...fc456
```

```bash tab="Environment Variable"
BESU_BANNED_NODEIDS=0xc35c3...d615f,0xf42c13...fc456
```

```bash tab="Configuration File"
banned-nodeids=["0xc35c3...d615f","0xf42c13...fc456"]
```

List of node IDs with which this node will not peer. The node ID is the public key of the node. You can specify the banned node IDs with or without the `0x` prefix.

!!!tip
    The singular `--banned-node-id` and plural `--banned-node-ids` are available and are two
    names for the same option.
 
### bootnodes

```bash tab="Syntax"
--bootnodes[=<enode://id@host:port>[,<enode://id@host:port>...]...]
```

```bash tab="Command Line"
--bootnodes=enode://c35c3...d615f@1.2.3.4:30303,enode://f42c13...fc456@1.2.3.5:30303
```

```bash tab="Environment Variable"
BESU_BOOTNODES=enode://c35c3...d615f@1.2.3.4:30303,enode://f42c13...fc456@1.2.3.5:30303
```

```bash tab="Example Configuration File"
bootnodes=["enode://c35c3...d615f@1.2.3.4:30303","enode://f42c13...fc456@1.2.3.5:30303"]
``` 
  
List of comma-separated [enode URLs](../../Concepts/Node-Keys.md#enode-url) for [P2P discovery bootstrap](../../HowTo/Find-and-Connect/Bootnodes.md). 
  
When connecting to MainNet or public testnets, the default is a predefined list of enode URLs. 

In private networks defined using [`--genesis-file`](#genesis-file) or when using [`--network=dev`](#network),
the default is an empty list of bootnodes.

### config-file

```bash tab="Syntax"
--config-file=<FILE>
```

```bash tab="Command Line"
--config-file=/home/me/me_node/config.toml
```

```bash tab="Environment Variable"
BESU_CONFIG_FILE=/home/me/me_node/config.toml
```

The path to the [TOML configuration file](../../HowTo/Configure/Using-Configuration-File.md).
The default is `none`.
        
### data-path

```bash tab="Syntax"
--data-path=<PATH>
```

```bash tab="Command Line"
--data-path=/home/me/me_node
```

```bash tab="Environment Variable"
BESU_DATA_PATH=/home/me/me_node
```

```bash tab="Configuration File"
data-path="/home/me/me_node"
```

The path to the Besu data directory. The default is the directory in which Besu is installed
or `/opt/besu/database` if using the [Besu Docker image](../../HowTo/Get-Started/Run-Docker-Image.md).

### discovery-enabled

```bash tab="Syntax"
--discovery-enabled=false
```

```bash tab="Environment Variable"
BESU_DISCOVERY_ENABLED=false
```

```bash tab="Example Configuration File"
discovery-enabled=false
```

Enables or disables P2P peer discovery.
The default is `true`.

### fast-sync-min-peers

```bash tab="Syntax"
--fast-sync-min-peers=<INTEGER>
```

```bash tab="Command Line"
--fast-sync-min-peers=2
```

```bash tab="Environment Variable"
BESU_FAST_SYNC_MIN_PEERS=2
```

```bash tab="Example Configuration File"
fast-sync-min-peers=2
```

Minimum number of peers required before starting fast sync. Default is 5.

!!! note
    If synchronizing in FAST mode, most historical world state data is unavailable.  Any methods attempting 
    to access unavailable world state data return `null`.

### genesis-file

Genesis file is used to create a custom network.

!!!tip
    To use a public Ethereum network such as Rinkeby, use the [`--network`](#network) option.
    The network option defines the genesis file for public networks.

```bash tab="Syntax"
--genesis-file=<FILE>
```

```bash tab="Command Line"
--genesis-file=/home/me/me_node/customGenesisFile.json
```

```bash tab="Environment Variable"
BESU_GENESIS_FILE=/home/me/me_node/customGenesisFile.json
```

```bash tab="Configuration File"
genesis-file="/home/me/me_node/customGenesisFile.json"
```

The path to the genesis file.

!!!important
    The [`--genesis-file`](#genesis-file) and [`--network`](#network) option can't be used at the same time.

### graphql-http-cors-origins

```bash tab="Syntax"
--graphql-http-cors-origins=<graphQLHttpCorsAllowedOrigins>
```

```bash tab="Command Line"
--graphql-http-cors-origins="http://medomain.com","https://meotherdomain.com"
```

```bash tab="Environment Variable"
BESU_GRAPHQL_HTTP_CORS_ORIGINS="http://medomain.com","https://meotherdomain.com"
```

```bash tab="Configuration File"
graphql-http-cors-origins=["http://medomain.com","https://meotherdomain.com"]
```

Comma separated origin domain URLs for CORS validation. The default is none. 

### graphql-http-enabled

```bash tab="Syntax"
--graphql-http-enabled
```

```bash tab="Environment Variable"
BESU_GRAPHQL_HTTP_ENABLED=true
```

```bash tab="Configuration File"
graphql-http-enabled=true
```

Set to `true` to enable the GraphQL HTTP service. The default is `false`.

The default GraphQL HTTP service endpoint is `http://127.0.0.1:8547/graphql` if set to `true`.

### graphql-http-host

```bash tab="Syntax"
--graphql-http-host=<HOST>
```

```bash tab="Command Line"
# to listen on all interfaces
--graphql-http-host=0.0.0.0
```

```bash tab="Environment Variable"
# to listen on all interfaces
BESU_GRAPHQL_HTTP_HOST=0.0.0.0
```

```bash tab="Configuration File"
graphql-http-host="0.0.0.0"
```

Host for GraphQL HTTP to listen on.
The default is 127.0.0.1.

To allow remote connections, set to `0.0.0.0`
    
### graphql-http-port

```bash tab="Syntax"
--graphql-http-port=<PORT>
```

```bash tab="Command Line"
# to listen on port 6175
--graphql-http-port=6175
```

```bash tab="Environment Variable"
# to listen on port 6175
BESU_GRAPHQL_HTTP_PORT=6175
```

```bash tab="Configuration File"
graphql-http-port="6175"
```

Specifies GraphQL HTTP listening port (TCP).
The default is 8547. Ports must be [exposed appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### help

```bash tab="Syntax"
-h, --help
```

Show the help message and exit.

### host-whitelist

```bash tab="Syntax"
--host-whitelist=<hostname>[,<hostname>...]... or "*"
```

```bash tab="Command Line"
--host-whitelist=medomain.com,meotherdomain.com
```

```bash tab="Environment Variable"
BESU_HOST_WHITELIST=medomain.com,meotherdomain.com
```

```bash tab="Configuration File"
host-whitelist=["medomain.com", "meotherdomain.com"]
```

Comma-separated list of hostnames to allow [access to the JSON-RPC API](../../HowTo/Interact/APIs/Using-JSON-RPC-API.md#host-whitelist). 
By default, access from `localhost` and `127.0.0.1` is accepted. 

!!!tip
    To allow all hostnames, use `"*"`. We don't recommend allowing all hostnames for production code.

### identity

```bash tab="Syntax"
--identity=<String>
```

```bash tab="Command Line"
--identity=MyNode
```

```bash tab="Environment Variable"
BESU_IDENTITY=MyNode
```

```bash tab="Configuration File"
identity="MyNode"
```

Name for the node. If specified, it is the second section of the client ID provided by some Ethereum network explorers. For example, in the client ID `besu/MyNode/v1.3.4/linux-x86_64/oracle_openjdk-java-11`, the node name is `MyNode`. 

If a name is not specified, the name section is not included in the client ID. For example, `besu/v1.3.4/linux-x86_64/oracle_openjdk-java-11`.

### key-value-storage

```bash tab="Syntax"
--key-value-storage=<keyValueStorageName>
```

```bash tab="Command Line"
--key-value-storage=rocksdb
```

```bash tab="Environment Variable"
BESU_KEY_VALUE_STORAGE=rocksdb
```

```bash tab="Configuration File"
key-value-storage="rocksdb"
```

Key-value storage to be used. Use this option only if using a storage system provided with a plugin. Default is `rocksdb`.

### logging

```bash tab="Syntax"
-l, --logging=<LEVEL>
```

```bash tab="Command Line"
--logging=DEBUG
```

```bash tab="Environment Variable"
BESU_LOGGING=DEBUG
```

```bash tab="Example Configration File"
logging="DEBUG"
```

Sets the logging verbosity.
Log levels are `OFF`, `FATAL`, `ERROR`, `WARN`, `INFO`, `DEBUG`, `TRACE`, `ALL`.
Default is `INFO`.

### max-peers

```bash tab="Syntax"
--max-peers=<INTEGER>
```

```bash tab="Command Line"
--max-peers=42
```

```bash tab="Environment Variable"
BESU_MAX_PEERS=42
```

```bash tab="Configuration File"
max-peers=42
```

Specifies the maximum P2P connections that can be established.
The default is 25.

### metrics-category

```bash tab="Syntax"
--metrics-category=<metrics-category>[,metrics-category...]...
```

```bash tab="Command Line"
--metrics-category=BLOCKCHAIN,PEERS,PROCESS
```

```bash tab="Environment Variable"
BESU_METRICS_CATEGORY=BLOCKCHAIN,PEERS,PROCESS
```

```bash tab="Configuration File"
metrics-category=["BLOCKCHAIN","PEERS","PROCESS"]
```

Comma separated list of categories for which to track metrics. Defaults are 
`BLOCKCHAIN`, `ETHEREUM`, `EXECUTORS`, `JVM`, `NETWORK`, `PEERS`, `PERMISSIONING`, `PROCESS`, `PRUNER`, `RPC`, `SYNCHRONIZER`, and `TRANSACTION_POOL`. 

Additional categories are `KVSTORE_ROCKSDB`, `KVSTORE_PRIVATE_ROCKSDB`, `KVSTORE_ROCKSDB_STATS`, and `KVSTORE_PRIVATE_ROCKSDB_STATS`.

Categories that contain `PRIVATE` track metrics when [private transactions](../../Concepts/Privacy/Privacy-Overview.md) are enabled.

### metrics-enabled

```bash tab="Syntax"
--metrics-enabled
```

```bash tab="Environment Variable"
BESU_METRICS_ENABLED=true
```

```bash tab="Configuration File"
metrics-enabled=true
```

Set to `true` to enable the [metrics exporter](../../HowTo/Monitor/Metrics.md#monitor-node-performance-using-prometheus).
The default is `false`.

`--metrics-enabled` cannot be specified with `--metrics-push-enabled`. That is, either Prometheus polling or Prometheus 
push gateway support can be enabled but not both at once. 

### metrics-host

```bash tab="Syntax"
--metrics-host=<HOST>
```

```bash tab="Command Line"
--metrics-host=127.0.0.1
```

```bash tab="Environment Variable"
BESU_METRICS_HOST=127.0.0.1
```

```bash tab="Configuration File"
metrics-host="127.0.0.1"
```

Specifies the host on which [Prometheus](https://prometheus.io/) accesses [Besu metrics](../../HowTo/Monitor/Metrics.md#monitor-node-performance-using-prometheus). 
The metrics server respects the [`--host-whitelist` option](#host-whitelist).

The default is `127.0.0.1`. 

### metrics-port

```bash tab="Syntax"
--metrics-port=<PORT>
```

```bash tab="Command Line"
--metrics-port=6174
```

```bash tab="Environment Variable"
BESU_METRICS_PORT=6174
```

```bash tab="Configuration File"
metrics-port="6174"
```

Specifies the port (TCP) on which [Prometheus](https://prometheus.io/) accesses [Besu metrics](../../HowTo/Monitor/Metrics.md#monitor-node-performance-using-prometheus).
The default is `9545`. Ports must be [exposed appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### metrics-push-enabled 

```bash tab="Syntax"
--metrics-push-enabled[=<true|false>]
```

```bash tab="Command Line"
--metrics-push-enabled
```

```bash tab="Environment Variable"
BESU_METRICS_PUSH_ENABLED=true
```

```bash tab="Configuration File"
metrics-push-enabled="true"
```

Set to `true` to start the [push gateway integration](../../HowTo/Monitor/Metrics.md#running-prometheus-with-besu-in-push-mode).

`--metrics-push-enabled` cannot be specified with `--metrics-enabled`. That is, either Prometheus polling or Prometheus 
push gateway support can be enabled but not both at once.

### metrics-push-host

```bash tab="Syntax"
--metrics-push-host=<HOST>
```

```bash tab="Command Line"
--metrics-push-host=127.0.0.1
```

```bash tab="Environment Variable"
BESU_METRICS_PUSH_HOST=127.0.0.1
```

```bash tab="Configuration File"
metrics-push-host="127.0.0.1"
```

Host of the [Prometheus Push Gateway](https://github.com/prometheus/pushgateway).
The default is `127.0.0.1`. 
The metrics server respects the [`--host-whitelist` option](#host-whitelist).

!!! note
    When pushing metrics, ensure `--metrics-push-host` is set to the machine on which the push gateway is. 
    Generally, this will be a different machine to the machine on which Besu is running.  

### metrics-push-interval

```bash tab="Syntax"
--metrics-push-interval=<INTEGER>
```

```bash tab="Command Line"
--metrics-push-interval=30
```

```bash tab="Environment Variable"
BESU_METRICS_PUSH_INTERVAL=30
```

```bash tab="Configuration File"
metrics-push-interval=30
```

Interval in seconds to push metrics when in `push` mode. The default is 15.

### metrics-push-port

```bash tab="Syntax"
--metrics-push-port=<PORT>
```

```bash tab="Command Line"
--metrics-push-port=6174
```

```bash tab="Environment Variable"
BESU_METRICS_PUSH_PORT=6174
```

```bash tab="Configuration File"
metrics-push-port="6174"
```

Port (TCP) of the [Prometheus Push Gateway](https://github.com/prometheus/pushgateway).
The default is `9001`. Ports must be [exposed appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### metrics-push-prometheus-job

```bash tab="Syntax"
--metrics-prometheus-job=<metricsPrometheusJob>
```

```bash tab="Command Line"
--metrics-prometheus-job="my-custom-job"
```

```bash tab="Environment Variable"
BESU_METRICS_PROMETHEUS_JOB="my-custom-job"
```

```bash tab="Configuration File"
metrics-prometheus-job="my-custom-job"
```

Job name when in `push` mode. The default is `besu-client`. 

### miner-coinbase

```bash tab="Syntax"
--miner-coinbase=<Ethereum account address>
```

```bash tab="Command Line"
--miner-coinbase=fe3b557e8fb62b89f4916b721be55ceb828dbd73
```

```bash tab="Environment Variable"
BESU_MINER_COINBASE=fe3b557e8fb62b89f4916b721be55ceb828dbd73
```

```bash tab="Configuration File"
--miner-coinbase="0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
```

Account to which mining rewards are paid.
You must specify a valid coinbase when you enable mining using the [`--miner-enabled`](#miner-enabled) 
option or the [`miner_start`](../API-Methods.md#miner_start) JSON RPC-API method.

!!!note
    This option is ignored in networks using [Clique](../../HowTo/Configure/Consensus-Protocols/Clique.md) and [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md) consensus protocols. 

### miner-enabled

```bash tab="Syntax"
--miner-enabled
```

```bash tab="Environment Variable"
BESU_MINER_ENABLED=true
```

```bash tab="Configuration File"
miner-enabled=true
```

Enables mining when the node is started.
Default is `false`.
  
### miner-extra-data

```bash tab="Syntax"
--miner-extra-data=<Extra data>
```

```bash tab="Command Line"
--miner-extra-data=0x444F4E27542050414E4943202120484F444C2C20484F444C2C20484F444C2021
```

```bash tab="Environment Variable"
BESU_MINER_EXTRA_DATA=0x444F4E27542050414E4943202120484F444C2C20484F444C2C20484F444C2021
```

```bash tab="Configuration File"
miner-extra-data="0x444F4E27542050414E4943202120484F444C2C20484F444C2C20484F444C2021"
```

A hex string representing the 32 bytes to be included in the extra data field of a mined block.
The default is 0x.

### miner-stratum-enabled

```bash tab="Syntax"
--miner-stratum-enabled
```

```bash tab="Environment Variable"
BESU_MINER_STRATUM_ENABLED=true
```

```bash tab="Configuration File"
miner-stratum-enabled=true
```

Enables a node to perform stratum mining. 
Default is `false`. 

### miner-stratum-host

```bash tab="Syntax"
--miner-stratum-host=<HOST>
```

```bash tab="Command Line"
--miner-stratum-host=192.168.1.132
```

```bash tab="Environment Variable"
BESU_MINER_STRATUM_HOST=192.168.1.132
```

```bash tab="Configuration File"
miner-stratum-host="192.168.1.132"
```

Host of the stratum mining service.
Default is `0.0.0.0`.

### miner-stratum-port

```bash tab="Syntax"
--miner-stratum-port=<PORT>
```

```bash tab="Command Line"
--miner-stratum-port=8010
```

```bash tab="Environment Variable"
BESU_MINER_STRATUM_PORT=8010
```

```bash tab="Configuration File"
miner-stratum-port="8010"
```

Port of the stratum mining service.
Default is `8008`. Ports must be [exposed appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).
 
### min-gas-price

```bash tab="Syntax"
--min-gas-price=<minTransactionGasPrice>
```

```bash tab="Command Line"
--min-gas-price=1337
```

```bash tab="Environment Variable"
BESU_MIN_GAS_PRICE=1337
```

```bash tab="Configuration File"
min-gas-price=1337
```

The minimum price that a transaction offers for it to be included in a mined block. To retrieve the minimum price in a running node, use [`eth_gasPrice`](../API-Methods.md#eth_gasprice).
Default is 1000.

### nat-method

```bash tab="Syntax"
--nat-method=UPNP
```

```bash tab="Example Configuration File"
nat-method="UPNP"
```

Specify the method for handling [NAT environments](../../HowTo/Find-and-Connect/Using-UPnP.md). Options are: `UPNP` and `NONE`.
The default is `NONE`, which disables NAT functionality.

!!!tip
    UPnP support is often disabled by default in networking firmware. If disabled by default, explicitly enable UPnP support.

!!!notes
    * Option `UPNP` might introduce delays during node startup, especially on networks where no UPnP gateway device can be found.
    * `--nat-method` cannot be used with the [Besu Docker image](../../HowTo/Get-Started/Run-Docker-Image.md).

### network

```bash tab="Syntax"
--network=<NETWORK>
```

```bash tab="Command Line"
--network=rinkeby
```

```bash tab="Environment Variable"
BESU_NETWORK=rinkeby
```

```bash tab="Configuration File"
network="rinkeby"
```

Predefined network configuration.
The default is `mainnet`.

Possible values are:
 
| Network   | Chain | Type        | Description                                                       |
|-----------|-------|-------------|-------------------------------------------------------------------|
| `mainnet` | ETH   | Production  | Main network                                                      |
| `ropsten` | ETH   | Test        | PoW network similar to current main Ethereum network              |
| `rinkeby` | ETH   | Test        | PoA network using Clique                                          |
| `goerli`  | ETH   | Test        | PoA network using Clique                                          |
| `dev`     | ETH   | Development | PoW network with a very low difficulty to enable local CPU mining |
| `classic` | ETC   | Production  | Main network                                                      |
| `mordor ` | ETC   | Test        | PoW network                                                       |
| `kotti`   | ETC   | Test        | PoA network using Clique                                          |

!!!tip
    Values are case insensitive, so either `mainnet` or `MAINNET` works. 
    
!!!important
    The [`--network`](#network) and [`--genesis-file`](#genesis-file) options cannot be used at the same time.
    
### network-id

```bash tab="Syntax"
--network-id=<INTEGER>
```

```bash tab="Command Line"
--network-id=8675309
```

```bash tab="Environment Variable"
BESU_NETWORK_ID=8675309
```

```bash tab="Configuration File"
network-id="8675309"
```

[P2P network identifier](../../Concepts/NetworkID-And-ChainID.md).

This option can be used to override the default network ID.
The default value is the network chain ID defined in the genesis file.

### node-private-key-file

```bash tab="Syntax"
--node-private-key-file=<FILE>
```

```bash tab="Command Line"
--node-private-key-file=/home/me/me_node/myPrivateKey
```

```bash tab="Environment Variable"
BESU_NODE_PRIVATE_KEY_FILE=/home/me/me_node/myPrivateKey
```

```bash tab="Configuration File"
node-private-key-file="/home/me/me_node/myPrivateKey"
```

`<FILE>` is the path of the private key file of the node.
The default is the key file in the [data directory](#data-path).
If no key file exists, a key file containing the generated private key is created;
otherwise, the existing key file specifies the node private key.

!!!attention
    The private key is not encrypted.

### p2p-enabled

```bash tab="Syntax"
--p2p-enabled=<true|false>
```

```bash tab="Command line"
--p2p-enabled=false
```

```bash tab="Environment Variable"
BESU_P2P_ENABLED=false
```

```bash tab="Configuration File"
p2p-enabled=false
```

Enables or disables all p2p communication.
The default is true.

### p2p-host

```bash tab="Syntax"
--p2p-host=<HOST>
```

```bash tab="Command Line"
# to listen on all interfaces
--p2p-host=0.0.0.0
```

```bash tab="Environment Variable"
# to listen on all interfaces
BESU_P2P_HOST=0.0.0.0
```

```bash tab="Configuration File"
p2p-host="0.0.0.0"
```

Specifies the host on which P2P listens.
The default is 127.0.0.1.

### p2p-interface

```bash tab="Syntax"
--p2p-interface=<HOST>
```

```bash tab="Command Line"
--p2p-interface=192.168.1.132
```

```bash tab="Environment Variable"
BESU_P2P_INTERFACE=192.168.1.132
```

```bash tab="Configuration File"
p2p-interface="192.168.1.132"
```

Specifies the network interface on which the node listens for [P2P communication](../../HowTo/Find-and-Connect/Configuring-Ports.md#p2p-networking).
Use the option to specify the required network interface when the device that Besu is running on 
has multiple network interfaces. The default is 0.0.0.0 (all interfaces).

### p2p-port

```bash tab="Syntax"
--p2p-port=<PORT>
```

```bash tab="Command Line"
# to listen on port 1789
--p2p-port=1789
```

```bash tab="Environment Variable"
# to listen on port 1789
BESU_P2P_PORT=1789
```

```bash tab="Configuration File"
p2p-port="1789"
```

Specifies the P2P listening ports (UDP and TCP).
The default is 30303. Ports must be [exposed appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).


### permissions-accounts-config-file    

```bash tab="Syntax"
--permissions-accounts-config-file=<FILE>
```

```bash tab="Command Line"
--permissions-accounts-config-file=/home/me/me_configFiles/myPermissionsFile
```

```bash tab="Environment Variable"
BESU_PERMISSIONS_ACCOUNTS_CONFIG_FILE=/home/me/me_configFiles/myPermissionsFile
```

```bash tab="Configuration File"
permissions-accounts-config-file="/home/me/me_configFiles/myPermissionsFile"
```

Path to the [accounts permissions configuration file](../../HowTo/Limit-Access/Local-Permissioning.md#permissions-configuration-file).
Default is the `permissions_config.toml` file in the [data directory](#data-path).

!!! tip
    `--permissions-accounts-config-file` and [`--permissions-nodes-config-file`](#permissions-nodes-config-file)
    can use the same file. 
    
### permissions-accounts-config-file-enabled

```bash tab="Syntax"
--permissions-accounts-config-file-enabled[=<true|false>]
```

```bash tab="Command Line"
--permissions-accounts-config-file-enabled
```

```bash tab="Environment Variable"
BESU_PERMISSIONS_ACCOUNTS_CONFIG_FILE_ENABLED=true
```

```bash tab="Configuration File"
permissions-accounts-config-file-enabled=true
```

Set to enable file-based account level permissions. Default is `false`. 

### permissions-accounts-contract-address

```bash tab="Syntax"
--permissions-accounts-contract-address=<ContractAddress>
```

```bash tab="Command Line"
--permissions-accounts-contract-address=xyz
```

```bash tab="Environment Variable"
BESU_PERMISSIONS_ACCOUNTS_CONTRACT_ADDRESS=xyz
```

```bash tab="Configuration File"
permissions-accounts-contract-address=xyz
```

Specifies the contract address for [onchain account permissioning](../../Concepts/Permissioning/Onchain-Permissioning.md).

### permissions-accounts-contract-enabled

```bash tab="Syntax"
--permissions-accounts-contract-enabled[=<true|false>]
```

```bash tab="Command Line"
--permissions-accounts-contract-enabled
```

```bash tab="Environment Variable"
BESU_PERMISSIONS_ACCOUNTS_CONTRACT_ENABLED=true
```

```bash tab="Configuration File"
permissions-accounts-contract-enabled=true
```

Enables contract-based [onchain account permissioning](../../Concepts/Permissioning/Onchain-Permissioning.md). Default is `false`.


### permissions-nodes-config-file    

```bash tab="Syntax"
--permissions-nodes-config-file=<FILE>
```

```bash tab="Command Line"
--permissions-nodes-config-file=/home/me/me_configFiles/myPermissionsFile
```

```bash tab="Environment Variable"
BESU_PERMISSIONS_NODES_CONFIG_FILE=/home/me/me_configFiles/myPermissionsFile
```

```bash tab="Configuration File"
permissions-nodes-config-file="/home/me/me_configFiles/myPermissionsFile"
```

Path to the [nodes permissions configuration file](../../HowTo/Limit-Access/Local-Permissioning.md#permissions-configuration-file).
Default is the `permissions_config.toml` file in the [data directory](#data-path).

!!! tip
    `--permissions-nodes-config-file` and [`--permissions-accounts-config-file`](#permissions-accounts-config-file)
    can use the same file. 
    
### permissions-nodes-config-file-enabled

```bash tab="Syntax"
--permissions-nodes-config-file-enabled[=<true|false>]
```

```bash tab="Command Line"
--permissions-nodes-config-file-enabled
```

```bash tab="Environment Variable"
BESU_PERMISSIONS_NODES_CONFIG_FILE_ENABLED=true
```

```bash tab="Configuration File"
permissions-nodes-config-file-enabled=true
```

Set to enable file-based node level permissions. Default is `false`.

### permissions-nodes-contract-address

```bash tab="Syntax"
--permissions-nodes-contract-address=<ContractAddress>
```

```bash tab="Command Line"
--permissions-nodes-contract-address=xyz
```

```bash tab="Environment Variable"
BESU_PERMISSIONS_NODES_CONTRACT_ADDRESS=xyz
```

```bash tab="Configuration File"
permissions-nodes-contract-address=xyz
```

Specifies the contract address for [onchain node permissioning](../../Concepts/Permissioning/Onchain-Permissioning.md).

### permissions-nodes-contract-enabled

```bash tab="Syntax"
--permissions-nodes-contract-enabled[=<true|false>]
```

```bash tab="Command Line"
--permissions-nodes-contract-enabled
```

```bash tab="Environment Variable"
BESU_PERMISSIONS_NODES_CONTRACT_ENABLED=true
```

```bash tab="Configuration File"
permissions-nodes-contract-enabled=true
```

Enables contract-based [onchain node permissioning](../../Concepts/Permissioning/Onchain-Permissioning.md). Default is `false`.

### privacy-enabled

```bash tab="Syntax"
--privacy-enabled[=<true|false>]
```

```bash tab="Command Line"
--privacy-enabled=false
```

```bash tab="Environment Variable"
BESU_PRIVACY_ENABLED=false
```

```bash tab="Configuration File"
privacy-enabled=false
```

Set to enable [private transactions](../../Concepts/Privacy/Privacy-Overview.md). The default is false.

!!! important
    Using private transactions with [pruning](../../Concepts/Pruning.md) is not supported.

### privacy-marker-transaction-signing-key-file

```bash tab="Syntax"
--privacy-marker-transaction-signing-key-file=<FILE>
```

```bash tab="Command Line"
--privacy-marker-transaction-signing-key-file=/home/me/me_node/myPrivateKey
```

```bash tab="Environment Variable"
PANTHEON_PRIVACY_MARKER_TRANSACTION_SIGNING_KEY_FILE=/home/me/me_node/myPrivateKey
```

```bash tab="Configuration File"
privacy-marker-transaction-signing-key-file="/home/me/me_node/myPrivateKey"
```

`<FILE>` is the name of the private key file used to [sign Privacy Marker Transactions](../../HowTo/Use-Privacy/Sign-Privacy-Marker-Transactions.md). If this option isn't specified, each transaction is signed with a different randomly generated key.

If using [account permissioning](../../Concepts/Permissioning/Permissioning-Overview.md#account-permissioning) 
and privacy, a private key file must be specified and the signing key included in the accounts whitelist.  

### privacy-precompiled-address

```bash tab="Syntax"
--privacy-precompiled-address=<privacyPrecompiledAddress>
```

Address to which the [privacy pre-compiled contract](../../Concepts/Privacy/Private-Transaction-Processing.md) is mapped.
The default is 126.     
    
### privacy-public-key-file

```bash tab="Syntax"
--privacy-public-key-file=<privacyPublicKeyFile>
```

```bash tab="Command Line"
--privacy-public-key-file=Orion/nodeKey.pub
```

```bash tab="Environment Variable"
BESU_PRIVACY_PUBLIC_KEY_FILE=Orion/nodeKey.pub
```

```bash tab="Configuration File"
privacy-public-key-file="Orion/nodeKey.pub"
```

Path to the [public key of the Orion node](../../Concepts/Privacy/Privacy-Overview.md#besu-and-orion-keys).     

### privacy-tls-enabled

```bash tab="Syntax"
--privacy-tls-enabled[=<true|false>]
```

```bash tab="Command Line"
--privacy-tls-enabled=false
```

```bash tab="Environment Variable"
BESU_PRIVACY_TLS_ENABLED=false
```

```bash tab="Configuration File"
privacy-tls-enabled=false
```

Set to enable [TLS for privacy](../../Concepts/Privacy/Privacy-Overview.md). The default is false.

### privacy-tls-keystore-file
### privacy-tls-keystore-password-file
### privacy-tls-known-enclave-file


### privacy-url

```bash tab="Syntax"
--privacy-url=<privacyUrl>
```

```bash tab="Command Line"
--privacy-url=http://127.0.0.1:8888
```

```bash tab="Environment Variable"
BESU_PRIVACY_URL=http://127.0.0.1:8888
```

```bash tab="Configuration File"
privacy-url="http://127.0.0.1:8888"
```

URL on which the [Orion node](../../Tutorials/Privacy/Configuring-Privacy.md#4-create-orion-configuration-files) is running.

### pruning-enabled

```bash tab="Syntax"
--pruning-enabled
```

```bash tab="Command Line"
--pruning-enabled=true
```

```bash tab="Environment Variable"
BESU_PRUNING_ENABLED=true
```

```bash tab="Configuration File"
pruning-enabled=true
```

Enables [pruning](../../Concepts/Pruning.md) to reduce storage required for the world state.

!!! important
    Using pruning with [private transactions](../../Concepts/Privacy/Privacy-Overview.md) is not supported.


### remote-connections-limit-enabled

```bash tab="Syntax"
--remote-connections-limit-enabled[=<true|false>]
```

```bash tab="Command Line"
--remote-connections-limit-enabled=false
```

```bash tab="Environment Variable"
BESU_REMOTE_CONNECTIONS_LIMIT_ENABLED=false
```

```bash tab="Configuration File"
remote-connections-limit-enabled=false
```

Specify to limit the percentage of remote P2P connections initiated by peers. Default is true. 

!!! tip
    In private networks with a level of trust between peers, disabling the remote connection limits 
    may increase the speed at which nodes can join the network.

!!! important
    To prevent eclipse attacks, ensure the remote connections limit is enabled when connecting to 
    any public network and especially when using [`--sync-mode`](#sync-mode) and [`--fast-sync-min-peers`](#--fast-sync-min-peers). 

### remote-connections-max-percentage

```bash tab="Syntax"
--remote-connections-max-percentage=<DOUBLE>
```

```bash tab="Command Line"
--remote-connections-max-percentage=25
```

```bash tab="Environment Variable"
BESU_REMOTE_CONNECTIONS_MAX_PERCENTAGE=25
```

```bash tab="Configuration File"
remote-connections-max-percentage=25
```

Percentage of remote P2P connections that can be established with the node. Must be between 0 and 100 inclusive.
Default is 60. 

### required-block

```bash tab="Syntax"
--required-block, --required-blocks[=BLOCK=HASH[,BLOCK=HASH...]...]
```

```bash tab="Command Line"
--required-block=6485846=0x43f0cd1e5b1f9c4d5cda26c240b59ee4f1b510d0a185aa8fd476d091b0097a80
```

```bash tab="Environment Variable"
BESU_REQUIRED_BLOCK=6485846=0x43f0cd1e5b1f9c4d5cda26c240b59ee4f1b510d0a185aa8fd476d091b0097a80
```

```bash tab="Configuration File"
required-block="6485846=0x43f0cd1e5b1f9c4d5cda26c240b59ee4f1b510d0a185aa8fd476d091b0097a80"
```

Requires a peer with the specified block number to have the specified hash when connecting, or that peer is rejected.
    
### revert-reason-enabled

```bash tab="Syntax"
--revert-reason-enabled[=<true|false>]
```

```bash tab="Command Line"
--revert-reason-enabled=true
```

```bash tab="Environment Variable"
REVERT_REASON_ENABLED=true
```

```bash tab="Configuration File"
revert-reason-enabled=true
```

Enables including the [revert reason](../../HowTo/Send-Transactions/Revert-Reason.md) in the transaction 
receipt. Default is `false`. 

!!! caution 
    Enabling revert reason may use a significant amount of memory. We do not recommend enabling revert
    reason when connected to public Ethereum networks. 

### rpc-http-api

```bash tab="Syntax"
--rpc-http-api=<api name>[,<api name>...]...
```

```bash tab="Command Line"
--rpc-http-api=ETH,NET,WEB3
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_API=ETH,NET,WEB3
```

```bash tab="Configuration File"
rpc-http-api=["ETH","NET","WEB3"]
```

Comma-separated APIs to enable on the HTTP JSON-RPC channel.
When you use this option, the `--rpc-http-enabled` option must also be specified.
The available API options are: `ADMIN`, `ETH`, `NET`, `WEB3`, `CLIQUE`, `IBFT`, `PERM`, `DEBUG`, `MINER`, `EEA`, `PRIV`, and `TXPOOL`.
The default is: `ETH`, `NET`, `WEB3`.

!!!tip
    The singular `--rpc-http-api` and plural `--rpc-http-apis` are available and are two
    names for the same option.
    
### rpc-http-authentication-credentials-file

```bash tab="Syntax"
--rpc-http-authentication-credentials-file=<FILE>
```

```bash tab="Command Line"
--rpc-http-authentication-credentials-file=/home/me/me_node/auth.toml
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_AUTHENTICATION_CREDENTIALS_FILE=/home/me/me_node/auth.toml
```

```bash tab="Configuration File"
rpc-http-authentication-credentials-file="/home/me/me_node/auth.toml"
```

[Credentials file](../../HowTo/Interact/APIs/Authentication.md#credentials-file) for JSON-RPC API [authentication](../../HowTo/Interact/APIs/Authentication.md). 

### rpc-http-authentication-enabled

```bash tab="Syntax"
--rpc-http-authentication-enabled
```

```bash tab="Command Line"
--rpc-http-authentication-enabled
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_AUTHENTICATION_ENABLED=true
```

```bash tab="Configuration File"
rpc-http-authentication-enabled=true
```

Set to `true` to require [authentication](../../HowTo/Interact/APIs/Authentication.md) for the HTTP JSON-RPC service.  

### rpc-http-authentication-jwt-public-key-file

```bash tab="Syntax"
--rpc-http-authentication-jwt-public-key-file=<FILE>
```

```bash tab="Command Line"
--rpc-http-authentication-jwt-public-key-file=publicKey.pem
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_AUTHENTICATION-JWT-PUBLIC-KEY-FILE="publicKey.pem"
```

```bash tab="Configuration File"
rpc-http-authentication-jwt-public-key-file="publicKey.pem"
```

[JWT public key file](../../HowTo/Interact/APIs/Authentication.md#jwt-public-key-authentication) for JSON-RPC HTTP authentication when authenticating with an external JWT token.


### rpc-http-cors-origins

```bash tab="Syntax"
--rpc-http-cors-origins=<url>[,<url>...]... or all or "*"
```

```bash tab="Command Line"
# You can whitelist one or more domains with a comma-separated list.

--rpc-http-cors-origins="http://medomain.com","https://meotherdomain.com"
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_CORS_ORIGINS="http://medomain.com","https://meotherdomain.com"
```

```bash tab="Configuration File"
rpc-http-cors-origins=["http://medomain.com","https://meotherdomain.com"]
```

```bash tab="Remix Example"
# The following allows Remix to interact with your Besu node.

--rpc-http-cors-origins="http://remix.ethereum.org"
```

Specifies domain URLs for CORS validation.
Domain URLs must be enclosed in double quotes and comma-separated.

Listed domains can access the node using JSON-RPC.
If your client interacts with Besu using a browser app (such as Remix or a block explorer), 
you must whitelist the client domains. 

The default value is `"none"`.
If you don't whitelist any domains, browser apps cannot interact with your Besu node.

!!!note
    To run a local Besu node as a backend for MetaMask and use MetaMask anywhere, set `--rpc-http-cors-origins` to `"all"` or `"*"`. 
    To allow a specific domain to use MetaMask with the Besu node, set `--rpc-http-cors-origins` to the client domain. 
        
!!!tip
    For development purposes, you can use `"all"` or `"*"` to accept requests from any domain, 
    but we don't recommend this for production code.

### rpc-http-enabled

```bash tab="Syntax"
--rpc-http-enabled
```

```bash tab="Environement Variable"
BESU_RPC_HTTP_ENABLED=true
```

```bash tab="Configuration File"
rpc-http-enabled=true
```

Set to `true` to enable the HTTP JSON-RPC service.
The default is `false`.

### rpc-http-host

```bash tab="Syntax"
--rpc-http-host=<HOST>
```

```bash tab="Command Line"
# to listen on all interfaces
--rpc-http-host=0.0.0.0
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_HOST=0.0.0.0
```

```bash tab="Configuration File"
rpc-http-host="0.0.0.0"
```

Specifies the host on which HTTP JSON-RPC listens.
The default is 127.0.0.1.

To allow remote connections, set to `0.0.0.0`

!!! caution 
    Setting the host to 0.0.0.0 exposes the RPC connection on your node to any remote connection. In a 
    production environment, ensure you are using a firewall to avoid exposing your node to the internet. 

### rpc-http-port

```bash tab="Syntax"
--rpc-http-port=<PORT>
```

```bash tab="Command Line"
# to listen on port 3435
--rpc-http-port=3435
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_PORT=3435
```

```bash tab="Configuration File"
rpc-http-port="3435"
```

Specifies HTTP JSON-RPC listening port (TCP).
The default is 8545. Ports must be [exposed appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md). 

### rpc-http-tls-enabled

```bash tab="Syntax"
--rpc-http-tls-enabled
```

```bash tab="Environement Variable"
BESU_RPC_HTTP_TLS_ENABLED=true
```

```bash tab="Configuration File"
rpc-http-tls-enabled=true
```

Enable TLS for the JSON-RPC HTTP service. The default is `false`.

[`--rpc-http-enabled`](#rpc-http-enabled) must be enabled.

### rpc-http-tls-keystore-file

```bash tab="Syntax"
--rpc-http-tls-keystore-file=<FILE>
```

```bash tab="Command Line"
--rpc-http-tls-keystore-file=/home/me/me_node/certificate.pfx
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_TLS_KEYSTORE_FILE=/home/me/me_node/certificate.pfx
```

```bash tab="Configuration File"
rpc-http-tls-keystore-file="/home/me/me_node/certificate.pfx"
```
PKCS #12 keystore file. Must be specified if TLS is enabled for the JSON-RPC
HTTP service.

### rpc-http-tls-keystore-password-file

```bash tab="Syntax"
--rpc-http-tls-keystore-password-file=<FILE>
```

```bash tab="Command Line"
--rpc-http-tls-keystore-password-file=/home/me/me_node/password
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_TLS_KEYSTORE_PASSWORD_FILE=/home/me/me_node/password
```

```bash tab="Configuration File"
rpc-http-tls-keystore-password-file="/home/me/me_node/password"
```

Password file used to decrypt the keystore.

### rpc-http-tls-known-clients-file

```bash tab="Syntax"
--rpc-http-tls-known-clients-file=<FILE>
```

```bash tab="Command Line"
--rpc-http-tls-known-clients-file=/home/me/me_node/knownClients
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_TLS_KNOWN_CLIENTS_FILE=/home/me/me_node/knownClients
```

```bash tab="Configuration File"
rpc-http-tls-known-clients-file="/home/me/me_node/knownClients"
```

Enables client authentication.

For client certificates not signed by a known root CA this must contain the
certifcates's Common Name, and SHA-256 fingerprint in the format
`<CommonName> <hex-string>`.

Client certificates signed by a known CA do not need to be added to the file.

The file contents can be left empty, which indicates only clients with
certificates signed by known CAs are allowed.

### rpc-ws-api

```bash tab="Syntax"
--rpc-ws-api=<api name>[,<api name>...]...
```

```bash tab="Command Line"
--rpc-ws-api=ETH,NET,WEB3
```

```bash tab="Environment Variable"
BESU_RPC_WS_API=ETH,NET,WEB3
```

```bash tab="Configuration File"
rpc-ws-api=["ETH","NET","WEB3"]
```

Comma-separated APIs to enable on WebSockets channel.
When you use this option, the `--rpc-ws-enabled` option must also be specified.
The available API options are: `ADMIN`,`ETH`, `NET`, `WEB3`, `CLIQUE`, `IBFT`, `PERM`, `DEBUG`, `MINER`, `EEA`, `PRIV`, and `TXPOOL`.
The default is: `ETH`, `NET`, `WEB3`.

!!!tip
    The singular `--rpc-ws-api` and plural `--rpc-ws-apis` are available and are just two
    names for the same option.

### rpc-ws-authentication-credentials-file

```bash tab="Syntax"
--rpc-ws-authentication-credentials-file=<FILE>
```

```bash tab="Command Line"
--rpc-ws-authentication-credentials-file=/home/me/me_node/auth.toml
```

```bash tab="Environment Variable"
BESU_RPC_WS_AUTHENTICATION_CREDENTIALS_FILE=/home/me/me_node/auth.toml
```

```bash tab="Configuration File"
rpc-ws-authentication-credentials-file="/home/me/me_node/auth.toml"
```

[Credentials file](../../HowTo/Interact/APIs/Authentication.md#credentials-file) for JSON-RPC API [authentication](../../HowTo/Interact/APIs/Authentication.md).

### rpc-ws-authentication-enabled

```bash tab="Syntax"
--rpc-ws-authentication-enabled
```

```bash tab="Command Line"
--rpc-ws-authentication-enabled
```

```bash tab="Environment Variable"
BESU_RPC_WS_AUTHENTICATION_ENABLED=true
```

```bash tab="Configuration File"
rpc-ws-authentication-enabled=true
```

Set to `true` to require [authentication](../../HowTo/Interact/APIs/Authentication.md) for the WebSockets JSON-RPC service.

!!! note 
    `wscat` does not support headers. [Authentication](../../HowTo/Interact/APIs/Authentication.md) requires an authentication token to be passed in the 
    request header. To use authentication with WebSockets, an app that supports headers is required. 

### rpc-ws-authentication-jwt-public-key-file

```bash tab="Syntax"
--rpc-http-authentication-jwt-public-key-file=<FILE>
```

```bash tab="Command Line"
--rpc-http-authentication-jwt-public-key-file=publicKey.pem
```

```bash tab="Environment Variable"
BESU_RPC_HTTP_AUTHENTICATION-JWT-PUBLIC-KEY-FILE="publicKey.pem"
```

```bash tab="Configuration File"
rpc-http-authentication-jwt-public-key-file="publicKey.pem"
```

[JWT public key file](../../HowTo/Interact/APIs/Authentication.md#jwt-public-key-authentication) for JSON-RPC websocket authentication when authenticating with an external JWT token.

### rpc-ws-enabled

```bash tab="Syntax"
--rpc-ws-enabled
```

```bash tab="Environment Variable"
BESU_RPC_WS_ENABLED=true
```

```bash tab="Configuration File"
rpc-ws-enabled=true
```

Set to `true` to enable the WebSockets JSON-RPC service.
The default is `false`.
    
### rpc-ws-host

```bash tab="Syntax"
--rpc-ws-host=<HOST>
```

```bash tab="Command Line"
# to listen on all interfaces
--rpc-ws-host=0.0.0.0
```

```bash tab="Environment Variable"
BESU_RPC_WS_HOST=0.0.0.0
```

```bash tab="Configuration File"
rpc-ws-host="0.0.0.0"
```

Host for Websocket WS-RPC to listen on.
The default is 127.0.0.1.

To allow remote connections, set to `0.0.0.0`
    
### rpc-ws-port

```bash tab="Syntax"
--rpc-ws-port=<PORT>
```

```bash tab="Command Line"
# to listen on port 6174
--rpc-ws-port=6174
```

```bash tab="Environment Variable"
BESU_RPC_WS_PORT=6174
```

```bash tab="Configuration File"
rpc-ws-port="6174"
```

Specifies Websockets JSON-RPC listening port (TCP).
The default is 8546. Ports must be [exposed appropriately](../../HowTo/Find-and-Connect/Configuring-Ports.md).

### sync-mode

```bash tab="Syntax"
--sync-mode=FAST
```

```bash tab="Command Line"
--sync-mode=FAST
```

```bash tab="Environment Variable"
BESU_SYNC_MODE=FAST
```

```bash tab="Configuration File"
sync-mode="FAST"
```

Specifies the synchronization mode. Default is `FULL`.

### target-gas-limit

```bash tab="Syntax"
--target-gas-limit=<INTEGER>
```

```bash tab="Command Line"
--target-gas-limit=8000000
```

```bash tab="Environment Variable"
BESU_TARGET_GAS_LIMIT=8000000
```

```bash tab="Configuration File"
target-gas-limit="8000000"
```

Specifies the gas limit toward which Besu will gradually move on an existing network, if enough miners are in agreement. Use `target-gas-limit` to change the block gas limit set in the genesis file without creating a new network. The gas limit between blocks can change only 1/1024th, so the target tells the block creator how to set the gas limit in its block. If the values are the same or within 1/1024th, the limit is set to the specified value. Otherwise, the limit moves as far as it can within that constraint.
    
If a value for `target-gas-limit` is not specified, the block gas limit remains at the value specified in the [genesis file](../Config-Items.md#genesis-block-parameters).

### tx-pool-max-size

```bash tab="Syntax"
--tx-pool-max-size=<INTEGER>
```

```bash tab="Command Line"
--tx-pool-max-size=2000
```

```bash tab="Environment Variable"
BESU_TX_POOL_MAX_SIZE=2000
```

```bash tab="Configuration File"
tx-pool-max-size="2000"
```

Maximum number of transactions kept in the transaction pool. Default is 4096. 

### tx-pool-retention-hours

```bash tab="Syntax"
--tx-pool-retention-hours=<INTEGER>
```

```bash tab="Command Line"
--tx-pool-retention-hours=5
```

```bash tab="Environment Variable"
BESU_TX_POOL_RETENTION_HOURS=5
```

```bash tab="Configuration File"
tx-pool-retention-hours="5"
```

Maximum period in hours to retain pending transactions in the transaction pool. Default is 13. 

### version

```bash tab="Syntax"
  -V, --version
```

Print version information and exit.



