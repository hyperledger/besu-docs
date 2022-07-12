---
description: Creating and sending concurrent private transactions with Hyperledger Besu
---

# Sending concurrent private transactions

Private transaction processing involves two transactions, the private transaction and the
[privacy marker transaction (PMT)](../../concepts/privacy/private-transactions/processing.md).
The private transaction and the PMT each have their own [nonce](../../concepts/privacy/private-transactions/index.md#nonces).

If your private transaction rate requires sending private transactions without waiting for the previous
private transaction to be mined, using [`eth_getTransactionCount`](../../../reference/api/index.md#eth_gettransactioncount)
and [`eea_sendRawTransaction`](../../../reference/api/index.md#eea_sendrawtransaction) may result in
[incorrect nonces](../../concepts/privacy/private-transactions/index.md#private-nonce-management).

In this case, use [`priv_distributeRawTransaction`](private-transactions.md#priv_distributerawtransaction)
instead of [`eea_sendRawTransaction`](../../../reference/api/index.md#eea_sendrawtransaction).

!!! note

    You can use [`priv_getTransactionCount`](../../Reference/API-Methods.md#priv_gettransactioncount) or
    [`priv_getEeaTransactionCount`](../../Reference/API-Methods.md#priv_geteeatransactioncount) to get the nonce for
    an account for the specified privacy group or participants.

Send the corresponding PMT using [`eth_sendRawTransaction`](../../../reference/api/index.md#eth_sendrawtransaction),
specifying the public PMT nonce.
This method allows you to create and send the PMT yourself rather than
[`eea_sendRawTransaction`](../../../reference/api/index.md#eea_sendrawtransaction) handling the PMT.

!!! important

    When using `priv_distributeRawTransaction` to distribute transactions with consecutive nonces for the same account,
    the corresponding PMTs must use one account with the nonces in the same order as the private transactions.
    This is to ensure that the private transactions are executed in the correct order.

!!! example

    The [web3js-quorum library](https://github.com/ConsenSys/web3js-quorum/tree/master/example/concurrentPrivateTransactions)
    includes an example of how to send concurrent private transactions.
    The example uses [offchain privacy groups](../../Concepts/Privacy/Privacy-Groups.md).
    Use [`priv_getPrivacyPrecompileAddress`](../../Reference/API-Methods.md#priv_getprivacyprecompileaddress) to get the
    precompile address to specify in the `to` field when creating the PMT.
