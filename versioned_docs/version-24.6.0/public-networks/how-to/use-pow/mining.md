---
title: Configure mining
sidebar_position: 1
description: Using Hyperledger Besu for PoW CPU mining
tags:
  - public networks
  - private networks
---

# Configure mining

Hyperledger Besu supports CPU and GPU mining, which are configured using command line options.

GPU mining tests used [Ethminer](https://github.com/ethereum-mining/ethminer) with the `stratum+tcp` and `getwork` schemes.

Ethminer has been used with Hyperledger Besu to mine blocks on the [Ropsten testnet](https://ropsten.etherscan.io/address/0x2f14582947E292a2eCd20C430B46f2d27CFE213c#mine), [ETC Mainnet (uncle block only)](https://etc.tokenview.com/en/uncleblock/10555173) and Mordor ETC testnet.

:::note
- Some mining software supports the `getwork` scheme as the `http` scheme.
- The Ropsten testnet is now deprecated. It transitioned to proof of stake consensus before deprecation.
:::

## Configure CPU mining

To enable CPU mining, start Hyperledger Besu with the following options:

```bash
besu --rpc-http-api=ETH,MINER --miner-enabled --miner-coinbase=<account>
```

Where `<account>` is the account you pay mining rewards to. For example, `fe3b557e8fb62b89f4916b721be55ceb828dbd73`.

Start and stop mining using the [`miner_start`](../../reference/api/index.md#miner_start) and [`miner_stop`](../../reference/api/index.md#miner_stop) APIs.

## Configure GPU mining

Besu supports GPU mining, tested using [Ethminer](https://github.com/ethereum-mining/ethminer) with the `stratum+tcp` scheme.

To enable GPU mining, start Hyperledger Besu with the following options:

```bash
besu --rpc-http-api=ETH,MINER --miner-enabled --miner-stratum-enabled --miner-coinbase=<account>
```

Where `<account>` is the account you pay mining rewards to. For example, `fe3b557e8fb62b89f4916b721be55ceb828dbd73`.

Optional command line options are:

- [`--miner-stratum-host`](../../reference/cli/options.md#miner-stratum-host) to specify the host of the mining service.
- [`--miner-stratum-port`](../../reference/cli/options.md#miner-stratum-port) to specify the port of the mining service.

:::note

Besu also supports the `getwork` scheme. Use the [`--miner-stratum-enabled`](../../reference/cli/options.md#miner-stratum-enabled) option and [enable the `ETH` RPCs](../../reference/cli/options.md#rpc-http-api).

The `getwork` scheme is supported as the `http` scheme in certain mining software.

:::

Start and stop mining using the [`miner_start`](../../reference/api/index.md#miner_start) and [`miner_stop`](../../reference/api/index.md#miner_stop) APIs.

## Mining APIs

The JSON-RPC API methods for mining are:

- [`miner_start`](../../reference/api/index.md#miner_start) to start mining.
- [`miner_stop`](../../reference/api/index.md#miner_stop) to stop mining.
- [`eth_mining`](../../reference/api/index.md#eth_mining) to determine whether the client is actively mining new blocks.
- [`eth_getMinerDataByBlockHash`](../../reference/api/index.md#eth_getminerdatabyblockhash) and [`eth_getMinerDataByBlockNumber`](../../reference/api/index.md#eth_getminerdatabyblocknumber) to get the miner data for a specified block.
- [`eth_hashrate`](../../reference/api/index.md#eth_hashrate) to get the number of hashes per second with which the node is mining. Not supported for GPU mining.
- [`eth_getWork`](../../reference/api/index.md#eth_getwork) to get the hash of the current block, the seed hash, and the target boundary condition. Only used when using the `getwork` scheme.
- [`eth_submitWork`](../../reference/api/index.md#eth_submitwork) to submit the PoW solution. Only used when using the `getwork` scheme.

## Besu mined blocks

Besu has successfully mined blocks on the Ropsten testnet, ETC Mainnet (uncle block only) and Mordor ETC testnet. Blocks mined by the Hyperledger Besu team contain the version number used in the block's `extraData` field. The following accounts have been used to mine on public networks with Hyperledger Besu:

- **Ropsten**: [`0x2f14582947E292a2eCd20C430B46f2d27CFE213c`](https://ropsten.etherscan.io/address/0x2f14582947E292a2eCd20C430B46f2d27CFE213c#mine)
- **ETC**: [`0x3125309aa670f5e60493b50884a7e7abf9ebb701`](https://etc.tokenview.com/en/address/0x3125309aa670f5e60493b50884a7e7abf9ebb701)
- **Mordor**: `0x2f14582947E292a2eCd20C430B46f2d27CFE213c`

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
