---
description: Hyperledger Besu high availability
---

# High availability of JSON-RPC and RPC Pub/Sub APIs

To enable high availability to the
[RPC Pub/Sub API over WebSockets](../../Interact/APIs/RPC-PubSub.md) or the
[JSON-RPC API](../../Interact/APIs/Using-JSON-RPC-API.md), run and synchronize more than one
Hyperledger Besu node to the network.
Use a load balancer to distribute requests across nodes in the cluster that are ready to receive requests.

![Load Balancer](../../../images/LoadBalancer.png)

!!! important

    We do not recommend putting [bootnodes](../../Deploy/Bootnodes.md) behind a load balancer.

!!! important

    We recommend using load balancers over WebSockets because WebSockets are persistent connections associated with
    specific nodes. If you use load balancers configured in sticky mode over HTTP instead, the connection sticks to the
    associated node even when the node is congested and there is a lower load node available. If you use load balancers
    not configured in sticky mode over HTTP, the connections may switch from node to node, so some JSON-RPC requests may
    not provide expected results (for example, [`admin` methods](../../../Reference/API-Methods.md#admin-methods),
    [`net_enode`](../../../Reference/API-Methods.md#net_enode),
    [`net_peerCount`](../../../Reference/API-Methods.md#net_peercount), and
    [`eth_syncing`](../../../Reference/API-Methods.md#eth_syncing)).

## Determining when a node is ready

Use the
[readiness endpoint](../../Interact/APIs/Using-JSON-RPC-API.md#readiness-and-liveness-endpoints) to
determine when a node is ready.

!!! note

    The minimum number of peers and number of blocks from the best known block for determining if a
    node considered ready is deployment specific.

## Transaction nonces

Besu obtains the nonce for the next transaction using
[`eth_getTransactionCount`](../../../Reference/API-Methods.md#eth_gettransactioncount). The nonce
depends on the transactions in the
[transaction pool](../../../Concepts/Transactions/Transaction-Pool.md). If sending
[`eth_getTransactionCount`](../../../Reference/API-Methods.md#eth_gettransactioncount) and
[`eth_sendRawTransaction`](../../../Reference/API-Methods.md#eth_sendrawtransaction) requests for a
specific account to more than one node, the
[`eth_getTransactionCount`](../../../Reference/API-Methods.md#eth_gettransactioncount) results
might be incorrect.

!!! note

    If using [private transactions](../../../Concepts/Privacy/Privacy-Overview.md), retrieve the
    nonce using
    [`priv_getTransactionCount`](../../../Reference/API-Methods.md#priv_gettransactioncount) or
    [`priv_getEeaTransactionCount`](../../../Reference/API-Methods.md#priv_geteeatransactioncount)
    and send the private transactions using
    [`eea_sendRawTransaction`](../../../Reference/API-Methods.md#eea_sendrawtransaction).

To get correct nonces when distributing requests across a cluster, either:

* Track the next nonce outside of the Besu node (as MetaMask does).
* Configure the load balancer in sticky mode to send requests from a specific account to a single
  node, unless that node is unavailable.

## Subscriptions

You can subscribe to events using:

* [RPC Pub/Sub over WebSockets](../../Interact/APIs/RPC-PubSub.md).
* [Filters over HTTP](../../Interact/Filters/Accessing-Logs-Using-JSON-RPC.md).

We recommend using [RPC Pub/Sub over WebSockets](../../Interact/APIs/RPC-PubSub.md) because
WebSockets connections associate with a specific node and do not require using the load balancer in
sticky mode.

If using [filters over HTTP](../../Interact/Filters/Accessing-Logs-Using-JSON-RPC.md), configure
the load balancer in sticky mode to associate the subscription with a specific node.

## Recovering from dropped subscriptions

Dropped subscriptions can occur because of:

* A disconnected WebSockets connection
* The removal of the node serving the subscription from the ready pool.

If there is a dropped subscription, missed events might occur while reconnecting to a different
node. To recover dropped messages, create another subscription and follow the process for that
[subscription type](../../Interact/APIs/RPC-PubSub.md#subscribing):

* [`newHeads`](#new-headers)
* [`logs`](#logs)
* [`newPendingTransactions`](#new-pending-transactions)
* [`droppedPendingTransactions`](#dropped-pending-transactions)
* [`syncing`](#syncing).

### New headers

To request information on blocks from the last block before the subscription dropped to the first
block received from the new subscription, use
[`eth_getBlockByNumber`](../../../Reference/API-Methods.md#eth_getblockbynumber).

### Logs

To request logs from the block number of the last log received before the subscription dropped to
the current chain head, use [`eth_getLogs`](../../../Reference/API-Methods.md#eth_getlogs).

### New pending transactions

To request all pending transactions for the new node, use
[`txpool_besuTransactions`](../../../Reference/API-Methods.md#txpool_besutransactions).

!!! note

    Nodes do not all store the same pending transactions.

### Dropped pending transactions

To request all pending transactions for the new node, use
[`txpool_besuTransactions`](../../../Reference/API-Methods.md#txpool_besutransactions).

!!! note

    Nodes do not all store the same pending transactions.

### Syncing

The syncing state of each node is specific to that node. To retrieve the syncing state of the new
node, use [`eth_syncing`](../../../Reference/API-Methods.md#eth_syncing).
