# 合约交易离线组装

## 前提

- 使用者: 不使用节点API创建交易，即私钥保存在本地的用户

- 离线与在线的区别
    
    - 离线: 私钥保存在本地
    
    - 在线: 私钥保存在节点上

**智能合约有三种要组装的交易，分别是`发布合约`、`调用合约`、`删除合约`，下面将使用`Java`语言和`JavaScript`语言分别介绍这三种交易的离线组装方式**

> 文档中使用 **`NRC20合约代码`** 作为示例

## 1. Java SDK

### 1.1 引入Mavan依赖

```xml
<!-- JDK11环境下 -->
<dependency>
    <groupId>io.nuls.v2</groupId>
    <artifactId>sdk4j</artifactId>
    <version>1.1.4.RELEASE</version>
</dependency>

<!-- JDK8环境下 -->
<dependency>
    <groupId>io.nuls.v2</groupId>
    <artifactId>sdk4j-jdk8</artifactId>
    <version>1.1.9.RELEASE</version>
</dependency>
```

### 1.2 SDK初始化

```java
// 测试网SDK初始化
NulsSDKBootStrap.initTest("http://beta.api.nuls.io/");
```

```java
// 主网SDK初始化
NulsSDKBootStrap.initMain("https://api.nuls.io/");
```

### 1.3 发布合约离线交易

```java
public void createTxOffline() throws JsonProcessingException {
    String sender = this.sender;
    String alias = "nrc20_token";
    String contractCode = "504b03040a0000080000....";
    Object[] args = new Object[]{"air", "AIR", 10000, 2};
    String remark = "remark_test";

    // 在线接口(可跳过) - 验证发布合约的合法性，可不验证
    ContractValidateCreateForm vForm = new ContractValidateCreateForm();
    vForm.setSender(sender);
    vForm.setContractCode(contractCode);
    vForm.setArgs(args);
    vForm.setGasLimit(MAX_GASLIMIT);
    vForm.setPrice(CONTRACT_MINIMUM_PRICE);
    Result vResult = NulsSDKTool.validateContractCreate(vForm);
    Assert.assertTrue(vResult.toString(), vResult.isSuccess());
    Map vMap = (Map) vResult.getData();
    boolean success = (boolean) vMap.get("success");
    Assert.assertTrue((String) vMap.get("msg"), success);

    // 在线接口(可跳过) - 估算发布合约需要的GAS，可不估算，离线写一个合理的值
    ImputedGasContractCreateForm iForm = new ImputedGasContractCreateForm();
    iForm.setSender(sender);
    iForm.setContractCode(contractCode);
    iForm.setArgs(args);
    Result iResult = NulsSDKTool.imputedContractCreateGas(iForm);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(iResult), iResult.isSuccess());
    Map result = (Map) iResult.getData();
    Long gasLimit = Long.valueOf(result.get("gasLimit").toString());

    // 在线接口(可跳过) - 获取代码的构造函数，生成参数类型的数组，若已知类型，自行编写类型数组，可不调用此接口
    Result<ContractConstructorInfoDto> constructorR = NulsSDKTool.getConstructor(contractCode);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(constructorR), constructorR.isSuccess());
    ContractConstructorInfoDto dto = constructorR.getData();
    String[] argsType = dto.getConstructor().argsType2Array();

    // 在线接口(不可跳过，一定要调用的接口) - 获取账户余额信息
    Result accountBalanceR = NulsSDKTool.getAccountBalance(sender, 2, 1);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(accountBalanceR), accountBalanceR.isSuccess());
    Map balance = (Map) accountBalanceR.getData();
    BigInteger senderBalance = new BigInteger(balance.get("available").toString());
    String nonce = balance.get("nonce").toString();

    // 离线接口 - 组装发布合约的离线交易
    Result<Map> txOfflineR = NulsSDKTool.createContractTxOffline(sender, senderBalance, nonce, alias, contractCode, gasLimit, args, argsType, remark);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(txOfflineR), txOfflineR.isSuccess());
    Map map = txOfflineR.getData();
    String txHex = (String) map.get("txHex");
    String hash = (String) map.get("hash");
    String contractAddress = (String) map.get("contractAddress");

    // 离线接口 - 签名交易
    Result<Map> signTxR = NulsSDKTool.sign(txHex, sender, priKey);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(signTxR), signTxR.isSuccess());
    Map resultData = signTxR.getData();
    String _hash = (String) resultData.get("hash");
    Assert.assertEquals("hash不一致", hash, _hash);
    String signedTxHex = (String) resultData.get("txHex");

    // 在线接口 - 广播交易
    Result<Map> broadcastTxR = NulsSDKTool.broadcast(signedTxHex);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(broadcastTxR), broadcastTxR.isSuccess());
    Map data = broadcastTxR.getData();
    String hash1 = (String) data.get("hash");
    Assert.assertEquals("hash不一致", hash, hash1);
    System.out.println(String.format("hash: %s, contractAddress: %s", hash, contractAddress));
}

```

### 1.4 调用合约离线交易

```java
public void callTxOffline() throws JsonProcessingException {
    int chainId = SDKContext.main_chain_id;
    String sender = this.sender;
    BigInteger value = BigInteger.ZERO;
    String contractAddress = "tNULSeBaN3xDUFWonWsfsuG4kJKy2WajtjZbuB";
    String methodName = "transfer";
    String methodDesc = "";
    Object[] args = new Object[]{"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD", 3800};
    String remark = "remark_call_test";

    // 在线接口(可跳过) - 验证调用合约的合法性，可不验证
    ContractValidateCallForm validateCallForm = new ContractValidateCallForm();
    validateCallForm.setSender(sender);
    validateCallForm.setValue(value.longValue());
    validateCallForm.setGasLimit(MAX_GASLIMIT);
    validateCallForm.setPrice(CONTRACT_MINIMUM_PRICE);
    validateCallForm.setContractAddress(contractAddress);
    validateCallForm.setMethodName(methodName);
    validateCallForm.setMethodDesc(methodDesc);
    validateCallForm.setArgs(args);
    Result vResult = NulsSDKTool.validateContractCall(validateCallForm);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(vResult), vResult.isSuccess());
    Map map = (Map) vResult.getData();
    boolean success = (boolean) map.get("success");
    Assert.assertTrue((String) map.get("msg"), success);

    // 在线接口(可跳过) - 估算调用合约需要的GAS，可不估算，离线写一个合理的值
    ImputedGasContractCallForm iForm = new ImputedGasContractCallForm();
    iForm.setSender(sender);
    iForm.setValue(value);
    iForm.setContractAddress(contractAddress);
    iForm.setMethodName(methodName);
    iForm.setMethodDesc(methodDesc);
    iForm.setArgs(args);
    Result iResult = NulsSDKTool.imputedContractCallGas(iForm);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(iResult), iResult.isSuccess());
    Map result = (Map) iResult.getData();
    Long gasLimit = Long.valueOf(result.get("gasLimit").toString());

    int assetChainId = SDKContext.nuls_chain_id;
    int assetId = SDKContext.nuls_asset_id;
    // 在线接口(可跳过) - 生成参数类型的数组，若已知类型，自行编写类型数组，可不调用此接口
    String[] argsType = null;
    if (args != null && args.length > 0) {
        ContractMethodForm cFrom = new ContractMethodForm();
        cFrom.setContractAddress(contractAddress);
        cFrom.setMethodName(methodName);
        cFrom.setMethodDesc(methodDesc);
        Result cResult = NulsSDKTool.getContractMethodArgsTypes(cFrom);
        Assert.assertTrue(JSONUtils.obj2PrettyJson(cResult), cResult.isSuccess());
        List<String> list  = (List<String>) cResult.getData();
        int size = list.size();
        argsType = new String[size];
        argsType = list.toArray(argsType);
    }

    // 在线接口(不可跳过，一定要调用的接口) - 获取账户余额信息
    Result accountBalanceR = NulsSDKTool.getAccountBalance(sender, 2, 1);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(accountBalanceR), accountBalanceR.isSuccess());
    Map balance = (Map) accountBalanceR.getData();
    BigInteger senderBalance = new BigInteger(balance.get("available").toString());
    String nonce = balance.get("nonce").toString();

    // 离线接口 - 组装调用合约的离线交易
    Result<Map> txOfflineR = NulsSDKTool.callContractTxOffline(sender, senderBalance, nonce, value, contractAddress, gasLimit, methodName, methodDesc, args, argsType, remark);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(txOfflineR), txOfflineR.isSuccess());
    Map txMap = txOfflineR.getData();
    String txHex = (String) txMap.get("txHex");
    String hash = (String) txMap.get("hash");

    // 离线接口 - 签名交易
    Result<Map> signTxR = NulsSDKTool.sign(txHex, sender, priKey);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(signTxR), signTxR.isSuccess());
    Map resultData = signTxR.getData();
    String _hash = (String) resultData.get("hash");
    Assert.assertEquals("hash不一致", hash, _hash);
    String signedTxHex = (String) resultData.get("txHex");

    // 在线接口 - 广播交易
    Result<Map> broadcaseTxR = NulsSDKTool.broadcast(signedTxHex);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(broadcaseTxR), broadcaseTxR.isSuccess());
    Map data = broadcaseTxR.getData();
    String hash1 = (String) data.get("hash");
    Assert.assertEquals("hash不一致", hash, hash1);
    System.out.println(String.format("hash: %s", hash));
}

```

### 1.5 删除合约离线交易

```java
public void deleteTxOffline() throws JsonProcessingException {

    int chainId = SDKContext.main_chain_id;
    String sender = this.sender;
    String contractAddress = "tNULSeBaN2YfwVSBCwf35CgD5HtKa5gYGmLgCK";
    String remark = "remark_delete_test";

    // 在线接口(可跳过）- 验证删除合约的合法性，可不验证
    ContractValidateDeleteForm dForm = new ContractValidateDeleteForm();
    dForm.setSender(sender);
    dForm.setContractAddress(contractAddress);
    Result vResult = NulsSDKTool.validateContractDelete(dForm);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(vResult), vResult.isSuccess());
    Map map = (Map) vResult.getData();
    boolean success = (boolean) map.get("success");
    Assert.assertTrue((String) map.get("msg"), success);

    // 在线接口(不可跳过，一定要调用的接口) - 获取账户余额信息
    int assetChainId = SDKContext.nuls_chain_id;
    int assetId = SDKContext.nuls_asset_id;
    Result accountBalanceR = NulsSDKTool.getAccountBalance(sender, 2, 1);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(accountBalanceR), accountBalanceR.isSuccess());
    Map balance = (Map) accountBalanceR.getData();
    BigInteger senderBalance = new BigInteger(balance.get("available").toString());
    String nonce = balance.get("nonce").toString();

    // 离线接口 - 组装删除合约的离线交易
    Result<Map> txOffline = NulsSDKTool.deleteContractTxOffline(sender, senderBalance, nonce, contractAddress, remark);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(txOffline), txOffline.isSuccess());
    Map txMap = txOffline.getData();
    String txHex = (String) txMap.get("txHex");
    String hash = (String) txMap.get("hash");

    // 离线接口 - 签名交易
    Result<Map> signTxR = NulsSDKTool.sign(txHex, sender, priKey);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(signTxR), signTxR.isSuccess());
    Map resultData = signTxR.getData();
    String _hash = (String) resultData.get("hash");
    Assert.assertEquals("hash不一致", hash, _hash);
    String signedTxHex = (String) resultData.get("txHex");

    // 在线接口 - 广播交易
    Result<Map> broadcastTxR = NulsSDKTool.broadcast(signedTxHex);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(broadcastTxR), broadcastTxR.isSuccess());
    Map data = broadcastTxR.getData();
    String hash1 = (String) data.get("hash");
    Assert.assertEquals("hash不一致", hash, hash1);
    System.out.println(String.format("hash: %s", hash));
}

```

### 1.6 调用合约 - 向合约转入跨链资产

请参考`https://github.com/nuls-io/nuls-v2-sdk4j/blob/master/src/test/java/io/nuls/v2/service/ContractServiceTest.java`

函数名是`callTxWithMultyAssetOffline`和`callTxWithMultyAssetOffline2`

## 2. Java - 离线组装合约交易代码详解

```java
// 主链的ID，示例中使用2
int chainId = 2;
// 主链的资产ID，示例中使用1
int assetsId = 1;
```

### 2.1 发布合约的交易

组装发布合约的交易需要与apiModule交互四次

- 获取构造函数
- 验证发布合约的执行合法性
- 预估发布合约需要的GAS
- 获取交易创建者的余额和nonce

**最初数据: `交易创建者地址`, `合约代码字节码的Hex字符串`, `合约别名`, `交易备注`**

#### 2.1.1) 调用接口获取合约代码构造函数

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

#### 2.1.2) 根据构造函数参数组装参数数据(**若是无参函数，则跳过此步**)

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

#### 2.1.3) 调用接口验证发布合约的合法性

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

#### 2.1.4) 调用接口预估发布合约需要的GAS

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



#### 2.1.5) 随机生成一个智能合约地址

```java
Address contract = AccountTool.createContractAddress(chainId);
byte[] contractAddressBytes = contract.getAddressBytes();
// String contractAddress = contract.toString();
```

#### 2.1.6) 通过以上5步获取的数据，组装交易的txData

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

#### 2.1.7) 调用接口获取交易创建者的nonce值

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

#### 2.1.8) 通过以上7步获取的数据，组装发布合约的交易对象

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

#### 2.1.9) 签名交易、广播交易（略）



---



### 2.2 调用合约的交易

组装调用合约的交易需要与apiModule交互三`or`四次

- 获取合约方法的详细信息(若缓存了合约所有方法的详情，则跳过此步)
- 验证调用合约的执行合法性
- 预估调用合约需要的GAS
- 获取交易创建者的余额和nonce

**最初数据: `交易创建者地址`,`合约地址`,`调用者向合约地址转入的主网资产金额`,`调用方法名`,`调用方法的描述`, `调用方法的参数`, `交易备注`**

#### 2.2.1) 调用接口获取合约方法的参数类型列表**(若缓存了合约所有方法的详情，可从缓存的方法中提取方法的参数类型列表，则跳过此步)**

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

#### 2.2.2) 根据函数参数组装参数数据(**若是无参函数，则跳过此步**)

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

#### 2.2.3) 调用接口验证调用合约的合法性

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

#### 2.2.4) 调用接口预估调用合约需要的GAS

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

#### 2.2.5) 通过以上4步获取的数据，组装交易的txData

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

#### 2.2.6) 调用接口获取交易创建者的nonce值

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

#### 2.2.7) 通过以上6步获取的数据，组装发布合约的交易对象

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

#### 2.2.8) 签名交易、广播交易（略）



---




### 2.3 删除合约的交易

组装删除合约的交易需要与apiModule交互两次

- 验证调用合约的执行合法性
- 获取交易创建者的余额和nonce

**最初数据: `交易创建者地址`,`合约地址`**

#### 2.3.1) 调用接口验证删除合约的合法性

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


#### 2.3.2) 组装交易的txData

```java
// 交易创建者的地址
String sender = "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG";
byte[] senderBytes = AddressTool.getAddress(sender);
DeleteContractData deleteContractData = new DeleteContractData();
deleteContractData.setContractAddress(contractAddressBytes);
deleteContractData.setSender(senderBytes);

```

#### 2.3.3) 调用接口获取交易创建者的nonce值

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

#### 2.3.4) 通过以上3步获取的数据，组装发布合约的交易对象

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

#### 2.3.5) 签名交易、广播交易（略）



## 3. JavaScript SDK

> 本语言里，我们已经开发了JS-SDK，内部已经实现离线组装智能合约交易

**GitHub地址:** [NULS-v2-JS-SDK](https://github.com/nuls-io/nuls-v2-js-sdk)

### 3.1 创建合约

请参考`https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractCreateTest.js`


### 3.2 调用合约

请参考`https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractCallTest.js`


### 3.3 删除合约

请参考`https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractDeleteTest.js`

### 3.4 调用合约 - 向合约转入跨链资产

请参考`https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractCallOfMultyAssetsTest1.js`

请参考`https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractCallOfMultyAssetsTest2.js`

