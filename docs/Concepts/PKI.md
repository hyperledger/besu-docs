---
description: Public key infrastructure
---

# Public key infrastructure

!!! warning

    Public key infrastructure (PKI) support is an early access feature, and functionality and options may be updated
    between releases.

Hyperledger Besu's public key infrastructure allows you to use certificates issued by a trusted authority to manage
node and account identities in the following ways:

* Node permissioning - Only authorized nodes can connect to other nodes in the network using TLS for the P2P
    communication.
* Account permissioning - Only authorized validator nodes can propose new blocks in the network.

Supported keystore and truststore formats used to store the certificates include PKCS12 and JKS.

## Node permissioning

Allow TLS communication between nodes by using certificates issued by a trusted authority to connect to other
authorized nodes in the network.

When receiving connection requests, the incoming connection must be from another authorized node. Similarly, when
connecting to a node the initiator ensures that the remote node is authorized to participate in the network.

[Configure TLS for the P2P communication using the Besu command line options](../HowTo/Configure/TLS/P2P-TLS.md).

## Block proposal permissioning

!!! important

    Only private networks using the [QBFT consensus protocol] support block proposal permissioning.

Use certificates issued by a trusted authority to ensure only authorized validator nodes can propose new blocks in the
network. Certificate information is included in the header of the proposed block to verify that the proposer is
authorised to create a block in the network.

[Configure block proposal permissioning using the Besu command line options](../HowTo/Configure/Block-Proposal-Permissioning.md)

[QBFT consensus protocol]: ../HowTo/Configure/Consensus-Protocols/QBFT.md
