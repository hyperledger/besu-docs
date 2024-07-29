---
sidebar_position: 4
description: Learn about parallel transaction execution.
tags:
- public networks
---

# Parallel transaction execution

Besu supports parallel transaction execution, using an optimistic approach to parallelize
transactions within a block when using the
[Bonsai Tries](data-storage-formats.md#bonsai-tries) data storage format.
This page provides an [overview of the mechanism](#parallelization-mechanism-overview) and some key
[metrics](#metrics).

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
  A[Start sequential processing] --> B{Is transaction finalized?};
  B --> |Yes| C{Conflict check};
  C --> |No conflict| D[Apply background state modifications];
  C --> |Conflict detected| E[Replay transaction using background cache];
  B --> |No| F[Execute transaction sequentially];
  D --> G[End sequential processing];
  E --> G;
  F --> G;
```

</p>

Besu first determines if a transaction has been "finalized," or completed by the background parallel execution:

- **Finalized:** If the transaction is finalized, Besu examines whether there are any conflicts with previously
   executed transactions.
  - **No conflict:** If no conflict is detected, Besu directly applies the state modifications generated in the
    background to the block, avoiding re-execution.
  - **Conflict detected:** If a conflict is detected, Besu replays the transaction, using a cache of background reads
    to improve efficiency.
- **Not finalized:** If the transaction is not finalized, Besu executes it sequentially within the block to ensure
  its completion, independent of the background execution.

The following flowchart outlines how Besu imports transactions into the block:

<p align="center">

```mermaid
graph TD;
  A[Start block import] --> B[Fetch block's touched addresses];
  B --> C{For each transaction};
  C -->|Next transaction| D[Fetch transaction's touched addresses];
  D --> E{Compare addresses};
  E -->|Conflict detected| F[Replay transaction using prior values as cache];
  E -->|No conflict| G[Apply transaction result directly - no replay];
  F --> H{Attempt to read from cache};
  H -->|Data found in cache| I[Continue replay using cached data];
  H -->|Data not found in cache| J[Fetch data from disk];
  I --> K[Transaction replay complete];
  J --> K;
  K --> L[Apply transaction changes];
  G --> L;
  L --> M{More transactions?};
  M -->|Yes| C;
  M -->|No| N[End block import];
```

</p>

### Conflict detection strategy

Besu's conflict detection strategy uses a Bonsai feature that tracks addresses and slots
touched or modified during a block or transaction's execution, called the accumulator.

:::tip
You can read more about Bonsai in [Consensys' Guide to Bonsai Tries](https://consensys.io/blog/bonsai-tries-guide).
:::

If a slot, code, or anything else related to an account is modified, the Bonsai accumulator keeps
track of this information.
This is how Bonsai's storage benefits are enabled, only keeping track of state diffs block to block
in Besu storage.
Besu only needs to take what the accumulator tracks at the block and transaction level, compare the
modified state slots, and check for conflicts.
By comparing the list of touched accounts from the transaction against the block's list, Besu can
identify potential conflicts.
Each time a transaction is added to the block, its list is incorporated into the block's list.
Before adding a new transaction, Besu verifies that it hasn't interacted with an account modified by
the block (that is, by previous transactions).

:::note
Accounts read by the block are not considered conflicts.
:::

In the conflict check, rewards given to the validator coinbase address at the end of each
transaction is excluded from consideration.
Otherwise, every transaction would conflict with this address.
Besu identifies this address as a conflict only if it is accessed for reasons other than receiving
rewards at the transaction's conclusion.

<p align="center">

```mermaid
graph TD;
  A[Start] --> B[Fetch touched addresses for block];
  B --> C{Check each address};
  C -->|Unchanged| D[Mark as read];
  C -->|Modified| E[Add to block's tracked addresses];
  D --> F{Next address};
  E --> F;
  F -->|More addresses?| C;
  F -->|No more| G[Fetch touched addresses for transaction];
  G --> H{For each transaction address};
  H -->|From, sender, etc.| I[Add to transaction's tracked addresses];
  I --> J{Next address};
  J -->|More addresses?| H;
  J -->|No more| K{Compare block and transaction addresses};
  K -->|Conflict detected| L[Conflict is detected];
  K -->|No conflict| M[Proceed with transaction];
  L --> N[End];
  M --> N;
```

</p>

## Metrics