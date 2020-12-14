---
description: Deploying Hyperledger Besu Permissioning Management Dapp for production
---

# Deploying the Hyperledger Besu Permissioning Management Dapp for production

To deploy the Permissioning Management Dapp for production:

1. Retrieve the most recent release (tarball or zip) from the [projects release page].

1. Unpack the distribution into a directory available to your Web server.

1. In the root of the unpack directory, add a file called `config.json` replacing the placeholders
   shown below.

    !!!example "config.json"

         ```json

         {
           "accountIngressAddress":  "<Address of the account ingress contract>",
           "nodeIngressAddress": "<Address of the node ingress contract>",
           "networkId": "<ID of your Ethereum network>"
         }
         ```

1. On your Web server, host the contents of the directory as static files and direct root requests
   to `index.html`.

## Starting a production permissioned network

Follow the procedure as for [Getting Started with Onchain Permissioning], but do not perform the
steps using `yarn` to install, build, and start the development server. Instead, follow the
procedure above to deploy the Permissioning Management Dapp to your Web server.

<!-- Links -->
[projects release page]: https://github.com/PegaSysEng/permissioning-smart-contracts/releases/latest
[Getting Started with Onchain Permissioning]: ../../Tutorials/Permissioning/Getting-Started-Onchain-Permissioning.md
