---
description: Onchain permissioning
---

# Onchain permissioning

Onchain permissioning uses smart contracts to store and administer the node, account, and admin
allowlists. Using onchain permissioning enables all nodes to read the allowlists from a single
source, the blockchain.

!!! note

    The permissioning smart contracts and Permissioning Management Dapp are a separate product to
    Hyperledger Besu, located in the [PegaSysEng/permissioning-smart-contracts] repository.

    Custom smart contracts and dapps can be implemented to work with onchain permissioning.

## Permissioning contracts

The permissioning smart contracts provided in the [PegaSysEng/permissioning-smart-contracts]
repository are:

* Ingress contracts for nodes and accounts - proxy contracts defined in the genesis file to defer
  the permissioning logic to the Node Rules and Account Rules contracts. The Ingress contracts deploy
  to static addresses.
* Node Rules - stores the node allowlist and node allowlist operations (for example, add and
  remove).
* Account Rules - stores the accounts allowlist and account allowlist operations (for example, add
  and remove).
* Admin - stores the list of admin accounts and admin list operations (for example, add and
  remove). There is one list of admin accounts for node and accounts.

## Permissioning management Dapp

The [Permissioning Management Dapp] provides view and maintain access to the allowlists.

!!! tip

    Before v1.2, the management interface used Truffle, now deprecated. For an improved user
    experience, use the Dapp.

### Allowlists

Permissioning implements three allowlists:

* Accounts, which can submit transactions to the network.
* Nodes, which can join the network.
* Admins, which are accounts able to update the accounts and nodes allowlists.

!!! caution "Using account permissioning and privacy"

    Account permissioning is incompatible with
    [random key signing](../../HowTo/Use-Privacy/Sign-Privacy-Marker-Transactions.md) for
    [privacy marker transactions](../Privacy/Private-Transaction-Processing.md).

    If using account permissioning and privacy, a signing key must be specified using the
    [`--privacy-marker-transaction-signing-key-file`] command line option and the signing key
    included in the accounts allowlist.
    
!!! tip 
  
    If nodes are not connecting as expected, set the [log level to `TRACE`](../../Reference/CLI/CLI-Syntax.md#logging)
    to identify the issue. 
    
    Ensure the [`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host) command line option has been
    correctly configured for all nodes with the 
    externally accessible address.  If not specified, nodes advertise `0.0.0.0`. 

## Bootnodes

When a node joins the network, the node connects to the bootnodes until it synchronizes to
the chain head, regardless of node permissions. After synchronization, the Account Rules and Node
Rules smart contracts apply the permissioning rules.

If a synchronized node loses all peer connections (that is, it has zero peers), it reconnects to the
bootnodes to rediscover peers.

!!! important

    All bootnodes must be on the nodes allowlist.

<!-- Links -->
[PegaSysEng/permissioning-smart-contracts]: https://github.com/PegaSysEng/permissioning-smart-contracts
[Permissioning Management Dapp]: ../../Tutorials/Permissioning/Getting-Started-Onchain-Permissioning.md
[`--privacy-marker-transaction-signing-key-file`]: ../../Reference/CLI/CLI-Syntax.md#privacy-marker-transaction-signing-key-file
