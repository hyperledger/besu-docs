---
title: Peer-to-peer TLS
sidebar_position: 2
description: Configure P2P TLS communication
tags:
  - private networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configure P2P TLS

You can configure TLS to secure the P2P communication between nodes by ensuring only authorized nodes can communicate with each other. Use certificates issued by a trusted authority to connect authorized nodes in the network.

:::caution

P2P TLS is an early access feature, and functionality and options may be updated between releases.

:::

Besu supports PKCS11, PKCS12, and JKS keystore and truststore types for P2P TLS.

## Configure P2P TLS

**Prerequisites**:

- A configured network. For example, [see steps 1 to 5 in the QBFT tutorial](../../../tutorials/qbft.md).
- Each node requires a keystore that contains the node's certificate and key.
- A truststore containing all the trusted certificates for the network.

Start Besu and include the following command line options on the required nodes:

```bash
besu --Xp2p-tls-enabled=true \
--Xp2p-tls-keystore-type="PKCS12" \
--Xp2p-tls-keystore-file="keystore" \
--Xp2p-tls-keystore-password-file="keystore.password" \
--Xp2p-tls-crl-file="crl2.pem" \
--Xp2p-tls-truststore-type="JKS" \
--Xp2p-tls-truststore-file="truststore.jks" \
--Xp2p-tls-truststore-password-file="truststore_password.txt"
```

In the command line:

- Enable TLS for P2P communication using [`--Xp2p-tls-enabled=true`](#xp2p-tls-enabled).
- Specify the keystore type and keystore file using [`--Xp2p-tls-keystore-type`](#xp2p-tls-keystore-type) and [`--Xp2p-tls-keystore-file`](#xp2p-tls-keystore-file).
- Specify the text file containing the password to unlock the keystore file using [`--Xp2p-tls-keystore-password-file`](#xp2p-tls-keystore-password-file).
- Specify the optional [certificate revocation list (CRL)] file using [`--Xp2p-tls-crl-file`](#xp2p-tls-crl-file).
- Specify the truststore type and truststore file using [`--Xp2p-tls-truststore-type`](#xp2p-tls-truststore-type) and [`--Xp2p-tls-truststore-file`](#xp2p-tls-truststore-file).
- Specify the text file containing the password to unlock the truststore file using [`--Xp2p-tls-truststore-password-file`](#xp2p-tls-keystore-password-file).

## Command line options

### `Xp2p-tls-crl-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xp2p-tls-crl-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xp2p-tls-crl-file=/home/cert/cert.crl.pem
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XP2P_TLS_CRL_FILE=/home/cert/cert.crl.pem
```

</TabItem>

</Tabs>

Path to the optional certificate revocation list (CRL) file.

### `Xp2p-tls-enabled`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xp2p-tls-enabled[=<true|false>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xp2p-tls-enabled=true
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XP2P_TLS_ENABLED=true
```

</TabItem>

</Tabs>

Enable TLS for P2P communication. The default is `false`.

### `Xp2p-tls-keystore-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xp2p-tls-keystore-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xp2p-tls-keystore-file=/home/cert/keystore.jks
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XP2P_TLS_KEYSTORE_FILE=/home/cert/keystore.jks
```

</TabItem>

</Tabs>

Keystore file containing the key and certificate to allow TLS for P2P communication.

### `Xp2p-tls-keystore-password-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xp2p-tls-keystore-password-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xp2p-tls-keystore-password-file=/home/cert/password.txt
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XP2P_TLS_KEYSTORE_PASSWORD_FILE=/home/cert/password.txt
```

</TabItem>

</Tabs>

Text file containing the password to unlock the keystore file.

### `Xp2p-tls-keystore-type`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xp2p-tls-keystore-type=<TYPE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xp2p-tls-keystore-type=JKS
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XP2P_TLS_KEYSTORE_TYPE=JKS
```

</TabItem>

</Tabs>

Keystore type that allows TLS for P2P communication. Valid options are `JKS`, `PKCS11`, and `PKCS12`. The default is `JKS`.

### `Xp2p-tls-truststore-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xp2p-tls-truststore-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xp2p-tls-truststore-file=/home/cert/truststore.jks
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XP2P_TLS_TRUSTSTORE_FILE=/home/cert/truststore.jks
```

</TabItem>

</Tabs>

Truststore containing the trusted certificates that allows TLS for P2P communication.

### `Xp2p-tls-truststore-password-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xp2p-tls-truststore-password-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xp2p-tls-truststore-password-file=/home/cert/password.txt
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XP2P_TLS_TRUSTSTORE_PASSWORD_FILE=/home/cert/password.txt
```

</TabItem>

</Tabs>

Text file containing the password to unlock the truststore file.

### `Xp2p-tls-truststore-type`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--Xp2p-tls-truststore-type=<TYPE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--Xp2p-tls-truststore-type=JKS
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_XP2P_TLS_TRUSTSTORE_TYPE=JKS
```

</TabItem>

</Tabs>

Truststore type. Valid options are `JKS`, `PKCS11`, and `PKCS12`. The default is `JKS`.

[certificate revocation list (CRL)]: https://www.securew2.com/blog/certificate-revocation-crl-explained
