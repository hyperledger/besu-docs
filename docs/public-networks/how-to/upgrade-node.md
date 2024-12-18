---
title: Upgrade Besu
sidebar_position: 11
description: Upgrade your Besu node to a new version.
tags:
  - public networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Upgrade your Besu node

When upgrading your Besu node, we recommend:

- Preserving your node's data and configuration
<!--- - Using an orchestration method  to keep all nodes in sync with your desired configuration. --->  
- Storing your configuration under version control.


<Tabs>
  <TabItem value="binary" label="Linux" default>

### Upgrading on Linux

1. Stop your Besu node:

```bash
sudo systemctl stop besu
```

2. Back up your data directory and configuration:

```bash
sudo cp -r /var/lib/besu/data /var/lib/besu/data.backup
sudo cp /etc/besu/config.toml /etc/besu/config.toml.backup
```

3. Download and install the new version:

```bash
wget https://hyperledger.jfrog.io/artifactory/besu-binaries/besu/[VERSION]/besu-[VERSION].tar.gz
tar -xvf besu-[VERSION].tar.gz
sudo cp -r besu-[VERSION]/* /usr/local/bin/
```

4. Restart your node:

```bash
sudo systemctl start besu
```

 :::note
 Keep your data directory (`/var/lib/besu/data`) intact during upgrades to maintain chain sync status.
 :::
 
  </TabItem>
  <TabItem value="docker" label="Docker">

### Upgrading with Docker

1. Update your Docker image:

```bash
docker pull hyperledger/besu:latest
```

2. Stop current container:

```bash
docker stop besu-node
```

3. Start new container with updated image:

```bash
docker run -d \
  --name besu-node \
  -v besu-data:/opt/besu/data \
  -v besu-config:/etc/besu \
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

### Upgrading in Kubernetes

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
</Tabs>

## Post-upgrade verification

1. Check node status:

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' localhost:8545
```

2. Verify peer connections:

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' localhost:8545
```

## Find peers on restarting

Nodes store known peers in the peer table. The peer table is not persisted to disk. When a node restarts, the node connects to the specified bootnodes and discovers other nodes through the peer discovery process. The node continues collecting data from where it left off before the restart (assuming there was no data corruption in a failure scenario).

Before the node restarted, connected peers saved the node details in their peer tables. These peers can reconnect to the restarted node. The restarted node uses these peers and the bootnodes, to discover more peers. To ensure that the restarted node successfully rejoins the network, ensure you specify at least one operational bootnode.

## Troubleshooting

### Sync not progressing

Verify that the node is properly connected to the bootnodes. Check the node logs to ensure that the connections are being established correctly.

### Low peer count

Ensure that your network connection is stable and that the required ports for peer discovery and communication are open and correctly forwarded.

### API unavailable

Check the configuration of your RPC endpoint to ensure it is set up correctly and accessible. Verify that the API service is running and the correct ports are being used.

### Data corruption

If you encounter data corruption, restore the node data from a known good backup. Ensure regular backups are in place to avoid data loss.
