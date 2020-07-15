---
description: Updating Hyperledger Besu onchain permission lists
---

# Updating node and account permission lists

## Update node permission lists

To add a node to the Hyperledger Besu nodes permission list:

1. On the _Whitelisted Nodes_ tab of the Permissioning Management Dapp, click the
   _Add Whitelisted Nodes_ button. The Add Node window displays.
1. Enter the [enode URL](../../Concepts/Node-Keys.md#enode-url) of the node you are adding and
   click the _Add Whitelisted Node_ button.

To remove a node from the nodes permission list:

1. On the _Whitelisted Nodes_ tab of the Permissioning Management Dapp, hover over the row of the
   node you are removing. A trash can displays.
1. Click on the trash can.

!!! tip

    If you add a running node, the node does not attempt to reconnect to the bootnode and
    synchronize until peer discovery restarts. To add an allowed node as a peer without waiting
    for peer discovery to restart, use
    [`admin_addPeer`](../../Reference/API-Methods.md#admin_addpeer).

    If you add the node to the permission list before starting the node, using `admin_addPeer` is not
    required because peer discovery is run on node startup.

## Update account permission lists

To add an account to the accounts permission list:

1. On the _Whitelisted Accounts_ tab of the Permissioning Management Dapp, click the
   _Add Whitelisted Account_ button. The add Account Window displays.
1. Enter the account address in the _Account Address_ field and click the
   _Add Whitelisted Account_ button.

To remove an account from the accounts permission list:

1. On the _Whitelisted Accounts_ tab of the Permissioning Management Dapp, hover over the row of
   the account you are removing. A trash can displays.
1. Click on the trash can.

## Update admins

You can add or remove Admins in the same way as accounts, except on the _Admin Accounts_ tab.
