---
description: Methods for accessing and managing private transactions and privacy groups in
             Hyperledger Besu
---

# Accessing private and privacy marker transactions

A Hyperledger Besu private transaction creates a
[privacy marker transaction](../../Concepts/Privacy/Private-Transaction-Processing.md) and
the private transaction itself.

## Transaction receipts

With the transaction hash returned when submitting the private transaction, to get the transaction
receipt for the:

* Private transaction, use
  [`priv_getTransactionReceipt`](../../Reference/API-Methods.md#priv_gettransactionreceipt).
* Privacy marker transaction, use
  [`eth_getTransactionReceipt`](../../Reference/API-Methods.md#eth_gettransactionreceipt).

The transaction receipt includes a `status` indicating success (`0x1`) or failure (`0x0`) of the
transactions.

!!! example "Private Transaction Failure Example"

    To deploy a private contract, you submit a transaction using
    [`eea_sendRawTransaction`](../Send-Transactions/Creating-Sending-Private-Transactions.md). If
    contract deployment fails because of insufficient gas, the privacy marker transaction receipt
    has a status of success and the private transaction receipt has a status of failure.

## Transactions

With the transaction hash returned when submitting the private transaction, to get the:

* Private transaction, use
  [`priv_getPrivateTransaction`](../../Reference/API-Methods.md#priv_getprivatetransaction).
* Privacy marker transaction, use
  [`eth_getTransactionByHash`](../../Reference/API-Methods.md#eth_gettransactionbyhash).
