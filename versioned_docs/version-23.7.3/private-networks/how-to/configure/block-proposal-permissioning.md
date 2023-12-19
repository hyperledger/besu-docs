---
title: Block proposal permissioning
description: Block proposal permissioning
sidebar_position: 7
tags:
  - private networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Block proposal permissioning

:::info

Only private networks using the [QBFT consensus protocol] support block proposal permissioning.

Block proposal permissioning is an early access feature, and functionality and options may be updated between releases.

:::

You can configure [block proposal permissioning](../../concepts/pki.md#block-proposal-permissioning) to ensure only authorized validator nodes can propose blocks in the network.

Use certificates issued by a trusted authority to ensure validators are authorized to propose blocks.

## Configure block proposal permissioning

**Prerequisites**:

- A configured network. For example, [see steps 1 to 5 in the QBFT tutorial](../../tutorials/qbft.md).
- A keystore containing the certificate and key for each network node.
- A truststore containing all the trusted certificates for the network.

Start Besu and include the following command line options on the required nodes:

```bash
besu --Xpki-block-creation-enabled=true \
--Xpki-block-creation-keystore-type="pkcs12" \
--Xpki-block-creation-keystore-file="keystore" \
--Xpki-block-creation-keystore-password-file="keystore.password" \
--Xpki-block-creation-crl-file="crl2.pem" \
--Xpki-block-creation-keystore-certificate-alias="validator" \
--Xpki-block-creation-truststore-type="pkcs12" \
--Xpki-block-creation-truststore-file="truststore" \
--Xpki-block-creation-truststore-password-file="truststore.password"
```

In the command line:

- Enable block proposal permissioning using [`--Xpki-block-creation-enabled=true`](#xpki-block-creation-enabled).
- Specify the keystore type and keystore file using [`Xpki-block-creation-keystore-type`](#xpki-block-creation-keystore-type) and [`--Xpki-block-creation-keystore-file`](#xpki-block-creation-keystore-file).
- Specify the text file containing the password to unlock the keystore file using [`Xpki-block-creation-keystore-password-file`](#xpki-block-creation-keystore-password-file).
- Specify the optional [certificate revocation list (CRL)] file using [`Xpki-block-creation-crl-file`](#xpki-block-creation-crl-file).
- Specify the alias of the certificate to be included in blocks proposed by this validator using [`Xpki-block-creation-keystore-certificate-alias`](#xpki-block-creation-keystore-certificate-alias).
- Specify the truststore type and truststore file using [`Xpki-block-creation-truststore-type`](#xpki-block-creation-truststore-type) and [`Xpki-block-creation-truststore-file`](#xpki-block-creation-truststore-file).
- Specify the text file containing the password to unlock the truststore file using [`Xpki-block-creation-truststore-password-file`](#xpki-block-creation-truststore-password-file).

## Command line options

### `Xpki-block-creation-crl-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xpki-block-creation-crl-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xpki-block-creation-crl-file=/home/cert/cert.crl.pem
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XPKI_BLOCK_CREATION_CRL_FILE=/home/cert/cert.crl.pem
```

</TabItem>

</Tabs>

Path to the optional certificate revocation list (CRL) file.

### `Xpki-block-creation-enabled`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xpki-block-creation-enabled[=<true|false>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xpki-block-creation-enabled=true
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XPKI_BLOCK_CREATION_ENABLED=true
```

</TabItem>

</Tabs>

Enable PKI integration. The default is `false`.

### `Xpki-block-creation-keystore-certificate-alias`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xpki-block-creation-keystore-certificate-alias=<NAME>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xpki-block-creation-keystore-certificate-alias=validatorA
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XPKI_BLOCK_CREATION_KEYSTORE_CERTIFICATE_ALIAS=validatorA
```

</TabItem>

</Tabs>

Alias of the certificate to be included in the blocks proposed by this validator. The default is `validator`.

### `Xpki-block-creation-keystore-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xpki-block-creation-keystore-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xpki-block-creation-keystore-file=/home/cert/keystore.jks
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XPKI_BLOCK_CREATION_KEYSTORE_FILE=/home/cert/keystore.jks
```

</TabItem>

</Tabs>

Keystore file containing the key and certificate for PKI block creation.

### `Xpki-block-creation-keystore-password-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xpki-block-creation-keystore-password-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xpki-block-creation-keystore-password-file=/home/cert/password.txt
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XPKI_BLOCK_CREATION_KEYSTORE_PASSWORD-FILE=/home/cert/password.txt
```

</TabItem>

</Tabs>

Text file containing the password to unlock the keystore file.

### `Xpki-block-creation-keystore-type`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xpki-block-creation-keystore-type=<TYPE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xpki-block-creation-keystore-type=JKS
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XPKI_BLOCK_CREATION_KEYSTORE_TYPE=JKS
```

</TabItem>

</Tabs>

PKI keystore type. Valid options are `JKS` and `PKCS12`. The default is `JKS`.

### `Xpki-block-creation-truststore-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xpki-block-creation-truststore-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xpki-block-creation-truststore-file=/home/cert/truststore.jks
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XPKI_BLOCK_CREATION_TRUSTSTORE_FILE=/home/cert/truststore.jks
```

</TabItem>

</Tabs>

Truststore containing the trusted certificates for PKI block creation.

### `Xpki-block-creation-truststore-password-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xpki-block-creation-truststore-password-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xpki-block-creation-truststore-password-file=/home/cert/password.txt
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XPKI_BLOCK_CREATION_TRUSTSTORE_PASSWORD_FILE=/home/cert/password.txt
```

</TabItem>

</Tabs>

Text file containing the password to unlock the truststore file.

### `Xpki-block-creation-truststore-type`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xpki-block-creation-truststore-type=<TYPE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xpki-block-creation-truststore-type=JKS
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XPKI_BLOCK_CREATION_TRUSTSTORE_TYPE=JKS
```

</TabItem>

</Tabs>

PKI truststore type. Valid options are `JKS` and `PKCS12`. The default is `JKS`.

[QBFT consensus protocol]: ./consensus/qbft.md
[certificate revocation list (CRL)]: https://www.securew2.com/blog/certificate-revocation-crl-explained
