---
title: Shard blob transactions
sidebar_position: 4
description: Shard blob transaction overview
tags:
  - public networks
---

# Shard blob transactions

Shard blob transactions introduced in [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) enables scaling the
Ethereum network by allowing large amounts of data (blobs) to be included that cannot be directly accessed or
processed by the Ethereum Virtual Machine (EVM).

When a blob-carrying transaction is included in a block, the transaction doesn't contain the blob data itself,
but rather a commitment to this data. This commitment can be verified by the EVM, ensuring the data's availability and
integrity without the EVM needing to access the data directly.

:::info

A commitment refers to a cryptographic proof that serves as a secure and verifiable way to attest to the existence
and integrity of the large data blobs.

:::

This mechanism significantly reduces the computational and storage burden on the Ethereum network while ensuring
that the data is available for those who need it (for example, rollups or other layer 2 solutions that rely on data 
availability for their security and operation).

Blobs are temporarily stored by consensus clients such as Teku, and blocks on the execution layer permanently store
the the reference to the blob.

## View blob transaction costs

Use the [`eth_blobBaseFee`](../../reference/api/index.md#eth_blobbasefee) method to view the current base
fee per blog gas in wei.

You can also use [`eth_feeHistory`](../../reference/api/index.md#eth_feehistory) to view the historical
blob transaction cost details.