---
description: Engine API methods reference
---

# Engine API methods

[Consensus and execution clients](../../concepts/the-merge.md#execution-and-consensus-clients)
communicate with each other using the Engine API.
When running Besu as an execution client, [use these API calls](../../how-to/use-engine-api.md) to
communicate with a consensus client.

!!! important

    Ensure you enable the Engine API methods with the [`--engine-rpc-enabled`](../cli/options.md#engine-rpc-enabled) CLI option.

See the [Ethereum Engine API specification](https://github.com/ethereum/execution-apis/blob/0b965fb714ccd3faa3c939fdce1726e56679cdec/src/engine/specification.md) for more information. We will not necessarily catalogue all changes to the Engine API within this page. 

## Methods

### `engine_exchangeTransitionConfigurationV1`

Sends the transition configuration to the consensus client to verify the configuration between both clients.

!!! note

    The execution client runs this call every 60 seconds in the background.
    The log displays a warning message if the call hasn't been sent in 120 seconds.

#### Parameters

`transitionConfiguration`: *object* - [Transition configuration object](objects.md#transition-configuration-object)

#### Returns

`transitionConfiguration`: *object* - [Transition configuration object](objects.md#transition-configuration-object)

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"engine_exchangeTransitionConfigurationV1","params":[{"terminalTotalDifficulty": 0, "terminalBlockHash": "0x0000000000000000000000000000000000000000000000000000000000000000", "terminalBlockNumber": "0x1"}],"id":67}' http://127.0.0.1:8550
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"engine_exchangeTransitionConfigurationV1","params":[{"terminalTotalDifficulty": 0, "terminalBlockHash": "0x0000000000000000000000000000000000000000000000000000000000000000", "terminalBlockNumber": "0x1"}],"id":67}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 67,
            "result": {
              "terminalTotalDifficulty": 0,
              "terminalBlockHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "terminalBlockNumber": "0x1"
            },
            "payloadId": null
          }
        }
        ```

### `engine_forkchoiceUpdatedV1`

Updates the fork choice with the consensus client.

#### Parameters

* `forkchoiceState`: *object* - [Fork choice state object](objects.md#fork-choice-state-object)

* `payloadAttributes`: *object* - [Payload attribute object](objects.md#payload-attributes-object). Can be `null`.

#### Returns

* `payloadStatus`: *object* - [Payload status object](objects.md#payload-status-object)

* `payloadId`: *data* -  identifier of the payload build process or `null`

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"engine_forkchoiceUpdatedV1","params":[{"headBlockHash": "0x3559e851470f6e7bbed1db474980683e8c315bfce99b2a6ef47c057c04de7858", "safeBlockHash": "0x3559e851470f6e7bbed1db474980683e8c315bfce99b2a6ef47c057c04de7858", "finalizedBlockHash": "0x3b8fb240d288781d4aac94d3fd16809ee413bc99294a085798a589dae51ddd4a"},null],"id":67}' http://127.0.0.1:8550
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"engine_forkchoiceUpdatedV1","params":[{"headBlockHash": "0x3559e851470f6e7bbed1db474980683e8c315bfce99b2a6ef47c057c04de7858", "safeBlockHash": "0x3559e851470f6e7bbed1db474980683e8c315bfce99b2a6ef47c057c04de7858", "finalizedBlockHash": "0x3b8fb240d288781d4aac94d3fd16809ee413bc99294a085798a589dae51ddd4a"},null],"id":67}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 67,
            "result": {
              "payloadStatus": {
                "status": "VALID",
                "latestValidHash": "0x3559e851470f6e7bbed1db474980683e8c315bfce99b2a6ef47c057c04de7858",
                "validationError": null
            },
            "payloadId": null
          }
        }
        ```

### `engine_getPayloadV1`

Prepares the payload to send to the consensus client.

#### Parameters

`payloadId`: *data* - Identifier of the payload build process

#### Returns

`executionPayload`: *object* - [Execution payload object](objects.md#execution-payload-object)

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"engine_getPayloadV1","params":["0x0000000021f32cc1"],"id":1}' http://127.0.0.1:8550
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"engine_getPayloadV1","params":["0x0000000021f32cc1"],"id":67}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 67,
            "result": {
              "parentHash": "0x3b8fb240d288781d4aac94d3fd16809ee413bc99294a085798a589dae51ddd4a",
              "feeRecipient": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
              "stateRoot": "0xca3149fa9e37db08d1cd49c9061db1002ef1cd58db2210f2115c8c989b2bdf45",
              "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
              "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
              "prevRandao": "0x0000000000000000000000000000000000000000000000000000000000000000",
              "blockNumber": "0x1",
              "gasLimit": "0x1c9c380",
              "gasUsed": "0x0",
              "timestamp": "0x5",
              "extraData": "0x",
              "baseFeePerGas": "0x7",
              "blockHash": "0x3559e851470f6e7bbed1db474980683e8c315bfce99b2a6ef47c057c04de7858",
              "transactions": []
            }
        }
        ```

### `engine_newPayloadV1`

Executes the payload with the consensus client.

#### Parameters

`executionPayload`: *object* - [Execution payload object](objects.md#execution-payload-object)

#### Returns

* `payloadStatus`: *object* - [Payload status object](objects.md#payload-status-object)

!!! example

    === "curl HTTP"

        ```bash
        curl -X POST --data '{"jsonrpc":"2.0","method":"engine_newPayloadV1","params":[
          {
            "parentHash": "0x3b8fb240d288781d4aac94d3fd16809ee413bc99294a085798a589dae51ddd4a",
            "feeRecipient": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
            "stateRoot": "0xca3149fa9e37db08d1cd49c9061db1002ef1cd58db2210f2115c8c989b2bdf45",
            "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
            "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "prevRandao": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "blockNumber": "0x1",
            "gasLimit": "0x1c9c380",
            "gasUsed": "0x0",
            "timestamp": "0x5",
            "extraData": "0x",
            "baseFeePerGas": "0x7",
            "blockHash": "0x3559e851470f6e7bbed1db474980683e8c315bfce99b2a6ef47c057c04de7858",
            "transactions": []
          }
        ],"id":67}' http://127.0.0.1:8550
        ```

    === "wscat WS"

        ```bash
        {"jsonrpc":"2.0","method":"engine_newPayloadV1","params":[
          {
            "parentHash": "0x3b8fb240d288781d4aac94d3fd16809ee413bc99294a085798a589dae51ddd4a",
            "feeRecipient": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
            "stateRoot": "0xca3149fa9e37db08d1cd49c9061db1002ef1cd58db2210f2115c8c989b2bdf45",
            "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
            "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "prevRandao": "0x0000000000000000000000000000000000000000000000000000000000000000",
            "blockNumber": "0x1",
            "gasLimit": "0x1c9c380",
            "gasUsed": "0x0",
            "timestamp": "0x5",
            "extraData": "0x",
            "baseFeePerGas": "0x7",
            "blockHash": "0x3559e851470f6e7bbed1db474980683e8c315bfce99b2a6ef47c057c04de7858",
            "transactions": []
          }
        ],"id":67}
        ```

    === "JSON result"

        ```json
        {
            "jsonrpc": "2.0",
            "id": 1,
            "result": {
              "status": "VALID",
              "latestValidHash": "0x3559e851470f6e7bbed1db474980683e8c315bfce99b2a6ef47c057c04de7858",
              "validationError": null
            }
        }
        ```
