---
description: Public key infrastructure
---

# Public key infrastructure

!!! warning

    Public key infrastructure (PKI) support is an early access feature, and functionality and options may be updated
    between releases.

Hyperledger Besu provides public key infrastructure support to allow you to use certificates issued by a trusted authority
to manage node and account identities in the following ways:

* Node permissioning - Only authorized nodes can connect to other nodes in the network.
* Account permissioning - Only authorized validator nodes can propose new blocks in the network.

Supported keystore and truststore formats used to store the certificates include PKCS12 and JKS.

## Node permissioning

Allow nodes to use certificates issued by a trusted authority to connect to other authorized nodes in the network.

Enforces TLS between peers, by enforcing TLS at the TCP layer, only nodes with valid certificates are
allowed to communicate with other peers.

When receiving connection requests, the incoming connection must be from another authorized node; simalarly when
connecting to a node, the initiator ensures that the remote node is authorized to participate in the network.

## Block proposal permissioning

!!! important

    Only private networks using the [QBFT consensus protocol] support block proposal permissioning.

Use certificates issued by a trusted authority to ensure only authorized validator nodes can propose new blocks in the
network. Certificate information is included in the header of the proposed block to verify that the proposer is
authorised to create a block in the network.

[QBFT consensus protocol]: ../HowTo/Configure/Consensus-Protocols/QBFT.md
