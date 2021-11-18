---
description: Ethstats network monitor
---

# Ethstats network monitor

Connect to an [Ethstats server](https://github.com/goerli/ethstats-server) to have a live view of private network health by displaying real time and historical statistics about the network and nodes.
Connect to a server using the [`--ethstats` CLI option](../../Reference/CLI/CLI-Syntax.md#ethstats).

## Statistics

Statistics displayed by EthStats include:

- Nodes in the network. Metrics for nodes include:
    - Information about the last received block such as block number, block hash, transaction count, uncle count, block time and propagation time.
    - Connected peers, whether the node is mining, hash rate, latency, and uptime.
- Charts for Block Time, Block Difficulty, Block Gas Limit, Block Uncles, Block Transactions, Block Gas Used, Block Propagation Histogram, and Top Miners.
- IP-based geolocation overview.
- Node logs, which display the data sent by a node.
- Block history, which provides the ability to go back in time and playback the block propagation through the nodes.

## Components

Ethstats consists of the following:

- [Server](https://github.com/goerli/ethstats-server). The server consumes node data received from the client.
- [Client](https://github.com/goerli/ethstats-client). Each node in the network requires you to start a client. The client extracts data from the node and sends it to the server.
- [Dashboard](https://ethstats.net). The dashboard displays statistics.

## Running Ethstats on a Besu node

### Server

### Client

### Dashboard