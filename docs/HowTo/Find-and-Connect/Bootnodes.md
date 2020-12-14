---
description: Configuring bootnodoes
---

# Bootnodes

Using Bootnodes is a method for initially discovering peers. Bootnodes are regular nodes used to
discover other nodes.

!!! tip

    Bootnodes and static nodes are parallel methods for finding peers. Depending on your use case,
    you can use only bootnodes, only static nodes, or both bootnodes and statics nodes. For
    example, you run multiple nodes on MainNet (discovery using bootnodes), but want to ensure your
    nodes are always connected (using static nodes).

    To find peers, configure one or more bootnodes as described below. To configure a specific set
    of peer connections, use [static nodes](Static-Nodes.md).

## MainNet and public testnets

For MainNet and the Rinkeby, Ropsten, and Görli testnets, Hyperledger Besu has an internal list of
enode URLs and uses this list automatically when you specify the
[`--network`](../../Reference/CLI/CLI-Syntax.md#network) option.

## Private networks

In private networks for development or testing purposes, specify at least one bootnode.

In production networks, [configure two or more nodes as bootnodes](../Deploy/Bootnodes.md).

### Specify a bootnode

To start a node, specifying a bootnode [enode](../../Concepts/Node-Keys.md) for P2P discovery,
using the [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) option.

!!! example

    ```bash
    besu --genesis-file=privateNetworkGenesis.json --data-path=nodeDataPath --bootnodes=enode://c35c3ec90a8a51fd5703594c6303382f3ae6b2ecb99bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f@127.0.0.1:30303
    ```

The default host and port advertised to other peers for P2P discovery is `127.0.0.1:30303`. To
specify a different host or port, use the
[`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host) and
[`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) options.

By default, peer discovery listens on all available network interfaces. If the device Besu is
running on must bind to a specific network interface, specify the interface using the
[`--p2p-interface`](../../Reference/CLI/CLI-Syntax.md#p2p-interface) option.
