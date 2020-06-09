---
description: Hyperledger Besu Configure the Nat Manager for Kubernetes tutorial
---

# Nat manager's Kubernetes mode

The `KUBERNETES` mode allows you to automatically configure your besu node (IP and Ports).
Besu will try to self-configure automatically if you use `--nat-method=AUTO` or `--nat-method=KUBERNETES`

If you want to define your Besu's ports and IP yourself you just have to put the mode `--nat-method=NONE`. As the default mode is `AUTO`, if Besu cannot self-configure it switches to `NONE` mode automatically.

This following logs means that the automatic detection has failed and that the `NONE` mode will be used.

```
INFO  | KubernetesNatManager | Starting kubernetes NAT manager.
DEBUG | KubernetesNatManager | Trying to update information using Kubernetes client SDK.
DEBUG | NatService | Nat manager failed to configure itself automatically due to the following reason Service not found. NONE mode will be used
INFO  | NetworkRunner | Starting Network.
```

# How to use the automatic configuration

To allow Besu to detect IP and Ports automatically on Kubernetes it is necessary to follow some steps

## Create a load balancer

First you need to deploy a `LoadBalancer` service. This is the service that Besu will use to recover IP and Ports.
Of course this is an example, you can choose the ports to list and the routing rules

```yaml
---
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/name: besu
    app.kubernetes.io/release: "1.0.0"
  name: besu
spec:
  ports:
  - name: "json-rpc"
    port: 8545
    targetPort: 8545
  - name: "rlpx"
    port: 30303
    targetPort: 30303
  selector:
    app.kubernetes.io/name: besu
    app.kubernetes.io/release: "1.0.0"
  type: LoadBalancer
```

For example, this service lists the rules for the different ports used by Besu (`json-rpc` and` rlpx`). The default value is used for `discovery`


## Check if the load balancer is properly deployed

You can check the service status using this command

> kubectl describe services besu   

```
Name:                     besu
Namespace:                default
Labels:                   app.kubernetes.io/name=besu
                          app.kubernetes.io/release=1.0.0
Annotations:              kubectl.kubernetes.io/last-applied-configuration:
                            {"apiVersion":"v1","kind":"Service","metadata":{"annotations":{},"labels":{"app.kubernetes.io/name":"besu","app.kubernetes.io/release":"1....
Selector:                 app.kubernetes.io/name=besu,app.kubernetes.io/release=1.0.0
Type:                     LoadBalancer
IP:                       --------
LoadBalancer Ingress:     ***<IP>***
```

You can verify that the load balancer has an IP by looking in the `LoadBalancer Ingress` line. It is necessary to wait for the load balancer to recover an IP before launching Besu.

## Deploy Besu

When the following steps are valid you can deploy Besu using a yaml as below

```yaml
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: besu-config
  labels:
    app.kubernetes.io/name: besu
    app.kubernetes.io/release: 1.0.0
data:
  BESU_LOGGING: "INFO"
  BESU_NETWORK: "dev"
  BESU_P2P_ENABLED: "true"
  BESU_RPC_HTTP_ENABLED: "true"
  BESU_RPC_HTTP_APIS: "eth,net,web3,debug,admin"
  KUBE_CONFIG_PATH: "/opt/besu/shared/kube-config"
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: besu
  labels:
    app.kubernetes.io/name: besu
    app.kubernetes.io/release: "1.0.0"
spec:
  replicas: 1
  strategy: {}
  template:
    metadata:
      creationTimestamp: null
      labels:
        app.kubernetes.io/name: besu
        app.kubernetes.io/release: "1.0.0"
    spec:
      containers:
      - name: besu
        image: "hyperledger/besu:latest"
        imagePullPolicy: Always
        ports:
          - containerPort: 8545
          - containerPort: 30303
        envFrom:
        - configMapRef:
            name: besu-config
      restartPolicy: Always
status: {}
```

# Understanding error messages

You may encounter error messages during automatic detection in a Kubernetes environment.

!!!important

      It is important to know that if you do not want to use it and you have an error message it will have no impact. You can use your Besu as usual by defining the ports and IPs via the usual options (`p2p-port`, etc.)


## Why Service not found error message ?

This message means that you did not create the load balancer properly or named it wrongly

```
INFO  | KubernetesNatManager | Starting kubernetes NAT manager.
DEBUG | KubernetesNatManager | Trying to update information using Kubernetes client SDK.
DEBUG | NatService | Nat manager failed to configure itself automatically due to the following reason Service not found. NONE mode will be used
INFO  | NetworkRunner | Starting Network.
```

## Why Forbidden error message ?

To retrieve the info from the load balancer (IP and ports), Besu must list the services via the Kubernetes API. Hence you have to give it the required permissions using [Role-based access control](https://kubernetes.io/docs/reference/access-authn-authz/rbac/). If you do not want to manage permissions you can always define the IP and ports manually using the `NONE` mode

```
INFO  | KubernetesNatManager | Starting kubernetes NAT manager.
DEBUG | KubernetesNatManager | Trying to update information using Kubernetes client SDK.
DEBUG | NatService | Nat manager failed to configure itself automatically due to the following reason Forbidden. NONE mode will be used
INFO  | NetworkRunner | Starting Network.
```

A simple solution is to call this command.

> kubectl create clusterrolebinding myapp-view-binding --clusterrole=admin --serviceaccount=default:default

!!!important

      This command should only be used in **DEV** and not in production. In production we need a finer management of permissions using Kubernetes Role-based access control

## Why Ingress not found error message ?

It is necessary to wait for the load balancer to recover an IP before launching Besu. Please see [Check that the load balancer is properly deployed](#check-that-the-load-balancer-is-properly-deployed)

```
INFO  | KubernetesNatManager | Starting kubernetes NAT manager.
DEBUG | KubernetesNatManager | Trying to update information using Kubernetes client SDK.
DEBUG | NatService | Nat manager failed to configure itself automatically due to the following reason Ingress not found. NONE mode will be used
INFO  | NetworkRunner | Starting Network.
```

## Why I still can't use the nat manager

If you cannot use automatic detection. You can still define IP and Ports manually using the `NONE` mode
