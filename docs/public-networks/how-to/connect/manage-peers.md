---
title: Manage peers
sidebar_position: 3
description: Managing Hyperledger Besu peers
tags:
  - public networks
  - private networks
---

# Manage peers

Hyperledger Besu peer-to-peer (P2P) discovery happens periodically based on the number of peers in a network and the node's [peer limit](#limit-peers).

The frequency of discovery isn't configurable, but you can [limit remote connections](#limit-remote-connections) in public networks and [randomly prioritize connections](../../reference/cli/options.md#random-peer-priority-enabled) in small, stable networks.

## The peering process

The peering process requires the port (default 30303) to be open to UDP and TCP traffic to the world (0.0.0.0/0). The `discovery stack` uses UDP to keep things lightweight and quick and only
allows a node to find peers and connect to them, it does not have any additional overhead like error checking, retrys etc. Once peers have bonded, the actual data exchange between them is quite
complex and needs a more fully featured protocol that can support retries, error checking etc which is why TCP is used for the `devP2P stack`. It is important to remember that both stacks work
in parallel i.e the `discovery stack` adds new peers to the network, and the `devP2P` stack enables interactions and data flow between them.

The proces starts starts with a client attempting to connect to as many peers as possible. The more peers it is connected to, the more confident it is of having an accurate view of the network. 

1. When Besu starts up it will adverstise its presence and details like the enode etc via UDP before establishing a more formal connection with any peer (log messages look like `Enode URL enode://....`)
2. Besu will attempt connect to the network's bootnodes (which are a list of predefined nodes whose sole functionality is to help a node join existing peers on the network)
3. Once a connection with the bootnode is established via TCP (`ping/pong` handshake messages in the debug and trace logs), Besu requests a list of peers from the bootnode (`find node` messages in the debug and trace logs)
4. Besu will then attempt to establish connections to each peer on that list via TCP and get status information from them - i.e. network details, what the peer believes to be the current chain head, it's list of peers, etc. It is also important to note that from this point on any traffic to that peer is only done via TCP.
5. Depending on the type of sync, a common block (the pivot block) is picked that all these connected peers (default of 5) have and we start syncing from that block till we get to chain head. Log messages look like `Downloading world state from peers for pivot block .......`
6. Besu also uses the peers from step 4, and will process each in the same manner as above
7. When new peers come along (regardless of client) the same process is repeated 

:::info

You can use [`admin_addPeer`](../../reference/cli/options.md#admin_addpeer) to attempt a specific connection, but this isn't P2P discovery.

:::

In private networks, we recommend [using bootnodes](../../../private-networks/how-to/configure/bootnodes.md) to initially discover peers.

## Limit peers

You can limit peers to reduce the bandwidth, CPU time, and disk access Besu uses to manage and respond to peers.

To reduce the maximum number of peers, use the [`--max-peers`](../../reference/cli/options.md#max-peers) option. The default is 25.

## Limit remote connections

Prevent eclipse attacks when using [`--sync-mode`](../../reference/cli/options.md#sync-mode) and [`--fast-sync-min-peers`](../../reference/cli/options.md##sync-min-peers-fast-sync-min-peers) on public networks by enabling the [remote connection limits](../../reference/cli/options.md#remote-connections-limit-enabled).

In private and permissioned networks with only trusted peers, enabling the remote connection limits is unnecessary and might adversely affect the speed at which nodes can join the network. Limiting remote connections can cause a closed group of peers to form when the number of nodes in the network is slightly higher than [`--max-peers`](../../reference/cli/options.md#max-peers). The nodes in this closed group are all connected to each other and can't accept more connections.

:::tip

You can use [`--random-peer-priority-enabled`](../../reference/cli/options.md#random-peer-priority-enabled) to help prevent closed groups of peers in small, stable networks.

:::

## Monitor peer connections

JSON-RPC API methods to monitor peer connections include:

- [`net_peerCount`](../../reference/api/index.md#net_peercount).
- [`admin_peers`](../../reference/api/index.md#admin_peers).
- [`debug_metrics`](../../reference/api/index.md#debug_metrics).

Each peer entry returned by [`admin_peers`](../../reference/api/index.md#admin_peers) includes a `protocols` section. Use the information in the `protocols` section to:

- Determine the health of peers. For example, an external process can use [`admin_peers`](../../reference/api/index.md#admin_peers) and [`admin_removePeer`](../../reference/api/index.md#admin_removepeer) to disconnect from peers that are stalled at a single difficulty for an extended period of time.

- Monitor node health. For example, if peers report increasing difficulties but the node is stuck at the same block number, the node may be on a different fork to most peers.

- Determine which protocol level peers are communicating with. For example, you can see if `"version": 65` is being used to reduce transaction sharing traffic.

## List node connections

The default logging configuration doesn't list node connection and disconnection messages. To enable listing them, set the [`--logging`](../../reference/cli/options.md#logging) option to `DEBUG`. For more verbosity, set the option to `TRACE`.

The console logs connection and disconnection events when the log level is `DEBUG` or higher. If the message `Successfully accepted connection from ...` displays, connections are getting through the firewalls.

```bash title="Sample log output"
2018-10-16 12:37:35.479-04:00 | nioEventLoopGroup-3-1 | INFO | NettyP2PNetwork | Successfully accepted connection from 0xa979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c
```

## Disable discovery

To disable P2P discovery, set the [`--discovery-enabled`](../../reference/cli/options.md#discovery-enabled) option to `false`.

With discovery disabled, peers can't open connections with the node unless they were previously discovered or manually peered (for example, using [`admin_addPeer`](../../reference/api/index.md#admin_addpeer)). [Static nodes](static-nodes.md) can also open connections.

## Troubleshoot

If you encounter issues with peering, see the [troubleshoot peering documentation](../../how-to/troubleshoot/peering.md), which helps you identify and resolve common problems that can occur during the peering process.
