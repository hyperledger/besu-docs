description: TLS overview
<!--- END of page meta data -->

# TLS Communication

Hyperledger Besu supports inbound TLS communication (for example from EthSigner
or curl).

All TLS versions are supported. However, certificates must be PKCS #12 
formatted.

[Configure client authentication](../HowTo/Configure/Configure-TLS.md#create-known-clients-file) to specify which clients can
connect to Besu, and use the [command line options](../HowTo/Configure/Configure-TLS.md#start-besu) to specify the 
certificate locations.