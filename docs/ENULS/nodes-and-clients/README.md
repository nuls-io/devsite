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
- You can use an ENULS wallet with your own node. You can use dapps more securely and privately because you won't have to leak your addresses and balances to random nodes. Everything can be checked with your own client. [MetaMask](https://metamask.io), [Nabox](https://nabox.io/), and many other wallets offer RPC-importing, allowing them to use your node.
- You can run and self-host other services which depend on data from ENULS. For example, this might be a Beacon Chain validator, software like layer 2, infrastructure, block explorers, payment processors, etc.
- You can provide your own custom RPC endpoints. Publicly for the community or even privately hosted ENULS endpoint enables people to use your node and avoid big centralized providers.
- You can connect to your node using **Inter-process Communications (IPC)** or rewrite the node to load your program as a plugin. This grants low latency, which helps a lot, e.g. when processing a lot of data using web3 libraries or when you need to replace your transactions as fast as possible (i.e. frontrunning).
- You can directly stake NULS to secure the network and earn rewards.

## Running your own node

Interested in running your own ENULS client?

For a beginner-friendly introduction visit our [run a node](/run-a-node) page to learn more.

If you're more of a technical user, dive into more details and options on how to [spin up your own node](/run-a-node/).

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

#### Snap sync

Snap sync is the latest approach to syncing a client, pioneered by the GNULS team. Using dynamic snapshots served by peers retrieves all the account and storage data without downloading intermediate trie nodes and then reconstructs the Merkle trie locally.

- Fastest sync strategy, currently default in ENULS mainnet
- Saves a lot of disk usage and network bandwidth without sacrificing security

### Consensus layer sync modes

#### Optimistic sync

Optimistic sync is a post-merge synchronization strategy designed to be opt-in and backwards compatible, allowing execution nodes to sync via established mNULSods. The execution engine can _optimistically_ import beacon blocks without fully verifying them, find the latest head, and then start syncing the chain with the above mNULSods. Then, after the execution client has caught up, it will inform the consensus client of the validity of the transactions in the Beacon Chain.

#### Checkpoint sync

Checkpoint synchronization, also known as weak subjectivity synchronization, provides a superior user experience for beacon node synchronization. It is based on the weak subjectivity assumption, which enables the beacon chain to sync from the most recent weak subjectivity checkpoint instead of the genesis block. Checkpoint synchronization makes the initial sync time significantly faster with similar trust assumptions as syncing from the genesis block.

In practice, this means that your node connects to a remote service to download the most recent finalized state and continue validating data from that point on. Third parties providing data are to be trusted and should be chosen carefully.
