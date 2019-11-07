description: Pruning
<!--- END of page meta data -->

# Pruning

As the number of transactions increases, the world state grows, and storage can become a problem. Use pruning on any network to remove state tries that aren't necessary.

!!! Caution
    Do not use pruning if you plan to make [private transactions](Privacy/Privacy-Overview.md).

For a full sync to the Ethereum Mainnet with pruning enabled requires 600GB of disk space. To enable pruning, use the [`--pruning-enabled`](../Reference/CLI/CLI-Syntax.md#pruning-enabled) option.

Pruning might increase block import times, but it does not affect the ability of nodes to stay in sync.