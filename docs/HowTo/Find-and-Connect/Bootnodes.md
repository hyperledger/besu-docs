description: Hyperledger Besu Clique Proof-of-Authority (PoA) consensus protocol implementation
path: blob/master/ethereum/core/src/main/resources/
source: rinkeby.json
<!--- END of page meta data -->

# Bootnodes

Bootnodes are used to initially discover peers. 

## Mainnet and Public Testnets

For mainnet, Rinkeby, Ropsten, and Görli, Hyperledger Besu predefines a list of enode URLs.  

## Private Networks

### Start Bootnode

To start a bootnode for a private network, complete the following steps:

1.  Export the public key to a file:

    !!! example
        ```bash
        besu --genesis-file=privateNetworkGenesis.json --data-path=nodeDataPath public-key export --to=bootnode
        ```
        Where `privateNetworkGenesis.json` and `nodeDataPath` are changed to the relevant values for 
        your private network. 
        
        The node public key is exported to the `bootnode` file.
    
2. Start the bootnode, specifying:

    * Genesis file and data directory, as in the previous step. 
    * No arguments for the [`--bootnodes` option](../../Reference/CLI/CLI-Syntax.md#bootnodes) because this is your bootnode.
    
    !!! example
        ```
        besu --genesis-file=privateNetworkGenesis.json --data-path=nodeDataPath --bootnodes
         ```
     
To specify this bootnode for another node, specify the [enode URL](../../Concepts/Node-Keys.md#enode-url) using the [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) 
option.

!!! info
    The default host and port for P2P peer discovery is `127.0.0.1:30303`.
    Use the [`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host) and
    [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port) option to specify a host and port. 

### Start Node Specifying the Bootnode

To start a node specifying the bootnode for P2P discovery:

!!! example
    ```bash
    besu --genesis-file=privateNetworkGenesis.json --data-path=nodeDataPath --p2p-host=127.0.0.1 --p2p-port=30301 --network-id=123 --bootnodes=enode://c35c3ec90a8a51fd5703594c6303382f3ae6b2ecb99bab2c04b3794f2bc3fc2631dabb0c08af795787a6c004d8f532230ae6e9925cbbefb0b28b79295d615f@127.0.0.1:30303
    ``` 
