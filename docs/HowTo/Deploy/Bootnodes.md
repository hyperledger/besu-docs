description: Configuring bootnodes in production networks
<!--- END of page meta data -->

# Configuring bootnodes in a production network

A network must have at least one operating bootnode. To allow for continuity in the event of
failure, configure two or more bootnodes.

We do not recommend putting bootnodes behind a load balancer because the
[enode](../../Concepts/Node-Keys.md#enode-url) relates to the node public key, IP address, and
discovery ports. Any changes to a bootnode enode prevents other nodes from being able to establish
a connection with the bootnode. This is why we recommend putting more bootnodes on the network
itself.

To ensure that a bootnode enode does not change when recovering from a complete bootnode failure:

1. Create the [node key pair](../../Concepts/Node-Keys.md) (that is, the private and public key)
   before starting the bootnode.
1. When creating bootnodes in the cloud (for example, AWS and Azure), attempt to assign a static IP
   address to them. If your network is:

    * Publicly accessible, assign an elastic IP.
    * Internal only, specify a private IP address when you create the instance and record this IP
      address.

We recommend that you store the bootnode configuration under source control.

## Specifying bootnodes

To allow for failure, specify all bootnodes on the command line (even to the bootnodes themselves).

!!! example

    If your network has two bootnodes, pass the following parameter to all nodes, including the
    bootnodes.

    ```bash
    --bootnodes=enode://<publicKeyBootnode1>@<ipBootnode1>:30303,<publicKeyBootnode2>@<ipBootnode2>:30303
    ```

!!! tip

    Having each bootnode list the other bootnodes increases the speed of discovery. Nodes ignore
    their own enode in the bootnodes list so it is not required to specify different bootnode lists
    to the bootnodes themselves.

## Adding and removing bootnodes

Adding new bootnodes is a similar process to creating bootnodes. After creating the bootnodes and
adding them to the network,update the [`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes)
command line option for each node to include the new bootnodes.

When adding bootnodes, you do not need to restart running nodes. By updating the
[`--bootnodes`](../../Reference/CLI/CLI-Syntax.md#bootnodes) option, the next time you restart the
nodes (for example, when [upgrading](../Upgrade/Upgrade-Node.md)), the nodes connect to the new
bootnodes.
