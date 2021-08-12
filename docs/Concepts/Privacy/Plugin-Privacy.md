---
description: Privacy Plugin
---

# Privacy Plugin
The Privacy Plugin allows users to define their own strategy for private transactions. 
This could take many forms, but ultimately it's down to the plugin implementor to provide besu with a private transaction when required.

!!! important

    Plugin privacy is an early access feature.

    Plugin interfaces are subject to change between releases. 

## Configuration
Plugin Privacy must be enabled using `--Xprivacy-plugin-enabled` and a plugin must be registered that implements a `PrivacyPluginPayloadProvider`.

## Payload Provider
The payload of the privacy marker transaction must be defined by the plugin. 
The payload should be used to ascertain the contents of the private transaction. 
This could be a link to a location in an enclave, or it could be an encrypted form of the private payload itself.
Besu doesn't need to know how the private transaction is distributed it just needs to know what the private transaction for this marker transaction.

### Sending Transactions
When submitting a private transaction using [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction). 
The signed transaction must be sent to `0x000000000000000000000000000000000000007a` this is what is used to indicate which [privacy precompiled contract](../Privacy/Private-Transaction-Processing.md) we're using.

1. The JSON-RPC endpoint passes the private transaction to the Private Transaction Handler.
2. The Private Transaction Handler sends the private transaction to your plugin.
3. Your plugin decides what data to store on chain in the payload e.g encrypt and serialize the private transaction.
4. Your plugin returns what needs to be stored in the payload for the marker transaction.
5. The Private Transaction Handler creates a Privacy Marker Transaction for the private
   transaction. The Private Transaction Handler propagates the Privacy Marker Transaction using devP2P
   in the same way as a public Ethereum transaction.

### Mining Transactions
When it comes to mining transactions the process happens but in reverse. 


1. The Mainnet Transaction Processor processes the Privacy Marker Transaction in the same way as
   any other public transaction. On nodes containing the [privacy precompile contract](../../Reference/API-Methods.md#priv_getprivacyprecompileaddress)
   specified in the `to` attribute of the Privacy Marker Transaction, the Mainnet Transaction Processor passes the
   Privacy Marker Transaction to the privacy precompile contract.

   !!! note
   Nodes receiving the Privacy Marker Transaction that do not contain the privacy precompile
   contract specified in the Privacy Marker Transaction ignore the Privacy Marker Transaction.

1. The privacy precompile contract queries your plugin for the private transaction using the privacy marker transaction.
1. The privacy precompile contract passes the private transaction to the Private Transaction
   Processor. The privacy group ID specifies the private world state to use.
1. The Private Transaction Processor executes the transaction. The Private Transaction Processor
   can read and write to the private world state, and read from the public world state.


## Transaction Factory

A further extension is available to help you define how privacy marker transactions are signed. 
Currently, besu supports fixed or random key signing for privacy marker transactions. 
You may wish to use a more dynamic approach, perhaps you need to use different keys for different groups?

Your plugin needs to register a `PrivateMarkerTransactionFactory`. Before a privacy marker transaction is submitted to the transaction pool a call to this factory is made. 
It is then the responsibility of the plugin to sign and serialize the privacy marker transaction. 
 
