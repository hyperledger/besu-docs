---
description: Hyperledger Besu client libraries
---

# Create a signed transaction using Web3.js

You can use the example JavaScript scripts to create and send raw transactions in the private
network created by the
[Private Network Example](../../Tutorials/Examples/Private-Network-Example.md).

In the following examples update the `JSON-RPC endpoint` to the endpoint for the private network
displayed after running the `./run.sh` script.

!!! warning "Private keys"

    Do not use the accounts in the examples on mainnet or any public network except for testing.
    They display the private keys, which means the accounts are not secure.

    All accounts and private keys in the examples are from the `dev.json` genesis file in the
    [`/besu/ethereum/core/src/main/resources`](https://github.com/hyperledger/besu/tree/master/config/src/main/resources)
    directory.

    In production environments avoid exposing your private keys by creating signed transactions
    offline, or use [EthSigner](https://docs.ethsigner.pegasys.tech/) to isolate your private keys
    and sign transactions with
    [`eth_sendTransaction`](https://docs.ethsigner.pegasys.tech/Using-EthSigner/Using-EthSigner/#eth_sendtransaction).

## Example JavaScript scripts

### 1. Requirements

* [Node.js (version > 10)](https://nodejs.org/en/download/)
* [web3.js 1.0.0 beta](https://github.com/ethereum/web3.js/) and
  [ethereumjs 1.3](https://github.com/ethereumjs/ethereumjs-tx).

The included [`package.json`](../../scripts/transactions/package.json) file defines these
dependencies.

### 2. Create a directory

```bash
mkdir example_scripts
```

### 3. Copy files

Copy the following files to the `example_scripts` directory:

* [`package.json`](../../scripts/transactions/package.json)
* [`create_value_raw_transaction.js`](../../scripts/transactions/create_value_raw_transaction.js)
* [`create_contract_raw_transaction.js`](../../scripts/transactions/create_contract_raw_transaction.js).

### 4. Retrieve dependencies

```bash
cd example_scripts
npm install
```

### 5. Send Ether

The following is the example JavaScript script displaying a signed raw transaction string to send
Ether.

!!! example "Send Ether example : create_value_raw_transaction.js"

    ```javascript linenums="1"
{! scripts/transactions/create_value_raw_transaction.js !}

    ```

Run the `create_value_raw_transaction.js` script:

```bash tab="Command"
node create_value_raw_transaction.js <YOUR JSON-RPC HTTP ENDPOINT>
```

```bash tab="Example"
node create_value_raw_transaction.js http://localhost:8545
```

!!! tip

    The default JSON-RPC HTTP endpoint for `create_value_raw_transaction.js` is
    `http://localhost:8545`. If Besu is listening on `http://localhost:8545`, you can run the
    command without specifying the endpoint.

A signed raw transaction string displays.

You can send the raw transaction yourself or let the script send it using the web3.js client
library.

If sending the transaction yourself, the curl command displays, which you can copy and paste.
Otherwise, the script sends the transaction and the transaction receipt displays.

### 6. Create a smart contract

The following is the example JavaScript script displaying a signed raw transaction string to create
a contract.

!!! example "Create a contract example : create_contract_raw_transaction.js"

    ```javascript linenums="1"
{! scripts/transactions/create_contract_raw_transaction.js !}

    ```

Run the `create_contract_raw_transaction.js` script:

```bash tab="Command"
node create_contract_raw_transaction.js <YOUR JSON-RPC HTTP ENDPOINT>
```

```bash tab="Example"
node create_contract_raw_transaction.js http://localhost:8545
```

!!! tip

    The default JSON-RPC HTTP endpoint for `create_contract_raw_transaction.js` is
    `http://localhost:8545`. If using `http://localhost:8545`, run
    `node create_contract_raw_transaction.js`.

A signed raw transaction string displays.

You can send the raw transaction yourself or let the script send it using the web3.js client
library.

If sending the transaction yourself, the curl command displays, which you can copy and paste.
Otherwise, the script sends the transaction and the transaction receipt displays.
