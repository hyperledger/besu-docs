---
title: Use Quorum Hibernate
sidebar_position: 4
description: Use Quorum Hibernate with Besu
tags:
  - private networks
---

# Use Quorum Hibernate (Deprecated)

:::caution

Tessera-based privacy is deprecated in Besu version 24.12.0 and later. Please read this [blog post](https://www.lfdecentralizedtrust.org/blog/sunsetting-tessera-and-simplifying-hyperledger-besu) for more context on the rationale behind this decision as well as alternative options.

:::

[Quorum Hibernate] is a proxy that monitors a node's API traffic and hibernates the node when inactive. This reduces infrastructure costs by ensuring only nodes receiving API requests or nodes required to establish consensus are running.

Quorum Hibernate wakes up hibernating nodes:

- When a new transaction or API request is received.
- To allow it to periodically sync with the network.

<!-- links -->

[Quorum Hibernate]: https://github.com/ConsenSys/quorum-hibernate
