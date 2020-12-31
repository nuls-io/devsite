# Development Manual

## 1. Introduction

NULS smart contract is developed with Java, and it operates in NULS virtual machine. Not all Java features are applicable to contract development and the relevant restrictions are specified in section 3.

## 2. Development environment

### 2.1 Setup of JDK 8

### 2.2 Setup of IntelliJ IDEA

NULS smart contract adopts IntelliJ IDEA as development tool

### 2.3 NULS Smart Contract Development Tool

The main features provided by the NULS Smart Contract Development Tool:

* Create a new NULS smart contract Maven project
* Provide visual pages to compile, package, deploy contracts, call contracts, query contract related data

> [Documentation for building a NULS smart contract Development Tool](./s_tools.html)

## 3. NULS smart contract specifications and syntax

NULS smart contract syntax is a subset of Java syntax, with some restrictions

### 3.1 NULS smart contract specifications

> **_Main classes of contracts must implement contract interfaces. A smart contract can have a class implementing contract interface only; and other classes and interfaces provide functions for such contract._**

### 3.2 Keywords

Java key words are listed as follows and those not applicable for NULS smart contract will be marked

Access control

* public
* protected
* private

Key words and instantiated object of definition class, interface, abstract class, implementation interface and derivative class

* class
* interface
* abstract
* implements
* extends
* new

Key words of package

* import
* package

Key words of data type

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

Conditional loops (process control)

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

Error processing

* catch
* try
* finally
* throw
* throws

Modification method, class, property and variables

* static
* final
* super
* this
* native（not supported）
* strictfp（not supported）
* synchronized（not supported）
* transient（not supported）
* volatile（not supported）

other

* enum（not supported）
* assert（not supported）

### 3.3 Basic syntax

The following syntax is the same with Java and simply listed here under, with specific details referred to the relevant documents of Java

* Identifiers are consisted of character, underline, dollar sign or figure, beginning with character, underline or dollar sign
* Basic data type: byte short int long float double char boolean
* Reference data type: class, interface, array
* Arithmetic operators: + - * /%++ -
* Relational operator: > <> = <= ==! =
* Logical Operators: ! &| ^ && ||
* Bit operator: &| ^~>> << >>>
* Assignment operator: =
* Extension assignment operators: + = - = * = / =
* String link operator: +
* Conditional operators: ? :
* Process control sentence (if, switch, for, while, do...while)


### 3.4 Available class

NULS smart contract can be developed with the following class

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

### 3.5 Other restrictions

* Contract class can have one construction method. No restriction for other classes
* The maximum gas consumption for executing a contract method once is 10 million,  Make sure to optimize the contract code as much as possible.
* The maximum gas consumption for executing the method of the `@View` type once is 100 million,  Make sure to optimize the contract code as much as possible.

## 4. Nuls smart contract example

a simple contract

> **_Main classes of contract must implement contract interface, and other classes and interfaces provide functions for this contract_**


```java

package contracts.examples;

import io.nuls.contract.sdk.Contract;
import io.nuls.contract.sdk.annotation.Payable;
import io.nuls.contract.sdk.annotation.Required;
import io.nuls.contract.sdk.annotation.View;

public class SimpleStorage implements Contract {

    private String storedData;

    /**
     * Only when `@View` is added, the contract status will remain and it can be researched by such means
     */
    @View
    public String getStoredData() {
        return storedData;
    }

    /**
     * Only when `@Payable` is added, the amount can be transferred in
     */
    @Payable
    public void setStoredData(@Required String storedData) {
        this.storedData = storedData;
    }
    
    /**
     * The return value is automatically serialized by the VM in JSON format and returned as a JSON string.
     * Note: The object level must not exceed 3 layers. The more than 3 layers will call the object's toString method, and will not continue serialization.
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

In one contract project, it requires to introduce a jar package “contract-sdk.jar” which provides the class to get block and transaction details
The project has several classes and interfaces

When compiling, packaging and deploying the prepared contract onto the NULS chain, the virtual machine will implement the construction method of this contract to initialize it, and save the contract status onto the chain. The contract status is the member variables of contract class

After the contract is deployed, _**all public methods of contract class can be called**_ so as to read or modify the contract status


Explanatory comments

@JSONSerializable labels the method of @JSONSerializable, The return value is automatically serialized by the VM in JSON format and returned as a JSON string.

<b style="color:red">Note: The object level must not exceed 3 layers. The more than 3 layers will call the object's toString method, and will not continue serialization.</b>

@View labels the method of @View. After it is added, the contract status will remain and it can be researched by such means

@Payable labels the method of @Payable. Only when it is added, the amount can be transferred in

@PayableMultyAsset 标记@PayableMultyAsset的方法，才能在调用时候传入其他资产金额，支持同时转入多个其他资产

@Required labels the parameter of @Required. When it is added, there must be transfer-in value, _**If you do not want to pass parameters that are not marked with this annotation, you need to fill in 0 or null placeholder.**_

### Some contract examples on github

[NULS Contract Sample Collection](https://github.com/nuls-io/nuls-contracts)

[NULS Contract Sample - NRC20](https://github.com/CCC-NULS/NRC20-Token)

[NULS Contract Sample - NRC721](https://github.com/MIMIEYES/NULS-NRC721-baselib)

[NULS Contract Sample - POCM](https://github.com/CCC-NULS/pocm-contract)

## 5. NULS Contract SDK

Contract SDK provides several classes to be convenient for contract development:

### io.nuls.contract.sdk.Address

```java
public class Address {

    private final String address;

    public Address(String address) {
        valid(address);
        this.address = address;
    }
    
    /**
     * Get the available balance of the address
     *
     * @return BigInteger
     */
    public native BigInteger balance();

    /**
     * Get the total balance of the address
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
     * Contract method to call the address
     *
     * @param Method name
     * @param Method signature
     * @param Parameters       
     * @param value  Incidental currency (in Na)
     */
    public native void call(String methodName, String methodDesc, String[][] args, BigInteger value);

	/**
     * Call the contract method of this address with a return value(String)
     *
     * @param Method name
     * @param Method signature
     * @param Parameters       
     * @param value  Incidental currency (in Na)
     * @return return value after calling the contract
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
     * Verify the address 
     *
     * @param address
     * @see io.nuls.kernel.utils.AddressTool#validAddress(String)
     */
    private native void valid(String address);

    /**
     * Verify that the address is a contract address
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
     * Given block’s head
     *
     * @param blockNumber
     * @return
     */
    public static native BlockHeader getBlockHeader(long blockNumber);

    /**
     * Current block’s head
     *
     * @return
     */
    public static native BlockHeader currentBlockHeader();
    
    /**
     * Newest block’s head
     *
     * @return 
     */
    public static native BlockHeader newestBlockHeader();

    /**
     * Given block’s hash
     *
     * @param blockNumber
     * @return
     */
    public static String blockhash(long blockNumber) {
        return getBlockHeader(blockNumber).getHash();
    }

    /**
     * 
     * CCurrent block’s miner address
     *
     * @return
     */
    public static Address coinbase() {
        return currentBlockHeader().getPackingAddress();
    }

    /**
     * 
     * Current block’s No.
     *
     * @return
     */
    public static long number() {
        return currentBlockHeader().getHeight();
    }

    /**
     * 
     * Current block’s time stamp
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
 *  Contract interface, implemented by contract class
 */
public interface Contract {
    
    /**
     * Directly transfer to the contract, this method will be called, no action is done by default. 
     * Prerequisite: you need override this method and mark the `@Payable` annotation.
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
     * 1. This method is triggered when the consensus node reward address is the contract address, and the parameter is the block reward address detail two-dimensional array data. eg. [[address, amount], [address, amount], ...]
     * 2. This method is triggered when the deposit address is a contract address. The parameters are the contract address and the reward amount two-dimensional array data. eg. [[address, amount]]
     * Prerequisite: you need override this method and mark the `@Payable` annotation.
     */
    default void _payable(String[][] args) {
    }

}
```

### io.nuls.contract.sdk.Event

```java
/**
* Event interface, implemented by event class
*/
public interface Event {
}
```

### io.nuls.contract.sdk.Msg

```java
public class Msg {

    /**
     * Remaining gas
     *
     * @return
     */
    public static native long gasleft();

    /**
     * sender of the contract
     *
     * @return
     */
    public static native Address sender();
    
    /**
     * sender public key of the contract
     *
     * @return sender public key of the contract
     */
    public static native String senderPublicKey();

    /**
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
     * Gas price
     *
     * @return
     */
    public static native long gasprice();

    /**
     * Contract address
     *
     * @return
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
     *  Check conditions; if conditions are not met, it will roll back.
     *
     * @param expression
     */
    public static void require(boolean expression) {
        if (!expression) {
            revert();
        }
    }

    /**
     * Check conditions; if conditions are not met, it will roll back
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
     * Terminate implementation and restore status
     */
    public static void revert() {
        revert(null);
    }

    /**
     * Terminate implementation and restore status
     *
     * @param errorMessage
     */
    public static native void revert(String errorMessage);

    /**
     * Send events
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
     * [Testnet]Generate a random seed with a specific algorithm based on the cutoff block height and the number of original seeds
     *
     * @param endHeight the cutoff block height
     * @param seedCount the number of original seeds
     * @param algorithm Hash algorithm identifier
     * @return After the original seed byte array is merged, the hash algorithm is used to get a 32-bit hash byte array, which is then converted into BigInteger(new BigInteger(byte[] bytes)).
     */
    public static native BigInteger getRandomSeed(long endHeight, int seedCount, String algorithm);

    /**
     * [Testnet]Generate a random seed using the `SHA3-256`hash algorithm based on the cutoff block height and the number of original seeds.
     *
     * @param endHeight the cutoff block height
     * @param seedCount the number of original seeds
     * @return After the original seed byte array is merged, the `SHA3-256` hash algorithm is used to get the 32-bit hash byte array, which is then converted into BigInteger(new BigInteger(byte[] bytes)).
     */
    public static BigInteger getRandomSeed(long endHeight, int seedCount) {
        return getRandomSeed(endHeight, seedCount, "SHA3");
    }

    /**
     * [Testnet]Generate a random seed with a specific algorithm based on the block height range
     *
     * @param startHeight the starting block height
     * @param endHeight   the cutoff block height
     * @param algorithm   Hash algorithm identifier
     * @return After the original seed byte array is merged, the hash algorithm is used to get a 32-bit hash byte array, which is then converted into BigInteger(new BigInteger(byte[] bytes)).
     */
    public static native BigInteger getRandomSeed(long startHeight, long endHeight, String algorithm);

    /**
     * [Testnet]Generate a random seed with the `SHA3-256` hash algorithm based on the block height range
     *
     * @param startHeight the starting block height
     * @param endHeight   the cutoff block height
     * @return After the original seed byte array is merged, the `SHA3-256` hash algorithm is used to get the 32-bit hash byte array, which is then converted into BigInteger(new BigInteger(byte[] bytes)).
     */
    public static BigInteger getRandomSeed(long startHeight, long endHeight){
        return getRandomSeed(startHeight, endHeight, "SHA3");
    }

    /**
     * [Testnet]Get a collection of raw seeds based on the cutoff block height and the number of original seeds
     *
     * @param endHeight the cutoff block height
     * @param seedCount the number of original seeds
     * @return returns a collection of original seeds, the element is a BigInteger (new BigInteger(byte[] bytes)))
     */
    public static native List<BigInteger> getRandomSeedList(long endHeight, int seedCount);

    /**
     * [Testnet]Get a collection of raw seeds based on the block height range
     *
     * @param startHeight the starting block height
     * @param endHeight   the cutoff block height
     * @return returns a collection of original seeds, the element is a BigInteger (new BigInteger(byte[] bytes)))
     */
    public static native List<BigInteger> getRandomSeedList(long startHeight, long endHeight);
    
    /**
     * command to call other modules on the chain
     *
     * @see <a href="https://docs.nuls.io/zh/NULS2.0/vm-sdk.html">Detailed documentation for calling the command</a>
     * @param cmdName 
     * @param args 
     * @return depending on the return type of the registration command, it can return a string, an array of strings, a two-dimensional array of strings
     */
    public static native Object invokeExternalCmd(String cmdName, String[] args);
    
    /**
     * Convert an object to a json string
     * Note: If the object contains complex objects, the serialization depth must not exceed level 3
     *
     * @param obj
     * @return Json string
     */
    public static native String obj2Json(Object obj);
}
```

### io.nuls.contract.sdk.annotation.Payable

`@Payable` labels the method of `@Payable`. Only when it is added, the amount can be transferred in

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

`@Required` labels the parameter of `@Required`. When it is added, there must be transfer-in value, _**If you do not want to pass parameters that are not marked with this annotation, you need to fill in 0 or null placeholder.**_

```java
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Required {
}
```

### io.nuls.contract.sdk.annotation.View

`@View` labels the method of `@View`. After it is added, the contract status will remain and it can be researched by such means

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface View {
}
```

### io.nuls.contract.sdk.annotation.JSONSerializable

`@JSONSerializable` labels the method of @JSONSerializable, the return value is automatically serialized by the VM in JSON format and returned as a JSON string.

<b style="color:red">Note: The object level must not exceed 3 layers. The more than 3 layers will call the object's toString method, and will not continue serialization.</b>

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface JSONSerializable {
}
```

## 6. Main RPC interface of smart contract

In the NULS 2.0 module `NULS-API`, we provide most of the commonly used APIs. Please refer to the Smart Contracts section of this document.

[NULS-API_JSONRPC](./i_nuls-api_JSONRPC.html)

[NULS-API_RESTFUL](./i_nuls-api_RESTFUL.html)


## 7. Some instructions for the delivery of smart contract method parameters


If the methods of smart contract include the parameter of  `array type`, please use the following method to transfer parameters
> Refer to the [vote contract](https://github.com/nuls-io/nuls-contracts/blob/master/vote/io/nuls/vote/contract/VoteContract.java#L26) code for the `create` method

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
     "Test voting 1",
     "Voting contract 1",
     [
       "Option 1",
       "Option 2",
       "Option 3"
     ],
     1536044066056, 1536184066056, false, 300, false
   ]
}
```





