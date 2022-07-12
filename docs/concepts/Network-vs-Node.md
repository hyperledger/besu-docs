---
description: Configuring Besu at the network level compared to the node level
---

# Network vs node configuration

You can configure Besu at the network level and the node level.

Specify network-wide settings in the [genesis file](../reference/genesis-items.md). For example,
include `evmStackSize` or specify the
[consensus mechanism](Consensus-Protocols/Overview-Consensus.md).

Specify node settings on the command line or in the
[node configuration file](../how-to/configure/configuration-file.md). For example, enable
[JSON-RPC API methods](../reference/api/index.md) or specify the
[data directory](../reference/cli/options.md#data-path) for the node.
