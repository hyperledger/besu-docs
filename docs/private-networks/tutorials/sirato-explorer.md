---
title: Privacy Enabled Besu - Sirato (Epirus) Explorer
description: Using the Sirato Explorer on a privacy enabled Besu
---

# Epirus Explorer

Epirus is an EVM explorer that provides an overview over the whole network, such as block information, wiew contracts metadata as well as search for transactions. Epirus supports public and private networks, this tutorial will walk you through how to setup Sirato Explorer with privacy-enabled Besu network.

The instructions assumes you have setup a privacy enabled-network in your local development environment.

## Prerequisites
 
* [Docker and Docker-compose](https://docs.docker.com/compose/install/)
* [Git command line](https://git-scm.com/)

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

## Start Epirus Docker

Clone Epirus Explorer repository

```
git clone https://github.com/web3labs/epirus-free
```

The repo contains a docker-compose extension to allow Epirus to start with

```
NODE_ENDPOINT=http://member1besu:8545 docker-compose -f docker-compose.yml -f epirus-extensions/docker-compose-quorum-dev-quickstart.yml up
```

## Explorer Dashboard

The **Explorer Dashbord** page gives you a an aggregated view on network activities.

![`Epirus-dashboard`](../../assets/images/sirato-dashboard.png)

## Blocks

![`sirato-blocks`](../../assets/images/sirato-blocks.png)

## Block details

![`sirato-blocks`](../../assets/images/sirato-block-details.png)

## Transactions

![`sirato-blocks`](../../assets/images/sirato-transactions.png)

## Network

The **Network** page shows the network peers

![`sirato-network`](../../assets/images/sirato-network.png)