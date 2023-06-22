---
title: Private network options
sidebar_position: 1
description: Hyperledger Besu private networks CLI reference
---

# Private network command line options

This reference describes the syntax of the Hyperledger Besu private network command line interface (CLI) options.

:::danger

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

- In a [configuration file](../../../public-networks/how-to/configuration-file.md).

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

<!--tabs-->

# Syntax

```bash
--permissions-accounts-config-file=<FILE>
```

# Example

```bash
--permissions-accounts-config-file=/home/me/me_configFiles/myPermissionsFile
```

# Environment variable

```bash
BESU_PERMISSIONS_ACCOUNTS_CONFIG_FILE=/home/me/me_configFiles/myPermissionsFile
```

# Configuration file

```bash
permissions-accounts-config-file="/home/me/me_configFiles/myPermissionsFile"
```

<!--/tabs-->

The [accounts permissions configuration file]. The default is the `permissions_config.toml` file in the [data directory](../../../public-networks/reference/cli/options.md#data-path).

:::tip

`--permissions-accounts-config-file` and [`--permissions-nodes-config-file`](#permissions-nodes-config-file) can use the same file.

:::

### `permissions-accounts-config-file-enabled`

<!--tabs-->

# Syntax

```bash
--permissions-accounts-config-file-enabled[=<true|false>]
```

# Example

```bash
--permissions-accounts-config-file-enabled=true
```

# Environment variable

```bash
BESU_PERMISSIONS_ACCOUNTS_CONFIG_FILE_ENABLED=true
```

# Configuration file

```bash
permissions-accounts-config-file-enabled=true
```

<!--/tabs-->

Enables or disables file-based account level permissions. The default is `false`.

### `permissions-accounts-contract-address`

<!--tabs-->

# Syntax

```bash
--permissions-accounts-contract-address=<ContractAddress>
```

# Example

```bash
--permissions-accounts-contract-address=xyz
```

# Environment variable

```bash
BESU_PERMISSIONS_ACCOUNTS_CONTRACT_ADDRESS=xyz
```

# Configuration file

```bash
permissions-accounts-contract-address="xyz"
```

<!--/tabs-->

The contract address for [onchain account permissioning](../../concepts/permissioning/onchain.md).

### `permissions-accounts-contract-enabled`

<!--tabs-->

# Syntax

```bash
--permissions-accounts-contract-enabled[=<true|false>]
```

# Example

```bash
--permissions-accounts-contract-enabled=true
```

# Environment variable

```bash
BESU_PERMISSIONS_ACCOUNTS_CONTRACT_ENABLED=true
```

# Configuration file

```bash
permissions-accounts-contract-enabled=true
```

<!--/tabs-->

Enables or disables contract-based [onchain account permissioning](../../concepts/permissioning/onchain.md). The default is `false`.

### `permissions-nodes-config-file`

<!--tabs-->

# Syntax

```bash
--permissions-nodes-config-file=<FILE>
```

# Example

```bash
--permissions-nodes-config-file=/home/me/me_configFiles/myPermissionsFile
```

# Environment variable

```bash
BESU_PERMISSIONS_NODES_CONFIG_FILE=/home/me/me_configFiles/myPermissionsFile
```

# Configuration file

```bash
permissions-nodes-config-file="/home/me/me_configFiles/myPermissionsFile"
```

<!--/tabs-->

The [nodes permissions configuration file]. The default is the `permissions_config.toml` file in the [data directory](../../../public-networks/reference/cli/options.md#data-path).

:::tip

`--permissions-nodes-config-file` and [`--permissions-accounts-config-file`](#permissions-accounts-config-file) can use the same file.

:::

### `permissions-nodes-config-file-enabled`

<!--tabs-->

# Syntax

```bash
--permissions-nodes-config-file-enabled[=<true|false>]
```

# Example

```bash
--permissions-nodes-config-file-enabled=true
```

# Environment variable

```bash
BESU_PERMISSIONS_NODES_CONFIG_FILE_ENABLED=true
```

# Configuration file

```bash
permissions-nodes-config-file-enabled=true
```

<!--/tabs-->

Enables or disables file-based node level permissions. The default is `false`.

### `permissions-nodes-contract-address`

<!--tabs-->

# Syntax

```bash
--permissions-nodes-contract-address=<ContractAddress>
```

# Example

```bash
--permissions-nodes-contract-address=xyz
```

# Environment variable

```bash
BESU_PERMISSIONS_NODES_CONTRACT_ADDRESS=xyz
```

# Configuration file

```bash
permissions-nodes-contract-address="xyz"
```

<!--/tabs-->

The contract address for [onchain node permissioning](../../concepts/permissioning/onchain.md).

### `permissions-nodes-contract-enabled`

<!--tabs-->

# Syntax

```bash
--permissions-nodes-contract-enabled[=<true|false>]
```

# Example

```bash
--permissions-nodes-contract-enabled=true
```

# Environment variable

```bash
BESU_PERMISSIONS_NODES_CONTRACT_ENABLED=true
```

# Configuration file

```bash
permissions-nodes-contract-enabled=true
```

<!--/tabs-->

Enables or disables contract-based [onchain node permissioning](../../concepts/permissioning/onchain.md). The default is `false`.

### `permissions-nodes-contract-version`

<!--tabs-->

# Syntax

```bash
--permissions-nodes-contract-version=<ContractVersion>
```

# Example

```bash
--permissions-nodes-contract-version=2
```

# Environment variable

```bash
BESU_PERMISSIONS_NODES_CONTRACT_VERSION=2
```

# Configuration file

```bash
permissions-nodes-contract-version=2
```

<!--/tabs-->

Version of the EEA [node permissioning interface](../../how-to/use-permissioning/onchain.md#specify-the-permissioning-contract-interface-version). The default is 1.

### `privacy-enabled`

<!--tabs-->

# Syntax

```bash
--privacy-enabled[=<true|false>]
```

# Example

```bash
--privacy-enabled=false
```

# Environment variable

```bash
BESU_PRIVACY_ENABLED=false
```

# Configuration file

```bash
privacy-enabled=false
```

<!--/tabs-->

Enables or disables [private transactions](../../concepts/privacy/index.md). The default is `false`.

:::important

Using private transactions with [pruning](../../../public-networks/concepts/data-storage-formats.md) or [fast sync](../../../public-networks/reference/cli/options.md#sync-mode) is not supported.

:::

### `privacy-marker-transaction-signing-key-file`

<!--tabs-->

# Syntax

```bash
--privacy-marker-transaction-signing-key-file=<FILE>
```

# Example

```bash
--privacy-marker-transaction-signing-key-file=/home/me/me_node/myPrivateKey
```

# Environment variable

```bash
BESU_PRIVACY_MARKER_TRANSACTION_SIGNING_KEY_FILE=/home/me/me_node/myPrivateKey
```

# Configuration file

```bash
privacy-marker-transaction-signing-key-file="/home/me/me_node/myPrivateKey"
```

<!--/tabs-->

`<FILE>` is the name of the private key file used to [sign privacy marker transactions](../../how-to/use-privacy/sign-pmts.md).

:::note

This can be the same file used by [`--node-private-key-file`](../../../public-networks/reference/cli/options.md#node-private-key-file), or a different key file to identify who signed the privacy marker transaction.

:::

You must specify this option if you're using:

- a privacy network where you pay gas. Also, the associated account must contain adequate funds.
- [account permissioning] and privacy. You must include the corresponding public key in the accounts allowlist.

If you do not specify this option (for example, in a free gas network), Besu signs each transaction with a different randomly generated key.

### `privacy-multi-tenancy-enabled`

<!--tabs-->

# Syntax

```bash
--privacy-multi-tenancy-enabled[=<true|false>]
```

# Example

```bash
--privacy-multi-tenancy-enabled=false
```

# Environment variable

```bash
BESU_PRIVACY_MULTI_TENANCY_ENABLED=false
```

# Configuration file

```bash
privacy-multi-tenancy-enabled=false
```

<!--/tabs-->

Enables or disables [multi-tenancy](../../concepts/privacy/multi-tenancy.md) for private transactions. The default is `false`.

### `privacy-flexible-groups-enabled`

<!--tabs-->

# Syntax

```bash
--privacy-flexible-groups-enabled[=<true|false>]
```

# Example

```bash
--privacy-flexible-groups-enabled=true
```

# Environment variable

```bash
BESU_PRIVACY_FLEXIBLE_GROUPS_ENABLED=true
```

# Configuration file

```bash
privacy-flexible-groups-enabled=true
```

<!--/tabs-->

Enables or disables [flexible privacy groups](../../concepts/privacy/flexible-privacy.md). The default is `false`.

Deprecated syntax for this option is `--privacy-onchain-groups-enabled`.

### `privacy-public-key-file`

<!--tabs-->

# Syntax

```bash
--privacy-public-key-file=<privacyPublicKeyFile>
```

# Example

```bash
--privacy-public-key-file=Tessera/nodeKey.pub
```

# Environment variable

```bash
BESU_PRIVACY_PUBLIC_KEY_FILE=Tessera/nodeKey.pub
```

# Configuration file

```bash
privacy-public-key-file="Tessera/nodeKey.pub"
```

<!--/tabs-->

The [public key of the Tessera node](https://docs.tessera.consensys.net/).

:::important

You cannot specify `privacy-public-key-file` when [`--privacy-multi-tenancy-enabled`](#privacy-multi-tenancy-enabled) is `true`

:::

### `privacy-tls-enabled`

<!--tabs-->

# Syntax

```bash
--privacy-tls-enabled[=<true|false>]
```

# Example

```bash
--privacy-tls-enabled=false
```

# Environment variable

```bash
BESU_PRIVACY_TLS_ENABLED=false
```

# Configuration file

```bash
privacy-tls-enabled=false
```

<!--/tabs-->

Enables or disables [TLS on communication with the private transaction manager]. The default is false.

### `privacy-tls-keystore-file`

<!--tabs-->

# Syntax

```bash
--privacy-tls-keystore-file=<FILE>
```

# Example

```bash
--privacy--keystore-file=/home/me/me_node/key
```

# Environment variable

```bash
BESU_PRIVACY_TLS_KEYSTORE_FILE=/home/me/me_node/key
```

# Configuration file

```bash
privacy-tls-keystore-file="/home/me/me_node/key"
```

<!--/tabs-->

The keystore file (in PKCS #12 format) containing the private key and the certificate presented during authentication.

You must specify `privacy-tls-keystore-file` if [`--privacy-tls-enabled`](#privacy-tls-enabled) is `true`.

### `privacy-tls-keystore-password-file`

<!--tabs-->

# Syntax

```bash
--privacy-tls-keystore-password-file=<FILE>
```

# Example

```bash
--privacy-tls-keystore-password-file=/home/me/me_node/password
```

# Environment variable

```bash
BESU_PRIVACY_TLS_KEYSTORE_PASSWORD_FILE=/home/me/me_node/password
```

# Configuration file

```bash
privacy-tls-keystore-password-file="/home/me/me_node/password"
```

<!--/tabs-->

The path to the file containing the password to decrypt the keystore.

### `privacy-tls-known-enclave-file`

<!--tabs-->

# Syntax

```bash
--privacy-tls-known-enclave-file=<FILE>
```

# Example

```bash
--privacy-tls-known-enclave-file=/home/me/me_node/knownEnclave
```

# Environment variable

```bash
BESU_PRIVACY_TLS_KNOWN_ENCLAVE_FILE=/home/me/me_node/knownEnclave
```

# Configuration file

```bash
privacy-tls-known-enclave-file="/home/me/me_node/knownEnclave"
```

<!--/tabs-->

The path to the file containing the hostnames, ports, and SHA256 certificate fingerprints of the [authorized privacy enclave](../../how-to/configure/tls/client-and-server.md#create-the-known-servers-file).

### `privacy-url`

<!--tabs-->

# Syntax

```bash
--privacy-url=<privacyUrl>
```

# Example

```bash
--privacy-url=http://127.0.0.1:8888
```

# Environment variable

```bash
BESU_PRIVACY_URL=http://127.0.0.1:8888
```

# Configuration file

```bash
privacy-url="http://127.0.0.1:8888"
```

<!--/tabs-->

The URL on which the [Tessera node](../../tutorials/privacy/index.md#3-create-tessera-configuration-files) is running.

<!-- Links -->

[accounts permissions configuration file]: ../../how-to/use-permissioning/local.md#permissions-configuration-file
[nodes permissions configuration file]: ../../how-to/use-permissioning/local.md#permissions-configuration-file
[account permissioning]: ../../concepts/permissioning/index.md#account-permissioning
[TLS on communication with the private transaction manager]: ../../concepts/privacy/index.md#private-transaction-manager
