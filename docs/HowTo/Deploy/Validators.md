---
description: Configuring validators in production networks
---

# Configuring validators in a production network

As when [configuring bootnodes](Bootnodes.md):

1. Create the [node key pair](../../Concepts/Node-Keys.md) (that is, the private and public key)
   before starting the validator.
1. When creating validators in the cloud (for example, AWS or Azure), attempt to assign static IP
   addresses to them. If your network is:

    * Publicly accessible, assign an elastic IP address.
    * Internal only, specify a private IP address when you create the instance and record this IP
      address.

We recommend storing validator configuration under source control.

## Number of validators required

Ensure you configure enough validators to allow for redundancy. IBFT 2.0 tolerates `f = (n-1)/3`
faulty validators, where:

* `f` is the number of faulty validators
* `n` is the number of validators.

## Adding and removing validators

You can [vote validators in or out of the validator pool].

## Validators as bootnodes

Validators can also be bootnodes. Other than the [usual configuration for bootnodes](Bootnodes.md),
you do not need to specify any extra configuration when a validator is also a bootnode.

If you remove a validator that is also a bootnode, ensure there are enough remaining bootnodes on
the network.

<!-- Links -->
[vote validators in or out of the validator pool]: ../Configure/Consensus-Protocols/IBFT.md#adding-and-removing-validators
