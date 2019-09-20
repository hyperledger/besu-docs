description: Besu private and public key used to identify node
<!--- END of page meta data -->

# Node Keys

Each node has a node key pair consisting of a node private key and node public key. 

## Node Private Key

If a `key` file does not exist in the data directory and the [`--node-private-key-file`](../Reference/CLI/CLI-Syntax.md#node-private-key-file) 
option is not specified when Besu is started, a node private key is generated and written to the `key` file. 
If Besu is stopped and restarted without deleting the `key` file, the same private key is used when Besu is restarted.

If a `key` file exists in the data directory when Besu is started, the node is started with the private key in the `key` file. 

!!!info
    The private key is not encrypted. 

## Node Public Key

The node public key is displayed in the log after starting Besu. Use the [`public-key`](../Reference/CLI/CLI-Syntax.md#public-key) subcommand to export the public key to a file. 

The node public key is also referred to as the node ID. The node ID forms part of the enode URL for a node. 

## Enode URL 

Nodes are identified by their enode URL. For example, the `--bootnodes` option and `perm_addNodesToWhitelist` method specify nodes by the enode URL. 

The enode URL is `enode://<id>@<host:port>` where:

* `<id>` is the node public key excluding the initial 0x. 
* `<host:port>` is the host and port the bootnode is listening on for P2P peer discovery. 
Specified by the [`--p2p-host`](../Reference/CLI/CLI-Syntax.md#p2p-host) and 
[`--p2p-port`](../Reference/CLI/CLI-Syntax.md#p2p-port) options
(default host is `127.0.0.1` and port is `30303`).

!!! example
    If the [`--p2p-host`](../Reference/CLI/CLI-Syntax.md#p2p-host) or [`--p2p-port`](../Reference/CLI/CLI-Syntax.md#p2p-port) options are not specified and the node public key is `0xc35c3ec90a8a51fd5703594c6303382f3ae6b2ecb9589bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f`
    
    The enode URL is:
    `enode://c35c3ec90a8a51fd5703594c6303382f3ae6b2ecb9589bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f@127.0.0.1:30303` 

The enode is displayed when starting a Besu node and can be obtained using the [`net_enode`](../Reference/API-Methods.md#net_enode) 
JSON-RPC API method. 

If [UPnP](../HowTo/Find-and-Connect/Using-UPnP.md) is enabled, the enode advertised to other nodes during discovery is the 
external IP address and port. 

## Specifying a Custom Node Private Key File

Use the [`--node-private-key-file`](../Reference/CLI/CLI-Syntax.md#node-private-key-file) option to specify a custom `key` file in any location. 

If the `key` file exists, the node is started with the private key in the custom `key` file. If the custom `key` file does not exist, 
a node private key is generated and written to the custom `key` file.

For example, the following command either reads the node private key from the `privatekeyfile` or writes the generated private key to the `privatekeyfile`:

!!! example
    ```bash
    besu --node-private-key-file="/Users/username/privatekeyfile"
    ```