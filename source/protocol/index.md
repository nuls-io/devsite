title: Package
---------

## Overview

NULS uses custom messaging for communication over the TCP protocol.

- Digital binary stream using little endian。
- Floating point numbers convert to integers and transfer by little endian

## Message Structre

The message consists of a 10-byte header and payload.

```
*---------------------------------------------------------------*
|       Header(10 Byte)         |            Payload            |
*---------------------------------------------------------------*
```

## Header

The main role of the header is to indicate the payload length, verify data integrity, and solve TCP sticky packets.

| Len  | Fields            | Data Type   | Remark               |
| ---- | ----------------- | ------ | ---------------- |
| 4    | MagicNumber       | uint32 | Packet valid flag        |
| 4    | PayloadLength     | uint32 | Payload length    |
| 1    | Xor               | uint8  | Payload valid flag |
| 1    | EncryptType       | uint8  | Encryption mode   |

Remark:
> - MagicNumber In addition to being validated as a valid check, it is also used for the division of the main network and test.
> - EncryptType Currently reserved field for extended encryption.

> Known MagicNumber

|value|net|
|:---:|---|
|0x0133EEE8| Main-net|
|0x0133EEFA| Test-net|

## Payload

The payload is a variable-length binary stream, and PayloadLength in the header describes the length of the payload.

The first 8 bytes of the payload are in a fixed format.

| Len  | Fields            | Data Type   | Remark               |
| ---- | --------- | ------ | ---- |
| 4    | ModuleID  | uint32 | Module ID |
| 4    | EventType | uint32 | Eevent ID |

- ModuleID indicates which module the load was sent from.
- EventType is the module's custom event type

The network layer forwards the payload to the module specified by ModuleID, and the module looks up the specific message processor for further processing according to the EventType.
Currently only two module data is sent via P2P network broadcast.

- Network = 4
- Protocol = 10

## Common Struecture

### VarInt

Variable-length integers that can be encoded based on the values expressed to save space.

| Value         | Len  | Structure            |
| ------------- | ---- | ------------- |
| < 0xfd        | 1    | uint8         |
| <= 0xffff     | 3    | 0xfd + uint16 |
| <= 0xffffffff | 5    | 0xfe + uint32 |
| > 0xffffffff  | 9    | 0xff + uint64 |

### VarString

A variable-length byte stream consisting of a variable-length buffer. The string is encoded in UTF8.

| Len  | Fields            | Data Type   | Remark               |
| ------ | ------ | ------------- | ------------- |
| ?      | length | VarInt        | 字符串的长度，以字节为单位 |
| length | value  | uint8[length] | 字符串本身         |

### VarByte

Variable-length buffer, consistent with the VarString implementation.

| Len  | Fields            | Data Type   | Remark               |
| ------ | ------ | ------------ | ------------- |
| ?      | length | VarInt       | 字符串的长度，以字节为单位 |
| length | data   | byte[length] | 字符串本身         |

### NulsDigestData

Nuls Digest Data

| Len  | Fields            | Data Type   | Remark               |
| ---- | ------------- | --------- | ---- |
| 1    | digestAlgType | Byte      | 算法ID |
| ??   | digest        | VarString | 摘要   |

### NulsSignData

Nuls Signature Data

| Len  | Fields            | Data Type   | Remark               |
| ---- | ----------- | --------- | ---- |
| 1    | signAlgType | Byte      | Algorithm ID |
| ??   | signature   | VarString | Signature |



### P2PKHScriptSig

NULS transaction signature

| Len  | Fields            | Data Type   | Remark               |
| ---- | ------------ | ------------ | ---- |
| 1    | publicKey    | VarString    | Public Key   |
| ??   | NulsSignData | NulsSignData | Signagture Data |

### Int48

6-byte timestamp.

### Transaction

| Len  | Fields            | Data Type   | Remark               |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | Trasaction Type           |
| 6    | time       | uint48  | timestamp            |
| ??   | remark     | VarByte | remark             |
| ??   | txData     | ??      | Transaction data           |
| ??   | coinData   | ??      | Token data           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |

### Node

节点信息

| Len  | Fields            | Data Type   | Remark               |
| ---- | ----------- | --------- | ------ |
| 4    | magicNumber | uint32    | Magic number    |
| 2    | Port        | uint16    | Server Port |
| ??   | IP          | VarString | Server IP String   |

### NotFoundType

```java
short BLOCK = 1;
short BLOCKS = 2
short TRANSACTION = 3;
short HASHES = 4;
```
