description: Sample Load Balancers 
<!--- END of page meta data -->

# Sample Load Balancer Configurations 

## AWS 

For AWS, we recommend the Classic Load Balancer. The Classic Load Balancer routes layer 4 and 7. Register
the Hyperledger Besu instances to the load balancer and use the [liveness endpoint](../../Interact/APIs/Using-JSON-RPC-API.md#readiness-and-liveness-endpoints)
for health checks. 

Another alterntive is the Application Load Balancer:
 
* Configure 1 target group with n nodes 
* Use the [liveness endpoint](../../Interact/APIs/Using-JSON-RPC-API.md#readiness-and-liveness-endpoints) for health checks
* Register the Besu instances multiple times with different ports. Similar to configuring microservices 
on Elastic Container Service (ECS) or Elastic Kubernetes Service (EKS) 
* Configure multiple listeners with one per port you're using and route to the target group. 

## Elastic Kubernetes Service  

For Elastic Kubernetes Service (AWS Kubernetes service) use the same load balancer configuration as when
running nodes in Kubernetes. Use labels to specify nodes for the load balanced group. 

## Manual Configurations 

Where applicable, we strongly recommend using service discovery. That is, pair your load balancer 
configuration with something that dynamically detects new nodes and failures. 

For nginx use multiple upstreams (one for each port). Pair each upstream with a separate server block. 

!!! example "Upstreams paired with server blocks"
    ```
    upstream discovery_tcp_30303 {
        server 10.0.1.1:30303;
        server 10.0.1.2:30303;
    }

    upstream rpc_tcp_8545 {
        server 10.0.1.1:8545;
        server 10.0.1.2:8545;
    }

    server {
        listen 30303;
        server_name some.host;
        location / {
            proxy_pass http://discovery_tcp_30303;
        }
    }

    server {
        listen 8545;
        server_name some.host;
        location / {
            proxy_pass http://rpc_tcp_8545;
        }
    }
    ...
    ```

For HAProxy, create multiple backend and frontend sets.  

!!! example "Multiple backend and frontend sets"
    ```
    frontend discovery-tcp-30303
        bind *:30303
        acl ....
        ...
        default_backend back-discovery-tcp-30303

    frontend rpc-tcp-8545
        bind *:8545
        acl ....
        ...
        default_backend back-rpc-tcp-8545

    backend back-discovery-tcp-30303
        balance leastconn
        server node-01 10.0.1.1:30303 weight 1 check
        server node-02 10.0.1.2:30303 weight 1 check
        option ....
        timeout server 600s                 

    backend back-rpc-tcp-8545
        balance leastconn
        server node-01 10.0.1.1:8545 weight 1 check
        server node-02 10.0.1.2:8545 weight 1 check
        option ....
        timeout server 600s 
    ...                
    ```


