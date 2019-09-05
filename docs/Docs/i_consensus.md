# poc Consensus Module

## Why do you have a consensus module?
As we all know, the core of the blockchain is the consensus mechanism.Unlike the traditional Internet's clipet-server architecture, the nodes of the blockchain are peer-to-peer, without the center, and everyone has the same rights; so in order to make the data consistent, let a network without a center maintain a set of books that everyone agrees with. This is the role of the consensus mechanism.
Broadly speaking, the consensus mechanism is the rule or algorithm that each node of the blockchain adheres to, and is the basis for mutual trust, so that decentralized unsupervised can be realized and the normal operation of the entire platform can be maintained.
In a narrow sense, the consensus mechanism determines the mechanism by which each node verifies and validates transactions on the blockchain.

## What does the consensus module do?

Every transaction in the blockchain must be approved by each node. Only after the whole network has reached a consensus, the transaction is completed.It is like in a democratic election, the voting method or rules must be recognized by the whole people, based on which the election can be completed.In the blockchain, the main performance of the consensus mechanism is the incentive system, which is the reward for the miners.Under the guarantee of the consensus mechanism, every miner can be rewarded, and the entire blockchain can operate in an orderly manner, providing a fair, transparent and trusting environment.Therefore, the consensus module needs to provide a specific algorithm to maintain, that is, the consensus algorithm.

There are many public chain consensus mechanisms, and the mainstream is POW, POS, and DPOS.The NULS main network adopts the self-originated POC (Proof Of Credit) consensus mechanism, which inherits the security and high efficiency of the Dpos consensus mechanism. At the same time, it has made great improvements in collaboration, which can be regarded as an upgraded version. Dpos.

## poc Consensus Module Responsibilities:

- Legality verification after block synchronization
- Create consensus nodes, delegate participation consensus, cancel delegation, and cancel consensus nodes ★
- Consensus node packs out blocks
- Disbursement of network maintenance incentives
- Do evil node punishment ★
  
  > Different consensus mechanisms have different consensus algorithms, and there are tags that are unique to the poc consensus.

## "Consensus Module" positioning in the system

The consensus module is a relatively core piece in the system. It is mainly responsible for packing transactions, verifying block headers, managing consensus node information in the management system, entrusting information, and penalizing information.


## Interface List
### createAgentValid
create agent transaction validate
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| tx | string | Transactions | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| -------- |
| value | boolean | Create Node Verification Results |

### stopAgentValid
stop agent transaction validate
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| tx | string | Transactions | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---------- |
| value | boolean | Stop node transaction verification result |

### depositValid
deposit agent transaction validate
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| tx | string | Transactions | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| -------- |
| value | boolean | Trusted Transaction Verification Results |

### withdrawValid
withdraw deposit agent transaction validate
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| tx | string | Transactions | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---------- |
| value | boolean | Exit Consensus Transaction Verification Results |

### cs\_runChain
Running a sub chain 1.0
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | string | | yes |

#### return value
No return value

### cs\_getAgentChangeInfo
get seed nodes list
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | string | | yes |

#### return value
No return value

### cs\_addEvidenceRecord
Chain evidence record /add evidence record
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| blockHeader | string | Forked block head one | Yes |
| evidenceHeader | string | bifurcation block header 2 | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | Processing Results |

### cs\_doubleSpendRecord
Double flower transaction record / double spend transaction record 
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| block | string | Block Information | Yes |
| tx | string | Fork Trading | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | Processing Results |

### cs\_getWholeInfo
Query the consensus information of the whole network
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ---------------------- |:------:| ---------- |
| agentCount | int | Number of nodes |
| totalDeposit | string | total delegate two |
| rewardOfDay | string | Total Consensus Bonus for the day |
| consensusAccountNumber | int | Number of participants in consensus |
| packingAgentCount | int | Current round out block number |

### cs\_getInfo
Query specific account consensus data for specified accounts
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| -------------- |:------:| --------- |
| agentCount | int | Number of nodes |
| totalDeposit | string | Total amount of participation in consensus |
| joinAgentCount | int | Number of participating consensus nodes |
| usableBalance | string | Available balances |
| reward | string | Consensus Awards |
| rewardOfDay | string | Consensus Awards received on the day |
| agentHash | string | created node HASH |

### cs\_getPublishList
Query red and yellow card records /query punish list
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ----------------------- |:----:|
| chainId | int | chain id | yes |
| address | string | address | yes |
| type | int | penalty type 0 red and yellow card record 1 red card record 2 yellow card record | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------ |:---------------:| --------- |
RedPunish | list&lt;string> | List of red cards obtained |
| yellowPunish | list&lt;string> | Get the yellow card penalty list |

### cs\_getRoundInfo
Get current round information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| -------------------------------------------------------------------------------------------------------------- |:-----------------------:| ------------------------------------- |
| totalWeight | double | current round total weight |
| index | long | Round subscript|
| startTime | long | Round start time |
| endTime | long | Round end time |
| memberCount | int | Number of nodes in this round |
| memberList | list&lt;object> | This round of member information |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;roundIndex | long | Round subscript|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;roundStartTime | long | Round start time|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;packingIndexOfRound | int | The node is the first in this round |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;agent | object | Consensus Node Information |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;agentAddress | byte[] | Node Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;packingAddress | byte[] | Block Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rewardAddress | byte[] | Reward Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deposit | biginteger | Margin |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;commissionRate | byte | Commission Ratio|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;time | long | creation time|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;blockHeight | long |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delHeight | long | Node Logout Height|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;status | int | Status, 0: Consensus unConsensus, 1: Consensus Consensus |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;creditVal | double | Reputation Value|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;totalDeposit | biginteger | Total node commission amount |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txHash | nulshash | Create this node's transaction HASH |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memberCount | int |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alais | string | node alias|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;depositList | list&lt;object> | Current node delegation information|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deposit | biginteger |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;agentHash | nulshash | Delegate Node HASH |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | byte[] |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;time | long |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;status | int | Status|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txHash | nulshash | Commissioning HASH |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;blockHeight | long | The height of the delegated transaction is packaged|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delHeight | long | Exit delegate height|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sortValue | string | Sort Value|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;packStartTime | long | Current node starts to block time |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;packEndTime | long | Current Node Out End Time |
| preRound | object&lt;meetinground> | Last round of information|
| myMember | object | current node block information |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;roundIndex | long | Round subscript|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;roundStartTime | long | Round start time|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;packingIndexOfRound | int | The node is the first in this round |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;agent | object | Consensus Node Information |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;agentAddress | byte[] | Node Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;packingAddress | byte[] | Block Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rewardAddress | byte[] | Reward Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deposit | biginteger | Margin |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;commissionRate | byte | Commission Ratio|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;time | long | creation time|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;blockHeight | long |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delHeight | long | Node Logout Height|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;status | int | Status, 0: Consensus unConsensus, 1: Consensus Consensus |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;creditVal | double | Reputation Value|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;totalDeposit | biginteger | Total node commission amount |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txHash | nulshash | Create this node's transaction HASH |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memberCount | int |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alais | string | node alias|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;depositList | list&lt;object> | Current node delegation information|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;deposit | biginteger |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;agentHash | nulshash | Delegate Node HASH |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | byte[] |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;time | long |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;status | int | Status|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txHash | nulshash | Commissioning HASH |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;blockHeight | long | The height of the delegated transaction is packaged|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delHeight | long | Exit delegate height|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sortValue | string | Sort Value|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;packStartTime | long | Current node starts to block time |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;packEndTime | long | Current Node Out End Time |

### cs\_getRoundMemberList
Query the membership list of the specified block's rounds
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------- |:----:|
| chainId | int | chain id | yes |
| extend | string | Block header extension information | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:---------------:| ---------- |
| packAddressList | list&lt;string> | Current list of outgoing addresses |

### cs\_getConsensusConfig
Get consensus module configuration information / get consensus config
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:-------:| ----------------- |
| seedNodes | string | seed node list|
| inflationAmount | integer |
| agentAssetId | integer | Consensus Asset ID |
| agentChainId | integer | Consensus Asset Chain ID |
| awardAssetId | integer | Reward Asset ID (Consensus Reward for this Chain Asset) |

### cs\_runMainChain
run main chain 1.0
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | string | | yes |

#### return value
No return value

### cs\_stopChain
stop a chain 1.0
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | string | | yes |

#### return value
No return value

### cs\_getAgentList
Query the list of consensus nodes in the current network
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| pageNumber | int | Page Number | No |
| pageSize | int | per page size | no |
| keyWord | string | Keywords | No |

#### return value
| Field Name | Field Type | Parameter Description |
| -------------- |:------:| ---------- |
| agentHash | string | Node HASH |
| agentAddress | string | node address |
| packingAddress | string | Node Outbound Address |
| rewardAddress | string | Node Reward Address |
| deposit | string | Mortgage Amount |
| commissionRate | byte | Commission Ratio |
| agentName | string | node name|
| agentId | string | node ID |
| introduction | string | Node Introduction|
| time | long | node creation time |
| blockHeight | long | Node Packing Height |
| delHeight | long | Node Failure Height |
| status | int | Status |
| creditVal | double | Reputation Value |
| totalDeposit | string | Total Delegate Amount |
| txHash | string | Create Node Trading HASH |
| memberCount | int | Number of delegates |
| version | string | version|

### cs\_stopAgent
Logout node/stop agent
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | node address | yes |
| password | string | password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---------- |
| txHash | string | Stop Node Trading HASH |

### cs\_createAgent
Create node transaction / create agent transaction
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------------- |:------:| ----------- |:----:|
| chainId | int | chain id | yes |
| agentAddress | string | node address | yes |
| packingAddress | string | Node Block Address | Yes |
| rewardAddress | string | reward address, default node address | no |
| commissionRate | int | Commission Ratio | Yes |
| deposit | string | Mortgage amount | Yes |
| password | string | password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---------- |
| txHash | string | Create Node Trading HASH |

### cs\_getAgentInfo
Query pointing node details / Query pointer node details
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| agentHash | string | Node HASH | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| -------------- |:------:| ---------- |
| agentHash | string | Node HASH |
| agentAddress | string | node address |
| packingAddress | string | Node Outbound Address |
| rewardAddress | string | Node Reward Address |
| deposit | string | Mortgage Amount |
| commissionRate | byte | Commission Ratio |
| agentName | string | node name|
| agentId | string | node ID |
| introduction | string | Node Introduction|
| time | long | node creation time |
| blockHeight | long | Node Packing Height |
| delHeight | long | Node Failure Height |
| status | int | Status |
| creditVal | double | Reputation Value |
| totalDeposit | string | Total Delegate Amount |
| txHash | string | Create Node Trading HASH |
| memberCount | int | Number of delegates |
| version | string | version|

### cs\_getAgentStatus
Query the specified consensus node status / query the specified consensus node status 1.0
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| agentHash | string | Node HASH | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:----:| ---- |
| status | byte | Node Status |

### cs\_updateAgentConsensusStatus
Modify node consensus state /modifying the Node Consensus State
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ----------------------- |
N/A | void | No specific return value, no error means the node consensus state was modified successfully |

### cs\_updateAgentStatus
Modify the Packing State of Nodes
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |
| status | int | Node Status | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ----------------------- |
N/A | void | No specific return value, no error means the node packing status is modified successfully |

### cs\_getNodePackingAddress
Get the current node out address/Get the current node's out-of-block address
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----------- |:------:| -------- |
| packAddress | string | current node block address |

### cs\_getAgentAddressList
Get the current network consensus node outbound address list or query the nearest N blocks outbound address/Get all node out-of-block addresses or specify N block out-of-block designations
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----------- |:------:| ------ |
| packAddress | string | Consensus Node List |

### cs\_getPackerInfo
Get the current node's outbound account information /modifying the Packing State of Nodes
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:---------------:| -------- |
| address | string | current node block address |
| password | string | current node password|
| packAddressList | list&lt;string> | Current Packed Address List|

### cs\_getSeedNodeInfo
Get seed node information / get seed node info
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:---------------:| -------- |
| address | string | current node block address |
| password | string | current node password|
| packAddressList | list&lt;string> | Current Packed Address List|

### cs\_stopContractAgent
Smart contract logout node/contract stop agent
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| ------------- |:----:|
| chainId | int | chain id | yes |
| contractAddress | string | contract address | yes |
| contractSender | string | contract caller address | yes |
| contractBalance | string | Current balance of contract address | Yes |
| contractNonce | string | current nonce value of the contract address | Yes |
| blockTime | long | Current packed block time | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| ----------- |
| Return value | list&lt;string> | Return transaction HASH and transaction |

### cs\_createContractAgent
Smart contract creation node / contract create agent
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| ------------- |:----:|
| chainId | int | chain id | yes |
| packingAddress | string | Block Address | Yes |
| deposit | string | Mortgage amount | Yes |
| commissionRate | string | commission ratio | yes |
| contractAddress | string | contract address | yes |
| contractSender | string | contract caller address | yes |
| contractBalance | string | Current balance of contract address | Yes |
| contractNonce | string | current nonce value of the contract address | Yes |
| blockTime | long | Current packed block time | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| ----------- |
| Return value | list&lt;string> | Return transaction HASH and transaction |

### cs\_contractDeposit
Smart contract delegation
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| ------------- |:----:|
| chainId | int | chain id | yes |
| agentHash | string | delegate node HASH | yes |
| deposit | string | commission amount | yes |
| contractAddress | string | contract address | yes |
| contractSender | string | contract caller address | yes |
| contractBalance | string | Current balance of contract address | Yes |
| contractNonce | string | current nonce value of the contract address | Yes |
| blockTime | long | Current packed block time | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| ----------- |
| Return value | list&lt;string> | Return transaction HASH and transaction |

### cs\_contractWithdraw
Smart contract withdrawal agreement
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| ------------- |:----:|
| chainId | int | chain id | yes |
| joinAgentHash | string | Node HASH | Yes |
| contractAddress | string | contract address | yes |
| contractSender | string | contract caller address | yes |
| contractBalance | string | Current balance of contract address | Yes |
| contractNonce | string | current nonce value of the contract address | Yes |
| blockTime | long | Current packed block time | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| ----------- |
| Return value | list&lt;string> | Return transaction HASH and transaction |

### cs\_getContractDepositInfo
Intelligent Contract Query for Assigned Account Delegation Information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| ------- |:----:|
| chainId | int | chain id | yes |
| joinAgentHash | string | Node HASH | Yes |
| contractAddress | string | contract address | yes |
| contractSender | string | contract caller address | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| ---- |
| Return value | list&lt;string> | Delegation information|

### cs\_getContractAgentInfo
Smart contract node / contract get agent info
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| ------- |:----:|
| chainId | int | chain id | yes |
| agentHash | string | Node HASH | Yes |
| contractAddress | string | contract address | yes |
| contractSender | string | contract caller address | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| ---- |
| return value | list&lt;string> | node information|

### cs\_triggerCoinBaseContract
Trading module triggers CoinBase smart contract/trigger coin base contract
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| tx | string | Trading Information | Yes |
| blockHeader | string | Block Head | Yes |
| stateRoot | string | stateRoot | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:------:| --------- |
| value | string | stateRoot |

### cs\_chainRollBack
Block rollback/chain rollback
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| -------- |:----:|
| chainId | int | chain id | yes |
| height | int | Height the block is rolled back to | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------ |
| value | boolean | Block Rollback Results |

### cs\_addBlock
Receive and cache new blocks/Receiving and caching new blocks
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| blockHeader | string | Block Head | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| -------- |
| value | boolean | Interface execution success or not |

### cs\_receiveHeaderList
Receive and cache block list/Receive and cache block lists
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:------:| ----- |:----:|
| chainId | int | chain id | yes |
| headerList | string | block header list | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| -------- |
| value | boolean | Whether to receive processing successfully |

### cs\_validBlock
Verification block /verify block correctness
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| download | int | Block Status | Yes |
| block | string | Block Information | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | Verify Results |

### cs\_createMultiAgent
Multi-Sign Account Create Agent transaction
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------------- |:------:| ----------- |:----:|
| chainId | int | chain id | yes |
| agentAddress | string | node address (multiple signing address) | yes |
| packingAddress | string | Node Block Address | Yes |
| rewardAddress | string | reward address, default node address | no |
| commissionRate | int | Commission Ratio | Yes |
| deposit | string | Mortgage amount | Yes |
| password | string | Signature Account Password | Yes |
| signAddress | string | Signature Account Address | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------------------------------------- |
| tx | string | Complete transaction serialization string, continue signature if the transaction does not reach the minimum number of signatures |
| txHash | string | Trading hash |
| completed | boolean | true: the transaction is complete (broadcast), false: the transaction is not completed, the minimum number of signatures has not been reached |

### cs\_stopMultiAgent
Multi-Sign Account Stop Agent
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---------- |:----:|
| chainId | int | chain id | yes |
| address | string | node address (multiple signing address) | yes |
| password | string | Signature Account Password | Yes |
| signAddress | string | Signature Account Address | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------------------------------------- |
| tx | string | Complete transaction serialization string, continue signature if the transaction does not reach the minimum number of signatures |
| txHash | string | Trading hash |
| completed | boolean | true: the transaction is complete (broadcast), false: the transaction is not completed, the minimum number of signatures has not been reached |

### cs\_multiDeposit
Multi-Sign Account deposit agent transaction
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| address | string | Multi-Sign Account Address | Yes |
| agentHash | string | Node HASH | Yes |
| deposit | string | commission amount | yes |
| password | string | Signature Account Password | Yes |
| signAddress | string | Signature Account Address | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------------------------------------- |
| tx | string | Complete transaction serialization string, continue signature if the transaction does not reach the minimum number of signatures |
| txHash | string | Trading hash |
| completed | boolean | true: the transaction is complete (broadcast), false: the transaction is not completed, the minimum number of signatures has not been reached |

### cs\_multiWithdraw
Multi-Sign Account withdraw deposit agent transaction
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---------- |:----:|
| chainId | int | chain id | yes |
| address | string | Multi-Sign Account Address | Yes |
| txHash | string | Join the consensus transaction HASH | Yes |
| password | string | Signature Account Password | Yes |
| signAddress | string | Signature Account Address | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------------------------------------- |
| tx | string | Complete transaction serialization string, continue signature if the transaction does not reach the minimum number of signatures |
| txHash | string | Trading hash |
| completed | boolean | true: the transaction is complete (broadcast), false: the transaction is not completed, the minimum number of signatures has not been reached |

### cs\_random\_seed\_count
Generate a random seed based on the height and the number of original seeds and return
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:------:| ------------ |:----:|
| chainId | int | chain id | yes |
| height | long | maximum height | yes |
| count | int | Number of original seeds | Yes |
Algorithm | string | Algorithm ID: SHA3... | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:------:| ------- |
| seed | string | generated random seed |
| algorithm | string | Algorithm ID|
| count | int | Number of original seeds |

### cs\_random\_seed\_height
Generate a random seed based on the height interval and return
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ------------ |:----:|
| chainId | int | chain id | yes |
| startHeight | long | starting height | yes |
| endHeight | long | cutoff height | yes |
Algorithm | string | Algorithm ID: SHA3... | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:------:| ------- |
| seed | string | generated random seed |
| algorithm | string | Algorithm ID|
| count | int | Number of original seeds |

### cs\_random\_raw\_seeds\_count
Find the original seed list based on height and return
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |
| height | long | starting height | yes |
| count | int | Cutoff Height | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| ---- |
| Return value | list&lt;string> | |

### cs\_random\_raw\_seeds\_height
Query the original seed list based on the height interval and return
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |
| startHeight | long | starting height | yes |
| endHeight | long | cutoff height | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| ---- |
| Return value | list&lt;string> | |

### cs\_getDepositList
Query delegation information for a specified account or a specified node
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| pageNumber | int | Page Number | Yes |
| pageSize | int | per page | yes |
| address | string | account address | yes |
| agentHash | string | Node HASH | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------ |:------:| ----------------- |
| deposit | string |
| agentHash | string | Node HASH |
| address | string | Account Address|
| time | long | delegation time |
| txHash | string | Commissioned Trading HASH |
| blockHeight | long | Delegate transaction is packaged height|
| delHeight | long | Exit delegate height |
| status | int | Node Status 0: To be Consensus, 1: Consensus |
| agentName | string | node name|
| agentAddress | string | node address |

### cs\_depositToAgent
Create a delegate transaction /deposit agent transaction
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| agentHash | string | Node HASH | Yes |
| deposit | string | commission amount | yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---------- |
| txHash | string | Join Consensus Trading Hash |

### cs\_withdraw
Exit commission transaction /withdraw deposit agent transaction
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---------- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| txHash | string | Join the consensus transaction HASH | Yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---------- |
| txHash | string | Exit Consensus Trading Hash |

