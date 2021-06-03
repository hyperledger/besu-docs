---
description: Private transaction overview
---

# Private transactions

!!! warning

    Orion features have been merged into Tessera!
    Read our [Orion to Tessera migration guide](https://docs.orion.consensys.net/en/latest/Tutorials/Migrating-from-Orion-to-Tessera/)
    and about all the [new Tessera features](https://consensys.net/blog/quorum/tessera-the-privacy-manager-of-choice-for-consensys-quorum-networks).

Private transactions have extra attributes to public Ethereum transactions:

* `privateFrom` - The Tessera public key of the transaction sender
* `privateFor` - The Tessera public keys of the transaction recipients, or
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

## Besu and Tessera keys

Besu and Tessera nodes both have public/private key pairs identifying them. A Besu node sending a
private transaction to a Tessera node signs the transaction with the Besu node private key. The
`privateFrom` and `privateFor` attributes specified in the RLP-encoded transaction string for
[`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction) are the public
keys of the Tessera nodes sending and receiving the transaction.

!!! important

    The mapping of Besu node addresses to Tessera node public keys is offchain. That is, the sender
    of a private transaction must know the Tessera node public key of the recipient.

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

A nonce is the number of previous transactions made by the sender.

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
incorrect nonce, the privacy marker transaction is still valid and is added to a block.
The private transaction execution fails when [processing the privacy marker transaction](../Privacy/Private-Transaction-Processing.md)
for the private transaction with the incorrect nonce.

!!! tip

    The [web3js-eea library includes an example](https://github.com/ConsenSys/web3js-eea/blob/master/example/concurrentPrivateTransactions/concurrentPrivateTransactions.js)
    of nonce management when sending multiple private transactions. The example calculates the
    correct nonces for the private transactions and privacy marker transactions outside of Besu.

The following private transaction flow illustrates when nonce validation occurs:

1. Submit a private transaction with a [nonce value](#private-transaction-nonce).
1. The private transaction is distributed to all participants in the privacy group.
1. The privacy marker transaction is created and submitted to the transaction pool with a nonce of `0`
    if using one time accounts. If using a specific account with
    [`--privacy-marker-transaction-signing-key-file`](../../Reference/CLI/CLI-Syntax.md#privacy-marker-transaction-signing-key-file), the
    nonce for that account is obtained and used for the privacy marker transaction.
1. The privacy marker transaction is mined and included in the block.
1. After the block containing the privacy marker transaction is imported, and the privacy marker
    transaction is processed, the private transaction is retrieved from the private transaction manager
    and executed.

    If the private transaction was submitted with a correct nonce in step 1, the nonce is
    validated as correct, if an incorrect nonce was submitted, the private transaction execution
    fails.

<!-- links ---->
[privacy marker transaction]: ../../Concepts/Privacy/Private-Transaction-Processing.md
