---
description: deploying smart contracts
---

# Deploying smart contracts to an Ethereum chain

Use the [Developer Quickstart](../Developer-Quickstart.md) to rapidly generate local blockchain
networks.

This tutorial shows you how to deploy smart contracts as transactions to a network.

## Prerequisites

* A [private network](../Examples/Private-Network-Example.md) if deploying a public contract.

* A [privacy-enabled network](../Privacy/Configuring-Privacy.md) if deploying a private contract
    (Public contracts can also be deployed on privacy-enabled networks).

## Using `eth_sendSignedTransaction`

To deploy a smart contract using
[`eth_sendSignedTransaction`](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#sendsignedtransaction), use an
account's private key to sign and serialize the transaction, and send the API request.

This example uses the [web3js](https://www.npmjs.com/package/web3) library to make the API calls.

Using the
[`SimpleStorage.sol`](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/common/smart_contracts/contracts/SimpleStorage.sol)
smart contract as an example, create a new file called `compile.js` with the following content:

```js
// compile.js

const fs = require('fs').promises;
const solc = require('solc');

async function main() {
  // Load the contract source code
  const sourceCode = await fs.readFile('SimpleStorage.sol', 'utf8');
  // Compile the source code and retrieve the ABI and bytecode
  const { abi, bytecode } = compile(sourceCode, 'SimpleStorage');
  // Store the ABI and bytecode into a JSON file
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
  // Parse the compiler output to retrieve the ABI and bytecode
  const output = solc.compile(JSON.stringify(input));
  const artifact = JSON.parse(output).contracts.main[contractName];
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  };
}

main().then(() => process.exit(0));
```

Run the compile code to get the smart contract's output JSON:

```bash
node compile.js
```

Run `solc` to get the contract's bytecode and ABI:

```bash
solc SimpleStorage.sol --bin --abi
```

Once you have the bytecode and ABI, you can rename the output files to make them easier to use;
this tutorial refers to them as `SimpleStorage.bin` and `SimpleStorage.abi`.

Create a new file `public_tx.js` to send the transaction (or run the following commands in a JavaScript console).
The Developer Quickstart provides an [example of a public transaction script](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/public_tx.js).

!!! example "public_tx.js"

    ```js
    // compile.js
    
    const web3 = new Web3(host);
    // use an existing account, or make an account
    const privateKey = "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    
    // read in the contracts
    const contractJsonPath = path.resolve(__dirname, 'SimpleStorage.json');
    const contractJson = JSON.parse(fs.readFileSync(contractJsonPath));
    const contractAbi = contractJson.abi;
    const contractBinPath = path.resolve(__dirname,'SimpleStorage.bin');
    const contractBin = fs.readFileSync(contractBinPath);
    // initialize the default constructor with a value `47 = 0x2F`; this value is appended to the bytecode
    const contractConstructorInit = "000000000000000000000000000000000000000000000000000000000000002F";
    
    // get txnCount for the nonce value
    const txnCount = await web3.eth.getTransactionCount(account.address);
    
    const rawTxOptions = {
      nonce: web3.utils.numberToHex(txnCount),
      from: account.address,
      to: null, //public tx
      value: "0x00",
      data: '0x'+contractBin+contractInit, // contract binary appended with initialization value
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

`rawTxOptions` contains the following fields:

* `nonce` - the number of transactions sent from an address.
* `from` - address of the EthSigner account. For example `0xfe3b557e8fb62b89f4916b721be55ceb828dbd73`.
* `to` - address of the receiver. To deploy a contract, set to `null`.
* `gas` - amount of gas provided by the sender for the transaction.
* `gasPrice` - price for each unit of gas the sender is willing to pay.
* `data` - binary of the contract (in this example there's also a constructor initialization value,
    so we append that to the binary value).
* `value` - amount of Ether/Wei transferred from the sender to the recipient.

As the example demonstrates, once the transaction `tx` is created, you can sign it with the private
key of the account. You can then serialize it and call `eth_sendSignedTransaction` to deploy the
contract.

## Using `eth_sendTransaction`

Use [`eth_sendTransaction`](https://eth.wiki/json-rpc/API) as an alternative to `eth_sendSignedTransaction`.
However, Hyperledger Besu does not support the `eth_sendTransaction` API call and keeps account
management separate for stronger security. Instead, Besu uses
[EthSigner](https://docs.ethsigner.consensys.net/en/stable/) to make the `eth_sendTransaction` API call.

An example can be found in the [Developer Quickstart](../Developer-Quickstart.md) where the RPC node
is paired with EthSigner.
Refer to the [EthSigner documentation](https://docs.ethsigner.consensys.net/) for
configuration details.

Pass the following parameters to the
[`eth_sendTransaction`](https://docs.ethsigner.consensys.net/Reference/API-Methods/#eth_sendtransaction) call
to EthSigner; EthSigner then converts the request to an
[`eth_sendRawTransaction`](../../Reference/API-Methods.md#eth_sendrawtransaction) call that Besu uses:

```json
params: {
  "from": "0x9b790656b9ec0db1936ed84b3bea605873558198",
  "to": null,
  "gas": "0x76c0",
  "gasPrice": "0x9184e72a000",
  "data": "0x608060405234801561001057600080fd5b5060405161014d38038061014d8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055505060f38061005a6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80632a1afcd914604157806360fe47b114605d5780636d4ce63c146088575b600080fd5b604760a4565b6040518082815260200191505060405180910390f35b608660048036036020811015607157600080fd5b810190808035906020019092919050505060aa565b005b608e60b4565b6040518082815260200191505060405180910390f35b60005481565b8060008190555050565b6000805490509056fea2646970667358221220e6966e446bd0af8e6af40eb0d8f323dd02f771ba1f11ae05c65d1624ffb3c58264736f6c63430007060033"
}
```

The parameters are:

* `to` - address of the receiver. To deploy a contract, set to `null`.
* `from` - address of the EthSigner account. For example `0x9b790656b9ec0db1936ed84b3bea605873558198`.
* `gas` - amount of gas provided by the sender for the transaction
* `gasPrice` - price for each unit of gas the sender is willing to pay
* `data` - one of the following:
    * For contract deployments (this use case) - compiled code of the contract
    * For contract interactions - hash of the invoked method signature and encoded parameters
      (see [Ethereum Contract ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html))
    * For simple ether transfers - empty

Make the request using `eth_sendTransaction`:

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{"from":"0x9b790656b9ec0db1936ed84b3bea605873558198", "to":null, "gas":"0x7600","gasPrice":"0x9184e72a000", "data":"0x608060405234801561001057600080fd5b5060405161014d38038061014d8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055505060f38061005a6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80632a1afcd914604157806360fe47b114605d5780636d4ce63c146088575b600080fd5b604760a4565b6040518082815260200191505060405180910390f35b608660048036036020811015607157600080fd5b810190808035906020019092919050505060aa565b005b608e60b4565b6040518082815260200191505060405180910390f35b60005481565b8060008190555050565b6000805490509056fea2646970667358221220e6966e446bd0af8e6af40eb0d8f323dd02f771ba1f11ae05c65d1624ffb3c58264736f6c63430007060033"}], "id":1}' <JSON-RPC-endpoint:port>
```

## Using `eea_sendRawTransaction` for private contracts with web3js-quorum

To deploy a private contract to another node or [privacy group](../../Concepts/Privacy/Privacy-Groups.md) member, use the
[web3js-quorum](https://www.npmjs.com/package/web3js-quorum) library and
the [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction) API call.
You must use this API call instead of [`eth_sendTransaction`](https://eth.wiki/json-rpc/API) because Hyperledger Besu
keeps account management separate for stronger security.

The Developer Quickstart provides an
[example of a private transaction script](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/private_tx.js).

This example uses the [web3js](https://www.npmjs.com/package/web3) library to make the API calls.

Use [`web3.priv.generateAndSendRawTransaction`](https://consensys.github.io/web3js-quorum/latest/module-priv.html#~generateAndSendRawTransaction):

```js
const Web3 = require('web3');
const Web3Quorum = require('web3js-quorum');

const bytecode="608060405234801561001057600080fd5b5060405161014d38038061014d8339818101604052602081101561003357600080fd5b8101908080519060200190929190505050806000819055505060f38061005a6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80632a1afcd914604157806360fe47b114605d5780636d4ce63c146088575b600080fd5b604760a4565b6040518082815260200191505060405180910390f35b608660048036036020811015607157600080fd5b810190808035906020019092919050505060aa565b005b608e60b4565b6040518082815260200191505060405180910390f35b60005481565b8060008190555050565b6000805490509056fea2646970667358221220e6966e446bd0af8e6af40eb0d8f323dd02f771ba1f11ae05c65d1624ffb3c58264736f6c63430007060033";
// initialize the default constructor with a value `47 = 0x2F`; this value is appended to the bytecode
const contractConstructorInit = "000000000000000000000000000000000000000000000000000000000000002F";

const chainId = 1337;
const web3 = new Web3(clientUrl);
const web3quorum = new Web3Quorum(web3, chainId);

const txOptions = {
  data: '0x'+bytecode+contractConstructorInit,
  privateKey: fromPrivateKey,
  privateFrom: fromPublicKey,
  privateFor: [toPublicKey]
};
console.log("Creating contract...");
const txHash = await web3quorum.priv.generateAndSendRawTransaction(txOptions);
console.log("Getting contractAddress from txHash: ", txHash);

const privateTxReceipt = await web3quorum.priv.waitForTransactionReceipt(txHash);
console.log("Private Transaction Receipt: ", privateTxReceipt);
return privateTxReceipt;
```

`txOptions` contains the following field:

* `data` - compiled code of the contract (in this example there's also a constructor initialization value, so we append
  that to the bytecode).

The deployment process is creating the client as in the previous examples, but rather than deploying the contract with
`to: null`, it instead sends the transaction with `privateFor: [memberPublicKey/s]`.
Once you make the API call, you receive a `transactionHash`, which you can use to get a `transactionReceipt` containing
the contract's address.

Please note: the above doesn't use a privacy group and makes a simple node to node transaction. To use a privacy group,
is also quite simple and involves:

* creating the privacy group using the public keys of the nodes in the group
* specify the `privacyGroupId` instead of the `privateFor` option in the txOptions above and then send the transaction

The Developer Quickstart provides an
[example of a private transaction with a privacy group](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/private_tx_privacy_group.js).

## Using `eea_sendRawTransaction` for private contracts with web3js-eea

!!! warning

    This web3js-eea library will be deprecated on December 31, 2021.
    Please use the [web3js-quorum](https://www.npmjs.com/package/web3js-quorum) library instead and refer to the previous section.

To deploy a private contract to another [privacy group](../../Concepts/Privacy/Privacy-Groups.md) member, use the
[web3js-eea](https://github.com/ConsenSys/web3js-eea) library and
the [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction) API call.
You must use this API call instead of [`eth_sendTransaction`](https://eth.wiki/json-rpc/API) because Hyperledger Besu
keeps account management separate for stronger security.

The Developer Quickstart provides an
[example of a private transaction script](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/public_tx.js).

This example uses the [web3js](https://www.npmjs.com/package/web3) library to make the API calls.

Use `eea_sendRawTransaction`:

```js
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

`txOptions` contains the following field:

* `data` - compiled code of the contract (in this example there's also a constructor initialization value, so we append
  that to the bytecode).

The deployment process is creating the client as in the previous examples, but rather than deploying the contract with
`to: null`, it instead sends the transaction with `privateFor: [memberPublicKey/s]`.
Once you make the API call, you receive a `transactionHash`, which you can use to get a `transactionReceipt` containing
the contract's address.
