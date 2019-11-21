description: Mining overview
<!--- END of page meta data -->

Hyperledger Besu supports CPU and GPU mining which are [configured using command line options](../HowTo/Configure/Configure-Mining.md).

Besu supports GPU mining and has been tested using [Ethminer](https://github.com/ethereum-mining/ethminer) with the `stratum+tcp` and `getwork` schemes.

!!! note
    The `getwork` scheme is supported as the `http` scheme in certain mining software.