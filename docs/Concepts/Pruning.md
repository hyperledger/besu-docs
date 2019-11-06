description: Pruning
<!--- END of page meta data -->

# Pruning

Use pruning on Mainnet to remove state tries that aren't necessary. Otherwise, the state will continue to grow, and storage will become a problem.

!!! Caution
    Do not use pruning if you plan to make [private transactions](Privacy/Privacy-Overview.md).

Before you enable pruning, ensure you have at least 600 GB of available space. To toggle pruning enablement, use the [`--pruning-enabled`](../Reference/CLI/CLI-Syntax.md#pruning-enabled) option.

Pruning might increase block import times, but it does not affect the ability of nodes to stay in sync.