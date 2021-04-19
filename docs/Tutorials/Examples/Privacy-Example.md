---
description: Hyperledger Besu privacy-enabled private network tutorial
---

# Privacy-enabled Quorum Developer Quickstart tutorial

The privacy-enabled private network example runs a private network of Hyperledger Besu and Orion
nodes managed by Docker Compose. It's an expanded version of the
[Quorum Developer Quickstart tutorial](Private-Network-Example.md).

You can use the [Block Explorer](Private-Network-Example.md#block-explorer), make
[JSON-RPC requests](Private-Network-Example.md#run-json-rpc-requests), and
[create transactions using MetaMask] as described in the
[Quorum Developer Quickstart tutorial](Private-Network-Example.md). This tutorial describes how to use the
examples provided in the web3js-eea library to
[create and send private transactions](#send-private-transactions-and-read-values).

!!! important

    This tutorial runs a private network suitable for education or demonstration purposes and is
    not intended for running production networks.

## Prerequisites

To run this tutorial, you must have the following installed:

* [Docker and Docker-compose](https://docs.docker.com/compose/install/)

    !!! important

        If using [MacOS](https://docs.docker.com/docker-for-mac/) or
        [Windows](https://docs.docker.com/docker-for-windows/), enable Docker to use up to 6GB of
        memory on the _Advanced_ tab in _Preferences_.

* [Nodejs](https://nodejs.org/en/download/)
* [Git command line](https://git-scm.com/)
* [Curl command line](https://curl.haxx.se/download.html).

## Create Docker-compose file

## Usage

To create the docker-compose file and artifacts, run:

```bash
npx quorum-dev-quickstart
```

Follow the prompts displayed to run Hyperledger Besu, private transactions, and [logging with ELK](../../HowTo/Monitor/Elastic-Stack.md).
Enter `n` for [Codefi Orchestrate](https://docs.orchestrate.consensys.net/en/stable/).

## Clone web3js-eea libraries

Clone the `ConsenSys/web3js-eea` library:

```bash
git clone https://github.com/ConsenSys/web3js-eea.git
```

In the `web3js-eea` directory:

```bash
npm install
```

## Start the network

!!!important

    If running in Windows, please run commands from the GitBash shell

In the installation directory, start the network:

```bash
./run.sh
```

The script pulls the Docker images starts the network. Pulling the images takes a few minutes the
first time. The network details display.

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

## Send private transactions and read values

The Event Emitter script deploys a contract with a privacy group of Node1 and Node2. That is, the
other nodes cannot access the contract. After deploying the contract, Event Emitter stores a value.

In the `web3js-eea` directory, run `eventEmitter.js`:

```bash
node example/eventEmitter.js
```

!!! tip

    The network takes a few minutes to get started. If you get a ` Error: socket hang up` error,
    the network isn't fully setup. Wait and then run the command again.

The Event Emitter logs display.

```bash
Transaction Hash  0xe0776de9a9d4e30be0025c1308eed8bc45502cba9fe22c504a56e2fd95343e6f
Waiting for transaction to be mined ...
Private Transaction Receipt
 { contractAddress: '0x2f351161a80d74047316899342eedc606b13f9f8',
  from: '0xfe3b557e8fb62b89f4916b721be55ceb828dbd73',
  to: null,
  output:
   '0x6080604052600436106100565763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633fa4f245811461005b5780636057361d1461008257806367e404ce146100ae575b600080fd5b34801561006757600080fd5b506100706100ec565b60408051918252519081900360200190f35b34801561008e57600080fd5b506100ac600480360360208110156100a557600080fd5b50356100f2565b005b3480156100ba57600080fd5b506100c3610151565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b60025490565b604080513381526020810183905281517fc9db20adedc6cf2b5d25252b101ab03e124902a73fcb12b753f3d1aaa2d8f9f5929181900390910190a16002556001805473ffffffffffffffffffffffffffffffffffffffff191633179055565b60015473ffffffffffffffffffffffffffffffffffffffff169056fea165627a7a72305820c7f729cb24e05c221f5aa913700793994656f233fe2ce3b9fd9a505ea17e8d8a0029',
  logs: [] }
Waiting for transaction to be mined ...
Transaction Hash: 0xbf14d332fa4c8f50d90cb02d47e0f825b8b2ef987c975306f76a598f181f4698
Event Emited: 0x000000000000000000000000fe3b557e8fb62b89f4916b721be55ceb828dbd7300000000000000000000000000000000000000000000000000000000000003e8
Waiting for transaction to be mined ...
Get Value: 0x00000000000000000000000000000000000000000000000000000000000003e8
Waiting for transaction to be mined ...
Transaction Hash: 0x5b538c5690e3ead6e6f811ad23c853bc63b3bca91635b3b611e51d2797b5f073
Event Emited: 0x000000000000000000000000fe3b557e8fb62b89f4916b721be55ceb828dbd73000000000000000000000000000000000000000000000000000000000000002a
Waiting for transaction to be mined ...
Get Value: 0x000000000000000000000000000000000000000000000000000000000000002a
```

Call [`eth_getTransactionReceipt`](../../Reference/API-Methods.md#eth_gettransactionreceipt) where:

* `<TransactionHash>` is the transaction hash displayed in the Event Emitter logs.
* `<JSON-RPC Endpoint>` is the JSON-RPC HTTP service endpoint displayed when starting the network.

=== "curl HTTP request"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["<TransactionHash>"],"id":1}' http://localhost:8545
    ```

=== "Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0xe0776de9a9d4e30be0025c1308eed8bc45502cba9fe22c504a56e2fd95343e6f"],"id":1}' http://localhost:8545
    ```

The transaction receipt for the
[privacy marker transaction](../../Concepts/Privacy/Private-Transaction-Processing.md) displays
with a `contractAddress` of `null`.

```json
{
  "jsonrpc" : "2.0",
  "id" : 1,
  "result" : {
    "blockHash" : "0xfacdc805f274553fcb2a12d3ef524f465c25e58626c27101c3e6f677297cdae9",
    "blockNumber" : "0xa",
    "contractAddress" : null,
    "cumulativeGasUsed" : "0x5db8",
    "from" : "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
    "gasUsed" : "0x5db8",
    "logs" : [ ],
    "logsBloom" : "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "status" : "0x1",
    "to" : "0x000000000000000000000000000000000000007e",
    "transactionHash" : "0xe0776de9a9d4e30be0025c1308eed8bc45502cba9fe22c504a56e2fd95343e6f",
    "transactionIndex" : "0x0"
  }
}
```

## Stop the network

Do one of the following to stop the network:

* Stop the network:

    ```bash
    ./stop.sh
    ```

* Stop the network and remove the containers and volumes:

    ```bash
    ./remove.sh
    ```

<!-- Links -->
[create transactions using MetaMask]: Private-Network-Example.md#create-a-transaction-using-metamask
