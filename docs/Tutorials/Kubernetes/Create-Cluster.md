---
title: Quorum Kubernetes - Create a Cluster
description: Create a cluster for deployment of Quorum
---

# Create a cluster

The first thing that is required is a cluster to deploy the Quorum network to and there are options
locally as well as in cloud

## Prerequisites

* Clone the [Quorum-Kubernetes](https://github.com/ConsenSys/quorum-kubernetes) repository
* [Kubectl](https://kubernetes.io/docs/tasks/tools/)
* [Helm3](https://helm.sh/docs/intro/install/)
* [AWS CLI](https://aws.amazon.com/cli/) and [eksctl](https://eksctl.io/) for AWS EKS clusters
* [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) for Azure AKS clusters
* Cloud specific CLI

## Local Clusters

There are quite a few tools you can use to spin up a cluster locally and you can pick one that you
are comfortable with

### [Minikube](https://minikube.sigs.k8s.io/docs/start/)

Minikube is one of the most popular options to spin up a local Kubernetes cluster for development which can
be [installed](https://minikube.sigs.k8s.io/docs/start/) based on your architecture.

To start the cluster we recommend at least 2 CPUs and 16GB of RAM and run the following command

```bash
minikube start --cpus 2 --memory 16384 --cni auto
```

### [kind](https://kind.sigs.k8s.io)

Kind (Kubernetes in Docker) is another lightweight tool for running local K8s clusters and the
[installation](https://kind.sigs.k8s.io/docs/user/quick-start#installation) is similar to Minikube above.
Once installed, a cluster can be started like so:

```bash
kind create cluster
```

### [Rancher](https://github.com/rancher-sandbox/rancher-desktop/)

Rancher is a light-weight open-source desktop application for Mac, Windows and Linux. It provides Kubernetes and container management. It also allows you to choose the version of Kubernetes to run on. It can build, push, pull and run container images. Built container images can be run without needing a registry.

!!!note
    The official Docker-CLI is not supported but rather uses [nerdctl](https://github.com/containerd/nerdctl) which is a Docker-CLI compatible tool for containerd and is automatically installed with Rancher Desktop. 

!!!note
    For Windows, the Windows Subsystem for Linux (WSL) is required for Rancher Desktop to be installed. You may find installation instructions for WSL [here](https://docs.microsoft.com/en-us/windows/wsl/install).

Please refer to the official [documentation](https://github.com/rancher-sandbox/rancher-desktop/blob/main/docs/installing.md) for system requirements and installation instructions.


## Cloud Clusters

### [AWS EKS](https://aws.amazon.com/eks/)

AWS Elastic Kubernetes Service is one of the most popular platforms that you can use to deploy Hyperleger Besu
to. To create a cluster in AWS, you need to install the [AWS CLI](https://aws.amazon.com/cli/) and
[eksctl](https://eksctl.io/). 

We have a [template](https://github.com/ConsenSys/quorum-kubernetes/tree/master/aws) that comprises base
infrastructure that is used to build the cluster & other resources in AWS. We also make use some AWS native
services and features after the cluster is created. These include:

- [Pod identities](hhttps://github.com/aws/amazon-eks-pod-identity-webhook).
- [Secrets Store CSI drivers](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html)
- Data is stored using dynamic StorageClasses backed by AWS EBS. Please note the
  [Volume Claims](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) are fixed
  sizes and can be updated as you grow via a helm update, and will not need reprovisioning of the underlying storage
  class.
- [CNI](https://docs.aws.amazon.com/eks/latest/userguide/pod-networking.html) networking mode for EKS. By default,
  EKS clusters use **kubenet**, and a virtual network and subnet are created for you. With kubenet, nodes get an IP
  address from a virtual network subnet. Network address translation (NAT) is then configured on the nodes, and pods
  receive an IP address "hidden" behind the node IP. This approach reduces the number of IP addresses that you need
  to reserve in your network space for pods to use, however places constraints on what can connect to the nodes from
  outside the cluster (eg on prem nodes or those on another cloud provider)

With AWS Container Networking Interface (CNI), every pod gets an IP address from the subnet and can be accessed
directly. These IP addresses must be unique across your network space, and must be planned in advance. Each node has
a configuration parameter for the maximum number of pods that it supports. The equivalent number of IP addresses
per node are then reserved up front for that node. This approach requires more planning, and can leads to IP address
exhaustion as your application demands grow, however makes it easier for external nodes to connect to your cluster.

!!!note

    EKS clusters may not use 169.254.0.0/16, 172.30.0.0/16, 172.31.0.0/16, or 192.0.2.0/24 for the Kubernetes
    service address range.

To provision the cluster:

1. Update [cluster.yml](https://github.com/ConsenSys/quorum-kubernetes/blob/master/aws/templates/cluster.yml) with
your VPC details

2. Deploy the template with 
```bash
eksctl create cluster -f ./templates/cluster.yml
```

3. Optionally deploy the
[kubernetes dashboard](https://github.com/ConsenSys/quorum-kubernetes/tree/master/aws/templates/k8s-dashboard)

4. Provision drivers - once the deployment has completed, we need to provision the Secrets Manager, Identity and the 
CSI drivers. Use `besu` or `quorum` for `EKS_NAMESPACE` and update `AWS_REGION` and `EKS_CLUSTER_NAME` in the
commands below to match your settings from step 2.

```bash
helm repo add secrets-store-csi-driver https://raw.githubusercontent.com/kubernetes-sigs/secrets-store-csi-driver/master/charts
helm install --namespace quorum --create-namespace csi-secrets-store secrets-store-csi-driver/secrets-store-csi-driver 
kubectl apply --namespace quorum -f templates/secrets-manager/aws-provider-installer.yml

POLICY_ARN=$(aws --region AWS_REGION --query Policy.Arn --output text iam create-policy --policy-name quorum-node-secrets-mgr-policy --policy-document '{
    "Version": "2012-10-17",
    "Statement": [ {
        "Effect": "Allow",
        "Action": ["secretsmanager:CreateSecret","secretsmanager:UpdateSecret","secretsmanager:DescribeSecret","secretsmanager:GetSecretValue","secretsmanager:PutSecretValue","secretsmanager:ReplicateSecretToRegions","secretsmanager:TagResource"],
        "Resource": ["arn:aws:secretsmanager:AWS_REGION:AWS_ACCOUNT:secret:besu-node-*"]
    } ]
}')

eksctl create iamserviceaccount --name quorum-node-secrets-sa --namespace EKS_NAMESPACE --region=AWS_REGION --cluster EKS_CLUSTER_NAME --attach-policy-arn "$POLICY_ARN" --approve --override-existing-serviceaccounts
```

Your cluster should now be ready for use and you can deploy [charts](./Deploy-Charts.md) to it.

### Azure AKS

Azure Kubernetes Service is one of the most popular platforms that you can use to deploy Hyperleger Besu
to. To create a cluster in Azure, you need to install the
[Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli) and you must have admin rights on your Azure
subscription to enable some preview features on AKS.

We have a [template](https://github.com/ConsenSys/quorum-kubernetes/tree/master/azure) that comprises base
infrastructure that is used to build the cluster & other resources in Azure. We also make use some Azure native
services and features after the cluster is created. These include:

- [AAD pod identities](https://docs.microsoft.com/en-us/azure/aks/use-azure-ad-pod-identity).
- [Secrets Store CSI drivers](https://docs.microsoft.com/en-us/azure/key-vault/general/key-vault-integrate-kubernetes)
- Data is stored using dynamic StorageClasses backed by Azure Files. Please note the
  [Volume Claims](https://docs.microsoft.com/en-us/azure/aks/azure-disks-dynamic-pv) are fixed sizes and can be updated
  as you grow via a helm update, and will not need reprovisioning of the underlying storage class.
- [CNI](https://docs.microsoft.com/en-us/azure/aks/configure-azure-cni) networking mode for AKS. By default, AKS
  clusters use **kubenet**, and a virtual network and subnet are created for you. With kubenet, nodes get an IP address
  from a virtual network subnet. Network address translation (NAT) is then configured on the nodes, and pods receive 
  an IP address "hidden" behind the node IP. This approach reduces the number of IP addresses that you need to reserve
  in your network space for pods to use, however places constraints on what can connect to the nodes from outside the
  cluster (eg on prem nodes or other cloud providers)

With AKS Container Networking Interface (CNI), every pod gets an IP address from the subnet and can be accessed
directly. These IP addresses must be unique across your network space, and must be planned in advance. Each node has
a configuration parameter for the maximum number of pods that it supports. The equivalent number of IP addresses
per node are then reserved up front for that node. This approach requires more planning, and can leads to IP address
exhaustion as your application demands grow, however makes it easier for external nodes to connect to your cluster.

!!!note

    Please do not create more than one EKS cluster in the same subnet. EKS clusters may not use 169.254.0.0/16,
    172.30.0.0/16, 172.31.0.0/16, or 192.0.2.0/24 for the Kubernetes service address range.

To provision the cluster:

1. Enable some preview features that will allow you to use AKS with CNI and a managed identity to authenticate and
  run operations of the cluster with other services. We also enable
  [AAD pod identities](https://docs.microsoft.com/en-us/azure/aks/use-azure-ad-pod-identity) which use the managed
  identity. This is in preview so you need to enable this feature by registering the EnablePodIdentityPreview feature:
```bash
az feature register --name EnablePodIdentityPreview --namespace Microsoft.ContainerService
```
This takes a little while and you can check on progress by:
```bash
az feature list --namespace Microsoft.ContainerService -o table
```

Then install or update your local Azure CLI with preview features
```bash
az extension add --name aks-preview
az extension update --name aks-preview
```

2. Create a resource group if you haven't got one ready for use.
```bash
az group create --name BesuGroup --location "East US"
```

3. Deploy the template 

* Navigate to the [Azure portal](https://portal.azure.com), click `+ Create a resource` in the upper left corner.
* Search for `Template deployment (deploy using custom templates)` and click Create.
* Click on `Build your own template in the editor`
* Remove the contents (json) in the editor and paste in the contents of
  `[azuredeploy.json](https://github.com/ConsenSys/quorum-kubernetes/blob/master/azure/arm/azuredeploy.json)`
* Click Save
* The template will be parsed and a UI will be shown to allow you to input parameters to provision

4. Provision Drivers - once the deployment has completed, we need to provision the AAD pod identity and the CSI drivers.
Run the [bootstrap](https://github.com/ConsenSys/quorum-kubernetes/blob/master/azure/scripts/bootstrap.sh) script


Use `besu` or `quorum` for AKS_NAMESPACE and update `AKS_RESOURCE_GROUP`, `AKS_CLUSTER_NAME`, `AKS_MANAGED_IDENTITY` in
the commands below to match your settings and deployed resources from step 3.

```bash
./scripts/bootstrap.sh "AKS_RESOURCE_GROUP" "AKS_CLUSTER_NAME" "AKS_MANAGED_IDENTITY" "AKS_NAMESPACE"
```

5. Your cluster should now be ready for use and you can deploy [charts](./Deploy-Charts.md) to it.
