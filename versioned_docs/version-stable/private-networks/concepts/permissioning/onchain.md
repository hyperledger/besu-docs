---
title: Onchain permissioning
description: Onchain permissioning
sidebar_position: 1
tags:
  - private networks
---

# Onchain permissioning

Onchain [permissioning](index.md) uses smart contracts to store and administer the node, account, and admin allowlists. Using onchain permissioning enables all nodes to read the allowlists from a single source, the blockchain.

:::danger

When using onchain account permissioning, a node checks permissions when importing blocks. Meaning, a node only imports blocks in which all transactions are from authorized senders. If you disable onchain account permissioning and your node accepts blocks without enforcing this rule, your node cannot re-synchronize with other nodes that enforce onchain account permissioning rules (your node goes into forked state).

:::

:::note

Custom smart contracts and dapps can be implemented to work with onchain permissioning.

:::

## Permissioning contracts

:::caution

The permissioning contract has multiple interfaces, and each interface maps to a specific version of the [Enterprise Ethereum Alliance Client Specification](https://entethalliance.org/technical-specifications/). Ensure that you [specify the permissioning contract interface] being used when starting Besu.

:::

### Allowlists

Permissioning implements three allowlists:

- Accounts, which can submit transactions to the network.
- Nodes, which can join the network.
- Admins, which are accounts able to update the accounts and nodes allowlists.

:::caution Using account permissioning and privacy

Account permissioning is incompatible with [random key signing](../../how-to/use-privacy/sign-pmts.md) for [privacy marker transactions](../privacy/private-transactions/processing.md).

If using account permissioning and privacy, a signing key must be specified using the [`--privacy-marker-transaction-signing-key-file`](../../reference/cli/options.md#privacy-marker-transaction-signing-key-file) command line option and the corresponding public key included in the accounts allowlist.

:::

:::tip

If nodes are not connecting as expected, set the [log level to `TRACE`](../../../public-networks/reference/cli/options.md#logging) and search for messages containing `Node permissioning` to identify the issue.

Ensure the [`--p2p-host`](../../../public-networks/reference/cli/options.md#p2p-host) command line option has been correctly configured for all nodes with the externally accessible address.

If you change your network configuration, you may need to update the node allowlist.

:::

## Bootnodes

When a node joins the network, the node connects to the [bootnodes](../../how-to/configure/bootnodes.md) until it synchronizes to the chain head, regardless of node permissions. After synchronization, the Account Rules and Node Rules smart contracts apply the permissioning rules.

If a synchronized node loses all peer connections (that is, it has zero peers), it reconnects to the bootnodes to rediscover peers.

:::info

All bootnodes must be on the nodes allowlist.

:::

<!-- Links -->

[specify the permissioning contract interface]: ../../how-to/use-permissioning/onchain.md#specify-the-permissioning-contract-interface-version
