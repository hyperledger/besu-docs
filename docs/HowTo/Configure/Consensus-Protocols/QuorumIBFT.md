---
description: Hyperledger Besu consensus protocols
---

# IBFT 1.0

Besu nodes can operate (that is, submit transactions and receive blocks) in a Quorum
[IBFT 1.0](https://github.com/ethereum/EIPs/issues/650) network, but cannot be validators.

To connect to a Quorum IBFT 1.0 network:

1. In the [Quorum IBFT 1.0 genesis file](https://docs.goquorum.consensys.net/en/stable/HowTo/Configure/Consensus-Protocols/IBFT/#genesis-file):

    - Update the consensus protocol specified in the `config` item from `istanbul` to `ibft`.
    - In the `ibft` item:
        - Change `epoch` to `epochlength`.
        - Add `blockperiodseconds`, the minimum block time in seconds.
        - Add `requesttimeoutseconds`, the timeout for each consensus round before a round change, in seconds.
        - Set `policy` to 0.
          Besu doesn't support sticky validator nodes.
    - Remove the configuration item `isQuorum: true`.

    ```json
        "config": {
         ...
         "ibft": {
           "epochlength": 30000,
           "blockperiodseconds": 2,
           "requesttimeoutseconds": 4,
           "policy": 0,
           "ceil2Nby3Block": 0
        }
    ```

1. When starting Besu, specify the IBFT 1.0 genesis file using the
   [`--genesis-file`](../../../Reference/CLI/CLI-Syntax.md#genesis-file) option.
