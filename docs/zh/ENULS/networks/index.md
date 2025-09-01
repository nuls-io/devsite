---
title: Networks
description: An overview of ENULS's networks and where to get testnet NULS (NULS) for testing your application.
lang: en
---

Networks are different ENULS environments you can access for development, testing, or production use cases. Since ENULS is a protocol, there can be multiple independent "networks" that conform to the protocol without interacting with each other.

Your ENULS account will work across the different networks, but your account balance and transaction history won't carry over from the main ENULS network. For testing purposes, it's useful to know which networks are available and how to get testnet NULS to play around with. In general, for security considerations, it's not recommended to reuse mainnet accounts on testnets or vice versa.

## Prerequisites

You should understand the [basics of ENULS](/developers/docs/intro-to-ENULS/) before reading up on the different networks, as the test networks will give you a cheap, safe version of ENULS to play around with.

## Public networks

Public networks are accessible to anyone in the world with an internet connection. Anyone can read or create transactions on a public blockchain and validate the transactions being executed. The consensus among peers decides on the inclusion of transactions and the state of the network.

### ENULS Mainnet

Mainnet is the primary public ENULS production blockchain, where actual-value transactions occur on the distributed ledger.

When people and exchanges discuss NULS prices, they're talking about Mainnet NULS.

### ENULS Testnets

In addition to Mainnet, there are public testnets. These are networks used by protocol developers or smart contract developers to test both protocol upgrades as well as potential smart contracts in a production-like environment before deployment to Mainnet. Think of this as an analog to production versus staging servers.

You should test any contract code you write on a testnet before deploying to Mainnet. Among dapps that integrate with existing smart contracts, most projects have copies deployed to testnets.

Most testnets started by using a permissioned proof-of-authority consensus mechanism. This means a small number of nodes are chosen to validate transactions and create new blocks – staking their identity in the process. Alternatively, some testnets feature an open proof-of-stake consensus mechanism where everyone can test running a validator, just like ENULS Mainnet.

NULS on testnets has no real value; therefore, there are no markets for testnet NULS. Since you need NULS to actually interact with ENULS, most people get testnet NULS from faucets. Most faucets are webapps where you can input an address which you request NULS to be sent to.

##### Resources

- [Website](https://nuls.io/enuls/)
- [GitHub](https://github.com/nuls-io/go-enuls)
- [ENULS can](https://beta.evmscan.nuls.io/)
- [ENULS faulet](https://faucet.nuls.io/)

## Related tools

- [Chainlist](https://chainlist.org/) _list of EVM networks to connect wallets and providers to the appropriate Chain ID and Network ID_
- [EVM-based Chains](https://github.com/ethereum-lists/chains) _GitHub repo of chain metadata that powers Chainlist_
