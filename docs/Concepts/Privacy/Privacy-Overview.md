---
description: Privacy
---

# Privacy

In Besu, privacy refers to the ability to keep transactions private between the involved
participants. Other participants cannot access the transaction content or list of participants.

!!! important
    For production systems requiring private transactions: 
        
    * We recommend using a network with a consensus mechanism supporting transaction finality. For example, 
    [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md).
    * Orion must be [highly available and run in a separate instance to Besu](../../HowTo/Use-Privacy/Run-Orion-With-Besu.md).
    
    Using private transactions with [pruning](../Pruning.md) or [fast sync](../../Reference/CLI/CLI-Syntax.md#sync-mode)
    is not supported.

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

!!! tip
    Private Transaction Managers are also known as Enclaves.

## Reorg Compatible Privacy

In v1.4, using private transactions in a network using a consensus mechanism 
where forks occur (that is, PoW or Clique) is an early access feature. For example, using private
transactions on Ropsten. 

Do not use private transctions in production networks using consensus mechanisms that fork.  

<!-- Links -->
[highly available and run in a separate instance to Besu]: ../../HowTo/Use-Privacy/Run-Orion-With-Besu.md
