---
title: Hyperledger Besu system requirements
description: System requirements to sync and run Besu
---

# System requirements for private networks

A Hyperledger Besu private network is a network not connected to Ethereum Mainnet or an Ethereum testnet.
Private networks typically use a different [chain ID](../../../Concepts/NetworkID-And-ChainID.md) and
[consensus protocol](../../../Concepts/Consensus-Protocols/Overview-Consensus.md).
Participation in private networks is typically restricted in some way, so the volume of traffic is
much lower than Mainnet, resulting in lower system requirements.

Private network system requirements depend on many factors, including:

* Size of the world state for the network.
* Number of transactions submitted to the network.
* [Block gas limit](../../../Reference/Config-Items.md#genesis-block-parameters).
* Number and complexity of [JSON-RPC](../../Interact/APIs/Using-JSON-RPC-API.md),
  [PubSub](../../Interact/APIs/RPC-PubSub.md), or [GraphQL](../../Interact/APIs/GraphQL.md) queries
  handled by the node.

## Determining system requirements

To determine system requirements, check CPU and disk space requirements using
[Prometheus](../../Monitor/Metrics.md#monitor-node-performance-using-prometheus). Grafana provides a
[sample dashboard](https://grafana.com/grafana/dashboards/10273) for Besu.

## Java Virtual Machine size

Depending on your environment and network setup, the minimum Java Virtual
Machine (JVM) memory requirement for private networks is 4 GB.

JVM memory requirements are highest when syncing, but will reduce after the node is synchronized
to the chain head. Monitor your system to determine your actual JVM memory needs.

## VM requirements

If you set up your own VM locally using a VM manager such as [VirtualBox](https://www.virtualbox.org/):

* Ensure you enable Intel Virtualization Technology (VTx) and Virtualization Technology for
  Directed I/O (VT-d) in the BIOS settings.
* On Windows, you might need to disable Hyper-V in the Windows Feature list.

We recommend you create a VM with the following attributes:

* Memory size: Set to 6 GB (recommended)
* Create a virtual hard disk with at least 10 GB (20 GB recommended)
* Virtual hard disk file type: VDI (if you need to share it with other apps, use VHD)
* (Optional) You can create a shared directory to copy block files or genesis files from the host
  computer to the VM. For details on how to create a shared directory, see "Share Folders" in the
  [Oracle VirtualBox documentation].
  
## Disk type

Use [local SSD storage](https://cloud.google.com/compute/docs/disks) for high throughput nodes (validators and RPC nodes).
Read-only nodes can use a lower performance setup.

You can use local SSDs through [SCSI interfaces](https://en.wikipedia.org/wiki/SCSI).
For higher performance in production settings, we recommend upgrading to
[NVMe interfaces](https://cloud.google.com/compute/docs/disks/local-ssd#performance).

<!-- Links -->
[Oracle VirtualBox documentation]: https://www.virtualbox.org/manual/UserManual.html#sharedfolders
