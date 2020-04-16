---
description: Hyperledger Besu authentication and Authorization for JSON-RPC
---

# Authentication and authorization for JSON-RPC

Authentication identifies a user, and authorization verifies user access to requested JSON-RPC
methods. Hyperledger Besu verifies users using
[JSON Web Tokens (JWTs)](https://jwt.io/introduction/). JWTs are also used in
[multi-tenancy](../../../Concepts/Privacy/Multi-Tenancy.md) to verify tenant data access.

Besu supports two mutually exclusive authentication methods:

* [Username and password](#username-and-password-authentication)
* [JWT public key](#jwt-public-key-authentication).

Besu creates JWTs internally with
[username and password authentication](#username-and-password-authentication), and externally with
[JWT public key authentication](#jwt-public-key-authentication).

!!! important

    To prevent interception of authentication credentials and authenticated tokens, make
    authenticated requests over HTTPS. We recommended production deployments run behind a network
    layer that provides SSL termination. Besu does not provide a HTTPS connection natively.

## Username and password authentication

Enable authentication from the command line. Supply the credentials file and send a request to the
`/login` endpoint using the username and password. The `/login` endpoint creates a JWT for making
permitted JSON RPC requests.

Using [public key authentication](#jwt-public-key-authentication) disables the `/login` endpoint.

### 1. Create the credentials file

The `toml` credentials file defines user details and the JSON-RPC methods they can access.

!!! example "Sample Credentials File"

    ```toml
    [Users.username1]
    password = "$2a$10$l3GA7K8g6rJ/Yv.YFSygCuI9byngpEzxgWS9qEg5emYDZomQW7fGC"
    permissions=["net:*","eth:blockNumber"]
    privacyPublicKey="U7ANiOOd5L9Z/dMxRFjdbhA1Qragw6fLuYgmgCvLoX4="

    [Users.username2]
    password = "$2b$10$6sHt1J0MVUGIoNKvJiK33uaZzUwNmMmJlaVLkIwinkPiS1UBnAnF2"
    permissions=["net:version","admin:*"]
    privacyPublicKey="quhb1pQPGN1w8ZSZSyiIfncEAlVY/M/rauSyQ5wVMRE="
    ```

Each user requiring JSON-RPC access the configuration file lists the:

* Username. `Users.` is mandatory and followed by the username. That is, replace `<username>` in
  `[Users.<username>]` with the username.
* Hash of the user password. Use the
  [`password hash`](../../../Reference/CLI/CLI-Subcommands.md#password) subcommand to generate the
  hash.
* [JSON-RPC permissions](#json-rpc-permissions).
* Optional. The tenant's Orion public key using `privacyPublicKey`. Only used for
  [multi-tenancy](../../../Concepts/Privacy/Multi-Tenancy.md).

!!! example "password hash Subcommand"

    ```bash
    besu password hash --password=pegasys
    ```

### 2. Enable authentication

To require authentication for the JSON-RPC API, use the
[`--rpc-http-authentication-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-enabled)
or [`--rpc-ws-authentication-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-authentication-enabled)
options.

To specify the [credentials file](#1-create-the-credentials-file), use the
[`--rpc-http-authentication-credentials-file`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-credentials-file)
and [`--rpc-ws-authentication-credentials-file`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-authentication-credentials-file)
options.

### 3. Generate an authentication token

To generate an authentication token, make a request to the `/login` endpoint with your username and
password. Specify the HTTP port or the WS port to generate a token to authenticate over HTTP or WS
respectively. HTTP and WS requires a different token.

!!! example

    ```bash tab="Generate a token for HTTP"
    curl -X POST --data '{"username":"username1","password":"pegasys"}' <JSON-RPC-http-hostname:http-port>/login
    ```

    ```bash tab="Example for HTTP"
    curl -X POST --data '{"username":"username1","password":"pegasys"}' http://localhost:8545/login
    ```

    ```bash tab="Generate a token for WS"
    curl -X POST --data '{"username":"username1","password":"pegasys"}' <JSON-RPC-ws-hostname:ws-port>/login
    ```

    ```bash tab="Example for WS"
    curl -X POST --data '{"username":"username1","password":"pegasys"}' http://localhost:8546/login
    ```

    ```json tab="JSON result"
    {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyIqOioiXSwidXNlcm5hbWUiOiJ1c2VyMiIsImlhdCI6MTU1MDQ2MDYwNCwiZXhwIjoxNTUwNDYwOTA0fQ.l2Ycqzl_AyvReXBeUSayOlOMS_E8-DCuz3q0Db0DKD7mqyl6q-giWoEtfdWzUEvZbRRi2_ecKO3N6JkXq7zMKQAJbVAEzobfbaaXWcQEpHOjtnK4_Yz-UPyKiXtu7HGdcdl5Tfx3dKoksbqkBl3U3vFWxzmFnuu3dAISfVJYUNA"}
    ```

Authentication tokens expire five minutes after generation. If you require access after the token
expires, you need to generate a new token.

## JWT public key authentication

Enable authentication from the command line and supply the external JWT provider's public key.

JWT public authentication disables the Besu `/login` endpoint, meaning
[username and password authentication](#username-and-password-authentication) will not work.

### 1. Generate a private and public key pair

!!!note

    This step is for demonstration or testing purposes only. In a production environment the
    external JWT provider supplies the public key file.

The private and accompanying public key files must be in `.pem` format.

The key must use an RSA private key of at least 2048 bits.

!!! example "Sample using OpenSSL"

    ```bash
    openssl genrsa -out privateKey.pem 2048
    openssl rsa -pubout -in privateKey.pem -pubout -out publicKey.pem
    ```

### 2. Create the JWT

Create the JWT using an external tool.

!!! important

    The JWT must use the `RS256` algorithm

Each payload for the JWT contains:

* [JSON-RPC permissions](#json-rpc-permissions)
* [`exp` (Expiration Time) claim](https://tools.ietf.org/html/rfc7519#section-4.1.4)
* Optionally, the tenant's Orion public key using `privacyPublicKey`. Only used for
  [multi-tenancy](../../../Concepts/Privacy/Multi-Tenancy.md).

The following example uses the [JWT.io](https://jwt.io/) website to create a JWT for testing
purposes.

![Create a JSON Web Token](../../../images/JWT.png)

### 3. Enable authentication

To require authentication for the JSON-RPC API, use the
[`--rpc-http-authentication-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-enabled)
or [`--rpc-ws-authentication-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-authentication-enabled)
options.

To specify the JWT provider's public key file to use with the externally created JWT, use the
[`--rpc-http-authentication-jwt-public-key-file`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-jwt-public-key-file)
or [`--rpc-ws-authentication-jwt-public-key-file`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-authentication-jwt-public-key-file)
options.

## JSON-RPC permissions

Each user has a list of permissions strings defining the methods they can access. To give access
to:

* All API methods, specify `["*:*"]`.
* All API methods in an API group, specify `["<api_group>:*"]`. For example, `["eth:*"]`.
* Specific API methods, specify `["<api_group>:<method_name>"]`. For example, `["admin:peers"]`.

With authentication enabled, to explicitly specify a user cannot access any methods, include the
user with an empty permissions list (`[]`). Users with an empty permissions list and users not
included in the credentials file cannot access any JSON-RPC methods.

## Using an authentication token to make requests

Specify the authentication token as a `Bearer` token in the JSON-RPC request header.

### Postman

In the _Authorization_ tab in the _TYPE_ drop-down list, select *Bearer Token* and specify the
token (generated either [externally](#2-create-the-jwt-token) or by the
[`login` request](#3-generate-an-authentication-token)).

### cURL

Specify the `Bearer` in the header.

!!! example

    ```bash tab="cURL Request with Authentication Placeholders"
    curl -X POST -H 'Authorization: Bearer <JWT_TOKEN>' -d '{"jsonrpc":"2.0","method":"<API_METHOD>","params":[],"id":1}' <JSON-RPC-http-hostname:port>
    ```

    ```bash tab="cURL Request with Authentication"
    curl -X POST -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyIqOioiXSwidXNlcm5hbWUiOiJ1c2VyMiIsImlhdCI6MTU1MDQ2MTQxNiwiZXhwIjoxNTUwNDYxNzE2fQ.WQ1mqpqzRLHaoL8gOSEZPvnRs_qf6j__7A3Sg8vf9RKvWdNTww_vRJF1gjcVy-FFh96AchVnQyXVx0aNUz9O0txt8VN3jqABVWbGMfSk2T_CFdSw5aDjuriCsves9BQpP70Vhj-tseaudg-XU5hCokX0tChbAqd9fB2138zYm5M' -d '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":1}' http://localhost:8545
    ```