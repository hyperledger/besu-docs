---
description: Use GoQuorum-compatible privacy
---

# Using GoQuorum-compatible privacy

The GoQuorum-compatible privacy mode enables interoperable private transactions between Hyperledger Besu and GoQuorum clients using the Tessera private transaction manager.
This mode requires both networks are running an interoperable consensus algorithm such as QBFT to work fully.

To run your Besu nodes in GoQuorum-compatible privacy  mode, you need to configure the following: 

1. Add the `isQuorum:true` flag to your genesis file. 

## GoQuorum-compatible private transactions

The following documentation explains [the transacion lifecycle](https://docs.goquorum.consensys.net/en/stable/Concepts/Privacy/PrivateTransactionLifecycle/) in the GoQuorum-compatible mode.

!!! note

    If you intend to use this privacy mode for a production use case, please contact us on [Rocket Chat](https://chat.hyperledger.org/channel/besu) or by [email](mailto:besu@lists.hyperledger.org).
