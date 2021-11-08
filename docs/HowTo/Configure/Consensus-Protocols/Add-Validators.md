---
description: Add and remove Clique signers, and IBFT 2.0 and QBFT validators to/from existing networks
---

# Adding and removing signers and validators

You can add and remove signers to/from an existing [Clique](Clique.md) network, and add and remove
validators to/from an existing [IBFT 2.0](IBFT.md) or [QBFT](QBFT.md) network.

To propose adding or removing participants using the JSON-RPC methods,
enable the HTTP interface with [`--rpc-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) or the
WebSockets interface with [`--rpc-ws-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-enabled).

## Clique

The Clique API methods are not enabled by default.
To enable them, specify the [`--rpc-http-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`--rpc-ws-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) option and include `CLIQUE`.

The JSON-RPC methods to add or remove signers are:

* [`clique_propose`](../../../Reference/API-Methods.md#clique_propose).
* [`clique_getSigners`](../../../Reference/API-Methods.md#clique_getsigners).
* [`clique_discard`](../../../Reference/API-Methods.md#clique_discard).

!!! important

    A majority of existing signers must agree to add or remove a signer.
    That is, more than 50% of signers must execute `clique_propose` to add or remove a signer.
    For example, if you have four signers, the same vote must be made by three signers.

To view signer metrics for a specified block range, call
[`clique_getSignerMetrics`](../../../Reference/API-Methods.md#clique_getsignermetrics).

!!! tip

    `clique_getSignerMetrics` can be used to identify validators that are not active.
    An inactive validator's `lastProposedBlockNumber` is `0x0`.

### Adding a signer

To propose adding a signer to a Clique network, call
[`clique_propose`](../../../Reference/API-Methods.md#clique_propose), specifying the address of the proposed signer and `true`.
A majority of signers must execute the call.

!!! example "JSON-RPC `clique_propose` request example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"clique_propose","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", true], "id":1}' <JSON-RPC-endpoint:port>
    ```

When the signer creates the next block, the signer adds a vote to the block for the proposed signer.

When more than half of the existing signers propose adding the signer, with their votes distributed in blocks, the
signer can begin signing blocks.

To return a list of signers and confirm the addition of a proposed signer, call
[`clique_getSigners`](../../../Reference/API-Methods.md#clique_getsigners).

!!! example "JSON-RPC `clique_getSigners` request example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"clique_getSigners","params":["latest"], "id":1}' <JSON-RPC-endpoint:port>
    ```

To discard your proposal after confirming the addition of a signer, call
[`clique_discard`](../../../Reference/API-Methods.md#clique_discard) specifying the address of the proposed signer.

!!! example "JSON-RPC `clique_discard` request example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"clique_discard","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"], "id":1}' <JSON-RPC-endpoint:port>
    ```

### Removing a signer

The process for removing a signer from a Clique network is the same as [adding a signer](#adding-a-signer), except you
specify `false` as the second parameter of [`clique_propose`](../../../Reference/API-Methods.md#clique_propose).

### Epoch transition

At each epoch transition, Clique discards all pending votes collected from received blocks.
Existing proposals remain in effect and signers re-add their vote the next time they create a block.

Define the number of blocks between epoch transitions in the
[Clique genesis file](Clique.md#genesis-file).

## IBFT 2.0

In an [IBFT 2.0](IBFT.md) network, add and remove validators by
[voting](#adding-and-removing-validators-by-voting) or if network conditions require it,
[without voting](#adding-and-removing-validators-without-voting).

### Adding and removing validators by voting

The IBFT API methods are not enabled by default.
To enable them, specify the [`--rpc-http-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`--rpc-ws-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) option and include `IBFT`.

The JSON-RPC methods to add or remove validators are:

* [`ibft_getPendingVotes`](../../../Reference/API-Methods.md#ibft_getPendingVotes).
* [`ibft_proposeValidatorVote`](../../../Reference/API-Methods.md#ibft_proposeValidatorVote).
* [`ibft_discardValidatorVote`](../../../Reference/API-Methods.md#ibft_discardValidatorVote).

!!! important

    A majority of existing validators must agree to add or remove a validator.
    That is, more than 50% of validators must execute `ibft_proposeValidatorVote` to add or remove a validator.
    For example, if you have four validators, the same vote must be made by three validators.

To view validator metrics for a specified block range, use
[`ibft_getSignerMetrics`](../../../Reference/API-Methods.md#ibft_getsignermetrics).

!!! tip

    `ibft_getSignerMetrics` can be used to identify validators that are not active.
    An inactive validator's `lastProposedBlockNumber` is `0x0`.

#### Adding a validator

To propose adding a validator to an IBFT 2.0 network, call
[`ibft_proposeValidatorVote`](../../../Reference/API-Methods.md#ibft_proposevalidatorvote), specifying the address of the
proposed validator and `true`.
A majority of validators must execute the call.

!!! example "JSON-RPC `ibft_proposeValidatorVote` request example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_proposeValidatorVote","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", true], "id":1}' <JSON-RPC-endpoint:port>
    ```

When the validator proposes the next block, the protocol inserts one proposal received from
[`ibft_proposeValidatorVote`](../../../Reference/API-Methods.md#ibft_proposevalidatorvote) into the block.
If blocks include all proposals, subsequent blocks proposed by the validator will not contain a vote.

When more than half of the existing validators have published a matching proposal, the protocol adds the proposed
validator to the validator pool and the validator can begin validating blocks.

To return a list of validators and confirm the addition of a proposed validator, use
[`ibft_getValidatorsByBlockNumber`](../../../Reference/API-Methods.md#ibft_getvalidatorsbyblocknumber).

!!! example "JSON-RPC `ibft_getValidatorsByBlockNumber` request example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_getValidatorsByBlockNumber","params":["latest"], "id":1}' <JSON-RPC-endpoint:port>
    ```

To discard your proposal after confirming the addition of a validator, call
[`ibft_discardValidatorVote`](../../../Reference/API-Methods.md#ibft_discardvalidatorvote),
specifying the address of the proposed validator.

!!! example "JSON-RPC `ibft_discardValidatorVote` request example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"ibft_discardValidatorVote","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"], "id":1}' <JSON-RPC-endpoint:port>
    ```

#### Removing a validator

The process for removing a validator from an IBFT 2.0 network is the same as [adding a validator](#adding-a-validator)
except you specify `false` as the second parameter of
[`ibft_proposeValidatorVote`](../../../Reference/API-Methods.md#ibft_proposevalidatorvote).

#### Epoch transition

At each epoch transition, IBFT 2.0 discards all pending votes collected from received blocks.
Existing proposals remain in effect and validators re-add their vote the next time they create a
block.

An epoch transition occurs every `epochLength` blocks.
Define `epochlength` in the [IBFT 2.0 genesis file](IBFT.md#genesis-file).

### Adding and removing validators without voting

IBFT 2.0 network conditions might not allow voting to change validators.
For example, if a majority of the current validators are no longer participating in the network, a vote to add or remove
validators can't be successful.
You can bypass voting and specify new validators in the genesis file.

To add or remove validators without voting:

1. Stop all nodes in the network.
1. In the [genesis file](IBFT.md#genesis-file), add the `transitions` configuration item where:

    * `<BlockNumber>` is the upcoming block at which to change validators.
    * `<ValidatorAddressX> ... <ValidatorAddressZ>` are strings representing the account addresses
      of the validators after `<BlockNumber>`.

    !!! example "Transitions object in the genesis file"

        === "Syntax"

            ```bash
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

        === "Example"

            ```bash
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
   [`ibft_getValidatorsByBlockNumber`](../../../Reference/API-Methods.md#ibft_getvalidatorsbyblocknumber), specifying `latest`.

!!! caution

    Do not specify a transition block in the past.
    Specifying a transition block in the past could result in unexpected behavior,  such as causing
    the network to fork

## QBFT

QBFT provides two methods (modes) to manage validators:

* [Block header validator selection](#adding-and-removing-validators-by-voting) - Existing validators propose
    and vote to  add or remove validators, or if network conditions require it, [without voting](#adding-and-removing-validators-without-voting).
* [Contract validator selection](#adding-and-removing-validators-using-a-smart-contract) - Use a smart contract
    to add or remove validators.

### Adding and removing validators by voting

The QBFT API methods are not enabled by default. To enable them, specify the
[`--rpc-http-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`--rpc-ws-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) option and include `QBFT`.

The JSON-RPC methods to add or remove validators are:

* [`qbft_getPendingVotes`](../../../Reference/API-Methods.md#qbft_getpendingvotes)
* [`qbft_proposeValidatorVote`](../../../Reference/API-Methods.md#qbft_proposevalidatorvote)
* [`qbft_discardValidatorVote`](../../../Reference/API-Methods.md#qbft_discardvalidatorvote).

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
[`qbft_proposeValidatorVote`](../../../Reference/API-Methods.md#qbft_proposevalidatorvote),
specifying the address of the proposed validator and `true`. A majority of validators must execute
the call.

!!! example "JSON-RPC `qbft_proposeValidatorVote` request example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_proposeValidatorVote","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", true], "id":1}' <JSON-RPC-endpoint:port>
    ```

When the validator proposes the next block, the protocol inserts one proposal received from
[`qbft_proposeValidatorVote`](../../../Reference/API-Methods.md#qbft_proposevalidatorvote) into the
block. If blocks include all proposals, subsequent blocks proposed by the validator will not
contain a vote.

When more than half of the existing validators have published a matching proposal, the protocol
adds the proposed validator to the validator pool and the validator can begin validating blocks.

To return a list of validators and confirm the addition of a proposed validator, use
[`qbft_getValidatorsByBlockNumber`](../../../Reference/API-Methods.md#qbft_getvalidatorsbyblocknumber).

!!! example "JSON-RPC `qbft_getValidatorsByBlockNumber` request example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_getValidatorsByBlockNumber","params":["latest"], "id":1}' <JSON-RPC-endpoint:port>
    ```

To discard your proposal after confirming the addition of a validator, call
[`qbft_discardValidatorVote`](../../../Reference/API-Methods.md#qbft_discardvalidatorvote),
specifying the address of the proposed validator.

!!! example "JSON-RPC `qbft_discardValidatorVote` request example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"qbft_discardValidatorVote","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"], "id":1}' <JSON-RPC-endpoint:port>
    ```

#### Removing a validator

The process for removing a validator is the same as adding a validator except you specify `false`
as the second parameter of
[`qbft_proposeValidatorVote`](../../../Reference/API-Methods.md#qbft_proposevalidatorvote).

#### Epoch transition

At each epoch transition, QBFT discards all pending votes collected from received blocks.
Existing proposals remain in effect and validators re-add their vote the next time they create a
block.

An epoch transition occurs every `epochLength` blocks. Define `epochlength` in the QBFT genesis
file.

### Adding and removing validators without voting

QBFT network conditions might not allow voting to change validators. For example, if a majority
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
    result in unexpected behaviour, such as causing the network to fork.

### Adding and removing validators using a smart contract

You can deploy the validator smart contract in a QBFT network by specifying the contract details in the
[genesis file](QBFT.md#genesis-file).

Users can create their own smart contracts to add or remove validators based on their organisational requirements.
[View the example smart contract] for more information on how to create and deploy the smart contract.

[View the example smart contract]: https://github.com/ConsenSys/validator-smart-contracts
