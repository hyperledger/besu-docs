---
title: Hyperledger Besu Ethereum client
description: Besu is an open-source Ethereum client developed under the Apache 2.0
    license and written in Java. It runs on the Ethereum public network, private networks, and test
    networks.
---

# Hyperledger Besu Ethereum client

Hyperledger Besu is an open source Ethereum client developed under the Apache 2.0 license and written in Java.
It runs on public and private networks:

<div class="grid cards" markdown>

* :material-book-open-variant: __Public networks__

    ---

    Run Besu as an execution client on Ethereum Mainnet and Ethereum public testnets, such as Goerli and Sepolia.

    [:octicons-arrow-right-24: Get started](public-networks/index.md)

* :material-book-lock-outline: __Private networks__

    ---

    Create or join a private, permissioned network. Use private networks to develop enterprise applications requiring secure, high-performance transaction processing.

    [:octicons-arrow-right-24: Get started](private-networks/index.md)

</div>

## What can you do with Besu?

Besu includes a [command line interface](public-networks/reference/cli/options.md) and
[JSON-RPC API](public-networks/how-to/use-besu-api/index.md) for running, maintaining, debugging, and monitoring
nodes in an Ethereum network. You can use the API via RPC over HTTP or via WebSocket. Besu also
supports Pub/Sub. The API supports typical Ethereum functionalities such as:

* Ether mining.
* Smart contract development.
* Decentralized application (dapp) development.

## What does Besu support?

The Besu client supports common smart contract and dapp development, deployment, and operational
use cases, using tools such as [Truffle](http://truffleframework.com/),
[Remix](https://github.com/ethereum/remix), and [web3j](https://web3j.io/). The client supports
common JSON-RPC API methods such as `eth`, `net`, `web3`, `debug`, and `miner`.

Besu doesn't support [key management](public-networks/how-to/send-transactions.md) inside the
client. You can use [EthSigner](http://docs.ethsigner.consensys.net/en/latest/) with Besu to access
your key store and sign transactions.

## Besu architecture

The following diagram outlines the Besu high-level architecture.

![Architecture](assets/images/Architecture.png)

If you have any questions about Besu or its architecture, contact us on the
[Besu channel on Hyperledger Discord](https://discord.gg/hyperledger).

Learn more about the [Hyperledger Foundation](https://www.hyperledger.org/about).
You can [contribute to the documentation](https://wiki.hyperledger.org/display/BESU/Documentation)
or to [Besu itself](https://wiki.hyperledger.org/display/BESU/Contributing).
