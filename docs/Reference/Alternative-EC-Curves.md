description: Using alternative Elliptic Curves in Besu
<!--- END of page meta data -->

# Using alternative Elliptic Curves in Besu

!!! caution
    Alternative Elliptic Curves is an experimental feature.

By default, Besu uses the Ethereum standard secp256k1 elliptic curve (EC).
However, when running nodes in a private network, it is possible to configure an alternative elliptic curve.

The configuration for what elliptic curve Besu will use is done in the network configuration section of genesis file, using the [`ecCurve`](Config-Items.md#Configuration_Items) key:

```bash
{
  "genesis": {
    "config": {
      "ecCurve": "secp256k1",
    [...]
  },
  [...]
}
```

!!! attention
    All nodes in the network **MUST** use the same elliptic curve. Nodes with different EC configuration from the network won't be able to send messages to other nodes nor verify transactions and blocks.

The following Elliptic Curves are supported by Besu:

- `secp256k1` (Ethereum default)
- `secp256r1`
