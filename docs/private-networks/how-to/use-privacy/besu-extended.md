---
title: Use Besu-extended privacy
description: Hyperledger Besu-extended privacy
sidebar_position: 2
tags:
  - private networks
---

# Use Besu-extended privacy

Hyperledger Besu provides an extended implementation of privacy allowing you to [create a privacy group for a set of participants](../../concepts/privacy/privacy-groups.md). You must specify the privacy group ID when sending private transactions.

To enable the [`PRIV` API methods](../../reference/api/index.md#priv-methods), use the [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api) or [`--rpc-ws-api`](../../../public-networks/reference/cli/options.md#rpc-ws-api) command line options.

To create the privacy group containing the recipients of a private transaction, use [`priv_createPrivacyGroup`](../../reference/api/index.md#priv_createprivacygroup).

To create an EEA-compliant private transaction, specify `privacyGroupId` when creating the signed transaction passed as an input parameter to [`eea_sendRawTransaction`](../../reference/api/index.md#eea_sendrawtransaction).

## Privacy group type

Privacy groups created using [`priv_createPrivacyGroup`](../../reference/api/index.md#priv_createprivacygroup) have a `BESU` privacy group type when returned by [`priv_findPrivacyGroup`](../../reference/api/index.md#priv_findprivacygroup).

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "privacyGroupId": "GpK3ErNO0xF27T0sevgkJ3+4qk9Z+E3HtXYxcKIBKX8=",
      "name": "Group B",
      "description": "Description of Group B",
      "type": "BESU",
      "members": [
        "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
        "g59BmTeJIn7HIcnq8VQWgyh/pDbvbt2eyP0Ii60aDDw="
      ]
    }
  ]
}
```
