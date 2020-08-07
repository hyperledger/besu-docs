---
description: Mining overview
---

# Mining

Hyperledger Besu supports CPU and GPU mining, which are
[configured using command line options](../HowTo/Configure/Configure-Mining.md).

GPU mining support testing used [Ethminer](https://github.com/ethereum-mining/ethminer) with the
`stratum+tcp` and `getwork` schemes.

Ethminer has been used with Hyperledger Besu to mine blocks on the [Ropsten testnet](https://ropsten.etherscan.io/address/0x2f14582947E292a2eCd20C430B46f2d27CFE213c#mine), [ETC mainnet (uncle block only)](https://etc.tokenview.com/en/uncleblock/10555173) and [Mordor ETC testnet](https://blockscout.com/etc/mordor/address/0x2f14582947E292a2eCd20C430B46f2d27CFE213c/validations).

!!! note
    Some mining software supports the `getwork` scheme as the `http` scheme.