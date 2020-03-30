---
description: Hyperledger Besu Clique Proof-of-Authority (PoA) consensus protocol implementation
path: blob/master/config/src/main/resources/
source: rinkeby.json
---

# Clique

Besu implements the Clique Proof-of-Authority (PoA) consensus protocol. The Rinkeby testnet uses
Clique and private networks can also use Clique.

In Clique networks, approved accounts, known as signers, validate transactions and blocks. Signers
take turns to create the next block. Existing signers propose and vote to add or remove signers.

## Genesis file

To use Clique in a private network, Besu requires a Clique genesis file. When connecting to Rinkeby,
Besu uses the
[`rinkeby.json`](https://github.com/hyperledger/besu/blob/master/config/src/main/resources/rinkeby.json)
genesis file in the `/besu/config/src/main/resources` directory.

A Clique genesis file defines properties specific to Clique.

!!! example "Sample Clique Genesis File"

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
* `extraData` - Vanity data takes up the first 32 bytes, followed by the initial signers.

### Extra data

The `extraData` field consists of:

* 0x prefix.
* 32 bytes (64 hex characters) of vanity data.
* A concatenated list of initial signer addresses (at least one initial signer required). 20 bytes
  (40 hex characters) for each signer.
* 65 bytes (130 hex characters) for the proposer signature. In the genesis block there is no
  initial proproser so the proproser signature is all zeros.

!!! example "One Initial Signer"

    ![One Initial Signer](../../../images/CliqueOneIntialSigner.png)

!!! example "Two Initial Signers"

    ![Two Initial Signers](../../../images/CliqueTwoIntialSigners.png)

## Connecting to a Clique network

To connect to the Rinkeby testnet, start Besu with the
[`--network=rinkeby`](../../../Reference/CLI/CLI-Syntax.md#network) command line option. To start a
node on a Clique private network, use the
[`--genesis-file`](../../../Reference/CLI/CLI-Syntax.md#genesis-file) option to specify the custom
genesis file.

## Adding and removing signers

To propose adding or removing signers using the JSON-RPC methods, enable the HTTP interface using
[`--rpc-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) or the WebSockets
interface using [`--rpc-ws-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-enabled).

The Clique API methods are not enabled by default. To enable them, specify the
[`--rpc-http-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-api) or
[`--rpc-ws-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) option and include `CLIQUE`.

The JSON-RPC methods to add or remove signers are:

* [`clique_propose`](../../../Reference/API-Methods.md#clique_propose)
* [`clique_getSigners`](../../../Reference/API-Methods.md#clique_getsigners)
* [`clique_discard`](../../../Reference/API-Methods.md#clique_discard).

!!! important

    A majority of existing signers must agree to add or remove a signer. That is, more than 50% of
    signers must execute `clique_propose` to add or remove a signer. For example, if you have four
    signers, the vote must be made on three signers.

To view signer metrics for a specified block range, call
[`clique_getSignerMetrics`](../../../Reference/API-Methods.md#clique_getsignermetrics).

### Adding a signer

To propose adding a signer, call
[`clique_propose`](../../../Reference/API-Methods.md#clique_propose), specifying the address of the
proposed signer and `true`. A majority of signers must execute the call.

!!! example "JSON-RPC clique_propose Request Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"clique_propose","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", true], "id":1}' <JSON-RPC-endpoint:port>
    ```

When the signer creates the next block, the signer adds a vote to the block for the proposed
signer.

When more than half of the existing signers propose adding the signer, with their votes distributed
in blocks, the signer can begin signing blocks.

To return a list of signers and confirm the addition of a proposed signer, call
[`clique_getSigners`](../../../Reference/API-Methods.md#clique_getsigners).

!!! example "JSON-RPC clique_getSigners Request Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"clique_getSigners","params":["latest"], "id":1}' <JSON-RPC-endpoint:port>
    ```

To discard your proposal after confirming the addition of a signer, call
[`clique_discard`](../../../Reference/API-Methods.md#clique_discard) specifying the address of the
proposed signer.

!!! example "JSON-RPC clique_discard Request Example"

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"clique_discard","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"], "id":1}' <JSON-RPC-endpoint:port>
    ```

### Removing a signer

The process for removing a signer is the same as adding a signer except you specify `false` as the
second parameter of [`clique_propose`](../../../Reference/API-Methods.md#clique_propose).

### Epoch transition

At each epoch transition, Clique discards all pending votes collected from received blocks.
Existing proposals remain in effect and signers re-add their vote the next time they create a block.

Define the number of blocks between epoch transitions in the genesis file.

<!-- Acronyms and Definitions -->

*[vanity data]: Signers can include anything they like as vanity data.