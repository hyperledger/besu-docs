---
description: Besu proof of authority consensus protocols
---

# Proof of authority consensus protocols

Besu implements the QBFT and IBFT 2.0 proof of authority (PoA) [consensus protocols](Overview-Consensus.md).
PoA consensus protocols work when participants know each other and there is a level of trust
between them. For example, in a permissioned consortium network.

PoA consensus protocols have faster block times and a much greater transaction
throughput than the Ethash proof of work consensus protocol used on the Ethereum Mainnet.

In QBFT and IBFT 2.0, a group of nodes in the network act as validators.
The existing nodes in the signer/validator pool vote to add nodes to or remove nodes from the pool.

!!! note

    For the rest of this page, the term validator is used to refer to signers and validators.

## Properties

Properties to consider when implementing QBFT and IBFT 2.0 are:

* Immediate finality.
* Minimum number of validators.
* Liveness.
* Speed.

### Immediate finality

QBFT and IBFT 2.0 have immediate finality; there are no forks and all valid blocks get
included in the main chain.

### Minimum number of validators

To be Byzantine fault tolerant, QBFT and IBFT 2.0 require a minimum of four validators.

!!! tip

    Byzantine fault tolerant is the ability to function correctly and reach consensus despite nodes
    failing or propagating incorrect information to peers.

### Liveness

QBFT and IBFT 2.0 networks require greater than or equal to two-thirds of validators to be
operating to create blocks. For example, an QBFT and IBFT 2.0 network of:

* Four to five validators tolerates one unresponsive validator.
* Six to eight validators tolerates two unresponsive validators.

Networks with three or less validators can produce blocks but do not guarantee finality when
operating in adversarial environments.

!!! important

    We recommend using QBFT or IBFT 2.0 networks with at least four nodes in production environments.

### Speed

For QBFT and IBFT 2.0, the time to add new blocks increases as the number of validators increases.
