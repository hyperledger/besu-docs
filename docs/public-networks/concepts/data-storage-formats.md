---
description: Data storage formats
---

# Data storage formats

Besu offers two formats for storing the world state, [Forest of Tries](#forest-of-tries) and [Bonsai Tries](#bonsai-tries).

## Forest of Tries

Forest of Tries, also called forest mode, is the default storage format.

In forest mode, each node in the trie is saved in a key-value store by hash. For each block, the world state is updated
with new nodes, leaf nodes, and a new state root. Old leaf nodes remain in the underlying data store. Data is accessed
and stored by hash, which increases the size of the database and increases the resources and time needed to access account data.

![forest_of_tries](../../images/forest_of_tries.png)

## Bonsai Tries

Bonsai Tries is a data storage layout policy designed to reduce storage requirements and increase
read performance.

Bonsai stores leaf values in a trie log, separate from the branches of the trie. Bonsai stores nodes by the
location of the node instead of the hash of the node. Bonsai can access the leaf from the underlying storage directly using the
account key. This greatly reduces the disk space needed for storage and allows for less resource-demanding
and faster read performance. Bonsai inherently [prunes](../../global/concepts/Pruning.md) orphaned nodes and old branches.

To run a node with Bonsai Tries data storage format, use the command line option
[`--data-storage-format=BONSAI`](../../global/reference/cli/options.md#data-storage-format).

![Bonsai_tries](../../images/Bonsai_tries.png)

## Forest of Tries vs. Bonsai Tries

### Storage requirements

Forest mode uses significantly more memory than Bonsai.
With an [archive node](Node-Types.md#run-an-archive-node), forest mode uses an estimated 12 TB of
storage, while Bonsai uses an estimated 1100 GB of storage.
With a [full node](Node-Types.md#run-a-full-node), forest mode uses an estimated 7 TB of storage,
while Bonsai uses an estimated 790 GB of storage.

### Accessing data

Forest mode must go through all the branches by hash to read a leaf value. Bonsai can access the leaf from the
underlying storage directly using the account key. Bonsai will generally read faster than forest mode,
particularly if the blocks are more recent.

However, Bonsai becomes increasingly more resource-intensive the further in history you try to read data.
To prevent this, you can limit how far Bonsai looks back while reconstructing data.
The default limit Bonsai looks back is 512. To change the parameter, use the
[`--bonsai-maximum-back-layers-to-load`](../../global/reference/cli/options.md#bonsai-maximum-back-layers-to-load) option.

!!! note

    Using `--bonsai-maximum-back-layers-to-load` doesn't affect the size of the database being stored, only how far back to load.
    This means there is no "safe minimum" value to use with this option.

### Syncing nodes

The following table shows the ways you can [sync a full node](../how-to/connect/sync-node.md#run-a-full-node) with the different data
storage formats using [fast](../how-to/connect/sync-node.md#fast-synchronization) and [snap](../how-to/connect/sync-node.md#snap-synchronization) sync.

| Data storage format | Sync mode | Storage estimate | Can other nodes sync to your node? |
|---------------------|-----------|------------------|------------------------------------|
| Bonsai              | Fast      | 790 GB           | No                                 |
| Bonsai              | Snap      | 790 GB           | To be implemented                  |
| Forest              | Fast      | 7 TB             | Yes                                |
| Forest              | Snap      | 7 TB             | To be implemented                  |

!!! important

    We recommend using snap sync with Bonsai for the fastest sync and lowest storage requirements.
