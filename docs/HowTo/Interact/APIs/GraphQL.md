description: How to access the Hyperledger Besu API using GraphQL
<!--- END of page meta data -->

# GraphQL over HTTP

GraphQL can reduce the overhead needed for common queries. For example, instead of querying each receipt in a
block, GraphQL can get the same result with a single query for the entire block.

The [Besu GraphQL schema] describes the GraphQL implementation for Ethereum. Enable the GraphQL
service using [command line options](API.md#enabling-api-access).

!!! note

    GraphQL is not supported over WebSockets.

Access the GraphQL endpoint at `http://<HOST>:<PORT>/graphql`. Configure `<HOST>` and `<PORT>`
using [`graphql-http-host`](../../../Reference/CLI/CLI-Syntax.md#graphql-http-host) and
[`graphql-http-port`](../../../Reference/CLI/CLI-Syntax.md#graphql-http-port). The default endpoint
is `http://127.0.0.1:8547/graphql`.

## GraphQL requests with cURL

[Hyperledger Besu JSON-RPC API methods](../../../Reference/API-Methods.md) with an equivalent
[GraphQL](GraphQL.md) query include a GraphQL request and result in the method example.

!!! example

    The following [`syncing`](../../../Reference/API-Methods.md#eth_syncing) request returns data
    about the synchronization status.

    ```bash
    curl -X POST -H "Content-Type: application/json" --data '{ "query": "{syncing{startingBlock currentBlock highestBlock}}"}' http://localhost:8547/graphql
    ```

## GraphQL requests with GraphiQL App

The third-party tool, [GraphiQL](https://github.com/skevy/graphiql-app), provides a tabbed
interface for editing and testing GraphQL queries and mutations. GraphiQL also provides access the
[Besu GraphQL schema] from within the app.

![GraphiQL](../../../images/GraphiQL.png)

## Pending

The Pending query is supported for `transactionCount` and `transactions`.

!!! important

    Besu does not execute pending transactions so results from `account`, `call`, and `estimateGas`
    for Pending do not reflect pending transactions.

!!! example
    ```bash tab="Pending Transaction Count"
    curl -X POST -H "Content-Type: application/json" --data '{ "query": "{pending {transactionCount}}"}' http://localhost:8547/graphql
    ```

    ```bash tab="Result"
    {
      "data" : {
        "pending" : {
          "transactionCount" : 2
        }
      }
    }
    ```

!!! example

    ```bash tab="Pending Transactions"
    curl -X POST -H "Content-Type: application/json" --data '{ "query": "{pending {transactions{hash}}}"}' http://localhost:8547/graphql
    ```

    ```bash tab="Result"
    {
      "data" : {
        "pending" : {
          "transactions" : [ {
            "hash" : "0xbb3ab8e2113a4afdde9753782cb0680408c0d5b982572dda117a4c72fafbf3fa"
          }, {
            "hash" : "0xf6bd6b1bccf765024bd482a71c6855428e2903895982090ab5dbb0feda717af6"
          } ]
        }
      }
    }
    ```

<!-- Links -->
[Besu GraphQL schema]: https://github.com/hyperledger/besu/blob/master/ethereum/api/src/main/resources/schema.graphqls
