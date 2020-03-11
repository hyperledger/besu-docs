---
description: How to trace transactions
---

# Trace transactions

To get detailed information about transaction processing, use the
[`TRACE` API](../../Reference/API-Methods.md#trace-methods). Enable the
[`TRACE` API](../../Reference/API-Methods.md#trace-methods) using the
[`-rpc-http-api`](../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`rpc-ws-api`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) command line options.

To specify the trace types required, use the
[`trace_replayBlockTransactions`](../../Reference/API-Methods.md#trace_replayblocktransactions)
JSON RPC API method. Options are
[`trace`, `vmTrace`, or `stateDiff`](../../Concepts/Transactions/Trace-Types.md).

Your node must be an archive node (that is, synchronised without pruning or fast sync) or the
requested block must be within the last 1024 blocks.

!!! important

    The `TRACE` API is an early access feature in v1.4. The return values might change between v1.4
    and v1.5.