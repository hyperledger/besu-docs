---
description: Some use cases of creating transactions on a Hyperledger Besu network
---

# Creating and sending transactions

You can send signed transactions using the
[`eth_sendRawTransaction`](../../Reference/API-Methods.md#eth_sendrawtransaction) JSON-RPC API
method.

Signed transactions can be simple value transfers, contract creation, or contract invocation. Set
the maximum transaction fee for transactions using the [`--rpc-tx-feecap`](../../Reference/CLI/CLI-Syntax.md#rpc-tx-feecap)
CLI option.

[Use client libraries](../Develop-Dapps/Client-Libraries.md) to create and send a signed raw transaction to transfer
Ether and create a smart contract.

!!! warning "Private keys"

    Do not use the accounts from the examples on Mainnet or any public network except for testing.
    The private keys are displayed which means the accounts are not secure.

    All accounts and private keys in the examples are from the `dev.json` genesis file in the
    [`/besu/config/src/main/resources`](https://github.com/hyperledger/besu/tree/master/config/src/main/resources)
    directory.

    In production environments avoid exposing your private keys by creating signed transactions
    offline, or use [EthSigner](https://docs.ethsigner.consensys.net/) to isolate your private keys
    and sign transactions with
    [`eth_sendTransaction`](https://docs.ethsigner.consensys.net/Using-EthSigner/Using-EthSigner/#eth_sendtransaction).

!!! tip

    Libraries such as [web3j](https://github.com/web3j/web3j) or
    [ethereumj](https://github.com/ethereum/ethereumj) and tools such as
    [MyCrypto](https://mycrypto.com/) can also create signed transactions.

## `eth_call` vs `eth_sendRawTransaction`

You can interact with contracts using [`eth_call`](../../Reference/API-Methods.md#eth_call) or
[`eth_sendRawTransaction`](../../Reference/API-Methods.md#eth_sendrawtransaction). The table below
compares the characteristics of both calls.

| `eth_call`                                                     | `eth_sendRawTransaction`                                                                                                      |
|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Read-only                                                      | Write                                                                                                                         |
| Invokes contract function locally                              | Broadcasts to the network                                                                                                     |
| Does not change state of blockchain                            | Updates the blockchain (for example, transfers ether between accounts)                                                        |
| Does not consume gas                                           | Requires gas                                                                                                                  |
| Synchronous                                                    | Asynchronous                                                                                                                  |
| Returns the value of a contract function available immediately | Returns transaction hash only. A block might not include all possible transactions (for example, if the gas price is too low). |
