---
title: Privacy Enabled Besu - Sirato (Epirus) Explorer
description: Using the Sirato Explorer on a privacy enabled Besu
---

# Sirato Explorer

Sirato is an EVM explorer that provides an overview over the whole network, such as block information, view contracts metadata as well as search for transactions. Sirato supports public and private networks. This tutorial will walk you through how to setup Sirato Explorer with privacy-enabled Besu network.

The instructions recommends you have setup a privacy enabled-network in your local development environment. But the configuration should apply to any compatible EVM network.

## Prerequisites
 
* [Docker and Docker-compose](https://docs.docker.com/compose/install/)
* [Git command line](https://git-scm.com/)
* [Truffle](https://trufflesuite.com/truffle/) (For contracts deployment)

### System requirements

* Set Docker memory to at least 8 GB

Check Besu [system requirements](https://besu.hyperledger.org/en/stable/private-networks/get-started/system-requirements/
) for the complete list.

## Start Private Besu Network

Generate the IBFT 2.0 test Besu network using Quorum Developer Quickstart

```
npx quorum-dev-quickstart
```

Make sure you've selected `Y` for privacy and `N` for monitoring with blockscout

```
...
Do you wish to enable support for private transactions? [Y/n]
y
...
Do you wish to enable support for monitoring your network with Blockscout? [N/y]
n
```

Go to directory `quick-test-quorum`, and start the network

```
./run.sh
```

You should see the following output once all containers started:

```
*************************************
Quorum Dev Quickstart 
*************************************
----------------------------------
List endpoints and services
----------------------------------
JSON-RPC HTTP service endpoint                 : http://localhost:8545
JSON-RPC WebSocket service endpoint            : ws://localhost:8546
Web block explorer address                     : http://localhost:25000/explorer/nodes
Prometheus address                             : http://localhost:9090/graph
Grafana address                                : http://localhost:3000/d/XE4V0WGZz/besu-overview?orgId=1&refresh=10s&from=now-30m&to=now&var-system=All
Collated logs using Grafana and Loki           : http://localhost:3000/d/Ak6eXLsPxFemKYKEXfcH/quorum-logs-loki?orgId=1&var-app=besu&var-search=

```

For the complete tutorial see this [page](./quickstart.md)

## Start Sirato Docker

Clone Sirato Explorer repository

```
git clone https://github.com/web3labs/sirato-free
```

The repo contains a docker-compose scripts to allow Sirato to start with quorum quickstart test network.

From sirato-free repo change to docker-compose directory, and then run the following command

```
NODE_ENDPOINT=http://member1besu:8545 docker-compose -f docker-compose.yml -f sirato-extensions/docker-compose-quorum-dev-quickstart.yml up
```

Then open http://localhost/ on your browser. You’ll see our new initialisation page while it’s booting up. This may take 5~10 minutes for the all service to start and ingestion sync is complete.

![`Sirato-dashboard`](../../assets/images/sirato-loading.png)

---
**NOTE**

We are connecting to one of the privacy nodes `member1besu` not the dedicated RPC. This is required to allow access for Besu privacy APIs, in production access to RPC nodes must be securted, recommended approach is configure [authentication](../../public-networks/how-to/use-besu-api/authenticate.md) with JWT and enable TLS flags.

---

## Explorer Dashboard

The **Explorer Dashbord** page gives you a an aggregated view on network activities

![`Epirus-dashboard`](../../assets/images/sirato-dashboard.png)

## Network

The **Network** page provides an overview of the network status and connected peers. This page is disabled by default, and can only be visible if `DISPLAY_NETWOR_TAB=enabled` is set when you run the following command.

```
NODE_ENDPOINT=http://member1besu:8545 DISPLAY_NETWORK_TAB=enabled docker-compose -f docker-compose.yml -f sirato-extensions/docker-compose-quorum-dev-quickstart.yml up
``` 

![`sirato-network`](../../assets/images/sirato-network.png)

## Blocks

This **Blocks** page shows a realtime view of the finalised blocks

![`sirato-blocks`](../../assets/images/sirato-blocks.png)

You can view a given block details by clicking over block hash or block number

![`sirato-blocks`](../../assets/images/sirato-block-details.png)

## Transactions

The **Transactions** page shows a paginated view of the new and historical transactions 

![`sirato-blocks`](../../assets/images/sirato-transactions.png)

## Find out more

Sirato free version have some feature limitations, find out more about Sirato [here](https://medium.com/web3labs/epirus-ethereum-saas-blockchain-explorer-d5d961717d15)
