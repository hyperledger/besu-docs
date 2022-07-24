---
description: Run Hyperledger Besu using the official docker image
---

# Run Besu from a Docker image

Hyperledger Besu provides a Docker image to run a Besu node in a Docker container.

Use this Docker image to run a single Besu node without installing Besu.

## Prerequisites

* [Docker](https://docs.docker.com/install/)

* MacOS or Linux

!!! important

    The Docker image does not run on Windows.

## Default node for Mainnet

To run a Besu node in a container connected to the Ethereum Mainnet:

```bash
docker run hyperledger/besu:latest
```

!!! note

    https://hub.docker.com/r/hyperledger/besu/tags lists the available tags for the image.

    If you previously pulled `latest`, Docker runs the cached version.

    To ensure your image is up to date, pull the `latest` version again using `docker pull hyperledger/besu:latest`.

## Expose ports

Expose ports for P2P discovery, GraphQL, metrics, and HTTP and WebSocket JSON-RPC. You need
to expose the ports to use the default ports or the ports specified using
[`--rpc-http-port`](../../../public-networks/reference/cli/options.md#rpc-http-port),
[`--p2p-port`](../../../public-networks/reference/cli/options.md#p2p-port),
[`--rpc-ws-port`](../../../public-networks/reference/cli/options.md#rpc-ws-port),
[`--metrics-port`](../../../public-networks/reference/cli/options.md#metrics-port),
[`--graphql-http-port`](../../../public-networks/reference/cli/options.md#graphql-http-port), and
[`--metrics-push-port`](../../../public-networks/reference/cli/options.md#metrics-push-port) options.

To run Besu exposing local ports for access:

```bash
docker run -p <localportJSON-RPC>:8545 -p <localportWS>:8546 -p <localportP2P>:30303 hyperledger/besu:latest --rpc-http-enabled --rpc-ws-enabled
```

!!! note

    The examples on this page expose TCP ports only.
    To expose UDP ports, specify `/udp` at the end of the argument for the `-p` Docker subcommand option:

    ```bash
    docker run -p <port>:<port>/udp
    ```

    See the [`docker run -p` documentation](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose).

!!! example

    To enable JSON-RPC HTTP calls to `127.0.0.1:8545` and P2P discovery on `127.0.0.1:13001`:

    ```bash
    docker run -p 8545:8545 -p 13001:30303 hyperledger/besu:latest --rpc-http-enabled
    ```

## Start Besu

!!! important

    Don't mount a volume at the default data path (`/opt/besu`). Mounting a volume at the default
    data path interferes with the operation of Besu and prevents Besu from safely launching.

    To run a node that maintains the node state (key and database),
    [`--data-path`](../../../public-networks/reference/cli/options.md#data-path) must be set to a location other
    than `/opt/besu` and a storage volume mounted at that location.

    When running in a Docker container, [`--nat-method`](../../../public-networks/how-to/connect/specify-nat.md)
    must be set to `DOCKER` or `AUTO` (default). Don't set
    [`--nat-method`](../../../public-networks/how-to/connect/specify-nat.md) to `NONE` or `UPNP`.

You can specify
[Besu environment variables](../../../public-networks/reference/cli/options.md#besu-environment-variables) with the
Docker image instead of the command line options.

!!! example

    ```bash
    docker run -p 30303:30303 -p 8545:8545 -e BESU_RPC_HTTP_ENABLED=true -e BESU_NETWORK=goerli hyperledger/besu:latest
    ```

### Run a node for testing

To run a node that mines blocks at a rate suitable for testing purposes with WebSockets enabled:

```bash
docker run -p 8546:8546 --mount type=bind,source=/<myvolume/besu/testnode>,target=/var/lib/besu hyperledger/besu:latest --miner-enabled --miner-coinbase fe3b557e8fb62b89f4916b721be55ceb828dbd73 --rpc-ws-enabled --network=dev --data-path=/var/lib/besu
```

### Run a node on Rinkeby testnet

To run a node on Rinkeby:

```bash
docker run -p 30303:30303 --mount type=bind,source=/<myvolume/besu/rinkeby>,target=/var/lib/besu hyperledger/besu:latest --network=rinkeby --data-path=/var/lib/besu
```

### Run a node on Ethereum Mainnet

To run a node on Ethereum Mainnet with the HTTP JSON-RPC service enabled:

```bash
docker run -p 8545:8545 --mount type=bind,source=/<myvolume/besu/rinkeby>,target=/var/lib/besu  -p 30303:30303 hyperledger/besu:latest --rpc-http-enabled --data-path=/var/lib/besu
```

## Stop Besu and clean up resources

When done running nodes, you can shut down the node container without deleting resources or you can
delete the container after stopping it. Run `docker container ls` and `docker volume ls` to get the
container and volume names.

To stop a container:

```bash
docker stop <container-name>
```

To delete a container:

```bash
docker rm <container-name>
```
