description: Using Hyperledger Besu for PoW CPU mining
<!--- END of page meta data -->

# Mining

## Configure CPU Mining

Start Hyperledger Besu with the following options to enable CPU mining: 
```bash
besu --rpc-http-api=ETH,MINER --miner-enabled --miner-coinbase=<account>
```

Where `<account>` is the account to which mining rewards are to be paid. For example, `fe3b557e8fb62b89f4916b721be55ceb828dbd73`.

Use the [`miner_start`](../../Reference/API-Methods.md#miner_start) and [`miner_stop`](../../Reference/API-Methods.md#miner_stop) APIs to start and stop mining.

## Configure GPU Mining

Besu supports GPU mining and has been tested using [Ethminer](https://github.com/ethereum-mining/ethminer) with the `stratum+tcp` scheme. Start Hyperledger Besu with the following options to enable GPU mining: 

```bash
besu --rpc-http-api=ETH,MINER --miner-enabled --miner-stratum-enabled --miner-coinbase=<account>
```

Where `<account>` is the account to which mining rewards are to be paid. For example, `fe3b557e8fb62b89f4916b721be55ceb828dbd73`.

Optional command line options are:

* [`--miner-stratum-host`](../../Reference/CLI/CLI-Syntax.md#miner-stratum-host) to specify the host of the mining service.
* [`--miner-stratum-port`](../../Reference/CLI/CLI-Syntax.md#miner-stratum-port) to specify the port of the mining service.

!!! note
    Besu also supports the `getwork` scheme. Use the [`--miner-stratum-enabled`](../../Reference/CLI/CLI-Syntax.md#miner-stratum-enabled) option and [enable the `ETH` RPCs](../../Reference/CLI/CLI-Syntax.md#rpc-http-api).
    
    The `getwork` scheme is supported as the `http` scheme in certain mining software.

Use the [`miner_start`](../../Reference/API-Methods.md#miner_start) and [`miner_stop`](../../Reference/API-Methods.md#miner_stop) APIs to start and stop mining.

## Mining APIs

JSON-RPC API methods for mining are:

* [`miner_start`](../../Reference/API-Methods.md#miner_start) to start mining. 
* [`miner_stop`](../../Reference/API-Methods.md#miner_stop) to stop mining. 
* [`eth_mining`](../../Reference/API-Methods.md#eth_mining) to determine whether the client is actively mining new blocks.   
* [`eth_hashrate`](../../Reference/API-Methods.md#eth_hashrate) to get the number of hashes per second with which the node is mining. Is not supported for GPU mining.
* [`eth_getWork`](../../Reference/API-Methods.md#eth_getwork) to get the hash of the current block, the seed hash, and the target boundary condition to be met. Only used when using the `getwork` scheme.
* [`eth_submitWork`](../../Reference/API-Methods.md#eth_submitwork) to submit the PoW solution. Only used when using the `getwork` scheme.