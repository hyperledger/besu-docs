---
title: Create and send private transactions
description: Creating and sending private transactions with Hyperledger Besu
sidebar_position: 1
tags:
  - private networks
---

# Create and send private transactions

Create and send [private transactions](../../concepts/privacy/index.md) using:

- [web3js-quorum client library](../use-privacy/web3js-quorum.md) or [web3j client library](https://github.com/web3j/web3j)
- [`eea_sendRawTransaction`](#eea_sendrawtransaction)
- [`priv_distributeRawTransaction`](#priv_distributerawtransaction).

All private transaction participants must be online for a private transaction to be successfully distributed. If any participants are offline when submitting the private transaction, the transaction is not attempted and you must resubmit the transaction.

The `gas` and `gasPrice` specified when sending a private transaction are used by the [privacy marker transaction (PMT)](../../concepts/privacy/private-transactions/processing.md), not the private transaction itself.

:::note

Private transactions either deploy contracts or call contract functions. Ether transfer transactions cannot be private.

:::

## `eea_sendRawTransaction`

[`eea_sendRawTransaction`](../../reference/api/index.md#eea_sendrawtransaction) distributes the private transaction to the participating nodes, and signs and submits the PMT, as described in [Private transaction processing](../../concepts/privacy/private-transactions/processing.md).

:::note

If [sending concurrent transactions](concurrent-private-transactions.md), you must use [`priv_distributeRawTransaction`](#priv_distributerawtransaction) instead of [`eea_sendRawTransaction`](../../reference/api/index.md#eea_sendrawtransaction).

:::

## `priv_distributeRawTransaction`

Use [`priv_distributeRawTransaction`](../../reference/api/index.md#priv_distributerawtransaction) instead of [`eea_sendRawTransaction`](#eea_sendrawtransaction) when sending [concurrent private transactions](concurrent-private-transactions.md).

[`priv_distributeRawTransaction`](../../reference/api/index.md#priv_distributerawtransaction) distributes the private transaction to the participating nodes but does not sign and submit the PMT. That is, it performs steps 1 to 5 of [private transaction processing](../../concepts/privacy/private-transactions/processing.md).

If using [`priv_distributeRawTransaction`](../../reference/api/index.md#priv_distributerawtransaction) instead of [`eea_sendRawTransaction`](../../reference/api/index.md#eea_sendrawtransaction), use the value returned by [`priv_distributeRawTransaction`](../../reference/api/index.md#priv_distributerawtransaction), which is the enclave key to the private transaction in [Tessera](https://docs.tessera.consensys.net/), in the `data` field of a call to [`eth_sendRawTransaction`](../../../public-networks/reference/api/index.md#eth_sendrawtransaction). Use the value returned by [`priv_getPrivacyPrecompileAddress`](../../reference/api/index.md#priv_getprivacyprecompileaddress), which is the address of the [privacy precompiled contract](../../concepts/privacy/private-transactions/processing.md), in the `to` field of the call.

By using the [public Ethereum transaction](../../how-to/send-transactions/index.md), [`eth_sendRawTransaction`](../../../public-networks/reference/api/index.md#eth_sendrawtransaction), you are signing and submitting the PMT yourself instead of having it signed by the Besu node, giving you greater control over the PMT.

:::warning

If the PMT is not sent after distributing the private transaction, the distributed private transaction is not executed and the private states are not updated.

:::

```json title="Distribute private transaction using priv_distributeRawTransaction"
{
  "jsonrpc": "2.0",
  "method": "priv_distributeRawTransaction",
  "params": [
    "0xf90198808203e8832dc6c08080b8fb608060405234801561001057600080fd5b5060dc8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f24514604e57806355241077146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a6565b005b60005481565b80600081905550505600a165627a7a723058202bdbba2e694dba8fff33d9d0976df580f57bff0a40e25a46c398f8063b4c003600291ba05393543d483654fd01d9ee818cddfc7527dd6e13e6ef7b45a61e2ca13ffb6b70a0452338873862803ffe04056aea98cd0e3417ff971dcb384e54fce8ca1756a665a09de8260dc3763f8383a6a9ffe96909d36cd3ff4c346e3846a6467c50feaf0119e1a0839f41993789227ec721c9eaf1541683287fa436ef6edd9ec8fd088bad1a0c3c8a72657374726963746564"
  ],
  "id": 1
}
```

```json title="Enclave key to the private transaction in Tessera returned by priv_distributeRawTransaction"
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xfd0d90ab824574abc19c0776ca0210e764561d0ef6d621f2bbbea316eccfe56b"
}
```

Send the enclave key in the `data` field, and the [privacy precompile address](../../reference/api/index.md#priv_getprivacyprecompileaddress) in the `to` field of `eth_sendRawTransaction`:

```json
{
  "jsonrpc": "2.0",
  "method": "eth_sendRawTransaction",
  "params": [
    {
      "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
      "to": "0x000000000000000000000000000000000000007e",
      "data": "0xfd0d90ab824574abc19c0776ca0210e764561d0ef6d621f2bbbea316eccfe56b",
      "gas": "0x2E1800",
      "gasPrice": "0x9184e72a000"
    }
  ],
  "id": 1
}
```

## EEA-compliant or Besu-extended privacy

To create an [EEA-compliant private transaction], specify `privateFor` when creating the signed transaction passed as an input parameter to [`eea_sendRawTransaction`](../../reference/api/index.md#eea_sendrawtransaction).

To create a [Besu-extended private transaction], specify a `privacyGroupId` when creating the signed transaction passed as an input parameter to [`eea_sendRawTransaction`](../../reference/api/index.md#eea_sendrawtransaction).

## Unsigned and unencoded private transactions

The [`eea_sendRawTransaction`](../../reference/api/index.md#eea_sendrawtransaction) parameter is a signed RLP-encoded private transaction. Shown below are examples of unsigned and unencoded private transactions to create a contract.

```json title="Unencoded and unsigned EEA-compliant private transaction"
{
  "to": null,
  "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
  "gas": "0x7600",
  "gasPrice": "0x0",
  "data": "0x608060405234801561001057600080fd5b5060dc8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f24514604e57806355241077146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a6565b005b60005481565b80600081905550505600a165627a7a723058202bdbba2e694dba8fff33d9d0976df580f57bff0a40e25a46c398f8063b4c00360029",
  "nonce": "0x0",
  "privateFrom": "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
  "privateFor": [
    "g59BmTeJIn7HIcnq8VQWgyh/pDbvbt2eyP0Ii60aDDw=",
    "6fg8q5rWMBoAT2oIiU3tYJbk4b7oAr7dxaaVY7TeM3U="
  ],
  "restriction": "restricted"
}
```

```json title="Unencoded and unsigned Besu-extended private transaction"
{
  "to": null,
  "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
  "gas": "0x7600",
  "gasPrice": "0x0",
  "data": "0x608060405234801561001057600080fd5b5060dc8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f24514604e57806355241077146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a6565b005b60005481565b80600081905550505600a165627a7a723058202bdbba2e694dba8fff33d9d0976df580f57bff0a40e25a46c398f8063b4c00360029",
  "nonce": "0x0",
  "privateFrom": "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
  "privacyGroupId": "kAbelwaVW7okoEn1+okO+AbA4Hhz/7DaCOWVQz9nx5M=",
  "restriction": "restricted"
}
```

:::tip

The `example` directory in the [web3js-quorum client library](../use-privacy/web3js-quorum.md) contains examples of signing and encoding private transactions.

:::

<!-- links ---->

[EEA-compliant private transaction]: ../../concepts/privacy/privacy-groups.md#enterprise-ethereum-alliance-privacy
[Besu-extended private transaction]: ../../concepts/privacy/privacy-groups.md#besu-extended-privacy
