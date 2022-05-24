---
description: How to prepare for The Merge
---

# Prepare for The Merge

If you're running one or more [beacon nodes](../../Concepts/Merge.md#consensus-clients) with Besu on Ethereum Mainnet,
prepare for [The Merge](../../Concepts/Merge.md) by
[configuring Besu as an execution client](#configure-besu-as-an-execution-client) and
[staying up to date on Besu releases](#update-besu).

If you're using Besu with [Teku] as the consensus client,
[prepare Teku for the Merge](https://docs.teku.consensys.net/en/latest/HowTo/Prepare-for-The-Merge/).

You can also
[test Besu with Teku on the Kiln Merge testnet](../../Tutorials/Merge-Testnet.md).

## Configure Besu as an execution client

Before The Merge, [validators](../../Concepts/Merge.md#consensus-clients) require an
[execution client](../../Concepts/Merge.md#execution-clients) to get deposits for block proposals.
Block proposals are intermittent, and a validator can get the data from other blocks if its execution client is offline.

After The Merge, execution clients will play a more crucial role in executing transactions.
Service providers that provide execution layer access, such as Infura, won't be adequate for a
[beacon node](../../Concepts/Merge.md#consensus-clients) to continue to function on the network.

You must configure an execution client for each beacon node you maintain.
Configure Besu using the following steps.
You can use Besu with any consensus client.

### 1. Configure the Engine API

The beacon node and execution client communicate using the [Engine API](../Interact/APIs/Engine-API.md).
Configure the Engine API by setting [`engine-rpc-enabled`], [`engine-rpc-port`], and
[`engine-jwt-enabled`](../../Reference/CLI/CLI-Syntax.md#engine-jwt-enabled) in the Besu configuration file.

Specify the Besu Engine API endpoint in the consensus client using the consensus client's configuration options.
For example, if you use [Teku] as the consensus client, you can specify the endpoint using
[`ee-endpoint`](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#ee-endpoint) in the Teku
configuration file.

### 2. Configure the Java Web Token

Java Web Token (JWT) authentication is used to secure the Engine API.
You can generate a JWT using a command line tool, for example:

```bash
openssl rand -hex 32 -out <file>
```

Provide the JWT to Besu using the [`engine-jwt-secret`](../../Reference/CLI/CLI-Syntax.md#engine-jwt-secret)
configuration option, and to the consensus client using its configuration options.
For example, provide the JWT to [Teku] using the
[`ee-jwt-secret-file`](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#ee-jwt-secret-file) option.

### 3. Sync the execution client

Validators can't produce attestations or blocks without a fully synced execution endpoint.
To expedite network participation, [sync Besu](../../Concepts/Node-Types.md) on Ethereum Mainnet before the Merge
configuration (Bellatrix) comes online.

## Update Besu

Once Bellatrix is scheduled for activation on Mainnet, Besu will be released with updated configuration for Mainnet.
Ensure your Beku node and consensus client are up to date before Bellatrix is enabled.

You can follow Besu notifications by:

- Joining the [Besu mailing list](https://lists.hyperledger.org/g/besu).
- Following Besu on [Twitter](https://twitter.com/HyperledgerBesu).
- Following the Besu channel in the Hyperledger [Discord](https://discord.gg/hyperledger).
- Subscribing to release notifications on GitHub for [Teku](https://github.com/hyperledger/besu/).

<!-- links -->
[Teku]: https://docs.teku.consensys.net/en/stable/
