---
description: Monitoring and metrics
---

# Use metrics to monitor node performance

To enable the [Prometheus](https://prometheus.io/) monitoring and alerting service to access
Hyperledger Besu metrics, use the
[`--metrics-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-enabled) option. Use
[Grafana](https://grafana.com/) to visualize the collected data. See the sample
[Besu Grafana dashboard](https://grafana.com/dashboards/10273).

The Besu Example Networks have [monitoring with Prometheus and Grafana configured].

!!! example

    Use Prometheus to monitor the number of blocks your Besu node is behind the chain head and
    alert you that your node is not keeping up with the chain head.

    [This recording](https://www.youtube.com/watch?v=7BuutRe0I28&feature=youtu.be) shows examples
    of monitoring Hyperledger Besu.

## Install Prometheus

To use Prometheus with Besu, install the
[Prometheus main component](https://prometheus.io/download/). On MacOS, install with
[Homebrew](https://formulae.brew.sh/formula/prometheus):

 ```bash
 brew install prometheus
```

!!! tip

    You can also install:

    * Exporters and send system metrics to Prometheus to monitor non-Besu specific items such as
      disk usage and CPU usage.
    * Other Prometheus components, such as the Alert Manager. Additional configuration is not
      required for these components because Prometheus handles and analyzes data directly from the
      feed.

## Setting up and running Prometheus with Besu

To configure Prometheus and run with Besu:

1. Configure Prometheus to poll Besu. For example, add the following yaml fragment to the
   `scrape_configs` block of the `prometheus.yml` file:

    ```yml tab="Example"
      job_name: besu-dev
      scrape_interval: 15s
      scrape_timeout: 10s
      metrics_path: /metrics
      scheme: http
      static_configs:
      - targets:
        - localhost:9545
    ```

    Prometheus requires 3 MB of space per node per hour for metrics, with a `scrape_interval` of 15
    seconds.

1. Start Besu with the
   [`--metrics-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-enabled) option. To start a
   single node for testing with metrics enabled:

    ```bash tab="Example"
    besu --network=dev --miner-enabled --miner-coinbase fe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-cors-origins="all" --rpc-http-enabled --metrics-enabled
    ```

    To specify the host and port on which Prometheus accesses Besu, use the
    [`--metrics-host`](../../Reference/CLI/CLI-Syntax.md#metrics-host) and
    [`--metrics-port`](../../Reference/CLI/CLI-Syntax.md#metrics-port) options. The default host
    and port are 127.0.0.1 and 9545.

1. In another terminal, run Prometheus specifying the `prometheus.yml` file:

    ```bash tab="Example"
    prometheus --config.file=prometheus.yml
    ```

1. View the [Prometheus graphical interface](#view-prometheus-graphical-interface).

!!! tip

    Use a log ingestion tool, such as Logstash, to parse the logs and alert you to configured
    anomalies.

## Running Prometheus with Besu in push mode

The [`--metrics-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-enabled) option enables
Prometheus polling of Besu, but sometimes metrics are hard to poll (for example, when running
inside Docker containers with varying IP addresses). To enable Besu to push metrics to a
[Prometheus Pushgateway](https://github.com/prometheus/pushgateway), use the
[`--metrics-push-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-push-enabled) option.

To configure Prometheus and run with Besu pushing to a push gateway:

1. Configure Prometheus to read from a push gateway. For example, add the following yaml fragment
   to the `scrape_configs` block of the `prometheus.yml` file:

       ```yml tab="Example"
        - job_name: push-gateway
          metrics_path: /metrics
          scheme: http
          static_configs:
          - targets:
            - localhost:9091
       ```

1. Start the push gateway. You can deploy the push gateway using the Docker image:

    ```bash tab="Example"
    docker pull prom/pushgateway
    docker run -d -p 9091:9091 prom/pushgateway
    ```

1. Start Besu specifying the `--metrics-push-enabled` option and port of the push gateway:

    ```bash tab="Example"
    besu --network=dev --miner-enabled --miner-coinbase fe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-http-cors-origins="all" --rpc-http-enabled --metrics-push-enabled --metrics-push-port=9091 --metrics-push-host=127.0.0.1
    ```

1. In another terminal, run Prometheus specifying the `prometheus.yml` file:

    ```bash tab="Example"
    prometheus --config.file=prometheus.yml
    ```

1. View the [Prometheus graphical interface](#view-prometheus-graphical-interface).

## View Prometheus graphical interface

1. Open a web browser to `http://localhost:9090` to view the Prometheus graphical interface.

1. Choose **Graph** from the menu bar and click the **Console** tab below.

1. From the **Insert metric at cursor** drop-down, select a metric such as
   `besu_blockchain_difficulty_total` or `ethereum_blockchain_height` and click **Execute**. The
   values display.

    The following table lists the Standard Ethereum metrics, shown with the `ethereum_` prefix.
    Metrics specific to Besu use the `besu_` prefix.

    | Name | Metric Type | Definition | JSON-RPC Equivalent |
    | ---  | ---         | ---        | ---                 |
    | `ethereum_blockchain_height` | Gauge | Current height of the canonical chain | `eth_blockNumber` |
    | `ethereum_best_known_block_number` | Gauge | Estimated highest block available | `highestBlock` of `eth_syncing` or `eth_blockNumber`, if not syncing |
    | `ethereum_peer_count` | Gauge | Current number of peers connected | `net_peerCount` |
    | `ethereum_peer_limit` | Gauge | Maximum number of peers this node allows to connect | No equivalent |

    !!! important

        * The `ethereum_best_known_block_number` metric always has a value. When the
          [`eth_syncing` JSON-RPC method](../../Reference/API-Methods.md#eth_syncing) returns
          false, the current chain height displays.
        * Although the `ethereum_peer_limit` metric does not have a JSON-RPC equivalent, the
          [`max peers` command line option](../../Reference/CLI/CLI-Syntax.md#max-peers) sets the
          maximum number of P2P connections that can be established.

    Click the **Graph** tab to view the data as a time-based graph. The query string displays below
    the graph. For example:
    `{ethereum_blockchain_height{instance="localhost:9545",job="prometheus"}`

<!-- Links -->
[monitoring with Prometheus and Grafana configured]: ../../Tutorials/Examples/Private-Network-Example.md#monitoring-nodes-with-prometheus-and-grafana
