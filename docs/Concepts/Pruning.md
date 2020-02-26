description: Pruning
<!--- END of page meta data -->

# Pruning

Use pruning to reduce storage required for the world state. Pruning removes state trie nodes that
are not required.

!!! Important
    Using pruning with [private transactions](Privacy/Privacy-Overview.md) is not supported.

Running a full sync to the Ethereum Mainnet with pruning enabled requires about 700GB of available
disk space. To enable pruning, use the
[`--pruning-enabled`](../Reference/CLI/CLI-Syntax.md#pruning-enabled) option.

Pruning might increase block import times, but it does not affect the ability of nodes to stay in
sync.
