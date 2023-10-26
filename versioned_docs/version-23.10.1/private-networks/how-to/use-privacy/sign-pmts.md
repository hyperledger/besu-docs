---
title: Sign privacy marker transactions
description: How to sign a privacy marker transaction with Hyperledger Besu
sidebar_position: 7
tags:
  - private networks
---

# Sign privacy marker transactions

You can sign privacy marker transactions (PMTs) with either a random key or a specified key. To sign privacy marker transactions with a specified private key, use [`--privacy-marker-transaction-signing-key-file`](../../reference/cli/options.md#privacy-marker-transaction-signing-key-file) when starting Hyperledger Besu.

:::note

The private key file can be the same file used by [`--node-private-key-file`](#node-private-key-file), or a different key file to identify who signed the privacy marker transaction.

:::

In networks where you pay gas, you must specify a key and the associated account must contain adequate funds.

In [free gas networks](../configure/free-gas.md), to provide further anonymity by signing each privacy marker transaction with a different random key, exclude the [`--privacy-marker-transaction-signing-key-file`](../../reference/cli/options.md#privacy-marker-transaction-signing-key-file) command line option when starting Besu.

:::caution "Using account permissioning and privacy"

You can't use [account permissioning] with random key signing.

If using account permissioning and privacy, a signing key must be specified using the [`--privacy-marker-transaction-signing-key-file`](../../reference/cli/options.md#privacy-marker-transaction-signing-key-file) command line option and the corresponding public key included in the accounts allowlist.

:::

:::note

Besu signs privacy marker transactions during the [private transaction process](../../concepts/privacy/private-transactions/processing.md).

:::

<!-- Links -->

[account permissioning]: ../../concepts/permissioning/index.md#account-permissioning
