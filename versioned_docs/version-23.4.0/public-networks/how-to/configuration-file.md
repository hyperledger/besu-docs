---
title: Use a configuration file
sidebar_position: 3
description: Using the Hyperledger Besu configuration file
tags:
  - private networks
---

# Use the Hyperledger Besu configuration file

To specify command line options in a file, use a TOML configuration file.

Save the configuration file and reuse it across node startups. To specify the configuration file, use the [`--config-file`](../reference/cli/options.md#config-file) option.

To override an option specified in the configuration file, either specify the same option on the command line or as an [environment variable](../reference/cli/options.md#specify-options). For options specified in more than one place, the order of precedence is command line, environment variable, configuration file.

:::note

The configuration file is used for node-level settings. You can specify network-wide settings in the [genesis file](../concepts/genesis-file.md).

:::

## TOML specification

The configuration file must be a valid TOML file composed of key/value pairs. Each key is the same as the corresponding command line option name without the leading dashes (`--`).

Values must conform to TOML specifications for string, numbers, arrays, and booleans. Specific differences between the command line and the TOML file format are:

- Comma-separated lists on the command line are string arrays in the TOML file.
- Enclose file paths, hexadecimal numbers, URLs, and &lt;host:port> values in quotes.

:::tip

The [command line reference](../reference/cli/options.md) includes configuration file examples for each option.

:::

```toml title="Sample TOML configuration file"
# Valid TOML config file
data-path="~/besudata" # Path

# Network
bootnodes=["enode://001@123:4567", "enode://002@123:4567", "enode://003@123:4567"]

p2p-host="1.2.3.4"
p2p-port=1234
max-peers=42

rpc-http-host="5.6.7.8"
rpc-http-port=5678

rpc-ws-host="9.10.11.12"
rpc-ws-port=9101

# Chain
genesis-file="~/genesis.json" # Path to the custom genesis file

# Mining
miner-enabled=true
miner-coinbase="0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
```

```bash title="Starting Besu with a configuration file"
besu --config-file=/home/me/me_node/config.toml
```
