---
description: Managing Hyperledger Besu peers
---

# Managing peers

## Limiting peers

Limiting peers reduces the bandwidth used by Hyperledger Besu. Limiting peers also reduces the CPU
time and disk access used to manage and respond to peers.

To reduce the maximum number of peers, use the
[`--max-peers`](../../Reference/CLI/CLI-Syntax.md#max-peers) option. The default is 25.

## No discovery

To disable P2P discovery, use the
[`--discovery-enabled`](../../Reference/CLI/CLI-Syntax.md#discovery-enabled) option.

With discovery disabled, peers that have already discovered or are otherwise configured to connect
to the local node (for example, using
[`admin_addPeer`](../../Reference/API-Methods.md#admin_addpeer)) can open connections.
[Static nodes](Static-Nodes.md) can also open connections.

## Monitoring peer connections

JSON-RPC API methods to monitor peer connections include:

* [`net_peerCount`](../../Reference/API-Methods.md#net_peercount)
* [`admin_peers`](../../Reference/API-Methods.md#admin_peers)
* [`debug_metrics`](../../Reference/API-Methods.md#debug_metrics).

Each peer entry returned by [`admin_peers`](../../Reference/API-Methods.md#admin_peers) includes a
`protocols` section. Use the information in the `protocols` section to:

* Determine health of peers.  For example, an external process could use [`admin_peers`](../../Reference/API-Methods.md#admin_peers)
and [`admin_removePeer`](../../Reference/API-Methods.md#admin_removepeer) to disconnect from peers that
are stalled at a single difficulty for an extended period of time. 

* Monitor node health. For example, if peers are reporting increasing difficulties but node
is stuck at the same block number, the node may be on a different fork to most peers. 

* Determine which protocol level peers are communicating with. For example, to see if `"version": 65`
is being used to reduce transaction sharing traffic.

## Node connections

The default logging configuration does not list node connection and disconnection messages.

To enable listing of node connection and disconnection messages, specify the
[`--logging`](../../Reference/CLI/CLI-Syntax.md#logging) option `--logging=DEBUG`. For more
verbosity, specify `--logging=TRACE`.

The console logs connection and disconnection events when the log level is `DEBUG` or higher. If
the message `Successfully accepted connection from ...` displays, connections are getting through
the firewalls.

!!! example "Sample log output"

    `2018-10-16 12:37:35.479-04:00 | nioEventLoopGroup-3-1 | INFO | NettyP2PNetwork | Successfully accepted connection from 0xa979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c`

## Limiting remote connections

In private networks with a level of trust between peers, enabling the
[remote connection limits](../../Reference/CLI/CLI-Syntax.md#remote-connections-limit-enabled)
is unnecessary and might adversely affect the speed at which nodes can join the network.
