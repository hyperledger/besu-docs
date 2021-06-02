---
description: deploying smart contracts
---

# Deploying smart contracts to an Ethereum chain

You can get started with the [Developer Quickstart](../Developer-Quickstart.md) to rapidly generate local blockchain networks.

In this tutorial we'll show you how to deploy smart contracts as transactions to the network.

## Prerequisites

* A [Private network](../Examples/Private-Network-Example.md), to deploy public contracts

* A [Privacy-enabled network](../Privacy/Configuring-Privacy.md), to deploy private contracts. You can also deploy public contracts on a
network that has Privacy enabled.

## 1. Use the eth_sendSignedTransaction API call

To deploy a smart contract using the `eth_sendSignedTransaction` you use an account's private key to sign a transaction, then serialize it and send the API request.
An example can be found in the Developer Quickstart [here](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/public_tx.js). This example uses the [web3js](https://www.npmjs.com/package/web3) library to make the API calls

In this tutorial we will use the [SimpleStorage.sol](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/common/smart_contracts/contracts/SimpleStorage.sol) smart contract which can be compiled to get its bytecode using `solc` like so:

```bash
const fs = require('fs').promises;
const solc = require('solc');

async function main() {
  // Load the contract source code
  const sourceCode = await fs.readFile('SimpleStorage.sol', 'utf8');
  // Compile the source code and retrieve the ABI and Bytecode
  const { abi, bytecode } = compile(sourceCode, 'SimpleStorage');
  // Store the ABI and Bytecode into a JSON file
  const artifact = JSON.stringify({ abi, bytecode }, null, 2);
  await fs.writeFile('SimpleStorage.json', artifact);
}

function compile(sourceCode, contractName) {
  // Create the Solidity Compiler Standard Input and Output JSON
  const input = {
    language: 'Solidity',
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode'] } } },
  };
  // Parse the compiler output to retrieve the ABI and Bytecode
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}

main().then(() => process.exit(0));
```

which can be run using

```bash
node compile.js
```

Once you have the bytecode and ABI, you can send the transaction like so:

```bash
  const web3 = new Web3(host);
  //use an exsiting account, alternatively you can make an account
  const privateKey = "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  // get txnCount for the nonce value
  const txnCount = await web3.eth.getTransactionCount(account.address);

  const rawTxOptions = {
    nonce: web3.utils.numberToHex(txnCount),
    from: account.address,
    to: null, //public tx
    value: "0x00",
    data: '0x'+contractBin+contractInit,
    gasPrice: "0x0", //ETH per unit of gas
    gasLimit: "0x24A22" //max number of gas units the tx is allowed to use
  };
  console.log("Creating transaction...");
  const tx = new Tx(rawTxOptions);
  console.log("Signing transaction...");
  tx.sign(privateKey);
  console.log("Sending transaction...");
  var serializedTx = tx.serialize();
  const pTx = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex').toString("hex"));
  console.log("tx transactionHash: " + pTx.transactionHash);
  console.log("tx contractAddress: " + pTx.contractAddress);
```

Where the txOptions fields are as follows:
The `nonce` field is the number of transactions sent from an address
The `from` field is the address of the EthSigner account, that is `0xfe3b557e8fb62b89f4916b721be55ceb828dbd73` in this example  
The `to` field is generally the address of the receiver; however to deploy a contract the `to` field is set to `null`.  
The `gas` field is the amount of gas that is provided by the sender for the transaction, and unused gas is returned  
The `gasPrice` field is the price for each unit of gas you are willing to pay.  
The `data` field contains the binary of the contract. In this case we also have a constructor initialization value so we append that value to the binary value.  
The `value` field represents the amount of Ether/Wei from the sender to the recipient.  

Once the transaction `tx` is created, you sign it with the private key of the account. It is then serialized and then the `eth_sendSignedTransaction` API call can be made to deploy the contract.

## 3. Use the eth_sendTransaction API call

An alternative to the above method call is to use the `eth_sendTransaction` API call, however Hyperledger Besu does not support the `eth_sendTransaction` API call and keeps account management separate for better security. Instead, we use [EthSigner](https://github.com/ConsenSys/ethsigner) paired with Besu to make the `eth_sendTransaction` API call

An example of this can be found in the [Developer Quickstart](../Developer-Quickstart.md) where the RPCNode is paired with EthSigner and you can refer to the [EthSigner documentation](https://docs.ethsigner.consensys.net/en/latest/) for more details on configuration.

To deploy a smart contract you need to pass a few parameters to the [eth_sendTransaction](https://docs.ethsigner.consensys.net/en/stable/Reference/API-Methods/#eth_sendtransaction) API call to EthSigner; which in turn converts the request to an eth_sendRawTransaction that Besu uses

```bash
params: {
  "from": "0x9b790656b9ec0db1936ed84b3bea605873558198",
  "to": null,
  "gas": "0x76c0",
  "gasPrice": "0x9184e72a000",
  "data": "0x608060405234801561001057600080fd5b5060405161014d38038061014d8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055505060f38061005a6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80632a1afcd914604157806360fe47b114605d5780636d4ce63c146088575b600080fd5b604760a4565b6040518082815260200191505060405180910390f35b608660048036036020811015607157600080fd5b810190808035906020019092919050505060aa565b005b608e60b4565b6040518082815260200191505060405180910390f35b60005481565b8060008190555050565b6000805490509056fea2646970667358221220e6966e446bd0af8e6af40eb0d8f323dd02f771ba1f11ae05c65d1624ffb3c58264736f6c63430007060033"
}
```

Where the fields are as follows:
The `to` field is generally the address of the receiver; however to deploy a contract the `to` field is set to `null`.  
The `from` field is the address of the EthSigner account, that is `0x9b790656b9ec0db1936ed84b3bea605873558198` in the quickstart example  
The `gas` field is the amount of gas that is provided by the sender for the transaction, and unused gas is returned  
The `gasPrice` field is the price for each unit of gas you are willing to pay  
The `data` field has one of the following:
* For *contract deployments* (this use case): contains the compiled code of the contract
* For *contract interactions*: the hash of the invoked method signature and encoded parameters. Refer to the [Ethereum Contract ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html) for more details
* For *simple ether transfers*:  the field is empty

To make the request you can run:

!!! example "JSON-RPC `eth_sendTransaction` Request Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"0x9b790656b9ec0db1936ed84b3bea605873558198", "to":null, "gas":"0x7600","gasPrice":"0x9184e72a000", "data":"0x608060405234801561001057600080fd5b5060405161014d38038061014d8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055505060f38061005a6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80632a1afcd914604157806360fe47b114605d5780636d4ce63c146088575b600080fd5b604760a4565b6040518082815260200191505060405180910390f35b608660048036036020811015607157600080fd5b810190808035906020019092919050505060aa565b005b608e60b4565b6040518082815260200191505060405180910390f35b60005481565b8060008190555050565b6000805490509056fea2646970667358221220e6966e446bd0af8e6af40eb0d8f323dd02f771ba1f11ae05c65d1624ffb3c58264736f6c63430007060033"}], "id":1}' <JSON-RPC-endpoint:port>
    ```

## 3. Use the eea_sendRawTransaction API call

To deploy a private contract to another member we need to use the [web3js-eea](https://github.com/ConsenSys/web3js-eea) library and the [`eea_sendRawTransaction`](https://besu.hyperledger.org/en/1.4.3/Reference/web3js-eea-Methods/#sendrawtransaction) API. We use this API call instead of `eth_sendTransaction` because Hyperledger Besu keeps account management separate for better security.

An example can be found in the Developer Quickstart [here](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/public_tx.js). This example uses the [web3js](https://www.npmjs.com/package/web3) library to make the API calls

```bash
  const Web3 = require('web3');
  const EEAClient = require('web3-eea');

  const bytecode="608060405234801561001057600080fd5b5060405161014d38038061014d8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055505060f38061005a6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80632a1afcd914604157806360fe47b114605d5780636d4ce63c146088575b600080fd5b604760a4565b6040518082815260200191505060405180910390f35b608660048036036020811015607157600080fd5b810190808035906020019092919050505060aa565b005b608e60b4565b6040518082815260200191505060405180910390f35b60005481565b8060008190555050565b6000805490509056fea2646970667358221220e6966e446bd0af8e6af40eb0d8f323dd02f771ba1f11ae05c65d1624ffb3c58264736f6c63430007060033";
   // initialize the default constructor with a value `47 = 0x2F`; this value is appended to the bytecode
  const contractConstructorInit = "000000000000000000000000000000000000000000000000000000000000002F";

  const web3 = new Web3(clientUrl);
  const web3eea = new EEAClient(web3, 1337);
  const txOptions = {
    data: '0x'+bytecode+contractConstructorInit,
    privateKey: fromPrivateKey,
    privateFrom: fromPublicKey,
    privateFor: [toPublicKey]
  };
  console.log("Creating contract...");
  const txHash = await web3eea.eea.sendRawTransaction(txOptions);
  console.log("Getting contractAddress from txHash: ", txHash);

  const privateTxReceipt = await web3.priv.getTransactionReceipt(txHash, fromPublicKey);
  // console.log("Private Transaction Receipt: ", privateTxReceipt);
  return privateTxReceipt;
  
```

The contract's bytecode can be obtained via doing a compile (further details in the eth_sendTransaction API call method below)

The process is essentially creating the client as before, but rather than deploying the contract with a `to: null`, we instead send the transaction with a `privateFor: [memberPublicKey/s]`, and to sign the transaction we provide our privateKey as well. Once the API call is made we get a transactionHash as a return and can use this transactionHash to obtain a transactionReceipt which contains the contract's address.

Where the txOptions fields are as follows:
The `data` field contains the byteCode of the contract. In this case we also have a constructor initialization value so we append that value to the byteCode.  
