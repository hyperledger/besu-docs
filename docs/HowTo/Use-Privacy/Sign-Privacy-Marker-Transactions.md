---
description: How to sign a privacy marker transaction with Hyperledger Besu
---

# Signing privacy marker transactions

You can sign privacy marker transactions with either a random key or a specified key. To sign
privacy marker transactions with a specified private key, use
[`--privacy-marker-transaction-signing-key-file`](../../Reference/CLI/CLI-Syntax.md#privacy-marker-transaction-signing-key-file)
when starting Hyperledger Besu.

In networks where you pay gas, you must specify a key and the associated account must contain
adequate funds.

In [free gas networks](../../HowTo/Configure/FreeGas.md), to provide further anonimity by signing
each privacy marker transaction with a different random key, exclude the
[`--privacy-marker-transaction-signing-key-file`](../../Reference/CLI/CLI-Syntax.md#privacy-marker-transaction-signing-key-file)
command line option when starting Besu.

!!! caution "Using account permissioning and privacy"

    You cannot use [Account permissioning] with random key signing.

    If using account permissioning and privacy, a signing key must be specified using the
    [`--privacy-marker-transaction-signing-key-file`](../../Reference/CLI/CLI-Syntax.md#privacy-marker-transaction-signing-key-file)
    command line option and the signing key included in the accounts whitelist.

!!! note

    Besu signs privacy marker transactions during the
    [private transaction process](../../Concepts/Privacy/Private-Transaction-Processing.md).

<!-- Links -->
[Account permissioning]: ../../Concepts/Permissioning/Permissioning-Overview.md#account-permissioning
