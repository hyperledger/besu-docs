description: Besu network ID and chain ID implementation
<!--- END of page meta data -->

# Network ID and Chain ID

Ethereum networks have a network ID and a chain ID. The network ID defaults to the chain ID specified 
in the genesis file.

!!! example "Chain ID in Genesis File"
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

For most networks including MainNet and the public testnets, the network ID and the chain ID are the
same and are specified in the genesis file.

The network ID and chain ID are automatically defined by Besu when connecting to networks specified 
using the [`--network`](../Reference/CLI/CLI-Syntax.md#network) option:

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

When using the [`--network=dev`](../Reference/CLI/CLI-Syntax.md#network) or 
[`--genesis-file`](../Reference/CLI/CLI-Syntax.md#genesis-file) options, you can override the 
network ID using the [`--network-id`](../Reference/CLI/CLI-Syntax.md#network-id) option. 

