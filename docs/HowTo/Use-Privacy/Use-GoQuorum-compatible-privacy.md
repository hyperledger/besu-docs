---
description: Use GoQuorum-compatible privacy
---

# Using GoQuorum-compatible privacy

GoQuorum-compatible privacy mode enables interoperable private transactions between Hyperledger
Besu and [GoQuorum clients] using the Tessera private transaction manager.

This mode requires both networks to run an interoperable consensus algorithm such as [QBFT] to work.

To run your Besu nodes in GoQuorum-compatible privacy mode, add the `isQuorum:true` flag to your
[genesis file](../Configure/Genesis-File.md).

## GoQuorum-compatible private transactions

The following documentation explains [the transaction lifecycle] in GoQuorum-compatible mode.

!!! note

    If you intend to use this privacy mode for a production use case, please contact us on
    [Rocket Chat](https://chat.hyperledger.org/channel/besu) or by [email](mailto:besu@lists.hyperledger.org).

<!--links-->
[GoQuorum clients]: https://docs.goquorum.consensys.net/
[QBFT]: ../Configure/Consensus-Protocols/QBFT.md
[the transaction lifecycle]: https://docs.goquorum.consensys.net/Concepts/Privacy/PrivateTransactionLifecycle/
