---
title: Hyperledger Besu Ethereum client
description: Besu is an open-source Ethereum client developed under the Apache 2.0
    license and written in Java. It runs on the Ethereum public network, private networks, and test
    networks.
---

# Besu Ethereum client

<div class="grid cards" markdown>

* :material-book-open-variant: __Public networks__

    ---

    You can run Besu as an execution client on Ethereum Mainnet and Ethereum public testnets, such as Goerli and Sepolia.

    [:octicons-arrow-right-24: Getting started](HowTo/Get-Started/System-Requirements/System-Requirements-Public.md)

* :material-book-lock-outline: __Private networks__

    ---

    You can create or join a network not connected to Mainnet or a public testnet. Use private networks to develop enterprise applications requiring secure, high-performance transaction processing.

    [:octicons-arrow-right-24: Getting started](HowTo/Get-Started/System-Requirements/System-Requirements-Private.md)

</div>

## What is Hyperledger Besu?

Hyperledger Besu is an open-source Ethereum client developed under the Apache 2.0 license and written in Java.
It runs on Ethereum Mainnet, private networks, and test networks such as Rinkeby, Ropsten, Goerli, and the Merge testnet.
Besu serves as an [execution client](Concepts/Merge.md) on Ethereum Mainnet and the Merge testnet.

Besu implements proof of authority (QBFT, IBFT 2.0, and Clique) and proof of work (Ethash) consensus mechanisms.

You can use Besu to develop enterprise applications requiring secure, high-performance transaction
processing in a private network.

Besu supports enterprise features including privacy and permissioning.

## What can you do with Besu?

Besu includes a [command line interface](Reference/CLI/CLI-Syntax.md) and
[JSON-RPC API](HowTo/Interact/APIs/API.md) for running, maintaining, debugging, and monitoring
nodes in an Ethereum network. You can use the API via RPC over HTTP or via WebSockets. Besu also
supports Pub/Sub. The API supports typical Ethereum functionalities such as:

* Ether mining.
* Smart contract development.
* Decentralized application (dapp) development.

## New to Ethereum?

Get started with the [Developer Quickstart](Tutorials/Developer-Quickstart.md). Use the quickstart
to rapidly generate local blockchain networks.

Learn more about [use cases for Ethereum](https://consensys.net/blockchain-use-cases/case-studies/).

## What does Besu support?

The Besu client supports common smart contract and dapp development, deployment, and operational
use cases, using tools such as [Truffle](http://truffleframework.com/),
[Remix](https://github.com/ethereum/remix), and [web3j](https://web3j.io/). The client supports
common JSON-RPC API methods such as `eth`, `net`, `web3`, `debug`, and `miner`.

Besu doesn't support [key management](HowTo/Send-Transactions/Account-Management.md) inside the
client. You can use [EthSigner](http://docs.ethsigner.consensys.net/en/latest/) with Besu to access
your key store and sign transactions.
