---
description: Transaction pool overview
---

# Transaction pool

All nodes maintain a transaction pool to store pending transactions before processing.

Options and methods for configuring and monitoring the transaction pool include:

* [`txpool_besuTransactions`](../../Reference/API-Methods.md#txpool_besutransactions) JSON-RPC API
  method to list transactions in the transaction pool.
* [`--tx-pool-max-size`](../../Reference/CLI/CLI-Syntax.md#tx-pool-max-size) command line option to
  specify the maximum number of transactions in the transaction pool.
* [`--tx-pool-hashes-max-size`](../../Reference/CLI/CLI-Syntax.md#tx-pool-hashes-max-size) command
  line option to specify the maximum number of transaction hashes in the transaction pool. Should
  be greater than or equal to the value specified for `--tx-pool-max-size`.
* [`--tx-pool-price-bump`](../../Reference/CLI/CLI-Syntax.md#tx-pool-price-bump) command line
  option to specify the price bump percentage to replace an existing transaction.
* [`--tx-pool-retention-hours`](../../Reference/CLI/CLI-Syntax.md#tx-pool-retention-hours) command
  line option to specify the maximum number of hours to keep pending transactions in the transaction
  pool.
* [`newPendingTransactions`](../../HowTo/Interact/APIs/RPC-PubSub.md#pending-transactions) and
  [`droppedPendingTransactions`](../../HowTo/Interact/APIs/RPC-PubSub.md#dropped-transactions)
  RPC subscriptions to notify of transactions added to and dropped from the transaction pool.

!!! important
    When submitting [private transactions](../Privacy/Private-Transactions.md#nonce-validation), the
    [privacy marker transaction](../Privacy/Private-Transaction-Processing.md) is submitted to the
    transaction pool, not the private transaction itself.

## Dropping transactions when the transaction pool is full

When the transaction pool is full, it accepts and retains local transactions in preference to
remote transactions. If the transaction pool is full of local transactions, Besu drops the oldest
local transactions first. That is, a full transaction pool continues to accept new local
transactions by first dropping remote transactions and then by dropping the oldest local
transactions.

## Replacing transactions with the same sender and nonce

For transactions received with the same sender and nonce as a pending transaction but a gas
price higher than the existing gas price by the percentage specified by [`--tx-pool-price-bump`](../../Reference/CLI/CLI-Syntax.md#tx-pool-price-bump),
Besu replaces the pending transaction with the new one with the higher gas price. The default value for
[`--tx-pool-price-bump`](../../Reference/CLI/CLI-Syntax.md#tx-pool-price-bump) is 10%.

## Size of the transaction pool

Decreasing the maximum size of the transaction pool reduces memory use. If the network is busy and
there is a backlog of transactions, increasing the size of the transaction pool reduces the risk of
removing transactions from the transaction pool.
