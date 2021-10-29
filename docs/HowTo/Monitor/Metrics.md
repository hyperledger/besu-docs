---
description: Monitoring and metrics
---

# Use metrics to monitor node performance

To enable the [Prometheus](https://prometheus.io/) monitoring and alerting service to access Hyperledger Besu metrics,
use the [`--metrics-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-enabled) option.
Use [Grafana](https://grafana.com/) to visualize the collected data.
See the sample [Besu Grafana dashboard](https://grafana.com/dashboards/10273).

The Besu example networks have [monitoring with Prometheus and Grafana configured].

!!! example

    Use Prometheus to monitor the number of blocks your Besu node is behind the chain head, and to alert you that your
    node is not keeping up with the chain head.

    [This recording](https://www.youtube.com/watch?v=7BuutRe0I28&feature=youtu.be) shows examples of monitoring Hyperledger Besu.

## Install Prometheus

To use Prometheus with Besu, install the [Prometheus main component](https://prometheus.io/download/).
On MacOS, install with [Homebrew](https://formulae.brew.sh/formula/prometheus):

```bash
 brew install prometheus
```

!!! tip

    You can also install:

    * Exporters that send system metrics to Prometheus to monitor non-Besu-specific items such as disk and CPU usage.
    * Other Prometheus components, such as the Alert Manager.
      Additional configuration is not required for these components because Prometheus handles and analyzes data directly
      from the feed.

## Setting up and running Prometheus with Besu

To configure Prometheus and run with Besu:

1. Configure Prometheus to poll Besu.
   For example, add the following YAML fragment to the `scrape_configs` block of the `prometheus.yml` file:

    !!! example

        === "Fragment to insert in prometheus.yml"
   
            ```yml
              - job_name: besu
                scrape_interval: 15s
                scrape_timeout: 10s
                metrics_path: /metrics
                scheme: http
                static_configs:
                - targets:
                  - localhost:9545
            ```
   
        === "Full prometheus.yml example"
   
            ```yml
            global:
              scrape_interval: 15s
    
            scrape_configs:
              - job_name: "prometheus"
                static_configs:
                - targets: ["localhost:9090"]
              - job_name: besu
                scrape_interval: 15s
                scrape_timeout: 10s
                metrics_path: /metrics
                scheme: http
                static_configs:
                - targets:
                  - localhost:9545
            ```
   
        Prometheus requires 3 MB of space per node per hour for metrics, with a `scrape_interval` of 15 seconds.

1. Start Besu with the [`--metrics-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-enabled) option.
   To start a single node for testing with metrics enabled, run the following command:

    === "Syntax"

        ```bash
        besu --network=dev --miner-enabled --miner-coinbase <COINBASE ADDRESS> --rpc-http-cors-origins="all" --rpc-http-enabled --metrics-enabled
        ```

    === "Example"

        ```bash
        besu --network=dev --miner-enabled --miner-coinbase fe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-cors-origins="all" --rpc-http-enabled --metrics-enabled
        ```

    To specify the host and port on which Prometheus accesses Besu, use the [`--metrics-host`](../../Reference/CLI/CLI-Syntax.md#metrics-host)
    and [`--metrics-port`](../../Reference/CLI/CLI-Syntax.md#metrics-port) options.
    The default host and port are 127.0.0.1 (`localhost`) and 9545.

    !!! important

        To avoid DNS rebinding attacks, if running Prometheus on a different host than your Besu node (any host other than
        `localhost`), add the hostname that Prometheus uses to [`--host-allowlist`](../../Reference/CLI/CLI-Syntax.md#host-allowlist).

        For example, if Prometheus is configured to get metrics from `http://besu.local:8008/metrics`, then `besu.local`
        has to be in `--host-allowlist`.

1. In another terminal, run Prometheus specifying the `prometheus.yml` file:

    ```bash
    prometheus --config.file=prometheus.yml
    ```

1. View the [Prometheus graphical interface](#view-prometheus-graphical-interface).

    !!! tip

        Use a log ingestion tool, such as Logstash, to parse the logs and alert you to configured anomalies.

## Running Prometheus with Besu in push mode

The [`--metrics-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-enabled) option enables Prometheus polling of Besu,
but sometimes metrics are hard to poll (for example, when running inside Docker containers with varying IP addresses).
To enable Besu to push metrics to a [Prometheus Pushgateway](https://github.com/prometheus/pushgateway), use the
[`--metrics-push-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-push-enabled) option.

To configure Prometheus and run with Besu pushing to a push gateway:

1. Configure Prometheus to read from a push gateway.
   For example, add the following YAML fragment to the `scrape_configs` block of the `prometheus.yml` file:

    ```yml
     - job_name: push-gateway
       metrics_path: /metrics
       scheme: http
       static_configs:
       - targets:
         - localhost:9091
    ```

1. Start the push gateway.
   You can deploy the push gateway using the Docker image:

    ```bash
    docker pull prom/pushgateway
    docker run -d -p 9091:9091 prom/pushgateway
    ```

1. Start Besu specifying the `--metrics-push-enabled` option and port of the push gateway:

    === "Syntax"

        ```bash
        besu --network=dev --miner-enabled --miner-coinbase <COINBASE ADDRESS> --rpc-http-cors-origins="all" --rpc-http-enabled --metrics-push-enabled --metrics-push-port=9091 --metrics-push-host=127.0.0.1
        ```

    === "Example"

        ```bash
        besu --network=dev --miner-enabled --miner-coinbase fe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-cors-origins="all" --rpc-http-enabled --metrics-push-enabled --metrics-push-port=9091 --metrics-push-host=127.0.0.1
        ```

1. In another terminal, run Prometheus specifying the `prometheus.yml` file:

    ```bash
    prometheus --config.file=prometheus.yml
    ```

1. View the [Prometheus graphical interface](#view-prometheus-graphical-interface).

## View Prometheus graphical interface

1. Open a Web browser to [`http://localhost:9090`](http://localhost:9090) to view the Prometheus graphical interface.

1. Choose **Graph** from the menu bar and click the **Console** tab below.

1. From the **Insert metric at cursor** drop-down, select a [metric](#metrics-list) such as `besu_blockchain_difficulty_total`
   or `ethereum_blockchain_height` and click **Execute**.
   The values display.

1. Click the **Graph** tab to view the data as a time-based graph.
   The query string displays below the graph.
   For example, `{ethereum_blockchain_height{instance="localhost:9545",job="prometheus"}`.

## Metrics list

The following table lists available metrics.
Each metric starts with a metric category prefix.
Metrics specific to Besu use the `besu_` prefix, followed by another metric category.
Metric categories can be enabled using the [`metrics-category`](../../Reference/CLI/CLI-Syntax.md#metrics-category) command line option.
If a metric has a JSON-RPC equivalent, it is included in the definition column.

| Name | Metric type | Definition |
| ---  | ---         | ---        |
| `besu_blockchain_chain_head_gas_limit`                              | Gauge   | Block gas limit of the current chain head block     |
| `besu_blockchain_chain_head_gas_used`                               | Gauge   | Gas used by the current chain head block            |
| `besu_blockchain_chain_head_ommer_count`                            | Gauge   | Number of uncles in the current chain head block (JSON-RPC equivalent: [`eth_getUncleCountByBlockHash`](../../Reference/API-Methods.md#eth_getunclecountbyblockhash) or [`eth_getUncleCountByBlockNumber`](../../Reference/API-Methods.md#eth_getunclecountbyblocknumber)) |
| `besu_blockchain_chain_head_timestamp`                              | Gauge   | Timestamp from the current chain head               |
| `besu_blockchain_chain_head_transaction_count`                      | Gauge   | Number of transactions in the current chain head block (JSON-RPC equivalent: [`eth_getBlockTransactionCountByHash`](../../Reference/API-Methods.md#eth_getblocktransactioncountbyhash) or [`eth_getBlockTransactionCountByNumber`](../../Reference/API-Methods.md#eth_getblocktransactioncountbynumber)) |
| `besu_blockchain_difficulty_total`                                  | Gauge   | Difficulty of the chain head (JSON-RPC equivalent: `difficulty` of [`admin_peers`](../../Reference/API-Methods.md#admin_peers)) |
| `besu_executors_ethscheduler_computation_active_threads_current`    | Gauge   | Current number of threads executing computation tasks |
| `besu_executors_ethscheduler_computation_completed_tasks_total`     | Gauge   | Total number of computation tasks executed          |
| `besu_executors_ethscheduler_computation_pool_size_current`         | Gauge   | Current number of threads in the computation thread pool |
| `besu_executors_ethscheduler_computation_queue_length_current`      | Gauge   | Current number of computation tasks awaiting execution |
| `besu_executors_ethscheduler_computation_rejected_tasks_total`      | Counter | Total number of tasks rejected by this computation executor |
| `besu_executors_ethscheduler_computation_submitted_tasks_total`     | Gauge   | Total number of computation tasks submitted         |
| `besu_executors_ethscheduler_timer_active_threads_current`          | Gauge   | Current number of threads executing timer tasks     |
| `besu_executors_ethscheduler_timer_completed_tasks_total`           | Gauge   | Total number of timer tasks executed                |
| `besu_executors_ethscheduler_timer_pool_size_current`               | Gauge   | Current number of threads in the timer thread pool  |
| `besu_executors_ethscheduler_timer_queue_length_current`            | Gauge   | Current number of timer tasks awaiting execution    |
| `besu_executors_ethscheduler_timer_rejected_tasks_total`            | Counter | Total number of tasks rejected by this timer executor |
| `besu_executors_ethscheduler_timer_submitted_tasks_total`           | Gauge   | Total number of timer tasks submitted               |
| `besu_executors_ethscheduler_workers_active_threads_current`        | Gauge   | Current number of threads executing worker tasks    |
| `besu_executors_ethscheduler_workers_completed_tasks_total`         | Gauge   | Total number of worker tasks executed               |
| `besu_executors_ethscheduler_workers_pool_size_current`             | Gauge   | Current number of threads in the worker thread pool |
| `besu_executors_ethscheduler_workers_queue_length_current`          | Gauge   | Current number of worker tasks awaiting execution   |
| `besu_executors_ethscheduler_workers_rejected_tasks_total`          | Counter | Total number of tasks rejected by this worker executor |
| `besu_executors_ethscheduler_workers_submitted_tasks_total`         | Gauge   | Total number of worker tasks submitted              |
| `besu_network_discovery_inflight_interactions_current`              | Gauge   | Current number of inflight discovery interactions   |
| `besu_network_discovery_interaction_count`                          | Counter | Total number of discovery interactions initiated    |
| `besu_network_discovery_interaction_retry_count`                    | Counter | Total number of interaction retries performed       |
| `besu_network_discovery_messages_inbound`                           | Counter | Total number of P2P discovery messages received     |
| `besu_network_discovery_messages_outbound`                          | Counter | Total number of P2P discovery messages sent         |
| `besu_network_netty_boss_pending_tasks`                             | Gauge   | Number of pending tasks in Netty boss event loop    |
| `besu_network_netty_workers_pending_tasks`                          | Gauge   | Number of pending tasks in Netty workers event loop |
| `besu_network_p2p_messages_inbound`                                 | Counter | Total number of P2P messages received               |
| `besu_network_vertx_eventloop_pending_tasks`                        | Gauge   | Number of pending tasks in Vertx event loop         |
| `besu_network_vertx_worker_pool_completed_total`                    | Counter | Total number of tasks completed by Vertx worker pool |
| `besu_network_vertx_worker_pool_rejected_total`                     | Counter | Total number of tasks rejected by Vertx worker pool |
| `besu_network_vertx_worker_pool_submitted_total`                    | Counter | Total number of tasks submitted to Vertx worker pool |
| `besu_peers_connected_total`                                        | Counter | Total number of peers connected                     |
| `besu_peers_disconnected_total`                                     | Counter | Total number of peers disconnected                  |
| `besu_peers_pending_peer_requests_current`                          | Gauge   | Current number of peer requests pending because peers are busy |
| `besu_pruner_mark_time_duration`                                    | Gauge   | Cumulative number of seconds spent marking the state trie across all pruning cycles |
| `besu_pruner_mark_operations_total`                                 | Counter | Total number of mark operations performed           |
| `besu_pruner_marked_nodes_total`                                    | Counter | Total number of nodes marked as in use              |
| `besu_pruner_sweep_operations_total`                                | Counter | Total number of sweep operations performed          |
| `besu_pruner_swept_nodes_total`                                     | Counter | Total number of unused nodes removed                |
| `besu_stratum_connections`                                          | Counter | Number of connections over time                     |
| `besu_stratum_difficulty`                                           | Gauge   | Current mining difficulty                           |
| `besu_stratum_disconnections`                                       | Counter | Number of disconnections over time                  |
| `besu_stratum_miners`                                               | Gauge   | Number of connected miners                          |
| `besu_synchronizer_chain_download_pipeline_restarts`                | Counter | Number of times chain download pipeline has been restarted |
| `besu_synchronizer_in_sync`                                         | Gauge   | Whether or not the local node has caught up to the best known peer (1 or 0) |
| `besu_synchronizer_task`                                            | Summary | Internal processing tasks                           |
| `besu_transaction_pool_pending_transactions_messages_skipped_total` | Counter | Total number of pending transactions messages skipped by the processor |
| `besu_transaction_pool_transactions`                                | Gauge   | Current size of the transaction pool (JSON-RPC equivalent: result number of [`txpool_besuTransactions`](../../Reference/API-Methods.md#txpool_besutransactions)) |
| `besu_transaction_pool_transactions_added_total`                    | Counter | Count of transactions added to the transaction pool |
| `besu_transaction_pool_transactions_messages_skipped_total`         | Counter | Total number of transactions messages skipped by the processor. |
| `ethereum_best_known_block_number`                                  | Gauge   | Estimated highest block available (JSON-RPC equivalent: `highestBlock` of [`eth_syncing`](../../Reference/API-Methods.md#eth_syncing), or [`eth_blockNumber`](../../Reference/API-Methods.md#eth_blocknumber) if not syncing) |
| `ethereum_blockchain_height`                                        | Gauge   | Current height of the canonical chain (JSON-RPC equivalent: [`eth_blockNumber`](../../Reference/API-Methods.md#eth_blocknumber)) |
| `ethereum_peer_count`                                               | Gauge   | Current number of peers connected (JSON-RPC equivalent: [`net_peerCount`](../../Reference/API-Methods.md#net_peercount)) |
| `ethereum_peer_limit`                                               | Gauge   | Maximum number of peers this node allows to connect |
| `jvm_buffer_pool_capacity_bytes`                                    | Gauge   | Bytes capacity of a given JVM buffer pool           |
| `jvm_buffer_pool_used_buffers`                                      | Gauge   | Used buffers of a given JVM buffer pool             |
| `jvm_buffer_pool_used_bytes`                                        | Gauge   | Used bytes of a given JVM buffer pool               |
| `jvm_classes_loaded`                                                | Gauge   | Current number of classes loaded in the JVM         |
| `jvm_classes_loaded_total`                                          | Counter | Total number of classes loaded since the JVM started execution |
| `jvm_classes_unloaded_total`                                        | Counter | Total number of classes unloaded since the JVM started execution |
| `jvm_gc_collection_seconds`                                         | Summary | Seconds spent in a given JVM garbage collector      |
| `jvm_memory_bytes_committed`                                        | Gauge   | Committed bytes of a given JVM memory area          |
| `jvm_memory_bytes_init`                                             | Gauge   | Initial bytes of a given JVM memory area            |
| `jvm_memory_bytes_max`                                              | Gauge   | Maximum bytes of a given JVM memory area            |
| `jvm_memory_bytes_used`                                             | Gauge   | Used bytes of a given JVM memory area               |
| `jvm_memory_pool_bytes_committed`                                   | Gauge   | Committed bytes of a given JVM memory pool          |
| `jvm_memory_pool_bytes_init`                                        | Gauge   | Initial bytes of a given JVM memory pool            |
| `jvm_memory_pool_bytes_max`                                         | Gauge   | Maximum bytes of a given JVM memory pool            |
| `jvm_memory_pool_bytes_used`                                        | Gauge   | Used bytes of a given JVM memory pool               |
| `jvm_threads_current`                                               | Gauge   | Current thread count of a JVM                       |
| `jvm_threads_daemon`                                                | Gauge   | Daemon thread count of a JVM                        |
| `jvm_threads_deadlocked`                                            | Gauge   | Cycles of JVM threads in deadlock waiting to acquire object monitors or ownable synchronizers |
| `jvm_threads_deadlocked_monitor`                                    | Gauge   | Cycles of JVM threads in deadlock waiting to acquire object monitors |
| `jvm_threads_peak`                                                  | Gauge   | Peak thread count of a JVM                          |
| `jvm_threads_started_total`                                         | Counter | Started thread count of a JVM                       |
| `jvm_threads_state`                                                 | Gauge   | Current count of threads by state                   |
| `process_cpu_seconds_total`                                         | Counter | Total user and system CPU time spent in seconds     |
| `process_max_fds`                                                   | Gauge   | Maximum number of open file descriptors             |
| `process_open_fds`                                                  | Gauge   | Number of open file descriptors                     |
| `process_start_time_seconds`                                        | Gauge   | Start time of the process since Unix epoch in seconds |

!!! important

    * The `ethereum_best_known_block_number` metric always has a value. When the
      [`eth_syncing` JSON-RPC method](../../Reference/API-Methods.md#eth_syncing) returns
      false, the current chain height displays.
    * Although the `ethereum_peer_limit` metric does not have a JSON-RPC equivalent, the
      [`max peers` command line option](../../Reference/CLI/CLI-Syntax.md#max-peers) sets the
      maximum number of P2P connections that can be established.

<!-- Links -->
[monitoring with Prometheus and Grafana configured]: ../../Tutorials/Examples/Private-Network-Example.md#monitoring-nodes-with-prometheus-and-grafana
