description: Onchain Permissioning
<!--- END of page meta data -->

# Onchain Permissioning 

Onchain permissioning uses smart contracts to store and maintain the node, account, and admin whitelists. 
Using onchain permissioning enables all nodes to read the whitelists from a single source, the blockchain.                                        

!!! note 
    The permissioning smart contracts and Permissioning Management Dapp are a separate product to Hyperledger Besu 
    and are provided in the [PegaSysEng/permissioning-smart-contracts](https://github.com/PegaSysEng/permissioning-smart-contracts) repository.  

    Custom smart contracts and dapps can be implemented to work with onchain permissioning. 

## Permissioning Contracts

The permissioning smart contracts provided in the [PegaSysEng/permissioning-smart-contracts](https://github.com/PegaSysEng/permissioning-smart-contracts) 
repository are: 

* Ingress contracts for nodes and accounts - proxy contracts defined in the genesis file that defer the permissioning logic to the 
Node Rules and Account Rules contracts. The Ingress contracts are deployed to static addresses. 

* Node Rules - stores the node whitelist and node whitelist operations (for example, add and remove). 

* Account Rules - stores the accounts whitelist and account whitelist operations (for example, add and remove). 

* Admin - stores the list of admin accounts and admin list operations (for example, add and remove). There is 
one list of admin accounts for node and accounts.

## Permissioning Management Dapp

The [Permissioning Management Dapp](../../Tutorials/Permissioning/Getting-Started-Onchain-Permissioning.md) is provided to view 
and maintain the whitelists. 

!!! tip 
    Before v1.2, we provided a management interface using Truffle.
    The management interface using Truffle is deprecated and we recommend using the Dapp for an improved user experience. 

### Whitelists 

Permissioning implements three whitelists: 

* Accounts can submit transactions to the network

* Nodes can participate in the network 

* Admins are accounts that can update the accounts and nodes whitelists 

!!! caution "Using account permissioning and privacy"
    Account permissioning cannot be used with [random key signing](../../HowTo/Use-Privacy/Sign-Privacy-Marker-Transactions.md)
    for [privacy marker transactions](../Privacy/Private-Transaction-Processing.md).
    
    If using account permissioning and privacy, a signing key must be specified using the [`--privacy-marker-transaction-signing-key-file`](../../Reference/CLI/CLI-Syntax.md#privacy-marker-transaction-signing-key-file)
    command line option and the signing key included in the accounts whitelist.  

## Bootnodes

When a node is added to the network, it connects to the bootnodes until it synchronizes to the chain head regardless of
node permissions. Once in sync, the permissioning rules in the Account Rules and Node Rules smart contracts are applied.  

If a sychronized node loses all peer connections (that is, it has 0 peers), it reconnects to the bootnodes to 
rediscover peers.  

!!! important
    All bootnodes must be on the nodes whitelist. 