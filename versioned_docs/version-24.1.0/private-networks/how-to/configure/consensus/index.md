---
title: Consensus protocols
description: Besu consensus protocols
sidebar_position: 1
tags:
  - private networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Consensus protocols

Besu supports the following consensus protocols:

- [QBFT](qbft.md) (proof of authority) - The recommended enterprise-grade consensus protocol for private networks.
- [IBFT 2.0](ibft.md) (proof of authority) - Supported for existing private networks.
- [Clique](clique.md) (proof of authority) - Not recommended for production use.
- [Proof of stake](../../../../public-networks/concepts/proof-of-stake/index.md) - Used on Ethereum Mainnet and public testnets.
- [Ethash](https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/) (proof of work) - Can be used in [small development networks](../../../tutorials/ethash.md).

See a [comparison of the proof of authority consensus protocols](../../../concepts/poa.md).

The `config` property in the genesis file specifies the consensus protocol for a chain.

<Tabs>

<TabItem value="Ethash" label="Ethash" default>

```json
{
  "config": {
  ...
    "ethash": {
    ...
    }
  },
  ...
}
```

</TabItem>

<TabItem value="Clique" label="Clique">

```json
{
  "config": {
    ...
    "clique": {
    ...
    }
  },
  ...
}
```

</TabItem>

<TabItem value="IBFT 2.0" label="IBFT 2.0">

```json
{
  "config": {
    ...
    "ibft2": {
      ...
    }
  },
  ...
}
```

</TabItem>

<TabItem value="QBFT" label="QBFT">

```json
{
  "config": {
    ...
    "qbft": {
      ...
    }
  },
  ...
}
```

</TabItem>

</Tabs>
