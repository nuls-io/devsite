# NULS智能合约开发手册

## 1. 简介

NULS智能合约使用Java进行开发，合约运行在NULS虚拟机中。合约开发不能使用所有的Java特性，在第3节列出具体限制。

## 2. 开发环境

### 2.1 安装NULS钱包

### 2.2 安装JDK 8

### 2.3 安装IntelliJ IDEA

Nuls智能合约使用的开发工具为IntelliJ IDEA。

### 2.4 安装NULS智能合约插件

NULS智能合约插件提供的主要功能：

* 新建NULS合约工程
* 提示不支持的Java特性、Java类、Java方法
* 编译、打包、部署合约
* 展示、调用合约方法。

## 3. NULS智能合约规范与语法

Nuls智能合约语法是Java语法的一个子集，在Java语法上做了一些限制。

### 3.1 NULS智能合约规范

> **_合约主类必须实现Contract接口，一个智能合约只能有一个类实现Contract接口，其他类和接口都是为这个合约提供功能的。_**

### 3.2 关键字

下面列出Java关键字，其中将标注NULS智能合约不支持的关键字

访问控制

* public
* protected
* private

定义类、接口、抽象类和实现接口、继承类的关键字、实例化对象

* class
* interface
* abstract
* implements
* extends
* new

包的关键字

* import
* package

数据类型的关键字

* byte
* char
* boolean
* short
* int
* float
* long
* double
* void
* null
* true
* false

条件循环（流程控制）

* if
* else
* while
* for
* switch
* case
* default
* do
* break
* continue
* return
* instanceof

错误处理

* catch
* try
* finally
* throw
* throws

修饰方法、类、属性和变量

* static
* final
* super
* this
* native（不支持）
* strictfp（不支持）
* synchronized（不支持）
* transient（不支持）
* volatile（不支持）

其他

* enum（不支持）
* assert（不支持）

### 3.3 基本语法

下面的语法与Java相同，只是简单列出，具体可参考Java相关文档

* 标识符：由字符、下划线、美元符或数字组成，以字符、下划线、美元符开头
* 基本数据类型：byte short int long float double char boolean
* 引用数据类型：类、接口、数组
* 算术运算符：+        -        *        /        %        ++        --
* 关系运算符：>        <        >=        <=        ==        !=  
* 逻辑运算符：!        &        |        ^        &&        ||
* 位运算符：&        |        ^        ~        >>        <<        >>>
* 赋值运算符：=
* 拓展赋值运算符：+        =        -=        *=        /=
* 字符串链接运算符：+
* 三目条件运算符          ?        :
* 流程控制语句（if,switch,for,while,do...while）

### 3.4 支持的类

Nuls智能合约只能使用下面的类进行开发

* io.nuls.contract.sdk.Address
* io.nuls.contract.sdk.Block
* io.nuls.contract.sdk.BlockHeader
* io.nuls.contract.sdk.Contract
* io.nuls.contract.sdk.Event
* io.nuls.contract.sdk.Msg
* io.nuls.contract.sdk.Utils
* io.nuls.contract.sdk.annotation.View
* io.nuls.contract.sdk.annotation.Required
* io.nuls.contract.sdk.annotation.Payable
* java.lang.Boolean
* java.lang.Byte
* java.lang.Short
* java.lang.Character
* java.lang.Integer
* java.lang.Long
* java.lang.Float
* java.lang.Double
* java.lang.String
* java.lang.StringBuilder
* java.math.BigInteger
* java.util.List
* java.util.ArrayList
* java.util.Map
* java.util.HashMap

### 3.4 其他限制

* 合约类只能有一个构造方法，其他类不限制

## 4. NULS智能合约简单示例

一个简单的合约

> **_合约主类必须实现Contract接口，其他类和接口都是为这个合约提供功能的。_**


```java
package contracts.examples;

import io.nuls.contract.sdk.Contract;
import io.nuls.contract.sdk.annotation.Payable;
import io.nuls.contract.sdk.annotation.Required;
import io.nuls.contract.sdk.annotation.View;

public class SimpleStorage implements Contract {

    private String storedData;

    @View
    public String getStoredData() {
        return storedData;
    }

    @Payable
    public void setStoredData(@Required String storedData) {
        this.storedData = storedData;
    }

}
```

在一个合约项目中，只需要引入jar包：contract-sdk.jar，这个包提供了获取区块信息和交易信息的类。
项目中可以有多个类和接口。

合约写好后，编译打包，部署到NULS链上时候，虚拟机会执行合约的构造方法初始化这个合约，并把这个合约状态保存在链上，合约状态是合约类的所有成员变量。
合约部署好以后，合约类的所有public方法都是能调用的，通过调用这些方法读取或修改合约状态。

注解说明

@View 标记@View的方法，调用后合约状态不会改变，可以通过这种方法查询合约状态。

@Payable 标记@Payable的方法，才能在调用时候传入金额

@Required 标记@Required的参数，调用时候必须传入值

去github下载NULS源码，里面有一些合约示例。

## 5. NULS Contract SDK

合约SDK提供了几个类，方便合约开发：

### io.nuls.contract.sdk.Address

```java
public class Address {

    private final String address;

    public Address(String address) {
        valid(address);
        this.address = address;
    }

    /**
     * 获取该地址的余额（只能获取合约地址余额）
     *
     * @return
     */
    public native BigInteger balance();

    /**
     * 合约向该地址转账
     *
     * @param value 转账金额（多少Na）
     */
    public native void transfer(BigInteger value);

    /**
     * 调用该地址的合约方法
     *
     * @param methodName 方法名
     * @param methodDesc 方法签名
     * @param args       参数
     * @param value      附带的货币量（多少Na）
     */
    public native void call(String methodName, String methodDesc, String[][] args, BigInteger value);

    /**
     * 验证地址
     *
     * @param address
     * @see io.nuls.kernel.utils.AddressTool#validAddress(String)
     */
    private native void valid(String address);

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Address address1 = (Address) o;
        return address != null ? address.equals(address1.address) : address1.address == null;
    }

    @Override
    public int hashCode() {
        return address != null ? address.hashCode() : 0;
    }

    @Override
    public String toString() {
        return address;
    }

}
```

### io.nuls.contract.sdk.Block

```java
public class Block {

    /**
     * 给定块的区块头
     *
     * @param blockNumber
     * @return
     */
    public static native BlockHeader getBlockHeader(long blockNumber);

    /**
     * 当前块的区块头
     *
     * @return
     */
    public static native BlockHeader currentBlockHeader();

    /**
     * 给定块的哈希值
     * hash of the given block
     *
     * @param blockNumber
     * @return
     */
    public static String blockhash(long blockNumber) {
        return getBlockHeader(blockNumber).getHash();
    }

    /**
     * 当前块矿工地址
     * current block miner’s address
     *
     * @return
     */
    public static Address coinbase() {
        return currentBlockHeader().getPackingAddress();
    }

    /**
     * 当前块编号
     * current block number
     *
     * @return
     */
    public static long number() {
        return currentBlockHeader().getHeight();
    }

    /**
     * 当前块时间戳
     * current block timestamp
     *
     * @return
     */
    public static long timestamp() {
        return currentBlockHeader().getTime();
    }

}
```

### io.nuls.contract.sdk.BlockHeader

```java
public class BlockHeader {

    private String hash;
    private long time;
    private long height;
    private Address packingAddress;
    private String stateRoot;

    public String getHash() {
        return hash;
    }

    public long getTime() {
        return time;
    }

    public long getHeight() {
        return height;
    }

    public Address getPackingAddress() {
        return packingAddress;
    }

    public String getStateRoot() {
        return stateRoot;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BlockHeader that = (BlockHeader) o;

        if (time != that.time) return false;
        if (height != that.height) return false;
        if (hash != null ? !hash.equals(that.hash) : that.hash != null) return false;
        if (packingAddress != null ? !packingAddress.equals(that.packingAddress) : that.packingAddress != null)
            return false;
        return stateRoot != null ? stateRoot.equals(that.stateRoot) : that.stateRoot == null;
    }

    @Override
    public int hashCode() {
        int result = hash != null ? hash.hashCode() : 0;
        result = 31 * result + (int) (time ^ (time >>> 32));
        result = 31 * result + (int) (height ^ (height >>> 32));
        result = 31 * result + (packingAddress != null ? packingAddress.hashCode() : 0);
        result = 31 * result + (stateRoot != null ? stateRoot.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "BlockHeader{" +
                "hash='" + hash + '\'' +
                ", time=" + time +
                ", height=" + height +
                ", packingAddress=" + packingAddress +
                ", stateRoot='" + stateRoot + '\'' +
                '}';
    }

}
```

### io.nuls.contract.sdk.Contract

```java
/**
 * 合约接口，合约类实现这个接口
 */
public interface Contract {

    /**
     * 直接向合约转账，会触发这个方法，默认不做任何操作，可以重载这个方法。
     */
    default void _payable() {
    }

}
```

### io.nuls.contract.sdk.Event

```java
/**
* 事件接口，事件类实现这个接口
*/
public interface Event {
}
```

### io.nuls.contract.sdk.Msg

```java
public class Msg {

    /**
     * 剩余Gas
     * remaining gas
     *
     * @return
     */
    public static native long gasleft();

    /**
     * 消息发送者地址
     * sender of the message
     *
     * @return
     */
    public static native Address sender();

    /**
     * 随消息发送的Na数
     * number of na sent with the message
     *
     * @return
     */
    public static native BigInteger value();

    /**
     * Gas价格
     * gas price
     *
     * @return
     */
    public static native long gasprice();

    /**
     * 合约地址
     * contract address
     *
     * @return
     */
    public static native Address address();

}
```

### io.nuls.contract.sdk.Utils

```java
public class Utils {

    private Utils() {
    }

    /**
     * 检查条件，如果条件不满足则回滚
     *
     * @param expression
     */
    public static void require(boolean expression) {
        if (!expression) {
            revert();
        }
    }

    /**
     * 检查条件，如果条件不满足则回滚
     *
     * @param expression
     * @param errorMessage
     */
    public static void require(boolean expression, String errorMessage) {
        if (!expression) {
            revert(errorMessage);
        }
    }

    /**
     * 终止执行并还原改变的状态
     */
    public static void revert() {
        revert(null);
    }

    /**
     * 终止执行并还原改变的状态
     *
     * @param errorMessage
     */
    public static native void revert(String errorMessage);

    /**
     * 发送事件
     *
     * @param event
     */
    public static native void emit(Event event);

}
```

### io.nuls.contract.sdk.annotation.Payable

`@Payable 标记@Payable的方法，才能在调用时候传入金额`

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Payable {
}
```

### io.nuls.contract.sdk.annotation.Required

`@Required 标记@Required的参数，调用时候必须传入值`

```java
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Required {
}
```

### io.nuls.contract.sdk.annotation.View

`@View 标记@View的方法，调用后合约状态不会改变，可以通过这种方法查询合约状态。`

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface View {
}
```

## 6. 智能合约主要的RPC接口

这里列举几个接口的参数结构及简单实例，其他接口请参见[Swagger UI](http://127.0.0.1:8001/docs#/)
> 测试网的`Swagger UI`的端口默认是8001，正式网的端口默认是6001

### 6.1 创建智能合约

- POST `/api/contract/create` 

|参数|类型|说明|
|:-:|:-:|:-:|
|sender* |string |交易创建者|
|password*	|string| 交易创建者账户密码|
|gasLimit*| long| 最大gas消耗|
|price*	| long| 执行合约单价|
|contractCode*	|string| 智能合约代码(字节码的Hex编码字符串)|
|remark	|string |备注|
|args	|string[][]|参数列表|

- Example Value

```json
{
  "sender": "Nsdz8mKKFMehRDVRZFyXNuuenugUYM7M",
  "gasLimit": 4687,
  "price": 20,
  "password": "xxx",
  "contractCode": "504b03041400080808003b5aed4c000000000000000000000000090004004d4554412d494e462ffeca00000300504b0708000000000200000000000000504b03041400080808003b5aed4c000000000000000000000000140000004d4554412d494e462f4d414e49464553542e4d46f34dcccb4c4b2d2ed10d4b2d2acecccfb35230d433e0e5722e4a4d2c494dd175aa040958e819c41b9a982868f8172526e7a42a38e71715e417259600d56bf272f1720100504b07089e7c76534400000045000000504b03040a00000800007559ed4c0000000000000000000000000d00000074657374636f6e74726163742f504b03041400080808008359ed4c0000000000000000000000001f00000074657374636f6e74726163742f54657374436f6e74726163742e636c6173737d535d53d350103d9796a684604b2cdf20c5cf365a421110f986225a2cf040c5d1b7b40d25d0264c9232e39bbfc2f147f8a03352189df107f8a31cf7b635744a310f7befeedd73f6dcdd9bdf7f7efc023083bd2e746052801ac4948824a6453cc58c8859cc75827f9f3f7de4de331e9f0fe2b9883e2c04b1c8714bdc2c0b581111c60237ab41acf1754ec0ba800d06bfa99575063973ac9d696a49338beabe6b1b66719121e07c28e7ac12434fca321d5733dd03ad54a1ec6041cf1b65ade430b0b48f44c80c425177776b5c9158bc1d9b3f6515e83494314c7db752cee97656cb956ab5adbc563ad06c83fb8da0df3d32887e24e3ea8e9bb74cd7d6f2ae9a2527d57088b28b6aee373476d37ed393e58bc5d3a429a791863c574c10d339d46dbad592611aee4a2de78041dcb72a765edf3278d5dee60293fc12120630c83074a30c868e6c56404ac2265e08d89210c34b01af24a4312e611baf25c491a1baeb6f93b3f36f2428784cd23947d63ad14d094318943082518681d6be6d548c5241b725ec609740d144b4cec210be4addcb1deb5cc89861a966a5e4a89e50a770a25e091d6c7bbee314a9535aa160eb0e752e4ad36b9bb75ecfa0b68ffeef9ccafc9b7f59738fd40da398365dbda8db848cb48bf3e958f5eb929033fec4f60ea9e5b1ed1b798662ed4ff84003dae9a96e161812b1ebcff0facb6c74781113f4aff481a11f3edad1d4f9bbe6b3a1d830ed3b282ef33179fe1802b4bf8371b2518aa8b4325a3b95ef605f6b29136403b5a082bb64a57a02eee13ead0c0f3c70a201f6c9be56e86413d4e7411fe2512b342c7f69814eb785c6bcaa330da878097f159d55045a8bcf3531881e43dc6358265e7e16228608844b745521cadd573422adc002512c3651853c2afa1d1a5456832aa95c4052e49e733045f69de3961296cf11fa89f0bb0bf42aefa9bb55c8f26d32554428eb9b576c9854032bf05367456a51989ad48f554c61ada978d22bfea4864cfc05504b070818c1191cd20200006f050000504b010214001400080808003b5aed4c0000000002000000000000000900040000000000000000000000000000004d4554412d494e462ffeca0000504b010214001400080808003b5aed4c9e7c7653440000004500000014000000000000000000000000003d0000004d4554412d494e462f4d414e49464553542e4d46504b01020a000a00000800007559ed4c0000000000000000000000000d00000000000000000000000000c300000074657374636f6e74726163742f504b010214001400080808008359ed4c18c1191cd20200006f0500001f00000000000000000000000000ee00000074657374636f6e74726163742f54657374436f6e74726163742e636c617373504b05060000000004000400050100000d0400000000",
  "remark": "asd",
  "args": []
}
```



### 6.2 估算创建智能合约的Gas消耗

- POST `/api/contract/imputedgas/create` 

|参数|类型|说明|
|:-:|:-:|:-:|
|sender* |string |交易创建者|
|password*	|string| 交易创建者账户密码|
|price*	| long| 执行合约单价|
|contractCode*	|string| 智能合约代码(字节码的Hex编码字符串)|
|args	|string[][]|参数列表|

- Example Value

```json
{
  "sender": "Nsdz8mKKFMehRDVRZFyXNuuenugUYM7M",
  "price": 20,
  "password": "xxx",
  "contractCode": "504b03041400080808003b5aed4c000000000000000000000000090004004d4554412d494e462ffeca00000300504b0708000000000200000000000000504b03041400080808003b5aed4c000000000000000000000000140000004d4554412d494e462f4d414e49464553542e4d46f34dcccb4c4b2d2ed10d4b2d2acecccfb35230d433e0e5722e4a4d2c494dd175aa040958e819c41b9a982868f8172526e7a42a38e71715e417259600d56bf272f1720100504b07089e7c76534400000045000000504b03040a00000800007559ed4c0000000000000000000000000d00000074657374636f6e74726163742f504b03041400080808008359ed4c0000000000000000000000001f00000074657374636f6e74726163742f54657374436f6e74726163742e636c6173737d535d53d350103d9796a684604b2cdf20c5cf365a421110f986225a2cf040c5d1b7b40d25d0264c9232e39bbfc2f147f8a03352189df107f8a31cf7b635744a310f7befeedd73f6dcdd9bdf7f7efc023083bd2e746052801ac4948824a6453cc58c8859cc75827f9f3f7de4de331e9f0fe2b9883e2c04b1c8714bdc2c0b581111c60237ab41acf1754ec0ba800d06bfa99575063973ac9d696a49338beabe6b1b66719121e07c28e7ac12434fca321d5733dd03ad54a1ec6041cf1b65ade430b0b48f44c80c425177776b5c9158bc1d9b3f6515e83494314c7db752cee97656cb956ab5adbc563ad06c83fb8da0df3d32887e24e3ea8e9bb74cd7d6f2ae9a2527d57088b28b6aee373476d37ed393e58bc5d3a429a791863c574c10d339d46dbad592611aee4a2de78041dcb72a765edf3278d5dee60293fc12120630c83074a30c868e6c56404ac2265e08d89210c34b01af24a4312e611baf25c491a1baeb6f93b3f36f2428784cd23947d63ad14d094318943082518681d6be6d548c5241b725ec609740d144b4cec210be4addcb1deb5cc89861a966a5e4a89e50a770a25e091d6c7bbee314a9535aa160eb0e752e4ad36b9bb75ecfa0b68ffeef9ccafc9b7f59738fd40da398365dbda8db848cb48bf3e958f5eb929033fec4f60ea9e5b1ed1b798662ed4ff84003dae9a96e161812b1ebcff0facb6c74781113f4aff481a11f3edad1d4f9bbe6b3a1d830ed3b282ef33179fe1802b4bf8371b2518aa8b4325a3b95ef605f6b29136403b5a082bb64a57a02eee13ead0c0f3c70a201f6c9be56e86413d4e7411fe2512b342c7f69814eb785c6bcaa330da878097f159d55045a8bcf3531881e43dc6358265e7e16228608844b745521cadd573422adc002512c3651853c2afa1d1a5456832aa95c4052e49e733045f69de3961296cf11fa89f0bb0bf42aefa9bb55c8f26d32554428eb9b576c9854032bf05367456a51989ad48f554c61ada978d22bfea4864cfc05504b070818c1191cd20200006f050000504b010214001400080808003b5aed4c0000000002000000000000000900040000000000000000000000000000004d4554412d494e462ffeca0000504b010214001400080808003b5aed4c9e7c7653440000004500000014000000000000000000000000003d0000004d4554412d494e462f4d414e49464553542e4d46504b01020a000a00000800007559ed4c0000000000000000000000000d00000000000000000000000000c300000074657374636f6e74726163742f504b010214001400080808008359ed4c18c1191cd20200006f0500001f00000000000000000000000000ee00000074657374636f6e74726163742f54657374436f6e74726163742e636c617373504b05060000000004000400050100000d0400000000",
  "args": []
}
```



### 6.3 调用智能合约

- POST `/api/contract/call` 

|参数|类型|说明|
|:-:|:-:|:-:|
|sender* |string |交易创建者|
|password*	|string| 交易创建者账户密码|
|contractAddress*	|string| 智能合约地址|
|gasLimit*	| long| 最大Gas消耗|
|price*	| long| 执行合约单价|
|value	|long| 交易创建者向合约地址转账的金额(Na - 100000000Na=1NULS)|
|methodName*	|string| 方法名|
|methodDesc	|string| 方法签名，如果方法名不重复，可以不传|
|remark |string| 备注|
|args	|string[][]|参数列表|


- Example Value

```json
{
  "sender": "Nsdz8mKKFMehRDVRZFyXNuuenugUYM7M",
  "password": "",
  "contractAddress": "NseBvPEzerLi3p5Me8Rbm7SeHThVGv1U",
  "gasLimit": 8000,
  "price": 20,
  "value": 0,
  "methodName": "balance",
  "methodDesc": "",
  "remark": "qwe"
  "args": []
}
```


### 6.4 估算调用智能合约的Gas消耗(参见`Swagger UI`)

- POST `/api/contract/imputedgas/call` 



### 6.5 估算智能合约的price(参见`Swagger UI`)
- POST `/api/contract/imputedprice`



### 6.6 终止智能合约(参见`Swagger UI`)

- POST `/api/contract/delete` 



### 6.7 调用不上链的智能合约函数(参见`Swagger UI`)

- POST `/api/contract/view` 



### 6.8 获取智能合约执行结果(参见`Swagger UI`)

- GET `/api/contract/result/{hash}` 



### 6.9 获取智能合约基本信息(参见`Swagger UI`)

- GET `/api/contract/info/{address}` 



### 6.10 验证是否为合约地址(参见`Swagger UI`)

- GET `/api/contract/{address}` 



### 6.11 获取智能合约地址的NULS余额(参见`Swagger UI`)

- GET `/api/contract/balance/{address}` 



### 6.12 获取智能合约交易详情(参见`Swagger UI`)

- GET `/api/contract/tx/{hash}` 



### 6.13 获取智能合约的交易列表(参见`Swagger UI`)

- GET `/api/contract/tx/list/{address}` 


### 6.14 根据address和limit查询合约UTXO(参见`Swagger UI`)

- GET `/api/contract/limit/{address}/{limit}` 



### 6.15 根据address和amount查询合约UTXO(参见`Swagger UI`)

- GET `/api/contract/amount/{address}/{amount}` 


### 6.16 向智能合约转账(参见`Swagger UI`)

- POST `/api/contract/transfer` 



## 7. 示例

### 7.1 投票智能合约代码片段, 如下

> 完整代码: `https://github.com/nuls-io/nuls-vote`

```java
package io.nuls.vote.contract;

import io.nuls.contract.sdk.Address;
import io.nuls.contract.sdk.Contract;
import io.nuls.contract.sdk.Utils;
import io.nuls.contract.sdk.annotation.Payable;
import io.nuls.contract.sdk.annotation.View;
import io.nuls.vote.contract.func.BaseVote;
import io.nuls.vote.contract.func.VoteInterface;
import io.nuls.vote.contract.model.VoteConfig;
import io.nuls.vote.contract.model.VoteEntity;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

public class VoteContract implements Contract {

    private VoteInterface baseVote;

    public VoteContract(long minRecognizance) {
        baseVote = new BaseVote(BigInteger.valueOf(minRecognizance));
    }

    @Payable
    public VoteEntity create(String title, String desc, String[] items, long startTime, long endTime, boolean isMultipleSelect, int maxSelectCount, boolean voteCanModify) {
        VoteEntity voteEntity = baseVote.create(title, desc, items);

        VoteConfig config = new VoteConfig(startTime, endTime, isMultipleSelect, maxSelectCount, voteCanModify);
        boolean success = baseVote.init(voteEntity.getId(), config);

        Utils.require(success);

        return voteEntity;
    }

    public boolean vote(long voteId, long[] itemIds) {
        return baseVote.vote(voteId, itemIds);
    }

    public boolean redemption(long voteId) {
        return baseVote.redemption(voteId);
    }

    @View
    public boolean canVote(long voteId) {
        return baseVote.canVote(voteId);
    }

    @View
    public VoteEntity queryVote(long voteId) {
        return baseVote.queryVote(voteId);
    }

    @View
    public Map<Address, List<Long>> queryVoteResult(long voteId) {
        return baseVote.queryVoteResult(voteId);
    }

    @View
    public boolean queryAddressHasVote(long voteId, Address address) {
        return baseVote.queryAddressHasVote(voteId, address);
    }
}

```

智能合约的方法中如果有`数组类型`的参数，请使用如下方式传递参数
> 参考以上投票合约代码中的`create`方法

```javascript
{
  "sender": "NsdtydTVWskMc7GkZzbsq2FoChqKFwMf",
  "password": "",
  "contractAddress": "NseLt14NacjTDhXaTXUdrk6VF7aEwtW4",
  "gasLimit": 200000,
  "price": 1,
  "value": 10000000000,
  "methodName": "create",
  "methodDesc": "",
  "remark": "",
  "args": [
    "测试投票1",
    "第一个投票合约",
    [
      "第一个选项",
      "第二个选项",
      "第三个选项"
    ],
    1536044066056, 1536184066056, false, 300, false
  ]
}
```


### 7.2 Standard Token 智能合约代码

> 完整代码: `https://github.com/nuls-io/nuls-nrc20`

```java
package io.nuls.contract.token;

import io.nuls.contract.sdk.Address;
import io.nuls.contract.sdk.Contract;
import io.nuls.contract.sdk.Msg;
import io.nuls.contract.sdk.annotation.Required;
import io.nuls.contract.sdk.annotation.View;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

import static io.nuls.contract.sdk.Utils.emit;
import static io.nuls.contract.sdk.Utils.require;

public class SimpleToken implements Contract, Token {

    private final String name;
    private final String symbol;
    private final int decimals;
    private BigInteger totalSupply = BigInteger.ZERO;

    private Map<Address, BigInteger> balances = new HashMap<Address, BigInteger>();
    private Map<Address, Map<Address, BigInteger>> allowed = new HashMap<Address, Map<Address, BigInteger>>();

    @Override
    @View
    public String name() {
        return name;
    }

    @Override
    @View
    public String symbol() {
        return symbol;
    }

    @Override
    @View
    public int decimals() {
        return decimals;
    }

    @Override
    @View
    public BigInteger totalSupply() {
        return totalSupply;
    }

    public SimpleToken(@Required String name, @Required String symbol, @Required BigInteger initialAmount, @Required int decimals) {
        this.name = name;
        this.symbol = symbol;
        this.decimals = decimals;
        totalSupply = initialAmount.multiply(BigInteger.TEN.pow(decimals));;
        balances.put(Msg.sender(), totalSupply);
        emit(new TransferEvent(null, Msg.sender(), totalSupply));
    }

    @Override
    @View
    public BigInteger allowance(@Required Address owner, @Required Address spender) {
        Map<Address, BigInteger> ownerAllowed = allowed.get(owner);
        if (ownerAllowed == null) {
            return BigInteger.ZERO;
        }
        BigInteger value = ownerAllowed.get(spender);
        if (value == null) {
            value = BigInteger.ZERO;
        }
        return value;
    }

    @Override
    public boolean transferFrom(@Required Address from, @Required Address to, @Required BigInteger value) {
        subtractAllowed(from, Msg.sender(), value);
        subtractBalance(from, value);
        addBalance(to, value);
        emit(new TransferEvent(from, to, value));
        return true;
    }

    @Override
    @View
    public BigInteger balanceOf(@Required Address owner) {
        require(owner != null);
        BigInteger balance = balances.get(owner);
        if (balance == null) {
            balance = BigInteger.ZERO;
        }
        return balance;
    }

    @Override
    public boolean transfer(@Required Address to, @Required BigInteger value) {
        subtractBalance(Msg.sender(), value);
        addBalance(to, value);
        emit(new TransferEvent(Msg.sender(), to, value));
        return true;
    }

    @Override
    public boolean approve(@Required Address spender, @Required BigInteger value) {
        setAllowed(Msg.sender(), spender, value);
        emit(new ApprovalEvent(Msg.sender(), spender, value));
        return true;
    }

    public boolean increaseApproval(@Required Address spender, @Required BigInteger addedValue) {
        addAllowed(Msg.sender(), spender, addedValue);
        emit(new ApprovalEvent(Msg.sender(), spender, allowance(Msg.sender(), spender)));
        return true;
    }

    public boolean decreaseApproval(@Required Address spender, @Required BigInteger subtractedValue) {
        check(subtractedValue);
        BigInteger oldValue = allowance(Msg.sender(), spender);
        if (subtractedValue.compareTo(oldValue) > 0) {
            setAllowed(Msg.sender(), spender, BigInteger.ZERO);
        } else {
            subtractAllowed(Msg.sender(), spender, subtractedValue);
        }
        emit(new ApprovalEvent(Msg.sender(), spender, allowance(Msg.sender(), spender)));
        return true;
    }

    private void addAllowed(Address address1, Address address2, BigInteger value) {
        BigInteger allowance = allowance(address1, address2);
        check(allowance);
        check(value);
        setAllowed(address1, address2, allowance.add(value));
    }

    private void subtractAllowed(Address address1, Address address2, BigInteger value) {
        BigInteger allowance = allowance(address1, address2);
        check(allowance, value, "Insufficient approved token");
        setAllowed(address1, address2, allowance.subtract(value));
    }

    private void setAllowed(Address address1, Address address2, BigInteger value) {
        check(value);
        Map<Address, BigInteger> address1Allowed = allowed.get(address1);
        if (address1Allowed == null) {
            address1Allowed = new HashMap<Address, BigInteger>();
            allowed.put(address1, address1Allowed);
        }
        address1Allowed.put(address2, value);
    }

    private void addBalance(Address address, BigInteger value) {
        BigInteger balance = balanceOf(address);
        check(value, "The value must be greater than or equal to 0.");
        check(balance);
        balances.put(address, balance.add(value));
    }

    private void subtractBalance(Address address, BigInteger value) {
        BigInteger balance = balanceOf(address);
        check(balance, value, "Insufficient balance of token.");
        balances.put(address, balance.subtract(value));
    }

    private void check(BigInteger value) {
        require(value != null && value.compareTo(BigInteger.ZERO) >= 0);
    }

    private void check(BigInteger value1, BigInteger value2) {
        check(value1);
        check(value2);
        require(value1.compareTo(value2) >= 0);
    }

    private void check(BigInteger value, String msg) {
        require(value != null && value.compareTo(BigInteger.ZERO) >= 0, msg);
    }

    private void check(BigInteger value1, BigInteger value2, String msg) {
        check(value1);
        check(value2);
        require(value1.compareTo(value2) >= 0, msg);
    }



}

```





