---
description: Engine API methods reference
---

# Engine API methods

The Engine API allows communication between [consensus and execution layers](../Concepts/Merge.md#execution-and-consensus-clients) of the [post-Merge](../Concepts/Merge.md) Ethereum Client.

See [Ethereum Engine API specification](https://github.com/ethereum/execution-apis/blob/main/src/engine/specification.md) for more information.

## Methods

### `engine_exchangeTransitionConfigurationV1`

Sends to the consensus client to verify the configuration between both clients.

#### Parameters

`transitionConfiguration`: *object* - [Transition configuration object](Engine-API-Objects.md#transition-configuration-object)

#### Returns

`transitionConfiguration`: *object* - [Transition configuration object](Engine-API-Objects.md#transition-configuration-object)


$ curl https://localhost:8550 \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"engine_getPayloadV1","params": ["0x1"],"id":1}'
{
"jsonrpc": "2.0",
"id": 1,
"error": {
"code": -32000,
"message": "Server error",
"data": {
"err": "Database corrupted"
}
}
}

### `engine_forkchoiceUpdatedV1`



#### Parameters

* `forkchoiceState`: *object* - [Fork choice state object](Engine-API-Objects.md#fork-choice-state-object)

* `payloadAttributes`: *object* - [Payload attribute object](Engine-API-Objects.md#payload-attributes-object). Can be `null`.

#### Returns

* `payloadStatus`: *object* - [Payload status object](Engine-API-Objects.md#payload-status-object)

* `payloadId`: *data* -  identifier of the payload build process or `null`

### `engine_getPayloadV1`



#### Parameters

`payloadId`: *data* - Identifier of the payload build process

#### Returns

`executionPayload`: *object* - [Execution payload object](Engine-API-Objects.md#execution-payload-object)

### `engine_newPayloadV1`



#### Parameters

`executionPayload`: *object* - [Execution payload object](Engine-API-Objects.md#execution-payload-object)

#### Returns

* `payloadStatus`: *object* - [Payload status object](Engine-API-Objects.md#payload-status-object)