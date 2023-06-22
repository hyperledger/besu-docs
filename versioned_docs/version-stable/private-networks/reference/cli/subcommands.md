---
title: Private network subcommands
sidebar_position: 2
description: Hyperledger Besu command line interface subcommands
tags:
  - private networks
---

# Private network subcommands

This reference describes the syntax of the Hyperledger Besu private network command line interface (CLI) subcommands.

:::danger

This reference contains subcommands that apply to only private networks. For subcommands that apply to both private and public networks, see the [public network subcommands reference](../../../public-networks/reference/cli/subcommands.md).

:::

To start a Besu node using subcommands, run:

```bash
besu [OPTIONS] [SUBCOMMAND] [SUBCOMMAND OPTIONS]
```

If using Bash or Z shell, you can view subcommand suggestions by pressing the Tab key twice.

```bash
besu Tab+Tab
```

## `operator`

Provides operator actions.

### `generate-blockchain-config`

<!--tabs-->

# Syntax

```bash
besu operator generate-blockchain-config --config-file=<FILE> --to=<DIRECTORY> [--genesis-file-name=<FILE>] [--private-key-file-name=<FILE>] [--public-key-file-name=<FILE>]
```

# Example

```bash
besu operator generate-blockchain-config --config-file=config.json --to=myNetworkFiles
```

<!--/tabs-->

Generates an [IBFT 2.0](../../how-to/configure/consensus/ibft.md#genesis-file) or [QBFT](../../how-to/configure/consensus/qbft.md#genesis-file) genesis file.

The configuration file has two nested JSON nodes. The first is the `genesis` property defining the IBFT 2.0 or QBFT genesis file, except for the `extraData` string. The second is the `blockchain` property defining the number of key pairs to generate.

## `rlp`

Provides RLP related actions.

### `encode`

<!--tabs-->

# Syntax

```bash
besu rlp encode [--from=<FILE>] [--to=<FILE>] [--type=<type>]
```

# File example

    ```bash
    besu rlp encode --from=ibft_extra_data.json --to=extra_data_for_ibft_genesis.txt --type=IBFT_EXTRA_DATA
    ```

# Standard input/output example

```bash
cat extra_data.json | besu rlp encode > rlp.txt
```

<!--/tabs-->

Encodes the RLP hexadecimal string for use in an [IBFT 2.0](../../how-to/configure/consensus/ibft.md#genesis-file) or [QBFT](../../how-to/configure/consensus/qbft.md#genesis-file) genesis file. The default type is `IBFT_EXTRA_DATA`.

Supported types are:

- `IBFT_EXTRA_DATA` - The IBFT 2.0 genesis file includes the `IBFT_EXTRA_DATA` type in the [`extraData`](../../how-to/configure/consensus/ibft.md#extra-data) property.

- `QBFT_EXTRA_DATA` - The QBFT genesis file includes the `QBFT_EXTRA_DATA` type in the [`extraData`](../../how-to/configure/consensus/qbft.md#extra-data) property.

## IBFT 2.0 extra data

To generate the RLP encoded `extraData` string, specify a JSON input that is an array of validator addresses in ascending order.

:::tip JSON Schema for IBFT_EXTRA_DATA

Use the following JSON Schema to validate that your JSON data is well formed. To validate your JSON content, use an online validation tool, such as [JSON Schema Validator](https://www.jsonschemavalidator.net/).

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://org.hyperledger.besu/cli_rlp_ibft_extra_data.json",
  "type": "array",
  "definitions": {},
  "title": "IBFT extra data",
  "description": "JSON format used as input to generate an IBFT extra data RLP string",
  "items": {
    "$id": "#/address",
    "type": "string",
    "title": "Validator address",
    "description": "The validator node address",
    "default": "",
    "examples": [
      "be068f726a13c8d46c44be6ce9d275600e1735a4",
      "5ff6f4b66a46a2b2310a6f3a93aaddc0d9a1c193"
    ],
    "pattern": "^([0-9a-f]{40})$"
  }
}
```

Example IBFT_EXTRA_DATA encoding

<!--tabs-->

# JSON input

```json
[
  "be068f726a13c8d46c44be6ce9d275600e1735a4",
  "5ff6f4b66a46a2b2310a6f3a93aaddc0d9a1c193"
]
```

# RLP output

```
0xf853a00000000000000000000000000000000000000000000000000000000000000000ea94be068f726a13c8d46c44be6ce9d275600e1735a4945ff6f4b66a46a2b2310a6f3a93aaddc0d9a1c193808400000000c0
```

<!--/tabs-->
