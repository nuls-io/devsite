## Network module


### Introduction

* Module name : network

* ModuleID : 4

* Description : Provide network services for block chain. Network module is responsible for managing P2P nodes, sending and receiving data.

### Configuration

```ini
    [network]
    #Bootstrap class
    bootstrap=io.nuls.network.module.impl.NettyNetworkModuleBootstrap
    
    #port for p2p
    network.server.port=8003

    #magic number
    network.magic=20180625

    #maximum limitation to passive connections 
    network.max.in=10

    #maximum limitation to active connections
    network.max.out=10

    #p2p seeds
    network.seed.ip=192.168.1.103:8003,192.168.1.201:8003,192.168.1.233:8003
```

### service

* NetworkService

```java
public interface NetworkService {

    /**
     * Disconnect with the node
     *
     * @param nodeId the id of node
     */
    void removeNode(String nodeId);

    /**
     * get node by id
     *
     * @param nodeId the id of node
     * @return
     */
    Node getNode(String nodeId);

    /**
     * get all nodes
     *
     * @return
     */
    Map<String, Node> getNodes();

    /**
     * get connected nodes
     *
     * @return
     */
    Collection<Node> getAvailableNodes();

    /**
     * get connectable nodes
     *
     * @return
     */
    List<Node> getCanConnectNodes();

    /**
     * get NodeGroup by name
     *
     * @param groupName
     * @return
     */
    NodeGroup getNodeGroup(String groupName);

    /**
     * Send message to all connected nodes
     *
     * @param nulsData message
     * @param asyn Whether or not asynchronous
     * @return
     */
    BroadcastResult sendToAllNode(BaseNulsData nulsData, boolean asyn);

    /**
     * Send message to all connected nodes
     *
     * @param event
     * @param excludeNode node that does not need to be send
     * @param asyn        Whether or not asynchronous
     *
     * @return
     */
    BroadcastResult sendToAllNode(BaseNulsData event, Node excludeNode, boolean asyn);

    /**
     * send message to node
     *
     * @param event
     * @param node
     * @param asyn  Whether or not asynchronous
     * @return
     */
    BroadcastResult sendToNode(BaseNulsData event, Node node, boolean asyn);

    /**
     * send message to nodeGroup
     *
     * @param event
     * @param groupName
     * @param asyn
     *
     * @return
     */
    BroadcastResult sendToGroup(BaseNulsData event, String groupName, boolean asyn);

    /**
     * send message to nodeGroup
     *
     * @param event
     * @param groupName
     * @param excludeNode node that does not need to be send
     * @param asyn
     *
     * @return
     */
    BroadcastResult sendToGroup(BaseNulsData event, String groupName, Node excludeNode, boolean asyn);

    /**
     * reset network module
     */
    void reset();

    /**
     * Get network configuration information
     *
     * @return
     */
    NetworkParam getNetworkParam();
}
```

### message
* NETWORK_GET_VERSION

| 尺寸   | 字段              | 数据类型      | 说明            |
| ---- | --------------- | --------- | ------------- |
| 2    | handshakeType   | uint16    | 1. 请求   2. 响应 |
| 2    | ServerPort      | uint16    | 服务监听端口        |
| 4    | BestBlockHeight | uint32    | 最高高度          |
| ??   | BestBlockHash   | VarString | 最高块Hash字符串    |
| 6    | networkTime     | uint48    | 网络时间          |
| ??   | nodeIp          | VarString | 对方网络地址        |
| ??   | Version         | VarString | 版本字符串         |

* NETWORK_VERSION

| 尺寸   | 字段              | 数据类型      | 说明            |
| ---- | --------------- | --------- | ------------- |
| 2    | handshakeType   | uint16    | 1. 请求   2. 响应 |
| 2    | ServerPort      | uint16    | 服务监听端口        |
| 4    | BestBlockHeight | uint32    | 最高高度          |
| ??   | BestBlockHash   | VarString | 最高块Hash字符串    |
| 6    | networkTime     | uint48    | 网络时间          |
| ??   | nodeIp          | VarString | 对方网络地址        |
| ??   | Version         | VarString | 版本字符串         |

* NETWORK_NODE

| 尺寸   | 字段        | 数据类型            | 说明     |
| ---- | --------- | --------------- | ------ |
| ??   | NodeCount | VarInt          | 节点数    |
| ??   | Node[]    | Node[NodeCount] | 节点信息数组 |

* NETWORK_HANDSHAKE

| 尺寸   | 字段              | 数据类型      | 说明            |
| ---- | --------------- | --------- | ------------- |
| 2    | handshakeType   | uint16    | 1. 请求   2. 响应 |
| 2    | ServerPort      | uint16    | 服务监听端口        |
| 4    | BestBlockHeight | uint32    | 最高高度          |
| ??   | BestBlockHash   | VarString | 最高块Hash字符串    |
| 6    | networkTime     | uint48    | 网络时间          |
| ??   | nodeIp          | VarString | 对方网络地址        |
| ??   | Version         | VarString | 版本字符串         |

* NETWORK_P2P_NODE

p2p节点信息

| 尺寸   | 字段   | 数据类型      | 说明     |
| ---- | ---- | --------- | ------ |
| 2    | Port | uint16    | 服务监听端口 |
| ??   | IP   | VarString | 节点IP   |
