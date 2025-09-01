# Consensus Module Design Document

## I. Overall description

### 1.1 Module Overview

#### 1.1.1 Why do you have a consensus module?

	As we all know, the core of the blockchain is the consensus mechanism.Unlike the traditional Internet's clipet-server architecture, the nodes of the blockchain are peer-to-peer, without the center, and everyone has the same rights; so in order to make the data consistent, let a network without a center maintain a set of books that everyone agrees with. This is the role of the consensus mechanism.

	Broadly speaking, the consensus mechanism is the rule or algorithm that each node of the blockchain adheres to, and is the basis for mutual trust, so that decentralized unsupervised can be realized and the normal operation of the entire platform can be maintained.

	In a narrow sense, the consensus mechanism determines the mechanism by which each node verifies and validates transactions on the blockchain.

#### 1.1.2 What do the consensus module do?

	Every transaction in the blockchain must be approved by each node. Only after the whole network has reached a consensus, the transaction is completed.It is like in a democratic election, the voting method or rules must be recognized by the whole people, based on which the election can be completed.In the blockchain, the main performance of the consensus mechanism is the incentive system, which is the reward for the miners.Under the guarantee of the consensus mechanism, every miner can be rewarded, and the entire blockchain can operate in an orderly manner, providing a fair, transparent and trusting environment.Therefore, the consensus module needs to provide a specific algorithm to maintain, that is, the consensus algorithm.

	There are many public chain consensus mechanisms, and the mainstream is POW, POS, and DPOS.The NULS main network adopts the self-originated POC (Proof Of Credit) consensus mechanism, which inherits the security and high efficiency of the Dpos consensus mechanism. At the same time, it has made great improvements in collaboration, which can be regarded as an upgraded version. Dpos.

	Poc consensus module responsibilities:

- Legality verification after block synchronization

- Create consensus nodes, delegate participation consensus, cancel delegation, and cancel consensus nodes ★

- Consensus node packs out blocks

- Disbursement of network maintenance incentives

- Do evil node punishment ★

  **ps: Different consensus mechanisms have different consensus algorithms. The above marked @ is unique to the poc consensus**

#### 1.1.3 Positioning of the Consensus Module in the system

	The consensus module is a relatively core piece in the system. It is mainly responsible for packing transactions, verifying block headers, managing consensus node information in the management system, entrusting information, and penalizing information.

### 1.2 Architecture

(Note: Block download belongs to the block management module, repainting)

![](./image/consensus-module/consensus-constants.jpg)

Description:

- Services layer:
  - tx service : the addition, deletion and change of the transaction
  - consensus service : Consensus activities and state management II. Functional design
- Validator
  - tx Validator: a validator for consensus-related transactions for verifying consensus-related transactions
- Processor
  - Tx Processor: Consensus module related transaction processor for submitting rollback detection transactions
- Task/Thread layer: timed task
  - consensus Task: Consensus Packaging
  - Reward Task : Statistics
- Storage layer: store consensus module related transaction data

### 2.0 Functional Architecture

![](./image/consensus-module/consensus-func.png)

### 2.1 Consensus Module Functional Requirements Analysis

#### 2.1.1 Support for multi-chain parallelism

The nuls2.0 design concept is to provide modular services, and each module should support multiple chains of data running at the same time, so the consensus module needs to implement algorithms with different consensus mechanisms.When the consensus module starts running, it can simultaneously support multiple chains to run at the same time.



#### 2.1.2 poc consensus mechanism

The main network of nuls adopts the independent poc consensus mechanism. To realize the poc, you first need to know the design concept and business rules of the poc. The following content is taken from the introduction part of the nuls white paper poc consensus. If you are familiar, you can skip it directly.

```
Consensus mechanism - poc
	The NULS main chain defaults to the credit consensus mechanism POC (Proof-Of-Credit).In the case where the node credit is up to standard, a certain margin can be locked to join the consensus. After the consensus node is reordered, each round will flow out of the block, and the margin will be unlocked when the consensus is exited.
1. Consensus entry and exit mechanism
	Anyone can join the consensus of nuls at any time, as long as the conditions are met and the rules are followed, that is, the nuls token reward can be obtained continuously.The addition of poc is divided into hard indicators and soft indicators.The hard indicator means that the credit score must reach a certain standard line, and exclude some nodes that have been evil.The soft index refers to the need to freeze a certain amount of nuls tokens as a margin, in order to prevent the proliferation of nodes, and to make the whole system more fair, the number of margins can be freely selected by anyone except the minimum value. The amount of the deposit will be linked to the final reward.
1.1 Yellow card warning
	Due to the hardware configuration of the node or the network, the disconnection and crash of the consensus period cannot be blocked. It is not a violation, but it will affect the whole system. Therefore, the system has a mild warning mechanism for such cases. : lower the node credit value,
1.2 red card warning
	For some double-split, repeated block-outs, attempts to fork the system, and malicious human-induced damage that does not comply with system rules, the nuls system resolutely resists, and all nodes can detect this kind of situation; once a malicious node does try to challenge the system, Then the corresponding margin will be locked for 2 months, and the credit rating will never reach the consensus threshold.
2, credit rating
	In the nuls system, credit is the credit factor of the account in the system, and the credit of all accounts is automatically calculated in the interval [-1, 1] by the credit rating algorithm formula.
	Credit evaluation formula: credit base = capacity coefficient + responsibility coefficient
	Capacity factor: calculated based on the number of historical blocks
	Responsibility factor: calculated according to violations and correctness of the block
3. Consensus reward
	For the balance and fairness of the entire NULS system, the consensus reward is calculated based on the margins submitted by all consensus nodes and the consensus node credits.Consensus reward calculation formula: see (Figure p1)
4, the sub-chain consensus mechanism
	The sub-chains that access the nuls are divided into two types. The first one is accessed through the standard interface protocol of the nuls system, and the second is deployed through the program of nuls.
	Nuls is a common blockchain underlying infrastructure that does not run any application services on its main chain, and all application services are run by sub-chains.Through the nuls system, you can quickly deploy a sub-chain based on nuls, and flexibly customize the various operating parameters of the sub-chain, including whether to support basic tokens, encryption algorithms, consensus mechanisms, storage mechanisms, and so on.
	Nuls defines a standard consensus module to provide interfaces that are compatible with different consensus mechanisms.The nuls community will develop consensus mechanisms such as pow, dpos, pos, pbft, and pool verification pool for users to choose freely.

```

*Figure p1: Consensus reward calculation formula: *

![](./image/consensus-module/coinbase.png)

##### In the poc system, there are four roles: agent, principal, packager, and rewarder.

- Agent - - the consensus node creator.The nuls holder initiates a transaction to create a consensus node, logs it into the chain, and tells everyone that I want to be a consensus node.The basic condition for node creation is that 20,000-200,000 nuls need to be locked, and there is no red card penalty record. The purpose of setting up this basic condition is to prove that you are really trying to maintain the basic network of nuls.
- Packager———— When creating a consensus node, the agent can specify a packager. This packager can be his own account, or a friend who knows technology. The most important thing is that the packager can not hold any Nuls, even if the server participating in the consensus is hacked, the user will not have a huge loss, the loss is only affected by the earnings after the attack.It should be noted that the packager is a real account, and each time the block is packaged, the block must be signed. Therefore, the package account must not be set.
- Rewarding people - When creating a consensus node, an agent can not only specify a packager, but also assign a beneficiary to specify who can get the reward from the consensus.
- The principal--nuls holder can entrust the nuls he holds to the agent for consensus based on the agent's credit value and the influence of the agent, etc., while enjoying the corresponding Consensus benefits, if the quality of the agent node or the integrity of the agent is found to decrease, the principal may withdraw its entrustment and change to others at any time.

##### In the poc system, there are four business logics: creating a proxy (creating a consensus node), stopping a proxy node (exiting consensus), delegating a consensus, and canceling a delegation.

- Create proxy (create consensus node): Lock 20,000-200,000 nuls and initiate a registration proxy transaction. After packaging, the whole network can be seen. Others can lock the nuls delegation to the proxy node.
- Stop the proxy node (exit consensus): The agent can stop its proxy qualification at any time, initiate a transaction to delete the proxy node, and after the transaction is packaged and confirmed, it will quickly withdraw from the consensus and no longer participate in the production of the new block.The 20,000 nuls locked when registering the agent will be unlocked after 72 hours, and the other nuls that the principal delegates to the node will be unlocked immediately.
- Delegate consensus: Users with 2000 or above nuls can choose a proxy node to commission and obtain the corresponding block revenue.The corresponding delegated nuls will be locked out of availability before exiting.A proxy node can accept up to 500,000nuls of delegates.
- Cancellation of the delegation: The user can cancel the previous entrustment, and the locked nuls will be explained immediately after the revocation, and the corresponding consensus revenue will no longer be enjoyed.

##### Two punishment mechanisms for the poc system

- Yellow card penalty: When the block node is disconnected from the network, card machine and other uncertain reasons, the block is not out of the block, or the block is not used, then the yellow card will be punished in the next round.The yellow card penalty will affect the revenue of the node; when 100 consecutive yellow card penalties are awarded, a red card will be imposed.
- Red card penalty: When a block node makes malicious forks, double flowers, etc., which seriously endangers the stability of the network, or receives 100 yellow card penalties in a row, the system will give a red card penalty.The node that receives the red card penalty will be forced to stop the consensus. The deposit when the agent is created is frozen for 3 months, and the node can never be created again; the corresponding node of the node that received the red card penalty is immediately unlocked.

##### The hidden function requirements of the poc internal system

- Maintain a consensus node information table and update it based on the above four transactions received in real time.
- Maintain a round of information tables so that agents who meet the outbound conditions for each round are randomly queued out.
- Proxy nodes that meet the outbound conditions, verify and package the memory pool transactions, assemble them into new blocks and broadcast them to the entire network.

The above is a functional analysis of the implementation of the consensus module poc consensus mechanism. The details of each function implementation are described in the next section.

### 2.2 Module Service

The consensus module is the core module of the blockchain. Due to the different consensus mechanisms, the services provided by the outside are not the same.The module service will describe in detail the services shared by the consensus module and the services specific to the poc mechanism.

Refer to [Consensus Module RPC-API Interface Document](./consensus.md)

### 2.3 Module internal function

	The poc consensus mechanism is that the nodes that participate in the consensus block out of the block, reach a consensus, and jointly maintain a set of books.However, due to network reasons or some consensus nodes do evil (send different packing blocks to different nodes), there will be a fork. For this malicious node system, different penalties will be given according to the severity, when it is a turn When the node fails to issue a block at the specified time, the system will give the node a yellow card penalty. This penalty will reduce the credit value of the node. When the node credit value drops to -1, the node will be punished with a red card; The node will be directly punished with a red card. The node that receives the red card penalty will stop packing and the node will never be able to create a consensus node again, and the margin will be frozen for a certain period of time. The other commissioned amount of the node will be returned to the principal; When the block is normally released, the node will get a block reward, and the account entrusted to the node will also receive the corresponding proportion of the bonus according to the amount of the commission.

	In addition to providing packaged blocks, the consensus module will also do the statistical work of bonuses, statistics on the total amount of rewards issued within 24 hours, the amount of bonuses accumulated in local accounts within 24 hours, and the details of rewards within 24 hours.

- Consensus module startup process

  initialization:

  - 1. Load consensus module configuration information (out of block interval, bonus lock block number)
  - 2. Register Consensus Module Transaction, Transaction Verifier, Transaction Processor (registered with Transaction Module)
  - 3. Register Consensus Module Service Interface (registered with the core module)
  - 4. Register the consensus module event (registered with the event bus module)

  start up:

  - Get the latest round of block information in the database and calculate the round information
  - Get current protocol version information and cache
  - Start each relevant thread

- Packing out the block process
  - Determine if the node meets the requirements for becoming a packed node
  - Calculate packaging round information
  - Waiting for packaging
  - Receive the latest block. If you have not received the latest block after waiting for 5 seconds, the default last block node does not have a block, and the current node continues to perform the packing operation.
  - Verify the package to be packaged, and eliminate the new package after the duplicate package transaction
  - Verify the packaged new block and save the relevant data to the database
  - Broadcast block



![](./image/consensus-module/consensus-flow-5.png)



- Consensus award statistics

  ![](./image/consensus-module/consensus-staticsReward.jpg)

  - Get a list of local accounts
  - Get a list of blocks within 24 hours
  - Traverse block list to get CoinBase transactions
  - According to the CoinBase transaction, update the total reward amount within 24 hours, the accumulated bonus amount of the local account within 24 hours, and the bonus details within 24 hours

## IV. Description of the event

### 4.1 Published events

#### 4.1.1 Block Packing Success Event

```
Description: This event is released when a new zone is successfully packaged successfully.
```

```
 event_topic : "evt_cs_packing"
```

```
data:{
    "chainId":88,
    "smallBlock": "smallBlock object is serialized into a hex string"
}
```



#### 4.1.2 Creating a Node

```
Description: This event is posted when the Create Node transaction is confirmed and packaged into the block.
```

```
 event_topic : "evt_cs_createAgent"
```

```
data:{
    "chainId":88,
    "agentList": { //list of consensus nodes created in the packaging block
        "agent1", // serialization of the Agent object to a hex string
        "agent2",
        "agent3"
    }
}
```



#### 4.1.3 Logout node

```
Description: Issue the event after the logout node transaction is confirmed and packaged into the block
```

```
 event_topic : "evt_cs_stopAgent"
```

```
data:{
    "chainId":88,
    "agentList": { //list of consensus nodes that are unregistered in the packed block
        "agent1", // serialization of the Agent object to a hex string
        "agent2",
        "agent3"
    }
}
```



#### 4.1.4 Consensus node state change (in the consensus, out of the block)

```
Description: Issue the event when the consensus node status changes
```

```
 event_topic : "evt_cs_agentStatusChage"
```

```
data:{
    "chainId":88,
    "agentList": { // the list of consensus nodes for the table in the state of the packed block
        "agent1", // serialization of the Agent object to a hex string
        "agent2",
        "agent3"
    }
}
```



#### 4.1.5 Delegate consensus

```
Description: Issue the event after the delegate consensus transaction is confirmed and packaged into the block
```

```
 event_topic : "evt_cs_deposit"
```

```
data:{
    "chainId":88,
    "depositList": { //Delegate the list of delegates in the block
        "deposit1", //Deposit object serialized to hex string
        "deposit2"
    }
}
```



#### 4.1.6 Exit Consensus

```
Description: Issue the event after the exit consensus transaction is confirmed and packaged into the block
```

```
 event_topic : "evt_cs_withdraw"
```

```
data:{
    "chainId":88,
    "depositList": { //Exit the delegate list in the package block
        "deposit1", //Deposit object serialized to hex string
        "deposit2"
    }
}
```



#### 4.1.7 Yellow card penalty

```
Description: When there is a consensus node to get a yellow card penalty is to release the event
```

```
 event_topic : "evt_cs_yellowPublish"
```

```
data:{
    "chainId":88,
    "yellowPublishList":{ //The yellow card list in the packing block
        "yellowPublish1", //YellowPublish object is serialized to a hex string
        "yellowPublish2"
    }
}
```



#### 4.1.8 Red card penalty

```
Description: Obtain the event when there is a consensus node to get a red card transaction
```

```
 event_topic : "evt_cs_redPublish"
```

```
data:{
    "chainId":88,
    "redPublishList": { //Red card list in the package block
        "redPublish1", //RedPublish object serialized to hex string
        "redPublish2"
    }
}
```



### 4.2 Subscription Events

```
no
```


## 五, Agreement

### 5.1 Network Communication Protocol

#### broadBlock

- Send a new block (SmallBlock)
- Get blocks based on hash
- Send a full block
- Get multiple blocks based on height
- Get a list of transactions based on the trade hash list
- Send a list of transactions
- Get SmallBlock based on hash
- Get block hash list based on height interval
- Get the SmallBlock list based on the height interval

New area for broadcast packaging

| Length | Fields     | Type   | Remark                               |
| ------ | ---------- | ------ | ------------------------------------ |
| 4 | chainId | int | Chain ID |
Small String | String | SmallBlock Object Serialized Hexadecimal String |


## 六, Module Configuration

```
{
    {
        "name": "packing_interval",
        "remark": "packaging interval",
        "changable": "true",
        "default": "10 seconds"
    },
    {
    	"name": "packing_amount",
        "remark": "the minimum amount of the block",
        "changable": "true",
        "default": "200000"
    },
    {
    	"name": "coinbase_unlock_height",
        "remark": "The number of bonus lock blocks",
        "changable": "true",
        "default": "100"
    },
    {
    	"name": "redPublish_lockTime",
        "remark": "Get the red card lock time",
        "changable": "true",
        "default": "3 months"
    },
    {
    	"name": "stopAgent_lockTime",
        "remark": "Logout node margin lock time",
        "changable": "true",
        "default": "3 days"
    },
    {
    	"name": "commissionRate_min",
        "remark": "the minimum value of the commission ratio",
        "changable": "true",
        "default": "10"
    },
    {
    	"name": "commissionRate_max",
        "remark": "maximum commission ratio",
        "changable": "true",
        "default": "80"
    },
    {
    	"name": "deposit_min",
        "remark": "Minimum margin of the created node",
        "changable": "true",
        "default": "20000"
    },
    {
    	"name": "deposit_max",
        "remark": "Maximize the margin of the created node",
        "changable": "true",
        "default": "700000"
    },
    {
    	"name": "commission_min",
        "remark": "trust minimum",
        "changable": "true",
        "default": "2000"
    },
    {
    	"name": "commission_max",
        "remark": "delegation maximum",
        "changable": "true",
        "default": "680000"
    }
}
```

## VII, Java-specific design

## 八, supplementary content

