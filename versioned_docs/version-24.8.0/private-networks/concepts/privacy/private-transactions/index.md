---
description: Private transaction overview
---

# Private transactions

Private transactions have the same parameters as public Ethereum transactions, with the following additions:

- `privateFrom` - The Tessera public key of the transaction sender.

- One of the following:

  - `privateFor` - The Tessera public keys of the transaction recipients.
  
  - `privacyGroupId` - [The privacy group to receive the transaction](../privacy-groups.md).
  
- `restriction` - Whether the private transaction is `restricted` or `unrestricted`:

  - `restricted` - Only the nodes participating in the transaction receive and store the payload of the private transaction.
  
  - `unrestricted` - All nodes in the network receive the payload of the private transaction, but only the nodes participating in the transaction can read the transaction.

  :::info

  Besu implements `restricted` private transactions only.

  :::

The `gas` and `gasPrice` are used by the [privacy marker transaction (PMT)](processing.md), not the private transaction itself.

:::info

Because gas isn't required in private transactions, inefficient contracts deployed accidentally or deliberately can cause performance issues in privacy-enabled networks. Ensure your network has a mechanism to [establish trust offchain](../index.md#privacy-enabled-networks).

:::

You can [create and send private transactions](../../../how-to/send-transactions/private-transactions.md).

## Besu and Tessera keys

Besu and Tessera nodes both have public/private key pairs identifying them. A Besu node sending a private transaction to a Tessera node signs the transaction with the Besu node private key. The `privateFrom` and `privateFor` parameters specified in the RLP-encoded transaction string for [`eea_sendRawTransaction`](../../../reference/api/index.md#eea_sendrawtransaction) are the public keys of the Tessera nodes sending and receiving the transaction.

:::info

The mapping of Besu node addresses to Tessera node public keys is offchain. That is, the sender of a private transaction must know the Tessera node public key of the recipient.

:::

## Nonces

A nonce is the number of previous transactions made by the sender.

[Private transaction processing](processing.md) involves two transactions: the private transaction distributed to involved participants, and the privacy marker transaction (PMT) included on the public blockchain. Each of these transactions has its own nonce. Since the PMT is a public transaction, the PMT nonce is the public nonce for the account.

### Private transaction nonce

Besu maintains separate private states for each [privacy group](../privacy-groups.md). The private transaction nonce for an account is specific to the privacy group. That is, the nonce for account A for privacy group ABC is different to the nonce for account A for privacy group AB.

### Private nonce validation

Unlike public transactions, private transactions are not submitted to the [transaction pool](../../../../public-networks/concepts/transactions/pool.md). The private transaction is distributed directly to the participants in the transaction, and the PMT is submitted to the transaction pool.

Unlike [public transaction nonces](../../../../public-networks/concepts/transactions/validation.md), private transaction nonces aren't validated when the private transaction is submitted. If a private transaction has an incorrect nonce, the PMT is still valid and is added to a block. However, in this scenario, the private transaction execution fails when [processing the PMT](processing.md) for the private transaction with the incorrect nonce.

The following private transaction flow illustrates when nonce validation occurs:

1. Submit a private transaction with a [nonce value](#private-transaction-nonce).
1. The private transaction is distributed to all participants in the privacy group.
1. The PMT is created and submitted to the transaction pool with a nonce of `0` if using one-time accounts. If using a specific account with [`--privacy-marker-transaction-signing-key-file`](../../../reference/cli/options.md#privacy-marker-transaction-signing-key-file), the public nonce for that account is obtained and used for the PMT.
1. The PMT is mined and included in the block.
1. After the block containing the PMT is imported, and the PMT is processed, the private transaction is retrieved from the private transaction manager and executed.

   If the private transaction was submitted with a correct nonce in step 1, the nonce is validated as correct. If an incorrect nonce was submitted, the private transaction execution fails.

### Private nonce management

In Besu, you call [`eth_getTransactionCount`](../../../../public-networks/reference/api/index.md#eth_gettransactioncount) to get a nonce, then use that nonce with [`eea_sendRawTransaction`](../../../reference/api/index.md#eea_sendrawtransaction) to send a private transaction.

However, when you send multiple transactions in row, if a subsequent call to `getTransactionCount` happens before a previous transaction is processed, you can get the same nonce again.

You can manage private nonces in multiple ways:

- Let Besu handle it. You just need to wait long enough between calls to `sendRawTransaction` for the transactions to process. The current window is around 1.5 seconds, depending on block time.

  Public transactions deal with this issue, but the window is shorter, since you can use the transaction pool to take into account pending transactions (by using `eth_getTransactionCount("pending")`).

  For private transactions, the window is longer because private transactions aren't submitted to the transaction pool. You must wait until the private transaction's corresponding PMT is included in a block.

- Manage the nonce yourself, by keeping track of and providing the nonce at each call. We recommend this if you're [sending many transactions that are independent of each other](../../../how-to/send-transactions/concurrent-private-transactions.md).

  :::note

  You can use [`priv_getTransactionCount`](../../../reference/api/index.md#priv_gettransactioncount) or [`priv_getEeaTransactionCount`](../../../reference/api/index.md#priv_geteeatransactioncount) to get the nonce for an account for the specified privacy group or participants.

  :::

:::tip

The [web3js-quorum library includes an example](https://github.com/ConsenSys/web3js-quorum/blob/9a0f9eb1b91a4a0d93801f77782b509ae2e7314c/example/concurrentPrivateTransactions/concurrentPrivateTransactions.js) of nonce management when [sending concurrent private transactions](../../../how-to/send-transactions/concurrent-private-transactions.md). The example calculates the correct nonces for the private transactions and PMTs outside of Besu.

:::
