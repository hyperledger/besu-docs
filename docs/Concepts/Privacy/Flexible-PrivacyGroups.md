---
description: Flexible privacy groups
---

# Flexible privacy groups

!!! warning

    Orion features have been merged into Tessera!
    Read our [Orion to Tessera migration guide](https://docs.orion.consensys.net/en/latest/Tutorials/Migrating-from-Orion-to-Tessera/)
    and about all the [new Tessera features](https://consensys.net/blog/quorum/tessera-the-privacy-manager-of-choice-for-consensys-quorum-networks).

Flexible [privacy groups](Privacy-Groups.md) use smart contracts to store and maintain the group membership.
You can [add and remove members to and from flexible privacy groups](../../HowTo/Use-Privacy/Use-FlexiblePrivacy.md).

!!! tip

    Because group membership for flexible privacy groups is stored in a smart contract, flexible
    privacy groups are also known as onchain privacy groups.

!!! important

    Flexible privacy groups are an early access feature. Don't use in production networks.

    The flexible privacy group interfaces might change between releases. There may not be an
    upgrade path from flexible privacy groups created using v1.5 or earlier to enable use of flexible privacy
    group functionality in future versions.

    We don't recommended creating flexible privacy groups in a chain with existing
    [offchain privacy groups](Privacy-Groups.md).

## Group management contracts

The privacy group management contract bytecode is hard-coded into Besu and when you
create a privacy group, the contract bytecode is part of the genesis state of the privacy group.

!!! caution

    All members of a flexible privacy group must be using the same version of Besu. If
    using different versions, the private state within the privacy group may become inconsistent.

In the default implementation of the group management contract, the signer of the private transaction
that creates the privacy group is also the owner of the group. Only the owner can add and remove participants,
and upgrade the management contract.

The owner is identified by the signing key. Transactions to add and remove participants, or upgrade
the management contract, must be signed by the same key that signed the group creation transaction.

## Flexible privacy group IDs

When creating a flexible privacy group, generate the privacy group ID for the group outside of Besu
and pass the ID as a parameter.

The [web3js-quorum library](../../HowTo/Use-Privacy/Use-FlexiblePrivacy.md) generates a unique privacy
group ID and passes the ID to Besu when creating a privacy group.

!!! caution

    When generating a privacy group ID, you must ensure the ID is unique across all network
    participants. If you create a privacy group with an existing privacy group ID, the existing
    privacy group is overwritten.

    To ensure unique privacy group IDs, we recommend using 256-bit SecureRandom.

## Multi-tenancy

When using [multi-tenancy](Multi-Tenancy.md) with flexible privacy groups, each user provides a JSON Web Token (JWT)
which allows Besu to check that the user has access to functionality and data associated with a privacy group.

Using multi-tenancy with flexible privacy groups is more complex than with [offchain privacy groups](Privacy-Groups.md)
because users may try to access a privacy group they were once a member of but later removed from.

When multi-tenancy is enabled and a user requests access to a privacy group they were once a member of but later
removed from, Besu allows the user access to the following functionality and data associated with the privacy group:

- Private transactions using `priv_getTransaction` and private transaction receipts using
  [`priv_getTransactionReceipt`](../../Reference/API-Methods.md#priv_gettransactionreceipt) from blocks up to (and
  including) the block containing the [privacy marker transaction (PMT)](Private-Transaction-Processing.md) that removed
  the user.
  
    !!! note

        A removed group member may have access to some private transactions in the same block after the removal PMT.
        There may be more private transactions sent to that privacy group version in later blocks, but all of these
        transactions fail to execute because the version is incremented after the removal.
  
- Using [`priv_call`](../../Reference/API-Methods.md#priv_call) on blocks up to (and including) the block containing the
  PMT that removed the user.
  
- Private logs using [`priv_getLogs`](../../Reference/API-Methods.md#priv_getlogs) for blocks up to (and including) the
  block containing the PMT that removed the user.
  When the `toBlock` is greater than the removal block, `priv_getLogs` returns logs only up to the removal block.
  
    !!! note

        A user can only create and access log filters (using [`priv_newFilter`](../../Reference/API-Methods.md#priv_newfilter),
        [`priv_getFilterLogs`](../../Reference/API-Methods.md#priv_getfilterlogs),
        [`priv_getFilterChanges`](../../Reference/API-Methods.md#priv_getfilterchanges),
        [`priv_uninstallFilter`](../../Reference/API-Methods.md#priv_uninstallfilter), and
        [`priv_subscribe`](../../HowTo/Interact/APIs/RPC-PubSub.md)) for a privacy group they are currently a member of.
        When they are removed from the group, the filters they created are removed.

All other [`PRIV` API methods](../../Reference/API-Methods.md#priv-methods) fail for the removed group member.
