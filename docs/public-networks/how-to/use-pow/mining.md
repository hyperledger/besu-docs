---
title: Configure mining
sidebar_position: 1
description: Using Besu for PoW CPU mining
tags:
  - public networks
  - private networks
---

# Configure mining (Deprecated)

:::caution

PoW consensus is deprecated in Besu version 24.11.0 and later. Please read this [blog post](https://www.lfdecentralizedtrust.org/blog/sunsetting-tessera-and-simplifying-hyperledger-besu) for more context on the rationale behind this decision as well as alternative options.

:::

Besu supports CPU mining, which is configured using command line options.

## Configure CPU mining

To enable CPU mining, start Besu with the following options:

```bash
besu --rpc-http-api=ETH,MINER --miner-enabled --miner-coinbase=<account>
```

Where `<account>` is the account you pay mining rewards to. For example, `fe3b557e8fb62b89f4916b721be55ceb828dbd73`.

Start and stop mining using the [`miner_start`](../../reference/api/index.md#miner_start-deprecated) and [`miner_stop`](../../reference/api/index.md#miner_stop-deprecated) APIs.

## Mining APIs

The JSON-RPC API methods for mining are:

- [`miner_start`](../../reference/api/index.md#miner_start-deprecated) to start mining.
- [`miner_stop`](../../reference/api/index.md#miner_stop-deprecated) to stop mining.
- [`eth_mining`](../../reference/api/index.md#eth_mining-deprecated) to determine whether the client is actively mining new blocks.
- [`eth_getMinerDataByBlockHash`](../../reference/api/index.md#eth_getminerdatabyblockhash-deprecated) and [`eth_getMinerDataByBlockNumber`](../../reference/api/index.md#eth_getminerdatabyblocknumber) to get the miner data for a specified block.

## Troubleshoot

### Check block creation

On mining nodes, log messages indicate block creation.

```bash
2019-05-08 20:28:27.026+10:00 | pool-10-thread-1 | INFO  | IbftRound | Importing block to chain. round=ConsensusRoundIdentifier{Sequence=660, Round=0}, hash=0x759afaba4e923d89175d850ceca4b8ef81f7d9c727b0b0b8e714b624a4b8e8cc
2019-05-08 20:28:29.020+10:00 | pool-10-thread-1 | INFO  | IbftRound | Importing block to chain. round=ConsensusRoundIdentifier{Sequence=661, Round=0}, hash=0x5443e504256765f06b3cebfbee82276a034ebcc8d685b7c3d1a6010fd4acfa14
```

On non-mining nodes, log messages indicate importing blocks.

```bash
2019-05-08 20:28:29.026+10:00 | EthScheduler-Workers-1 | INFO  | BlockPropagationManager | Imported #661 / 0 tx / 0 om / 0 (0.0%) gas / (0x5443e504256765f06b3cebfbee82276a034ebcc8d685b7c3d1a6010fd4acfa14) in 0.000s.
2019-05-08 20:28:31.031+10:00 | EthScheduler-Workers-0 | INFO  | BlockPropagationManager | Imported #662 / 0 tx / 0 om / 0 (0.0%) gas / (0x0ead4e20123d3f1433d8dec894fcce386da4049819b24b309963ce7a8a0fcf03) in 0.000s.
```

To confirm the block number is increasing, use the [`eth_blockNumber`](../../reference/api/index.md#eth_blocknumber) JSON-RPC API method.

If there's no block creation in [Clique](../../../private-networks/how-to/configure/consensus/clique.md#extra-data) or [IBFT 2.0](../../../private-networks/how-to/configure/consensus/ibft.md#extra-data) networks, ensure the validator addresses in the genesis file match running nodes.

### No mined transactions

If you add a transaction to the [transaction pool](../../concepts/transactions/pool.md) and the transaction hash returns, but the transaction is never mined, check the [`--min-gas-price`](../../reference/cli/options.md#min-gas-price) option on mining nodes. If the `gasPrice` on a [transaction](../send-transactions.md) is lower than the `min-gas-price` for the mining node, the transaction will never mine.

In [free gas networks](../../../private-networks/how-to/configure/free-gas.md), you must set [`--min-gas-price`](../../reference/cli/options.md#min-gas-price) to zero.
