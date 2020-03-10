---
description: Upgrading protocol versions
---

# Upgrading your protocol in a private network

To [upgrade the protocol](../../Concepts/Protocol-Upgrades.md) (also known as a hardfork) in a
private network:

1. Review included EIPs for breaking changes. A [meta EIP](https://eips.ethereum.org/meta) for each
   protocol upgrade lists included EIPs. For example,
   [Istanbul](https://eips.ethereum.org/EIPS/eip-1679).
1. Network participants agree on the block number at which to
   [upgrade](../../Concepts/Protocol-Upgrades.md).
1. For each node in the network:

     a. Add the
        [milestone block number](../../Reference/Config-Items.md#milestone-blocks) to the genesis
        file.
     b. Restart the node before reaching milestone block.

!!! caution

    To avoid a forked network, all network participants must update their genesis file to include
    the agreed on milestone block and restart their node before reaching the milestone block.