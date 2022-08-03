---
description: Migrate to Besu guide
---

# Migrate to Besu

Migrate from a different Ethereum [execution client](../../Concepts/Merge.md#execution-and-consensus-clients)
to Besu to contribute to [client diversity](https://clientdiversity.org/).

When migrating from a different client, you are [configuring Besu as an execution client](../Upgrade/Prepare-for-The-Merge.md#configure-besu-as-an-execution-client)
and connecting your [consensus client](../../Concepts/Merge.md#consensus-clients) to Besu instead of your original execution client.

To minimize downtime while [Besu syncs](../../Concepts/Node-Types.md) and avoid downtime penalties,
you can sync Besu with a new consensus layer instance.
Once Besu has fully synced you can connect it to your existing consensus client.

Find guides to switch from specific clients on the [client diversity website](https://clientdiversity.org/#switch).
