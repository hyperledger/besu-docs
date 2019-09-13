description: Upgrade Besu     
<!--- END of page meta data -->

# Upgrading your Network 

We recommend: 

* Using an orchestration method (for example, Ansible or Chef) to keep all nodes in sync with your desired configuration. 
* Storing your configuration under version control. 

## Ansible 

The [Ansible role on Galaxy](https://galaxy.ansible.com/pegasyseng/pantheon) can be used directly
or customised to suit your needs. Upgrade by running the play. The play: 

Upgrade the Besu version on nodes by running the play with the new version. For details, see the [Readme on Galaxy](https://galaxy.ansible.com/pegasyseng/pantheon). 
The play: 

1. Stops Besu.
1. Downloads the updated version.
1. Applies any new configuration.
1. Starts Besu.

## Finding Peers on Restarting 

Nodes store known peers in the peer table. The peer table is not persisted to disk. When a node restarts, 
the node connects to the specified bootnodes and discover other nodes through the peer discovery process. 
The node continues collecting data from where it was (assuming there was no data corruption in a failure scenario). 

Before the node was restarted, connected peers saved the node details in their peer tables. 
These peers may reconnect to the restarted node.  The restarted node uses these peers as well as the bootnodes 
to discover more peers. To ensure that the restarted node successfully rejoins the network ensure at least one operational bootnode is specified.


