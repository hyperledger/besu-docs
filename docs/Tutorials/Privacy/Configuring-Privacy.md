---
description: Configure Hyperledger Besu privacy
---

# Configure a network for private transactions

Configuring a network that supports private transactions requires starting an Orion node for each
Hyperledger Besu node. Besu command line options associate the Besu node with the Orion node.

This tutorial assumes you have completed setting up an IBFT 2.0 network to the point where you have
[created the genesis file and copied the private keys](../Private-Network/Create-IBFT-Network.md#5-copy-the-node-private-keys-to-the-node-directories).
If not, complete steps 1 to 5 of the
[Create an IBFT 2.0](../Private-Network/Create-IBFT-Network.md) tutorial before continuing.

!!! important

    To support privacy, ensure your genesis file includes at least the `byzantium` milestone.

    This tutorial configures a private network using IBFT 2.0 for educational purposes only. IBFT
    2.0 requires 4 validators to be Byzantine fault tolerant.

In this tutorial we start Orion nodes for the three Besu nodes and associate each Besu node with
an Orion node.

## Prerequisites

* [Orion](https://docs.orion.consensys.net/en/latest/HowTo/Install-Binaries/).

## 1. Create Orion directories

Inside each `Node-*` directory, create an `Orion` directory:

```bash
IBFT-Network/
├── Node-1
│   ├── data
│   ├── Orion
├── Node-2
│   ├── data
│   ├── Orion
└── Node-3
    ├── data
    ├── Orion
```

## 2. Create password files

In each `Orion` directory, create a file called `passwordFile` containing a password to encrypt
each Orion key pair.

## 3. Generate Orion keys

In each `Orion` directory, generate a public/private key pair for the Orion node:

``` bash
orion -g nodeKey
```

At the prompt, enter the [password](#2-create-password-files) saved in `passwordFile` to encrypt
the key pair.

Orion generates the public/private key pair and saves the keys in the `nodeKey.pub` and
`nodeKey.key` files.

## 4. Create Orion configuration files

In the `Node-1/Orion` directory, create a file called `orion.conf` and add the following
properties:

```bash
nodeurl = "http://127.0.0.1:8080/"
nodeport = 8080
clienturl = "http://127.0.0.1:8888/"
clientport = 8888
publickeys = ["nodeKey.pub"]
privatekeys = ["nodeKey.key"]
passwords = "passwordFile"
tls = "off"
```

!!! important

    In production environments, only specify
    [`tls`](https://docs.orion.consensys.net/en/latest/Tutorials/TLS/) is `off` if another
    transport security mechanism, such as WireGuard, is in place.

In the `Node-2/Orion` and `Node-3/Orion` directories, create `orion.conf` files specifying:

* Different ports
* The Node-1 Orion node as the bootnode (specified by
  [`othernodes`](https://docs.orion.consensys.net/en/latest/Reference/Configuration-File/)).

=== "Node-2"

    ```bash
    nodeurl = "http://127.0.0.1:8081/"
    nodeport = 8081
    clienturl = "http://127.0.0.1:8889/"
    clientport = 8889
    publickeys = ["nodeKey.pub"]
    privatekeys = ["nodeKey.key"]
    passwords = "passwordFile"
    othernodes = ["http://127.0.0.1:8080/"]
    tls = "off"
    ```

=== "Node-3"

    ```bash
    nodeurl = "http://127.0.0.1:8082/"
    nodeport = 8082
    clienturl = "http://127.0.0.1:8890/"
    clientport = 8890
    publickeys = ["nodeKey.pub"]
    privatekeys = ["nodeKey.key"]
    passwords = "passwordFile"
    othernodes = ["http://127.0.0.1:8080/"]
    tls = "off"
    ```

## 5. Start the Orion nodes

In each `Orion` directory, start Orion specifying the
[configuration file](#3-create-a-configuration-file) created in the previous step:

```bash
orion orion.conf
```

## 6. Start Besu Node-1

In the `Node-1` directory, start Besu Node-1:

=== "MacOS"

    ```bash
    besu --data-path=data --genesis-file=../genesis.json --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --privacy-enabled --privacy-url=http://127.0.0.1:8888 --privacy-public-key-file=Orion/nodeKey.pub --min-gas-price=0
    ```

=== "Windows"

    ```bash
    besu --data-path=data --genesis-file=..\genesis.json --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --privacy-enabled --privacy-url=http://127.0.0.1:8888 --privacy-public-key-file=Orion\nodeKey.pub --min-gas-price=0
    ```

The command line specifies privacy options:

* [`--privacy-enabled`](../../Reference/CLI/CLI-Syntax.md#privacy-enabled) enables privacy
* [`--privacy-url`](../../Reference/CLI/CLI-Syntax.md#privacy-url) specifies the Orion node URL
  (`clienturl` in `orion.conf`)
* [`--privacy-public-key-file`](../../Reference/CLI/CLI-Syntax.md#privacy-public-key-file)
  specifies the file containing Orion node public key (created in
  [3. Generate Orion Keys](#3-generate-orion-keys))
* [`--rpc-http-api`](../../Reference/CLI/CLI-Syntax.md#rpc-http-api) includes `EEA` and `PRIV` in
  the list of JSON-RPC APIs to enable privacy JSON-RPC API methods.
* [`--min-gas-price`](../../Reference/CLI/CLI-Syntax.md#min-gas-price) is 0 for a
  [free gas network](../../HowTo/Configure/FreeGas.md).

!!! note

    Use the
    [`--privacy-marker-transaction-signing-key-file`](../../Reference/CLI/CLI-Syntax.md#privacy-marker-transaction-signing-key-file)
    command line option to sign
    [privacy marker transactions](../../Concepts/Privacy/Private-Transaction-Processing.md) using a
    supplied key. The command line option is mandatory in privacy-enabled paid gas networks.

When the node starts, the [enode URL](../../Concepts/Node-Keys.md#enode-url) displays. Copy the
enode URL to specify Node-1 as the bootnode in the following steps.

![Node 1 Enode URL](../../images/EnodeStartup.png)

## 7. Start Besu Node-2

In the `Node-2` directory, start Besu Node-2 specifying the Node-1 enode URL copied when starting
Node-1 as the bootnode:

=== "MacOS"

    ```bash
    besu --data-path=data --genesis-file=../genesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30304 --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8546 --privacy-enabled --privacy-url=http://127.0.0.1:8889 --privacy-public-key-file=Orion/nodeKey.pub --min-gas-price=0
    ```

=== "Windows"

    ```bash
    besu --data-path=data --genesis-file=..\genesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30304 --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8546 --privacy-enabled --privacy-url=http://127.0.0.1:8889 --privacy-public-key-file=Orion\nodeKey.pub --min-gas-price=0
    ```

The command line specifies the same options as for Node-1 with different ports and Orion node URL.
The [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) option specifies the enode URL of Node-1.

!!!note

    When running Besu from the [Docker image](../../HowTo/Get-Started/Installation-Options/Run-Docker-Image.md),
    [expose ports](../../HowTo/Get-Started/Installation-Options/Run-Docker-Image.md#exposing-ports).

## 8. Start Besu Node-3

In the `Node-3` directory, start Besu Node-3 specifying the Node-1 enode URL copied when starting
Node-1 as the bootnode:

=== "MacOS"

    ```bash
    besu --data-path=data --genesis-file=../genesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30305 --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8547 --privacy-enabled --privacy-url=http://127.0.0.1:8890 --privacy-public-key-file=Orion/nodeKey.pub --min-gas-price=0
    ```

=== "Windows"

    ```bash
    besu --data-path=data --genesis-file=..\genesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30305 --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8547 --privacy-enabled --privacy-url=http://127.0.0.1:8890 --privacy-public-key-file=Orion\nodeKey.pub --min-gas-price=0
    ```

The command line specifies the same options as for Node-1 with different ports and Orion node URL.
The [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) option specifies the enode URL of Node-1.
