# Block Module

## Why should I have the "Block Management" module?

All transaction data in the blockchain is stored in the block, so there is a module responsible for the storage and management of the block, so that other modules can obtain the block when verifying the data in the block and processing the business.

When the blockchain program is started for the first time, it is necessary to synchronize the latest block on the network to the local. This process is generally time consuming, and the transaction cannot be initiated when the synchronization is not completed, so it is suitable for the work to be performed by a separate module.

In summary, it is necessary to provide a unified block data service for other modules, and it is also better to separate the management of the block from the specific service of the block. The modules used in the block do not have to care about the block. Get the details.

## "Block Management" What to do

- Provide api for block storage, query, rollback operations
- Synchronize the latest block from the network for preliminary verification and fork verification. If there is no fork, call the consensus module for consensus verification, call the transaction module for transaction verification, and save all the verifications to the local.
- Block synchronization, broadcast, and forwarding of message processing
- Judgment and storage of bifurcation blocks
- Judgment and storage of orphan blocks
- Forked chain maintenance, switching
- Orphan chain maintenance, switching

## Common log analysis

|Log content															|Log generation reason |
|----|----|
|skip block syn because minNodeAmount is set to 0|				Setting minNodeAmount to 0 will print this log and skip the block synchronization process directly. If you want a node to block out, you need to change this parameter|
|no consistent nodes								|				The height of the connected nodes is inconsistent |
|first start										|				The height of the connected node is 0, indicating that the chain is just starting to run |
|local blocks is newest							|				The block of the local node is already up to date, no block synchronization is required |
|The number of rolled back blocks exceeded the configured value|	The block in this area is inconsistent with the block on the network. The block in this area is rolled back, but the number of rollbacks exceeds the threshold, and the rollback stops.
|The local GenesisBlock differ from network		|				The creation node hash of the local node does not match the creation block hash on the network, and the local configuration needs to be checked.
|available nodes not enough						|				The number of available nodes connected to is insufficient, check the minNodeAmount configuration item, and the network module configuration, log |
|block syn complete successfully current height	|				The block sync is successful and has been synchronized to the latest block|
|block syn complete but is not newest			|				The block sync is successful, but it is not the latest block and will be automatically synchronized again |
|error occur when saving downloaded blocks	|				Block synchronization failure, generally when saving the synced block, error, focus on the block module, consensus module, transaction module log |

## Configuration Item Description
|Configuration item															|Description|
|----|----|
|dataFolder|Database Folder Name|
|language|Error Code Language|
|forkChainsMonitorInterval|Forked Chain Monitoring Thread Running Interval|
|orphanChainsMonitorInterval|Orphan chain monitoring thread running interval|
|orphanChainsMaintainerInterval|Orphan chain maintenance thread running interval|
|storageSizeMonitorInterval|Cache database capacity monitoring thread run interval|
|networkResetMonitorInterval|Network Monitoring Thread Running Interval|
|nodesMonitorInterval|Number of nodes monitors thread run interval|
|txGroupRequestorInterval|TxGroup gets thread running interval|
|txGroupTaskDelay|Forked chain monitoring thread running interval|
|testAutoRollbackAmount|The number of blocks that are automatically rolled back after startup, only for test block rollback, set to 0 in production environment |
|chainName|default chain name|
|chainId|Default Chain ID|
|assetId|Default Asset ID|
|blockMaxSize|Maximum number of bytes in the block|
|extendMaxSize|Block extension field maximum number of bytes|
|resetTime|Time interval at which the network action is reset when the height of the local block is not updated |
|chainSwtichThreshold|Raise the height difference threshold for the forked chain switch|
|cacheSize|The maximum number of branches in the forked chain or orphan chain block|
|heightRange|Receive the range of new blocks|
|waitInterval|When downloading a block in batches, if the CompleteMessage is received, the block has not been saved, and how long is reserved for each block|
|maxRollback|The local maximum rollback number when the local block is inconsistent with the network block|
|consistencyNodePercent|Statistics of the node's latest block height and hash consistent percentage threshold on the network|
|minNodeAmount|The minimum number of linked nodes, when the linked network node is lower than this parameter, it will continue to wait|
|downloadNumber|Number of blocks downloaded from the node on the network each time during block synchronization |
|validBlockInterval|To prevent malicious nodes from pre-eventing blocks, set this parameter to discard the block if the block timestamp is greater than the current time.
|blockCache|How many blocks are cached when syncing blocks|
|smallBlockCache|How many cached cell blocks are received from other nodes during normal system operation |
| orphanChainMaxAge|When the orphan chain fails to maintain, the age is increased by one. This parameter is the maximum age that the orphan chain can reach. Above this value, it will be cleaned up by the cleanup thread|
|logLevel|Log level, differentiated by different chains|
|singleDownloadTimeout|Timeout for downloading a single block from a network node|
|batchDownloadTimeout|Timeout for downloading multiple blocks from a network node|
|maxLoop|When downloading a block in batches, if the CompleteMessage is received, the block has not been saved yet, and the loop waits for a few rounds at most |
|synSleepInterval|Time interval between two block syncs|
|waitNetworkInterval|Time interval waiting for network stability|
|cleanParam|forked chain monitoring thread running interval|
    


> All time parameter units in the configuration file are in milliseconds

## Interface List
### info
returns network node height and local node height
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------- |:----:| ---------- |
| networkHeight | long | Network Node Latest Block Height |
| localHeight | long | The latest block height of the local node |

### latestBlock
the latest block of master chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| ----------------- |
| Return value | string | Returns a HEX string after serialization of a block |

### downloadBlockByHash
get a block by hash
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------ |:----:|
| chainId | int | Chain ID | Yes |
| hash | string | block hash | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| --------------- |
| Return value | string | Returns the HEX string after the serialization of the block |

### latestHeight
the latest height of master chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:----:| ------ |
| value | long | Latest main chain height |

### latestBlockHeader
the latest block header of master chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| ------------------ |
| Return value | string | Returns a HEX string after serialization of a block header |

### latestBlockHeaderPo
the latest block header po of master chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| -------------------- |
| Return value | string | Returns a HEX string after a block header PO serialization |

### getBlockHeaderByHeight
get a block header by height
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| height | long | block height | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| ------------------ |
| Return value | string | Returns a HEX string after serialization of a block header |

### getBlockHeaderPoByHeight
get a block header po by height
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| height | long | block height | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| -------------------- |
| Return value | string | Returns a HEX string after a block header PO serialization |

### getBlockByHeight
get a block by height
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| height | long | block height | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| ------------------- |
| Return Value | string | Returns the HEX String List after serialization of the block |

### getBlockHeaderByHash
get a block header by hash
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------ |:----:|
| chainId | int | Chain ID | Yes |
| hash | string | block hash | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| ---------------- |
| Return value | string | Returns the HEX string after the block header serialization |

### getBlockHeaderPoByHash
get a block header po by hash
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------ |:----:|
| chainId | int | Chain ID | Yes |
| hash | string | block hash | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| ------------------ |
| Return value | string | Returns the HEX string after the block header PO serialization |

### getLatestBlockHeaders
get the latest number of block headers
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| size | int | quantity | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| -------------------- |
| Return value | list&lt;string> | Returns the HEX string of the block header serialized List |

### getLatestRoundBlockHeaders
get the latest several rounds of block headers
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| round | int | Consensus Round | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| -------------------- |
| Return value | list&lt;string> | Returns the HEX string of the block header serialized List |

### getRoundBlockHeaders
get the latest several rounds of block headers
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| height | long | starting height | yes |
| round | int | Consensus Round | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| -------------------- |
| Return value | list&lt;string> | Returns the HEX string of the block header serialized List |

### receivePackingBlock
receive the new packaged block
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------------- |:----:|
| chainId | int | Chain ID | Yes |
| block | string | HEX string after block serialization | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---- |
| N/A | void | No return value |

### getBlockHeadersByHeightRange
get the block headers according to the height range
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| begin | long | starting height | yes |
| end | long | end height | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| -------------------- |
| Return value | list&lt;string> | Returns the HEX string of the block header serialized List |

### getBlockHeadersForProtocol
get block headers for protocol upgrade module
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:----:| -------- |:----:|
| chainId | int | Chain ID | Yes |
| interval | int | Protocol Upgrade Statistics | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| -------------------- |
| Return value | list&lt;string> | Returns the HEX string of the block header serialized List |

### getStatus
receive the new packaged block
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:-------:| ---- |
| status | integer | Run Status |

