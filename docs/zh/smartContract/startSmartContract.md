# [快速入门] 从0开始NULS智能合约

## 一、运行公测环境，创建账户，领取测试币

[为部署、调用智能合约做准备。](连接测试网文档链接)
> `//TODO 等待连接测试网文档链接`


## 二、安装JDK8、IntelliJ IDEA、NULS智能合约插件

为开发智能合约代码做准备

[下载JDK8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)(安装略)

[下载IntelliJ IDEA](https://www.jetbrains.com/idea/download/)(安装略)

[下载NULS智能合约插件](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/plugins/Docs%26plugin.zip)

[安装NULS智能合约插件](https://dev.nuls.io/zh-cn/contract/IdeaPlugin.html)

## 三、智能合约代码示例

**_用示例快速编译、部署一个智能合约_**

* 简单示例

```java

import io.nuls.contract.sdk.Contract;
import io.nuls.contract.sdk.Msg;
import io.nuls.contract.sdk.annotation.Payable;
import io.nuls.contract.sdk.annotation.Required;
import io.nuls.contract.sdk.annotation.View;

import java.math.BigDecimal;
import java.math.BigInteger;

public class SimpleContract implements Contract {

    private String sayContent;

    @Override
    @Payable
    public void _payable() {
        // 覆写这个方法并标记@Payable注解，这个智能合约可以接收全节点钱包NULS资产的直接转账
        // you can do something else
        // ...
    }

    public String sayContent(@Required String content) {
        this.sayContent = content;
        return "you want say " + content;
    }

    @Payable
    public String transferToContract() {
        // 标记@Payable注解，调用这个方法时，智能合约可接受NULS转入
        BigInteger value = Msg.value();
        BigDecimal nuls = new BigDecimal(value).movePointLeft(8);
        // you can do something else
        // ...

        return "I received your transfer amount: " + nuls.toPlainString();
    }

    @View
    public String sayWhat() {
        if(sayContent != null) {
            return "you want say " + sayContent;
        }
        return "you want say nothing.";
    }
}

```

## 四、智能合约代码仓库

[NULS官方收集的智能合约代码仓库](https://github.com/nuls-io/contracts)

[社区成员Angelillou的智能合约-合作委托挖矿](https://github.com/amalcaraz/nuls-partnership-smartcontract)

[社区成员Angelillou的智能合约-彩票](https://github.com/amalcaraz/nuls-lottery-smartcontract)

[社区成员Naveen的智能合约-评论](https://github.com/naveen7252/ProductReviewContract)

## 五、智能合约部署与调用

[全节点钱包智能合约部署与调用方式](https://dev.nuls.io/zh-cn/contract/smartContract.html)

## 六、智能合约代码规范与语法

[智能合约代码规范与语法说明](https://dev.nuls.io/zh-cn/contract/index.html)