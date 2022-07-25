---
description: web3js-quorum client library
---

# Use the web3js-quorum client library

The [web3js-quorum library](https://github.com/ConsenSys/web3js-quorum) adds a property to your web3
instance by extending [web3](https://github.com/ethereum/web3.js/). Use the library to create and
send RLP-encoded transactions using JSON-RPC.

!!! important
    web3js-quorum supports JSON-RPC over HTTP only.

!!! note

    web3js-quorum includes all [quorum.js](https://github.com/ConsenSys/quorum.js) and [web3js-eea](https://github.com/ConsenSys/web3js-eea) features.

    If migrating to web3js-quorum, then update your Javascript code as indicated in the following examples.

    [Read the migration guide for more information about updating your code.](https://consensys.github.io/web3js-quorum/latest/tutorial-Migrate%20from%20web3js-eea.html)

## Prerequisites

* [Node.js (version > 10)](https://nodejs.org/en/download/)
* [The web3 library must be installed in your project](https://github.com/ChainSafe/web3.js#installation)

## Add web3js-quorum to project

```bash
npm install web3js-quorum
```

## Initialize the web3js-quorum client

Initialize your client where:

* `<JSON-RPC HTTP endpoint>` is the JSON-RPC HTTP endpoint of your Hyperledger Besu node. Specified
  by the [`--rpc-http-host`](../../../public-networks/reference/cli/options.md#rpc-http-host) and
  [`--rpc-http-port`](../../../public-networks/reference/cli/options.md#rpc-http-port) command line options.

!!! example

    === "Syntax"

        ```js
        const Web3 = require("web3");
        const Web3Quorum = require("web3js-quorum");
        const web3 = new Web3Quorum(new Web3("<JSON-RPC HTTP endpoint>"));
        ```

    === "Example"

        ```js
        const Web3 = require("web3");
        const Web3Quorum = require("web3js-quorum");
        const web3 = new Web3Quorum(new Web3("http://localhost:8545"));
        ```

!!! note
    When migrating from web3js-eea to web3js-quorum, use `Web3Quorum`. The constructor doesn't require the chain ID anymore.
    Chain ID is automatically retrieved from the chain using the specified JSON-RPC HTTP endpoint.

## Deploy a contract with `generateAndSendRawTransaction`

To deploy a private contract, you need the contract binary. You can use
[Solidity](https://solidity.readthedocs.io/en/develop/using-the-compiler.html) to get the
contract binary.

!!! example "Deploying a contract with `web3.priv.generateAndSendRawTransaction`"

    ```js
    const contractOptions = {
      data: `0x123`, // contract binary
      privateFrom: "tesseraNode1PublicKey",
      privateFor: ["tesseraNode3PublicKey"],
      privateKey: "besuNode1PrivateKey"
    };
    return web3.priv.generateAndSendRawTransaction(contractOptions);
    ```

`web3.priv.generateAndSendRawTransaction(contractOptions)` returns the transaction hash. To get the private
transaction receipt, use `web3.priv.waitForTransactionReceipt(txHash)`.

## web3js-quorum methods

For more information about the web3js-quorum methods, see the
[web3js-quorum reference documentation](https://consensys.github.io/web3js-quorum/latest/index.html).
