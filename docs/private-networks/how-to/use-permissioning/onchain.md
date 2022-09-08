---
description: Updating Hyperledger Besu onchain allowlists
---

# Use onchain permissioning

When using [onchain permissioning](../../concepts/permissioning/onchain.md), you can update
[nodes](#update-nodes-allowlist) and [accounts](#update-accounts-allowlist) allowlists using the
Besu [permissioning management dapp](#deploy-the-permissioning-management-dapp).

## Deploy the permissioning management dapp

To deploy the permissioning management dapp for production:

1. Retrieve the most recent release (tarball or zip) from the [projects release page].

1. Unpack the distribution into a directory available to your Web server.

1. In the root of the unpack directory, add a file called `config.json` replacing the placeholders
   shown below.

   !!! example "`config.json`"

         ```json

         {
           "accountIngressAddress":  "<Address of the account ingress contract>",
           "nodeIngressAddress": "<Address of the node ingress contract>",
           "networkId": "<ID of your Ethereum network>"
         }
         ```

1. On your Web server, host the contents of the directory as static files and direct root requests
   to `index.html`.

!!! note "Start a production permissioned network"

    To start a production permissioned network, follow the [onchain permissioning tutorial], but don't
    perform the steps using `yarn` to install, build, and start the development server.
    Instead, follow the steps in this section to deploy the permissioning management dapp to your Web server.

## Update nodes allowlist

To add a node to the Hyperledger Besu nodes allowlist:

1. On the **Nodes** tab of the permissioning management dapp, select **Add Node**.
   The **Add Node** window displays.
2. Enter the [enode URL](../../../public-networks/concepts/node-keys.md#enode-url) of the node you are adding and select **Add Node**.

!!! tip

    If your node has two different IP addresses for ingress and egress
    (for example, if you use Kubernetes implementing a load balancer for ingress and a NAT gateway IP address for egress),
    add both addresses to the allowlist, using the same public key for each IP address. This will allow the node to connect.

!!! important

    Node allowlists [support domain names] in enode URLs as an early access feature. Use the `--Xdns-enabled` option
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
    [`admin_addPeer`](../../../public-networks/reference/api/index.md#admin_addpeer).

    If you add the node to the allowlist before starting the node, using `admin_addPeer` is not
    required because peer discovery is run on node startup.

!!! tip

    If nodes are not connecting as expected, set the [log level to `TRACE`](../../../public-networks/reference/cli/options.md#logging)
    and search for messages containing `Node permissioning` to identify the issue.

    Ensure the [`--p2p-host`](../../../public-networks/reference/cli/options.md#p2p-host) command line option has been
    correctly configured for all nodes with the
    externally accessible address.

    If you change your network configuration, you may need to update the node allowlist.

## Update accounts allowlist

To add an account to the accounts allowlist:

1. On the **Accounts** tab of the permissioning management dapp, select **Add Account**.
   The **Add Account** window displays.
1. Enter the account address in the **Account Address** field and select **Add Account**.

To remove an account from the accounts allowlist:

1. On the **Accounts** tab of the permissioning management dapp, hover over the row of
   the account you are removing. A trash can displays.
1. Select the trash can.

## Update admins

You can add or remove admins in the same way as [accounts](#update-accounts-allowlist), except on the **Admins** tab.

## Specify the permissioning contract interface version

Use the [`--permissions-nodes-contract-version`](../../reference/cli/options.md#permissions-nodes-contract-version)
command line option to specify the version of the [permissioning contract interface](../../concepts/permissioning/onchain.md#permissioning-contracts).
The default is 1.

Specify the contract interface version that maps to the version of the [Enterprise Ethereum Alliance Client Specification](https://entethalliance.org/technical-specifications/)
the contract interface implements.

|         | EEA Client Specification | Contract interface |
|:--------|:-------------------------|:-------------------|
| Version | 5                        | 1                  |
| Version | 6                        | 2                  |

The permissioning contracts in the [`ConsenSys/permissioning-smart-contracts`](https://github.com/ConsenSys/permissioning-smart-contracts)
repository implement the version 2 contract interface.

[support domain names]: ../../../public-networks/concepts/node-keys.md#domain-name-support
[projects release page]: https://github.com/ConsenSys/permissioning-smart-contracts/releases/latest
[onchain permissioning tutorial]: ../../tutorials/permissioning/onchain.md
