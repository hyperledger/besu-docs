---
title: Besu Kubernetes - Quorum Explorer
description: Using the Quorum Explorer on a Kubernetes cluster
---

## Prerequisites

* Clone the [Quorum-Kubernetes](https://github.com/ConsenSys/quorum-kubernetes) repository
* A [running Kubernetes cluster](./Create-Cluster.md)
* [Kubectl](https://kubernetes.io/docs/tasks/tools/)
* [Helm3](https://helm.sh/docs/intro/install/)
* [Existing network](./Deploy-Charts.md)

## Deploying the Quorum Explorer helm chart

[Quorum-Explorer](https://github.com/ConsenSys/quorum-explorer) as a lightweight
blockchain explorer. The Quorum Explorer is **not** recommended for use in production and is intended for
demonstration or Dev purposes only.

The Explorer can give an overview over the whole network, such as querying
each node on the network for block information, voting or removing validators from the network,
demonstrating a SimpleStorage smart contract with privacy enabled, and sending transactions between
wallets in one interface.

To achieve this, update the [Explorer values file](https://github.com/ConsenSys/quorum-kubernetes/blob/master/helm/values/explorer-besu.yaml)
with details of your nodes and endpoints and then [deploy](./Deploy-Charts.md).

## Nodes

The Nodes page gives you an overview of the nodes on the network. Select the node you would like to interact with from the drop down on the top right and you will get details of the node, block height, peers, queued transactions etc.

![`k8s-explorer`](../../images/kubernetes-explorer.png)

## Validators

The Validators view simulates a production environment or consortium where each node will individually
run API calls to vote a new validator in or an existing validator out. When using the buttons to
remove, discard pending, or proposing a validator, the app will send an API request to the selected node
from the drop down only. In order to add/remove a validator you need to select a majority of the existing
validator pool individually and perform the vote API call by clicking the button. Each node can call a
discard on the voting process during or after the validator has been added.

Also note that vote calls made from non validator nodes will have no effect on overall consensus.

![`k8s-explorer-validators`](../../images/kubernetes-explorer-validators.png)

## Explorer

The Explorer view gives you the latest blocks from the chain and the latest transactions as they
come through on the network. In addition, you can search by block number or transaction hash through each respective search bar.

![`k8s-explorer-explorer`](../../images/kubernetes-explorer-explorer.png)

## Contracts

This is a simple example of using the app to deploy a private transaction between private transaction
members, such as between `member-1`, `member-2` or `member-3`, as seen in this screenshot below.

To deploy a contract in this example, we deploy from `member-1` and select `member-1` and `member-3` in
the Deploy Private For multi-select. Then click on `Compile` and `Deploy`

![`k8s-explorer-contracts-1`](../../images/kubernetes-explorer-contracts-1.png)

Once deployed, you can interact with the contract. As this is a new transaction, select `member-1`
and `member-3` in Interact multi-select and then click on the appropriate method call to `get`
or `set` the value at the deployed contract address.

![`k8s-explorer-contracts-set`](../../images/kubernetes-explorer-contracts-set.png)

To check for the private transaction functionality, if you select `member-2` from the drop down on
the top right, you should find that you are unable to interact with the contract as it was not part
of the transaction. Only `members-1` and `member-3` will respond correctly.

At present, the only contract that is available for deployment through the app is the SimpleStorage contract. However, in time, we plan to add more contracts to that view.

## Wallet

The last view gives you the functionality to send simple Eth transactions between accounts by providing the account's private key, the recipient's address, and transfer amount in Wei.

![`k8s-explorer-wallet`](../../images/kubernetes-explorer-wallet.png)
