---
description: Besu consensus protocols
---

# Consensus protocols

Besu implements the following consensus protocols:

* Ethash (proof of work)
* [Clique](../../HowTo/Configure/Consensus-Protocols/Clique.md) (proof of authority)
* [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md) (proof of authority)
* [QBFT](../../HowTo/Configure/Consensus-Protocols/QBFT.md) (proof of authority).

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
