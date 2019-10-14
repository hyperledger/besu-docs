description: Configuring static nodes 
<!--- END of page meta data -->

# Static Nodes

Static nodes are a configured set of trusted nodes.  Static nodes are exempt from [maximum peer](Managing-Peers.md#limiting-peers) 
and [remote connection](Managing-Peers.md#limiting-remote-connections) limits.
  
Besu attempts to maintain connections with static nodes by periodically initiating a connection to any static 
node that is not connected.

To find peers, configure at least one [bootnode](Bootnodes.md) or static node. 

!!! tip 
    Bootnodes and static nodes are parallel methods for finding peers. Depending on your use case, you can use only bootnodes, 
    only static nodes, or both bootnodes and statics nodes. For example, you run multiple nodes on MainNet (discovery via bootnode)
    but want to ensure your nodes are always connected (using static nodes).  

## Configure static nodes 

To configure a network of static nodes: 

1. List [enode URLs](../../Concepts/Node-Keys.md#enode-url) of the nodes in the [`static-nodes.json` file](#static-nodesjson-file).

1. Save the `static-nodes.json` file in the data directory of each node. 

1. Start Besu with discovery disabled using [`--discovery-enabled=false`](../../Reference/CLI/CLI-Syntax.md#discovery-enabled).   

To modify the static peers at run time, use the [`admin_addPeer`](../../Reference/API-Methods.md#admin_addpeer) 
and [`admin_removePeer`](../../Reference/API-Methods.md#admin_removepeer) JSON-RPC API methods. 

!!! note
    Runtime modifications of static nodes are not persisted between runs. The `static-nodes.json` file
    is not updated by `admin_addPeer` and `admin_removePeer` methods. 
    
    Nodes outside of the static nodes are not prevented from connecting.  To prevent nodes from connecting,
    use [Permissioning](../../Concepts/Permissioning/Permissioning-Overview.md). 
    
!!! tip 
    If the added peer does not appear in the peer list (returned by [`admin_peers`](../../Reference/API-Methods.md#admin_peers)),
    check the supplied [enode URL](../../Concepts/Node-Keys.md#enode-url) is correct, the node is running, and the node is listening for 
    TCP connections on the endpoint.
    
### static-nodes.json File

The `static-nodes.json` file must be located in the data directory (specified by [`--data-path`](../../Reference/CLI/CLI-Syntax.md#data-path))
and contain a JSON array of [enode URLs](../../Concepts/Node-Keys.md#enode-url).

!!! example 
    ```json
    [
    "enode://cea71cb65a471037e01508cebcc178f176f9d5267bf29507ea1f6431eb6a5dc67d086dc8dc54358a72299dab1161febc5d7af49d1609c69b42b5e54544145d4f@127.0.0.1:30303",
    "enode://ca05e940488614402705a6b6836288ea902169ecc67a89e1bd5ef94bc0d1933f20be16bc881ffb4be59f521afa8718fc26eec2b0e90f2cd0f44f99bc8103e60f@127.0.0.1:30304"    
    ]
    ``` 

!!! note
    Each node has a `static-nodes.json` file. We recommend each node in the network has the same `static-nodes.json` file. 
