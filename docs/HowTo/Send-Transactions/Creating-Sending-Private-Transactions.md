description: Creating and sending private transactions with Hyperledger Besu
<!--- END of page meta data -->

# Creating and sending private transactions 

Create and send [private transactions](../../Concepts/Privacy/Privacy-Overview.md) using: 

* [web3.js-eea client library](../Interact/Client-Libraries/eeajs.md) or [web3j client library](https://github.com/web3j/web3j)
* [`eea_sendTransaction` with EthSigner](https://docs.ethsigner.pegasys.tech/en/latest/Using-EthSigner/Using-EthSigner/) 
* [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction) 

All private transaction participants must be online for a private transaction to be successfully distributed. 
If any participants are offline when the private transaction is submitted, the transaction is not attempted and must be resubmitted.

!!! note
    Private transactions either deploy contracts or call contract functions. 
    Ether transfer transactions cannot be private. 

## Private transaction nonce 

Separate private states are maintained for each [privacy group](../../Concepts/Privacy/Privacy-Groups.md) so 
the account nonce for an account is specific to the privacy group. That is, the nonce for account A for
privacy group ABC is different to the account nonce for account A for privacy group AB. Use 
[`priv_getTransactionCount`](../../Reference/API-Methods.md#priv_gettransactioncount) to get 
the account nonce for an account for the specified privacy group.

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
signed RLP-encoded private transaction. Examples of unsigned and unencoded private transactions are 
displayed below. 

!!! example "Unencoded and unsigned EEA-compliant private transaction"
 
     ```
     {
       "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
       "gas": "0x7600", 
       "gasPrice": "0x0", 
       "data": "0x608060405234801561001057600080fd5b5060dc8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f24514604e57806355241077146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a6565b005b60005481565b80600081905550505600a165627a7a723058202bdbba2e694dba8fff33d9d0976df580f57bff0a40e25a46c398f8063b4c00360029", 
       "privateFrom": "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
       "privateFor": ["g59BmTeJIn7HIcnq8VQWgyh/pDbvbt2eyP0Ii60aDDw=","6fg8q5rWMBoAT2oIiU3tYJbk4b7oAr7dxaaVY7TeM3U="],
       "restriction": "restricted"
     }
     ```

!!! example "Unencoded and unsigned Besu-extended private transaction"
 
     ```
     {
       "from": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
       "gas": "0x7600", 
       "gasPrice": "0x0", 
       "data": "0x608060405234801561001057600080fd5b5060dc8061001f6000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f24514604e57806355241077146076575b600080fd5b348015605957600080fd5b50606060a0565b6040518082815260200191505060405180910390f35b348015608157600080fd5b50609e6004803603810190808035906020019092919050505060a6565b005b60005481565b80600081905550505600a165627a7a723058202bdbba2e694dba8fff33d9d0976df580f57bff0a40e25a46c398f8063b4c00360029", 
       "privateFrom": "negmDcN2P4ODpqn/6WkJ02zT/0w0bjhGpkZ8UP6vARk=",
       "privacyGroupId": "kAbelwaVW7okoEn1+okO+AbA4Hhz/7DaCOWVQz9nx5M=",
       "restriction": "restricted"
     }
     ```



