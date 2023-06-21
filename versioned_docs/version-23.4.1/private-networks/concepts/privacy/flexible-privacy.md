---
title: Flexible privacy groups
sidebar_position: 3
description: Flexible privacy groups
---

# Flexible privacy groups

Flexible [privacy groups](privacy-groups.md) use smart contracts to store and maintain the group membership. You can [add and remove members to and from flexible privacy groups](../../how-to/use-privacy/flexible.md).

:::tip

Because group membership for flexible privacy groups is stored in a smart contract, flexible privacy groups are also known as onchain privacy groups.

:::

:::danger

Flexible privacy groups are an early access feature. Don't use in production networks.

The flexible privacy group interfaces might change between releases. There might not be an upgrade path from flexible privacy groups created using v1.5 or earlier to enable use of flexible privacy group functionality in future versions.

We don't recommended creating flexible privacy groups in a chain with existing [offchain privacy groups](privacy-groups.md).

:::

## Group management contracts

The privacy group management contract bytecode is hard-coded into Besu and when you create a privacy group, the contract bytecode is part of the genesis state of the privacy group.

:::caution

All members of a flexible privacy group must be using the same version of Besu. If using different versions, the private state within the privacy group may become inconsistent.

:::

In the default implementation of the group management contract, the signer of the private transaction that creates the privacy group is also the owner of the group. Only the owner can add and remove participants, and upgrade the management contract.

The owner is identified by the signing key. Transactions to add and remove participants, or upgrade the management contract, must be signed by the same key that signed the group creation transaction.

## Flexible privacy group IDs

When creating a flexible privacy group, generate the privacy group ID for the group outside of Besu and pass the ID as a parameter.

The [web3js-quorum library](../../how-to/use-privacy/flexible.md) generates a unique privacy group ID and passes the ID to Besu when creating a privacy group.

:::caution

When generating a privacy group ID, you must ensure the ID is unique across all network participants. If you create a privacy group with an existing privacy group ID, the existing privacy group is overwritten.

To ensure unique privacy group IDs, we recommend using 256-bit SecureRandom.

:::

## Multi-tenancy

When using [multi-tenancy](multi-tenancy.md) with flexible privacy groups, each user provides a JSON Web Token (JWT) which allows Besu to check that the user has access to functionality and data associated with a privacy group.

Using multi-tenancy with flexible privacy groups is more complex than with [offchain privacy groups](privacy-groups.md) because users may be added and removed from flexible privacy groups. When a user is added to a privacy group, they get access to all existing data in the privacy group. After being removed from a privacy group, a user retains access to already existing data in the privacy group, up to the block containing the [privacy marker transaction (PMT)](private-transactions/processing.md) that removed them (the removal block). A removed user doesn't have access to data in the privacy group that happens after they were removed.

In particular, when multi-tenancy is enabled and a user requests access to a privacy group they were once a member of but later removed from, Besu allows the user access to the following functionality and data associated with the privacy group:

- Private transactions using `priv_getTransaction` and private transaction receipts using [`priv_getTransactionReceipt`](../../../public-networks/reference/api/index.md#priv_gettransactionreceipt) from blocks up to (and including) the removal block.

  :::note

  A removed group member may have access to some private transactions after the removal PMT in the same block.

  :::

- Using [`priv_call`](../../../public-networks/reference/api/index.md#priv_call) on blocks up to (and including) the removal block.

- Private logs using [`priv_getLogs`](../../../public-networks/reference/api/index.md#priv_getlogs) for blocks up to (and including) the removal block. When the `toBlock` is greater than the removal block, `priv_getLogs` still returns logs up to the removal block.

  :::note

  When a user is removed from a privacy group, any log filters they've created are also removed and can't be accessed. A user can only create and access filters for a privacy group they are currently a member of.

  :::

All other [`PRIV` API methods](../../../public-networks/reference/api/index.md#priv-methods) fail for the removed group member.
