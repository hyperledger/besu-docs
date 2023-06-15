---
title: Peer-to-peer TLS
sidebar_position: 2
description: Configure P2P TLS communication
tags:
  - private networks
---

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

<!--tabs-->

# Syntax

```bash
--Xp2p-tls-crl-file=<FILE>
```

# Example

```bash
--Xp2p-tls-crl-file=/home/cert/cert.crl.pem
```

# Environment variable

```bash
BESU_XP2P_TLS_CRL_FILE=/home/cert/cert.crl.pem
```

<!--/tabs-->

Path to the optional certificate revocation list (CRL) file.

### `Xp2p-tls-enabled`

<!--tabs-->

# Syntax

```bash
--Xp2p-tls-enabled[=<true|false>]
```

# Example

```bash
--Xp2p-tls-enabled=true
```

# Environment variable

```bash
BESU_XP2P_TLS_ENABLED=true
```

<!--/tabs-->

Enable TLS for P2P communication. The default is `false`.

### `Xp2p-tls-keystore-file`

<!--tabs-->

# Syntax

```bash
--Xp2p-tls-keystore-file=<FILE>
```

# Example

```bash
--Xp2p-tls-keystore-file=/home/cert/keystore.jks
```

# Environment variable

```bash
BESU_XP2P_TLS_KEYSTORE_FILE=/home/cert/keystore.jks
```

<!--/tabs-->

Keystore file containing the key and certificate to allow TLS for P2P communication.

### `Xp2p-tls-keystore-password-file`

<!--tabs-->

# Syntax

```bash
--Xp2p-tls-keystore-password-file=<FILE>
```

# Example

```bash
--Xp2p-tls-keystore-password-file=/home/cert/password.txt
```

# Environment variable

```bash
BESU_XP2P_TLS_KEYSTORE_PASSWORD_FILE=/home/cert/password.txt
```

<!--/tabs-->

Text file containing the password to unlock the keystore file.

### `Xp2p-tls-keystore-type`

<!--tabs-->

# Syntax

```bash
--Xp2p-tls-keystore-type=<TYPE>
```

# Example

```bash
--Xp2p-tls-keystore-type=JKS
```

# Environment variable

```bash
BESU_XP2P_TLS_KEYSTORE_TYPE=JKS
```

<!--/tabs-->

Keystore type that allows TLS for P2P communication. Valid options are `JKS`, `PKCS11`, and `PKCS12`. The default is `JKS`.

### `Xp2p-tls-truststore-file`

<!--tabs-->

# Syntax

```bash
--Xp2p-tls-truststore-file=<FILE>
```

# Example

```bash
--Xp2p-tls-truststore-file=/home/cert/truststore.jks
```

# Environment variable

```bash
BESU_XP2P_TLS_TRUSTSTORE_FILE=/home/cert/truststore.jks
```

<!--/tabs-->

Truststore containing the trusted certificates that allows TLS for P2P communication.

### `Xp2p-tls-truststore-password-file`

<!--tabs-->

# Syntax

```bash
--Xp2p-tls-truststore-password-file=<FILE>
```

# Example

```bash
--Xp2p-tls-truststore-password-file=/home/cert/password.txt
```

# Environment variable

```bash
BESU_XP2P_TLS_TRUSTSTORE_PASSWORD_FILE=/home/cert/password.txt
```

<!--/tabs-->

Text file containing the password to unlock the truststore file.

### `Xp2p-tls-truststore-type`

<!--tabs-->

# Syntax

```bash
--Xp2p-tls-truststore-type=<TYPE>
```

# Example

```bash
--Xp2p-tls-truststore-type=JKS
```

# Environment variable

```bash
BESU_XP2P_TLS_TRUSTSTORE_TYPE=JKS
```

<!--/tabs-->

Truststore type. Valid options are `JKS`, `PKCS11`, and `PKCS12`. The default is `JKS`.

[certificate revocation list (CRL)]: https://www.securew2.com/blog/certificate-revocation-crl-explained
