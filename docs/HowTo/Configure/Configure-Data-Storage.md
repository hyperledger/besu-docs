---
description: Configure the data storage format for Besu nodes
---

# Configure the data storage format

To specify the [data storage format](../../Concepts/Data-Storage-Formats.md), start Besu using the
command line option `--Xdata-storage-format=<FORMAT>`.
You can specify:

* `FOREST` to use [Forest of Tries](../../Concepts/Data-Storage-Formats.md#forest-of-tries). This is the default value.
* `BONSAI` to use [Bonsai](../../Concepts/Data-Storage-Formats.md#bonsai-tries).

!!! caution

    Bonsai Tries is an experimental feature.

## Configuring the number of layers loaded with Bonsai

To [set a maximum number of layers back](../../Concepts/Data-Storage-Formats.md#accessing-data)
Bonsai can go to reconstruct a historical state, use the command line option `--Xbonsai-maximum-back-layers-to-load=<INTEGER>`.
The default is 512.

!!! example

    ```
    besu [OPTIONS] --Xdata-storage-format=BONSAI --Xbonsai-maximum-back-layers-to-load=500
    ```
