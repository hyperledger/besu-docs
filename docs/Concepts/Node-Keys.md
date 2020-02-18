description: Besu private and public key used to identify node
<!--- END of page meta data -->

# Node keys

Each node has a node key pair consisting of a node private key and a node public key.

## Node private key

If a `key` file does not exist in the data directory and the
[`--node-private-key-file`](../Reference/CLI/CLI-Syntax.md#node-private-key-file) option is not
specified when starting Besu, the system generates a node private key and writes it to the `key`
file. Stopping and restarting Besu without deleting the `key` file causes Besu to reuse the same
private key when restarting.

If a `key` file exists in the data directory when starting Besu, the node starts with the private
key in the `key` file.

!!!info
    The private key is not encrypted. 

## Node public key

The node public key displays in the log after starting Besu. Use the
[`public-key`](../Reference/CLI/CLI-Subcommands.md#public-key) subcommand to export the public key
to a file.

The node public key is also referred to as the node ID. The node ID forms part of the enode URL of
a node. 

## Enode URL 

The enode URL identifies a node. For example, the `--bootnodes` option and the
`perm_addNodesToWhitelist` method specify nodes by enode URL.

The enode URL format is `enode://<id>@<host:port>` where:

* `<id>` is the node public key, excluding the initial 0x.
* `<host:port>` is the host and port the bootnode is listening on for P2P peer discovery.
Specified by the [`--p2p-host`](../Reference/CLI/CLI-Syntax.md#p2p-host) and
[`--p2p-port`](../Reference/CLI/CLI-Syntax.md#p2p-port) options (the default host is `127.0.0.1`
and the default port is `30303`).

!!! example

    If the [`--p2p-host`](../Reference/CLI/CLI-Syntax.md#p2p-host) or
    [`--p2p-port`](../Reference/CLI/CLI-Syntax.md#p2p-port) options are not specified and the node
    public key is `0xc35c3ec90a8a51fd5703594c6303382f3ae6b2ecb9589bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f`
    
    The enode URL is:
    `enode://c35c3ec90a8a51fd5703594c6303382f3ae6b2ecb9589bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f@127.0.0.1:30303`

The enode URL displays when starting a Besu node. Use the
[`net_enode`](../Reference/API-Methods.md#net_enode) JSON-RPC API method to obtain the enode URL
for the node.

If Besu has [UPnP](../HowTo/Find-and-Connect/Using-UPnP.md) enabled, the enode advertised to other
nodes during discovery is the external IP address and port.

## Specifying a custom node private key file

Use the [`--node-private-key-file`](../Reference/CLI/CLI-Syntax.md#node-private-key-file) option to
specify a custom `key` file in any location. 

If the `key` file exists, the node starts with the private key in the `key` file. If the `key` file
does not exist, Besu generates a node private key and writes it to the `key` file.

For example, the following command either reads the node private key from `privatekeyfile` or
writes a generated private key to `privatekeyfile`:

!!! example
    ```bash
    besu --node-private-key-file="/Users/username/privatekeyfile"
    ```
