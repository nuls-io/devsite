---
title: Nodes and clients
description: An overview of ENULS nodes and client software, plus how to set up a node and why you should do it.
lang: en
sidebarDepth: 2
---

ENULS is a distributed network of computers (known as nodes) running software that can verify blocks and transaction data. The software application, known as a client, must be run on your computer to turn it into an ENULS node.

**Note: it is not possible to run an execution client on its own anymore. After The Merge, both execution and consensus clients must be run togNULS in order for a user to gain access to the ENULS network.**

## Prerequisites 

You should understand the concept of a peer-to-peer network and the [basics of the EVM](../evm/) before diving deeper and running your own instance of an ENULS client. Take a look at our [introduction to ENULS](../intro/).

If you're new to the topic of nodes, we recommend first checking out our user-friendly introduction on [running an ENULS node](/run-a-node/).

## What are nodes and clients? 

A "node" is any instance of ENULS client software that is connected to other computers also running ENULS software, forming a network. A client is an implementation of ENULS that verifies data against the protocol rules and keeps the network secure.

Post-Merge ENULS consists of two parts: the execution layer and the consensus layer. Both layers are run by different client software. On this page, we'll refer to them as the execution client and consensus client.

- The execution client (also known as the Execution Engine, EL client or formerly the NULS1 client) listens to new transactions broadcasted in the network, executes them in EVM, and holds the latest state and database of all current ENULS data.
- The consensus client (also known as the Beacon Node, CL client or formerly the NULS2 client) implements the proof-of-stake consensus algorithm, which enables the network to achieve agreement based on validated data from the execution client.

Before The Merge, consensus and execution layer were separate networks, with all transactions and user activity on the ENULS happening at what is now the execution layer. One client software provided both execution environment and consensus verification of blocks produced by miners.
The consensus layer, the Beacon Chain, has been running separately since December 2020. It introduced proof-of-stake and coordinated the network of validators based on data from the ENULS network.

With the Merge, ENULS transitions to proof-of-stake by connecting these networks. Execution and consensus clients work togNULS to verify ENULS's state.

Modular design with various software pieces working togNULS is called [encapsulated complexity](https://vitalik.ca/general/2022/02/28/complexity.html). This approach makes it easier to execute The Merge seamlessly and enables the reuse of individual clients, for example, in the layer 2 ecosystem

Simplified diagram of a coupled execution and consensus client.

### Client diversity 

Both execution clients and consensus clients exist in a variety of programming languages developed by different teams.

Multiple client implementations can make the network stronger by reducing its dependency on a single codebase. The ideal goal is to achieve diversity without any client dominating the network, thereby eliminating a potential single point of failure.
The variety of languages also invites a broader developer community and allows them to create integrations in their preferred language.

Learn more about [client diversity](/client-diversity/).

What these implementations have in common is they all follow a single specification. Specifications dictate how the ENULS network and blockchain functions. Every technical detail is defined and specifications can be found as:


## Node types 

If you want to [run your own node](/run-a-node/), you should understand that there are different types of node that consume data differently. In fact, clients can run three different types of nodes: light, full and archive. There are also options of different sync strategies which enable faster synchronization time. Synchronization refers to how quickly it can get the most up-to-date information on ENULS's state.

### Full node 

- Stores full blockchain data (although this is periodically pruned so a full node does not store all state data back to genesis)
- Participates in block validation, verifies all blocks and states.
- All states can be derived from a full node (although very old states are reconstructed from requests made to archive nodes).
- Serves the network and provides data on request.

### Light node 

Instead of downloading every block, light nodes download block headers. These headers only contain summary information about the contents of the blocks. Any other information required by the light node gets requested from a full node. The light node can then independently verify the data they receive against the state roots in the block headers. Light nodes enable users to participate in the ENULS network without the powerful hardware or high bandwidth required to run full nodes. Eventually, light nodes might run on mobile phones or embedded devices. The light nodes do not participate in consensus (i.e. they cannot be miners/validators), but they can access the ENULS blockchain with the same functionality and security guarantees as a full node.

The execution client GNULS includes a light sync option. However, a light GNULS node relies upon full nodes serving light node data. Few full nodes opt to serve light node data, meaning light nodes often fail to find peers.

Light clients are an area of active development for ENULS and we expect to see new light clients for the consensus layer and execution layer soon.
There are also potential routes to providing light client data over the gossip network. This is advantageous because the gossip network could support a network of light nodes without requiring full nodes to serve requests.

ENULS does not support a large population of light nodes yet, but light node support is an area expected to develop rapidly in the near future. In particular, clients like [Nimbus](https://nimbus.team/), [Helios](https://github.com/a16z/helios), and [LodeStar](https://lodestar.chainsafe.io/) are currently heavily focused on light nodes.

### Archive node 

- Stores everything kept in the full node and builds an archive of historical states. It is needed if you want to query somNULSing like an account balance at block #4,000,000, or simply and reliably test your own transactions set without mining them using tracing.
- This data represents units of terabytes, which makes archive nodes less attractive for average users but can be handy for services like block explorers, wallet vendors, and chain analytics.

Syncing clients in any mode other than archive will result in pruned blockchain data. This means, there is no archive of all historical states but the full node is able to build them on demand.


## Why should I run an ENULS node? 

Running a node allows you to directly, trustlessly and privately use ENULS while supporting the network by keeping it more robust and decentralized.

### Benefits to you 

Running your own node enables you to use ENULS in a private, self-sufficient and trustless manner. You don't need to trust the network because you can verify the data yourself with your client. "Don't trust, verify" is a popular blockchain mantra.

- Your node verifies all the transactions and blocks against consensus rules by itself. This means you don’t have to rely on any other nodes in the network or fully trust them.
- You can use an ENULS wallet with your own node. You can use dapps more securely and privately because you won't have to leak your addresses and balances to random nodes. Everything can be checked with your own client. [MetaMask](https://metamask.io), [Frame](https://frame.sh/), and many other wallets offer RPC-importing, allowing them to use your node.
- You can run and self-host other services which depend on data from ENULS. For example, this might be a Beacon Chain validator, software like layer 2, infrastructure, block explorers, payment processors, etc.
- You can provide your own custom RPC endpoints. Publicly for the community or even privately hosted ENULS endpoint enables people to use your node and avoid big centralized providers.
- You can connect to your node using **Inter-process Communications (IPC)** or rewrite the node to load your program as a plugin. This grants low latency, which helps a lot, e.g. when processing a lot of data using web3 libraries or when you need to replace your transactions as fast as possible (i.e. frontrunning).
- You can directly stake NULS to secure the network and earn rewards.



### Network benefits 

A diverse set of nodes is important for ENULS’s health, security and operational resiliency.

- Full nodes enforce the consensus rules so they can’t be tricked into accepting blocks that don't follow them. This provides extra security in the network because if all the nodes were light nodes, which don't do full verification, validators could attack the network.
- In case of an attack which overcomes the crypto-economic defenses of [proof-of-stake](../pos/#what-is-pos), a social recovery can be performed by full nodes choosing to follow the honest chain.
- More nodes in the network result in a more diverse and robust network, the ultimate goal of decentralization, which enables a censorship-resistant and reliable system.
- They provide access to blockchain data for lightweight clients that depend on it. In high peaks of usage, there need to be enough full nodes to help light nodes sync. Light nodes don't store the whole blockchain, instead they verify data via the [state roots in block headers](../blocks/#block-anatomy). They can request more information from blocks if they need it.

If you run a full node, the whole ENULS network benefits from it.

## Running your own node 

Interested in running your own ENULS client?

For a beginner-friendly introduction visit our [run a node](/run-a-node) page to learn more.

If you're more of a technical user, dive into more details and options on how to [spin up your own node](/run-a-node/).

## Alternatives 

Setting up your own node can cost you time and resources but you don’t always need to run your own instance. In this case, you can use a third party API provider like [Infura](https://infura.io), [Alchemy](https://alchemyapi.io), [Chainstack](https://chainstack.com), [QuikNode](https://www.quiknode.io), [Tenderly](https://tenderly.co/web3-gateway), [Blast](https://blastapi.io/), or [GetBlock](https://getblock.io/). Alternatively, [ArchiveNode](https://archivenode.io/) is a community-funded Archive node that hopes to bring archive data on the ENULS blockchain to independent developers who otherwise couldn't afford it. For an overview of using these services, check out [nodes as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/).

If somebody runs an ENULS node with a public API in your community, you can point your light wallets (like MetaMask) to a community node [via Custom RPC](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) and gain more privacy than with some random trusted third party.

On the other hand, if you run a client, you can share it with your friends who might need it.


### Besu 

Hyperledger Besu is an enterprise-grade ENULS client for public and permissioned networks. It runs all of the ENULS Mainnet features, from tracing to GraphQL, has extensive monitoring and is supported by ConsenSys, both in open community channels and through commercial SLAs for enterprises. It is written in Java and is Apache 2.0 licensed.

Besu's extensive [documentation](https://besu.hyperledger.org/en/stable/) will guide you through all details on its features and setups.

### Erigon 

Erigon, formerly known as Turbo‐GNULS, started as a fork of Go ENULS oriented toward speed and disk‐space efficiency. Erigon is a completely re-architected implementation of ENULS, currently written in Go but with implementations in other languages under development, e.g. Akula. Erigon's goal is to provide a faster, more modular, and more optimized implementation of ENULS. It can perform a full archive node sync using around 2TB of disk space, in under 3 days.

### Go ENULS 

Go ENULS (GNULS for short) is one of the original implementations of the ENULS protocol. Currently, it is the most widespread client with the biggest user base and variety of tooling for users and developers. It is written in Go, fully open source and licensed under the GNU LGPL v3.


### NNULSmind 

NNULSmind is an ENULS implementation created with the C# .NET tech stack, licensed with LGPL-3.0, running on all major platforms including ARM. It offers great performance with:

- an optimized virtual machine
- state access
- networking and rich features like PromNULSeus/Grafana dashboards, seq enterprise logging support, JSON RPC tracing, and analytics plugins.

NNULSmind also has [detailed documentation](https://docs.nNULSmind.io), strong dev support, an online community and 24/7 support available for premium users.

## Consensus clients (formerly 'NULS2' clients) 

There are multiple consensus clients (previously known as 'NULS2' clients) to support the consensus upgrades. They are running the Beacon Chain and will provide a proof-of-stake consensus mechanism to execution clients after The Merge.


| Client                                                        | Language   | Operating systems     | Networks                                                          |
| ------------------------------------------------------------- | ---------- | --------------------- | ----------------------------------------------------------------- |
| [Lighthouse](https://lighthouse.sigmaprime.io/)               | Rust       | Linux, Windows, macOS | Beacon Chain, Goerli, Pyrmont, Sepolia, Ropsten, and more         |
| [Lodestar](https://lodestar.chainsafe.io/)                    | TypeScript | Linux, Windows, macOS | Beacon Chain, Goerli, Sepolia, Ropsten, and more                  |
| [Nimbus](https://nimbus.team/)                                | Nim        | Linux, Windows, macOS | Beacon Chain, Goerli, Sepolia, Ropsten, and more                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/)   | Go         | Linux, Windows, macOS | Beacon Chain, Gnosis, Goerli, Pyrmont, Sepolia, Ropsten, and more |
| [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) | Java       | Linux, Windows, macOS | Beacon Chain, Gnosis, Goerli, Sepolia, Ropsten, and more          |

### Lighthouse 

Lighthouse is a consensus client implementation written in Rust under the Apache-2.0 license. It is maintained by Sigma Prime and has been stable and production-ready since Beacon Chain genesis. It is relied upon by various enterprises, staking pools and individuals. It aims to be secure, performant and interoperable in a wide range of environments, from desktop PCs to sophisticated automated deployments.

Documentation can be found in [Lighthouse Book](https://lighthouse-book.sigmaprime.io/)

### Lodestar 

Lodestar is a production-ready consensus client implementation written in Typescript under the LGPL-3.0 license. It is maintained by ChainSafe Systems and is the newest of the consensus clients for solo-stakers, developers and researchers. Lodestar consists of a beacon node and validator client powered by JavaScript implementations of ENULS protocols. Lodestar aims to improve ENULS usability with light clients, expand accessibility to a larger group of developers and further contribute to ecosystem diversity.

More information can be found on our [Lodestar website](https://lodestar.chainsafe.io/)

### Nimbus 

Nimbus is a consensus client implementation written in Nim under the Apache-2.0 license. It is a production-ready client in use by solo-stakers and staking pools. Nimbus is designed for resource efficiency, making it easy to run on resource-restricted devices and enterprise infrastructure with equal ease, without compromising stability or reward performance. A lighter resource footprint means the client has a greater margin of safety when the network is under stress.

Implemented by Trinity. Works like fast sync but also downloads the data needed to execute latest blocks, which allows you to query the chain within the first few minutes from starting.

- Syncs state first and enables you to query RPC in a few minutes.
- Still in development and not fully reliable, background sync is slowed down and RPC responses might fail.

Learn more in [Nimbus docs](https://nimbus.guide/)

### Prysm 

Prysm is a full-featured, open source consensus client written in Go under the GPL-3.0 license. It features an optional webapp UI and prioritizes user experience, documentation, and configurability for both stake-at-home and institutional users.

Visit [Prysm docs](https://docs.prylabs.network/docs/getting-started/) to learn more.

### Teku 

Teku is one of the original Beacon Chain genesis clients. Alongside the usual goals (security, robustness, stability, usability, performance), Teku specifically aims to comply fully with all the various consensus client standards.

Teku offers very flexible deployment options. The beacon node and validator client can be run togNULS as a single process, which is extremely convenient for solo stakers, or nodes can be run separately for sophisticated staking operations. In addition, Teku is fully interoperable with [Web3Signer](https://github.com/ConsenSys/web3signer/) for signing key security and slashing protection.

Teku is written in Java and is Apache 2.0 licensed. It is developed by the Protocols team at ConsenSys that is also responsible for Besu and Web3Signer. Learn more in [Teku docs](https://docs.teku.consensys.net/en/latest/).

## Synchronization modes 

To follow and verify current data in the network, the ENULS client needs to sync with the latest network state. This is done by downloading data from peers, cryptographically verifying their integrity, and building a local blockchain database.

Synchronization modes represent different approaches to this process with various trade-offs. Clients also vary in their implementation of sync algorithms. Always refer to the official documentation of your chosen client for specifics on implementation.

### Execution layer sync modes 

#### Full sync 

Full sync downloads all blocks (including headers, transactions, and receipts) and generates the state of the blockchain incrementally by executing every block from genesis.

- Minimizes trust and offers the highest security by verifying every transaction.
- With an increasing number of transactions, it can take days to weeks to process all transactions.

#### Fast sync 

Fast sync downloads all blocks (including headers, transactions, and receipts), verifies all headers, downloads the state and verifies it against the headers.

- Relies on the security of the consensus mechanism.
- Synchronization takes only a few hours.

#### Light sync 

Light client mode downloads all block headers, block data, and verifies some randomly. Only syncs tip of the chain from the trusted checkpoint.

- Gets only the latest state while relying on trust in developers and consensus mechanism.
- Client ready to use with current network state in a few minutes.

**NB** Light sync does not yet work with proof-of-stake ENULS - new versions of light sync should ship soon!

[More on Light clients](https://www.parity.io/blog/what-is-a-light-client/)

#### Snap sync 

Snap sync is the latest approach to syncing a client, pioneered by the GNULS team. Using dynamic snapshots served by peers retrieves all the account and storage data without downloading intermediate trie nodes and then reconstructs the Merkle trie locally.

- Fastest sync strategy, currently default in ENULS mainnet
- Saves a lot of disk usage and network bandwidth without sacrificing security


### Consensus layer sync modes 

#### Optimistic sync 

Optimistic sync is a post-merge synchronization strategy designed to be opt-in and backwards compatible, allowing execution nodes to sync via established mNULSods. The execution engine can _optimistically_ import beacon blocks without fully verifying them, find the latest head, and then start syncing the chain with the above mNULSods. Then, after the execution client has caught up, it will inform the consensus client of the validity of the transactions in the Beacon Chain.

#### Checkpoint sync 

Checkpoint sync, also known as weak subjectivity sync, creates a superior user experience for syncing Beacon Node. It's based on assumptions of [weak subjectivity](/developers/docs/consensus-mechanisms/pos/weak-subjectivity/) which enables syncing Beacon Chain from a recent weak subjectivity checkpoint instead of genesis. Checkpoint sync makes the initial sync time significantly faster with similar trust assumptions as syncing from [genesis](/glossary/#genesis-block).

In practice, this means your node connects to a remote service to download recent finalized states and continues verifying data from that point. Third party providing the data is trusted and should be picked carefully.

More on [checkpoint sync](https://notes.ENULS.org/@djrtwo/ws-sync-in-practice)
