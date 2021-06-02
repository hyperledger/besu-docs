---
description: calling smart contracts functions
---

# Interacting with smart contracts that are deployed to an Ethereum chain

You can get started with the [Developer Quickstart](../Developer-Quickstart.md) to rapidly generate local blockchain networks.

In this tutorial we'll show you how to interact with smart contracts that have been deployed to a network. If you need to deploy
a smart contract to your network, you can follow this [walk-through](Deploying-Contracts.md)

## Prerequisites

* A [Private network](../Examples/Private-Network-Example.md), to deploy public contracts

* A [Privacy-enabled network](../Privacy/Configuring-Privacy.md), to deploy private contracts. You can also deploy public contracts on a
network that has Privacy enabled.

* [Deploy a smart contract](Deploying-Contracts.md) to your network

## 1. Public Contracts

For this tutorial we will use the [`SimpleStorage.sol`](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/common/smart_contracts/contracts/SimpleStorage.sol) contract which looks like:

```bash
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

Once the contract has been deployed, we will the perform a read operation using the `get` function call and then a write operation using the `set` function call.
We will use the [web3js](https://www.npmjs.com/package/web3) library to interact with the contract here and a full [example](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/public_tx.js) of these calls can be found in the Developer Quickstart.

Calling the `get` function:
To make the function call, we need to use the *address* that the contract was deployed to and we need the contracts *ABI*. The contract's ABI can be obtained
via solc when doing a compile and there is an example of how to obtain this in the [deploy a smart contract](Deploying-Contracts.md) tutorial. We use the
[web3.eth.Contract](https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html) object to create a new instance of the smart contract and then make the function call `get` from its list of methods as can be seen below which will return the value stored.

```bash
async function getValueAtAddress(host, deployedContractAbi, deployedContractAddress){
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
  const res = await contractInstance.methods.get().call();
  console.log("Obtained value at deployed contract is: "+ res);
  return res
}
```

Calling the `set` function:
To perform a write operation, we use an account address and send a transaction to update the stored value. As with the `get` call from above, you need to use the *address* that the contract was deployed to and the contracts *ABI*. The account address you use here must correspond to an actual account with some eth in it to
perform the transaction. Because Besu doesn't manage accounts, this address is the address you use in EthSigner (or equivalent) to manage your accounts. The `value`
is the updated value that you set and you make the `send` call passing in your account address and the amount of gas you are willing to spend for the transaction like below.

```bash
// You need to use the accountAddress details provided to Quorum to send/interact with contracts
async function setValueAtAddress(host, accountAddress, value, deployedContractAbi, deployedContractAddress){
  const web3 = new Web3(host);
  const contractInstance = new web3.eth.Contract(deployedContractAbi, deployedContractAddress);
  const res = await contractInstance.methods.set(value).send({from: accountAddress, gasPrice: "0xFF", gasLimit: "0x24A22"});
  return res
}
```

To verify that the value has been updated, you can perform a `get` call after the `set` update call.

## 2. Private Contracts

We will use the same SimpleStorage.sol contract for this example too, but because this is a private transaction we will be using the [web3js-eea](https://github.com/ConsenSys/web3js-eea) library and the [`eea_sendRawTransaction`](https://besu.hyperledger.org/en/1.4.3/Reference/web3js-eea-Methods/#sendrawtransaction) method to interact with the contract. Both read and write operations are performed using the `eea_sendRawTransaction` API call and a full [example](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/private_tx.js) can be found in the Developer Quickstart.

Calling the `get` function:
Just like the public transaction example above, we will need the conract's ABI and the address it is deployed to, but also your private and public keys and the recepient's public key. We create a contract object and the way in which we interact is slightly different to the public method. Essentially we extract the signature of function's ABI for the `get` method and then use this value as the data parameter for the eea_sendRawTransaction transaction. The keys remain the same for the sender and recipient and the `to` field is the contract's address. Once you make the request you will get back a transactionHash and you make another call to get the Transaction Receipt, where the output field is the value stored for the contract.

```bash
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

Calling the `set` function:
To perform a write operation, it is almost the exact same process as the `get` call from above, with the exception that you encode the new value to use to the set function's ABI and then append these arguments to the function's ABI and use this as the `data` field as can be seen below.

```bash
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

To verify that the value has been updated, you can perform a `get` call after the `set` update call.
