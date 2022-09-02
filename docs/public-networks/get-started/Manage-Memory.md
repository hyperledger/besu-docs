---
title: Besu memory management
---

# Managing memory

Manage Besu's Java Virtual Machine (JVM) memory usage by setting a maximum heap size
using the `JAVA_OPTS` environment variable.

The JVM will default to 25% of system RAM.  In other words if you have 16GB RAM installed, the JVM will default to 4GB.  

We recommend setting the maximum heap size to at least 8GB for public networks.

Set the heap size using the environment variable, or using the command line when starting Besu.

=== "Environment variable"

    ```bash
    export BESU_OPTS=-Xmx8g
    ```

=== "Command line"

    ```bash
    BESU_OPTS=-Xmx8g besu [options]
    ```  

=== "Systemd" (Note this is a truncated snippet as an example, do NOT this as your .service file)

    ```bash
    [Service]
    ...
    Environment="BESU_OPTS=-Xmx8g"
    ExecStart=besu [options]
    ...
    ```  

## Manage the heap dump

If an out of memory error occurs, the heap dump file is placed in the directory that Besu
runs from. The heap dump file is potentially large (up to 8GB), to specify the directory to place the
file, set the `-XX:HeapDumpPath` Java option to the required path.


    ```bash
    BESU_OPTS="-XX:HeapDumpPath=/home/me/me_node/dumps"
    ```

To disable the heap dump file generation, set the `-XX:-HeapDumpOnOutOfMemoryError` Java option.

    ```bash
    BESU_OPTS="-XX:-HeapDumpOnOutOfMemoryError"
    ```
