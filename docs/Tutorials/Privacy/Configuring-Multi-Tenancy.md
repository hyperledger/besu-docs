---
description: Configure multi-tenancy
---

# Configure a multi-tenant node

You can configure Besu and associated Tessera node in a privacy-enabled network to host
[multiple tenants](../../Concepts/Privacy/Multi-Tenancy.md).

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
           "enabled": true,
           "serverAddress": "http://localhost:9101",
           "communicationType" : "REST"
       },
       {
           "app":"Q2T",
           "enabled": true,
           "serverAddress": "http://localhost:9102",
           "communicationType" : "REST"
       },
       {
           "app":"P2P",
           "enabled": true,
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

* [`--rpc-http-authentication-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-enabled)
  enables authentication for JSON-RPC APIs.
* [`--rpc-http-authentication-jwt-public-key-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-jwt-public-key-file)
  specifies the Operator's [public key file](#1-generate-a-private-and-public-key-pair). Used to
  authenticate the [tenant JWTs](#7-generate-the-tenant-jwts).
* [`--privacy-enabled`](../../Reference/CLI/CLI-Syntax.md#privacy-enabled) enables privacy.
* [`--privacy-url`](../../Reference/CLI/CLI-Syntax.md#privacy-url) specifies the Q2T server address
    of the Tessera node (`Q2T` in `tessera.conf`).
* [`--privacy-multi-tenancy-enabled`](../../Reference/CLI/CLI-Syntax.md#privacy-multi-tenancy-enabled)
  enables multi-tenancy.

!!! note

    [`--rpc-http-authentication-jwt-public-key-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-jwt-public-key-file)
    is only required when using [JWT public key authentication]. If using
    [username and password authentication], use
    [`--rpc-http-authentication-credentials-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-credentials-file)
    instead.

[Start the remaining Besu nodes](Configuring-Privacy.md#7-start-besu-node-2).

## 6. Generate the tenant JWTs

[Generate the JWT](../../HowTo/Interact/APIs/Authentication.md#2-create-the-jwt) for each tenant
and specify the [tenant's Tessera public key](#2-generate-tessera-keys) in the `privacyPublicKey`
field.

Ensure you apply the appropriate
[JSON-RPC API permissions](../../HowTo/Interact/APIs/Authentication.md#json-rpc-permissions) to the
token. For example, ensure you enable the `PRIV` and `EEA` APIs for privacy.

!!! note

    This step is not required when using [username and password authentication] to create the
    required JWTs.

[Use the authentication token to make requests].

<!-- Links -->
[JWT public key authentication]: ../../HowTo/Interact/APIs/Authentication.md#jwt-public-key-authentication
[username and password authentication]: ../../HowTo/Interact/APIs/Authentication.md#username-and-password-authentication
[generate the private and public key pair]: ../../HowTo/Interact/APIs/Authentication.md#1-generate-a-private-and-public-key-pair
[Use the authentication token to make requests]: ../../HowTo/Interact/APIs/Authentication.md#using-an-authentication-token-to-make-requests

<!-- Abbreviations -->
*[JWT]: JSON Web Token
