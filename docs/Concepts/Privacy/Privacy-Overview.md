description: Privacy
<!--- END of page meta data -->

# Privacy

Privacy in Besu refers to the ability to keep transactions private between the involved participants. 
Other participants cannot access the transaction content or list of participants.

!!! important
    For production systems requiring private transactions, we recommend using a network 
    with a consensus mechanism supporting transaction finality. For example, [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md).
    
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

## Availability 

Privacy requires the enclave to be highly available. 

All private transaction participants must be online for a private transaction to be successfully distributed.
If any participants are offline when the private transaction is submitted, the transaction is not attempted 
and must be resubmitted.

!!! caution
    If a receiving Orion is available when the private transaction is distributed but is unavailable 
    when the privacy marker transaction is processed, the private transaction is not executed by
    the receiving Besu node. The private states in the Besu nodes are then inconsistent. 