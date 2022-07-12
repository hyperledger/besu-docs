---
description: Hyperledger Besu JSON-RPC methods to use for EEA-compliant privacy
---

# Using EEA-compliant privacy

!!! warning

    Orion features have been merged into Tessera!
    Read our [Orion to Tessera migration guide](https://docs.orion.consensys.net/en/latest/Tutorials/Migrating-from-Orion-to-Tessera/)
    and about all the [new Tessera features](https://consensys.net/blog/quorum/tessera-the-privacy-manager-of-choice-for-consensys-quorum-networks).

When using Hyperledger Besu [EEA-compliant privacy](../../concepts/Privacy/Privacy-Groups.md), the
group of nodes specified by `privateFrom` and `privateFor` form a privacy group, to which Tessera
assigns a unique privacy group ID.

To enable the [`EEA` API methods](../../reference/api/index.md#eea-methods), use the
[`--rpc-http-api`](../../reference/cli/options.md#rpc-http-api) or
[`--rpc-ws-api`](../../reference/cli/options.md#rpc-ws-api) command line options.

To create an EEA-compliant private transaction, specify `privateFor` when creating the signed
transaction passed as an input parameter to
[`eea_sendRawTransaction`](../../reference/api/index.md#eea_sendrawtransaction).

## Privacy group type

Privacy groups created when specifying `privateFrom` and `privateFor` have a `LEGACY` privacy group
type when returned by
[`priv_findPrivacyGroup`](../../reference/api/index.md#priv_findprivacygroup).

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
