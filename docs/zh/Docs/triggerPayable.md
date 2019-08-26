# 触发payable方法的场景

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
    <version>2.0-beta1</version>
</dependency>
```

## 一、官方钱包转账功能，账户地址向合约地址转账时触发

触发`payable()`无参方法

**系统底层实现原理:**

组装成调用合约交易，默认调用合约的`_payable()`方法

## 二、共识节点奖励地址是合约地址，当前节点出块时触发

触发`_payable(String[][] args)`有参方法，参数是当前区块 _**所有**_ 奖励地址明细 eg. [[address, amount], [address, amount], ...]

**系统底层实现原理:**

共识模块判断CoinBase交易中的奖励地址有合约地址时，调用此合约的`_payable(String[][] args)`方法，并把相应的收益金额转向此合约地址

## 三、委托地址是合约地址，出块奖励中有当前合约地址时触发

触发`_payable(String[][] args)`有参方法，参数 _**是且只是**_ 当前合约地址和奖励金额(只有这一个元素) eg. [[address, amount]]

**系统底层实现原理:**

共识模块判断CoinBase交易中的奖励地址有合约地址时，调用此合约的`_payable(String[][] args)`方法，并把相应的收益金额转向此合约地址

## 四、用户直接调用合约的`_payable()`方法时触发

## 注意: `_payable(String[][] args)`方法是系统调用方法，用户无法调用
