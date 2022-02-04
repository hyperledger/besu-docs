---
description: Besu proof of authority consensus protocols comparison
---

# Comparing proof of authority consensus protocols

Besu implements the Clique, IBFT 2.0, and QBFT proof of authority consensus protocols. Proof of
authority consensus protocols work when participants know each other and there is a level of trust
between them. For example, in a permissioned consortium network.

Proof of authority consensus protocols have faster block times and a much greater transaction
throughput than the Ethash proof of work consensus protocol used on the Ethereum Mainnet.

In Clique, IBFT 2.0, or QBFT, a group of nodes in the network act as signers (Clique) or validators
(IBFT 2.0 and QBFT). The existing nodes in the signer/validator pool vote to add nodes to or remove
nodes from the pool.

!!! note

    For the rest of this page, the term validator is used to refer to signers and validators.

## Properties

Properties to consider when comparing Clique, IBFT 2.0, and QBFT are:

* Immediate finality
* Minimum number of validators
* Liveness
* Speed.

### Immediate finality

IBFT 2.0 and QBFT have immediate finality; there are no forks and all valid blocks get
included in the main chain.

Clique does not have immediate finality. Implementations using Clique must be aware of forks and
chain reorganizations occurring.

### Minimum number of validators

To be Byzantine fault tolerant, IBFT 2.0 and QBFT require a minimum of four validators.

Clique can operate with a single validator but operating with a single validator offers no
redundancy if the validator fails.

!!! tip

    Byzantine fault tolerant is the ability to function correctly and reach consensus despite nodes
    failing or propagating incorrect information to peers.

### Liveness

Clique is more fault tolerant than IBFT 2.0 and QBFT. Clique tolerates up to half of the validators
failing. IBFT 2.0 and QBFT networks require greater than or equal to two-thirds of validators to be
operating to create blocks. For example, an IBFT 2.0 or QBFT network of:

* Four to five validators tolerates one unresponsive validator
* Six to eight validators tolerates two unresponsive validators.

Networks with three or less validators can produce blocks but do not guarantee finality when
operating in adversarial environments.

!!! important

    Using IBFT 2.0 or QBFT networks with three nodes for production purposes is not recommended.

### Speed

Reaching consensus and adding blocks is faster in Clique networks. For Clique, the probability of a
fork increases as the number of validators increases.

For IBFT 2.0 and QBFT, the time to add new blocks increases as the number of validators increases.
