---
description: Hyperledger Besu EVM Tool
---

# EVM Tool

The Besu EVM Tool is a CLI program that executes arbitrary EVM programs and Ethereum State Tests
outside the context of an operating node. Use the EVM tool for benchmarking and fuzz testing.

## Getting the EVM Tool

The Besu EVM Tool does not have a standard zip file distribution. To use, you need to either
build from the source repository or use a pre-published docker image.

### Building from Source

To build from source, run the following from the root of the Besu repository:

```bash
./gradlew :ethereum:evmTool:installDist
```

An extractable archive files is created in `ethereum/evmtool/build/distributions` and an
executable installation in `ethereum/evmtool/build/install/evmtool`.

Execute the EVM tool:

```bash
ethereum/evmtool/build/install/evmtool/bin/evm <evmtool options>
```

### Executing with Docker

To run the Besu EVM Tool in a container:

```bash
docker run -rm <docker options> hyperledger/besu-evmtool:develop <evmtool options>
```

- Because no data is stored in local directories we recommended using the `-rm` docker option.
  The `-rm` option deletes the container at the end of execution.
- If you use an option that requires input from standard in, use the `-i` docker option. The `-i` option
  pipes standard input to the EVM tool.
- If you need to reference files we recommend using a docker file binding, such as
  `-v ${PWD}:/opt/data`, which maps the current directory to the `/opt/data` directory in the
  container.

!!! note

    The `latest` tag is the latest released version of Besu, starting with 1.5.3.  The `develop` tag
    is the current main branch code that will go into a future release version of Besu.

## EVM Tool Run Options

The first mode of the EVM Tool runs an arbitrary EVM and is invoked without an extra command.  [Command
Line Options](../../Reference/Evm-Tool.md) specify the code and other contextual information.

The EVM Tool also has a [`state-test` sub command](../../Reference/Evm-Tool.md#evm-tool-state-test-options)
that allows the Ethereum State Tests to be evaluated. Most of the options from EVM execution do not apply.

The [EVM Tool reference](../../Reference/Evm-Tool.md) provides more information on both modes.
