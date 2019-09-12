description: Privacy
<!--- END of page meta data -->

# Privacy

Privacy in Pantheon refers to the ability to keep transactions private between the involved participants. 
Other participants cannot access the transaction content or list of participants.

!!! important
    For production systems requiring private transactions, we recommend using a network 
    with a consensus mechanism supporting transaction finality. For example, [IBFT 2.0](../../HowTo/Configure-Pantheon/Consensus-Protocols/IBFT.md). All private transaction participants must be online for a private transaction to be successfully distributed. If any participants are offline when the private transaction is submitted, the transaction is not attempted and must be resubmitted.

## Private Transaction Manager

Pantheon uses a Private Transaction Manager to implement privacy. For example, [Orion](http://docs.orion.pegasys.tech).  
Each Pantheon node that sends or receives private transactions requires an associated Orion node. 

![Orion Nodes](../../images/OrionNodes.png)

Private transactions are passed from the Pantheon node to the associated Orion node. The Orion node
encrypts and directly distributes (that is, point to point) the private transaction to Orion nodes 
participating in the transaction. 

!!! tip
    Private Transaction Managers are also known as Enclaves.  

## Private Transaction Attributes

Private transactions have additional attributes to public Ethereum transactions: 

* `privateFrom` - Orion public key of transaction sender

* `privateFor` - Orion public keys of transaction recipients or `privacyGroupId` - [Privacy group to receive transaction](Privacy-Groups.md) 

* `restriction` - Private transactions are `restricted` or `unrestricted`:  
  
    - In `restricted` private transactions the payload of the private transaction is received and stored only by 
    the nodes participating in the transaction. 

    - In `unrestricted` private transactions the payload of the private transaction is transmitted to all nodes
    in the network but is readable only by nodes participating in the transaction.   

    !!! important 
        Pantheon implements `restricted` private transactions only.

## Pantheon and Orion Keys

Pantheon and Orion nodes both have public/private key pairs identifying them. The private transaction 
submitted from the Pantheon node to the Orion node is signed with the Pantheon node private key. The 
`privateFrom` and `privateFor` attributes specified in the RLP-encoded transaction string for 
[`eea_sendRawTransaction`](../../Reference/Pantheon-API-Methods.md#eea_sendrawtransaction) are the public keys
of the Orion nodes sending and receiving the transaction.  

!!! important 
    The mapping of Pantheon node addresses to Orion node public keys is off-chain.  That is, the 
    sender of a private transaction must know the Orion node public key of the recipient.  
