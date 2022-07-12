---
description: Using third party wallets for account management with Hyperledger Besu
---

# Using wallets for key management

Hyperledger Besu does not support key management inside the client. Use:

* [EthSigner](http://docs.ethsigner.consensys.net/en/latest/) with Besu to provide access to your
  key store and sign transactions.
* Third-party tools (for example, [MetaMask](https://metamask.io/) and [web3j](https://web3j.io/))
  for creating accounts.

In Besu, you can use the JSON-RPC methods:

* [`eth_getBalance`](../../reference/api/index.md#eth_getbalance) to retrieve the account balance.
* [`eth_sendRawTransaction`](../../reference/api/index.md#eth_sendrawtransaction) to transfer
  ether or create and interact with contracts. For more information, see
  [Transactions](../send-transactions.md#transactions)).
* [`eea_sendRawTransaction`](../../reference/api/index.md#eea_sendrawtransaction) to send
  [private transactions](../../private-networks/how-to/send-transactions/private-transactions.md).

!!! tip

    [EthSigner](http://docs.ethsigner.consensys.net/en/latest/) implements
    [`eth_sendTransaction`](http://docs.ethsigner.consensys.net/en/latest/Using-EthSigner/Using-EthSigner/#eth_sendtransaction)
    and [`eea_sendTransaction`](http://docs.ethsigner.consensys.net/en/latest/Using-EthSigner/Using-EthSigner/#eea_sendtransaction).
