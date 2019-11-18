description: Using Hyperledger Besu for PoW CPU mining
<!--- END of page meta data -->

# Mining

## Configure CPU Mining

Start Hyperledger Besu with the following options to enable CPU mining: 
```bash
besu --miner-enabled --miner-coinbase <account>
```

Where `<account>` is the account to which mining rewards are to be paid. For example, `fe3b557e8fb62b89f4916b721be55ceb828dbd73`.

JSON-RPC API methods for mining are:

* [`miner_start`](../../Reference/API-Methods.md#miner_start) to start mining. 
* [`miner_stop`](../../Reference/API-Methods.md#miner_stop) to stop mining. 
* [`eth_mining`](../../Reference/API-Methods.md#eth_mining) to determine whether the client is actively mining new blocks.   
* [`eth_hashrate`](../../Reference/API-Methods.md#eth_hashrate) to get the number of hashes per second with which the node is mining. 

## Configure GPU Mining

Besu supports GPU mining using [Ethminer](https://github.com/ethereum-mining/ethminer) and the `stratum+tcp` scheme. Start Hyperledger Besu with the following options to enable GPU mining: 

```bash
besu --miner-enabled --miner-stratum-enabled --miner-coinbase <account>
```

Where `<account>` is the account to which mining rewards are to be paid. For example, `fe3b557e8fb62b89f4916b721be55ceb828dbd73`.

Optional command line options are:

* [`--miner-stratum-host`](../../Reference/CLI/CLI-Syntax.md#miner-stratum-host) to specify the host of the mining service.
* [`--miner-stratum-port`](../../Reference/CLI/CLI-Syntax.md#miner-stratum-port) to specify the port of the mining service.

!!! note
    Besu also supports the `http` (getwork mode) scheme using Ethminer. Use the `--miner-stratum-enabled` option and [enable the `ETH` RPCs](../../Reference/CLI/CLI-Syntax.md#rpc-http-api).