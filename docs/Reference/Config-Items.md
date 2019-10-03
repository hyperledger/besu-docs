description: Configuration items specified in the Hyperledger Besu genesis file 
<!--- END of page meta data -->

# Genesis File 

The genesis file contains [network configuration items](#configuration-items) and [genesis block parameters](#genesis-block-parameters). 

## Configuration Items

Network configuration items are specified in the genesis file in the `config` object.  
 
| Item                | Description                                                                                                                              |
|---------------------|-:----------------------------------------------------------------------------------------------------------------------------------------|
| Chain ID            | [Chain ID for the network](../Concepts/NetworkID-And-ChainID.md)                                                                                      |
| Milestone blocks    | [Milestone blocks for the network](#milestone-blocks)                                                                                    |
| `ethash`            | Specifies network uses [Ethash](../Concepts/Consensus-Protocols/Overview-Consensus.md) and contains [`fixeddifficulty`](#Fixed Difficulty)         |
| `clique`            | Specifies network uses [Clique](../HowTo/Configure/Consensus-Protocols/Clique.md) and contains [Clique configuration items](../HowTo/Configure/Consensus-Protocols/Clique.md#genesis-file)                              |
| `ibft2`             | Specifies network uses [IBFT 2.0](../HowTo/Configure/Consensus-Protocols/IBFT.md) and contains [IBFT 2.0 configuration items](../HowTo/Configure/Consensus-Protocols/IBFT.md#genesis-file)                            |
| `contractSizeLimit` | Maximum contract size in bytes. Specify in [free gas networks](../HowTo/Configure/FreeGas.md). Default is `24576` and the maximum size is `2147483647`.     |
| `evmStackSize`      | Maximum stack size. Specify to increase the maximum stack size in private networks with very complex smart contracts. Default is `1024`. |


## Genesis Block Parameters  
 
The purpose of some genesis block parameters varies depending on the consensus protocol 
(Ethash, [Clique](../HowTo/Configure/Consensus-Protocols/Clique.md), or [IBFT 2.0](../HowTo/Configure/Consensus-Protocols/IBFT.md)). 
These parameters include: 

* `difficulty`
* `extraData`
* `mixHash`
 
Genesis block parameters with the same purpose across all consensus protocols are described below. 

| Item                | Description                                                                                                                              |
|---------------------|-:----------------------------------------------------------------------------------------------------------------------------------------|
| `coinbase`          | Address to which mining rewards are paid. Can be any value in the genesis block (commonly set to `0x0000000000000000000000000000000000000000`). 
| `gasLimit`          | Block gas limit. Total gas limit for all transactions in a block.                                                                                       |
| `nonce`             | Used in block computation. Can be any value in the genesis block (commonly set to `0x0`). 
| `timestamp`         | Creation date and time of the block.  Must be before the next block so we recommend specifying `0x0` in the genesis file. 
| `alloc`             | Defines [accounts with balances](Accounts-for-Testing.md) or [contracts](../HowTo/Configure/Contracts-in-Genesis.md). 

## Milestone Blocks 

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
    When specifying the milestone block for private networks, you only need to specify the latest milestone
    because the milestones that precede it are implied.  

## Fixed Difficulty 

Use `fixeddifficulty` to specify a fixed difficulty in private networks using Ethash.  

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
    