---
description: funds transfer transactions
---

# Funds transfer transactions

You can get started with the [Developer Quickstart](../Developer-Quickstart.md) to rapidly generate local blockchain networks.

In this tutorial we'll show you how to transfer funds (ETH) between accounts in a transaction

## Prerequisites

* A [Private network](../Examples/Private-Network-Example.md), to deploy public contracts

## 1. Use the eth_sendSignedTransaction API call

This is the simplest way to transfer funds between externally owned accounts. This tutorial uses the `eth_sendSignedTransaction` and one of the pre seeded accounts with ETH to transfer funds to a newly created account. The private key used here `0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63` is on of our test accounts and should not be used in a production network. Before making the transaction we check the balances of both accounts so we can verify the funds transfer after the transaction. Essentially we use the account addresses for the `from` and `to` parameters and the `value` is the amount of ETH to transfer between accounts. We then sign the transaction with Account A's private key and send it using the *eth_sendSignedTransaction* API call. Once it completes, we will see that there is an updated balance for each account. A full [example](https://github.com/ConsenSys/quorum-dev-quickstart/blob/master/files/besu/smart_contracts/scripts/eth_tx.js) can be found in the Developer Quickstart.

```bash

  const web3 = new Web3(host);
  // pre seeded account with 90000 ETH
  const privateKeyA = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
  const accountA = web3.eth.accounts.privateKeyToAccount(privateKeyA);
  var accountABalance = web3.utils.fromWei(await web3.eth.getBalance(accountA.address));
  console.log("Account A has balance of: " + accountABalance);

  // create a new account to use to transfer eth to
  var accountB = web3.eth.accounts.create();
  var accountBBalance = web3.utils.fromWei(await web3.eth.getBalance(accountB.address));
  console.log("Account B has balance of: " + accountBBalance);

  // send some eth from A to B
  const rawTxOptions = {
    nonce: web3.utils.numberToHex(await web3.eth.getTransactionCount(accountA.address)),
    from: accountA.address,
    to: accountB.address,
    value: "0x100", //amount of eth to transfer
    gasPrice: "0x0", //ETH per unit of gas
    gasLimit: "0x24A22" //max number of gas units the tx is allowed to use
  };
  console.log("Creating transaction...");
  const tx = new Tx(rawTxOptions);
  console.log("Signing transaction...");
  tx.sign(Buffer.from(accountA.privateKey.substring(2), "hex"));
  console.log("Sending transaction...");
  var serializedTx = tx.serialize();
  const pTx = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex').toString("hex"));
  console.log("tx transactionHash: " + pTx.transactionHash);

  //After the transaction there should be some ETH transferred
  var accountABalance = await getAccountBalance(host, accountA);
  console.log("Account A has an updated balance of: " + accountABalance);
  var accountBBalance = await getAccountBalance(host, accountB);
  console.log("Account B has an updatedbalance of: " + accountBBalance);
}
```

## 2. Use the eth_sendTransaction API call

An alternative way to perform the above is to use the `eth_sendTransaction` API call, however Hyperledger Besu does not support the `eth_sendTransaction` API call and keeps account management separate for better security. Instead, we use [EthSigner](https://github.com/ConsenSys/ethsigner) paired with Besu to make the `eth_sendTransaction` API call

An example of this can be found in the [Developer Quickstart](../Developer-Quickstart.md) where the RPCNode is paired with EthSigner and you can refer to the [EthSigner documentation](https://docs.ethsigner.consensys.net/en/latest/) for more details on configuration.

```bash
  const web3 = new Web3(host);
  // pre seeded account with 90000 ETH
  const privateKeyA = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
  const accountA = web3.eth.accounts.privateKeyToAccount(privateKeyA);
  var accountABalance = web3.utils.fromWei(await web3.eth.getBalance(accountA.address));
  console.log("Account A has balance of: " + accountABalance);

  // create a new account to use to transfer eth to
  var accountB = web3.eth.accounts.create();
  var accountBBalance = web3.utils.fromWei(await web3.eth.getBalance(accountB.address));
  console.log("Account B has balance of: " + accountBBalance);

  // send some eth from A to B
  const txOptions = {
    from: accountA.address,
    to: accountB.address,
    value: "0x100",  //amount of eth to transfer
    gasPrice: "0x0", //ETH per unit of gas
    gasLimit: "0x24A22" //max number of gas units the tx is allowed to use
  };
  console.log("Creating transaction...");
  const pTx = await web3.eth.sendTransaction(txOptions);
  console.log("tx transactionHash: " + pTx.transactionHash);

  //After the transaction there should be some ETH transferred
  var accountABalance = await getAccountBalance(host, accountA);
  console.log("Account A has an updated balance of: " + accountABalance);
  var accountBBalance = await getAccountBalance(host, accountB);
  console.log("Account B has an updatedbalance of: " + accountBBalance);
}
```
