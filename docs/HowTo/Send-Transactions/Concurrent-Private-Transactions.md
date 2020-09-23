---
description: Creating and sending concurrent private transactions with Hyperledger Besu
---

# Sending concurrent private transactions

Private transaction processing involves two transactions, the private transaction and the [privacy marker transaction].
The private transaction and the [privacy marker transaction] each have their [own nonce].

If your private transaction rate requires sending private transactions without waiting for the previous
private transaction to be mined, you must use [`priv_distributeRawTransaction`](../../Reference/API-Methods.md#priv_distributerawtransaction)
instead of [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction). When
using [`priv_distributeRawTransaction`](../../Reference/API-Methods.md#priv_distributerawtransaction)
you create and send the privacy marker transaction yourself rather than [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction)
handling the privacy marker transaction.

The [web3js-eea library](https://github.com/PegaSysEng/web3js-eea/blob/master/example/concurrentPrivateTransactions/concurrentPrivateTransactions.js)
includes an example of how to send concurrent private transactions.

!!! tip
    [The example](https://github.com/PegaSysEng/web3js-eea/blob/master/example/concurrentPrivateTransactions/concurrentPrivateTransactions.js)
    uses [offchain privacy groups](../../Concepts/Privacy/Privacy-Groups.md).
    Use [`priv_getPrivacyPrecompileAddress`](../../Reference/API-Methods.md#priv_getprivacyprecompileaddress)
    to get the precompile address to specify in the `to` field when creating the [privacy marker transaction].

<!-- links ---->

[privacy marker transaction]: ../../Concepts/Privacy/Private-Transaction-Processing.md
[own nonce]: ../../Concepts/Privacy/Private-Transactions.md#nonces
