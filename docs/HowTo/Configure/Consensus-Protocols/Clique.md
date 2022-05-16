---
description: deprecated Clique proof ofAuthority (PoA) consensus protocol

---

# Clique

The Clique proof of authority consensus protocol is deprecated and no longer supported by Besu.

We recommend using a more updated consensus protocol such as [IBFT 2.0](IBFT.md) or [QBFT](QBFT.md).

## Migrate from Clique to another consensus protocol

To migrate a network using Clique to a consensus protocol suitable for production such as [QBFT](QBFT.md), do one of the
following:

* Stop the Clique network and start the new network with the state at the time of migration.
  Historical transactions and state history are lost.

* Replay the historical transactions on the new network.
  The historical transactions are at different block heights on the new network, but the transactions and state history
  are the same on the new network as on the Clique network.

You can request migration support on [Discord](https://discord.gg/hyperledger).
