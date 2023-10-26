---
title: Use flexible privacy groups
description: Use flexible privacy groups
sidebar_position: 5
tags:
  - private networks
---

# Use flexible privacy groups

Use the [`web3js-quorum` library](https://github.com/ConsenSys/web3js-quorum) to create and update membership of [flexible privacy groups](../../concepts/privacy/flexible-privacy.md).

:::tip

Because group membership for flexible privacy groups is stored in a smart contract, flexible privacy groups are also known as onchain privacy groups.

:::

:::info

[Flexible privacy groups](../../concepts/privacy/flexible-privacy.md) are an early access feature. Don't use in production networks.

The flexible privacy group interfaces may change between releases. There might not be an upgrade path from flexible privacy groups created using v1.5 or earlier to enable use of flexible privacy group functionality in future versions.

We don't recommend creating flexible privacy groups in a chain with existing [offchain privacy groups](../../concepts/privacy/privacy-groups.md).

:::

## Enable flexible privacy groups

Use the [`--privacy-flexible-groups-enabled`](../../reference/cli/options.md#privacy-flexible-groups-enabled) command line option to enable [flexible privacy groups](../../concepts/privacy/flexible-privacy.md). When flexible privacy groups are enabled, the [`priv_createPrivacyGroup`](../../reference/api/index.md#priv_createprivacygroup), [`priv_deletePrivacyGroup`](../../reference/api/index.md#priv_deleteprivacygroup), and [`priv_findPrivacyGroup`](../../reference/api/index.md#priv_findprivacygroup) methods for [offchain privacy groups](../../concepts/privacy/privacy-groups.md) are disabled.

## Simple flexible privacy group example

To create and find a [flexible privacy group](../../concepts/privacy/flexible-privacy.md) using the [`web3js-quorum` library](https://github.com/ConsenSys/web3js-quorum):

1. Update the `example/keys.js` file to match your network configuration.

1. Run:

   ```bash
   cd example/onchainPrivacy
   node simpleExample.js
   ```

   This script creates the flexible privacy group with two members. `findPrivacyGroup` finds and displays the created privacy group.

:::tip

The Tessera logs for Tessera 1 and Tessera 2 display `PrivacyGroupNotFound` errors. This is expected behavior because private transactions check offchain and onchain to find the privacy group for a private transaction.

:::

## Add and remove members

To add and remove members from a [flexible privacy group](../../concepts/privacy/flexible-privacy.md), use the `addTo` and `removeFrom` methods in the [`web3js-quorum` library](https://github.com/ConsenSys/web3js-quorum) client library.

:::note

When adding a member, Besu pushes all existing group transactions to the new member and processes them. If there are a large number of existing transactions, adding the member may take some time.

:::
