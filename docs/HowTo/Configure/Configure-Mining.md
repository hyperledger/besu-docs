---
description: Using Hyperledger Besu for PoW CPU mining
---

# Mining

## Configure CPU mining

To enable CPU mining, start Hyperledger Besu with the following options:

```bash
besu --rpc-http-api=ETH,MINER --miner-enabled --miner-coinbase=<account>
```

Where `<account>` is the account you pay mining rewards to. For example,
`fe3b557e8fb62b89f4916b721be55ceb828dbd73`.

Start and stop mining using the [`miner_start`](../../Reference/API-Methods.md#miner_start) and
[`miner_stop`](../../Reference/API-Methods.md#miner_stop) APIs.

## Configure GPU mining

Besu supports GPU mining, tested using [Ethminer](https://github.com/ethereum-mining/ethminer) with
the `stratum+tcp` scheme.

To enable GPU mining, start Hyperledger Besu with the following options:

```bash
besu --rpc-http-api=ETH,MINER --miner-enabled --miner-stratum-enabled --miner-coinbase=<account>
```

Where `<account>` is the account you pay mining rewards to. For example,
`fe3b557e8fb62b89f4916b721be55ceb828dbd73`.

Optional command line options are:

* [`--miner-stratum-host`](../../Reference/CLI/CLI-Syntax.md#miner-stratum-host) to specify the
  host of the mining service.
* [`--miner-stratum-port`](../../Reference/CLI/CLI-Syntax.md#miner-stratum-port) to specify the
  port of the mining service.

!!! note

    Besu also supports the `getwork` scheme. Use the
    [`--miner-stratum-enabled`](../../Reference/CLI/CLI-Syntax.md#miner-stratum-enabled) option and
    [enable the `ETH` RPCs](../../Reference/CLI/CLI-Syntax.md#rpc-http-api).

    The `getwork` scheme is supported as the `http` scheme in certain mining software.

Start and stop mining using the [`miner_start`](../../Reference/API-Methods.md#miner_start) and
[`miner_stop`](../../Reference/API-Methods.md#miner_stop) APIs.

## Mining APIs

The JSON-RPC API methods for mining are:

* [`miner_start`](../../Reference/API-Methods.md#miner_start) to start mining.
* [`miner_stop`](../../Reference/API-Methods.md#miner_stop) to stop mining.
* [`eth_mining`](../../Reference/API-Methods.md#eth_mining) to determine whether the client is
  actively mining new blocks.
* [`eth_hashrate`](../../Reference/API-Methods.md#eth_hashrate) to get the number of hashes per
  second with which the node is mining. Not supported for GPU mining.
* [`eth_getWork`](../../Reference/API-Methods.md#eth_getwork) to get the hash of the current block,
  the seed hash, and the target boundary condition. Only used when using the `getwork`
  scheme.
* [`eth_submitWork`](../../Reference/API-Methods.md#eth_submitwork) to submit the PoW solution.
  Only used when using the `getwork` scheme.

## Hyperledger Besu Mined Blocks

Hyperledger Besu has successfully mined blocks on the Ropsten testnet, ETC mainnet (uncle block only) and Mordor ETC testnet.
Blocks mined by the Hyperledger Besu team contain the version number used in the block's `extraData` field. The following accounts
have been used to mine on public networks with Hyperledger Besu:

* **Ropsten**: [`0x2f14582947E292a2eCd20C430B46f2d27CFE213c`](https://ropsten.etherscan.io/address/0x2f14582947E292a2eCd20C430B46f2d27CFE213c#mine)
* **ETC**: [`0x3125309aa670f5e60493b50884a7e7abf9ebb701`](https://etc.tokenview.com/en/address/0x3125309aa670f5e60493b50884a7e7abf9ebb701)
* **Mordor**: `0x2f14582947E292a2eCd20C430B46f2d27CFE213c`