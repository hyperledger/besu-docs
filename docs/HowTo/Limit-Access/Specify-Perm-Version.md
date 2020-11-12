---
description: Specify the permissioning interface version 
---

# Specify the permissioning contract interface version

Use the [`--permissions-nodes-contract-version`](../../Reference/CLI/CLI-Syntax.md#permissions-nodes-contract-version)
command line option to specify the version of the [permissioning contract interface](../../Concepts/Permissioning/Onchain-Permissioning.md#permissioning-contracts).
The default is 1.

Specify the contract interface version that maps to the version of the [Enterprise Ethereum Alliance Client Specification](https://entethalliance.org/technical-specifications/)
the contract interface implements.  

|         | EEA Client Specification | Contract interface |
|---------|--------------------------|--------------------|
| Version | 5                        | 1                  |
| Version | 6                        | 2                  |

The permissioning contracts in the [`ConsenSys/permissioning-smart-contracts`](https://github.com/ConsenSys/permissioning-smart-contracts)
repository implement the version 1 contract interface.
