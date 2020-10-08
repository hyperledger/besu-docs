---
description: Flexible privacy groups
---

# Flexible privacy groups

Flexible privacy groups use smart contracts to store and maintain the group membership. You can add
and remove members to and from flexible privacy groups.

!!! tip

    Because group membership for flexible privacy groups is stored in a smart contract, flexible
    privacy groups are also known as onchain privacy groups.

!!! important

    Flexible privacy groups are an early access feature. Do not use in production networks.

    The flexible privacy group interfaces might change between releases. There might not be an
    upgrade path from flexible privacy groups created using v1.5 or earlier to enable use of flexible privacy
    group functionality in future versions.

    It's not recommended to create flexible privacy groups in a chain with existing
    [offchain privacy groups](Privacy-Groups.md).

## Group management contracts

The privacy group management contract bytecode is hard-coded into Hyperledger Besu and when you
create a privacy group, the contract bytecode is part of the genesis state of the privacy group.

!!! caution

    All members of a flexible privacy group must be using the same version of Hyperledger Besu. If
    using different versions, the private state within the privacy group may become inconsistent.

In the default implementation of the group management contract, the signer of the private transaction
that creates the privacy group is also the owner of the group. Only the owner can add and remove participants,
and upgrade the management contract.

The owner is identified by the signing key.  Transactions to add and remove participants, or upgrade
the management contract, must be signed by the same key that signed the group creation transaction.

## Flexible privacy group IDs

When creating a flexible privacy group, generate the privacy group ID for the group outside of Besu
and pass the ID as a parameter.

The [web3js-eea library](../../HowTo/Use-Privacy/Use-FlexiblePrivacy.md) generates a unique privacy
group ID and passes the ID to Besu when creating a privacy group.

!!! caution

    When generating a privacy group ID, you must ensure the ID is unique across all network
    participants. If you create a privacy group with an existing privacy group ID, the existing
    privacy group is overwritten.

    To ensure unique privacy group IDs, using 256-bit SecureRandom is recommended.
