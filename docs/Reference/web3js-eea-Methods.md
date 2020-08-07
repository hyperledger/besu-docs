---
description: web3js-eea methods reference
---

# web3js-eea

Use the [web3js-eea library](https://github.com/PegaSysEng/web3js-eea) to
[create and send private transactions].

## Options parameter

The Options parameter has the following properties:

* `privateKey`: Ethereum private key with which to sign the transaction.
* `privateFrom` : Orion public key of the sender.
* [`privateFor` : Orion public keys of recipients or `privacyGroupId`: Privacy group to receive the transaction](../Concepts/Privacy/Privacy-Groups.md)
* `nonce` : Optional. If not provided, calculated using [`priv_getEeaTransactionCount`](API-Methods.md#priv_geteeatransactioncount).
* `to` : Optional. Contract address to send the transaction to. Do not specify for contract
  deployment transactions.
* `data` : Transaction data.

## createPrivacyGroup

Creates a privacy group for Hyperledger Besu privacy.

### Parameters

[Transaction options](#options-parameter)

`name` : `string` - Name of the privacy group. Optional.

`description` : `string` - Description for the privacy group. Optional.

### Returns

`string` : Privacy group ID.

!!! example

    ```bash
    const createPrivacyGroup = () => {
      const contractOptions = {
        addresses: [orion.node1.publicKey, orion.node2.publicKey],
        name: "Privacy Group A",
        description: "Members of Group A"
      };
      return web3.eea.createPrivacyGroup(contractOptions).then(result => {
        console.log(`The privacy group created is:`, result);
        return result;
      });
    };
    ```

## deletePrivacyGroup

Deletes a privacy group.

### Parameters

[Transaction options](#options-parameter).

### Returns

`string` : Privacy group ID.

!!! example

    ```bash
    const deletePrivacyGroup = givenPrivacyGroupId => {
      const contractOptions = {
        privacyGroupId: givenPrivacyGroupId
      };
      return web3.eea.deletePrivacyGroup(contractOptions).then(result => {
        console.log(`The privacy group deleted is:`, result);
        return result;
      });
    };
    ```

## findPrivacyGroup

Finds privacy groups containing only the specified members.

### Parameters

[Transaction options](#options-parameter).

### Returns

`array of objects` : Privacy groups containing only the specified members.

!!! example

    ```bash
    const findPrivacyGroup = () => {
      const contractOptions = {
        addresses: [orion.node1.publicKey, orion.node2.publicKey]
      };
      return web3.eea.findPrivacyGroup(contractOptions).then(result => {
        console.log(`The privacy groups found are:`, result);
        return result;
      });
    };
    ```

## generatePrivacyGroup

Generates the privacy group ID for
[EEA privacy](../Concepts/Privacy/Privacy-Groups.md#enterprise-ethereum-alliance-privacy). The
privacy group ID is the RLP-encoded `privateFor` and `privateFrom` keys.

### Parameters

[Transaction options](#options-parameter).

### Returns

`string` : Privacy group ID.

!!! example

    ```bash
    const privacyGroupId = web3.eea.generatePrivacyGroup({
      privateFrom: "A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=",
      privateFor: ["Ko2bVqD+nNlNYL5EE7y3IdOnviftjiizpjRt+HTuFBs="]
    });
    ```

## getMarkerTransaction

Retrieves the [privacy marker transaction](../Concepts/Privacy/Private-Transaction-Processing.md)
receipt.

### Parameters

`txHash` - `string` : Transaction hash of the private transaction.

`retries` - `int` : Maximum number of attempts to get the private marker transaction receipt.

`delay` - `int` : Delay between retries in milliseconds.

### Returns

Privacy marker transaction receipt.

!!! example

    ```bash
    const privateMarkerTransacion = web3.eea.getMarkerTransaction("0x9c41b3d44ed73511c82a9e2b1ef581eb797475c82f318ca2802358d3ba4a8274", 5, 100);
    ```

## getTransactionCount

Retrieves the number of transactions sent from the specified address for the privacy group.

### Parameters

[Transaction options](#options-parameter).

### Returns

`int` : Transaction count for that account (`privateKey`) and privacy group.

!!! example

    ```bash
    return web3.eea
       .getTransactionCount({
       privateKey: besu.node1.privateKey,
       privateFrom: orion.node1.publicKey,
       privateFor: [orion.node2.publicKey],
    })
    ```

## getTransactionReceipt

Retrieves the private transaction receipt using
[`priv_getTransactionReceipt`](API-Methods.md#priv_getTransactionReceipt).

### Parameters

`txHash` - `string` : Transaction hash of the private transaction.

`enclavePublicKey` - `string` : [`privateFrom` key for the transaction](#options-parameter).

`retries` - `int` : Optional. Maximum number of attempts to get the private marker transaction
receipt. The default is `300`.

`delay` - `int` : Optional. Delay between retries in milliseconds. The default is `1000`.

### Returns

Private transaction receipt.

!!! example

    ```bash
    const privateTxReceipt = web3.eea.getTransactionReceipt("0x9c41b3d44ed73511c82a9e2b1ef581eb797475c82f318ca2802358d3ba4a8274", "A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=");
    ```

## sendRawTransaction

Signs and sends a RLP-encoded private transaction to Besu using
[`eea_sendRawTransaction`](API-Methods.md#eea_sendrawtransaction).

`sendRawTransaction` supports [EEA-compliant privacy](../HowTo/Use-Privacy/EEA-Compliant.md) using
`privateFor`, or [Besu-extended privacy](../HowTo/Use-Privacy/Privacy.md) using `privacyGroupId`.

### Parameters

[Transaction options](#options-parameter).

### Returns

`string` : Transaction hash of the
[`privacy marker transaction`](../Concepts/Privacy/Private-Transaction-Processing.md).

!!! example "Besu-extended Privacy"

    ```bash tab="Contract Deployment with privacyGroupId"
    const createPrivateEmitterContract = privacyGroupId => {
      const contractOptions = {
        data: `0x${binary}`,
        privateFrom: orion.node1.publicKey,
        privacyGroupId,
        privateKey: besu.node1.privateKey
      };
      return web3.eea.sendRawTransaction(contractOptions);
    };
    ```

    ```bash tab="Contract Invocation with privacyGroupId "
    const functionCall = {
       to: address,
       data: functionAbi.signature,
       privateFrom,
       privacyGroupId,
       privateKey
    };
    return web3.eea.sendRawTransaction(functionCall);
    ```

!!! example "EEA-compliant Privacy"

    ```bash tab="Contract Deployment with privateFor"
    const createPrivateEmitterContract = () => {
      const contractOptions = {
         data: `0x${binary}`,
         privateFrom: orion.node1.publicKey,
         privateFor: [orion.node2.publicKey],
         privateKey: besu.node1.privateKey
      };
      return web3.eea.sendRawTransaction(contractOptions);
    };
    ```

    ```bash tab="Contract Invocation with privateFor"
    const functionCall = {
      to: address,
      data: functionAbi.signature + functionArgs,
      privateFrom: orion.node1.publicKey,
      privateFor: [orion.node2.publicKey],
      privateKey: besu.node1.privateKey
    };
    return web3.eea.sendRawTransaction(functionCall);
    ```

<!-- Links -->
[create and send private transactions]: ../HowTo/Send-Transactions/Creating-Sending-Private-Transactions.md
