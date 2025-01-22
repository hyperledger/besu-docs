---
title: Create and manage privacy groups
description: Create and manage privacy groups with Besu
sidebar_position: 4
tags:
  - private networks
---

# Create and manage privacy groups (Deprecated)

:::caution

Tessera-based privacy is deprecated in Besu version 24.12.0 and later. Please read this [blog post](https://www.lfdecentralizedtrust.org/blog/sunsetting-tessera-and-simplifying-hyperledger-besu) for more context on the rationale behind this decision as well as alternative options.

:::

Besu-extended privacy provides JSON-RPC API methods for creating and managing privacy groups:

- [`priv_createPrivacyGroup`](../../reference/api/index.md#priv_createprivacygroup)
- [`priv_findPrivacyGroup`](../../reference/api/index.md#priv_findprivacygroup)
- [`priv_deletePrivacyGroup`](../../reference/api/index.md#priv_deleteprivacygroup).

:::tip

You can find and delete [EEA-compliant privacy groups](../../concepts/privacy/privacy-groups.md) using [`priv_findPrivacyGroup`](../../reference/api/index.md#priv_findprivacygroup) and [`priv_deletePrivacyGroup`](../../reference/api/index.md#priv_deleteprivacygroup).

:::
