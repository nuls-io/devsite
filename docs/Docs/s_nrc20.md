# NRC-20


## Simple Summary

A standard interface for tokens.


## Abstract

The following standard allows for the implementation of a standard API for tokens within smart contracts.
This standard provides basic functionality to transfer tokens, as well as allow tokens to be approved so they can be spent by another on-chain third party.


## Motivation

A standard interface allows any tokens on Nuls to be re-used by other applications: from wallets to decentralized exchanges.


## Specification

## Token
### Methods

**NOTE**: Callers MUST handle `false` from `return boolean`.  Callers MUST NOT assume that `false` is never returned!


#### name

Returns the name of the token - e.g. `"MyToken"`.

``` java
@View
public String name();
```


#### symbol

Returns the symbol of the token. E.g. "MT".

``` java
@View
public String symbol();
```

#### decimals

Returns the number of decimals the token uses - e.g. `8`, means to divide the token amount by `100000000` to get its user representation.

``` java
@View
public int decimals();
```


#### totalSupply

Returns the total token supply.

``` js
@View
public BigInteger totalSupply();
```



#### balanceOf

Returns the account balance of another account with address `owner`.

``` java
@View
public BigInteger balanceOf(@Required Address owner);
```



#### transfer

Transfers `value` amount of tokens to address `to`, and MUST fire the `TransferEvent` event.
The function SHOULD `revert` if the `from` account balance does not have enough tokens to spend.

A token contract which creates new tokens SHOULD trigger a Transfer event with the `from` address set to `null` when tokens are created.

*Note* Transfers of 0 values MUST be treated as normal transfers and fire the `TransferEvent` event.

``` java
public boolean transfer(@Required Address to, @Required BigInteger value);
```



#### transferFrom

Transfers `value` amount of tokens from address `from` to address `to`, and MUST fire the `TransferEvent` event.

The `transferFrom` method is used for a withdraw workflow, allowing contracts to transfer tokens on your behalf.
This can be used for example to allow a contract to transfer tokens on your behalf and/or to charge fees in sub-currencies.
The function SHOULD `revert` unless the `from` account has deliberately authorized the sender of the message via some mechanism, such as calling `approve(@Required Address spender, @Required BigInteger value)`.

*Note* Transfers of 0 values MUST be treated as normal transfers and fire the `TransferEvent` event.

``` java
public boolean transferFrom(@Required Address from, @Required Address to, @Required BigInteger value);
```



#### approve

Allows `spender` to withdraw from your account multiple times, up to the `value` amount. If this function is called again it overwrites the current allowance with `value`.

``` java
public boolean approve(@Required Address spender, @Required BigInteger value);
```


#### allowance

Returns the amount which `spender` is still allowed to withdraw from `owner`.

``` java
@View
public BigInteger allowance(@Required Address owner, @Required Address spender);
```



### Events


#### TransferEvent

MUST trigger when tokens are transferred, including zero value transfers.

A token contract which creates new tokens SHOULD trigger a Transfer event with the `from` address set to `null` when tokens are created.

``` java
public TransferEvent(Address from, @Required Address to, @Required BigInteger value)
```



#### ApprovalEvent

MUST trigger on any successful call to `approve(@Required Address spender, @Required BigInteger value)`.

``` java
public ApprovalEvent(@Required Address owner, @Required Address spender, @Required BigInteger value)
```



## Implementation

#### Example implementations are available at

[NRC20-Token](https://github.com/CCC-NULS/NRC20-Token)
