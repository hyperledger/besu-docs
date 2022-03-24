---
Description: How to run Besu and Teku on the Merge testnet
---

# Run clients on the Merge testnet

You can test Besu as an [execution client](../Concepts/Merge.md) and [Teku](https://docs.teku.consensys.net/en/stable/)
as a [consensus client](../Concepts/Merge.md) on the [Kiln Merge testnet](https://blog.ethereum.org/2022/03/14/kiln-merge-testnet/).

## Prerequisites

- Install [Besu](../HowTo/Get-Started/Installation-Options/Options.md) and
   [Teku](https://docs.teku.consensys.net/en/stable/HowTo/Get-Started/Installation-Options/Install-Binaries/).

- Generate the JWT secret:

    ```bash
    openssl rand -hex 32 | tr -d "\n" > jwtsecret.hex
    ```

    You must pass this file to both Besu and Teku.
    This is a shared secret the clients use to authenticate each other when using the Engine API.

- Create a test Ethereum address to use as the
  [default fee recipient](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#validators-proposer-default-fee-recipient)
  when starting Teku.

## Start Besu

Run the following command:

```bash
besu \
  --network=kiln              \
  --rpc-http-enabled=true     \
  --rpc-http-host="0.0.0.0"   \
  --rpc-http-cors-origins="*" \
  --rpc-ws-enabled=true       \
  --rpc-ws-host="0.0.0.0"     \
  --host-allowlist="*"        \
  --engine-host-allowlist="*" \
  --engine-jwt-enabled=true   \
  --engine-rpc-http-port=8550 \
  --engine-rpc-ws-port=8551   \
  --Xmerge-support=true       \
  --engine-jwt-secret=<path_to_jwtsecret>
```

See the [`--engine-*`](../Reference/CLI/CLI-Syntax.md#engine-host-allowlist) CLI options for more information on running
Besu as an execution client.

## Start Teku

Run the following command:

```bash
teku \
  --data-path "datadir-teku"               \
  --network kiln                           \
  --p2p-discovery-bootnodes "enr:-Iq4QMCTfIMXnow27baRUb35Q8iiFHSIDBJh6hQM5Axohhf4b6Kr_cOCu0htQ5WvVqKvFgY28893DHAg8gnBAXsAVqmGAX53x8JggmlkgnY0gmlwhLKAlv6Jc2VjcDI1NmsxoQK6S-Cii_KmfFdUJL2TANL3ksaKUnNXvTCv1tLwXs0QgIN1ZHCCIyk" \
  --ee-endpoint http://localhost:8550      \
  --Xee-version kilnv2                     \
  --ee-jwt-secret-file <path_to_jwtsecret> \
  --log-destination console                \
  --validators-proposer-default-fee-recipient=<eth_address_of_default_fee_recipient>
```

This runs Teku as a beacon node (without validator duties).
See the Teku [`--validators-*`](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#validator-keys) CLI
options for information on running Teku as a validator.

After starting Besu and Teku, your node should start syncing and connecting to peers.

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
