---
description: Plugin based permissioning
---

# Plugin based permissioning

Plugin based permissioning allows complex permissioning solutions to be defined by extending besu.
To do this you need to [build a plugin](../Concepts/Plugins.md).

This is currently broken down into two parts; connection permissioning and message permissioning.

## Node connection permissioning

Node connection permissioning can be used to restrict access to known participants only. 
You can use this to decide if you want to connect to another node or not.  

## Node message permissioning

Use node message permissioning to decide if you wish to propagate different types of devp2p messages to particular nodes.
This could be used to prevent pending transactions from being forward to other nodes.
