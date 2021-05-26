---
description: Hyperledger Besu QBFT Proof-of-Authority (PoA) consensus protocol implementation
---

# QBFT

Hyperledger Besu implements the QBFT Proof-of-Authority (PoA) consensus protocol. Private networks
can use QBFT.

!!! warning

    Configure your network to ensure you never lose 1/3 or more of your validators. If more
    than 1/3 of validators stop participating, new blocks are no longer created, and the
    network stalls. It may take significant time to recover once nodes are restarted.

In QBFT networks, approved accounts, known as validators, validate transactions and blocks.
Validators take turns to create the next block. Before inserting the block onto the chain, a
super-majority (greater than 66%) of validators must first sign the block.

!!! tip
    You can use a plugin to securely store a validator's key using the
    [`--security-module`](../../../Reference/CLI/CLI-Syntax.md#security-module) option.

Existing validators propose and vote to
[add or remove validators](#adding-and-removing-validators). Adding or removing a validator
requires a majority vote (greater than 50%) of validators.

## Minimum number of validators

QBFT requires four validators to be Byzantine fault tolerant. Byzantine fault tolerance is the
ability for a blockchain network to function correctly and reach consensus despite nodes failing or
propagating incorrect information to peers.

## Genesis file

To use QBFT, Besu requires a QBFT genesis file. The genesis file defines properties
specific to QBFT.

!!! example "Sample QBFT genesis file"

    Example genesis file for a 4 nodes QBFT network.

    ```json
    {
    "config": {
        "chainid": 1337,
        "homesteadBlock": 0,
        "eip150Block": 0,
        "eip155Block": 0,
        "eip158Block": 0,
        "byzantiumBlock": 0,
        "qbft": {
            "epochlength": 30000,
            "blockperiodseconds": 5,
            "requesttimeoutseconds": 10
        }
    },
    "nonce": "0x0",
    "timestamp": "0x5b3d92d7",
    "extraData": "0xf87aa00000000000000000000000000000000000000000000000000000000000000000f8549464a702e6263b7297a96638cac6ae65e6541f4169943923390ad55e90c237593b3b0e401f3b08a0318594aefdb9a738c9f433e5b6b212a6d62f6370c2f69294c7eeb9a4e00ce683cf93039b212648e01c6c6b78c080c0",
    "gasLimit": "0x29b92700",
    "difficulty": "0x1",
    "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "alloc": {
        "64d9be4177f418bcf4e56adad85f33e3a64efe22": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "9f66f8a0f0a6537e4a36aa1799673ea7ae97a166": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "a7f25969fb6f3d5ac09a88862c90b5ff664557a7": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        },
        "f4bbfd32c11c9d63e9b4c77bb225810f840342df": {
            "balance": "0x446c3b15f9926687d2c40534fdb564000000000000"
        }
    },
    "number": "0x0",
    "gasUsed": "0x0",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
    }
    ```

The QBFT properties are:

* `blockperiodseconds` - The minimum block time, in seconds.
* `epochlength` - The number of blocks after which to reset all votes.
* `requesttimeoutseconds` - The timeout for each consensus round before a round change, in seconds.
* `blockreward` - Optional reward amount in Wei to reward the beneficiary. Defaults to zero (0).
    Can be specified as a hexadecimal (with 0x prefix) or decimal string value. If set, then all
    nodes on the network must use the identical value.
* `miningbeneficiary` - Optional beneficiary of the `blockreward`. Defaults to the validator
    that proposes the block. If set, then all nodes on the network must use the same beneficiary.
* `extraData` - `RLP([32 bytes Vanity, List<Validators>, No Vote, Round=Int(0), 0 Seals])`.

!!! caution

    The `blockperiodseconds`, `blockreward`, and  `miningbeneficiary` properties
    cannot be updated once your network is started.

    We do not recommend changing `epochlength` in a running network. Changing the `epochlength`
    after genesis can result in illegal blocks.

The properties with specific values in the QBFT genesis files are:

* `nonce` - `0x0`
* `difficulty` - `0x1`
* `mixHash` - `0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365` for Istanbul
  block identification.

To start a node on a QBFT private network, use the
[`--genesis-file`](../../../Reference/CLI/CLI-Syntax.md#genesis-file) option to specify the custom
genesis file.

### Extra data

The `extraData` property is RLP encoded. RLP encoding is a space efficient object serialization
scheme used in Ethereum. To generate the `extraData` RLP string for inclusion in the genesis file,
use the [`rlp encode`](../../../Reference/CLI/CLI-Subcommands.md#rlp) Besu subcommand.

!!! example

    ```bash
    besu rlp encode --from=toEncode.json --type=QBFT_EXTRA_DATA
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

<!-- Topics shared with IBFT 2.0 -->
{!global/Blocktime.md!}
{!global/Config-Options.md!}

## Adding and removing validators

Add and remove validators by [voting](#adding-and-removing-validators-by-voting) or if network
conditions require it, [without voting](#adding-and-removing-validators-without-voting).

### Adding and removing validators by voting

To propose adding or removing validators using the JSON-RPC methods, enable the HTTP interface
using [`--rpc-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) or the
WebSockets interface using
[`--rpc-ws-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-enabled).

The QBFT API methods are not enabled by default. To enable them, specify the
[`--rpc-http-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`--rpc-ws-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) option and include `QBFT`.

The JSON-RPC methods to add or remove validators are:

* [`qbft_getPendingVotes`](../../../Reference/API-Methods.md#qbft_getPendingVotes)
* [`qbft_proposeValidatorVote`](../../../Reference/API-Methods.md#qbft_proposeValidatorVote)
* [`qbft_discardValidatorVote`](../../../Reference/API-Methods.md#qbft_discardValidatorVote).

!!! important

    A majority of existing validators must agree to add or remove a validator. That is, more that
    50% of validators must execute `qbft_proposeValidatorVote` to add or remove a validator. For
    example, if you have four validators, the vote must be made on three validators.

To view validator metrics for a specified block range, use
[`qbft_getSignerMetrics`](../../../Reference/API-Methods.md#qbft_getsignermetrics).

!!! tip
    `qbft_getSignerMetrics` can be used to identify validators that are not active. The validator's `lastProposedBlockNumber` will be `0x0`

#### Adding a validator

To propose adding a validator, call
[`qbft_proposeValidatorVote`](../../../Reference/API-Methods.md#qbft_proposeValidatorVote),
specifying the address of the proposed validator and `true`. A majority of validators must execute
the call.

!!! example "JSON-RPC `qbft_proposeValidatorVote` Request Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_proposeValidatorVote","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", true], "id":1}' <JSON-RPC-endpoint:port>
    ```

When the validator proposes the next block, the protocol inserts one proposal received from
[`qbft_proposeValidatorVote`](../../../Reference/API-Methods.md#qbft_proposeValidatorVote) into the
block. If blocks include all proposals, subsequent blocks proposed by the validator will not
contain a vote.

When more than half of the existing validators have published a matching proposal, the protocol
adds the proposed validator to the validator pool and the validator can begin validating blocks.

To return a list of validators and confirm the addition of a proposed validator, use
[`qbft_getValidatorsByBlockNumber`](../../../Reference/API-Methods.md#qbft_getValidatorsByBlockNumber).

!!! example "JSON-RPC `qbft_getValidatorsByBlockNumber` Request Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_getValidatorsByBlockNumber","params":["latest"], "id":1}' <JSON-RPC-endpoint:port>
    ```

To discard your proposal after confirming the addition of a validator, call
[`qbft_discardValidatorVote`](../../../Reference/API-Methods.md#qbft_discardValidatorVote),
specifying the address of the proposed validator.

!!! example "JSON-RPC `qbft_discardValidatorVote` Request Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_discardValidatorVote","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"], "id":1}' <JSON-RPC-endpoint:port>
    ```

#### Removing a validator

The process for removing a validator is the same as adding a validator except you specify `false`
as the second parameter of
[`qbft_proposeValidatorVote`](../../../Reference/API-Methods.md#qbft_proposeValidatorVote).

#### Epoch transition

At each epoch transition, QBFT discards all pending votes collected from received blocks.
Existing proposals remain in effect and validators re-add their vote the next time they create a
block.

An epoch transition occurs every `epochLength` blocks. Define `epochlength` in the QBFT genesis
file.

### Adding and removing validators without voting

Network conditions might not allow voting to change validators. For example, if a majority
of the current validators are no longer participating in the network, so a vote to add or remove
validators will never be successful. You can bypass voting and specify new validators in the genesis
file.

To add or remove validators without voting:

1. Stop all nodes in the network.
1. In the genesis file, add the `transitions` configuration item where:

    * `<BlockNumber>` is the upcoming block at which to change validators.
    * `<ValidatorAddressX> ... <ValidatorAddressZ>` are strings representing the account addresses
      of the validators after `<BlockNumber>`.

    !!! example "Transitions object in the genesis file"

        === "Syntax"

            ```bash
            {
              "config": {
                 ...
                 "qbft": {
                   "blockperiodseconds": 2,
                   "epochlength": 30000,
                   "requesttimeoutseconds": 4
                 },
                 "transitions": {
                   "qbft": [
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

        === "Example"

            ```bash
            {
              "config": {
                ...
                "qbft": {
                  "blockperiodseconds": 2,
                  "epochlength": 30000,
                  "requesttimeoutseconds": 4
                },
                "transitions": {
                   "qbft": [
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
   [`qbft_getValidatorsByBlockNumber`](../../../Reference/API-Methods.md#qbft_getvalidatorsbyblocknumber),
   specifying `latest`.

!!! caution
    Do not specify a transition block in the past. Specifying a transition block in the past could
    result in unexpected behaviour.

<!-- Acronyms and Definitions -->

*[Vanity]: Validators can include anything they like as vanity data.
*[RLP]: Recursive Length Prefix.

[GoQuorum]: https://docs.goquorum.consensys.net/en/stable/