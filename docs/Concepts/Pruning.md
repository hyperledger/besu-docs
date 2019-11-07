description: Pruning
<!--- END of page meta data -->

# Pruning

As the number of transactions increases, the world state grows, and storage can become a problem. Use pruning on any network to remove state tries that aren't necessary.

!!! Caution
    If you plan to use [private transactions](Privacy/Privacy-Overview.md), do not use pruning.

A full sync to the Ethereum Mainnet with pruning enabled requires 600GB of disk space. To enable pruning, use the [`--pruning-enabled`](../Reference/CLI/CLI-Syntax.md#pruning-enabled) option.

Pruning might increase block import times, but it does not affect the ability of nodes to stay in sync.