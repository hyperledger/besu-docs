---
description: Hyperledger Besu QBFT Proof-of-Authority (PoA) consensus protocol implementation
---

# QBFT

Hyperledger Besu implements the QBFT Proof-of-Authority (PoA) consensus protocol. Private networks
can use QBFT.

!!! warning

    QBFT is currently an early access feature. It is not recommended for production networks with
    business critical impact.

In QBFT networks, approved accounts, known as validators, validate transactions and blocks.
Validators take turns to create the next block. Before inserting the block onto the chain, a
super-majority (greater than 66%) of validators must first sign the block.

!!! warning

    Configure your network to ensure you never lose 1/3 or more of your validators. If more
    than 1/3 of validators stop participating, new blocks are no longer created, and the
    network stalls. It may take significant time to recover once nodes are restarted.

!!! tip
    You can use a plugin to securely store a validator's key using the
    [`--security-module`](../../../Reference/CLI/CLI-Syntax.md#security-module) option.

Existing validators propose and vote to
[add or remove validators](Add-Validators.md#qbft). Adding or removing a validator
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

!!! example "RLP encoded data"

    ```no-lang
    0xf83aa00000000000000000000000000000000000000000000000000000000000000000d5949811ebc35d7b06b3fa8dc5809a1f9c52751e1debc080c0
    ```

### Block time

When the protocol receives a new chain head, the block time (`blockperiodseconds`) timer starts.
When `blockperiodseconds` expires, the round timeout (`requesttimeoutseconds`) timer starts and
the protocol proposes a new block.

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

#### Tuning block timeout

To tune the block timeout for your network deployment:

1. Set `blockperiodseconds` to your desired block time and `requesttimeoutseconds` to two times
   `blockperiodseconds`.
1. Reduce `requesttimeoutseconds` until you start to see round changes occurring.
1. Increase `requesttimeoutseconds` to the value where round changes are no longer occurring.

!!! tip

    View [`TRACE` logs](../../../Reference/API-Methods.md#admin_changeloglevel) to see round change
    log messages.
{!global/Config-Options.md!}

<!-- Acronyms and Definitions -->

*[Vanity]: Validators can include anything they like as vanity data.
*[RLP]: Recursive Length Prefix.

[GoQuorum]: https://docs.goquorum.consensys.net/en/stable/
