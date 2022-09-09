---
title: Besu memory management
---

# Managing Java Virtual Machine (JVM) memory

To setup JVM memory usage for Besu modify maximum heap size using the `JAVA_OPTS` environment variable.

The JVM default is to use 25% of system RAM.
For example, if you have 16GB RAM installed, the JVM will default to 4GB.

We recommend setting the maximum heap size to at least 8GB for public networks.

Heap size can be set using environment variable.

!!! example "Environment variable setup examples"
    === "Exported environment variable"

        Set the variable for the whole shell before running Besu.

        ```bash
        export BESU_OPTS=-Xmx8g
        ```

    === "Inline environment variable"

        Set the variable only for the specific Besu command.

        ```bash
        BESU_OPTS=-Xmx8g besu [Besu options]
        ```

    === "In Systemd `.service` file"

        !!! important
            This is a truncated Systemd code snippet, don't us this direclty as your `.service` file.

        ```bash
        [Service]
        ...
        Environment="BESU_OPTS=-Xmx8g"
        ExecStart=besu [Besu options]
        ...
        ```

## Manage the heap dump

When an out of memory error occurs, the heap dump file is saved in the Besu runtime directory by default.

The heap dump file is potentially large and can saturate your drive.
It can be up to the size of the allocated memory.
For example, for 8GB heap memory, the file can be up to 8GB
Specify the directory where you want the dump to be saved using the `-XX:HeapDumpPath` Java option.

!!! example

    ```bash
    BESU_OPTS="-XX:HeapDumpPath=/home/me/me_node/dumps"
    ```

To disable the heap dump file generation, set the `-XX:-HeapDumpOnOutOfMemoryError` Java option.

    ```bash
    BESU_OPTS="-XX:-HeapDumpOnOutOfMemoryError"
    ```
