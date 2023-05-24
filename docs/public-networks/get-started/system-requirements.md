---
title: Hyperledger Besu System Requirements
description: System requirements to sync and run Besu
---

# System requirements

Determine public network system requirements by checking CPU and disk space requirements using
[Prometheus](../how-to/monitor/metrics.md).
Grafana provides a [sample dashboard](https://grafana.com/grafana/dashboards/10273) for Besu.

!!! tip

    CPU requirements are highest when syncing to the network and typically reduce after the node is
    synchronized to the chain head.

## Java Distribution & Installation

Besu requires an accessible installation of Java 17 to run. We currently recommend two Java distributions,
though others may work and you are free to experiment based on your needs. The two we recommend are [OpenJDK 17](https://jdk.java.net/17/)
and [OpenJ9](https://www.eclipse.org/openj9/).

The two distributions come with some trade-offs. OpenJDK is the default for many Java users and is well balanced in performance and garbage collection.
OpenJ9 consumes less memory and system resources, but can be less performant on some setups. Below is a good guide to picking an installation.

If you have more than 32GB RAM (for Besu and your [consensus client](../concepts/the-merge.md)), use OpenJDK.

If you have less RAM...

* Run OpenJ9 if you are on Linux (or Unix-based) and your CPU is x86-64 bit architecture (like Intel).
* Run OpenJDK if you are on ARM-64 CPU architecture (Mac M-series, Raspberry Pi).

If you have OpenJDK installed or need a fresh Java install of OpenJ9, you can pick up the OpenJ9 docker image, or install the OpenJ9 JDK.
Follow these instructions:

* Get the binaries
    * They can be found [here](https://github.com/ibmruntimes/semeru17-binaries/releases). You will need to grab the appropriate images
* Uncompress the binaries
    * `tar -xvf YOUR_J9_IMAGE.tar.gz`
* Move the binaries to bin directory
    * `sudo cp -r YOUR_IMAGE/ /usr/bin/`
* Next specify OpenJ9 for Java on your machine
    * `sudo update-alternatives --install "/usr/bin/java" "java" "/usr/bin/YOUR_IMAGE" 1` and `sudo update-alternatives --config java` (and choose OpenJ9)
    * Change you JAVA_HOME to OpenJ9 (if using the JDK implementation) `export JAVA_HOME=jdk-install-dir` where install-dir is the location above.

## Java Virtual Machine size

For Mainnet and testnets, the minimum [Java Virtual Machine (JVM) memory requirement is 8 GB](../how-to/configure-jvm/manage-memory.md).

JVM memory requirements are highest when syncing, but will reduce after the node is synchronized
to the chain head. Monitor your system to determine your actual JVM memory needs.

## Disk space

[Fast synchronization](../reference/cli/options.md#sync-mode) with
[pruning](../concepts/data-storage-formats.md) enabled requires approximately 750 GB of disk space.
[Full synchronization](../reference/cli/options.md#sync-mode) requires approximately 3 TB.

## Disk type

Use [local SSD storage](https://cloud.google.com/compute/docs/disks) for high throughput nodes (validators and RPC nodes).
Read-only nodes can use a lower performance setup.

You can use local SSDs through [SCSI interfaces](https://en.wikipedia.org/wiki/SCSI).
For higher performance in production settings, we recommend upgrading to
[NVMe interfaces](https://cloud.google.com/compute/docs/disks/local-ssd#performance).

## AWS requirements

We are running 22.4.2 Mainnet nodes using `m6gd.2xlarge` boxes.

We synchronized the 22.4.2 Mainnet nodes using `m6gd.2xlarge` boxes.

Using a larger box while synchronizing speeds up the sync process by giving it more resources. When the
sync is completed, the box size can be reduced.

!!! important

    If you are using a more recent release than 22.4.2, resource requirements may have increased.
