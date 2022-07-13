---
description: Use GoQuorum-compatible privacy
---

# Using GoQuorum-compatible privacy

GoQuorum-compatible privacy mode enables interoperable private transactions between Hyperledger
Besu and [GoQuorum clients] using the Tessera private transaction manager.

This mode requires both networks to run an interoperable consensus algorithm such as [QBFT] to work.

To run your Besu nodes in GoQuorum-compatible privacy mode, add the `isQuorum:true` flag to your
[genesis file](../../../concepts/genesis-file.md).

While in GoQuorum-compatible privacy mode and using Tessera, disable [`orion` mode](https://docs.tessera.consensys.net/en/stable/HowTo/Configure/Orion-Mode/)
by removing `"mode": "orion",` from the [Tessera configuration file](../../tutorials/privacy/multi-tenancy.md#3-update-the-tessera-configuration-file).

## GoQuorum-compatible private transactions

The following documentation explains [the transaction lifecycle] in GoQuorum-compatible mode.

!!! note

    If you intend to use this privacy mode for a production use case, please contact us on the
    [Besu channel on Hyperledger Discord](https://discord.gg/hyperledger) or by [email](mailto:besu@lists.hyperledger.org).

<!--links-->
[GoQuorum clients]: https://consensys.net/docs/goquorum/en/stable/
[QBFT]: ../configure/consensus/qbft.md
[the transaction lifecycle]: https://consensys.net/docs/goquorum/en/stable/concepts/privacy/private-transaction-lifecycle/
