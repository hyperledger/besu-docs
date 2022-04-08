---
description: How to add or remove validators without voting
---

# Add and remove validators without voting

[QBFT](../Configure/Consensus-Protocols/QBFT.md) or [IBFT 2.0](../Configure/Consensus-Protocols/IBFT.md) network
conditions might not allow voting to change validators.
For example, if a majority of the current validators are no longer participating in the network, a vote to add or
remove validators won't be successful.
You can bypass voting and specify new validators using a transition in the genesis file.

!!! warning

    - In most cases, add or remove validators
      [by voting or smart contract for QBFT](../Configure/Consensus-Protocols/QBFT.md#add-and-remove-validators);
      or [by voting for IBFT 2.0](../Configure/Consensus-Protocols/IBFT.md#add-and-remove-validators).
      Use transitions (non-voting method) only when voting isn't possible.
      Using transitions requires coordinating a rolling update of all the nodes in order to pick up the configuration at
      the correct block height.
      Using transitions also leaves the validator overrides permanently in your genesis configuration.
    - Transitions are a Besu-specific feature.
      If you run a mixed-client QBFT network, you can't use transitions to change the validators.

To add or remove validators without voting:

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
                 "qbft": {  // or "ibft2"
                   "blockperiodseconds": 2,
                   "epochlength": 30000,
                   "requesttimeoutseconds": 4
                 },
                 "transitions": {
                   "qbft": [  // or "ibft2"
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
                "qbft": {  // or "ibft2"
                  "blockperiodseconds": 2,
                  "epochlength": 30000,
                  "requesttimeoutseconds": 4
                },
                "transitions": {
                   "qbft": [  // or "ibft2"
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
   You can make a rolling update of the nodes, as long as they're all up before the transition block is processed.
1. To verify the changes after the transition block, call
   [`qbft_getValidatorsByBlockNumber`](../../Reference/API-Methods.md#qbft_getvalidatorsbyblocknumber) or
   [`ibft_getValidatorsByBlockNumber`](../../Reference/API-Methods.md#ibft_getvalidatorsbyblocknumber),
   specifying `latest`.

!!! caution

    Don't specify a transition block in the past.
    Specifying a transition block in the past can result in unexpected behavior, such as causing the network to fork.

## Override smart contract validators

When using
[QBFT contract validator selection](../Configure/Consensus-Protocols/QBFT.md#add-and-remove-validators-using-a-smart-contract),
if network conditions require it, you can bypass the smart contract and specify new validators in the genesis file.
For example, you lose quorum for your current list of contract validators, and you can't perform a transaction to vote
more in.

This requires temporarily
[switching to block header validator selection mode](../Configure/Consensus-Protocols/QBFT.md#swap-validator-management-methods).

To bypass the smart contract and specify new validators:

1. In the genesis file, add a `transitions` configuration item where:

    * `<BlockNumber>` is the upcoming block at which to change validators.
    * `<SelectionMode>` is the validator selection mode to switch to. In this case we'll switch to the
      `blockheader` mode temporarily.
    * `<ValidatorAddressX> ... <ValidatorAddressZ>` are strings representing the account addresses
      of the validators after `<BlockNumber>`. These validators only need to be sufficient to progress
      the chain and allow a new contract to be deployed.

    === "Syntax"

        ```bash
        {
          "config": {
             ...
             "qbft": {
               "blockperiodseconds": 2,
               "epochlength": 30000,
               "requesttimeoutseconds": 4,
               "validatorcontractaddress": "0x0000000000000000000000000000000000007777"
             },
             "transitions": {
               "qbft": [
               {
                 "block": <BlockNumber>,
                 "validatorselectionmode": <SelectionMode>,
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
               "requesttimeoutseconds": 4,
               "validatorcontractaddress": "0x0000000000000000000000000000000000007777"
             },
             "transitions": {
               "qbft": [
               {
                 "block": 2555,
                 "validatorselectionmode": "blockheader",
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
   You can make a rolling update of the nodes, as long as they're all up before the transition block is processed.
1. Deploy a new contract to the blockchain containing the desired list of validators.
1. In the genesis file, add another `transitions` configuration item where:

    * `<BlockNumber>` is the upcoming block at which to change validators.
    * `<SelectionMode>` is the validator selection mode to switch to. In this case we'll switch to
      `contract` mode.
    * `<NewValidatorContractAddress>` is the address of the new smart contract.

    === "Syntax"

        ```bash
        {
          "config": {
             ...
             "qbft": {
               "blockperiodseconds": 2,
               "epochlength": 30000,
               "requesttimeoutseconds": 4,
               “validatorcontractaddress”: “0x0000000000000000000000000000000000007777”
             },
             "transitions": {
               "qbft": [
               {
                "block": 2555,
                "validatorselectionmode": "blockheader",
                "validators": [
                  "0x372a70ace72b02cc7f1757183f98c620254f9c8d",
                  "0x9811ebc35d7b06b3fa8dc5809a1f9c52751e1deb"
                  ]
                },
               {
                 "block": <BlockNumber>,
                 "validatorselectionmode": <SelectionMode>,
                 "validatorcontractaddress": <NewValidatorContractAddress>
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
               "requesttimeoutseconds": 4,
               "validatorcontractaddress": "0x0000000000000000000000000000000000007777"
             },
             "transitions": {
               "qbft": [
               {
                "block": 2555,
                "validatorselectionmode": "blockheader",
                "validators": [
                  "0x372a70ace72b02cc7f1757183f98c620254f9c8d",
                  "0x9811ebc35d7b06b3fa8dc5809a1f9c52751e1deb"
                  ]
                },
               {
                 "block": 2755,
                 "validatorselectionmode": "contract",
                 "validatorcontractaddress": "0x0000000000000000000000000000000000009999"
               }
               ]
             }
          },
          ...
        }
        ```

1. Restart all nodes in the network using the updated genesis file.
   You can make a rolling update of the nodes, as long as they're all up before the transition block is processed.
