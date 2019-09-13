description: Run Hyperledger Besu using the official docker image
<!--- END of page meta data -->

# Running Hyperledger Besu from Docker Image

A Docker image is provided to run a Besu node in a Docker container. 

Use this Docker image to run a single Besu node without installing Besu. 

## Prerequisites

* [Docker](https://docs.docker.com/install/)   

* MacOS or Linux 
    
    !!! important 
        The Docker image does not run on Windows. 

## Quickstart

To run a Besu node in a container connected to the Ethereum mainnet: 

```bash tab="latest"
docker run hyperledger/besu:latest
```

```bash tab="{{ versions.stable }}"
docker run hyperledger/besu:{{ versions.stable }}
```

!!! note
    `latest` runs the latest cached version. To pull the latest version, use `docker pull hyperledger/besu:latest`. 
 
## Exposing Ports

Expose ports for P2P peer discovery, GraphQL, metrics, and HTTP and WebSockets JSON-RPC. Exposing the ports is required to use the 
default ports or the ports specified using [`--rpc-http-port`](../../Reference/CLI/CLI-Syntax.md#rpc-http-port), 
[`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port), [`--rpc-ws-port`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-port), 
[`--metrics-port`](../../Reference/CLI/CLI-Syntax.md#metrics-port), [`--graphql-http-port`](../../Reference/CLI/CLI-Syntax.md#graphql-http-port), 
and [`--metrics-push-port`](../../Reference/CLI/CLI-Syntax.md#metrics-push-port) options.

To run Besu exposing local ports for access: 
```bash
docker run -p <localportJSON-RPC>:8545 -p <localportWS>:8546 -p <localportP2P>:30303 hyperledger/besu:latest --rpc-http-enabled --rpc-ws-enabled
```

!!!example
    To enable JSON-RPC HTTP calls to `127.0.0.1:8545` and P2P discovery on `127.0.0.1:13001`:
    ```bash
    docker run -p 8545:8545 -p 13001:30303 hyperledger/besu:latest --rpc-http-enabled
    ```
     
## Starting Besu 

!!! important 
    Do not mount a volume at the default data path (`/opt/besu`). Mounting a volume at the default 
    data path interferes with the operation of Besu and prevents Besu from safely launching. 
    
    To run a node that maintains the node state (key and database), [`--data-path` must be set to a location
    other than `/opt/besu` and a storage volume mounted at that location]. 

### Run a Node for Testing 

To run a node that mines blocks at a rate suitable for testing purposes with WebSockets enabled: 
```bash
docker run -p 8546:8546 --mount type=bind,source=/<myvolume/besu/testnode>,target=/var/lib/besu hyperledger/besu:latest --miner-enabled --miner-coinbase fe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-ws-enabled --network=dev --data-path=/var/lib/besu
```

### Run a Node on Rinkeby Testnet 

To run a node on Rinkeby: 
```bash
docker run -p 30303:30303 --mount type=bind,source=/<myvolume/besu/rinkeby>,target=/var/lib/besu hyperledger/besu:latest --network=rinkeby --data-path=/var/lib/besu
```

### Run a Node on Ethereum Mainnet 

To run a node on Ethereum mainnet with the HTTP JSON-RPC service enabled: 
```bash
docker run -p 8545:8545 --mount type=bind,source=/<myvolume/besu/rinkeby>,target=/var/lib/besu  -p 30303:30303 hyperledger/besu:latest --rpc-http-enabled --data-path=/var/lib/besu
```

## Stopping Besu and Cleaning up Resources

When you're done running nodes, you can shut down the node container without deleting resources or 
you can delete the container after stopping it. Run `docker container ls` and `docker volume ls` to 
obtain the container and volume names. 

To stop a container:
```bash
docker stop <container-name>
```

To delete a container:
```bash
docker rm <container-name>
```
