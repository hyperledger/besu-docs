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

| Network   | Chain ID | Network ID |
|-----------|----------|------------|
| `classic` | 61       | 1          |
| `dev`     | 2018     | 2018       |
| `goerli`  | 5        | 5          |
| `kotti`   | 6        | 6          |
| `mainnet` | 1        | 1          |
| `rinkeby` | 4        | 4          |
| `ropsten` | 3        | 3          |

When using the [`--network=dev`](../Reference/CLI/CLI-Syntax.md#network) or 
[`--genesis-file`](../Reference/CLI/CLI-Syntax.md#genesis-file) options, you can override the 
network ID using the [`--network-id`](../Reference/CLI/CLI-Syntax.md#network-id) option. 

