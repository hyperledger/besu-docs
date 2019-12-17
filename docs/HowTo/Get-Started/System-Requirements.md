title: Hyperledger Besu System Requirements
description: System requirements to sync and run Besu 
<!--- END of page meta data -->

# System Requirements 

The system requirements for Hyperledger Besu depend on a number of factors: 

* Size of the world state for the network
* Number of transactions submitted to network 
* [Block gas limit](../../Reference/Config-Items.md#genesis-block-parameters)
* Number and complexity of [JSON-RPC](../Interact/APIs/Using-JSON-RPC-API.md), [PubSub](../Interact/APIs/RPC-PubSub.md), 
or [GraphQL](../Interact/APIs/GraphQL.md) queries being handled by the node 

## Determining System Requirements  

To determine system requirements, monitor CPU and disk space requirements using [Prometheus](../Monitor/Metrics.md#monitor-node-performance-using-prometheus). 
A sample [Grafana dashboard](https://grafana.com/grafana/dashboards/10273) is provided for Besu. 

!!! tip
    CPU requirements are highest when syncing to the network and typically reduce once the node is synchronized to the chain head. 

## RAM 

Besu requires 4GB of RAM. For public Ethereum networks including Mainnet and testnets such as Ropsten, 
a minimum of 8GB of RAM is required. 

## Disk Space 

Syncing to the Ethereum Mainnet requires 3TB for a full sync. To reduce the requirement, use [pruning](../../Concepts/Pruning.md). With pruning, we recommend approximately 750GB of available disk space. 

## VM Requirements

You can run Besu on a virtual machine (VM) on a cloud service such as AWS or Azure, or locally
using a VM manager such as [VirtualBox](https://www.virtualbox.org/).

If you set up your own VM locally using a VM manager such as [VirtualBox](https://www.virtualbox.org/),
there are a few considerations:

* Ensure that Intel Virtualization Technology (VTx) and Virtualization Technology for Directed
I/O (VT-d) are enabled in BIOS settings.

* On Windows, you might need to disable Hyper-V in the Windows Feature list.

It is recommended that you create a VM with the following attributes:

* Memory Size: Set to 4096 (recommended)

* Create a virtual hard disk with at least 10 GB; 20 GB is recommended

* Virtual hard disk file type: VDI (if you need to share it with other apps, use VHD)

* (Optional) You can create a shared directory in order to copy block files or genesis files from 
the host computer to the VM. For details on how to create a shared directory, see "Share Folders" in
[Oracle VirtualBox documentation](https://www.virtualbox.org/manual/UserManual.html#sharedfolders).

