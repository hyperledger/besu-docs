---
description: Data storage formats
---

# Data storage formats

Besu offers two formats for storing the world state, [Forest of Tries](#forest-of-tries) and [Bonsai Tries](#bonsai-tries).
You can [configure the data storage format](../HowTo/Configure/Configure-Data-Storage.md) when starting Besu.

## Forest of Tries

Forest of Tries, also called forest mode, is the default storage format.

In forest mode, each node in the trie is saved in a key-value store by hash. For each block, the world state is updated
with new nodes, leaf nodes, and a new state root. Old leaf nodes remain in the underlying data store. Data is accessed
and stored by hash, which increases the size of the database and increases the resources and time needed to access account data.

![forest_of_tries](../images/forest_of_tries.png)

## Bonsai Tries

!!! caution

    Bonsai Tries is an experimental feature.

Bonsai Tries is an experimental data storage layout policy designed to reduce storage requirements and increase
read performance.

Bonsai stores leaf values in a trie log, separate from the branches of the trie. Bonsai stores nodes by the
location of the node instead of the hash of the node. Bonsai can access the leaf from the underlying storage directly using the
account key. This greatly reduces the disk space needed for storage and allows for less resource-demanding
and faster read performance. Bonsai inherently [prunes](Pruning.md) orphaned nodes and old branches.

To run a node with Bonsai Tries data storage format, use the experimental command line option
[`--Xdata-storage-format=BONSAI`](../HowTo/Configure/Configure-Data-Storage.md).

![Bonsai_tries](../images/Bonsai_tries.png)

## Forest of Tries vs. Bonsai Tries

### Memory requirements

Forest mode uses significantly more memory than Bonsai. With full archives, forest mode uses an estimated 12 TB of storage,
while Bonsai with full archives uses an estimated 800 GB of storage.

### Accessing data

Forest mode must go through all the branches by hash to read a leaf value. Bonsai can access the leaf from the
underlying storage directly using the account key. Bonsai will generally read faster than forest mode,
particularly if the blocks are more recent.

However, Bonsai becomes increasingly more resource-intensive the further in history you try to read data.
To prevent this, you can limit how far Bonsai looks back while reconstructing data.
To improve performance, limit the number of layers back to load to 500 layers using the
[`--Xbonsai-maximum-back-layers-to-load`](../HowTo/Configure/Configure-Data-Storage.md#configuring-the-number-of-layers-loaded-with-bonsai) option.

### Fast syncing nodes

With forest mode, your node can use [fast synchronization](Node-Types.md#run-a-full-node) as normal.
Your node can fast sync from other nodes and other nodes can fast sync to your node.

You can fast sync from other nodes using Bonsai, but other nodes cannot fast sync
to a Bonsai node. Bonsai stores data at a point-in-time. Fast synchronization messages request node data by-hash at a
point-in-time (pivot block), thousands of blocks back during the sync. This limitation will be addressed
once the [snap-sync protocol](https://github.com/ethereum/devp2p/blob/master/caps/snap.md) is implemented.
