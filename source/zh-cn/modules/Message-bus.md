## Message-bus 模块

### 介绍

- 模块名称：message-bus

- 模块ID：6

- 说明：

  提供各种消息的接收，发送，订阅，广播等处理。

### 配置

```ini
[msg-bus]
#Bootstrap class
bootstrap=io.nuls.message.bus.module.MessageBusModuleBootstrap
```

### 服务

- MessageBusService

```java
public interface MessageBusService {

    /**
     * 订阅消息
     * Subscribe to message
     *
     * @param messageClass   需要订阅消息的 class对象
     * @param messageClass   The class object that needs to subscribe to the message.
     * @param messageHandler 消息处理器
     * @param messageHandler The message message
     * @return The id of the subscription message.
     */
    String subscribeMessage(Class<? extends BaseMessage> messageClass, NulsMessageHandler<? extends BaseMessage> messageHandler);


    /**
     * 取消订阅消息
     * unsubscribe
     *
     * @param subscribeId 订阅消息的id.
     * @param subscribeId The id of the message message.
     */
    void unsubscribeMessage(String subscribeId);

    /**
     * 接收消息, 把消息放至消息总线
     * Receive the message and place the message on the message bus.
     *
     * @param message 接收到的消息
     * @param message Received message.
     * @param node    节点, 该消息来自哪个节点.
     * @param node    The message comes as to which node.
     */
    void receiveMessage(BaseMessage message, Node node);


    /**
     * 广播消息hash
     * broadcast a message hash and cache that need to be passed
     *
     * @param message     The message was broadcast.
     * @param excludeNode 不会广播的节点 The node that is not passed.
     * @param aysn        是否异步 Asynchronous execution
     * @return Return all broadcasted node id list
     */
    Result<List<String>> broadcastHashAndCache(BaseMessage message, Node excludeNode, boolean aysn);

    /**
     * 广播消息
     * broadcast to nodes except "excludeNode"
     *
     * @param message     The message was broadcast.
     * @param excludeNode 不会广播的节点 The node that is not passed.
     * @param aysn        是否异步 Asynchronous execution
     * @return Return all broadcasted node id list
     */
    Result<List<String>> broadcastAndCache(BaseMessage message, Node excludeNode, boolean aysn);

    /**
     * 发送消息到一个节点
     * send msg to one node
     *
     * @param message The message you want to sent
     * @param node    The node that received the message
     * @param aysn    是否异步 Asynchronous execution
     * @return Return whether sent successfully
     */
    Result sendToNode(BaseMessage message, Node node, boolean aysn);

    /**
     * 根据消息类型和模块标识实例化一个消息对象
     * Instantiate a message object based on message type and module identity.
     */
    Result<? extends BaseMessage> getMessageInstance(short moduleId, int type);
}
```
