---
description: How to troubleshoot poor performance and resource constraints
---

# Troubleshoot poor performance and resource constraints

Many factors can affect the ability of your node to serve requests and perform [validator duties](../../concepts/proof-of-stake/index.md), including [attestation performance](../../concepts/proof-of-stake/attestations.md).
Your hardware, machine environment, and node configuration are all important.
If you notice abnormally high resource usage by [monitoring your node](../monitor/index.md), you can try the following mitigations.

## Performance Tweaks

We have tested a variety of configurations for Besu to maintain its best performance, though it will vary depending on your environment and hardware.
Below are a number of suggestions that might help you, but you should continue to monitor your node after enabling these options.

* Disable swapping : Besu is an IO intensive application, especially during sync, enabling swapping will hurt Besu performance.
    * Swap can be disabled at the OS level. [This article](https://www.tecmint.com/disable-swap-partition/) provides some useful information on how to disable swap (and caveats).
* Use a performant SSD disk with NVMe as Besu's performance bottleneck is often slow disk IO.
* Memory and RAM:
    * If you have RAM constraints, use [OpenJ9](../../get-started/system-requirements.md) if you're running on `x86_64` Linux architecture to reduce memory usage.
    * Review and change your [Java heap size](../configure-jvm/manage-memory.md) if necessary. 5GB is an appropriate limit. Higher values may improve sync time, but can be reduced after sync is complete.
    * Ensure Besu is using [Jemalloc](../../get-started/install/binary-distribution.md).
    * If you have 32GB RAM or more, consider enabling the high spec flag via `Xplugin-rocksdb-high-spec-enabled=true` in your configuration.
    Do not use this on RAM machines with 16GB RAM or less if you are running a CL on the same hardware as it may cause issues.
* If you're running on ARM64, check if Glibc version is > 2.29. If its not, Besu will use a Java implementation instead of the native one for some precompiled contracts which results in lower performance.
    * Run `ldd --version` on Ubuntu. [Here](https://dev.to/0xbf/how-to-get-glibc-version-c-lang-26he) are some methods for other environments.
* Pay attention to what processes are running on the same machine/VM as Besu. Java applications, with default settings, are designed to run alone on the machine. You can run your [consensus client](../../concepts/the-merge.md#consensus-clients) on the same machine but this will add overhead on Besu and vice-versa (on CPU cache misses, CPU scheduler latency, IO, etc.).
