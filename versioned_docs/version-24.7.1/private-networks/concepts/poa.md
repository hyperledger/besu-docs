---
title: Proof of authority consensus
sidebar_position: 1
description: Besu proof of authority consensus protocols comparison
tags:
  - private networks
---

# Proof of authority consensus

Besu implements the QBFT, IBFT 2.0, and Clique proof of authority (PoA) [consensus protocols](../how-to/configure/consensus/index.md). PoA consensus protocols work when participants know each other and there is a level of trust between them. For example, in a permissioned consortium network.

PoA consensus protocols have faster block times and a much greater transaction throughput than the Ethash proof of work consensus protocol used on the Ethereum Mainnet.

In QBFT, IBFT 2.0, or Clique, a group of nodes in the network act as validators (QBFT and IBFT 2.0) or signers (Clique). The existing nodes in the signer/validator pool vote to add nodes to or remove nodes from the pool.

:::note

For the rest of this page, the term validator is used to refer to signers and validators.

:::

## Properties

Properties to consider when comparing QBFT, IBFT 2.0, and Clique are:

- Immediate finality.
- Minimum number of validators.
- Liveness.
- Speed.

### Immediate finality

QBFT and IBFT 2.0 have immediate finality; there are no forks and all valid blocks get included in the main chain.

Clique does not have immediate finality. Implementations using Clique must be aware of forks and chain reorganizations occurring.

### Minimum number of validators

To be Byzantine fault tolerant, QBFT and IBFT 2.0 require a minimum of four validators.

Clique can operate with a single validator but operating with a single validator offers no redundancy if the validator fails.

:::tip

Byzantine fault tolerant is the ability to function correctly and reach consensus despite nodes failing or propagating incorrect information to peers.

:::

### Liveness

Clique is more fault tolerant than QBFT and IBFT 2.0. Clique tolerates up to half of the validators failing. QBFT and IBFT 2.0 networks require greater than or equal to two-thirds of validators to be operating to create blocks. For example, an QBFT and IBFT 2.0 network of:

- Four to five validators tolerates one unresponsive validator.
- Six to eight validators tolerates two unresponsive validators.

Networks with three or less validators can produce blocks but do not guarantee finality when operating in adversarial environments.

:::caution

We recommend using QBFT or IBFT 2.0 networks with at least four nodes in production environments.

:::

### Speed

Reaching consensus and adding blocks is faster in Clique networks. For Clique, the probability of a fork increases as the number of validators increases.

For QBFT and IBFT 2.0, the time to add new blocks increases as the number of validators increases.
