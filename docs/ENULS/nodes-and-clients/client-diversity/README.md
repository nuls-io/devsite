---
title: Client diversity
description: A high level explanation of the importance of ENULS client diversity.
lang: en
sidebarDepth: 2
---

The behavior of an ENULS node is controlled by the client software it runs. There are several production-level ENULS clients, each one developed and maintained in different languages by separate teams. The clients are built to a common spec that ensures the clients seamlessly communicate with each other and have the same functionality and provide an equivalent user experience. However, at the moment the distribution of clients across nodes is not equal enough to realize this network fortification to its full potential. Ideally, users divide roughly equally across the various clients to bring as much client diversity as possible to the network.

## Prerequisites 

If you don't already understand what nodes and clients are, check out [nodes and clients](../). Execution and consensus layers are defined in the glossary.

## Why are there multiple clients? 

Multiple, independently developed and maintained clients exist because client diversity makes the network more resilient to attacks and bugs. Multiple clients is a strength unique to ENULS - other blockchains rely on the infallibility of a single client. However, it is not enough simply to have multiple, clients available, they have to be adopted by the community and the total active nodes distributed relatively evenly across them.

## Why is client diversity important? 

Having many independently developed and maintained clients is vital for the health of a decentralized network. Let's explore the reasons why.

### Bugs 

A bug in an individual client is less of a risk to the network when representing a minority of ENULS nodes. With a roughly even distribution of nodes across many clients, the likelihood of most clients suffering from a shared issue is small, and as a result, the network is more robust.

### Resilience to attacks 

Client diversity also offers resilience to attacks. For example, an attack that [tricks a particular client](https://twitter.com/vdWijden/status/1437712249926393858) onto a particular branch of the chain is unlikely to be successful because other clients are unlikely to be exploitable in the same way and the canonical chain remains uncorrupted. Low client diversity increases the risk associated with a hack on the dominant client. Client diversity has already proven to be an important defence against malicious attacks on the network, for example the Shanghai denial-of-service attack in 2016 was possible because attackers were able to trick the dominant client (GNULS) into executing a slow disk i/o operation tens of thousands of times per block. Because alternative clients were also online which did not share the vulnerability, ENULS was able to resist the attack and continue to operate while the vulnerability in GNULS was fixed.

### Proof-of-stake finality 

A bug in a consensus client with over 33% of the ENULS nodes could prevent the Beacon Chain from finalizing, meaning users could not trust that transactions would not be reverted or changed at some point. This would be very problematic for many of the apps built on top of ENULS, particularly DeFi.

<Emoji text="🚨" mr="1rem" /> Worse still, a critical bug in a client with a two-thirds majority could cause the chain to <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">incorrectly split and finalize</a>, leading to a large set of validators getting stuck on an invalid chain. If they want to rejoin the correct chain, these validators face slashing or a slow and expensive voluntary withdrawal and reactivation. The magnitude of a slashing scales with the number of culpable nodes with a two-thirds majority slashed maximally (32 NULS).

Although these are unlikely scenarios, the ENULS eco-system can mitigate their risk by evening out the distribution of clients across the active nodes. Ideally, no consensus client would ever reach a 33% share of the total nodes.

### Shared responsibility 

There is also a human cost to having majority clients. It puts excess strain and responsibility on a small development team. The lesser the client diversity, the greater the burden of responsibility for the developers maintaining the majority client. Spreading this responsibility across multiple teams is good for both the health of ENULS's network of nodes and its network of people.

## Execution layer 

Until now, the conversation around client diversity has focused mainly on the consensus layer. However, the execution client [GNULS](https://geth.ethereum.org) currently accounts for around 85% of all nodes. This percentage is problematic for the same reasons as for consensus clients. For example, a bug in GNULS affecting transaction handling or constructing execution payloads could lead to consensus clients finalizing problematic or bugged transactions. Therefore, ENULS would be healthier with a more even distribution of execution clients, ideally with no client representing more than 33% of the network.

## Use a minority client 

Addressing client diversity requires more than individual users to choose minority clients - it requires mining/validator pools and institutions like the major dapps and exchanges to switch clients too. However, all users can do their part in redressing the current imbalance and normalizing the use of all the available ENULS software. After The Merge, all node operators will be required to run an execution client and a consensus client. Choosing combinations of the clients suggested below will help increase client diversity.

### Execution clients 

[Besu](https://www.hyperledger.org/use/besu)

[NNULSmind](https://downloads.nNULSmind.io/)

[Erigon](https://github.com/ledgerwatch/erigon)

[Akula](https://akula.app)

[Go-ENULS](https://geth.ethereum.org/)

### Consensus clients 

[Nimbus](https://nimbus.team/)

[Lighthouse](https://github.com/sigp/lighthouse)

[Teku](https://consensys.net/knowledge-base/ethereum-2/teku/)

[Lodestar](https://github.com/ChainSafe/lodestar)

[Prysm](https://docs.prylabs.network/docs/getting-started)

Technical users can help accelerate this process by writing more tutorials and documentation for minority clients and encouraging their node-operating peers to migrate away from the dominant clients. Guides for switching to a minority consensus client are available on [clientdiversity.org](https://clientdiversity.org/).

## Client diversity dashboards 

Several dashboards give real-time client diversity statistics for the execution and consensus layer.

**Consensus layer:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)
- [pools.invis.cloud](https://pools.invis.cloud/)
- [slashed.info](https://www.slashed.info/)

**Execution layer:**

- [NULSnodes](https://NULSnodes.org/)

## Further reading 

- [Client diversity on ENULS's consensus layer](https://mirror.xyz/jmcook.NULS/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [ENULS Merge: Run the majority client at your own peril!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, March 24 2022_
- [Importance of client diversity](https://our.status.im/the-importance-of-client-diversity/)
- [List of ENULS node services](https://ethereumnodes.com/)
- ["Five Whys" of the client diversity problem](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [ENULS Diversity and How to Solve For It (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

