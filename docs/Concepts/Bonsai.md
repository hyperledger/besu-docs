---
description: Bonsai Tries data storage
---

# Bonsai Tries data storage format

!!! caution

    Bonsai Tries is an experimental feature.

Bonsai Tries is a new data storage layout policy for Besu, designed to reduce storage requirements and increase
read performance. It is currently an experimental feature, but will replace the current data structure, the
"Forest of Tries".

Under the current structure, each node in the trie is saved in a key-value store by hash.
For each block, the world state is updated with new nodes, leaf nodes, and a new state root. Old leaf nodes remain
in the underlying data store. Data is accessed and stored by hash, which increases the size of the database and
increases the resources and time needed to access account data.  

Bonsai stores leaf values separate from the branches of the trie. Bonsai stores nodes by the
location of the node instead of the hash of the node. The current structure must go through all the
branches by hash to read a leaf value. Bonsai can access the leaf from the underlying storage directly using the
account key. This greatly reduces the disk space needed for storage. It also allows for less resource demanding
and faster read performance. Bonsai inherently [prunes](Pruning.md) orphaned nodes and old branches.

To run a node with Bonsai Tries data storage format, use the [experimental command line option](../Reference/CLI/CLI-Syntax.md#xhelp)
`--Xdata-storage-format=BONSAI`.

## Limitations

### Historical queries

Bonsai becomes increasingly more resource intensive the further in history you try to read data. To ensure performance,
limit the number of blocks back to load to 500 blocks using the command line flag `--Xbonsai-maximum-back-layers-to-load`.

### Fast syncing nodes

You can [fast-sync](Node-Types.md#run-a-full-node) from other nodes using Bonsai, but other nodes cannot fast-sync
to a Bonsai node. Bonsai stores data at a point-in-time. Fast-sync messages request node data by-hash at a
point-in-time (pivot block), thousands of blocks back from current during the sync. This limitation will be addressed
once the [snap-sync protocol](https://github.com/ethereum/devp2p/blob/master/caps/snap.md) has been implemented.
