description: Backing up and restoring Pantheon   
<!--- END of page meta data -->

# Backups 

In a decentralized blockchain, data is replicated on other nodes so cannot be lost. However, backing up 
configuration and data ensures a smoother recovery.  

## Genesis File 

The genesis file for a network must be accessible on every node. We recommend the genesis file is 
stored under source control. 

## Data Backups

We recommend mounting a separate volume to store data. Use the [`--data-path`](../../Reference/Pantheon-CLI/Pantheon-CLI-Syntax.md#data-path) 
command line option to pass the path to Pantheon. 

Having some data reduces the time to synchronise a new node. Periodic backups can be performed of 
the data directory and the data sent to your preferred backup mechanism. For example, cron job and 
rsync, archives to cloud such as s3, or `tar.gz` archives. 

## Data Restores 

To restore data: 

1. If the node is running, stop the node. 
1. If required, move the data directory to another location for analysis. 
1. Restore the data from your last known good backup to the same directory. 
1. Ensure user permissions are valid so the data directory can be read from and written to. 
1. Restart the node. 

## Corrupted Data 

If log messages indicate a corrupt database, the cleanest way to recover is: 

1. Stop the node. 
1. Restore the data from a [previous backup](#data-backups). 
1. Restart the node. 

## Finding Peers on Restarting 

The process for finding peers on restarting is the same as [finding peers after upgrading and restarting](../Upgrade/Upgrade-Network.md#finding-peers-on-restarting). 