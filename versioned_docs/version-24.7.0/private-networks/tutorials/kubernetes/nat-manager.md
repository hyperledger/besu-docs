---
title: Configure Kubernetes mode in NAT manager
sidebar_position: 9
description: Tutorial to configure Kubernetes mode for Hyperledger Besu Nat Manager
tags:
  - private networks
---

# Configure Kubernetes mode in NAT Manager

Use [`--nat-method=AUTO`](../../../public-networks/how-to/connect/specify-nat.md#auto) or [`--nat-method=KUBERNETES`](../../../public-networks/how-to/connect/specify-nat.md#kubernetes) CLI options to let the Besu node automatically configure its IP address and ports.

Use mode [`--nat-method=NONE`](../../../public-networks/how-to/connect/specify-nat.md#none) to be able to set your Besu ports and IP address manually.

Default mode is [`AUTO`](../../../public-networks/how-to/connect/specify-nat.md#auto) but Besu will fallback to [`NONE`](../../../public-networks/how-to/connect/specify-nat.md#none) mode if automatic configuration fails.

:::info

The following log shows fallback to [`NONE`](../../../public-networks/how-to/connect/specify-nat.md#none) mode after an automatic detection failure.

```bash
INFO  | KubernetesNatManager | Starting kubernetes NAT manager.
DEBUG | KubernetesNatManager | Trying to update information using Kubernetes client SDK.
DEBUG | NatService | Nat manager failed to configure itself automatically due to the following reason Service not found. NONE mode will be used
INFO  | NetworkRunner | Starting Network.
```

:::

## Automatic configuration

Follow 3 steps to configure Besu for automatic IP address and ports detection on Kubernetes:

1. [Create a load balancer](#1-create-a-load-balancer)
1. [Check if the load balancer is properly deployed](#2-check-if-the-load-balancer-is-properly-deployed)
1. [Deploy Besu](#3-deploy-besu)

### 1. Create a load balancer

Deploy a `LoadBalancer` service for Besu to recover IP address and ports.

Here is an example that you can customize with your own ports and routing rules.

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

This service example lists the rules for the different ports used by Besu (`json-rpc` and` rlpx`). The default value is used for `discovery`.

### 2. Check if the load balancer is properly deployed

Verify the load balancer readiness before launching Besu.

Run `kubectl describe services besu` to check the service status.

The command should display the following information:

```bash
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

The load balancer must have an IP address displayed in place of `***<IP>***` on the `LoadBalancer Ingress` line to be ready.

Run the `kubectl describe services besu` command again until the load balancer IP address appears in the output.

### 3. Deploy Besu

When steps 1 and 2 are completed, deploy Besu using the following YAML example:

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

## Automatic detection errors

:::danger

Automatic detection error messages do not prevent you to use Besu.

Try the fix indicated for each error or use [`--nat-method=KUBERNETES`](../../../public-networks/how-to/connect/specify-nat.md#kubernetes) CLI option and [set IP address and port manually](../../../public-networks/how-to/connect/configure-ports.md).

:::

Possible errors messages for Kubernetes automatic detection failure:

- [`Service not found`](#service-not-found-error-message)
- [`Forbidden`](#forbidden-error-message)
- [`Ingress not found`](#ingress-not-found-error-message)

### `Service not found` error message

- **Error message:** `Nat manager failed to configure itself automatically due to the following reason Service not found. NONE mode will be used`
- **Cause:** load balancer did start correctly or has the incorrect name.
- **Fix:** check and modify load balancer YAML configuration and restart service.

:::info Example error log

    ```
    INFO  | KubernetesNatManager | Starting kubernetes NAT manager.
    DEBUG | KubernetesNatManager | Trying to update information using Kubernetes client SDK.
    DEBUG | NatService | Nat manager failed to configure itself automatically due to the following reason Service not found. NONE mode will be used
    INFO  | NetworkRunner | Starting Network.
    ```

:::

### `Forbidden` error message

- **Error message:** `Nat manager failed to configure itself automatically due to the following reason Forbidden. NONE mode will be used`
- **Cause:** Besu don't have permission to list the services via the Kubernetes API to retrieve IP address and ports from the load balancer.
- **Fix:** Give it the required permissions using [Role-based access control](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

  If you can't manage permissions, define the IP address and ports manually with [`NONE`](../../../public-networks/how-to/connect/specify-nat.md#none) mode

:::info Example error log

    ```
    INFO  | KubernetesNatManager | Starting kubernetes NAT manager.
    DEBUG | KubernetesNatManager | Trying to update information using Kubernetes client SDK.
    DEBUG | NatService | Nat manager failed to configure itself automatically due to the following reason Forbidden. NONE mode will be used
    INFO  | NetworkRunner | Starting Network.
    ```

:::

:::tip

For development environment, the permission issue can be fixed by running `kubectl create clusterrolebinding myapp-view-binding --clusterrole=admin --serviceaccount=default:default`

This command should only be used on development environment and not in production environment.

In production environment, require a finer management of permissions using Kubernetes [Role-based access control](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

:::

### `Ingress not found` error message

- **Error message:** `Nat manager failed to configure itself automatically due to the following reason Ingress not found. NONE mode will be used`
- **Cause:** Load balancer did not finish to recover an IP address.
- **Fix:** [Check that the load balancer is properly deployed](#2-check-if-the-load-balancer-is-properly-deployed) before launching Besu.

:::info Example error log

    ```
    INFO  | KubernetesNatManager | Starting kubernetes NAT manager.
    DEBUG | KubernetesNatManager | Trying to update information using Kubernetes client SDK.
    DEBUG | NatService | Nat manager failed to configure itself automatically due to the following reason Ingress not found. NONE mode will be used
    INFO  | NetworkRunner | Starting Network.
    ```

:::
