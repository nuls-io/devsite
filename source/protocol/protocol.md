title: Protocol
---------------

## ID 定义

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

## 载荷定义

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

