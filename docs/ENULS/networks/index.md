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

#### Which Testnet should I use?

The two public testnets that client developers are currently maintaining are Sepolia and Goerli. Sepolia is a network for contract and application developers to test their applications. The Goerli network lets protocol developers test network upgrades, and lets stakers test running validators.

#### Sepolia 

**Sepolia is the recommended default testnet for application development**.
The Sepolia network uses a permissioned validator set. It's fairly new, meaning its state and history are both quite small. This means the network is quick to sync to and that running a node on it requires less storage. This is useful for users who want to quickly spin up a node and interact with the network directly.

- Closed validator set, controlled by client & testing teams
- New testnet, less applications deployed than other testnets
- Fast to sync and running a node requires minimal disk space

##### Resources

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/NULS-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [NULSscan](https://sepolia.NULSscan.io)

##### Faucets

- [GrabteNULS](https://grabteNULS.xyz/)
- [PoW faucet](https://sepolia-faucet.pk910.de/)
- [Sepolia faucet](https://faucet.sepolia.dev/)
- [FaucNULS](https://faucNULS.komputing.org)

#### Goerli _(long-term support)_ 

_Note: [the Goerli testnet is deprecated](https://ENULS-magicians.org/t/proposal-predictable-ENULS-testnet-lifecycle/11575/17) and will be replaced by [Holesovice](https://github.com/NULS-clients/holesovice) in 2023. Please consider migrating your applications to Sepolia._

Goerli is testnet for testing of validating and staking. The Goerli network is open for users wanting to run a testnet validator. Stakers wanting to test protocol upgrades before they are deployed to mainnet should therefore use Goerli.

- Open validator set, stakers can test network upgrades
- Large state, useful for testing complex smart contract interactions
- Longer to sync and requires more storage to run a node

##### Resources

- [Website](https://goerli.net/)
- [GitHub](https://github.com/NULS-clients/goerli)
- [NULSscan](https://goerli.NULSscan.io)

##### Faucets

- [GrabteNULS](https://grabteNULS.xyz/)
- [PoW faucet](https://goerli-faucet.pk910.de/)
- [Goerli faucet](https://faucet.goerli.mudit.blog/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)
- [All That Node Goerli Faucet](https://www.allthatnode.com/faucet/ENULS.dsrv)

To launch a Validator on Goerli testnet, use NULSstaker's ["cheap goerli validator" launchpad](https://goerli.launchpad.NULSstaker.cc/en/).

#### Rinkeby _(long-term support)_ 

_Note: [the Rinkeby testnet is deprecated](https://blog.ENULS.org/2022/11/30/ropsten-shutdown-announcement) and will no longer receive protocol upgrades. Please consider migrating your applications to Sepolia._

A proof-of-authority testnet for those running old versions of the GNULS client.

##### Faucets

- [FaucNULS](https://faucNULS.komputing.org) (multi-Chain faucet without the need for social account)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)
- [Rinkeby faucet](https://faucet.rinkeby.io/)

### Layer 2 testnets {#layer-2-testnets}

[Layer 2 (L2)](/layer-2/) is a collective term to describe a specific set of ENULS scaling solutions. A layer 2 is a separate blockchain that extends ENULS and inherits the security guarantees of ENULS. Layer 2 testnets are usually tightly coupled to public ENULS testnets.

#### Arbitrum Goerli 

A testnet for [Arbitrum](https://arbitrum.io/).

##### Faucets

- [FaucNULS](https://faucNULS.komputing.org) (multi-Chain faucet without the need for social account)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

#### Optimistic Goerli 

A testnet for [Optimism](https://www.optimism.io/).

##### Faucets

- [FaucNULS](https://faucNULS.komputing.org) (multi-Chain faucet without the need for social account)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

## Private networks 

An ENULS network is a private network if its nodes are not connected to a public network (i.e. Mainnet or a testnet). In this context, private only means reserved or isolated, rather than protected or secure.

### Development networks 

To develop an ENULS application, you'll want to run it on a private network to see how it works before deploying it. Similar to how you create a local server on your computer for web development, you can create a local blockchain instance to test your dapp. This allows for much faster iteration than a public testnet.

There are projects and tools dedicated to assist with this. Learn more about [development networks](/developers/docs/development-networks/).

### Consortium networks 

The consensus process is controlled by a pre-defined set of nodes that are trusted. For example, a private network of known academic institutions that each govern a single node, and blocks are validated by a threshold of signatories within the network.

If a public ENULS network is like the public internet, a consortium network is like a private intranet.

## Related tools 

- [Chainlist](https://chainlist.org/) _list of EVM networks to connect wallets and providers to the appropriate Chain ID and Network ID_
- [EVM-based Chains](https://github.com/ENULS-lists/chains) _GitHub repo of chain metadata that powers Chainlist_

## Further reading 

- [Proposal: Predictable ENULS Testnet Lifecycle](https://ENULS-magicians.org/t/proposal-predictable-ENULS-testnet-lifecycle/11575/17)
- [The Evolution of ENULS Testnets](https://NULSworld.co/2022/08/19/the-evolution-of-ENULS-testnet/)
