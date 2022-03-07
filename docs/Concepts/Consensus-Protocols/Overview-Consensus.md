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
  If you use Clique in production and encounter issues, you must create a new network and either duplicate the current
  state or replay all transactions on the new network.
  You can ask for migration support on [Discord](https://discord.gg/hyperledger).
* Ethash (proof of work)

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
