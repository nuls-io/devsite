Network module

## Why should I have "Network Module"?

The network module guarantees the communication between the decentralized nodes and provides the lowest level of network communication, node discovery and other services for one of the NULS basic modules.The network foundation of the blockchain is Peer to Peer, or P2P.All participants in the P2P network can be either a service server or a resource user.Features of P2P networks: decentralization, scalability, robustness, cost-effectiveness, privacy protection, and load balancing.

## "Network Module" What to do

The network module is the basic module of the entire system, which is used to manage the connection between nodes, nodes and connections, and the transmission and reception of data.Network modules do not involve complex business logic.

* Received network messages, according to the instruction service mapping relationship in the kernel module, push the corresponding processing module of the message.

* The open interface is used to push the message calls encapsulated by other modules to the specified peer node and broadcast to the specified network group.

## "Network Module" positioning in the system

* The network module is the underlying application module. Any module that needs network communication must send and receive messages through the network module.
* The network module relies on the core module for governance of the service interface.
* The network module builds different networks by network id (magic parameter).
* When the nodes of the network module in the satellite chain are building a cross-chain network, the chain management module is required to provide cross-chain configuration information.
* When a node in a sub-chain of a network module is configured for a cross-chain network, cross-chain configuration information is required for the cross-chain module.



## Module Configuration

```
#本链服务口
port=18001
#跨链服务口
crossPort=18002
#魔法参
packetMagic=55886633
#籽接链接
selfSeedIps=192.168.1.12:18001
#Maximum number of network connections
maxInCount=100
#Maximum number of outgoing connections
maxOutCount=20
```


## Interface List
### nw\_info
Get basic information about the node network
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| -------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:-------:| -------------------- |
| localBestHeight | long | local node block height |
| netBestHeight | long | Network Node Block Height |
| timeOffset | long | Difference between node and network time |
| inCount | integer | Most Server, peer access quantity|
| outCount | integer | Number of external servers connected as client |

### nw\_nodes
Get network connection node information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| -------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----------- |:------:| -------- |
| peer | string | peer node ID |
| blockHeight | long | Node Height |
| blockHash | string | Node Hash |

### nw\_currentTimeMillis
Get node network time
#### scope:public
#### version:1.0

#### parameter list
No parameters

#### return value
| Field Name | Field Type | Parameter Description |
| ----------------- |:----:| ---------------------- |
| currentTimeMillis | long | Time milliseconds - currentTimeMillis |

### nw\_delNodes
Delete node group node
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| -------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |
| nodes | string | node group ID, comma stitching | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### nw\_addNodes
Increase the node to be connected
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| -------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |
| isCross | int | 1 cross-chain connection, 0 normal connection | Yes |
| nodes | string | node group ID, comma stitching | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### nw\_getNodes
Paging view connection node information, when both startPage and pageSize are 0, no paging, return all node information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:-------:| --------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |
| state | int | 0: all connections, 1: connected 2: not connected | yes |
| isCross | boolean | false: non-cross-chain connection, true: cross-chain connection | Yes |
| startPage | int | Page Start Pages | Yes |
| pageSize | int | Number of pages per page | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----------- |:------:| ------------------ |
| chainId | int | Chain ID |
| nodeId | string | node ID |
| magicNumber | long | Network Magic Parameters |
| blockHeight | long | peer node block height |
| blockHash | string | peer latest block hash |
| ip | string | peer connection IP address|
| port | int | peer connection port number |
| state | int | 0: Unfinished handshake 1: Connection completed handshake |
| isOut | int | 0: Incoming network connection 1: Outbound connection |
| time | long | connection time milliseconds |

### nw\_updateNodeInfo
Update connection node information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| -------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |
| nodeId | string | Connection Node ID | Yes |
| blockHeight | long | Block Height | Yes |
| blockHash | string | Block hash value | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### protocolRegisterWithPriority
Module protocol instruction registration with priority parameters
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------------------------------------------------------- |:------:| --------------------------- |:----:|
| role | string | module role name | yes |
| protocolCmds | list | Registered Instruction List | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cmd | string | Protocol Instruction Name, 12byte | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priority | string | Priority, 3 levels, HIGH, DEFAULT, LOWER | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### nw\_protocolRegister
Module protocol instruction registration
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:---------------:| ------ |:----:|
| role | string | module role name | yes |
| protocolCmds | list&lt;string> | Registered Instruction List | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### nw\_sendPeersMsg
Send a message to the specified node
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |
| nodes | string | Specifies the string to send the peer node Id, comma-separated | Yes |
| messageBody | string | Message Body Hex | Yes |
| command | string | message protocol directive | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### nw\_broadcast
Broadcast message
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:-------:| -------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |
| excludeNodes | string | Exclude peer node Id, separated by commas | Yes |
| messageBody | string | Message Body Hex | Yes |
| command | string | message protocol directive | yes |
| isCross | boolean | Whether it is a cross-chain | Yes |
| percent | int | Broadcast transmission ratio, do not fill, default 100 | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------------------ |
| value | boolean | Returns false if none of the nodes are sent out |

### nw\_createNodeGroup
The main network creates a cross-chain network or chain factory creation chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------------- |:-------:| ------------------------------ |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |
| magicNumber | long | Network Magic Parameters | Yes |
| maxOut | int | The number of active external connections as the client | Yes |
| maxIn | int | Allows the maximum number of external connections as sever | Yes |
| minAvailableCount | int | Minimum valid connections | Yes |
| isCrossGroup | boolean | Whether to create a cross-chain connection group: true cross-chain connection, false normal connection | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### nw\_activeCross
Cross-chain protocol module activation cross-chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| -------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |
| maxOut | string | The number of active external connections as the client | Yes |
| maxIn | int | Allows the maximum number of external connections as sever | Yes |
| seedIps | string | seed connection node ID, comma stitched | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### nw\_getGroupByChainId
Get node group information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| -------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| -------------------- |:----:| ----------- |
| chainId | int | Chain ID |
| magicNumber | long | Network Magic Parameters |
| totalCount | int | Total connections |
ConnectCount | int | Number of connected nodes on the local network |
| disConnectCount | int | Number of nodes to be connected to the local network |
| inCount | int | Number of nodes connected to the local network |
| outCount | int | Number of nodes connected to the local network |
| connectCrossCount | int | Number of nodes connected across the chain |
| disConnectCrossCount | int | Number of nodes to be connected in a cross-chain network |
| inCrossCount | int | Number of nodes in the cross-chain network |
| outCrossCount | int | Number of outgoing nodes in a cross-chain network |
| isActive | int | Whether the local network is working |
| isCrossActive | int | Cross-chain network is working |
| isMoonNet | int | Is the network group the primary network link node |

### nw\_getChainConnectAmount
Get the number of connectable network groups
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:-------:| ------------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |
| isCross | boolean | true, get the number of cross-chain connections, false local network connections | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------- |:-------:| ---- |
| connectAmount | integer | connectables |

### nw\_delNodeGroup
Delete the specified network group
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| -------------------- |:----:|
| chainId | int | Linked chain Id, value range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### nw\_getSeeds
View the seed nodes provided by the cross-chain network
#### scope:public
#### version:1.0

#### parameter list
No parameters

#### return value
| Field Name | Field Type | Parameter Description |
| -------- |:------:| ------------------- |
| seedsIps | string | The seed node ID of the main network connectable, comma stitching |

### nw\_getMainMagicNumber
View the magic parameters of the main network
#### scope:public
#### version:1.0

#### parameter list
No parameters

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:----:| ------ |
| value | long | main network magic parameters |

### nw\_getGroups
Pagination to obtain network group information, when both startPage and pageSize are 0, no paging, return all network group information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:----:| ------ |:----:|
| startPage | int | Start Pages | Yes |
| pageSize | int | Number of impressions per page | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| -------------------- |:----:| ----------- |
| chainId | int | Chain ID |
| magicNumber | long | Network Magic Parameters |
| totalCount | int | Total connections |
ConnectCount | int | Number of connected nodes on the local network |
| disConnectCount | int | Number of nodes to be connected to the local network |
| inCount | int | Number of nodes connected to the local network |
| outCount | int | Number of nodes connected to the local network |
| connectCrossCount | int | Number of nodes connected across the chain |
| disConnectCrossCount | int | Number of nodes to be connected in a cross-chain network |
| inCrossCount | int | Number of nodes in the cross-chain network |
| outCrossCount | int | Number of outgoing nodes in a cross-chain network |
| isActive | int | Whether the local network is working |
| isCrossActive | int | Cross-chain network is working |
| isMoonNet | int | Is the network group the primary network link node |

### nw\_reconnect
Local network restart
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| -------------------- |:----:|
| chainId | int | Network Chain Id, Value Range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

