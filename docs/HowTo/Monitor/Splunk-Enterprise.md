---
description: Send Hyperledger Besu logs to Splunk
---

# Configure Besu for Splunk Enterprise

A Splunk server can receive Besu logs and enable complex search, visualisation and analysis.

Splunk will help you aggregate multiple node logs in one place and run complex queries without the need
to connect to the node machine to read the standard output.

There's 3 ways to run Splunk and Besu:

- [_Splunk connect for Ethereum_ Docker Compose demo](#_splunk-connect-for-ethereum_-docker-compose-demo)
- Splunk Enterprise Docker container
- Standalone Splunk Enterprise

## _Splunk connect for Ethereum_ Docker Compose demo

The _Splunk connect for Ethereum_ demo Docker Compose environment provided by Splunk will help 
you to run a development Besu node and connect it to Splunk Enterprise.

### Requirements

The following tools are required to use the Splunk connect for Ethereum Docker Compose environment.

- [Git](https://git-scm.com/)
- [Docker and Docker-compose](https://docs.docker.com/compose/install/).

### Clone the _Splunk connect for Ethereum_ repository

    Open a terminal window and run the following commands:

   ```bash
    git clone https://github.com/splunk/splunk-connect-for-ethereum.git
    cd splunk-connect-for-ethereum
   ``` 

### Run the demo environment

Follow instructions at [Besu example running ethlogger using docker-compose](https://github.com/splunk/splunk-connect-for-ethereum/tree/master/examples/besu).

!!!note

    Splunk enterprise takes some time to start.

    Run the `docker ps` command and wait for the 3 container status to be `Up [number] seconds (healthy)`.

    ```
    CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS                    PORTS                                                                            NAMES
    127600dd1173        splunkdlt/ethlogger:latest   "ethlogger"              53 seconds ago      Up 51 seconds (healthy)                                                                                    ethlogger
    88dfcee683c4        splunk/splunk:latest         "/sbin/entrypoint.sh…"   53 seconds ago      Up 52 seconds (healthy)   8065/tcp, 8088-8089/tcp, 8191/tcp, 9887/tcp, 9997/tcp, 0.0.0.0:18000->8000/tcp   splunk
    111b0c6d6072        hyperledger/besu:1.4.4       "besu"                   53 seconds ago      Up 52 seconds (healthy)   8545-8547/tcp, 30303/tcp                                                         besu
    ```

## Run as standalone

### Requirements

The following are required to install Splunk Enterprise and Besu directly on a machine,
without using Docker containers.

- Creating a free [splunk.com](https://www.splunk.com/) account.
    [Splunk Enterprise](https://www.splunk.com/en_us/software/splunk-enterprise.html) is a 3rd party
    product and is not maintained by Hyperledger.
    
    Creating a free [splunk.com](https://www.splunk.com/) account is required to download Splunk Enterprise.
    
    Splunk Enterprise comes in a paid and a free version. See conditions on
    [Splunk Enterprise download page](https://www.splunk.com/en_us/download/splunk-enterprise.html).
- [Splunk Enterprise](https://www.splunk.com/en_us/download/splunk-enterprise.html) 8.0.4.1 or 
    later installed and configured.
- [Besu 1.4.4](https://github.com/hyperledger/besu/blob/master/CHANGELOG.md#144) or later.

### Install Splunk Enterprise



| Name                    | Description                                                                                                                                           | Required |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| LOGGER                  | Must be set to `Splunk` to activate Splunk logging                                                                                                    | Yes      |
| HOST                    | Current host. If in a Docker environment, the default value is the docker container ID. Otherwise the default value is `localhost`.                   | No       |
| SPLUNK_URL              | URL to the Splunk instance, for example https://localhost:8088                                                                                        | Yes      |
| SPLUNK_TOKEN            | Authentication token, usually of the form 11111111-1111-1111-1111-111111111111                                                                        | Yes      |
| SPLUNK_INDEX            | [Index](https://docs.splunk.com/Splexicon:Index) in which logs will be stored. Defaults to `besu`                                                     | No       |
| SPLUNK_SOURCE           | [Source of the logs](https://docs.splunk.com/Splexicon:Source). This may be overridden by the Splunk HTTP Event Collector. Defaults to `besu`         | No       |
| SPLUNK_SOURCETYPE       | [Sourcetype of the logs](https://docs.splunk.com/Splexicon:Sourcetype). This may be overridden by the Splunk HTTP Event Collector. Defaults to `besu` | No       |
| SPLUNK_BATCH_SIZE_BYTES | Size of a batch in bytes. Defaults to `65536`                                                                                                         | No       |
| SPLUNK_BATCH_SIZE_COUNT | Size of a batch in number of events. Defaults to `1000`                                                                                               | No       |
| SPLUNK_BATCH_INTERVAL   | Interval at which to send batches. Defaults to `500`                                                                                                  | No       |
| SPLUNK_SKIPTLSVERIFY    | Whether to check the Splunk instance certificate when sending data. Defaults to `false`                                                               | No       |
