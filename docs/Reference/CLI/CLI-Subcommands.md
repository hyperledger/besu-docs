---
description: Hyperledger Besu command line interface subcommands
---

# Subcommands

## `blocks`

Provides blocks related actions.

### `import`

=== "Syntax"

    ```bash
    besu blocks import --from=<block-file>
    ```

=== "Example"

    ```bash
    besu blocks import --from=/home/me/me_project/mainnet.blocks
    ```

Imports blocks from the specified file into the blockchain database.

### `export`

=== "Syntax"

    ```bash
    besu blocks export [--start-block=<LONG>] [--end-block=<LONG>] --to=<block-file>
    ```

=== "Example"

    ```bash
    besu --network=rinkeby --data-path=/home/data/ blocks export --start-block=100 --end-block=300 --to=/home/exportblock.bin
    ```

Exports a block, or list of blocks from storage to a file in RLP format.

If you omit `--start-block`, the start block defaults to 0 (the beginning of the chain), and if you
omit `--end-block`, the end block defaults to the end of the chain.

If you are not running the command against the default network (MainNet), specify the `--network`
or `--genesis-file` parameter.

## `public-key`

This command provides node public key related actions.

!!!caution

    To get the public key or address of a node, ensure you use the
    [`--data-path`](CLI-Syntax.md#data-path) or
    [`--node-private-key-file`](CLI-Syntax.md#node-private-key-file) option with the `public-key`
    command. Otherwise, a new [node key](../../Concepts/Node-Keys.md) is silently generated when
    starting Besu.

### `export`

=== "Syntax"

    ```bash
    besu public-key export [--to=<key-file>]
    ```

=== "Example (to standard output)"

    ```bash
    besu --data-path=<node data path> public-key export
    ```

=== "Example (to file)"

    ```bash
    besu --data-path=<node data path> public-key export --to=/home/me/me_project/not_precious_pub_key
    ```

Outputs the node public key to standard output or to the file specified by `--to=<key-file>`.

### `export-address`

=== "Syntax"

    ```bash
    besu public-key export-address [--to=<address-file>]
    ```

=== "Example (to standard output)"

    ```bash
    besu --data-path=<node data path> public-key export-address
    ```

=== "Example (to file)"

    ```bash
    besu --data-path=<node data path> public-key export-address --to=/home/me/me_project/me_node_address
    ```

Outputs the node address to standard output or to the file specified by `--to=<address-file>`.

## `password`

Provides password related actions.

### `hash`

This command generates the hash of a given password. Include the hash in the
[credentials file](../../HowTo/Interact/APIs/Authentication.md#credentials-file) for JSON-RPC API
[authentication](../../HowTo/Interact/APIs/Authentication.md).

=== "Syntax"

    ```bash
    besu password hash --password=<my-password>
    ```

=== "Example"

    ```bash
    besu password hash --password=myPassword123
    ```

## `operator`

Provides operator actions.

### `generate-blockchain-config`

This command generates
[IBFT 2.0 configuration files](../../Tutorials/Private-Network/Create-IBFT-Network.md).

=== "Syntax"

    ```bash
    besu operator generate-blockchain-config --config-file=<FILE> --to=<DIRECTORY> [--genesis-file-name=<FILE>] [--private-key-file-name=<FILE>] [--public-key-file-name=<FILE>]
    ```

=== "Example"

    ```bash
    besu operator generate-blockchain-config --config-file=config.json --to=myNetworkFiles
    ```

The configuration file has 2 nested JSON nodes. The first is the `genesis` property defining the
[IBFT 2.0 genesis file](../../HowTo/Configure/Consensus-Protocols/IBFT.md#genesis-file) except for
the `extraData` string. The second is the `blockchain` property defining the number of key pairs to
generate.

### `generate-log-bloom-cache`

!!! tip

    Manually executing `generate-log-bloom-cache` is not required unless you set the
    [`--auto-log-bloom-caching-enabled`](CLI-Syntax.md#auto-log-bloom-caching-enabled) command line
    option to false.

Generates cached log bloom indexes for blocks. APIs use the cached indexes for improved log query
performance.

!!! note

    Each index file contains 100000 blocks. The last fragment of blocks less that 100000 are not
    indexed.

To generate cached log bloom indexes while the node is running, use the
[`admin_generateLogBloomCache`](../API-Methods.md#admin_generatelogbloomcache) API.

=== "Syntax"

    ```bash
    besu operator generate-log-bloom-cache [--start-block=<BLOCK_NUMBER>] [--end-block=<BLOCK_NUMBER>]
    ```

=== "Example"

    ```bash
    besu --network=goerli --data-path=/project/goerli operator generate-log-bloom-cache --start-block=0 --end-block=100000
    ```

## `rlp`

Provides RLP related actions.

### `encode`

This command encodes a typed JSON value from a file or from the standard input into an RLP
hexadecimal string.

=== "Syntax"

    ```bash
    besu rlp encode [--from=<FILE>] [--to=<FILE>] [--type=<type>]
    ```

=== "File Example"

    ```bash
    besu rlp encode --from=ibft_extra_data.json --to=extra_data_for_ibft_genesis.txt --type=IBFT_EXTRA_DATA
    ```

=== "Standard Input/Output Example"

    ```bash
    cat extra_data.json | besu rlp encode > rlp.txt
    ```

The `IBFT_EXTRA_DATA` type is the only type supported for RLP encoding. The
[IBFT 2.0 genesis file](../../HowTo/Configure/Consensus-Protocols/IBFT.md#genesis-file) includes
the `IBFT_EXTRA_DATA` type.

???+ summary "IBFT 2.0 Extra Data"

    To generate the RLP encoded `extraData` string, specify a JSON input that is an array of
    validator addresses in ascending order.

    ??? tip "JSON Schema for IBFT_EXTRA_DATA"
        Use the following JSON Schema to validate that your JSON data is well formed. To validate
        your JSON content, use an online validation tool, such as
        https://www.jsonschemavalidator.net/.

        ```json
        {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "$id": "http://org.hyperledger.besu/cli_rlp_ibft_extra_data.json",
          "type": "array",
          "definitions": {},
          "title": "IBFT extra data",
          "description":"JSON format used as input to generate an IBFT extra data RLP string",
          "items": {
            "$id": "#/address",
            "type": "string",
            "title": "Validator address",
            "description":"The validator node address",
            "default": "",
            "examples": [
              "be068f726a13c8d46c44be6ce9d275600e1735a4",
              "5ff6f4b66a46a2b2310a6f3a93aaddc0d9a1c193"
            ],
            "pattern":"^([0-9a-f]{40})$"
          }
        }
        ```

    !!!example "Example IBFT_EXTRA_DATA encoding"

        === "JSON Input"

            ```json
            [
              "be068f726a13c8d46c44be6ce9d275600e1735a4",
              "5ff6f4b66a46a2b2310a6f3a93aaddc0d9a1c193"
            ]
            ```

        === "RLP Output"

            ```
            0xf853a00000000000000000000000000000000000000000000000000000000000000000ea94be068f726a13c8d46c44be6ce9d275600e1735a4945ff6f4b66a46a2b2310a6f3a93aaddc0d9a1c193808400000000c0
            ```

## `retesteth`

Runs a Retesteth-compatible server. [Retesteth](https://github.com/ethereum/retesteth/wiki) is a
developer tool that can generate and run consensus tests against any Ethereum client running such a
server.

The command accepts the following command line options:

* [\--data-path](./CLI-Syntax.md#data-path)
* [\--host-allowlist](./CLI-Syntax.md#host-allowlist)
* [\--rpc-http-host](./CLI-Syntax.md#rpc-http-host)
* [\--rpc-http-port](./CLI-Syntax.md#rpc-http-port)
* [\--logging](./CLI-Syntax.md#logging)

=== "Syntax"

    ```bash
    besu retesteth [--data-path=<PATH>] [--rpc-http-host=<HOST>] [--rpc-http-port=<PORT>] [-l=<LOG VERBOSITY LEVEL>] [--host-allowlist=<hostname>[,<hostname>…]… or * or all]
    ```

=== "Example"

    ```bash
    besu retesteth --data-path=/home/me/me_node --rpc-http-port=8590 --host-allowlist=*
    ```
