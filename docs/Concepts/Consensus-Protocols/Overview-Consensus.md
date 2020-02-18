description: Besu consensus protocols
<!--- END of page meta data -->

# Consensus protocols

Besu implements a number of consensus protocols, including:

* Ethash (Proof of Work)
* [Clique](../../HowTo/Configure/Consensus-Protocols/Clique.md) (Proof of Authority)
* [IBFT 2.0](../../HowTo/Configure/Consensus-Protocols/IBFT.md) (Proof of Authority)
* [Quorum IBFT 1.0](../../HowTo/Configure/Consensus-Protocols/QuorumIBFT.md) (Proof of Authority).

The `config` property in the genesis file specifies the consensus protocol for a chain. For
example:

```json tab="Ethash"
{
   "config": {
    ...
     "ethash": {
      ...
   } 
  },
  ...  
}
```

```json tab="Clique"
{
  "config": {
   ...
    "clique": {
     ...
   }
  },
  ...
}
```

```json tab="IBFT 2.0" 
{
  "config": {
   ...
    "ibft2": {
     ...
   }
  },
  ...
}
``` 

```json tab="IBFT 1.0" 
{
  "config": {
   ...
    "ibft": {
     ...
   }
  },
  ...
}
```
