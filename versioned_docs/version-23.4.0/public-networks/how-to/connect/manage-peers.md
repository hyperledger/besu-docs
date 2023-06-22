---
title: Manage peers
sidebar_position: 3
description: Managing Hyperledger Besu peers
tags:
  - private networks
---

# Manage peers

Hyperledger Besu peer-to-peer (P2P) discovery happens periodically based on the number of peers in a network and the node's [peer limit](#limit-peers).

The frequency of discovery isn't configurable, but you can [limit remote connections](#limit-remote-connections) in public networks and [randomly prioritize connections](../../reference/cli/options.md#random-peer-priority-enabled) in small, stable networks.

:::info

You can use [`admin_addPeer`](../../reference/cli/options.md#admin_addpeer) to attempt a specific connection, but this isn't P2P discovery.

:::

In private networks, we recommend [using bootnodes](../../../private-networks/how-to/configure/bootnodes.md) to initially discover peers.

## Limit peers

You can limit peers to reduce the bandwidth, CPU time, and disk access Besu uses to manage and respond to peers.

To reduce the maximum number of peers, use the [`--max-peers`](../../reference/cli/options.md#max-peers) option. The default is 25.

:::caution

The minimum number of peers is set by the `--Xp2p-peer-lower-bound` option, which also has a default of 25. If you reduce the `--max-peers` from the default, you must also set the `--Xp2p-peer-lower-bound` option to the same value or lower. For example, if you decrease `--max-peers` to 20, set `--Xp2p-peer-lower-bound` to 20 or lower.

Note, `Xp2p-peer-lower-bound` is an early access option.

:::

## Limit remote connections

Prevent eclipse attacks when using [`--sync-mode`](../../reference/cli/options.md#sync-mode) and [`--fast-sync-min-peers`](../../reference/cli/options.md#fast-sync-min-peers) on public networks by enabling the [remote connection limits](../../reference/cli/options.md#remote-connections-limit-enabled).

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

If your nodes fail to connect, ensure the [required ports are open](configure-ports.md).

If your nodes are running in AWS, check you have appropriate `SecurityGroups` to allow access to the required ports.

Check that the [enode URLs](../../concepts/node-keys.md#enode-url) specified for [bootnodes](../../../private-networks/how-to/configure/bootnodes.md) or [static nodes](static-nodes.md) match the enode URLs displayed when starting the remote nodes.
