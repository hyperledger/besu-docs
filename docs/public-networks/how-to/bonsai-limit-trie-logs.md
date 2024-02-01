---
title: Limit Trie Logs for Bonsai
sidebar_position: 12
description: Enable this feature to reduce the size of your database
tags:
  - public networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Limit Trie Logs for Bonsai

The early access feature `--Xbonsai-limit-trie-logs-enabled` minimizes the database size of Besu if you are using `data-storage-format=BONSAI`. When enabled, this feature can reduce database growth by more than 3 GB each week on mainnet.

## Step by Step Guide

:::caution

Limiting trie logs is an early access feature. Before executing the commands in this guide, ensure you review your node configuration.

:::

1. Update Besu config to add --Xbonsai-limit-trie-logs-enabled but don’t restart yet
1. Stop Besu
1. (optional) Run: 
`sudo /usr/local/bin/besu/bin/besu --data-storage-format=BONSAI --data-path=/var/lib/besu --sync-mode=X_SNAP storage x-trie-log prune`
1. Start Besu (remembering to run sudo systemctl daemon-reload if you use a systemd service file as per CoinCashew and Somer)
1. Look out for `Limit trie logs enabled: retention: 512; prune window: 30000` in your Besu config printout during startup
1. Enjoy more free space


## How?
If you want to use this feature before it is enabled by default, simply add this option to your Besu command: `--Xbonsai-limit-trie-logs-enabled`
When you restart Besu it will begin pruning, block by block after an initial reduction in the database during each startup.

If you have a long-running node, this will not immediately clear your backlog of trie logs in the same way that resyncing does. Instead of resyncing, in order to do this we’re providing a “run once” **offline** command to immediately **prune all your old trie logs in a few minutes or less**. Note, this requires Besu to be shutdown before running, but downtime will be minimal. You will **not** need to run this command a second time if you keep `--Xbonsai-limit-trie-logs-enabled`.

For minimal downtime, we recommend running this command **before** restarting Besu with `--Xbonsai-limit-trie-logs-enabled` (easiest to do it all at the same time).

If you followed Somer Esat’s (https://someresat.medium.com/guide-to-staking-on-ethereum-ubuntu-teku-f09ecd9ef2ee ) or CoinCashew’s guide (https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet/part-i-installation/step-3-installing-execution-client/besu) then you likely have these options set in your `besu.service` or `execution.service` systemd file:

```
...
ExecStart=/usr/local/bin/besu/bin/besu \
...
  --sync-mode=X_SNAP \
  --data-path="/var/lib/besu" \
  --data-storage-format=BONSAI \
...
```
So in order to prune the trie logs, your command should be something like:

`sudo /usr/local/bin/besu/bin/besu --data-storage-format=BONSAI --data-path=/var/lib/besu --sync-mode=X_SNAP storage x-trie-log prune`



The logs should look something like this:

```
2024-01-31 05:10:43.777+00:00 | main | INFO  | KeyPairUtil | Attempting to load public key from /data/besu/key
...
2024-01-31 05:10:47.574+00:00 | main | INFO  | TrieLogSubCommand | Calculating trie logs size before...
2024-01-31 05:10:51.100+00:00 | main | INFO  | TrieLogSubCommand | Trie logs size before: 8 GiB
2024-01-31 05:12:45.907+00:00 | main | INFO  | TrieLogHelper | Saving trie logs to retain in file /data/besu/database/trieLogsToRetain-1 (batch 1)...
2024-01-31 05:12:45.916+00:00 | main | INFO  | TrieLogHelper | Obtaining trielogs from db, this may take a few minutes...
2024-01-31 05:12:46.036+00:00 | main | INFO  | TrieLogHelper | Clear trie logs...
2024-01-31 05:12:46.100+00:00 | main | INFO  | TrieLogHelper | Restoring trie logs retained from batch 1...
2024-01-31 05:12:46.168+00:00 | main | INFO  | TrieLogHelper | Key(0): 0xc0a1f26bf828ae6d9af8fda8af3126f12a6d986afea05fdc61b25d0d0ab3b8d4
...
2024-01-31 05:12:46.263+00:00 | main | INFO  | TrieLogHelper | Key(511): 0x5eb700164f4190b8806c7ce3de2f6e5b4f4c05a61bba4058f1b0a5ef63ec73af
2024-01-31 05:12:46.359+00:00 | main | INFO  | TrieLogHelper | Deleting files...
2024-01-31 05:12:46.363+00:00 | main | INFO  | TrieLogSubCommand | Finished pruning - recalculating size...
2024-01-31 05:12:51.658+00:00 | main | INFO  | TrieLogSubCommand | Trie logs size after: 0 B
Prune ran successfully. We estimate you freed up 8 GiB!
```

If you use a toml config file, then you can simply do something like:

`sudo /usr/local/bin/besu/bin/besu --config-file=besu-config.toml storage x-trie-log prune`

## Troubleshoot
The prune command should look something like this for mainnet users:
`sudo /usr/local/bin/besu/bin/besu --data-path=/var/lib/besu --data-storage-format=BONSAI --sync-mode=X_SNAP storage x-trie-log prune`

and Besu should be shutdown before running it.

---

> java.lang.IllegalArgumentException: Subcommand only works with data-storage-format=BONSAI

Are you missing --data-storage-format=BONSAI? It must be add before the storage subcommand, i.e.

`sudo /usr/local/bin/besu/bin/besu --data-storage-format=BONSAI --data-path=/var/lib/besu --sync-mode=X_SNAP storage x-trie-log prune`

---

java.lang.RuntimeException: Column handle not found for segment TRIE_BRANCH_STORAGE

Did you specify the `data-path`?

`sudo /usr/local/bin/besu/bin/besu --data-path=/var/lib/besu --data-storage-format=BONSAI --sync-mode=X_SNAP storage x-trie-log prune`

---

> ... 
> | INFO | RocksDBKeyValueStorageFactory | No existing database detected at /tmp/besu. Using version 2
> ...
> java.lang.IllegalArgumentException: Trying to retain more trie logs than chain length (0), skipping pruning

Did you specify the correct data-path for your node?

`sudo /usr/local/bin/besu/bin/besu --data-path=/var/lib/besu --data-storage-format=BONSAI --sync-mode=X_SNAP storage x-trie-log prune`

---

> java.lang.IllegalArgumentException: Cannot store generated private key.

Did you specify the correct data-path for your node?

`sudo /usr/local/bin/besu/bin/besu --data-path=/var/lib/besu --data-storage-format=BONSAI --sync-mode=X_SNAP storage x-trie-log prune`

---

> ... 
> | INFO | KeyPairUtil | Attempting to load public key from /data/besu/key
> java.lang.IllegalArgumentException: Supplied file does not contain valid keyPair pair.

Check your file permission, you made need to run the command as sudo:
`sudo /usr/local/bin/besu/bin/besu --data-storage-format=BONSAI --data-path=/var/lib/besu storage --sync-mode=X_SNAP x-trie-log prune`

---

> java.lang.RuntimeException: Column handle not found for segment WORLD_STATE

Are you using data-storage-format=FOREST instead of data-storage-format=BONSAI on an existing bonsai database?

---

> org.hyperledger.besu.plugin.services.exception.StorageException: org.rocksdb.RocksDBException: While lock file: /data/besu/database/LOCK: Resource temporarily unavailable

Is Besu already running? You need to shut the Besu client down before running this subcommand.

---

> java.lang.IllegalStateException: Unable to change the sync mode when snap sync is incomplete, please restart with snap sync mode

Have you specified the sync-mode? Default is sync-mode=FAST. Most mainnet users use X_SNAP or X_CHECKPOINT

`sudo /usr/local/bin/besu/bin/besu --sync-mode=X_SNAP --data-storage-format=BONSAI --data-path=/var/lib/besu storage x-trie-log prune`

---

> java.lang.RuntimeException: No finalized block present, can't safely run trie log prune

If your node is relatively new or recently resynced, you might not need to run this command.

---

> org.hyperledger.besu.util.InvalidConfigurationException: Supplied genesis block does not match chain data stored in /data/besu.

Are you running this command for a network other than mainnet? You need to specify the network…

`sudo /usr/local/bin/besu/bin/besu --network=holesky --sync-mode=X_SNAP --data-storage-format=BONSAI --data-path=/var/lib/besu storage x-trie-log prune`

---


## The Details
Too much detail for users but if you’re interested:

- https://github.com/hyperledger/besu/issues/5390

- https://github.com/hyperledger/besu/pull/6026
