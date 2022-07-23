---
description: Pruning concept information.
---

# Pruning

In Besu, pruning reduces the storage required by removing state trie nodes that are unreachable
from [recent blocks](../../public-networks/reference/cli/options.md#pruning-blocks-retained).

Pruning is disabled by default, and can be enabled with the
[`--pruning-enabled`](../../public-networks/reference/cli/options.md#pruning-enabled) command line option.

!!! Important

Using pruning with [private transactions] is not supported.

Pruning might increase block import times, but it does not affect the ability of nodes to stay in
sync.

!!! Important

Pruning is being deprecated for [Bonsai Tries] and is currently not being updated.
