---
description: Besu consensus protocols
---

# Consensus protocols

Besu supports the following consensus protocols:

* [QBFT](qbft.md) (proof of authority) - The recommended
  enterprise-grade consensus protocol for private networks.
* [IBFT 2.0](ibft.md) (proof of authority) - Supported for existing private networks.
* [Clique](clique.md) (proof of authority) - Not recommended for
  production use.
  You can [migrate a network using Clique to another consensus protocol](clique.md#migrate-from-clique-to-another-consensus-protocol).
* [Proof of stake](https://docs.teku.consensys.net/en/latest/Concepts/Proof-of-Stake/) - Used on Ethereum Mainnet
  post-[Merge](../../../../public-networks/concepts/the-merge.md) and can also be used on the [Merge testnet](../../../../public-networks/tutorials/merge-testnet.md).
* [Ethash](https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/) (proof of work) - Used on Ethereum Mainnet
  pre-[Merge](../../../../public-networks/concepts/the-merge.md) and can also be used in
  [small development networks](../../../tutorials/ethash.md).

See a [comparison of the proof of authority consensus protocols](../../../concepts/poa.md).

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
