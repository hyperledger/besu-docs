---
description: How to trace transactions
---

# Trace transactions

To get detailed information about transaction processing, use the
[`TRACE` API](../../Reference/API-Methods.md#trace-methods). Enable the
[`TRACE` API](../../Reference/API-Methods.md#trace-methods) using the
[`-rpc-http-api`](../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`rpc-ws-api`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) command line options.

To specify the trace types required and retrieve the transaction traces for a block, use
[`trace_replayBlockTransactions`](../../Reference/API-Methods.md#trace_replayblocktransactions). Options are
[`trace`, `vmTrace`, or `stateDiff`](../../Reference/Trace-Types.md).

To retrieve the [`trace` type](../../Reference/Trace-Types.md#trace) for a specific:

* Block, use [`trace_block`](../../Reference/API-Methods.md#trace_block).
* Transaction, use [`trace_transaction`](../../Reference/API-Methods.md#trace_transaction). 

Your node must be an archive node (that is, synchronised without pruning or fast sync) or the
requested block or transaction must be within the [the number of pruning blocks retained](../../Reference/CLI/CLI-Syntax.md#pruning-blocks-retained)
(by default, 1024).

!!! important

    The `TRACE` API is an early access feature in v1.4. The return values might change between v1.4
    and v1.5.