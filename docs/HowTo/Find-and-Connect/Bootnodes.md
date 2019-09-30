description: Configuring bootnodoes
<!--- END of page meta data -->

# Bootnodes

Bootnodes are used to initially discover peers. A bootnode is a regular node to which nodes connect
on startup. 

## Mainnet and Public Testnets

For mainnet, Rinkeby, Ropsten, and Görli, Hyperledger Besu predefines a list of enode URLs.  

## Private Networks

In private networks for development or testing purposes, specify one bootnode as described below.
 
In production networks, [configure two or more nodes as bootnodes](../Deploy/Bootnodes.md). 

### Start node to be specified as bootnode 

To start a node to be specified as a bootnode:

1.  Export the public key to a file:

    !!! example
        ```bash
        besu --genesis-file=privateNetworkGenesis.json --data-path=nodeDataPath public-key export --to=bootnodePubKey
        ```
        Where `privateNetworkGenesis.json` and `nodeDataPath` are changed to the relevant values for 
        your private network. 
        
        The node public key is exported to the `bootnodePubKey` file.
    
2. Start the node specifying the genesis file and data directory. 
    
    !!! example
        ```
        besu --genesis-file=privateNetworkGenesis.json --data-path=nodeDataPath
        ```

To specify this bootnode for another node, specify the [enode URL](../../Concepts/Node-Keys.md#enode-url) using the [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) option.


### Start subsequent nodes pointing to the bootnode 

To start a node specifying the bootnode for P2P discovery:

!!! example
    ```bash
    besu --genesis-file=privateNetworkGenesis.json --data-path=nodeDataPath --bootnodes=enode://c35c3ec90a8a51fd5703594c6303382f3ae6b2ecb99bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f@127.0.0.1:30303
    ``` 

The default host and port for P2P peer discovery is `127.0.0.1:30303`. Use the [`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host) 
and [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) option to specify a host and port.

The default network interface address for P2P discovery is `0.0.0.0:30303`. If the device that Besu is running on has multiple network interfaces, use the [`--p2p-interface`](../../Reference/CLI/CLI-Syntax.md#p2p-interface) option to specify the network interface to use.
