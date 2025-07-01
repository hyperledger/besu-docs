---
title: Prune pre-merge history
sidebar_position: 9
description: Reduce the size of your database by removing pre-merge blocks from your blockchain
tags:
  - public networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Node operators using [Snap sync](../concepts/node-sync.md#snap-synchronization) can significantly reduce
disk usage by removing [pre-merge](https://ethereum.org/en/roadmap/merge/) (Proof of Work (PoW) era)
block data from the local database.

Besu can prune all pre-merge blocks and associated transaction receipts, leaving only headers and
the genesis block.

:::warning

Besu does not currently provide a way to manually import pre-merge block data after pruning.
If you need to restore the full pre-merge history, you can revert to the old sync method and download
all blocks from peers by setting `--Xsnapsync-synchronizer-pre-merge-headers-only-enabled=false`.

Support for Era1 sync for archive nodes is currently in progress.

:::

Besu provides multiple options to prune the historical blockchain data:
- [Offline pruning](#offline-pruning) to prune data on a stopped Besu instance.
- [Online pruning](#online-pruning) to prune data on a running Besu instance.
- [Sync Besu](#sync-without-pre-merge-blocks) using Snap sync, which by default prunes the historical
    blockchain data.

## Offline pruning

The easiest and fastest option for pruning pre-merge blocks is to perform an offline prune.

1. Ensure your Besu instance has stopped, and run the following command:

    ```bash
    ./besu --network=mainnet --data-path=/path/to/your/database storage prune-pre-merge-blocks --threads=4 --prune-range-size=12000
    ```
    In the command:
    - `--threads` sets the number of processors to use during the pruning process. This CLI option defaults to
    one less than the number of processors available on your system, so it's safe to omit.
    - `--prune-range-size` specifies the size of block ranges to be pruned. The default is `10000` and
        can be adjusted if desired, although this may impact pruning performance.

1. Restart Besu and include the `--history-expiry-prune` option to reclaim the space.

    ```bash
    ./besu --network=mainnet --history-expiry-prune
    ```

    We suggest waiting 24-48 hours for all the space to be reclaimed.

1. Optional. Restart Besu and remove the `--history-expiry-prune` option since this applies default
    database garbage collection options to help free up space. Underlying GC options can be tweaked
    separately if necessary.

## Online pruning

Online pruning allows you to prune the pre-merge blocks on a running Besu instance. Restart your
Besu node and include the following options:

```bash
./besu --history-expiry-prune --pre-merge-pruning-quantity=10
```

In the command:

- `--history-expiry-prune` enables online pruning of pre-merge blocks.
- `--pre-merge-pruning-quantity=10` tunes the online pruner to remove 10 blocks from the beginning of
    the chain for every new block added.

    :::note
    During testing on a 4 CPU machine, we only noticed an impact to Besu when this was tuned to `1000`
    :::

The Besu logs will print the progress in the logs, and you'll see the `Done pruning pre-merge blocks.` message
when complete.

## Sync without pre-merge blocks

By default, syncing a Besu node using `SNAP` sync will prune pre-merge blocks and only retain their headers:

```bash
./besu --sync-mode=SNAP
```

If you want to download full pre-merge blocks instead, set
`--snapsync-synchronizer-pre-merge-headers-only-enabled` to `false`

:::warning
Setting `--snapsync-synchronizer-pre-merge-headers-only-enabled` to `false` will increase the sync time
and disk space usage.
:::

If you're a solo staker, consider using [RocketPool's rescue node](https://rescuenode.com/docs/about)
to minimise downtime.