---
title: Use a configuration file
sidebar_position: 3
description: Specify options in the Besu configuration file.
tags:
  - public networks
  - private networks
---

# Use a configuration file

You can specify command line options in a TOML configuration file.
Save the configuration file and reuse it across node startups.
Specify the configuration file using the [`--config-file`](../../reference/cli/options.md#config-file) CLI option.

You can also [use a pre-configured profile](profile.md) for some common use cases.

:::note

The configuration file is used for node-level settings. You can specify network-wide settings in the [genesis file](../../concepts/genesis-file.md).

:::

## Configuration order of precedence

For options specified in multiple places, the order of precedence is as follows:

1. Command line
2. Environment variable
3. Configuration file specified by `--config-file`
4. [Pre-configured profile](profile.md) specified by `--profile`
5. Default values (used if no other configuration source is available)

For example, if you specify a `config.toml` configuration file and `staker` profile, and an option
is not found in the environment variables, Besu looks for it in `config.toml`.
If the option is not found in `config.toml`, Besu looks for it in `staker.toml`.
If the option is not found in `staker.toml`, Besu uses the default value for that option.

## TOML specification

The configuration file must be a valid TOML file composed of key/value pairs. Each key is the same as the corresponding command line option name without the leading dashes (`--`).

Values must conform to TOML specifications for string, numbers, arrays, and booleans. Specific differences between the command line and the TOML file format are:

- Comma-separated lists on the command line are string arrays in the TOML file.
- Enclose file paths, hexadecimal numbers, URLs, and &lt;host:port> values in quotes.

Table headings are ignored in TOML files. If you specify a valid Besu option under a table heading in the configuration file, Besu ignores the table heading and reads the option in the same way it does for options not under table headings.

:::tip

The [command line reference](../../reference/cli/options.md) includes configuration file examples for each option.

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
