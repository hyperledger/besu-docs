---
description: Ethereum accounts used for Hyperledger Besu testing only on private networks
---

# Accounts for testing

You can use existing accounts for testing by including them in the genesis file for a private
network. Hyperledger Besu also provides predefined accounts for use in development mode.

## Development mode

When you start Besu with the [`--network=dev`](CLI/CLI-Syntax.md#network) command line option, Besu
uses the `dev.json` genesis file by default.

The `dev.json` genesis file defines the following accounts used for testing.

{!global/test_accounts.md!}

## Genesis file

To use existing test accounts, specify the accounts and balances in a genesis file for your test
network. For an example of how to define accounts in the genesis file, see
[`dev.json`](https://github.com/hyperledger/besu/blob/master/config/src/main/resources/dev.json).

To start Besu with the genesis file defining the existing accounts, use the
[`--genesis-file`](CLI/CLI-Syntax.md#genesis-file) command line option .
