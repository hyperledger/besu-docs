description: Configure TLS
<!--- END of page meta data -->

# Configure TLS

Hyperledger Besu supports TLS for inbound communication. For example, you can
configure TLS for communication between EthSigner and Besu.

Use the command line to configure TLS.

Besu only supports password-protected PKSC #12 keystore files.

**Prerequisites**:

* Password-protected PKSC #12 keystore.
* File containing the keystore password

## Create Known Clients File

Create a file (in this example, `knownClients`) that lists one or more clients
with permission to connect to Besu. Use the format`<common_name> <hex-string>`
where `<common_name>` is the Common Name specified in the client certificate,
and `<hex-string>` is the SHA-256 fingerprint of the client certificate.

Only clients with self-signed certificates must be added to the file.

!!! example
    ```
    localhost DF:65:B8:02:08:5E:91:82:0F:91:F5:1C:96:56:92:C4:1A:F6:C6:27:FD:6C:FC:31:F2:BB:90:17:22:59:5B:50
    ```
    
You can use `openssl` or `keytool` command to display the fingerprint. For
example, `keytool -list -v -keystore <keystore> -storetype PKCS12 -storepass <MY_PASSWORD>`.

!!! note
    Common Names used in the certificates must not be identical.
    
## Start Besu

```bash
besu --rpc-http-enabled --rpc-http-tls-enabled --rpc-http-tls-keystore-file=/Users/me/my_node/keystore.pfx --rpc-http-tls-keystore-password-file=/Users/me/my_node/keystorePassword --rpc-http-tls-known-clients-file=/Users/me/my_node/knownClients
```

The command line:

* Enables the HTTP JSON-RPC service using the [`--rpc-http-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) option.
* Enables TLS for the HTTP JSON-RPC service using the [`--rpc-http-tls-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-tls-enabled)
option.
* Specifies the keystore using the [`--rpc-http-tls-keystore-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-tls-keystore-file) option.
* Specifies the file that contains the password to decrypt the keystore using
the [`--rpc-http-tls-keystore-password-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-tls-keystore-password-file) option.
* Specify the clients that are allowed to connect to Besu using the
[`--rpc-http-tls-known-clients-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-tls-known-clients-file) option.

