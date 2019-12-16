description: Privacy
<!--- END of page meta data -->

# Privacy

Privacy in Besu refers to the ability to keep transactions private between the involved participants. 
Other participants cannot access the transaction content or list of participants.

!!! important
    For production systems requiring private transactions: 
        
    * We recommend using a network with a consensus mechanism supporting transaction finality. For example, 
    [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md).
    * Orion must be [highly available and run in a separate instance to Besu](../../HowTo/Use-Privacy/Run-Orion-With-Besu.md).
    
!!! important
    Using private transactions with [pruning](../Pruning.md) is not supported.

## Private Transaction Manager

Besu uses a Private Transaction Manager to implement privacy. For example, [Orion](http://docs.orion.pegasys.tech).  
Each Besu node that sends or receives private transactions requires an associated Orion node. 

![Orion Nodes](../../images/OrionNodes.png)

Private transactions are passed from the Besu node to the associated Orion node. The Orion node
encrypts and directly distributes (that is, point to point) the private transaction to Orion nodes 
participating in the transaction. 

!!! tip
    Private Transaction Managers are also known as Enclaves.  