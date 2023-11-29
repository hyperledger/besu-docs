---
title: Use onchain permissioning
sidebar_position: 2
description: Use onchain permissioning allowlists
tags:
  - private networks
---

# Use onchain permissioning

This page contains some extra info if you're using [onchain permissioning](../../concepts/permissioning/onchain.md).

:::tip

If your node has two different IP addresses for ingress and egress (for example, if you use Kubernetes implementing a load balancer for ingress and a NAT gateway IP address for egress), add both addresses to the allowlist, using the same public key for each IP address. This will allow the node to connect.

:::

:::important

Node allowlists [support domain names] in enode URLs as an early access feature. Use the `--Xdns-enabled` option to enable domain name support.

If using Kubernetes, enable domain name support and use the `--Xdns-update-enabled` option to ensure that Besu can connect to a container after being restarted, even if the IP address of the container changes.

:::

:::tip

If you add a running node, the node does not attempt to reconnect to the bootnode and synchronize until peer discovery restarts. To add an allowlisted node as a peer without waiting for peer discovery to restart, use [`admin_addPeer`](../../../public-networks/reference/api/index.md#admin_addpeer).

If you add the node to the allowlist before starting the node, using `admin_addPeer` is not required because peer discovery is run on node startup.

:::

:::tip

If nodes are not connecting as expected, set the [log level to `TRACE`](../../../public-networks/reference/cli/options.md#logging) and search for messages containing `Node permissioning` to identify the issue.

Ensure the [`--p2p-host`](../../../public-networks/reference/cli/options.md#p2p-host) command line option has been correctly configured for all nodes with the externally accessible address.

If you change your network configuration, you may need to update the node allowlist.

:::

## Specify the permissioning contract interface version

Use the [`--permissions-nodes-contract-version`](../../reference/cli/options.md#permissions-nodes-contract-version) command line option to specify the version of the [permissioning contract interface](../../concepts/permissioning/onchain.md#permissioning-contracts). The default is 1.

Specify the contract interface version that maps to the version of the [Enterprise Ethereum Alliance Client Specification](https://entethalliance.org/technical-specifications/) the contract interface implements.

|         | EEA Client Specification | Contract interface |
| :------ | :----------------------- | :----------------- |
| Version | 5                        | 1                  |
| Version | 6                        | 2                  |

The permissioning contracts in the [`ConsenSys/permissioning-smart-contracts`](https://github.com/ConsenSys/permissioning-smart-contracts) repository implement the version 2 contract interface.

[support domain names]: ../../../public-networks/concepts/node-keys.md#domain-name-support
[projects release page]: https://github.com/ConsenSys/permissioning-smart-contracts/releases/latest
