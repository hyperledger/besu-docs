---
description: Hyperledger Besu EVM Tool Reference
---

# EVM Tool Reference

The Besu EVM Tool is a CLI program that executes arbitrary EVM programs and Ethereum State Tests
outside of the context of an operating node. Current uses include benchmarking and fuzz testing.

## Getting the EVM Tool

The Besu EVM Tool does not have a standard zip file distribution. End users will either need to
build from the source repository or use a pre-published docker image.

### Building from Source

To build from source run the following Gradle command from the root of the Besu repository.

```
./gradlew :ethereum:evmTool:installDist
```

This will create extractable archive files in `ethereum/evmtool/build/distributions` as well as an
executable installation in `ethereum/evmtool/build/install/evmtool`.

The EVM tool can be executed like this:

```bash
ethereum/evmtool/build/install/evmtool/bin/evm <evmtool options>
```

### Executing with Docker

To run Besu EVM Tool in a container the initial command is:

```bash
docker run -rm <docker options> hyperledger/besu-evmtool:develop <evmtool options>
```

- Because no data is stored in local directories we recommended the use of the `-rm` docker option.
  This will delete the container at the end of execution.
- If you use an option that requires input from standard in, use the `-i` docker option. This will
  pipe standard input to the EVM tool.
- If you need to reference files we recommend using a docker file binding, such as
  `-v ${PWD}:/opt/data`, which maps the current directory to the `/opt/data` directory in the
  container.

!!! note

    The `latest` tag will be the latest released version of Besu, starting with 1.5.3.  The `develop` tag will be the current main branch code that will be going into a future release version of Besu.

## EVM Tool Run Options

The first mode of the EVM tool is runs arbitrary EVM and is invoked without an extra command.  Command Line Options specify the code and other contextual information.

### code

=== "Syntax"

    ```bash
    --code=<code as hex string>
    ```

=== "Example"

    ```bash
    --code=5B600080808060045AFA50600056
    ```

The code to be executed, in compiled hex code form.  There is no default value, execution will fail if this is not set.

### gas

=== "Syntax"

    ```bash
    --gas=<gas as a decimal integer>
    ```

=== "Example"

    ```bash
    --gas=100000000
    ```

Amount of gas to make available to the EVM.  Default value is 10 Billion, an incredibly large number unlikely to be seen in any production blockchain.

### price

=== "Syntax"

    ```bash
    --price=<gas price in GWei as a decimal integer>
    ```

=== "Example"

    ```bash
    --price=10
    ```

Price of gas in GWei.  Default is zero.  If set to a non-zero value the sender account will need to have enough value to cover the gas fees.

### sender

=== "Syntax"

    ```bash
    --sender=<address>
    ```

=== "Example"

    ```bash
    --sender=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73
    ```

The account the invocation will be sent from.  This account needs to exist in the world state, which unless specified by `--genesis` or `--prestate` is the set of [accounts used for testing](Accounts-for-Testing.md).

### receiver

=== "Syntax"

    ```bash
    --receiver=<address>
    ```

=== "Example"

    ```bash
    --receiver=0x588108d3eab34e94484d7cda5a1d31804ca96fe7
    ```

The account the invocation will be sent from.  This account does not need to exist.

### input

=== "Syntax"

    ```bash
    --input=<hex binary>
    ```

=== "Example"

    ```bash
    --input=9064129300000000000000000000000000000000000000000000000000000000
    ```

The data passed into the call.  Corresponds to the `data` field of the transaction and is returned by the `CALLDATA` and related opcodes.

### value

=== "Syntax"

    ```bash
    --value=<Wei in decimal>
    ```

=== "Example"

    ```bash
    --value=1000000000000000000
    ```

The value of "ether" attached to this transaction.  For operations that query the value or transfer it to other accounts this is the amount that will be available.  This amount is not reduced to cover intrinsic cost and gas fees.

### json

=== "Syntax"

    ```bash
    --json=<boolean>
    ```

=== "Example"

    ```bash
    --json=true
    ```

Provide an operation by operation trace of the command in json when set to true.

### nomemory

=== "Syntax"

    ```bash
    --nomemory=<boolean>
    ```

=== "Example"

    ```bash
    --nomemory=true
    ```

When tracing operations the memory will be traced for each operation.  For memory heavy scripts setting this may reduce the volume of json output.

### genesis

=== "Syntax"

    ```bash
    --genesis=<path>
    ```

=== "Example"

    ```bash
    --genesis=/opt/besu/genesis.json
    ```

The Besu Genesis file to use when evaluating the EVM.  Most useful are the `alloc` items that set up accounts and their stored memory states.  For a complete description of this file see [Genesis File Items](Config-Items.md).

`--prestate` is a deprecated alternative option name.

### chain

=== "Syntax"

    ```bash
    --chain=<mainnet|ropsten|rinkeby|goerli|classic|mordor|kotti|dev>
    ```

=== "Example"

    ```bash
    --chain=goerli
    ```

The well-known network genesis file to use when evaluating the EVM.  These values are an alternative to the `--genesis` option for well known networks.

### repeat

=== "Syntax"

    ```bash
    --repeat=<integer>
    ```

=== "Example"

    ```bash
    --repeat=1000
    ```

Number of times to repeat the contract before gathering timing information.  This is useful when benchmarking EVM operations.

### revert-reason-enabled

=== "Syntax"

    ```bash
    --revert-reason-enabled=<boolean>
    ```

=== "Example"

    ```bash
    --revert-reason-enabled=true
    ```

Should the EVM execution track revert reasons?  If enabled the json tracing will include the reason included in `REVERT` operations.

### key-value-storage

=== "Syntax"

    ```bash
    --key-value-storage=<memory|rocksdb>
    ```

=== "Example"

    ```bash
    --key-value-storage=rocksdb
    ```

Kind of key value storage to use.

Occasionally it may be useful to execute isolated EVM calls in context of an actual world state.  The default is `memory` which executes the call only in context of the world provided by `--genesis` or `--network` at block zero.  When set to `rocksdb` and combined with `--data-path`, `--block-number`, and `--genesis` a Besu node that is not currently running can be used to use the appropriate world state for a transaction.  Useful when evaluating consensus failures.

### data-path

=== "Syntax"

    ```bash
    --data-path=<path>
    ```

=== "Example"

    ```bash
    --data-path=/opt/besu/data
    ```
When using `rocksdb` `key-value-storage` this is the location of the database on disk.

### block-number

=== "Syntax"

    ```bash
    --block-number=<integer>
    ```

=== "Example"

    ```bash
    --block-number=10000000
    ```

The block number to evaluate the code against.  This is useful to ensure that the EVM is evaluating the code against the correct fork, or to specify the specific world state when running with `rocksdb`.

## EVM Tool State Test Options

EVM Tool has a `stat-test` sub command that allows Ethereum State Tests to be evaluated.  Most of the options from EVM execution do not apply.

### Applicable Options

#### json

=== "Syntax"

    ```bash
    --json=<boolean>
    ```

=== "Example"

    ```bash
    --json=true
    ```

Provide an operation by operation trace of the command in json when set to true.  This option should be set for EVMLab Fuzzing.  Whether or not `json` is set a summary JSON object will be printed to standard output for each state test executed.


### Using command arguments

If you use command arguments you can list one or more state tests.  All of the state tests will be evaluated in the order they are specified.

=== "Docker Example"

    ```bash
    docker run --rm -v ${PWD}:/opt/referencetests hyperledger/besu-evmtool:develop --json state-test /opt/referencetests/GeneralStateTests/stExample/add11.json
    ```

=== "CLI Example"

    ```bash
    evm --json state-test stExample/add11.json
    ```

### Using Standard Input

If no reference tests are passed in via the command line the EvmTool will load one complete json object from standard input and execute that state test.

=== "Docker Example"

    ```bash
    docker run --rm  -i hyperledger/besu-evmtool:develop --json state-test < stExample/add11.json
    ```

=== "CLI Example"

    ```bash
    evm --json state-test < stExample/add11.json
    ```
