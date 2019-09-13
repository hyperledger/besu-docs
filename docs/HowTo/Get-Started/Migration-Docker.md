description: Migrating from pre v1.2 Docker image to v1.2 Docker image  
<!--- END of page meta data -->

# Migrating from pre-1.2 Docker Image to 1.2+

## Before v1.2

The Hyperledger Besu Docker image had an entry-script that automatically added a number of options 
to the Besu command line. The options could not be set using command line arguments.  

The options automatically added to the Besu command line for the Besu Docker image before v1.2 were: 

* If the file existed: 
    
    - [`--config-file /etc/besu/besu.conf`](../../Reference/CLI/CLI-Syntax.md#config-file)
    - [`--genesis-file /etc/besu/genesis.json`](../../Reference/CLI/CLI-Syntax.md#genesis-file)
    - [`--rpc-http-authentication-credentials-file /etc/besu/rpc_http_auth_config.toml`](../../Reference/CLI/CLI-Syntax.md#rpc-http-authentication-credentials-file) 
    - [`--rpc-ws-authentication-credentials-file /etc/besu/rpc_ws_auth_config.toml`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-authentication-credentials-file)
    - [`--privacy-public-key-file /etc/besu/privacy_public_key`](../../Reference/CLI/CLI-Syntax.md#privacy-public-key-file)
    - [`--permissions-nodes-config-file /etc/besu/permissions_config.toml`](../../Reference/CLI/CLI-Syntax.md#permissions-nodes-config-file)
    - [`--permissions-accounts-config-file /etc/besu/permissions_config.toml`](../../Reference/CLI/CLI-Syntax.md#permissions-accounts-config-file)

* [`--data-path /var/lib/besu`](../../Reference/CLI/CLI-Syntax.md#data-path) 
* [`--rpc-http-host=0.0.0.0`](../../Reference/CLI/CLI-Syntax.md#rpc-http-host)
* [`--rpc-http-port=8545`](../../Reference/CLI/CLI-Syntax.md#rpc-http-port)
* [`--rpc-ws-host=0.0.0.0`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-host)
* [`--rpc-ws-port=8546`](../../Reference/CLI/CLI-Syntax.md#rpc-ws-port)
* [`--p2p-host=0.0.0.0`](../../Reference/CLI/CLI-Syntax.md#p2p-host)
* [`--p2p-port=30303`](../../Reference/CLI/CLI-Syntax.md#p2p-port)

The [`--node-private-key-file`](../../Reference/CLI/CLI-Syntax.md#node-private-key-file) command line option
was not available and the node key was always read from the data path. 

## From v1.2 

All file options (for example, [`--config-file`](../../Reference/CLI/CLI-Syntax.md#config-file)) no longer 
have a default. Add the relevant command line options to your Besu command line and specify the file path. 

The [`--data-path`](../../Reference/CLI/CLI-Syntax.md#data-path) default is now `/opt/besu`. 

The [`--node-private-key-file`](../../Reference/CLI/CLI-Syntax.md#node-private-key-file) default is 
now `/opt/besu/key`. 

!!! important 
    Do not mount a volume at the default data path (`/opt/besu`). Mounting a volume at the default 
    data path path interferes with the operation of Besu and prevents Besu from safely launching. 
    
    To run a node that maintains the node state (key and database), [`--data-path` must be set to a location
    other than `/opt/besu` and a storage volume mounted at that location](Run-Docker-Image.md#starting-besu). 

The host and port options continue to default to the previously set values. 

!!! tip
    All command line options can be set using [environment variables](../../Reference/CLI/CLI-Syntax.md#besu-environment-variables). 


