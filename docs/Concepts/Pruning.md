---
description: Full and archive node types
---

# Full and archive node types

Besu supports two node types: _full nodes_ and _archive nodes_.

Full nodes have a complete history of every block and every transaction, all fully validated, and
can serve the network with any data request. With a full node you can check balances, sign and send
transactions, and look at current Dapp data.

Archive nodes have all of this and they also store the intermediary state of every account and
contract for every block since the genesis block. With an archive node you can do everything you
do with a full node, as well as access historical state data.

Archive nodes require significantly more disk space (approximately 3TB) than full nodes
(approximately 750GB).

To run an archive node, disable both fast synchronization and pruning.

If you enable fast synchronization
(using [`--sync-mode=FAST`](../Reference/CLI/CLI-Syntax.md#sync-mode)), pruning
(using [`--pruning-enabled=true`](../Reference/CLI/CLI-Syntax.md#pruning-enabled)), or both, the
node does not store all intermediary state and runs as a full node.

## Fast sychronization

Instead of starting from the genesis block and reprocessing all transactions, fast synchronization
downloads the transaction receipts along with the blocks.

## Pruning

!!! caution

    Do not use pruning in Hyperledger Besu v1.4.0. Pruning has a
    [known bug](https://github.com/hyperledger/besu/blob/master/CHANGELOG.md#known-issues).

    If using fast synchronization
    ([`--sync-mode=FAST`](../Reference/CLI/CLI-Syntax.md#sync-mode)) in v1.4.0, explicitly disable
    pruning using [`--pruning-enabled=false`](../Reference/CLI/CLI-Syntax.md#pruning-enabled).

Pruning reduces the storage required for the world state, removing state trie nodes that are not
required.

!!! Important

    Using pruning with [private transactions](Privacy/Privacy-Overview.md) is not supported.

Pruning might increase block import times, but it does not affect the ability of nodes to stay in
sync.
