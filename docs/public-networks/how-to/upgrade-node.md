---
title: Upgrade Besu
sidebar_position: 11
description: Upgrade your Besu node to a new version.
toc_max_heading_level: 2
tags:
  - public networks
  - private networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrade your Besu node

When upgrading your Besu node, we recommend:

- Preserving your node's data and configuration.
- Storing your configuration under version control.

<Tabs>
  <TabItem value="binary" label="Linux" default>

## Upgrade on Linux

1. Run the following to automatically download the latest Linux release, un-tar, and clean up:

    ```bash
    RELEASE_URL="https://api.github.com/repos/hyperledger/besu/releases/latest"
    TAG=$(curl -s $RELEASE_URL | jq -r .tag_name)
    BINARIES_URL="https://github.com/hyperledger/besu/releases/download/$TAG/besu-$TAG.tar.gz"
   
    echo Downloading URL: $BINARIES_URL
   
    cd $HOME
    wget -O besu.tar.gz $BINARIES_URL
    tar -xzvf besu.tar.gz -C $HOME
    rm besu.tar.gz
    sudo mv $HOME/besu-${TAG} besu
    ```
   
2. Stop your Besu node:

    ```bash
    sudo systemctl stop execution
    ```
   
3. Remove old binaries, install new binaries, and restart Besu:

    ```bash
    sudo rm -rf /usr/local/bin/besu
    sudo mv $HOME/besu /usr/local/bin/besu
    sudo systemctl start execution
    ```

:::tip note
Thank you to
[CoinCashew](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet/part-ii-maintenance/updating-execution-client#besu)
for this upgrade script.
You can also see CoinCashew for instructions on upgrading Besu by building from source.
:::
 
  </TabItem>
  <TabItem value="docker" label="Docker">

## Upgrade on Docker

1. Update your Docker image:

    ```bash
    docker pull hyperledger/besu:latest
    ```

2. Stop the current container:

    ```bash
    docker stop besu-node
    ```

3. Start a new container with the updated image:

    ```bash
    docker run -d \
      --name besu-node                 \
      -v besu-data:/opt/besu/data \
      -v besu-config:/etc/besu       \
      hyperledger/besu:latest
    ```

Example `docker-compose.yml`:

```yaml
version: '3.8'
services:
  besu:
    image: hyperledger/besu:latest
    volumes:
      - besu-data:/opt/besu/data
      - besu-config:/etc/besu
    ports:
      - "8545:8545"
      - "30303:30303"
volumes:
  besu-data:
  besu-config:
```

  </TabItem>
  <TabItem value="kubernetes" label="Kubernetes">

## Upgrade on Kubernetes

1. Update your deployment manifest with a new image version:

    ```yaml
    spec:
      containers:
      - name: besu
        image: hyperledger/besu:new-version
    ```

2. Apply the update:

    ```bash
    kubectl apply -f besu-deployment.yaml
    ```

Example PVC configuration:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: besu-data
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Ti
```

  </TabItem>
  <TabItem value="Ansible">

## Upgrade on Ansible

You can use the [Ansible role on Galaxy](https://galaxy.ansible.com/ui/standalone/roles/consensys/hyperledger_besu/)
directly or customize it to suit your needs.

Upgrade the Besu version on nodes by running the play with the new version.
For more information, select **Documentation** on the [Ansible Galaxy Besu page](https://galaxy.ansible.com/ui/standalone/roles/consensys/hyperledger_besu/).

The playbook:

1. Stops Besu.
2. Downloads the updated version.
3. Applies any new configuration.
4. Starts Besu.

  </TabItem>
</Tabs>

## Verify post-upgrade

1. Check node status:

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' localhost:8545
    ```

2. Verify peer connections:

    ```bash
    curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' localhost:8545
    ```

## Find peers on restarting

Nodes store known peers in the peer table.
The peer table is not persisted to disk.
When a node restarts, the node connects to the specified bootnodes and discovers other nodes through the peer discovery process.
The node continues collecting data from where it left off before the restart (assuming there was no data corruption in a failure scenario).

Before the node restarted, connected peers saved the node details in their peer tables.
These peers can reconnect to the restarted node.
The restarted node uses these peers and the bootnodes, to discover more peers.
To ensure that the restarted node successfully rejoins the network, ensure you specify at least one operational bootnode.

## Troubleshoot

### Sync not progressing

Verify that the node is properly connected to the bootnodes.
Check the node logs to ensure that the connections are being established correctly.

### Low peer count

Ensure that your network connection is stable and that the required ports for peer discovery and communication are open and correctly forwarded.

### API unavailable

Check the configuration of your RPC endpoint to ensure it is set up correctly and accessible. 
Verify that the API service is running and the correct ports are being used.

### Data corruption

If you encounter data corruption, restore the node data from a known good backup.
Ensure regular backups are in place to avoid data loss.

:::note
As a last resort, you can delete the database to resync the node.
This can solve corruption issues, but it might suffer significant downtime depending on the size of the network.
:::
