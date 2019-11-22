# 合约交易离线组装

## 前提

- 使用者: 不使用节点API创建交易，即私钥保存在本地的用户

- 离线与在线的区别
    
    - 离线: 私钥保存在本地
    
    - 在线: 私钥保存在节点上

**智能合约有三种要组装的交易，分别是`发布合约`、`调用合约`、`删除合约`，下面将使用`Java`语言和`JavaScript`语言分别介绍这三种交易的离线组装方式**

> 文档中使用 **`NRC20合约代码`** 作为示例

## 1. Java

```java
// 主链的ID，示例中使用2
int chainId = 2;
// 主链的资产ID，示例中使用1
int assetsId = 1;
```

### 1.1 发布合约的交易

组装发布合约的交易需要与apiModule交互四次

- 获取构造函数
- 验证发布合约的执行合法性
- 预估发布合约需要的GAS
- 获取交易创建者的余额和nonce

**最初数据: `交易创建者地址`, `合约代码字节码的Hex字符串`, `合约别名`, `交易备注`**

#### 1.1.1) 调用接口获取合约代码构造函数

- 接口: getContractConstructor
- 参数: chainId, contractCode

    chainId : int //链ID
    
    contractCode: String // 文件字节流转换Hex编码字符串

eg. 

_**Request:**_

```json
{
    "jsonrpc":"2.0",
    "method":"getContractConstructor",
    "params":[2,"504b03040...00000000"],
    "id":1234
}
```

_**Response:**_

```json
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "constructor": {
               "name": "<init>",
               "desc": "(String name, String symbol, BigInteger initialAmount, int decimals) return void",
               "args": [
                    {
                         "type": "String",
                         "name": "name",
                         "required": true
                    },
                    {
                         "type": "String",
                         "name": "symbol",
                         "required": true
                    },
                    {
                         "type": "BigInteger",
                         "name": "initialAmount",
                         "required": true
                    },
                    {
                         "type": "int",
                         "name": "decimals",
                         "required": true
                    }
               ],
               "returnArg": "void",
               "view": false,
               "event": false,
               "payable": false
          },
          "isNrc20": true
     }
}
```

#### 1.1.2) 根据构造函数参数组装参数数据(**若是无参函数，则跳过此步**)

- 把构造函数的参数类型组装成一个字符串数组
  
    > 从`getContractConstructor`接口中得到此类数据
    
    ```java
    Map constructor = (Map) result.get("constructor");
    List<Map> args = (List<Map>) constructor.get("args");
    int size = args.size();
    String[] argTypes = new String[size];
    int i = 0;
    for (Map arg : args) {
        argTypes[i++] = arg.get("type").toString();
    }
    
    // 此例中 argTypes 包含四个元素 {"String", "String", "BigInteger", "int"}
    ```

- 使用一维Object数组，按顺序，把参数添加到数组中

    ```java
    Object args = new Object[]{"nulsIsEverything", "NULS", 100000000, 8};
    ```
    
- 把参数一维数组转换为二维数组(由于链上合约方法参数接受的是二维数组，故有此步)

    > 复制这个方法`io.nuls.contract.util.ContractUtil#twoDimensionalArray(Object[], String[])`到离线交易组装工具程序(eg. SDK)中
    
    ```java
    String[][] finalArgs = ContractUtil.twoDimensionalArray(args, argTypes);
    ```

#### 1.1.3) 调用接口验证发布合约的合法性

- 接口: validateContractCreate
- 参数: chainId, sender, gasLimit, price, contractCode, args

    chainId : int //链ID

    sender: String // 调用者地址
    
    gasLimit: long // gas限制
    
    price: long // gas单价
    
    contractCode: String // 文件字节流转换Hex编码字符串
    
    args: Object[] // 构造方法参数

eg. 
    
_**Request:**_

> gasLimit和price使用默认值: gasLimit = 10000000; price = 25;

```json
{
    "jsonrpc":"2.0",
    "method":"validateContractCreate",
    "params":[2,"tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG", 10000000, 25, "504b03040...00000000", ["name","symbol",100000000,8]],
    "id":1234
}
```

_**Response:**_
    
```json
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "msg": "",
          "success": true
     }
}
```

> `success`是`true`时，表示验证通过，否则，`success`是`false`, `msg`是错误信息

#### 1.1.4) 调用接口预估发布合约需要的GAS

- 接口: imputedContractCreateGas
- 参数: chainId, sender, contractCode, args

    chainId : int //链ID

    sender: String // 调用者地址
    
    contractCode: String // 文件字节流转换Hex编码字符串
    
    args: Object[] // 构造方法参数

eg. 
    
_**Request:**_
    
```json
{
    "jsonrpc":"2.0",
    "method":"imputedContractCreateGas",
    "params":[2,"tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG", "504b03040...00000000", ["name","symbol",100000000,8]],
    "id":1234
}
```

_**Response:**_
    
```json
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "gasLimit": 22363
     }
}
```

_**需要的数据:**_

```java
Long gasLimit = (Long) result.get("gasLimit");
```



#### 1.1.5) 随机生成一个智能合约地址

```java
Address contract = AccountTool.createContractAddress(chainId);
byte[] contractAddressBytes = contract.getAddressBytes();
// String contractAddress = contract.toString();
```

#### 1.1.6) 通过以上5步获取的数据，组装交易的txData

```java
// 交易创建者的地址
String sender = "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG";
byte[] senderBytes = AddressTool.getAddress(sender);
// gasLimit 从第4步接口中得到
long gasLimit = 22363;
// 默认GAS单价, 系统最小单价
long defaultPrice = 25;
CreateContractData createContractData = new CreateContractData();
createContractData.setSender(senderBytes);
createContractData.setContractAddress(contractAddressBytes);
createContractData.setAlias(alias);
createContractData.setGasLimit(gasLimit);
createContractData.setPrice(defaultPrice);
createContractData.setCode(contractCode);
if (finalArgs != null) {
    createContractData.setArgsCount((byte) finalArgs.length);
    createContractData.setArgs(finalArgs);
}
```

#### 1.1.7) 调用接口获取交易创建者的nonce值

- 接口: getAccountBalance
- 参数: chainId, assetChainId, assetId, address

    chainId: int //链id 
    
    assetChainId: int //资产对应的链id
    
    assetId  : int //资产id
    
    address : String //账户地址

eg. 
    
_**Request:**_
    

```json
{
    "jsonrpc":"2.0",
    "method":"getAccountBalance",
    "params":[2,2,1,"tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG"],
    "id":1234
}
```

_**Response:**_
    
```json
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "totalBalance": 991002297558150,
          "balance": 988700097558150,
          "timeLock": 2302200000000,
          "consensusLock": 0,
          "freeze": 2302200000000,
          "nonce": "a34b2183d44a110a",
          "nonceType": 1
     }
}
```

_**需要的数据:**_

```java
BigInteger senderBalance = new BigInteger(result.get("balance").toString());
String nonce = result.get("nonce").toString();
```

#### 1.1.8) 通过以上7步获取的数据，组装发布合约的交易对象

```java
public CreateContractTransaction newCreateTx(int chainId, int assetsId, BigInteger senderBalance, String nonce, CreateContractData createContractData, String remark) {
    try {
        CreateContractTransaction tx = new CreateContractTransaction();
        if (StringUtils.isNotBlank(remark)) {
            tx.setRemark(remark.getBytes(StandardCharsets.UTF_8));
        }
        tx.setTime(System.currentTimeMillis() / 1000);
        // 计算CoinData
        CoinData coinData = makeCoinData(chainId, assetsId, senderBalance, nonce, createContractData, tx.size(), calcSize(createContractData));
        tx.setTxDataObj(createContractData);
        tx.setCoinDataObj(coinData);
        tx.serializeData();
        return tx;
    } catch (IOException e) {
        Log.error(e);
        throw new RuntimeException(e.getMessage());
    }
}

private CoinData makeCoinData(int chainId, int assetsId, BigInteger senderBalance, String nonce, ContractData contractData, int txSize, int txDataSize) {
    CoinData coinData = new CoinData();
    long gasUsed = contractData.getGasLimit();
    BigInteger imputedValue = BigInteger.valueOf(LongUtils.mul(gasUsed, contractData.getPrice()));
    // 总花费
    BigInteger value = contractData.getValue();
    BigInteger totalValue = imputedValue.add(value);

    CoinFrom coinFrom = new CoinFrom(contractData.getSender(), chainId, assetsId, totalValue, RPCUtil.decode(nonce), (byte) 0);
    coinData.addFrom(coinFrom);

    if (value.compareTo(BigInteger.ZERO) > 0) {
        CoinTo coinTo = new CoinTo(contractData.getContractAddress(), chainId, assetsId, value);
        coinData.addTo(coinTo);
    }

    BigInteger fee = TransactionFeeCalculator.getNormalUnsignedTxFee(txSize + txDataSize + calcSize(coinData));
    totalValue = totalValue.add(fee);
    if (senderBalance.compareTo(totalValue) < 0) {
        // Insufficient balance
        throw new RuntimeException("Insufficient balance");
    }
    coinFrom.setAmount(totalValue);
    return coinData;
}


private int calcSize(NulsData nulsData) {
    if (nulsData == null) {
        return 0;
    }
    int size = nulsData.size();
    // 计算tx.size()时，当coinData和txData为空时，计算了1个长度，若此时nulsData不为空，则要扣减这1个长度
    return VarInt.sizeOf(size) + size - 1;
}

```

#### 1.1.9) 签名交易、广播交易（略）



---



### 1.2 调用合约的交易

组装调用合约的交易需要与apiModule交互三`or`四次

- 获取合约方法的详细信息(若缓存了合约所有方法的详情，则跳过此步)
- 验证调用合约的执行合法性
- 预估调用合约需要的GAS
- 获取交易创建者的余额和nonce

**最初数据: `交易创建者地址`,`合约地址`,`调用者向合约地址转入的主网资产金额`,`调用方法名`,`调用方法的描述`, `调用方法的参数`, `交易备注`**

#### 1.2.1) 调用接口获取合约方法的参数类型列表**(若缓存了合约所有方法的详情，可从缓存的方法中提取方法的参数类型列表，则跳过此步)**

> 这一步的作用是得到方法的参数类型数组，具体筛选的数据请查看`1.2.2`

- 接口: getContractMethodArgsTypes
- 参数: chainId, contractAddress, methodName, methodDesc

    chainId : int //链ID
    
    contractAddress: String //合约地址
    
    methodName: String // 合约方法

    methodDesc: String // 合约方法描述  (非必填)，若合约内方法没有重载，则此参数可以为空

eg. 

_**Request:**_

```json
{
    "jsonrpc":"2.0",
    "method":"getContractMethodArgsTypes",
    "params":[2,"tNULSeBaMwQPRn1yQEyd74CuD9uJqYVipgRtwi", "transfer", "(Address to, BigInteger value) return boolean"],
    "id":1234
}
```

_**Response:**_

```json
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": [
          "Address",
          "BigInteger"
     ]
}
```

#### 1.2.2) 根据函数参数组装参数数据(**若是无参函数，则跳过此步**)

- 把函数的参数类型组装成一个字符串数组
  
    > 从`1.2.1`接口中得到此类数据 或者 从缓存的方法详情中获取
    
    ```java
    List<String> list = (List<String>) result;
    int size = list.size();
    String[] argTypes = new String[size];
    argTypes = list.toArray(argTypes);
    
    // 此例中 argTypes 包含两个元素 {"Address", "BigInteger"}
    ```
    
- 使用一维Object数组，按顺序，把参数添加到数组中

    ```java
    Object args = new Object[]{"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD", 100000000};
    ```
    
- 把参数一维数组转换为二维数组(由于链上合约方法参数接受的是二维数组，故有此步)

    > 复制这个方法`io.nuls.contract.util.ContractUtil#twoDimensionalArray(Object[], String[])`到离线交易组装工具程序(eg. SDK)中
    
    ```java
    String[][] finalArgs = ContractUtil.twoDimensionalArray(args, argTypes);
    ```

#### 1.2.3) 调用接口验证调用合约的合法性

- 接口: validateContractCall
- 参数: chainId, sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args

    chainId : int //链ID

    sender: String // 调用者地址
    
    value: BigInteger // 调用者向合约地址转入的主网资产金额，没有此业务时填BigInteger.ZERO
    
    gasLimit: long // gas限制
    
    price: long // gas单价
    
    contractAddress: String // 合约地址
    
    methodName: String // 合约方法
    
    methodDesc: String // 合约方法描述，若合约内方法没有重载，则此参数可以为空
    
    args: Object[] // 构造方法参数

eg. 
    
_**Request:**_

> gasLimit和price使用默认值: gasLimit = 10000000; price = 25;

```json
{
    "jsonrpc":"2.0",
    "method":"validateContractCall",
    "params":[2,"tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG", 0, 10000000, 25, "tNULSeBaMwQPRn1yQEyd74CuD9uJqYVipgRtwi", "approve", "", ["tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG",100000000]],
    "id":1234
}
```

_**Response:**_
    
```json
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "msg": "",
          "success": true
     }
}
```

> `success`是`true`时，表示验证通过，否则，`success`是`false`, `msg`是错误信息

#### 1.2.4) 调用接口预估调用合约需要的GAS

- 接口: imputedContractCallGas
- 参数: chainId, sender, value, contractAddress, methodName, methodDesc, args

    chainId : int //链ID

    sender: String // 调用者地址
    
    value: BigInteger // 调用者向合约地址转入的主网资产金额，没有此业务时填BigInteger.ZERO
    
    contractAddress: String // 合约地址
    
    methodName: String // 合约方法
    
    methodDesc: String // 合约方法描述，若合约内方法没有重载，则此参数可以为空
    
    args: Object[] // 方法参数

eg. 
    
_**Request:**_
    
```json
{
    "jsonrpc":"2.0",
    "method":"imputedContractCallGas",
    "params":[2,"tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG", 0, "tNULSeBaMwQPRn1yQEyd74CuD9uJqYVipgRtwi", "approve", "", ["tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG",100000000]],
    "id":1234
}

```

_**Response:**_
    
```json
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "gasLimit": 10333
     }
}

```

#### 1.2.5) 通过以上4步获取的数据，组装交易的txData

```java
// 交易创建者的地址
String sender = "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG";
byte[] senderBytes = AddressTool.getAddress(sender);
// gasLimit 从第4步接口中得到
long gasLimit = 10333;
// 默认GAS单价, 系统最小单价
long defaultPrice = 25;
// value - 交易创建者转入合约地址的主链资产金额，没有此业务时填BigInteger.ZERO
// methodName - 交易创建者选择要调用的合约方法
// methodDesc - 通过contractInfo获取，若合约内方法没有重载，则此参数可以为空
CallContractData callContractData = new CallContractData();
callContractData.setContractAddress(contractAddressBytes);
callContractData.setSender(senderBytes);
callContractData.setValue(value);
callContractData.setPrice(defaultPrice);
callContractData.setGasLimit(gasLimit);
callContractData.setMethodName(methodName);
callContractData.setMethodDesc(methodDesc);
if (finalArgs != null) {
    callContractData.setArgsCount((byte) finalArgs.length);
    callContractData.setArgs(finalArgs);
}

```

#### 1.2.6) 调用接口获取交易创建者的nonce值

- 接口: getAccountBalance
- 参数: chainId, assetChainId, assetId, address

    chainId: int //链id 
    
    assetChainId: int //资产对应的链id
    
    assetId  : int //资产id
    
    address : String //账户地址

eg. 
    
_**Request:**_
    
```json
{
    "jsonrpc":"2.0",
    "method":"getAccountBalance",
    "params":[2,2,1,"tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG"],
    "id":1234
}
```

_**Response:**_
    
```json
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "totalBalance": 991002297558150,
          "balance": 988700097558150,
          "timeLock": 2302200000000,
          "consensusLock": 0,
          "freeze": 2302200000000,
          "nonce": "a34b2183d44a110a",
          "nonceType": 1
     }
}
```

_**需要的数据:**_

```java
BigInteger senderBalance = new BigInteger(result.get("balance").toString());
String nonce = result.get("nonce").toString();
```

#### 1.2.7) 通过以上6步获取的数据，组装发布合约的交易对象

```java
public CallContractTransaction newCallTx(int chainId, int assetsId, BigInteger senderBalance, String nonce, CallContractData callContractData, String remark) {
    try {
        CallContractTransaction tx = new CallContractTransaction();
        if (StringUtils.isNotBlank(remark)) {
            tx.setRemark(remark.getBytes(StandardCharsets.UTF_8));
        }
        tx.setTime(System.currentTimeMillis() / 1000);
        // 计算CoinData
        CoinData coinData = makeCoinData(chainId, assetsId, senderBalance, nonce, callContractData, tx.size(), calcSize(callContractData));
        tx.setTxDataObj(callContractData);
        tx.setCoinDataObj(coinData);
        tx.serializeData();
        return tx;
    } catch (IOException e) {
        Log.error(e);
        throw new RuntimeException(e.getMessage());
    }
}

```

#### 1.2.8) 签名交易、广播交易（略）



---




### 1.3 删除合约的交易

组装删除合约的交易需要与apiModule交互两次

- 验证调用合约的执行合法性
- 获取交易创建者的余额和nonce

**最初数据: `交易创建者地址`,`合约地址`**

#### 1.3.1) 调用接口验证删除合约的合法性

- 接口: validateContractDelete
- 参数: chainId, sender, contractAddress

    chainId : int //链ID

    sender: String // 调用者地址
    
    contractAddress: String // 合约地址

eg. 
    
_**Request:**_

```json
{
    "jsonrpc":"2.0",
    "method":"validateContractDelete",
    "params":[2,"tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG", "tNULSeBaMwQPRn1yQEyd74CuD9uJqYVipgRtwi"],
    "id":1234
}
```

_**Response:**_
    
```json
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "msg": "",
          "success": true
     }
}
```

> `success`是`true`时，表示验证通过，否则，`success`是`false`, `msg`是错误信息


#### 1.3.2) 组装交易的txData

```java
// 交易创建者的地址
String sender = "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG";
byte[] senderBytes = AddressTool.getAddress(sender);
DeleteContractData deleteContractData = new DeleteContractData();
deleteContractData.setContractAddress(contractAddressBytes);
deleteContractData.setSender(senderBytes);

```

#### 1.3.3) 调用接口获取交易创建者的nonce值

- 接口: getAccountBalance
- 参数: chainId, assetChainId, assetId, address

    chainId: int //链id 
    
    assetChainId: int //资产对应的链id
    
    assetId  : int //资产id
    
    address : String //账户地址

eg. 
    
_**Request:**_
    
```json
{
    "jsonrpc":"2.0",
    "method":"getAccountBalance",
    "params":[2,2,1,"tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG"],
    "id":1234
}
```

_**Response:**_
    
```json
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "totalBalance": 991002297558150,
          "balance": 988700097558150,
          "timeLock": 2302200000000,
          "consensusLock": 0,
          "freeze": 2302200000000,
          "nonce": "a34b2183d44a110a",
          "nonceType": 1
     }
}
```

_**需要的数据:**_

```java
BigInteger senderBalance = new BigInteger(result.get("balance").toString());
String nonce = result.get("nonce").toString();
```

#### 1.3.4) 通过以上3步获取的数据，组装发布合约的交易对象

```java
public DeleteContractTransaction newDeleteTx(int chainId, int assetsId, BigInteger senderBalance, String nonce, DeleteContractData deleteContractData, String remark) {
    try {
        DeleteContractTransaction tx = new DeleteContractTransaction();
        if (StringUtils.isNotBlank(remark)) {
            tx.setRemark(remark.getBytes(StandardCharsets.UTF_8));
        }
        tx.setTime(System.currentTimeMillis() / 1000);
        // 计算CoinData
        CoinData coinData = makeCoinData(chainId, assetsId, senderBalance, nonce, deleteContractData, tx.size(), calcSize(deleteContractData));
        tx.setTxDataObj(deleteContractData);
        tx.setCoinDataObj(coinData);
        tx.serializeData();
        return tx;
    } catch (IOException e) {
        Log.error(e);
        throw new RuntimeException(e.getMessage());
    }
}

```

#### 1.3.5) 签名交易、广播交易（略）



## 2. JavaScript

> 本语言里，我们已经开发了JS-SDK，内部已经实现离线组装智能合约交易

**GitHub地址:** [NULS-v2-JS-SDK](https://github.com/nuls-io/nuls-v2-js-sdk)

### 2.1 创建合约

请参考`https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractCreate.js#L77`

_**核心代码片段:**_

```javascript
async function createContract(pri, pub, createAddress, assetsChainId, assetsId) {
  //1、通过接口获取合约的参数 args
  let hex = '504b03040a0000080000aa7b564e00000000000000000000000003000400696f2ffeca0000504b03040a0000080000aa7b564e00000000000000000000000008000000696f2f6e756c732f504b03040a0000080000aa7b564e00000000000000000000000011000000696f2f6e756c732f636f6e74726163742f504b03040a0000080000aa7b564e00000000000000000000000017000000696f2f6e756c732f636f6e74726163742f746f6b656e2f504b0304140008080800aa7b564e00000000000000000000000028000000696f2f6e756c732f636f6e74726163742f746f6b656e2f53696d706c65546f6b656e2e636c617373b558f97754e5197eeecc90990c972d9090059209a498cc9291a58a8152020d35ca5602b1605bbd99b9492ecc12670922b46ead4babd56aeb5ad1565bd4aa2c020169d59ed353cfe93fd17f84d3d3e7fdee9d3b37612639d5d31ff2ddf77ecbfb3eeff67c77f2afff7cf639804df87b23a23825c323329c96e14c1831fcb411cdf859108f86119497281e93e171997e22cce149197e1ec62ff0d462acc2d3413c13c672fc2a8ce7f0bcccfc3a8817827831cc53bf91e125195e96e5df8af4bb205e09a3430e44f19a0cafcbf086a87d5386df87f096cc9c9597b7457a27843fc8f38f21bc2b7ade0be24f41fc39887341bcaf219033b2a686a6bdc78d692399317213c99152c1ca4d6cd3d0503c951dcb673484d266caca1a99a2066d58c3e252be646446ca535399531a5aeca359a33499dc654d0ce74ae68459e0f1d098417d2993a796d97bca252b93dc674c71b171c49ac819a57281c68766af6edf6be593b972a6984ce573a582912a258be913c9c174ba60168bdb6a9bdb419d412393c99f34d31a4a5f43e337342f0056f5f6d58a6360773e6d4a10ac9cb9bf9c1d330b878db18c8a7a3e6564468d8225efce64a0346931643db7c228e54f98b9e488959de26691a9bbed503957b2b2e6a855b4787c3097636e4a563e47151b6a7b62b87b92a39679924afcbd7d4c6b6b05fdada96cd86ee5acd20e0d3b7a6f75b0decc5c35c37da31a968822cbc80c66f304ae61dd6cfc078d02ebb164166639125dd09143e64365ab60a6a5b2541548e16938dcbb4032e75dad1b8e45f99339b3a0a173fef3acc8e294994bcb565d1d19ac14e8a269235336a5796655c0a9a94a152c192919a9132c47f56eb302b5d048ae386e16f614f2590d47be917bb5bdeb3bc6121c57ea7da53cc3e974f181710d772c60af6ec0828e129242c5030d772e84be2ebea0313555c84f53dd722b972a9846d11c543306c92a6ca4d3667ad48eef7232d79cf565c5f29832e66e0ae53315510ebb49fabf84973d1032ec2d1babe2260f2ed77eb868565f96550e559739b3ab12d7af19cc5109a6bdc583c0d5ba283569a64e90657aeb9f4fd659ab7fa24115ffc68a40df63f3eaf0528b9cf7678b131a06ff27bbb5358547f2e542cadc6349cb2df7306bbf6cd7d18fa48edb65d8884d3a36638b8e217ca0e3436cd1b0a27a6fdc6d1427d9ac3abe8d3b74dc25c35f64f347f858c727381fc4051d177149c7a7b84c42abc3edca76cf61a74586a64da1c82573def5e11ca96477c62816cda2e0213d5cd17115333aaee13a0fccbacf782dd58a888e49983a72c8e83821c367b8a1c382b910ba4a2755d0cd7ad79116adf7e05e1d79301e7fc5df747c8ef31a3a8673c5f2f8b895b2b82fe274703aa254cbe6691d5fe0bc8ea36087270e4f9a11551d916cb9588a8c999109f6312f864869d2c845f2850819dfc8f078e4f67e394e289db32c389413c98fdb36fac5c52f79e32c7cafb216aae57260ecb899a2f6b535fb6bb7f3a261cd7c5153772c0b2e706ce8d001be1c1edacf712a7f527a6bb82e6f86b2e54cc9529f59fdf55ab0ded9d69a78f749eb34149d5b29c22b7f812bcc3f55a6735bbdf7be1d916db7cef4dd3aa5a1bda68123ac4e524ec0cc5a54df5587bd544dd93d3f6172df861a306a1a0d16ec0f025ae83d26e71b53f9ec9451607ee761337e04f9c9868c7b85097943f71eabc51de8e637750c3ec49140039a842af8e3a049d8423d49187cfa8433d493c400d2b492b7f2ef2ecffb003fd699616ca3bc9d3349be697c2e8a5e8676416df90ec70635b9163b38eaf6067c173bf91c745677f1a911422d45beb98ad62fa8682376d750e4ff688ea2be05156dc6f76a280acc45945c50d110f6388afecd1d8bf834a3335476090d571088de40f0e80c4257d05815c3d1d81568d1f815f8a2cd812bf0471397b0b8397015fa552c915397d1780d4b05d0752cf3e3be1b587e54736666b0e21a9a2eba40fbb158fd060c30658bb11a2d6865296cc606a639c6246f645a0799d6434c729a491687b6d8401d8744ea57711049cac5a7a4ef739f5f491b95febb29b705b86d58797eeb4892e50189c51754212692441c8e5dc74a1fbec4aafd89af1064602e24e2ce54f340a02df015429c1449c21f505e75f2f72a887529313611650bc3bd8ec9bf8d798b33e4552f92ae1749ecc53e276dfb29f978ba1b07e8bf9f6797e0204f04f00327a1f6da56ae1de2cc52f86ea22588919b680ee2f0ac248bdf4b7c737c3d825127ef670823c0674f34c6142566d0128d715c1d8d736c95d4c54492ac05aa85daa2c0df8b46825e46b0cd84bc8e80c4b1a8adcf75ac07f7398ef5e087ca31910eaaf408b895fe9ae9e0bde5a4e3491e914cf6c4fe8960e01c02fe6b68932aaba4a6795fdc4ecdbeb8e4c0ef817884d11a453b2174d2f83aea1488115b9f07a21dfb7684713f81f9545417c31fdaa9dd446bad90063517e98ff0632798166d8ae6ae2863199728c6e24e143921f29c3836a9583d80101e64120d92d1980760970bb04b454e53d24105b0665a7fe22279d041d21e750cb7df404705c49ad92096aa9d134ce624bbcff200687701b4ab9ad494340f80075c00136c0151d15d01b0b602404d5c45671d1c59e2c8d1cdbc0747b78ba3dbc5d14d1febe2305c1c978943623c142586ae8aedfdf1c45544ce62859a60e53040e7a057b0b6cc83d5efe9f022a35c22ee32ab6d9a55f4302faf47d8e7a73d8d30e4621f72b10f31cd5b5487df89946a04a9b746e9e21e165ba896533ef914a42c4e3de1907584f545740381685b40bc4bc8108bb705e85d375daaf2acdd0d8fb2d01ea3d5c7b1923abad85955268ab83823187770469846bb61234ec3865821f72826f2c907af83e78c83a7d38327d1b46e06eb2b687a66a1b1cbfe296a7b1a2bf00ccbfe590f924e1749a78ba4d345d2e922697191582e927f7045740cd8b1f0f2b74dd66dce453610508b6dce1dd51688276c49507a59fc39ea7b5efe958836bc40067991fcfc126fa2973d88075cc4032ee20117f1808378156fb5e3e4f32a8bdb335b3923f90f816493248bf3147f42381e9de6aa448ba1bc8a6fed8fc69b36cce0b68a7b8db10423de5d85ee4df72b64ac577975bcc680bf4ee86f78ca72bd0b793d5b6e9ff30563b776031372bf82ec931f340e90a203a4cb01928837f54a862b207ae682b0b3fc16d59d65cdbdcd78bee301e025b7ec1c726b60ac2b00f8b3c701708c6f12cfd5bc075648d3b285dfacde0817dde60cab6def320aef29832df631d7e06a654653415f045fd34e4dd979c8b133e5dc371dd19804597843cabab62ddbc973d4f33eed7e407afcd0435c1daecd0e14944d918aee1543eb2d8ef59263dd74acb7d6f0327e0d7d73ddfc98ee7ce231d9ea9a6c75dc14a9acbe8be6383ced96984f79b1a68ec38959666d8f2f52d12542f894fe5cf6a4758d6b7e8debf11ac7639104887fb6ef2755c53c8c5f2ae53e2c278b3e4b36ece0f35534fe17504b0708ec308779cb09000028180000504b0304140008080800aa7b564e00000000000000000000000022000000696f2f6e756c732f636f6e74726163742f746f6b656e2f546f6b656e2e636c617373a552d14e1341143d03b5cb16aa28a8a0284a08697970131ff481a76a24694282a19507dfa6bb431d989da933b325fc9a0f7e801f65bc534ba5b6a5896eb23b3be79e7bcebd33f7c7cf6fdf01bcc64e84e711b623bc60a8367a3d6bfa5c7de80bed19569a5a0bfb5e71e7848bf092186dcbb53b1376c828699e0b86f55afde89cf779a2b8ee262d6fa5ee1e306c9e14dacb5c9c4a273b4a34b4369e7b69b463d83b9226d18572496ab4b73cf589cb2e123ee224a7525c9248d95de51da318963291ca9c2b4a5eacd59b0ccb9ea8aa55f47aea8a61e3ba869cfb2fc93bd96d6a2fbac29244dce154582a8ecf18ded4a61b37b2cc0ae70e668aec8c37f3915b6add0b3bd6d5fedcae4ec4d7425a9191e2921f1e26c3db39554d2faafe99eee85ae4d09a9ce1d33ca17fb489f86034e8ae63ae94b90cc7c9d0fe2fb799475d6999c2a6e2502af2a8b4cd85d0af0295616b42d0876832e030acfe19c2e3ceb9486942f76fcbd8fd6be06f278fcd7e99816101e1894b749788695fa15d99d66580b0952958157727b07b589dc0eee301a9dfc0b0466f144cd70784877844ff01ac2efc0647a1c7d81886d6166f864684cdd9b94ff0748aef388d085b83ef33dca135141a7c4ad46e488a10ff02504b070868fe421cca0100005e040000504b0304140008080800aa7b564e00000000000000000000000030000000696f2f6e756c732f636f6e74726163742f746f6b656e2f546f6b656e24417070726f76616c4576656e742e636c6173738d565b6f1b4514fec6bbde75b69bbb49d224b46929e05b6a2ee19a4b73218140d2943835b4406163af926d9cdd74771d90a0129540ea033c801020242e2f252f790089b80824c45390f82ffc03049c995dbb89e3243cf8ccd93367e67cdf7c6746fef39f5f7e03f018ae6988e34213148c7333c1cd248f4da998d63083e735bcc0cd0c66b937abe2450d2770218697f838c7cd7c0c176358e0ee256e5e56b1a822c71075deb64d97e1d49ce564ed72c9cb161cdb778d829ff58a6bd98962d1353d6f9841f5364cbbc853a39b46a96c3274cd5d37368decbae1af6627ad9559db37574c97529511cbb6fc3186cb89a3773d66b6e1f6c93c833ce5140940eb9c659b17cbebcba6bb642c9728d231e7148c52de702dfe1d06657fd5f2189a2736365c87b04f6f9ab6cfa0cfdac47caa64789e49d39983607c67cdb4b34bdc9edbb798389e5d2cdbbeb56ee62dcfa22a970cd758377dd39db06dc7377ccbb169cf546382462d27bb68de285bae59a41d632ba6bf10883190481e2747ccab659f39e694f98969b479ae2aa0e6edf9e065f381a03d54f6104979b930eb64e2706114a2639488f97d6152c9b057b20bcbd7cd823f9cbccac01c2ed28129219241a234e77ca3b0366f6c08eda8c1a9f4aae1ad06824b89e42c152156e5122533fa88f94ece772d7b85215e852f760ea2b4b39673ca6ec19cb1782f6842cdf33c4d471f967474a15b470f3727d1abe332f22a5e21e9fe7f37a87855c7237854c5151d4fe16986ee7a189365ab244e3bbe6fe5bbe2f28deab88ad7b8799d006606c28b364ae43203e2ae898c37740c6384a1adfef4187a1bea1ff6391d5a3e9059f43a43e7be7312413aa6fea308379aded362c4ab514b9054c60627c330983828cd41b5c2631aaecbaff6cf11f9fd89a9c3a771869ecc38a82b2121c215a78735c2451723e94ea346f37de8a7effbe9ab44a34c633c75172c95de412495d981941adc81fca358758a6c17a2646f50a68b267868818f4e94719aa2a9603d06f000203c5e97098f578e088fd796708efc4e89261f2467bf7d080f93e590b234f2e5d1d44f88fc50c3a088e03ba2a61e248435191248868bc7289b575404977b0c34117d8fd6dc143b74055935d44a889a2e444320523d90f71b0249370622d503f980d67c7808909e104806830d80c8f5406e3704725e2c3a0044ae07f211adf9f810205c335e98ae7cb8d75f9423d1782b95fe1e51793bbd8b965405d134fdee202a6da77f8732cf75dba58ea22143bf0ad4afd0ba45375ec4298b9f679020514cda9b205513e45db4f381627205b12db472ef0fa8f21664699b404882462f01053e818a4fe9e43e23989f13e52ff026be14b40602c0355ab7e89fc6e3824e1143148be009d1a0badac2fe46bf8a2715d6adb0b836cea9d32b1752ff393cc6e9805d734a306be26046da4ef7ad069c78580ac36f55e37210271a5a10efbb07bf43dc9eafe9367d43cdf32da6f0dd1e35a643d89d04fa193c4b5038d84128ede3ec5fbae511824b30c947e84718cbefffa445f49c862caed1b6bc51867ec5892b77a1773457484141a5b5a32df025eeb7073e616e6dbb594147059df58d77674fe30d8540231815760c67c3a746c173f42c35fd07504b0708ea7bbc798f040000e6090000504b0304140008080800aa7b564e00000000000000000000000030000000696f2f6e756c732f636f6e74726163742f746f6b656e2f546f6b656e245472616e736665724576656e742e636c6173738d56df531b5514fe6e76b31bb60be19740015b5aab8624b06ad156c36f84160da5051a0bd5da25d9c296b08bbb1b5e1c1ffa6ff8aebcf0a033923a3ae3f88433fe2ffe078e7aeedd854212c0879c7bf6dc73eef9cef9cebd933ffff9e53700efe189864e4c3441c12417535c4c73db8c8a590d73b8a3e12e177398e7dabc8a4f345cc244029ff235cfc54202f71258e4ea7d2e1ea85852b1cc203ff3dc6d862b79db359c4ad9378aae1378663130fcd29631552a7996efe7186281cb10df35cb158ba12bffdcdc358d6d33d834a6ed8d7927b0362c8fbc9451dbb183718687a9f30fbc60b7e1f18305823be3960840326f3bd6bdcaf6bae5ad98eb65b2b4e7dda2592e989ecdbf23a31c6cda3e43f38a673afe33cb9bddb59c80419f771ccb9b299bbe6fd176b61e4ce06e598eb1c2e58d53c154e3f5a58a13d8db56c1f66dca72dff4cc6d2bb0bc29c7710333b05d87ce4c372ed03cf63196acaf2ab66795e84475c30ae6040d03a9c18b8850fd23e76b17f498f72b4e47af70e6fc704dd0772124b187729d4163c23ff6ba9c3a9b0c854a30cb54ed6b9153d974368cc5f5e75631c80dae3130971353b72588318988e6e5c02c6e2d983b822f1a674abd69fa9b21c9526a709e92502d95323933fa4804ee72e0d9ce0643e7117c717268a593b565b7e215ad399bf3af090687b99b8e3eace8e842b78e1e2e2ea357c74314547c4674fdff0950f148c73b7857c5aa8e5bb8cdd05d0b63ba62974b96c7d0712af26b7ed5c674ace131179f132bd981c01da3b2b203e26689cd2f74e430cad05adb3786de867c47534ded2a84048bc9a6eca73a248cd4a0fef34a6db47d62a4a8eb8d8681483277762ca7c43094aa27a59ea7a841b91affa3c939c7bf3f3573f636aed1d3d8099a47488871aee9018d71bac54a8cd3aad17e1ffae9fb75fa2ad32ad3da997e0996ce1c2096ce1e404a0f1d40fe51445d21d98538c92c790ea109c36881810e1a82ab644d87f118c01b80d0785e26349e3926349e5bc20dd293120986374fc8b7f036490ec7a09587c6d33f21f6c3717e45186f8a7c7ae810e5634861300a1e276f9e4d1175bc42af09eb2d8ab92d4ee80abd8e112b1162ba060d8148b540720d81641a03916a814c50cce419407a2220596a743d10b916c84c4320c322a80e885c0be40ec5dc3d0308e78b27a68b1e9df517f970ea5ea433df232eef670ed192ae229ea1df77884bfb99dfa12c70de0e699a68c9d2af0af55b24f7a065859dbc783f4307896cd24907e9c8413e441b5fc8265791d843926b7f4095f7204bfb04421265f41250200f150bd4b94582f9804a5ec2975816650d84808fcb7a41ff266e8a724a18215b0cef8be1d4d516f637fa557ca0b06e85756a93bc747adba2d27f8eda381b56d79c1695357130a3ad57fb36c39ab8598acc4f8fec7268a732b4d0def70a7ebbb8398fe826add2f0ac119b8f4fb0311bc1ee20d01fe22382c2c10e41699b64ffd20d8f115c82493a223dc658e1f42705d1531a55f1848ee58332f22b2eadbe84dede5c25064529c9f6d65097b8de16ea8439d9fa4d15ed5574d40eded313833712018d614cc8715c8f9e19051fd393d4f41f504b0708826261e37e040000ca090000504b01020a000a0000080000aa7b564e000000000000000000000000030004000000000000000000000000000000696f2ffeca0000504b01020a000a0000080000aa7b564e000000000000000000000000080000000000000000000000000025000000696f2f6e756c732f504b01020a000a0000080000aa7b564e00000000000000000000000011000000000000000000000000004b000000696f2f6e756c732f636f6e74726163742f504b01020a000a0000080000aa7b564e00000000000000000000000017000000000000000000000000007a000000696f2f6e756c732f636f6e74726163742f746f6b656e2f504b01021400140008080800aa7b564eec308779cb090000281800002800000000000000000000000000af000000696f2f6e756c732f636f6e74726163742f746f6b656e2f53696d706c65546f6b656e2e636c617373504b01021400140008080800aa7b564e68fe421cca0100005e0400002200000000000000000000000000d00a0000696f2f6e756c732f636f6e74726163742f746f6b656e2f546f6b656e2e636c617373504b01021400140008080800aa7b564eea7bbc798f040000e60900003000000000000000000000000000ea0c0000696f2f6e756c732f636f6e74726163742f746f6b656e2f546f6b656e24417070726f76616c4576656e742e636c617373504b01021400140008080800aa7b564e826261e37e040000ca0900003000000000000000000000000000d7110000696f2f6e756c732f636f6e74726163742f746f6b656e2f546f6b656e245472616e736665724576656e742e636c617373504b0506000000000800080051020000b31600000000';
  const constructor = await getContractConstructor(hex);
  let args = constructor.data.constructor.args;
  //console.log(args);
  //2、给每个参数复制 获取contractCreateTxData
  let newArgs = ['waves', 'waves', 100000000, 8];
  const contractCreateTxData = await makeCreateData(2, createAddress, 'test_alias', hex, newArgs);
  //3、序列化

  const balanceInfo = await getNulsBalance(createAddress);
  let amount = contractCreateTxData.gasLimit * contractCreateTxData.price;
  let transferInfo = {
    fromAddress: createAddress,
    assetsChainId: assetsChainId,
    assetsId: assetsId,
    amount: amount,
    fee: 100000
  };

  let inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 15);
  let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 15, contractCreateTxData);
  let txhex;
  //获取手续费
  let newFee = countFee(tAssemble, 1);
  //手续费大于0.001的时候重新组装交易及签名
  if (transferInfo.fee !== newFee) {
    transferInfo.fee = newFee;
    inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 15);
    tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 15, contractCreateTxData);
    txhex = await nuls.transactionSerialize(pri, pub, tAssemble);
  } else {
    txhex = await nuls.transactionSerialize(pri, pub, tAssemble);
  }
  console.log(txhex);
  //4、验证交易
  let result = await validateTx(txhex);
  if (result) {
    //5、广播交易
    let results = await broadcastTx(txhex);
    console.log(results);
    if (results && results.value) {
      console.log("交易完成")
    } else {
      console.log("广播交易失败")
    }
  } else {
    console.log("验证交易失败")
  }
}

```

### 2.2 调用合约

请参考`https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractCall.js#L75`

_**核心代码片段:**_

```javascript
async function callContract(pri, pub, fromAddress, assetsChainId, assetsId, contractCall) {
  const balanceInfo = await getNulsBalance(fromAddress);
  let newTimes = new BigNumber(contractCall.gasLimit);
  let amount = Number(newTimes.times(contractCall.price));
  let value = Number(contractCall.value);
  let newValue = new BigNumber(contractCall.value);
  amount = Number(newValue.plus(amount));
  let transferInfo = {
    fromAddress: fromAddress,
    assetsChainId: assetsChainId,
    assetsId: assetsId,
    amount: amount,
    fee: 100000
  };
  if (value > 0) {
    transferInfo.toAddress = contractCall.contractAddress;
    transferInfo.value = value;
  }

  let inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 16);
  let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 16, contractCall);
  let txhex;
  //获取手续费
  let newFee = countFee(tAssemble, 1);
  //手续费大于0.001的时候重新组装交易及签名
  if (transferInfo.fee !== newFee) {
    transferInfo.fee = newFee;
    inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 16);
    tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 16, contractCall);
    txhex = await nuls.transactionSerialize(pri, pub, tAssemble);
  } else {
    txhex = await nuls.transactionSerialize(pri, pub, tAssemble);
  }

  let result = await validateTx(txhex);
  console.log(result);
  if (result.success) {
    let results = await broadcastTx(txhex);
    if (results && results.value) {
      console.log("交易完成")
    } else {
      console.log("广播交易失败")
    }
  } else {
    console.log("验证交易失败")
  }
}

let contractCall = {
  chainId: 2,
  sender: fromAddress,
  contractAddress: "tNULSeBaN1NjSD1qF6Mj6z5XiGLSxaX8fQtg2G",
  value: 0,//
  gasLimit: 20000,
  price: 25,
  methodName: "approve",
  methodDesc: "",
  args: ['tNULSeBaNA1fArRNjbHrDi3ZTdQiM26harbwnD', 88]
};

```

### 2.3 删除合约

请参考`https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractDelete.js#L33`

_**核心代码片段:**_

```javascript
async function deleteContract(pri, pub, fromAddress, assetsChainId, assetsId, contractDelete) {
  const balanceInfo = await getNulsBalance(fromAddress);
  let amount = 0;
  let transferInfo = {
    fromAddress: fromAddress,
    assetsChainId: assetsChainId,
    assetsId: assetsId,
    amount: amount,
    fee: 100000
  };

  let deleteValidateResult = await validateContractDelete(assetsChainId, contractDelete.sender, contractDelete.contractAddress);
  if (!deleteValidateResult) {
    console.log("验证删除合约失败");
    return;
  }
  let inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 17);
  let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 17, contractDelete);
  let txhex = await nuls.transactionSerialize(pri, pub, tAssemble);
  let result = await validateTx(txhex);
  console.log(result);
  if (result) {
    let results = await broadcastTx(txhex);
    if (results && results.value) {
      console.log("交易完成")
    } else {
      console.log("广播交易失败")
    }
  } else {
    console.log("验证交易失败")
  }
}

let contractDelete = {
  chainId: 2,
  sender: fromAddress,
  contractAddress: "tNULSeBaNA1fArRNjbHrDi3ZTdQiM26harbwnD"
};

```