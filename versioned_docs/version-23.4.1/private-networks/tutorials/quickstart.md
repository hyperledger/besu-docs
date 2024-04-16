---
title: Quorum Developer Quickstart
sidebar_position: 1
description: Rapidly generate a local blockchain network using the Quickstart.
tags:
  - private networks
---

import TestAccounts from '../../global/test_accounts.md';

import Postman from '../../global/postman.md';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Developer Quickstart

The Quorum Developer Quickstart uses the Hyperledger Besu Docker image to run a private [IBFT 2.0](../how-to/configure/consensus/ibft.md) network of Besu nodes managed by Docker Compose.

:::danger

This tutorial runs a private network suitable for education or demonstration purposes and is not intended for running production networks.

:::

## Prerequisites

- One of the following operating systems:
  - Linux on x86_64 architecture
  - macOS on an Intel processor (M1 processor not supported yet)
  - Windows 64-bit edition, with:
    - Windows Subsystem for Linux 2
    - Docker desktop configured to use the WSL2-based engine
- [Docker and Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/) version 12 or higher
- [Truffle](https://www.trufflesuite.com/truffle)
- [cURL command line](https://curl.haxx.se/download.html)
- [MetaMask](https://metamask.io/)

:::info

Allow Docker up to 4G of memory or 6G if running the privacy examples. Refer to the **Resources** section in [Docker for Mac](https://docs.docker.com/docker-for-mac/) and [Docker Desktop](https://docs.docker.com/docker-for-windows/) for details.

:::

## Generate the tutorial blockchain configuration files

To create the tutorial `docker-compose` files and artifacts, run:

```bash
npx quorum-dev-quickstart
```

Follow the prompts displayed to run Hyperledger Besu and [logging with ELK](../how-to/monitor/elastic-stack.md). Enter `n` for [Codefi Orchestrate](https://docs.orchestrate.consensys.net/en/stable/) and [private transactions](../concepts/privacy/index.md).

:::note

If you enter `y` for private transactions, you get three Besu nodes with corresponding Tessera nodes for privacy. You can follow the [privacy walk-through](privacy/index.md), which details how to send private transactions and interact with deployed private contracts.

:::

## Start the network

To start the network, go to the installation directory (`quorum-test-network` if you used the default value) and run:

```bash
./run.sh
```

The script builds the Docker images, and runs the Docker containers.

Four Besu IBFT 2.0 validator nodes and a non-validator node are created to simulate a base network.

When execution is successfully finished, the process lists the available services:

```log title="Services list"
*************************************
Quorum Dev Quickstart
*************************************
----------------------------------
List endpoints and services
----------------------------------
JSON-RPC HTTP service endpoint      : http://localhost:8545
JSON-RPC WebSocket service endpoint : ws://localhost:8546
Web block explorer address          : http://localhost:25000/
Prometheus address                  : http://localhost:9090/graph
Grafana address                     : http://localhost:3000/d/XE4V0WGZz/besu-overview?orgId=1&refresh=10s&from=now-30m&to=now&var-system=All
Kibana logs address                 : http://localhost:5601/app/kibana#/discover
Collated logs using Grafana Loki    : http://localhost:3000/d/Ak6eXLsPxFemKYKEXfcH/quorum-logs-loki?orgId=1&var-app=besu&var-search=

For more information on the endpoints and services, refer to README.md in the installation directory.
****************************************************************
```

- Use the **JSON-RPC HTTP service endpoint** to access the RPC node service from your dapp or from cryptocurrency wallets such as MetaMask.
- Use the **JSON-RPC WebSocket service endpoint** to access the Web socket node service from your dapp.
- Use the **Web block explorer address** to display the [block explorer Web application](http://localhost:25000).
- Use the **Prometheus address** to access the [Prometheus dashboard](http://localhost:9090/graph). [Read more about metrics](../../public-networks/how-to/monitor/metrics.md).
- Use the **Grafana address** to access the [Grafana dashboard](http://localhost:3000/d/XE4V0WGZz/besu-overview?orgId=1&refresh=10s&from=now-30m&to=now&var-system=All). [Read more about metrics](../../public-networks/how-to/monitor/metrics.md).
- Use the **Kibana logs address** to access the [logs in Kibana](http://localhost:5601/app/kibana#/discover). [Read more about log management](../how-to/monitor/elastic-stack.md).
- Use the **Grafana Loki logs address** to access the [logs in Grafana](http://localhost:3000/d/Ak6eXLsPxFemKYKEXfcH/quorum-logs-loki?orgId=1&var-app=besu&var-search=). [Read more about log management](../how-to/monitor/loki.md).

To display the list of endpoints again, run:

```bash
./list.sh
```

## Use a block explorer

You can [use Sirato Blockchain Explorer](../how-to/monitor/sirato-explorer.md) to analyze block information, contract metadata, transaction searches, and more. Sirato has built-in support for privacy-enabled Besu networks.

:::note

You must connect to one of the privacy nodes (for example, `member1besu`), not the dedicated RPC, in order to allow access for Besu [privacy API methods](../reference/api/index.md#priv-methods). In production networks, you must [secure access](../../public-networks/how-to/use-besu-api/authenticate.md) to RPC nodes.

:::

Clone the [Sirato GitHub repository](https://github.com/web3labs/sirato-free):

```bash
git clone https://github.com/web3labs/sirato-free
```

From the Sirato directory, run the following command:

```bash
cd docker-compose
NODE_ENDPOINT=member1besu PORT=26000 docker-compose -f docker-compose.yml -f sirato-extensions/docker-compose-quorum-dev-quickstart.yml up
```

Open `http://localhost/` on your browser. You’ll see the new initialization page while it boots up. This may take 5–10 minutes for the all services to start and the ingestion sync to complete.

To stop all the services from running, run the following script from the `docker-compose` directory:

```bash
docker-compose down -v
```

## Monitor nodes with Prometheus and Grafana

The sample network also includes Prometheus and Grafana monitoring tools to let you visualize node health and usage. You can directly access these tools from your browser at the addresses displayed in the endpoint list.

- [Prometheus dashboard](http://localhost:9090/graph)
- [Grafana dashboard](http://localhost:3000/d/XE4V0WGZz/besu-overview?orgId=1&refresh=10s&from=now-30m&to=now&var-system=All)
- [Grafana Loki logs dashboard](http://localhost:3000/d/Ak6eXLsPxFemKYKEXfcH/quorum-logs-loki?orgId=1&var-app=quorum&var-search=)

For more details on how to configure and use these tools for your own nodes, see the [performance monitoring documentation](../../public-networks/how-to/monitor/metrics.md), [Prometheus documentation](https://prometheus.io/docs/introduction/overview/) and [Grafana documentation](https://grafana.com/docs/).

![Grafana dashboard screenshot](../../assets/images/grafana.png)

and collated logs via Grafana Loki

![Grafana Loki dashboard screenshot](../../assets/images/grafana_loki.png)

## Run JSON-RPC requests

You can run JSON-RPC requests on:

- HTTP with `http://localhost:8545`.
- WebSockets with `ws://localhost:8546`.

### Run with `cURL`

This tutorial uses [cURL](https://curl.haxx.se/download.html) to send JSON-RPC requests over HTTP.

### Run with Postman

You can also run all the requests with the Besu Postman collection.

<Postman />

### Request the node version

Run the following command from the host shell:

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}' http://localhost:8545
```

The result displays the client version of the running node:

<Tabs>

<TabItem value="Result example" label="Result example" default>

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "besu/v21.1.2/linux-x86_64/oracle_openjdk-java-11"
}
```

</TabItem>

<TabItem value="Result explanation" label="Result explanation">

- `"jsonrpc" : "2.0"` indicates that the JSON-RPC 2.0 spec format is used.
- `"id" : 1` is the request identifier used to match the request and the response. This tutorial always uses 1.
- `"result"` contains the running Besu information:
  - `v21.1.2` is the running Besu version number. This may be different when you run this tutorial.
  - `linux-x86_64` is the architecture used to build this version.
  - `oracle_openjdk-java-11` is the JVM type and version used to build this version. This may be different when you run this tutorial.

</TabItem>

</Tabs>

Successfully calling this method shows that you can connect to the nodes using JSON-RPC over HTTP.

From here, you can walk through more interesting requests demonstrated in the rest of this section, or skip ahead to [Create a transaction using MetaMask](#create-a-transaction-using-metamask).

### Count the peers

Peers are the other nodes connected to the node receiving the JSON-RPC request.

Poll the peer count using [`net_peerCount`](../../public-networks/reference/api/index.md#net_peercount):

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' http://localhost:8545
```

The result indicates that there are four peers (the validators):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x4"
}
```

### Request the most recent block number

Call [`eth_blockNumber`](../../public-networks/reference/api/index.md#eth_blockNumber) to retrieve the number of the most recently synchronized block:

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://localhost:8545
```

The result indicates the highest block number synchronized on this node.

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x2a"
}
```

Here the hexadecimal value `0x2a` translates to decimal as `42`, the number of blocks received by the node so far, about two minutes after the new network started.

## Public transactions

This example uses the [web3.js](https://www.npmjs.com/package/web3) library to make the API calls, using the `rpcnode`
accessed on `http://localhost:8545`.

Navigate to the `smart_contracts` directory and deploy the public transaction:

```bash
cd smart_contracts
npm install
node scripts/public/public_tx.js
# or via ethers
node scripts/public/public_tx_ethers.js
```

This deploys the contract and sends an arbitrary value (`47`) from `Member1` to `Member3`. The script then performs:

1. A read operation on the contract using the `get` function and the contract's ABI, at the specified address.
1. A write operation using the `set` function and the contract's ABI, at the address and sets the value to `123`.
1. A read operation on all events emitted.

The script output is as follows:

```bash
{
  address: '0x2b224e70f606267586616586850aC6f4Ae971eCb',
  privateKey: '0xb3f2ab4d7bb07a4168432fb572ceb57fd9b842ed8dc41256255db6ff95784000',
  signTransaction: [Function: signTransaction],
  sign: [Function: sign],
  encrypt: [Function: encrypt]
}
create and sign the txn
sending the txn
tx transactionHash: 0x423d56f958a316d2691e05e158c6a3f37004c27a1ec9697cf9fed2a5c2ae2c2b
tx contractAddress: 0xB9A44d3BeF64ABfA1485215736B61880eDe630D9
Contract deployed at address: 0xB9A44d3BeF64ABfA1485215736B61880eDe630D9
Use the smart contracts 'get' function to read the contract's constructor initialized value .. 
Obtained value at deployed contract is: 47
Use the smart contracts 'set' function to update that value to 123 .. 
sending the txn
tx transactionHash: 0xab460da2544687c5fae4089d01b14bbb9bea765449e1fd2c30b30e1761481344
tx contractAddress: null
Verify the updated value that was set .. 
Obtained value at deployed contract is: 123
Obtained all value events from deployed contract : [47,123]
```

We also have a second example that shows how to transfer ETH between accounts. Navigate to the `smart_contracts` directory
and deploy the `eth_tx` transaction:

```bash
cd smart_contracts
npm install
node scripts/public/eth_tx.js
```

The output is as follows:

```bash
Account A has balance of: 90000
Account B has balance of: 0
create and sign the txn
sending the txn
tx transactionHash: 0x8b9d247900f2b50a8dded3c0d73ee29f04487a268714ec4ebddf268e73080f98
Account A has an updated balance of: 89999.999999999999999744
Account B has an updated balance of: 0.000000000000000256
```

## Create a transaction using MetaMask

You can use [MetaMask](https://metamask.io/) to send a transaction on your private network.

1. Open MetaMask and connect it to your private network RPC endpoint by selecting `Localhost 8545` in the network list.
1. Choose one of the following test accounts and [import it into MetaMask by copying the corresponding private key](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account).

<TestAccounts />

:::note

Besu doesn't incorporate [account management](../../public-networks/how-to/send-transactions.md). To create your own account, you have to use a third-party tool, such as MetaMask.

:::

1.  After importing an existing test account, [create another test account from scratch] to use as the recipient for a test Ether transaction.

1.  In MetaMask, select the new test account and [copy its address](https://metamask.zendesk.com/hc/en-us/articles/360015289512-How-to-copy-your-MetaMask-Account-Public-Address).

1.  In the [Block Explorer](http://localhost:25000), search for the new test account by selecting the :mag: and pasting the test account address into the search box.

    The new test account displays with a zero balance.

1.  [Send test Ether](https://metamask.zendesk.com/hc/en-us/articles/360015488931-How-to-send-ETH-and-ERC-20-tokens-from-your-MetaMask-Wallet) from the first test account (containing test Ether) to the new test account (which has a zero balance).

    :::tip

    You can use a zero gas price here as this private test network is a [free gas network](../how-to/configure/free-gas.md), but the maximum amount of gas that can be used (the gas limit) for a value transaction must be at least 21000.

    :::

1.  Refresh the Block Explorer page in your browser displaying the target test account.

    The updated balance reflects the transaction completed using MetaMask.

## Smart contract and dapp usage

You can use a demo dapp called Pet Shop, provided by [Truffle](https://www.trufflesuite.com/tutorial).

The dapp runs a local website using Docker, and uses smart contracts deployed on the network.

The directory created by `quorum-dev-quickstart` includes a `dapps` directory with a `pet-shop` subdirectory, which contains the source code for the dapp, including the smart contracts, website, and configurations to run this tutorial.

With the blockchain running and MetaMask connected to `Localhost 8545` via the browser, run the following command to start the Pet Shop dapp:

```bash
cd dapps/pet-shop
./run_dapp.sh
```

The script:

1. Installs the dapp Node dependencies (you may see some warnings here, but it will not prevent the dapp from running).
1. Compiles the contracts.
1. Deploys the contracts to the blockchain.
1. Runs tests.
1. Builds and runs a Docker image to serve the dapp website.

```text './run_dapp.sh' example output
Compiling your contracts...
===========================
> Compiling ./contracts/Adoption.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /Users/demo/quorum-test-network/dapps/pet-shop/pet-shop-box/build/contracts
> Compiled successfully using:
    - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

Starting migrations...
======================
> Network name:    'quickstartWallet'
> Network id:      1337
> Block gas limit: 16234336 (0xf7b760)

1_initial_migration.js
======================

    Deploying 'Migrations'
    ----------------------
    > transaction hash:    0xdd27f5bc5b0c4a42bb4f4d9ba00b4d33742de10ba8f03484cbf095ee824ba11a
    > Blocks: 0            Seconds: 0
    > contract address:    0xFB88dE099e13c3ED21F80a7a1E49f8CAEcF10df6
    > block number:        2747
    > block timestamp:     1618000437
    > account:             0x627306090abaB3A6e1400e9345bC60c78a8BEf57
    > balance:             89999.97435026
    > gas used:            221555 (0x36173)
    > gas price:           20 gwei
    > value sent:          0 ETH
    > total cost:          0.0044311 ETH


    > Saving migration to chain.
    > Saving artifacts
      -------------------------------------
    > Total cost:           0.0044311 ETH

2_deploy_contracts.js
=====================

    Deploying 'Adoption'
    --------------------
    > transaction hash:    0xd6f5b11807a0727a92b6063c95b9101769d310592b0d3cf35d6df233d05d50e6
    > Blocks: 0            Seconds: 0
    > contract address:    0xf204a4Ef082f5c04bB89F7D5E6568B796096735a
    > block number:        2749
    > block timestamp:     1618000441
    > account:             0x627306090abaB3A6e1400e9345bC60c78a8BEf57
    > balance:             89999.968712
    > gas used:            239915 (0x3a92b)
    > gas price:           20 gwei
    > value sent:          0 ETH
    > total cost:          0.0047983 ETH


    > Saving migration to chain.
    > Saving artifacts
      -------------------------------------
    > Total cost:           0.0047983 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.0092294 ETH


Using network 'quickstartWallet'.

Compiling your contracts...
===========================
> Compiling ./test/TestAdoption.sol

TestAdoption
✓ testUserCanAdoptPet (2071ms)
✓ testGetAdopterAddressByPetId (6070ms)
✓ testGetAdopterAddressByPetIdInArray (6077ms)

3 passing (37s)
```

After these tests are successful, the script builds a container for the Pet Shop dapp and deploys it, binding it to port 3001 on your system.

```text
Sending build context to Docker daemon  489.4MB
Step 1/5 : FROM node:12.14.1-stretch-slim
---> 2f7e25ad14ea
Step 2/5 : EXPOSE 3001
---> Using cache
---> 2ef0665a040a
Step 3/5 : WORKDIR /app
---> Using cache
---> e8e97cedb575
Step 4/5 : COPY . /app
---> f70e4265e598
Step 5/5 : CMD npm run dev
---> Running in 3c6e8bdb3f3b
Removing intermediate container 3c6e8bdb3f3b
---> ce2588e47ab0
Successfully built ce2588e47ab0
Successfully tagged quorum-dev-quickstart_pet_shop:latest
b1615ab765656bc027f63fc60019dba1ca572305766c820f41eaf113b7e14cf8
```

In the browser where you have MetaMask enabled and one of the test accounts loaded, open a new tab and navigate to [the Pet Shop dapp](http://localhost:3001) where you can adopt lovely pets (sorry, not for real, it's a demo).

When you select **Adopt**, a MetaMask window pops up and requests your permission to continue with the transaction.

After the transaction is complete and successful, the status of the pet you adopted shows **Success**.

![Dapp UI](../../assets/images/dapp-ui.png)

You can also search for the transaction and view its details in the [Block Explorer](http://localhost:25000/).

![Dapp UI](../../assets/images/dapp-explorer-tx.png)

The MetMask UI also keeps a record of the transaction.

![Dapp UI](../../assets/images/dapp-metamask-tx.png)

### Deploy your own dapp

You can deploy your own dapp to the Quorum Developer Quickstart, by configuring your dapp to point to the Quickstart network.

If you're using [Truffle](https://trufflesuite.com/truffle/), update the `networks` object in the [Truffle configuration file](https://trufflesuite.com/docs/truffle/reference/configuration#networks) to specify which networks to connect to for deployments and testing. The Quickstart RPC service endpoint is `http://localhost:8545`.

For example, the following is the Truffle configuration file for the Pet Shop dapp used in the Quickstart Besu network:

```js
const PrivateKeyProvider = require("@truffle/hdwallet-provider");

// insert the private key of the account used in MetaMask, e.g. Account 1 (Miner Coinbase Account)
const privateKey =
  "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    develop: {
      port: 8545,
    },
    quickstartWallet: {
      provider: () =>
        new PrivateKeyProvider(privateKey, "http://localhost:8545"),
      network_id: "*",
    },
  },
};
```

Deploy the dapp using:

```bash
truffle migrate --network quickstartWallet
```

## Stop and restart the private network without removing containers

To shut down the private network without deleting the containers:

```bash
./stop.sh
```

This command stops the containers related to the services specified in the `docker-compose.yml` file.

To restart the private network:

```bash
./resume.sh
```

## Stop the private network and remove containers

To shut down the private network and delete all containers and images created from running the sample network and the Pet Shop dapp:

```bash
./remove.sh
```

## Add a new node to the network

New nodes joining an existing network require the following:

- The same genesis file used by all other nodes on the running network.
- A list of nodes to connect to; this is done by specifying [bootnodes], or by providing a list of [static nodes].
- A node key pair and optionally an account. If the running network is using permissions, then you need to add the new node's enode details to the [permissions file] used by existing nodes, or update the onchain permissioning contract.

The following steps describe the process to add a new node to the Developer Quickstart.

### 1. Create the node key files

Create a node key pair and account for a new node by running the following script:

```bash
cd ./extra
npm install
node generate_node_keys.js --password "Password"
```

:::note

The `--password` parameter is optional.

:::

### 2. Create new node directory

Navigate to the directory where the configuration files for the network were created.

:::note

The directory was specified in an earlier step when running `npx quorum-dev-quickstart`. The default location is `./quorum-test-network`.

:::

In the `config/nodes` directory, create a subdirectory for the new node (for example, `newnode`), and move the `nodekey`, `nodekey.pub`, `address` and `accountkey` files from the previous step into this directory.

### 3. Update docker-compose

Add an entry for the new node into the docker-compose file:

```yaml
newnode:
  <<: *besu-def
  container_name: newnode
  volumes:
    - public-keys:/opt/besu/public-keys/
    - ./config/besu/:/config
    - ./config/nodes/newnode:/opt/besu/keys
    - ./logs/besu:/tmp/besu
  depends_on:
    - validator1
  networks:
    quorum-dev-quickstart:
      ipv4_address: 172.16.239.41
```

:::caution important
Select an IP address and port map not being used for the other containers.
Mount the newly created folder `./config/nodes/newnode` to the `/opt/besu/keys` directory of the new node, as seen
in this example.
:::

### 4. Update Prometheus configuration

Update `prometheus.yml` in the `./config/prometheus/` directory to configure metrics to display in Grafana.

Insert the following under `scrape_configs` section in the file. Change `job_name` and `targets` appropriately if you've updated them.

```yaml
- job_name: newnode
  scrape_interval: 15s
  scrape_timeout: 10s
  metrics_path: /metrics
  scheme: http
  static_configs:
    - targets: [newnode:9545]
```

### 5. Update files with the enode address

Add the new node's enode address to the [static nodes] file and [permissions file]. The enode uses the format `enode://pubkey@ip_address:30303`. If the `nodekey.pub` is `4540ea...9c1d78` and the IP address is `172.16.239.41`, then the enode address is `"enode://4540ea...9c1d78@172.16.239.41:30303"`, which must be added to both files.

Alternatively, call the [`perm_addNodesToAllowlist`](../../public-networks/reference/api/index.md#perm_addnodestoallowlist) API method on existing nodes to add the new node without restarting.

:::note

Calling the API method by itself only persists for as long as the nodes remain online and is lost on the next restart.

On a live network, the new node must be added to the [permissions file] so that subsequent restarts of the nodes are aware of the change.

:::

### 6. Start the network

Once complete, start the network up with `./run.sh`. When using the smart contract you can either make changes via a [dapp](https://github.com/ConsenSys/permissioning-smart-contracts) or via [RPC API calls](../../public-networks/reference/api/index.md#perm_addnodestoallowlist).

<!-- Links -->

[bootnodes]: ../how-to/configure/bootnodes.md
[permissions file]: ../how-to/use-permissioning/local.md
[static nodes]: ../../public-networks/how-to/connect/static-nodes.md
[allow list]: ../how-to/use-permissioning/local.md#node-allowlisting
[Import one of the existing accounts above into MetaMask]: https://metamask.zendesk.com/hc/en-us/articles/360015489331-Importing-an-Account-New-UI-
[create another test account from scratch]: https://metamask.zendesk.com/hc/en-us/articles/360015289452-Creating-Additional-MetaMask-Wallets-New-UI-
