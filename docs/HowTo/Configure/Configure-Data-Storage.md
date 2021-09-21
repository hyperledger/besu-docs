---
description: Configure the data storage format for Besu nodes
---

# Configure the data storage format

To specify the [data storage format](../../Concepts/Data-Storage-Formats.md), start Besu using the
command line option `--Xdata-storage-format=<FORMAT>`.
The options are:

* [`FOREST`](../../Concepts/Data-Storage-Formats.md#forest-of-tries) (default)
* [`BONSAI`](../../Concepts/Data-Storage-Formats.md#bonsai-tries)

!!! caution

    Bonsai Tries is an experimental feature.

## Configuring the number of layers loaded with Bonsai

To [set a maximum number of layers back](../../Concepts/Data-Storage-Formats.md#accessing-data) to load while using Bonsai, use the command line option `--Xbonsai-maximum-back-layers-to-load=<INTEGER>`
The default is 512.  

!!! example

    ```
    besu --Xdata-storage-format=BONSAI --Xbonsai-maximum-back-layers-to-load=500
    ```
