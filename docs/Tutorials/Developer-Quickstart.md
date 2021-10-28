---
title: Developer Quickstart
description: Rapidly generate local blockchain networks.
---

# Developer Quickstart

## Prerequisites

- [Docker and Docker-compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/download/) version 12 or higher
- On Windows:
  - Windows Subsystem for Linux 2
  - Docker desktop configured to use the WSL2-based engine

!!! important
Ensure you allow Docker up to 4G of memory or 6G if running the privacy examples.
Refer to the _Resources_ section in [Docker for Mac](https://docs.docker.com/docker-for-mac/) and
[Docker Desktop](https://docs.docker.com/docker-for-windows/) for details.

## Usage

You can follow this [walk-through](https://consensys.net/quorum/products/guides/getting-started-with-consensys-quorum/)
which details the entire process.

To create the docker-compose file and artifacts, run:

```bash
npx quorum-dev-quickstart
```

Follow the prompts displayed.

When installation is complete, refer to `README.md` in the installation directory for more information
on your test network. Optionally, refer to the previously mentioned walk-through.

## Private transactions

At the prompt **Do you wish to enable support for private transactions?**, enter `Y` to get three Besu nodes, with each
node having a corresponding Tessera node for privacy. You can access the Besu member nodes for API calls and
transactions.

Follow the [privacy walk-through](./Examples/Privacy-Example.md) which details how to send private
transactions, and interact with deployed private contracts.

## Monitoring

At the prompt **Do you wish to enable support for logging with Splunk or ELK?**, choose **None** to use only the default
monitoring tools, [Prometheus and Grafana](../HowTo/Monitor/Metrics.md), which let you visualize node health and usage.
The [quickstart tutorial](Examples/Private-Network-Example.md#monitor-nodes-with-prometheus-and-grafana) contains Prometheus
and Grafana usage and configuration information.

Choose **Splunk** to use the default monitoring tools and [Splunk monitoring](../HowTo/Monitor/Splunk-Enterprise.md).

Choose **ELK** to use the default monitoring tools and [ELK logging](../HowTo/Monitor/Elastic-Stack.md).

## Smart contracts and dapps

You can use the Pet Shop demo dapp provided by [Truffle](https://www.trufflesuite.com/tutorial) which runs
a local website using Docker, and uses smart contracts deployed on the network.

The directory created by `quorum-dev-quickstart` includes a `dapps/pet-shop` directory which contains
the source code for the dapp, including the smart contracts, website, and configurations to run
the tutorial.

Follow the [dapp walk-through](Examples/Private-Network-Example.md#smart-contract-and-dapp-usage) which details
how to deploy the dapp and interact with the network.

## Add a new node to the network

New nodes joining an existing network require the following:

- The same genesis file used by all other nodes on the running network.
- A list of nodes to connect to; this is done by specifying [bootnodes], or by providing a list of [static nodes].
- A node key pair and optionally an account. If the running network is using permissions, then you need
  to add the new node's enode details to the [permissions file] used by existing nodes, or update
  the onchain permissioning contract.
  The following steps describe the process to add a new node to the Quorum Dev Quickstart.

### 1. Create the node key files

Create a node key pair and account for a new node, by running the following script:

```bash
cd ./extra
npm install
node generate_node_keys.js --password "Password"
```

!!! note
The `--password` parameter is optional.

### 2. Create new node directory

In the [`config/nodes`](https://github.com/ConsenSys/quorum-dev-quickstart/tree/master/files/common/config/nodes)
directory, create a subdirectory for the new node (for example, `newnode`), and move the
`nodekey`, `nodekey.pub`, `address` and `accountkey` files from the previous step into this directory.

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

!!! important
Select an IP address and port map that aren't being used for the other containers. Additionally mount the newly created
folder `./config/nodes/newnode` to the `/opt/besu/keys` directory of the new node.

### 4. Update prometheus.yml

Update prometheus.yml under ./config/prometheus/ to enable metrics gathering and to show up under Grafana.
Insert the following under scrape_configs in the file. Make sure to change the `job_name` and `targets` appropriately if you have changed them:

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

Add the new node's enode address to the [static nodes] file and [permissions file].
The enode uses the format `enode://pubkey@ip_address:30303`.
If the `nodekey.pub` is `4540ea...9c1d78` and the IP address is `172.16.239.41`, then the enode
address would be `"enode://4540ea...9c1d78@172.16.239.41:30303"`,
which must be added to both files.

As an alternative, it is also possible to call the Besu API method [`perm_addNodesToAllowlist`](https://besu.hyperledger.org/en/latest/Reference/API-Methods/#perm_addnodestoallowlist) to add the new node to the [allow list]: ../HowTo/Limit-Access/Local-Permissioning.md#node-allowlisting

### 6. Start the network

Once complete, start the network up with `./run.sh`
On a live network the process is the same when using local permissions with the `permissions_config.toml` file.
You don't need to restart the network and subsequent changes to the files are picked up by the servers.
When using the smart contract you can either make changes
via a [dapp](https://github.com/ConsenSys/permissioning-smart-contracts) or via RPC
[API]: ../Reference/API-Methods.md#`PERM` calls.
[bootnodes]: ../HowTo/Deploy/Bootnodes.md
[permissions file]: ../HowTo/Limit-Access/Local-Permissioning.md
[static nodes]: ../HowTo/Find-And-Connect/Bootnodes.md
