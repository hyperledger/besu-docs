---
title: Network ID and chain ID
sidebar_position: 5
description: Learn about network ID and chain ID in Besu.
tags:
  - public networks
  - private networks
---

# Network ID and chain ID

Ethereum networks have two identifiers, a network ID and a chain ID. Although they often have the same value, they have different uses.

Peer-to-peer communication between nodes uses the _network ID_, while the transaction signature process uses the _chain ID_.

:::note

[EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md) introduced using the chain ID as part of the transaction signing process to protect against transaction replay attacks.

:::

For most networks, including Mainnet and the public testnets, the network ID and the chain ID are the same, with the network ID defaulting to the chain ID, as specified in the genesis file.

```json title="Chain ID in the genesis file"
{
  "config": {
    "ethash": {
    },
    "chainID": 1981
  },
  ...
}
```

Besu sets the chain ID (and by default the network ID) automatically, using either the [`--genesis-file`](../reference/cli/options.md#genesis-file) option or when specifying a network using the [`--network`](../reference/cli/options.md#network) option. The following table lists the available networks and their chain and network IDs.

| Network   | Chain | Chain ID | Network ID | Type        |
| --------- | ----- | -------- | ---------- | ----------- |
| `mainnet` | ETH   | 1        | 1          | Production  |
| `goerli`  | ETH   | 5        | 5          | Test        |
| `sepolia` | ETH   | 11155111 | 11155111   | Test        |
| `dev`     | ETH   | 2018     | 2018       | Development |
| `classic` | ETC   | 61       | 1          | Production  |
| `mordor`  | ETC   | 63       | 7          | Test        |

:::info

The Ropsten, Rinkeby, and Kiln testnets are deprecated.

:::

## Specify a different network ID

Usually the network ID is the same as the chain ID, but if you want to separate specific nodes from the rest of the network so they can't connect or synchronize with other nodes, you can override the default network ID for those nodes using the [`--network-id`](../reference/cli/options.md#network-id) option.

## Start a new chain with a new chain ID

If you update the chain ID (or network ID) of existing nodes, they can no longer peer with other nodes in the network. Nodes need to have a matching [genesis file](genesis-file.md), including the chain ID, in order to peer. In this case, you're effectively running two chains that can't communicate with each other.

To change a chain ID and start a new chain:

1. Stop all your nodes using <kbd>ctrl+c</kbd> in each terminal window.
2. Update the [genesis file](genesis-file.md) with the new chain ID.
3. Make sure all nodes have the same genesis file.
4. Delete the old data directory or point to a new location for each node.
5. [Restart the nodes](../../private-networks/tutorials/ibft/index.md#6-start-the-first-node-as-the-bootnode).

:::danger Warning

Starting a new chain is starting from block zero.

This means when you start a new chain with a new chain ID, you lose all previous data.

:::
