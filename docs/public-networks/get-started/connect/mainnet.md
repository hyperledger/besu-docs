---
description: How to connect to Mainnet
---

# Connect to Mainnet

!!! important

    [The Merge](../../concepts/the-merge.md) was executed on **September 15, 2022**.
    Ethereum is now a [proof of stake](../../concepts/proof-of-stake.md) network, and a full Ethereum
    node requires both [an execution client and a consensus client](../../concepts/the-merge.md#execution-and-consensus-clients).

Run Besu as an [execution client](../../concepts/the-merge.md#execution-clients) with any consensus
client on Ethereum Mainnet.

If you're using [Teku] as a consensus client, you can follow the
[Besu and Teku Mainnet tutorial](../../tutorials/besu-teku-mainnet.md).

## Prerequisites

- [Besu installed](../install/binary-distribution.md).
- A consensus client installed.
  For example, [Teku](https://docs.teku.consensys.net/en/latest/).

## Steps

### 1. Generate the shared secret

Run the following command:

```bash
openssl rand -hex 32 | tr -d "\n" > jwtsecret.hex
```

You will specify `jwtsecret.hex` when starting Besu and the consensus client.
This is a shared JWT secret the clients use to authenticate each other when using the
[Engine API](../../how-to/use-engine-api.md).

### 2. Start Besu

Run the following command or specify the options in a
[configuration file](../../how-to/configuration-file.md):

```bash
besu \
  --sync-mode=X_SNAP           \
  --data-storage-format=BONSAI \
  --rpc-http-enabled=true      \
  --rpc-http-host=0.0.0.0      \
  --rpc-ws-enabled=true        \
  --rpc-ws-host=0.0.0.0        \
  --host-allowlist=<IP of Besu node>,127.0.0.1,localhost        \
  --engine-host-allowlist=<IP of Besu node>,127.0.0.1,localhost \
  --engine-jwt-secret=<path to jwtsecret.hex>
```

Specify:

- The path to the `jwtsecret.hex` file generated in [step 1](#1-generate-the-shared-secret)
  using the [`--engine-jwt-secret`](../../reference/cli/options.md#engine-jwt-secret) option.
- The IP address of your Besu node using the [`--host-allowlist`](../../reference/cli/options.md#host-allowlist)
  and [`--engine-host-allowlist`](../../reference/cli/options.md#engine-host-allowlist) options.

Also, in the command:

- [`--sync-mode`](../../reference/cli/options.md#sync-mode) specifies using [snap sync](sync-node.md#snap-synchronization).
- [`--data-storage-format`](../../reference/cli/options.md#data-storage-format) specifies using
  [Bonsai Tries](../../concepts/data-storage-formats.md#bonsai-tries).
- [`--rpc-http-enabled`](../../reference/cli/options.md#rpc-http-enabled) enables the HTTP JSON-RPC
  service.
- [`--rpc-http-host`](../../reference/cli/options.md#rpc-http-host) is set to `0.0.0.0` to allow
  remote RPC connections.
- [`--rpc-ws-enabled`](../../reference/cli/options.md#rpc-ws-enabled) enables the WebSocket JSON-RPC
  service.
- [`--rpc-ws-host`](../../reference/cli/options.md#rpc-ws-host) is set to `0.0.0.0` to allow remote
  RPC connections.

You can modify the option values and add other [command line options](../../reference/cli/options.md)
as needed.

Ensure Besu is fully synced before submitting your staking deposit in the next step.
This can take several days.

### 3. Generate validator keys and stake ETH

If you're running a beacon node only, skip to the next step.

If you're also running a validator client, have a funded Ethereum address ready (32 ETH and gas fees
for each validator).

Generate validator keys and stake your ETH for one or more validators using the
[Staking Launchpad](https://launchpad.ethereum.org/en/).

!!! important

    Save the password you use to generate each key pair in a `.txt` file.
    You should also have a `.json` file for each validator key pair.

    Ensure your Besu node is fully synced before submitting your staking deposit.
    This can take several days.

### 4. Start the consensus client

Refer to your consensus client documentation to configure and start the consensus client.

!!! important

    If you're running a validator client, make sure you set a fee recipient address.

If you're using Teku, follow the [Besu and Teku Mainnet tutorial](../../tutorials/besu-teku-mainnet.md#5-start-teku).

### 5. After starting the clients

After starting Besu and the consensus client, your node starts syncing and connecting to peers.

!!! example

    === "Besu logs"

        ```bash
        2022-03-21 20:42:09.295-07:00 | EthScheduler-Timer-0 | INFO  | FullSyncTargetManager | No sync target, waiting for peers. Current peers: 0
        2022-03-21 20:42:14.298-07:00 | EthScheduler-Timer-0 | INFO  | FullSyncTargetManager | No sync target, waiting for peers. Current peers: 0
        2022-03-21 20:42:14.848-07:00 | nioEventLoopGroup-3-8 | INFO  | FullSyncTargetManager | No sync target, waiting for peers. Current peers: 4
        2022-03-21 20:42:18.452-07:00 | nioEventLoopGroup-3-8 | INFO  | SyncTargetManager | Found common ancestor with peer Peer 0xab3a286b181721c794... at block 55127
        2022-03-21 20:42:18.454-07:00 | nioEventLoopGroup-3-8 | INFO  | PipelineChainDownloader | PipelineChain download complete
        ```

    === "Teku logs"

        ```bash
        2022-03-21 20:43:24.355 INFO  - Syncing     *** Target slot: 76092, Head slot: 2680, Remaining slots: 73412, Connected peers: 8
        2022-03-21 20:43:36.363 INFO  - Syncing     *** Target slot: 76093, Head slot: 2879, Remaining slots: 73214, Connected peers: 10
        2022-03-21 20:43:48.327 INFO  - Syncing     *** Target slot: 76094, Head slot: 3080, Remaining slots: 73014, Connected peers: 8
        2022-03-21 20:44:00.339 INFO  - Syncing     *** Target slot: 76095, Head slot: 3317, Remaining slots: 72778, Connected peers: 6
        2022-03-21 20:44:12.353 INFO  - Syncing     *** Target slot: 76096, Head slot: 3519, Remaining slots: 72577, Connected peers: 9
        ```

You can check your validator status by searching your Ethereum address on the [Beacon Chain explorer](https://beaconcha.in/).
It may take up to multiple days for your validator to be activated and start proposing blocks.

!!! caution

    If you restart your node before snap or checkpoint sync completes, syncing restarts from scratch.

<!-- links -->
[Teku]: https://docs.teku.consensys.net/en/stable/
