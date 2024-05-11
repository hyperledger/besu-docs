---
description: Hyperledger Besu privacy-enabled private network tutorial
tags:
  - private networks
---

# Create a privacy-enabled network using the Quorum Developer Quickstart

You can create a privacy-enabled network using the [Quorum Developer Quickstart](../quickstart.md). It runs a private Hyperledger Besu network that uses [Tessera](https://docs.tessera.consensys.net/en/stable/) as its private transaction manager.

You can use the [Block Explorer](../quickstart.md#block-explorer), make [JSON-RPC requests](../quickstart.md#run-json-rpc-requests), and [create transactions using MetaMask](../quickstart.md#create-a-transaction-using-metamask). This tutorial describes how to make private transactions between nodes, and perform read and write operations on private contracts.

:::important

This tutorial runs a private network suitable for education or demonstration purposes and is not intended for running production networks.

:::

## Prerequisites

To run this tutorial, you must have the following installed:

- [Docker and Docker-compose](https://docs.docker.com/compose/install/)

  :::important

  If using [MacOS](https://docs.docker.com/docker-for-mac/) or [Windows](https://docs.docker.com/docker-for-windows/), enable Docker to use up to 6GB of memory on the _Advanced_ tab in _Preferences_.

  :::

- [Nodejs](https://nodejs.org/en/download/)
- [Git command line](https://git-scm.com/)
- [Curl command line](https://curl.haxx.se/download.html).

## Steps

### 1. Create Docker-compose file

To create the docker-compose file and artifacts, run:

```bash
npx quorum-dev-quickstart
```

Follow the prompts displayed to run Hyperledger Besu, private transactions, and [logging with ELK](../../how-to/monitor/elastic-stack.md). Enter `n` for [Codefi Orchestrate](https://docs.orchestrate.consensys.net/en/stable/).

### 2. Start the network

:::caution

If running in Windows, please run commands from the GitBash shell

:::

In the installation directory, start the network:

```bash
./run.sh
```

The script pulls the Docker images starts the network. Pulling the images takes a few minutes the first time. The network details display.

```bash
*************************************
Quorum Dev Quickstart
*************************************
Setting up the index patterns in kibana .................
----------------------------------
List endpoints and services
----------------------------------
JSON-RPC HTTP service endpoint      : http://localhost:8545
JSON-RPC WebSocket service endpoint : ws://localhost:8546
Web block explorer address          : http://localhost:25000/
Prometheus address                  : http://localhost:9090/graph
Grafana address                     : http://localhost:3000/d/XE4V0WGZz/besu-overview?orgId=1&refresh=10s&from=now-30m&to=now&var-system=All
Collated logs using Kibana endpoint : http://localhost:5601/app/kibana#/discover

For more information on the endpoints and services, refer to README.md in the installation directory.
****************************************************************
```

### 3. Deploy the private contract and interact with the nodes

To deploy a private contract to another [privacy group](../../concepts/privacy/privacy-groups.md) member, use the [web3js-quorum](https://consensys.github.io/web3js-quorum/latest/index.html) library and the [`eea_sendRawTransaction`](../../../private-networks/reference/api/index.md#eea_sendrawtransaction) API call. You must use this API call instead of [`eth_sendTransaction`](https://ethereum.github.io/execution-apis/api-documentation) because Hyperledger Besu keeps account management separate for stronger security.

This example uses the [web3js](https://www.npmjs.com/package/web3) library to make the API calls, the example creates three Besu nodes, with each node having a corresponding Tessera node for privacy. You can access the Besu member nodes for API calls on the following ports:

```bash
Member1Besu RPC: http://localhost:20000
Member1Tessera: http://localhost:9081

Member2Besu RPC: http://localhost:20002
Member2Tessera: http://localhost:9082

Member3Besu RPC: http://localhost:20004
Member3Tessera: http://localhost:9083
```

Navigate to the `smart_contracts` directory and deploy the private transaction:

```bash
cd smart_contracts
npm install
node scripts/private/private_tx.js
```

The script deploys the contract and sends an arbitrary value (47) from `Member1` to `Member3`. Once done, it queries all three members (Tessera) to check the value at an address. Only `Member1` & `Member3` has this information as they were involved in the transaction, `Member2` responds with a `0x` to indicate it is unaware of the transaction.

```bash
node scripts/private/private_tx.js
Creating contract...
Getting contractAddress from txHash:  0xc1b57f6a7773fe887afb141a09a573d19cb0fdbb15e0f2b9ed0dfead6f5b5dbf
Waiting for transaction to be mined ...
Address of transaction: 0x8220ca987f7bb7f99815d0ef64e1d8a072a2c167
Use the smart contracts 'get' function to read the contract's constructor initialized value ..
Waiting for transaction to be mined ...
Member1 value from deployed contract is: 0x000000000000000000000000000000000000000000000000000000000000002f
Use the smart contracts 'set' function to update that value to 123 .. - from member1 to member3
Transaction hash: 0x387c6627fe87e235b0f2bbbe1b2003a11b54afc737dca8da4990d3de3197ac5f
Waiting for transaction to be mined ...
Verify the private transaction is private by reading the value from all three members ..
Waiting for transaction to be mined ...
Member1 value from deployed contract is: 0x000000000000000000000000000000000000000000000000000000000000007b
Waiting for transaction to be mined ...
Member2 value from deployed contract is: 0x
Waiting for transaction to be mined ...
Member3 value from deployed contract is: 0x000000000000000000000000000000000000000000000000000000000000007b
```

The general contract deployment flow is:

1. Deploy a contract, which returns a transaction hash.

1. Obtain the privacy transaction receipt from the transaction hash.

1. Use the contract address in the privacy transaction receipt to [interact with the contract](../contracts/interact.md) from that point on.

### 4.  Stop the network

Do one of the following to stop the network:

- Stop the network:

  ```bash
  ./stop.sh
  ```

- Stop the network and remove the containers and volumes:

  ```bash
  ./remove.sh
  ```

## More examples

View the [web3js-quorum client library example](web3js-quorum.md) and
[code examples](https://github.com/ConsenSys/web3js-quorum/tree/master/example).

You can also test the ERC-20 token example by executing `erc20.js`, which deploys a
`HumanStandardToken` contract and transfers one token to Node-2.

You can verify this by observing the `data` field of the `logs`, which is `1`.
