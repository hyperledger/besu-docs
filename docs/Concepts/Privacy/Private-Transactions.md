description: Private Transaction Overview
<!--- END of page meta data -->

# Private Transactions 

Private transactions have additional attributes to public Ethereum transactions: 

* `privateFrom` - Orion public key of transaction sender

* `privateFor` - Orion public keys of transaction recipients or `privacyGroupId` - [Privacy group to receive transaction](Privacy-Groups.md) 

* `restriction` - Private transactions are `restricted` or `unrestricted`:  
  
    - In `restricted` private transactions the payload of the private transaction is received and stored only by 
    the nodes participating in the transaction. 

    - In `unrestricted` private transactions the payload of the private transaction is transmitted to all nodes
    in the network but is readable only by nodes participating in the transaction.   

    !!! important 
        Besu implements `restricted` private transactions only.

For details on creating and sending private transactions, refer to our [How To documentation](../../HowTo/Send-Transactions/Creating-Sending-Private-Transactions.md). 

## Besu and Orion Keys

Besu and Orion nodes both have public/private key pairs identifying them. The private transaction 
submitted from the Besu node to the Orion node is signed with the Besu node private key. The 
`privateFrom` and `privateFor` attributes specified in the RLP-encoded transaction string for 
[`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction) are the public keys
of the Orion nodes sending and receiving the transaction.  

!!! important 
    The mapping of Besu node addresses to Orion node public keys is off-chain.  That is, the 
    sender of a private transaction must know the Orion node public key of the recipient.  