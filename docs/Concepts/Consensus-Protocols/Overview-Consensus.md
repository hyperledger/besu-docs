---
description: Besu consensus protocols
---

# Consensus protocols

Besu implements the following consensus protocols:

* [QBFT](../../HowTo/Configure/Consensus-Protocols/QBFT.md) (proof of authority): QBFT is the recommended
  enterprise-grade consensus protocol for private networks.
* [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md) (proof of authority): IBFT 2.0 is supported for existing
  users for private networks, but you can [migrate a network using IBFT 2.0 to QBFT](../../HowTo/Configure/Consensus-Protocols/QBFT.md#migrate-from-ibft-20-to-qbft).
* [Clique](../../HowTo/Configure/Consensus-Protocols/Clique.md) (proof of authority): Clique is not recommended for
  production use.
  You can [migrate a network using Clique to another consensus protocol](../../HowTo/Configure/Consensus-Protocols/Clique.md#migrate-from-clique-to-another-consensus-protocol).
* Ethash (proof of work): Ethash is used on Ethereum Mainnet and can also be used in a
  [small, development network](../../Tutorials/Private-Network/Create-Private-Network.md).

You can view a [comparison of the proof of authority consensus protocols](Comparing-PoA.md).

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

    === "QBFT"

        ```json
        {
          "config": {
           ...
            "qbft": {
             ...
           }
          },
          ...
        }
        ```
