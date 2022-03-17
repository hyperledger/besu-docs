---
description: Besu consensus protocols
---

# Consensus protocols

Besu implements the following consensus protocols:

* [QBFT](../../HowTo/Configure/Consensus-Protocols/QBFT.md) (proof of authority) - The recommended
  enterprise-grade consensus protocol for private networks.
* [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md) (proof of authority) - Supported for existing private networks.
* [Clique](../../HowTo/Configure/Consensus-Protocols/Clique.md) (proof of authority) - Not recommended for
  production use.
  You can [migrate a network using Clique to another consensus protocol](../../HowTo/Configure/Consensus-Protocols/Clique.md#migrate-from-clique-to-another-consensus-protocol).
* [Proof of stake](../Merge.md#proof-of-stake) - Used on Ethereum Mainnet.
* [Ethash](https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/) (proof of work) - Can be used in
  [small development networks](../../Tutorials/Private-Network/Create-Private-Network.md).

See a [comparison of the proof of authority consensus protocols](Comparing-PoA.md).

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
