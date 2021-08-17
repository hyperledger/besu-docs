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

