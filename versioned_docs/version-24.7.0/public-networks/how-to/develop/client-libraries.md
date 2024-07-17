---
title: Use client libraries
sidebar_position: 2
description: Hyperledger Besu client libraries
tags:
  - public networks
  - private networks
---

# Use client libraries

Dapps use client libraries, such as [web3.js](https://github.com/ethereum/web3.js/), [web3j](https://github.com/web3j/web3j), or [ethereumj](https://github.com/ethereum/ethereumj), to forward JSON-RPC requests to Hyperledger Besu. Any client library implementing core Ethereum RPC methods works with Besu.

Use the [web3js-quorum library](../../../private-networks/how-to/use-privacy/web3js-quorum.md) with Besu for [privacy features](../../../private-networks/concepts/privacy/index.md).

![Client Libraries](../../../assets/images/Hyperledger-Besu-Client-Libraries.png)

Use client libraries to:

- Create signed transactions
- [Create and send private transactions].

:::note

[Hyperledger Besu does not support key management inside the client](../send-transactions.md#use-wallets-for-key-management).

:::

<!-- Links -->

[Create and send private transactions]: ../../../private-networks/how-to/send-transactions/private-transactions.md
