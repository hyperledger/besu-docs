---
description: Configuration items specified in the Hyperledger Besu genesis file
---

# Genesis file

The genesis file contains [network configuration items](#configuration-items) and
[genesis block parameters](#genesis-block-parameters).

## Configuration items

Network configuration items are specified in the genesis file in the `config` object.  

| Item                | Description                                                                                                                                                                                |
|---------------------|-:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Chain ID            | [Chain ID for the network](../Concepts/NetworkID-And-ChainID.md)                                                                                                                           |
| Milestone blocks    | [Milestone blocks for the network](#milestone-blocks)                                                                                                                                      |
| `ethash`            | Specifies network uses [Ethash](../Concepts/Consensus-Protocols/Overview-Consensus.md) and contains [`fixeddifficulty`](#Fixed Difficulty)                                                 |
| `clique`            | Specifies network uses [Clique](../HowTo/Configure/Consensus-Protocols/Clique.md) and contains [Clique configuration items](../HowTo/Configure/Consensus-Protocols/Clique.md#genesis-file) |
| `ibft2`             | Specifies network uses [IBFT 2.0](../HowTo/Configure/Consensus-Protocols/IBFT.md) and contains [IBFT 2.0 configuration items](../HowTo/Configure/Consensus-Protocols/IBFT.md#genesis-file) |
| `qbft`              | Specifies network uses [QBFT](../HowTo/Configure/Consensus-Protocols/QBFT.md) and contains [QBFT configuration items](../HowTo/Configure/Consensus-Protocols/QBFT.md#genesis-file) |
| `transitions`       | Specifies block at which to change [IBFT 2.0](../HowTo/Configure/Consensus-Protocols/Add-Validators.md#adding-and-removing-validators-without-voting) or [QBFT](../HowTo/Configure/Consensus-Protocols/Add-Validators.md#adding-and-removing-validators-without-voting_1) validators. |
| `contractSizeLimit` | Maximum contract size in bytes. Specify in [free gas networks](../HowTo/Configure/FreeGas.md). The default is `24576` and the maximum size is `2147483647`.                                |
| `evmStackSize`      | Maximum stack size. Specify to increase the maximum stack size in private networks with complex smart contracts. The default is `1024`.                                                    |
| `isQuorum`          | Set to `true` to allow [interoperable private transactions] between Hyperledger Besu and [GoQuorum clients] using the Tessera private transaction manager.                                 |
| `ecCurve`           | Specifies [the elliptic curve to use](../HowTo/Configure/Alternative-EC-Curves.md). Default is `secp256k1`.                                                                                            |

## Genesis block parameters

The purpose of some genesis block parameters varies depending on the consensus protocol (Ethash,
[Clique](../HowTo/Configure/Consensus-Protocols/Clique.md),
[IBFT 2.0](../HowTo/Configure/Consensus-Protocols/IBFT.md), or
[QBFT](../HowTo/Configure/Consensus-Protocols/QBFT.md)). These parameters include:

* `difficulty`
* `extraData`
* `mixHash`.

The following table describes the genesis block parameters with the same purpose across all
consensus protocols.

| Item                | Description                                                                                                                             |
|---------------------|-:---------------------------------------------------------------------------------------------------------------------------------------|
| `coinbase`          | Address to pay mining rewards to. Can be any value in the genesis block (commonly set to `0x0000000000000000000000000000000000000000`). |
| `gasLimit`          | Block gas limit. Total gas limit for all transactions in a block.                                                                       |
| `nonce`             | Used in block computation. Can be any value in the genesis block (commonly set to `0x0`).                                               |
| `timestamp`         | Creation date and time of the block. Must be before the next block so we recommend specifying `0x0` in the genesis file.               |
| `alloc`             | Defines [accounts with balances](Accounts-for-Testing.md) or [contracts](../HowTo/Configure/Contracts-in-Genesis.md).                   |

## Milestone blocks

In public networks, the milestone blocks specify the blocks at which the network changed protocol.

!!! example "Ethereum Mainnet Milestone Blocks"

    ```json
    {
      "config": {
        ...
        "homesteadBlock": 1150000,
        "daoForkBlock": 1920000,
        "daoForkSupport": true,
        "eip150Block": 2463000,
        "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
        "eip155Block": 2675000,
        "eip158Block": 2675000,
        "byzantiumBlock": 4370000,
        "constantinopleBlock": 7280000,
        "constantinopleFixBlock": 7280000,
        ...
      },
    }
    ```

In private networks, the milestone block defines the protocol version for the network.

!!! example "Private Network Milestone Block"

    ```json
    {
      "config": {
        ...
        "constantinopleFixBlock": 0,
        ...
      },
    }
    ```

!!! tip

    When specifying the milestone block for private networks, you only need to specify the latest
    milestone. It is implied this includes the preceding milestones.

## Fixed difficulty

Use `fixeddifficulty` to specify a fixed difficulty in private networks using Ethash. This will keep
the network's difficulty constant and override the `difficulty` parameter from the genesis file.

!!! example

    ```json
    {
      "config": {
          ...
          "ethash": {
            "fixeddifficulty": 1000
          },

       },
      ...
    }
    ```

!!! tip
    Using `fixeddifficulty` is not recommended for use with Ethash outside of test environments.
    For production networks using Ethash, we recommend setting a low `difficulty` value in the genesis file instead.
    Ethash will adjust the difficulty of the network based on hashrate to produce blocks at the targeted frequency.

<!--links-->
[GoQuorum clients]: https://docs.goquorum.consensys.net/
[interoperable private transactions]: ../HowTo/Use-Privacy/Use-GoQuorum-compatible-privacy.md
