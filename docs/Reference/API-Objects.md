---
description: Hyperledger Besu API objects reference
---

# Hyperledger Besu API objects

The following objects are parameters for or returned by Besu API methods.

## Block object

Returned by [`eth_getBlockByHash`](API-Methods.md#eth_getblockbyhash) and
[`eth_getBlockByNumber`](API-Methods.md#eth_getblockbynumber).

| Key | Type | Value |
|-----|:----:|-------|
| **number**           | *Quantity*, Integer   | Block number. `null` when block is pending.                        |
| **hash**             | *Data*, 32&nbsp;bytes | Hash of the block. `null` when block is pending.                   |
| **parentHash**       | *Data*, 32&nbsp;bytes | Hash of the parent block.                                          |
| **nonce**            | *Data*, 8&nbsp;bytes  | Hash of the generated proof of work. `null` when block is pending. |
| **sha3Uncles**       | *Data*, 32&nbsp;bytes | SHA3 of the uncle's data in the block.                             |
| **logsBloom**        | *Data*, 256 bytes     | Bloom filter for the block logs. `null` when block is pending.     |
| **transactionsRoot** | *Data*, 32&nbsp;bytes | Root of the transaction trie for the block.                        |
| **stateRoot**        | Data, 32&nbsp;bytes   | Root of the final state trie for the block.                        |
| **receiptsRoot**     | Data, 32&nbsp;bytes   | Root of the receipts trie for the block.                           |
| **miner**            | Data, 20&nbsp;bytes   | Address to pay mining rewards to.                                  |
| **difficulty**       | Quantity, Integer     | Difficulty for this block.                                         |
| **totalDifficulty**  | Quantity, Integer     | Total difficulty of the chain until this block.                    |
| **extraData**        | Data                  | Extra data field for this block. The first 32 bytes is vanity data you can set using the [`--miner-extra-data`](../Reference/CLI/CLI-Syntax.md#miner-extra-data) command line option. Stores extra data when used with [Clique](../HowTo/Configure/Consensus-Protocols/Clique.md#genesis-file) and [IBFT](../HowTo/Configure/Consensus-Protocols/IBFT.md#genesis-file). |
| **size**             | Quantity, Integer     | Size of block in bytes.                                            |
| **gasLimit**         | Quantity              | Maximum gas allowed in this block.                                 |
| **gasUsed**          | Quantity              | Total gas used by all transactions in this block.                  |
| **timestamp**        | Quantity              | Unix timestamp for block assembly.                                 |
| **transactions**     | Array                 | Array of [transaction objects](#transaction-object), or 32 byte transaction hashes depending on the specified boolean parameter. |
| **uncles**           | Array                 | Array of uncle hashes.                                             |
| **baseFeePerGas**    | Quantity              | The block's baseline network fee per gas; the baseFee is burned. Before [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md), this field must empty. After EIP-1559, this field must be set to the block's base fee per gas value. |

## Filter options object

Parameter for [`eth_newFilter`](API-Methods.md#eth_newfilter),
[`eth_getLogs`](API-Methods.md#eth_getlogs), and [`priv_getLogs`](API-Methods.md#priv_getlogs).
Used to [`filter logs`](../HowTo/Interact/Filters/Accessing-Logs-Using-JSON-RPC.md).

| Key | Type | Required/Optional | Value |
|-----|:----:|:-----------------:|-------|
| **fromBlock** | Quantity &#124; Tag               | Optional | Integer block number or `latest`, `pending`, `earliest`. See [Block Parameter](../HowTo/Interact/APIs/Using-JSON-RPC-API.md#block-parameter). Default is `latest`. |
| **toBlock**   | Quantity &#124; Tag               | Optional | Integer block number or `latest`, `pending`, `earliest`. See [Block Parameter](../HowTo/Interact/APIs/Using-JSON-RPC-API.md#block-parameter). Default is `latest`. |
| **address**   | Data &#124; Array                 | Optional | Contract address or array of addresses from which [logs](../Concepts/Events-and-Logs.md) originate. |
| **topics**    | Array of Data, 32&nbsp;bytes each | Optional | Array of topics by which to [filter logs](../Concepts/Events-and-Logs.md#topic-filters). |

[`eth_getLogs`](API-Methods.md#eth_getlogs) and [`priv_getLogs`](API-Methods.md#priv_getlogs) have an
extra key.

| Key | Type | Required/Optional | Value |
|-----|:----:|:-----------------:|-------|
| **blockHash** | Data, 32&nbsp;bytes | Optional. | Hash of block for which to return logs. If you specify `blockHash`, you cannot specify `fromBlock` and `toBlock`. |

## Log object

Returned by [`eth_getFilterChanges`](API-Methods.md#eth_getfilterchanges) and [`priv_getLogs`](API-Methods.md#priv_getlogs).
[`Transaction receipt objects`](#transaction-receipt-object) can contain an array of log objects.

| Key | Type | Value |
|-----|:----:|-------|
| **removed**          | Tag                               | `true` if log removed because of a chain reorganization. `false` if a valid log.    |
| **logIndex**         | Quantity, Integer                 | Log index position in the block. `null` when log is pending.                        |
| **transactionIndex** | Quantity, Integer                 | Index position of the starting transaction for the log. `null` when log is pending. |
| **transactionHash**  | Data, 32&nbsp;bytes               | Hash of the starting transaction for the log. `null` when log is pending.           |
| **blockHash**        | Data, 32&nbsp;bytes               | Hash of the block that includes the log. `null` when log is pending.                |
| **blockNumber**      | Quantity                          | Number of block that includes the log. `null` when log is pending.                  |
| **address**          | Data, 20&nbsp;bytes               | Address the log originated from.                                                    |
| **data**             | Data                              | Non-indexed arguments of the log.                                                   |
| **topics**           | Array of Data, 32&nbsp;bytes each | [Event signature hash](../Concepts/Events-and-Logs.md#event-signature-hash) and 0 to 3 [indexed log arguments](../Concepts/Events-and-Logs.md#event-parameters). |

## Miner data object

Returned by [`eth_getMinerDataByBlockHash`](API-Methods.md#eth_getminerdatabyblockhash) and
[`eth_getMinerDataByBlockNumber`](API-Methods.md#eth_getminerdatabyblocknumber).

| Key | Type | Value |
|-----|:----:|-------|
| **netBlockReward**       | Quantity, Integer    | The net block reward, in Wei, is `staticBlockReward + transactionFee + uncleInclusionReward`. |
| **staticBlockReward**    | Quantity, Integer    | The static block reward, in Wei, is preset on a hard fork.                                    |
| **transactionFee**       | Quantity, Integer    | The transaction fee, in Wei, is `sum of upfront cost - refund amount for all transactions`.   |
| **uncleInclusionReward** | Quantity, Integer    | The uncle inclusion reward, in Wei, is `static block reward * number of ommers/32`.           |
| **uncleRewards**         | Map                  | Map of uncle block hashes and uncle miner coinbase addresses.                                 |
| **coinbase**             | Data, 20&nbsp;bytes  | Coinbase address.                                                                             |
| **extraData**            | Data                 | Extra data field for this block. The first 32 bytes is vanity data you can set using the [`--miner-extra-data`](../Reference/CLI/CLI-Syntax.md#miner-extra-data) command line option. |
| **difficulty**           | Quantity, Integer    | Difficulty of this block.                                                                     |
| **totalDifficulty**      | Quantity, Integer    | Total difficulty of the chain until this block.                                               |

## Pending transaction object

Returned by [`txpool_besuPendingTransactions`](API-Methods.md#txpool_besupendingtransactions).

| Key | Type | Value |
|-----|:----:|-------|
| **accessList**           | Array               | (Optional) List of addresses and storage keys the transaction plans to access. Used in [`ACCESS_LIST` transactions](../Concepts/Transactions/Transaction-Types.md#access_list-transactions) and may be used in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). |
| **from**                 | Data, 20&nbsp;bytes | Address of the sender.                                              |
| **gas**                  | Quantity            | Gas provided by the sender.                                         |
| **gasPrice**             | Quantity            | (Optional) Gas price, in Wei, provided by the sender. Not used only in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). |
| **maxPriorityFeePerGas** | Quantity, Integer   | (Optional) Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. Used only in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). |
| **maxFeePerGas**         | Quantity, Integer   | (Optional) Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. Used only in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). |
| **hash**                 | Data, 32&nbsp;bytes | Hash of the transaction.                                            |
| **input**                | Data                | Data sent with the transaction to create or invoke a contract.      |
| **nonce**                | Quantity            | Number of transactions made by the sender before this one.          |
| **to**                   | Data, 20&nbsp;bytes | Address of the receiver. `null` if a contract creation transaction. |
| **transactionType**      | String              | [Transaction type](../Concepts/Transactions/Transaction-Types.md).  |
| **value**                | Quantity            | Value transferred, in Wei.                                          |
| **v**                    | Quantity            | ECDSA Recovery ID.                                                  |
| **r**                    | Data, 32&nbsp;bytes | ECDSA signature r.                                                  |
| **s**                    | Data, 32&nbsp;bytes | ECDSA signature s.                                                  |

## Private transaction object

Returned by [`priv_getPrivateTransaction`](API-Methods.md#priv_getprivatetransaction).

| Key | Type | Value |
|-----|:----:|-------|
| **from**           | Data, 20&nbsp;bytes               | Address of the sender.                                                          |
| **gas**            | Quantity                          | Gas provided by the sender.                                                     |
| **gasPrice**       | Quantity                          | Gas price, in Wei, provided by the sender.                                      |
| **hash**           | Data, 32&nbsp;bytes               | Hash of the transaction.                                                        |
| **input**          | Data                              | The data to create or invoke a contract.                                        |
| **nonce**          | Quantity                          | Number of transactions made by the sender to the privacy group before this one. |
| **to**             | Data, 20&nbsp;bytes               | `null` if a contract creation transaction, otherwise, the contract address.     |
| **value**          | Quantity                          | `null` because private transactions cannot transfer Ether.                      |
| **v**              | Quantity                          | ECDSA Recovery ID.                                                              |
| **r**              | Data, 32&nbsp;bytes               | ECDSA signature r.                                                              |
| **s**              | Data, 32&nbsp;bytes               | ECDSA signature s.                                                              |
| **privateFrom**    | Data, 32&nbsp;bytes               | [Tessera](https://docs.tessera.consensys.net/) public key of the sender.   |
| **privateFor**     | Array of Data, 32&nbsp;bytes each | [Tessera](https://docs.tessera.consensys.net/) public keys of recipients. Not returned if using `privacyGroupId` to [send the transaction](../Concepts/Privacy/Privacy-Groups.md#privacy-types).  |
| **privacyGroupId** | Data, 32&nbsp;bytes               | [Tessera](https://docs.tessera.consensys.net/) privacy group ID of recipients. Not returned if using `privateFor` to [send the transaction](../Concepts/Privacy/Privacy-Groups.md#privacy-types). |
| **restriction**    | String                            | Must be [`restricted`](../Concepts/Privacy/Private-Transactions.md).            |

## Range object

Returned by [`debug_storageRangeAt`](API-Methods.md#debug_storagerangeat).

| Key | Type | Value |
|-----|:----:|-------|
| **storage** | Object | Key hash and value. Pre-image key is `null` if it falls outside the cache. |
| **nextKey** | Hash   | Hash of next key if further storage in range. Otherwise, not included.     |

### Structured log object

Log information returned as part of the [Trace object](#trace-object).

| Key | Type | Value |
|-----|:----:|-------|
| **pc**                     | Integer                      | Current program counter.                                         |
| **op**                     | String                       | Current OpCode.                                                  |
| **gas**                    | Integer                      | Gas remaining.                                                   |
| **gasCost**                | Integer                      | Cost in wei of each gas unit.                                    |
| **depth**                  | Integer                      | Execution depth.                                                 |
| **exceptionalHaltReasons** | Array                        | One or more strings representing an error condition causing the EVM execution to terminate. These strings suggest that EVM execution terminated for reasons such as running out of gas or attempting to execute an unknown instruction. Generally a single exceptional halt reason returns but it's possible for more than one to occur at once. |
| **stack**                  | Array of 32&nbsp;byte arrays | EVM execution stack before executing current operation.          |
| **memory**                 | Array of 32&nbsp;byte arrays | Memory space of the contract before executing current operation. |
| **storage**                | Object                       | Storage entries changed by the current transaction.              |

## Trace object

Returned by [`debug_traceBlock`](API-Methods.md#debug_traceblock),
[`debug_traceBlockByHash`](API-Methods.md#debug_traceblockbyhash),
[`debug_traceBlockByNumber`](API-Methods.md#debug_traceblockbynumber), and
[`debug_traceTransaction`](API-Methods.md#debug_tracetransaction).

| Key | Type | Value |
|-----|:----:|-------|
| **gas**         | Integer | Gas used by the transaction.                                       |
| **failed**      | Boolean | True if transaction failed, otherwise, false.                      |
| **returnValue** | String  | Bytes returned from transaction execution (without a `0x` prefix). |
| **structLogs**  | Array   | Array of structured log objects.                                   |

## Transaction object

Returned by [`eth_getTransactionByHash`](API-Methods.md#eth_gettransactionbyhash),
[`eth_getTransactionByBlockHashAndIndex`](API-Methods.md#eth_gettransactionbyblockhashandindex),
and
[`eth_getTransactionByBlockNumberAndIndex`](API-Methods.md#eth_gettransactionbyblocknumberandindex).

| Key | Type | Value |
|-----|:----:|-------|
| **accessList**           | Array               | (Optional) List of addresses and storage keys the transaction plans to access. Used in [`ACCESS_LIST` transactions](../Concepts/Transactions/Transaction-Types.md#access_list-transactions) and may be used in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). |
| **blockHash**            | Data, 32&nbsp;bytes | Hash of the block containing this transaction. `null` when transaction is pending.         |
| **blockNumber**          | Quantity            | Block number of the block containing this transaction. `null` when transaction is pending. |
| **chainId**              | Quantity            | [Chain ID](../Concepts/NetworkID-And-ChainID.md).                                          |
| **from**                 | Data, 20&nbsp;bytes | Address of the sender.                                                                     |
| **gas**                  | Quantity            | Gas provided by the sender.                                                                |
| **gasPrice**             | Quantity            | (Optional) Gas price, in Wei, provided by the sender. Not used only in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). |
| **maxPriorityFeePerGas** | Quantity, Integer   | (Optional) Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. Used only in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). |
| **maxFeePerGas**         | Quantity, Integer   | (Optional) Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. Used only in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). |
| **hash**                 | Data, 32&nbsp;bytes | Hash of the transaction.                                                                   |
| **input**                | Data                | Data sent with the transaction to create or invoke a contract. For [private transactions](../Concepts/Privacy/Privacy-Overview.md), it's a pointer to the transaction location in [Tessera](https://docs.tessera.consensys.net/). |
| **nonce**                | Quantity            | Number of transactions made by the sender before this one.                                 |
| **publicKey**            | Data, 64&nbsp;bytes | Public key of the sender.                                                                  |
| **raw**                  | Data                | This signed transaction in Recursive Length Prefix (RLP) encoded form.                     |
| **to**                   | Data, 20&nbsp;bytes | Address of the receiver. `null` if a contract creation transaction.                        |
| **transactionIndex**     | Quantity, Integer   | Index position of the transaction in the block. `null` when transaction is pending.        |
| **transactionType**      | String              | [Transaction type](../Concepts/Transactions/Transaction-Types.md).                         |
| **value**                | Quantity            | Value transferred, in Wei.                                                                 |
| **v**                    | Quantity            | ECDSA Recovery ID.                                                                         |
| **r**                    | Data, 32&nbsp;bytes | ECDSA signature r.                                                                         |
| **s**                    | Data, 32&nbsp;bytes | ECDSA signature s.                                                                         |

## Transaction call object

Parameter for [`eth_call`](API-Methods.md#eth_call) and
[`eth_estimateGas`](API-Methods.md#eth_estimategas).

!!! note

    All transaction call object parameters are optional for [`eth_estimateGas`](API-Methods.md#eth_estimategas).
    Only the `to` parameter is required for [`eth_call`](API-Methods.md#eth_call).

| Key | Type | Value |
|-----|:----:|-------|
| **from**                 | Data, 20&nbsp;bytes | Address of the sender.                                         |
| **to**                   | Data, 20&nbsp;bytes | Address of the action receiver.                                |
| **gas**                  | Quantity, Integer   | Gas provided by the sender. `eth_call` consumes zero gas, but other executions might need this parameter. `eth_estimateGas` ignores this value. |
| **gasPrice**             | Quantity, Integer   | Gas price, in Wei, provided by the sender. The default is `0`. Can't be used only in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). |
| **maxPriorityFeePerGas** | Quantity, Integer   | Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. Can be used only in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). If used, must specify `maxFeePerGas`. |
| **maxFeePerGas**         | Quantity, Integer   | Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. Can be used only in [`EIP1559` transactions](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions). If used, must specify `maxPriorityFeePerGas`. |
| **value**                | Quantity, Integer   | Value transferred, in Wei.                                     |
| **data**                 | Data                | Hash of the method signature and encoded parameters. For details, see [Ethereum Contract ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html). |
| **strict**               | Tag                 | If `true`, checks that the `from` account’s ether balance is sufficient to cover the transaction and gas fee. If `false`, this balance is not checked. The default is `false`. |

## Transaction receipt object

Returned by [`eth_getTransactionReceipt`](API-Methods.md#eth_gettransactionreceipt).

| Key | Type | Value |
|-----|:----:|-------|
| **blockHash**         | Data, 32&nbsp;bytes  | Hash of block containing this transaction.                                           |
| **blockNumber**       | Quantity             | Block number of block containing this transaction.                                   |
| **contractAddress**   | Data, 20&nbsp;bytes  | Contract address created, if contract creation transaction, otherwise, `null`.       |
| **cumulativeGasUsed** | Quantity             | Total amount of gas used by previous transactions in the block and this transaction. |
| **effectiveGasPrice** | Quantity             | The [actual value per gas deducted](../Concepts/Transactions/Transaction-Types.md#eip1559-transactions) from the sender's account. |
| **from**              | Data, 20&nbsp;bytes  | Address of the sender.                                                               |
| **gasUsed**           | Quantity             | Amount of gas used by this specific transaction.                                     |
| **logs**              | Array                | Array of [log objects](#log-object) generated by this transaction.                   |
| **logsBloom**         | Data, 256&nbsp;bytes | Bloom filter for light clients to quickly retrieve related logs.                     |
| **status**            | Quantity             | Either `0x0` (failure), `0x1` (success), or `0x2` (invalid).                         |
| **to**                | Data, 20&nbsp;bytes  | Address of the receiver, if sending ether, otherwise, null.                          |
| **transactionHash**   | Data, 32&nbsp;bytes  | Hash of the transaction.                                                             |
| **transactionIndex**  | Quantity, Integer    | Index position of transaction in the block.                                          |
| **transactionType**   | String               | [Transaction type](../Concepts/Transactions/Transaction-Types.md).                   |
| **revertReason**      | String               | ABI-encoded string that displays the [reason for reverting the transaction](../HowTo/Send-Transactions/Revert-Reason.md). Only available if revert reason is [enabled](../Reference/CLI/CLI-Syntax.md#revert-reason-enabled). |

!!!note

    For pre-Byzantium transactions, the transaction receipt object includes the following instead
    of `status`:

| Key | Type | Value |
|-----|:----:|-------|
| **root** | Data, 32&nbsp;bytes | Post-transaction state root |

## Transaction trace object

Returned by [`trace_replayBlockTransactions`](API-Methods.md#trace_replayblocktransactions).

| Key | Type | Value |
|-----|:----:|-------|
| **output**          | Boolean             | Transaction result. 1 for success and 0 for failure.              |
| **stateDiff**       | Object              | [State changes in the requested block](Trace-Types.md#statediff). |
| **trace**           | Array               | [Ordered list of calls to other contracts](Trace-Types.md#trace). |
| **vmTrace**         | Object              | [Ordered list of EVM actions](Trace-Types.md#vmtrace).            |
| **transactionHash** | Data, 32&nbsp;bytes | Hash of the replayed transaction.                                 |

## Private transaction receipt object

Returned by [`priv_getTransactionReceipt`](API-Methods.md#priv_getTransactionReceipt).

| Key | Type | Value |
|-----|:----:|-------|
| **blockHash**        | Data, 32&nbsp;bytes  | Hash of block containing this transaction.                                         |
| **blockNumber**      | Quantity             | Block number of block containing this transaction.                                 |
| **contractAddress**  | Data, 20&nbsp;bytes  | Contract address created if a contract creation transaction, otherwise, `null`.    |
| **from**             | Data, 20&nbsp;bytes  | Address of the sender.                                                             |
| **logs**             | Array                | Array of [log objects](#log-object) generated by this private transaction.         |
| **to**               | Data, 20&nbsp;bytes  | Address of the receiver, if sending ether, otherwise, null.                        |
| **transactionHash**  | Data, 32&nbsp;bytes  | Hash of the private transaction.                                                   |
| **transactionIndex** | Quantity, Integer    | Index position of transaction in the block.                                        |
| **revertReason**     | String               | ABI-encoded string that displays the [reason for reverting the transaction](../HowTo/Send-Transactions/Revert-Reason.md). Only available if revert reason is [enabled](../Reference/CLI/CLI-Syntax.md#revert-reason-enabled). |
| **output**           | Data                 | RLP-encoded return value of a contract call if a value returns, otherwise, `null`. |
| **commitmentHash**   | Data, 32&nbsp;bytes  | Hash of the privacy marker transaction.                                            |
| **status**           | Quantity             | Either `0x1` (success) or `0x0` (failure).                                         |
| **privateFrom**      | Data, 32&nbsp;bytes  | [Tessera](https://docs.tessera.consensys.net/) public key of the sender.     |
| **privateFor** or **privacyGroupId** | Array or Data, 32&nbsp;bytes | [Tessera](https://docs.tessera.consensys.net/) public keys or privacy group ID of the recipients. |
| **logsBloom**        | Data, 256&nbsp;bytes | Bloom filter for light clients to quickly retrieve related logs.                   |
