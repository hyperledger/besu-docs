---
title: Transaction pool
sidebar_position: 2
description: Transaction pool overview
tags:
  - public networks
  - private networks
---

# Transaction pool

All nodes maintain a transaction pool to store pending transactions before processing.

Options and methods for configuring and monitoring the transaction pool include:

- [`txpool_besuTransactions`](../../reference/api/index.md#txpool_besutransactions) API method to
  list transactions in the transaction pool.
- [`--tx-pool`](../../reference/cli/options.md#tx-pool) option to specify the type of transaction
  pool to use.
- [`--tx-pool-layer-max-capacity`](../../reference/cli/options.md#tx-pool-layer-max-capacity) option
  to specify the maximum memory capacity of the transaction pool.
- [`--tx-pool-price-bump`](../../reference/cli/options.md#tx-pool-price-bump) option to specify the
  price bump percentage to replace an existing transaction.
- [`--tx-pool-priority-senders`](../../reference/cli/options.md#tx-pool-priority-senders)
  option to specify sender addresses to prioritize in the transaction pool.
- [`newPendingTransactions`](../../how-to/use-besu-api/rpc-pubsub.md#pending-transactions) and
  [`droppedPendingTransactions`](../../how-to/use-besu-api/rpc-pubsub.md#dropped-transactions) RPC
  subscriptions to notify you of transactions added to and dropped from the transaction pool.

:::note
When submitting [private transactions](../../../private-networks/concepts/privacy/private-transactions/index.md#nonce-validation),
the [privacy marker transaction](../../../private-networks/concepts/privacy/private-transactions/processing.md)
is submitted to the transaction pool, not the private transaction itself.
:::

## Layered transaction pool

The [layered transaction pool](https://github.com/hyperledger/besu/pull/5290) is the default
transaction pool implementation.
This implementation separates the pool into layers according to value and executability of the transactions.
That is, the first layer keeps only transactions with the highest value and that could feasibly go
into the next produced block.
The two other layers ensure that Besu always has a backlog of transactions to fill blocks, gaining
the maximum amount of fees.

With the layered transaction pool, Besu produces more profitable blocks more quickly, with more
denial-of-service protection, and using less CPU than with the legacy transaction pool.

If you previously configured transaction pool behavior, upgrade to the layered transaction pool by:

- Removing the [`--tx-pool-retention-hours`](../../reference/cli/options.md#tx-pool-retention-hours)
  option, which is not applicable because old transactions will expire when the memory cache is full.
- Replacing the [`--tx-pool-limit-by-account-percentage`](../../reference/cli/options.md#tx-pool-limit-by-account-percentage)
  option with [`--tx-pool-max-future-by-sender`](../../reference/cli/options.md#tx-pool-max-future-by-sender)
  to limit the number of sequential transactions, instead of percentage of transactions, from a single
  sender kept in the pool.
- Removing the [`--tx-pool-max-size`](../../reference/cli/options.md#tx-pool-max-size) option,
  which is not applicable because the layered pool is limited by memory size instead of the number
  of transactions.
  To configure the maximum memory capacity, use [`--tx-pool-layer-max-capacity`](../../reference/cli/options.md#tx-pool-layer-max-capacity).

You can opt out of the layered transaction pool implementation by setting the
[`--tx-pool`](../../reference/cli/options.md#tx-pool) option to `sequenced`.

## Dropping transactions when the transaction pool is full

When the transaction pool is full, it accepts and retains local transactions in preference to remote transactions. If the transaction pool is full of local transactions, Besu drops the oldest local transactions first. That is, a full transaction pool continues to accept new local transactions by first dropping remote transactions and then by dropping the oldest local transactions.

## Replacing transactions with the same sender and nonce

### In networks with a base fee and priced gas

You can replace a pending transaction with a transaction that has the same sender and nonce but a higher gas price.

If sending a [legacy transaction](types.md#frontier-transactions), the old transaction is replaced if the new transaction has a gas price higher than the existing gas price by the percentage specified by [`--tx-pool-price-bump`](../../reference/cli/options.md#tx-pool-price-bump).

If sending an [`EIP1559` transaction](types.md#eip1559-transactions), the old transaction is replaced if one of the following is true:

- The new transaction's effective gas price is higher than the existing gas price by the percentage specified by [`--tx-pool-price-bump`](../../reference/cli/options.md#tx-pool-price-bump) AND the new effective priority fee is greater than or equal to the existing priority fee.

- The new transaction's effective gas price is the equal to the existing gas price AND the new effective priority fee is higher than the existing priority fee by the percentage specified by [`--tx-pool-price-bump`](../../reference/cli/options.md#tx-pool-price-bump).

The default value for [`--tx-pool-price-bump`](../../reference/cli/options.md#tx-pool-price-bump) is 10%.

### In networks with zero base base or free gas

To enable replacing transactions in the transaction pool for zero base fee networks,
or free gas networks:

* If you set [`zeroBaseFee`](../../reference/genesis-items.md) to `true` in the genesis file,
  the transaction pool price bump is set to `0`. Specifying a value for transaction pool price bump using [`--tx-pool-price-bump`](../../reference/cli/options.md#tx-pool-price-bump)
  will cause an error.
* If the [minimum gas price is zero](../../../private-networks/how-to/configure/free-gas.md), the transaction pool price bump is set to `0`, unless you specify a different value using [`--tx-pool-price-bump`](../../reference/cli/options.md#tx-pool-price-bump). 