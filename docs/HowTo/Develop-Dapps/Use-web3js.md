description: Hyperledger Besu client libraries 
<!--- END of page meta data -->

# Create a Signed Transaction using Web3.js

You can use the example Javascript scripts to create and send raw transactions in the private network 
created by the [Private Network Quickstart](../../Tutorials/Quickstarts/Private-Network-Quickstart.md).

Update the `JSON-RPC endpoint` in the following examples to the endpoint for the private 
network displayed after running the `./run.sh` script.

!!! warning "Private keys"

    Do not use the accounts in the examples on mainnet or any public network except for testing.
    The private keys are displayed which means the accounts are not secure.
    
    All accounts and private keys in the examples are from the `dev.json` genesis file in the 
    [`/besu/ethereum/core/src/main/resources`](https://github.com/hyperledger/besu/tree/master/config/src/main/resources) directory.

    In production environments avoid exposing your private keys by creating signed transactions 
    offline, or use [EthSigner](https://docs.ethsigner.pegasys.tech/) to isolate your private keys and 
    sign transactions with [`eth_sendTransaction`](https://docs.ethsigner.pegasys.tech/Using-EthSigner/Using-EthSigner/#eth_sendtransaction). 
    
## Example Javascript scripts

### 1. Requirements

- [Node.js (version > 10)](https://nodejs.org/en/download/)  
- [web3.js 1.0.0 beta](https://github.com/ethereum/web3.js/) and [ethereumjs 1.3](https://github.com/ethereumjs/ethereumjs-tx).
These dependencies are defined in the included [`package.json`](../../scripts/transactions/package.json) file.

### 2. Create Directory
```bash
mkdir example_scripts
```

### 3. Copy Files
Copy the following files to the `example_scripts` directory:

- [`package.json`](../../scripts/transactions/package.json)
- [`create_value_raw_transaction.js`](../../scripts/transactions/create_value_raw_transaction.js)
- [`create_contract_raw_transaction.js`](../../scripts/transactions/create_contract_raw_transaction.js)

### 4. Retrieve Dependencies
```bash
cd example_scripts
npm install
```

### 5. Send Ether
The following is the example JavaScript script that displays a signed raw transaction string to send Ether.

!!! example "Send Ether example : create_value_raw_transaction.js"
    ```javascript linenums="1"
{! scripts/transactions/create_value_raw_transaction.js !}
     
    ```

Run the `create_value_raw_transaction.js` script:

```bash tab="Command"
node create_value_raw_transaction.js <YOUR JSON-RPC HTTP ENDPOINT>
```

```bash tab="Example"
node create_value_raw_transaction.js http://localhost:32770/jsonrpc
```

!!! tip
    The default JSON-RPC HTTP endpoint for `create_value_raw_transaction.js` is `http://localhost:8545`.
    If using `http://localhost:8545`, run `node create_value_raw_transaction.js`.
    
A signed raw transaction string is displayed.

You can send the raw transaction yourself or let the script send it using the web3.js library.

If sending it yourself, the cURL command is displayed and can be copied and pasted. Otherwise, the script sends it and
the transaction receipt is displayed.

### 6. Create A Smart Contract
The following is the example JavaScript script that displays a signed raw transaction string to create a contract.

!!! example "Create a contract example : create_contract_raw_transaction.js"    
    ```javascript linenums="1"
{! scripts/transactions/create_contract_raw_transaction.js !}
     
    ```

Run the `create_contract_raw_transaction.js` script:

```bash tab="Command"
node create_contract_raw_transaction.js <YOUR JSON-RPC HTTP ENDPOINT>
```

```bash tab="Example"
node create_contract_raw_transaction.js http://localhost:32770/jsonrpc
```

!!! tip
    The default JSON-RPC HTTP endpoint for `create_contract_raw_transaction.js` is `http://localhost:8545`.
    If using `http://localhost:8545`, run `node create_contract_raw_transaction.js`.
    
A signed raw transaction string is displayed.

You can send the raw transaction yourself or let the script send it using the web3.js library.

If sending it yourself, the cURL command is displayed and can be copied and pasted. Otherwise, the script sends it and
the transaction receipt is displayed.