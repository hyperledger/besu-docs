---
description: Frequently asked questions and answers for troubleshooting Hyperledger Besu
---

# Troubleshooting

If Hyperledger Besu is not working as expected, here are some things to check or try.

## Supplied genesis block does not match stored chain data

If a `Supplied genesis block does not match stored chain data` error occurs, use the genesis file
matching the genesis block of the data directory, or use the
[`--data-path`](../../reference/cli/options.md#data-path) option to specify a different data
directory.

## Invalid block header

If a `TimeStampMoreRecentThanParent | Invalid block header` error occurs, the [genesis file](../../concepts/genesis-file.md) of the new node is specifying a higher
[`blockperiodseconds`](../../private-networks/how-to/configure/consensus/ibft.md#block-time) than the imported chain.
The imported chain makes new blocks faster than the genesis file allows and Besu rejects them with this error.
This error most often occurs when importing chains from older versions of Besu.

To correct this error, decrease the `blockperiodseconds` in the new [IBFT 2.0 genesis file](../../private-networks/how-to/configure/consensus/ibft.md#genesis-file)
or [QFBT genesis file](../../private-networks/how-to/configure/consensus/qbft.md#genesis-file) to a lower value that satisfies the block header validation.

!!! example

    If the error reads `| TimestampMoreRecentThanParent | Invalid block header: timestamp 1619660141 is only 3 seconds newer than parent timestamp 1619660138. Minimum 4 seconds`,
    decrease the `blockperiodseconds` from 4 seconds to 3 seconds to match the imported chain.

After you have updated the new genesis file, if the imported chain has a `blockperiodseconds` value set lower than you prefer, you can adjust it by configuring the block time on an
[existing IBFT 2.0](../../private-networks/how-to/configure/consensus/ibft.md#configure-block-time-on-an-existing-network-deployment)
or [existing QBFT](../../private-networks/how-to/configure/consensus/qbft.md#configure-block-time-on-an-existing-network) network.

## Host not authorized

If a `Host not authorized` error occurs when attempting to access the JSON-RPC API, ensure
[`--host-allowlist`](../../reference/cli/options.md#host-allowlist) includes the host you are
sending the RPC from, or `*`.

## Peers fail to connect

If nodes are not communicating, ensure the
[required ports are open](../connect/configure-ports.md).

If your nodes are running in AWS, check you have appropriate `SecurityGroups` to allow access to
the required ports.

Check that the [enode URLs](../../concepts/node-keys.md#enode-url) specified for
[bootnodes](../../private-networks/how-to/connect/bootnodes.md) or
[static nodes](../connect/static-nodes.md) match the enode URLs displayed when starting the
remote nodes.

## Mining

Check block creation. On mining nodes, log messages indicate block creation.

```bash
2019-05-08 20:28:27.026+10:00 | pool-10-thread-1 | INFO  | IbftRound | Importing block to chain. round=ConsensusRoundIdentifier{Sequence=660, Round=0}, hash=0x759afaba4e923d89175d850ceca4b8ef81f7d9c727b0b0b8e714b624a4b8e8cc
2019-05-08 20:28:29.020+10:00 | pool-10-thread-1 | INFO  | IbftRound | Importing block to chain. round=ConsensusRoundIdentifier{Sequence=661, Round=0}, hash=0x5443e504256765f06b3cebfbee82276a034ebcc8d685b7c3d1a6010fd4acfa14
```

On non-mining nodes, log messages indicate importing blocks.

```bash
2019-05-08 20:28:29.026+10:00 | EthScheduler-Workers-1 | INFO  | BlockPropagationManager | Imported #661 / 0 tx / 0 om / 0 (0.0%) gas / (0x5443e504256765f06b3cebfbee82276a034ebcc8d685b7c3d1a6010fd4acfa14) in 0.000s.
2019-05-08 20:28:31.031+10:00 | EthScheduler-Workers-0 | INFO  | BlockPropagationManager | Imported #662 / 0 tx / 0 om / 0 (0.0%) gas / (0x0ead4e20123d3f1433d8dec894fcce386da4049819b24b309963ce7a8a0fcf03) in 0.000s.
```

To confirm the block number is increasing, use the
[`eth_blockNumber`](../../reference/api/index.md#eth_blocknumber) JSON-RPC API method.

If there is no block creating in [Clique](../../private-networks/how-to/configure/consensus/clique.md#extra-data)
or [IBFT 2.0](../../private-networks/how-to/configure/consensus/ibft.md#extra-data) networks, ensure the validator
addresses in the genesis file match running nodes.

## Transactions are not mined

If you add a transaction to the
[transaction pool](../../concepts/Transactions/Transaction-Pool.md) and the transaction hash
returns, but the transaction is never mined, check the
[`--min-gas-price`](../../reference/cli/options.md#min-gas-price) option on mining nodes. If the
`gasPrice` on a [transaction](../send-transactions.md) is lower than the
`min-gas-price` for the mining node, the transaction will never mine.

In [free gas networks](../../private-networks/how-to/configure/free-gas.md), you must set
[`--min-gas-price`](../../reference/cli/options.md#min-gas-price) to zero.

## Genesis milestone

Not including a milestone far enough in advance in the genesis file can lead to unexpected and
inconsistent behavior without specific errors. Ensure you include a milestone that is far enough in
advance in the genesis file (for example, `constantinoplefixblock`).

## Command line options

Characters such as smart quotes and long (em) hyphens do not work in Besu command line options.
Ensure quotes are not automatically converted to smart quotes, or double hyphens combined into em
hyphens.

## Logging

Restart Besu with the command line option
[`--logging=TRACE`](../../reference/cli/options.md#logging) and look at the log files.

## Pending State Nodes not decreasing for a full node in Grafana

During [fast synchronization](../../public-networks/how-to/connect/sync-node.md#run-a-full-node) for a full node, the
Pending State Nodes count is the number of nodes yet to be downloaded, and it should change
constantly. Pending State Nodes trend to 0 during fast synchronization and then goes to 0.

If the number stays constant, this could mean your node is not syncing against any peers.

In the following example the Pivot Block is 0 (zero) and the Pending State Nodes value is constant.
This means the node isn't syncing against any peers. The fact that state nodes have been downloaded
means at some stage it was syncing.

![Fast synchronization](../../images/fastsync.png)

The easiest solution in this scenario is to restart fast synchronization to obtain a new
pivot block.

## Homebrew repair

When upgrading Besu, you might get the following error:

```bash
Error: Some taps failed to update!
The following taps can not read their remote branches:
  hyperledger/besu
This is happening because the remote branch was renamed or deleted.
Reset taps to point to the correct remote branches by running `brew tap --repair`
```

This error is caused by the branch name being updated from `master` to `main` but a reference to `master` still remains.
To fix the branch reference and repair Homebrew, use the command `brew tap --repair`.

## Thread blocked due to lack of entropy in the system random number generator

If a thread is reported as blocked, and the top of the stack contains
`sun.security.provider.NativePRNG$RandomIO.readFully` as in the following example, then the operating
system is out of entropy.

```bash
2021-11-06 11:28:05.971+00:00 | vertx-blocked-thread-checker | WARN  | BlockedThreadChecker | Thread Thread[vert.x-worker-thread-2,5,main]=Thread[vert.x-worker-thread-2,5,main] has been blocked for 60387 ms, time limit is 60000 ms
io.vertx.core.VertxException: Thread blocked
        at java.base@11.0.11/java.io.FileInputStream.readBytes(Native Method)
        at java.base@11.0.11/java.io.FileInputStream.read(FileInputStream.java:279)
        at java.base@11.0.11/java.io.FilterInputStream.read(FilterInputStream.java:133)
        at java.base@11.0.11/sun.security.provider.NativePRNG$RandomIO.readFully(NativePRNG.java:424)
        at java.base@11.0.11/sun.security.provider.NativePRNG$RandomIO.implGenerateSeed(NativePRNG.java:441)
        at java.base@11.0.11/sun.security.provider.NativePRNG.engineGenerateSeed(NativePRNG.java:226)
        ...
```

If this happens, the Besu node can become unresponsive.

The occurrence of this problem and the possible solutions are system-dependent.
The issue itself is rare, but would most likely occur:

* On Linux.
* Using virtual machines without randomness source.
* Early after computer startup.

The solution to this depends on the situation.
A good starting point is to read about [blocking random number generation in Linux](https://man7.org/linux/man-pages/man4/random.4.html).
A quick, non-persistent workaround is to use the non-blocking random generator instead of the blocking one:

```bash
sudo mount /dev/urandom /dev/random -o bind
```

## Quorum Developer Quickstart not working on Apple M1 chip

The [Quorum Developer Quickstart](../../private-networks/tutorials/quickstart.md) does not currently support
the Apple M1 chip. The quickstart starts up on machines that use the chip, but may show the
following symptoms:

* All JSON-RPC calls return an empty reply from the server
* The Grafana dashboard shows no data
* The `docker ps` command displays an AMD message about the containers:

    ```bash
    Image may have poor performance, or fail, if run via emulation
    ```

* No logs can be downloaded

## Unsupported address exception while running from Docker

While [running Besu from a Docker image](../../get-started/install/run-docker-image.md), you might get the following exception:

```bash
Unsupported address type exception when connecting to peer {}, this is likely due to ipv6 not being enabled at runtime.
```

This happens when the IPv6 support in Docker is disabled while connecting to an IPv6 peer, preventing outbound communication.
IPv6 is disabled by default in Docker.

[Enable IPv6 support in Docker](https://docs.docker.com/config/daemon/ipv6/) to allow outbound IPv6 traffic and allow connection with IPv6 peers.
