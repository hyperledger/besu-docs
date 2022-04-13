---
Description: How to run Besu and Teku on the Merge testnet
---

# Run Besu and Teku on the Merge testnet

You can test Besu as an [execution client](../Concepts/Merge.md#execution-clients) and
[Teku](https://docs.teku.consensys.net/en/stable/)
as a [consensus client](../Concepts/Merge.md#consensus-clients) on the
[Kiln Merge testnet](https://blog.ethereum.org/2022/03/14/kiln-merge-testnet/).

## 1. Install Besu and Teku

Install [Besu](../HowTo/Get-Started/Installation-Options/Install-Binaries.md) and
[Teku](https://docs.teku.consensys.net/en/stable/HowTo/Get-Started/Installation-Options/Install-Binaries/).

Ensure you meet the prerequisites for the installation option you use.
For example, you must have Java version 11–16 if using the Besu and Teku binary distributions.

Ensure you meet the [system requirements for Besu on Mainnet](../HowTo/Get-Started/System-Requirements).

## 2. Generate the shared secret

Run the following command:

```bash
openssl rand -hex 32 | tr -d "\n" > jwtsecret.hex
```

You will specify `jwtsecret.hex` when starting both Besu and Teku.
This is a shared JWT secret the clients use to authenticate each other when using the
[Engine API](../HowTo/Interact/APIs/Engine-API.md).
  
## 3. Generate validator keys and stake ETH

If you're running a [validator client](#beacon-node-and-validator-client), create a test Ethereum address (you can do
this in
[MetaMask](https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-create-an-additional-account-in-your-wallet)).
Fund this address with testnet ETH using the [Kiln Faucet](https://faucet.kiln.themerge.dev/).

!!! note

    If you're unable to get ETH using the faucet, you can ask for help on the
    [EthStaker Discord](https://discord.io/ethstaker).

Generate validator keys and stake your testnet ETH for one or more validators using the
[Kiln Staking Launchpad](https://kiln.launchpad.ethereum.org/en/).

!!! important

    Save the password you use to generate each key pair in a `.txt` file.
    You should also have a `.json` file for each validator key pair.

## 4. Start Besu

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
  --engine-jwt-secret=<path to jwtsecret.hex>
```

Specify the path to the `jwtsecret.hex` file generated in [step 2](#2-generate-the-shared-secret) using
[`--engine-jwt-secret`](../Reference/CLI/CLI-Syntax.md#engine-jwt-secret).

See the [`--engine-*`](../Reference/CLI/CLI-Syntax.md#engine-host-allowlist) CLI options for more information on running
Besu as an execution client.

## 5. Start Teku

Open a new terminal window.

### Beacon node only

To run Teku as a beacon node (without validator duties), run the following command:

```bash
teku \
  --data-path "datadir-teku"                   \
  --network kiln                               \
  --ee-endpoint http://localhost:8550          \
  --Xee-version kilnv2                         \
  --ee-jwt-secret-file <path to jwtsecret.hex> \
  --log-destination console                    \
  --rest-api-enabled=true                      \
  --p2p-discovery-bootnodes "enr:-Iq4QMCTfIMXnow27baRUb35Q8iiFHSIDBJh6hQM5Axohhf4b6Kr_cOCu0htQ5WvVqKvFgY28893DHAg8gnBAXsAVqmGAX53x8JggmlkgnY0gmlwhLKAlv6Jc2VjcDI1NmsxoQK6S-Cii_KmfFdUJL2TANL3ksaKUnNXvTCv1tLwXs0QgIN1ZHCCIyk"
```

Specify the path to the `jwtsecret.hex` file generated in [step 2](#2-generate-the-shared-secret) using
[`--ee-jwt-secret-file`](https://docs.teku.consensys.net/en/stable/Reference/CLI/CLI-Syntax/#ee-jwt-secret-file).

### Beacon node and validator client

To run Teku as a beacon node and validator in a single process, run the following command:

```bash
teku \
  --data-path "datadir-teku"                                \
  --network kiln                                            \
  --ee-endpoint http://localhost:8550                       \
  --Xee-version kilnv2                                      \
  --ee-jwt-secret-file <path to jwtsecret.hex>              \
  --log-destination console                                 \
  --rest-api-enabled=true                                   \
  --validators-proposer-default-fee-recipient=<ETH address> \
  --validator-keys=<path to key file>:<path to mnemonic file>[,<path to key file>:<path to mnemonic file>,...] \
  --p2p-discovery-bootnodes "enr:-Iq4QMCTfIMXnow27baRUb35Q8iiFHSIDBJh6hQM5Axohhf4b6Kr_cOCu0htQ5WvVqKvFgY28893DHAg8gnBAXsAVqmGAX53x8JggmlkgnY0gmlwhLKAlv6Jc2VjcDI1NmsxoQK6S-Cii_KmfFdUJL2TANL3ksaKUnNXvTCv1tLwXs0QgIN1ZHCCIyk"
```

Specify:

- The path to the `jwtsecret.hex` file generated in [step 2](#2-generate-the-shared-secret) using
  [`--ee-jwt-secret-file`](https://docs.teku.consensys.net/en/stable/Reference/CLI/CLI-Syntax/#ee-jwt-secret-file).
- The test Ethereum address created in [step 3](#3-generate-validator-keys-and-stake-eth) as the default fee recipient
  using
  [`--validators-proposer-default-fee-recipient`](https://docs.teku.consensys.net/en/stable/Reference/CLI/CLI-Syntax/#validators-proposer-default-fee-recipient).
- The paths to the keystore `.json` file and password `.txt` file created in
  [step 3](#3-generate-validator-keys-and-stake-eth) for each validator using
  [`--validator-keys`](https://docs.teku.consensys.net/en/stable/Reference/CLI/CLI-Syntax/#validator-keys).
  Separate the `.json` and `.txt` files with a colon, and separate entries for multiple validators with commas.

See the Teku [`--validators-*`](https://docs.teku.consensys.net/en/latest/Reference/CLI/CLI-Syntax/#validator-keys) CLI
options for more information on running Teku as a validator.

## 6. Check validator status

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

You can check your validator status by searching your Ethereum address on the
[Kiln Beacon Chain explorer](https://beaconchain.kiln.themerge.dev/).
It may take up to multiple days for your validator to reach `active` status.
