---
description: Configuring free gas networks
---

# Free gas networks

Transactions use computational resources so have an associated cost. Gas is the cost unit and the
gas price is the price per gas unit. The transaction cost is the gas used * gas price.

In public networks, the account submitting the transaction pays the transaction cost, in Ether.
The miner (or validator in PoA networks) that includes the transaction in a block receives
transaction cost.

In many private networks, network participants run the validators and do not require gas as an
incentive. Networks no require gas as an incentive usually configure the gas price to be zero (that
is, make the gas free). Some private networks might allocate Ether and use a non-zero gas price to
limit resource use.

!!! tip

    We use the term _free gas network_ to refer to a network with a gas price of zero. A network
    with a gas price of zero is also known as a _zero gas network_ or _no gas network_.

In a free gas network, transactions still use gas but the gas price is zero, meaning the
transaction cost is zero. Transaction cost = gas used * 0 (the gas price).

## Configuring free gas in Hyperledger Besu

When gas is free, limiting block and contract sizes is less important. In free gas networks, we
increase the block size limit and set the contract size limit to the maximum value.

### 1. Set the block size

If you want to remove gas from consideration and don't mind blocks potentially taking longer to
create, in the genesis file set the block size limit (measured in gas) to the maximum accepted by
Truffle (`0x1fffffffffffff`). In the genesis file, specify `gasLimit` below the `config` key. 

```json
{ 
  "config": {
  ....
  },
  ...
  "gasLimit": "0x1fffffffffffff",
  ....
} 
```

If you are more concerned about blocks arriving on time and don't have expensive individual
transactions, set `gasLimit` to a value closer to the amount of gas your validators can process in
the configured block time.

### 2. Set the contract size

In the `config` section of the genesis file, set the contract size limit to the maximum supported
size (in bytes).

```json
( 
  "config": {
    ...
    "contractSizeLimit": 2147483647,
    ...
  } 
  ...
} 
```

### 3. Start Besu with a minimum gas price of zero

When starting nodes, set the [minimum gas price](../../Reference/CLI/CLI-Syntax.md#min-gas-price)
to zero.

```bash tab="Command Line"
--min-gas-price=0
```

```bash tab="Configuration File"
min-gas-price=0
```

## Configuring free gas in Truffle

If using Truffle to develop on your free gas network, you also need to configure free gass in
Truffle.

Like setting block and contract size limits to their maximum values for Besu, set the transaction
gas limit in Truffle to the maximum possible.

!!! important

    Besu does not support private key management. To use Besu with Truffle, you must configure
    a [Truffle wallet](../Develop-Dapps/Truffle.md).

### Update truffle-config.js

Update the `truffle-config.js` file:

1. Set the gas price to zero.

    ```js
    gasPrice:0
    ```

1. Set the gas limit for a transaction (that is, contract creation) to be the block gas limit - 1.

    ```js
    gas: "0x1ffffffffffffe"
    ```
