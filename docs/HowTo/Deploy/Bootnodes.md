description: Configuring bootnodes in production networks    
<!--- END of page meta data -->

# Configuring Bootnodes in a Production Network 

A network must have at least one operating bootnode. To allow for continuity in the event of failure, 
configure two or more bootnodes. 

We do not recommend putting bootnodes behind a load balancer since the [enode](../../Concepts/Node-Keys.md#enode-url) is 
tied to the node's public key, IP address, and discovery ports. Any changes to the enode of the bootnode prevents other nodes 
from being able to establish a connection with the bootnode. This is why we recommend putting more bootnodes on the network itself.

To ensure that the bootnode's enode does not change when recovering from a complete bootnode failure: 

1. Create the [node key pair](../../Concepts/Node-Keys.md) (that is, the private and public key) before starting the bootnode.
1. When creating bootnodes in the cloud (for example, AWS, Azure), attempt to assign a static IP to them. If your network is: 
  
    * Publicly accessible, assign an elastic IP. 
   
    * Internal only, specify a private IP address when you create the instance and record this IP address. 

We recommend that the bootnode configuration be stored under source control. 

## Specifying Bootnodes 

To allow for failure, specify all bootnodes on the command line (even to the bootnodes themselves). 

!!! example 
    If your network has two bootnodes, pass the following parameter to all nodes, including the bootnodes. 
   
    `--bootnodes=enode://<publicKeyBootnode1>@<ipBootnode1>:30303,<publicKeyBootnode2>@<ipBootnode2>:30303`
    
!!! tip 
    Having each bootnode list the other bootnodes increases the speed of discovery. Nodes ignore their own 
    enode in the bootnodes list so it's not required to specify different bootnode lists to the bootnodes 
    themselves.  

## Adding and Removing Bootnodes 

Adding new bootnodes is a similar process to creating bootnodes. Once the bootnodes have been created and added to the network,
update the [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) command line option for each node to include the new bootnodes. 

When bootnodes are added, running nodes don’t need to be restarted. Updating the [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes)
option means the next time they are restarted (for example, when [upgrading](../Upgrade/Upgrade-Node.md)), 
the node connects to the new bootnodes.  
