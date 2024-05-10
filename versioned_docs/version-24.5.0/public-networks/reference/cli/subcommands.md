---
title: Subcommands
description: Hyperledger Besu command line interface subcommands
sidebar_position: 2
tags:
  - public networks
  - private networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Subcommands

This reference describes the syntax of the Hyperledger Besu command line interface (CLI) subcommands.

:::note

This reference contains subcommands that apply to both public and private networks. For private-network-specific subcommands, see the [private network subcommands reference](../../../private-networks/reference/cli/subcommands.md).

:::

To start a Besu node using subcommands, run:

```bash
besu [OPTIONS] [SUBCOMMAND] [SUBCOMMAND OPTIONS]
```

If using Bash or Z shell, you can view subcommand suggestions by pressing the Tab key twice.

```bash
besu Tab+Tab
```

## `blocks`

Provides blocks related actions.

### `import`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
besu blocks import [--skip-pow-validation-enabled] [--start-block=<LONG>] [--end-block=<LONG>] --from=<block-file>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
besu blocks import --skip-pow-validation-enabled --start-block=100 --end-block=300 --from=/home/me/me_project/mainnet-export1.blocks --from=/home/me/me_project/mainnet-export2.blocks
```

</TabItem>

</Tabs>

Imports a block or range of blocks from the specified file into the blockchain database.

You can specify the starting index of the block range to import with `--start-block`. If omitted, the default start block is 0 (the beginning of the chain).

You can specify the ending index (exclusive) of the block range to import with `--end-block`. If omitted, all blocks after the start block are imported.

You can specify multiple `--from` arguments. This can be useful when blocks have been exported over time to multiple files. If multiple files are provided they are read in the order specified in the command.

Including `--skip-pow-validation-enabled` skips validation of the `mixHash` when importing blocks.

:::note

Use `--skip-pow-validation-enabled` when performing [Ethereum Foundation hive testing](https://github.com/ethereum/hive).

:::

### `export`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
besu blocks export [--start-block=<LONG>] [--end-block=<LONG>] --to=<block-file>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
besu --network=goerli --data-path=/home/data/ blocks export --start-block=100 --end-block=300 --to=/home/exportblock.bin
```

</TabItem>

</Tabs>

Exports a block or range of blocks from storage to a file in RLP format.

If you omit `--start-block`, the default start block is 0 (the beginning of the chain), and if you omit `--end-block`, the default end block is the current chain head.

If you are not running the command against the default network (Mainnet), specify the `--network` or `--genesis-file` parameter.

## `operator`

Provides operator actions.

### `generate-log-bloom-cache`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
besu operator generate-log-bloom-cache [--start-block=<BLOCK_NUMBER>] [--end-block=<BLOCK_NUMBER>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
besu --network=goerli --data-path=/project/goerli operator generate-log-bloom-cache --start-block=0 --end-block=100000
```

</TabItem>

</Tabs>

:::tip

Manually executing `generate-log-bloom-cache` is not required unless you set the [`--auto-log-bloom-caching-enabled`](options.md#auto-log-bloom-caching-enabled) command line option to false.

:::

Generates cached log bloom indexes for blocks. APIs use the cached indexes for improved log query performance.

:::note

Each index file contains 100000 blocks. The last fragment of blocks less that 100000 are not indexed.

:::

To generate cached log bloom indexes while the node is running, use the [`admin_generateLogBloomCache`](../api/index.md#admin_generatelogbloomcache) API.

## `password`

Provides password related actions.

### `hash`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
besu password hash --password=<my-password>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
besu password hash --password=myPassword123
```

</TabItem>

</Tabs>

Generates the hash of a given password. Include the hash in the [credentials file](../../how-to/use-besu-api/authenticate.md#credentials-file) for JSON-RPC API [authentication](../../how-to/use-besu-api/authenticate.md).

## `public-key`

Provides node public key related actions.

:::caution

To get the public key or address of a node, ensure you use the [`--data-path`](options.md#data-path) or [`--node-private-key-file`](options.md#node-private-key-file) option with the `public-key` command. Otherwise, a new [node key](../../concepts/node-keys.md) is silently generated when starting Besu.

:::

### `export`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
besu public-key export [--node-private-key-file=<file>] [--to=<key-file>] [--ec-curve=<ec-curve-name>]
```

</TabItem>

<TabItem value="Example to standard output" label="Example (to standard output)">

```bash
besu --data-path=<node data path> public-key export --node-private-key-file=/home/me/me_node/myPrivateKey --ec-curve=secp256k1
```

</TabItem>

<TabItem value="Example to file" label="Example (to file)"> 

```bash
besu --data-path=<node data path> public-key export --node-private-key-file=/home/me/me_node/myPrivateKey --to=/home/me/me_project/not_precious_pub_key --ec-curve=secp256k1
```

</TabItem>

</Tabs>

Outputs the node public key to standard output or to the file specified by `--to=<key-file>`. You can output the public key associated with a specific private key file using the [`--node-private-key-file`](options.md#node-private-key-file) option. The default elliptic curve used for the key is `secp256k1`. Use the `--ec-curve` option to choose between `secp256k1` or `secp256r1`.

### `export-address`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
besu public-key export-address [--node-private-key-file=<file>] [--to=<address-file>] [--ec-curve=<ec-curve-name>]
```

</TabItem>

<TabItem value="Example to standard output" label="Example (to standard output)">

```bash
besu --data-path=<node data path> public-key export-address --node-private-key-file=/home/me/me_node/myPrivateKey --ec-curve=secp256k1
```

</TabItem>

<TabItem value="Example to file" label="Example (to file)">

```bash
besu --data-path=<node data path> public-key export-address --node-private-key-file=/home/me/me_node/myPrivateKey --to=/home/me/me_project/me_node_address --ec-curve=secp256k1
```

</TabItem>

</Tabs>

Outputs the node address to standard output or to the file specified by `--to=<address-file>`. You can output the address associated with a specific private key file using the [`--node-private-key-file`](options.md#node-private-key-file) option. The default elliptic curve used for the key is `secp256k1`. Use the `--ec-curve` option to choose between `secp256k1` or `secp256r1`.

## `retesteth`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
besu retesteth [--data-path=<PATH>] [--rpc-http-host=<HOST>] [--rpc-http-port=<PORT>] [-l=<LOG VERBOSITY LEVEL>] [--host-allowlist=<hostname>[,<hostname>…]… or * or all]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
besu retesteth --data-path=/home/me/me_node --rpc-http-port=8590 --host-allowlist=*
```

</TabItem>

</Tabs>

Runs a Retesteth-compatible server. [Retesteth](https://github.com/ethereum/retesteth/wiki) is a developer tool that can generate and run consensus tests against any Ethereum client running such a server.

The command accepts the following command line options:

- [`--data-path`](options.md#data-path)
- [`--host-allowlist`](options.md#host-allowlist)
- [`--rpc-http-host`](options.md#rpc-http-host)
- [`--rpc-http-port`](options.md#rpc-http-port)
- [`--logging`](options.md#logging)

## `storage`

Provides storage related actions.

### `revert-metadata`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
besu storage revert-metadata v2-to-v1
```

</TabItem>

</Tabs>

Reverts the modifications made by the [database metadata refactor](https://github.com/hyperledger/besu/pull/6555).
If you need to downgrade Besu, run this subcommand before installing the previous binaries.

### `revert-variables`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
besu storage revert-variables --config-file <PATH-TO-CONFIG-FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
besu storage revert-variables --config-file ../besu-local-nodes/config/besu/besu1.conf
```

</TabItem>

</Tabs>

Reverts the modifications made by the [variables storage feature](https://github.com/hyperledger/besu/pull/5471).
If you need to downgrade Besu, first run this subcommand specifying the path to
the [configuration file](../../how-to/use-configuration-file/index.md) normally used to
start Besu.

## `validate-config`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
besu validate-config --config-file <PATH-TO-CONFIG-FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
besu validate-config --config-file ../besu-local-nodes/config/besu/besu1.conf
```

</TabItem>

</Tabs>

Performs basic syntax validation of the specified [configuration file](../../how-to/use-configuration-file/index.md). Checks TOML syntax (for example, valid format and unmatched quotes) and flags unknown options. Doesn't check data types, and doesn't check dependencies between options (this is done at Besu startup).
