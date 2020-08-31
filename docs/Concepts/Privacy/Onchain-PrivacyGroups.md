---
description: Onchain Privacy Groups
---

# Onchain Privacy Groups

Onchain privacy groups use smart contracts to store and maintain the group membership. You can add
and remove members to and from onchain privacy groups.

!!! important

    Onchain privacy groups are an early access feature in v1.4. Do not use in production networks.

    Onchain privacy groups are not supported with [multi-tenancy](Multi-Tenancy.md).

    The onchain privacy group interfaces might change between v1.4 and v1.5. There might not be an
    upgrade path from onchain privacy groups created using v1.4 to enable use of onchain privacy
    group functionality in future versions.

    It's not recommended to create onchain privacy groups in a chain with existing
    [offchain privacy groups](Privacy-Groups.md).

## Group Management Contracts

The privacy group management contract bytecode is hard-coded into Hyperledger Besu and when you
create a privacy group, the contract bytecode is part of the genesis state of the privacy group.

!!! caution

    All members of an onchain privacy group must be using the same version of Hyperledger Besu. If
    using different versions, the private state within the privacy group may become inconsistent.

In the default implementation of the group management contract, the signer of the private transaction
that creates the privacy group is also the owner of the group. Only the owner can add and remove participants,
and upgrade the management contract.

The owner is identified by the signing key.  Transactions to add and remove participants, or upgrade 
the management contract, must be signed by the same key that signed the group creation transaction. 

## Onchain Privacy Group IDs

When creating an onchain privacy group, generate the privacy group ID for the group outside of Besu
and pass the ID as a parameter.

The [web3js-eea library](../../HowTo/Use-Privacy/Use-OnChainPrivacy.md) generates a unique privacy
group ID and passes the ID to Besu when creating a privacy group.

!!! caution

    When generating a privacy group ID, you must ensure the ID is unique across all network
    participants. If you create a privacy group with an existing privacy group ID, the existing
    privacy group is overwritten.

    To ensure unique privacy group IDs, using 256-bit SecureRandom is recommended.
