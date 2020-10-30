---
description: web3js-eea client library
---

# web3js-eea client library

The [web3js-eea library](https://github.com/PegaSysEng/web3js-eea) adds a property to your web3
instance by extending [web3](https://github.com/ethereum/web3.js/). Use the library to create and
send RLP-encoded transactions using JSON-RPC.

!!! note
    web3js-eea supports JSON-RPC over HTTP only.

## Prerequisites

* [Node.js (version > 10)](https://nodejs.org/en/download/)

## Add web3js-eea to project

```bash
npm install web3-eea
```

## Initialize EEA client

Initialize your EEA client where:

* `<JSON-RPC HTTP endpoint>` is the JSON-RPC HTTP endpoint of your Hyperledger Besu node. Specified
  by the [`--rpc-http-host`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-host) and
  [`--rpc-http-port`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-port) command line options.
* `<chain_id>` is the [chain ID](../../../Concepts/NetworkID-And-ChainID.md) of your network.

!!! example

    === "Syntax"

        ```js
        const EEAClient = require("web3-eea");
        const web3 = new EEAClient(new Web3("<JSON-RPC HTTP endpoint>"), <chain_id>);
        ```

    === "Example"

        ```js
        const EEAClient = require("web3-eea");
        const web3 = new EEAClient(new Web3("http://localhost:8545"), 2018);
        ```

## Deploying a contract with sendRawTransaction

To deploy a private contract, you need the contract binary. You can use
[Solidity](https://solidity.readthedocs.io/en/develop/using-the-compiler.html) to get the
contract binary.

!!! example "Deploying a Contract with sendRawTransaction"

    ```js
    const contractOptions = {
      data: `0x123`, // contract binary
      privateFrom: "orionNode1PublicKey",
      privateFor: ["orionNode3PublicKey"],
      privateKey: "besuNode1PrivateKey"
    };
    return web3.eea.sendRawTransaction(contractOptions);
    ```

`web3.eea.sendRawTransaction(contractOptions)` returns the transaction hash. To get the private
transaction receipt, use `web3.eea.getTransactionReceipt(txHash)`.

## web3js-eea methods

For more information about the web3js-eea methods, see the
[web3js-eea reference documentation](https://consensys.github.io/web3js-eea/latest/).
