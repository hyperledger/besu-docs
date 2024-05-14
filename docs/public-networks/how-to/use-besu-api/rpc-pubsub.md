---
title: Use RPC Pub/Sub over WS
sidebar_position: 2
description: Using RPC Pub/Sub with Hyperledger Besu WebSockets
tags:
  - public networks
  - private networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use RPC Pub/Sub over WebSockets

## Introduction

Subscribe to events by using either RPC Pub/Sub over WebSockets or [filters over HTTP](access-logs.md).

Use RPC Pub/Sub over WebSockets to wait for events instead of polling for them. For example, dapps subscribe to logs and receive notifications when a specific event occurs.

Methods specific to RPC Pub/Sub are:

- `eth_subscribe` and `eth_unsubscribe` - create or cancel a subscription for specific events.
- `priv_subscribe` and `priv_unsubscribe` - create or cancel a subscription for [private logs](../../../private-networks/concepts/privacy/index.md).

:::info

Unlike other [Hyperledger Besu API methods](../../reference/api/index.md), you cannot call the RPC Pub/Sub methods over HTTP. Use the [`--rpc-ws-enabled`](../../reference/cli/options.md#rpc-ws-enabled) option to enable the WebSockets JSON-RPC service.

:::

### Use RPC Pub/Sub

[WebSockets](json-rpc.md#http-and-websocket-requests) supports the RPC Pub/Sub API.

To create subscriptions, use `eth_subscribe` or `priv_subscribe`. Once subscribed, the API publishes notifications using `eth_subscription` or `priv_subscription`.

Subscriptions couple with connections. If a connection is closed, all subscriptions created over the connection are removed.

### Subscription ID

`eth_subscribe` and `priv_subscribe` return a subscription ID for each subscription created. Notifications include the subscription ID.

For example, to create a synchronizing subscription:

```json
{ "id": 1, "method": "eth_subscribe", "params": ["syncing"] }
```

The result includes the subscription ID of `"0x1"`:

```json
{ "jsonrpc": "2.0", "id": 1, "result": "0x1" }
```

The notifications also include the subscription ID of `"0x1"`:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x1",
    "result": {
      "startingBlock": "0x0",
      "currentBlock": "0x50",
      "highestBlock": "0x343c19"
    }
  }
}
```

### Notifications when synchronizing

Subscribing to some events (for example, logs) can cause a flood of notifications while the node is synchronizing.

## Subscribe

Use `eth_subscribe` to create subscriptions for the following event types:

- [New headers](#new-headers)
- [Logs](#logs)
- [Pending transactions](#pending-transactions)
- [Dropped transactions](#dropped-transactions)
- [Synchronizing](#synchronizing)

Use `priv_subscribe` to [create subscriptions for logs on private contracts](#logs).

:::tip

Only logs subscriptions are relevant for private transactions because private transactions are anchored to the public chain rather than having their own private blockchain.

:::

### New headers

To notify you about each block added to the blockchain, use the `newHeads` parameter with `eth_subscribe`.

If a chain reorganization occurs, the subscription publishes notifications for blocks in the new chain. This means the subscription can publish notifications for multiple blocks at the same height on the blockchain.

The new headers notification returns [block objects](../../reference/api/objects.md#block-object). The second parameter is optional. If specified, the notifications include whole [transaction objects](../../reference/api/objects.md#transaction-object), Otherwise, the notifications include transaction hashes.

To subscribe to new header notifications:

```json
{
  "id": 1,
  "method": "eth_subscribe",
  "params": ["newHeads", { "includeTransactions": true }]
}
```

Example result:

```json
{ "jsonrpc": "2.0", "id": 2, "result": "0x1" }
```

Example notification without the `{"includeTransactions": true}` parameter included:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x1",
    "result": {
      "number": "0x40c22",
      "hash": "0x16af2ee1672203c7ac13ff280822008be0f38e1e5bdc675760015ae3192c0e3a",
      "parentHash": "0x1fcf5dadfaf2ab4d985eb05d40eaa23605b0db25d736610c4b87173bfe438f91",
      "nonce": "0x0000000000000000",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "logsBloom": "0x00008000000000080000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000040000000000000000000000000000000000000000001000000000000000000000040000000000000000000000000000000000000400000000010000000000000000100000000000020000000000000000000000000000000000010000000000000000000000000000000000000000000",
      "transactionsRoot": "0x5b2e3c1a49352f1ca9fb5dfe74b7ffbbb6d70e23a12693444e26058d8a8e6296",
      "stateRoot": "0xbe8d3bc58bd982421a3ea8b66753404502df0f464ae78a17661d157c406dd38b",
      "receiptsRoot": "0x81b175ec1f4d44fbbd6ba08f1bd3950663b307b7cb35751c067b535cc0b58f12",
      "miner": "0x0000000000000000000000000000000000000000",
      "difficulty": "0x1",
      "totalDifficulty": "0x7c16e",
      "extraData": "0xd783010600846765746887676f312e372e33856c696e757800000000000000002160f780bb1f61eda045c67cdb1297ba37d8349df8035533cb0cf82a7e45f23f3d72bbec125a9f499b3eb110b7d1918d466cb2ede90b38296cfe2aaf452c513f00",
      "size": "0x3a1",
      "gasLimit": "0x47e7c4",
      "gasUsed": "0x11ac3a",
      "timestamp": "0x592afc24",
      "uncles": [],
      "transactions": [
        "0x419c69d21b14e2e8f911def22bb6d0156c876c0e1c61067de836713043364d6c",
        "0x70a5b2cb2cee6e0b199232a1757fc2a9d6053a4691a7afef8508fd88aeeec703",
        "0x4b3035f1d32339fe1a4f88147dc197a0fe5bbd63d3b9dec2dad96a3b46e4fddd"
      ]
    }
  }
}
```

Example notification with the `{"includeTransactions": true}` parameter included:

```json
{
"jsonrpc": "2.0",
"method": "eth_subscription",
"params":{
    "subscription":"0x1",
    "result": {
    ....
    "transactions":[
        {
        "blockHash":"0xa30ee4d7c271ae5150aec494131c5f1f34089c7aa8fb58bd8bb916a55275bb90",
        "blockNumber":"0x63",
        "from":"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
        "gas":"0x5208",
        "gasPrice":"0x3b9aca00",
        "hash":"0x11f66c3e96a92e3c14c1c33ad77381221bf8b58a887b4fed6aee456fc6f39b24",
        "input":"0x",
        "nonce":"0x1",
        "to":"0x627306090abab3a6e1400e9345bc60c78a8bef57",
        "transactionIndex":"0x0",
        "value":"0x56bc75e2d63100000",
        "v":"0xfe8",
        "r":"0x4b57d179c74885ef5f9326fd000665ea7fae44095c1e2016a2817fc671beb8cc",
        "s":"0x7ec060b115746dda392777df07ae1feacc0b83b3646f0a3de9a5fc3615af9bb8",
        }
      ],
    },
  }
}
```

### Logs

To notify you about [logs](../../concepts/events-and-logs.md) included in new blocks, use the `logs` parameter with `eth_subscribe` or `priv_subscribe`. Specify a filter object to receive notifications only for logs matching your filter.

Logs subscriptions have a filter object parameter with the following fields:

- `address` - (optional) Either an address or an array of addresses. Returns only logs created from these addresses.
- `topics` - (optional) Returns only logs that match the [specified topics](../../concepts/events-and-logs.md#topic-filters).
- `fromBlock` - (optional) The earliest block from which to return logs.
- `toBlock` - (optional) The last block from which to return logs.

For private contracts, the privacy group ID must be specified. Only members of a privacy group receive logs for a private contract subscription. If you create a subscription for a privacy group you are not a member of, you will not receive any notifications.

If a chain reorganization occurs, the subscription publishes notifications for logs from the old chain with the `removed` property in the [log object](../../reference/api/objects.md#log-object) set to `true`. This means the subscription can publish notifications for multiple logs for the same transaction.

The logs subscription returns [log objects](../../reference/api/objects.md#log-object).

<Tabs>

<TabItem value="All logs" label="All logs" default>

```json
{ 
  "id": 1, 
  "method": "eth_subscribe", 
  "params": ["logs", {}]
}
```

</TabItem>
<TabItem value="Specific parameters">

```json
{
  "id": 1,
  "method": "eth_subscribe",
  "params": [
    "logs",
    {
      "address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
      "topics": [
        "0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"
      ],
      "fromBlock": "0x0",
      "toBlock": "latest"
    }
  ]
}
```

</TabItem>

<TabItem value="Result" label="Result">

```json
{ "jsonrpc": "2.0", "id": 1, "result": "0x2" }
```

</TabItem>

<TabItem value="Notification" label="Notification">

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x2",
    "result": {
      "logIndex": "0x0",
      "removed": false,
      "blockNumber": "0x2174",
      "blockHash": "0x7bc83837534aa13df55ff7db77784b1d1ba666d4c4bdd223cae9fe09c7c37eba",
      "transactionHash": "0x942179373e413824c6bc7045e92295aff91b679215446549b4aeb084da46495b",
      "transactionIndex": "0x0",
      "address": "0x9b8397f1b0fecd3a1a40cdd5e8221fa461898517",
      "data": "0x",
      "topics": [
        "0x199cd93e851e4c78c437891155e2112093f8f15394aa89dab09e38d6ca072787",
        "0x0000000000000000000000000000000000000000000000000000000000000005"
      ]
    }
  }
}
```

</TabItem>

</Tabs>

<Tabs>

<TabItem value="All logs for privacy group" label="All logs for privacy group" default>

```json
{
  "id": 1,
  "method": "priv_subscribe",
  "params": ["4sSv8eqB6/0lV9I0tBGUhPjjHtLEf3z0eeMc8Lokkyo=", "logs", {}]
}
```

</TabItem>

<TabItem value="Specific parameters">

```json
{
  "id": 1,
  "method": "priv_subscribe",
  "params": [
    "4sSv8eqB6/0lV9I0tBGUhPjjHtLEf3z0eeMc8Lokkyo=",
    "logs",
    {
      "address": "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
      "topics": [
        "0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"
      ]
    }
  ]
}
```

</TabItem>

<TabItem value="Result" label="Result">

```json
{ "jsonrpc": "2.0", "id": 1, "result": "0x1" }
```

</TabItem>

<TabItem value="Notification" label="Notification">

```json
{
  "jsonrpc": "2.0",
  "method": "priv_subscription",
  "params": {
    "subscription": "0x1",
    "privacyGroupId": "4sSv8eqB6/0lV9I0tBGUhPjjHtLEf3z0eeMc8Lokkyo=",
    "result": {
      "logIndex": "0x0",
      "removed": false,
      "blockNumber": "0x285",
      "blockHash": "0x98490766b16de2a4d044c04d92599d71e626bc96e42f0c74274ef4e03fafd579",
      "transactionHash": "0x40034ef14e3a22946693dd2a11efddf3a8850ddcad46b408198df6c176c53ffb",
      "transactionIndex": "0x0",
      "address": "0x61f96a7ed09877197d4fff0c29b8e523913651a9",
      "data": "0x",
      "topics": [
        "0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410",
        "0x0000000000000000000000000000000000000000000000000000000000000002"
      ]
    }
  }
}
```

</TabItem>

</Tabs>

### Pending transactions

To notify you about pending transactions added to the transaction pool for the node, use the `newPendingTransactions` parameter with `eth_subscribe`.

The pending transactions subscription returns the transaction hashes or transaction details of the pending transactions. If the `includeTransactions` parameter is not included, the default is transaction hashes only.

If a chain reorganization occurs, Besu resubmits transactions for inclusion in the new canonical chain. This means the subscription can publish notifications for the same pending transaction more than once.

To subscribe to pending transaction notifications and receive transaction hashes only:

```json
{
  "id": 1,
  "method": "eth_subscribe",
  "params": ["newPendingTransactions", { "includeTransactions": false }]
}
```

Example result:

```json
{ "jsonrpc": "2.0", "id": 1, "result": "0x1" }
```

Example notification:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x1",
    "result": "0x5705bc8bf875ff03e98adb98489428835892dc6ba6a6b139fee1becbc26db0b8"
  }
}
```

To subscribe to pending transaction notifications and receive transaction details:

```json
{
  "id": 1,
  "method": "eth_subscribe",
  "params": ["newPendingTransactions", { "includeTransactions": true }]
}
```

Example result:

```json
{ "jsonrpc": "2.0", "id": 1, "result": "0x2" }
```

Example notification:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x2",
    "result": {
      "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
      "gas": "0x5208",
      "gasPrice": "0x2540be400",
      "hash": "0x7a4185f40ee93cb27eb132f301d0a5414c1f871051f166fc8804c376aab3ffec",
      "input": "0x",
      "nonce": "0x13",
      "to": "0x9d8f8572f345e1ae53db1dfa4a7fce49b467bd7f",
      "value": "0x8ac7230489e80000",
      "v": "0xfe7",
      "r": "0xdd9013c67469d2fe79afdc61777c55bdced33c90fa6f9b83d8f9b7e445085123",
      "s": "0x45823a1ab22ae9c83876ea435dc5ecc4fe3a83c1bfbc340a5f57df2f5a474fa5"
    }
  }
}
```

### Dropped transactions

To notify you about transactions dropped from the transaction pool for the node, use the `droppedPendingTransactions` parameter with `eth_subscribe`.

The dropped transactions subscription returns the transaction hashes of the dropped transactions.

Dropped transactions can be re-added to the transaction pool from a variety of sources. For example, receiving a previously dropped transaction from a peer. As a result, it's possible to receive multiple dropped transaction notifications for the same transaction.

To subscribe to dropped transaction notifications:

```json
{ "id": 1, "method": "eth_subscribe", "params": ["droppedPendingTransactions"] }
```

Example result:

```json
{ "jsonrpc": "2.0", "id": 1, "result": "0x1" }
```

Example notification:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x1",
    "result": "0xf57d6a90a7fb30880cfbdf6b432b487d0e94a3b55b34dc4b45e3b0b237ecab4c"
  }
}
```

### Synchronizing

To notify you about synchronization progress, use the `syncing` parameter with `eth_subscribe`.

When behind the chain head, the synchronizing subscription returns an object indicating the synchronization progress. When fully synchronized, returns `false`.

To subscribe to synchronizing notifications:

```json
{ "id": 1, "method": "eth_subscribe", "params": ["syncing"] }
```

Example result:

```json
{ "jsonrpc": "2.0", "id": 1, "result": "0x4" }
```

Example notification while synchronizing:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x4",
    "result": {
      "startingBlock": "0x0",
      "currentBlock": "0x3e80",
      "highestBlock": "0x67b93c"
    }
  }
}
```

Example notification when synchronized with chain head:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "subscription": "0x4",
    "result": false
  }
}
```

## Unsubscribe

To cancel a subscription, use the [subscription ID](#subscription-id) with `eth_unsubscribe` or `priv_unsubscribe`. Only the connection that created a subscription can unsubscribe from it.

When cancelling a subscription for private logs, the privacy group ID must be specified.

`eth_unsubscribe` and `priv_unsubscribe` return `true` if subscription successfully unsubscribed; otherwise, returns an error.

To unsubscribe from a subscription with subscription ID of `0x1`:

```json
{ "id": 1, "method": "eth_unsubscribe", "params": ["0x1"] }
```

To unsubscribe from private logs subscription:

```json
{
  "id": 1,
  "method": "priv_unsubscribe",
  "params": ["4sSv8eqB6/0lV9I0tBGUhPjjHtLEf3z0eeMc8Lokkyo=", "0x2"]
}
```

Example result:

```json
{ "jsonrpc": "2.0", "id": 1, "result": true }
```
