---
description: Besu consensus protocols
---

# Consensus protocols

Besu implements the following consensus protocols:

* Ethash (Proof of Work)
* [Clique](../../HowTo/Configure/Consensus-Protocols/Clique.md) (Proof of Authority)
* [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md) (Proof of Authority)
* [Quorum IBFT 1.0](../../HowTo/Configure/Consensus-Protocols/QuorumIBFT.md) (Proof of Authority).

The `config` property in the genesis file specifies the consensus protocol for a chain.

!!! example

    === "Ethash"

        ```json
        {
          "config": {
           ...
            "ethash": {
             ...
           }
          },
          ...
        }
        ```

    === "Clique"

        ```json
        {
          "config": {
           ...
            "clique": {
             ...
           }
          },
          ...
        }
        ```

    === "IBFT 2.0"

        ```json
        {
          "config": {
           ...
            "ibft2": {
             ...
           }
          },
          ...
        }
        ```

    === "IBFT 1.0"

        ```json
        {
          "config": {
           ...
            "ibft": {
             ...
           }
          },
          ...
        }
        ```
