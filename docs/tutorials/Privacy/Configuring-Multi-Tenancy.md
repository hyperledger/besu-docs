---
description: Configure multi-tenancy
---

# Configure a multi-tenant node

!!! warning

    Orion features have been merged into Tessera!
    Read our [Orion to Tessera migration guide](https://docs.orion.consensys.net/en/latest/Tutorials/Migrating-from-Orion-to-Tessera/)
    and about all the [new Tessera features](https://consensys.net/blog/quorum/tessera-the-privacy-manager-of-choice-for-consensys-quorum-networks).

You can configure Besu and associated Tessera node in a privacy-enabled network to host
[multiple tenants](../../private-networks/concepts/privacy/multi-tenancy.md).

In this tutorial we'll add tenants to the `Node-1` Besu and Tessera node in a
[privacy-enabled network](Configuring-Privacy.md).

```bash
IBFT-Network/
├── Node-1
│   ├── data
│   ├── Tessera
├── Node-2
│   ├── data
│   ├── Tessera
├── Node-3
│   ├── data
│   ├── Tessera
└── Node-4
    ├── data
    ├── Tessera
```

!!! note

    This tutorial uses [JWT public key authentication] to create the tenant's JWT,
    but you can also use [username and password authentication].

## Prerequisites

* A [Privacy-enabled network](Configuring-Privacy.md).

## 1. Generate a private and public key pair

In the `Node-1` directory, [generate the private and public key pair]. The key pair, which must be
in `.pem` format, belongs to the operator who uses the key pair to authenticate the
[tenant JWTs](#7-generate-the-tenant-jwts).

!!! note

    This step is not required when using [username and password authentication] to create the
    required JWTs.

## 2. Generate Tessera keys

In the `Node-1/Tessera` directory,
[generate a public/private key pair for each tenant](Configuring-Privacy.md#2-generate-tessera-keys).

!!! note

    The instructions creates an unlocked private key, meaning you do not need a password to decrypt
    the private key file.

Name the key pair `nodeKey2` and `nodeKey3`.

## 3. Update the Tessera configuration file

In the `Node-1/Tessera` directory, update the `tessera.conf` file by adding the new key pairs:

```json
{
   "mode": "orion",
   "useWhiteList": false,
   "jdbc": {
       "username": "sa",
       "password": "",
       "url": "jdbc:h2:./target/h2/tessera1",
       "autoCreateTables": true
   },
   "serverConfigs":[
       {
           "app":"ThirdParty",
           "serverAddress": "http://localhost:9101",
           "communicationType" : "REST"
       },
       {
           "app":"Q2T",
           "serverAddress": "http://localhost:9102",
           "communicationType" : "REST"
       },
       {
           "app":"P2P",
           "serverAddress":"http://localhost:9103",
           "sslConfig": {
               "tls": "OFF"
           },
           "communicationType" : "REST"
       }
   ],
   "peer": [
       {
           "url": "http://localhost:9203"
       },
       {
           "url": "http://localhost:9303"
       },
       {
           "url": "http://localhost:9403"
       }
   ],
    "keys": {
        "passwords": [],
        "keyData": [
            {
                "privateKeyPath": "nodeKey.key",
                "publicKeyPath": "nodeKey.pub"
            },
            {
                "privateKeyPath": "nodeKey2.key",
                "publicKeyPath": "nodeKey2.pub"
            },
            {
                "privateKeyPath": "nodeKey3.key",
                "publicKeyPath": "nodeKey3.pub"
            }
        ]
   },
   "alwaysSendTo": []
}
```

!!! note

    If you are running Besu in [GoQuorum-compatible privacy mode](../../HowTo/Use-Privacy/Use-GoQuorum-compatible-privacy.md),
    disable [`orion` mode](https://docs.tessera.consensys.net/en/stable/HowTo/Configure/Orion-Mode/) by removing the line
    `"mode": "orion",` from the Tessera configuration file.

## 4. Start Tessera

[Start the Tessera nodes](Configuring-Privacy.md#4-start-the-tessera-nodes) and specify
the configuration file.

## 5. Start Besu Node-1

In the `Node-1` directory, start Besu Node-1:

=== "MacOS"

    ```bash
    besu --data-path=data --genesis-file=../genesis.json --rpc-http-authentication-enabled --rpc-http-authentication-jwt-public-key-file=publicKey.pem --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --privacy-enabled --privacy-url=http://127.0.0.1:9102 --privacy-multi-tenancy-enabled --min-gas-price=0
    ```

The command line specifies privacy options:

* [`--rpc-http-authentication-enabled`](../../reference/cli/options.md#rpc-http-authentication-enabled)
  enables authentication for JSON-RPC APIs.
* [`--rpc-http-authentication-jwt-public-key-file`](../../reference/cli/options.md#rpc-http-authentication-jwt-public-key-file)
  specifies the Operator's [public key file](#1-generate-a-private-and-public-key-pair). Used to
  authenticate the [tenant JWTs](#7-generate-the-tenant-jwts).
* [`--privacy-enabled`](../../reference/cli/options.md#privacy-enabled) enables privacy.
* [`--privacy-url`](../../reference/cli/options.md#privacy-url) specifies the
    [Quorum to Tessera (Q2T)] server address of the Tessera node (`Q2T` in `tessera.conf`).
* [`--privacy-multi-tenancy-enabled`](../../reference/cli/options.md#privacy-multi-tenancy-enabled)
  enables multi-tenancy.

!!! note

    [`--rpc-http-authentication-jwt-public-key-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-jwt-public-key-file)
    is only required when using [JWT public key authentication]. If using
    [username and password authentication], use
    [`--rpc-http-authentication-credentials-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-credentials-file)
    instead.

[Start the remaining Besu nodes](Configuring-Privacy.md#7-start-besu-node-2).

## 6. Generate the tenant JWTs

[Generate the JWT](../../how-to/use-besu-api/authenticate.md#2-create-the-jwt) for each tenant
and specify the [tenant's Tessera public key](#2-generate-tessera-keys) in the `privacyPublicKey`
field.

Ensure you apply the appropriate
[JSON-RPC API permissions](../../how-to/use-besu-api/authenticate.md#json-rpc-permissions) to the
token. For example, ensure you enable the `PRIV` and `EEA` APIs for privacy.

!!! note

    This step is not required when using [username and password authentication] to create the
    required JWTs.

[Use the authentication token to make requests].

<!-- Links -->
[JWT public key authentication]: ../../how-to/use-besu-api/authenticate.md#jwt-public-key-authentication
[username and password authentication]: ../../how-to/use-besu-api/authenticate.md#username-and-password-authentication
[generate the private and public key pair]: ../../how-to/use-besu-api/authenticate.md#1-generate-a-private-and-public-key-pair
[Use the authentication token to make requests]: ../../how-to/use-besu-api/authenticate.md#using-an-authentication-token-to-make-requests
[Quorum to Tessera (Q2T)]: https://docs.tessera.consensys.net/Concepts/TesseraAPI/#quorum-to-tessera-api
<!-- Abbreviations -->
*[JWT]: JSON Web Token
