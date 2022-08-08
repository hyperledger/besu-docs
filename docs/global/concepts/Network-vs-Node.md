---
description: Configuring Besu at the network level compared to the node level
---

# Network vs node configuration

You can configure Besu at the network level and the node level.

Specify network-wide settings in the [genesis file](../../public-networks/reference/genesis-items.md). For example,
include `evmStackSize` or specify the
[consensus mechanism](../../private-networks/how-to/configure/consensus/index.md).

Specify node settings on the command line or in the
[node configuration file](../../public-networks/how-to/configuration-file.md). For example, enable
[JSON-RPC API methods](../../public-networks/reference/api/index.md) or specify the
[data directory](../../public-networks/reference/cli/options.md#data-path) for the node.
