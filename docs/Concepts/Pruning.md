---
description: Full and archive node types
---

# Full and archive node types

Besu supports two node types, commonly referred to as _full nodes_ and _archive nodes_.

Full nodes have just the current state of the blockchain so cannot serve the network with all data
requests (for example, the balance of an account as at an old block). Full nodes can guarantee the
latest state for the blockchain (and some older states, but not all). You can check current
balances, sign and send transactions, and look at current Dapp data.

Archive nodes have all of this and they also store the intermediary state of every account and
contract for every block since the genesis block. With an archive node you can do everything you
do with a full node, as well as access historical state data.

Archive nodes require significantly more disk space (approximately 3TB) than full nodes
(approximately 750GB).

To run an archive node, enable full synchronization using
[`--sync-mode=FULL`](../Reference/CLI/CLI-Syntax.md#sync-mode), which by default also disables
pruning ([`--pruning-enabled=false`](../Reference/CLI/CLI-Syntax.md#pruning-enabled)).

To run a full node, enable fast synchronization using
[`--sync-mode=FAST`](../Reference/CLI/CLI-Syntax.md#sync-mode), which by default also enables
pruning ([`--pruning-enabled=true`](../Reference/CLI/CLI-Syntax.md#pruning-enabled)).

## Fast synchronization

Instead of a full synchronization ([`--sync-mode=FULL`](../Reference/CLI/CLI-Syntax.md#sync-mode)),
which starts from the genesis block and reprocesses all transactions, fast synchronization
([`--sync-mode=FAST`](../Reference/CLI/CLI-Syntax.md#sync-mode)) downloads the transaction receipts
along with the blocks.

!!! note

    Fast synchronization enables pruning by default, but you can explicitly disable pruning
    using [`--pruning-enabled=false`](../Reference/CLI/CLI-Syntax.md#pruning-enabled). Full
    synchronization disables pruning by default.

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
