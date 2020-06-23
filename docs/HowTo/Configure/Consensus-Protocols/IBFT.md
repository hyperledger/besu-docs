---
description: Hyperledger Besu IBFT 2.0 Proof-of-Authority (PoA) consensus protocol implementation
---

# IBFT 2.0

Besu implements the IBFT 2.0 Proof-of-Authority (PoA) consensus protocol. Private networks can use
IBFT 2.0.

In IBFT 2.0 networks, approved accounts, known as validators, validate transactions and blocks.
Validators take turns to create the next block. Before inserting the block onto the chain, a
super-majority (greater than 66%) of validators must first sign the block.

!!! tip
    You can use a plugin to securely store a validator's key using the
    [`--security-module`](../../../Reference/CLI/CLI-Syntax.md#security-module) option.

Existing validators propose and vote to
[add or remove validators](#adding-and-removing-validators). Adding or removing a validator
requires a majority vote (greater than 50%) of validators.

## Minimum number of validators

IBFT 2.0 requires four validators to be Byzantine fault tolerant. Byzantine fault tolerance is the
ability for a blockchain network to function correctly and reach consensus despite nodes failing or
propagating incorrect information to peers.

## Genesis file

To use IBFT 2.0, Besu requires an IBFT 2.0 genesis file. The genesis file defines properties
specific to IBFT 2.0.

!!! example "Sample IBFT 2.0 Genesis File"

    Example genesis file for a 4 nodes IBFT2 network.

    ```json
      {
        "config": {
          "chainId": 1981,
          "muirglacierblock": 0,
          "ibft2": {
            "blockperiodseconds": 2,
            "epochlength": 30000,
            "requesttimeoutseconds": 4
          }
        },
        "nonce": "0x0",
        "timestamp": "0x58ee40ba",
        "extraData": "0xf83ea00000000000000000000000000000000000000000000000000000000000000000d594c2ab482b506de561668e07f04547232a72897daf808400000000c0",
        "gasLimit": "0x1fffffffffffff",
        "difficulty": "0x1",
        "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
        "alloc": {}
      }
    ```

The properties specific to IBFT 2.0 are:

* `blockperiodseconds` - The minimum block time, in seconds.
* `epochlength` - The number of blocks after which to reset all votes.
* `requesttimeoutseconds` - The timeout for each consensus round before a round change, in seconds.
* `extraData` - `RLP([32 bytes Vanity, List<Validators>, No Vote, Round=Int(0), 0 Seals])`.

!!!caution
    The `blockperiodseconds` property cannot be updated once your network is started.

    We do not recommend changing `epochlength` in a running network. Changing the `epochlength`
    after genesis can result in illegal blocks.

The properties with specific values in the IBFT 2.0 genesis files are:

* `nonce` - `0x0`
* `difficulty` - `0x1`
* `mixHash` - `0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365` for Istanbul
  block identification.

To start a node on an IBFT 2.0 private network, use the
[`--genesis-file`](../../../Reference/CLI/CLI-Syntax.md#genesis-file) option to specify the custom
genesis file.

### Extra data

The `extraData` property is RLP encoded. RLP encoding is a space efficient object serialization
scheme used in Ethereum. To generate the `extraData` RLP string for inclusion in the genesis file,
use the [`rlp encode`](../../../Reference/CLI/CLI-Subcommands.md#rlp) Besu subcommand.

!!! example

    ```bash
    besu rlp encode --from=toEncode.json
    ```

Where the `toEncode.json` file contains a list of the initial validators, in ascending order. To
write the validator address and copy it to the `toEncode.json` file, use the
[`public-key export-address`](../../../Reference/CLI/CLI-Subcommands.md#export-address) Besu
subcommand. For example:

!!! example "One Initial Validator in `toEncode.json` file"

    ```json
    [
     "9811ebc35d7b06b3fa8dc5809a1f9c52751e1deb"
    ]
    ```

Copy the RLP encoded data to the `extraData` property in the genesis file.

### Block time

When the protocol receives a new chain head, the block time (`blockperiodseconds`) and round
timeout (`requesttimeoutseconds`) timers start. When `blockperiodseconds` expires, the protocol
proposes a new block.

If `requesttimeoutseconds` expires before adding the proposed block, a round change occurs, with
the block time and timeout timers reset. The timeout period for the new round is two times
`requesttimeoutseconds`. The timeout period continues to double each time a round fails to add a
block.

Usually, the protocol adds the proposed block before reaching `requesttimeoutseconds`. A new round
then starts, resetting the block time and round timeout timers. When `blockperiodseconds`
expires, the protocol proposes the next new block.

Once `blockperiodseconds` is over, the time from proposing a block to adding the block is
small (usually around one second) even in networks with geographically dispersed validators.

!!! example
    An internal IBFT 2.0 network run by PegaSys had four geographically dispersed validators in Sweden,
    Sydney, and two in North Virginia. With a `blockperiodseconds` of 5 and a `requesttimeoutseconds`
    of 10, the testnet consistently created blocks with a five second blocktime.

#### Tuning block timeout

To tune the block timeout for your network deployment:

1. Set `blockperiodseconds` to your desired block time and `requesttimeoutseconds` to two times
`blockperiodseconds`.

1. Reduce `requesttimeoutseconds` until you start to see round changes occurring.

1. Increase `requesttimeoutseconds` to the value where round changes are no longer occurring.

### Optional configuration options

Optional configuration options in the IBFT 2.0 genesis file are:

* `messageQueueLimit` - In large networks with limited resources, increasing the message queue
  limit might help with message activity surges. The default is 1000.
* `duplicateMesageLimit` - If the same node is retransmitting messages, increasing the duplicate
  message limit might reduce the number of retransmissions. A value of two to three times the
  number of validators is usually enough. The default is 100.
* `futureMessagesLimit` - The future messages buffer holds IBFT 2.0 messages for a future chain
  height. For large networks, increasing the future messages limit might be useful. The default is
  1000.
* `futureMessagesMaxDistance` - The maximum height from the current chain height for buffering
  messages in the future messages buffer. The default is 10.

## Adding and removing validators

Add and remove validators by [voting](#adding-and-removing-validators-by-voting) or if network
conditions require it, [without voting](#adding-and-removing-validators-without-voting).

### Adding and removing validators by voting

To propose adding or removing validators using the JSON-RPC methods, enable the HTTP interface
using [`--rpc-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) or the
WebSockets interface using
[`--rpc-ws-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-enabled).

The IBFT API methods are not enabled by default. To enable them, specify the
[`--rpc-http-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`--rpc-ws-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) option and include `IBFT`.

The JSON-RPC methods to add or remove validators are:

* [`ibft_getPendingVotes`](../../../Reference/API-Methods.md#ibft_getPendingVotes)
* [`ibft_proposeValidatorVote`](../../../Reference/API-Methods.md#ibft_proposeValidatorVote)
* [`ibft_discardValidatorVote`](../../../Reference/API-Methods.md#ibft_discardValidatorVote).

!!! important

    A majority of existing validators must agree to add or remove a validator. That is, more that
    50% of validators must execute `ibft_proposeValidatorVote` to add or remove a validator. For
    example, if you have four validators, the vote must be made on three validators.

To view validator metrics for a specified block range, use
[`ibft_getSignerMetrics`](../../../Reference/API-Methods.md#ibft_getsignermetrics).

#### Adding a validator

To propose adding a validator, call
[`ibft_proposeValidatorVote`](../../../Reference/API-Methods.md#ibft_proposeValidatorVote),
specifying the address of the proposed validator and `true`. A majority of validators must execute
the call.

!!! example "JSON-RPC ibft_proposeValidatorVote Request Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_proposeValidatorVote","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", true], "id":1}' <JSON-RPC-endpoint:port>
    ```

When the validator proposes the next block, the protocol inserts one proposal received from
[`ibft_proposeValidatorVote`](../../../Reference/API-Methods.md#ibft_proposeValidatorVote) into the
block. If blocks include all proposals, subsequent blocks proposed by the validator will not
contain a vote.

When more than half of the existing validators have published a matching proposal, the protocol
adds the proposed validator to the validator pool and the validator can begin validating blocks.

To return a list of validators and confirm the addition of a proposed validator, use
[`ibft_getValidatorsByBlockNumber`](../../../Reference/API-Methods.md#ibft_getValidatorsByBlockNumber).

!!! example "JSON-RPC ibft_getValidatorsByBlockNumber Request Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_getValidatorsByBlockNumber","params":["latest"], "id":1}' <JSON-RPC-endpoint:port>
    ```

To discard your proposal after confirming the addition of a validator, call
[`ibft_discardValidatorVote`](../../../Reference/API-Methods.md#ibft_discardValidatorVote),
specifying the address of the proposed validator.

!!! example "JSON-RPC ibft_discardValidatorVote Request Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_discardValidatorVote","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"], "id":1}' <JSON-RPC-endpoint:port>
    ```

#### Removing a validator

The process for removing a validator is the same as adding a validator except you specify `false`
as the second parameter of
[`ibft_proposeValidatorVote`](../../../Reference/API-Methods.md#ibft_proposeValidatorVote).

#### Epoch transition

At each epoch transition, IBFT 2.0 discards all pending votes collected from received blocks.
Existing proposals remain in effect and validators re-add their vote the next time they create a
block.

An epoch transition occurs every `epochLength` blocks. Define `epochlength` in the IBFT 2.0 genesis
file.

### Adding and removing validators without voting

Network conditions might not allow voting to change validators. For example, if a majority
of the current validators are no longer participating in the network, so a vote to add or remove
valiators will never be successful. You can bypass voting and specify new validators in the genesis
file.

To add or remove validators without voting:

1. Stop all nodes in the network.
1. In the genesis file, add the `transitions` configuration item where:

    * `<BlockNumber>` is the upcoming block at which to change validators.
    * `<ValidatorAddressX> ... <ValidatorAddressZ>` are strings representing the account addresses
      of the validators after `<BlockNumber>`.

    !!! example "Transitions object in the genesis file"

        ```bash tab="Syntax"
        {
          "config": {
             ...
             "ibft2": {
               "blockperiodseconds": 2,
               "epochlength": 30000,
               "requesttimeoutseconds": 4
             },
             "transitions": {
               "ibft2": [
               {
                 "block": <BlockNumber>,
                 "validators": [
                    <ValidatorAddressX>,
                    ...
                    <ValidatorAddressZ>
                 ]
               }
               ]
             }
          },
          ...
        }
        ```

        ```bash tab="Example"
        {
          "config": {
            ...
            "ibft2": {
              "blockperiodseconds": 2,
              "epochlength": 30000,
              "requesttimeoutseconds": 4
            },
            "transitions": {
               "ibft2": [
               {
                "block": 25,
                "validators": [
                  "0x372a70ace72b02cc7f1757183f98c620254f9c8d",
                  "0x9811ebc35d7b06b3fa8dc5809a1f9c52751e1deb"
                  ]
                }
               ]
            }
          },
          ...
        }
        ```

1. Restart all nodes in the network using the updated genesis file.
1. To verify the changes after the transition block, call
   [`ibft_getValidatorsByBlockNumber`](../../../Reference/API-Methods.md#ibft_getvalidatorsbyblocknumber),
   specifying `latest`.

!!! caution
    Do not specify a transition block in the past. Specifying a transition block in the past could
    result in unexpected behaviour.

<!-- Acronyms and Definitions -->

*[Vanity]: Validators can include anything they like as vanity data.
*[RLP]: Recursive Length Prefix.
