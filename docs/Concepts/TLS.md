---
description: TLS overview
---

# TLS communication

Hyperledger Besu supports TLS to secure client and server communication. You also need to configure
the client ([EthSigner](https://docs.ethsigner.pegasys.tech/en/latest/Concepts/TLS/))
or server ([Orion](https://docs.orion.pegasys.tech/en/latest/Concepts/TLS-Communication/)) for TLS.

![Besu TLS](../images/Besu_TLS.png)

You must store private keys and certificates in password-protected PKCS #12 keystore files.

Use the command line options to [enable and configure](../HowTo/Configure/Configure-TLS.md) TLS.
