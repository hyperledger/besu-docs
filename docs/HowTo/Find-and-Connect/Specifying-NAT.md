description: Configuring NAT with Hyperledger Besu
<!--- END of page meta data -->

# Configuring NAT 

Use the [`--nat-method`](../../Reference/CLI/CLI-Syntax.md#nat-method) option to specify the 
NAT method. Options are: `UPNP`, `MANUAL`, `DOCKER`, `AUTO`, and `NONE`. 

The [enode](../../Concepts/Node-Keys.md#enode-url) advertised to other nodes during discovery is the 
external IP address and port. The [`admin_nodeInfo`](../../Reference/API-Methods.md#admin_nodeinfo) 
JSON-RPC API method returns the external address and port for the `enode` and `listenAddr` properties. 
  
While Hyperledger Besu is running, the following are not supported: 

* IP address changes
* Changing NAT methods. To change the NAT method, restart the node with the [`--nat-method`](../../Reference/CLI/CLI-Syntax.md#nat-method)
option set. 

## UPnP

Specify `UPNP` to quickly allow inbound peer connections without manual router configuration. Use UPnP 
in home or small office environments where a wireless router or modem provides NAT isolation. 

UPnP automatically detects if a node is running in a UPnP environment and provides port forwarding. 
UPnP might introduce delays during node startup, especially on networks where no UPnP gateway device can be found.

!!! tip 
    UPnP support is often disabled by default in networking firmware. If disabled by default, you must
    explicitly enable UPnP support. 

## Manual 

Specify `MANUAL` to explicitly configure the external IP address and ports to advertise. 

When `MANUAL` is specified:  

* [`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host) and [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port)
define the advertised host and port for the P2P service.    
* [`--rpc-http-host`](../../Reference/CLI/CLI-Syntax.md#rpc-http-host) and [`rpc-http-port`](../../Reference/CLI/CLI-Syntax.md#rpc-http-port) 
define the advertised host and port for the JSON-RPC service. 

## Docker 

Specify `DOCKER` to explicitly specify Hyperledger Besu is running inside a Docker container. 
When `DOCKER` is specified, the host IP address is advertised not the container IP address. 

The host IP is the advertised host specified in the [`docker run` command](https://docs.docker.com/engine/reference/commandline/run/#add-entries-to-container-hosts-file---add-host). 
If not specified in the `docker run` command, the advertised host defaults to [`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host) 
and [`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port). 

## Auto 

`AUTO` is the default NAT method. `AUTO` detects if Besu is running inside Docker container. If 
inside a Docker container, acts as if [`DOCKER`](#docker) is specified. Otherwise, acts as if 
[`NONE`](#none) is specified. 

## None 

Specify `NONE` to explicitly specify Besu does not use NAT. If the NAT method is `NONE` and [`--p2p-host`](../../Reference/CLI/CLI-Syntax.md#p2p-host), 
[`--p2p-port`](../../Reference/CLI/CLI-Syntax.md#p2p-port), [`--rpc-http-host`](../../Reference/CLI/CLI-Syntax.md#rpc-http-host), 
and [`rpc-http-port`](../../Reference/CLI/CLI-Syntax.md#rpc-http-port) are specified, they are 
ignored in the advertised addresses and the default values are advertised. 


