description: Frequently asked questions FAQ and answers for troubleshooting Hyperledger Besu
<!--- END of page meta data -->

# Troubleshooting

If Hyperledger Besu is not working as expected, here are some things to check or try. 

## Supplied Genesis Block Does Not Match Stored Chain Data 

If you get a `Supplied genesis block does not match stored chain data` error, use the genesis file which matches the genesis block 
of the data directory or use the [`--data-path`](../../Reference/CLI/CLI-Syntax.md#data-path) option to specify a different data directory. 

## Host Not Authorized 

If you are receiving a `Host not authorized` error when attempting to access the JSON-RPC API, ensure [`--host-whitelist`](../../Reference/CLI/CLI-Syntax.md#host-whitelist)
includes the host from which you are sending the RPC or `*`. 

## Peers Fail to Connect

If nodes are not communicating, ensure the [required ports are open](../../HowTo/Find-and-Connect/Configuring-Ports.md). 

If your nodes are running in AWS, check you have appropriate `SecurityGroups` to allow access to the required ports.

Check the [enode URLs](../../Concepts/Node-Keys.md#enode-url) specified for [bootnodes](../Find-and-Connect/Bootnodes.md)
or [static nodes](../Find-and-Connect/Managing-Peers.md#static-nodes) match the enode URLs 
displayed when the remote nodes are started.

## Mining

Check blocks are being created. On mining nodes, log messages indicate blocks are being created. 

```bash
2019-05-08 20:28:27.026+10:00 | pool-10-thread-1 | INFO  | IbftRound | Importing block to chain. round=ConsensusRoundIdentifier{Sequence=660, Round=0}, hash=0x759afaba4e923d89175d850ceca4b8ef81f7d9c727b0b0b8e714b624a4b8e8cc
2019-05-08 20:28:29.020+10:00 | pool-10-thread-1 | INFO  | IbftRound | Importing block to chain. round=ConsensusRoundIdentifier{Sequence=661, Round=0}, hash=0x5443e504256765f06b3cebfbee82276a034ebcc8d685b7c3d1a6010fd4acfa14
```
 
On non-mining nodes, log messages indicate blocks are being imported. 

```bash
2019-05-08 20:28:29.026+10:00 | EthScheduler-Workers-1 | INFO  | BlockPropagationManager | Imported #661 / 0 tx / 0 om / 0 (0.0%) gas / (0x5443e504256765f06b3cebfbee82276a034ebcc8d685b7c3d1a6010fd4acfa14) in 0.000s.
2019-05-08 20:28:31.031+10:00 | EthScheduler-Workers-0 | INFO  | BlockPropagationManager | Imported #662 / 0 tx / 0 om / 0 (0.0%) gas / (0x0ead4e20123d3f1433d8dec894fcce386da4049819b24b309963ce7a8a0fcf03) in 0.000s.
``` 

Use the [`eth_blockNumber`](../../Reference/API-Methods.md#eth_blocknumber) JSON-RPC API method to confirm the 
block number is increasing. 

If blocks are not being created in [Clique](../Configure/Consensus-Protocols/Clique.md#extra-data) or [IBFT 2.0](../Configure/Consensus-Protocols/IBFT.md#extra-data) networks, 
ensure the validator addresses in the genesis file match running nodes. 
 
## Transactions Not Being Mined 

If a transaction is added to the [transaction pool](../../Concepts/Transactions/Transaction-Pool.md) 
and the transaction hash returned but the transaction is never being mined, check the [`--min-gas-price`](../../Reference/CLI/CLI-Syntax.md#min-gas-price)
option on mining nodes. If the `gasPrice` on a [transaction](../Send-Transactions/Transactions.md) 
is lower than the `min-gas-price` for the mining node, the transaction will never be mined. 

In [free gas networks](../Configure/FreeGas.md), [`--min-gas-price`](../../Reference/CLI/CLI-Syntax.md#min-gas-price) must be set to 0. 

## Genesis Milestone 

Not including a sufficient milestone in the genesis file can lead to unexpected and inconsistent behaviour without
specific errors. Ensure a sufficient milestone is included in the genesis file (for example, `constantinoplefixblock`). 

## Illegal Reflective Access Error on Startup

When using Java 9 or later, the following error message may be displayed on startup and does not affect the operation of Besu: 

```
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by org.bouncycastle.jcajce.provider.drbg.DRBG (file:/Users/madelinemurray/besu/build/distributions/besu-1.1.2-SNAPSHOT/lib/bcprov-jdk15on-1.61.jar) to constructor sun.security.provider.Sun()
WARNING: Please consider reporting this to the maintainers of org.bouncycastle.jcajce.provider.drbg.DRBG
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
```

To stop the message being displayed, add the following to the environment: 

```bash tab="Linux / Mac OS"
export BESU_OPTS="--add-opens java.base/sun.security.provider=ALL-UNNAMED"
```
    
```bash tab="Windows"
set BESU_OPTS="--add-opens java.base/sun.security.provider=ALL-UNNAMED"
```

## Command Line Options

Characters such as smart quotes and long (em) hyphens won't work in Besu command line options. Ensure quotes have
not been automatically converted to smart quotes or double hyphens combined into em hyphens.

## New Line Characters at the End of Files

Ensure there is no new line character (`\n`) at the end of password files. New line characters may not 
be displayed in all editors. 

## Logging 

Restart Besu with the command line option [`--logging=TRACE`](../../Reference/CLI/CLI-Syntax.md#logging) and look at the log files. 
