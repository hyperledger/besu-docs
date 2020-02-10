---
description: Privacy
---

# Privacy

In Besu, privacy refers to the ability to keep transactions private between the involved
participants. Other participants cannot access the transaction content or list of participants.

!!! important

    For production systems requiring private transactions:

    * It is recommended you use a network with a consensus mechanism supporting transaction
    finality, such as [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md).
    * Orion must be [highly available and run in a separate instance to Besu].

    Using private transactions with [pruning](../Pruning.md) is not supported.

## Private transaction manager

Besu uses a private transaction manager, [Orion](http://docs.orion.pegasys.tech), to implement
privacy. Each Besu node sending or receiving private transactions requires an associated Orion
node.

![Orion Nodes](../../images/OrionNodes.png)

Private transactions pass from the Besu node to the associated Orion node. The Orion node
encrypts and directly distributes (that is, point-to-point) the private transaction to the Orion
nodes participating in the transaction.

By default, each participant in a privacy network uses its own Besu and Orion node.
[Multi-tenancy](Multi-Tenancy.md) allows multiple participants to use the same Besu and Orion node.

By default, each participant in a privacy network uses its own Besu and Orion
node. [Multi-tenancy](Multi-Tenancy.md) allows multiple participants to use the same Besu and Orion
node.

By default, each participant in a privacy network uses its own Besu and Orion
node. [Multi-tenancy](Multi-Tenancy.md) allows multiple participants to use the same Besu and Orion
node.

!!! tip

    Private Transaction Managers are also refered to as Enclaves.

<!-- Links -->
[highly available and run in a separate instance to Besu]: ../../HowTo/Use-Privacy/Run-Orion-With-Besu.md
