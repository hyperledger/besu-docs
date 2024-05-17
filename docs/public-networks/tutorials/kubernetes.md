---
title: Deploy a Besu node with Kubernetes
description: Deploying Hyperledger Besu with Kubernetes
tags:
  - public networks
---

# Deploy a Besu public node using Kubernetes

You can use a cloud provider like AWS and Elastic Kubernetes Service to deploy a public node. For brevity we will assume you have an existing cluster setup and we add an extra nodegroup for your Besu pod

### Create a Security group for discovery

The first step in this process is to create a security group in your VPC that allows traffic from anywhere on port 30303 and 9000 (or equivalent ports that you are using for discovery). 

**Outbound Rules**

|Type|Protocol|Port Range|Destination|
|---|---|---|---|
|All Traffic|All|All|0.0.0.0/0|
|All Traffic|All|All|::/0|

**Inbound Rules**

|Type|Protocol|Port Range|Destination|Description|
|---|---|---|---|---|
|Custom UDP|UDP|9000|0.0.0.0/0|CL client|
|Custom TCP|TCP|9000|0.0.0.0/0|CL client|
|Custom UDP|UDP|30303|0.0.0.0/0|EL client|
|Custom TCP|TCP|30303|0.0.0.0/0|EL client|

:::important

The key here is to allow traffic on both TCP and UDP for the CL client and the EL client

:::

### Add a Nodegroup to your cluster

In your VPC settings, ensure that the public subnets you spin up your nodes are set to `Auto-assign public IPv4 address : Yes`

We do this step so you can isolate your Besu node on a **public subnet** and separate it from the other apps and nodegroups you may have running. If you are using something like
[EKSCTL](https://eksctl.io/) you add the following snippet to your setup and update it

```yaml

managedNodeGroups:
  - name: ng-ethereum
    instanceType: m6a.xlarge
    desiredCapacity: 1 # increase this capacity if you need more nodes
    subnets:
      - public-subnet-id1
      - public-subnet-id2
      - public-subnet-id3
    labels: { "ng": "ethereum" }
    securityGroups:
      attachIDs: ["sg-1234..."] # the id of the security group from the previous step
    iam:
      withAddonPolicies:
        ebs: true
        # efs: true
    taints:
      - key: ethereum
        value: "true"
        effect: NoSchedule
      - key: ethereum
        value: "true"
        effect: NoExecute
```

If you use something like Terraform, use something like this for your new nodepool

```yaml

    ng-ethereum = {
      desired_size = 1
      subnet_ids = module.vpc.public_subnets # only public subnets here
      vpc_security_group_ids  = [ sg-1234 ] # the id of the security group from the previous step
      instance_types = ["m6a.xlarge"]
      iam_role_name = "${local.name}-eks-ng-ethereum-role"
      taints = [
        {
          key    = "ethereum"
          value  = "true"
          effect = "NO_SCHEDULE"
        },
        {
          key    = "ethereum"
          value  = "true"
          effect = "NO_EXECUTE"
        }
      ]
      labels = {
        ng   = "ethereum"
      }
    ...

```

### Install the EBS or EFS drivers 

We recommend using EBS or NvME storage for you chain data. For most cases the [EBS drivers](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html) or
[EFS drivers](https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html) are sufficient. However if you are using instance stores, please use the
[Local Storage Static Provisioner](https://aws.amazon.com/blogs/containers/eks-persistent-volumes-for-instance-store/) instead


### Pod setup

Now that the infrastructure is setup, we will use `hostNetworking` to bind your pod to the host and use the host node's public IP for you Besu node.

To do that first add the following snippet to your statefulset:

```yaml

template:
  metadata:
    labels:
      ....
    spec:
      hostNetwork: true
      dnsPolicy: ClusterFirstWithHostNet
      affinity: ....
```

The next step is to add an init container and a shared volume to store the public IP. The init container `init` runs and gets the public IP of the host via the 
AWS metadata service and saves it to a local shared volume `besu-pip` (between the init container and the besu pod)

```yaml

template:
  metadata:
    labels:
      ....
    spec:
      hostNetwork: true
      dnsPolicy: ClusterFirstWithHostNet
      affinity: ....
      initContainers:
      - name: init
        image: alpine/curl:8.5.0
        volumeMounts:
          - name: pip
            mountPath: /pip
          - name: shared-jwt
            mountPath: /jwt           
          - name: besu-data
            mountPath: /data
        securityContext:
          runAsUser: 0                        
        command:
        - /bin/bash
        - -xec
        - |
          TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
          # get the existing public ip to associate with
          PUBLIC_IP_TO_ASSOCIATE=$(curl -H "X-aws-ec2-metadata-token: $TOKEN"  http://169.254.169.254/latest/meta-data/public-ipv4)
          # store the public ip in a local file to be used by the container
          echo -ne "$PUBLIC_IP_TO_ASSOCIATE" > /pip/ip
          
          # create the jwt key
          openssl rand -hex 32 | tr -d "\n" > /jwt/jwtSecret.hex

          # update permissions on the data volume (if needed)
          chown -R 1000:1000 /data

      containers:
      .....

      volumes:
      - name: pip
        emptyDir: {}
      - name: jwt
        emptyDir: {}
      - name: besu-data
        persistentVolumeClaim:
          claimName: besu-pvc
      - name: teku-data
        persistentVolumeClaim:
          claimName: teku-pvc             

```

When you start Besu up in the pod, use the text file in `pip` as your `p2p-host` and that will allow traffic in and out as normal

```yaml

template:
  metadata:
    labels:
      ....
    spec:
      hostNetwork: true
      dnsPolicy: ClusterFirstWithHostNet
      affinity: ....
      initContainers:
      - name: init
        image: alpine/curl:8.5.0
        volumeMounts:
          - name: pip
            mountPath: /pip
          - name: shared-jwt
            mountPath: /jwt             
          - name: besu-data
            mountPath: /data
        securityContext:
          runAsUser: 0                        
        command:
        - /bin/bash
        - -xec
        - |
          TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
          # get the existing public ip to associate with
          PUBLIC_IP_TO_ASSOCIATE=$(curl -H "X-aws-ec2-metadata-token: $TOKEN"  http://169.254.169.254/latest/meta-data/public-ipv4)
          # store the public ip in a local file to be used by the container
          echo -ne "$PUBLIC_IP_TO_ASSOCIATE" > /pip/ip
          
          # create the jwt key
          openssl rand -hex 32 | tr -d "\n" > /jwt/jwtSecret.hex

          # update permissions on the data volume (if needed)
          chown -R 1000:1000 /data

      containers:
      - name: besu
        image: hyperledger/besu:latest
        volumeMounts:
          - name: pip
            mountPath: /pip
            readOnly: true
          - name: shared-jwt
            mountPath: /jwt               
          - name: besu-data
            mountPath: {{ .Values.settings.dataPath }}
        ports:
          - name: elc-rpc
            containerPort: 8545
            protocol: TCP
          - name: elc-ws
            containerPort: 8546
            protocol: TCP
          - name: elc-rlpx
            containerPort: 30303
            protocol: TCP
          - name: elc-discovery
            containerPort: 30303
            protocol: UDP
          - name: elc-metrics
            containerPort: 8545
            protocol: TCP
          - name: elc-engine
            containerPort: 8551
            protocol: TCP         
        command:
          - /bin/sh
          - -c
        args:
          - |
            pip=$(cat /pip/ip)
            /opt/besu/bin/besu \
              --p2p-host=${pip} \
              ....
              ....
      
      - name: teku
        image: consensys/teku:develop
        ....
        ...

      volumes:
      - name: pip
        emptyDir: {}
      - name: jwt
        emptyDir: {}
      - name: besu-data
        persistentVolumeClaim:
          claimName: besu-pvc
      - name: teku-data
        persistentVolumeClaim:
          claimName: teku-pvc          
```
