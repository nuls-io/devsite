title: Transaction
------------------

## ID 定义

|数字|交易类型|说明|
|---|---|---|
|1|TX_TYPE_COINBASE| Coinbase |
|2|TX_TYPE_TRANSFER|转账|
|3|TX_TYPE_ACCOUNT_ALIAS|设置账户别名|
|4|TX_TYPE_REGISTER_AGENT|创建共识节点|
|5|TX_TYPE_JOIN_CONSENSUS|委托|
|6|TX_TYPE_CANCEL_DEPOSIT|撤销委托|
|7|TX_TYPE_YELLOW_PUNISH|黄牌警告|
|8|TX_TYPE_RED_PUNISH|红牌警告|
|9|TX_TYPE_STOP_AGENT|注销共识节点|

## 载荷定义

### TX_TYPE_COINBASE

| 尺寸   | 字段         | 数据类型    | 说明             |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | 1           |
| 6    | time       | uint48  | 时间戳            |
| ??   | remark     | VarByte |    备注数据          |
| ??   | txData     | byte[]  | 0xFFFFFFFF           |
| ??   | coinData   | CoinData| 交易 UTXO           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |

### TX_TYPE_TRANSFER

| 尺寸   | 字段         | 数据类型    | 说明             |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | 2           |
| 6    | time       | uint48  | 时间戳            |
| ??   | remark     | VarByte |    备注数据          |
| ??   | txData     | byte[]  | 0xFFFFFFFF           |
| ??   | coinData   | CoinData| 交易 UTXO           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |

### TX_TYPE_ACCOUNT_ALIAS

| 尺寸   | 字段         | 数据类型    | 说明             |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | 3           |
| 6    | time       | uint48  | 时间戳            |
| ??   | remark     | VarByte |    备注数据          |
| ??   | address    | VarByte  | 账户地址           |
| ??   | alias    | VarString  |  昵称           |
| ??   | coinData   | CoinData| 交易 UTXO           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |

### TX_TYPE_REGISTER_AGENT

| 尺寸   | 字段         | 数据类型    | 说明             |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | 4           |
| 6    | time       | uint48  | 时间戳            |
| ??   | remark     | VarByte |    备注数据          |
| 8   | deposit    | uint64  | 抵押金额           |
| 23   | agentAddress    | Address  |  节点地址           |
| 23   | packingAddress    | Address  |  打包地址           |
| 23   | rewardAddress    | Address  |  奖励地址           |
| 8   | commissionRate    | Double  |  昵称           |
| ??   | coinData   | CoinData| 交易 UTXO           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |

### TX_TYPE_JOIN_CONSENSUS

| 尺寸   | 字段         | 数据类型    | 说明             |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | 2           |
| 6    | time       | uint48  | 时间戳            |
| ??   | remark     | VarByte |    备注数据          |
| 8   | deposit     | byte[]  | 委托金额           |
| 23   | address     | byte[23]  | 地址           |
| 8   | agentHash     | NulsDigestData  | 委托节点地址           |
| ??   | coinData   | CoinData| 交易 UTXO           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |

### TX_TYPE_CANCEL_DEPOSIT

| 尺寸   | 字段         | 数据类型    | 说明             |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | 2           |
| 6    | time       | uint48  | 时间戳            |
| ??   | remark     | VarByte |    备注数据          |
| ??   | agentHash     | NulsDigestData  | 委托节点地址           |
| ??   | coinData   | CoinData| 交易 UTXO           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |

### TX_TYPE_YELLOW_PUNISH

| 尺寸   | 字段         | 数据类型    | 说明             |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | 2           |
| 6    | time       | uint48  | 时间戳            |
| ??   | remark     | VarByte |    备注数据          |
| ??   | count     | VarInt  | 惩罚数量           |
| ??   | addres		| Address[]| 被黄牌警告的节点地址|
| ??   | coinData   | CoinData| 交易 UTXO           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |

### TX_TYPE_RED_PUNISH

| 尺寸   | 字段         | 数据类型    | 说明             |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | 2           |
| 6    | time       | uint48  | 时间戳            |
| ??   | remark     | VarByte |    备注数据          |
| 23   | address    | byte[23]  | 惩罚数量           |
| 1   | reasonCode	| byte    | 处罚代码 |
| ??   | evidence   | VarByte | 证据		   |
| ??   | coinData   | CoinData| 交易 UTXO           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |

### TX_TYPE_STOP_AGENT

| 尺寸   | 字段         | 数据类型    | 说明             |
| ---- | ---------- | ------- | -------------- |
| 2    | type       | uint16  | 2           |
| 6    | time       | uint48  | 时间戳            |
| ??   | remark     | VarByte |    备注数据          |
| ??   | agentHash     | NulsDigestData  | 停止节点地址           |
| ??   | coinData   | CoinData| 交易 UTXO           |
| ??   | scriptSign | VarByte | P2PKHScriptSig |
