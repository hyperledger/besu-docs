---
title: Objects
description: Hyperledger Besu API objects reference
tags:
  - public networks
  - private networks
---

# Besu API objects

The following objects are parameters for or returned by Besu API methods.

:::info

This reference contains API objects that apply to both public and private networks. For private-network-specific API objects, see the [private network API object reference](../../../private-networks/reference/api/objects.md).

:::

## Block object

Returned by [`eth_getBlockByHash`](index.md#eth_getblockbyhash) and [`eth_getBlockByNumber`](index.md#eth_getblockbynumber).

| Key | Type | Value |
| --- | :-: | --- |
| `number` | _Quantity_, Integer | Block number. `null` when block is pending. |
| `hash` | _Data_, 32&nbsp;bytes | Hash of the block. `null` when block is pending. |
| `parentHash` | _Data_, 32&nbsp;bytes | Hash of the parent block. |
| `nonce` | _Data_, 8&nbsp;bytes | Hash of the generated proof of work. `null` when block is pending. |
| `sha3Uncles` | _Data_, 32&nbsp;bytes | SHA3 of the uncle's data in the block. |
| `logsBloom` | _Data_, 256 bytes | Bloom filter for the block logs. `null` when block is pending. |
| `transactionsRoot` | _Data_, 32&nbsp;bytes | Root of the transaction trie for the block. |
| `stateRoot` | Data, 32&nbsp;bytes | Root of the final state trie for the block. |
| `receiptsRoot` | Data, 32&nbsp;bytes | Root of the receipts trie for the block. |
| `miner` | Data, 20&nbsp;bytes | Address to pay mining rewards to. |
| `difficulty` | Quantity, Integer | Difficulty for this block. |
| `totalDifficulty` | Quantity, Integer | Total difficulty of the chain until this block. This value will always be `0` for an uncle block. |
| `extraData` | Data | Extra data field for this block. The first 32 bytes is vanity data you can set using the [`--miner-extra-data`](../cli/options.md#miner-extra-data) command line option. Stores extra data when used with [Clique](../../../private-networks/how-to/configure/consensus/clique.md#genesis-file) and [IBFT](../../../private-networks/how-to/configure/consensus/ibft.md#genesis-file). |
| `size` | Quantity, Integer | Size of block in bytes. |
| `gasLimit` | Quantity | Maximum gas allowed in this block. |
| `gasUsed` | Quantity | Total gas used by all transactions in this block. |
| `timestamp` | Quantity | Unix timestamp (milliseconds) for block assembly. |
| `transactions` | Array | Array of [transaction objects](#transaction-object), or 32 byte transaction hashes depending on the specified boolean parameter. |
| `uncles` | Array | Array of uncle hashes. |
| `baseFeePerGas` | Quantity | The block's [base fee per gas](../../concepts/transactions/types.md#eip1559-transactions). This field is empty for blocks created before [EIP-1559](https://github.com/ethereum/EIPs/blob/2d8a95e14e56de27c5465d93747b0006bd8ac47f/EIPS/eip-1559.md). |

## Fee history results object

Returned by [`eth_feeHistory`](index.md#eth_feehistory) for the requested block range. If blocks in the specified block range are not available, then only the fee history for available blocks is returned.

| Key | Type | Value |
| --- | :-: | --- |
| `oldestBlock` | Quantity, Integer | Lowest number block of the returned range. |
| `baseFeePerGas` | Array | Array of block base fees per gas, including an extra block value. The extra value is the next block after the newest block in the returned range. Returns zeroes for blocks created before [EIP-1559](https://github.com/ethereum/EIPs/blob/2d8a95e14e56de27c5465d93747b0006bd8ac47f/EIPS/eip-1559.md). |
| `gasUsedRatio` | Array | Array of block gas used ratios. These are calculated as the ratio of `gasUsed` and `gasLimit`. |
| `reward` | Array | Array of effective priority fee per gas data points from a single block. All zeroes are returned if the block is empty. |

## Filter options object

Parameter for [`eth_newFilter`](index.md#eth_newfilter), [`eth_getLogs`](index.md#eth_getlogs), and [`priv_getLogs`](../../../private-networks/reference/api/index.md#priv_getlogs). Used to [`filter logs`](../../how-to/use-besu-api/access-logs.md).

| Key | Type | Required/Optional | Value |
| --- | :-: | :-: | --- |
| `fromBlock` | Quantity &#124; Tag | Optional | Integer block number or `latest`, `pending`, `earliest`. See [block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter). Default is `latest`. |
| `toBlock` | Quantity &#124; Tag | Optional | Integer block number or `latest`, `pending`, `earliest`. See [block parameter](../../how-to/use-besu-api/json-rpc.md#block-parameter). Default is `latest`. |
| `address` | Data &#124; Array | Optional | Contract address or array of addresses from which [logs](../../concepts/events-and-logs.md) originate. |
| `topics` | Array of Data, 32&nbsp;bytes each | Optional | Array of topics by which to [filter logs](../../concepts/events-and-logs.md#topic-filters). |

[`eth_getLogs`](index.md#eth_getlogs) and [`priv_getLogs`](index.md#priv_getlogs) have an extra key.

| Key | Type | Required/Optional | Value |
| --- | :-: | :-: | --- |
| `blockHash` | Data, 32&nbsp;bytes | Optional. | Hash of block for which to return logs. If you specify `blockHash`, you cannot specify `fromBlock` and `toBlock`. |

## Log object

Returned by [`eth_getFilterChanges`](index.md#eth_getfilterchanges) and [`priv_getLogs`](../../../private-networks/reference/api/index.md#priv_getlogs). [`Transaction receipt objects`](#transaction-receipt-object) can contain an array of log objects.

| Key | Type | Value |
| --- | :-: | --- |
| `removed` | Tag | `true` if log removed because of a chain reorganization. `false` if a valid log. |
| `logIndex` | Quantity, Integer | Log index position in the block. `null` when log is pending. |
| `transactionIndex` | Quantity, Integer | Index position of the starting transaction for the log. `null` when log is pending. |
| `transactionHash` | Data, 32&nbsp;bytes | Hash of the starting transaction for the log. `null` when log is pending. |
| `blockHash` | Data, 32&nbsp;bytes | Hash of the block that includes the log. `null` when log is pending. |
| `blockNumber` | Quantity | Number of block that includes the log. `null` when log is pending. |
| `address` | Data, 20&nbsp;bytes | Address the log originated from. |
| `data` | Data | Non-indexed arguments of the log. |
| `topics` | Array of Data, 32&nbsp;bytes each | [Event signature hash](../../concepts/events-and-logs.md#event-signature-hash) and 0 to 3 [indexed log arguments](../../concepts/events-and-logs.md#event-parameters). |

## Miner data object

Returned by [`eth_getMinerDataByBlockHash`](index.md#eth_getminerdatabyblockhash) and [`eth_getMinerDataByBlockNumber`](index.md#eth_getminerdatabyblocknumber).

| Key | Type | Value |
| --- | :-: | --- |
| `netBlockReward` | Quantity, Integer | The net block reward, in Wei, is `staticBlockReward + transactionFee + uncleInclusionReward`. |
| `staticBlockReward` | Quantity, Integer | The static block reward, in Wei, is preset on a hard fork. |
| `transactionFee` | Quantity, Integer | The transaction fee, in Wei, is `sum of upfront cost - refund amount for all transactions`. |
| `uncleInclusionReward` | Quantity, Integer | The uncle inclusion reward, in Wei, is `static block reward * number of ommers/32`. |
| `uncleRewards` | Map | Map of uncle block hashes and uncle miner coinbase addresses. |
| `coinbase` | Data, 20&nbsp;bytes | Coinbase address. |
| `extraData` | Data | Extra data field for this block. The first 32 bytes is vanity data you can set using the [`--miner-extra-data`](../cli/options.md#miner-extra-data) command line option. |
| `difficulty` | Quantity, Integer | Difficulty of this block. |
| `totalDifficulty` | Quantity, Integer | Total difficulty of the chain until this block. |

## Pending transaction object

Returned by [`txpool_besuPendingTransactions`](index.md#txpool_besupendingtransactions).

| Key | Type | Value |
| --- | :-: | --- |
| `accessList` | Array | (Optional) List of addresses and storage keys the transaction plans to access. Used in [`ACCESS_LIST` transactions](../../concepts/transactions/types.md#access_list-transactions) and may be used in [`EIP1559` transactions](../../concepts/transactions/types.md#eip1559-transactions). |
| `from` | Data, 20&nbsp;bytes | Address of the sender. |
| `gas` | Quantity | Gas provided by the sender. |
| `gasPrice` | Quantity | (Optional) Gas price, in Wei, provided by the sender. Not used only in [`EIP1559` transactions](../../concepts/transactions/types.md#eip1559-transactions). |
| `maxPriorityFeePerGas` | Quantity, Integer | (Optional) Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. Used only in [`EIP1559` transactions](../../concepts/transactions/types.md#eip1559-transactions). |
| `maxFeePerGas` | Quantity, Integer | (Optional) Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. Used only in [`EIP1559` transactions](../../concepts/transactions/types.md#eip1559-transactions). |
| `hash` | Data, 32&nbsp;bytes | Hash of the transaction. |
| `input` | Data | Data sent with the transaction to create or invoke a contract. |
| `nonce` | Quantity | Number of transactions made by the sender before this one. |
| `to` | Data, 20&nbsp;bytes | Address of the receiver. `null` if a contract creation transaction. |
| `transactionType` | String | [Transaction type](../../concepts/transactions/types.md). |
| `value` | Quantity | Value transferred, in Wei. |
| `v` | Quantity | ECDSA Recovery ID. |
| `r` | Data, 32&nbsp;bytes | ECDSA signature r. |
| `s` | Data, 32&nbsp;bytes | ECDSA signature s. |

## Range object

Returned by [`debug_storageRangeAt`](index.md#debug_storagerangeat).

| Key | Type | Value |
| --- | :-: | --- |
| `storage` | Object | Key hash and value. Pre-image key is `null` if it falls outside the cache. |
| `nextKey` | Hash | Hash of next key if further storage in range. Otherwise, not included. |

### Structured log object

Log information returned as part of the [Trace object](#trace-object).

| Key | Type | Value |
| --- | :-: | --- |
| `pc` | Integer | Current program counter. |
| `op` | String | Current OpCode. |
| `gas` | Integer | Gas remaining. |
| `gasCost` | Integer | Cost in wei of each gas unit. |
| `depth` | Integer | Execution depth. |
| `exceptionalHaltReasons` | Array | One or more strings representing an error condition causing the EVM execution to terminate. These strings suggest that EVM execution terminated for reasons such as running out of gas or attempting to execute an unknown instruction. Generally a single exceptional halt reason returns but it's possible for more than one to occur at once. |
| `stack` | Array of 32&nbsp;byte arrays | EVM execution stack before executing current operation. |
| `memory` | Array of 32&nbsp;byte arrays | Memory space of the contract before executing current operation. |
| `storage` | Object | Storage entries changed by the current transaction. |

## Trace object

Returned by [`debug_traceBlock`](index.md#debug_traceblock), [`debug_traceBlockByHash`](index.md#debug_traceblockbyhash), [`debug_traceBlockByNumber`](index.md#debug_traceblockbynumber), and [`debug_traceTransaction`](index.md#debug_tracetransaction).

| Key | Type | Value |
| --- | :-: | --- |
| `gas` | Integer | Gas used by the transaction. |
| `failed` | Boolean | True if transaction failed, otherwise, false. |
| `returnValue` | String | Bytes returned from transaction execution (without a `0x` prefix). |
| `structLogs` | Array | Array of structured log objects. |

## Trace filter options object

Parameter for [`trace_filter`](index.md#trace_filter). All parameters are optional.

| Key | Type | Value |
| --- | :-: | --- |
| `fromBLock` | String &#124; Tag | Trace starts at this block. |
| `toBlock` | String &#124; Tag | Trace stops at this block. |
| `fromAddress` | String | Include only traces sent from this address. |
| `toAddress` | String | Include only traces with this destination address. |
| `after` | Quantity | The offset trace number. |
| `count` | Integer | Number of traces to display in a batch. |

## Transaction object

Returned by [`eth_getTransactionByHash`](index.md#eth_gettransactionbyhash), [`eth_getTransactionByBlockHashAndIndex`](index.md#eth_gettransactionbyblockhashandindex), and [`eth_getTransactionByBlockNumberAndIndex`](index.md#eth_gettransactionbyblocknumberandindex).

| Key | Type | Value |
| --- | :-: | --- |
| `accessList` | Array | (Optional) List of addresses and storage keys the transaction plans to access. Used in [`ACCESS_LIST` transactions](../../concepts/transactions/types.md#access_list-transactions) and may be used in [`EIP1559` transactions](../../concepts/transactions/types.md#eip1559-transactions). |
| `blockHash` | Data, 32&nbsp;bytes | Hash of the block containing this transaction. `null` when transaction is pending. |
| `blockNumber` | Quantity | Block number of the block containing this transaction. `null` when transaction is pending. |
| `chainId` | Quantity | [Chain ID](../../concepts/network-and-chain-id.md). |
| `from` | Data, 20&nbsp;bytes | Address of the sender. |
| `gas` | Quantity | Gas provided by the sender. |
| `gasPrice` | Quantity | (Optional) Gas price, in Wei, provided by the sender. Used only in non-[`EIP1559`](../../concepts/transactions/types.md#eip1559-transactions) transactions. |
| `maxPriorityFeePerGas` | Quantity, Integer | (Optional) Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. Used only in [`EIP1559` transactions](../../concepts/transactions/types.md#eip1559-transactions). |
| `maxFeePerGas` | Quantity, Integer | (Optional) Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. Used only in [`EIP1559` transactions](../../concepts/transactions/types.md#eip1559-transactions). |
| `hash` | Data, 32&nbsp;bytes | Hash of the transaction. |
| `input` | Data | Data sent with the transaction to create or invoke a contract. For [private transactions](../../../private-networks/concepts/privacy/index.md), it's a pointer to the transaction location in [Tessera](https://docs.tessera.consensys.net/). |
| `nonce` | Quantity | Number of transactions made by the sender before this one. |
| `to` | Data, 20&nbsp;bytes | Address of the receiver. `null` if a contract creation transaction. |
| `transactionIndex` | Quantity, Integer | Index position of the transaction in the block. `null` when transaction is pending. |
| `transactionType` | String | [Transaction type](../../concepts/transactions/types.md). |
| `value` | Quantity | Value transferred, in Wei. |
| `v` | Quantity | ECDSA Recovery ID. |
| `r` | Data, 32&nbsp;bytes | ECDSA signature r. |
| `s` | Data, 32&nbsp;bytes | ECDSA signature s. |

## Transaction call object

Parameter for [`eth_call`](index.md#eth_call), [`eth_createAccessList`](index.md#eth_createAccessList), and [`eth_estimateGas`](index.md#eth_estimategas).

All transaction call object parameters are optional.

| Key | Type | Value |
| --- | :-: | --- |
| `from` | Data, 20&nbsp;bytes | Address of the sender. |
| `to` | Data, 20&nbsp;bytes | Address of the action receiver. |
| `gas` | Quantity, Integer | Gas provided by the sender. `eth_call` consumes zero gas, but other executions might need this parameter. `eth_estimateGas` ignores this value. |
| `gasPrice` | Quantity, Integer | Gas price, in Wei, provided by the sender. The default is `0`. Used only in non-[`EIP1559`](../../concepts/transactions/types.md#eip1559-transactions) transactions. |
| `maxPriorityFeePerGas` | Quantity, Integer | Maximum fee, in Wei, the sender is willing to pay per gas above the base fee. Can be used only in [`EIP1559` transactions](../../concepts/transactions/types.md#eip1559-transactions). If used, must specify `maxFeePerGas`. |
| `maxFeePerGas` | Quantity, Integer | Maximum total fee (base fee + priority fee), in Wei, the sender is willing to pay per gas. Can be used only in [`EIP1559` transactions](../../concepts/transactions/types.md#eip1559-transactions). If used, must specify `maxPriorityFeePerGas`. |
| `value` | Quantity, Integer | Value transferred, in Wei. |
| `data` | Data | Hash of the method signature and encoded parameters. For details, see [Ethereum Contract ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html). |
| `accessList` | Array | List of addresses and storage keys that the transaction plans to access. Used only in non-[`FRONTIER`](../../concepts/transactions/types.md#frontier-transactions) transactions. |
| `strict` | Tag | If `true`, checks that the `from` account’s ether balance is sufficient to cover the transaction and gas fee. If `false`, the `gasPrice` and `baseFee` are set to zero, in order to simulate a transaction without enforcing a balance check. The default is `false`. |

## Transaction receipt object

Returned by [`eth_getTransactionReceipt`](index.md#eth_gettransactionreceipt).

| Key | Type | Value |
| --- | :-: | --- |
| `blockHash` | Data, 32&nbsp;bytes | Hash of block containing this transaction. |
| `blockNumber` | Quantity | Block number of block containing this transaction. |
| `contractAddress` | Data, 20&nbsp;bytes | Contract address created, if contract creation transaction, otherwise, `null`. A failed contract creation transaction still produces a contract address value. |
| `cumulativeGasUsed` | Quantity | Total amount of gas used by previous transactions in the block and this transaction. |
| `effectiveGasPrice` | Quantity | The [actual value per gas deducted](../../concepts/transactions/types.md#eip1559-transactions) from the sender's account. |
| `from` | Data, 20&nbsp;bytes | Address of the sender. |
| `gasUsed` | Quantity | Amount of gas used by this specific transaction. |
| `logs` | Array | Array of [log objects](#log-object) generated by this transaction. |
| `logsBloom` | Data, 256&nbsp;bytes | Bloom filter for light clients to quickly retrieve related logs. |
| `status` | Quantity | Either `0x0` (failure), `0x1` (success), or `0x2` (invalid). |
| `to` | Data, 20&nbsp;bytes | Address of the receiver, if sending ether, otherwise, null. |
| `transactionHash` | Data, 32&nbsp;bytes | Hash of the transaction. |
| `transactionIndex` | Quantity, Integer | Index position of transaction in the block. |
| `transactionType` | String | [Transaction type](../../concepts/transactions/types.md). |
| `revertReason` | String | ABI-encoded string that displays the [reason for reverting the transaction](../../../private-networks/how-to/send-transactions/revert-reason.md). Only available if revert reason is [enabled](../cli/options.md#revert-reason-enabled). |
| `type` | Quantity | Transaction type, `0x00` for legacy transactions, `0x01` for access list types, `0x02` for dynamic fees. |

:::note

For pre-Byzantium transactions, the transaction receipt object includes the following instead of `status`:

| Key    |        Type         | Value                       |
| ------ | :-----------------: | --------------------------- |
| `root` | Data, 32&nbsp;bytes | Post-transaction state root |

:::

## Transaction trace object

Returned by [`trace_replayBlockTransactions`](index.md#trace_replayblocktransactions).

| Key | Type | Value |
| --- | :-: | --- |
| `output` | Boolean | Transaction result. 1 for success and 0 for failure. |
| `stateDiff` | Object | [State changes in the requested block](../trace-types.md#statediff). |
| `trace` | Array | [Ordered list of calls to other contracts](../trace-types.md#trace). |
| `vmTrace` | Object | [Ordered list of EVM actions](../trace-types.md#vmtrace). |
| `transactionHash` | Data, 32&nbsp;bytes | Hash of the replayed transaction. |
