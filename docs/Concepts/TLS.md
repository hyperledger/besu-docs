description: TLS overview
<!--- END of page meta data -->

# TLS Communication

Hyperledger Besu supports TLS for inbound HTTP JSON-RPCs (for example from
EthSigner or curl).

!!! note
    TLS version 1.3 is currently not supported.
    
Private keys and certificates must be stored in a password-protected PKCS #12
file.

[Configure client authentication](../HowTo/Configure/Configure-TLS.md#create-known-clients-file) to specify which clients can
connect to Besu, and use the [command line options](../HowTo/Configure/Configure-TLS.md#start-besu) to specify the 
certificate locations.