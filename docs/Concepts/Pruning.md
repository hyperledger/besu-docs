description: Pruning
<!--- END of page meta data -->

# Pruning

Use pruning on Mainnet to remove state tries that aren't necessary. Otherwise, the state will continue to grow, and storage will become a problem.

!!! Caution
    Do not use pruning on private networks.

Command line options for configuring pruning include:

* [`--pruning-enabled`](../Reference/CLI/CLI-Syntax.md#pruning-enabled) to toggle enablement
* [`--pruning-block-confirmations`](../Reference/CLI/CLI-Syntax.md#pruning-block-confirmations) to specify the number of confirmations on blocks before they can be marked for pruning
* [`--pruning-blocks-retained`](../Reference/CLI/CLI-Syntax.md#pruning-blocks-retained) to specify the number of full state blocks to keep, in case of a reorg

Pruning might increase block import times, but it does not affect the ability of nodes to stay in sync.

To use pruning, ensure you have at least 600 GB of available space.