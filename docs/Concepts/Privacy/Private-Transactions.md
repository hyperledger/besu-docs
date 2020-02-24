---
description: Private transaction overview
---

# Private transactions

Private transactions have additional attributes to public Ethereum transactions:

* `privateFrom` - The Orion public key of the transaction sender
* `privateFor` - The Orion public keys of the transaction recipients, or
* `privacyGroupId` - [The privacy group to receive the transaction](Privacy-Groups.md)
* `restriction` - Whether the private transaction is `restricted` or `unrestricted`. In:
   - `restricted` private transactions, only the nodes participating in the transaction receive
   and store the payload of the private transaction.
   - `unrestricted` private transactions, all nodes in the network receive the payload of the
   private transaction, but only the nodes participating in the transaction can read the
   transaction.

    !!! important
        Besu implements `restricted` private transactions only.

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