title: 总览
---------

## 概述

NULS 通过 TCP 协议，使用自定义报文通讯。

- 数字二进制流使用小端序。
- 浮点数移位为整数并遵循小端序传输

## 报文结构

报文由10字节的包头与载荷组成。

```
*---------------------------------------------------------------*
|       Header(10 Byte)         |            Payload            |
*---------------------------------------------------------------*
```

## 包头

包头主要作用是指出有效载荷长度，校验数据完整性，解决 TCP 粘包等问题。

| 字节   | 字段                | 数据类型   | 说明               |
| ---- | ----------------- | ------ | ---------------- |
| 4    | MagicNumber       | uint32 | 魔法参数，报文有效标志        |
| 4    | PayloadLength     | uint32 | 有效载荷长度    |
| 1    | Xor               | uint8  | 载荷奇偶校验位 |
| 1    | EncryptType       | uint8  | 加密方式，网络层数据加密扩展   |

Remark:
> - MagicNumber 除了作为报文有效校验外，还用于主网与测试的划分
> - EncryptType 当前为保留字段，用于扩展加密方式

> 已知 MagicNumber

|值|网络|
|:---:|---|
|0x0133EEE8|主网|
|0x0133EEFA|测试网|

## 载荷

载荷是不定长二进制流，包头中的 PayloadLength 描述了本次载荷长度。

有效载荷前8个字节为固定格式

| 字节   | 字段        | 数据类型   | 说明   |
| ---- | --------- | ------ | ---- |
| 4    | ModuleID  | uint32 | 模块ID |
| 4    | EventType | uint32 | 事件ID |

- ModuleID 指出本次载荷由哪个模块发出
- EventType 是模块自定义的事件类型

网络层将该载荷转发给 ModuleID 指定的模块，模块根据 EventType 查找具体的消息处理器做进一步的处理。
当前只有两个模块数据会通过 P2P 网络广播发送。

- Network = 4
- Protocol = 10

## 公共结构体

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
