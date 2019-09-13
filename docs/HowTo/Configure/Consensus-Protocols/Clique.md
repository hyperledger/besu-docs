description: Hyperledger Besu Clique Proof-of-Authority (PoA) consensus protocol implementation
path: blob/master/config/src/main/resources/
source: rinkeby.json
<!--- END of page meta data -->

*[vanity data]: Signers can include anything they like as vanity data.

# Clique

Besu implements the Clique Proof-of-Authority (PoA) consensus protocol. Clique is used by the
Rinkeby testnet and can be used for private networks. 

In Clique networks, transactions and blocks are validated by approved accounts, known as signers.
Signers take turns to create the next block. Existing signers propose and vote to add or remove signers. 

## Genesis File

To use Clique in a private network, Besu requires a Clique genesis file. When connecting to Rinkeby,
Besu uses the [`rinkeby.json`](https://github.com/hyperledger/besu/blob/master/config/src/main/resources/rinkeby.json) 
genesis file in the `/besu/config/src/main/resources` directory.

A PoA genesis file defines properties specific to Clique:

!!! example "Example Clique Genesis File"
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
      "gasLimit":"0xa00000",
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

* `blockperiodseconds` - Block time in seconds. 
* `epochlength` - Number of blocks after which to reset all votes.
* `extraData` - Initial signers are specified after the 32 bytes reserved for vanity data. 

### Extra Data 

The `extraData` field consists of: 

* 0x prefix
* 32 bytes (64 hex characters) of vanity data 
* Concatenated list of initial signer addresses. 20 bytes (40 hex characters) for each signer. At least one
initial signer must be specified. 
* 65 bytes (130 hex characters) for proposer signature. In the genesis block there is no initial proproser so the proproser signature is all zeros. 

!!! example "One Initial Signer"
    `extraData` field for a Clique network with one initial signer with an address of `dd37f65db31c107f773e82a4f85c693058fef7a9`
    
    `0x0000000000000000000000000000000000000000000000000000000000000000dd37f65db31c107f773e82a4f85c693058fef7a90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`

!!! example "Two Initial Signers"
    `extraData` field for a Clique network with two initial signers with addresses of `dd37f65db31c107f773e82a4f85c693058fef7a9` and `b9b81ee349c3807e46bc71aa2632203c5b462034`.
    
    `0x0000000000000000000000000000000000000000000000000000000000000000dd37f65db31c107f773e82a4f85c693058fef7a9b9b81ee349c3807e46bc71aa2632203c5b4620340000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`

## Connecting to Clique Network 

To connect to the Rinkeby testnet, start Besu with the [`--network=rinkeby`](../../../Reference/CLI/CLI-Syntax.md#network)
command line option. To start a node on a Clique private network, use the 
[`--genesis-file`](../../../Reference/CLI/CLI-Syntax.md#genesis-file) option to specify the custom genesis file. 

## Adding and Removing Signers

To propose adding or removing signers using the JSON-RPC methods, enable the HTTP interface 
using [`--rpc-http-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-enabled) or WebSockets interface using 
[`--rpc-ws-enabled`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-enabled). 

The Clique API methods are not enabled by default. To enable, specify the [`--rpc-http-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-http-api) 
or [`--rpc-ws-api`](../../../Reference/CLI/CLI-Syntax.md#rpc-ws-api) option and include `CLIQUE`.

The JSON-RPC methods to add or remove signers are:

* [clique_propose](../../../Reference/API-Methods.md#clique_propose)
* [clique_getSigners](../../../Reference/API-Methods.md#clique_getsigners)
* [clique_discard](../../../Reference/API-Methods.md#clique_discard)

!!! important
    A majority of existing signers must agree to add or remove a signer. That is, `clique_propose` must be executed on the majority (greater than 50%) of signers to take effect. For example, if you have 4 signers, the vote must be made on 3 signers.

Use [clique_getSignerMetrics](../../../Reference/API-Methods.md#clique_getsignermetrics) to view signer metrics for a specified block range.

### Adding a Signer

To propose adding a signer, call `clique_propose` specifying the address of the proposed signer and `true`. The call must be executed on the majority of signers.

!!! example "JSON-RPC clique_propose Request Example"
    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"clique_propose","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", true], "id":1}' <JSON-RPC-endpoint:port>
    ``` 

When the next block is created by the signer, a vote is added to the block for the proposed signer.  

When more than half of the existing signers propose adding the signer and their votes have been
distributed in blocks, the signer is added and can begin signing blocks. 

Use `clique_getSigners` to return a list of the signers and to confirm that your proposed signer has
been added. 
!!! example "JSON-RPC clique_getSigners Request Example"
    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"clique_getSigners","params":["latest"], "id":1}' <JSON-RPC-endpoint:port>
    ```  
 
To discard your proposal after confirming the signer was added, call `clique_discard` specifying the address of the proposed signer.
!!! example "JSON-RPC clique_discard Request Example"
    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"clique_discard","params":["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73"], "id":1}' <JSON-RPC-endpoint:port>
    ```
### Removing a Signer
The process for removing a signer is the same as adding a signer except you specify `false` as the 
second parameter of `clique_propose`. 

### Epoch Transition

At each epoch transition, all pending votes collected from received blocks are discarded. 
Existing proposals remain in effect and signers re-add their vote the next time they create a block. 

Define the number of blocks between epoch transitions in the genesis file. 

