---
description: What is the Merge?
---

# The Merge

The Ethereum upgrade known as [The Merge](https://ethereum.org/en/upgrades/merge/) will merge the [Beacon Chain] into
Ethereum Mainnet, turning Mainnet into a combination of an
[execution layer and consensus layer](#execution-and-consensus-clients).
The Merge transitions Mainnet from proof of work to
[proof of stake consensus](https://docs.teku.consensys.net/en/stable/Concepts/Proof-of-Stake/).

You can [prepare Besu for The Merge](../HowTo/Upgrade/Prepare-for-The-Merge.md) and
[test Besu with Teku on the Kiln Merge testnet](../Tutorials/Merge-Testnet.md).

## Execution and consensus clients

After The Merge, a full Ethereum Mainnet node will be a combination of an execution client (previously called an
[Ethereum 1.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client) and a consensus client (previously
called an [Ethereum 2.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client).

Execution and consensus clients communicate with each other using the
[Engine API](../HowTo/Interact/APIs/Engine-API.md).

![Ethereum Merge node](../images/Execution-Consensus-Clients.png)

### Execution clients

Execution clients, such as Besu, manage the execution layer, including executing transactions and updating the world state.
Execution clients serve [JSON-RPC API](../Reference/Engine-API-Methods.md) requests and communicate with each other in a
peer-to-peer network.

### Consensus clients

Consensus clients, such as [Teku], contain beacon node and validator client implementations.
The beacon node is the primary link to the [Beacon Chain] (consensus layer).
The validator client performs [validator duties](https://docs.teku.consensys.net/en/latest/Concepts/Proof-of-Stake/) on
the consensus layer.
Consensus clients serve [REST API](https://docs.teku.consensys.net/en/stable/Reference/Rest_API/Rest/) requests and
communicate with each other in a peer-to-peer network.

## What happens during The Merge

Before The Merge, the execution and consensus clients' configurations will be
[updated](../HowTo/Upgrade/Prepare-for-The-Merge.md#update-besu) to listen for a certain total terminal difficulty (TTD)
to be reached.

The consensus layer will enable the Merge configuration (Bellatrix) before reaching the TTD.
Once the execution layer blocks reach the TTD, the Beacon Chain will merge into Ethereum Mainnet, and Ethereum will move
to a proof of stake network.

After The Merge, a Mainnet node operator must run both an execution client and a beacon node at the same time.
To become a validator, you must also run a validator client (either
[in the same process as the beacon node](https://docs.teku.consensys.net/en/stable/HowTo/Get-Started/Run-Teku/#start-the-clients-in-a-single-process)
or [separately](https://docs.teku.consensys.net/en/stable/HowTo/Get-Started/Run-Teku/#run-the-clients-separately).

After The Merge, in addition to validators earning rewards for performing
[validator duties](https://docs.teku.consensys.net/en/stable/Concepts/Proof-of-Stake/),
[fee recipients](https://docs.teku.consensys.net/en/latest/HowTo/Prepare-for-The-Merge/#configure-the-fee-recipient)
will also earn rewards for the inclusion of execution layer transactions.

You can [prepare Besu for The Merge](../HowTo/Upgrade/Prepare-for-The-Merge.md).

<!-- links -->
[Beacon Chain]: https://ethereum.org/en/upgrades/beacon-chain/
[Teku]: https://docs.teku.consensys.net/en/stable/
