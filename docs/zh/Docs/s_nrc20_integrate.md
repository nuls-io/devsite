# NRC20-Token对接指南

**前提: 测试网chainId=2, 主网chainId=1**

## 一、发起NRC20转账交易

对照接口说明文档中的接口编号

[JSONRPC接口说明文档](https://docs.nuls.io/zh/Docs/i_nuls-api_JSONRPC.html)

[RESTFUL接口说明文档](https://docs.nuls.io/zh/Docs/i_nuls-api_RESTFUL.html)

### 1. 钱包模式

调用4.4接口，创建并广播NRC20转账交易， 记录接口返回的交易hash。

### 2. 冷钱包模式

- JSONRPC方式

    [JSONRPC接口说明文档](https://docs.nuls.io/zh/Docs/i_nuls-api_JSONRPC.html)
    
    调用1.7接口，获取账户的NULS余额，与NULS的当前nonce值
    
    调用4.17接口 (可跳过)，估算调用合约需要的GAS，可不估算，离线写一个合理的值
    
    调用4.22接口，离线组装NRC20转账交易
    
    调用1.14接口或者1.15接口，签名交易
    
    调用3.3接口，广播交易，记录交易hash

- RESTFUL方式

    [RESTFUL接口说明文档](https://docs.nuls.io/zh/Docs/i_nuls-api_RESTFUL.html)
    
    调用1.10接口，获取账户的NULS余额，与NULS的当前nonce值
    
    调用4.17接口 (可跳过)，估算调用合约需要的GAS，可不估算，离线写一个合理的值
    
    调用4.22接口，离线组装NRC20转账交易
    
    调用1.16接口或者1.17接口，签名交易
    
    调用3.3接口，广播交易，记录交易hash

## 二、监控NRC20转账交易

### 1. 解析`调用合约`交易，交易类型是`16`，并取出交易hash

txType=16

### 2. 根据交易hash查询智能合约执行结果，三种查询方式任选其一

我们提供了`RESTFUL`和`JSONRPC`的HTTP请求方式获取数据, 也提供了`JAVA-SDK`查询执行结果

- 通过`RESTFUL`接口`/api/contract/result/{hash}`

    - 测试网请求URL: `http://beta.api.nuls.io/api/contract/result/{hash}`
    - 主网请求URL: `https://api.nuls.io/api/contract/result/{hash}`
    - [请求以及返回结果示例](https://docs.nuls.io/zh/Docs/i_nuls-api_RESTFUL.html#_4-8-%E8%8E%B7%E5%8F%96%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C) (`Example`部分)

- 通过`JSONRPC`接口`getContractTxResult`

    - 测试网请求URL: `http://beta.api.nuls.io/jsonrpc`
    - 主网请求URL: `https://api.nuls.io/api/jsonrpc`
    - [请求以及返回结果示例](https://docs.nuls.io/zh/Docs/i_nuls-api_JSONRPC.html#_4-8-%E8%8E%B7%E5%8F%96%E6%99%BA%E8%83%BD%E5%90%88%E7%BA%A6%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C) (`Example`部分)
    - 简单请求示例
        
        ```json
        {
            "jsonrpc":"2.0",
            "method":"getContractTxResult",
            "params":[chainId, hash], // 测试网chainId=2, 主网chainId=1
            "id":1234
        }
        ```
- 通过`JAVA-SDK`查询执行结果
    
    引入Mavan依赖
    
    ```xml
    <!-- JDK11环境下 -->
    <dependency>
        <groupId>io.nuls.v2</groupId>
        <artifactId>sdk4j</artifactId>
        <version>1.0.8.RELEASE</version>
    </dependency>
    
    <!-- JDK8环境下 -->
    <dependency>
        <groupId>io.nuls.v2</groupId>
        <artifactId>sdk4j-jdk8</artifactId>
        <version>1.0.8.RELEASE</version>
    </dependency>
    ```
    
    ```java
    // 测试网SDK初始化
    NulsSDKBootStrap.initTest("http://beta.api.nuls.io/");
    ```
    
    ```java
    // 主网SDK初始化
    NulsSDKBootStrap.initMain("https://api.nuls.io/");
    ```

    ```java
    // 结果查询
    Result result = NulsSDKTool.getContractResult("f0d1257b4f7897c8b2188d89e65047cfee5e9958b8e1dba688d076e04a51f90f");
    if(result.isSuccess()) {
        Map<String, Object> resultMap = (Map<String, Object>) result.getData();
        Map<String, Object> dataMap = (Map<String, Object>) resultMap.get("data");
        // 判断合约是否执行成功
        boolean success = Boolean.parseBoolean(dataMap.get("success").toString());
        if(!success) {
            // 合约执行失败，不会存在token转账信息
            return;
        }
        // 获取tokenTransfers集合
        List<Map<String, Object>> tokenTransfers = (List<Map<String, Object>>) dataMap.get("tokenTransfers");
        // 遍历tokenTransfers集合
        for(Map<String, Object> tokenTransfer : tokenTransfers) {
            // NRC20合约地址
            String contractAddress = tokenTransfer.get("contractAddress").toString();
            // token转出地址, 请自行做空值校验
            String from = (String) tokenTransfer.get("from");
            // token转入地址, 请自行做空值校验
            String to = (String) tokenTransfer.get("to");
            // token转移数量
            BigInteger value = new BigInteger(tokenTransfer.get("value").toString());
            // token全称
            String name = tokenTransfer.get("name").toString();
            // token标识
            String symbol = tokenTransfer.get("symbol").toString();
            // token小数位数
            Integer decimals = Integer.parseInt(tokenTransfer.get("decimals").toString());
            //TODO something
            System.out.println();
        }
    }
    ```

### 3. 获取智能合约执行结果中的`tokenTransfers`数组对象

- 此数组对象是公链底层系统针对NRC20合约的token转账事件(TransferEvent)进行的数据加工，补充了发生token转账的合约的基本信息 \- `name`, `symbol`, `decimals`
    
**示例:** 截取合约执行结果的`tokenTransfers`数组对象，如下

```json
"tokenTransfers": [
    {
        "contractAddress": "tNULSeBaN5hS7mwjNmCjbPPzMG1C6FnB9RHTKP",
        "from": "tNULSeBaMyfDzgv1NoNq67KUpekRHePnPyn5Vw",
        "to": "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG",
        "value": "11098552585",
        "name": "Btcoin",
        "symbol": "BTC",
        "decimals": 8
    }
]
```

**<b style="color:red">注意1:</b> 这里的value是合约token数值转换后的<b style="color:red">去小数化存储值</b>，同以太坊token方式**

**<b style="color:red">注意2:</b> 产生的token转账的合约地址<b style="color:red">不一定是当前调用的合约</b>，所以在这个数据结构里有contractAddress属性，它不是冗余字段**

**<b style="color:red">注意3:</b> 在交易所正常业务上看，from地址和to地址不会出现空值，但由于一些NRC20发行者的特殊业务，可能会出现空值，所以，<b style="color:red">from地址和to地址，请做空值校验</b>**

### 4. 名词解释

|名词 |描述    |
|:---------:|:---------:|
| contractAddress     | NRC20合约地址 |
| from     | token转出地址 |
| to     | token转入地址 |
| value     | token转移数量 |
| name     | token全称 |
| symbol     | token标识 |
| decimals     | token小数位数 |

### 5. 根据`tokenTransfers`数组对象，处理业务相关数据

- 请根据`tokenTransfers`数组对象中的`contractAddress`定位NRC20资产，由于存在合约内部可以调用另外的合约的场景，所以直接根据合约调用交易里的合约地址来锁定NRC20资产是不准确的。



