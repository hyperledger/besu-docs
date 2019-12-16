description: Running Orion with Besu 
<!--- END of page meta data -->

# Run Orion with Besu 

To enable [privacy functionality](../../Concepts/Privacy/Privacy-Overview.md) in production systems, [Orion](https://docs.orion.pegasys.tech/en/stable/) 
must be [highly available](#availability) and [run in a separate instance](#separate-instances) to Hyperledger Besu. 

## Availability 

Privacy requires Orion to be highly available. 

All private transaction participants must be online for a private transaction to be successfully distributed.
If any participants are offline when the private transaction is submitted, the transaction is not attempted 
and must be resubmitted.

!!! caution
    If a receiving Orion is available when the private transaction is distributed but is unavailable 
    when the privacy marker transaction is processed, the private transaction is not executed by
    the receiving Besu node. The private states in the Besu nodes are then inconsistent. 
    
## Separate Instances 

For production systems, we recommend running Besu and Orion in separate instances. If running Besu 
and Orion in the same instance, restrict the amount of memory used by each JVM to ensure each has 
enough memory. 