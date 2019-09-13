description: Configuring validators in production networks    
<!--- END of page meta data -->

# Configuring Validators in a Production Network 

As when [configuring bootnodes](Bootnodes.md):  

1. Create the [node key pair](../../Concepts/Node-Keys.md) (that is, the private and public key) before starting the validator.
1. When creating validators in the cloud (for example, AWS, Azure), attempt to assign a static IP to them. 
If your network is: 
    
    * Publicly accessible, assign an elastic IP. 
    * Internal only, specify a private IP address when you create the instance and record this IP address. 

We recommend validator configuration is stored under source control. 

## Number of Validators Required 

Ensure sufficient validators are configured to allow for redundancy. The number of faulty validators that can be tolerated when
using IBFT 2.0 is:

`f = (n-1)/3` 

Where:

* f = number of faulty validators
* n = number of validators 

## Adding and Removing Validators

Validators are [voted in or out of the validator pool](../Configure/Consensus-Protocols/IBFT.md#adding-and-removing-validators). 

## Validators as Bootnodes 

Validators can also be bootnodes. Other than the [usual configuration for bootnodes](Bootnodes.md) no additional configuration
is required when a validator is also a bootnode. 

If a validator is removed that is also a bootnode, ensure there are enough remaining bootnodes on the 
network. 

