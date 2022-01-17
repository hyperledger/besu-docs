---
title: Besu Kubernetes Maintenance
description: Maintenance for Besu on a Kubernetes cluster
---

## Prerequisites

* Clone the [Quorum-Kubernetes](https://github.com/ConsenSys/quorum-kubernetes) repository
* A [running Kubernetes cluster](./Create-Cluster.md) with a [network](./Deploy-Charts.md)
* Install [Kubectl](https://kubernetes.io/docs/tasks/tools/)
* Install [Helm3](https://helm.sh/docs/intro/install/)

## Update a persistent volume claim (PVC) size

As the chain grows so does the amount of space used by the PVC. As of Kubernetes v1.11,
[certain types of Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/#allow-volume-expansion)
allow volume resizing. Our production charts for Azure use Azure Files and for AWS use EBS Block Store which allow for
volume expansion.

To update the volume size, add the following to the override values file. For example to increase the size on the
transaction nodes volumes, add the following snippet to the
[`txnode values.yml`](https://github.com/ConsenSys/quorum-kubernetes/blob/master/dev/helm/values/txnode.yml) file, with
appropriate size (for example 50Gi below).

```bash
storage:
  sizeLimit: "50Gi"
  pvcSizeLimit: "50Gi"
```

Once complete, update the node via helm:

```bash
helm upgrade tx-1 ./charts/besu-node --namespace besu --values ./values/txnode.yml
```

## Update Besu versions

!!! important

    When updating Besu nodes across a cluster, perform the updatesas a rolling update and not all at once,
    especially for the validator pool. If all the validators are taken offline, the
    chain will halt, and you'll have to wait for round changes to expire before blocks are created again.

Updates for Besu can be done via Helm in exactly the same manner as other applications. Alternatively, this can be done
via `kubectl`. In this example, we'll update a node called `besu-validator-3`:

1. Set the update policy to use rolling updates (if not done already):

    ```bash
    kubectl patch statefulset besu-validator-3 --namespace besu -p '{"spec":{"updateStrategy":{"type":"RollingUpdate"}}}'
    ```

2. Update the Besu version via Helm:

      ```bash
      helm upgrade bootnode-1 ./charts/besu-node --namespace besu --values ./values/bootnode.yml --set image.besu.tag=21.10.0
      ```

     Or via `kubectl`:

      ```bash
      kubectl patch statefulset besu-validator-3 --namespace besu --type='json' -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value":"hyperledger/besu:21.10.0"}]'
      ```
