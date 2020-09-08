---
description: Hyperledger Besu EVM Tool Reference
---

# EVM Tool Reference

Options for running:

* [Arbitrary EVM programs](#run-options)
* [Ethereum State Tests](#state-test-options).

## Run Options

The first mode of the EVM tool runs an arbitrary EVM and is invoked without an extra command. Command Line
Options specify the code and other contextual information.

### code

=== "Syntax"

    ```bash
    --code=<code as hex string>
    ```

=== "Example"

    ```bash
    --code=5B600080808060045AFA50600056
    ```

The code to be executed, in compiled hex code form.  There is no default value and execution fails if
this is not set.

### gas

=== "Syntax"

    ```bash
    --gas=<gas as a decimal integer>
    ```

=== "Example"

    ```bash
    --gas=100000000
    ```

Amount of gas to make available to the EVM.  The default value is 10 Billion, an incredibly large number
unlikely to be seen in any production blockchain.

### price

=== "Syntax"

    ```bash
    --price=<gas price in GWei as a decimal integer>
    ```

=== "Example"

    ```bash
    --price=10
    ```

Price of gas in GWei. The default is zero.  If set to a non-zero value, the sender account must have
enough value to cover the gas fees.

### sender

=== "Syntax"

    ```bash
    --sender=<address>
    ```

=== "Example"

    ```bash
    --sender=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73
    ```

The account the invocation is sent from.  The specified account must exist in the world state, which
unless specified by `--genesis` or `--prestate` is the set of [accounts used for testing](Accounts-for-Testing.md).

### receiver

=== "Syntax"

    ```bash
    --receiver=<address>
    ```

=== "Example"

    ```bash
    --receiver=0x588108d3eab34e94484d7cda5a1d31804ca96fe7
    ```

The account the invocation is sent to.  The specified account does not need to exist.

### input

=== "Syntax"

    ```bash
    --input=<hex binary>
    ```

=== "Example"

    ```bash
    --input=9064129300000000000000000000000000000000000000000000000000000000
    ```

The data passed into the call.  Corresponds to the `data` field of the transaction and is returned by
the `CALLDATA` and related opcodes.

### value

=== "Syntax"

    ```bash
    --value=<Wei in decimal>
    ```

=== "Example"

    ```bash
    --value=1000000000000000000
    ```

The value of Ether attached to this transaction.  For operations that query the value or transfer it
to other accounts this is the amount that is available.  The amount is not reduced to cover intrinsic
cost and gas fees.

### json

=== "Syntax"

    ```bash
    --json=<boolean>
    ```

=== "Example"

    ```bash
    --json=true
    ```

Provide an operation-by-operation trace of the command in json when set to true.

### nomemory

=== "Syntax"

    ```bash
    --nomemory=<boolean>
    ```

=== "Example"

    ```bash
    --nomemory=true
    ```

By default, when tracing operations the memory is traced for each operation.  For memory heavy scripts,
setting this option may reduce the volume of json output.

### genesis

=== "Syntax"

    ```bash
    --genesis=<path>
    ```

=== "Example"

    ```bash
    --genesis=/opt/besu/genesis.json
    ```

The Besu Genesis file to use when evaluating the EVM.  Most useful are the `alloc` items that set up
accounts and their stored memory states.  For a complete description of this file see [Genesis File Items](Config-Items.md).

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

The well-known network genesis file to use when evaluating the EVM.  These values are an alternative
to the `--genesis` option for well known networks.

### repeat

=== "Syntax"

    ```bash
    --repeat=<integer>
    ```

=== "Example"

    ```bash
    --repeat=1000
    ```

Number of times to repeat the contract before gathering timing information.  This is useful when benchmarking
EVM operations.

### revert-reason-enabled

=== "Syntax"

    ```bash
    --revert-reason-enabled=<boolean>
    ```

=== "Example"

    ```bash
    --revert-reason-enabled=true
    ```

If enabled, the json tracing includes the reason included in `REVERT` operations.

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

Occasionally it may be useful to execute isolated EVM calls in context of an actual world state.
The default is `memory`, which executes the call only in context of the world provided by `--genesis`
or `--network` at block zero.  When set to `rocksdb` and combined with `--data-path`, `--block-number`,
and `--genesis` a Besu node that is not currently running can be used to provide the appropriate world state
for a transaction.  Useful when evaluating consensus failures.

### data-path

=== "Syntax"

    ```bash
    --data-path=<path>
    ```

=== "Example"

    ```bash
    --data-path=/opt/besu/data
    ```

When using `rocksdb` for `key-value-storage`, specifies the location of the database on disk.

### block-number

=== "Syntax"

    ```bash
    --block-number=<integer>
    ```

=== "Example"

    ```bash
    --block-number=10000000
    ```

The block number to evaluate the code against.  Used to ensure that the EVM is evaluating the
code against the correct fork, or to specify the specific world state when running with `rocksdb` for `key-value-storage`.

## State Test Options

The `state-test` sub command allows the Ethereum State Tests to be evaluated.  Most of the options
from EVM execution do not apply.

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

Provide an operation by operation trace of the command in json when set to true.  Set to true for EVMLab
Fuzzing.  Whether or not `json` is set, a summary JSON object is printed to standard output for each
state test executed.

### Using command arguments

If you use command arguments, you can list one or more state tests.  All of the state tests are evaluated
in the order they are specified.

=== "Docker Example"

    ```bash
    docker run --rm -v ${PWD}:/opt/referencetests hyperledger/besu-evmtool:develop --json state-test /opt/referencetests/GeneralStateTests/stExample/add11.json
    ```

=== "CLI Example"

    ```bash
    evm --json state-test stExample/add11.json
    ```

### Using Standard Input

If no reference tests are passed in using the command line, the EVM Tool loads one complete json object
from standard input and executes that state test.

=== "Docker Example"

    ```bash
    docker run --rm  -i hyperledger/besu-evmtool:develop --json state-test < stExample/add11.json
    ```

=== "CLI Example"

    ```bash
    evm --json state-test < stExample/add11.json
    ```