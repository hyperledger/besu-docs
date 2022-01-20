---
title: Deploy a Hyperledger Besu private network locally with Kubernetes
description: Deploying a Hyperledger Besu private network locally with Kubernetes
---

# Deploy Besu with Kubernetes in a Local Environment

The [playground](https://github.com/ConsenSys/quorum-kubernetes/tree/master/playground) was created to provide an opportunity to deploy [quorum-kubernetes](https://github.com/ConsenSys/quorum-kubernetes/) in a local environment before attempting in a "live" environment (such as in the cloud or on-premise). Local deployment can be done with any local Kubernetes tool. Minikube and Rancher Desktop have been specifically tested to work, but any complete Kubernetes solution with support for `kubectl` should suffice.

## How to Deploy Locally

1. Navigate to the playground [README](https://github.com/ConsenSys/quorum-kubernetes/tree/master/playground).
2. Ensure that your system meets the requirements specified.
3. Choose your Ethereum client (Hyperledger Besu or GoQuorum): `quorum-besu` or `quorum-go`
4. Choose your consensus algorithm that you would like to deploy. The playground supports Clique, Ethhash (PoW) and IBFT2 for Besu. For GoQuorum, the playground supports IBFT.
5. Follow the instructions from the README for the chosen client and consensus algorithm folder.

## Important Notes

There are some disclaimers and notes that should be taken into account when deploying and developing with the playground:

1. The playground is created specifically for developers and ops to become familiar with the deployment of Besu in a Kubernetes environment in preparation for going into a cloud or on-premise environment. Thus, it should **not** be deployed into a production environment.
2. The playground is not a complete reflection of the `dev` and `prod` charts as it does not use `Helm`, but rather static or non-templated code that is deployed through `kubectl apply -f`. This means that without `Helm` there will be a significant amount of repeated code. This is fine for development but not ideal for a production environment. 
3. There is no automatic key generation which is supported in `dev` and `prod` charts (playground uses static/hard-coded keys).
4. As the playground is for local development, no cloud integration or lifecycle support is offered.
