title: Hyperledger Besu Enterprise Ethereum Client
description: Besu is an open-source Enterprise Ethereum client developed under the Apache 2.0 license and written in Java. It runs on the Ethereum public network, private networks, and test networks.
<!--- END of page meta data -->

# Besu Enterprise Ethereum Client

## What is Hyperledger Besu?

Hyperledger Besu is an open-source Ethereum client developed under the Apache 2.0 license and written in Java. 
It runs on the Ethereum public network, private networks, and test networks such as Rinkeby, Ropsten,
and Görli. Besu implements Proof of Work (Ethash) and Proof of Authority (IBFT 2.0 and Clique) consensus
mechanisms. 

You can use Besu to develop enterprise applications requiring secure, high-performance transaction 
processing in a private network. 

Besu supports enterprise features including privacy and permissioning. 

## What can you do with Besu?

Besu includes a [command line interface](Reference/CLI/CLI-Syntax.md) and [JSON-RPC API](HowTo/Interact/APIs/API.md)
for running, maintaining, debugging, and monitoring nodes in an Ethereum network. You can use the API via RPC
over HTTP or via WebSockets, and Pub/Sub is supported. The API supports typical Ethereum functionalities such as:

* Ether mining
* Smart contract development
* Decentralized application (Dapp) development

## What does Besu support?

The Besu client supports common smart contract and Dapp development, deployment, and operational use cases, using tools such as [Truffle](http://truffleframework.com/), [Remix](https://github.com/ethereum/remix), and [web3j](https://web3j.io/). The client supports common JSON-RPC API methods such as eth, net, web3, debug, and miner.

Besu doesn't support [key management](HowTo/Send-Transactions/Account-Management.md) inside the client. You can use 
[EthSigner](http://docs.ethsigner.pegasys.tech/en/latest/) with Besu to provide access to your key store
and sign transactions.  
