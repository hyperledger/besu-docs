---
description: Updating Hyperledger Besu onchain allowlists
---

# Updating nodes and accounts allowlists

When using [onchain permissioning](../../Concepts/Permissioning/Onchain-Permissioning.md), you can update
[nodes](#update-nodes-allowlist) and [accounts](#update-accounts-allowlist) allowlists.

## Update nodes allowlist

To add a node to the Hyperledger Besu nodes allowlist:

1. On the **Nodes** tab of the [permissioning management dapp](../../Tutorials/Permissioning/Getting-Started-Onchain-Permissioning.md),
   select **Add Node**.
   The **Add Node** window displays.
2. Enter the [enode URL](../../Concepts/Node-Keys.md#enode-url) of the node you are adding and select **Add Node**.

!!! tip

    If your node has two different IP addresses for ingress and egress
    (for example, if you use Kubernetes implementing a load balancer for ingress and a NAT gateway IP address for egress),
    add both addresses to the allowlist, using the same public key for each IP address. This will allow the node to connect.

!!! important

    Node allowlists [support domain names] in enode URLs as an experimental feature. Use the `--Xdns-enabled` option
    to enable domain name support.

    If using Kubernetes, enable domain name support and use the `--Xdns-update-enabled` option to ensure that Besu can
    connect to a container after being restarted, even if the IP address of the container changes.

To remove a node from the nodes allowlist:

1. On the **Nodes** tab of the permissioning management dapp, hover over the row of the
   node you are removing. A trash can displays.
1. Select the trash can.

!!! tip

    If you add a running node, the node does not attempt to reconnect to the bootnode and
    synchronize until peer discovery restarts. To add an allowlisted node as a peer without waiting
    for peer discovery to restart, use
    [`admin_addPeer`](../../Reference/API-Methods.md#admin_addpeer).

    If you add the node to the allowlist before starting the node, using `admin_addPeer` is not
    required because peer discovery is run on node startup.

!!! tip

    If nodes are not connecting as expected, set the [log level to `TRACE`](../../Reference/CLI/CLI-Syntax.md#logging)
    and search for messages containing `Node permissioning` to identify the issue.

    Ensure the [`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host) command line option has been
    correctly configured for all nodes with the
    externally accessible address.

    If you change your network configuration, you may need to update the node allowlist.

## Update accounts allowlist

To add an account to the accounts allowlist:

1. On the **Accounts** tab of the [permissioning management dapp](../../Tutorials/Permissioning/Getting-Started-Onchain-Permissioning.md),
   select **Add Account**. The **Add Account** window displays.
1. Enter the account address in the **Account Address** field and select **Add Account**.

To remove an account from the accounts allowlist:

1. On the **Accounts** tab of the permissioning management dapp, hover over the row of
   the account you are removing. A trash can displays.
1. Select the trash can.

## Update admins

You can add or remove admins in the same way as [accounts](#update-accounts-allowlist), except on the **Admins** tab.

[support domain names]: ../../Concepts/Node-Keys.md#domain-name-support
