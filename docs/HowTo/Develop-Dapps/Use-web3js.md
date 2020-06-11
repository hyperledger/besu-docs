---
description: Use Web3.js with Hyperledger Besu
---
Use Web3.js to connect your DApp to your Besu node.

Besu uses only signed raw transactions because it doesn't have account management.
You have to either
[use EthSigner](https://docs.ethsigner.pegasys.tech/en/stable/HowTo/Transactions/Make-Transactions/)
to sign the transaction
or send a raw transaction using [Web3.js sendSignedTransaction method](https://web3js.readthedocs.io/en/v1.2.9/web3-eth.html#sendsignedtransaction).

## Using a custom private Besu network

When using web3.js you will have to build a transaction with chain information.

If you do not connect to mainnet or a known public test network, you have to [customise the transaction
using ethereumjs-tx Common](https://github.com/ethereumjs/ethereumjs-vm/tree/master/packages/common#working-with-privatecustom-chains)
