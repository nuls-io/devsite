## Consensus  模块

### 介绍

- 模块名称：consensus

- 模块ID：7

- 说明：

  为区块链提供处理区块，交易，共识等功能。

### 配置

```ini
[consensus]
#Bootstrap class
bootstrap=io.nuls.consensus.poc.module.impl.PocConsensusModuleBootstrap
#是否参与出块
partake.packing=true
#系统默认的出块地址 System default address of Generate blocks
seed.nodes=6Hgdk4jM36DuiYUSb9CsZf19w6mUMWWs
```

### 服务

- ConsensusService

```java
public interface ConsensusService {

    /**
     * receive a new transaction, add in memory pool after verify success
     * @param tx
     * @return Result
     */
    Result newTx(Transaction<? extends BaseNulsData> tx);

    /**
     * receive block from other peers
     * @param block
     * @return Result
     */
    Result newBlock(Block block);

    /**
     * receive block from other peers
     * @param block
     * @param node
     * @return Result
     */
    Result newBlock(Block block, Node node);

    /**
     * synchronous block from other peers
     * @param block
     * @return Result
     */
    Result addBlock(Block block);

    /**
     * Roll back the latest block and roll back the status of the chain in the consensus service memory
     *
     * 回滚最新区块，同时回滚共识服务内存中链的状态
     * @return Result
     */
    Result rollbackBlock(Block block) throws NulsException;

    /**
     * Get all the transactions in the memory pool
     *
     * 获取内存池里面的所有交易
     * @return List<Transaction>
     */
    List<Transaction> getMemoryTxs();
}
```

### 模块交易

 通用交易数据结构

| 尺寸 | 字段       | 数据类型 | 说明           |
| ---- | ---------- | -------- | -------------- |
| 2    | type       | uint16   | 交易类型       |
| 6    | time       | uint48   | 时间戳         |
| ??   | remark     | VarByte  | 备注           |
| ??   | txData     | ??       | 交易数据       |
| ??   | coinData   | ??       | 代币数据       |
| ??   | scriptSign | VarByte  | P2PKHScriptSig |

#### 创建节点交易

- txData：Agent

##### Alias

| 尺寸 | 字段           | 数据类型 | 说明               |
| ---- | -------------- | -------- | ------------------ |
| ??   | agentAddress   | VarByte  | 用来创建节点的地址 |
| ??   | packingAddress | VarByte  | 节点的打包地址     |
|      | rewardAddress  | VarByte  | 结算地址           |
| ??   | deposit        | Na       | 保证金             |
| ??   | commissionRate | double   | 佣金比例           |

#### 委托交易

- txData：Deposit

##### Deposit

| 尺寸 | 字段      | 数据类型       | 说明           |
| ---- | --------- | -------------- | -------------- |
| ??   | address   | VarByte        | 委托者账户地址 |
| ??   | agentHash | NulsDigestData | 节点的hash值   |
|      | deposit   | Na             | 委托金额       |

#### 停止节点交易

- txData：StopAgent

##### StopAgent

| 尺寸 | 字段         | 数据类型       | 说明                   |
| ---- | ------------ | -------------- | ---------------------- |
| ??   | createTxHash | NulsDigestData | 创建节点时的交易hash值 |

#### 取消委托交易

- txData：CancelDeposit

##### CancelDeposit

| 尺寸 | 字段       | 数据类型       | 说明               |
| ---- | ---------- | -------------- | ------------------ |
| ??   | joinTxHash | NulsDigestData | 委托时交易的hash值 |

#### 黄牌交易

- txData：YellowPunishData

##### YellowPunishData

| 尺寸 | 字段 | 数据类型 | 说明 |
| ---- | ---- | -------- | ---- |
| ??   |      | uint32   |      |

#### 红牌交易

- txData：YellowPunishData

##### YellowPunishData

| 尺寸 | 字段       | 数据类型 | 说明   |
| ---- | ---------- | -------- | ------ |
| ??   | address    | VarByte  | 地址   |
| 2    | reasonCode | uint16   | 错误码 |
| ??   | evidence   | VarByte  | 原因   |
