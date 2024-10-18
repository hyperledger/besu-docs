---
sidebar_label: Node synchronization
sidebar_position: 4
description: Learn about node synchronization for private networks.
tags:
  - private networks
---

# Node synchronization for private networks

For private, permissioned blockchain networks, Besu uses the same [synchronization 
modes as public networks](../../public-networks/concepts/node-sync.md), but with specific configurations
for private network needs.

To sync Besu on a private network:

- Ensure all nodes use compatible sync modes and configurations.
- Configure the network with a custom genesis file.
- Set the network ID and bootnodes specific to your private network.
- Implement permissioning features to control network access.

The following is an overview of the private network sync modes:

| Sync mode                                                                            | Description | Requirements | Limitations |
|--------------------------------------------------------------------------------------|-------------|--------------|-------------|
| [Snap](../../public-networks/concepts/node-sync.md#snap-synchronization)             | Recommended for fastest sync and lowest storage requirements on Mainnet. Downloads as many leaves of the trie as possible and reconstructs the trie locally. Faster than fast sync. | Available as an _early access feature_ in Besu version 24.7.1 or later | Cannot switch from fast sync to snap sync mid-process. |
| [Checkpoint](../../public-networks/concepts/node-sync.md#checkpoint-synchronization) | Syncs from a specific checkpoint block configured in the genesis file. Fastest sync mode with lowest storage requirements. | Besu version 22.4.3 or later | Not supported for QBFT or IBFT 2.0 networks without a checkpoint configuration. |
| [Fast](../../public-networks/concepts/node-sync.md#fast-synchronization)             | Downloads block headers and transaction receipts, verifies chain from genesis block. | None | Not supported with private transactions. |
| [Full](../../public-networks/concepts/node-sync.md#full-synchronization)             | Downloads and verifies the entire blockchain and state from genesis block, building an archive node with full state history. | None | Slowest sync mode, requires the most disk space. |

:::warning Early access feature 

`--Xsnapsync-bft-enabled` is an early access feature available in Besu version 24.7.1 and later.
It is not stable, so use this option with caution.

Use `--Xsnapsync-bft-enabled` with `--sync-mode=SNAP` to enable snap sync in QBFT and IBFT 2.0 private networks.

:::
