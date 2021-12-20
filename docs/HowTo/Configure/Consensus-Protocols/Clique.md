---
description: Hyperledger Besu Clique proof of authority (PoA) consensus protocol implementation
path: blob/master/config/src/main/resources/
source: rinkeby.json
---

# Clique

Besu implements the Clique proof of authority (PoA) consensus protocol. The Rinkeby testnet uses
Clique and private networks can also use Clique.

In Clique networks, approved accounts, known as signers, validate transactions and blocks. Signers
take turns to create the next block.
Existing signers propose and vote to [add or remove signers](Add-Validators.md#clique).

## Genesis file

To use Clique in a private network, Besu requires a Clique [genesis file](../Genesis-File.md). When connecting to Rinkeby,
Besu uses the
[`rinkeby.json`](https://github.com/hyperledger/besu/blob/master/config/src/main/resources/rinkeby.json)
genesis file in the `/besu/config/src/main/resources` directory.

A Clique genesis file defines properties specific to Clique.

!!! example "Example Clique genesis file"

    ```json
    {
      "config":{
        "chainId":1981,
        "constantinoplefixblock": 0,
        "clique":{
          "blockperiodseconds":15,
          "epochlength":30000
        }
      },
      "coinbase":"0x0000000000000000000000000000000000000000",
      "difficulty":"0x1",
      "extraData":"0x000000000000000000000000000000000000000000000000000000000000000001a54556254bfa3db2daa7673435ec63649925c50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "gasLimit":"0x1fffffffffffff",
      "mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce":"0x0",
      "timestamp":"0x5c51a607",
      "alloc": {},
      "number":"0x0",
      "gasUsed":"0x0",
      "parentHash":"0x0000000000000000000000000000000000000000000000000000000000000000"
    }
    ```

The properties specific to Clique are:

* `blockperiodseconds` - The block time, in seconds.
* `epochlength` - The number of blocks after which to reset all votes.
* `extraData` - [Extra data](#extra-data) including the initial signers.

### Extra data

The `extraData` property consists of:

* 0x prefix.
* 32 bytes of vanity data.
* A list of initial signer addresses (at least one initial signer is required).
  20 bytes for each signer.
* 65 bytes for the proposer signature.
  In the genesis block there is no initial proposer, so the proposer signature is all zeros.

!!! example "One initial signer"

    ![One Initial Signer](../../../images/CliqueOneIntialSigner.png)

!!! example "Two initial signers"

    ![Two Initial Signers](../../../images/CliqueTwoIntialSigners.png)

## Connecting to a Clique network

To connect to the Rinkeby testnet, start Besu with the
[`--network=rinkeby`](../../../Reference/CLI/CLI-Syntax.md#network) command line option. To start a
node on a Clique private network, use the
[`--genesis-file`](../../../Reference/CLI/CLI-Syntax.md#genesis-file) option to specify the custom
genesis file.

<!-- Acronyms and Definitions -->

*[vanity data]: Signers can include anything they like as vanity data.
