description: Configuring NAT with Hyperledger Besu
<!--- END of page meta data -->

# Configuring NAT 

Use the [`--nat-method`](../../Reference/CLI/CLI-Syntax.md#nat-method) option to specify the required 
NAT method. Options are: `UPNP`, `MANUAL`, `DOCKER`, `AUTO`, and `NONE`. 

# UPnP

Specify `UPNP` to quickly allow inbound peer connections without manual router configuration. Use UPnP 
in home or small office environments where a wireless router or modem provides NAT isolation. 

UPnP automatically detects that a node is running in a UPnP environment and provides port forwarding. 
UPnP might introduce delays during node startup, especially on networks where no UPnP gateway device can be found.

!!! tip 
    UPnP support is often disabled by default in networking firmware. If disabled by default, explicitly
    enable UPnP support. 
    
When UPnP is enabled: 

* [Enode](../../Concepts/Node-Keys.md#enode-url) advertised to other nodes during discovery is the external IP address and port. 
* External address and port are returned by the [`admin_NodeInfo`](../../Reference/API-Methods.md#admin_nodeinfo)
  JSON-RPC API method for the `enode` and `listenAddr` properties. 
  
While Hyperledger Besu is running, UPnP does not support: 

* IP address changes
* Disabling UPnP. To disable UPnP, restart the node with the [`--nat-method`](../../Reference/CLI/CLI-Syntax.md#nat-method)
option set as required. 

# Manual 

Specify `MANUAL` to configure the external IP and ports to broadcast. 

When `MANUAL` is specified:  

* `--p2p-host` and `--p2p-port` define the P2P advertised host and port and are used in the enode address.    
* `--rpc-http-host` and `rpc-http-port` define the JSON-RPC advertised host and port. 

# Docker 

Specify `DOCKER` to explicitly specify Hyperledger Besu is running inside a Docker container. 
If the NAT method is `DOCKER`, the host IP is advertised not the container IP. 

The host IP is the advertised host in the [`docker run` command](https://docs.docker.com/engine/reference/commandline/run/#add-entries-to-container-hosts-file---add-host). 
If not specified in the `docker run` command, the advertised host defaults to the `--p2p-host` and `--p2p-port`. 

# Auto 

`AUTO` is the default NAT method. `AUTO` detects if Besu is running inside Docker container and:  

* If so, acts as if `DOCKER` is specified.  
* If not, acts as if `NONE` is specfied. 

# None 

Specify `NONE` to explicitly specify Besu does not use NAT. If the NAT method is `NONE` and `--p2p-host`, 
`--p2p-port`, `--rpc-http-host`, and `rpc-http-port` are specified, they are ignored in the advertised 
addresses and the default values are advertised. 


