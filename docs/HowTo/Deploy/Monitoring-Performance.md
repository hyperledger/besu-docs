description: Frequently asked questions FAQ and answers for troubleshooting Hyperledger Besu use
<!--- END of page meta data -->

# Monitoring Hyperledger Besu

## Monitor Node Performance and Connectivity Using the JSON-RPC API

You can monitor node performance using the [`debug_metrics`](../../Reference/API-Methods.md#debug_metrics)
JSON-RPC API method.

## Monitor Node Performance Using Prometheus

Use the [`--metrics-enabled` option](../../Reference/CLI/CLI-Syntax.md#metrics-enabled) to enable the [Prometheus](https://prometheus.io/) monitoring and 
alerting service to access Besu metrics. You can also visualize the collected data using [Grafana](https://grafana.com/).
A sample [Besu Grafana dashboard](https://grafana.com/dashboards/10273) is provided. 

To specify the host and port on which Prometheus accesses Besu, use the [`--metrics-host`](../../Reference/CLI/CLI-Syntax.md#metrics-host) and 
[`--metrics-port`](../../Reference/CLI/CLI-Syntax.md#metrics-port) options. 
The default host and port are 127.0.0.1 and 9545.

To use Prometheus with Besu, install the [prometheus main component](https://prometheus.io/download/). On MacOS, install with [Homebrew](https://formulae.brew.sh/formula/prometheus): 

 ```
 brew install prometheus
```

!!! tip 
    You can also install:
    
    * Exporters and send system metrics to Prometheus to monitor non-Pantheon specific items such as disk usage and CPU usage.  
    * Other Prometheus components such as the Alert Manager. Additional configuration is not required for these
    components because Prometheus handles and analyzes data directly from the feed.


###  Setting up and Running Prometheus with Besu

To configure Prometheus and run with Besu: 

1. Configure Prometheus to poll Besu. For example, add the following yaml fragment to the `scrape_configs`
block of the `prometheus.yml` file:
 
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

1. Start Besu with the [`--metrics-enabled` option](../../Reference/CLI/CLI-Syntax.md#metrics-enabled). To start
 a single node for testing with metrics enabled:

    ```bash tab="Example"
    besu --network=dev --miner-enabled --miner-coinbase fe3b557e8fb62b89f4916b721be55ceb828dbd73
    --rpc-http-cors-origins="all" --rpc-http-enabled --metrics-enabled
    ```

1. In another terminal, run Prometheus specifying the `prometheus.yml` file: 

    ```bash tab="Example"
    prometheus --config.file=config.yml 
    ```

1. Open a web browser to `http://localhost:9090` to view the Prometheus graphical interface.

1. Choose **Graph** from the menu bar and click the **Console** tab below.

1. From the **Insert metric at cursor** drop-down, select a metric such as `besu_blockchain_difficulty_total` or
`besu_blockchain_height` and click **Execute**. The values are displayed below.

    Click the **Graph** tab to view the data as a time-based graph. The query string is displayed below the graph. 
    For example: `{besu_blockchain_height{instance="localhost:9545",job="prometheus"}`

!!! tip 
    Use a log ingestion tool such as Logstash to parse the logs and alert you to configured anomalies. 

### Running Prometheus with Besu in Push Mode 

The [`--metrics-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-enabled) option enables Prometheus polling 
Besu but sometimes metrics are hard to poll (for example, when running inside Docker containers with varying IP addresses). 
The [`--metrics-push-enabled`](../../Reference/CLI/CLI-Syntax.md#metrics-push-enabled) option enables Besu 
to push metrics to a [Prometheus Pushgateway](https://github.com/prometheus/pushgateway).   

To configure Prometheus and run with Besu pushing to a push gateway: 

1. Configure Prometheus to read from a push gateway. For example, add the following yaml fragment to the `scrape_configs`
   block of the `prometheus.yml` file:
    
       ```yml tab="Example"
        - job_name: push-gateway
          metrics_path: /metrics
          scheme: http
          static_configs:
          - targets:
            - localhost:9091
       ```
       
1. Start the push gateway. The push gateway can be deployed using the Docker image: 

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
    prometheus --config.file=config.yml 
    ```

1. View the Prometheus graphical interface as described in [Setting up and Running Prometheus with Besu](#setting-up-and-running-prometheus-with-besu).

## Monitor Node Performance and Connectivity Using the JSON-RPC API

You can monitor node performance using the [`debug_metrics`](../../Reference/API-Methods.md#debug_metrics)
JSON-RPC API method.
