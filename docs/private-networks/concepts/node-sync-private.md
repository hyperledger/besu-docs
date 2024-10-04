---
sidebar_label: Node synchronization
sidebar_position: 4
description: Learn about node synchronization for private networks.
tags:
  - private networks
---

# Node synchronization for private networks

For private, permissioned blockchain networks, Besu uses the same [synchronization 
modes](/public-networks/concepts/node-sync.md) as public networks, but with specific configurations for private network needs.

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

| Sync mode | Description | Requirements | Limitations |
|-----------|-------------|--------------|-------------|
| [Snap](../../public-networks/concepts/node-sync.md#snap-synchronization) | Recommended for fastest sync and lowest storage requirements on Mainnet. Downloads as many leaves of the trie as possible, reconstructs the trie locally. Faster than Fast sync. | Available as an _early access feature_ in Besu version 24.7.1 or later | Cannot switch from fast sync to snap sync mid-process. |
| [Checkpoint](../../public-networks/concepts/node-sync.md#checkpoint-synchronization) | Efficient sync from a specific checkpoint block configured in the genesis file. Syncs from a checkpoint block defined in the genesis file. Is the fastest sync and has the lowest storage requirements. | Besu version 22.4.3 or later | Not supported for QBFT or IBFT 2.0 networks without a checkpoint configuration. |
| [Fast](../../public-networks/concepts/node-sync.md#fast-synchronization) | Default for named networks except the dev development network. Downloads block headers and transaction receipts, verifies chain from genesis block. | None | Not supported with private transactions. |
| [Full](../../public-networks/concepts/node-sync.md#run-an-archive-node) | Downloads and verifies the entire blockchain and state from the genesis block. This builds an archive node, with full state history. Downloads entire blockchain, verifies all states from genesis block. | None | Slowest sync mode, requires the most disk space. |

:::tip

We recommend snap sync because it follows the Ethereum specification and enables you to serve full historical data.

:::