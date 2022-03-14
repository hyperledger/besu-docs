---
description: Hyperledger Besu IBFT 2.0 proof of authority (PoA) consensus protocol implementation
---

# IBFT 2.0

Besu implements the IBFT 2.0 proof of authority (PoA) [consensus protocol](../../../Concepts/Consensus-Protocols/Overview-Consensus.md).
IBFT 2.0 is supported for existing private networks, but [QBFT](QBFT.md) is the recommended enterprise-grade
consensus protocol for private networks.

In IBFT 2.0 networks, approved accounts, known as validators, validate transactions and blocks.
Validators take turns to create the next block. Before inserting the block onto the chain, a
super-majority (greater than 66%) of validators must first sign the block.

Existing validators propose and vote to
[add or remove validators](Add-Validators.md#ibft-20). Adding or removing a validator
requires a majority vote (greater than 50%) of validators.

You can [create a private network using IBFT](../../../Tutorials/Private-Network/Create-IBFT-Network.md).

!!! important

    Configure your network to ensure you never lose 1/3 or more of your validators. If more
    than 1/3 of validators stop participating, new blocks are no longer created, and the
    network stalls. It may take significant time to recover once nodes are restarted.

!!! tip

    You can use a plugin to securely store a validator's key using the
    [`--security-module`](../../../Reference/CLI/CLI-Syntax.md#security-module) option.

## Validators

### Minimum number of validators

IBFT 2.0 requires four validators to be Byzantine fault tolerant. Byzantine fault tolerance is the
ability for a blockchain network to function correctly and reach consensus despite nodes failing or
propagating incorrect information to peers.

### Maximum number of validators

As the number of validators increase, the message complexity increases, which can decrease performance.
In [network tests](https://wiki.hyperledger.org/display/BESU/Maximum+Validator+count+for+an+IBFT2+Network), IBFT 2.0 handles up to 30 validators with no loss of performance.

Non-validator nodes don't affect performance and don't count towards the maximum limit.

## Genesis file

To use IBFT 2.0, Besu requires an IBFT 2.0 [genesis file](../Genesis-File.md). The genesis file defines properties
specific to IBFT 2.0.

!!! example "Example IBFT 2.0 genesis file"

    ```json
      {
        "config": {
          "chainId": 1981,
          "muirglacierblock": 0,
          "ibft2": {
            "blockperiodseconds": 2,
            "epochlength": 30000,
            "requesttimeoutseconds": 4,
            "blockreward": "5000000000000000",
            "miningbeneficiary": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
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
* `blockreward` - Optional reward amount in Wei to reward the beneficiary. Defaults to zero (0).
    Can be specified as a hexadecimal (with 0x prefix) or decimal string value. If set, then all
    nodes on the network must use the identical value.
* `miningbeneficiary` - Optional beneficiary of the `blockreward`. Defaults to the validator
    that proposes the block. If set, then all nodes on the network must use the same beneficiary.
* `extraData` - RLP encoded [extra data](#extra-data).

!!! caution

    The `miningbeneficiary` property cannot be updated once your network is started.

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

The `extraData` property is an RLP encoding of:

* 32 bytes of vanity data.
* A list of validator addresses.
* Any validator votes. No vote is included in the genesis block.
* The round the block was created on. The round in the genesis block is 0.
* A list of seals of the validators (signed block hashes). No seals are included in the genesis block.
  
In the genesis block, the important information in the extra data is the list of validators.
All other details have empty values.
Formally, `extraData` in the genesis block contains
`RLP([32 bytes Vanity, List<Validators>, No Vote, Round=Int(0), 0 Seals])`.

!!! info

    RLP encoding is a space-efficient object serialization scheme used in Ethereum.

#### Generating extra data
  
To generate the `extraData` RLP string for inclusion in the genesis file, use the
[`rlp encode`](../../../Reference/CLI/CLI-Subcommands.md#rlp) Besu subcommand.

!!! example

    ```bash
    besu rlp encode --from=toEncode.json
    ```

Where the `toEncode.json` file contains a list of the initial validators, in ascending order.
To write the validator address and copy it to the `toEncode.json` file, use the
[`public-key export-address`](../../../Reference/CLI/CLI-Subcommands.md#export-address) Besu subcommand.
For example:

!!! example "One initial validator in `toEncode.json` file"

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

!!! warning

    If more than 1/3 of validators stop participating, new blocks can no longer be created and
    `requesttimeoutseconds` doubles with each round change. The quickest method
    to resume block production is to restart all validators, which resets `requesttimeoutseconds` to
    its genesis value.

Once `blockperiodseconds` is over, the time from proposing a block to adding the block is
small (usually around one second) even in networks with geographically dispersed validators.

!!! example
    An internal network run by ConsenSys had four geographically dispersed validators in Sweden,
    Sydney, and two in North Virginia. With a `blockperiodseconds` of 5 and a `requesttimeoutseconds`
    of 10, the testnet consistently created blocks with a five second block time.

#### Tuning block timeout

To tune the block timeout for your network deployment:

1. Set `blockperiodseconds` to your desired block time and `requesttimeoutseconds` to two times
   `blockperiodseconds`.
1. Reduce `requesttimeoutseconds` until you start to see round changes occurring.
1. Increase `requesttimeoutseconds` to the value where round changes are no longer occurring.

!!! tip

    View [`TRACE` logs](../../../Reference/API-Methods.md#admin_changeloglevel) to see round change
    log messages.

Use a [transition](#transitions) to update the `blockperiodseconds` in an existing network.

{!global/Config-Options.md!}

## Transitions

The `transitions` genesis configuration item allows you to specify a future block number at which to change IBFT 2.0
network configuration in an existing network.
For example, you can update the [block time](#configure-block-time-on-an-existing-network-deployment),
[block reward](#configure-block-rewards-on-an-existing-network-deployment), or
[mining beneficiary](#configure-the-mining-beneficiary-on-an-existing-network-deployment).

!!! caution

    Do not specify a transition block in the past.
    Specifying a transition block in the past could result in unexpected behavior, such as causing
    the network to fork.

### Configure block time on an existing network deployment

To update an existing network with a new `blockperiodseconds`:

1. Stop all nodes in the network.
2. In the [genesis file](#genesis-file), add the `transitions` configuration item where:

    * `<FutureBlockNumber>` is the upcoming block at which to change `blockperiodseconds`.
    * `<NewValue>` is the updated value for `blockperiodseconds`.

    !!! example "Transitions configuration"

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
                     "block": <FutureBlockNumber>,
                     "blockperiodseconds": <NewValue>
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
                     "block": 1240,
                     "blockperiodseconds": 4
                   }
                   ]
                 }
              },
              ...
            }
            ```

3. Restart all nodes in the network using the updated genesis file.
4. To verify the changes after the transition block, call
   [`ibft_getValidatorsByBlockNumber`](../../../Reference/API-Methods.md#ibft_getvalidatorsbyblocknumber), specifying `latest`.

### Configure block rewards on an existing network deployment

To update an existing network with a new `blockreward`:

1. Stop all nodes in the network.
2. In the [genesis file](#genesis-file), add the `transitions` configuration item where:

    * `<FutureBlockNumber>` is the upcoming block at which to change `blockreward`.
    * `<NewValue>` is the updated value for `blockreward`.

    !!! example "Transitions configuration"

        === "Syntax"

            ```bash
            {
              "config": {
                 ...
                 "ibft2": {
                   "blockperiodseconds": 2,
                   "epochlength": 30000,
                   "requesttimeoutseconds": 4
                   "blockreward": "5000000000000000"
                 },
                 "transitions": {
                   "ibft2": [
                   {
                     "block": <FutureBlockNumber>,
                     "blockreward": <NewValue>
                   },
                   {
                     "block": <FutureBlockNumber>,
                     "blockreward": <NewValue>
                   },
                   {
                     "block": <FutureBlockNumber>,
                     "blockreward": <NewValue>
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
                   "blockreward": "5000000000000000"
                 },
                 "transitions": {
                   "ibft2": [
                   {
                     "block": 10,
                     "blockreward": "6000000000000000"
                   },
                   {
                     "block": 15,
                     "blockreward": "75000000000000000"
                   },
                   {
                     "block": 20,
                     "blockreward": "0"
                   }
                   ]
                 }
              },
              ...
            }
            ```

    !!! note

        You can add multiple `blockreward` updates in one transition object by specifying multiple future blocks.

3. Restart all nodes in the network using the updated genesis file.

### Configure the mining beneficiary on an existing network deployment

To update an existing network with a new mining beneficiary:

1. Stop all nodes in the network.
2. In the [genesis file](#genesis-file), add the `transitions` configuration item where:

    * `<FutureBlockNumber>` is the upcoming block at which to change `miningbeneficiary`.
    * `<NewAddress>` is the updated 20-byte address for `miningbeneficiary`.
     Starting at `<FutureBlockNumber>`, block rewards go to this address.

    !!! example "Transitions configuration"

        === "Syntax"

            ```bash
            {
              "config": {
                "chainId": 999,
                "byzantiumBlock": 0,
                "ibft2": {
                  "blockperiodseconds": 1,
                  "epochlength": 30000,
                  "requesttimeoutseconds": 5,
                  "blockreward": "5000000000000000000",
                  "miningbeneficiary": "0x0000000000000000000000000000000000000001"
                },
                "transitions": {
                  "ibft2": [
                      {
                          "block": <FutureBlockNumber>, 
                          "miningbeneficiary": <NewAddress>
                      },
                      {
                          "block": <FutureBlockNumber>, 
                          "miningbeneficiary": <NewAddress>
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
                "chainId": 999,
                "byzantiumBlock": 0,
                "ibft2": {
                  "blockperiodseconds": 1,
                  "epochlength": 30000,
                  "requesttimeoutseconds": 5,
                  "blockreward": "5000000000000000000",
                  "miningbeneficiary": "0x0000000000000000000000000000000000000001"
                },
                "transitions": {
                  "ibft2": [
                  {
                    "block": 10000, 
                    "miningbeneficiary": "",
                  },
                  {
                    "block": 20000, 
                    "miningbeneficiary": "0x0000000000000000000000000000000000000002",
                  }
                  ]
                }
              },
              ...
            }
            ```

    !!! note

        Setting the `miningbeneficiary` to an empty value clears out any override so that block rewards go to the
        block producer rather than a global override address.

3. Restart all nodes in the network using the updated genesis file.

<!-- Acronyms and Definitions -->

*[vanity data]: Validators can include anything they like as vanity data.
*[RLP]: Recursive Length Prefix
