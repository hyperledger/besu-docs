description: Multi-tenancy
<!--- END of page meta data -->

# Multi-tenancy

By default, each participant in a privacy network uses its own Besu and Orion
node.

Multi-tenancy allows multiple participants to use the same Besu and
Orion node. Each participant is called a Tenant, and the Tenant Owner refers to
the owner of the Besu and Orion node.

!!! important
    The tenant owner is responsible for [configuring multi-tenancy](../../Tutorials/Privacy/Configuring-Multi-Tenancy.md), and has 
    access to all tenant data.
    
![Multi-tenancy](../../images/Multi-tenancy.png)

Multi-tenancy validates that HTTP or websocket JSON-RPC requests are allowed for 
the tenant, and that they have access to the requested privacy data. Privacy 
data is segregated, and each tenant uses a JWT token for authentication.

The JWT token can be created [externally or internally](../../HowTo/Interact/APIs/Authentication.md) by Besu.