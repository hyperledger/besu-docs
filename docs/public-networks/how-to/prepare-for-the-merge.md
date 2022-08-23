---
description: How to prepare for The Merge
---

# Prepare for The Merge

If you're running one or more [beacon nodes](../concepts/the-merge.md#consensus-clients) with Besu on Ethereum Mainnet,
prepare for [The Merge](../concepts/the-merge.md) by
[configuring Besu as an execution client](#configure-besu-as-an-execution-client) and
[staying up to date on Besu releases](#update-besu).

If you're using Besu with [Teku] as the consensus client,
[prepare Teku for the Merge](https://docs.teku.consensys.net/en/latest/HowTo/Prepare-for-The-Merge/).

You can also
[run Besu with Teku on the Merge testnet](../tutorials/merge-testnet.md).

## Configure Besu as an execution client

Before The Merge, [validators](../concepts/the-merge.md#consensus-clients) require an
[execution client](../concepts/the-merge.md#execution-clients) to get deposits for block proposals.
Block proposals are intermittent, and a validator can get the data from other blocks if its execution client is offline.

After The Merge, execution clients will play a more crucial role in producing blocks and executing transactions.
Service providers that provide execution layer access but don't produce blocks, such as Infura, won't be adequate for a
[beacon node](../concepts/the-merge.md#consensus-clients) to continue to function on the network.

You must configure an execution client for each beacon node you maintain.
Configure Besu as an execution client using the following steps.
You can use Besu with any consensus client.

### 1. Configure the Engine API

The beacon node and Besu communicate using the [Engine API](use-engine-api.md).
Configure the Engine API by setting [`engine-rpc-port`](../reference/cli/options.md#engine-rpc-port) in the Besu
configuration file.

Specify the Besu Engine API endpoint in the consensus client using the consensus client's configuration options.
For example, if you use [Teku] as the consensus client, you can specify the endpoint using
[`ee-endpoint`](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#ee-endpoint) in the Teku
configuration file.

### 2. Configure the JSON Web Token

JSON Web Token (JWT) authentication is used to secure the Engine API.
You can generate a JWT using a command line tool, for example:

```bash
openssl rand -hex 32 -out <file>
```

Provide the JWT to Besu using the [`engine-jwt-secret`](../reference/cli/options.md#engine-jwt-secret)
configuration option, and to the consensus client using its configuration options.
For example, provide the JWT to [Teku] using the
[`ee-jwt-secret-file`](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#ee-jwt-secret-file) option.

If you don't provide a token to Besu, Besu will automatically generate a new token called `jwt.hex` and store it in the
configured data directory.

### 3. Sync Besu

Validators can't produce attestations or blocks without a fully synced execution endpoint.
To expedite network participation, [sync Besu](connect/sync-node.md) on Ethereum Mainnet before the Merge
configuration (Bellatrix) comes online.

## Update Besu

Once Bellatrix is scheduled for activation on Mainnet, Besu will be released with updated configuration for Mainnet.
Ensure your Besu node and consensus client are up to date before Bellatrix is enabled.

You can follow Besu notifications by:

- Joining the [Besu mailing list](https://lists.hyperledger.org/g/besu).
- Following Besu on [Twitter](https://twitter.com/HyperledgerBesu).
- Following the Besu channel in the Hyperledger [Discord](https://discord.gg/hyperledger).
- Subscribing to release notifications on GitHub for [Besu](https://github.com/hyperledger/besu/).

<!-- links -->
[Teku]: https://docs.teku.consensys.net/en/stable/
