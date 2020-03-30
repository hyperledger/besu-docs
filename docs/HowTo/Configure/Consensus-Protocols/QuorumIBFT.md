---
description: Hyperledger Besu consensus protocols
---

# IBFT 1.0

Besu nodes can operate (that is, submit transactions and receive blocks) in a Quorum
[IBFT 1.0](https://github.com/ethereum/EIPs/issues/650) network, but cannot be validators.

To connect to a Quorum IBFT 1.0 network:

1. In the Quorum IBFT 1.0 genesis file, update the consensus protocol specified in the `config`
   property from `istanbul` to `ibft`.

    ```json
        "config": {
         ...
         "ibft": {
         ...
        }
    ```

1. When starting Besu, specify the IBFT 1.0 genesis file using the
   [`--genesis-file`](../../../Reference/CLI/CLI-Syntax.md#genesis-file) option.