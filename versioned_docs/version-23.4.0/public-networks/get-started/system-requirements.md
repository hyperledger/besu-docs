---
title: System requirements
sidebar_position: 1
description: System requirements to sync and run Besu
---

# System requirements

Determine public network system requirements by checking CPU and disk space requirements using [Prometheus](../how-to/monitor/metrics.md). Grafana provides a [sample dashboard](https://grafana.com/grafana/dashboards/10273) for Besu.

:::tip

CPU requirements are highest when syncing to the network and typically reduce after the node is synchronized to the chain head.

:::

## Java Virtual Machine size

For Mainnet and testnets, the minimum [Java Virtual Machine (JVM) memory requirement is 8 GB](../how-to/configure-jvm/manage-memory.md).

JVM memory requirements are highest when syncing, but will reduce after the node is synchronized to the chain head. Monitor your system to determine your actual JVM memory needs.

## Disk space

[Fast synchronization](../reference/cli/options.md#sync-mode) with [pruning](../concepts/data-storage-formats.md) enabled requires approximately 750 GB of disk space. [Full synchronization](../reference/cli/options.md#sync-mode) requires approximately 3 TB.

## Disk type

Use [local SSD storage](https://cloud.google.com/compute/docs/disks) for high throughput nodes (validators and RPC nodes). Read-only nodes can use a lower performance setup.

You can use local SSDs through [SCSI interfaces](https://en.wikipedia.org/wiki/SCSI). For higher performance in production settings, we recommend upgrading to [NVMe interfaces](https://cloud.google.com/compute/docs/disks/local-ssd#performance).

## AWS requirements

We are running 22.4.2 Mainnet nodes using `m6gd.2xlarge` boxes.

We synchronized the 22.4.2 Mainnet nodes using `m6gd.2xlarge` boxes.

Using a larger box while synchronizing speeds up the sync process by giving it more resources. When the sync is completed, the box size can be reduced.

:::caution

If you are using a more recent release than 22.4.2, resource requirements may have increased.

:::
