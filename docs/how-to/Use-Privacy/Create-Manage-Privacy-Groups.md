---
description: Create and manage privacy groups with Hyperledger Besu
---

# Create and manage privacy groups

!!! warning

    Orion features have been merged into Tessera!
    Read our [Orion to Tessera migration guide](https://docs.orion.consensys.net/en/latest/Tutorials/Migrating-from-Orion-to-Tessera/)
    and about all the [new Tessera features](https://consensys.net/blog/quorum/tessera-the-privacy-manager-of-choice-for-consensys-quorum-networks).

Hyperledger Besu-extended privacy provides JSON-RPC API methods for creating and managing privacy
groups:

* [`priv_createPrivacyGroup`](../../reference/api/index.md#priv_createprivacygroup)
* [`priv_findPrivacyGroup`](../../reference/api/index.md#priv_findprivacygroup)
* [`priv_deletePrivacyGroup`](../../reference/api/index.md#priv_deleteprivacygroup).

!!! tip

    You can find and delete
    [EEA-compliant privacy groups](../../Concepts/Privacy/Privacy-Groups.md) using
    [`priv_findPrivacyGroup`](../../Reference/API-Methods.md#priv_findprivacygroup) and
    [`priv_deletePrivacyGroup`](../../Reference/API-Methods.md#priv_deleteprivacygroup).
