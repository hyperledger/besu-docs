---
title: Besu Kubernetes - Getting ready for production
description: Deploying Besu Helm Charts for production on a Kubernetes cluster
---

## Best practices

The most important thing is to plan your network out on paper first and then test it in a [playground](Playground.md) to make sure
connectivity works with your applications and you get the required throughput in transactions per second (TPS).
We also recommend you test the entire process, from provisioning infrastructure to updating nodes, prior to launching your production network.

By default, the cloud Kubernetes clusters take care of availability and do multi-zones within a region.
The scheduler also ensures that deployments are spread out across zones.
Where possible, we recommend you use multiple bootnodes and static nodes to speed up peering.

You can connect to APIs and services outside the cluster normally, but connecting into your network (such as
adding an on-premise node to the network) might require more configuration.
Please check the [limitations](./Overview.md#limitations) and use CNI where possible.
To connect an external node to your cluster, the easiest way is to use a VPN as seen in the
following [multi-cluster](#multi-cluster-support) setup.

Finally, we recommend setting up monitoring and alerting from the beginning so you can get early warnings of issues
rather than after failure.
We have a monitoring chart which uses Grafana and you can use it in conjunction with Alertmanager to create alerts or
alternatively alert via Cloudwatch or Azure Monitoring.

## Multi-cluster support

When CNI is used, multi-cluster support is simple, but you have to cater for cross-cluster DNS names.
Ideally, you want to create two separate VPCs (or VNets) and make sure they have different base CIDR blocks so that IPs
don't conflict.
Once done, peer the VPCs together and update the subnet route table, so they are effectively a giant single network.

![multi-cluster](../../images/kubernetes-3.png)

When you [spin up clusters](./Create-Cluster.md), use [CNI](./Overview.md#limitations) and CIDR blocks to match the
subnet's CIDR settings.
Then deploy the genesis chart on one cluster and copy across the genesis file and static nodes config maps.
Depending on your DNS settings, they might be fine as is or they might need to be actual IPs.
That is, you can provision cluster B only after cluster A has Besu nodes up and running.

Deploy the network on cluster A, and then on cluster B.
Besu nodes on cluster A should work as expected, and Besu nodes on cluster B should use the list of peers provided to
communicate with the nodes on cluster A.

Keeping the list of peers on the clusters live and up to date can be challenging, so we recommend using the cloud
service provider's DNS service such as Route 53 or Azure DNS and adapting the charts to create entries for each node
when it comes up.
