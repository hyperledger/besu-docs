---
title: Trace transactions
sidebar_position: 2
description: How to trace transactions
tags:
  - public networks
  - private networks
---

# Trace transactions

To get detailed information about transaction processing, use the [`TRACE` API](../../reference/api/index.md#trace-methods). Enable the `TRACE` API using the [`--rpc-http-api`](../../reference/cli/options.md#rpc-http-api) or [`--rpc-ws-api`](../../reference/cli/options.md#rpc-ws-api) command line options.

The `TRACE` API has two sets of trace calls, [ad-hoc tracing APIs](#ad-hoc-tracing-apis) and [transaction-trace filtering APIs](#transaction-trace-filtering-apis).

## Ad-hoc tracing APIs

These APIs allow you to use the [`trace`, `vmTrace`, or `stateDiff`](../../reference/trace-types.md) diagnostic options when tracing calls or transactions.

To use the ad-hoc tracing APIs, the requested block or transaction must be within the number of [blocks retained](../../reference/cli/options.md#pruning-blocks-retained) with [pruning enabled](../../reference/cli/options.md#pruning-enabled) (by default, 1024).

The ad-hoc tracing APIs are:

- [`trace_call`](../../reference/api/index.md#trace_call)
- [`trace_callMany`](../../reference/api/index.md#trace_callmany)
- [`trace_rawTransaction`](../../reference/api/index.md#trace_rawtransaction)
- [`trace_replayBlockTransactions`](../../reference/api/index.md#trace_replayblocktransactions)

## Transaction-trace filtering APIs

These APIs allow you to filter and search by specific information such as the block, address, or transaction. These APIs only use the [`trace` type](../../reference/trace-types.md#trace).

To use the transaction-trace filtering APIs, your node must be an archive node (that is, synchronized without pruning or fast sync) or the requested block or transaction must be within the number of [blocks retained](../../reference/cli/options.md#pruning-blocks-retained) with [pruning enabled](../../reference/cli/options.md#pruning-enabled) (by default, 1024).

The transaction-trace filtering APIs are:

- [`trace_block`](../../reference/api/index.md#trace_block)
- [`trace_filter`](../../reference/api/index.md#trace_filter)
- [`trace_get`](../../reference/api/index.md#trace_get)
- [`trace_transaction`](../../reference/api/index.md#trace_transaction)
