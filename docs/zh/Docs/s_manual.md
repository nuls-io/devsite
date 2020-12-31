# 开发手册

## 1. 简介

NULS智能合约使用Java进行开发，合约运行在NULS虚拟机中。合约开发不能使用所有的Java特性，在第3节列出具体限制。

## 2. 开发环境

### 2.1 安装JDK 8

### 2.2 安装IntelliJ IDEA

Nuls智能合约使用的开发工具为IntelliJ IDEA。

### 2.3 NULS智能合约开发工具

NULS智能合约开发工具提供的主要功能：

* 新建NULS智能合约Maven工程
* 提供可视化页面来编译、打包、部署合约、调用合约、查询合约相关数据

> [构建NULS智能合约开发工具的说明文档](./s_tools.html)

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
* io.nuls.contract.sdk.MultyAssetValue
* io.nuls.contract.sdk.annotation.View
* io.nuls.contract.sdk.annotation.Required
* io.nuls.contract.sdk.annotation.Payable
* io.nuls.contract.sdk.annotation.JSONSerializable
* io.nuls.contract.sdk.annotation.PayableMultyAsset
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
* java.math.BigDecimal
* java.util.Collection
* java.util.List
* java.util.ArrayList
* java.util.LinkedList
* java.util.Map
* java.util.HashMap
* java.util.LinkedHashMap
* java.util.Set
* java.util.HashSet

### 3.5 其他限制

* 合约类只能有一个构造方法，其他类不限制
* 执行一次合约方法最大的Gas消耗是1000万，请保证尽可能的优化合约代码
* 执行一次`@View`类型的方法调用，最大的Gas消耗是1亿，请保证尽可能的优化合约代码

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

    /**
     * 调用后合约状态不会改变，可以通过这种方法查询合约状态
     */
    @View
    public String getStoredData() {
        return storedData;
    }

    /**
     * 标记@Payable的方法，才能在调用时候传入NULS金额
     */
    @Payable
    public void setStoredData(@Required String storedData) {
        this.storedData = storedData;
    }
    
    /**
     * 返回值会被VM自动JSON序列化，以JSON字符串的形式返回
     * 注意：对象层级不得超过3层，超过3层的部分会调用对象的toString方法，不会再继续序列化
     */
    @JSONSerializable
    public Map vJsonSerializableMap() {
        Map map = new HashMap();
        map.put("name", "nuls");
        map.put("url", "https://nuls.io");
        return map;
    }

}
```

合约写好后，编译打包，部署到NULS链上时候，虚拟机会执行合约的构造方法初始化这个合约，并把这个合约状态保存在链上，合约状态是合约类的所有成员变量。
合约部署好以后，_**合约类的所有public方法都是能调用的**_，通过调用这些方法读取或修改合约状态。

注解说明

@JSONSerializable 标记@JSONSerializable的方法，返回值会被VM自动JSON序列化，以JSON字符串的形式返回。

<b style="color:red">注意：对象层级不得超过3层，超过3层的部分会调用对象的toString方法，不会再继续序列化。</b>

@View 标记@View的方法，调用后合约状态不会改变，可以通过这种方法查询合约状态。

@Payable 标记@Payable的方法，才能在调用时候传入NULS金额

@PayableMultyAsset 标记@PayableMultyAsset的方法，才能在调用时候传入其他资产金额，支持同时转入多个其他资产

@Required 标记@Required的参数，调用时候必须传入值，_**若不想传递未标记此注解的参数，需要填入0或者null占位**_

### Github上里面有一些合约示例。

[NULS合约示例收集](https://github.com/nuls-io/nuls-contracts)

[NULS合约示例 - NRC20](https://github.com/CCC-NULS/NRC20-Token)

[NULS合约示例 - NRC721](https://github.com/MIMIEYES/NULS-NRC721-baselib)

[NULS合约示例 - POCM](https://github.com/CCC-NULS/pocm-contract)

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
     * 获取该地址的可用余额
     *
     * @return BigInteger
     */
    public native BigInteger balance();

    /**
     * 获取该地址的总余额
     *
     * @return BigInteger
     */
    public native BigInteger totalBalance();

    /**
     * 合约向该地址转账(NULS, 可锁定)
     *
     * @param value         转账金额（多少Na）
     * @param lockedTime    锁定时间（单位秒，若锁定1分钟，则填入60）
     */
    public native void transferLocked(BigInteger value, long lockedTime);

    /**
     * 合约向该地址转账(NULS)
     *
     * @param value
     */
    public void transfer(BigInteger value) {
        this.transferLocked(value, 0);
    }


    /**
     * 合约向该地址转账指定的资产(可锁定)
     *
     * @param value          转账金额
     * @param assetChainId   资产链ID
     * @param assetId        资产ID
     * @param lockedTime     锁定时间（单位秒，若锁定1分钟，则填入60）
     */
    public native void transferLocked(BigInteger value, int assetChainId, int assetId, long lockedTime);

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

    /**
     * 获取该地址指定资产的可用余额
     *
     * @param assetChainId   资产链ID
     * @param assetId        资产ID
     * @return
     */
    public native BigInteger balance(int assetChainId, int assetId);

    /**
     * 获取该地址指定资产的总余额
     *
     * @param assetChainId   资产链ID
     * @param assetId        资产ID
     * @return
     */
    public native BigInteger totalBalance(int assetChainId, int assetId);

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
     * 调用该地址的合约方法并带有返回值(String)
     *
     * @param methodName 方法名
     * @param methodDesc 方法签名
     * @param args       参数
     * @param value      附带的货币量（多少Na）
     * @return 调用合约后的返回值
     */
    public native String callWithReturnValue(String methodName, String methodDesc, String[][] args, BigInteger value);

    /**
     * 调用该地址的合约方法并带有返回值(String)
     *
     * @param methodName        方法名
     * @param methodDesc        方法签名
     * @param args              参数
     * @param value             转入资产数量
     * @param multyAssetValues  转入的其他资产
     * @return 调用合约后的返回值
     */
    public native String callWithReturnValue(String methodName, String methodDesc, String[][] args, BigInteger value, MultyAssetValue[] multyAssetValues);

    /**
     * 验证地址
     *
     * @param address 地址
     */
    private native void valid(String address);

    /**
     * 验证地址是否是合约地址
     *
     */
    public native boolean isContract();

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
     * @param blockNumber 区块高度
     * @return 给定块的区块头
     */
    public static native BlockHeader getBlockHeader(long blockNumber);

    /**
     * 当前块的区块头
     *
     * @return 当前块的区块头
     */
    public static native BlockHeader currentBlockHeader();

    /**
     * 最新块的区块头
     *
     * @return 最新块的区块头
     */
    public static native BlockHeader newestBlockHeader();

    /**
     * 给定块的哈希值
     * hash of the given block
     *
     * @param blockNumber
     * @return 给定块的哈希值
     */
    public static String blockhash(long blockNumber) {
        return getBlockHeader(blockNumber).getHash();
    }

    /**
     * 当前块矿工地址
     * current block miner’s address
     *
     * @return 地址
     */
    public static Address coinbase() {
        return currentBlockHeader().getPackingAddress();
    }

    /**
     * 当前块编号
     * current block number
     *
     * @return number
     */
    public static long number() {
        return currentBlockHeader().getHeight();
    }

    /**
     * 当前块时间戳
     * current block timestamp
     *
     * @return timestamp
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
    private long txCount;
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

    public long getTxCount() {
        return txCount;
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
        if (txCount != that.txCount) return false;
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
        result = 31 * result + (int) (txCount ^ (txCount >>> 32));
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
                ", txCount=" + txCount +
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
     * 前提: 需重载这个方法，并且标记`@Payable`注解
     */
    default void _payable() {
    }

    /**
     * 直接向合约转账其他资产，会触发这个方法，默认不做任何操作
     * 前提: 若合约地址支持直接转账其他资产，需重载这个方法，并且标记`@PayableMultyAsset`注解
     */
    default void _payableMultyAsset() {
    }
    
    /**
     * 1. 当共识节点奖励地址是合约地址时，会触发这个方法，参数是区块奖励地址明细二维数组数据 eg. [[address, amount], [address, amount], ...]
     * 2. 当委托节点地址是合约地址时，会触发这个方法，参数是合约地址和奖励金额二维数组数据 eg. [[address, amount]]
     * 前提: 需重载这个方法，并且标记`@Payable`注解
     */
    default void _payable(String[][] args) {
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
     * @return 剩余gas
     */
    public static native long gasleft();

    /**
     * 合约发送者地址
     * sender of the contract
     *
     * @return 消息发送者地址
     */
    public static native Address sender();

    /**
     * 合约发送者地址公钥
     * sender public key of the contract
     *
     * @return 消息发送者地址公钥
     */
    public static native String senderPublicKey();

    /**
     * 合约发送者转入合约地址的Nuls数量，单位是Na，1Nuls=1亿Na
     * The number of Nuls transferred by the contract sender to the contract address, the unit is Na, 1Nuls = 1 billion Na
     *
     * @return
     */
    public static native BigInteger value();
    
    /**
     * 合约发送者转入合约地址的其他资产列表
     *
     */
    public static native MultyAssetValue[] multyAssetValues();

    /**
     * Gas价格
     * gas price
     *
     * @return Gas价格
     */
    public static native long gasprice();

    /**
     * 合约地址
     * contract address
     *
     * @return 合约地址
     */
    public static native Address address();

}
```

### io.nuls.contract.sdk.MultyAssetValue

```java
public class MultyAssetValue {

    private BigInteger value;
    private int assetChainId;
    private int assetId;

    public MultyAssetValue() {
    }

    public MultyAssetValue(BigInteger value, int assetChainId, int assetId) {
        this.value = value;
        this.assetChainId = assetChainId;
        this.assetId = assetId;
    }

    public BigInteger getValue() {
        return value;
    }

    public void setValue(BigInteger value) {
        this.value = value;
    }

    public int getAssetChainId() {
        return assetChainId;
    }

    public void setAssetChainId(int assetChainId) {
        this.assetChainId = assetChainId;
    }

    public int getAssetId() {
        return assetId;
    }

    public void setAssetId(int assetId) {
        this.assetId = assetId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MultyAssetValue that = (MultyAssetValue) o;

        if (assetChainId != that.assetChainId) return false;
        if (assetId != that.assetId) return false;
        if (!value.equals(that.value)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = value.hashCode();
        result = 31 * result + assetChainId;
        result = 31 * result + assetId;
        return result;
    }
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

	/**
     * @param seed a private seed
     * @return pseudo random number (0 ~ 1)
     */
    public static float pseudoRandom(long seed) {
        int hash1 = Block.currentBlockHeader().getPackingAddress().toString().substring(2).hashCode();
        int hash2 = Msg.address().toString().substring(2).hashCode();
        int hash3 = Msg.sender() != null ? Msg.sender().toString().substring(2).hashCode() : 0;
        int hash4 = Long.valueOf(Block.timestamp()).toString().hashCode();

        long hash = seed ^ hash1 ^ hash2 ^ hash3 ^ hash4;

        seed = (hash * 0x5DEECE66DL + 0xBL) & ((1L << 48) - 1);
        return ((int) (seed >>> 24) / (float) (1 << 24));
    }

    /**
     * @return pseudo random number (0 ~ 1)
     */
    public static float pseudoRandom() {
        return pseudoRandom(0x5DEECE66DL);
    }

    /**
     *
     * Please note that this is the SHA-3 FIPS 202 standard, not Keccak-256.
     *
     * @param src source string (hex encoding string)
     * @return sha3-256 hash (hex encoding string)
     */
    public static native String sha3(String hexString);

    /**
     *
     * Please note that this is the SHA-3 FIPS 202 standard, not Keccak-256.
     *
     * @param bytes source byte array
     * @return sha3-256 hash (hex encoding string)
     */
    public static native String sha3(byte[] bytes);
    
    /**
     * [Testnet]verify signature data(ECDSA)
     *
     * @param data(hex encoding string)
     * @param signature(hex encoding string)
     * @param pubkey(hex encoding string)
     * @return verify result
     */
    public static native boolean verifySignatureData(String data, String signature, String pubkey);

    /**
     * [Testnet]根据截止高度和原始种子数量，用特定的算法生成一个随机种子
     *
     * @param endHeight 截止高度
     * @param seedCount 原始种子数量
     * @param algorithm hash算法标识
     * @return 原始种子字节数组合并后, 使用hash算法得到32位hash字节数组, 再转化为BigInteger(new BigInteger(byte[] bytes))
     */
    public static native BigInteger getRandomSeed(long endHeight, int seedCount, String algorithm);

    /**
     * [Testnet]根据截止高度和原始种子数量，用`SHA3-256`hash算法生成一个随机种子
     *
     * @param endHeight 截止高度
     * @param seedCount 原始种子数量
     * @return 原始种子字节数组合并后, 使用`SHA3-256`hash算法得到32位hash字节数组, 再转化为BigInteger(new BigInteger(byte[] bytes))
     */
    public static BigInteger getRandomSeed(long endHeight, int seedCount) {
        return getRandomSeed(endHeight, seedCount, "SHA3");
    }

    /**
     * [Testnet]根据高度范围，用特定的算法生成一个随机种子
     *
     * @param startHeight 起始高度
     * @param endHeight   截止高度
     * @param algorithm   hash算法标识
     * @return 原始种子字节数组合并后, 使用hash算法得到32位hash字节数组, 再转化为BigInteger(new BigInteger(byte[] bytes))
     */
    public static native BigInteger getRandomSeed(long startHeight, long endHeight, String algorithm);

    /**
     * [Testnet]根据高度范围，用`SHA3-256`hash算法生成一个随机种子
     *
     * @param startHeight 起始高度
     * @param endHeight   截止高度
     * @return 原始种子字节数组合并后, 使用`SHA3-256`hash算法得到32位hash字节数组, 再转化为BigInteger(new BigInteger(byte[] bytes))
     */
    public static BigInteger getRandomSeed(long startHeight, long endHeight){
        return getRandomSeed(startHeight, endHeight, "SHA3");
    }

    /**
     * [Testnet]根据截止高度和原始种子数量，获取原始种子的集合
     *
     * @param endHeight 截止高度
     * @param seedCount 原始种子数量
     * @return 返回原始种子的集合，元素是字节数组转化的BigInteger(new BigInteger(byte[] bytes))
     */
    public static native List<BigInteger> getRandomSeedList(long endHeight, int seedCount);

    /**
     * [Testnet]根据高度范围，获取原始种子的集合
     *
     * @param startHeight 起始高度
     * @param endHeight   截止高度
     * @return 返回原始种子的集合，元素是字节数组转化的BigInteger(new BigInteger(byte[] bytes))
     */
    public static native List<BigInteger> getRandomSeedList(long startHeight, long endHeight);
    
    /**
     * 调用链上其他模块的命令
     *
     * @see <a href="https://docs.nuls.io/zh/NULS2.0/vm-sdk.html">调用命令详细说明</a>
     * @param cmdName 命令名称
     * @param args 命令参数
     * @return 命令返回值(根据注册命令的返回类型可返回字符串,字符串数组,字符串二维数组)
     */
    public static native Object invokeExternalCmd(String cmdName, String[] args);
    
    /**
     * 把对象转换成json字符串
     * 注意：对象内如果包含复杂对象，序列化深度不得超过3级
     *
     * @param obj
     * @return json字符串
     */
    public static native String obj2Json(Object obj);
}
```

### io.nuls.contract.sdk.annotation.Payable

`@Payable` 标记`@Payable`的方法，才能在调用时候转入NULS金额

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Payable {
}
```

### io.nuls.contract.sdk.annotation.PayableMultyAsset

`@PayableMultyAsset` 标记`@PayableMultyAsset`的方法，才能在调用时候转入其他资产，支持同时转入多个其他资产

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface PayableMultyAsset {
}
```

### io.nuls.contract.sdk.annotation.Required

`@Required` 标记`@Required`的参数，调用时候必须传入值, _**未标记此注解的参数，若不想传递参数，需要填入0或者null占位**_

```java
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Required {
}
```

### io.nuls.contract.sdk.annotation.View

`@View` 标记`@View`的方法，调用后合约状态不会改变，可以通过这种方法查询合约状态

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface View {
}
```

### io.nuls.contract.sdk.annotation.JSONSerializable

`@JSONSerializable ` 标记@JSONSerializable的方法，返回值会被VM自动JSON序列化，以JSON字符串的形式返回。

<b style="color:red">注意：对象层级不得超过3层，超过3层的部分会调用对象的toString方法，不会再继续序列化。</b>

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface JSONSerializable {
}
```

## 6. 智能合约主要的API

在NULS2.0模块`NULS-API`中，我们提供了大部分常用的API，请参考该文档中智能合约部分。

[NULS-API_JSONRPC](./i_nuls-api_JSONRPC.html)

[NULS-API_RESTFUL](./i_nuls-api_RESTFUL.html)

## 7. 智能合约方法参数传递的一些说明

智能合约的方法中如果有`数组类型`的参数，请使用如下方式传递参数
> 参考[投票合约](https://github.com/nuls-io/nuls-contracts/blob/master/vote/io/nuls/vote/contract/VoteContract.java#L26)代码中的`create`方法

```json
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





