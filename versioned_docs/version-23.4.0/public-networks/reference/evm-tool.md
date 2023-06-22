---
title: EVM tool options
sidebar_position: 5
description: Hyperledger Besu EVM tool reference
tags:
  - private networks
---

# EVM tool reference

This reference describes options for running the following [using the EVM tool](../how-to/troubleshoot/evm-tool.md):

- [Arbitrary EVM programs](#run-options)
- [Ethereum state tests](#state-test-options)
- [Ethereum object formatted code](#eof-code-validation)

:::note

Option names that include `trace`, such as [`--trace`](#json-trace) and [`--trace.[no]memory`](#nomemory-tracenomemory) exist to support [`t8ntool`](https://ethereum-tests.readthedocs.io/en/latest/t8ntool.html) reference testing, and are interchangeable with their standard option names.

:::

## Run options

The first mode of the EVM tool runs an arbitrary EVM and is invoked without an extra command. Command line options specify the code and other contextual information.

### `code`

<!--tabs-->

# Syntax

```bash
--code=<code>
```

# Example

```bash
--code=5B600080808060045AFA50600056
```

<!--/tabs-->

The code to be executed, in compiled hex code form. Execution fails if this is not set.

### `gas`

<!--tabs-->

# Syntax

```bash
--gas=<integer>
```

# Example

```bash
--gas=100000000
```

<!--/tabs-->

Amount of gas to make available to the EVM. The default is 10 billion, a number unlikely to be seen in any production blockchain.

### `price`

<!--tabs-->

# Syntax

```bash
--price=<integer>
```

# Example

```bash
--price=10
```

<!--/tabs-->

Price of gas in Gwei. The default is `0`. If set to a non-zero value, the sender account must have enough value to cover the gas fees.

### `sender`

<!--tabs-->

# Syntax

```bash
--sender=<address>
```

# Example

```bash
--sender=0xfe3b557e8fb62b89f4916b721be55ceb828dbd73
```

<!--/tabs-->

The account the invocation is sent from. The specified account must exist in the world state, which, unless specified by [`--genesis`](#genesis), is the set of [accounts used for testing](../../private-networks/reference/accounts-for-testing.md).

### `receiver`

<!--tabs-->

# Syntax

```bash
--receiver=<address>
```

# Example

```bash
--receiver=0x588108d3eab34e94484d7cda5a1d31804ca96fe7
```

<!--/tabs-->

The account the invocation is sent to. The specified account does not need to exist.

### `input`

<!--tabs-->

# Syntax

```bash
--input=<code>
```

# Example

```bash
--input=9064129300000000000000000000000000000000000000000000000000000000
```

<!--/tabs-->

The data passed into the call. Corresponds to the `data` field of the transaction and is returned by the `CALLDATA` and related opcodes.

### `value`

<!--tabs-->

# Syntax

```bash
--value=<integer>
```

# Example

```bash
--value=1000000000000000000
```

<!--/tabs-->

The value, in wei, attached to this transaction. For operations that query the value or transfer it to other accounts this is the amount that is available. The amount is not reduced to cover intrinsic cost and gas fees.

### `json`, `trace`

<!--tabs-->

# Syntax

```bash
--json
```

<!--/tabs-->

Provides an operation-by-operation trace of the command in JSON.

`--trace` is an alias for `--json`.

### `json-alloc`

<!--tabs-->

# Syntax

```bash
--json-alloc
```

<!--/tabs-->

Outputs a JSON summary of the post-execution world state and allocations.

### `[no]memory`, `trace.[no]memory`

<!--tabs-->

# Syntax

```bash
--nomemory, --memory
```

<!--/tabs-->

Setting `--nomemory` disables tracing the memory output for each operation. Setting `--memory` enables it. Memory traces are disabled by default.

For memory heavy scripts, disabling memory traces may reduce the volume of JSON output.

`--trace.[no]memory` is an alias for `--[no]memory`.

### `trace.[no]stack`

<!--tabs-->

# Syntax

```bash
--trace.nostack, --trace.stack
```

<!--/tabs-->

Setting `--trace.nostack` disables tracing the operand stack for each operation. Setting `--trace.stack` enables it. Stack traces are enabled by default.

### `trace.[no]returndata`

<!--tabs-->

# Syntax

```bash
--trace.noreturndata, --trace.returndata
```

<!--/tabs-->

Setting `--trace.noreturndata` disables tracing the return data for each operation. Setting `--trace.returndata` enables it. Return data traces are enabled by default.

### `[no]time`

<!--tabs-->

# Syntax

```bash
--notime, --time
```

<!--/tabs-->

Setting `--notime` disables including time data in the summary output. Setting `--time` enables it.

This is useful for testing and differential evaluations.

### `genesis`

<!--tabs-->

# Syntax

```bash
--genesis=<path>
```

# Example

```bash
--genesis=/opt/besu/genesis.json
```

<!--/tabs-->

The [Besu genesis file](genesis-items.md) to use when evaluating the EVM. Most useful are the `alloc` items that set up accounts and their stored memory states.

`--prestate` is a deprecated alias for `--genesis`.

### `chain`

<!--tabs-->

# Syntax

```bash
--chain=<mainnet|goerli|sepolia|dev|classic|mordor|kotti|astor>
```

# Example

```bash
--chain=goerli
```

<!--/tabs-->

The well-known network genesis file to use when evaluating the EVM. These values are an alternative to the [`--genesis`](#genesis) option for well-known networks.

### `repeat`

<!--tabs-->

# Syntax

```bash
--repeat=<integer>
```

# Example

```bash
--repeat=1000
```

<!--/tabs-->

Number of times to repeat the contract before gathering timing information. This is useful when benchmarking EVM operations. The default is `0`.

### `revert-reason-enabled`

<!--tabs-->

# Syntax

```bash
--revert-reason-enabled
```

<!--/tabs-->

Enables tracing the reason included in `REVERT` operations. The revert reason is enabled by default.

### `fork`

<!--tabs-->

# Syntax

```bash
--fork=<string>
```

# Example

```bash
--fork=FutureEips
```

<!--/tabs-->

Specific fork to evaluate, overriding network settings.

### `key-value-storage`

<!--tabs-->

# Syntax

```bash
--key-value-storage=<memory|rocksdb>
```

# Example

```bash
--key-value-storage=rocksdb
```

<!--/tabs-->

Kind of key value storage to use.

It might be useful to execute isolated EVM calls in the context of an actual world state. The default is `memory`, which executes the call only in the context of the world provided by [`--genesis`](#genesis) or [`--chain`](#chain) at block zero.

When set to `rocksdb` and combined with [`--data-path`](#data-path), [`--block-number`](#block-number), and [`--genesis`](#genesis), a Besu node that isn't currently running can be used to provide the appropriate world state for a transaction. This is useful when evaluating consensus failures.

### `data-path`

<!--tabs-->

# Syntax

```bash
--data-path=<path>
```

# Example

```bash
--data-path=/opt/besu/data
```

<!--/tabs-->

When [`--key-value-storage`](#key-value-storage) is set to `rocksdb`, specifies the location of the database on disk.

### `block-number`

<!--tabs-->

# Syntax

```bash
--block-number=<integer>
```

# Example

```bash
--block-number=10000000
```

<!--/tabs-->

The block number to evaluate the code against. Used to ensure that the EVM is evaluating the code against the correct fork, or to specify the world state when [`--key-value-storage`](#key-value-storage) is set to `rocksdb`.

### `version`

<!--tabs-->

# Syntax

```bash
--version
```

<!--/tabs-->

Displays the version information.

`-v` is an alias for `--version`.

## State test options

The `state-test` subcommand allows the [Ethereum state tests](https://github.com/ethereum/tests/tree/develop/GeneralStateTests) to be evaluated. The only applicable options are `--json` and `--nomemory`.

### `json`, `trace`

<!--tabs-->

# Syntax

```bash
--json
```

<!--/tabs-->

Provides an operation-by-operation trace of the command in JSON.

Set this option for EVM Lab Fuzzing. Whether or not `--json` is set, a summary JSON object is printed to standard output for each state test executed.

`--trace` is an alias for `--json`.

### `[no]memory`, `trace.[no]memory`

<!--tabs-->

# Syntax

```bash
--[no]memory
```

<!--/tabs-->

Setting `--nomemory` disables tracing the memory output for each operation. Setting `--memory` enables it. Memory traces are disabled by default.

For memory heavy scripts, disabling memory traces may reduce the volume of JSON output.

`--trace.[no]memory` is an alias for `--[no]memory`.

### Use command arguments

If you use command arguments, you can list one or more state tests. All the state tests are evaluated in the order they are specified.

<!--tabs-->

# Docker example

```bash
docker run --rm -v ${PWD}:/opt/referencetests hyperledger/besu-evmtool:develop --json state-test /opt/referencetests/GeneralStateTests/stExample/add11.json
```

# CLI example

```bash
evm --json state-test stExample/add11.json
```

<!--/tabs-->

### Use standard input

If no reference tests are passed in using the command line, the EVM tool loads one complete JSON object from standard input and executes that state test.

<!--tabs-->

# Docker example

```bash
docker run --rm -i hyperledger/besu-evmtool:develop --json state-test < stExample/add11.json
```

# CLI example

```bash
evm --json state-test < stExample/add11.json
```

<!--/tabs-->

## EOF code validation

The `code-validate` subcommand allows [Ethereum object formatted (EOF)](https://eips.ethereum.org/EIPS/eip-3540) code to be validated. It accepts candidate EOF containers or EVM bytecode using the `--file` option, command arguments, or standard input.

### `file`

<!--tabs-->

# Syntax

```bash
--file=<file>
```

# Example

```bash
--file=eof.txt
```

<!--/tabs-->

File containing one or more EOF containers or EVM bytecode. Each line in the file is considered a separate program.

### Use command arguments

If you use command arguments, each argument is considered a separate program. If a code segment includes spaces, it must be contained in quotes.

<!--tabs-->

# Docker example

```bash
docker run --rm hyperledger/besu-evmtool:develop code-validate "0xef0001 010008 020002-0007-0002 030000 00 00000002-02010002 59-59-b00001-50-b1 03-b1" 0xef0002 0xef00010100040200010001030000000000000000
```

# CLI example

```bash
evm code-validate "0xef0001 010008 020002-0007-0002 030000 00 00000002-02010002 59-59-b00001-50-b1 03-b1" 0xef0002 0xef00010100040200010001030000000000000000
```

<!--/tabs-->

### Use standard input

If no reference tests are passed in using the command line, the EVM tool loads and validates code from standard input. Each line is considered a separate program. Comment lines and blanks are ignored.
