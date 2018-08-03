## Network module


### 基本信息

* 模块名称： network

* 模块编号： 4

* 功能简介： 提供网络服务，包含节点发现、节点管理、数据广播等服务。

### configuration

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
     * 断开一个已连接的节点
     * Disconnect with the node
     *
     * @param nodeId the id of node
     */
    void removeNode(String nodeId);

    /**
     * 获取一个节点
     * get node by id
     *
     * @param nodeId the id of node
     * @return
     */
    Node getNode(String nodeId);

    /**
     * 获取所有节点
     * get all nodes
     *
     * @return
     */
    Map<String, Node> getNodes();

    /**
     * 获取已连接的节点
     * get connected nodes
     *
     * @return
     */
    Collection<Node> getAvailableNodes();

    /**
     * 获取可连接的节点
     * get connectable nodes
     *
     * @return
     */
    List<Node> getCanConnectNodes();

    /**
     * 根据名字获取节点组
     * get NodeGroup by name
     *
     * @param groupName
     * @return
     */
    NodeGroup getNodeGroup(String groupName);

    /**
     * 发送消息
     * Send message to all connected nodes
     *
     * @param nulsData message
     * @param asyn     Whether or not asynchronous
     * @return
     */
    BroadcastResult sendToAllNode(BaseNulsData nulsData, boolean asyn);

    /**
     * 发送消息
     * Send message to all connected nodes
     *
     * @param event
     * @param excludeNode node that does not need to be send
     * @param asyn        Whether or not asynchronous
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
     * 发送消息给节点组
     * send message to nodeGroup
     *
     * @param event
     * @param groupName
     * @param asyn
     * @return
     */
    BroadcastResult sendToGroup(BaseNulsData event, String groupName, boolean asyn);

    /**
     * 发送消息给节点组
     * send message to nodeGroup
     *
     * @param event
     * @param groupName
     * @param excludeNode node that does not need to be send
     * @param asyn
     * @return
     */
    BroadcastResult sendToGroup(BaseNulsData event, String groupName, Node excludeNode, boolean asyn);

    /**
     * 重置网络
     * reset network module
     */
    void reset();

    /**
     * 获取网络配置信息
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
