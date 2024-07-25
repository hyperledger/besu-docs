---
title: Configure Besu
description: Specify options in the Besu configuration file.
tags:
  - public networks
  - private networks
---

Besu is [highly-configurable](index.md#configuration-order-of-precedence), yet its [default configurations](#besu-defaults) provide a viable boilerplate.

A TOML configuration file is used to simplify overriding the default configuration settings and reuse of configurations across node startups.

Specify the configuration file using the [`--config-file`](../../reference/cli/options.md#config-file) CLI option. Both the default configuration and configuration files may be [used alongside a pre-configured profile](profile.md) for some common use cases.

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
## Besu defaults

Presented below is a high level overview of the opinionated default configurations of vanilla Besu. By applying the defaults, a node is optimized for staking. These defaults may be extended with a [pre-configured profile](profile.md) to support common use cases.

For example, using the [Staker profile](profile.md#staker-profile) with the boilerplate config directs Besu to use Mainnet, creating a staking-optimized node ready to run with a [validator](https://ethereum.org/en/developers/docs/nodes-and-clients/node-architecture/#validators) and [consensus client](https://ethereum.org/en/developers/docs/nodes-and-clients/node-architecture/#consensus-client).

### Configuration

|Command|Default|Notes|
|---------------------------|--------------------|------------------------------------------|
|[`config-file`](../../reference/cli/options.md#config-file)|None|Vanilla Besu assumes no configuration file|


### Peering

|Command|Default|Notes|
|---------------------------|--------------------|------------------------------------------|
|[`discovery-enabled`](../../reference/cli/options.md#discovery-enabled)|True|Besu assumes the node will automatically discover other Ethereum nodes using P2P|
|[`p2p-enabled`](../../reference/cli/options.md#discovery-enabled)|True|Besu assumes the node will connect P2P|
|[`engine-rpc-enabled`](../../reference/cli/options.md#engine-rpc-enabled)|True|Besu assumes the Engine API will be required to communicate with the consensus layer|


### Storage

|Command|Default|Notes|
|---------------------------|--------------------|------------------------------------------|
|[`data-storage-format`](../../reference/cli/options.md#data-storage-format)|BONSAI|Besu applies the most space-efficient storage method|

### Sync

|Command|Default|Notes|
|---------------------------|--------------------|------------------------------------------|
|[`sync-mode`](../../reference/cli/options.md#sync-mode)|SNAP|Besu applies the [snap sync mode](../../get-started/connect/sync-node.md#snap-synchronization) as the most time-efficient sync method|

:::note
For a comprehensive understanding, all defaults are provided in the [reference](../../reference/cli/options.md).
:::