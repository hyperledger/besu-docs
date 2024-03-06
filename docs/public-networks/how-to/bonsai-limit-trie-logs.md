---
title: Use Bonsai Tries to reduce database size
sidebar_position: 12
description: Enable this feature to reduce the size of your database
tags:
  - public networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Reduce database size

If you are using the [Bonsai Trie](../concepts/data-storage-formats#bonsai-tries) data storage policy`, use the the early access feature `--Xbonsai-limit-trie-logs-enabled` to minimize the Besu database size. When enabled, this feature can reduce database growth by more than 3GB each week on mainnet.

To use this feature before it is enabled by default, add the `--Xbonsai-limit-trie-logs-enabled` option to your Besu command.

## Limit Trie Logs for Bonsai

:::caution

The following commands are examples. Before executing these example commands on your node, modify them to apply to your node's configuration.

:::

1. Add the `--Xbonsai-limit-trie-logs-enabled` option to the [Besu configuration file](configuration-file).
1. Stop Besu.
1. (optional) Run the following command to run the Besu client for the Bonsai data storage format, specifying a data directory for pruned trie logs:
   `sudo /usr/local/bin/besu/bin/besu --data-storage-format=BONSAI --data-path=/var/lib/besu --sync-mode=X_SNAP storage x-trie-log prune`
1. Restart Besu. If you're using a `systemd` service file, as recommended by [CoinCashew](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet/part-i-installation/step-3-installing-execution-client/besu) and [Somer](https://someresat.medium.com/guide-to-staking-on-ethereum-ubuntu-teku-f09ecd9ef2ee), ensure you execute `sudo systemctl daemon-reload`.
1. Look for `Limit trie logs enabled: retention: 512; prune window: 30000` in your Besu configuration printout at startup.


## Restart Besu

When Besu restarts, it will prune and remove unnecessary data, one block at a time. This process begins after an initial reduction in the database size during startup.

Running a long-running node does not immediately clear your backlog of trie logs in the same way resyncing does. Instead of resyncing, you can run an offline command to immediately prune old trie logs. To run the offline command, you must shutdown Besu for a minimal period. If you enable the `--Xbonsai-limit-trie-logs-enabled` option, you do not need to run this command again.

For minimal downtime, we recommend running the offline command before restarting Besu with `--Xbonsai-limit-trie-logs-enabled`.

If you followed the guides by Somer Esat (https://someresat.medium.com/guide-to-staking-on-ethereum-ubuntu-teku-f09ecd9ef2ee) or CoinCashew (https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet/part-i-installation/step-3-installing-execution-client/besu), you set these options in your `besu.service` or `execution.service` systemd file:

```
...
ExecStart=/usr/local/bin/besu/bin/besu \
...
  --sync-mode=SNAP \
  --data-path="/var/lib/besu" \
  --data-storage-format=BONSAI \
...
```
To prune trie logs, your command should look like the following:

`sudo /usr/local/bin/besu/bin/besu --data-storage-format=BONSAI --data-path=/var/lib/besu --sync-mode=SNAP storage x-trie-log prune`


The logs should look something like the following:

```
2024-02-02 05:45:41.162+00:00 | main | INFO  | KeyPairUtil | Attempting to load public key from /data/besu/key
 ...
2024-02-02 05:45:43.433+00:00 | main | INFO  | TrieLogSubCommand | Estimating trie logs size before pruning...
2024-02-02 05:45:43.837+00:00 | main | INFO  | TrieLogSubCommand | Estimated trie logs size before pruning: 9 GiB
2024-02-02 05:46:09.863+00:00 | main | INFO  | TrieLogHelper | Starting pruning: retain 512 trie logs, processing in 1 batches...
2024-02-02 05:46:09.918+00:00 | main | INFO  | TrieLogHelper | Saving trie logs to retain in file /data/besu/database/trieLogsToRetain-1 (batch 1)...
2024-02-02 05:46:09.926+00:00 | main | INFO  | TrieLogHelper | Obtaining trielogs from db, this may take a few minutes...
2024-02-02 05:46:10.100+00:00 | main | INFO  | TrieLogHelper | Clear trie logs...
2024-02-02 05:46:10.155+00:00 | main | INFO  | TrieLogHelper | Restoring trie logs retained from batch 1...
2024-02-02 05:46:10.222+00:00 | main | INFO  | TrieLogHelper | Key(0): 0xcd50706da7f6f2db7f9d54f3589122760900d9ab2508c20a4ca40b496d930368
... 
2024-02-02 05:46:10.336+00:00 | main | INFO  | TrieLogHelper | Key(511): 0x238f9649b59616430ad7e43b8f3cf65bc97cac4aa54a3eddf3ad6ee666ce733e
2024-02-02 05:46:10.441+00:00 | main | INFO  | TrieLogHelper | Deleting files...
2024-02-02 05:46:10.446+00:00 | main | INFO  | TrieLogSubCommand | Finished pruning. Re-estimating trie logs size...
2024-02-02 05:46:11.023+00:00 | main | INFO  | TrieLogSubCommand | Estimated trie logs size after pruning: 0 B (0 B estimate is normal when using default settings)
2024-02-02 05:46:11.023+00:00 | main | INFO  | TrieLogSubCommand | Prune ran successfully. We estimate you freed up 9 GiB!
Prune ran successfully. We estimate you freed up 9 GiB!
```

If you are using a TOML config file, then you can simply do something like:

`sudo /usr/local/bin/besu/bin/besu --config-file=besu-config.toml storage x-trie-log prune`

## Troubleshoot

### Troubleshoot common errors

The prune command should look like the following for mainnet users:
`sudo /usr/local/bin/besu/bin/besu --data-path=/var/lib/besu --data-storage-format=BONSAI --sync-mode=SNAP storage x-trie-log prune`

Ensure you stop Besu before running the command.

---

`java.lang.IllegalArgumentException: Subcommand only works with data-storage-format=BONSAI`

Are you missing --data-storage-format=BONSAI? It must be add before the storage subcommand, i.e.

`sudo /usr/local/bin/besu/bin/besu --data-storage-format=BONSAI --data-path=/var/lib/besu --sync-mode=SNAP storage x-trie-log prune`

---


`java.lang.RuntimeException: Column handle not found for segment TRIE_BRANCH_STORAGE`

Did you specify the `data-path`?

`sudo /usr/local/bin/besu/bin/besu --data-path=/var/lib/besu --data-storage-format=BONSAI --sync-mode=SNAP storage x-trie-log prune`

---


> ... 
> | INFO | RocksDBKeyValueStorageFactory | No existing database detected at /tmp/besu. Using version 2
> ...
> java.lang.IllegalArgumentException: Trying to retain more trie logs than chain length (0), skipping pruning

Did you specify the correct data-path for your node?

`sudo /usr/local/bin/besu/bin/besu --data-path=/var/lib/besu --data-storage-format=BONSAI --sync-mode=SNAP storage x-trie-log prune`

---

#### `java.lang.IllegalArgumentException: Cannot store generated private key`

Did you specify the correct data-path for your node?

`sudo /usr/local/bin/besu/bin/besu --data-path=/var/lib/besu --data-storage-format=BONSAI --sync-mode=SNAP storage x-trie-log prune`

---

> ... 
> | INFO | KeyPairUtil | Attempting to load public key from /data/besu/key
> java.lang.IllegalArgumentException: Supplied file does not contain valid keyPair pair.

Check your file permission, you made need to run the command as sudo:
`sudo /usr/local/bin/besu/bin/besu --data-storage-format=BONSAI --data-path=/var/lib/besu storage --sync-mode=SNAP x-trie-log prune`

---


#### `java.lang.RuntimeException: Column handle not found for segment WORLD_STATE`
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

`sudo /usr/local/bin/besu/bin/besu --network=holesky --sync-mode=SNAP --data-storage-format=BONSAI --data-path=/var/lib/besu storage x-trie-log prune`
