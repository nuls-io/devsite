# 多重签名账户

## 介绍

多重签名账户，是相对于单签名账户来讲的，我们日常使用的普通账户地址就是单签名账户在创建交易时需要用我们账户私钥签名，来保证我们的交易是安全的不被串改的。多重签名账户地址是有由多个普通账户的公钥，经过一定的计算生成的。在创建交易时，需要由创建这个多签账户的多个公钥所对应的私钥来签名，才能保证多签账户交易的安全。

在生成多签账户时是由N个普通地址的公钥，来生成一个需要M个签名才能创建合法交易的多签账户，N≥M。因此这个账户一般是需要多个人来签名，并且达到最小签名数(M)才能动用账户的token。

## 功能

在NULS2.0中多重签名账户可以做一些与普通账户相同的操作：

- 创建多签转账交易，包含多资产转账
- 为多签账户设置别名
- 创建共识节点
- 参与共识

## 使用方法

我们会介绍多重签名账户各个功能的使用方式，可能会遇到的问题，以及开发者们在组装多签交易时需要注意的问题。开发者在阅读本文之前可能需要用户对NULS2.0普通交易有一定的了解。本文包含部分接口说明，更完整的说明请参考模块说明文档。

**生成多重签名账户**

多重签名账户是由多个普通地址生成的，目的是为了满足让多人控制一个账户的资产交易的功能场景。因此在创建多签账户时，既不会生成公钥也不会生成私钥，而是生成的多签账户信息包含产生这个账户时所有参与人的公钥、最小签名数，多签账户地址等信息。   
值得注意的是参与人公钥列表是一个具有兼容性的字符串列表参数，该列表里面可以传入参与创建的普通账户公钥的字符串或者账户地址的字符串，且可以混合传入，例如有A、B、C三个普通账户，需要创建多重签名账户，那么公钥列表可以如下: 
```
pubKeys = [A账户的公钥，B账户的地址，C账户的公钥]
```
注意
* 如果要传入账户地址，那么需要该地址账户存在于调用接口的节点中，传公钥字符串没有此限制。  
* pubKeys公钥列表中各个公钥的传入顺序，不会对最终生成的账户产生影响。  
* 公钥字符串可以调用账户模块的接口`ac_getPubKey`得到。

**创建多签转账交易**  

在NULS2.0中多重签名地址转账交易，与普通地址转账交易的协议是一致的，具有相同的交易类型（type值）。但是多签转账交易仍然具有特殊性，组装和验证交易的规则与普通交易有一定的区别，需要注意的有：  

- 交易from中不能混合多个不同的地址，多签转账交易如果组装了多个from，那么所有from中的地址都只能是同一个多签地址，from中的资产可以是不同的，交易to中没有该限制。
- 组装新交易的时候可以签名也可以不签名。
- 签名后达到最小签名数则自动发送广播交易。
- 无需对已达最小签名数的交易继续签名，那只会增大交易数据，不会为交易验证以及安全性带来更多的便利。

**签名**  

多签交易组装完成后，一般还需要将交易数据交给各个多签账户控制者单独为交易进行签名，以致满足多签账户最小签名数，最终得到完整合法的交易数据。NULS2.0的多签交易签名接口，每次执行完签名后会自动验证交易是否达到最小签名数，来决定是否发送并广播交易，无需用户自己单独广播交易。  
- 多人签名时，下一个签名者只需要得到返回值中的tx的值即可。  

**设置别名**、**创建节点**、**委托**、**退出委托**、**停止节点**的交易与普通账户的交易基本一致，只是签名方式不同而已。

## 接口
### ac_createMultiSignAccount
创建多签账户/create a multi sign account  

| 参数名   |    参数类型     | 参数描述                                                     | 是否非空 |
| -------- | :-------------: | ------------------------------------------------------------ | :------: |
| chainId  |       int       | 链id                                                         |    是    |
| pubKeys  | list&lt;string> | 公钥集合(任意普通地址的公钥或存在于当前节点中的普通账户地址) |    是    |
| minSigns |       int       | 最小签名数                                                   |    是    |

返回值

| 字段名  | 字段类型 | 参数描述     |
| ------- | :------: | ------------ |
| address |  string  | 多签账户地址 |


### ac_createMultiSignTransfer  
创建多签地址转账交易/create multi sign transfer

| 参数名                                                       |  参数类型  | 参数描述                                   | 是否非空 |
| ------------------------------------------------------------ | :--------: | ------------------------------------------ | :------: |
| chainId                                                      |    int     | 链id                                       |    是    |
| inputs                                                       |    list    | 交易支付方数据                             |    是    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address      |   string   | 账户地址                                   |    是    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsChainId |  integer   | 资产的链ID                                 |    是    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsId     |  integer   | 资产ID                                     |    是    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount       | biginteger | 数量                                       |    是    |
| outputs                                                      |    list    | 交易接受方数据                             |    是    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address      |   string   | 账户地址                                   |    是    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsChainId |  integer   | 资产的链ID                                 |    是    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsId     |  integer   | 资产ID                                     |    是    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount       | biginteger | 数量                                       |    是    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lockTime     |    long    | 解锁时间, -1为一直锁定, 0为不锁定(默认)    |    否    |
| remark                                                       |   string   | 交易备注                                   |    是    |
| signAddress                                                  |   string   | 第一个签名账户地址(不填则只创建交易不签名) |    否    |
| signPassword                                                 |   string   | 第一个签名账户密码(不填则只创建交易不签名) |    否    |

返回值   

| 字段名    | 字段类型 | 参数描述                                                    |  
| --------- | :------: | ----------------------------------------------------------- |
| tx        |  string  | 完整交易序列化字符串,如果交易没达到最小签名数可继续签名     |
| txHash    |  string  | 交易hash                                                    |
| completed | boolean  | true:交易已完成(已广播),false:交易没完成,没有达到最小签名数 |


### ac_signMultiSignTransaction 
多签交易签名/sign MultiSign Transaction

| 参数名       | 参数类型 | 参数描述       | 是否非空 |
| ------------ | :------: | -------------- | :------: |
| chainId      |   int    | 链id           |    是    |
| tx           |  string  | 交易数据字符串 |    是    |
| signAddress  |  string  | 签名账户地址   |    是    |
| signPassword |  string  | 签名账户密码   |    是    |

返回值  

| 字段名    | 字段类型 | 参数描述                                                    |  
| --------- | :------: | ----------------------------------------------------------- |
| tx        |  string  | 完整交易序列化字符串,如果交易没达到最小签名数可继续签名     |
| txHash    |  string  | 交易hash                                                    |
| completed | boolean  | true:交易已完成(已广播),false:交易没完成,没有达到最小签名数 |

### ac_setMultiSignAlias   
设置别名/set the alias of multi sign account  

| 参数名       | 参数类型 | 参数描述                                   | 是否非空 |  
| ------------ | :------: | ------------------------------------------ | :------: |
| chainId      |   int    | 链id                                       |    是    |
| address      |  string  | 多签账户地址                               |    是    |
| alias        |  string  | 别名                                       |    是    |
| signAddress  |  string  | 第一个签名账户地址(不填则只创建交易不签名) |    否    |
| signPassword |  string  | 第一个签名账户密码(不填则只创建交易不签名) |    否    |

返回值   

| 字段名    | 字段类型 | 参数描述                                                    |  
| --------- | :------: | ----------------------------------------------------------- |
| tx        |  string  | 完整交易序列化字符串,如果交易没达到最小签名数可继续签名     |
| txHash    |  string  | 交易hash                                                    |
| completed | boolean  | true:交易已完成(已广播),false:交易没完成,没有达到最小签名数 |



### cs_createMultiAgent  

多签账户创建节点/Multi-Sign Account create agent transaction   

| 参数名         | 参数类型 | 参数描述              | 是否非空 |  
| -------------- | :------: | --------------------- | :------: |
| chainId        |   int    | 链id                  |    是    |
| agentAddress   |  string  | 节点地址(多签地址)    |    是    |
| packingAddress |  string  | 节点出块地址          |    是    |
| rewardAddress  |  string  | 奖励地址,默认节点地址 |    否    |
| commissionRate |   int    | 佣金比例              |    是    |
| deposit        |  string  | 抵押金额              |    是    |
| password       |  string  | 签名账户密码          |    是    |
| signAddress    |  string  | 签名账户地址          |    是    |

返回值   

| 字段名    | 字段类型 | 参数描述                                                    |  
| --------- | :------: | ----------------------------------------------------------- |
| tx        |  string  | 完整交易序列化字符串,如果交易没达到最小签名数可继续签名     |
| txHash    |  string  | 交易hash                                                    |
| completed | boolean  | true:交易已完成(已广播),false:交易没完成,没有达到最小签名数 |



### cs_multiDeposit 

多签账户委托共识/Multi-Sign Account deposit agent transaction   

| 参数名      | 参数类型 | 参数描述     | 是否非空 |  
| ----------- | :------: | ------------ | :------: |
| chainId     |   int    | 链id         |    是    |
| address     |  string  | 多签账户地址 |    是    |
| agentHash   |  string  | 节点HASH     |    是    |
| deposit     |  string  | 委托金额     |    是    |
| password    |  string  | 签名账户密码 |    是    |
| signAddress |  string  | 签名账户地址 |    是    |

返回值   

| 字段名    | 字段类型 | 参数描述                                                    |  
| --------- | :------: | ----------------------------------------------------------- |
| tx        |  string  | 完整交易序列化字符串,如果交易没达到最小签名数可继续签名     |
| txHash    |  string  | 交易hash                                                    |
| completed | boolean  | true:交易已完成(已广播),false:交易没完成,没有达到最小签名数 |



### cs_multiWithdraw  

多签账户退出共识/Multi-Sign Account withdraw deposit agent transaction  

| 参数名      | 参数类型 | 参数描述         | 是否非空 |  
| ----------- | :------: | ---------------- | :------: |
| chainId     |   int    | 链id             |    是    |
| address     |  string  | 多签账户地址     |    是    |
| txHash      |  string  | 加入共识交易HASH |    是    |
| password    |  string  | 签名账户密码     |    是    |
| signAddress |  string  | 签名账户地址     |    是    |

返回值   

| 字段名    | 字段类型 | 参数描述                                                    |  
| --------- | :------: | ----------------------------------------------------------- |
| tx        |  string  | 完整交易序列化字符串,如果交易没达到最小签名数可继续签名     |
| txHash    |  string  | 交易hash                                                    |
| completed | boolean  | true:交易已完成(已广播),false:交易没完成,没有达到最小签名数 |



### cs_stopMultiAgent  

多签账户注销节点/Multi-Sign Account stop agent   

| 参数名      | 参数类型 | 参数描述           | 是否非空 |
| ----------- | :------: | ------------------ | :------: |
| chainId     |   int    | 链id               |    是    |
| address     |  string  | 节点地址(多签地址) |    是    |
| password    |  string  | 签名账户密码       |    是    |
| signAddress |  string  | 签名账户地址       |    是    |

返回值   

| 字段名    | 字段类型 | 参数描述                                                    |  
| --------- | :------: | ----------------------------------------------------------- |
| tx        |  string  | 完整交易序列化字符串,如果交易没达到最小签名数可继续签名     |
| txHash    |  string  | 交易hash                                                    |
| completed | boolean  | true:交易已完成(已广播),false:交易没完成,没有达到最小签名数 |
