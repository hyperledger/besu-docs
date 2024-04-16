---
title: Upgrade Besu
sidebar_position: 11
description: Upgrade your Besu node to a new version.
tags:
  - public networks
---

# Upgrade your Besu node

When upgrading your Besu node, we recommend:

- Using an orchestration method (for example, Ansible or Chef) to keep all nodes in sync with your desired configuration.
- Storing your configuration under version control.

## Ansible

You can use the [Ansible role on Galaxy](https://galaxy.ansible.com/consensys/hyperledger_besu) directly or customize it to suit your needs.

Upgrade the Besu version on nodes by running the play with the new version. For more information, For more information, select **Read Me** on the [Ansible Galaxy Besu page](https://galaxy.ansible.com/consensys/hyperledger_besu).

The playbook:

1. Stops Besu.
1. Downloads the updated version.
1. Applies any new configuration.
1. Starts Besu.

## Find peers on restarting

Nodes store known peers in the peer table. The peer table is not persisted to disk. When a node restarts, the node connects to the specified bootnodes and discovers other nodes through the peer discovery process. The node continues collecting data from where it left off before the restart (assuming there was no data corruption in a failure scenario).

Before the node restarted, connected peers saved the node details in their peer tables. These peers can reconnect to the restarted node. The restarted node uses these peers and the bootnodes, to discover more peers. To ensure that the restarted node successfully rejoins the network, ensure you specify at least one operational bootnode.
