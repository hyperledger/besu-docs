---
sidebar_position: 4
description: Learn about parallel transaction execution.
tags:
- public networks
---

# Parallel transaction execution

Besu supports parallel transaction execution, using an optimistic approach to parallelize
transactions within a block.
This page provides an [overview of the mechanism](#parallelization-mechanism-overview), and some key
[metrics](#metrics) indicating that this feature significantly improves Besu's performance.

:::warning Important
Parallel transaction execution is an early access feature.
You can enable it using the `--Xbonsai-parallel-tx-processing-enabled` option.
:::

## Parallelization mechanism overview

When parallel transaction execution is enabled, Besu initially executes all transactions within a
block in parallel, operating under the optimistic assumption that they can all be executed
concurrently without conflict.
This parallel execution runs in the background, and Besu proceeds to sequentially process the
transactions without waiting for the parallel execution to complete.

The following flowchart outlines the sequential processing flow:

<p align="center">

```mermaid
graph TD;
  A(Start sequential processing) --> B{{Is transaction finalized?}};
  B --> |Yes| C{{Conflict check}};
  C --> |No conflict| D(Apply background state modifications);
  C --> |Conflict detected| E(Replay transaction using background cache);
  B --> |No| F(Execute transaction sequentially);
  D --> G(End sequential processing);
  E --> G;
  F --> G;
```

</p>

Besu first determines if a transaction has been "finalized," or completed by the background parallel
execution:

- **Finalized:** If the transaction is finalized, Besu examines whether there are any conflicts with
  previously executed transactions.
  - **No conflict:** If no conflict is detected, Besu directly applies the state modifications
    generated in the background to the block, avoiding re-execution.
  - **Conflict detected:** If a conflict is detected, Besu replays the transaction, using a cache of
    background reads to improve efficiency.
- **Not finalized:** If the transaction is not finalized, Besu executes it sequentially within the
  block to ensure its completion, independent of the background execution.

### Conflict detection strategy

Besu's conflict detection strategy uses a [Bonsai Tries](data-storage-formats.md#bonsai-tries)
feature, the *accumulator*, that tracks addresses and slots touched or modified during a block's or
transaction's execution.

:::tip
You can read more about Bonsai in [Consensys' Guide to Bonsai Tries](https://consensys.io/blog/bonsai-tries-guide).
:::

If a slot, code, or anything else related to an account is modified, the Bonsai accumulator keeps
track of this information.
This strategy leverages Bonsai's storage benefits, only keeping track of state diffs block-to-block
in Besu storage.

The following flowchart outlines how Besu detects conflicts and imports transactions into the block:

<p align="center">

```mermaid
graph TD;
  A(Start block import) --> B(Fetch block's touched addresses);
  B --> C{{For each transaction}};
  C -->|Next transaction| D(Fetch transaction's touched addresses);
  D --> E{{Compare addresses}};
  E -->|Conflict detected| F(Replay transaction using prior values as cache);
  E -->|No conflict| G(Apply transaction result directly – no replay);
  F --> H{{Attempt to read from cache}};
  H -->|Data found in cache| I(Continue replay using cached data);
  H -->|Data not found in cache| J(Fetch data from disk);
  I --> K(Transaction replay complete);
  J --> K;
  K --> L(Apply transaction changes);
  G --> L;
  L --> M{{More transactions?}};
  M -->|Yes| C;
  M -->|No| N(End block import);
```

</p>

Besu takes what the accumulator tracks at the block and transaction level, compares the
transaction's list of touched addresses to the block's list, and checks for conflicts.

Besu identifies conflicts by checking whether a transaction has interacted with accounts modified by
the block (that is, modified by previous transactions).
If a conflict is detected, Besu replays the transaction using cached data or data fetched from disk.
Each time a transaction is added to the block, Besu incorporates the transaction's tracked list into
the block's list.

:::info Note
The following are excluded from the conflict check:

- Unchanged accounts read by the block.

- Rewards given to the validator coinbase address at the end of each transaction.
  If these were considered, every transaction would conflict with the coinbase address.
  Besu identifies this address as a conflict only if it is accessed for reasons other than receiving
  rewards at the transaction's conclusion.
:::

The following flowchart further outlines how Besu maintains the lists of tracked addresses:

<p align="center">

```mermaid
graph TD;
  A(Start) --> B(Fetch block's touched addresses);
  B --> C{{Check each address}};
  C -->|Unchanged| D(Mark as read);
  C -->|Modified| E(Add to block's tracked addresses);
  D --> F{{Next address}};
  E --> F;
  F -->|More addresses?| C;
  F -->|No more| G(Fetch transaction's touched addresses);
  G --> H{{For each transaction address}};
  H -->|From, sender, etc.| I(Add to transaction's tracked addresses);
  I --> J{{Next address}};
  J -->|More addresses?| H;
  J -->|No more| K{{Compare block and transaction addresses}};
  K -->|Conflict detected| L(Conflict is detected);
  K -->|No conflict| M(Proceed with transaction);
  L --> N(End);
  M --> N;
```

</p>

Besu's conflict detection strategy is intentionally basic, to simplify debugging and edge cases.
With this approach to parallel transaction execution,
[around 40% of transactions do not require replay](#metrics), indicating its effectiveness.
In the future, enhancements will be implemented to refine the detection strategy and reduce false positives.

You can enable this early access feature using the `--Xbonsai-parallel-tx-processing-enabled` option.

## Metrics

Parallel transaction execution uses Besu's resources in a more efficient way than traditional
sequential execution, significantly improving performance.

The following metrics were collected on nodes running on Azure VMs (Standard D8as v5 – 8 vCPUs, 32
GiB memory), with Teku and Nimbus as consensus layer (CL) clients:

- **Block processing time** - With Teku as CL client, block processing time improves by at least 25%.
  The 50th percentile decreases from 282 ms to 207 ms and the 95th
  percentile decreases from 479 ms to 393 ms.

  With Nimbus as CL client, block processing improves by around 45%, with the 50th percentile at 155
  ms, and the 95th percentile at 299 ms.
  This is likely due to both the EL and CL clients running on the same machine, which reduces cache
  misses and context switching.

- **Execution throughput** - Execution throughput increases, with an average of 96 Mgas/s and peaks
  of up to 25 Mgas/s.

- **Parallel transactions** - Parallel transaction execution introduces two new metrics, which
  indicate that around 40% of transactions are parallelized using this feature:

  - `besu_block_processing_parallelized_transactions_counter_total` - The number of transactions
    executed in parallel.
  - `besu_block_processing_conflicted_transactions_counter_total` - The number of transactions that
    encountered conflicts and were therefore executed sequentially.

- **Sync time** - The snap synchronization time is around 27 hours and 5 minutes, with block import
  time around 6 ms on average.

- **CPU profiling** - The new payload call time decreases from 251.68 ms to 172.04 ms on average,
  with notable improvements in SLOAD operation times.

Overall, parallel transaction execution improves Besu performance with almost no resource usage
overhead.
Future enhancements to this feature will further improve performance.
