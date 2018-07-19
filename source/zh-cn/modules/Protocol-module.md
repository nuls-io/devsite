## Protocol  模块

### 介绍

- 模块名称：protocol

- 模块ID：3

- 说明：

  协议模块为区块链提供协议，处理区块，下载，交易，等功能。

### 配置

```ini
[protocol]
#Bootstrap class
bootstrap=io.nuls.protocol.base.module.BaseProtocolsModuleBootstrap
```

### 服务

- BlockService

```java
public interface BlockService {
    /**
     * 获取创世块（从存储中）
     * Get the creation block (from storage)
     */
    Result<Block>  getGengsisBlock();

    /**
     * 获取最新的区块（从存储中）
     * Get the highest block (from storage)
     */
    Result<Block> getBestBlock();

    /**
     * 获取最新的区块头（从存储中）
     * Get the highest block header (from storage)
     */
    Result<BlockHeader> getBestBlockHeader();

    /**
     * 根据区块高度获取区块头（从存储中）
     * Get the block head (from storage) according to the block height
     *
     * @param height 区块高度/block height
     * @return 区块头
     */
    Result<BlockHeader> getBlockHeader(long height);

    /**
     * 根据区块摘要获取区块头（从存储中）
     * Get the block head (from storage) according to the block hash
     *
     * @param hash 区块摘要/block hash
     * @return 区块头/block header
     */
    Result<BlockHeader> getBlockHeader(NulsDigestData hash);

    /**
     * 根据区块摘要获取区块（从存储中）
     * Get the block (from storage) according to the block hash
     *
     * @param hash 区块摘要/block hash
     * @return 区块/block
     */
    Result<Block> getBlock(NulsDigestData hash);

    /**
     * 根据区块高度获取区块（从存储中）
     * Get the block (from storage) according to the block height
     *
     * @param height 区块高度/block height
     * @return 区块/block
     */
    Result<Block> getBlock(long height);

    /**
     * 保存区块到存储中
     * Save the block to the store.
     *
     * @param block 完整区块/whole block
     * @return 操作结果/operating result
     * @throws NulsException 保存区块有可能出现异常，请捕获后谨慎处理/There may be exceptions to the save block, please handle it carefully after capture.
     */
    Result saveBlock(Block block) throws NulsException;

    /**
     * 回滚区块
     * roll back the block to the store.
     *
     * @param block 完整区块/whole block
     * @return 操作结果/operating result
     * @throws NulsException 回滚区块有可能出现异常，请捕获后谨慎处理/There may be exceptions to the roll back block, please handle it carefully after capture.
     */
    Result rollbackBlock(Block block) throws NulsException;

    /**
     * 转发区块给连接的其他对等节点，允许一个列外（不转发给它）
     * Forward block to other peers of the connection, allowing one column (not forward to it)
     *
     * @param block       完整区块/the whole block
     * @param excludeNode 需要排除的节点，一般是因为从该节点处接收的本区块/The nodes that need to be excluded are generally due to the block received from the node.
     * @return 转发结果/forward results
     */
    Result forwardBlock(SmallBlock block, Node excludeNode);

    /**
     * 广播区块给连接的其他对等节点
     * The broadcast block gives the connection to other peers.
     *
     * @param block 完整区块/the whole block
     * @return 广播结果/Broadcast the results
     */
    Result broadcastBlock(SmallBlock block);
}
```



- DownloadService

```java
/**
 * 区块/交易下载服务接口
 * Block/transaction download service interface.
 */
public interface DownloadService {

    /**
     * 从指定节点处根据hash下载一个区块，下载过程中线程是阻塞的
     * Download a block according from the node to the hash, and the download process is blocked.
     *
     * @param hash 区块摘要/block hash
     * @param node 指定的节点/Specified node
     * @return 区块及结果/ block & results
     */
    Result<Block> downloadBlock(NulsDigestData hash, Node node);

    /**
     * 根据交易摘要列表从指定节点处下载交易列表，下载过程中线程是阻塞的
     * Download the transaction list from the specified node according to the transaction summary list, and the thread is blocked in the download process.
     *
     * @param txHashList 想要下载的交易摘要列表/The list of transactions that you want to download.
     * @param node       指定的节点/Specified node
     * @return 交易列表的封装对象/A wrapper object for a transaction list.
     */
    Result<TxGroup> downloadTxGroup(List<NulsDigestData> txHashList, Node node);

    /**
     * 返回下载是否完成的结果
     * Returns the results of the download.
     */
    Result isDownloadSuccess();

    /**
     * 重新检查当前状态是否需要重新同步区块，如果需要则下载
     * Recheck whether the current state needs to be resynchronized, and download if necessary.
     */
    Result reset();

}

```



- TransactionService

```java
/**
 * 交易操作服务接口
 * Transaction operation service interface.
 */
public interface TransactionService {
    /**
     * 确认交易时调用的方法，对交易相关的业务进行提交操作
     * Identify the method that is invoked during the transaction and submit the transaction related business.
     *
     * @param tx            操作的交易/The transaction of the operation
     * @param secondaryData 辅助数据（可以为空）/Secondary data (available for null)
     * @return 操作结果/operating results
     */
    Result commitTx(Transaction tx, Object secondaryData);

    /**
     * 回滚交易时调用的方法，对交易相关的业务进行回退操作
     * The method invoked when the transaction is rolled back and the transaction related business is returned.
     *
     * @param tx            操作的交易/The transaction of the operation
     * @param secondaryData 辅助数据（可以为空）/Secondary data (available for null)
     * @return 操作结果/operating results
     */
    Result rollbackTx(Transaction tx, Object secondaryData);

    /**
     * 转发交易给连接的其他对等节点，允许一个列外（不转发给它）
     * Forward Transaction to other peers of the connection, allowing one column (not forward to it)
     *
     * @param tx          完整交易/the whole transaction
     * @param excludeNode 需要排除的节点，一般是因为从该节点处接收的本交易/The nodes that need to be excluded are generally due to the transaction received from the node.
     * @return 转发结果/forward results
     */
    Result forwardTx(Transaction tx, Node excludeNode);

    /**
     * 广播交易给连接的其他对等节点
     * The broadcast transaction gives the connection to other peers.
     *
     * @param tx 完整交易/the whole transaction
     * @return 广播结果/Broadcast the results
     */
    Result broadcastTx(Transaction tx);

    /**
     * 冲突检测，检测如果传入的交易列表中有相冲突的交易，则返回失败，写明失败原因及所有的应该舍弃的交易列表
     * <p>
     * Conflict detection, which detects conflicting transactions in the incoming transaction list, returns failure,
     * indicating the cause of failure and all the list of trades that should be discarded.
     *
     * @param txList 需要检查的交易列表/A list of transactions to be checked.
     * @return 操作结果：成功则返回successResult，失败时，data中返回丢弃列表，msg中返回冲突原因
     * Operation result: success returns successResult. When failure, data returns the discard list, and MSG returns the cause of conflict.
     */
    ValidateResult conflictDetect(List<Transaction> txList);
}
```

### 模块交易

 通用交易数据结构

- 转账交易
- CoinBase交易

| 尺寸 | 字段       | 数据类型 | 说明           |
| ---- | ---------- | -------- | -------------- |
| 2    | type       | uint16   | 交易类型       |
| 6    | time       | uint48   | 时间戳         |
| ??   | remark     | VarByte  | 备注           |
| ??   | txData     | ??       | 交易数据       |
| ??   | coinData   | ??       | 代币数据       |
| ??   | scriptSign | VarByte  | P2PKHScriptSig |

####
