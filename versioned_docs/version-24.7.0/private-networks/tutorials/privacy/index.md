---
title: Create a privacy enabled network using the Quickstart
sidebar_position: 1
description: Configure Hyperledger Besu privacy
tags:
  - private networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a privacy-enabled network

Configuring a network that supports private transactions requires starting a [Tessera] node for each Hyperledger Besu node. Besu command line options associate the Besu node with the Tessera node.

This tutorial assumes you have completed setting up an IBFT 2.0 network to the point where you have [created the genesis file and copied the private keys](../ibft/index.md#5-copy-the-node-private-keys-to-the-node-directories). If not, complete steps 1 to 5 of the [Create an IBFT 2.0](../ibft/index.md) tutorial before continuing.

:::important

To support privacy, ensure your genesis file includes at least the `byzantium` milestone.

This tutorial configures a private network using IBFT 2.0 for educational purposes only. IBFT 2.0 requires 4 validators to be Byzantine fault tolerant.

:::

In this tutorial we start Tessera nodes for the four Besu nodes and associate each Besu node with a Tessera node.

## Prerequisites

- [Install Tessera](https://docs.tessera.consensys.net/category/install).

## Steps

### 1. Create Tessera directories

Inside each `Node-*` directory, create a `Tessera` directory:

```bash
IBFT-Network/
├── Node-1
│   ├── data
│   ├── Tessera
├── Node-2
│   ├── data
│   ├── Tessera
├── Node-3
│   ├── data
│   ├── Tessera
└── Node-4
    ├── data
    ├── Tessera
```

### 2. Generate Tessera keys

This example creates an unlocked private key, meaning you do not need a password to decrypt the private key file.

In each `Tessera` directory, generate a public/private key pair for the Tessera node:

```bash
tessera -keygen -filename nodeKey
```

At the prompt, press **Enter** to create an unlocked key.

Tessera generates the public/private key pair and saves the keys in the `nodeKey.pub` and `nodeKey.key` files.

### 3. Create Tessera configuration files

In the `Tessera` directory for each node, create a file called `tessera.conf`, with the following configuration:

:::important

In production environments, only specify [`tls`](https://docs.tessera.consensys.net/HowTo/Configure/TLS/) as `OFF` if another transport security mechanism, such as WireGuard, is in place.

:::

<Tabs>

<TabItem value="Node-1" label="Node-1" default>

```json
{
  "mode": "orion",
  "useWhiteList": false,
  "jdbc": {
    "username": "sa",
    "password": "",
    "url": "jdbc:h2:./target/h2/tessera1",
    "autoCreateTables": true
  },
  "serverConfigs": [
    {
      "app": "ThirdParty",
      "serverAddress": "http://localhost:9101",
      "communicationType": "REST"
    },
    {
      "app": "Q2T",
      "serverAddress": "http://localhost:9102",
      "communicationType": "REST"
    },
    {
      "app": "P2P",
      "serverAddress": "http://localhost:9103",
      "sslConfig": {
        "tls": "OFF"
      },
      "communicationType": "REST"
    }
  ],
  "peer": [
    {
      "url": "http://localhost:9203"
    },
    {
      "url": "http://localhost:9303"
    },
    {
      "url": "http://localhost:9403"
    }
  ],
  "keys": {
    "passwords": [],
    "keyData": [
      {
        "privateKeyPath": "nodeKey.key",
        "publicKeyPath": "nodeKey.pub"
      }
    ]
  },
  "alwaysSendTo": []
}
```

</TabItem>

<TabItem value="Node-2" label="Node-2">

```json
{
  "mode": "orion",
  "useWhiteList": false,
  "jdbc": {
    "username": "sa",
    "password": "",
    "url": "jdbc:h2:./target/h2/tessera1",
    "autoCreateTables": true
  },
  "serverConfigs": [
    {
      "app": "ThirdParty",
      "serverAddress": "http://localhost:9201",
      "communicationType": "REST"
    },
    {
      "app": "Q2T",
      "serverAddress": "http://localhost:9202",
      "communicationType": "REST"
    },
    {
      "app": "P2P",
      "serverAddress": "http://localhost:9203",
      "sslConfig": {
        "tls": "OFF"
      },
      "communicationType": "REST"
    }
  ],
  "peer": [
    {
      "url": "http://localhost:9103"
    },
    {
      "url": "http://localhost:9303"
    },
    {
      "url": "http://localhost:9403"
    }
  ],
  "keys": {
    "passwords": [],
    "keyData": [
      {
        "privateKeyPath": "nodeKey.key",
        "publicKeyPath": "nodeKey.pub"
      }
    ]
  },
  "alwaysSendTo": []
}
```

</TabItem>

<TabItem value="Node-3" label="Node-3">

```json
{
  "mode": "orion",
  "useWhiteList": false,
  "jdbc": {
    "username": "sa",
    "password": "",
    "url": "jdbc:h2:./target/h2/tessera1",
    "autoCreateTables": true
  },
  "serverConfigs": [
    {
      "app": "ThirdParty",
      "serverAddress": "http://localhost:9301",
      "communicationType": "REST"
    },
    {
      "app": "Q2T",
      "serverAddress": "http://localhost:9302",
      "communicationType": "REST"
    },
    {
      "app": "P2P",
      "serverAddress": "http://localhost:9303",
      "sslConfig": {
        "tls": "OFF"
      },
      "communicationType": "REST"
    }
  ],
  "peer": [
    {
      "url": "http://localhost:9103"
    },
    {
      "url": "http://localhost:9203"
    },
    {
      "url": "http://localhost:9403"
    }
  ],
  "keys": {
    "passwords": [],
    "keyData": [
      {
        "privateKeyPath": "nodeKey.key",
        "publicKeyPath": "nodeKey.pub"
      }
    ]
  },
  "alwaysSendTo": []
}
```

</TabItem>

<TabItem value="Node-4" label="Node-4">

```json
{
  "mode": "orion",
  "useWhiteList": false,
  "jdbc": {
    "username": "sa",
    "password": "",
    "url": "jdbc:h2:./target/h2/tessera1",
    "autoCreateTables": true
  },
  "serverConfigs": [
    {
      "app": "ThirdParty",
      "serverAddress": "http://localhost:9401",
      "communicationType": "REST"
    },
    {
      "app": "Q2T",
      "serverAddress": "http://localhost:9402",
      "communicationType": "REST"
    },
    {
      "app": "P2P",
      "serverAddress": "http://localhost:9403",
      "sslConfig": {
        "tls": "OFF"
      },
      "communicationType": "REST"
    }
  ],
  "peer": [
    {
      "url": "http://localhost:9103"
    },
    {
      "url": "http://localhost:9203"
    },
    {
      "url": "http://localhost:9303"
    }
  ],
  "keys": {
    "passwords": [],
    "keyData": [
      {
        "privateKeyPath": "nodeKey.key",
        "publicKeyPath": "nodeKey.pub"
      }
    ]
  },
  "alwaysSendTo": []
}
```

</TabItem>

</Tabs>

In the configuration file, specify:

- Different port numbers for the various servers in the [`serverConfigs`](https://docs.tessera.consensys.net/HowTo/Configure/TesseraAPI/) section.
- The address of the Tessera nodes to discover, in the [`peer`](https://docs.tessera.consensys.net/HowTo/Configure/Peer-discovery/#specify-peers) section.
- The location of the public/private key pair.

### 4. Start the Tessera nodes

In each `Tessera` directory, start Tessera specifying the [configuration file](#3-create-tessera-configuration-files) created in the previous step:

```bash
tessera -configfile tessera.conf
```

:::info

After starting the first Tessera node and before starting the other nodes, the log message `failed to connect to node` displays. This is normal behavior. Until you start the other peer nodes, your node is not connected and displays this warning. You can continue to start the other nodes.

:::

### 5. Start Besu Node-1

In the `Node-1` directory, start Besu Node-1:

<Tabs>

<TabItem value="MacOS" label="MacOS" default>

```bash
besu --data-path=data --genesis-file=../genesis.json --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --privacy-enabled --privacy-url=http://127.0.0.1:9102 --privacy-public-key-file=Tessera/nodeKey.pub --min-gas-price=0
```

</TabItem>

<TabItem value="Windows" label="Windows">

```bash
besu --data-path=data --genesis-file=..\genesis.json --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --privacy-enabled --privacy-url=http://127.0.0.1:9102 --privacy-public-key-file=Tessera\nodeKey.pub --min-gas-price=0
```

</TabItem>

</Tabs>

The command line specifies privacy options:

- [`--privacy-enabled`](../../reference/cli/options.md#privacy-enabled) enables privacy
- [`--privacy-url`](../../reference/cli/options.md#privacy-url) specifies the Q2T server address of the Tessera node (`Q2T` in `tessera.conf`)
- [`--privacy-public-key-file`](../../reference/cli/options.md#privacy-public-key-file) specifies the file containing Tessera node public key (created in [3. Generate Tessera Keys](#2-generate-tessera-keys))
- [`--rpc-http-api`](../../../public-networks/reference/cli/options.md#rpc-http-api) includes `EEA` and `PRIV` in the list of JSON-RPC APIs to enable privacy JSON-RPC API methods.
- [`--min-gas-price`](../../../public-networks/reference/cli/options.md#min-gas-price) is 0 for a [free gas network](../../how-to/configure/free-gas.md).

:::note

Use the [`--privacy-marker-transaction-signing-key-file`](../../reference/cli/options.md#privacy-marker-transaction-signing-key-file) command line option to sign [privacy marker transactions](../../concepts/privacy/private-transactions/processing.md) using a supplied key. The command line option is mandatory in privacy-enabled paid gas networks.

:::

When the node starts, the [enode URL](../../../public-networks/concepts/node-keys.md#enode-url) displays. Copy the enode URL to specify Node-1 as the bootnode in the following steps.

![Node 1 Enode URL](../../../assets/images/EnodeStartup.png)

### 6. Start Besu Node-2

In the `Node-2` directory, start Besu Node-2 specifying the Node-1 enode URL copied when starting Node-1 as the bootnode:

<Tabs>

<TabItem value="MacOS" label="MacOS" default>

```bash
besu --data-path=data --genesis-file=../genesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30304 --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8546 --privacy-enabled --privacy-url=http://127.0.0.1:9202 --privacy-public-key-file=Tessera/nodeKey.pub --min-gas-price=0
```

</TabItem>

<TabItem value="Windows" label="Windows">

```bash
besu --data-path=data --genesis-file=..\genesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30304 --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8546 --privacy-enabled --privacy-url=http://127.0.0.1:9202 --privacy-public-key-file=Tessera\nodeKey.pub --min-gas-price=0
```

</TabItem>

</Tabs>

The command line specifies the same options as for Node-1 with different ports and Tessera node URL. The [`--bootnodes`](../../../public-networks/reference/cli/options.md#bootnodes) option specifies the enode URL of Node-1.

:::note

When running Besu from the [Docker image](../../get-started/install/run-docker-image.md), [expose ports](../../get-started/install/run-docker-image.md#expose-ports).

:::

### 7. Start Besu Node-3

In the `Node-3` directory, start Besu Node-3 specifying the Node-1 enode URL copied when starting Node-1 as the bootnode:

<Tabs>

<TabItem value="MacOS" label="MacOS" default>

```bash
besu --data-path=data --genesis-file=../genesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30305 --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8547 --privacy-enabled --privacy-url=http://127.0.0.1:9302 --privacy-public-key-file=Tessera/nodeKey.pub --min-gas-price=0
```

</TabItem>

<TabItem value="Windows" label="Windows">

```bash
besu --data-path=data --genesis-file=..\genesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30305 --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8547 --privacy-enabled --privacy-url=http://127.0.0.1:9302 --privacy-public-key-file=Tessera\nodeKey.pub --min-gas-price=0
```

</TabItem>

</Tabs>

The command line specifies the same options as for Node-1 with different ports and Tessera node URL. The [`--bootnodes`](../../../public-networks/reference/cli/options.md#bootnodes) option specifies the enode URL of Node-1.

### 8. Start Besu Node-4

In the `Node-4` directory, start Besu Node-4 specifying the Node-1 enode URL copied when starting Node-1 as the bootnode:

<Tabs>

<TabItem value="MacOS" label="MacOS" default>

```bash
besu --data-path=data --genesis-file=../genesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30306 --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8548 --privacy-enabled --privacy-url=http://127.0.0.1:9402 --privacy-public-key-file=Tessera/nodeKey.pub --min-gas-price=0
```

</TabItem>

<TabItem value="Windows" label="Windows">

```bash
besu --data-path=data --genesis-file=..\genesis.json --bootnodes=<Node-1 Enode URL> --p2p-port=30306 --rpc-http-enabled --rpc-http-api=ETH,NET,IBFT,EEA,PRIV --host-allowlist="*" --rpc-http-cors-origins="all" --rpc-http-port=8548 --privacy-enabled --privacy-url=http://127.0.0.1:9402 --privacy-public-key-file=Tessera\nodeKey.pub --min-gas-price=0
```

</TabItem>

</Tabs>

The command line specifies the same options as for Node-1 with different ports and Tessera node URL. The [`--bootnodes`](../../../public-networks/reference/cli/options.md#bootnodes) option specifies the enode URL of Node-1.

<!-- links -->

[Tessera]: https://docs.tessera.consensys.net/
