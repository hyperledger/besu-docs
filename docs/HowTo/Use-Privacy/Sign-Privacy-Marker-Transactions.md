description: How to sign a Privacy Marker Transaction with Hyperledger Besu
<!--- END of page meta data -->

# Signing Privacy Marker Transactions

Privacy Marker Transactions are signed with a random or specified key. To sign Privacy Marker Transactions with a specified private key, use [`--privacy-marker-transaction-signing-key-file`](../../Reference/CLI/CLI-Syntax.md#privacy-marker-transaction-signing-key-file) when starting Hyperledger Besu.

!!! important
    You must specify a key in networks where gas is paid, and the associated account must contain adequate funds.
    
In [free gas networks](../../HowTo/Configure/FreeGas.md), exclude the `--privacy-marker-transaction-signing-key-file` command line option to sign each Privacy Marker Transaction with a different random key to add additional anonymity.

!!! note
    During the [private transaction process](../../Concepts/Privacy/Private-Transaction-Processing.md), Privacy Marker Transactions are signed in Hyperledger Besu.