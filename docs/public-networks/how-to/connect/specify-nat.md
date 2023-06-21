---
title: Specify NAT method
sidebar_position: 4
description: Configuring NAT with Hyperledger Besu
tags:
  - public networks
  - private networks
---

# Specify the NAT method

Use the [`--nat-method`](../../reference/cli/options.md#nat-method) option to specify the NAT method. Options are: [`UPNP`](#upnp), [`KUBERNETES`](#kubernetes), [`DOCKER`](#docker), [`AUTO`](#auto), and [`NONE`](#none).

The [enode](../../concepts/node-keys.md#enode-url) advertised to other nodes during discovery is the external IP address and port. The [`admin_nodeInfo`](../../reference/api/index.md#admin_nodeinfo) JSON-RPC API method returns the external address and port for the `enode` and `listenAddr` properties.

While Hyperledger Besu is running, the following are not supported:

- IP address changes
- Changing NAT methods. To change the NAT method, restart the node with the [`--nat-method`](../../reference/cli/options.md#nat-method) option set.

## Auto

`AUTO` detects if Besu is running inside a Kubernetes cluster or a Docker container.

- If Besu is running in a Kubernetes cluster, `AUTO` sets to [`KUBERNETES`](#kubernetes).
- If Besu is running in a Docker container, `AUTO` sets to [`DOCKER`](#docker).
- If Besu is not running in Kubernetes or Docker container, `AUTO` sets to [`NONE`](#none).

`AUTO` is the default NAT method.

The following log shows an automatic detection failure.

```log title="The following log shows an automatic detection failure"
INFO  | KubernetesNatManager | Starting kubernetes NAT manager.
DEBUG | KubernetesNatManager | Trying to update information using Kubernetes client SDK.
DEBUG | NatService | Nat manager failed to configure itself automatically due to the following reason Service not found. NONE mode will be used
INFO  | NetworkRunner | Starting Network.
```

:::tip

If automatic detection fails, set the IP and ports in [`NONE`](#none) mode.

:::

## UPnP

Specify `UPNP` to quickly allow inbound peer connections without manual router configuration. Use UPnP in home or small office environments where a wireless router or modem provides NAT isolation.

UPnP automatically detects if a node is running in a UPnP environment and provides port forwarding. UPnP might introduce delays during node startup, especially on networks without a UPnP gateway device.

Use `UPNPP2PONLY` if you wish to enable UPnP only for p2p traffic.

:::tip

UPnP support is often disabled by default in networking firmware. If disabled by default, you must explicitly enable UPnP support.

:::

:::info

When the NAT method is set to `UPNP`, the advertised port is the same as the [listening port](../../reference/cli/options.md#p2p-port).

:::

## Kubernetes

Specify `KUBERNETES` to explicitly specify Hyperledger Besu is running inside a Kubernetes cluster. Besu automatically detects if it's running inside of a Kubernetes cluster and interacts with Kubernetes APIs as required to determine external IP addresses and exposed ports.

In Kubernetes, the Ingress IP of the load balancer will be used as the external IP for Besu. A load balancer service can map any incoming port to a target port. These mapping rules will be the one retrieved by Besu.

A tutorial to [Configure the Nat Manager for Kubernetes](../../../private-networks/tutorials/kubernetes/nat-manager.md) is available.

## Docker

Specify `DOCKER` to explicitly specify Hyperledger Besu is running inside a Docker container. If you specify `DOCKER`, you advertise the host IP address not the container IP address.

The host IP address is the advertised host specified in the [`docker run` command](https://docs.docker.com/engine/reference/commandline/run/#add-entries-to-container-hosts-file---add-host). If not specified in the `docker run` command, the advertised host defaults to the values for [`--p2p-host`](../../reference/cli/options.md#p2p-host) and [`--p2p-port`](../../reference/cli/options.md#p2p-port).

## None

Specify `NONE` to explicitly configure the external IP address and ports advertised using:

- [`--p2p-host`](../../reference/cli/options.md#p2p-host) and [`--p2p-port`](../../reference/cli/options.md#p2p-port) for the P2P service.
- [`--rpc-http-host`](../../reference/cli/options.md#rpc-http-host) and [`--rpc-http-port`](../../reference/cli/options.md#rpc-http-port) for the JSON-RPC HTTP service.

The P2P and JSON-RPC HTTP hosts and ports are advertised in the [`net_services`](../../reference/api/index.md#net_services) method.

:::tip

When the NAT method is set to `NONE`, the advertised port is the same as the [listening port](../../reference/cli/options.md#p2p-port).

:::
