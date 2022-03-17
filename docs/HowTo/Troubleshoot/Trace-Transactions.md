---
description: How to trace transactions
---

# Trace transactions

To get detailed information about transaction processing, use the
[`TRACE` API](../../Reference/API-Methods.md#trace-methods).
Enable the `TRACE` API using the
[`--rpc-http-api`](../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`--rpc-ws-api`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) command line options.

The `TRACE` API has two sets of trace calls, [ad-hoc tracing APIs](#ad-hoc-tracing-apis) and
[transaction-trace filtering APIs](#transaction-trace-filtering-apis).

## Ad-hoc tracing APIs

These APIs allow different diagnostic options when tracing calls or transactions.
The options are [`trace`, `vmTrace`, or `stateDiff`](../../Reference/Trace-Types.md).

To use the ad-hoc tracing APIs, the requested block or transaction must be within the
number of [blocks retained](../../Reference/CLI/CLI-Syntax.md#pruning-blocks-retained) with [pruning enabled](../../Reference/CLI/CLI-Syntax.md#pruning-enabled)
(by default, 1024).

The ad-hoc tracing APIs are:

* [trace_call](../../Reference/API-Methods.md#trace_call)
* [trace_callMany](../../Reference/API-Methods.md#trace_callmany)
* [trace_rawTransaction](../../Reference/API-Methods.md#trace_rawtransaction)
* [trace_replayBlockTransactions](../../Reference/API-Methods.md#trace_replayblocktransactions)

## Transaction-trace filtering APIs

These APIs allow you to filter and search by specific information such as the block, address, or transaction.
These APIs only use the [`trace` type](../../Reference/Trace-Types.md#trace).

To use the transaction-trace filtering APIs, your node must be an archive node
(that is, synchronized without pruning or fast sync) or the
requested block or transaction must be within the
number of [blocks retained](../../Reference/CLI/CLI-Syntax.md#pruning-blocks-retained) with [pruning enabled](../../Reference/CLI/CLI-Syntax.md#pruning-enabled)
(by default, 1024).

The transaction-trace filtering APIs are:

* [trace_block](../../Reference/API-Methods.md#trace_block)
* [trace_filter](../../Reference/API-Methods.md#trace_filter)
* [trace_get](../../Reference/API-Methods.md#trace_get)
* [trace_transaction](../../Reference/API-Methods.md#trace_transaction)
