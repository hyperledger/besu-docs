---
title: Manage JVM memory
sidebar_position: 2
description: Besu memory management
tags:
  - private networks
---

# Manage JVM memory

You can manage Java Virtual Machine (JVM) memory usage for Besu by modifying the maximum heap size.

By default, the JVM uses 25% of system RAM. For example, if you have 16 GB RAM installed, the JVM uses 4 GB by default.

On public networks, we recommend setting the maximum heap size to:

- 3 GB on an 8 GB RAM system.
- 5 GB on a 16 GB RAM system.
- 8 GB on a system with at least 24 GB RAM.

:::note

Setting a higher maximum heap size speeds up the sync period but doesn't have much impact after sync. Thus, we recommend setting it to 8 GB only when you have available RAM.

:::

You can set the maximum heap size using the `BESU_OPTS` environment variable and the `-Xmx` option. The following examples set the maximum heap size to 8 GB:

<!--tabs-->

# Exported environment variable example

Set the variable for the whole shell before running Besu.

```bash
export BESU_OPTS=-Xmx8g
```

# Inline environment variable example

Set the variable only for the specific Besu command.

```bash
BESU_OPTS=-Xmx8g besu [Besu options]
```

# `.service` file example

```bash
[Service]
...
Environment="BESU_OPTS=-Xmx8g"
ExecStart=besu [Besu options]
...
```

<!--/tabs-->

## Manage the heap dump

Heap dump file generation is disabled by default. To enable it, set the `-XX:+HeapDumpOnOutOfMemoryError` Java option.

```bash
BESU_OPTS="-XX:+HeapDumpOnOutOfMemoryError"
```

When heap dump file generation is enabled, and an out-of-memory error occurs, the heap dump file is saved in the Besu runtime directory by default.

The heap dump file might be large and can saturate your drive. It can be up to the size of the allocated memory. For example, for 8 GB heap memory, the file can be up to 8 GB. Specify the directory where you want the dump to be saved using the `-XX:HeapDumpPath` Java option.

```bash
BESU_OPTS="-XX:HeapDumpPath=/<path>/<to>/<directory>"
```
