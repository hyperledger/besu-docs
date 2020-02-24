description: Multi-tenancy
<!--- END of page meta data -->

# Multi-tenancy

By default, each participant in a privacy network uses its own Besu and Orion node.

Multi-tenancy allows multiple participants to use the same Besu and Orion node. Each participant is
a _tenant_, and the operator is the _owner_ of the Besu and Orion node.

!!! important

    The operator is responsible for
    [configuring multi-tenancy](../../Tutorials/Privacy/Configuring-Multi-Tenancy.md), and has
    access to all tenant data.

![Multi-tenancy](../../images/Multi-tenancy.png)

!!! important

    Ensure the multi-tenant Orion node client API is configured to allow access only by the
    multi-tenant Besu node. Access to your data is secured through Besu using multi-tenancy mode.

    If not configured to allow access only by the multi-tenant Besu node, other Orion clients,
    including other Besu nodes, might be able to access tenant data.
    
    To secure access, you can [configure TLS between Besu and Orion](../TLS.md) with the
    [`whitelist`](https://docs.orion.pegasys.tech/en/latest/Tutorials/TLS/#clientconnectiontlsservertrust)
    trust mode.

Multi-tenancy validates that tenants have permission to use the specified HTTP or Websocket
JSON-RPC requests, and the tenant has access to the requested privacy data. There is segregation of
private data, and each tenant uses a JWT token for authentication.

You can create the JWT token either 
[externally or internally](../../HowTo/Interact/APIs/Authentication.md).