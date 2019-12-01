description: Managing Hyperledger Besu peers 
<!--- END of page meta data -->

# Managing Peers 
 
## Limiting Peers

Limiting peers reduces the bandwidth used by Hyperledger Besu. It also reduces the CPU time and disk access 
used to manage and respond to peers.  
 
Use the [`--max-peers`](../../Reference/CLI/CLI-Syntax.md#max-peers) command line option to reduce 
the maximum number of peers. The default is 25.

## No Discovery

The [`--discovery-enabled`](../../Reference/CLI/CLI-Syntax.md#discovery-enabled) command line option 
can be used to disable P2P peer discovery.

With discovery disabled, connections may be initiated by peers that have already discovered or are otherwise 
configured to connect to the local node (for example, using [`admin_addPeer`](../../Reference/API-Methods.md#admin_addpeer)).
Connections can also be initiated by configuring [static nodes](Static-Nodes.md).  

## Monitoring Peer Connections

JSON-RPC API methods to monitor peer connections include: 

* [`net_peerCount`](../../Reference/API-Methods.md#net_peercount)
* [`admin_peers`](../../Reference/API-Methods.md#admin_peers)
* [`debug_metrics`](../../Reference/API-Methods.md#debug_metrics)

## Node Connections

The default logging configuration does not list node connection and disconnection messages.  

To enable listing of node connection and disconnection messages, specify the 
[`--logging`](../../Reference/CLI/CLI-Syntax.md#logging) command line option `--logging=DEBUG`.
For more verbosity, specify `--logging=TRACE`.  

The console logs connection and disconnection events when the log level is `DEBUG` or higher.  
If `Successfully accepted connection from ...` is displayed, connections are getting through the firewalls. 

!!! example "Example log output"
    `2018-10-16 12:37:35.479-04:00 | nioEventLoopGroup-3-1 | INFO  | NettyP2PNetwork | Successfully accepted connection from 0xa979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c`

## Limiting Remote Connections 

In private networks with a level of trust between peers, enabling the [remote connection limits](../../Reference/CLI/CLI-Syntax.md#remote-connections-limit-enabled)
is unnecessary and disabling may increase the speed at which nodes can join the network.

