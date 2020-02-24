# NRC-20


## 简述

token的接口标准


## 摘要

以下标准允许在智能合约中实施标记的标记API。 该标准提供了转移token的基本功能，并允许token被批准，以便他们可以由另一个在线第三方使用。

## 动机

标准接口可以让Nuls上的任何令牌被其他应用程序重新使用：从钱包到分散式交换。

## 规则

## Token
### 方法

**注意**: 调用者必须处理返回`false`的`return boolean`.调用者绝对不能假设返回`false`的情况不存在。


#### name

返回令牌的名称 - 例如 `"MyToken"`.

```java
@View
public String name();
```


#### symbol

返回令牌的符号 - 例如 "MT".

```java
@View
public String symbol();
```

#### decimals

返回令牌使用的小数位数 

用于将程序返回的token数字除以`10`的`decimals`次幂(10 ^ decimals)，以获得其真实数量

- 例如`decimals = 2`, 通过`balanceOf`方法获取一个用户的token余额，`balance = 1230`, 那么此用户的真实token数量为`balance / (10 ^ 2) = balance / 100 = 12.3`。

```java
@View
public int decimals();
```


#### totalSupply

返回总令牌供应量。

```java
@View
public BigInteger totalSupply();
```



#### balanceOf

返回地址为“owner”的帐户余额。

```java
@View
public BigInteger balanceOf(@Required Address owner);
```



#### transfer

转移`value`的token数量到的地址`to`，并且必须触发`TransferEvent`事件。 如果`from`帐户余额没有足够的令牌来支出，该函数应该被revert。

创建新令牌的令牌合同应该在创建令牌时将`from`地址设置为`null`触发`TransferEvent`事件。

注意 0值的传输必须被视为正常传输并触发`TransferEvent`事件。

```java
public boolean transfer(@Required Address to, @Required BigInteger value);
```



#### transferFrom

从地址`from`发送数量为`value`的token到地址`to`,必须触发`TransferEvent`事件。

`transferFrom`方法用于代理转账，允许token拥有者授权其他用户代理自己的token。`from`帐户必须调用`approve(@Required Address spender, @Required BigInteger value)`)授权给代理账户。

注意 0值的传输必须被视为正常传输并触发传输事件。

```java
public boolean transferFrom(@Required Address from, @Required Address to, @Required BigInteger value);
```



#### approve

`transferFrom`的授权机制，允许`spender`多次支配您的帐户，最高达`value`金额。 如果再次调用此函数，它将以`value`覆盖当前的余量。

```java
public boolean approve(@Required Address spender, @Required BigInteger value);
```


#### allowance

返回`spender`被允许从`owner`提取的金额。
Returns the amount which `spender` is still allowed to withdraw from `owner`.

```java
@View
public BigInteger allowance(@Required Address owner, @Required Address spender);
```



### Events


#### TransferEvent

当token被转移(包括0值)，必须被触发。

创建新令牌的令牌合同应该在创建令牌时将`from`地址设置为`null`触发`TransferEvent`事件。

```java
public TransferEvent(Address from, @Required Address to, @Required BigInteger value)
```



#### ApprovalEvent

当任何成功调用`approve(@Required Address spender, @Required BigInteger value)`后，必须被触发。

```java
public ApprovalEvent(@Required Address owner, @Required Address spender, @Required BigInteger value)
```



## Implementation

#### Example implementations are available at

[NRC20-Token](https://github.com/CCC-NULS/NRC20-Token)
