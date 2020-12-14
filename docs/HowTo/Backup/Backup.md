---
description: Backing up and restoring Besu
---

# Backups

In a decentralized blockchain, data replicates between nodes so it's not lost. But backing up
configuration and data ensures a smoother recovery from corrupted data or other failures.

## Genesis file

The genesis file for a network must be accessible on every node. We recommend storing the genesis
file under source control.

## Data backups

If installed locally, the default data location is the Besu installation directory.

We recommend mounting a
[separate volume to store data](../Get-Started/Installation-Options/Run-Docker-Image.md#starting-besu). Use the
[`--data-path`](../../Reference/CLI/CLI-Syntax.md#data-path) command line option to pass the path
to Besu.

The default data location is the Besu installation directory, or `/opt/besu/database` if using the
[Besu Docker image](../Get-Started/Installation-Options/Run-Docker-Image.md).

Having some data reduces the time to synchronize a new node. You can perform periodic backups of
the data directory and send the data to your preferred backup mechanism. For example, `cron` job and
`rsync`, archives to the cloud such as s3, or `tar.gz` archives.

## Data restores

To restore data:

1. If the node is running, stop the node.
1. If required, move the data directory to another location for analysis.
1. Restore the data from your last known good backup to the same directory.
1. Ensure user permissions are valid so you can read from and write to the data directory.
1. Restart the node.

## Corrupted data

If log messages signify a corrupt database, the cleanest way to recover is:

1. Stop the node.
1. Restore the data from a [previous backup](#data-backups).
1. Restart the node.

## Finding peers after restarting

The process for finding peers after restarting is the same as for
[finding peers after upgrading and restarting].

<!-- Links -->
[finding peers after upgrading and restarting]: ../Upgrade/Upgrade-Node.md#finding-peers-on-restarting
