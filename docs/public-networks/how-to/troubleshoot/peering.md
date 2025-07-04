---
title: Troubleshoot peering
sidebar_position: 4
description: How to troubleshoot peering
tags:
  - public networks
---

# Troubleshoot peering

Many factors can affect the ability of your node to find and maintain peers. Your network router, machine environment, and node configuration are all important. If you have peering issues, start by [configuring your ports](../connect/configure-ports.md) and [managing peers](../connect/manage-peers.md).

## Peering FAQ

### "Why can’t I find enough peers to sync?"

One or more of the following may be the cause:

- Your hardware doesn't have enough CPU, disk IOPS, or bandwidth to handle all the peers.
- Your ports aren't open in your firewall and/or router.
- Your node is sending large numbers of DNS requests. See [issue #4375](https://github.com/hyperledger/besu/issues/4375).
- You're using [checkpoint sync](../../concepts/node-sync.md#checkpoint-synchronization), which doesn't download all historical block data, so your peers may disconnect you when fetching those blocks.
- Your node is experiencing the normal behavior of peers connecting and disconnecting. This is especially normal soon after you start your node.

You can try the following to find more peers:

- Set [`p2p-host`](../../reference/cli/options.md#p2p-host) to your external IP address to allow inbound connections.
- Restart Besu. This can take a while to build up again.
- Set `-Xdns-enabled` to `true` (only for private networks).
- Delete the node key (which is autogenerated in your data directory). Deleting the node key might help find more peers for two reasons:
  1. Your node (identified by the address associated with this key) has been put onto other peers' bad peer lists for some reason.
  2. Peer discovery is influenced by the value of the node key. This is related to the node "distance" in the [discovery algorithm](https://github.com/ethereum/devp2p/wiki/Discovery-Overview#kademlia).

You can read the [Prysm EL and CL peering documentation](https://www.offchainlabs.com/prysm/docs/manage-connections/p2p-host-ip/) for more information.

### "What network or router/modem settings should I check?"

Check the following settings:

- Your machine and router's specified DNS should support TCP. You can check your DNS online for TCP support. Google and Cloudflare, 8.8.8.8 and 1.1.1.1, support TCP over port 853. Other DNS might as well.
- The appropriate ports should be open on your router, or your router should have UPNP enabled. See the next FAQ for more information on router settings.
- If you use [Docker](https://docs.docker.com/network/network-tutorial-host/) or virtualization, the container should be able to create outbound connections on the host machine.

### "Which URLs should I check?"

Check that the [enode URLs](../../concepts/node-keys.md#enode-url) specified for [bootnodes](../../../private-networks/how-to/configure/bootnodes.md) or [static nodes](../connect/static-nodes.md) match the enode URLs displayed when starting the remote nodes.

### "How do I open/forward my ports?"

If you’re behind NAT, you probably need to set up port forwarding in your router. You might also need to configure your firewall. Forward and open `30303` (if using the default p2p port) for both UDP and TCP. If your router supports UPNP, you can set [`--nat-method`](../../reference/cli/options.md#nat-method) to [`UPNPP2PONLY`](../connect/specify-nat.md#upnp).

### "How do I test that my ports are open?"

You can use this [open port checker](https://www.yougetsignal.com/tools/open-ports/).

### "What's the ideal number of peers for Besu?"

The default maximum is 25. Increasing the number of peers increases the bandwidth, CPU, and disk access Besu uses to respond to peers. Hardware with low specifications might result in low peer numbers. You'll experience diminishing returns with a larger number of peers (>100).

### "What's the benefit of increasing the number of peers?"

Increasing the number of max peers won't speed up Besu syncing, because the bottleneck during sync is disk IO and CPU.

Note that Besu's peers are only used for the initial sync and transaction gossip, neither of which affects attestation performance. The beacon node connectivity controls how quickly you receive blocks and how attestations are published. Increasing Besu's peer count increases the load on your node, which may hurt attestations.

## Metrics

Capture [metrics](../monitor/index.md) to gain insights into peering behavior over time.

To [enable Prometheus to access Besu](../monitor/metrics.md), open the metrics port or metrics push port to Prometheus or the Prometheus push gateway on TCP.

Specify the ports for Prometheus and Prometheus push gateway using the [`--metrics-port`](../../reference/cli/options.md#metrics-port) and [`--metrics-push-port`](../../reference/cli/options.md#metrics-push-port) options. The defaults are `9545` and `9001`.
