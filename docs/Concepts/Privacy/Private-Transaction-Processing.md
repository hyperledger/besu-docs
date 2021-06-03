---
description: Private transaction processing
---

# Processing private transactions

!!! warning

    Orion features have been merged into Tessera!
    Read our [Orion to Tessera migration guide](https://docs.orion.consensys.net/en/latest/Tutorials/Migrating-from-Orion-to-Tessera/)
    and about all the [new Tessera features](https://consensys.net/blog/quorum/tessera-the-privacy-manager-of-choice-for-consensys-quorum-networks).

Processing private transactions involves the following:

* **Precompiled Contract**: A smart contract compiled from the source language to EVM bytecode and
  stored by an Ethereum node for later execution.

* **Privacy Marker Transaction**: A public Ethereum transaction with a payload of the enclave key.
  The enclave key is a pointer to the private transaction in Tessera. The `to` attribute of the Privacy
  Marker Transaction is the [address of the privacy precompiled contract](../../Reference/API-Methods.md#priv_getprivacyprecompileaddress).

  The Privacy Marker Transaction is
  [signed with a random key or the key specified on the command line].

Private transaction processing is illustrated and described in the following diagram.

![Processing Private Transactions](../../images/PrivateTransactionProcessing.png)

1. Submit a private transaction using
  [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction). The signed
  transaction includes transaction attributes specific to private transactions, including:

    * `privateFor` or `privacyGroupId` specifies the list of recipients
    * `privateFrom` specifies the sender
    * `restriction` specifies the transaction is of type
      [_restricted_](../Privacy/Privacy-Overview.md#private-transactions).

1. The JSON-RPC endpoint passes the private transaction to the Private Transaction Handler.

1. The Private Transaction Handler sends the private transaction to Tessera.

1. Tessera distributes the private transaction directly (that is, point-to-point) to the Tessera nodes
  specified in `privateFor` or belonging to the privacy group identified by `privacyGroupId`. All
  recipient Tessera nodes store the transaction. Tessera associates the stored transaction with the
  transaction hash and privacy group ID.

1. Tessera returns the transaction hash to the Private Transaction Handler.

1. The Private Transaction Handler creates a Privacy Marker Transaction for the private
  transaction. The Private Transaction Handler propagates the Privacy Marker Transaction using devP2P
  in the same way as a public Ethereum transaction.

    !!! tip
        If you want to sign the Privacy Marker Transaction outside of Besu, use
        [`priv_distributeRawTransaction`](../../HowTo/Send-Transactions/Creating-Sending-Private-Transactions.md#priv_distributerawtransaction)
        instead of
        [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction).

1. Besu mines the Privacy Marker Transaction into a block and the Privacy Marker Transaction is
  distributed to all Ethereum nodes in the network.

1. The Mainnet Transaction Processor processes the Privacy Marker Transaction in the same way as
  any other public transaction. On nodes containing the [privacy precompile contract](../../Reference/API-Methods.md#priv_getprivacyprecompileaddress)
  specified in the `to` attribute of the Privacy Marker Transaction, the Mainnet Transaction Processor passes the
  Privacy Marker Transaction to the privacy precompile contract.

    !!! note
        Nodes receiving the Privacy Marker Transaction that do not contain the privacy precompile
        contract specified in the Privacy Marker Transaction ignore the Privacy Marker Transaction.

1. The privacy precompile contract queries Tessera for the private transaction and privacy group ID
  using the transaction hash.

1. The privacy precompile contract passes the private transaction to the Private Transaction
  Processor. The privacy group ID specifies the private world state to use.

1. The Private Transaction Processor executes the transaction. The Private Transaction Processor
  can read and write to the private world state, and read from the public world state.

!!! important

    * We recommend using a network with a consensus mechanism supporting transaction finality. For example,
      [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md).
    * Tessera must be [highly available and run in a separate instance to Besu](../../HowTo/Use-Privacy/Run-Tessera-With-Besu.md).

    Using private transactions with [pruning](../Pruning.md) or [fast sync](../../Reference/CLI/CLI-Syntax.md#sync-mode)
    is not supported.

<!-- Links -->
[signed with a random key or the key specified on the command line]: ../../HowTo/Use-Privacy/Sign-Privacy-Marker-Transactions.md
[highly available and run in a separate instance to Besu]: ../../HowTo/Use-Privacy/Run-Tessera-With-Besu.md
