description: Configuring bootnodoes
<!--- END of page meta data -->

# Bootnodes

Bootnodes are used to initially discover peers. A bootnode is a regular node that the node uses to discover nodes.
The node discovers nodes from the nodes the bootnode knows about.  

To find peers, configure at least one bootnode or [static node](Static-Nodes.md). 

!!! tip 
    Bootnodes and static nodes are parallel methods for finding peers. Depending on your use case, you can use only bootnodes, 
    only static nodes, or both bootnodes and statics nodes. For example, you run multiple nodes on MainNet (discovery via bootnode)
    but want to ensure your nodes are always connected (using static nodes).

## Mainnet and public testnets

For mainnet, Rinkeby, Ropsten, and Görli, Hyperledger Besu predefines a list of enode URLs.  

## Private networks

In private networks for development or testing purposes, specify at least one bootnode.
 
In production networks, [configure two or more nodes as bootnodes](../Deploy/Bootnodes.md). 

### Specify a bootnode 

To start a node specifying a bootnode for P2P discovery, use the [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) option
to specify the [enode](../../Concepts/Node-Keys.md) of the bootnode.

!!! example
    ```bash
    besu --genesis-file=privateNetworkGenesis.json --data-path=nodeDataPath --bootnodes=enode://c35c3ec90a8a51fd5703594c6303382f3ae6b2ecb99bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f@127.0.0.1:30303
    ``` 

The default host and port for P2P peer discovery is `127.0.0.1:30303`. Use the [`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host) 
and [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) option to specify a host and port.

By default, peer discovery listens on all available network interfaces. If the device that Besu runs on must bind to a specific interface, 
use the [`--p2p-interface`](../../Reference/CLI/CLI-Syntax.md#p2p-interface) option to specify the network interface to use.