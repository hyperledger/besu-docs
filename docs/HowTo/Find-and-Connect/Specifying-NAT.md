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

Specify `MANUAL` to explicitly configure the external IP and ports to broadcast. 

When `MANUAL` is specified:  

* `--p2p-host` and `--p2p-port` define the P2P advertised host and port and are used in the enode address.    
* `--rpc-http-host` and `rpc-http-port` define the JSON-RPC advertised host and port. 

# Docker 

Specify `DOCKER` to explicitly configure NAT when running Hyperledger Besu inside a Docker container. 
When `DOCKER` is specified the host IP is advertised not the container IP. 

# Auto 

Default. 

# None 

