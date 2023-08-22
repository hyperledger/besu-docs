---
title: Use EEA-compliant privacy
description: Hyperledger Besu JSON-RPC methods to use for EEA-compliant privacy
sidebar_position: 1
tags:
  - private networks
---

# Use EEA-compliant privacy

When using Hyperledger Besu [EEA-compliant privacy](../../concepts/privacy/privacy-groups.md), the group of nodes specified by `privateFrom` and `privateFor` form a privacy group, to which Tessera assigns a unique privacy group ID.

To enable the [`EEA` API methods](../../reference/api/index.md#eea-methods), use the [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api) or [`--rpc-ws-api`](../../../public-networks/reference/cli/options.md#rpc-ws-api) command line options.

To create an EEA-compliant private transaction, specify `privateFor` when creating the signed transaction passed as an input parameter to [`eea_sendRawTransaction`](../../reference/api/index.md#eea_sendrawtransaction).

## Privacy group type

Privacy groups created when specifying `privateFrom` and `privateFor` have a `LEGACY` privacy group type when returned by [`priv_findPrivacyGroup`](../../reference/api/index.md#priv_findprivacygroup).

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "privacyGroupId": "68/Cq0mVjB8FbXDLE1tbDRAvD/srluIok137uFOaClM=",
      "name": "legacy",
      "description": "Privacy groups to support the creation of groups by privateFor and privateFrom",
      "type": "LEGACY",
      "members": [
        "g59BmTeJIn7HIcnq8VQWgyh/pDbvbt2eyP0Ii60aDDw=",
        "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk="
      ]
    }
  ]
}
```
