*[Byzantine fault tolerant]: The ability to function correctly and reach consensus despite nodes
failing or propagating incorrect information to peers.

# Comparing Proof of Authority consensus protocols

Besu implements the Clique and IBFT 2.0 Proof of Authority consensus protocols. Proof of Authority
consensus protocols work when participants know each other and there is a level of trust between
them. For example, in a permissioned consortium network.

Proof of Authority consensus protocols have faster block times and a much greater transaction
throughput than the Ethash Proof of Work consensus protocol used on the Ethereum MainNet.

In Clique and IBFT 2.0, a group of nodes in the network act as signers (Clique) or validators
(IBFT 2.0). The existing nodes in the signer/validator pool vote to add nodes to or remove nodes
from the pool.

!!! note

    For the rest of this page, the term validator is used to refer to signers and validators.

## Properties

Properties to consider when comparing Clique and IBFT 2.0 are:

* Immediate finality
* Minimum number of validators
* Liveness
* Speed.

### Immediate finality

IBFT 2.0 has immediate finality. When using IBFT 2.0 there are no forks and all valid blocks get
included in the main chain.

Clique does not have immediate finality. Implementations using Clique must be aware of forks and
chain reorganizations occurring.

### Minimum number of validators

To be Byzantine fault tolerant, IBFT 2.0 requires a minimum of four validators.

Clique can operate with a single validator but operating with a single validator offers no
redundancy if the validator fails.

### Liveness

Clique is more fault tolerant than IBFT 2.0. Clique tolerates up to half of the validators failing.
IBFT 2.0 networks require greater than or equal to two-thirds of validators to be operating to
create blocks. For example, an IBFT 2.0 network of:

* Four to five validators tolerates one unresponsive validator
* Six to eight validators tolerates two unresponsive validators.

Networks with three or less validators can produce blocks but do not guarantee finality when
operating in adversarial environments.

!!! important

    Using IBFT 2.0 networks with three nodes for production purposes is not recommended.

### Speed

Reaching consensus and adding blocks is faster in Clique networks. For Clique, the probability of a
fork increases number as the of validators increases.

For IBFT 2.0, the time to add new blocks increases as the number of validators increases.
