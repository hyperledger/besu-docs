description: Hyperledger Besu command line interface subcommands
<!--- END of page meta data -->

# Subcommands

## blocks

Provides blocks related actions.

### import

```bash tab="Syntax"
besu blocks import --from=<block-file>
```

```bash tab="Example"
besu blocks import --from=/home/me/me_project/mainnet.blocks
```

Imports blocks from the specified file into the blockchain database.

### export

```bash tab="Syntax"
besu blocks export [--start-block=<LONG>] [--end-block=<LONG>] --to=<block-file>
```

```bash tab="Example"
besu --network=rinkeby --data-path=/home/data/ blocks export --start-block=100 --end-block=300 --to=/home/exportblock.bin
```

Exports a block, or list of blocks from storage to a file in RLP format. 

If `--start-block` is omitted, then the start block will default to 0 (beginning of the chain), and if `--end-block` is omitted, the end block will default to the end of the chain.

If you are not running the command against the default network (Mainnet), then specify the `--network` or `--genesis-file` parameter.

## public-key

This command provides node public key related actions.

### export

```bash tab="Syntax"
besu public-key export [--to=<key-file>]
```

```bash tab="Example (to standard output)"
besu --data-path=<node data path> public-key export
```

```bash tab="Example (to file)"
besu --data-path=<node data path> public-key export --to=/home/me/me_project/not_precious_pub_key
```

Outputs the node public key to standard output or writes it to the specified file if 
`--to=<key-file>` is specified. 

### export-address

```bash tab="Syntax"
besu public-key export-address [--to=<address-file>]
```

```bash tab="Example (to standard output)"
besu --data-path=<node data path> public-key export-address
```

```bash tab="Example (to file)"
besu --data-path=<node data path> public-key export-address --to=/home/me/me_project/me_node_address
```

Outputs the node public key address to standard output or writes it to the specified file if  
`--to=<key-file>` is specified. 

## password

Provides password related actions.

### hash

This command generates the hash of a given password. Include the hash in the [credentials file](../../HowTo/Interact/APIs/Authentication.md#credentials-file)
 for JSON-RPC API [authentication](../../HowTo/Interact/APIs/Authentication.md). 

```bash tab="Syntax"
besu password hash --password=<my-password>
```

```bash tab="Example"
besu password hash --password=myPassword123
```

## operator

Provides operator actions.

### generate-blockchain-config

This command generates [IBFT 2.0 configuration files](../../Tutorials/Private-Network/Create-IBFT-Network.md). 

```bash tab="Syntax"
besu operator generate-blockchain-config --config-file=<FILE> --to=<DIRECTORY> [--genesis-file-name=<FILE>] [--private-key-file-name=<FILE>] [--public-key-file-name=<FILE>]
```

```bash tab="Example"
besu operator generate-blockchain-config --config-file=config.json --to=myNetworkFiles
```

The configuration file has 2 subnested JSON nodes. The first is the `genesis` property defining 
the [IBFT 2.0 genesis file](../../HowTo/Configure/Consensus-Protocols/IBFT.md#genesis-file) except for the `extraData` string. The 
second is the `blockchain` property defining the number of key pairs to generate.  

## rlp

Provides RLP related actions.

### encode

This command encodes a typed JSON value from a file or from the standard input into an RLP hexadecimal string.

```bash tab="Syntax"
besu rlp encode [--from=<FILE>] [--to=<FILE>] [--type=<type>]
```

```bash tab="File Example"
besu rlp encode --from=ibft_extra_data.json --to=extra_data_for_ibft_genesis.txt --type=IBFT_EXTRA_DATA
```

```bash tab="Standart Input/Output Example"
cat extra_data.json | besu rlp encode > rlp.txt
```

The `IBFT_EXTRA_DATA` type is the only type supported for RLP encoding.
This data is included in the [IBFT 2.0 genesis file](../../HowTo/Configure/Consensus-Protocols/IBFT.md#genesis-file).

???+ summary "IBFT 2.0 Extra Data"
    To generate the RLP encoded `extraData` string, specify a JSON input that is array of validator addresses 
    in ascending order.

    ??? tip "JSON Schema for IBFT_EXTRA_DATA"
        The following JSON Schema can be used to validate that your JSON data is well formed. You can use an online validation tool
        such as https://www.jsonschemavalidator.net/ to validate your JSON content.
        
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
        ```json tab="JSON Input"
        [
          "be068f726a13c8d46c44be6ce9d275600e1735a4",
          "5ff6f4b66a46a2b2310a6f3a93aaddc0d9a1c193"
        ]
        ```
        
        ``` tab="RLP Output"
        0xf853a00000000000000000000000000000000000000000000000000000000000000000ea94be068f726a13c8d46c44be6ce9d275600e1735a4945ff6f4b66a46a2b2310a6f3a93aaddc0d9a1c193808400000000c0
        ```