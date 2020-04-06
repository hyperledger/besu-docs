---
description: Configuring a network using the genesis file
---

# Creating the Hyperledger Besu genesis file

The genesis file defines the first block in the chain and the first block defines which chain you
want to join.

For Ethereum MainNet and public testnets (for example, Rinkeby) the genesis configuration
definition is in Besu and used when specifying a public network using the
[`--network`](../../Reference/CLI/CLI-Syntax.md#network) command line option.

For private networks, which you might want to [configure for free gas](FreeGas.md) for example,
create a JSON genesis file and then specify the genesis file using the
[`--genesis-file`](../../Reference/CLI/CLI-Syntax.md#genesis-file) command line option.

The genesis file specifies the [network-wide settings](../../Reference/Config-Items.md) so all
nodes in a network must use the same genesis file.

!!! example

    ```json
    {
      "config": {
        "chainId": 2018,
        "constantinoplefixblock": 0,
        "ibft2": {
          "blockperiodseconds": 5,
          "epochlength": 30000,
          "requesttimeoutseconds": 10
        }
      },
      "nonce": "0x0",
      "timestamp": "0x58ee40ba",
      "extraData": "0xf83ea00000000000000000000000000000000000000000000000000000000000000000d5949811ebc35d7b06b3fa8dc5809a1f9c52751e1deb808400000000c0",
      "gasLimit": "0x1fffffffffffff",
      "difficulty": "0x1",
      "mixHash": "0x63746963616c2062797a616e74696e65206661756c7420746f6c6572616e6365",
      "coinbase": "0x0000000000000000000000000000000000000000",
      "alloc": {
        "9811ebc35d7b06b3fa8dc5809a1f9c52751e1deb": {
          "balance": "0xad78ebc5ac6200000"
        }
      }
    }
    ```
