title: 如何开发一个模块
---------------

## 开发前的准备

请参考 Get Started 准备好开发环境，并克隆代码。

## 概述

NULS 通过 kernel 模块的 io.nuls.kernel.module.BaseModuleBootstrap 包导出了模块化规范。

通过继承 BaseModuleBootstrap 并实现接口方法，即可被模块管理器正确管理。

client 模块是 NULS 的启动器，入口函数在这个工程里。

通过微内核管理器，加载模块配置文件描述的功能模块。

我们的自定义模块也需要被 client 工程识别和依赖，并配置 module.ini 让管理器启动时也要加载我们的模块。

## 开发模块

### 创建自己的模块

创建一个基于 maven 的 Java 模块，名为 "how-to"。

POM 描述如下：

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>nuls</artifactId>
        <groupId>io.nuls</groupId>
        <version>1.0.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.daviyang35.nuls</groupId>
    <artifactId>how-to</artifactId>
    <version>1.0.0</version>

    <dependencies>
        <!-- NULS 模块化微内核 -->
        <dependency>
            <groupId>io.nuls.core-module</groupId>
            <artifactId>kernel</artifactId>
            <version>1.0.0</version>
        </dependency>

        <!-- 业务中使用到的依赖 -->
        <dependency>
            <!-- ... -->
        </dependency>
    </dependencies>
</project>
```

> 父模块依赖不是必须设置的。如果不设置，则需要将 NULS 工程编译并安装到本地仓库。

打开 nuls 源码根目录的 pom.xml ，确保我们的 how-to 模块已经被添加。

```xml
    <modules>
        <module>account-module</module>
        <module>account-ledger-module</module>
        <module>core-module</module>
        <module>protocol-module</module>
        <module>consensus-module</module>
        <module>ledger-module</module>
        <module>db-module</module>
        <module>network-module</module>
        <module>contract-module</module>
        <module>client-module</module>
        <module>tools-module</module>
        <module>message-bus-module</module>
        <module>sdk-module</module>
        <module>how-to</module> <!-- 我们的自定义模块 -->
    </modules>
```

> 目的是让 client 模块能发现到我们的新增模块，否则需要编译并安装到本地仓库

### 添加模块入口类

创建 Bootstrap 类

```java
package com.daviyang35.nuls.howto.module;

import io.nuls.core.tools.log.Log;
import io.nuls.kernel.module.BaseModuleBootstrap;

import java.util.List;

public class Bootstrap extends BaseModuleBootstrap {

    public Bootstrap() {
        // TODO: You need a moduleID
        super((short) 100);
    }

    @Override
    public void init() throws Exception {
        Log.info("init");
    }

    @Override
    public void start() {
        Log.info("start");
    }

    @Override
    public void shutdown() {
        Log.info("shutdown");
    }

    @Override
    public void destroy() {
        Log.info("destroy");
    }

    @Override
    public String getInfo() {
        Log.info("getInfo");
        return null;
    }
}
```

这就是一个最精简的 NULS 功能模块实现。

### 添加业务处理

* init
初始化资源等准备工作，也可以做一些依赖检查等。在此处订阅事件可以防止漏掉通知。

* start
启动业务线程，执行模块本身的业务逻辑。

* shutdown
通知模块被关闭，此时应该停止业务功能，暂停业务处理线程或线程池。

* destroy
通知模块被销毁，释放申请的资源。此时应退出并释放所有业务线程与线程池。

* getInfo
模块管理器通过此接口查询模块运行状态与报告信息。报告内容为 JSON 格式字符串。

## 加载模块

打开 client-module/client/pom.xml ，让 client 工程依赖并包含我们的自定义模块。
给client 工程添加一个模块依赖，引入我们的 "how-to" 模块

```xml
        <dependency>
            <groupId>io.nuls</groupId>
            <artifactId>how-to</artifactId>
            <version>1.0.0</version>
        </dependency>
```

打开 client-module/client/src/main/resources/modules.ini 模块配置文件

添加一个新节描述我们的模块，并配置入口类路径

```ini
...

[client]
server.ip=127.0.0.1
server.port=6001
request.white.sheet=127.0.0.1
version.root.url=https://raw.githubusercontent.com/nuls-io/nuls-wallet-release/master/main/release/

# 新增自定义模块节
# 至少需要设置 bootstrap 为模块指定入口类
[how-to]
bootstrap=com.daviyang35.nuls.howto.module.Bootstrap

```

现在，可以编译并启动 client 。
为了方便确认，通过 IDE 下断点，查看模块回调方法是否正确执行。

