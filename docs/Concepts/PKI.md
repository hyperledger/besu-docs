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

!!! important

    PKI infrastructure is only supported on private networks running the QBFT consensus method.

Supported keystore and truststore formats used to store the certificates include PKCS12 and JKS.

## Node permissioning

Use certificates issued by a trusted authority to connect to nodes in the network.

When receiving connection requests, the incoming connection must be from another authorized node; simalarly when
connecting to a node, the initiator ensures that the remote node is authorized to participate in the network.

TLS communication is enforced between peers.

## Block proposal permissioning

Use certificates issued by a trusted authority to ensure only authorized validator nodes can propose new blocks in the
network. Certificate information is included in the header of the proposed block to verify that the proposer is
authorised to create a block in the network.
