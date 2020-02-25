# Smart contract offline assembly

## Prerequisites

- Users: Create a transaction without using the node API, ie: The user whose private key is saved locally

- The difference between offline and online
     
    - Offline: The private key is saved locally
    
    - Online: The private key is saved on the node

**Smart Contracts There are three types of transactions to be assembled, namely `Create Contract`, `Call Contract`, `Delete Contract`. The following will introduce the offline assembly methods of these three transactions using `Java` language and `JavaScript` language respectively.**

> **`nrc20 contract code `** is used as an example in the documentation

## 1. Java SDK

### 1.1 Add Mavan Dependence

```xml
<!-- JDK11 -->
<dependency>
    <groupId>io.nuls.v2</groupId>
    <artifactId>sdk4j</artifactId>
    <version>1.0.7.RELEASE</version>
</dependency>

<!-- JDK8 -->
<dependency>
    <groupId>io.nuls.v2</groupId>
    <artifactId>sdk4j-jdk8</artifactId>
    <version>1.0.7.RELEASE</version>
</dependency>
```

### 1.2 SDK initial

```java
// test net SDK initial
NulsSDKBootStrap.initTest("http://beta.api.nuls.io/");
```

```java
// main net SDK initial
NulsSDKBootStrap.initMain("https://api.nuls.io/");
```

### 1.3 Create contract transaction

```java
public void createTxOffline() throws JsonProcessingException {
    String sender = this.sender;
    String alias = "nrc20_token";
    String contractCode = "504b03040a0000080000....";
    Object[] args = new Object[]{"air", "AIR", 10000, 2};
    String remark = "remark_test";

    // online interface (skipable) - Verify the legality of creating the contract, you can skip verification
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

    // online interface (skipable) - Estimate the GAS required to create the contract, you can skip estimate, write a reasonable value offline
    ImputedGasContractCreateForm iForm = new ImputedGasContractCreateForm();
    iForm.setSender(sender);
    iForm.setContractCode(contractCode);
    iForm.setArgs(args);
    Result iResult = NulsSDKTool.imputedContractCreateGas(iForm);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(iResult), iResult.isSuccess());
    Map result = (Map) iResult.getData();
    Long gasLimit = Long.valueOf(result.get("gasLimit").toString());

    // online interface (skipable) - Get the constructor of the code, generate an array of parameter types, if you know the type, write the type array yourself, you can not call this interface
    Result<ContractConstructorInfoDto> constructorR = NulsSDKTool.getConstructor(contractCode);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(constructorR), constructorR.isSuccess());
    ContractConstructorInfoDto dto = constructorR.getData();
    String[] argsType = dto.getConstructor().argsType2Array();

    // online interface (not skipable, must be called) - Get account balance information
    Result accountBalanceR = NulsSDKTool.getAccountBalance(sender, 2, 1);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(accountBalanceR), accountBalanceR.isSuccess());
    Map balance = (Map) accountBalanceR.getData();
    BigInteger senderBalance = new BigInteger(balance.get("available").toString());
    String nonce = balance.get("nonce").toString();

    // offline interface - Assembling an offline transaction that create a contract
    Result<Map> txOfflineR = NulsSDKTool.createContractTxOffline(sender, senderBalance, nonce, alias, contractCode, gasLimit, args, argsType, remark);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(txOfflineR), txOfflineR.isSuccess());
    Map map = txOfflineR.getData();
    String txHex = (String) map.get("txHex");
    String hash = (String) map.get("hash");
    String contractAddress = (String) map.get("contractAddress");

    // offline interface - Signature transaction
    Result<Map> signTxR = NulsSDKTool.sign(txHex, sender, priKey);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(signTxR), signTxR.isSuccess());
    Map resultData = signTxR.getData();
    String _hash = (String) resultData.get("hash");
    Assert.assertEquals("Hash inconsistent", hash, _hash);
    String signedTxHex = (String) resultData.get("txHex");

    // online interface - Broadcast transaction
    Result<Map> broadcastTxR = NulsSDKTool.broadcast(signedTxHex);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(broadcastTxR), broadcastTxR.isSuccess());
    Map data = broadcastTxR.getData();
    String hash1 = (String) data.get("hash");
    Assert.assertEquals("Hash inconsistent", hash, hash1);
    System.out.println(String.format("hash: %s, contractAddress: %s", hash, contractAddress));
}

```

### 1.4 Call contract transaction

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

    // online interface (skipable) - Verify the legality of calling the contract, you can skip verification
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

    // online interface (skipable) - Estimate the GAS required to call the contract, you can skip estimate, write a reasonable value offline
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
    // online interface (skipable) - Generate an array of parameter types. If the type is known, write the type array yourself, you can not call this interface.
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

    // online interface (not skipable, must be called) - Get account balance information
    Result accountBalanceR = NulsSDKTool.getAccountBalance(sender, 2, 1);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(accountBalanceR), accountBalanceR.isSuccess());
    Map balance = (Map) accountBalanceR.getData();
    BigInteger senderBalance = new BigInteger(balance.get("available").toString());
    String nonce = balance.get("nonce").toString();

    // offline interface - Assembling an offline transaction that call a contract
    Result<Map> txOfflineR = NulsSDKTool.callContractTxOffline(sender, senderBalance, nonce, value, contractAddress, gasLimit, methodName, methodDesc, args, argsType, remark);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(txOfflineR), txOfflineR.isSuccess());
    Map txMap = txOfflineR.getData();
    String txHex = (String) txMap.get("txHex");
    String hash = (String) txMap.get("hash");

    // offline interface - Signature transaction
    Result<Map> signTxR = NulsSDKTool.sign(txHex, sender, priKey);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(signTxR), signTxR.isSuccess());
    Map resultData = signTxR.getData();
    String _hash = (String) resultData.get("hash");
    Assert.assertEquals("Hash inconsistent", hash, _hash);
    String signedTxHex = (String) resultData.get("txHex");

    // online interface - Broadcast transaction
    Result<Map> broadcastTxR = NulsSDKTool.broadcast(signedTxHex);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(broadcastTxR), broadcastTxR.isSuccess());
    Map data = broadcastTxR.getData();
    String hash1 = (String) data.get("hash");
    Assert.assertEquals("Hash inconsistent", hash, hash1);
    System.out.println(String.format("hash: %s", hash));
}

```

### 1.5 Delete contract transaction

```java
public void deleteTxOffline() throws JsonProcessingException {

    int chainId = SDKContext.main_chain_id;
    String sender = this.sender;
    String contractAddress = "tNULSeBaN2YfwVSBCwf35CgD5HtKa5gYGmLgCK";
    String remark = "remark_delete_test";

    // online interface (skipable) - Verify the legality of deleting the contract, you can skip verification
    ContractValidateDeleteForm dForm = new ContractValidateDeleteForm();
    dForm.setSender(sender);
    dForm.setContractAddress(contractAddress);
    Result vResult = NulsSDKTool.validateContractDelete(dForm);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(vResult), vResult.isSuccess());
    Map map = (Map) vResult.getData();
    boolean success = (boolean) map.get("success");
    Assert.assertTrue((String) map.get("msg"), success);

    // online interface (not skipable, must be called) - Get account balance information
    int assetChainId = SDKContext.nuls_chain_id;
    int assetId = SDKContext.nuls_asset_id;
    Result accountBalanceR = NulsSDKTool.getAccountBalance(sender, 2, 1);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(accountBalanceR), accountBalanceR.isSuccess());
    Map balance = (Map) accountBalanceR.getData();
    BigInteger senderBalance = new BigInteger(balance.get("available").toString());
    String nonce = balance.get("nonce").toString();

    // offline interface - Assembling an offline transaction that delete a contract
    Result<Map> txOffline = NulsSDKTool.deleteContractTxOffline(sender, senderBalance, nonce, contractAddress, remark);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(txOffline), txOffline.isSuccess());
    Map txMap = txOffline.getData();
    String txHex = (String) txMap.get("txHex");
    String hash = (String) txMap.get("hash");

    // offline interface - Signature transaction
    Result<Map> signTxR = NulsSDKTool.sign(txHex, sender, priKey);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(signTxR), signTxR.isSuccess());
    Map resultData = signTxR.getData();
    String _hash = (String) resultData.get("hash");
    Assert.assertEquals("Hash inconsistent", hash, _hash);
    String signedTxHex = (String) resultData.get("txHex");

    // online interface - Broadcast transaction
    Result<Map> broadcastTxR = NulsSDKTool.broadcast(signedTxHex);
    Assert.assertTrue(JSONUtils.obj2PrettyJson(broadcastTxR), broadcastTxR.isSuccess());
    Map data = broadcastTxR.getData();
    String hash1 = (String) data.get("hash");
    Assert.assertEquals("Hash inconsistent", hash, hash1);
    System.out.println(String.format("hash: %s", hash));
}

```

## 2. Java - Offline assembly contract transaction code detailed explanation

```java
// The id of the main chain, 2 in the example
int chainId = 2;
// The asset id of the main chain, 1 used in the example
int assetsId = 1;
```

### 2.1 Create contract transaction

The transaction for assembling the release contract needs to interact with the apiModule four times.

- Get the constructor
- Verify the legality of the execution of the release contract
- Estimated gas required for the release of the contract
- Get the balance and nonce of the transaction creator

**Initial data: `transaction creator address`, `contract code bytecode Hex string`, `contract alias`, `transaction comment`**

#### 2.1.1) Calling the interface to get the contract code constructor

- Interface: getContractConstructor
- Parameters: chainId, contractCode

    chainId : int //chain ID
    
    contractCode: String // file byte stream conversion Hex encoded string

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

#### 2.1.2) Assemble parameter data according to constructor parameters(**if there is no parameter function, skip this step**)

- Assemble the argument types of the constructor into a string array
  
    > Get this type of data from the `getContractConstructor` interface
    
    ```java
    Map constructor = (Map) result.get("constructor");
    List<Map> args = (List<Map>) constructor.get("args");
    int size = args.size();
    String[] argTypes = new String[size];
    int i = 0;
    for (Map arg : args) {
        argTypes[i++] = arg.get("type").toString();
    }
    
    // In this example argTypes contains four elements {"String", "String", "BigInteger", "int"}
    ```

- Add a parameter to the array using a one-dimensional Object array, in order

    ```java
    Object args = new Object[]{"nulsIsEverything", "NULS", 100000000, 8};
    ```
    
- Convert a one-dimensional array of parameters to a two-dimensional array (this step is due to the two-dimensional array accepted by the contract method parameters on the chain)

    > Copy this method `io.nuls.contract.util.ContractUtil#twoDimensionalArray(Object[], String[])` to the offline transaction assembly tool (eg. SDK)
    
    ```java
    String[][] finalArgs = ContractUtil.twoDimensionalArray(args, argTypes);
    ```

#### 2.1.3) Calling the interface to verify the legality of the release contract

- Interface: validateContractCreate
- Parameters: chainId, sender, gasLimit, price, contractCode, args

    chainId : int //chain ID

    Sender: String // caller address
    
    gasLimit: long // gas limit
    
    Price: long // unit price
    
    contractCode: String // file byte stream conversion Hex encoded string
    
    Args: Object[] // constructor argument

eg. 
    
_**Request:**_

> gasLimit and price use default values: gasLimit = 10000000; price = 25;

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

> `success` is `true`, indicating that the validation passed, otherwise, `success` is `false`, `msg` is the error message

#### 2.1.4) Calling the interface to estimate the gas required for the release contract

- Interface: imputedContractCreateGas
- Parameters: chainId, sender, contractCode, args

    chainId : int //chain ID

    Sender: String // caller address
    
    contractCode: String // file byte stream conversion Hex encoded string
    
    Args: Object[] // constructor argument

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

_**Required data: **_

```java
Long gasLimit = (Long) result.get("gasLimit");
```



#### 2.1.5) Randomly generate a smart contract address

```java
Address contract = AccountTool.createContractAddress(chainId);
byte[] contractAddressBytes = contract.getAddressBytes();
// String contractAddress = contract.toString();
```

#### 2.1.6) Through the data obtained in the above 5 steps, assemble the transaction txData

```java
// The address of the transaction creator
String sender = "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG";
byte[] senderBytes = AddressTool.getAddress(sender);
// gasLimit is obtained from the interface in step 4
long gasLimit = 22363;
// default gas unit price, system minimum unit price
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

#### 2.1.7) Call the interface to get the nonce value of the transaction creator

- Interface: getAccountBalance
- Parameters: chainId, assetChainId, assetId, address

    chainId: int //chain id 
    
    assetChainId: int //chain id corresponding to the asset
    
    assetId : int // asset id
    
    Address : String //Account address

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

_**Required data: **_

```java
BigInteger senderBalance = new BigInteger(result.get("balance").toString());
String nonce = result.get("nonce").toString();
```

#### 2.1.8) By the data obtained in the above 7 steps, assemble the transaction object of the release contract

```java
public CreateContractTransaction newCreateTx(int chainId, int assetsId, BigInteger senderBalance, String nonce, CreateContractData createContractData, String remark) {
    try {
        CreateContractTransaction tx = new CreateContractTransaction();
        if (StringUtils.isNotBlank(remark)) {
            tx.setRemark(remark.getBytes(StandardCharsets.UTF_8));
        }
        tx.setTime(System.currentTimeMillis() / 1000);
        // Calculate CoinData
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
    // total cost
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
    // When calculating tx.size(), when coinData and txData are empty, 1 length is calculated. If nulsData is not empty at this time, the length is deducted.
    return VarInt.sizeOf(size) + size - 1;
}

```

#### 2.1.9) Signature transaction, broadcast transaction (omitted)



---



### 2.2 Call contract transaction

The transaction that assembles the call contract needs to interact with apiModule three times or three times.

- Get details of the contract method (skip this step if you have cached all the details of the contract)
- Verify the legality of the execution of the calling contract
- Estimated gas required to call the contract
- Get the balance and nonce of the transaction creator

**Initial data: `Transaction creator address`, `contract address`, `The amount of the main network asset transferred by the caller to the contract address `, `call method name `, `call method description `, `call method parameters `, `Transaction notes`**

#### 2.2.1) Call the interface to get the list of parameter types of the contract method(**If you cache the details of all the methods of the contract, you can extract the parameter type list of the method from the cached method, skip this step**)

> The role of this step is to get an array of parameter types of the method. For specific filtering data, please see `1.2.2`

- Interface: getContractMethodArgsTypes
- Parameters: chainId, contractAddress, methodName, methodDesc

    chainId : int //chain ID
    
    contractAddress: String //Contract address
    
    methodName: String // contract method

    methodDesc: String // The contract method description (not required). If the method in the contract is not overloaded, this parameter can be empty.

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

#### 2.2.2) Assemble parameter data according to function parameters** (if there is no parameter function, skip this step)**

- Assemble the parameter types of the function into a string array
  
    > Get this type of data from the `1.2.1` interface or get it from the cached method details
    
    ```java
    List<String> list = (List<String>) result;
    int size = list.size();
    String[] argTypes = new String[size];
    argTypes = list.toArray(argTypes);
    
    // In this case argTypes contains two elements {"Address", "BigInteger"}
    ```
    
- Add a parameter to the array using a one-dimensional Object array, in order

    ```java
    Object args = new Object[]{"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD", 100000000};
    ```
    
- Convert a one-dimensional array of parameters to a two-dimensional array (this step is due to the two-dimensional array accepted by the contract method parameters on the chain)

    > Copy this method `io.nuls.contract.util.ContractUtil#twoDimensionalArray(Object[], String[])` to the offline transaction assembly tool (eg. SDK)
    
    ```java
    String[][] finalArgs = ContractUtil.twoDimensionalArray(args, argTypes);
    ```

#### 2.2.3) Calling the interface to verify the legality of the calling contract

- Interface: validateContractCall
- Parameters: chainId, sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args

    chainId : int //chain ID

    Sender: String // caller address
    
    Value: BigInteger // The amount of the main network asset that the caller transferred to the contract address. If there is no such service, fill BigInteger.ZERO
    
    gasLimit: long // gas limit
    
    Price: long // unit price
    
    contractAddress: String // contract address
    
    methodName: String // contract method
    
    methodDesc: String // The contract method description. If the method in the contract is not overloaded, this parameter can be empty.
    
    Args: Object[] // constructor argument

eg. 
    
_**Request:**_

> gasLimit and price use default values: gasLimit = 10000000; price = 25;

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

> `success` is `true`, indicating that the validation passed, otherwise, `success` is `false`, `msg` is the error message

#### 2.2.4) Calling the interface to estimate the gas required to call the contract

- Interface: imputedContractCallGas
- Parameters: chainId, sender, value, contractAddress, methodName, methodDesc, args

    chainId : int //chain ID

    Sender: String // caller address
    
    Value: BigInteger // The amount of the main network asset that the caller transferred to the contract address. If there is no such service, fill BigInteger.ZERO
    
    contractAddress: String // contract address
    
    methodName: String // contract method
    
    methodDesc: String // The contract method description. If the method in the contract is not overloaded, this parameter can be empty.
    
    Args: Object[] // method parameters

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

#### 2.2.5) The data obtained by the above 4 steps, assembly transaction txData

```java
// The address of the transaction creator
String sender = "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG";
byte[] senderBytes = AddressTool.getAddress(sender);
// gasLimit is obtained from the interface in step 4
long gasLimit = 10333;
// default gas unit price, system minimum unit price
long defaultPrice = 25;
// value - the amount of the main chain asset that the transaction creator transferred to the contract address. If there is no such business, fill in BigInteger.ZERO
// methodName - the transaction creator chooses the contract method to call
// methodDesc - obtained by contractInfo, this parameter can be empty if there is no overload in the method within the contract
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

#### 2.2.6) Call the interface to get the nonce value of the transaction creator

- Interface: getAccountBalance
- Parameters: chainId, assetChainId, assetId, address

    chainId: int //chain id 
    
    assetChainId: int //chain id corresponding to the asset
    
    assetId : int // asset id
    
    Address : String //Account address

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

_**Required data: **_

```java
BigInteger senderBalance = new BigInteger(result.get("balance").toString());
String nonce = result.get("nonce").toString();
```

#### 2.2.7) By the data obtained in the above 6 steps, assemble the transaction object of the release contract

```java
public CallContractTransaction newCallTx(int chainId, int assetsId, BigInteger senderBalance, String nonce, CallContractData callContractData, String remark) {
    try {
        CallContractTransaction tx = new CallContractTransaction();
        if (StringUtils.isNotBlank(remark)) {
            tx.setRemark(remark.getBytes(StandardCharsets.UTF_8));
        }
        tx.setTime(System.currentTimeMillis() / 1000);
        // Calculate CoinData
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

#### 2.2.8) Signature transaction, broadcast transaction (omitted)



---




### 2.3 Delete contract transaction

The deal to assemble and delete the contract needs to interact with the apiModule twice.

- Verify the legality of the execution of the calling contract
- Get the balance and nonce of the transaction creator

**Initial data: `Transaction creator address`, `contract address`**

#### 2.3.1) Calling the interface to verify the legality of the deleted contract

- Interface: validateContractDelete
- Parameters: chainId, sender, contractAddress

    chainId : int //chain ID

    Sender: String // caller address
    
    contractAddress: String // contract address

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

> `success` is `true`, indicating that the validation passed, otherwise, `success` is `false`, `msg` is the error message


#### 2.3.2) Assembly transaction txData

```java
// The address of the transaction creator
String sender = "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG";
byte[] senderBytes = AddressTool.getAddress(sender);
DeleteContractData deleteContractData = new DeleteContractData();
deleteContractData.setContractAddress(contractAddressBytes);
deleteContractData.setSender(senderBytes);

```

#### 2.3.3) Call the interface to get the nonce value of the transaction creator

- Interface: getAccountBalance
- Parameters: chainId, assetChainId, assetId, address

    chainId: int //chain id 
    
    assetChainId: int //chain id corresponding to the asset
    
    assetId : int // asset id
    
    Address : String //Account address

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

_**Required data: **_

```java
BigInteger senderBalance = new BigInteger(result.get("balance").toString());
String nonce = result.get("nonce").toString();
```

#### 2.3.4) By the data obtained in the above 3 steps, assemble the transaction object of the release contract

```java
public DeleteContractTransaction newDeleteTx(int chainId, int assetsId, BigInteger senderBalance, String nonce, DeleteContractData deleteContractData, String remark) {
    try {
        DeleteContractTransaction tx = new DeleteContractTransaction();
        if (StringUtils.isNotBlank(remark)) {
            tx.setRemark(remark.getBytes(StandardCharsets.UTF_8));
        }
        tx.setTime(System.currentTimeMillis() / 1000);
        // Calculate CoinData
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

#### 2.3.5) Signature transaction, broadcast transaction (omitted)



## 3. JavaScript SDK

> In this language, we have developed js-sdk, which has implemented offline assembly smart contract trading.

**GitHub address:** [NULS-v2-JS-SDK](https://github.com/nuls-io/nuls-v2-js-sdk)

### 3.1 Create contract transaction

Please refer to `https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractCreateTest.js`

_**core code snippet:**_

```javascript
async function createContract(pri, pub, createAddress, assetsChainId, assetsId, contractCreate, remark) {
    //1、通过接口获取合约的参数 args
    let hex = contractCreate.contractCode;
    const constructor = await getContractConstructor(hex);
    console.log(constructor.data.constructor.args);
    //2、给每个参数复制 获取contractCreateTxData
    let newArgs = contractCreate.args;
    const contractCreateTxData = await this.makeCreateData(contractCreate.chainId, createAddress, contractCreate.alias, hex, newArgs);
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
        console.log("交易完成, 合约地址: " + contractCreateTxData.contractAddress)
      } else {
        console.log("广播交易失败")
      }
    } else {
      console.log("验证交易失败")
    }
}

```

### 3.2 Call contract transaction

Please refer to `https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractCallTest.js`

_**core code snippet:**_

```javascript
async function callContract(pri, pub, fromAddress, assetsChainId, assetsId, contractCall, remark) {
   const balanceInfo = await getNulsBalance(fromAddress);
   let contractAddress = contractCall.contractAddress;
   let value = Number(contractCall.value);
   let newValue = new BigNumber(contractCall.value);
   const contractCallTxData = await this.makeCallData(contractCall.chainId, fromAddress, value, contractAddress, contractCall.methodName, contractCall.methodDesc, contractCall.args);
   let gasLimit = new BigNumber(contractCallTxData.gasLimit);
   let gasFee = Number(gasLimit.times(contractCallTxData.price));
   let amount = Number(newValue.plus(gasFee));
   let transferInfo = {
     fromAddress: fromAddress,
     assetsChainId: assetsChainId,
     assetsId: assetsId,
     amount: amount,
     fee: 100000
   };
   if (value > 0) {
     transferInfo.toAddress = contractAddress;
     transferInfo.value = contractCall.value;
   }

   let inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 16);
   let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 16, contractCallTxData);
   let txhex;
   //获取手续费
   let newFee = countFee(tAssemble, 1);
   //手续费大于0.001的时候重新组装交易及签名
   if (transferInfo.fee !== newFee) {
     transferInfo.fee = newFee;
     inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 16);
     tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 16, contractCallTxData);
     txhex = await nuls.transactionSerialize(pri, pub, tAssemble);
   } else {
     txhex = await nuls.transactionSerialize(pri, pub, tAssemble);
   }
   console.log(txhex);
   let result = await validateTx(txhex);
   console.log(result);
   if (result.success) {
     let results = await broadcastTx(txhex);
     if (results && results.value) {
       console.log("交易完成")
     } else {
       console.log("广播交易失败\n", results)
     }
   } else {
     console.log("验证交易失败")
   }
}

```

### 3.3 Delete contract transaction

Please refer to `https://github.com/nuls-io/nuls-v2-js-sdk/blob/master/src/test/contractDeleteTest.js`

_**core code snippet:**_

```javascript
async function deleteContract(pri, pub, fromAddress, assetsChainId, assetsId, contractDelete, remark) {
    const balanceInfo = await getNulsBalance(fromAddress);
    let amount = 0;
    let transferInfo = {
       fromAddress: fromAddress,
       assetsChainId: assetsChainId,
       assetsId: assetsId,
       amount: amount,
       fee: 100000
    };
    
    const contractDeleteTxData = await this.makeDeleteData(contractDelete.chainId, contractDelete.sender, contractDelete.contractAddress);
    
    let deleteValidateResult = await validateContractDelete(assetsChainId, contractDeleteTxData.sender, contractDeleteTxData.contractAddress);
    if (!deleteValidateResult) {
       console.log("验证删除合约失败");
       return;
    }
    let inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 17);
    let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 17, contractDeleteTxData);
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

```
