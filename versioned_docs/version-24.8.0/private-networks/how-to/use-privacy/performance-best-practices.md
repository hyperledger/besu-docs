---
title: Performance best practices
description: Performance best practices
sidebar_position: 9
tags:
  - private networks
---

# Performance best practices

This document collects deployment and usage tips to help you achieve high performance for private transactions. If transaction throughput or latency is not meeting your expectations, please consider the following before raising an issue.

## General performance

Private transactions use the same facilities as public ones. General Besu performance tunings apply. Specific approaches are out of scope of this document, except for the following, which strongly impacts performance:

### Use fast, local, solid state storage

Running EVM transactions creates a lot of random reads that are executed sequentially. The Besu data folder for high throughput nodes should be located on the fastest possible storage media.

- Prefer [NVMe](https://cloud.google.com/compute/docs/disks/local-ssd#performance) attached SLC flash or Intel Optane.
- Avoid network attached SSDs or cloud storage with limited input/output operations per second.
- Do not use spinning disks under any circumstances.

## Private transaction performance

### Use concurrent submission

When submitting a private transaction using [web3js-quorum](https://github.com/ConsenSys/web3js-quorum), the submit call will only return once the privacy marker transaction has been included in a block. This limits the throughput to at most one private transaction per block when submitting from a single thread. To increase throughput, use web3js-quorum from multiple concurrent threads or processes.

### Co-locate Besu and Tessera

Besu has to talk to its local Tessera node frequently while handling a block. While we do not recommend running them on the same node, minimizing the latency between Besu and Tessera will improve block processing times. Besu and Tessera should not be hosted in geographically distributed locations.

### Optimize worst-case latency between Tessera nodes

When distributing a new private transaction between Tessera nodes, the overall throughput is determined by the slowest Tessera nodes. Try to minimize network latency between Tessera nodes and do not mix different machine types when hosting Tessera.

### Use stateful nonce management

Management of public and private nonces in web3js-quorum is stateless: before a transaction is sent, web3js-quorum has to query for those nonces. This is increasing latency, the node's load, and is a source of fragility due to nonce collision when multiple senders try to use the same account concurrently.

For performance and reliability it is advantageous to manage nonces in a stateful manner on the client side instead of querying them for every transaction.

### Use random senders for privacy marker transactions

To avoid public nonce management, privacy marker transactions can be sent using a [random account per transaction](../../../private-networks/reference/cli/options.md#privacy-marker-transaction-signing-key-file). This option is only available for zero gas networks.

### Avoid queuing transactions in Tessera

When Tessera is overloaded with transactions, the performance breaks down catastrophically due to unbounded growth of the request queue. Avoid sending more transactions to Tessera than it can handle. Sudden jumps in submission latency and submission failure rate should be answered with a load reduction on the client side, for example using a back-off scheme.

Please note that this is not Tessera specific but a general issue in distributed systems. It just happens that if queueing discipline is not maintained, Tessera tends to be the first component to fail.

### Limit the group size to reduce communication overhead

Smaller groups need fewer communication for transaction propagation. If reducing the number of Tessera nodes involved in a transaction is an option, it will lead to slightly better tail latencies. Multi-tenancy Tessera can be used to have large groups with a small number of Tessera nodes (possibly only one).

### Limit group membership changes and make them quick

Groups are locked (prevented from executing transactions) during membership changes. Try to minimize the number of times the membership changes. When possible, spread load across multiple groups to always have some groups available while others are locked. Consider batching group membership changes if possible. Note however that this does not work with the default management contract, yet.
