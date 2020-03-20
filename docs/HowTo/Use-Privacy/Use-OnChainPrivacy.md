---
description: Use Onchain Privacy
---

# Using onchain privacy groups

To create and update membership of onchain privacy groups, use the
[web3.js-eea library](https://github.com/PegaSysEng/web3js-eea).

!!! important

    Onchain privacy groups are an early access feature in v1.4. Do not use in production networks.

    The onchain privacy group interfaces may change between v1.4 and v1.5. There may not be an
    upgrade path from onchain privacy groups created using v1.4 to enable use of onchain privacy
    group functionality in future versions.

    We do not recommend creating onchain privacy groups in a chain with existing
    [offchain privacy groups](../../Concepts/Privacy/Privacy-Groups.md).

## Enabling onchain privacy groups

To enable onchain privacy groups, use the
[`--privacy-onchain-groups-enabled`](../../Reference/CLI/CLI-Syntax.md#privacy-onchain-groups-enabled)
command line option. When you enable onchain privacy groups, you disable the
[`priv_createPrivacyGroup`](../../Reference/API-Methods.md#priv_createprivacygroup),
[`priv_deletePrivacyGroup`](../../Reference/API-Methods.md#priv_deleteprivacygroup),
and [`priv_findPrivacyGroup`](../../Reference/API-Methods.md#priv_findprivacygroup) methods for
[offchain privacy groups](../../Concepts/Privacy/Privacy-Groups.md).

## Simple onchain privacy group example

To create and find an onchain privacy group using the
[web3.js-eea library](https://github.com/PegaSysEng/web3js-eea):

1. Update the `example/keys.js` file to match your network configuration.
1. Run:

    ```
    node simpleOnChainPrivacy.js
    ```

    This script creates the onchain privacy group with two members. `findPrivacyGroup` finds and
    displays the created privacy group.

!!! tip

    The Orion logs for Orion 1 and Orion 2 displays `PrivacyGroupNotFound` errors. This is expected
    behavior because private transactions check offchain and onchain to find the privacy group for
    a private transaction.

## Adding and removing members

To add and remove members from an onchain privacy group, use the `addToPrivacyGroup` and
`removeFromPrivayGroup` methods in the
[web3.js-eea library](https://github.com/PegaSysEng/web3js-eea) client library.

!!! note

    When adding a member, Besu pushes all existing group transactions to the new member and
    processes them. If there are a large number of existing transactions, adding the member might
    take some time.
