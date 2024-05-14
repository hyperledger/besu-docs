---
title: Privacy plugin
description: Privacy plugin
sidebar_position: 5
---

# Privacy plugin

You can define your own strategy for private transactions by building a plugin that extends Hyperledger Besu functionality.

The plugin can take many forms, but it must provide Besu with a private transaction when required.

:::danger

The privacy plugin is an early access feature and plugin interfaces are subject to change between releases.

:::

## Configuration

Enable the privacy plugin by starting Besu and including the `--Xprivacy-plugin-enabled` command line option. The registered plugin must implement the `PrivacyPluginPayloadProvider` interface.

## Use the payload provider interface

The privacy plugin must define the [privacy marker transaction (PMT)] payload. Use the payload to retrieve the contents of the private transaction which could be a link to a location in an enclave, or an encrypted form of the private payload itself.

Besu doesn't need to know how the private transaction is distributed, it just needs to know what the private transaction for the PMT is.

### Send transactions

When submitting a private transaction using [`eea_sendRawTransaction`](../../../public-networks/reference/api/index.md#eea_sendrawtransaction), the signed transaction must be sent to `0x000000000000000000000000000000000000007a` to indicate which [privacy precompiled contract](private-transactions/processing.md) is being used.

The transaction flow is as follows:

1. The JSON-RPC endpoint passes the private transaction to the private transaction manager (for example Tessera).
2. The private transaction manager sends the private transaction to the privacy plugin.
3. The plugin decides what data to store onchain in the payload, for example the encrypted and serialized private transaction.
4. The plugin returns what needs to be stored in the payload for the PMT.
5. The private transaction handler creates a PMT for the private transaction, and propagates the PMT using devP2P in the same way as a public Ethereum transaction.

### Mine transactions

The process of mining transactions happens in reverse to sending transactions.

1.  The Mainnet transaction processor processes the PMT in the same way as any other public transaction. On nodes containing the [privacy precompile contract](../../../public-networks/reference/api/index.md#priv_getprivacyprecompileaddress) specified in the `to` attribute of the PMT, the Mainnet transaction processor passes the PMT to the privacy precompile contract.

    :::note

    Nodes receiving the PMT that do not contain the specified privacy precompile contract will ignore the PMT.

    :::

1.  The privacy precompile contract queries the plugin for the private transaction using the PMT.
1.  The privacy precompile contract passes the private transaction to the private transaction manager. The privacy group ID specifies the private world state to use.
1.  The private transaction manager executes the transaction. The private transaction manager can read and write to the private world state, and read from the public world state.

## Transaction factory

An additional extension is available to help you define how PMTs are signed. Currently, Besu supports fixed or random key signing for PMTs.

The extension allows you to use a more dynamic approach, for example different keys for different groups.

Your plugin needs to register the `PrivateMarkerTransactionFactory` interface which is called before submitting a PMT to the transaction pool. The responsibility then lies with the plugin to sign and serialize the PMT.

[privacy marker transaction (PMT)]: ../../how-to/use-privacy/access-private-transactions.md

## Register your plugin

To enable Besu to use your privacy plugin, implement the `PrivacyPluginService` interface and call `setPayloadProvider`.

```java
@AutoService(BesuPlugin.class)
public class TestPrivacyPlugin implements BesuPlugin {
  private PrivacyPluginService service;
  @Override
  public void register(BesuContext context) {
    service = context.getService(PrivacyPluginService.class).get();
  }
  @Override
  public void start() {
    service.setPayloadProvider(new PrivacyPluginPayloadProvider() {
      @Override
      public Bytes generateMarkerPayload(PrivateTransaction privateTransaction, String privacyUserId) {
        // perform logic to serialize the payload of the marker transaction
        // in this example we are serialising the private transaction using rlp https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/
        return org.hyperledger.besu.ethereum.privacy.PrivateTransaction.serialize(privateTransaction).encoded();
      }
      @Override
      public Optional<PrivateTransaction> getPrivateTransactionFromPayload(Transaction transaction) {
        // perform logic to deserialize payload from the marker transaction
        final BytesValueRLPInput bytesValueRLPInput =
          new BytesValueRLPInput(transaction.getPayload(), false);
        return Optional.of(org.hyperledger.besu.ethereum.privacy.PrivateTransaction.readFrom(bytesValueRLPInput));
      }
    });
  }
  @Override
  public void stop() {}
}
```
