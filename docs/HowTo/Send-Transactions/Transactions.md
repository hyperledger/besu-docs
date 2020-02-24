description: Some use cases of creating transactions on a Hyperledger Besu network
<!--- END of page meta data -->

# Creating and Sending Transactions

You can send signed transactions using Hyperledger Besu [`eth_sendRawTransaction`](../../Reference/API-Methods.md#eth_sendrawtransaction) JSON-RPC API method.

Signed transactions can be simple value transfers, contract creation, or contract invocation.

[Example scripts](../Develop-Dapps/Use-web3js.md) are provided to create a signed raw transaction that can be passed to 
[`eth_sendRawTransaction`](../../Reference/API-Methods.md#eth_sendrawtransaction) to send Ether
and create a smart contract.

!!! warning "Private keys"

    Do not use the accounts in the examples on mainnet or any public network except for testing.
    The private keys are displayed which means the accounts are not secure.
    
    All accounts and private keys in the examples are from the `dev.json` genesis file in the 
    [`/besu/ethereum/core/src/main/resources`](https://github.com/hyperledger/besu/tree/master/config/src/main/resources) directory.

    In production environments avoid exposing your private keys by creating signed transactions 
    offline, or use [EthSigner](https://docs.ethsigner.pegasys.tech/) to isolate your private keys and 
    sign transactions with [`eth_sendTransaction`](https://docs.ethsigner.pegasys.tech/Using-EthSigner/Using-EthSigner/#eth_sendtransaction). 
                     
!!! tip
    Libraries such as [web3j](https://github.com/web3j/web3j) or [ethereumj](https://github.com/ethereum/ethereumj)
    and tools such as [MyCrypto](https://mycrypto.com/) can also be used to create signed transactions.

## eth_call vs eth_sendRawTransaction

You can interact with contracts using  
or [eth_sendRawTransaction](../../Reference/API-Methods.md#eth_sendrawtransaction). 
The table below compares the characteristics of both calls.

| eth_call                                                | eth_sendRawTransaction                                                                                                         |
|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| Read-only                                               | Write                                                                                                                          |
| Invokes contract function locally                       | Broadcasts to network                                                                                                          |
| Does not change state of blockchain                     | Updates blockchain (for example, transfers ether between accounts)                                                             |
| Does not consume gas                                    | Requires gas                                                                                                                   |
| Synchronous                                             | Asynchronous                                                                                                                   |
| Return value of contract function available immediately | Returns transaction hash only.  Possible transaction may not be included in a block (for example, if the gas price is too low). |
