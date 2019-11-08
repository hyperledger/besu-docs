description: Pruning
<!--- END of page meta data -->

# Pruning

Use pruning to reduce storage required for the world state size. Pruning removes state trie nodes that aren't required.

!!! Important
    Using pruning with [private transactions](Privacy/Privacy-Overview.md) is not supported.

To run a full sync to the Ethereum Mainnet with pruning enabled, we recommend approximately 750GB of available disk space per node. To enable pruning, use the [`--pruning-enabled`](../Reference/CLI/CLI-Syntax.md#pruning-enabled) option.

Pruning might increase block import times, but it does not affect the ability of nodes to stay in sync.