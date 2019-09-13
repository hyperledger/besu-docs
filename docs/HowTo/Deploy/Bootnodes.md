description: Configuring bootnodes in production networks    
<!--- END of page meta data -->

# Configuring Bootnodes in a Production Network 

A network must have at least one operating bootnode. To allow for continuity in the event of failure, 
configure more than one bootnode. 

We do not recommend putting bootnodes behind a load balancer. We recommend putting more bootnodes on the network itself. 

The [enode](../../Concepts/Node-Keys.md#enode-url) of a bootnode is tied to the node public key and IP address. 
To simplify recovering from complete bootnode failure: 

1. Create the [node key pair](../../Concepts/Node-Keys.md) (that is, the private and public key) before starting the bootnode.
1. When creating bootnodes in the cloud (for example, AWS, Azure), attempt to assign a static IP to them. If your network is: 
  
    * Publicly accessible, assign an elastic IP. 
   
    * Internal only, specify a private IP address when you create the instance and record this IP address. 

We recommend bootnode configuration is stored under source control. 

## Specifying Bootnodes 

To allow for failure, specify all bootnodes on the command line (even to the bootnodes themselves). 

!!! example 
    If your network has 2 bootnodes, pass the following parameter to all nodes including the bootnodes. 
   
    `--bootnodes=enode://<publicKeyBootnode1>@10.0.0.100:30303, <publicKeyBootnode2>@10.0.1.101:30303`
    

## Adding and Removing Bootnodes 

Adding new bootnodes is a similar process to creating bootnodes. Once the bootnodes have been created and added to the network,
update the [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) command line option for each node to include the new bootnodes. 

When bootnodes are added, running nodes don’t need to be restarted. Updating the [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes)
option means the next time they are restarted (for example, when [upgrading](../Upgrade/Upgrade-Network.md)), 
the node connects to the new bootnodes.  
