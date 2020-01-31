description: Protocol Upgrades      
<!--- END of page meta data -->

# Protocol upgrades in private networks 

Hardforks are the mechanism for upgrading the Ethereum protocol.  

For the Ethereum mainnet and public testnets (for example, Rinkeby) the milestone blocks are defined in 
Hyperledger Besu. Upgrading your Besu client applies the protocol upgrade (also called hardfork) for the network.

For private networks, protocol upgrades must be agreed on and co-ordinated with all network participants. 
The [milestone block](../Reference/Config-Items.md#milestone-blocks) at which to apply the protocol upgrade
[is specified in the genesis file](../HowTo/Upgrade/Upgrade-Protocol.md).

## Backwards Compatibility 

Some protocol upgrades include changes that may break existing contracts (for example, gas cost changes).
Before upgrading your protocol, review included EIPs for possible impact. A [meta EIP](https://eips.ethereum.org/meta) 
for each hardfork lists included EIPs. For example, [Istanbul](https://eips.ethereum.org/EIPS/eip-1679).

!!! tip 
    To maintain compatibility with future protocol upgrades, do not hardcode any gas price assumptions. 
     
    Implementing upgradeable contracts enables contracts to be upgraded if a protocol upgrade does include
    breaking changes. 