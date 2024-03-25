---
title: System requirements
sidebar_position: 1
description: Ensure you meet the system requirements to sync and run Besu.
tags:
  - public networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# System requirements

Determine public network system requirements by checking CPU and disk space requirements using [Prometheus](../how-to/monitor/metrics.md). Grafana provides a [sample dashboard](https://grafana.com/grafana/dashboards/10273) for Besu.

:::tip

CPU requirements are highest when syncing to the network and typically reduce after the node is synchronized to the chain head.

:::

## Java distribution and installation

Besu requires an installation of Java 17+ to run.
We currently recommend two Java distributions, [OpenJDK 21](https://jdk.java.net/21/) and
[OpenJ9](https://www.eclipse.org/openj9/), though you can experiment based on your needs.

OpenJDK is the default for many Java users and is balanced in performance and garbage collection.
OpenJ9 consumes less memory and system resources, but can have worse performance on some setups.

If you have more than 32GB RAM (for Besu and your [consensus client](../concepts/the-merge.md)), use OpenJDK.
If you have less RAM:

* If you're on Linux (or Unix-based) and your CPU is x86-64 bit architecture (like Intel), use OpenJ9.
* If you're on ARM-64 CPU architecture (Mac M-series, Raspberry Pi), use OpenJDK.

If you have OpenJDK installed or need a fresh installation of OpenJ9, you can pick up the OpenJ9
docker image, or install the OpenJ9 JDK using the following steps:

1. Get the [binaries](https://github.com/ibmruntimes/semeru17-binaries/releases) corresponding to
   your OS architecture.
   For example:

    ```bash
    wget https://github.com/ibmruntimes/semeru17-binaries/releases/download/jdk-17.0.5%2B8_openj9-0.35.0/ibm-semeru-open-jdk_x64_linux_17.0.5_8_openj9-0.35.0.tar.gz
    ```
2. Uncompress the binaries:

    <Tabs>
    <TabItem value="Command" label="Command" default>

    ```bash
    tar -xvf YOUR_J9_IMAGE.tar.gz
    ```
   
    </TabItem>
    <TabItem value="Example" label="Example">
    
    ```bash 
    tar -xvf ibm-semeru-open-jdk_x64_linux_17.0.5_8_openj9-0.35.0.tar.gz
    ```

    </TabItem>
    </Tabs>
   
3. Move the binaries to `bin` directory:

    <Tabs>
    <TabItem value="Command" label="Command" default>

    ```bash
    sudo cp -r YOUR_IMAGE/ /usr/bin/
    ```
   
    </TabItem>
    <TabItem value="Example" label="Example">

    ```bash
    sudo cp -r jdk-17.0.5+8/ /usr/bin/
    ```

    </TabItem>
    </Tabs>
   
4. Specify OpenJ9 for Java on your machine:

    <Tabs>
    <TabItem value="Command" label="Command" default>

    ```bash
    sudo update-alternatives --install "/usr/bin/java" "java" "/usr/bin/YOUR_IMAGE" 1
    sudo update-alternatives --config java (and choose OpenJ9)
    ```
   
    </TabItem>
    <TabItem value="Example" label="Example">

    ```bash
    sudo update-alternatives --install "/usr/bin/java" "java" "/usr/bin/jdk-17.0.5+8/bin/java"
    ```
   
    </TabItem>
    </Tabs>
   
    Change your `JAVA_HOME` to OpenJ9 (if using the JDK implementation), where `jdk-install-dir` is
    the installation location you specified:

    <Tabs>
    <TabItem value="Command" label="Command" default>

    ```bash
    export JAVA_HOME=jdk-install-dir`
    ```

    </TabItem>
    <TabItem value="Example" label="Example">

    ```bash
    export JAVA_HOME=/usr/bin/jdk-17.0.5+8
    ```
   
    </TabItem>
    </Tabs>

## Java Virtual Machine size

For Mainnet and testnets, the minimum [Java Virtual Machine (JVM) memory requirement is 8 GB](../how-to/configure-java/manage-memory.md).

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
