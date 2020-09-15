---
description: Private and public key, and node address used to identify nodes
---

# Node keys and node address

Each node has a private / public key pair and a node address. Besu uses the private / public key
pair to sign and verify transactions, and the node address as an identifier for the node.

## Node private key

When starting Hyperledger Besu, if the
[`--node-private-key-file`](../Reference/CLI/CLI-Syntax.md#node-private-key-file) option is not
specified and a `key` file does not exist in the data directory for the node, Besu generates a node
private key and writes it to the `key` file.

If a `key` file does exist in the data directory when starting Besu, the node starts with using
private key in the `key` file.

!!!info

    The private key is not encrypted.

## Node public key

The node public key displays in the log after starting Besu. Also refered to as the node ID, the
node public key forms part of the enode URL for a node.

You can export the node public key, either to standard output or to a specified file, using the
[`public-key export`](../Reference/CLI/CLI-Subcommands.md#public-key) subcommand.

## Node address

Besu generates the node address by creating a hash of the node public key and using the last 20
bytes of the hash as the node address. It is also displayed in the logs after starting Besu.

You can export the node address, either to standard output or to a specified file, using the
[`public-key export-address`](../Reference/CLI/CLI-Subcommands.md#public-key) subcommand.

## Enode URL

The enode URL identifies a node. For example, the `--bootnodes` option and the
`perm_addNodesToAllowlist` method specify nodes by enode URL.

!!! tip

    If deploying Besu using Kubernetes in private permissioned network, use the
    [`--Xdns-enabled`](../Reference/CLI/CLI-Syntax.md#xdns-enabled) option to use domain names
    instead of IP addresses. This ensures that Besu can connect to a container even if the IP
    address changes after being restarted.

The enode URL format is `enode://<id>@<host:port>` where:

* `<id>` is the node public key, excluding the initial 0x.
* `<host:port>` is the host and port the bootnode is listening on for P2P peer discovery. Specify
  the host and port using the [`--p2p-host`](../Reference/CLI/CLI-Syntax.md#p2p-host) and
  [`--p2p-port`](../Reference/CLI/CLI-Syntax.md#p2p-port) options. The default host is `127.0.0.1`
  and the default port is `30303`.

!!! example

    If the [`--p2p-host`](../Reference/CLI/CLI-Syntax.md#p2p-host) or
    [`--p2p-port`](../Reference/CLI/CLI-Syntax.md#p2p-port) options are not specified and the node
    public key is `0xc35c3ec90a8a51fd5703594c6303382f3ae6b2ecb9589bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f`,
    then the enode URL is
    `enode://c35c3ec90a8a51fd5703594c6303382f3ae6b2ecb9589bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f@127.0.0.1:30303`

The enode URL displays when starting a Besu node. Use the
[`net_enode`](../Reference/API-Methods.md#net_enode) JSON-RPC API method to get the enode URL for
the node.

The enode advertised to other nodes during discovery is the external IP address and port, as
defined by [`--nat-method`](../HowTo/Find-and-Connect/Specifying-NAT.md).

## Specifying a custom node private key file

Use the [`--node-private-key-file`](../Reference/CLI/CLI-Syntax.md#node-private-key-file) option to
specify a custom `key` file in any location.

If the `key` file exists, the node starts with the private key in the `key` file. If the `key` file
does not exist, Besu generates a node private key and writes it to the `key` file.

For example, the following command either reads the node private key from `privatekeyfile` or
writes a generated private key to `privatekeyfile`.

!!! example

    ```bash
    besu --node-private-key-file="/Users/username/privatekeyfile"
    ```
