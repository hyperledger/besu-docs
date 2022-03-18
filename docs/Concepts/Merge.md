---
description: What is the Merge?
---

# The Merge

The Ethereum upgrade known as [The Merge](https://ethereum.org/en/upgrades/merge/) will merge the [Beacon Chain] into
Ethereum Mainnet, turning Mainnet into a combination of an
[execution layer and consensus layer](#execution-and-consensus-clients).
The merge will transition Mainnet from proof of work to [proof of stake consensus](#merge-consensus).

## Execution and consensus clients

After The Merge, a full Ethereum Mainnet node will be a combination of an execution client (sometimes called an
[Ethereum 1.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client) and a consensus client (sometimes
called an [Ethereum 2.0](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/) client).

Execution clients, such as Besu, manage state and execute transactions on the execution layer.
Consensus clients, such as [Teku](https://docs.teku.consensys.net/en/stable/), maintain [consensus](#merge-consensus) on
the [Beacon Chain](https://ethereum.org/en/upgrades/beacon-chain/) (consensus layer).
Execution and consensus clients communicate with each other using the
[Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/specification.md).
Execution clients serve [JSON-RPC](../Reference/API-Methods.md) requests.

### Run a node

After The Merge, Mainnet node operators must run both an execution client and a consensus client at the same time.
You must run a node to become a Mainnet [validator](#merge-consensus), but you can also run a non-validator node.

You can currently
[test Besu as an execution client on the Kiln testnet](../HowTo/Get-Started/Starting-node.md#run-a-node-on-kiln-testnet).
You must test it with a consensus client, for example, [Teku].

After The Merge, you can run Besu as an execution client on Ethereum Mainnet using the same
[installation options](../HowTo/Get-Started/Installation-Options).

Consensus clients compatible with Besu include:

- [Teku] (recommended)
- [Lighthouse](https://lighthouse.sigmaprime.io/)
- [Lodestar](https://lodestar.chainsafe.io/)
- [Prysm](https://github.com/prysmaticlabs/prysm)
- [Nimbus](https://nimbus.team/)

## Merge consensus

The Merge transitions Ethereum Mainnet to
[proof of stake (PoS)](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/) consensus.

In Ethereum's PoS, you must run a [full node](#execution-and-consensus-clients) and
[stake 32 ETH](https://ethereum.org/en/staking/) to become a validator.

!!! important

    Withdrawing staked ETH isn't yet supported and will be included in a separate upgrade following The Merge.

The PoS mechanism randomly chooses validators to propose or validate blocks on the [Beacon Chain] (consensus blocks) in
defined time-frames (slots).

Proposers are responsible for proposing new consensus blocks, and non-proposing validators are responsible for
validating (attesting to) proposed blocks.
Validators are rewarded for proposing and attesting to consensus blocks eventually included in the Beacon Chain, and
their stake is slashed if they fail to validate or if they attest to malicious blocks, incentivizing good behavior.

Each consensus block contains an execution payload, which contains a list of transactions and other data required to
execute and validate the payload.

When a node validates a consensus block, its [consensus client](#execution-and-consensus-clients) processes the block
and sends the execution payload to the [execution client](#execution-and-consensus-clients), which:

1. Assembles a block on the execution layer (execution block).
1. Verifies pre-conditions.
1. Executes transactions.
1. Verifies post-conditions.
1. Sends the validity result back to the consensus client.

If the block is valid, the execution client includes it in the execution chain and stores the new state in execution
state storage.

If at least 128 validators attest to a consensus block within a slot, it's included in the Beacon Chain.

<!-- links -->
[Beacon Chain]: https://ethereum.org/en/upgrades/beacon-chain/
[Teku]: https://docs.teku.consensys.net/en/stable/
