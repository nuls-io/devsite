# 共识交易说明

共识模块提供了四种与合约相关的共识交易，在模块启动时向合约模块注册创建四种合约共识交易的命令，使合约模块能够调用，使之可以创建与注销共识节点、委托与取消委托共识节点

## 1. 生成合约共识交易

### 1.1 创建共识节点

- 原始参数表 

    > **`创建共识节点的地址`、`共识奖励地址`固定为`当前合约地址`**
    
    
    |名称  |描述     |类型    |是否可选    |备注    |
    |:--:|:--:|:--:|:--:|:--:|
    |packingAddress    |打包地址     |byte[]     |是      |方法调用必填|
    |deposit    |保证金     |BigInteger     |是      |方法调用必填|
    |commissionRate    |佣金比例     |byte     |是      |方法调用必填 - 范围[10,100]|
    |agentAddress    |创建节点地址     |byte[]     |**否**      |底层默认为**`当前合约地址`**|
    |rewardAddress    |奖励地址     |byte[]     |**否**      |底层默认为**`当前合约地址`**|

- 注册信息

    > **共识模块向智能合约模块注册的创建合约共识节点的交易命令信息**

    |模块代码  |cmd名称     |注册类型   |参数名称列表 |返回值类型    |备注    |
    |:--:|:--:|:--:|:--:|:--:|:--:|
    |consensus    | cs_createContractAgent |0(NEW_TX)|List.of("packingAddress","deposit","commissionRate")|1(STRING_ARRAY)     |创建共识节点|
    
- 交易类型 
  
    **txType = `20`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    >
    > 调用此方法时，共识模块此命令将收到以下参数
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:--:|:--:|:--:|:--:|:--:|
    |packingAddress    |打包地址     |String     |AddressTool.getStringAddressByBytes(byte[])|略|
    |deposit    |保证金     |String     |BigInteger - toString|略|
    |commissionRate    |佣金比例     |String     |Byte - toString|范围[10,100]|
    |chainId    |当前链ID     |int     |-|底层提供参数|
    |contractAddress    |合约地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |contractSender    |合约调用者地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |contractBalance    |合约地址的当前余额     |String     |BigInteger -toString|底层提供参数 - 生成交易时使用此值校验余额|
    |contractNonce    |合约地址的当前nonce值     |String     |RPCUtil.encode(byte[])|底层提供参数 - 生成交易时使用此nonce组装交易|
    |blockTime    |当前打包的区块时间     |long     |-|底层提供参数 - 生成交易时用此作为交易时间|

- 返回值说明

    - 智能合约虚拟机收到的是**`String[]`** 字符串数组类型
    
        |index  |描述 |字符串转换逻辑    |
        |:--:|:--:|:--:|
        |0    |交易hash     |略|
        |1    |交易序列化字符串     |RPCUtil.encode(byte[])|
    
    - 调用者收到的是**`String`** 字符串类型

        |描述 |字符串转换逻辑    |
        |:--:|:--:|
        |交易hash     |略|

### 1.2 合约委托共识节点

- 原始参数 

    > **`委托地址`固定为`当前合约地址`**
    
    |名称  |描述     |类型    |是否可选    |备注    |
    |:--:|:--:|:--:|:--:|:--:|
    |agentHash    |创建合约共识节点交易hash     |String     |是      |方法调用必填|
    |deposit    |委托金额     |BigInteger     |是      |方法调用必填|
    |address    |委托地址     |byte[]     |**否**      |底层默认为**`当前合约地址`**|

- 注册信息

    > **共识模块向智能合约模块注册的创建合约委托共识节点的交易命令信息**
    
    |模块代码  |cmd名称     |注册类型   |参数名称列表 |返回值类型    |备注    |
    |:--:|:--:|:--:|:--:|:--:|:--:|
    |consensus    | cs_contractDeposit |0(NEW_TX)|List.of("agentHash","deposit")|1(STRING_ARRAY)     |委托共识节点|

- 交易类型 
  
    **txType = `21`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    >
    > 调用此方法时，共识模块此命令将收到以下参数
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:--:|:--:|:--:|:--:|:--:|
    |agentHash    |创建合约共识节点交易hash     |String     |略|略|
    |deposit    |委托金额     |String     |BigInteger - toString|略|
    |chainId    |当前链ID     |int     |-|底层提供参数|
    |contractAddress    |合约地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |contractSender    |合约调用者地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |contractBalance    |合约地址的当前余额     |String     |BigInteger - toString|底层提供参数 - 生成交易时使用此值校验余额|
    |contractNonce    |合约地址的当前nonce值     |String     |RPCUtil.encode(byte[])|底层提供参数 - 生成交易时使用此nonce组装交易|
    |blockTime    |当前打包的区块时间     |long     |-|底层提供参数 - 生成交易时用此作为交易时间|

- 返回值说明
  
    - 智能合约虚拟机收到的是**`String[]`** 字符串数组类型
    
        |index  |描述 |字符串转换逻辑    |
        |:--:|:--:|:--:|
        |0    |交易hash     |略|
        |1    |交易序列化字符串     |RPCUtil.encode(byte[])|
    
    - 调用者收到的是**`String`** 字符串类型

        |描述 |字符串转换逻辑    |
        |:--:|:--:|
        |交易hash     |略|

### 1.3 合约退出共识节点

- 原始参数 

    > **`创建节点的地址`固定为`当前合约地址`**
    
    |名称  |描述     |类型    |是否可选    |备注    |
    |:--:|:--:|:--:|:--:|:--:|
    |joinAgentHash    |加入共识时的交易hash     |String     |是      |方法调用必填|
    |agentAddress    |创建节点的地址     |byte[]     |**否**      |底层默认为**`当前合约地址`**|

- 注册信息

    > **共识模块向智能合约模块注册的创建合约退出共识节点的交易命令信息**
    
    |模块代码  |cmd名称     |注册类型   |参数名称列表 |返回值类型    |备注    |
    |:--:|:--:|:--:|:--:|:--:|:--:|
    |consensus    | cs_contractWithdraw |0(NEW_TX)|List.of("joinAgentHash")|1(STRING_ARRAY)     |退出委托共识节点|

- 交易类型 
  
    **txType = `22`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    >
    > 调用此方法时，共识模块此命令将收到以下参数
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:--:|:--:|:--:|:--:|:--:|
    |joinAgentHash    |加入共识时的交易hash     |String     |略|略|
    |chainId    |当前链ID     |int     |-|底层提供参数|
    |contractAddress    |合约地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |contractSender    |合约调用者地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |blockTime    |当前打包的区块时间     |long     |-|底层提供参数 - 生成交易时用此作为交易时间|

- 返回值说明
  
    - 智能合约虚拟机收到的是**`String[]`** 字符串数组类型
    
        |index  |描述 |字符串转换逻辑    |
        |:--:|:--:|:--:|
        |0    |交易hash     |略|
        |1    |交易序列化字符串     |RPCUtil.encode(byte[])|
    
    - 调用者收到的是**`String`** 字符串类型

        |描述 |字符串转换逻辑    |
        |:--:|:--:|
        |交易hash     |略|
    
    
### 1.4 合约注销共识节点

- 原始参数 
  
    > **`创建节点的地址`固定为`当前合约地址`**
    
    |名称  |描述     |类型    |是否可选    |备注    |
    |:--:|:--:|:--:|:--:|:--:|
    |agentAddress    |创建节点的地址     |byte[]     |**否**      |底层默认为**`当前合约地址`**|

- 注册信息

    > **共识模块向智能合约模块注册的创建合约注销共识节点的交易命令信息**
    
    |模块代码  |cmd名称     |注册类型   |参数名称列表 |返回值类型    |备注    |
    |:--:|:--:|:--:|:--:|:--:|:--:|
    |consensus    |cs_stopContractAgent     |0(NEW_TX)|`empty list`|1(STRING_ARRAY)     |注销共识节点|

- 交易类型 
  
    **txType = `23`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    >
    > 调用此方法时，共识模块此命令将收到以下参数
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:--:|:--:|:--:|:--:|:--:|
    |chainId    |当前链ID     |int     |-|底层提供参数|
    |contractAddress    |合约地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |contractSender    |合约调用者地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |blockTime    |当前打包的区块时间     |long     |-|底层提供参数 - 生成交易时用此作为交易时间|

- 返回值说明
  
    - 智能合约虚拟机收到的是**`String[]`** 字符串数组类型
    
        |index  |描述 |字符串转换逻辑    |
        |:--:|:--:|:--:|
        |0    |交易hash     |略|
        |1    |交易序列化字符串     |RPCUtil.encode(byte[])|
    
    - 调用者收到的是**`String`** 字符串类型

        |描述 |字符串转换逻辑    |
        |:--:|:--:|
        |交易hash     |略|
    

## 2. 合约共识交易数据获取方式

合约共识交易没有签名，由每个节点验证区块时生成这类交易，另外，这类交易也不在广播数据的范围内，需要从另外的接口调取，详细数据请通过 **以下接口** 来得到交易的_序列化字符串_数据。

以下是包含合约内部转账交易的执行结果

> 通过`RESTFUL`接口`/api/contract/result/{hash}` 
> 
> 或者 
> 
> 通过`JSONRPC`接口`getContractTxResult `, 请求数据: 

```json
{
"jsonrpc":"2.0",
"method":"getContractTxResult",
"params":[chainId, hash],
"id":1234
}
```
>
> 获取合约的执行结果

以下结果中，`contractTxList`即是本次合约执行后生成的交易，注意：这个结构里不限于合约共识交易，根据业务的不同会生成不同的合约内部交易，比如合约NULS资产转出交易 --> [智能合约NULS资产转出交易说明](http://120.77.241.8:10086/pierre/doc/blob/master/智能合约文档/NULS2.0/智能合约NULS资产转出交易说明.md)

```javascript
{
    "success": true,
    "data": {
        "flag": true,
        "data": {
            "success" : true,
            "errorMessage" : null,
            "contractAddress" : "tNULSeBaNBdmatSnyhbgwm2gdkJHzKtpR2nGbQ",
            "result" : null,
            "gasLimit" : 200000,
            "gasUsed" : 13766,
            "price" : 25,
            "totalFee" : "5100000",
            "txSizeFee" : "100000",
            "actualContractFee" : "344150",
            "refundFee" : "4655850",
            "value" : "2000000000000",
            "stackTrace" : null,
            "transfers" : [ ],
            "events" : [ ],
            "tokenTransfers" : [ ],
            "invokeRegisterCmds" : [ {
              "cmdName" : "cs_createContractAgent",
              "args" : {
                "contractBalance" : "2000000000000",
                "commissionRate" : "100",
                "chainId" : 2,
                "deposit" : "2000000000000",
                "contractAddress" : "tNULSeBaNBdmatSnyhbgwm2gdkJHzKtpR2nGbQ",
                "contractNonce" : "0000000000000000",
                "blockTime" : 1562930111,
                "packingAddress" : "tNULSeBaMtEPLXxUgyfnBt9bpb5Xv84dyJV98p",
                "contractSender" : "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG"
              },
              "cmdRegisterMode" : "NEW_TX",
              "newTxHash" : "6278df86951ef140b98a57a27ff764453ae437d8aea2888ded886eb70ee11348"
            } ],
            "contractTxList" : [ 
            "1400bf6b285d006600204aa9d1010000000000000000000000000000000000000000000000000000020002f246b18e8c697f00ed9bd22696998e469d3f824b020001d7424d91c83566eb94233b5416f2aa77709c03e1020002f246b18e8c697f00ed9bd22696998e469d3f824b648c0117020002f246b18e8c697f00ed9bd22696998e469d3f824b0200010000204aa9d1010000000000000000000000000000000000000000000000000000080000000000000000000117020002f246b18e8c697f00ed9bd22696998e469d3f824b0200010000204aa9d1010000000000000000000000000000000000000000000000000000ffffffffffffffff00" 
            ],
            "remark" : "call"
        }
    }
}
```













