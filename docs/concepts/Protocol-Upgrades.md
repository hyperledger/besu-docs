---
description: Protocol upgrades
---

# Network upgrades in private networks

Network upgrades are the mechanism for upgrading the Ethereum protocol. The time when the protocol
upgrade occurs is the network upgrade.

For the Ethereum Mainnet and public testnets (for example, Rinkeby), the milestone block
definitions are in Hyperledger Besu. Upgrading your Besu client applies the network upgrade.

For private networks, all network participants must agree on the protocol upgrades and then
coordinate the network upgrades. The genesis file specifies the
[milestone block](../reference/genesis-items.md#milestone-blocks) at which to apply the
[protocol upgrade](../private-networks/how-to/upgrade/protocol.md).

## Backward compatibility

Some protocol upgrades include changes that might break existing contracts (for example, gas cost
changes). Before upgrading your protocol, review included EIPs for possible impact. A
[meta EIP](https://eips.ethereum.org/meta) for each protocol upgrade lists included EIPs. For
example, [Istanbul](https://eips.ethereum.org/EIPS/eip-1679).

!!! tip

    For compatibility with future protocol upgrades, do not hardcode any gas price assumptions.

    Implementing upgradeable contracts enables contracts to be upgraded if a protocol upgrade does
    include breaking changes.
