---
description: Frequently asked questions and answers for troubleshooting Hyperledger Besu
---

# Troubleshooting

If Hyperledger Besu is not working as expected, here are some things to check or try.

## Supplied genesis block does not match stored chain data

If a `Supplied genesis block does not match stored chain data` error occurs, use the genesis file
matching the genesis block of the data directory, or use the
[`--data-path`](../../Reference/CLI/CLI-Syntax.md#data-path) option to specify a different data
directory.

## Invalid block header

If a `TimeStampMoreRecentThanParent | Invalid block header` error occurs, the [genesis file](../Configure/Genesis-File.md) of the new node is specifying a higher
[`blockperiodseconds`](../Configure/Consensus-Protocols/IBFT.md#block-time) than the imported chain.
The imported chain makes new blocks faster than the genesis file allows and Besu rejects them with this error.
This error most often occurs when importing chains from older versions of Besu.

To correct this error, decrease the `blockperiodseconds` in the new [IBFT 2.0 genesis file](../Configure/Consensus-Protocols/IBFT.md#genesis-file)
or [QFBT genesis file](../Configure/Consensus-Protocols/QBFT.md#genesis-file) to a lower value that satisfies the block header validation.

!!! example

    If the error reads `| TimestampMoreRecentThanParent | Invalid block header: timestamp 1619660141 is only 3 seconds newer than parent timestamp 1619660138. Minimum 4 seconds`,
    decrease the `blockperiodseconds` from 4 seconds to 3 seconds to match the imported chain.

After you have updated the new genesis file, if the imported chain has a `blockperiodseconds` value set lower than you prefer, you can adjust it by configuring the block time on an
[existing IBFT 2.0](../Configure/Consensus-Protocols/IBFT.md#block-time)
or [existing QBFT](../Configure/Consensus-Protocols/QBFT.md#block-time) network.

## Host not authorized

If a `Host not authorized` error occurs when attempting to access the JSON-RPC API, ensure
[`--host-allowlist`](../../Reference/CLI/CLI-Syntax.md#host-allowlist) includes the host you are
sending the RPC from, or `*`.

## Peers fail to connect

If nodes are not communicating, ensure the
[required ports are open](../../HowTo/Find-and-Connect/Configuring-Ports.md).

If your nodes are running in AWS, check you have appropriate `SecurityGroups` to allow access to
the required ports.

Check that the [enode URLs](../../Concepts/Node-Keys.md#enode-url) specified for
[bootnodes](../Find-and-Connect/Bootnodes.md) or
[static nodes](../Find-and-Connect/Static-Nodes.md) match the enode URLs displayed when starting the
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
[`eth_blockNumber`](../../Reference/API-Methods.md#eth_blocknumber) JSON-RPC API method.

If there is no block creating in [Clique](../Configure/Consensus-Protocols/Clique.md#extra-data)
or [IBFT 2.0](../Configure/Consensus-Protocols/IBFT.md#extra-data) networks, ensure the validator
addresses in the genesis file match running nodes.

## Transactions are not mined

If you add a transaction to the
[transaction pool](../../Concepts/Transactions/Transaction-Pool.md) and the transaction hash
returns, but the transaction is never mined, check the
[`--min-gas-price`](../../Reference/CLI/CLI-Syntax.md#min-gas-price) option on mining nodes. If the
`gasPrice` on a [transaction](../Send-Transactions/Transactions.md) is lower than the
`min-gas-price` for the mining node, the transaction will never mine.

In [free gas networks](../Configure/FreeGas.md), you must set
[`--min-gas-price`](../../Reference/CLI/CLI-Syntax.md#min-gas-price) to zero.

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
[`--logging=TRACE`](../../Reference/CLI/CLI-Syntax.md#logging) and look at the log files.

## Pending State Nodes not decreasing for a full node in Grafana

During [fast synchronization](../../Concepts/Node-Types.md#run-a-full-node) for a full node, the
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
