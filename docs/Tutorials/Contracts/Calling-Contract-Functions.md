---
description: calling smart contracts functions
---

# Interacting with deployed smart contracts

You can get started with the [Developer Quickstart](../Developer-Quickstart.md) to rapidly generate
local blockchain networks.

This tutorial shows you how to interact with smart contracts that have been deployed to a network.

## Prerequisites

* A network with a deployed smart contract as in the [deploying smart contracts tutorial](Deploying-Contracts.md)

## Interact with public contracts

This tutorial uses the
[`SimpleStorage.sol`](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/common/smart_contracts/contracts/SimpleStorage.sol)
contract:

```js
pragma solidity ^0.7.0;

contract SimpleStorage {
  uint public storedData;

  constructor(uint initVal) public {
    storedData = initVal;
  }

  function set(uint x) public {
    storedData = x;
  }

  function get() view public returns (uint retVal) {
    return storedData;
  }
}
```

Once the contract is deployed, you can perform a read operation using the `get` function call and a
write operation using the `set` function call.
This tutorial uses the [web3js](https://www.npmjs.com/package/web3) library to interact with the contract.
A [full example](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/public_tx.js)
of these calls can be found in the [Developer Quickstart].

### 1. Perform a read operation

To perform a read operation, you need the address that the contract was deployed to and the contract's ABI.
The contract's ABI can be obtained from compiling the contract; see the
[deploying smart contracts tutorial](Deploying-Contracts.md) for an example.

Use the [`web3.eth.Contract`](https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html) object to create a new
instance of the smart contract, then make the `get` function call from the contract's list of methods, which will return the value stored:

```js
async function getValueAtAddress(host, deployedContractAbi, deployedContractAddress){
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
  const res = await contractInstance.methods.get().call();
  console.log("Obtained value at deployed contract is: "+ res);
  return res
}
```

### 2. Perform a write operation

To perform a write operation, send a transaction to update the stored value.
As with the [`get` call](#1-perform-a-read-operation), you need to use the address that the contract was deployed to and the contract's ABI.
The account address must correspond to an actual account with some ETH in it to perform the transaction.
Because Besu doesn't manage accounts, this address is the address you use in
[EthSigner](https://docs.ethsigner.consensys.net/en/stable/) (or equivalent) to manage your accounts.

Make the `set` call passing in your account address, `value` as the updated value of the contract, and the amount of gas
you are willing to spend for the transaction:

```js
// You need to use the accountAddress details provided to Besu to send/interact with contracts
async function setValueAtAddress(host, accountAddress, value, deployedContractAbi, deployedContractAddress){
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
  const res = await contractInstance.methods.set(value).send({from: accountAddress, gasPrice: "0xFF", gasLimit: "0x24A22"});
  return res
}
```

### 3. Verify an updated value

To verify that a value has been updated, perform a `get` call after a `set` update call.

## Interact with private contracts

This private contracts example uses the same `SimpleStorage.sol` contract as in the
[public contracts example](#interact-with-public-contracts), but it uses the
[web3js-quorum](https://consensys.github.io/web3js-quorum/latest/index.html) library and the
[`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction) method to interact with the contract.
Both read and write operations are performed using the `eea_sendRawTransaction` API call.
A [full example](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/private_tx.js)
can be found in the [Developer Quickstart].

### 1. Perform a read operation

As in the public contracts example, to perform a read operation, you need the address that the contract was deployed to
and the contract's ABI.
You also need your private and public keys and the recipient's public key.

Use the [`web3.eth.Contract`](https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html) object to create a new
instance of the smart contract, extract the signature of function's ABI for the `get` method, and then use this value as
the `data` parameter for the `eea_sendRawTransaction` transaction.

The keys remain the same for the sender and recipient, and the `to` field is the contract's address.
Once you make the request, you receive a `transactionHash`, which you can use to get a `transactionReceipt` containing
the value stored:

```js
async function getValueAtAddress(clientUrl, address, contractAbi, fromPrivateKey, fromPublicKey, toPublicKey) {
  const web3 = new Web3(clientUrl)
  const web3eea = new EEAClient(web3, chainId);
  const contract = new web3eea.eth.Contract(contractAbi);
  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contract._jsonInterface.find(e => {
    return e.name === "get";
  });
  const functionParams = {
    to: address,
    data: functionAbi.signature,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey]
  };
  const transactionHash = await web3eea.eea.sendRawTransaction(functionParams);
  console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3eea.priv.getTransactionReceipt(transactionHash, fromPublicKey);
  console.log("The value from deployed contract is: " + result.output);
  return result;
};
```

### 2. Perform a write operation

Performing a write operation is almost the same process as the read operation, except that you encode the new value to
the `set` function's ABI, and then append these arguments to the `set` function's ABI and use this as the `data` field:

```js
async function setValueAtAddress(clientUrl, address, value, contractAbi, fromPrivateKey, fromPublicKey, toPublicKey) {
  const web3 = new Web3(clientUrl)
  const web3eea = new EEAClient(web3, chainId);
  const contract = new web3eea.eth.Contract(contractAbi);
  // eslint-disable-next-line no-underscore-dangle
  const functionAbi = contract._jsonInterface.find(e => {
    return e.name === "set";
  });
  const functionArgs = web3eea.eth.abi
    .encodeParameters(functionAbi.inputs, [value])
    .slice(2);
  const functionParams = {
    to: address,
    data: functionAbi.signature + functionArgs,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey]
  };
  const transactionHash = await web3eea.eea.sendRawTransaction(functionParams);
  console.log(`Transaction hash: ${transactionHash}`);
  const result = await web3eea.priv.getTransactionReceipt(transactionHash, fromPublicKey);
  return result;
};
```

### 3. Verify an updated value

To verify that a value has been updated, perform a `get` call after a `set` update call.

[Developer Quickstart]: ../Developer-Quickstart.md
