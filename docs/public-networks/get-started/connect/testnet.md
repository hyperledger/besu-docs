---
Description: How to connect to a testnet
---

# Connect to a testnet

Run Besu as an [execution client](../../concepts/the-merge.md#execution-clients) with any consensus
client on the [Goerli](https://github.com/eth-clients/goerli) and
[Sepolia](https://github.com/eth-clients/sepolia) testnets.

If you're using [Teku](https://docs.teku.consensys.net/en/latest/) as a consensus client, you can
follow the [Besu and Teku testnet tutorial](../../tutorials/besu-teku-testnet.md).

!!! note

    Sepolia is a permissioned network and you can't run a validator client on it without
    [requesting to become a validator](https://notes.ethereum.org/zvkfSmYnT0-uxwwEegbCqg) first.
    You can connect your consensus client using the beacon node only, without any validator duties.

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

You will specify `jwtsecret.hex` when starting both Besu and the consensus client.
This is a shared JWT secret the clients use to authenticate each other when using the
[Engine API](../../how-to/use-engine-api.md).

### 2. Start Besu

Run the following command or specify the options in a
[configuration file](../../how-to/configuration-file.md):

=== "Goerli"

    ```bash
    besu \
      --network=goerli            \
      --rpc-http-enabled=true     \
      --rpc-http-host=0.0.0.0     \
      --rpc-http-cors-origins="*" \
      --rpc-ws-enabled=true       \
      --rpc-ws-host=0.0.0.0       \
      --host-allowlist="*"        \
      --engine-host-allowlist="*" \
      --Xmerge-support=true       \
      --engine-jwt-secret=<path to jwtsecret.hex>
    ```

=== "Sepolia"

    ```bash
    besu \
      --network=sepolia           \
      --rpc-http-enabled=true     \
      --rpc-http-host=0.0.0.0     \
      --rpc-http-cors-origins="*" \
      --rpc-ws-enabled=true       \
      --rpc-ws-host=0.0.0.0       \
      --host-allowlist="*"        \
      --engine-host-allowlist="*" \
      --Xmerge-support=true       \
      --engine-jwt-secret=<path to jwtsecret.hex>
    ```

Specify the path to the `jwtsecret.hex` file generated in [step 1](#1-generate-the-shared-secret)
using the [`--engine-jwt-secret`](../../reference/cli/options.md#engine-jwt-secret) option.

You can modify the option values and add other [command line options](../../reference/cli/options.md)
as needed.

### 3. Generate validator keys and stake ETH

If you're running a beacon node only, skip to the next step.

If you're running a validator client, create a test Ethereum address (you can do this in
[MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-create-an-additional-account-in-your-wallet)).
Fund this address with testnet ETH (32 ETH and gas fees for each validator) using a faucet.
See the list of [Goerli faucets](https://github.com/eth-clients/goerli#meta-data-g%C3%B6rli) and
[Sepolia faucets](https://github.com/eth-clients/sepolia#meta-data-sepolia).

!!! note

    If you're unable to get ETH using the faucet, you can ask for help on the
    [EthStaker Discord](https://discord.io/ethstaker).

Generate validator keys and stake your testnet ETH for one or more validators using the
[Goerli Staking Launchpad](https://goerli.launchpad.ethereum.org/).

!!! important

    Save the password you use to generate each key pair in a `.txt` file.
    You should also have a `.json` file for each validator key pair.

    Ensure your Besu node is fully synced before submitting your staking deposit.
    This can take several days.

### 4. Start the consensus client

Refer to your consensus client documentation to configure and start the consensus client.

!!! important

    If you're running a validator client, make sure you set a fee recipient address.

If you're using Teku, follow the [Besu and Teku testnet tutorial](../../tutorials/besu-teku-testnet.md#5-start-teku).

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

!!! caution

    If you restart your node before snap or checkpoint sync completes, syncing restarts from scratch.

You can check your validator status by searching your Ethereum address on the
[Goerli Beacon Chain explorer](https://goerli.beaconcha.in/).
It may take up to multiple days for your validator to be activated and start proposing blocks.
