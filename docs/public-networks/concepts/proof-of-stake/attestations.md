---
description: Proof of Stake Attestations
---

# Introduction

Ethereum's move to a [proof of stake consensus](proof-of-stake-consensus.md) mechanism has brought many changes to the way the network operates. One of the important aspects of proof of stake is the need for validators to provide attestations in a timely and accurate manner. However, missing attestations have become a common occurrence among validators, leading to a loss of rewards and earnings. Here we explore the context behind missing attestations.

# Attestations
Every epoch (6.4 minutes) a validator proposes an attestation to the network. The attestation is for a specific slot (every 12 seconds) in the epoch. The purpose of the attestation is to vote in favor of the validator's view of the chain, in particular the most recent justified block and the first block in the current epoch (known as source and target checkpoints). This information is combined for all participating validators, enabling the network to reach consensus about the state of the blockchain.

The largest part, ~84.4%, of validators' rewards come from making attestations. Although committee and slot assignments for attesting are randomized, every active validator will be selected to make exactly one attestation each epoch.

Attestations receive rewards only if they are included in beacon chain blocks. An attestation contains three votes. Each vote is eligible for a reward subject to conditions.

* Getting attestations included with the correct source checkpoint within 5 slots;
* Getting attestations included with the correct target checkpoint within 32 slots; 
* Getting attestations included with the correct head within 1 slot basically immediately.

Each of these duties carries a reward rate, a portion of the entire "Weight Denominator," or the sum of weighted rewards for each attestation. The remaining weights relate to participating in sync committees and proposing blocks (excluding any tips/MEV, the bulk of block rewards). The following table breaks down these weights for cumulative rewards:

| Name | Percentage | Value |
| ----------- | ----------- | ----------- | 
|TIMELY_SOURCE_WEIGHT| 21.9%| uint64(14) |
|TIMELY_TARGET_WEIGHT| 40.6%| uint64(26) |
|TIMELY_HEAD_WEIGHT| 21.9%| uint64(14) |
|SYNC_REWARD_WEIGHT| 3.1%| uint64(2) |
|PROPOSER_WEIGHT| 12.5%| uint64(8) |
|WEIGHT_DENOMINATOR| 100%| uint64(64) |

[Table Source](https://eth2book.info/altair/part2/incentives/rewards/)


At the time when the validators voted on the head of the chain (block *n*), block *n+1* is not yet proposed. Therefore attestations get included one block later so all attestations who voted on block n being the chain head got included in block *n+1* and, the inclusion delay is 1. If the inclusion delay doubles to two slots, the attestation reward halves, because to calculate the attestation reward the base reward is multiplied by the reciprocal of the inclusion delay.

All of this is to say that attestations are complicated. Rewards can be impacted by a handful of factors:
* The contents of a block (how long it takes to compute),
* The hardware processing that block (execution speed), 
* How long it takes for the block to arrive to Besu from the CL, 
* The arrival time of the block from other consensus layer peers,
* General network latency,
* The status of either Besu or the CL node. 

[Monitoring](../../how-to/monitor/index.md) your validator carefully for uptime, execution speed, and a valid CL connection will be helpful in exploring attestation performance for your node.  