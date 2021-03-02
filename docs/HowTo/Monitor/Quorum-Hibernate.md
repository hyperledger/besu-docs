---
description: Use Quorum Hibernate with Hyperledger Besu
---

# Quorum Hibernate

[Quorum Hibernate] is a proxy that monitors a node's API traffic and hibernates the node when
inactive. This reduces infrastructure costs by ensuring only nodes receiving API requests are
running.

Quorum Hibernate also wakes up hibernating nodes:

* When a new transaction or API request is received.
* To allow it to periodically sync with the network.

<!-- links -->
[Quorum Hibernate]: https://github.com/ConsenSys/quorum-hibernate
