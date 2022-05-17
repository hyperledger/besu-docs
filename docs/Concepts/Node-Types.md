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

For Besu on Mainnet, archive nodes require significantly more disk space (approximately 3TB) than
full nodes (approximately 750GB).

!!! note

    Besu running on other public testnets, such as Ropsten, and other Ethereum clients have
    different disk space requirements.

## Run a full node

You can run a full node using [fast synchronization (fast sync)](#fast-synchronization) or
[snap synchronization (snap sync)](#snap-synchronization).

### Fast synchronization

Enable fast sync using [`--sync-mode=FAST`](../Reference/CLI/CLI-Syntax.md#sync-mode).

Fast sync downloads the block headers and transaction receipts, and verifies the chain of block headers from the genesis
block.

When starting fast sync, Besu first downloads the world state for a recent block verified by its peers (referred to as a
pivot block), and then begins fast sync from the genesis block.

Fast sync is the default for named networks specified using the [`--network`](../Reference/CLI/CLI-Syntax.md#network)
option, except for the `dev` development network.
It's also the default if connecting to Ethereum Mainnet by not specifying the
[`--network`](../Reference/CLI/CLI-Syntax.md#network) and [`--genesis-file`](../Reference/CLI/CLI-Syntax.md#genesis-file)
options.

Using fast sync with [private transactions](../../Concepts/Privacy/Privacy-Overview.md) isn't supported.

You can observe the `besu_synchronizer_fast_sync_*` and `besu_synchronizer_world_state_*`
[metrics](../HowTo/Monitor/Metrics.md#metrics-list) to monitor fast sync.

!!! warning

    When running Besu on some cloud providers, a known [RocksDB](https://github.com/facebook/rocksdb/issues/6435) issue
    causes fast sync to fail occasionally.
    The following error is displayed repeatedly:

    ```
    EthScheduler-Services-1 (importBlock) | ERROR | PipelineChainDownloader | Chain download failed. Restarting after short delay.
    java.util.concurrent.CompletionException: org.hyperledger.besu.plugin.services.exception.StorageException: org.rocksdb.RocksDBException: block checksum mismatch:
    ```

    The failure has been seen on AWS and Digital Ocean.
    On AWS, A full restart of the VM is required to restart the fast sync.
    Fast sync isn't [currently supported on Digital Ocean](https://github.com/hyperledger/besu/blob/master/CHANGELOG.md#143).

!!! note

    When fast syncing, block numbers increase until close to the head block, then the process pauses while the world
    state download completes.
    This may take a significant amount of time depending on world state size, during which the current head block
    doesn't increase.
    For example, Mainnet may take several days or more to fast sync.
    Fast sync time may increase because Besu picks new pivot blocks, or because peers prune the world state before it
    completes downloading.

### Snap synchronization

!!! caution

    Snap sync is an experimental feature.

Enable snap sync using [`--sync-mode=X_SNAP`](../Reference/CLI/CLI-Syntax.md#sync-mode).
You need Besu version 22.4.0 or later to use snap sync.

Instead of downloading the [state trie](Data-Storage-Formats.md) node by node, snap sync downloads the contiguous chunks
of useful state data, and reconstructs the Merkle trie locally.

Nodes can't fast sync to a [Bonsai](Data-Storage-Formats.md#bonsai-tries) node, but can snap sync to a Bonsai node.

You can't switch from fast sync to snap sync.
If your node is blocked in the middle of a fast sync, you can start over using snap sync instead by stopping the node,
deleting the data directory, and starting over using `--sync-mode=X_SNAP`.

## Run an archive node

To run an archive node, enable full synchronization (full sync) using
[`--sync-mode=FULL`](../Reference/CLI/CLI-Syntax.md#sync-mode).

Full sync starts from the genesis block and reprocesses all transactions.
