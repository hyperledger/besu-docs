---
description: Hyperledger Besu private network JSON-RPC API methods reference
toc_max_heading_level: 3
tags:
  - private networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Private network API methods

:::caution Important

- This reference contains API methods that apply to only private networks. For API methods that apply to both private and public networks, see the [public network API reference](../../../public-networks/reference/api/index.md).
- All JSON-RPC HTTP examples use the default host and port endpoint `http://127.0.0.1:8545`. If using the [--rpc-http-host](../../../public-networks/reference/cli/options.md#rpc-http-host) or [--rpc-http-port](../../../public-networks/reference/cli/options.md#rpc-http-port) options, update the endpoint.

:::

## `CLIQUE` methods

The `CLIQUE` API methods provide access to the [Clique](../../how-to/configure/consensus/clique.md) consensus engine.

:::note

The `CLIQUE` API methods are not enabled by default for JSON-RPC. To enable the `CLIQUE` API methods use the [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api) or [`--rpc-ws-api`](../../../public-networks/reference/cli/options.md#rpc-ws-api) options.

:::

### `clique_discard`

Discards a proposal to [add or remove a signer with the specified address].

#### Parameters

`address`: _string_ - 20-byte address of proposed signer

#### Returns

`result`: _boolean_ - indicates if the proposal is discarded

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"clique_discard","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"clique_discard","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

</TabItem>

</Tabs>

### `clique_getSigners`

Lists [signers for the specified block].

#### Parameters

`blockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one of the
string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
[block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

:::note
`pending` returns the same value as `latest`.
:::

#### Returns

`result`: _array_ of _string_ - list of 20-byte addresses of signers

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"clique_getSigners","params":["latest"], "id":1}' http://127.0.0.1:8545
    ```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

    ```bash
    {"jsonrpc":"2.0","method":"clique_getSigners","params":["latest"], "id":1}
    ```

</TabItem>

<TabItem value="JSON result" label="JSON result">

    ```json
    {
        "jsonrpc" : "2.0",
        "id" : 1,
        "result" : [ "0x42eb768f2244c8811c63729a21a3569731535f06", "0x7ffc57839b00206d1ad20c69a1981b489f772031", "0xb279182d99e65703f0076e4812653aab85fca0f0" ]
    }
    ```
</TabItem>
</Tabs>

### `clique_getSignerMetrics`

Provides the following validator metrics for the specified range:

- Number of blocks from each validator

- Block number of the last block proposed by each validator (if any proposed in the specified range)

- All validators present in the last block

#### Parameters

- `fromBlockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one
  of the string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
  [block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

- `toBlockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one of
  the string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
  [block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

:::note
`pending` returns the same value as `latest`.
:::

If you specify:

- No parameters, the call provides metrics for the last 100 blocks, or all blocks if there are less than 100 blocks.

- Only the first parameter, the call provides metrics for all blocks from the block specified to the latest block.

#### Returns

`result`: _array_ of _objects_ - list of validator objects

:::note

The proposer of the genesis block has address `0x0000000000000000000000000000000000000000`.

:::

<Tabs>

<TabItem value="curl HTTP" label="curl HTTP" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"clique_getSignerMetrics","params":["1", "100"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS" label="wscat WS">

```bash
{"jsonrpc":"2.0","method":"clique_getSignerMetrics","params":["1", "100"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "address": "0x7ffc57839b00206d1ad20c69a1981b489f772031",
      "proposedBlockCount": "0x21",
      "lastProposedBlockNumber": "0x61"
    },
    {
      "address": "0x42eb768f2244c8811c63729a21a3569731535f06",
      "proposedBlockCount": "0x21",
      "lastProposedBlockNumber": "0x63"
    },
    {
      "address": "0xb279182d99e65703f0076e4812653aab85fca0f0",
      "proposedBlockCount": "0x21",
      "lastProposedBlockNumber": "0x62"
    }
  ]
}
```
</TabItem>
</Tabs>

### `clique_getSignersAtHash`

Lists signers for the specified block.

#### Parameters

`hash`: _string_ - 32-byte block hash

#### Returns

`result`: _array_ of _string_ - list of 20-byte addresses of signers

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"clique_getSignersAtHash","params":["0x98b2ddb5106b03649d2d337d42154702796438b3c74fd25a5782940e84237a48"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"clique_getSignersAtHash","params":["0x98b2ddb5106b03649d2d337d42154702796438b3c74fd25a5782940e84237a48"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x42eb768f2244c8811c63729a21a3569731535f06",
    "0x7ffc57839b00206d1ad20c69a1981b489f772031",
    "0xb279182d99e65703f0076e4812653aab85fca0f0"
  ]
}
```

</TabItem>

</Tabs>

### `clique_proposals`

Returns [current proposals](../../how-to/configure/consensus/clique.md#add-and-remove-signers).

#### Parameters

None

#### Returns

`result`: _map_ of _strings_ to _booleans_ - map of account addresses to corresponding boolean values indicating the proposal for each account (if `true`, the proposal is to add a signer; if `false`, the proposal is to remove a signer.)

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"clique_proposals","params":[], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"clique_proposals","params":[], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "0x42eb768f2244c8811c63729a21a3569731535f07": false,
    "0x12eb759f2222d7711c63729a45c3585731521d01": true
  }
}
```

</TabItem>

</Tabs>

### `clique_propose`

Proposes to [add or remove a signer with the specified address].

#### Parameters

- `address`: _string_ - 20-byte address

- `proposal`: _boolean_ - `true` to propose adding signer or `false` to propose removing signer

#### Returns

`result`: _boolean_ - `true`

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"clique_propose","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", true], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"clique_propose","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", true], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

</TabItem>

</Tabs>

## `EEA` methods

The `EEA` API methods provide functionality for [private transactions](../../concepts/privacy/private-transactions/index.md) and [privacy groups](../../concepts/privacy/privacy-groups.md).

:::note

The `EEA` API methods are not enabled by default for JSON-RPC. To enable the `EEA` API methods, use the [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api) or [`--rpc-ws-api`](../../../public-networks/reference/cli/options.md#rpc-ws-api) options.

:::

### `eea_sendRawTransaction`

Distributes the [private transaction](../../how-to/send-transactions/private-transactions.md), generates the [privacy marker transaction](../../concepts/privacy/private-transactions/processing.md) and submits it to the transaction pool, and returns the transaction hash of the [privacy marker transaction](../../concepts/privacy/private-transactions/processing.md).

The signed transaction passed as an input parameter includes the `privateFrom`, [`privateFor` or `privacyGroupId`](../../how-to/send-transactions/private-transactions.md#eea-compliant-or-besu-extended-privacy), and `restriction` fields.

The `gas` and `gasPrice` are used by the [privacy marker transaction](../../concepts/privacy/private-transactions/processing.md) not the private transaction itself.

To avoid exposing your private key, create signed transactions offline and send the signed transaction data using `eea_sendRawTransaction`.

:::important

For production systems requiring private transactions, use a network with a consensus mechanism supporting transaction finality to make sure the private state does not become inconsistent with the chain. For example, [IBFT 2.0](../../how-to/configure/consensus/ibft.md) and [QBFT](../../how-to/configure/consensus/qbft.md) provide the required finality.

Using private transactions with [pruning](../../../public-networks/concepts/data-storage-formats.md#pruning) or [fast sync](../../../public-networks/reference/cli/options.md#sync-mode) isn't supported.

:::

#### Parameters

`transaction`: _string_ - signed RLP-encoded private transaction

#### Returns

`result`: _string_ - 32-byte transaction hash of the [privacy marker transaction](../../concepts/privacy/private-transactions/processing.md)

:::tip

If creating a contract, use [priv_getTransactionReceipt](#priv_gettransactionreceipt) to retrieve the contract address after the transaction is finalized.

:::

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"eea_sendRawTransaction","params": ["0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"eea_sendRawTransaction","params": ["0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

</TabItem>

</Tabs>

## `IBFT` 2.0 methods

The `IBFT` API methods provide access to the [IBFT 2.0](../../how-to/configure/consensus/ibft.md) consensus engine.

:::note

The `IBFT` API methods are not enabled by default for JSON-RPC. To enable the `IBFT` API methods, use the [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api) or [`--rpc-ws-api`](../../../public-networks/reference/cli/options.md#rpc-ws-api) options.

:::

### `ibft_discardValidatorVote`

Discards a proposal to [add or remove a validator] with the specified address.

#### Parameters

`address`: _string_ - 20-byte address of proposed validator

#### Returns

`result`: _boolean_ - indicates if the proposal is discarded

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_discardValidatorVote","params":["0xef1bfb6a12794615c9b0b5a21e6741f01e570185"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"ibft_discardValidatorVote","params":["0xef1bfb6a12794615c9b0b5a21e6741f01e570185"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

</TabItem>

</Tabs>

### `ibft_getPendingVotes`

Returns [votes](../../how-to/configure/consensus/ibft.md#add-and-remove-validators) cast in the current [epoch](../../how-to/configure/consensus/ibft.md#genesis-file).

#### Parameters

None

#### Returns

`result`: _map_ of _strings_ to _booleans_ - map of account addresses to corresponding boolean values indicating the vote for each account; if `true`, the vote is to add a validator. If `false`, the proposal is to remove a validator.

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_getPendingVotes","params":[], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"ibft_getPendingVotes","params":[], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "0xef1bfb6a12794615c9b0b5a21e6741f01e570185": true,
    "0x42d4287eac8078828cf5f3486cfe601a275a49a5": true
  }
}
```

</TabItem>

</Tabs>

### `ibft_getSignerMetrics`

Provides the following validator metrics for the specified range:

- Number of blocks from each validator

- Block number of the last block proposed by each validator (if any proposed in the specified range)

- All validators present in the last block of the range

#### Parameters

- `fromBlockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one
  of the string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
  [block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

- `toBlockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one of
  the string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
  [block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

:::note
`pending` returns the same value as `latest`.
:::

If you specify:

- No parameters, the call provides metrics for the last 100 blocks, or all blocks if there are less than 100 blocks.

- Only the first parameter, the call provides metrics for all blocks from the block specified to the latest block.

#### Returns

`result`: _array_ of _objects_ - list of validator objects

:::note

The proposer of the genesis block has address `0x0000000000000000000000000000000000000000`.

:::

<Tabs>

<TabItem value="curl HTTP" label="curl HTTP" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_getSignerMetrics","params":["1", "100"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS" label="wscat WS">

```bash
{"jsonrpc":"2.0","method":"ibft_getSignerMetrics","params":["1", "100"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "address": "0x7ffc57839b00206d1ad20c69a1981b489f772031",
      "proposedBlockCount": "0x21",
      "lastProposedBlockNumber": "0x61"
    },
    {
      "address": "0x42eb768f2244c8811c63729a21a3569731535f06",
      "proposedBlockCount": "0x21",
      "lastProposedBlockNumber": "0x63"
    },
    {
      "address": "0xb279182d99e65703f0076e4812653aab85fca0f0",
      "proposedBlockCount": "0x21",
      "lastProposedBlockNumber": "0x62"
    }
  ]
}
```

</TabItem>

</Tabs>

### `ibft_getValidatorsByBlockHash`

Lists the validators defined in the specified block.

#### Parameters

`block`: _string_ - 32-byte block hash

#### Returns

`result`: _array_ of _strings_ - list of validator addresses

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_getValidatorsByBlockHash","params":["0xbae7d3feafd743343b9a4c578cab5e5d65eb735f6855fb845c00cab356331256"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"ibft_getValidatorsByBlockHash","params":["0xbae7d3feafd743343b9a4c578cab5e5d65eb735f6855fb845c00cab356331256"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x42d4287eac8078828cf5f3486cfe601a275a49a5",
    "0xb1b2bc9582d2901afdc579f528a35ca41403fa85",
    "0xef1bfb6a12794615c9b0b5a21e6741f01e570185"
  ]
}
```

</TabItem>

</Tabs>

### `ibft_getValidatorsByBlockNumber`

Lists the validators defined in the specified block.

#### Parameters

`blockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one of the
string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
[block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

:::note
`pending` returns the same value as `latest`.
:::

#### Returns

`result`: _array_ of _strings_ - list of validator addresses

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_getValidatorsByBlockNumber","params":["latest"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"ibft_getValidatorsByBlockNumber","params":["latest"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x42d4287eac8078828cf5f3486cfe601a275a49a5",
    "0xb1b2bc9582d2901afdc579f528a35ca41403fa85",
    "0xef1bfb6a12794615c9b0b5a21e6741f01e570185"
  ]
}
```

</TabItem>

</Tabs>

### `ibft_proposeValidatorVote`

Proposes to [add or remove a validator] with the specified address.

#### Parameters

- `address`: _string_ - account address

- `proposal`: _boolean_ - `true` to propose adding validator or `false` to propose removing validator

#### Returns

`result`: _boolean_ - `true`

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_proposeValidatorVote","params":["42d4287eac8078828cf5f3486cfe601a275a49a5",true], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"ibft_proposeValidatorVote","params":["42d4287eac8078828cf5f3486cfe601a275a49a5",true], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

</TabItem>

</Tabs>

## `PERM` (Permissioning) methods

The `PERM` API methods provide permissioning functionality. Use these methods for [local permissioning](../../how-to/use-permissioning/local.md) only.

:::important

The `PERM` API methods are not enabled by default for JSON-RPC. To enable the `PERM` API methods, use the [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api) or [`--rpc-ws-api`](../../../public-networks/reference/cli/options.md#rpc-ws-api) CLI options.

:::

### `perm_addAccountsToAllowlist`

Adds accounts (participants) to the [accounts permission list](../../how-to/use-permissioning/local.md#account-permissioning).

#### Parameters

`addresses`: _array_ of _strings_ - list of account addresses

:::note

The parameters list contains a list which is why the account addresses are enclosed by double square brackets.

:::

#### Returns

`result`: _string_ - `Success` or `error` (errors include attempting to add accounts already on the allowlist and including invalid account addresses.)

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"perm_addAccountsToAllowlist","params":[["0xb9b81ee349c3807e46bc71aa2632203c5b462032", "0xb9b81ee349c3807e46bc71aa2632203c5b462034"]], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"perm_addAccountsToAllowlist","params":[["0xb9b81ee349c3807e46bc71aa2632203c5b462032", "0xb9b81ee349c3807e46bc71aa2632203c5b462034"]], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "Success"
}
```

</TabItem>

</Tabs>

### `perm_addNodesToAllowlist`

Adds nodes to the [nodes allowlist](../../how-to/use-permissioning/local.md#node-allowlisting).

To use domain names in enode URLs, ensure you [enable DNS support](../../../public-networks/concepts/node-keys.md#domain-name-support) to avoid receiving a `request contains an invalid node` error.

:::warning

Enode URL domain name support is an early access feature.

:::

#### Parameters

`enodes`: _array_ of _strings_ - list of [enode URLs](../../../public-networks/concepts/node-keys.md#enode-url)

:::note

The parameters list contains a list which is why the enode URLs are enclosed by double square brackets.

:::

#### Returns

`result`: _string_ - `Success` or `error`; errors include attempting to add nodes already on the allowlist or including invalid enode URLs.

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"perm_addNodesToAllowlist","params":[["enode://7e4ef30e9ec683f26ad76ffca5b5148fa7a6575f4cfad4eb0f52f9c3d8335f4a9b6f9e66fcc73ef95ed7a2a52784d4f372e7750ac8ae0b544309a5b391a23dd7@127.0.0.1:30303","enode://2feb33b3c6c4a8f77d84a5ce44954e83e5f163e7a65f7f7a7fec499ceb0ddd76a46ef635408c513d64c076470eac86b7f2c8ae4fcd112cb28ce82c0d64ec2c94@127.0.0.1:30304"]], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"perm_addNodesToAllowlist","params":[["enode://7e4ef30e9ec683f26ad76ffca5b5148fa7a6575f4cfad4eb0f52f9c3d8335f4a9b6f9e66fcc73ef95ed7a2a52784d4f372e7750ac8ae0b544309a5b391a23dd7@127.0.0.1:30303","enode://2feb33b3c6c4a8f77d84a5ce44954e83e5f163e7a65f7f7a7fec499ceb0ddd76a46ef635408c513d64c076470eac86b7f2c8ae4fcd112cb28ce82c0d64ec2c94@127.0.0.1:30304"]], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "Success"
}
```

</TabItem>

</Tabs>

### `perm_getAccountsAllowlist`

Lists accounts (participants) in the [accounts permissions list](../../how-to/use-permissioning/local.md#account-permissioning).

#### Parameters

None

#### Returns

`result`: _array_ of _strings_ - list of accounts (participants) in the accounts allowlist

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"perm_getAccountsAllowlist","params":[], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"perm_getAccountsAllowlist","params":[], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x0000000000000000000000000000000000000009",
    "0xb9b81ee349c3807e46bc71aa2632203c5b462033"
  ]
}
```

</TabItem>

</Tabs>

### `perm_getNodesAllowlist`

Lists nodes in the [nodes allowlist](../../how-to/use-permissioning/local.md#node-allowlisting).

#### Parameters

None

#### Returns

`result`: _array_ of _strings_ - [enode URLs](../../../public-networks/concepts/node-keys.md#enode-url) of nodes in the nodes allowlist

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"perm_getNodesAllowlist","params":[], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"perm_getNodesAllowlist","params":[], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "enode://7b61d5ee4b44335873e6912cb5dd3e3877c860ba21417c9b9ef1f7e500a82213737d4b269046d0669fb2299a234ca03443f25fe5f706b693b3669e5c92478ade@127.0.0.1:30305",
    "enode://2feb33b3c6c4a8f77d84a5ce44954e83e5f163e7a65f7f7a7fec499ceb0ddd76a46ef635408c513d64c076470eac86b7f2c8ae4fcd112cb28ce82c0d64ec2c94@127.0.0.1:30304"
  ]
}
```

</TabItem>

</Tabs>

### `perm_reloadPermissionsFromFile`

Reloads the accounts and nodes allowlists from the [permissions configuration file].

#### Parameters

None

#### Returns

`result`: _string_ - `Success`, or `error` if the permissions configuration file is not valid

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"perm_reloadPermissionsFromFile","params":[], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"perm_reloadPermissionsFromFile","params":[], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "Success"
}
```

</TabItem>

</Tabs>

### `perm_removeAccountsFromAllowlist`

Removes accounts (participants) from the [accounts permissions list](../../how-to/use-permissioning/local.md#account-permissioning).

#### Parameters

`addresses`: _array_ of _strings_ - list of account addresses

:::note

The parameters list contains a list which is why the account addresses are enclosed by double square brackets.

:::

#### Returns

`result`: _string_ - `Success` or `error` (errors include attempting to remove accounts not on the allowlist and including invalid account addresses.)

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"perm_removeAccountsFromAllowlist","params":[["0xb9b81ee349c3807e46bc71aa2632203c5b462032", "0xb9b81ee349c3807e46bc71aa2632203c5b462034"]], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"perm_removeAccountsFromAllowlist","params":[["0xb9b81ee349c3807e46bc71aa2632203c5b462032", "0xb9b81ee349c3807e46bc71aa2632203c5b462034"]], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "Success"
}
```

</TabItem>

</Tabs>

### `perm_removeNodesFromAllowlist`

Removes nodes from the [nodes allowlist](../../how-to/use-permissioning/local.md#node-allowlisting).

#### Parameters

`enodes`: _array_ of _strings_ - list of [enode URLs](../../../public-networks/concepts/node-keys.md#enode-url)

:::note

The parameters list contains a list which is why the enode URLs are enclosed by double square brackets.

:::

#### Returns

`result`: _string_ - `Success` or `error` (errors include attempting to remove nodes not on the allowlist and including invalid enode URLs.)

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"perm_removeNodesFromAllowlist","params":[["enode://7e4ef30e9ec683f26ad76ffca5b5148fa7a6575f4cfad4eb0f52f9c3d8335f4a9b6f9e66fcc73ef95ed7a2a52784d4f372e7750ac8ae0b544309a5b391a23dd7@127.0.0.1:30303","enode://2feb33b3c6c4a8f77d84a5ce44954e83e5f163e7a65f7f7a7fec499ceb0ddd76a46ef635408c513d64c076470eac86b7f2c8ae4fcd112cb28ce82c0d64ec2c94@127.0.0.1:30304"]], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"perm_removeNodesFromAllowlist","params":[["enode://7e4ef30e9ec683f26ad76ffca5b5148fa7a6575f4cfad4eb0f52f9c3d8335f4a9b6f9e66fcc73ef95ed7a2a52784d4f372e7750ac8ae0b544309a5b391a23dd7@127.0.0.1:30303","enode://2feb33b3c6c4a8f77d84a5ce44954e83e5f163e7a65f7f7a7fec499ceb0ddd76a46ef635408c513d64c076470eac86b7f2c8ae4fcd112cb28ce82c0d64ec2c94@127.0.0.1:30304"]], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "Success"
}
```

</TabItem>

</Tabs>

## `PRIV` methods

The `PRIV` API methods provide functionality for [private transactions](../../concepts/privacy/private-transactions/index.md) and [privacy groups](../../concepts/privacy/privacy-groups.md).

:::note

The `PRIV` API methods are not enabled by default for JSON-RPC. To enable the `PRIV` API methods, use the [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api) or [`--rpc-ws-api`](../../../public-networks/reference/cli/options.md#rpc-ws-api) options.

:::

### `priv_call`

Invokes a private contract function locally and does not change the privacy group state.

For private contracts, `priv_call` is the same as [`eth_call`](../../../public-networks/reference/api/index.md#eth_call) for public contracts.

#### Parameters

- `privacyGroupId`: _string_ - 32-byte [privacy Group ID](../../concepts/privacy/privacy-groups.md)

- `call`: _object_ - [transaction call object](../../../public-networks/reference/api/objects.md#transaction-call-object)

- `blockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one of the
  string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
  [block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

  :::note
  `pending` returns the same value as `latest`.
  :::

#### Returns

`result`: _data_ - return value of the executed contract

<Tabs>

<TabItem value="curl HTTP" label="curl HTTP" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"priv_call","params":["tb8NVyQqZnHNegf/3mYsyB+HEud4SPWn90rz3GoskRw=", {"to":"0x69498dd54bd25aa0c886cf1f8b8ae0856d55ff13","data": "0x3fa4f245"}, "latest"],"id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS" label="wscat WS">

```bash
{"jsonrpc":"2.0","method":"priv_call","params":["tb8NVyQqZnHNegf/3mYsyB+HEud4SPWn90rz3GoskRw=", {"to":"0x69498dd54bd25aa0c886cf1f8b8ae0856d55ff13","data": "0x3fa4f245"}, "latest"],"id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x0000000000000000000000000000000000000000000000000000000000000001"
}
```

</TabItem>

<TabItem value="curl GraphQL" label="curl GraphQL">

```bash
curl -X POST -H "Content-Type: application/json" --data '{ "query": "{block {number call (data : {from : \"0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b\", to: \"0x69498dd54bd25aa0c886cf1f8b8ae0856d55ff13\", data :\"0x12a7b914\"}){data status}}}"}' http://localhost:8547/graphql
```

</TabItem>

<TabItem value="GraphQL" label="GraphQL">

```bash
{
    block {
    number
    call(data: {from: "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b", to: "0x69498dd54bd25aa0c886cf1f8b8ae0856d55ff13", data: "0x12a7b914"}) {
        data
        status
    }
    }
}
```

</TabItem>

<TabItem value="GraphQL result" label="GraphQL result">

```json
{
  "data": {
    "block": {
      "number": 17449,
      "call": {
        "data": "0x",
        "status": 1
      }
    }
  }
}
```

</TabItem>

</Tabs>

### `priv_createPrivacyGroup`

Creates a group of nodes, specified by their [Tessera](https://docs.tessera.consensys.net/) public key.

#### Parameters

`options`: _object_ - request options object with the following fields:

- `addresses`: _array_ of _strings_ - list of nodes specified by [Tessera](https://docs.tessera.consensys.net/) public keys

- `name`: _string_ - (optional) privacy group name

- `description`: _string_ - (optional) privacy group description

#### Returns

`result`: _string_ - privacy group ID

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method": "priv_createPrivacyGroup", "params": [{"addresses":["sTZpbQhcOfd9ZaFDnC00e/N2Ofv9p4/ZTBbEeVtXJ3E=","quhb1pQPGN1w8ZSZSyiIfncEAlVY/M/rauSyQ5wVMRE="],"name":"Group A","description":"Description Group A"}],"id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method": "priv_createPrivacyGroup", "params": [{"addresses":["sTZpbQhcOfd9ZaFDnC00e/N2Ofv9p4/ZTBbEeVtXJ3E=","quhb1pQPGN1w8ZSZSyiIfncEAlVY/M/rauSyQ5wVMRE="],"name":"Group A","description":"Description Group A"}],"id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "ewuTVoc5nlvWMwTFdRRK/wvV0dcyQo/Pauvx5bNEbTk="
}
```

</TabItem>

</Tabs>

### `priv_debugGetStateRoot`

Returns the state root of the specified privacy group at the specified block.

#### Parameters

- `privacyGroupId`: _string_ - 32-byte [privacy Group ID](../../concepts/privacy/privacy-groups.md)

- `blockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one of the
  string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
  [block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

  :::note
  `pending` returns the same value as `latest`.
  :::

#### Returns

`result`: _string_ - 32-byte state root

<Tabs>

<TabItem value="curl HTTP" label="curl HTTP" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"priv_debugGetStateRoot","params":["xJdxvWOEmrs2MCkKWlgArTzWIXFfU/tmVxI3EKssVTk=","latest"],"id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS" label="wscat WS">

```bash
{"jsonrpc":"2.0","method":"priv_debugGetStateRoot","params":["xJdxvWOEmrs2MCkKWlgArTzWIXFfU/tmVxI3EKssVTk=","latest"],"id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```

</TabItem>

</Tabs>

### `priv_deletePrivacyGroup`

Deletes the specified privacy group.

#### Parameters

`privacyGroupId`: _string_ - privacy group ID

#### Returns

`result`: _string_ - deleted privacy group ID

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"priv_deletePrivacyGroup","params":["ewuTVoc5nlvWMwTFdRRK/wvV0dcyQo/Pauvx5bNEbTk="],"id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"priv_deletePrivacyGroup","params":["ewuTVoc5nlvWMwTFdRRK/wvV0dcyQo/Pauvx5bNEbTk="],"id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 53,
  "result": "ewuTVoc5nlvWMwTFdRRK/wvV0dcyQo/Pauvx5bNEbTk="
}
```

</TabItem>

</Tabs>

### `priv_distributeRawTransaction`

Distributes a signed, RLP encoded [private transaction](../../how-to/send-transactions/private-transactions.md).

:::tip

If you want to sign the [privacy marker transaction](../../how-to/use-privacy/sign-pmts.md) outside of Besu, use [`priv_distributeRawTransaction`](../../how-to/send-transactions/private-transactions.md#priv_distributerawtransaction) instead of [`eea_sendRawTransaction`](#eea_sendrawtransaction).

:::

#### Parameters

`transaction`: _string_ - signed RLP-encoded private transaction

#### Returns

`result`: _string_ - 32-byte enclave key (the enclave key is a pointer to the private transaction in [Tessera](https://docs.tessera.consensys.net/).)

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"priv_distributeRawTransaction","params": ["0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"priv_distributeRawTransaction","params": ["0xf869018203e882520894f17f52151ebef6c7334fad080c5704d77216b732881bc16d674ec80000801ba02da1c48b670996dcb1f447ef9ef00b33033c48a4fe938f420bec3e56bfd24071a062e0aa78a81bf0290afbc3a9d8e9a068e6d74caa66c5e0fa8a46deaae96b0833"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xfd0d90ab824574abc19c0776ca0210e764561d0ef6d621f2bbbea316eccfe56b"
}
```

</TabItem>

</Tabs>

### `priv_findPrivacyGroup`

Returns a list of privacy groups containing only the listed members. For example, if the listed members are A and B, a privacy group containing A, B, and C is not returned.

#### Parameters

`members`: _array_ of _strings_ - members specified by [Tessera](https://docs.tessera.consensys.net/) public keys

#### Returns

`result`: _array_ of _objects_ - privacy group objects containing only the specified members; privacy groups are [EEA-compliant](../../concepts/privacy/privacy-groups.md#enterprise-ethereum-alliance-privacy) or [Besu-extended](../../concepts/privacy/privacy-groups.md#besu-extended-privacy) with types:

- `LEGACY` for EEA-compliant groups.

- `PANTHEON` for Besu-extended groups.

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc": "2.0","method": "priv_findPrivacyGroup","params": [["negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=", "g59BmTeJIn7HIcnq8VQWgyh/pDbvbt2eyP0Ii60aDDw="]],"id": 1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc": "2.0","method": "priv_findPrivacyGroup","params": [["negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=", "g59BmTeJIn7HIcnq8VQWgyh/pDbvbt2eyP0Ii60aDDw="]],"id": 1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "privacyGroupId": "GpK3ErNO0xF27T0sevgkJ3+4qk9Z+E3HtXYxcKIBKX8=",
      "name": "Group B",
      "description": "Description of Group B",
      "type": "PANTHEON",
      "members": [
        "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
        "g59BmTeJIn7HIcnq8VQWgyh/pDbvbt2eyP0Ii60aDDw="
      ]
    }
  ]
}
```

</TabItem>

</Tabs>

### `priv_getCode`

Returns the code of the private smart contract at the specified address. Compiled smart contract code is stored as a hexadecimal value.

#### Parameters

- `privacyGroupId`: _string_ - 32-byte [privacy Group ID](../../concepts/privacy/privacy-groups.md)

- `address`: _string_ - 20-byte contract address

- `blockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one of the
  string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
  [block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

  :::note
  `pending` returns the same value as `latest`.
  :::

#### Returns

`result`: _data_ - code stored at the specified address

<Tabs>

<TabItem value="curl HTTP" label="curl HTTP" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"priv_getCode","params":["1lJxSIP4JOp6uRn9wYsPeWwqoOP1c4nPQjylB4FExUA=", "0xeaf1c1bd00ef0bec5e39fba81740f1c5d05aa201", "latest"],"id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS" label="wscat WS">

```bash
{"jsonrpc":"2.0","method":"priv_getCode","params":["1lJxSIP4JOp6uRn9wYsPeWwqoOP1c4nPQjylB4FExUA=", "0xeaf1c1bd00ef0bec5e39fba81740f1c5d05aa201", "latest"],"id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x60806040526004361060485763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416633fa4f2458114604d57806355241077146071575b600080fd5b348015605857600080fd5b50605f6088565b60408051918252519081900360200190f35b348015607c57600080fd5b506086600435608e565b005b60005481565b60008190556040805182815290517f199cd93e851e4c78c437891155e2112093f8f15394aa89dab09e38d6ca0727879181900360200190a1505600a165627a7a723058209d8929142720a69bde2ab3bfa2da6217674b984899b62753979743c0470a2ea70029"
}
```

</TabItem>

</Tabs>

### `priv_getEeaTransactionCount`

Returns the private transaction count for the specified account and [group of sender and recipients].

::caution important
If sending more than one transaction to be mined in the same block (that is, you are not
waiting for the transaction receipt), you must calculate the private transaction nonce outside
Besu instead of using `priv_getEeaTransactionCount`.
:::

#### Parameters

- `address`: _string_ - account address

- `sender`: _string_ - base64-encoded Tessera address of the sender

- `recipients`: _array_ of _strings_ - base64-encoded Tessera addresses of recipients

#### Returns

`result`: _string_ - integer representing the number of private transactions sent from the address to the specified group of sender and recipients

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"priv_getEeaTransactionCount","params":["0xfe3b557e8fb62b89f4916b721be55ceb828dbd73", "GGilEkXLaQ9yhhtbpBT03Me9iYa7U/mWXxrJhnbl1XY=", ["KkOjNLmCI6r+mICrC6l+XuEDjFEzQllaMQMpWLl4y1s=","eLb69r4K8/9WviwlfDiZ4jf97P9czyS3DkKu0QYGLjg="]], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"priv_getEeaTransactionCount","params":["0xfe3b557e8fb62b89f4916b721be55ceb828dbd73", "GGilEkXLaQ9yhhtbpBT03Me9iYa7U/mWXxrJhnbl1XY=", ["KkOjNLmCI6r+mICrC6l+XuEDjFEzQllaMQMpWLl4y1s=","eLb69r4K8/9WviwlfDiZ4jf97P9czyS3DkKu0QYGLjg="]], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

</TabItem>

</Tabs>

### `priv_getFilterChanges`

Polls the specified filter for a private contract and returns an array of changes that have occurred since the last poll.

Filters for private contracts can only be created by [`priv_newFilter`](#priv_newfilter) so unlike [`eth_getFilterChanges`](../../../public-networks/reference/api/index.md#eth_getfilterchanges), `priv_getFilterChanges` always returns an array of log objects or an empty list.

#### Parameters

- `privacyGroupId`: _string_ - 32-byte [privacy Group ID](../../concepts/privacy/privacy-groups.md)

- `filterId`: _string_ - filter ID

#### Returns

`result`: _array_ of _objects_ - list of [log objects](../../../public-networks/reference/api/objects.md#log-object), or an empty list if nothing has changed since the last poll

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc": "2.0","method": "priv_getFilterChanges","params": ["4rFldHM792LeP/e2WPkTXZedjwKuTr/KwCFTt6mBbkI=","0x4a35b92809d73f4f53a2355d62125442"],"id": 1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc": "2.0","method": "priv_getFilterChanges","params": ["4rFldHM792LeP/e2WPkTXZedjwKuTr/KwCFTt6mBbkI=","0x4a35b92809d73f4f53a2355d62125442"],"id": 1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "logIndex": "0x0",
      "removed": false,
      "blockNumber": "0x4d0",
      "blockHash": "0x1c8200667a869e99b945374c37277b5ee7a7ae67943e13c82563381387553dbb",
      "transactionHash": "0xb1966b9b372ba68952f48f3a3e78f036f5ae82ceca2de972a782d07fb88f6d88",
      "transactionIndex": "0x0",
      "address": "0x991cc548c154b2953cc48c02f782e1314097dfbb",
      "data": "0x",
      "topics": [
        "0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410",
        "0x0000000000000000000000000000000000000000000000000000000000000002"
      ]
    }
  ]
}
```

</TabItem>

</Tabs>

### `priv_getFilterLogs`

Returns an array of [logs](../../../public-networks/concepts/events-and-logs.md) for the specified filter for a private contract.

For private contracts, `priv_getFilterLogs` is the same as [`eth_getFilterLogs`](../../../public-networks/reference/api/index.md#eth_getfilterlogs) for public contracts except there's no [automatic log bloom caching](../../../public-networks/reference/cli/options.md#auto-log-bloom-caching-enabled) for private contracts.

:::note

`priv_getFilterLogs` is only used for filters created with [`priv_newFilter`](#priv_newfilter). To specify a filter object and get logs without creating a filter, use [`priv_getLogs`](#priv_getlogs).

:::

#### Parameters

- `privacyGroupId`: _string_ - 32-byte [privacy Group ID](../../concepts/privacy/privacy-groups.md)

- `filterId`: _string_ - filter ID

#### Returns

`result`: _array_ of _objects_ - list of [log objects](../../../public-networks/reference/api/objects.md#log-object)

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc": "2.0","method": "priv_getFilterLogs","params":["4rFldHM792LeP/e2WPkTXZedjwKuTr/KwCFTt6mBbkI=","0x4a35b92809d73f4f53a2355d62125442"],"id": 1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc": "2.0","method": "priv_getFilterLogs","params":["4rFldHM792LeP/e2WPkTXZedjwKuTr/KwCFTt6mBbkI=","0x4a35b92809d73f4f53a2355d62125442"],"id": 1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "logIndex": "0x0",
      "removed": false,
      "blockNumber": "0x493",
      "blockHash": "0xd9cb3a852e1e02c95f035a2e32d57f82c10cab61faa3e8f5c010adf979bb4786",
      "transactionHash": "0x78866dc51fdf189d8cca74f6a8fe54f172348fbd2163bbe80fa8b106cfc7deb4",
      "transactionIndex": "0x0",
      "address": "0x991cc548c154b2953cc48c02f782e1314097dfbb",
      "data": "0x",
      "topics": [
        "0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      ]
    },
    {
      "logIndex": "0x0",
      "removed": false,
      "blockNumber": "0x4d0",
      "blockHash": "0x1c8200667a869e99b945374c37277b5ee7a7ae67943e13c82563381387553dbb",
      "transactionHash": "0xb1966b9b372ba68952f48f3a3e78f036f5ae82ceca2de972a782d07fb88f6d88",
      "transactionIndex": "0x0",
      "address": "0x991cc548c154b2953cc48c02f782e1314097dfbb",
      "data": "0x",
      "topics": [
        "0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410",
        "0x0000000000000000000000000000000000000000000000000000000000000002"
      ]
    }
  ]
}
```

</TabItem>

</Tabs>

### `priv_getLogs`

Returns an array of [logs](../../../public-networks/concepts/events-and-logs.md) matching a specified filter object.

For private contracts, `priv_getLogs` is the same as [`eth_getLogs`](../../../public-networks/reference/api/index.md#eth_getlogs) for public contracts except there is no [automatic log bloom caching](../../../public-networks/reference/cli/options.md#auto-log-bloom-caching-enabled) for private contracts.

#### Parameters

- `privacyGroupId`: _string_ - 32-byte [privacy Group ID](../../concepts/privacy/privacy-groups.md)

- `filterOptions`: _object_ - [filter options object](../../../public-networks/reference/api/objects.md#filter-options-object)

#### Returns

`result`: _array_ of _objects_ - list of [log objects](../../../public-networks/reference/api/objects.md#log-object)

<Tabs>

<TabItem value="curl HTTP" label="curl HTTP" default>

```bash
curl -X POST --data '{"jsonrpc": "2.0","method": "priv_getLogs","params":["vGy/TZgO6y8VPMVeJAQ99MF1NaTf5ohA3TFfzoEF71k=",{"fromBlock": "earliest","toBlock": "latest","addresses": ["0x630c507ff633312087dc33c513b66276abcd2fc3"],"topics": ["0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410"]}],"id": 1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS" label="wscat WS">

```bash
{"jsonrpc": "2.0","method": "priv_getLogs","params":["vGy/TZgO6y8VPMVeJAQ99MF1NaTf5ohA3TFfzoEF71k=",{"fromBlock": "earliest","toBlock": "latest","addresses": ["0x630c507ff633312087dc33c513b66276abcd2fc3"],"topics": ["0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410"]}],"id": 1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "logIndex": "0x0",
      "removed": false,
      "blockNumber": "0x342",
      "blockHash": "0xf5954f068fa2f2f7741281e8c753a8e92047e27ab3c4971836d2c89fab86d92b",
      "transactionHash": "0xa9ba5cffde9d4ad8997c5c4352d5d49eeea0e9def8a4ea69991b8837c49d4e4f",
      "transactionIndex": "0x0",
      "address": "0x630c507ff633312087dc33c513b66276abcd2fc3",
      "data": "0x",
      "topics": [
        "0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      ]
    },
    {
      "logIndex": "0x0",
      "removed": false,
      "blockNumber": "0x383",
      "blockHash": "0x91b73a47d53e3a88d62ed091a89a4be7557ad91b552e7ff7d86bf78977d5d45d",
      "transactionHash": "0xc2a185faf00e87434e55b7f70cc4c38be354c2128b4b96b5f5def0b54a2173ec",
      "transactionIndex": "0x0",
      "address": "0x630c507ff633312087dc33c513b66276abcd2fc3",
      "data": "0x",
      "topics": [
        "0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410",
        "0x0000000000000000000000000000000000000000000000000000000000000002"
      ]
    }
  ]
}
```

</TabItem>

</Tabs>

### `priv_getPrivacyPrecompileAddress`

Returns the address of the [privacy precompiled contract](../../concepts/privacy/private-transactions/processing.md). The address is derived and based on the value of the [`privacy-flexible-groups-enabled`](../cli/options.md#privacy-flexible-groups-enabled) option.

#### Parameters

None

#### Returns

`result`: _string_ - address of the privacy precompile

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"priv_getPrivacyPrecompileAddress","params":[], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"priv_getPrivacyPrecompileAddress","params":[], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x000000000000000000000000000000000000007e"
}
```

</TabItem>

</Tabs>

### `priv_getPrivateTransaction`

Returns the private transaction if you are a participant, otherwise, `null`.

#### Parameters

`transaction`: _string_ - transaction hash returned by [`eea_sendRawTransaction`](#eea_sendrawtransaction).

#### Returns

`result`: _object_ - [private transaction object](objects.md#private-transaction-object), or `null` if not a participant in the private transaction

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"priv_getPrivateTransaction","params":["0x623c4ce5275a87b91f4f1c521012d39ca19311c787bde405490f4c0426a71498"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"priv_getPrivateTransaction","params":["0x623c4ce5275a87b91f4f1c521012d39ca19311c787bde405490f4c0426a71498"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
    "gas": "0x2dc6c0",
    "gasPrice": "0x0",
    "hash": "0x623c4ce5275a87b91f4f1c521012d39ca19311c787bde405490f4c0426a71498",
    "input": "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610221806100606000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f2451461005c5780636057361d1461008757806367e404ce146100b4575b600080fd5b34801561006857600080fd5b5061007161010b565b6040518082815260200191505060405180910390f35b34801561009357600080fd5b506100b260048036038101908080359060200190929190505050610115565b005b3480156100c057600080fd5b506100c96101cb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600254905090565b7fc9db20adedc6cf2b5d25252b101ab03e124902a73fcb12b753f3d1aaa2d8f9f53382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a18060028190555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050905600a165627a7a723058208efaf938851fb2d235f8bf9a9685f149129a30fe0f4b20a6c1885dc02f639eba0029",
    "nonce": "0x0",
    "to": null,
    "value": "0x0",
    "v": "0xfe8",
    "r": "0x654a6a9663ca70bb13e27cca14b3777cc92da184e19a151cdeef2ccbbd5c6405",
    "s": "0x5dd4667b020c8a5af7ae28d4c3126f8dcb1187f49dcf0de9d7a39b1651892eef",
    "privateFrom": "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
    "privateFor": ["g59BmTeJIn7HIcnq8VQWgyh/pDbvbt2eyP0Ii60aDDw="],
    "restriction": "restricted"
  }
}
```

</TabItem>

</Tabs>

### `priv_getTransactionCount`

Returns the private transaction count for specified account and privacy group.

:::important

If sending more than one transaction to be mined in the same block (that is, you are not waiting for the transaction receipt), you must calculate the private transaction nonce outside Besu instead of using `priv_getTransactionCount`.

:::

#### Parameters

- `address`: _string_ - account address

- `privacyGroupId`: _string_ - privacy group ID

#### Returns

`result`: _string_ - integer representing the number of private transactions sent from the address to the specified privacy group

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"priv_getTransactionCount","params":["0xfe3b557e8fb62b89f4916b721be55ceb828dbd73", "kAbelwaVW7okoEn1+okO+AbA4Hhz/7DaCOWVQz9nx5M="], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"priv_getTransactionCount","params":["0xfe3b557e8fb62b89f4916b721be55ceb828dbd73", "kAbelwaVW7okoEn1+okO+AbA4Hhz/7DaCOWVQz9nx5M="], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x1"
}
```

</TabItem>

</Tabs>

### `priv_getTransactionReceipt`

Returns information about the private transaction after mining the transaction. Receipts for pending transactions are not available.

#### Parameters

`transaction`: _string_ - 32-byte hash of a transaction

#### Returns

`result`: _object_ - [private Transaction receipt object](objects.md#private-transaction-receipt-object), or `null` if no receipt found

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"priv_getTransactionReceipt","params":["0xf3ab9693ad92e277bf785e1772f29fb1864904bbbe87b0470455ddb082caab9d"],"id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"priv_getTransactionReceipt","params":["0xf3ab9693ad92e277bf785e1772f29fb1864904bbbe87b0470455ddb082caab9d"],"id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "blockHash": "0xe7212a92cfb9b06addc80dec2a0dfae9ea94fd344efeb157c41e12994fcad60a",
        "blockNumber": "0x50",
        "contractAddress": "0x493b76031593402e24e16faa81f677b58e2d53f3",
        "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
        "logs": [],
        "to": "0xf17f52151ebef6c7334fad080c5704d77216b732",
        "transactionHash": "0x36219e92b5f53d4150aa9ef7d2d793118cced523de6724100da5b534e3ceb4b8",
        "transactionIndex": "0x0",
        "output": "0x6080604052600436106049576000357c010000000000000000000000000000000000000000000
        0000000000000900463ffffffff1680633fa4f24514604e57806355241077146076575b600080fd5b3480156059
        57600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b
        50609e6004803603810190808035906020019092919050505060a6565b005b60005481565b8060008190555050560
        0a165627a7a723058202bdbba2e694dba8fff33d9d0976df580f57bff0a40e25a46c398f8063b4c00360029",
        "commitmentHash": "0x79b9e6b0856db398ad7dc208f15b1d38c0c0b0c5f99e4a443a2c5a85510e96a5",
        "status": "0x1",
        "privateFrom": "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
        "privacyGroupId": "cD636RZlcqVSpoxT/ExbkWQfBO7kPAZO0QlWHErNSL8=",
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    }
}
```

</TabItem>

</Tabs>

### `priv_newFilter`

Creates a [log filter](../../../public-networks/concepts/events-and-logs.md) for a private contract. To poll for logs associated with the created filter, use [`priv_getFilterChanges`](#priv_getfilterchanges). To get all logs associated with the filter, use [`priv_getFilterLogs`](#priv_getfilterlogs).

For private contracts, `priv_newFilter` is the same as [`eth_newFilter`](../../../public-networks/reference/api/index.md#eth_newfilter) for public contracts.

#### Parameters

- `privacyGroupId`: _string_ - 32-byte [privacy Group ID](../../concepts/privacy/privacy-groups.md)

- `filterOptions`: _object_ - [filter options object](../../../public-networks/reference/api/objects.md#filter-options-object)

:::note

`fromBlock` and `toBlock` in the filter options object default to `latest`.

:::

#### Returns

`result`: _string_ - filter ID

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc": "2.0","method": "priv_newFilter","params": ["4rFldHM792LeP/e2WPkTXZedjwKuTr/KwCFTt6mBbkI=",{"fromBlock": "earliest","toBlock": "latest","addresses": ["0x991cc548c154b2953cc48c02f782e1314097dfbb"],"topics": ["0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410"]}],"id": 1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc": "2.0","method": "priv_newFilter","params": ["4rFldHM792LeP/e2WPkTXZedjwKuTr/KwCFTt6mBbkI=",{"fromBlock": "earliest","toBlock": "latest","addresses": ["0x991cc548c154b2953cc48c02f782e1314097dfbb"],"topics": ["0x85bea11d86cefb165374e0f727bacf21dc2f4ea816493981ecf72dcfb212a410"]}],"id": 1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x4a35b92809d73f4f53a2355d62125442"
}
```

</TabItem>

</Tabs>

### `priv_uninstallFilter`

Uninstalls a filter for a private contract with the specified ID. When a filter is no longer required, call this method.

Filters time out when not requested by [`priv_getFilterChanges`](#priv_getfilterchanges) or [`priv_getFilterLogs`](#priv_getfilterlogs) for 10 minutes.

For private contracts, `priv_uninstallFilter` is the same as [`eth_uninstallFilter`](../../../public-networks/reference/api/index.md#eth_uninstallfilter) for public contracts.

#### Parameters

- `privacyGroupId`: _string_ - 32-byte [privacy group ID](../../concepts/privacy/privacy-groups.md)

- `filterId`: _string_ - filter ID

#### Returns

`result`: _boolean_ - indicates if the filter is successfully uninstalled

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc": "2.0","method": "priv_uninstallFilter","params":["4rFldHM792LeP/e2WPkTXZedjwKuTr/KwCFTt6mBbkI=","0x4a35b92809d73f4f53a2355d62125442"],"id": 1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc": "2.0","method": "priv_uninstallFilter","params":["4rFldHM792LeP/e2WPkTXZedjwKuTr/KwCFTt6mBbkI=","0x4a35b92809d73f4f53a2355d62125442"],"id": 1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

</TabItem>

</Tabs>

## `QBFT` methods

The `QBFT` API methods provide access to the [QBFT](../../how-to/configure/consensus/qbft.md) consensus engine.

:::note

The `QBFT` API methods are not enabled by default for JSON-RPC. To enable the `QBFT` API methods, use the [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api) or [`--rpc-ws-api`](../../../public-networks/reference/cli/options.md#rpc-ws-api) options.

:::

### `qbft_discardValidatorVote`

Discards a proposal to [add or remove a validator](../../how-to/configure/consensus/qbft.md#add-and-remove-validators) with the specified address.

#### Parameters

`address`: _string_ - 20-byte address of proposed validator

#### Returns

`result`: _boolean_ - indicates if the proposal is discarded

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_discardValidatorVote","params":["0xef1bfb6a12794615c9b0b5a21e6741f01e570185"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"qbft_discardValidatorVote","params":["0xef1bfb6a12794615c9b0b5a21e6741f01e570185"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

</TabItem>

</Tabs>

### `qbft_getPendingVotes`

Returns [votes](../../how-to/configure/consensus/qbft.md#add-and-remove-validators) cast in the current [epoch](../../how-to/configure/consensus/qbft.md#genesis-file).

#### Parameters

None

#### Returns

`result`: _map_ of _strings_ to _booleans_ - map of account addresses to corresponding boolean values indicating the vote for each account; if `true`, the vote is to add a validator. If `false`, the proposal is to remove a validator.

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_getPendingVotes","params":[], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"qbft_getPendingVotes","params":[], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "0xef1bfb6a12794615c9b0b5a21e6741f01e570185": true,
    "0x42d4287eac8078828cf5f3486cfe601a275a49a5": true
  }
}
```

</TabItem>

</Tabs>

### `qbft_getSignerMetrics`

Provides the following validator metrics for the specified range:

- Number of blocks from each validator

- Block number of the last block proposed by each validator (if any proposed in the specified range)

- All validators present in the last block of the range

#### Parameters

- `fromBlockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one
  of the string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
  [block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

- `toBlockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one of
  the string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in
  [block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

:::note
`pending` returns the same value as `latest`.
:::

If you specify:

- No parameters, the call provides metrics for the last 100 blocks, or all blocks if there are less than 100 blocks.

- Only the first parameter, the call provides metrics for all blocks from the block specified to the latest block.

#### Returns

`result`: _array_ of _objects_ - list of validator objects

:::note

The proposer of the genesis block has address `0x0000000000000000000000000000000000000000`.

:::

<Tabs>

<TabItem value="curl HTTP" label="curl HTTP" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_getSignerMetrics","params":["1", "100"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS" label="wscat WS">

```bash
{"jsonrpc":"2.0","method":"qbft_getSignerMetrics","params":["1", "100"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "address": "0x7ffc57839b00206d1ad20c69a1981b489f772031",
      "proposedBlockCount": "0x21",
      "lastProposedBlockNumber": "0x61"
    },
    {
      "address": "0x42eb768f2244c8811c63729a21a3569731535f06",
      "proposedBlockCount": "0x21",
      "lastProposedBlockNumber": "0x63"
    },
    {
      "address": "0xb279182d99e65703f0076e4812653aab85fca0f0",
      "proposedBlockCount": "0x21",
      "lastProposedBlockNumber": "0x62"
    }
  ]
}
```

</TabItem>

</Tabs>

### `qbft_getValidatorsByBlockHash`

Lists the validators defined in the specified block.

#### Parameters

`block`: _string_ - 32-byte block hash

#### Returns

`result`: _array_ of _strings_ - list of validator addresses

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_getValidatorsByBlockHash","params":["0xbae7d3feafd743343b9a4c578cab5e5d65eb735f6855fb845c00cab356331256"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"qbft_getValidatorsByBlockHash","params":["0xbae7d3feafd743343b9a4c578cab5e5d65eb735f6855fb845c00cab356331256"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x42d4287eac8078828cf5f3486cfe601a275a49a5",
    "0xb1b2bc9582d2901afdc579f528a35ca41403fa85",
    "0xef1bfb6a12794615c9b0b5a21e6741f01e570185"
  ]
}
```

</TabItem>

</Tabs>

### `qbft_getValidatorsByBlockNumber`

Lists the validators for the specified block.

For all blocks up to the chain head block this method returns the validators that were used at the time the block was produced.

Use `blockNumber` to get the list of validators for that block.

For the chain head block there are two validator lists associated with it:

1. The validators that were used at the time the block was produced. This list is returned by passing `latest` as the input parameter.
2. The validators that will be used to produce the next block. This list is returned by passing `pending` as the input parameter.

In most instances the two lists for the chain head block are the same. However, when voting has completed to add or remove a validator, the validators that will be used to produce the next block are different. Comparing the two lists can be helpful when diagnosing a stalled chain.

:::note
When the validator list changes, an `INFO` log message displays, showing the previous list of validators and the new list of validators.
:::

#### Parameters

- `blockNumber`: _string_ - hexadecimal or decimal integer representing a block number, or one of the string tags `latest`, `earliest`, `pending`, `finalized`, or `safe`, as described in [block parameter](../../../public-networks/how-to/use-besu-api/json-rpc.md#block-parameter)

#### Returns

`result`: _array_ of _strings_ - list of validator addresses

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_getValidatorsByBlockNumber","params":["latest"], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"qbft_getValidatorsByBlockNumber","params":["latest"], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x42d4287eac8078828cf5f3486cfe601a275a49a5",
    "0xb1b2bc9582d2901afdc579f528a35ca41403fa85",
    "0xef1bfb6a12794615c9b0b5a21e6741f01e570185"
  ]
}
```

</TabItem>

</Tabs>

### `qbft_proposeValidatorVote`

Proposes to [add or remove a validator](../../how-to/configure/consensus/qbft.md#add-and-remove-validators) with the specified address.

#### Parameters

- `address`: _string_ - account address

- `proposal`: _boolean_ - `true` to propose adding validator or `false` to propose removing validator

#### Returns

`result`: _boolean_ - `true`

<Tabs>

<TabItem value="curl HTTP request" label="curl HTTP request" default>

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_proposeValidatorVote","params":["42d4287eac8078828cf5f3486cfe601a275a49a5",true], "id":1}' http://127.0.0.1:8545
```

</TabItem>

<TabItem value="wscat WS request" label="wscat WS request">

```bash
{"jsonrpc":"2.0","method":"qbft_proposeValidatorVote","params":["42d4287eac8078828cf5f3486cfe601a275a49a5",true], "id":1}
```

</TabItem>

<TabItem value="JSON result" label="JSON result">

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

</TabItem>

</Tabs>

<!-- Links -->

[add or remove a signer with the specified address]: ../../how-to/configure/consensus/clique.md#add-and-remove-signers
[signers for the specified block]: ../../how-to/configure/consensus/clique.md#adding-and-removing-signers
[add or remove a validator]: ../../how-to/configure/consensus/ibft.md#add-and-remove-validators
[permissions configuration file]: ../../how-to/use-permissioning/local.md#permissions-configuration-file
[group of sender and recipients]: ../../concepts/privacy/privacy-groups.md#enterprise-ethereum-alliance-privacy

\*[EEA]: Enterprise Ethereum Alliance
