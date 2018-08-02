# 概述：
此文档描述 NULS P2P 网络字节流协议。

## 总览
NULS Protocol Package

###  Network Message

```
*---------------------------------------------------------------*
|    Message header(10 Byte)    |    Message body(??)       |
*---------------------------------------------------------------*
```

NULS package 由 Message Header 与 Message Body 组成。

##### Message header

| 字节   | 字段                | 数据类型   | 说明               |
| ---- | ----------------- | ------ | ---------------- |
| 4    | MagicNumber       | uint32 | 魔法参数，划分网络        |
| 4    | MessageBodyLength | uint32 | MessageBody长度    |
| 1    | Xor               | uint8  | MessageBody奇偶校验位 |
| 1    | EncryptType       | uint8  | 加密方式，网络层数据加密扩展   |

Remark:
> Message Header 固定为10字节，DataLength字段指出了 Message Body的长度。

##### Message body

| 字节   | 字段        | 数据类型   | 说明   |
| ---- | --------- | ------ | ---- |
| 2    | ModuleID  | uint32 | 模块ID |
| 2    | EventType | uint32 | 事件ID |

Remark:
> ModuleID与MessageType组合起来，就是协议的唯一标识符。

##### Module ID

```java
short MODULE_ID_MICROKERNEL = 0;
short MODULE_ID_MQ = 1;
short MODULE_ID_DB = 2;
short MODULE_ID_CACHE = 3;
short MODULE_ID_NETWORK = 4;
short MODULE_ID_ACCOUNT = 5;
short MODULE_ID_EVENT_BUS = 6;
short MODULE_ID_CONSENSUS = 7;
short MODULE_ID_LEDGER = 8;
short MODULE_ID_RPC = 9;
short MODULE_ID_PROTOCOL = 10;
short MODULE_ID_NOTIFY = 11;
```

目前主要有两个模块的消息会跨网络传输:
1. network = 4
2. protocol = 10

##### Message types of network module

```java
short NETWORK_GET_VERSION = 01;
short NETWORK_VERSION = 02;
short NETWORK_NODE = 04;
short NETWORK_HANDSHAKE = 07;
short NETWORK_P2P_NODE = 08;
```

##### Message types of protocol module

```java
short PROTOCOL_NOT_FOUND = 1;
short PROTOCOL_NEW_TX = 2;
short PROTOCOL_GET_BLOCK = 3;
short PROTOCOL_BLOCK = 4;
short PROTOCOL_GET_BLOCKS_BY_HASH = 5;
short PROTOCOL_GET_BLOCKS_BY_HEIGHT = 6;
short PROTOCOL_GET_BLOCK_HEADER = 7;
short PROTOCOL_BLOCK_HEADER = 8;
short PROTOCOL_GET_TX_GROUP = 9;
short PROTOCOL_TX_GROUP = 10;
short PROTOCOL_NEW_BLOCK = 11;
short PROTOCOL_GET_BLOCKS_HASH = 12;
short PROTOCOL_BLOCKS_HASH = 13;
short PROTOCOL_STRING = 14;
short PROTOCOL_COMPLETE = 15;
short REQUEST_REACT = 16;
```

具体协议请参考后面的描述。

## 通用数据结构

### VarInt

变长整数，可以根据表达的值进行编码以节省空间。

| 值             | 长度   | 格式            |
| ------------- | ---- | ------------- |
| < 0xfd        | 1    | uint8         |
| <= 0xffff     | 3    | 0xfd + uint16 |
| <= 0xffffffff | 5    | 0xfe + uint32 |
| > 0xffffffff  | 9    | 0xff + uint64 |

### VarString

变长字节流，由一个变长缓冲区构成。字符串采用UTF8编码。

| 尺寸     | 字段     | 数据类型          | 说明            |
| ------ | ------ | ------------- | ------------- |
| ?      | length | VarInt        | 字符串的长度，以字节为单位 |
| length | value  | uint8[length] | 字符串本身         |

### VarByte

变长缓冲区，与VarString实现一致。

| 尺寸     | 字段     | 数据类型         | 说明            |
| ------ | ------ | ------------ | ------------- |
| ?      | length | VarInt       | 字符串的长度，以字节为单位 |
| length | data   | byte[length] | 字符串本身         |

### NulsDigestData

摘要结构体

| 字节   | 字段            | 数据类型      | 说明   |
| ---- | ------------- | --------- | ---- |
| 1    | digestAlgType | Byte      | 算法ID |
| ??   | digest        | VarString | 摘要   |

### NulsSignData

签名结构体

| 字节   | 字段          | 数据类型      | 说明   |
| ---- | ----------- | --------- | ---- |
| 1    | signAlgType | Byte      | 算法ID |
| ??   | signature   | VarString | 签名   |



### P2PKHScriptSig

交易签名结构体

| 字节   | 字段           | 数据类型         | 说明   |
| ---- | ------------ | ------------ | ---- |
| 1    | publicKey    | VarString    | 公钥   |
| ??   | NulsSignData | NulsSignData | 签名结构 |

### Int48

6字节时间戳。

### Transaction

| 尺寸   | 字段         | 数据类型    | 说明             |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | 交易类型           |
| 6    | time       | uint48  | 时间戳            |
| ??   | remark     | VarByte | 备注             |
| ??   | txData     | ??      | 交易数据           |
| ??   | coinData   | ??      | 代币数据           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |


### Node

节点信息

| 尺寸   | 字段          | 数据类型      | 说明     |
| ---- | ----------- | --------- | ------ |
| 4    | magicNumber | uint32    | 魔法数    |
| 2    | Port        | uint16    | 服务监听端口 |
| ??   | IP          | VarString | 节点IP   |

### NotFoundType

```java
short BLOCK = 1;
short BLOCKS = 2
short TRANSACTION = 3;
short HASHES = 4;
```

## 模块消息

### Message body of network nodule

#### NETWORK_GET_VERSION

| 尺寸   | 字段              | 数据类型      | 说明            |
| ---- | --------------- | --------- | ------------- |
| 2    | handshakeType   | uint16    | 1. 请求   2. 响应 |
| 2    | ServerPort      | uint16    | 服务监听端口        |
| 4    | BestBlockHeight | uint32    | 最高高度          |
| ??   | BestBlockHash   | VarString | 最高块Hash字符串    |
| 6    | networkTime     | uint48    | 网络时间          |
| ??   | nodeIp          | VarString | 对方网络地址        |
| ??   | Version         | VarString | 版本字符串         |

#### NETWORK_VERSION

| 尺寸   | 字段              | 数据类型      | 说明            |
| ---- | --------------- | --------- | ------------- |
| 2    | handshakeType   | uint16    | 1. 请求   2. 响应 |
| 2    | ServerPort      | uint16    | 服务监听端口        |
| 4    | BestBlockHeight | uint32    | 最高高度          |
| ??   | BestBlockHash   | VarString | 最高块Hash字符串    |
| 6    | networkTime     | uint48    | 网络时间          |
| ??   | nodeIp          | VarString | 对方网络地址        |
| ??   | Version         | VarString | 版本字符串         |

#### NETWORK_NODE

| 尺寸   | 字段        | 数据类型            | 说明     |
| ---- | --------- | --------------- | ------ |
| ??   | NodeCount | VarInt          | 节点数    |
| ??   | Node[]    | Node[NodeCount] | 节点信息数组 |

#### NETWORK_HANDSHAKE

| 尺寸   | 字段              | 数据类型      | 说明            |
| ---- | --------------- | --------- | ------------- |
| 2    | handshakeType   | uint16    | 1. 请求   2. 响应 |
| 2    | ServerPort      | uint16    | 服务监听端口        |
| 4    | BestBlockHeight | uint32    | 最高高度          |
| ??   | BestBlockHash   | VarString | 最高块Hash字符串    |
| 6    | networkTime     | uint48    | 网络时间          |
| ??   | nodeIp          | VarString | 对方网络地址        |
| ??   | Version         | VarString | 版本字符串         |

#### NETWORK_P2P_NODE

p2p节点信息

| 尺寸   | 字段   | 数据类型      | 说明     |
| ---- | ---- | --------- | ------ |
| 2    | Port | uint16    | 服务监听端口 |
| ??   | IP   | VarString | 节点IP   |



### Message body of protocol module

#### PROTOCOL_NOT_FOUND

| 尺寸   | 字段   | 数据类型         | 说明          |
| ---- | ---- | ------------ | ----------- |
| 1    | type | NotFoundType | 未找到的类型      |
| ??   | Hash | VarString    | 请求但未找到的hash |

#### PROTOCOL_NEW_TX

| 尺寸   | 字段          | 数据类型        | 说明   |
| ---- | ----------- | ----------- | ---- |
| ??   | transaction | Transaction |      |

#### PROTOCOL_GET_BLOCK

| 尺寸   | 字段        | 数据类型           | 说明     |
| ---- | --------- | -------------- | ------ |
| ??   | blockHash | NulsDigestData | 区块hash |

#### PROTOCOL_BLOCK

| 尺寸   | 字段            | 数据类型            | 说明     |
| ---- | ------------- | --------------- | ------ |
| ??   | header        | BlockHeader     | 块头     |
| ??   | Transaction[] | Transaction[??] | 节点信息数组 |

#### PROTOCOL_GET_BLOCKS_BY_HASH

| 尺寸   | 字段          | 数据类型           | 说明       |
| ---- | ----------- | -------------- | -------- |
| ??   | startHeight | NulsDigestData | 开始区块hash |
| ??   | endHeight   | NulsDigestData | 结束区块hash |

#### PROTOCOL_GET_BLOCKS_BY_HEIGHT

| 尺寸   | 字段        | 数据类型   | 说明     |
| ---- | --------- | ------ | ------ |
| 4    | startHash | uint32 | 开始区块高度 |
| 4    | endHash   | uint32 | 结束区块高度 |

#### PROTOCOL_BLOCK_HEADER

| 尺寸   | 字段         | 数据类型           | 说明       |
| ---- | ---------- | -------------- | -------- |
| ??   | PreHash    | NulsDigestData | 上一个块摘要   |
| ??   | MerkleHash | NulsDigestData | Merkle树根 |
| 6    | time       | uint48         | 时间       |
| 4    | height     | uint32         | 高度       |
| 4    | txCount    | uint32         | 交易数量     |
| ??   | extend     | VarByte        | 扩展数据     |
| ??   | scriptSign | P2PKHScriptSig | 签名       |

#### PROTOCOL_GET_TX_GROUP

| 尺寸   | 字段          | 数据类型             | 说明     |
| ---- | ----------- | ---------------- | ------ |
| ??   | TXHashCount | VarInt           | 交易摘要数  |
| ??   | TXHash      | NulsDigestData[] | 交易摘要数组 |

#### PROTOCOL_TX_GROUP
| 尺寸   | 字段        | 数据类型           | 说明   |
| ---- | --------- | -------------- | ---- |
| ??   | BlockHash | NulsDigestData | 块摘要  |
| ??   | TXCount   | VarInt         | 交易数  |
| ??   | TXHash    | Transaction[]  | 交易数组 |

#### PROTOCOL_NEW_BLOCK

| 尺寸   | 字段      | 数据类型             | 说明     |
| ---- | ------- | ---------------- | ------ |
| ??   | header  | BlockHeader      | 块头     |
| ??   | TXCount | VarInt           | 交易数    |
| ??   | TXHash  | NulsDigestData[] | 交易摘要数组 |
| ??   | TXCount | VarInt           | 交易数    |
| ??   | TXHash  | Transaction[]    | 交易数组   |

#### PROTOCOL_GET_BLOCKS_HASH

| 尺寸   | 字段    | 数据类型   | 说明   |
| ---- | ----- | ------ | ---- |
| 4    | start | uint32 | 开始高度 |
| 4    | end   | uint32 | 结束高度 |

#### PROTOCOL_BLOCKS_HASH

| 尺寸   | 字段               | 数据类型             | 说明       |
| ---- | ---------------- | ---------------- | -------- |
| ??   | requestEventHash | NulsDigestData   | 请求Hash   |
| ??   | HeightListCount  | VarInt           | Hash列表数量 |
| ??   | Hash[]           | NulsDigestData[] | Hash列表   |

#### PROTOCOL_STRING

| 尺寸   | 字段   | 数据类型      | 说明   |
| ---- | ---- | --------- | ---- |
| ??   | Hash | VarString |      |

#### PROTOCOL_COMPLETE

| 尺寸   | 字段               | 数据类型           | 说明     |
| ---- | ---------------- | -------------- | ------ |
| ??   | requestEventHash | NulsDigestData | 请求Hash |
| 1    | success          | boolean        | 结果     |

#### REQUEST_REACT

| 尺寸   | 字段               | 数据类型           | 说明     |
| ---- | ---------------- | -------------- | ------ |
| ??   | requestEventHash | NulsDigestData | 请求Hash |

