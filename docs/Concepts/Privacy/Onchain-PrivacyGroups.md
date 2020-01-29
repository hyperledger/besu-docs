description: Onchain Privacy Groups
<!--- END of page meta data -->

# Onchain Privacy Groups 

Onchain privacy groups use smart contracts to store and maintain the group administration and distribution lists. 
Onchain privacy groups can have their membership updated. That is, you can add and remove members when 
using onchain privacy groups. 

!!! important 
    Onchain privacy groups are an early access feature in v1.4. Do not use in production networks. 
    
    The onchain privacy group interfaces may change between v1.4 and v1.5.  
    
    Onchain privacy groups are not compatible with [offchain privacy groups](Privacy-Groups.md). You cannot use existing 
    privacy groups and also create onchain privacy groups in the same chain in v1.4. If you enable
    onchain privacy groups in a chain with existing privacy groups, you will not longer be able to access
    the existing privacy groups. 
    
## Group Management Contracts 

The group management contracts are provided ...     
    
## Administration and Distribution Lists 

Group administration permissions are defined by the Ethereum account key. In the provided group management 
contracts the creator of the group (that is, the Ethereum account that signed the transaction to create the group)
is the owner of the group. 

The initial group members (also known as the distribution list) are defined by the Orion public keys specified in the 
transaction that created the group. The Orion public key is used to add or remove a group member. The 
transaction to add or remove a member must be signed by an Ethereum account with appropriate group 
administration permissions. The group administration rules are defined in the group management contracts. 

## Enabling Onchain Privacy Groups 

To enable onchain privacy groups: 

1. 

## Creating Onchain Privacy Group 


## Adding Members to Onchain Privacy Group 


## Removing Members from Onchain Privacy Group 