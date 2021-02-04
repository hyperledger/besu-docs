---
description: Use Node Manager with Hyperledger Besu
---

# Node Manager

[Node Manager] is an proxy that monitors a node's API traffic and hibernates the node when inactive.
This reduces infrastructure costs by ensuring only nodes receiving API requests are running.

Node Manager also wakes up a hibernating nodes:

* When a new transaction or API request is received.
* To allow it to periodically sync with the network.

<!-- links -->
[Node Manager]: https://github.com/ConsenSysQuorum/node-manager
