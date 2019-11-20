description: Creating and sending private transactions with Hyperledger Besu
<!--- END of page meta data -->

# Creating and sending private transactions 

Create and send [private transactions](../../Concepts/Privacy/Privacy-Overview.md) using: 

* [web3.js-eea client library](../Interact/Client-Libraries/eeajs.md) or [web3j client library](https://github.com/web3j/web3j)
* [`eea_sendTransaction` with EthSigner](https://docs.ethsigner.pegasys.tech/en/latest/Using-EthSigner/Using-EthSigner/) 
* [`eea_sendRawTransaction`](#eea_sendrawtransaction) 
* [`priv_distributeRawTransaction`](#priv_distributerawtransaction)

All private transaction participants must be online for a private transaction to be successfully distributed. If any 
participants are offline when the private transaction is submitted, the transaction is not attempted and must be resubmitted.

!!! note
    Private transactions either deploy contracts or call contract functions. 
    Ether transfer transactions cannot be private. 

## eea_sendRawTransaction 

[`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction) distributes the private transaction to the participating 
nodes and, signs and submits the [privacy marker transaction] as described in [Private Transaction Processing](../../Concepts/Privacy/Private-Transaction-Processing.md).   

## priv_distributeRawTransaction 

[`priv_distributeRawTransaction`](../../Reference/API-Methods.md#priv_distributerawtransaction) distributes the 
private transaction to the participating nodes but does not sign and submit the [privacy marker transaction](../../Concepts/Privacy/Private-Transaction-Processing.md).
That is, [`priv_distributeRawTransaction`](../../Reference/API-Methods.md#priv_distributerawtransaction) 
performs steps 1 to 5 of [Private Transaction Processing](../../Concepts/Privacy/Private-Transaction-Processing.md). 

When using [`priv_distributeRawTransaction`](../../Reference/API-Methods.md#priv_distributerawtransaction) 
instead of [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction), send the 
enclave key returned by [`priv_distributeRawTransaction`](../../Reference/API-Methods.md#priv_distributerawtransaction) 
as the `data` in a [public Ethereum transaction](Transactions.md). That is, you sign and submit the privacy marker transaction yourself. 

Signing and submitting the [privacy marker transaction] instead of having it signed by the Besu node 
when processing the private transaction enables greater control over the signing of the [privacy marker transaction]. 

!!! warning 
    If the [privacy marker transaction] is not sent after distributing the private transaction, the 
    distributed private transaction is not executed and the private states are not updated.  
    
!!! example 
    Distribute private transaction using `priv_distributeRawTransaction`: 
    
    ```json
    {
      "jsonrpc":"2.0",
      "method":"priv_distributeRawTransaction",
      "params":["0xf90198808203e8832dc6c08080b8fb608060405234801561001057600080fd5b5060dc8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f24514604e57806355241077146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a6565b005b60005481565b80600081905550505600a165627a7a723058202bdbba2e694dba8fff33d9d0976df580f57bff0a40e25a46c398f8063b4c003600291ba05393543d483654fd01d9ee818cddfc7527dd6e13e6ef7b45a61e2ca13ffb6b70a0452338873862803ffe04056aea98cd0e3417ff971dcb384e54fce8ca1756a665a09de8260dc3763f8383a6a9ffe96909d36cd3ff4c346e3846a6467c50feaf0119e1a0839f41993789227ec721c9eaf1541683287fa436ef6edd9ec8fd088bad1a0c3c8a72657374726963746564"],
      "id":1
    }
    ```
    
    Enclave key is returned by `priv_distributeRawTransaction`: 
    
    ```json
    {
      "jsonrpc": "2.0",
      "id": 1,
      "result": "0xfd0d90ab824574abc19c0776ca0210e764561d0ef6d621f2bbbea316eccfe56b"
    }
    ```
    
    Send privacy marker transaction using `eth_sendTransaction` with EthSinger: 
    
    ```json
    {
      "jsonrpc":"2.0",
      "method":"eth_sendTransaction",
      "params":[{
        "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
        "data": "0xfd0d90ab824574abc19c0776ca0210e764561d0ef6d621f2bbbea316eccfe56b",
        "gas": "0x2E1800", 
        "gasPrice": "0x9184e72a000"
      }], 
      "id":1
    }
    ``` 

## Private transaction nonce 

Separate private states are maintained for each [privacy group](../../Concepts/Privacy/Privacy-Groups.md) so 
the nonce for an account is specific to the privacy group. That is, the nonce for account A for
privacy group ABC is different to the nonce for account A for privacy group AB. Use 
[`priv_getTransactionCount`](../../Reference/API-Methods.md#priv_gettransactioncount) or [`priv_getEeaTransactionCount`](../../Reference/API-Methods.md#priv_geteeatransactioncount) to get 
the nonce for an account for the specified privacy group.

!!! note
    If sending more than 1 transaction to be mined in the same block (that is, you're not waiting for 
    the transaction receipt), you must calculate the private transaction nonce outside Hyperledger Besu. 
    
## EEA-compliant or Besu-extended Privacy 

To create an [EEA-compliant private transaction](../../Concepts/Privacy/Privacy-Groups.md#eea-compliant-privacy), 
specify `privateFor` when creating the signed transaction 
passed as an input parameter to [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction).

To create a [Besu-extended private transaction](../../Concepts/Privacy/Privacy-Groups.md#besu-extended-privacy), 
specify a `privacyGroupId` when creating the signed transaction 
passed as an input parameter to [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction).

## Unsigned and unencoded private transactions 

The [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction) parameter is a 
signed RLP-encoded private transaction. Examples of unsigned and unencoded private transactions to create
a contract are displayed below. 

!!! example "Unencoded and unsigned EEA-compliant private transaction"
 
     ```
     {
       "to": null,
       "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
       "gas": "0x7600", 
       "gasPrice": "0x0", 
       "data": "0x608060405234801561001057600080fd5b5060dc8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f24514604e57806355241077146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a6565b005b60005481565b80600081905550505600a165627a7a723058202bdbba2e694dba8fff33d9d0976df580f57bff0a40e25a46c398f8063b4c00360029", 
       "nonce": "0x0",
       "privateFrom": "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
       "privateFor": ["g59BmTeJIn7HIcnq8VQWgyh/pDbvbt2eyP0Ii60aDDw=","6fg8q5rWMBoAT2oIiU3tYJbk4b7oAr7dxaaVY7TeM3U="],
       "restriction": "restricted"
     }
     ```

!!! example "Unencoded and unsigned Besu-extended private transaction"
 
     ```
     {
       "to": null,
       "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
       "gas": "0x7600", 
       "gasPrice": "0x0", 
       "data": "0x608060405234801561001057600080fd5b5060dc8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f24514604e57806355241077146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a6565b005b60005481565b80600081905550505600a165627a7a723058202bdbba2e694dba8fff33d9d0976df580f57bff0a40e25a46c398f8063b4c00360029", 
       "nonce": "0x0",
       "privateFrom": "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
       "privacyGroupId": "kAbelwaVW7okoEn1+okO+AbA4Hhz/7DaCOWVQz9nx5M=",
       "restriction": "restricted"
     }
     ```

!!! tip 
    The `example` directory in the [web3.js-eea client library](../Interact/Client-Libraries/eeajs.md) contains 
    examples of signing and encoding private transactions. 

<!-- links ----> 

[privacy marker transaction]: ../../Concepts/Privacy/Private-Transaction-Processing.md

