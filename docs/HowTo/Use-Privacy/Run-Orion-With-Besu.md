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

If an Orion node is unavailable when Besu attempts to process a privacy marker transaction, the Besu node 
stops processing all new blocks until Orion is available again. The Besu node continues retrying to process
the privacy marker transaction until Orion is available again. 

!!! caution
    If Orion becomes available but has lost data, Besu resumes processing blocks and the private states
    in the Besu nodes may become inconsistent.  
    
## Separate Instances 

For production systems, we recommend running Besu and Orion in separate instances. If running Besu 
and Orion in the same instance, restrict the amount of memory used by each JVM to ensure each has 
enough memory. 