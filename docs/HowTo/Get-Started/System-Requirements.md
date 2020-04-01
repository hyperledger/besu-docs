---
title: Hyperledger Besu System Requirements
description: System requirements to sync and run Besu
---

# System requirements

The system requirements for Hyperledger Besu depend on different factors, including the:

* Size of the world state for the network.
* Number of transactions submitted to the network.
* [Block gas limit](../../Reference/Config-Items.md#genesis-block-parameters).
* Number and complexity of [JSON-RPC](../Interact/APIs/Using-JSON-RPC-API.md),
  [PubSub](../Interact/APIs/RPC-PubSub.md), or [GraphQL](../Interact/APIs/GraphQL.md) queries
  handled by the node.

## Determining system requirements

To determine system requirements, check CPU and disk space requirements using
[Prometheus](../Monitor/Metrics.md#monitor-node-performance-using-prometheus). Grafana provides a
[sample dashboard](https://grafana.com/grafana/dashboards/10273) for Besu.

!!! tip

    CPU requirements are highest when syncing to the network and typically reduce after the node is
    synchronized to the chain head.

## Java Virtual Machine size

Depending on your environment and network setup, Besu has the following minimum Java Virtual
Machine (JVM) memory requiements. For:

* Private networks, 4GB
* MainNet and testnets, such as Ropten, 8GB.

Two JVM parameters can be set to suit your memory requirements:

* `-Xms<size>`, which specifies the initial Java heap size.
* `-Xmx<size>`, which specifies the maximum Java heap size.

[Set the JVM options](../Configure/Passing-JVM-Options.md) in the `BESU_OPTS` environment variable.

JVM memory requirements are highest when syncing, but will reduce after the node is synchronized
to the chain head. Monitor your system to determine your actual JVM memory needs.

## Disk space

!!! caution

    Do not use pruning in Hyperledger Besu v1.4.0. Pruning has a
    [known bug](https://github.com/hyperledger/besu/blob/master/CHANGELOG.md#known-issues).

    If using fast synchronization
    ([`--sync-mode=FAST`](../../Reference/CLI/CLI-Syntax.md#sync-mode)) in v1.4.0, explicitly
    disable pruning using
    [`--pruning-enabled=false`](../../Reference/CLI/CLI-Syntax.md#pruning-enabled).

How you synchronize with the Ethereum MainNet and the type of node you run (either [a full or an
archive node](../../Concepts/Pruning.md)) determines your disk space requirement.

A full node, that is with [fast synchronization](../../Reference/CLI/CLI-Syntax.md#sync-mode) or
[pruning](../../Concepts/Pruning.md) enabled, requires approximately 750GB of disk space. An
archive node, where fast synchronization and pruning are disabled, requires approximately 3TB.

## VM requirements

You can run Besu on a virtual machine (VM) on a cloud service, such as AWS or Azure, or locally
using a VM manager, such as [VirtualBox](https://www.virtualbox.org/).

If you set up your own VM locally using a VM manager, there are a few considerations:

* Ensure you enable Intel Virtualization Technology (VTx) and Virtualization Technology for
  Directed I/O (VT-d) in the BIOS settings.
* On Windows, you might need to disable Hyper-V in the Windows Feature list.

We recommend you create a VM with the following attributes:

* Memory Size: Set to 4096 MB (recommended)
* Create a virtual hard disk with at least 10 GB (20 GB recommended)
* Virtual hard disk file type: VDI (if you need to share it with other apps, use VHD)
* (Optional) You can create a shared directory to copy block files or genesis files from the host
  computer to the VM. For details on how to create a shared directory, see "Share Folders" in the
  [Oracle VirtualBox documentation].

<!-- Links -->
[Oracle VirtualBox documentation]: https://www.virtualbox.org/manual/UserManual.html#sharedfolders

