# 概述：
此文档描述 NULS P2P 网络字节流协议。

## 总览
NULS Protocol Package

###  Network Message

```
*---------------------------------------------------------------*
|    Message header(18 Byte)    |    Message body(??)           |
*---------------------------------------------------------------*
```

NULS package 由 Message Header 与 Message Body 组成。

##### Message header

| 字节   | 字段                | 数据类型   | 说明               |
| ---- | ----------------- | ------ | ---------------- |
| 8    | Netty             | uint64 | 总体数据长度|
| 4    | MagicNumber       | uint32 | 魔法参数，划分网络        |
| 4    | MessageBodyLength | uint32 | MessageBody长度    |
| 1    | Xor               | uint8  | MessageBody奇偶校验位 |
| 1    | EncryptType       | uint8  | 加密方式，网络层数据加密扩展   |
| 2    | Module ID         | uint16 | Payload 源模块 ID|

Remark:
> Message Header 固定为18字节，DataLength字段指出了 Message Body的长度。

|ModuleID|模块|
|---|---|
|3|Protocol Module|
|4|Network Module|

##### Message body

| 字节   | 字段        | 数据类型   | 说明   |
| ---- | --------- | ------ | ---- |
| 2    | EventType | uint32 | 事件ID |

Remark:
> EventType 由模块自己定义

##### 网络模块事件表

| EventID | Event |
|---|---|
|1|Get Version|
|2|Version|
|3|Get Node|
|4|Node|
|5|Get NodeIP|
|6|NodeIP|
|7|Handshake|
|8|P2P Node|

##### 协议模块事件表

| EventID | Event |
|---|---|
|1|Not Found|
|2|New Transaction|
|3|Get Block|
|4|Block|
|5|Get Block By Hash|
|6|Get Block By Height|
|7|Get Block Header|
|8|Block Header|
|9|Get Transaction Group|
|10|Transaction Group|
|11|New Block|
|12|Get Blocks Hash|
|13|Blocks Hash|
|14|String|
|15|Complete|
|16|Request React|
|17|Forward New Transaction|
|18|Forward New Block|
|19|Get Small Block|
[20|Get Transaction|

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
| 1    | Digest Algorithm Type | Byte      | 算法ID：0 SHA256，1 SHA160 |
| ??   | Digest Data        | VarByte | 签名   |

### NulsSignData

签名结构体

| 字节   | 字段          | 数据类型      | 说明   |
| ---- | ----------- | --------- | ---- |
| 1    | Algorithm Type | Byte      | 算法ID：目前为0，代表ECC |
| ??   | Signature Data   | VarByte | 签名数据   |

Algorithm Type


### P2PKHScriptSig

交易签名结构体

| 字节   | 字段           | 数据类型         | 说明   |
| ---- | ------------ | ------------ | ---- |
| 1    | publicKey    | VarString    | 公钥   |
| ??   | NulsSignData | NulsSignData | 签名结构 |

### Int48

| 字节   | 字段           | 数据类型         | 说明   |
| ---- | ------------ | ------------ | ---- |
| 6| Time| Timestamp| 时间戳| 

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
short BLOCK			= 1;
short BLOCKS 			= 2;
short TRANSACTION 	= 3;
short HASHES 			= 4;
short REQUEST 		= 7;
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
| 6    | NetworkTime     | uint48    | 网络时间          |
| ??   | NodeIp          | VarString | 对方网络地址        |
| ??   | Version         | VarString | 版本字符串         |

#### NETWORK_VERSION

| 尺寸   | 字段              | 数据类型      | 说明            |
| ---- | --------------- | --------- | ------------- |
| 2    | HandshakeType   | uint16    | 1. 请求   2. 响应 |
| 2    | ServerPort      | uint16    | 服务监听端口        |
| 4    | BestBlockHeight | uint32    | 最高高度          |
| ??   | BestBlockHash   | VarString | 最高块Hash字符串    |
| 6    | NetworkTime     | uint48    | 网络时间          |
| ??   | NodeIp          | VarString | 对方网络地址        |
| ??   | Version         | VarString | 版本字符串         |

#### NETWORK_NODE

| 尺寸   | 字段        | 数据类型            | 说明     |
| ---- | --------- | --------------- | ------ |
| ??   | NodeCount | VarInt          | 节点数    |
| ??   | Node[]    | Node[NodeCount] | 节点信息数组 |

#### NETWORK_HANDSHAKE

| 尺寸   | 字段              | 数据类型      | 说明            |
| ---- | --------------- | --------- | ------------- |
| 2    | HandshakeType   | uint16    | 1. 请求   2. 响应 |
| 2    | ServerPort      | uint16    | 服务监听端口        |
| 4    | BestBlockHeight | uint32    | 最高高度          |
| ??   | BestBlockHash   | VarString | 最高块Hash字符串    |
| 6    | NetworkTime     | uint48    | 网络时间          |
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
| ??   | hash | VarString    | 请求但未找到的hash |

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

