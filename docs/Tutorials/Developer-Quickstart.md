---
title: Developer Quickstart
description: Rapidly generate local blockchain networks.
---

# Developer Quickstart

## Prerequisites

- [Docker and Docker-compose](https://docs.docker.com/compose/install/)
- [Nodejs](https://nodejs.org/en/download/)
- On Windows:
    - Windows Subsystem for Linux 2
    - Docker desktop configured to use the WSL2-based engine.

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

## Private Transactions

Select 'y' to the 'privacy' option and you will get three member nodes pairs (a Besu node which has a corresponding
Tessera node for privacy) that can be accessed for API calls and transactions. You can follow the
[privacy walk-through](./Examples/Privacy-Example.md) which has details of how to send private transactions as well 
as interact with deployed private contracts 

## Smart Contracts and DApps

You can use a demo DApp called Pet Shop, provided by [Truffle](https://www.trufflesuite.com/tutorial).

The DApp runs a local website using Docker, and uses smart contracts deployed on the network.

The directory created by `quorum-dev-quickstart` includes a `dapps` directory with a `pet-shop` subdirectory,
which contains the source code for the dapp, including the smart contracts, website, and configurations to run this tutorial.

You can follow the
[dapp walk-through](./Examples/Private-Network-Example.md/#smart-contract-and-dapp-usage) which has details of how to 
deploy the DApp and intract with the network and buy pets

## Monitoring

The sample network also includes Prometheus and Grafana monitoring tools to let you visualize node health and usage.
You can follow the
[monitoring](./Examples/Private-Network-Example.md/#monitor-nodes-with-prometheus-and-grafana) section of the quickstart for details
on usage as configuration


 