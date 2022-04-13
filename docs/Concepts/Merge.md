---
description: What is the Merge?
---

# The Merge

The Ethereum upgrade known as [The Merge](https://ethereum.org/en/upgrades/merge/) will merge the [Beacon Chain] into
Ethereum Mainnet, turning Mainnet into a combination of an
[execution layer and consensus layer](#execution-and-consensus-clients).
The Merge transitions Mainnet from proof of work to
[proof of stake consensus](https://docs.teku.consensys.net/en/latest/Concepts/Proof-of-Stake/).

## Execution and consensus clients

After The Merge, a full Ethereum Mainnet node will be a combination of an execution client (previously called an
[Ethereum 1.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client) and a consensus client (previously
called an [Ethereum 2.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client).

Execution and consensus clients communicate with each other using the
[Engine API](../HowTo/Interact/APIs/Engine-API.md).

![Ethereum Merge node](../images/Execution-Consensus-Clients.png)

### Execution clients

Execution clients, such as Besu, manage the state and execute transactions on the execution layer.
Execution clients serve [JSON-RPC API](../Reference/Engine-API-Methods.md) requests and communicate with each other in a
peer-to-peer network

### Consensus clients

Consensus clients, such as [Teku], contain beacon node and validator client implementations.
The beacon node is the primary link to the [Beacon Chain] (consensus layer).
The validator client performs [validator duties](https://docs.teku.consensys.net/en/latest/Concepts/Proof-of-Stake/) on
the consensus layer.
Consensus clients serve [REST API](https://docs.teku.consensys.net/en/stable/Reference/Rest_API/Rest/) requests  and
communicate with each other in a peer-to-peer network.

### Run a node

After The Merge, a Mainnet node operator must run both an execution client and a beacon node at the same time.
To become a validator, you must also run a validator client (either
[in the same process as the beacon node](https://docs.teku.consensys.net/en/stable/HowTo/Get-Started/Run-Teku/#start-the-clients-in-a-single-process)
or [separately](https://docs.teku.consensys.net/en/stable/HowTo/Get-Started/Run-Teku/#run-the-clients-separately).

You can
[test Besu as an execution client on the Merge testnet with Teku](../Tutorials/Merge-Testnet.md).

You can
[run Besu as an execution client on Ethereum Mainnet with Teku](https://docs.teku.consensys.net/en/stable/HowTo/Get-Started/Connect/Connect-To-Mainnet/).

Consensus clients compatible with Besu include:

- [Teku] (recommended)
- [Lighthouse](https://lighthouse.sigmaprime.io/)
- [Lodestar](https://lodestar.chainsafe.io/)
- [Prysm](https://github.com/prysmaticlabs/prysm)
- [Nimbus](https://nimbus.team/)

<!-- links -->
[Beacon Chain]: https://ethereum.org/en/upgrades/beacon-chain/
[Teku]: https://docs.teku.consensys.net/en/stable/
