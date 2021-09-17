---
description: PKI node permissioning
---

# Node permissioning

Hyperledger Besu allows you to configure node permissioning by using Besu's public key infrastructure (PKI) integration.

!!! warning

    Public key infrastructure (PKI) support is an early access feature, and functionality and options may be updated
    between releases.

    Node permissioning is not recommended for use on public networks.

Node permissioning allows nodes to use certificates issued by a trusted authority to connect to other authorized
nodes in the network, and enforces TLS between peers.

## Configure node permissioning

**Prerequisites**:

* A configured private network. For example,
    [see steps 1 - 5 in the QBFT tutorial](../../../Tutorials/Private-Network/Create-QBFT-Network.md).
* A keystore containing the certificate and key for each network node.
* A truststore containing all the trusted certificates for the network.

Start Besu and include the following command line options:

```bash
besu --Xp2p-tls-enabled=true \
--Xp2p-tls-keystore-type="PKCS12" \
--Xp2p-tls-keystore-file="keystore2" \
--Xp2p-tls-keystore-password-file="keystore2.password" \
--Xp2p-tls-crl-file="crl2.pem" \
--Xp2p-tls-truststore-type="JKS" \
--Xp2p-tls-truststore-file="truststore2.jks" \
--Xp2p-tls-truststore-password-file="truststore2_password.txt"
```

## Command line options

### `Xpki-block-creation-crl-file`

=== "Syntax"

    ```bash
    --Xpki-block-creation-crl-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --Xpki-block-creation-crl-file=/home/cert/cert.crl.pem
    ```

=== "Environment Variable"

    ```bash
    BESU_XPKI-BLOCK-CREATION-CRL-FILE=/home/cert/cert.crl.pem
    ```

Path to the optional certificate revocation list (CRL) file.

### `Xpki-block-creation-enabled`

=== "Syntax"

    ```bash
    --Xpki-block-creation-enabled[=<true|false>]
    ```

=== "Command Line"

    ```bash
    --Xpki-block-creation-enabled=true
    ```

=== "Environment Variable"

    ```bash
    BESU_XPKI-BLOCK-CREATION-ENABLED=true
    ```

Enable PKI integration. Defaults to `false`.

### `Xpki-block-creation-keystore-certificate-alias`

=== "Syntax"

    ```bash
    --Xpki-block-creation-keystore-certificate-alias=<NAME>
    ```

=== "Command Line"

    ```bash
    --Xpki-block-creation-keystore-certificate-alias=validatorA
    ```

=== "Environment Variable"

    ```bash
    BESU_XPKI-BLOCK-CREATION-KEYSTORE-CERTIFICATE-ALIAS=validatorA
    ```

Alias of the certificate to be included in the blocks proposed by this validator. Defaults to `validator`.

### `Xpki-block-creation-keystore-file`

=== "Syntax"

    ```bash
    --Xpki-block-creation-keystore-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --Xpki-block-creation-keystore-file=/home/cert/keystore.jks
    ```

=== "Environment Variable"

    ```bash
    BESU_XPKI-BLOCK-CREATION-KEYSTORE-FILE=/home/cert/keystore.jks
    ```

Keystore file containing the key and certificate for PKI block creation.

### `Xpki-block-creation-keystore-password-file`

=== "Syntax"

    ```bash
    --Xpki-block-creation-keystore-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --Xpki-block-creation-keystore-password-file=/home/cert/password.txt
    ```

=== "Environment Variable"

    ```bash
    BESU_XPKI-BLOCK-CREATION-KEYSTORE-PASSWORD-FILE=/home/cert/password.txt
    ```

Text file containing the password to unlock the keystore file.

### `Xpki-block-creation-keystore-type`

=== "Syntax"

    ```bash
    --Xpki-block-creation-keystore-type=<TYPE>
    ```

=== "Command Line"

    ```bash
    --Xpki-block-creation-keystore-type=JKS
    ```

=== "Environment Variable"

    ```bash
    BESU_XPKI-BLOCK-CREATION-KEYSTORE-TYPE=JKS
    ```

PKI keystore type. Valid options are `JKS` and `PKCS12`. Defaults to `JKS`.

### `Xpki-block-creation-truststore-file`

=== "Syntax"

    ```bash
    --Xpki-block-creation-truststore-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --Xpki-block-creation-truststore-file=/home/cert/truststore.jks
    ```

=== "Environment Variable"

    ```bash
    BESU_XPKI-BLOCK-CREATION-TRUSTSTORE-FILE=/home/cert/truststore.jks
    ```

Truststore containing the trusted certificates for PKI block creation.

### `Xpki-block-creation-truststore-password-file`

=== "Syntax"

    ```bash
    --Xpki-block-creation-truststore-password-file=<FILE>
    ```

=== "Command Line"

    ```bash
    --Xpki-block-creation-truststore-password-file=/home/cert/password.txt
    ```

=== "Environment Variable"

    ```bash
    BESU_XPKI-BLOCK-CREATION-TRUSTSTORE-PASSWORD-FILE=/home/cert/password.txt
    ```

Text file containing the password to unlock the truststore file.

### `Xpki-block-creation-truststore-type`

=== "Syntax"

    ```bash
    --Xpki-block-creation-truststore-type=<TYPE>
    ```

=== "Command Line"

    ```bash
    --Xpki-block-creation-truststore-type=JKS
    ```

=== "Environment Variable"

    ```bash
    BESU_XPKI-BLOCK-CREATION-TRUSTSTORE-TYPE=JKS
    ```

PKI truststore type. Valid options are `JKS` and `PKCS12`. Defaults to `JKS`.
