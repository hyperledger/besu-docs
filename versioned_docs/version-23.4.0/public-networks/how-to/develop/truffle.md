---
title: Use Truffle
sidebar_position: 1
description: Using Hyperledger Besu with Truffle
tags:
  - private networks
---

# Use Truffle

Developing for Hyperledger Besu using Truffle is the same as developing for public Ethereum networks using Truffle. Truffle supports Besu with the only difference being Besu does not support private key management. To use Besu with Truffle, you must configure a Truffle wallet.

## Install a Truffle wallet

To install a Truffle wallet:

```bash
npm install --save @truffle/hdwallet-provider
```

:::note

With Truffle 5, you must use a Web3 1.0 enabled wallet or the Truffle tasks hang.

:::

### Update the Truffle configuration file

To add the wallet provider, update the `truffle-config.js` file in the project directory. Replace:

- `<JSON-RPC-http-endpoint>` with the JSON-RPC endpoint (IP address and port) of a Besu node.
- `<account-private-key>` with the private key of an Ethereum account containing Ether.

```javascript
const PrivateKeyProvider = require("@truffle/hdwallet-provider");
const privateKey = "<account-private-key>";
const privateKeyProvider = new PrivateKeyProvider(
  privateKey,
  "<JSON-RPC-http-endpoint>",
);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    besuWallet: {
      provider: privateKeyProvider,
      network_id: "*",
    },
  },
};
```

### Start a Besu node

Start a Besu node with JSON-RPC enabled on the endpoint specified in the Truffle configuration file.

### Deploy a contract

To deploy a contract onto the Besu network:

```bash
truffle migrate --network besuWallet
```
