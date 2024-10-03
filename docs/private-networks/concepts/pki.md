---
title: Public key infrastructure
sidebar_position: 5
description: Public key infrastructure
tags:
  - private networks
---

# Public key infrastructure

:::warning

Public key infrastructure (PKI) support is an early access feature, and functionality and options may be updated between releases.

:::

Besu's public key infrastructure allows you to use certificates issued by a trusted authority to manage node and account identities in the following ways:

- Node permissioning - Only authorized nodes can connect to other nodes in the network using TLS for the P2P communication.
- Block proposal permissioning - Only blocks proposed by authorized validators are accepted.

Supported keystore and truststore formats used to store the certificates include PKCS11, PKCS12, and JKS.

## Node permissioning

Allow TLS communication between nodes by using certificates issued by a trusted authority to connect to other authorized nodes in the network.

When receiving connection requests, the incoming connection must be from another authorized node. Similarly, when connecting to a node the initiator ensures that the remote node is authorized to participate in the network.

[Configure TLS for the P2P communication using the Besu command line options](../how-to/configure/tls/p2p.md).


