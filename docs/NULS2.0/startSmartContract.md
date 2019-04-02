# Quick Start

## 1. Running the test-net environment, creating an account, and claiming test tokens.

[Preparations for deployment and invocation of smart contracts](/NULS1.0/connectTestnet.html)


## 2. Installing JDK8, IntelliJ IDEA and NULS smart-contract plug-ins

Preparations for the development of smart contract code

[Downloading JDK8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) (Installation omitted)

[Downloading IntelliJ IDEA](https://www.jetbrains.com/idea/download/) (Installation omitted)

[Downloading NULS smart contract plug-ins] 
(https://nuls-usa-west.oss-us-west-1.aliyuncs.com/plugins/Docs%26plugin.zip)

[Installing the NULS smart contract plug-ins](/NULS1.0/ideaPlugin.html)

## 3. Smart contract example

**_Quickly compile and deploy a smart contract with the example _**

* Simple example

```java

Import io.nuls.contract.sdk.Contract;
Import io.nuls.contract.sdk.Msg;
Import io.nuls.contract.sdk.annotation.Payable;
Import io.nuls.contract.sdk.annotation.Required;
Import io.nuls.contract.sdk.annotation.View;

Import java.math.BigDecimal;
Import java.math.BigInteger;

Public class SimpleContract implements Contract {

    Private String sayContent;

    @Override
    @Payable
    Public void _payable() {
        // override this method and mark the @Payable annotation. The smart contract can receive direct transfer of the NULS wallet assets
        // you can do something else
        // ...
    }

    Public String sayContent(@Required String content) {
        this.sayContent = content;
        Return "you want say " + content;
    }

    @Payable
    Public String transferToContract() {
        // mark the @Payable annotation. Smart contract can receive NULS when invoking this method
        BigInteger value = Msg.value();
        BigDecimal nuls = new BigDecimal(value).movePointLeft(8);
        // you can do something else
        // ...

        Return "I received your transfer amount: " + nuls.toPlainString();
    }

    @View
    Public String sayWhat() {
        If(sayContent != null) {
            Return "you want say " + sayContent;
        }
        Return "you want say nothing.";
    }
}

```

## 4. Smart contract repository

[Smart contract repository collected by NULS officials] (https://github.com/nuls-io/contracts)

[Community member Angelillou's smart contract - Partnership income distribution smart contract] (https://github.com/amalcaraz/nuls-partnership-smartcontract)

[Community member Angelillou's smart contract - Lottery factory smart contract for Nuls blockchain)

[Community member Naveen's Smart Contracts - Contract to write reviews for any product] (https://github.com/naveen7252/ProductReviewContract)

## 5. Deploying and invoking smart contracts

[How to deploy and invoke the wallet smart contract](/NULS1.0/GUIForSmartContract.html)

## 6. Smart contract specifications and syntax

[Smart contract specifications and syntax](/NULS1.0/developerManual.html)