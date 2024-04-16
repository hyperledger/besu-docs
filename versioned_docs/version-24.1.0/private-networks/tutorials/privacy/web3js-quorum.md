---
title: Use the web3js-quorum multi-node example
sidebar_position: 3
description: web3js-quorum client library multi-node example
tags:
  - private networks
---

# Use the multi-node example in the web3js-quorum client library

To use the examples provided in the web3js-quorum library with [your privacy network](index.md):

:::note

This example uses 3 of the 4 nodes configured in the [privacy tutorial](index.md).

:::

1.  Clone the **ConsenSys/web3js-quorum** repository:

    ```bash
    git clone https://github.com/ConsenSys/web3js-quorum
    ```

2.  In the `web3js-quorum` directory:

    ```bash
    npm install
    ```

3.  In the `example` directory, update the `keys.js` file to include:

    - chain ID
    - Tessera node public keys
    - Hyperledger Besu node RPC URLs
    - [Hyperledger Besu node private keys](../../../public-networks/concepts/node-keys.md#node-private-key).

4.  In the `example/multiNodeExample` directory, deploy the contract:

    ```bash
    node deployContract.js
    ```

    A private transaction receipt returns.

    ```text
    Transaction Hash  0x23b57ddc3ecf9c9a548e4401a411420ffc0002fd259a86d5656add7c6108beeb
    Waiting for transaction to be mined ...
    Private Transaction Receipt
    { contractAddress: '0xfee84481da8f4b9a998dfacb38091b3145bb01ab',
      from: '0x9811ebc35d7b06b3fa8dc5809a1f9c52751e1deb',
      to: null,
      output:
      '0x6080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633fa4f245811461005b5780636057361d1461008257806367e404ce146100ae575b600080fd5b34801561006757600080fd5b506100706100ec565b60408051918252519081900360200190f35b34801561008e57600080fd5b506100ac600480360360208110156100a557600080fd5b50356100f2565b005b3480156100ba57600080fd5b506100c3610151565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b60025490565b604080513381526020810183905281517fc9db20adedc6cf2b5d25252b101ab03e124902a73fcb12b753f3d1aaa2d8f9f5929181900390910190a16002556001805473ffffffffffffffffffffffffffffffffffffffff191633179055565b60015473ffffffffffffffffffffffffffffffffffffffff169056fea165627a7a72305820c7f729cb24e05c221f5aa913700793994656f233fe2ce3b9fd9a505ea17e8d8a0029',
      logs: [] }
    ```

    :::note

    If you receive a `Method not enabled` error, ensure you enabled the appropriate APIs using the [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api)

    :::

5.  Copy the contract address from the private transaction receipt and set the `CONTRACT_ADDRESS` environment variable:

    ```bash
    export CONTRACT_ADDRESS=<Contract Address from Private Transaction Receipt>
    ```

    :::tip example
    ```bash
    export CONTRACT_ADDRESS=0xfee84481da8f4b9a998dfacb38091b3145bb01ab
    ```
    :::

6.  Store a value in the contract from Node 1:

    ```bash
    node storeValueFromNode1.js
    ```

    Node 1 stores the value of 1000 (3e8 in hex) and is visible to Node 1 and Node 2.

    ```bash
    Transaction Hash: 0xd9d71cc6f64675e1a48183ded8f08930af317eb883ebae4c4eec66ae68618d85
    Waiting for transaction to be mined ...
    Event Emited: 0x0000000000000000000000009811ebc35d7b06b3fa8dc5809a1f9c52751e1deb00000000000000000000000000000000000000000000000000000000000003e8
    Waiting for transaction to be mined ...
    Get Value from http://localhost:8545: 0x00000000000000000000000000000000000000000000000000000000000003e8
    Waiting for transaction to be mined ...
    Get Value from http://localhost:8546: 0x00000000000000000000000000000000000000000000000000000000000003e8
    Waiting for transaction to be mined ...
    Get Value from http://localhost:8547: 0x
    ```

7.  Store a value in the contract from Node 2:

    ```bash
    node storeValueFromNode2.js
    ```

    Node 2 stores the value of 42 (2a in hex) and is visible to Node 1 and Node 2.

    ```text
    Transaction Hash: 0xa025433aec47a71b0230f12f43708812fd38ff7b7c1dc89a715f71dcbd5fbdbf
    Waiting for transaction to be mined ...
    Event Emited: 0x000000000000000000000000372a70ace72b02cc7f1757183f98c620254f9c8d000000000000000000000000000000000000000000000000000000000000002a
    Waiting for transaction to be mined ...
    Get Value from http://localhost:8545: 0x000000000000000000000000000000000000000000000000000000000000002a
    Waiting for transaction to be mined ...
    Get Value from http://localhost:8546: 0x000000000000000000000000000000000000000000000000000000000000002a
    Waiting for transaction to be mined ...
    Get Value from http://localhost:8547: 0x
    ```

    :::note

    As expected, log messages indicate that Node 3 Tessera cannot find payloads because Node 3 does not have access to the private transactions between Node 1 and Node 2.

    :::
