description: Creating and sending private transactions with Hyperledger Besu
<!--- END of page meta data -->

# Creating and Sending Private Transactions 

Create and send private transactions using: 

* [web3.js-eea client library](../Interact/Client-Libraries/eeajs.md) or [web3j client library](https://github.com/web3j/web3j)
* [`eea_sendTransaction` with EthSigner](https://docs.ethsigner.pegasys.tech/en/latest/Using-EthSigner/Using-EthSigner/) 
* [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction) 

!!! note
    Private transactions either deploy contracts or call contract functions. 
    Ether transfer transactions cannot be private. 

Separate private states are maintained for each [privacy group](../../Concepts/Privacy/Privacy-Groups.md) so 
the account nonce for an account is specific to the privacy group. That is, the nonce for account A for
privacy group ABC is different to the account nonce for account A for privacy group AB. Use 
[`priv_getTransactionCount`](../../Reference/API-Methods.md#priv_gettransactioncount) to get 
the account nonce for an account for the specified privacy group.

All private transaction participants must be online for a private transaction to be successfully distributed. If any participants are offline when the private transaction is submitted, the transaction is not attempted and must be resubmitted.

!!! note
    If sending more than 1 transaction to be mined in the same block (that is, you're not waiting for 
    the transaction receipt), you must calculate the private transaction nonce outside Hyperledger Besu. 
