---
description: Full and archive node types
---

# Node types

Besu supports two node types, commonly referred to as _full nodes_ and _archive nodes_.

Full nodes have the current state of the blockchain so cannot serve the network with all data
requests (for example, the balance of an account at an old block). Full nodes can guarantee the
latest state for the blockchain (and some older states, but not all). You can check current
balances, sign and send transactions, and look at current dapp data.

Archive nodes have all of this and they also store the intermediary state of every account and
contract for every block since the genesis block. An archive node can do everything a full node
does, and it can access historical state data.

For Besu on MainNet, archive nodes require significantly more disk space (approximately 3TB) than
full nodes (approximately 750GB).

!!! note

    Besu running on other public testnets, such as Ropsten, and other Ethereum clients have
    different disk space requirements.

## Run a full node

To run a full node, enable fast synchronization using
[`--sync-mode=FAST`](../Reference/CLI/CLI-Syntax.md#sync-mode).

Fast synchronization downloads the block headers and transaction receipts, and verifies the chain of
block headers from the genesis block.

When starting fast synchronization, Besu first downloads the world state for a recent block verified
by its peers (referred to as a pivot block), and then begins fast synchronization from the
genesis block.

!!! important

    Fast synchronization is the default for named networks specified with
    the [`--network` option](../Reference/CLI/CLI-Syntax.md#network), except for the `dev` development
    network.

    Fast synchronization is also the default if Ethereum mainnet is being connected to by not specifying
    the [`--network`](../Reference/CLI/CLI-Syntax.md#network) and [`--genesis-file`](../Reference/CLI/CLI-Syntax.md#genesis-file)
    options.

!!! note

    To improve performace, or if the fast sync is taking a long time to complete, use
    [`fast-sync-min-peers`](../Reference/CLI/CLI-Syntax.md#fast-sync-min-peers) to increase the number of peers to at least 8.

## Run an archive node

To run an archive node, enable full synchronization using
[`--sync-mode=FULL`](../Reference/CLI/CLI-Syntax.md#sync-mode).

Full synchronization starts from the genesis block and reprocesses all transactions.
