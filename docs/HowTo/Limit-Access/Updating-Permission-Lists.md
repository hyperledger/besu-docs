---
description: Updating Hyperledger Besu onchain allowlists
---

# Updating nodes and accounts allowlists

## Update nodes allowlists

To add a node to the Hyperledger Besu nodes allowlist:

1. On the _Nodes_ tab of the Permissioning Management Dapp, click the
   _Add Nodes_ button. The Add Node window displays.
1. Enter the [enode URL](../../Concepts/Node-Keys.md#enode-url) of the node you are adding and
   click the _Add Node_ button.

To remove a node from the nodes allowlist:

1. On the _Nodes_ tab of the Permissioning Management Dapp, hover over the row of the
   node you are removing. A trash can displays.
1. Click on the trash can.

!!! tip

    If you add a running node, the node does not attempt to reconnect to the bootnode and
    synchronize until peer discovery restarts. To add a allowlisted node as a peer without waiting
    for peer discovery to restart, use
    [`admin_addPeer`](../../Reference/API-Methods.md#admin_addpeer).

    If you add the node to the allowlist before starting the node, using `admin_addPeer` is not
    required because peer discovery is run on node startup.

## Update account allowlists

To add an account to the accounts allowlist:

1. On the _Accounts_ tab of the Permissioning Management Dapp, click the
   _Add Account_ button. The add Account Window displays.
1. Enter the account address in the _Account Address_ field and click the
   _Add Account_ button.

To remove an account from the accounts allowlist:

1. On the _Accounts_ tab of the Permissioning Management Dapp, hover over the row of
   the account you are removing. A trash can displays.
1. Click on the trash can.

## Update admins

You can add or remove Admins in the same way as accounts, except on the _Admins_ tab.
