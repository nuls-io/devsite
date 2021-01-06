# 高级说明

## 一、智能合约手续费

### 1. 智能合约手续费由谁支付？

发布合约、调用合约、删除合约，都由发起交易的地址支付手续费，合约地址本身不支付手续费。

### 2. 智能合约费用收取的规则，如何计费？接口调用者付多少钱？都是由谁收到了这些费用？

在主链上，多出三个类型的交易，`创建智能合约`, `调用智能合约`, `删除智能合约`

三个交易与其他交易如`转账`不同的地方就在于多出一个智能合约的执行，因此智能合约的执行也是收费标准之一 

* 智能合约收费计算方式

```java
public static final int COMPARISON = 1;//比较字节码
public static final int CONSTANT = 1;//简单数值类型字节码
public static final int LDC = 1;//数值常量，字符串常量（长度 * LDC）
public static final int CONTROL = 5;//控制字节码
public static final int TABLESWITCH = 2;//switch字节码（大小 * TABLESWITCH）
public static final int LOOKUPSWITCH = 2;//switch字节码（大小 * LOOKUPSWITCH）
public static final int CONVERSION = 1;//数值转换
public static final int EXTENDED = 1;//null判断
public static final int MULTIANEWARRAY = 1;//多维数组（大小 * MULTIANEWARRAY）
public static final int LOAD = 1;//把本地变量送到栈顶
public static final int ARRAYLOAD = 5;//把数组的某项送到栈顶
public static final int MATH = 1;//数学操作及移位操作
public static final int REFERENCE = 10;//对象相关操作
public static final int NEWARRAY = 1;//一维数组（大小 * NEWARRAY）
public static final int STACK = 2;//栈操作
public static final int STORE = 1;//把栈顶的值存入本地变量
public static final int ARRAYSTORE = 5;//把栈项的值存到数组里
public static final int TRANSFER = 1000;//转账交易
public static final int SHA3 = 500;//SHA3调用
public static final int VERIFY_SIGNATURE = 500;//验证签名
public static final int RANDOM_COUNT_SEED = 5000;//根据高度和原始种子个数生成一个随机种子
public static final int RANDOM_HEIGHT_SEED = 5000;//根据高度区间生成一个随机种子
public static final int OBJ_TO_JSON = 2000;//对象转换成json
public static final int INVOKE_EXTERNAL_METHOD = 5000;//调用虚拟机外部方法(其他模块注册的方法)
```
    
* 一次智能合约总手续费

    一次合约交易的总手续费由三部分构成
    - 第一部分是交易大小产生的手续费，根据字节大小计算 -> 0.001NULS/KB，既是每1000个字节收取0.001个NULS，交易大小不足1000个字节的，按0.001个NULS收费
    
    - 第二部分是合约执行消耗的GAS*Price，Price是单价，意思是每一个Gas值多少Na，Na是NULS的最小单位，1Nuls=1亿Na
    > 举例说明，某次合约执行消耗了20000Gas，设定的单价是30Na/Gas, 那么这次消耗的Na就是`20000 * 30 = 600000`，既是0.006NULS
    
    - 第三部分是调用者设定的GasLimit没有被当次合约执行消耗完，剩余的Gas，这部分Gas会以合约GAS返还交易返还
    > 举例说明，延续上个栗子，当次合约设置的GasLimit是30000Gas，而合约执行消耗了20000Gas，那么剩余了10000Gas，这10000Gas换算成Na就是`10000 * 30 = 300000`，既是0.003NULS，那么这0.003NULS会在当前打包区块的合约GAS返还交易中返还给合约调用者
    
* 合约调用者付多少钱？

    在合约交易中合约调用者付了第一、二、三部分，实际上合约调用者付了第一、二部分，因为第三部分会在当前打包区块的合约GAS返还交易中返还给合约调用者

* 谁收到了这些费用？
    
    区块打包者收到了第一、二部分费用，合约调用者收到第三部分费用
    
## 二、如何调试智能合约

合约SDK提供了DebugEvent，合约执行失败也能看到这个事件的数据，使用它来调试合约

### 1. 调试方式

编写合约时，使用`emit(new DebugEvent("name", "desc"))`事件发送出来，合约发布后，调用此合约方法，若执行成功，则合约执行结果中会展示debugEvent数据，若执行失败，则返回的错误数据中会展示debugEvent数据。

<b style="color:red">注意：每一次调用合约，最多支持展示10个DebugEvent，超过的部分会被智能合约虚拟机忽略。</b>

### 2. 合约代码示例

```java
/**
 * 调用成功的示例(测试网)
 */
public Object clinitTest() {
    Address temp = new Address("tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD");
    String asd = "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD";
    Utils.emit(new DebugEvent("clinitTest log", "asd is " + asd));
    int qwe = 123;
    Utils.emit(new DebugEvent("clinitTest log 1", "temp is " + temp));
    return temp;
}

/**
 * 调用失败的示例(测试网)
 */
public Object clinitTestRevert() {
    Address temp = new Address("tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD");
    String asd = "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD";
    Utils.emit(new DebugEvent("clinitTest log", "asd is " + asd));
    int qwe = 123;
    Utils.emit(new DebugEvent("clinitTest log 1", "temp is " + temp));
    // 失败
    Utils.revert("revert");
    return temp;
}
```

### 3. 执行失败的示例

执行失败时，会在错误信息中展示出debugEvent的数据

如上述合约中，我们在`clinitTestRevert`方法中使用`revert("revert")`使这个调用一定执行失败，模拟执行失败情况下返回DebugEvent事件数据。

#### 3.1 页面调用失败返回的错误数据

![](./debugcontract/debugcontract.png)

#### 3.2 `NULS-API RESTFUL`方式调用失败返回的错误数据

`http://beta.api.nuls.io/api/contract/call`

```json
{
    "sender" : "tNULSeBaMiKUm9zpU1bhXeaaZt2AdLgPTs3T28",
    "gasLimit" : 200000,
    "price" : 25,
    "password" : "abc123456",
    "remark" : "remark-restful-call",
    "contractAddress" : "tNULSeBaNA416GsttuWmWJwHrgJ8KfWzVw4LQR",
    "value" : 0,
    "methodName" : "clinitTestRevert",
    "methodDesc" : null,
    "args" : null
}
```

```json
{
    "success": false,
    "data": {
        "code": "err_0014",
        "msg": "contract error - revert, debugEvents: [{\"contractAddress\":\"tNULSeBaNA416GsttuWmWJwHrgJ8KfWzVw4LQR\",\"blockNumber\":201112,\"event\":\"DebugEvent\",\"payload\":{\"name\":\"clinitTest log\",\"desc\":\"asd is tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD\"}}, {\"contractAddress\":\"tNULSeBaNA416GsttuWmWJwHrgJ8KfWzVw4LQR\",\"blockNumber\":201112,\"event\":\"DebugEvent\",\"payload\":{\"name\":\"clinitTest log 1\",\"desc\":\"temp is tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD\"}}]"
    }
}
```

#### 3.3 `NULS-API JSONRPC`方式调用失败返回的错误数据

`http://beta.api.nuls.io/jsonrpc`

```json
{
    "jsonrpc":"2.0",
    "method":"contractCall",
    "params":[2,
                "tNULSeBaMiKUm9zpU1bhXeaaZt2AdLgPTs3T28",
                "abc123456",
                0,
                200000,
                25,
                "tNULSeBaNA416GsttuWmWJwHrgJ8KfWzVw4LQR",
                "clinitTestRevert",
                null,
                [],
                "remark-jsonrpc-call"],
    "id":1234
}
```

```json
{
    "jsonrpc": "2.0",
    "id": "1234",
    "error": {
        "code": "err_0014",
        "message": "contract error - revert, debugEvents: [{\"contractAddress\":\"tNULSeBaNA416GsttuWmWJwHrgJ8KfWzVw4LQR\",\"blockNumber\":194030,\"event\":\"DebugEvent\",\"payload\":{\"name\":\"clinitTest log\",\"desc\":\"asd is tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD\"}}, {\"contractAddress\":\"tNULSeBaNA416GsttuWmWJwHrgJ8KfWzVw4LQR\",\"blockNumber\":194030,\"event\":\"DebugEvent\",\"payload\":{\"name\":\"clinitTest log 1\",\"desc\":\"temp is tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD\"}}]",
        "data": null
    }
}
```

### 4. 执行成功的示例

执行成功的情况，在合约执行结果中，也会展示debugEvent的数据

http://beta.api.nuls.io/api/contract/result/1aaab3e9453468dd1a4569d0d6d9887b636ee2438671746332125ac6e44ae409

```json
{
    "success": true,
    "data": {
        "flag": true,
        "data": {
            "success": true,
            "errorMessage": null,
            "contractAddress": "tNULSeBaNA416GsttuWmWJwHrgJ8KfWzVw4LQR",
            "result": "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
            "gasLimit": 6081,
            "gasUsed": 4054,
            "price": 25,
            "totalFee": "252025",
            "txSizeFee": "100000",
            "actualContractFee": "101350",
            "refundFee": "50675",
            "value": "0",
            "stackTrace": null,
            "transfers": [],
            "multyAssetTransfers": [],
            "events": [
                "{\"contractAddress\":\"tNULSeBaNA416GsttuWmWJwHrgJ8KfWzVw4LQR\",\"blockNumber\":194018,\"event\":\"TempEvent\",\"payload\":{\"temp\":\"123\"}}"
            ],
            "debugEvents": [
                "{\"contractAddress\":\"tNULSeBaNA416GsttuWmWJwHrgJ8KfWzVw4LQR\",\"blockNumber\":194018,\"event\":\"DebugEvent\",\"payload\":{\"name\":\"clinitTest log\",\"desc\":\"asd is tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD\"}}",
                "{\"contractAddress\":\"tNULSeBaNA416GsttuWmWJwHrgJ8KfWzVw4LQR\",\"blockNumber\":194018,\"event\":\"DebugEvent\",\"payload\":{\"name\":\"clinitTest log 1\",\"desc\":\"temp is tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD\"}}"
            ],
            "tokenTransfers": [],
            "token721Transfers": [],
            "invokeRegisterCmds": [],
            "contractTxList": [],
            "remark": "call"
        }
    }
}
```

## 三、向合约转入NULS资产的交易说明

普通账户地址，往合约转入NULS，都要通过`调用合约`交易来实现

**调用合约参数列表**
 
| 参数名             |    参数类型    | 参数描述                                     | 是否必填 |
| --------------- |:----------:| ---------------------------------------- |:----:|
| chainId         |    int     | 链id                                      |  是   |
| sender          |   string   | 交易创建者账户地址                                |  是   |
| password        |   string   | 调用者账户密码                                  |  是   |
| value           | biginteger | 调用者向合约地址转入的主网资产金额，没有此业务时填BigInteger.ZERO |  是   |
| multyAssetValues|  string[][]| 调用者向合约地址转入的其他资产金额，没有此业务时填空，规则: [[\<value\>,\<assetChainId\>,\<assetId\>]] |  否   |
| gasLimit        |    long    | GAS限制                                    |  是   |
| price           |    long    | GAS单价                                    |  是   |
| contractAddress |   string   | 合约地址                                     |  是   |
| methodName      |   string   | 合约方法                                     |  是   |
| methodDesc      |   string   | 合约方法描述，若合约内方法没有重载，则此参数可以为空               |  否   |
| args            |  object[]  | 参数列表                                     |  否   |
| remark          |   string   | 交易备注                                     |  否   |

### 1. 转入实现方式

在调用合约参数的`value`中填入相应金额，就可以向合约转入NULS

NULS-API RESTFUL请求方式示例:

```json
{
  "sender" : "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG",
  "gasLimit" : 20000,
  "price" : 25,
  "password" : "nuls123456",
  "remark" : null,
  "contractAddress" : "tNULSeBaMx7J2im9edmmyZofHoTWW6nCTbvy3K",
  // 这里填入要转入的NULS，单位是Na
  "value" : 3600000000,
  "multyAssetValues" : null,
  "methodName" : "transferToContractTest",
  "methodDesc" : null,
  "args" : [ "method parameter"]
}
```
上述示例中，普通账户`tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG`向合约地址`tNULSeBaMx7J2im9edmmyZofHoTWW6nCTbvy3K`转入了36个NULS

<b style="color:red">注意：调用的合约方法必须标注Payable注解，否则，系统会直接拒绝这笔交易。</b>

合约代码 - 方法实现如下

```java
/**
 * 标记@Payable的方法，才能在调用时候传入NULS金额
 */
@Payable
public void transferToContractTest(String storedData) {
    // 调用者向合约转入的NULS，单位是Na
    BigInteger value = Msg.value();
}
```

合约中通过`Msg.value()`获取本次调用者向合约转入的NULS，单位是Na，如上述代码。

## 四、向合约转入其他跨链资产的交易说明

普通账户地址，向合约转入跨链资产，都要通过`调用合约`交易来实现

**调用合约参数列表**
 
| 参数名             |    参数类型    | 参数描述                                     | 是否必填 |
| --------------- |:----------:| ---------------------------------------- |:----:|
| chainId         |    int     | 链id                                      |  是   |
| sender          |   string   | 交易创建者账户地址                                |  是   |
| password        |   string   | 调用者账户密码                                  |  是   |
| value           | biginteger | 调用者向合约地址转入的主网资产金额，没有此业务时填BigInteger.ZERO |  是   |
| multyAssetValues|  string[][]| 调用者向合约地址转入的其他资产金额，没有此业务时填空，规则: [[\<value\>,\<assetChainId\>,\<assetId\>]] |  否   |
| gasLimit        |    long    | GAS限制                                    |  是   |
| price           |    long    | GAS单价                                    |  是   |
| contractAddress |   string   | 合约地址                                     |  是   |
| methodName      |   string   | 合约方法                                     |  是   |
| methodDesc      |   string   | 合约方法描述，若合约内方法没有重载，则此参数可以为空               |  否   |
| args            |  object[]  | 参数列表                                     |  否   |
| remark          |   string   | 交易备注                                     |  否   |

### 1. 转入实现方式

在调用合约参数的`multyAssetValues `中填入相应资产信息，就可以向合约转入跨链资产

NULS-API RESTFUL请求方式示例:

```json
{
  "sender" : "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG",
  "gasLimit" : 200000,
  "price" : 25,
  "password" : "nuls123456",
  "remark" : null,
  "contractAddress" : "tNULSeBaN31HBrLhXsWDkSz1bjhw5qGBcjafVJ",
  "value" : 0,
  // 这里填入要转入的跨链资产，此处举例数据为 5-1(NVT), 5-7(USDT)
  "multyAssetValues" : [["200000000", 5, 1], ["3000000", 5, 7]],
  "methodName" : "_payableMultyAsset",
  "methodDesc" : null,
  "args" : []
}
```
上述示例中，普通账户`tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG`向合约地址`tNULSeBaMx7J2im9edmmyZofHoTWW6nCTbvy3K`转入了2个NVT和3个USDT

<b style="color:red">注意：调用的合约方法必须标注@PayableMultyAsset注解，否则，系统会直接拒绝这笔交易。</b>

合约代码 - 方法实现如下

```java
/**
 * 标记@PayableMultyAsset的方法，才能在调用时候转入跨链资产
 */
@PayableMultyAsset
public void transferToContractTest(String storedData) {
    // 调用者向合约转入的跨链资产
    MultyAssetValue[] values = Msg.multyAssetValues();
    for (MultyAssetValue value : values) {
        // 转入的金额
        BigInteger value = assetValue.getValue();
        // 资产链ID
        int assetChainId = assetValue.getAssetChainId();
        // 资产ID
        int assetId = assetValue.getAssetId();
    }
}
```

合约中通过`Msg.multyAssetValues()`获取本次调用者向合约转入的跨链资产，如上述代码。

## 五、合约NULS资产转出的交易说明

**交易类型 txType = 18**

### 1. 转出实现方式

在合约SDK中，Address对象中有一个方法

```java
/**
 * 合约向该地址转账
 *
 * @param value 转账金额（多少Na）
 */
public native void transfer(BigInteger value);
```
当智能合约的方法内执行了此方法，则合约会转移相应的资产到指定的Address中，示例如下:

```java
// 根据账户地址实例化一个Address对象
Address recipient = new Address("tNULSeBaMoixxbUovqmzPyJ2AwYFAX2evKbuy9");
// 转移18个NULS到这个账户地址
recipient.transfer(BigInteger.valueOf(1800000000L));

```

### 2. 结果查询

如果从合约地址转走NULS，那么会在合约的执行结果中体现，结果中的`transfers`数组对象中展示了每一笔合约转账，这里展示的数据仅是合约转账交易的概要信息。

示例: 截取合约执行结果的`transfers`数组对象，如下

```json
{
"transfers": [
    {
        // 合约NULS资产转出交易hash
        "txHash": "4877f6a865dea5b4ac82a8370d73e62da15bc7acb2145a03822dddfdab329d2b",
        "from": "NULSd6Hgdf7bdag8wyRWjUuJgQ9pu46eoiV7d",
        "value": "1800000000",
        "outputs": [
            {
                "to": "NULSd6HgkSpgKw3jqgbzNZ4FPodG4LEReq8cw",
                "value": "1800000000"
            }
        ],
        // 调用合约交易hash
        "orginTxHash": "b5473eefecd1c70ac4276f70062a92bdbfe8f779cbe48de2d0315686cc7e6789"
    }
]
}

```

### 3. 完整交易序列化数据查询

#### 交易背景

<b style="color:red">注意：`block`中不会包含这类交易，因为它不在节点网络上广播。</b> 

每一个得到智能合约交易的节点执行智能合约，把执行结果保存在自己的节点上，当一个区块中所有的合约交易执行完后，会产生一个`stateRoot`，这个`stateRoot`会在`block`里广播出来。

#### 查询方式

完整交易序列化数据也包含在合约执行结果中，结果中的`contractTxList`数组对象会包含本次合约执行后生成的合约NULS资产转出交易

以下是包含合约NULS资产转出交易的执行结果

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


以下结果中，`contractTxList`会包含本次合约执行后生成的交易

> 注意：这个结构里不限于合约NULS资产转出交易，根据业务的不同会生成不同的合约交易，比如合约共识交易 --> [智能合约共识交易说明](./consensusTransaction.html)

```json
{
    "success": true,
    "data": {
        "flag": true,
        "data": {
            "success": true,
            "errorMessage": null,
            "contractAddress": "NULSd6Hgdf7bdag8wyRWjUuJgQ9pu46eoiV7d",
            "result": "multyForAddress: 888634777633",
            "gasLimit": 200000,
            "gasUsed": 20038,
            "price": 25,
            "totalFee": "5100000",
            "txSizeFee": "100000",
            "actualContractFee": "500950",
            "refundFee": "4499050",
            "value": "0",
            "stackTrace": null,
            "transfers": [
                {
                    "txHash": "4877f6a865dea5b4ac82a8370d73e62da15bc7acb2145a03822dddfdab329d2b",
                    "from": "NULSd6Hgdf7bdag8wyRWjUuJgQ9pu46eoiV7d",
                    "value": "1800000000",
                    "outputs": [
                        {
                            "to": "NULSd6HgkSpgKw3jqgbzNZ4FPodG4LEReq8cw",
                            "value": "1800000000"
                        }
                    ],
                    "orginTxHash": "b5473eefecd1c70ac4276f70062a92bdbfe8f779cbe48de2d0315686cc7e6789"
                }
            ],
            "multyAssetTransfers": [],
            "events": [],
            "debugEvents": [],
            "tokenTransfers": [],
            "token721Transfers": [],
            "invokeRegisterCmds": [],
            "contractTxList": [
                "12002fbb225d0037b5473eefecd1c70ac4276f70062a92bdbfe8f779cbe48de2d0315686cc7e678902000253472f4702eb83b71871a4c4e0c71526bb86b8afd0011702000253472f4702eb83b71871a4c4e0c71526bb86b8af0200010000c2eb0b0000000000000000000000000000000000000000000000000000000008000000000000000000021702000194f6239c075d184e265eaea97a67eeced51725160200010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000017020001ce8ffa95606f0bfd2778cff2eff8fe8999e20c440200010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000"
            ],
            "remark": "call"
        }
    }
}
```

## 六、合约跨链资产转出的交易说明

**交易类型 txType = 18**

### 1. 转出实现方式

在合约SDK中，Address对象中有一个方法

```java
/**
 * 合约向该地址转账指定的资产
 *
 * @param value          转账金额
 * @param assetChainId   资产链ID
 * @param assetId        资产ID
 */
public void transfer(BigInteger value, int assetChainId, int assetId) {
    this.transferLocked(value, assetChainId, assetId, 0);
}
```
当智能合约的方法内执行了此方法，则合约会转移相应的资产到指定的Address中，示例如下:

```java
// 根据账户地址实例化一个Address对象
Address recipient = new Address("tNULSeBaMoixxbUovqmzPyJ2AwYFAX2evKbuy9");
// 转移18个NVT(NERVE测试网跨链资产)到这个账户地址
recipient.transfer(BigInteger.valueOf(1800000000L), 5, 1);

```

### 2. 结果查询

如果从合约地址转走跨链资产，那么会在合约的执行结果中体现，结果中的`multyAssetTransfers`数组对象中展示了每一笔合约跨链资产转账，这里展示的数据仅是合约跨链资产转账交易的概要信息。

示例: 截取合约执行结果的`multyAssetTransfers`数组对象，如下

```json
{
"multyAssetTransfers": [
    {
        // 合约NULS资产转出交易hash
        "txHash": "21c7af81c5130f43a363152d3b81f96004fbaaeaeab8e50c988c04015f78770b",
        "from": "tNULSeBaN31HBrLhXsWDkSz1bjhw5qGBcjafVJ",
        "value": "200000000",
        "assetChainId": 5,
        "assetId": 1,
        "outputs": [
            {
                "to": "tNULSeBaMrbMRiFAUeeAt6swb4xVBNyi81YL24",
                "value": "200000000",
                "assetChainId": 5,
                "assetId": 1,
                "lockTime": 0
            }
        ],
        // 调用合约交易hash
        "orginTxHash": "755cdeabb704a77038d44c741b6c2b5635a60ffa58f652162559763f63623176"
    }
]
}

```

### 3. 完整交易序列化数据查询

#### 交易背景

<b style="color:red">注意：`block`中不会包含这类交易，因为它不在节点网络上广播。</b> 

每一个得到智能合约交易的节点执行智能合约，把执行结果保存在自己的节点上，当一个区块中所有的合约交易执行完后，会产生一个`stateRoot`，这个`stateRoot`会在`block`里广播出来。

#### 查询方式

完整交易序列化数据也包含在合约执行结果中，结果中的`contractTxList`数组对象会包含本次合约执行后生成的合约跨链资产转出交易

以下是包含合约NULS资产转出交易的执行结果

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


以下结果中，`contractTxList`会包含本次合约执行后生成的交易

> 注意：这个结构里不限于合约跨链资产转出交易，根据业务的不同会生成不同的合约交易，比如合约共识交易 --> [智能合约共识交易说明](./consensusTransaction.html)

```json
{
    "success": true,
    "data": {
        "flag": true,
        "data": {
            "success": true,
            "errorMessage": null,
            "contractAddress": "NULSd6Hgdf7bdag8wyRWjUuJgQ9pu46eoiV7d",
            "result": "multyForAddress: 888634777633",
            "gasLimit": 200000,
            "gasUsed": 20038,
            "price": 25,
            "totalFee": "5100000",
            "txSizeFee": "100000",
            "actualContractFee": "500950",
            "refundFee": "4499050",
            "value": "0",
            "stackTrace": null,
            "transfers": [],
            "multyAssetTransfers": [
                {
                    "txHash": "21c7af81c5130f43a363152d3b81f96004fbaaeaeab8e50c988c04015f78770b",
                    "from": "tNULSeBaN31HBrLhXsWDkSz1bjhw5qGBcjafVJ",
                    "value": "200000000",
                    "assetChainId": 5,
                    "assetId": 1,
                    "outputs": [
                        {
                            "to": "tNULSeBaMrbMRiFAUeeAt6swb4xVBNyi81YL24",
                            "value": "200000000",
                            "assetChainId": 5,
                            "assetId": 1,
                            "lockTime": 0
                        }
                    ],
                    "orginTxHash": "755cdeabb704a77038d44c741b6c2b5635a60ffa58f652162559763f63623176"
                }
            ],
            "events": [],
            "debugEvents": [],
            "tokenTransfers": [],
            "token721Transfers": [],
            "invokeRegisterCmds": [],
            "contractTxList": [
"12009cbbf25f0037755cdeabb704a77038d44c741b6c2b5635a60ffa58f652162559763f6362317602000265f22046ba64eb216854390877d0f52348ded8be8c011702000265f22046ba64eb216854390877d0f52348ded8be0500010000c2eb0b00000000000000000000000000000000000000000000000000000000080000000000000000000117020001bc9cf2a09f0d1dbe7ab0a7dca2ccb87d12da6a990500010000c2eb0b00000000000000000000000000000000000000000000000000000000000000000000000000"
            ],
            "remark": "call"
        }
    }
}
```

## 七、合约执行结果说明

### 1. 合约执行结果说明

```json
{
    "success": true, //合约执行是否成功,
    "errorMessage": null, //失败原因 - string, eg. not enough gas,
    "contractAddress": "tNULSeBaN1rhd9k9eqNkvwC9HXBWLQ79dRuy81",
    "result": "multyForAddress: 888634777633",
    "gasLimit": 200000,
    "gasUsed": 20038,
    "price": 25,
    "totalFee": "5100000",
    "txSizeFee": "100000",
    "actualContractFee": "500950",
    "refundFee": "4499050",
    "value": 10000000000, //合约调用者向合约地址转入的NULS，没有此业务时是0
    "stackTrace": null, //失败的异常堆栈信息 - string, 执行失败也不一定有,
    "transfers": [
        //这是是指合约地址转出主网币(NULS)的交易信息，与token无关，与token无关，与token无关，正常情况下，token转账的合约交易不会有此类交易，以下是示例
        {
            "txHash": "4877f6a865dea5b4ac82a8370d73e62da15bc7acb2145a03822dddfdab329d2b",
            "from": "tNULSeBaN1rhd9k9eqNkvwC9HXBWLQ79dRuy81",
            "value": "200000000",
            "outputs": [
                {
                    "to": "tNULSeBaMp9wC9PcWEcfesY7YmWrPfeQzkN1xL",
                    "value": "100000000"
                },
                {
                    "to": "tNULSeBaMshNPEnuqiDhMdSA4iNs6LMgjY6tcL",
                    "value": "100000000"
                }
            ],
            "orginTxHash": "b5473eefecd1c70ac4276f70062a92bdbfe8f779cbe48de2d0315686cc7e6789"
        }
    ],
    "multyAssetTransfers": [
        //这是是指合约地址转出跨链资产的交易信息，与token无关，与token无关，与token无关，正常情况下，token转账的合约交易不会有此类交易，以下是示例
        {
            "txHash": "21c7af81c5130f43a363152d3b81f96004fbaaeaeab8e50c988c04015f78770b",
            "from": "tNULSeBaN31HBrLhXsWDkSz1bjhw5qGBcjafVJ",
            "value": "200000000",
            "assetChainId": 5,
            "assetId": 1,
            "outputs": [
                {
                    "to": "tNULSeBaMrbMRiFAUeeAt6swb4xVBNyi81YL24",
                    "value": "200000000",
                    "assetChainId": 5,
                    "assetId": 1,
                    "lockTime": 0
                }
            ],
            "orginTxHash": "755cdeabb704a77038d44c741b6c2b5635a60ffa58f652162559763f63623176"
        }
    ],
    "events": [
        //合约内发送的事件信息 - 按token-NRC20合约标准来说，一笔合约token转账会发送相应的一笔名为TransferEvent的事件信息，支持一次合约调用交易内进行多笔token转账
        //返回的事件内容结构是JSON结构`
        "{\"contractAddress\":\"TTb1LZLo6izPGmXa9dGPmb5D2vpLpNqA\",\"blockNumber\":1343847,\"event\":\"TransferEvent\",\"payload\":{\"from\":\"TTasNs8MGGGaFT9hd9DLmkammYYv69vs\",\"to\":\"TTau7kAxyhc4yMomVJ2QkMVECKKZK1uG\",\"value\":\"1000\"}}",
        //合约内发送的事件信息 - 按token-NRC721合约标准来说，一笔合约token转账会发送相应的一笔名为Transfer的事件信息，支持一次合约调用交易内进行多笔token转账
        //返回的事件内容结构是JSON结构`
        "{\"contractAddress\":\"NULSd6Hgrsk44itdzFqjgkgAF6nFM82WdpqrQ\",\"blockNumber\":4065104,\"event\":\"Transfer\",\"payload\":{\"from\":\"NULSd6Hgd3ACi95QvpLBfp3jgJP3YFmEpbgoG\",\"to\":\"NULSd6HgcbwRjN8AxpPK8TvJWtzBzMQ1zDhVd\",\"tokenId\":\"13450\"}}"
    ],
    "debugEvents": [],// 合约调式日志事件
    "tokenTransfers": [
        //针对以上token-NRC20转账事件(TransferEvent)进行的数据加工，补充了发生token转账的合约的基本信息 - name, symbol, decimals
        //注意1：这里的value是合约token数值转换后的去小数化存储值，同以太坊token方式
        //注意2: 产生的token转账的合约地址不一定是当前调用的合约，所以在这个数据结构里有contractAddress属性，它不是冗余字段
        {
            "contractAddress": "TTb1LZLo6izPGmXa9dGPmb5D2vpLpNqA",
            "from": "TTasNs8MGGGaFT9hd9DLmkammYYv69vs",
            "to": "TTau7kAxyhc4yMomVJ2QkMVECKKZK1uG",
            "value": "1000",
            "name": "a",
            "symbol": "a",
            "decimals": 8
        }
    ],
    "token721Transfers": [
        //针对以上token-NRC721转账事件(Transfer)进行的数据加工，补充了发生token转账的合约的基本信息 - name, symbol
        //注意1: 产生的token转账的合约地址不一定是当前调用的合约，所以在这个数据结构里有contractAddress属性，它不是冗余字段
        {
            "contractAddress": "NULSd6Hgrsk44itdzFqjgkgAF6nFM82WdpqrQ",
            "from": "NULSd6Hgd3ACi95QvpLBfp3jgJP3YFmEpbgoG",
            "to": "NULSd6HgcbwRjN8AxpPK8TvJWtzBzMQ1zDhVd",
            "tokenId": "13450",
            "name": "test_nft",
            "symbol": "TNFT"
        }
    ],
    "invokeRegisterCmds": [
        //合约创建共识，调用的外部命令记录
        {
            "cmdName": "cs_createContractAgent",
            "args": {
                "contractBalance": "2030000000000",
                "commissionRate": "100",
                "chainId": 2,
                "deposit": "2000000000000",
                "contractAddress": "tNULSeBaMzZedU4D3xym1JcyNa5sqtuFku8AKm",
                "contractNonce": "0000000000000000",
                "blockTime": 1562564381,
                "packingAddress": "tNULSeBaMtEPLXxUgyfnBt9bpb5Xv84dyJV98p",
                "contractSender": "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG"
            },
            "cmdRegisterMode": "NEW_TX",
            "newTxHash": "a8eae11b52990e39c9d3233ba1d2c8827336d261c0f14aca43dd4f06435dfaba"
        }
    ],
    "contractTxList": [
        //当前执行智能合约后生成的交易
        "12002fbb225d0037b5473eefecd1c70ac4276f70062a92bdbfe8f779cbe48de2d0315686cc7e678902000253472f4702eb83b71871a4c4e0c71526bb86b8afd0011702000253472f4702eb83b71871a4c4e0c71526bb86b8af0200010000c2eb0b0000000000000000000000000000000000000000000000000000000008000000000000000000021702000194f6239c075d184e265eaea97a67eeced51725160200010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000017020001ce8ffa95606f0bfd2778cff2eff8fe8999e20c440200010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000",
"12009cbbf25f0037755cdeabb704a77038d44c741b6c2b5635a60ffa58f652162559763f6362317602000265f22046ba64eb216854390877d0f52348ded8be8c011702000265f22046ba64eb216854390877d0f52348ded8be0500010000c2eb0b00000000000000000000000000000000000000000000000000000000080000000000000000000117020001bc9cf2a09f0d1dbe7ab0a7dca2ccb87d12da6a990500010000c2eb0b00000000000000000000000000000000000000000000000000000000000000000000000000",
"1400bf6b285d006600204aa9d1010000000000000000000000000000000000000000000000000000020002f246b18e8c697f00ed9bd22696998e469d3f824b020001d7424d91c83566eb94233b5416f2aa77709c03e1020002f246b18e8c697f00ed9bd22696998e469d3f824b648c0117020002f246b18e8c697f00ed9bd22696998e469d3f824b0200010000204aa9d1010000000000000000000000000000000000000000000000000000080000000000000000000117020002f246b18e8c697f00ed9bd22696998e469d3f824b0200010000204aa9d1010000000000000000000000000000000000000000000000000000ffffffffffffffff00"
    ],
    "remark": "call"
}
```

## 八、触发payable方法的场景

在`vm-sdk`中，对于`Contract#payable`有这样的描述

```java
package io.nuls.contract.sdk;

/**
 * 合约接口，合约类实现这个接口
 */
public interface Contract {

    /**
     * 直接向合约转账，会触发这个方法，默认不做任何操作，可以重载这个方法。
     * 前提: 需重载这个方法，并且标记`@Payable`注解
     */
    default void _payable() {
    }

    /**
     * 1. 当共识节点奖励地址是合约地址时，会触发这个方法，参数是区块奖励地址明细 eg. [[address, amount], [address, amount], ...]
     * 2. 当委托节点地址是合约地址时，会触发这个方法，参数是合约地址和奖励金额 eg. [[address, amount]]
     * 前提: 需重载这个方法，并且标记`@Payable`注解
     */
    default void _payable(String[][] args) {
    }
}

```

`vm-sdk`的`maven`依赖如下

```xml
<dependency>
    <groupId>io.nuls.sdk</groupId>
    <artifactId>sdk-contract-vm</artifactId>
    <version>LATEST</version>
</dependency>
```

### 1. 官方钱包转账功能，账户地址向合约地址转账时触发

触发`payable()`无参方法

**系统底层实现原理:**

组装成调用合约交易，默认调用合约的`_payable()`方法

### 2. 共识节点奖励地址是合约地址，当前节点出块时触发

触发`_payable(String[][] args)`有参方法，参数是当前区块 _**所有**_ 奖励地址明细 eg. [[address, amount], [address, amount], ...]

**系统底层实现原理:**

共识模块判断CoinBase交易中的奖励地址有合约地址时，调用此合约的`_payable(String[][] args)`方法，并把相应的收益金额转向此合约地址

### 3. 委托地址是合约地址，出块奖励中有当前合约地址时触发

触发`_payable(String[][] args)`有参方法，参数 _**是且只是**_ 当前合约地址和奖励金额(只有这一个元素) eg. [[address, amount]]

**系统底层实现原理:**

共识模块判断CoinBase交易中的奖励地址有合约地址时，调用此合约的`_payable(String[][] args)`方法，并把相应的收益金额转向此合约地址

### 4. 用户直接调用合约的`_payable()`方法时触发

### 注意: `_payable(String[][] args)`方法是系统调用方法，用户无法调用


## 九、合约调用外部命令说明

```java
public class Utils {
    /**
     * 调用链上其他模块的命令
     *
     * @param cmdName 命令名称
     * @param args 命令参数
     * @return 命令返回值(根据注册命令的返回类型可返回字符串,字符串数组,字符串二维数组)
     */
    public static native Object invokeExternalCmd(String cmdName, String[] args);
}
```

### 1. 生成合约共识交易的功能

#### 1.1 创建共识节点

- 命令名称

    **`cs_createContractAgent `**
    
- 交易类型 
  
    **txType = `20`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:---------:|:---------:|:---------:|:--------:|:--------:|
    |packingAddress    |打包地址     |String     |AddressTool.getStringAddressByBytes(byte[])|略|
    |deposit    |保证金     |String     |BigInteger - toString|略|
    |commissionRate    |佣金比例     |String     |Byte - toString|范围[10,100]|

- 返回值说明
  
    > 返回值类型是 **`String`** 字符串类型
    
    |描述 |字符串转换逻辑    |
    |:---------:|:---------:|
    |交易hash     |略|

- 示例

    ```java
    // String packingAddress, BigInteger depositNa, String commissionRate
    String[] args = new String[]{packingAddress, depositNa.toString(), commissionRate};
    String txHash = (String) Utils.invokeExternalCmd("cs_createContractAgent", args);        
    ```

#### 1.2 合约委托共识节点

- 命令名称

    **`cs_contractDeposit `**

- 交易类型 
  
    **txType = `21`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:---------:|:---------:|:---------:|:---------:|:---------:|
    |agentHash    |创建合约共识节点交易hash     |String     |略|略|
    |deposit    |委托金额     |String     |BigInteger - toString|略|

- 返回值说明
  
    > 返回值类型是 **`String`** 字符串类型
    
    |描述 |字符串转换逻辑    |
    |:---------:|:---------:|
    |交易hash     |略|
    
- 示例

    ```java
    // String agentHash, BigInteger depositNa
    String[] args = new String[]{agentHash, depositNa.toString()};
    String txHash = (String) Utils.invokeExternalCmd("cs_contractDeposit", args);       
    ```

#### 1.3 合约退出共识节点

- 命令名称

    **`cs_contractWithdraw`**

- 交易类型 
  
    **txType = `22`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:---------:|:---------:|:---------:|:---------:|:---------:|
    |joinAgentHash    |加入共识时的交易hash     |String     |略|略|

- 返回值说明
  
    > 返回值类型是 **`String`** 字符串类型
    
    |描述 |字符串转换逻辑    |
    |:---------:|:---------:|
    |交易hash     |略|

- 示例

    ```java
    // String joinAgentHash
    String[] args = new String[]{joinAgentHash};
    String txHash = (String) Utils.invokeExternalCmd("cs_contractWithdraw", args);       
    ```    
    
#### 1.4 合约注销共识节点

- 命令名称

    **`cs_stopContractAgent `**

- 交易类型 
  
    **txType = `23`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    无参数

- 返回值说明
  
    > 返回值类型是 **`String`** 字符串类型
    
    |描述 |字符串转换逻辑    |
    |:---------:|:---------:|
    |交易hash     |略|

- 示例

    ```java
    String txHash = (String) Utils.invokeExternalCmd("cs_stopContractAgent", null);      
    ```
    
### 2. 查询共识数据

#### 2.1 根据_`加入共识时的交易hash`_查询委托共识信息

- 命令名称

    **`cs_getContractDepositInfo `**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:---------:|:---------:|:---------:|:---------:|:---------:|
    |joinAgentHash    |加入共识时的交易hash     |String     |略|略|

- 返回值说明
  
    > 返回值类型是 **`String[]`** 字符串数组类型
    
    |index  |描述 |字符串转换逻辑    |
    |:---------:|:---------:|:---------:|
    |0    | agentHash     |略|
    |1    | agentAddress     |AddressTool.getStringAddressByBytes(byte[])|
    |2    | joinAddress     |AddressTool.getStringAddressByBytes(byte[])|
    |3    | deposit     |BigInteger - toString|
    |4    | time     |Long - toString|
    |5    | blockHeight     |Long - toString|
    |6    | delHeight     |Long - toString|
    |7    | status(0-待共识 1-共识中) |Integer - toString|

- 示例

    ```java
    // String joinAgentHash
    String[] args = new String[]{joinAgentHash};
    String[] contractDepositInfo = (String[]) Utils.invokeExternalCmd("cs_getContractDepositInfo", args);  
    
    // 委托金额
    BigInteger deposit = new BigInteger(contractDepositInfo[3]);
    // 0-待共识 1-共识中
    String status = contractDepositInfo[7];     
    ```

#### 2.2 根据_`创建节点的交易hash`_查询节点信息

- 命令名称

    **`cs_getContractAgentInfo `**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:---------:|:---------:|:---------:|:---------:|:---------:|
    |agentHash    |创建合约共识节点交易hash     |String     |略|略|

- 返回值说明
  
    > 返回值类型是 **`String[]`** 字符串数组类型
    
    |index  |描述 |中文描述   |字符串转换逻辑    |
    |:---------:|:---------:|:---------:|:---------:|
    |0    | agentAddress     |创建节点的地址   |AddressTool.getStringAddressByBytes(byte[])|
    |1    | packingAddress     |打包地址    |AddressTool.getStringAddressByBytes(byte[])|
    |2    | rewardAddress     |奖励地址 |AddressTool.getStringAddressByBytes(byte[])|
    |3    | deposit     |保证金    |BigInteger - toString|
    |4 | totalDeposit |总委托金额 |BigInteger - toString|
    |5    | commissionRate     |佣金比例    |Integer - toString|
    |6    | time     |创建节点时间    |Long - toString|
    |7    | blockHeight     |创建节点的高度    |Long - toString|
    |8    | delHeight     |注销节点的高度      |Long - toString|
    |9    | status     |状态(0-待共识 1-共识中)  |Integer - toString|

- 示例

    ```java
    // String agentHash
    String[] args = new String[]{agentHash};
    String[] contractAgentInfo = (String[]) Utils.invokeExternalCmd("cs_getContractAgentInfo", args);  
    
    // 合约节点已委托金额
    BigInteger totalDepositOfContractAgent = new BigInteger(contractAgentInfo[4]);
    // 0-待共识 1-共识中
    String statusOfContractAgent = contractAgentInfo[9];     
    ```
    
## 十、合约共识交易说明

共识模块提供了四种与合约相关的共识交易，在模块启动时向合约模块注册创建四种合约共识交易的命令，使合约模块能够调用，使之可以创建与注销共识节点、委托与取消委托共识节点

### 1. 生成合约共识交易

#### 1.1 创建共识节点

- 原始参数表 

    > **`创建共识节点的地址`、`共识奖励地址`固定为`当前合约地址`**
    
    |名称      |描述        |类型      |是否可选       |备注       |
    |:--------:|:--------:|:--------:|:---------:|:---------:|
    |packingAddress    |打包地址     |byte[]     |是      |方法调用必填|
    |deposit    |保证金     |BigInteger     |是      |方法调用必填|
    |commissionRate    |佣金比例     |byte     |是      |方法调用必填 - 范围[10,100]|
    |agentAddress    |创建节点地址     |byte[]     |**否**      |底层默认为**`当前合约地址`**|
    |rewardAddress    |奖励地址     |byte[]     |**否**      |底层默认为**`当前合约地址`**|

- 注册信息

    > **共识模块向智能合约模块注册的创建合约共识节点的交易命令信息**

    |模块代码  |cmd名称     |注册类型   |参数名称列表 |返回值类型    |备注    |
    |:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|
    |consensus    | cs_createContractAgent |0(NEW_TX)|List.of("packingAddress","deposit","commissionRate")|1(STRING_ARRAY)     |创建共识节点|
    
- 交易类型 
  
    **txType = `20`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    >
    > 调用此方法时，共识模块此命令将收到以下参数
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:---------:|:---------:|:---------:|:---------:|:---------:|
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
        |:---------:|:---------:|:---------:|
        |0    |交易hash     |略|
        |1    |交易序列化字符串     |RPCUtil.encode(byte[])|
    
    - 调用者收到的是**`String`** 字符串类型

        |描述 |字符串转换逻辑    |
        |:---------:|:---------:|
        |交易hash     |略|

#### 1.2 合约委托共识节点

- 原始参数 

    > **`委托地址`固定为`当前合约地址`**
    
    |名称  |描述     |类型    |是否可选    |备注    |
    |:---------:|:---------:|:---------:|:---------:|:---------:|
    |agentHash    |创建合约共识节点交易hash     |String     |是      |方法调用必填|
    |deposit    |委托金额     |BigInteger     |是      |方法调用必填|
    |address    |委托地址     |byte[]     |**否**      |底层默认为**`当前合约地址`**|

- 注册信息

    > **共识模块向智能合约模块注册的创建合约委托共识节点的交易命令信息**
    
    |模块代码  |cmd名称     |注册类型   |参数名称列表 |返回值类型    |备注    |
    |:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|
    |consensus    | cs_contractDeposit |0(NEW_TX)|List.of("agentHash","deposit")|1(STRING_ARRAY)     |委托共识节点|

- 交易类型 
  
    **txType = `21`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    >
    > 调用此方法时，共识模块此命令将收到以下参数
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:---------:|:---------:|:---------:|:---------:|:---------:|
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
        |:---------:|:---------:|:---------:|
        |0    |交易hash     |略|
        |1    |交易序列化字符串     |RPCUtil.encode(byte[])|
    
    - 调用者收到的是**`String`** 字符串类型

        |描述 |字符串转换逻辑    |
        |:---------:|:---------:|
        |交易hash     |略|

#### 1.3 合约退出共识节点

- 原始参数 

    > **`创建节点的地址`固定为`当前合约地址`**
    
    |名称  |描述     |类型    |是否可选    |备注    |
    |:---------:|:---------:|:---------:|:---------:|:---------:|
    |joinAgentHash    |加入共识时的交易hash     |String     |是      |方法调用必填|
    |agentAddress    |创建节点的地址     |byte[]     |**否**      |底层默认为**`当前合约地址`**|

- 注册信息

    > **共识模块向智能合约模块注册的创建合约退出共识节点的交易命令信息**
    
    |模块代码  |cmd名称     |注册类型   |参数名称列表 |返回值类型    |备注    |
    |:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|
    |consensus    | cs_contractWithdraw |0(NEW_TX)|List.of("joinAgentHash")|1(STRING_ARRAY)     |退出委托共识节点|

- 交易类型 
  
    **txType = `22`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    >
    > 调用此方法时，共识模块此命令将收到以下参数
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:---------:|:---------:|:---------:|:---------:|:---------:|
    |joinAgentHash    |加入共识时的交易hash     |String     |略|略|
    |chainId    |当前链ID     |int     |-|底层提供参数|
    |contractAddress    |合约地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |contractSender    |合约调用者地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |blockTime    |当前打包的区块时间     |long     |-|底层提供参数 - 生成交易时用此作为交易时间|

- 返回值说明
  
    - 智能合约虚拟机收到的是**`String[]`** 字符串数组类型
    
        |index  |描述 |字符串转换逻辑    |
        |:---------:|:---------:|:---------:|
        |0    |交易hash     |略|
        |1    |交易序列化字符串     |RPCUtil.encode(byte[])|
    
    - 调用者收到的是**`String`** 字符串类型

        |描述 |字符串转换逻辑    |
        |:---------:|:---------:|
        |交易hash     |略|
    
    
#### 1.4 合约注销共识节点

- 原始参数 
  
    > **`创建节点的地址`固定为`当前合约地址`**
    
    |名称  |描述     |类型    |是否可选    |备注    |
    |:---------:|:---------:|:---------:|:---------:|:---------:|
    |agentAddress    |创建节点的地址     |byte[]     |**否**      |底层默认为**`当前合约地址`**|

- 注册信息

    > **共识模块向智能合约模块注册的创建合约注销共识节点的交易命令信息**
    
    |模块代码  |cmd名称     |注册类型   |参数名称列表 |返回值类型    |备注    |
    |:---------:|:---------:|:---------:|:---------:|:---------:|:---------:|
    |consensus    |cs_stopContractAgent     |0(NEW_TX)|`empty list`|1(STRING_ARRAY)     |注销共识节点|

- 交易类型 
  
    **txType = `23`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    >
    > 调用此方法时，共识模块此命令将收到以下参数
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:---------:|:---------:|:---------:|:---------:|:---------:|
    |chainId    |当前链ID     |int     |-|底层提供参数|
    |contractAddress    |合约地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |contractSender    |合约调用者地址     |String     |AddressTool.getStringAddressByBytes(byte[])|底层提供参数|
    |blockTime    |当前打包的区块时间     |long     |-|底层提供参数 - 生成交易时用此作为交易时间|

- 返回值说明
  
    - 智能合约虚拟机收到的是**`String[]`** 字符串数组类型
    
        |index  |描述 |字符串转换逻辑    |
        |:---------:|:---------:|:---------:|
        |0    |交易hash     |略|
        |1    |交易序列化字符串     |RPCUtil.encode(byte[])|
    
    - 调用者收到的是**`String`** 字符串类型

        |描述 |字符串转换逻辑    |
        |:---------:|:---------:|
        |交易hash     |略|
    

### 2. 合约共识交易数据获取方式

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

以下结果中，`contractTxList`即是本次合约执行后生成的交易，注意：这个结构里不限于合约共识交易，根据业务的不同会生成不同的合约内部交易，比如合约NULS资产转出交易 --> [智能合约NULS资产转出交易说明](./assetsOff.html)

```json
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
            "transfers" : [],
            "multyAssetTransfers": [],
            "events" : [],
            "debugEvents": [],
            "tokenTransfers" : [],
            "token721Transfers": [],
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






















