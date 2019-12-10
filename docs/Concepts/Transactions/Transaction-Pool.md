# Transaction Pool 

All nodes maintain a transaction pool where pending transactions are stored before they are processed.

Options and methods for configuring and monitoring the transaction pool include: 

* [`txpool_besuTransactions`](../../Reference/API-Methods.md#txpool_besutransactions) JSON-RPC API method to list
transactions in the node transaction pool

* [`--tx-pool-max-size`](../../Reference/CLI/CLI-Syntax.md#tx-pool-max-size) command line option to specify the maximum number
of transactions in the node transaction pool

* [`--tx-pool-retention-hours`](../../Reference/CLI/CLI-Syntax.md#tx-pool-retention-hours) command line option to specify 
the maximum number of hours to retain pending transactions in the transaction pool

* [`newPendingTransactions`](../../HowTo/Interact/APIs/RPC-PubSub.md#pending-transactions) and [`droppedPendingTransactions`](../../HowTo/Interact/APIs/RPC-PubSub.md#dropped-transactions)
RPC subscriptions to notify of transactions added to and dropped from the node transaction pool  

## Dropping Transactions when Transaction Pool Full 

Once full, the Besu transaction pool accepts and retains local transactions in preference to remote transactions. 
If the transaction pool is full of local transactions, the oldest local transactions are dropped first.  That is, a 
full transaction pool continues to accept new local transactions by first dropping remote transactions and then by 
dropping the oldest local transactions. 

## Replacing Transactions with Same Nonce

If a transaction is received with the same sender and nonce as a pending transaction but a higher gas price, the pending transaction
is replaced by the new one with the higher gas price.

## Size of Transaction Pool

Decreasing the maximum size of the transaction pool reduces memory use. If the network is busy and there is a backlog
of transactions, increasing the size of the transaction pool reduces the risk of transactions being 
removed from the transaction pool.
