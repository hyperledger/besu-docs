---
description: Web3.js specific transaction and account management settings for Hyperledger Besu
---

# Use Web3.js with Hyperledger Besu

Use Web3.js to connect your Dapp to your Besu node.

## Account management

Besu uses only signed raw transactions and doesn't provide direct way to sign a transaction.

Read instructions in the [account management](../Send-Transactions/Account-Management.md) article.

## Using a custom private Besu network

Web3.js require a transaction with chain information.

For private or custom networks (not mainnet or a known public test network), [customise the transaction
using ethereumjs-tx Common](https://github.com/ethereumjs/ethereumjs-vm/tree/master/packages/common#working-with-privatecustom-chains)
