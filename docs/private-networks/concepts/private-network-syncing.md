---
sidebar_label: Node synchronization
sidebar_position: 4
description: Learn about node synchronization for private networks.
tags:
  - private networks
---

# Node synchronization for private networks

For private, permissioned blockchain networks, Besu uses the same [synchronization 
modes](/public-networks/concepts/sync-node) as public networks, but with specific configurations for private network needs.

To sync Besu on a private network:

- Ensure all nodes use compatible sync modes and configurations.
- Configure the network with a custom genesis file.
- Set the network ID and bootnodes specific to your private network.
- Implement permissioning features to control network access.

:::warning Early access feature 

`--Xsnapsync-bft-enabled` is an early access feature available since the release of Besu version 24.7.1. 
It is not stable and is not fully supported in all versions of Besu. 
Use this option with caution.

Use `--Xsnapsync-bft-enabled` in private, permissioned networks that use BFT consensus mechanisms.
When enabled, this option allows Besu to use Snap sync on BFT networks. 
Use this option in combination with the `--sync-mode=SNAP` option. 
The default is `false`.

:::

Choose the appropriate sync mode based on your private network's requirements and node purposes.

| Sync mode  | Description                                                                                                                          | Requirements                                                           | Method                                                                                                               | Limitations                                                                     |
|------------|--------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Snap       | Recommended for fastest sync and lowest storage requirements on Mainnet.                                                             | Available as an _early access feature_ in Besu version 24.7.1 or later | Downloads as many leaves of the trie as possible, reconstructs the trie locally. Snap is faster than Fast sync.      | Cannot switch from fast sync to snap sync mid-process.                          |
| Checkpoint | Efficient sync from a specific checkpoint block configured in the genesis file.                                                      | Besu version 22.4.3 or later                                           | Syncs from a checkpoint block defined in the genesis file. Is the fast sync and has the lowest storage requirements. | Not supported for QBFT or IBFT 2.0 networks without a checkpoint configuration. |
| Fast       | Default for named networks except the dev development network.                                                                       | None                                                                   | Downloads block headers and transaction receipts, verifies chain from genesis block.                                 | Not supported with private transactions.                                        |
| Full       | Downloads and verifies the entire blockchain and state from the genesis block. This builds an archive node, with full state history. | None                                                                   | Downloads entire blockchain, verifies all states from genesis block.                                                 | Slowest sync mode, requires the most disk space.                                |
