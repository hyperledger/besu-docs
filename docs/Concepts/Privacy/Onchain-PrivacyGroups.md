description: Onchain Privacy Groups
<!--- END of page meta data -->

# Onchain Privacy Groups 

Onchain privacy groups use smart contracts to store and maintain the group membership. 
You can add and remove members to and from onchain privacy groups. 

!!! important 
    Onchain privacy groups are an early access feature in v1.4. Do not use in production networks. 
    
    The onchain privacy group interfaces may change between v1.4 and v1.5. There may not be an upgrade 
    path from onchain privacy groups created using v1.4 to enable use of onchain privacy group functionality 
    in future versions. 
    
    We do not recommend creating onchain privacy groups in a chain with existing [offchain privacy groups](Privacy-Groups.md).  
    
## Group Management Contracts 

The privacy group management contract bytecode is hard-coded into Hyperledger Besu and when a privacy
group is created, the bytecode is the genesis state of the privacy group.  

!!! caution 
    All members of an onchain privacy group must be using the same version of Hyperledger Besu. 

The provided group management contracts do not enforce any permissioning on group members. That is, any 
member of a group can make transactions in the group, and add or remove group members. 
   
## Onchain Privacy Group IDs 

Privacy group IDs for onchain privacy group must be generated outside of Hyperledger Besu and are passed 
as a parameter when creating an onchain privacy group. 

!!! caution 
    When generating a privacy group ID, you must ensure the ID is unique across all network participants. If 
    a privacy group is created with an existing privacy group ID, the existing privacy group is overwritten. 
    
    We recommend using 256 bit SecureRandom to ensure unique privacy group IDs. 