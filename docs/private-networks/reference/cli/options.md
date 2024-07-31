---
title: Private network options
sidebar_position: 1
description: Hyperledger Besu private networks CLI reference
tags:
  - private networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Private network command line options

This reference describes the syntax of the Hyperledger Besu private network command line interface (CLI) options.

:::caution Important

This reference contains options that apply to only private networks. For options that apply to both private and public networks, see the [public network options reference](../../../public-networks/reference/cli/options.md).

:::

## Specify options

You can specify Besu options:

- On the command line.

  ```bash
  besu [OPTIONS] [SUBCOMMAND]
  ```

- As an environment variable. For each command line option, the equivalent environment variable is:

  - Uppercase.
  - `_` replaces `-`.
  - Has a `BESU_` prefix.

  For example, set `--miner-coinbase` using the `BESU_MINER_COINBASE` environment variable.

- In a [configuration file](../../../public-networks/how-to/configure-besu/index.md).

If you specify an option in more than one place, the order of priority is command line, environment variable, configuration file.

If using Bash or Z shell, you can view option suggestions by entering `--` and pressing the Tab key twice.

```bash
besu --Tab+Tab
```

:::caution

Characters such as smart quotes and long (em) hyphens don't work in Besu command line options. Ensure quotes aren't automatically converted to smart quotes, or double hyphens combined into em hyphens.

:::

## Options

### `permissions-accounts-config-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--permissions-accounts-config-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--permissions-accounts-config-file=/home/me/me_configFiles/myPermissionsFile
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PERMISSIONS_ACCOUNTS_CONFIG_FILE=/home/me/me_configFiles/myPermissionsFile
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
permissions-accounts-config-file="/home/me/me_configFiles/myPermissionsFile"
```

</TabItem>

</Tabs>

The [accounts permissions configuration file]. The default is the `permissions_config.toml` file in the [data directory](../../../public-networks/reference/cli/options.md#data-path).

:::tip

`--permissions-accounts-config-file` and [`--permissions-nodes-config-file`](#permissions-nodes-config-file) can use the same file.

:::

### `permissions-accounts-config-file-enabled`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--permissions-accounts-config-file-enabled[=<true|false>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--permissions-accounts-config-file-enabled=true
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PERMISSIONS_ACCOUNTS_CONFIG_FILE_ENABLED=true
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
permissions-accounts-config-file-enabled=true
```

</TabItem>

</Tabs>

Enables or disables file-based account level permissions. The default is `false`.

### `permissions-accounts-contract-address`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--permissions-accounts-contract-address=<ContractAddress>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--permissions-accounts-contract-address=xyz
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PERMISSIONS_ACCOUNTS_CONTRACT_ADDRESS=xyz
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
permissions-accounts-contract-address="xyz"
```

</TabItem>

</Tabs>

The contract address for [onchain account permissioning](../../concepts/permissioning/onchain.md).

### `permissions-accounts-contract-enabled`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--permissions-accounts-contract-enabled[=<true|false>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--permissions-accounts-contract-enabled=true
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PERMISSIONS_ACCOUNTS_CONTRACT_ENABLED=true
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
permissions-accounts-contract-enabled=true
```

</TabItem>

</Tabs>

Enables or disables contract-based [onchain account permissioning](../../concepts/permissioning/onchain.md). The default is `false`.

### `permissions-nodes-config-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--permissions-nodes-config-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--permissions-nodes-config-file=/home/me/me_configFiles/myPermissionsFile
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PERMISSIONS_NODES_CONFIG_FILE=/home/me/me_configFiles/myPermissionsFile
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
permissions-nodes-config-file="/home/me/me_configFiles/myPermissionsFile"
```

</TabItem>

</Tabs>

The [nodes permissions configuration file]. The default is the `permissions_config.toml` file in the [data directory](../../../public-networks/reference/cli/options.md#data-path).

:::tip

`--permissions-nodes-config-file` and [`--permissions-accounts-config-file`](#permissions-accounts-config-file) can use the same file.

:::

### `permissions-nodes-config-file-enabled`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--permissions-nodes-config-file-enabled[=<true|false>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--permissions-nodes-config-file-enabled=true
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PERMISSIONS_NODES_CONFIG_FILE_ENABLED=true
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
permissions-nodes-config-file-enabled=true
```

</TabItem>

</Tabs>

Enables or disables file-based node level permissions. The default is `false`.

### `permissions-nodes-contract-address`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--permissions-nodes-contract-address=<ContractAddress>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--permissions-nodes-contract-address=xyz
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PERMISSIONS_NODES_CONTRACT_ADDRESS=xyz
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
permissions-nodes-contract-address="xyz"
```

</TabItem>

</Tabs>

The contract address for [onchain node permissioning](../../concepts/permissioning/onchain.md).

### `permissions-nodes-contract-enabled`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--permissions-nodes-contract-enabled[=<true|false>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--permissions-nodes-contract-enabled=true
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PERMISSIONS_NODES_CONTRACT_ENABLED=true
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
permissions-nodes-contract-enabled=true
```

</TabItem>

</Tabs>

Enables or disables contract-based [onchain node permissioning](../../concepts/permissioning/onchain.md). The default is `false`.

### `permissions-nodes-contract-version`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--permissions-nodes-contract-version=<ContractVersion>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--permissions-nodes-contract-version=2
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PERMISSIONS_NODES_CONTRACT_VERSION=2
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
permissions-nodes-contract-version=2
```

</TabItem>

</Tabs>

Version of the EEA [node permissioning interface](../../how-to/use-permissioning/onchain.md#specify-the-permissioning-contract-interface-version). The default is 1.

### `poa-block-txs-selection-max-time`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--poa-block-txs-selection-max-time=<INTEGER>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--poa-block-txs-selection-max-time=80
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_POA_BLOCK_TXS_SELECTION_MAX_TIME=80
```

</TabItem>

<TabItem value="Example configuration file" label="Example configuration file"> 

```bash
poa-block-txs-selection-max-time=80
```

</TabItem>

</Tabs>

The maximum time that can be spent selecting transactions to be included in a block,
as a percentage of the fixed block time of the network.
The default is `75`, or 75%.

:::note
This option only applies to proof-of-authority networks.
For proof-of-stake and proof-of-work networks, see
[`--block-txs-selection-max-time`](../../../public-networks/reference/cli/options.md#block-txs-selection-max-time).
:::

### `privacy-enabled`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--privacy-enabled[=<true|false>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--privacy-enabled=false
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PRIVACY_ENABLED=false
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
privacy-enabled=false
```

</TabItem>

</Tabs>

Enables or disables [private transactions](../../concepts/privacy/index.md). The default is `false`.

:::important

Using private transactions with [pruning](../../../public-networks/concepts/data-storage-formats.md) or [fast sync](../../../public-networks/reference/cli/options.md#sync-mode) is not supported.

:::

### `privacy-marker-transaction-signing-key-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--privacy-marker-transaction-signing-key-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--privacy-marker-transaction-signing-key-file=/home/me/me_node/myPrivateKey
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PRIVACY_MARKER_TRANSACTION_SIGNING_KEY_FILE=/home/me/me_node/myPrivateKey
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
privacy-marker-transaction-signing-key-file="/home/me/me_node/myPrivateKey"
```

</TabItem>

</Tabs>

`<FILE>` is the name of the private key file used to [sign privacy marker transactions](../../how-to/use-privacy/sign-pmts.md).

:::note

This can be the same file used by [`--node-private-key-file`](../../../public-networks/reference/cli/options.md#node-private-key-file), or a different key file to identify who signed the privacy marker transaction.

:::

You must specify this option if you're using:

- a privacy network where you pay gas. Also, the associated account must contain adequate funds.
- [account permissioning] and privacy. You must include the corresponding public key in the accounts allowlist.

If you do not specify this option (for example, in a free gas network), Besu signs each transaction with a different randomly generated key.

### `privacy-multi-tenancy-enabled`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--privacy-multi-tenancy-enabled[=<true|false>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--privacy-multi-tenancy-enabled=false
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PRIVACY_MULTI_TENANCY_ENABLED=false
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
privacy-multi-tenancy-enabled=false
```

</TabItem>

</Tabs>

Enables or disables [multi-tenancy](../../concepts/privacy/multi-tenancy.md) for private transactions. The default is `false`.

### `privacy-flexible-groups-enabled`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--privacy-flexible-groups-enabled[=<true|false>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--privacy-flexible-groups-enabled=true
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PRIVACY_FLEXIBLE_GROUPS_ENABLED=true
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
privacy-flexible-groups-enabled=true
```

</TabItem>

</Tabs>

Enables or disables [flexible privacy groups](../../concepts/privacy/flexible-privacy.md). The default is `false`.

Deprecated syntax for this option is `--privacy-onchain-groups-enabled`.

### `privacy-public-key-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--privacy-public-key-file=<privacyPublicKeyFile>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--privacy-public-key-file=Tessera/nodeKey.pub
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PRIVACY_PUBLIC_KEY_FILE=Tessera/nodeKey.pub
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
privacy-public-key-file="Tessera/nodeKey.pub"
```

</TabItem>

</Tabs>

The [public key of the Tessera node](https://docs.tessera.consensys.net/).

:::important

You cannot specify `privacy-public-key-file` when [`--privacy-multi-tenancy-enabled`](#privacy-multi-tenancy-enabled) is `true`

:::

### `privacy-tls-enabled`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--privacy-tls-enabled[=<true|false>]
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--privacy-tls-enabled=false
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PRIVACY_TLS_ENABLED=false
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
privacy-tls-enabled=false
```

</TabItem>

</Tabs>

Enables or disables [TLS on communication with the private transaction manager]. The default is false.

### `privacy-tls-keystore-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--privacy-tls-keystore-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--privacy--keystore-file=/home/me/me_node/key
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PRIVACY_TLS_KEYSTORE_FILE=/home/me/me_node/key
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
privacy-tls-keystore-file="/home/me/me_node/key"
```

</TabItem>

</Tabs>

The keystore file (in PKCS #12 format) containing the private key and the certificate presented during authentication.

You must specify `privacy-tls-keystore-file` if [`--privacy-tls-enabled`](#privacy-tls-enabled) is `true`.

### `privacy-tls-keystore-password-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--privacy-tls-keystore-password-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--privacy-tls-keystore-password-file=/home/me/me_node/password
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PRIVACY_TLS_KEYSTORE_PASSWORD_FILE=/home/me/me_node/password
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
privacy-tls-keystore-password-file="/home/me/me_node/password"
```

</TabItem>

</Tabs>

The path to the file containing the password to decrypt the keystore.

### `privacy-tls-known-enclave-file`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--privacy-tls-known-enclave-file=<FILE>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--privacy-tls-known-enclave-file=/home/me/me_node/knownEnclave
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PRIVACY_TLS_KNOWN_ENCLAVE_FILE=/home/me/me_node/knownEnclave
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
privacy-tls-known-enclave-file="/home/me/me_node/knownEnclave"
```

</TabItem>

</Tabs>

The path to the file containing the hostnames, ports, and SHA256 certificate fingerprints of the [authorized privacy enclave](../../how-to/configure/tls/client-and-server.md#create-the-known-servers-file).

### `privacy-url`

<Tabs>

<TabItem value="Syntax" label="Syntax" default>

```bash
--privacy-url=<privacyUrl>
```

</TabItem>

<TabItem value="Example" label="Example">

```bash
--privacy-url=http://127.0.0.1:8888
```

</TabItem>

<TabItem value="Environment variable" label="Environment variable">

```bash
BESU_PRIVACY_URL=http://127.0.0.1:8888
```

</TabItem>

<TabItem value="Configuration file" label="Configuration file">

```bash
privacy-url="http://127.0.0.1:8888"
```

</TabItem>

</Tabs>

The URL on which the [Tessera node](../../tutorials/privacy/index.md#3-create-tessera-configuration-files) is running.

<!-- Links -->

[accounts permissions configuration file]: ../../how-to/use-permissioning/local.md#permissions-configuration-file
[nodes permissions configuration file]: ../../how-to/use-permissioning/local.md#permissions-configuration-file
[account permissioning]: ../../concepts/permissioning/index.md#account-permissioning
[TLS on communication with the private transaction manager]: ../../concepts/privacy/index.md#private-transaction-manager
