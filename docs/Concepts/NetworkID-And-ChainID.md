---
description: Besu network ID and chain ID implementation
---

# Network ID and chain ID

Ethereum networks have two identifiers, a network ID and a chain ID. Although they often have the
same value, they have different uses.

Peer-to-peer communication between nodes uses the _network ID_, while the transaction signature
process uses the _chain ID_.

!!! note

    [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md) introduced using
    the chain ID as part of the transaction signing process to protect against transaction
    replay attacks.

For most networks, including MainNet and the public testnets, the network ID and the chain ID are
the same, with the network ID defaulting to the chain ID, as specified in the genesis file.

!!! example "Chain ID in the Genesis File"

    ```json
    {
      "config": {
        "ethash": {
        },
         "chainID": 1981
      },
      ...
    }
    ```

Besu sets the chain ID, and by default the network ID, automatically when connecting to a network
specified using the [`--network`](../Reference/CLI/CLI-Syntax.md#network) option. The following
table lists the available networks and their chain and network IDs.

| Network   | Chain | Chain ID | Network ID | Type        |
|-----------|-------|----------|------------|-------------|
| `mainnet` | ETH   | 1        | 1          | Production  |
| `ropsten` | ETH   | 3        | 3          | Test        |
| `rinkeby` | ETH   | 4        | 4          | Test        |
| `goerli`  | ETH   | 5        | 5          | Test        |
| `dev`     | ETH   | 2018     | 2018       | Development |
| `classic` | ETC   | 61       | 1          | Production  |
| `mordor`  | ETC   | 63       | 7          | Test        |
| `kotti`   | ETC   | 6        | 6          | Test        |

If you use the [`--network=dev`](../Reference/CLI/CLI-Syntax.md#network) or
[`--genesis-file`](../Reference/CLI/CLI-Syntax.md#genesis-file) options, you can specify a
different network ID using the [`--network-id`](../Reference/CLI/CLI-Syntax.md#network-id) option.
