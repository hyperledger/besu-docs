---
description: What is the Merge?
---

# The Merge

The Ethereum upgrade known as [The Merge](https://ethereum.org/en/upgrades/merge/) will merge the [Beacon Chain] into
Ethereum Mainnet, turning Mainnet into a combination of an
[execution layer and consensus layer](#execution-and-consensus-clients).
The Merge will transition Mainnet from proof of work to [proof of stake consensus](Consensus-Protocols/Proof-of-Stake.md).

## Execution and consensus clients

After The Merge, a full Ethereum Mainnet node will be a combination of an execution client (previously called an
[Ethereum 1.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client) and a consensus client (previously
called an [Ethereum 2.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client).

Execution clients, such as Besu, manage the state and execute transactions on the execution layer.
Consensus clients, such as [Teku], maintain [consensus](Consensus-Protocols/Proof-of-Stake.md) on the [Beacon Chain]
(consensus layer).

Execution and consensus clients communicate with each other using the
[Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/specification.md).
Execution clients serve [JSON-RPC API](../Reference/API-Methods.md) requests and consensus clients serve
[REST API](https://docs.teku.consensys.net/en/stable/Reference/Rest_API/Rest/) requests.
Execution clients communicate among each other in a peer-to-peer network, and consensus clients do the same.

![Ethereum Merge node](../images/Execution-Consensus-Clients.png)

### Run a node

After The Merge, a Mainnet node operator must run both an execution client and a consensus client at the same time.
You must run a node to become a Mainnet [validator](Consensus-Protocols/Proof-of-Stake.md), but you can also run a
non-validator node.

!!! note

    Consensus clients that don't perform validator duties are referred to as "beacon nodes" or "Beacon Chain clients."

You can
[test Besu as an execution client on the Merge testnet](../Tutorials/Merge-Testnet.md).
You must test it with a consensus client, for example, [Teku].

You can run Besu as an execution client on Ethereum Mainnet using the same
[installation options](../HowTo/Get-Started/Installation-Options).

Consensus clients compatible with Besu include:

- [Teku] (recommended)
- [Lighthouse](https://lighthouse.sigmaprime.io/)
- [Lodestar](https://lodestar.chainsafe.io/)
- [Prysm](https://github.com/prysmaticlabs/prysm)
- [Nimbus](https://nimbus.team/)

<!-- links -->
[Beacon Chain]: https://ethereum.org/en/upgrades/beacon-chain/
[Teku]: https://docs.teku.consensys.net/en/stable/
