---
title: Access private and privacy marker transactions
description: Methods for accessing and managing private transactions and privacy groups in Hyperledger Besu
sidebar_position: 6
tags:
  - private networks
---

# Access private and privacy marker transactions

A Hyperledger Besu private transaction creates a [privacy marker transaction](../../concepts/privacy/private-transactions/processing.md) and the private transaction itself.

## Transaction receipts

With the transaction hash returned when submitting the private transaction, to get the transaction receipt for the:

- Private transaction, use [`priv_getTransactionReceipt`](../../reference/api/index.md#priv_gettransactionreceipt).
- Privacy marker transaction, use [`eth_getTransactionReceipt`](../../../public-networks/reference/api/index.md#eth_gettransactionreceipt).

The transaction receipt includes a `status` indicating if the transaction failed (`0x0`), succeeded (`0x1`), or was invalid (`0x2`).

:::note Private transaction failure example

To deploy a private contract, you submit a transaction using [`eea_sendRawTransaction`](../send-transactions/private-transactions.md). If contract deployment fails because of insufficient gas, the privacy marker transaction receipt has a status of success and the private transaction receipt has a status of failure.

:::

## Transactions

With the transaction hash returned when submitting the private transaction, to get the:

- Private transaction, use [`priv_getPrivateTransaction`](../../reference/api/index.md#priv_getprivatetransaction).
- Privacy marker transaction, use [`eth_getTransactionByHash`](../../../public-networks/reference/api/index.md#eth_gettransactionbyhash).
