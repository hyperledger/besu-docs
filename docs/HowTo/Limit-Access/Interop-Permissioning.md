---
description: Interoperablbe permissioning
---

# Use permissioning with Besu and GoQuorum

You can use interoperable [permissioning](../../Concepts/Permissioning/Permissioning-Overview.md) in a network of
Hyperledger Besu and [GoQuorum](https://consensys.net/docs/goquorum/en/stable/) nodes.

## Add Besu nodes to a permissioned GoQuorum network

Start by creating a
[permissioned GoQuorum network](https://consensys.net/docs/goquorum/en/stable/tutorials/create-permissioned-network/).

## Add GoQuorum nodes to a permissioned Besu network

Start by creating a [permissioned Besu network](../../Tutorials/Permissioning/Create-Permissioned-Network.md).

## Limitations

- GoQuorum can't use Besu permissioning contracts.

- The GoQuorum APIs aren't implemented in Besu.
  You can create transactions and submit them from the Besu node, but it's simpler to submit them from the GoQuorum node.

- Peer-to-peer discovery doesn't currently work in an interoperable network.