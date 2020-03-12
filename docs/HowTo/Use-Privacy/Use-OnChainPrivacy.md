---
description: Use Onchain Privacy
---

# Using Onchain Privacy Groups 

Use the [web3.js-eea library](https://github.com/PegaSysEng/web3js-eea) to create and update 
membership of onchain privacy groups. 

!!! important 
    Onchain privacy groups are an early access feature in v1.4. Do not use in production networks. 

    The onchain privacy group interfaces may change between v1.4 and v1.5. There may not be an upgrade 
    path from onchain privacy groups created using v1.4 to enable use of onchain privacy group functionality 
    in future versions. 

    We do not recommend creating onchain privacy groups in a chain with existing 
    [offchain privacy groups](../../Concepts/Privacy/Privacy-Groups.md). 
    
## Enabling onchain privacy groups 

Use the [`--privacy-onchain-groups-enabled`](../../Reference/CLI/CLI-Syntax.md#privacy-onchain-groups-enabled)
command line option to enable onchain privacy groups. 
    
## Simple onchain privacy group example 

To create and find an onchain privacy group using the [web3.js-eea library](https://github.com/PegaSysEng/web3js-eea): 

1. Update the `example/keys.js` file to match your network configuration. 

2. Run: 

    ```
    node simpleOnChainPrivacy.js
    ```

    The onchain privacy group is created with two members. `findPrivacyGroup` finds and displays the 
    created privacy group. 

!!! tip 
    In the Orion logs for Orion 1 and Orion 2, `PrivacyGroupNotFound` errors are displayed. The errors 
    are expected behaviour and occur because private transactions check offchain and onchain to find
    the privacy group for a private transaction.

## Adding and removing members 

To add and remove members from an onchain privacy group, use the `addToPrivacyGroup` and 
`removeFromPrivayGroup` methods in the [web3.js-eea library](https://github.com/PegaSysEng/web3js-eea)
client library. 

!!! note 
    When a member is added, all existing group transactions are pushed to the new member and processed. 
    If there are a large number of existing transactions, adding the member may take some time. 