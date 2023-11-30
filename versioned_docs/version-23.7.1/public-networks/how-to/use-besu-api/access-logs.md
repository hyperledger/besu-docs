---
title: Access logs using JSON-RPC
sidebar_position: 5
description: Accessing logs using the Hyperledger Besu API
tags:
  - public networks
  - private networks
---

# Access logs using the Hyperledger Besu API

Subscribe to events, such as logs, using either [RPC Pub/Sub over WebSockets](rpc-pubsub.md) or filters over HTTP.

Access logs using the following Hyperledger Besu API methods:

- [`eth_getFilterChanges`](../../reference/api/index.md#eth_getfilterchanges)
- [`eth_getFilterLogs`](../../reference/api/index.md#eth_getfilterlogs)
- [`eth_getLogs`](../../reference/api/index.md#eth_getlogs).

Use [`eth_newFilter`](../../reference/api/index.md#eth_newfilter) to create the filter before using [`eth_getFilterChanges`](../../reference/api/index.md#eth_getfilterchanges) and [`eth_getFilterLogs`](../../reference/api/index.md#eth_getfilterlogs)).

Access logs for [private contracts](../../../private-networks/concepts/privacy/index.md) using the equivalent [`priv_*` methods and specifying the privacy group ID](#filters-for-private-contracts). For example, [`priv_getLogs`](../../reference/api/index.md#priv_getlogs).

:::note

The following examples use the sample contract included in [events and logs](../../concepts/events-and-logs.md).

:::

## Create a filter

Create a filter using [`eth_newFilter`](../../reference/api/index.md#eth_newfilter).

If the [example contract](../../concepts/events-and-logs.md) was deployed to 0x42699a7612a82f1d9c36148af9c77354759b210b, the following request for `eth_newFilter` creates a filter to log when `valueIndexed` is set to 5:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_newFilter",
  "params": [
    {
      "fromBlock": "earliest",
      "toBlock": "latest",
      "address": "0x42699a7612a82f1d9c36148af9c77354759b210b",
      "topics": [
        ["0xd3610b1c54575b7f4f0dc03d210b8ac55624ae007679b7a928a4f25a709331a8"],
        ["0x0000000000000000000000000000000000000000000000000000000000000005"]
      ]
    }
  ],
  "id": 1
}
```

[`eth_newFilter`](../../reference/api/index.md#eth_newfilter) returns a filter ID hash (for example, `0x1ddf0c00989044e9b41cc0ae40272df3`).

### Poll a filter for changes

To poll the filter for changes since the last poll, use [`eth_getFilterChanges`](../../reference/api/index.md#eth_getfilterchanges) with the filter ID hash returned by [`eth_newFilter`](../../reference/api/index.md#eth_newfilter).

If the contract had been executed twice since the last poll, with `valueIndexed` set to 1 and 5, [`eth_getFilterChanges`](../../reference/api/index.md#eth_getfilterchanges) returns only the log where the [topic](../../concepts/events-and-logs.md#event-parameters) for `valueIndexed` is 5:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "logIndex": "0x0",
      "removed": false,
      "blockNumber": "0x21c",
      "blockHash": "0xc7e6c9d5b9f522b2c9d2991546be0a8737e587beb6628c056f3c327a44b45132",
      "transactionHash": "0xfd1a40f9fbf89c97b4545ec9db774c85e51dd8a3545f969418a22f9cb79417c5",
      "transactionIndex": "0x0",
      "address": "0x42699a7612a82f1d9c36148af9c77354759b210b",
      "data": "0x0000000000000000000000000000000000000000000000000000000000000005",
      "topics": [
        "0xd3610b1c54575b7f4f0dc03d210b8ac55624ae007679b7a928a4f25a709331a8",
        "0x0000000000000000000000000000000000000000000000000000000000000005"
      ]
    }
  ]
}
```

### Get all logs for a filter

To get all logs for a filter, use [`eth_getFilterLogs`](../../reference/api/index.md#eth_getfilterlogs).

If the contract had been executed twice with `valueIndexed` set to 5 since the filter was created using `eth_newFilter`, `eth_getFilterLogs` returns:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "logIndex": "0x0",
      "removed": false,
      "blockNumber": "0x1a7",
      "blockHash": "0x4edda22a242ddc7bc51e2b6b11e63cd67be1af7389470cdea9c869768ff75d42",
      "transactionHash": "0x9535bf8830a72ca7d0020df0b547adc4d0ecc4321b7d5b5d6beb1eccee5c0afa",
      "transactionIndex": "0x0",
      "address": "0x42699a7612a82f1d9c36148af9c77354759b210b",
      "data": "0x0000000000000000000000000000000000000000000000000000000000000005",
      "topics": [
        "0xd3610b1c54575b7f4f0dc03d210b8ac55624ae007679b7a928a4f25a709331a8",
        "0x0000000000000000000000000000000000000000000000000000000000000005"
      ]
    },
    {
      "logIndex": "0x0",
      "removed": false,
      "blockNumber": "0x21c",
      "blockHash": "0xc7e6c9d5b9f522b2c9d2991546be0a8737e587beb6628c056f3c327a44b45132",
      "transactionHash": "0xfd1a40f9fbf89c97b4545ec9db774c85e51dd8a3545f969418a22f9cb79417c5",
      "transactionIndex": "0x0",
      "address": "0x42699a7612a82f1d9c36148af9c77354759b210b",
      "data": "0x0000000000000000000000000000000000000000000000000000000000000005",
      "topics": [
        "0xd3610b1c54575b7f4f0dc03d210b8ac55624ae007679b7a928a4f25a709331a8",
        "0x0000000000000000000000000000000000000000000000000000000000000005"
      ]
    }
  ]
}
```

:::tip

You can use [`eth_getLogs`](#get-logs-using-a-filter-options-object) with a filter options object to get all logs matching the filter options instead of using [`eth_newFilter`](../../reference/api/index.md#eth_newfilter) followed by [`eth_getFilterLogs`](../../reference/api/index.md#eth_getfilterlogs).

:::

## Uninstall a filter

When a filter is no longer required, use [`eth_uninstallFilter`](../../reference/api/index.md#eth_uninstallfilter) to remove the filter.

## Filters for private contracts

Filters for private contracts are created, accessed, and uninstalled using:

- [`priv_getFilterChanges`](../../reference/api/index.md#priv_getfilterchanges)
- [`priv_getFilterLogs`](../../reference/api/index.md#priv_getfilterlogs)
- [`priv_getLogs`](../../reference/api/index.md#priv_getlogs)
- [`priv_newFilter`](../../reference/api/index.md#priv_newfilter)
- [`priv_uninstallFilter`](../../reference/api/index.md#priv_uninstallfilter).

The [privacy group ID](../../../private-networks/concepts/privacy/index.md) must be specified as parameter 0 for the `priv` methods.

```json
{
  "jsonrpc": "2.0",
  "method": "priv_newFilter",
  "params": [
    "4rFldHM792LeP/e2WPkTXZedjwKuTr/KwCFTt6mBbkI=",
    {
      "fromBlock": "earliest",
      "toBlock": "latest",
      "addresses": ["0x991cc548c154b2953cc48c02f782e1314097dfbb"],
      "topics": [
        "0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410"
      ]
    }
  ],
  "id": 1
}
```

## Get logs using a filter options object

To get all logs for a filter options object, use [`eth_getLogs`](../../reference/api/index.md#eth_getlogs) or [`priv_getLogs`](../../reference/api/index.md#priv_getlogs) for a private contract.

The following request for `eth_getLogs` returns all the logs where the example contract has been deployed to `0x42699a7612a82f1d9c36148af9c77354759b210b` and executed with `valueIndexed` set to 5.

```json
{
  "jsonrpc": "2.0",
  "method": "eth_getLogs",
  "params": [
    {
      "fromBlock": "earliest",
      "toBlock": "latest",
      "address": "0x42699a7612a82f1d9c36148af9c77354759b210b",
      "topics": [
        ["0xd3610b1c54575b7f4f0dc03d210b8ac55624ae007679b7a928a4f25a709331a8"],
        ["0x0000000000000000000000000000000000000000000000000000000000000005"]
      ]
    }
  ],
  "id": 1
}
```

The above example returns the same result as calling [eth_newFilter](#creating-a-filter) followed by [eth_getFilterLogs](#getting-all-logs-for-a-filter).
