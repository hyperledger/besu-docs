---
description: Full and archive node types
---

# Sync Besu

Besu supports two node types, commonly referred to as _full nodes_ and _archive nodes_.

Full nodes have the current state of the blockchain so cannot serve the network with all data
requests (for example, the balance of an account at an old block). Full nodes can guarantee the
latest state for the blockchain (and some older states, but not all). You can check current
balances, sign and send transactions, and look at current dapp data.

Archive nodes have all of this and they also store the intermediary state of every account and
contract for every block since the genesis block. An archive node can do everything a full node
does, and it can access historical state data.

For Besu on Mainnet, archive nodes [require more disk space](../../concepts/data-storage-formats.md#storage-requirements)
than full nodes.

!!! note

    Besu running on other public testnets, such as Ropsten, and other Ethereum clients have
    different disk space requirements.

## Store data

You can store the world state using [Forest of Tries](../../concepts/data-storage-formats.md#forest-of-tries)
or [Bonsai Tries](../../concepts/data-storage-formats.md#bonsai-tries).
We recommend using Bonsai Tries for the lowest storage requirements.

## Run a full node

You can run a full node using [fast synchronization (fast sync)](#fast-synchronization),
[snap synchronization (snap sync)](#snap-synchronization), or
[checkpoint synchronization (checkpoint sync)](#checkpoint-synchronization).

### Fast synchronization

Enable fast sync using [`--sync-mode=FAST`](../../reference/cli/options.md#sync-mode).

Fast sync downloads the block headers and transaction receipts, and verifies the chain of block headers from the genesis
block.

When starting fast sync, Besu first downloads the world state for a recent block verified by its peers (referred to as a
pivot block), and then begins fast sync from the genesis block.

Fast sync is the default for named networks specified using the [`--network`](../../reference/cli/options.md#network)
option, except for the `dev` development network.
It's also the default if connecting to Ethereum Mainnet by not specifying the
[`--network`](../../reference/cli/options.md#network) or [`--genesis-file`](../../reference/cli/options.md#genesis-file)
options.

Using fast sync with [private transactions](../../../private-networks/concepts/privacy/index.md) isn't supported.

You can observe the `besu_synchronizer_fast_sync_*` and `besu_synchronizer_world_state_*`
[metrics](../monitor/metrics.md#metrics-list) to monitor fast sync.

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
    Fast sync isn't [currently supported on Digital Ocean](https://github.com/hyperledger/besu/blob/750580dcca349d22d024cc14a8171b2fa74b505a/CHANGELOG.md#143).

!!! note

    When fast syncing, block numbers increase until close to the head block, then the process pauses while the world
    state download completes.
    This may take a significant amount of time depending on world state size, during which the current head block
    doesn't increase.
    For example, Mainnet may take several days or more to fast sync.
    Fast sync time may increase because Besu picks new pivot blocks, or because peers prune the world state before it
    completes downloading.

### Snap synchronization

!!! important

    Snap sync is an experimental feature.
    However, we recommend using snap sync over fast sync even in certain production environments (for example, staking),
    because snap sync can be faster by several days.
    If your snap sync completes successfully, you have the correct world state.

    We recommend using snap sync with the [Bonsai](../../concepts/data-storage-formats.md#bonsai-tries)
    data storage format for the fastest sync and lowest storage requirements.

Enable snap sync using [`--sync-mode=X_SNAP`](../../reference/cli/options.md#sync-mode).
You need Besu version 22.4.0 or later to use snap sync.

Instead of downloading the [state trie](../../concepts/data-storage-formats.md) node by node, snap sync downloads as many leaves of the
trie as possible, and reconstructs the trie locally.

You can't switch from fast sync to snap sync.
If your node is blocked in the middle of a fast sync, you can start over using snap sync instead by stopping the node,
deleting the data directory, and starting over using `--sync-mode=X_SNAP`.

### Checkpoint synchronization

!!! important

    Checkpoint sync is an experimental feature.

Enable checkpoint sync using [`--sync-mode=X_CHECKPOINT`](../../reference/cli/options.md#sync-mode).
You need Besu version 22.4.3 or later to use checkpoint sync.

Checkpoint sync behaves like [snap sync](#snap-synchronization), but instead of syncing from the
genesis block, it syncs from a specific checkpoint block configured in the [Besu genesis
file](../../concepts/genesis-file.md).

You can configure a checkpoint in the genesis file by specifying the block hash, number, and total
difficulty as in the following example.

!!! example "Checkpoint configuration example"

    ```json
    "checkpoint": {
      "hash": "0x844d581cb00058d19f0584fb582fa2de208876ee56bbae27446a679baf4633f4",
      "number": 14700000,
      "totalDifficulty": "0xA2539264C62BF98CFC6"
    }
    ```

!!! note

    If using [Clique](../../../private-networks/how-to/configure/consensus/clique.md) consensus, the
    checkpoint must be the beginning of an epoch.

Checkpoints are currently already defined in the network configurations for Ethereum Mainnet and
the Ropsten and Goerli testnets.

If you enable checkpoint sync without a checkpoint configuration in the genesis file, Besu will snap
sync from the genesis block.

## Run an archive node

To run an archive node, enable full synchronization (full sync) using
[`--sync-mode=FULL`](../../reference/cli/options.md#sync-mode).

Full sync starts from the genesis block and reprocesses all transactions.
