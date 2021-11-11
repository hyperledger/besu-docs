---
description: Hyperledger Besu EVM tool
---

# EVM tool

The Besu EVM tool is a CLI program that executes arbitrary EVM programs and Ethereum State Tests
outside the context of an operating node. Use the EVM tool for benchmarking and fuzz testing.

## Getting the EVM tool

The Besu EVM tool does not have a standard zip file distribution. To use, you need to either
build from the source repository or use a pre-published docker image.

### Building from source

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

To run the Besu EVM tool in a container:

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

## EVM tool run options

The first mode of the EVM tool runs an arbitrary EVM and is invoked without an extra command.  [Command
line options](../../Reference/Evm-Tool.md) specify the code and other contextual information.

The EVM tool also has a [`state-test` subcommand](../../Reference/Evm-Tool.md#state-test-options)
that allows the [Ethereum State Tests](https://github.com/ethereum/tests/tree/e102032ae30ef8ae0f0ec94b9cf37ac53c940cb2/GeneralStateTests) to be evaluated.
Most of the options from EVM execution do not apply.

=== "Syntax"

    ```bash
    evm state-test <state-test> --nomemory
    ```

=== "CLI example"

    ```bash
    evm state-test stExample/add11.json --nomemory
    ```
=== "Docker example"

    ```bash
    docker run --rm -v ${PWD}:/opt/referencetests hyperledger/besu-evmtool:develop state-test /opt/referencetests/GeneralStateTests/stExample/add11.json
    ```


The [EVM tool reference](../../Reference/Evm-Tool.md) provides more information on both modes.
