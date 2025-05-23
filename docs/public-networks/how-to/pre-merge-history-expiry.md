---
title: Pre-merge History Expiry
sidebar_position: 9
description: Reduce the size of your database by removing pre-merge blocks from your blockchain
tags:
  - public networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# How to perform an offline prune

The simplest and fastest option for pruning pre-merge blocks is to perform an offline prune.
```bash
./besu --NETWORK=mainnet --data-path=/path/to/your/database --Xhistory-expiry-prune storage prune-pre-merge-blocks --threads=4 --prune-range-size=10000
```
`--Xhistory-expiry-prune` will apply some default database garbage collection options to help with freeing up disk space 
`--threads` will default to one less than the number of processors available on your system, so it is safe to omit
`--prune-range-size` will default to 10000 and can be adjusted if desired, although this may impact performance of the prune

# How to perform an online prune

An alternative option for pruning is online pruning, which can be tuned to minimise impact on a running besu system
```bash
./besu --Xhistory-expiry-prune --Xpre-merge-pruning-quantity=10
```
`--Xhistory-expiry-prune` will enable online pruning of pre-merge blocks
`--Xpre-merge-pruning-quantity=10` will tune the online pruning to remove 10 blocks from the beginning of the chain for every new block added. During testing on a 4 CPU machine, we only noticed an impact to besu's normal functioning when this was tuned to 1000

# Sync without pre-merge blocks

The final option for avoiding storage of pre-merge blocks is to perform a SNAP sync with the `--Xsnapsync-synchronizer-pre-merge-headers-only-enabled` option
```bash
./besu --sync-mode=SNAP --Xsnapsync-synchronizer-pre-merge-headers-only-enabled
```

# Enable Eth/69
Alongside pre-merge history expiry, [EIP-7642](https://eips.ethereum.org/EIPS/eip-7642) adds the Eth/69 protocol which broadcasts the new earliest block in the `STATUS` message. This can be enabled by starting besu with the `--Xeth-capability-max=69` option. This usually defaults to allow all available protocol versions, but is currently defaulting to 68 to prevent unwanted Eth/69 activation. 
