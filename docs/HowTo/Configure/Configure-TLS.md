description: Configure TLS
<!--- END of page meta data -->

# Configure TLS

Hyperledger Besu supports TLS for client and server communication. For example, you can
[configure TLS](../../Concepts/TLS.md) for communication between [EthSigner](https://docs.ethsigner.pegasys.tech/en/latest/Concepts/TLS/) and Besu, and Besu and [Orion](https://docs.orion.pegasys.tech/en/latest/Concepts/TLS-Communication/).

Configure TLS communication from the command line.

**Prerequisites**:

* Besu's password-protected PKCS #12 keystore.
* File containing the keystore password

## Configure Client TLS

Allow clients (for example a dApp, curl, or EthSigner) to send and receive
secure HTTP JSON-RPCs.

**Client Prerequisites**:

* [The client must be configured for TLS](https://docs.ethsigner.pegasys.tech/en/latest/HowTo/Configure-TLS/#server-tls-connection).
* Client's PKCS #12 keystore information.

### Create the Known Clients File

The known clients file allows clients with self-signed certificates or
non-public certificates to connect to Besu.

Create a file (in this example, `knownClients`) that lists one or more trusted
clients. Use the format`<common_name> <hex-string>` where:

* `<common_name>` is the Common Name specified in the client certificate.
* `<hex-string>` is the SHA-256 fingerprint of the client certificate.

!!! example
    ```
    ethsigner 8E:E0:85:9F:FC:2E:2F:21:31:46:0B:82:4C:A6:88:AB:30:34:9A:C6:EA:4F:04:31:ED:0F:69:A7:B5:C2:2F:A7
    curl FC:18:BF:39:45:45:9A:15:46:76:A6:E7:C3:94:64:B8:34:84:A3:8E:B8:EA:67:DC:61:C0:29:E6:38:B8:B7:99
    ```
    
You can use [`openssl`](https://www.openssl.org/) or [`keytool`](https://docs.oracle.com/javase/6/docs/technotes/tools/solaris/keytool.html)
to display the SHA256 fingerprint.

!!! example
    ```
    keytool -list -v -keystore <keystore> -storetype PKCS12 -storepass <MY_PASSWORD>`.
    ```
    
### Start Besu

```bash
besu --rpc-http-enabled --rpc-http-tls-enabled --rpc-http-tls-client-auth-enabled --rpc-http-tls-keystore-file=/Users/me/my_node/keystore.pfx --rpc-http-tls-keystore-password-file=/Users/me/my_node/keystorePassword --rpc-http-tls-known-clients-file=/Users/me/my_node/knownClients
```

The command line:

* Enables the HTTP JSON-RPC service using the [`--rpc-http-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) option.
* Enables TLS for the HTTP JSON-RPC service using the [`--rpc-http-tls-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-tls-enabled)
option.
* Enables TLS client authentication using the [`--rpc-http-tls-client-auth-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-tls-client-auth-enabled) option.
* Specifies the keystore using the [`--rpc-http-tls-keystore-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-tls-keystore-file) option.
* Specifies the file that contains the password to decrypt the keystore using
the [`--rpc-http-tls-keystore-password-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-tls-keystore-password-file) option.
* [Specifies the clients](#create-the-known-clients-file) that are allowed to connect to Besu using the
[`--rpc-http-tls-known-clients-file`](../../Reference/CLI/CLI-Syntax.md#rpc-http-tls-known-clients-file) option.

!!! note
    Set [`--rpc-http-tls-ca-clients-enabled`](../../Reference/CLI/CLI-Syntax.md#rpc-http-tls-ca-clients-enabled)
    to `true` to allow access to clients with signed and trusted root CAs.
    
## Configure Server TLS

Allow Besu to securely communicate with the server (Orion).
 
**Server Prerequisites**:

* [The server must be configured to allow TLS communication](https://docs.orion.pegasys.tech/en/latest/Tutorials/TLS/).
* Server's certificate information.

### Create the Known Servers file

Create a file (in this example, `knownServers`) that lists one or more trusted
servers. The file contents use the format `<hostame>:<port> <hex-string>`
where:

* `<hostname>` is the server hostname
* `<port>` is the port used for communication
* `<hex-string>` is the SHA-256 fingerprint of the server's certificate.

!!! example
    ```
    localhost:8888 3C:B4:5A:F9:88:43:5E:62:69:9F:A9:9D:41:14:03:BA:83:24:AC:04:CE:BD:92:49:1B:8D:B2:A4:86:39:4C:AC
    127.0.0.1:8888 3C:B4:5A:F9:88:43:5E:62:69:9F:A9:9D:41:14:03:BA:83:24:AC:04:CE:BD:92:49:1B:8D:B2:A4:86:39:4C:AC
    ```

!!! note
    Specify both hostname and IP address in the file if unsure which is used in
    requests.
    
### Start Besu

```bash
besu --privacy-tls-enabled --privacy-tls-keystore-file=/Users/me/my_node/keystore.pfx --privacy-tls-keystore-password-file=/Users/me/my_node/keystorePassword --privacy-tls-known-enclave-file=/Users/me/my_node/knownServers
```

The command line:

* Enables TLS with the server using the [`--privacy-tls-enabled`](../../Reference/CLI/CLI-Syntax.md#privacy-tls-enabled) option.
* Specifies the keystore using the [`--privacy-tls-keystore-file`](../../Reference/CLI/CLI-Syntax.md#privacy-tls-keystore-file) option.
* Specifies the file that contains the password to decrypt the keystore using
the [`--privacy-tls-keystore-password-file`](../../Reference/CLI/CLI-Syntax.md#privacy-tls-keystore-password-file) option.
* Specifies the trusted servers using the [`--privacy-tls-known-enclave-file`](../../Reference/CLI/CLI-Syntax.md#privacy-tls-known-enclave-file) option.