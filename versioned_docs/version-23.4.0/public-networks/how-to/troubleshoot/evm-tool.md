---
title: Use EVM tool
sidebar_position: 1
description: Hyperledger Besu EVM tool
tags:
  - private networks
---

# Use the EVM tool

The Besu EVM tool is a CLI program that executes arbitrary EVM programs and Ethereum State Tests outside the context of an operating node. Use the EVM tool for benchmarking and fuzz testing.

## Get the EVM tool

The Besu EVM tool does not have a standard zip file distribution. To use, you need to either build from the source repository or use a pre-published docker image.

### Build from source

To build from source, run the following from the root of the Besu repository:

```bash
./gradlew :ethereum:evmTool:installDist
```

An extractable archive files is created in `ethereum/evmtool/build/distributions` and an executable installation in `ethereum/evmtool/build/install/evmtool`.

Execute the EVM tool:

```bash
ethereum/evmtool/build/install/evmtool/bin/evm <evmtool options>
```

### Execute with Docker

To run the Besu EVM tool in a container:

```bash
docker run -rm <docker options> hyperledger/besu-evmtool:develop <evmtool options>
```

- Because no data is stored in local directories we recommended using the `-rm` docker option. The `-rm` option deletes the container at the end of execution.
- If you use an option that requires input from standard in, use the `-i` docker option. The `-i` option pipes standard input to the EVM tool.
- If you need to reference files we recommend using a docker file binding, such as `-v ${PWD}:/opt/data`, which maps the current directory to the `/opt/data` directory in the container.

:::note

The `latest` tag is the latest released version of Besu, starting with 1.5.3. The `develop` tag is the current main branch code that will go into a future release version of Besu.

:::

## EVM tool run options

The first mode of the EVM tool runs an arbitrary EVM and is invoked without an extra command. [Command line options](../../reference/evm-tool.md) specify the code and other contextual information.

The EVM tool also has a [`state-test` subcommand](../../reference/evm-tool.md#state-test-options) that allows [Ethereum state tests](https://github.com/ethereum/tests/tree/develop/GeneralStateTests) to be evaluated, and a [`code-validate` subcommand](../../reference/evm-tool.md#eof-code-validation) that allows [Ethereum object formatted (EOF)](https://eips.ethereum.org/EIPS/eip-3540) code to be validated. Most of the options from EVM execution don't apply.

<!--tabs-->

# `state-test`

```bash
evm state-test <state-test> --nomemory
```

# `code-validate`

```bash
evm code-validate --file <file>
```

<!--/tabs-->

The [EVM tool reference](../../reference/evm-tool.md) provides more information on these modes.
