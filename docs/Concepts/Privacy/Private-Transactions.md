---
description: Private transaction overview
---

# Private transactions

Private transactions have extra attributes to public Ethereum transactions:

* `privateFrom` - The Orion public key of the transaction sender
* `privateFor` - The Orion public keys of the transaction recipients, or
* `privacyGroupId` - [The privacy group to receive the transaction](Privacy-Groups.md)
* `restriction` - Whether the private transaction is `restricted` or `unrestricted`:
    * `restricted` private transactions, only the nodes participating in the transaction receive
      and store the payload of the private transaction.
    * `unrestricted` private transactions, all nodes in the network receive the payload of the
      private transaction, but only the nodes participating in the transaction can read the
      transaction.

    !!! important

        Besu implements `restricted` private transactions only.

The `gas` and `gasPrice` are used by the [privacy marker transaction] not the private
transaction itself.

For more information about creating and sending private transactions, see the
[How To documentation](../../HowTo/Send-Transactions/Creating-Sending-Private-Transactions.md).

## Besu and Orion keys

Besu and Orion nodes both have public/private key pairs identifying them. A Besu node sending a
private transaction to an Orion node signs the transaction with the Besu node private key. The
`privateFrom` and `privateFor` attributes specified in the RLP-encoded transaction string for
[`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction) are the public
keys of the Orion nodes sending and receiving the transaction.

!!! important

    The mapping of Besu node addresses to Orion node public keys is off-chain. That is, the sender
    of a private transaction must know the Orion node public key of the recipient.

## Nonces

[Private transaction processing](../../Concepts/Privacy/Private-Transaction-Processing.md) involves
two transactions, the private transaction distributed to involved participants and the
[privacy marker transaction] included on the public blockchain. Each each of these transactions has
its own nonce.

### Private transaction nonce

Besu maintains separate private states for each
[privacy group](../../Concepts/Privacy/Privacy-Groups.md). The private transaction nonce for an
account is specific to the privacy group. That is, the nonce for account A for privacy group ABC is
different to the nonce for account A for privacy group AB.

!!! note
    If sending more than one transaction for mining in the same block (that is, you are not waiting
    for the transaction receipt), you must calculate the private transaction nonce outside Besu.

### Privacy marker transaction nonce

The nonce for the [privacy marker transaction] is the public nonce for the account.

### Nonce validation

Unlike public transactions, private transactions are not submitted to the transaction pool. The private
transaction is distributed directly to the participants in the transaction and the privacy marker
transaction is submitted to the [transaction pool](../Transactions/Transaction-Pool.md).

Unlike [public transaction nonces](../Transactions/Transaction-Validation.md), private transaction
nonces are not validated when the private transaction is submitted. If a private transaction has an
incorrect nonce, the privacy marker transaction is still valid and is added to a block.  The
private transaction execution fails when [processing the privacy marker transaction](../Privacy/Private-Transaction-Processing.md)
for the private transaction with the incorrect nonce.

!!! tip

    The [web3js-eea library includes an example](https://github.com/PegaSysEng/web3js-eea/blob/master/example/concurrentPrivateTransactions/concurrentPrivateTransactions.js)
    of nonce management when sending multiple private transactions. The example calculates the
    correct nonces for the private transactions and privacy marker transactions outside of Besu.

<!-- links ---->

[privacy marker transaction]: ../../Concepts/Privacy/Private-Transaction-Processing.md

