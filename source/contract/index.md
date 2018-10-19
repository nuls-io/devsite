# NULS Smart Contract Development Manual

## 1. Introduction

NULS smart contract is developed with Java, and it operates in NULS virtual machine. Not all Java features are applicable to contract development and the relevant restrictions are specified in section 3.

## 2. Development environment

### 2.1 Setup of NULS wallet

### 2.2 Setup of JDK 8

### 2.3 Setup of IntelliJ IDEA

NULS smart contract adopts IntelliJ IDEA as development tool

### 2.4 Setup of NULS smart contract plug-ins

[Click to download the plugin](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/plugins/Docs%26plugin_20181019.zip)

NULS smart contract plug-ins provide the following main functions:

* Newly create NULS contract project
* Provide the unavailable Java properties, classes ad methods
* Compile, package and deploy contracts
* Display and call contract methods

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
* java.math.BigDecimal
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
* The maximum gas consumption for executing a contract method is 10 million. Make sure to optimize the contract code as much as possible.

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

In one contract project, it requires to introduce a jar package “contract-sdk.jar” which provides the class to get block and transaction details
The project has several classes and interfaces

When compiling, packaging and deploying the prepared contract onto the NULS chain, the virtual machine will implement the construction method of this contract to initialize it, and save the contract status onto the chain. The contract status is the member variables of contract class

After the contract is deployed, all public methods of contract class can be called so as to read or modify the contract status


Explanatory comments

@View labels the method of @View. After it is called, the contract status will remain and it can be researched by such means

@Payable labels the method of @Payable. Only when it is called, the amount can be transferred in

@Required labels the parameter of @Required. When it is called, there must be transfer-in value

Go to download NULS source code on github, and get some contract examples

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
     * Get the balance of the address (only the balance of contract address)
     *
     * @return
     */
    public native BigInteger balance();

    /**
     * Transfer amount to the address from contract 
     *
     * @param value transfer amount (in Na)
     */
    public native void transfer(BigInteger value);

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
     * Verify the address 
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
     * Directly transfer to the contract, this method will be called, no action is done by default. If the contract address is to accept direct transfer, you can override this method and mark the `@Payable` annotation.
     */
    default void _payable() {
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
     * The number of Nuls transferred by the contract sender to the contract address, the unit is Na, 1Nuls = 1 billion Na
     *
     * @return
     */
    public static native BigInteger value();

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
     * Returns a power of two size for the given target capacity.
     *
     * @param cap capacity
     */
    private static int powerSizeFor(int cap) {
        int n = cap - 1;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
    }

    /**
     * @param seed a private seed
     * @return pseudo random number (0 ~ 1073741823)
     */
    public static int pseudoRandom(int seed) {
        return pseudoRandom(seed, null, null);
    }

    /**
     * @param seed  a private seed
     * @return pseudo random number (0 ~ 1073741823)
     */
    public static int pseudoRandom(String seed) {
        return pseudoRandom(null, seed, null);
    }

    /**
     * @param seed a private seed
     * @param initialCapacity initial capacity, it will be assigned a power of two size for the given target capacity.
     * @return pseudo random number (0 ~ (powerSizeFor(initialCapacity) - 1))
     */
    public static int pseudoRandom(int seed, Integer initialCapacity) {
        return pseudoRandom(seed, null, initialCapacity);
    }

    /**
     * @param seed a private seed
     * @param initialCapacity initial capacity, it will be assigned a power of two size for the given target capacity.
     * @return pseudo random number (0 ~ (powerSizeFor(initialCapacity) - 1))
     */
    public static int pseudoRandom(String seed, Integer initialCapacity) {
        return pseudoRandom(null, seed, initialCapacity);
    }

    /**
     * @param seed a private seed
     * @param strSeed a private seed
     * @param initialCapacity initial capacity, it will be assigned a power of two size for the given target capacity.
     * @return pseudo random number (0 ~ (powerSizeFor(initialCapacity) - 1))
     */
    private static int pseudoRandom(Integer seed, String strSeed, Integer initialCapacity) {
        BlockHeader blockHeader = Block.newestBlockHeader();
        if(initialCapacity != null) {
            initialCapacity = powerSizeFor(initialCapacity);
        } else {
            initialCapacity = MAXIMUM_CAPACITY;
        }
        long time = blockHeader.getTime();
        long txCount = blockHeader.getTxCount();
        String contractAddress = Msg.address().toString();
        int result = contractAddress != null ? contractAddress.hashCode() : 0;
        result = strSeed != null ? strSeed.hashCode() : 0;
        if(seed != null) {
            result = 31 * result + (int) (seed ^ (seed >>> 32));
        }
        result = 31 * result + (int) (time ^ (time >>> 32));
        result = 31 * result + (int) (txCount ^ (txCount >>> 32));
        result = result ^ (result >>> 16);
        result = (initialCapacity - 1) & result;
        return result;
    }
    
}
```

### io.nuls.contract.sdk.annotation.Payable

`@Payable labels the method of @Payable. Only when it is called, the amount can be transferred in`

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Payable {
}
```

### io.nuls.contract.sdk.annotation.Required

`@Required labels the parameter of @Required. When it is called, there must be transfer-in value.`

```java
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Required {
}
```

### io.nuls.contract.sdk.annotation.View

`@Viewlabels the method of @View. After it is called, the contract status will remain and it can be researched by such means`

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface View {
}
```

## 6. Main RPC interface of smart contract

See parameter structure and simple examples hereafter. See details of other interfaces at [Swagger UI] (http://127.0.0.1:8001/docs#/)
> The default port of test network’s “Swagger UI” is 8001, and that of official network is 6001

### 6.1 Create smart contract

- POST `/api/contract/create` 

|Parameter|Type|Description|
|:-:|:-:|:-:|
|sender* |string |transaction creator |
|password* |string|  password of transaction creator|
|gasLimit*| long|  max. gas consumption|
|price* | long| unit price of implementation contract|
|contractCode* |string| smart contract code (byte code’s Hex coded string)|
|remark |string |remark|
|args |string[][]|Parameter list|

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



### 6.2 Estimate the gas consumption for creating smart contract

- POST `/api/contract/imputedgas/create` 

|Parameter|Type|Description|
|:-:|:-:|:-:|
|sender* |string |transaction creator |
|password* |string|  password of transaction creator|
|price* | long| unit price of implementation contract|
|contractCode* |string| smart contract code (byte code’s Hex coded string)|
|args |string[][]|Parameter list|

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



### 6.3 Call smart contract

- POST `/api/contract/call` 

|Parameter|Type|Description|
|:-:|:-:|:-:|
|sender* |string |transaction creator |
|password* |string| password of transaction creator|
|contractAddress* |string| address of smart contract|
|gasLimit* | long| max. gas consumption|
|price* | long|unit price of implementation contract|
|value |long| amount transferred by transaction creator to contract address (Na - 100000000Na=1NULS)|
|methodName* |string| method name|
|methodDesc |string|method signature which may be not transferred if the method name is not repeated|
|remark |string| remark |
|args |string[][]|Parameter list|


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


### 6.4 Estimate the gas consumption for calling smart contract (see `Swagger UI`)

- POST `/api/contract/imputedgas/call` 



### 6.5 Estimate the price for calling smart contract (see `Swagger UI`)
- POST `/api/contract/imputedprice`



### 6.6 Terminate smart contract (see `Swagger UI`)

- POST `/api/contract/delete` 



### 6.7 Call the smart contract function which is not linked to blockchain (see `Swagger UI`)

- POST `/api/contract/view` 



### 6.8 Get the implementation results of smart contract (see `Swagger UI`)

- GET `/api/contract/result/{hash}` 



### 6.9 Get the basic information of smart contract (see `Swagger UI`)

- GET `/api/contract/info/{address}` 



### 6.10 Verify if it is contract address (see `Swagger UI`)

- GET `/api/contract/{address}` 



### 6.11 Get the NULS balance of smart contract address (see `Swagger UI`)

- GET `/api/contract/balance/{address}` 



### 6.12 Get the transaction details of smart contract (see `Swagger UI`)

- GET `/api/contract/tx/{hash}` 



### 6.13 Get the transaction list of smart contract (see `Swagger UI`)

- GET `/api/contract/tx/list/{address}` 


### 6.14 Inquire contract UTXO as per address and limit (see `Swagger UI`)

- GET `/api/contract/limit/{address}/{limit}` 



### 6.15 Inquire contract UTXO as per address and amount (see `Swagger UI`)

- GET `/api/contract/amount/{address}/{amount}` 


### 6.16 Transfer amount to smart contract (see `Swagger UI`)

- POST `/api/contract/transfer` 



## 7. Example

### 7.1 Voting smart contract code `segments` are as follows

> Full code: `https://github.com/nuls-io/nuls-vote`

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

If the methods of smart contract include the parameter of  `array type`, please use the following method to transfer parameters
> Refer to the `create` method in the aforesaid voting contract code

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


### 7.2 Standard Token Smart contract code `segments`

> Full code: `https://github.com/nuls-io/nuls-nrc20`

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





