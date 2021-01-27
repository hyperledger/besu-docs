---
title: Hyperledger Besu System Requirements
description: System requirements to sync and run Besu
---

# System requirements for public networks

To determine system requirements, check CPU and disk space requirements using
[Prometheus](../../Monitor/Metrics.md#monitor-node-performance-using-prometheus). Grafana provides a
[sample dashboard](https://grafana.com/grafana/dashboards/10273) for Besu.

!!! tip

    CPU requirements are highest when syncing to the network and typically reduce after the node is
    synchronized to the chain head.

## Java Virtual Machine size

For Mainnet and testnets, the minimum Java Virtual Machine (JVM) memory requirement is 8GB.

JVM memory requirements are highest when syncing, but will reduce after the node is synchronized
to the chain head. Monitor your system to determine your actual JVM memory needs.

## Disk space

[Fast synchronization](../../../Reference/CLI/CLI-Syntax.md#sync-mode) with
[pruning](../../../Concepts/Pruning.md) enabled requires approximately 750GB of disk space.
[Full synchronization](../../../Reference/CLI/CLI-Syntax.md#sync-mode) requires approximately 3TB.

## AWS requirements

We are running 1.4.5 mainnet nodes using `t3.large` boxes.

We synchronized the 1.4.5 mainnet nodes using `t3.xlarge` boxes.

Using a larger box while synchronizing speeds up the sync process by giving it more resources. When the
sync is completed, the box size can be reduced.

!!! important

    If you are using a more recent release that 1.4.5, resource requirements may have increased.
