---
description: Proof of stake attestations
---

# Attestations

Ethereum's move to [proof of stake consensus](./index.md) has brought many changes to the way the
network operates.
An important aspect of proof of stake is the need for validators to provide attestations in a timely
and accurate manner.
However, missed attestations have become a common occurrence among validators, leading to a loss of
rewards and earnings.
This page explores the context behind missing attestations.

## What are attestations?

Every epoch (6.4 minutes), a validator proposes an attestation to the network.
The attestation is for a specific slot (every 12 seconds) in the epoch.
The attestation votes in favor of the validator's view of the chain, in particular, the most recent
justified block and the first block in the current epoch (known as *source* and *target* checkpoints).
This information is collected for all participating validators, enabling the network to reach
consensus about the state of the blockchain.

Honest nodes will have 1/3 * `SECONDS_PER_SLOT` (4 seconds) from the start of the slot to either receive the block or decide there was no block produced and attest to an “empty” or “skip” slot. Once this time has elapsed, attesters should broadcast their attestation reflecting their local view of the chain.

More info can be found within the [official specification.](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/validator.md#attesting)

## Attestation rewards

Around 84.4%, of validators' rewards come from making attestations.
Although committee and slot assignments for attesting are randomized, every active validator will be
selected to make exactly one attestation each epoch.

Attestations receive rewards only if they're included in Beacon Chain blocks.
An attestation contains three votes.
Each vote is eligible for a reward, subject to the following conditions:

* Getting attestations included with the correct source checkpoint within 5 slots
* Getting attestations included with the correct target checkpoint within 32 slots
* Getting attestations included with the correct head within 1 slot immediately

Each of these duties carries a reward rate, a portion of the entire "weight denominator," or the sum
of weighted rewards for each attestation.
The remaining weights relate to participating in sync committees and proposing blocks (excluding any
tips/MEV, the bulk of block rewards).
The following table (from
[Upgrading Ethereum](https://eth2book.info/bellatrix/part2/incentives/rewards/)) breaks down these
weights for cumulative rewards:

| Name                   | Percentage | Value        |
|------------------------|------------|--------------|
| `TIMELY_SOURCE_WEIGHT` | 21.9%      | `uint64(14)` |
| `TIMELY_TARGET_WEIGHT` | 40.6%      | `uint64(26)` |
| `TIMELY_HEAD_WEIGHT`   | 21.9%      | `uint64(14)` |
| `SYNC_REWARD_WEIGHT`   | 3.1%       | `uint64(2)`  |
| `PROPOSER_WEIGHT`      | 12.5%      | `uint64(8)`  |
| `WEIGHT_DENOMINATOR`   | 100%       | `uint64(64)` |

At the point when validators vote on the head of the chain (block `n`), block `n+1` isn't yet proposed.
Therefore, attestations get included one block later, so all attestations that voted on block `n`
being the chain head got included in block `n+1` and, the inclusion delay is 1.
If the inclusion delay doubles to two slots, the attestation reward halves, because to calculate the
attestation reward the base reward is multiplied by the reciprocal of the inclusion delay.

## Conclusion

Attestations are complicated.
Rewards can be impacted by:

* The contents of a block (how long it takes to compute).
* The hardware processing that block (execution speed).
* How long it takes for the block to arrive to Besu from the consensus layer.
* The arrival time of the block from other consensus layer peers.
* General network latency.
* The status of either Besu or the consensus layer client.

[Monitoring](../../how-to/monitor/index.md) your validator carefully for uptime, execution speed,
and a valid consensus layer connection will help you explore attestation performance for your node.
