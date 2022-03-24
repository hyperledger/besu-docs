---
description: Engine API methods reference
---

# Engine API methods

The Engine API allows communication between consensus and execution layers of the [post-Merge]() Ethereum Client.

## Methods

### `engine_exchangeTransitionConfigurationV1`



#### Parameters

`transitionConfiguration`: *object* - [Transition configuration object](Engine-API-Objects.md#transition-configuration-object)

#### Returns

`transitionConfiguration`: *object* - [Transition configuration object](Engine-API-Objects.md#transition-configuration-object)

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