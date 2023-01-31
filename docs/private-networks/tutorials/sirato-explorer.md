---
title: Privacy Enabled Besu - Sirato (Epirus) Explorer
description: Using the Sirato Explorer on a privacy enabled Besu
---

# Sirato Explorer

Sirato is an EVM explorer that provides an overview over the whole network, and provides a bunch of additional functionality like block information, contracts metadata, transaction searches etc and an overview can be found [here](https://medium.com/web3labs/epirus-ethereum-saas-blockchain-explorer-d5d961717d15). Sirato supports public and private networks. Sirato free (used here) has some [feature limitations](insert link of what these are ) and you can find out more information about Sirato [here](https://www.web3labs.com/sirato)

This tutorial will walk you through how to setup Sirato Explorer with privacy-enabled Besu network.

---

**NOTE**

We are connecting to one of the privacy nodes `member1besu` not the dedicated RPC. This is required to allow access for Besu privacy APIs, in production access to RPC nodes must be securted, recommended approach is configure [authentication](../../public-networks/how-to/use-besu-api/authenticate.md) with JWT and enable TLS flags.

---

## Start Sirato Docker

Clone Sirato Explorer repository

```
git clone https://github.com/web3labs/sirato-free
```

The repo contains a docker-compose scripts to allow Sirato to start with quorum quickstart test network.

From sirato-free repo, run the following script

```
./start_sirato_besu.sh
```

once successful, you should see the following output
```
*************************************
Sirator Explorer for Besu
*************************************
Starting explorer
--------------------
[+] Running 5/5
 ⠿ Container docker-compose-mongodb-1    Started                                                                                                                    3.3s
 ⠿ Container docker-compose-api-1        Started                                                                                                                    4.1s
 ⠿ Container docker-compose-ingestion-1  Started                                                                                                                    4.2s
 ⠿ Container docker-compose-web-1        Started                                                                                                                    4.4s
 ⠿ Container docker-compose-nginx-1      Started                                                                                                                    5.0s
----------------------------------
Services
----------------------------------
Sirato explorer HTTP endpoint                 : http://localhost:260012
Sirato is connected to node                   : http://rpcnode:8545
```

To stop all the services from running. Simply execute the script below.
```
./stop.sh
```

Once all services are stopped successfully
```
*************************************
Sirator Explorer for Besu
*************************************
Stopping explorer
[+] Running 5/5
 ⠿ Container docker-compose-nginx-1      Stopped                                                                                                                    0.5s
 ⠿ Container docker-compose-ingestion-1  Stopped                                                                                                                    4.0s
 ⠿ Container docker-compose-web-1        Stopped                                                                                                                   10.3s
 ⠿ Container docker-compose-api-1        Stopped                                                                                                                    2.9s
 ⠿ Container docker-compose-mongodb-1    Stopped
```

Then open http://localhost/ on your browser. You’ll see our new initialisation page while it’s booting up. This may take 5~10 minutes for the all service to start and ingestion sync is complete.

![`Sirato-dashboard`](../../assets/images/sirato-loading.png)


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
