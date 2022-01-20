---
description: Onchain permissioning
---

# Onchain permissioning

Onchain [permissioning](Permissioning-Overview.md) uses smart contracts to store and administer the node, account, and admin
allowlists. Using onchain permissioning enables all nodes to read the allowlists from a single
source, the blockchain.

!!! important

    When using onchain account permissioning, a node checks permissions when importing blocks.
    Meaning, a node only imports blocks in which all transactions are from authorized senders. If
    you disable onchain account permissioning and your node accepts blocks without enforcing this rule,
    your node cannot re-synchronize with other nodes that enforce onchain account permissioning rules
    (your node goes into forked state).

!!! note

    The permissioning smart contracts and [permissioning management dapp] are a separate product to Hyperledger Besu,
    located in the
    [`ConsenSys/permissioning-smart-contracts`](https://github.com/ConsenSys/permissioning-smart-contracts) repository.

    Custom smart contracts and dapps can be implemented to work with onchain permissioning.

## Permissioning contracts

The permissioning smart contracts provided in the
[`ConsenSys/permissioning-smart-contracts`](https://github.com/ConsenSys/permissioning-smart-contracts) repository are:

* Ingress contracts for nodes and accounts - proxy contracts defined in the genesis file to defer
  the permissioning logic to the Node Rules and Account Rules contracts. The Ingress contracts deploy
  to static addresses.
* Node Rules - stores the node allowlist and node allowlist operations (for example, add and
  remove).
* Account Rules - stores the accounts allowlist and account allowlist operations (for example, add
  and remove).
* Admin - stores the list of admin accounts and admin list operations (for example, add and
  remove). Admin accounts are stored in a single list for both nodes and accounts.

!!! important

    The permissioning contract has multiple interfaces, and each interface maps to a specific
    version of the [Enterprise Ethereum Alliance Client Specification](https://entethalliance.org/technical-specifications/).
    Ensure that you specify the [permissioning contract interface](../../HowTo/Limit-Access/Specify-Perm-Version.md)
    being used when starting Besu.

## Permissioning management dapp

The [permissioning management dapp] provides view and maintain access to the allowlists.

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
    [`--privacy-marker-transaction-signing-key-file`](../../Reference/CLI/CLI-Syntax.md#privacy-marker-transaction-signing-key-file)
    command line option and the corresponding public key
    included in the accounts allowlist.

!!! tip

    If nodes are not connecting as expected, set the [log level to `TRACE`](../../Reference/CLI/CLI-Syntax.md#logging)
    and search for messages containing `Node permissioning` to identify the issue.

    Ensure the [`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host) command line option has been
    correctly configured for all nodes with the
    externally accessible address.

    If you change your network configuration, you may need to update the node allowlist.

## Bootnodes

When a node joins the network, the node connects to the [bootnodes](../../HowTo/Find-and-Connect/Bootnodes.md) until it
synchronizes to the chain head, regardless of node permissions. After synchronization, the Account Rules and Node
Rules smart contracts apply the permissioning rules.

If a synchronized node loses all peer connections (that is, it has zero peers), it reconnects to the
bootnodes to rediscover peers.

!!! important

    All bootnodes must be on the nodes allowlist.

<!-- Links -->
[permissioning management dapp]: ../../Tutorials/Permissioning/Getting-Started-Onchain-Permissioning.md
[`--privacy-marker-transaction-signing-key-file`]: ../../Reference/CLI/CLI-Syntax.md#privacy-marker-transaction-signing-key-file
