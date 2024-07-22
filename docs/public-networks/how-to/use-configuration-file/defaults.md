---
title: Default configurations 
sidebar_position: 2
todo: For future maintenance, this page would be better setup to import single-sourced partials that also serve the cli/options page. However, for PoC, the duplication/poor maintainability is tolerated for now.
---

# Default configurations 

Besu is [highly-configurable](index.md#configuration-order-of-precedence), yet its default configurations provide a viable boilerplate.

This page provides a high level overview of the opinionated default configurations of vanilla Besu. By applying these defaults, a node is optimized for staking. These defaults may be used alongside a [pre-configured profile](profile.md) to support common use cases.

For example, using the [staking profile](profile.md#staker-profile) with the boilerplate config directs Besu to use Mainnet, creating a staking-optimized node ready to run with a [validator](https://ethereum.org/en/developers/docs/nodes-and-clients/node-architecture/#validators) and [consensus client](https://ethereum.org/en/developers/docs/nodes-and-clients/node-architecture/#consensus-client).

## Configuration

|Command|Default|Notes|
|---------------------------|--------------------|------------------------------------------|
|[`config-file`](../../reference/cli/options/#config-file)|None|Vanilla Besu assumes no configuration file|


## Peering

|Command|Default|Notes|
|---------------------------|--------------------|------------------------------------------|
|[`discovery-enabled`](../../reference/cli/options/#discovery-enabled)|True|Besu assumes the node will automatically discover other Ethereum nodes using P2P|
|[`p2p-enabled`](../../reference/cli/options/#discovery-enabled)|True|Besu assumes the node will connect P2P|
|[`engine-rpc-enabled`](../../reference/cli/options/#engine-rpc-enabled)|True|Besu assumes the Engine API will be required to communicate with the consensus layer|


## Storage

|Command|Default|Notes|
|---------------------------|--------------------|------------------------------------------|
|[`data-storage-format`](../../reference/cli/options/#data-storage-format)|BONSAI|Besu applies the most space-efficient storage method|

## Sync

|Command|Default|Notes|
|---------------------------|--------------------|------------------------------------------|
|[`sync-mode`](../../reference/cli/options/#sync-mode)|SNAP|Besu applies the [snap sync mode](../../get-started/connect/sync-node#snap-synchronization) as the most time-efficient sync method|

:::note
For a comprehensive understanding, all defaults are provided in the [reference](../../reference/cli/options.md).
:::