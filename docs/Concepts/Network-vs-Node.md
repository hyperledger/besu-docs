description: Configuring Besu at the network level compared to the node level
<!--- END of page meta data -->

# Network vs node configuration

You can configure Besu at the network level and the node level.

Specify network-wide settings in the [genesis file](../Reference/Config-Items.md). For example,
include `evmStackSize` or specify the
[consensus mechanism](Consensus-Protocols/Overview-Consensus.md).

Specify node settings on the command line or in the
[node configuration file](../HowTo/Configure/Using-Configuration-File.md). For example, enable
[JSON-RPC API methods](../Reference/API-Methods.md) or specify the
[data directory](../Reference/CLI/CLI-Syntax.md#data-path) for the node.