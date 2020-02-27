description: Multi-tenancy
<!--- END of page meta data -->

# Configuring a Multi-tenant Node

### Prerequisites

* [Privacy-enabled network](Configuring-Privacy.md)

Each Besu and associated Orion node in a privacy-enabled network can be
configured to host [multiple tenants](../../Concepts/Privacy/Multi-Tenancy.md).

In this tutorial we will add tenants to the `Node-1` Besu and Orion node in a 
[privacy-enabled network](Configuring-Privacy.md). 

```bash
IBFT-Network/
├── Node-1
│   ├── data
│   ├── Orion
├── Node-2
│   ├── data
│   ├── Orion
└── Node-3
    ├── data
    ├── Orion 
```

!!! note
    This tutorial uses [JWT public key authentication](../../HowTo/Interact/APIs/Authentication.md#jwt-public-key-authentication) to create the tenant's JWT tokens, but [Username and password authentication](../../HowTo/Interact/APIs/Authentication.md#username-and-password-authentication) can also be used.
    
## 1. Generate a Private and Public Key Pair

In the `Node-1` directory [create the `.pem` formatted key pair](../../HowTo/Interact/APIs/Authentication.md#1-generate-a-private-and-public-key-pair).
The key pair belongs to the Operator and is used to authenticate the
[tenant JWT tokens](#7-generate-tenant-jwt-tokens).

!!! note
    This step is not required when using [username and password authentication](../../HowTo/Interact/APIs/Authentication.md#username-and-password-authentication)
    to create the required JWT tokens.
    
## 2. Generate Orion Keys

In the `Node-1/Orion` directory, [generate a public/private key pair for each
tenant](Configuring-Privacy.md#3-generate-orion-keys).

Name the key pair `nodeKey2` and `nodeKey3`.

## 3. Update Password File

Update `passwordFile` in the `Node-1/Orion` directory by adding each password
used to generate the Orion keys on a new line.

A separate password is required for each key pair, even if the passwords are
identical.

## 4. Update the Orion Configuration File

In the `Node-1/Orion` directory, update the `orion.conf` file by adding the
new key pairs:

```bash
nodeurl = "http://127.0.0.1:8080/"
nodeport = 8080
clienturl = "http://127.0.0.1:8888/"
clientport = 8888
publickeys = ["nodeKey.pub", "nodeKey2.pub", "nodeKey3.pub"]
privatekeys = ["nodeKey.key", "nodeKey2.key", "nodeKey3.key"]
passwords = "passwordFile"
tls = "off"
```

## 5. Start Orion Nodes

In each `Orion` directory, [start Orion](Configuring-Privacy.md#5-start-orion-nodes) and specify the configuration file.

## 6. Start Besu Node-1

In the `Node-1` directory, start Besu Node-1:

```bash tab="MacOS"
besu --data-path=data --genesis-file=../genesis.json --rpc-http-authentication-enabled --rpc-http-authentication-jwt-public-key-file=publicKey.pem --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-whitelist="*" --rpc-http-cors-origins="all" --privacy-enabled --privacy-url=http://127.0.0.1:8888 --privacy-multi-tenancy-enabled --min-gas-price=0   
```

The command line specifies privacy options: 

* [`--rpc-http-authentication-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-enabled) enables authentication
for JSON-RPC APIs.
* [`--rpc-http-authentication-jwt-public-key-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-jwt-public-key-file) specifies the Operator's [public key file](#1-generate-a-private-and-public-key-pair). Used to authenticate the [tenant JWT tokens](#7-generate-tenant-jwt-tokens).
* [`--privacy-enabled`](../../Reference/CLI/CLI-Syntax.md#privacy-enabled) enables privacy.
* [`--privacy-url`](../../Reference/CLI/CLI-Syntax.md#privacy-url) specifies the Orion node URL (`clienturl` in `orion.conf`)
* [`--privacy-multi-tenancy-enabled`](../../Reference/CLI/CLI-Syntax.md#privacy-multi-tenancy-enabled) enables multi-tenancy.

!!! note
    [`--rpc-http-authentication-jwt-public-key-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-jwt-public-key-file) is only
    required when using [JWT public key authentication](../../HowTo/Interact/APIs/Authentication.md#jwt-public-key-authentication). If
    using [username and password authentication](../../HowTo/Interact/APIs/Authentication.md#username-and-password-authentication),
    use [`--rpc-http-authentication-credentials-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-credentials-file) instead.

[Start the remaining Besu nodes](Configuring-Privacy.md#7-start-besu-node-2).

## 7. Generate Tenant JWT Tokens

[Generate the JWT token](../../HowTo/Interact/APIs/Authentication.md#2-create-the-jwt-token) for each tenant and specify the [tenant's Orion public key](#2-generate-orion-keys)
in the `privacyPublicKey` field.

Ensure the appropriate [JSON-RPC API permissions](../../HowTo/Interact/APIs/Authentication.md#json-rpc-permissions) are applied to the token. For
example, ensure the `PRIV` and `EEA` APIs are enabled for privacy.

!!! note
    This step is not required when using [username and password authentication](../../HowTo/Interact/APIs/Authentication.md#username-and-password-authentication)
    to create the required JWT tokens.
    
  [Use the authentication token to make requests](../../HowTo/Interact/APIs/Authentication.md#using-an-authentication-token-to-make-requests).
