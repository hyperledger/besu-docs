---
description: Full and archive node types
---

# Full and archive node types

Besu supports two node types, commonly referred to as _full nodes_ and _archive nodes_.

Full nodes have the current state of the blockchain so cannot serve the network with all data
requests (for example, the balance of an account as at an old block). Full nodes can guarantee the
latest state for the blockchain (and some older states, but not all). You can check current
balances, sign and send transactions, and look at current Dapp data.

Archive nodes have all of this and they also store the intermediary state of every account and
contract for every block since the genesis block. With an archive node you can do everything you
do with a full node, as well as access historical state data.

For Besu on MainNet, Archive nodes require significantly more disk space (approximately 3TB) than
full nodes (approximately 750GB).

!!! note

    Besu running on other public testnets, such as Ropsten, and other Ethereum clients will have
    different disk space requirements.

To run an archive node, enable full synchronization using
[`--sync-mode=FULL`](../Reference/CLI/CLI-Syntax.md#sync-mode), which by default also disables
pruning ([`--pruning-enabled=false`](../Reference/CLI/CLI-Syntax.md#pruning-enabled)).

To run a full node, enable fast synchronization using
[`--sync-mode=FAST`](../Reference/CLI/CLI-Syntax.md#sync-mode), which by default also enables
pruning ([`--pruning-enabled=true`](../Reference/CLI/CLI-Syntax.md#pruning-enabled)).

## Fast synchronization

Instead of a full synchronization ([`--sync-mode=FULL`](../Reference/CLI/CLI-Syntax.md#sync-mode)),
which starts from the genesis block and reprocesses all transactions, fast synchronization
([`--sync-mode=FAST`](../Reference/CLI/CLI-Syntax.md#sync-mode)) downloads the block headers and
transaction receipts, and verifies the chain of block headers from the genesis block.

!!!important
    Fast synchronization is the default setting for named networks specified with
    the [`--network` CLI option](../Reference/CLI/CLI-Syntax.md#network), except for the `dev` development
    network.

## Pruning

In Besu, pruning reduces the storage required by removing state trie nodes that are unreachable
from [recent blocks](../Reference/CLI/CLI-Syntax.md#pruning-blocks-retained).

!!! Important

    Using pruning with [private transactions](Privacy/Privacy-Overview.md) is not supported.

Pruning might increase block import times, but it does not affect the ability of nodes to stay in
sync.
