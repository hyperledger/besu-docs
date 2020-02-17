description: How to trace transactions
<!--- END of page meta data -->

# Trace Transactions 

Use the `TRACE` API to get detailed information about transaction processing. Enable the `TRACE` API using 
the [`-rpc-http-api`](../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or [`rpc-ws-api`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) 
command line options. 

Use the [`trace_replayBlockTransactions`](../../Reference/API-Methods.md#trace_replayblocktransactions) 
JSON RPC API method and specify the trace types required. Options are [`trace`, `vmTrace`, or `stateDiff`](../../Concepts/Transactions/Trace-Types.md). 

Your node must be either an archive node (that is, synchronised without using pruning or fast sync)
or the requested block must be within the last 1024 blocks. 

!!! important  
    The `TRACE` API is an early access feature in 1.4. The return values may change between v1.4 and
    v1.5. 