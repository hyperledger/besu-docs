---
description: Hyperledger Besu JSON-RPC methods to use for EEA-compliant privacy
---

# Using EEA-compliant privacy

When using Hyperledger Besu [EEA-compliant privacy](../../Concepts/Privacy/Privacy-Groups.md), the
group of nodes specified by `privateFrom` and `privateFor` form a privacy group, to which Orion
assigns a unique privacy group ID.

To enable the [`EEA` API methods](../../Reference/API-Methods.md#eea-methods), use the
[`--rpc-http-api`](../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`--rpc-ws-api`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) command line options.

To create an EEA-compliant private transaction, specify `privateFor` when creating the signed
transaction passed as an input parameter to
[`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction).

## Privacy group type

Privacy groups created when specifying `privateFrom` and `privateFor` have a `LEGACY` privacy group
type when returned by
[`priv_findPrivacyGroup`](../../Reference/API-Methods.md#priv_findprivacygroup).

!!! example

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

