---
description: Configure P2P TLS communication
---

# P2P TLS

You can configure TLS to secure the P2P communication between nodes by ensuring only authorized nodes can communicate
with each other. Use certificates issued by a trusted authority to connect to other authorized nodes in the network.

!!! warning

    P2P TLS is an early access feature, and functionality and options may be updated
    between releases.

Besu supports PKCS12 and JKS keystore and truststore types for P2P TLS.

## Configure P2P TLS

**Prerequisites**:

* A configured network. For example,
    [see steps 1 to 5 in the QBFT tutorial](../../../Tutorials/Private-Network/Create-QBFT-Network.md).
* Each node requires a keystore that contains the node's certificate and key.
* A truststore containing all the trusted certificates for the network.

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

* Enable TLS for P2P communication using [`--Xp2p-tls-enabled=true`](#xp2p-tls-enabled)
* Specify the keystore type and keystore file using [`--Xp2p-tls-keystore-type`](#xp2p-tls-keystore-type) and
    [`--Xp2p-tls-keystore-file`](#xp2p-tls-keystore-file)
* Specify the text file containing the password to unlock the keystore file using [`--Xp2p-tls-keystore-password-file`](#xp2p-tls-keystore-password-file)
* Specify the optional [certificate revocation list (CRL)] file using [`--Xp2p-tls-crl-file`](#xp2p-tls-crl-file)
* Specify the truststore type and truststore file using [`--Xp2p-tls-truststore-type`](#xp2p-tls-truststore-type) and
    [`--Xp2p-tls-truststore-file`](#xp2p-tls-truststore-file)
* Specify the text file containing the password to unlock the truststore file using [`--Xp2p-tls-truststore-password-file`](#xp2p-tls-keystore-password-file)

## Command line options

### `Xp2p-tls-crl-file`

=== "Syntax"

    ```bash
    --Xp2p-tls-crl-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --Xp2p-tls-crl-file=/home/cert/cert.crl.pem
    ```

=== "Environment Variable"

    ```bash
    BESU_XP2P_TLS_CRL_FILE=/home/cert/cert.crl.pem
    ```

Path to the optional certificate revocation list (CRL) file.

### `Xp2p-tls-enabled`

=== "Syntax"

    ```bash
    --Xp2p-tls-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --Xp2p-tls-enabled=true
    ```

=== "Environment Variable"

    ```bash
    BESU_XP2P_TLS_ENABLED=true
    ```

Enable TLS for P2P communication. Defaults to `false`.

### `Xp2p-tls-keystore-file`

=== "Syntax"

    ```bash
    --Xp2p-tls-keystore-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --Xp2p-tls-keystore-file=/home/cert/keystore.jks
    ```

=== "Environment Variable"

    ```bash
    BESU_XP2P_TLS_KEYSTORE_FILE=/home/cert/keystore.jks
    ```

Keystore file containing the key and certificate to allow TLS for P2P communication.

### `Xp2p-tls-keystore-password-file`

=== "Syntax"

    ```bash
    --Xp2p-tls-keystore-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --Xp2p-tls-keystore-password-file=/home/cert/password.txt
    ```

=== "Environment Variable"

    ```bash
    BESU_XP2P_TLS_KEYSTORE_PASSWORD_FILE=/home/cert/password.txt
    ```

Text file containing the password to unlock the keystore file.

### `Xp2p-tls-keystore-type`

=== "Syntax"

    ```bash
    --Xp2p-tls-keystore-type=<TYPE>
    ```

=== "Command Line"

    ```bash
    --Xp2p-tls-keystore-type=JKS
    ```

=== "Environment Variable"

    ```bash
    BESU_XP2P_TLS_KEYSTORE_TYPE=JKS
    ```

Keystore type that allows TLS for P2P communication. Valid options are `JKS` and `PKCS12`. Defaults to `JKS`.

### `Xp2p-tls-truststore-file`

=== "Syntax"

    ```bash
    --Xp2p-tls-truststore-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --Xp2p-tls-truststore-file=/home/cert/truststore.jks
    ```

=== "Environment Variable"

    ```bash
    BESU_XP2P_TLS_TRUSTSTORE_FILE=/home/cert/truststore.jks
    ```

Truststore containing the trusted certificates that allows TLS for P2P communication.

### `Xp2p-tls-truststore-password-file`

=== "Syntax"

    ```bash
    --Xp2p-tls-truststore-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --Xp2p-tls-truststore-password-file=/home/cert/password.txt
    ```

=== "Environment Variable"

    ```bash
    BESU_XP2P_TLS_TRUSTSTORE_PASSWORD_FILE=/home/cert/password.txt
    ```

Text file containing the password to unlock the truststore file.

### `Xp2p-tls-truststore-type`

=== "Syntax"

    ```bash
    --Xp2p-tls-truststore-type=<TYPE>
    ```

=== "Command Line"

    ```bash
    --Xp2p-tls-truststore-type=JKS
    ```

=== "Environment Variable"

    ```bash
    BESU_XP2P_TLS_TRUSTSTORE_TYPE=JKS
    ```

Truststore type. Valid options are `JKS` and `PKCS12`. Defaults to `JKS`.

[certificate revocation list (CRL)]: https://www.securew2.com/blog/certificate-revocation-crl-explained
