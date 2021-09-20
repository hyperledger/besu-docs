---
description: Block proposal permissioning
---

# Block proposal permissioning

!!! important

    Only private networks using the [QBFT consensus protocol] support block proposal permissioning.

    Block proposal permissioning is an early access feature, and functionality and options may be updated between releases.

You can configure [block proposal permissoning](../../Concepts/PKI.md#block-proposal-permissioning)
to ensure authorized validator nodes can propose new blocks in the network.

Use certificates issued by a trusted authority to ensure validators are authorized to propose blocks.

## Configure block proposal permissioning

**Prerequisites**:

* A configured network. For example,
    [see steps 1 - 5 in the QBFT tutorial](../../Tutorials/Private-Network/Create-QBFT-Network.md).
* A keystore containing the certificate and key for each network node.
* A truststore containing all the trusted certificates for the network.

Start Besu and include the following command line options on the required nodes:

```bash
besu Xpki-block-creation-enabled=true \
Xpki-block-creation-keystore-type="pkcs12" \
Xpki-block-creation-keystore-file="keystore" \
Xpki-block-creation-keystore-password-file="keystore.password" \
Xpki-block-creation-keystore-certificate-alias="validator" \
Xpki-block-creation-truststore-type="pkcs12" \
Xpki-block-creation-truststore-file="truststore" \
Xpki-block-creation-truststore-password-file="truststore.password"
```

In the command line:

* Enable block proposal permissioning using [`--Xpki-block-creation-enabled=true`](#xpki-block-creation-enabled)
* Specify the the keystore type and keystore file using [`Xpki-block-creation-keystore-type`](#xpki-block-creation-keystore-type) and
    [`--Xpki-block-creation-keystore-file`](#xpki-block-creation-keystore-file)
* Specify the text file containing the password to unlock the keystore file using [`Xpki-block-creation-keystore-password-file`](#xpki-block-creation-keystore-password-file)
* Specify the alias of the certificate to be included in blocks proposed by this validator using
    [`Xpki-block-creation-keystore-certificate-alias`](#xpki-block-creation-keystore-certificate-alias)
* Specify the the trusttore type and truststore file using [`Xpki-block-creation-truststore-type`](#xpki-block-creation-truststore-type) and
    [`Xpki-block-creation-truststore-file`](#xpki-block-creation-truststore-file)
* Specify the text file containing the password to unlock the truststore file using
    [`Xpki-block-creation-truststore-password-file`](#xpki-block-creation-truststore-password-file)

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

[QBFT consensus protocol]: ../../HowTo/Configure/Consensus-Protocols/QBFT.md
