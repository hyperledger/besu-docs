description: Methods for accessing and managing private transactions and privacy groups with Hyperledger Besu
<!--- END of page meta data -->

# Accessing Private and Privacy Marker Transactions

A Hyperledger Besu private transaction creates a [privacy marker transaction](../../Concepts/Privacy/Private-Transaction-Processing.md)
in addition to the private transaction itself. 

## Transaction Receipts 

With the transaction hash returned when submitting the private transaction, use: 

* [`eth_getTransactionReceipt`](../../Reference/API-Methods.md#eth_gettransactionreceipt) to get the transaction receipt for the 
privacy marker transaction. 
* [`priv_getTransactionReceipt`](../../Reference/API-Methods.md#priv_gettransactionreceipt) to get the transaction receipt for the private transaction. 

The transaction receipts includes a `status` indicating success (`0x1`) or failure (`0x0`) of the transactions. 

!!! example "Example Private Transaction Failure"
    A transaction is submitted using [`eea_sendRawTransaction`](../Send-Transactions/Creating-Sending-Private-Transactions.md) 
    to deploy a private contract.  If the contract deployment fails due to insufficient gas, the privacy marker transaction receipt 
    has a status of success and the private transaction receipt has a status of failure.  

## Transactions 

With the transaction hash returned when submitting the private transaction, use: 

* [`eth_getTransactionByHash`](../../Reference/API-Methods.md#eth_gettransactionbyhash) to 
get the Privacy Marker Transaction . 
* [`priv_getPrivateTransaction`](../../Reference/API-Methods.md#priv_getprivatetransaction) 
to get the private transaction. 
