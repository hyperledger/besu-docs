---
description: Privacy Plugin
---

# Privacy plugin

You can define your own strategy for private transactions by [building a plugin](../Plugins.md) that extends
Hyperledger Besu functionality.

The plugin can take many forms, but it must provide Besu with a private transaction when required.

!!! important

    The privacy plugin is an early access feature and plugin interfaces are subject to change between releases.

## Configuration

Enable the privacy plugin by starting Besu and including the `--Xprivacy-plugin-enabled` command line option.
The registered plugin must implement the `PrivacyPluginPayloadProvider` interface.

## Using the payload provider interface

The privacy plugin must define the [privacy marker transaction (PMT)] payload.
Use the payload to retrieve the contents of the private transaction which could be a link to a location in
an enclave, or an encrypted form of the private payload itself.

Besu doesn't need to know how the private transaction is distributed, it just needs to know what the private transaction
for the PMT is.

### Sending transactions

When submitting a private transaction using [`eea_sendRawTransaction`](../../Reference/API-Methods.md#eea_sendrawtransaction),
the signed transaction must be sent to `0x000000000000000000000000000000000000007a` to indicate the
[privacy precompiled contract](../Privacy/Private-Transaction-Processing.md) being used.

The transaction flow is as follows:

1. The JSON-RPC endpoint passes the private transaction to the private transaction handler (for example Tessera).
2. The private transaction handler sends the private transaction to the privacy plugin.
3. The plugin decides what data to store onchain in the payload, for example encrypt and serialize the private
    transaction.
4. The plugin returns what needs to be stored in the payload for the PMT.
5. The private transaction handler creates a PMT for the private transaction, and propagates the PMT using devP2P in
    the same way as a public Ethereum transaction.

### Mining transactions

When it comes to mining transactions the process happens in reverse to sending transactions.

1. The Mainnet transaction processor processes the PMT in the same way as
    any other public transaction. On nodes containing the [privacy precompile contract](../../Reference/API-Methods.md#priv_getprivacyprecompileaddress)
    specified in the `to` attribute of the PMT, the Mainnet transaction processor passes the PMT to the privacy precompile contract.

   !!! note

       Nodes receiving the PMT that do not contain the specified privacy precompile
       contract will ignore the PMT.

1. The privacy precompile contract queries the plugin for the private transaction using the PMT.
1. The privacy precompile contract passes the private transaction to the private transaction
    processor. The privacy group ID specifies the private world state to use.
1. The private transaction processor executes the transaction. The private transaction processor
    can read and write to the private world state, and read from the public world state.


## Transaction factory

An additional extension is available to help you define how PMTs are signed. Currently, Besu supports fixed or random
key signing for PMTs.

The extension allows you to use a more dynamic approach, for example different keys for different groups.

Your plugin needs to register the `PrivateMarkerTransactionFactory` interface which is called before submitting a PMT
to the transaction pool. The responsibility then lies with the plugin to sign and serialize the PMT.

[privacy marker transaction (PMT)]: ../../HowTo/Use-Privacy/Access-Private-Transactions.md
