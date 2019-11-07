description: Pruning
<!--- END of page meta data -->

# Pruning

Use pruning to reduce storage required for the chain. As the number of transactions increases, the world state grows. Pruning removes state tries that aren't required.

!!! Caution
    If you plan to use [private transactions](Privacy/Privacy-Overview.md), do not use pruning.

A full sync to the Ethereum Mainnet with pruning enabled requires 750GB of disk space. To enable pruning, use the [`--pruning-enabled`](../Reference/CLI/CLI-Syntax.md#pruning-enabled) option.

Pruning might increase block import times, but it does not affect the ability of nodes to stay in sync.