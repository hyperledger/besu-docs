---
description: Hyperledger Besu-extended privacy
---

# Using Hyperledger Besu-extended privacy

Hyperledger Besu provides an extended implementation of privacy allowing you to
[create a privacy group for a set of participants](../../Concepts/Privacy/Privacy-Groups.md). You
must specify the privacy group ID when sending private transactions.

To enable the [`PRIV` API methods](../../Reference/API-Methods.md#priv-methods), use the
[`--rpc-http-api`](../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`--rpc-ws-api`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) command line options.

To create the privacy group containing the recipients of a private transaction, use
[`priv_createPrivacyGroup`](../../Reference/API-Methods.md#priv_createprivacygroup).

To create an EEA-compliant private transaction, specify `privacyGroupId` when creating the signed
transaction passed as an input parameter to
[`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction).

## Privacy group type

Privacy groups created using
[`priv_createPrivacyGroup`](../../Reference/API-Methods.md#priv_createprivacygroup)
have a `BESU` privacy group type when returned by
[`priv_findPrivacyGroup`](../../Reference/API-Methods.md#priv_findprivacygroup).

!!! example

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
