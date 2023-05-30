---
description: Migrate to Besu guide
---

# Migrate to Besu

Migrate from a different Ethereum [execution client](../concepts/the-merge.md#execution-clients) to Besu to contribute to [client diversity](https://clientdiversity.org/).

To migrate from a different client, [configure Besu as an execution client](connect/mainnet.md#2-start-besu) and connect your [consensus client](../concepts/the-merge.md#consensus-clients) to Besu instead of your original execution client.

To minimize downtime while [Besu syncs](connect/sync-node.md) and avoid downtime penalties, you can sync Besu with a new consensus layer instance. Once Besu has fully synced you can connect it to your existing consensus client.

Find guides to switch from specific clients on the [client diversity website](https://clientdiversity.org/#switch).
