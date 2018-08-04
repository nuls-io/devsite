title: How to develop a module
------------------------------

## Preparation before development

Please refer to Get Started to prepare your development environment and clone the code.

## Overview

NULS exports modular specifications through the kernel module's io.nuls.kernel.module.BaseModuleBootstrap package.
By inheriting BaseModuleBootstrap and implementing interface methods, it can be managed correctly by the module manager.

The client module is the initiator class for NULS.
Load the module described by the module configuration file through the microkernel manager.

Our custom modules also need to be recognized and dependent by the client project, and module.ini is configured to have our module loaded when the manager starts.

## Develop

### Create your own module

Create a maven-based Java module called "how-to".

POM ：

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
        <!-- NULS micro kernel -->
        <dependency>
            <groupId>io.nuls.core-module</groupId>
            <artifactId>kernel</artifactId>
            <version>1.0.0</version>
        </dependency>

        <!-- Dependencies used in the business -->
        <dependency>
            <!-- ... -->
        </dependency>
    </dependencies>
</project>
```

> Parent module dependencies are not required to be set.
> If not set, you will need to compile and install the NULS project to your local repository.

Open the pom.xml in the nuls source root directory to make sure our "how-to" module has been added.

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
        <module>how-to</module> <!-- Look here -->
    </modules>
```

> The purpose is to let the client module discover our new modules
> otherwise we need to compile and install to the local repository.

### Add bootstrap entry

Create a Bootstrap class

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

This is the most streamlined implementation of the NULS function module.

### Add business processing

* init
Initialization of resources and other preparations, you can also do some dependency checks. Subscribing to events here prevents missed notifications.

* start
Start the business thread and execute the business logic of the module itself.

* shutdown
The notification module is closed, at which point the business function should be stopped and the business processing thread or thread pool should be suspended.

* destroy
The notification module is destroyed and the requested resources are released. At this point you should exit and release all business threads and thread pools.

* getInfo
The module manager queries the module running status and report information through this interface. The report content is a JSON format string.

## Load module

Open client-module/client/pom.xml and let the client project depend on and include our custom module.
Add a module dependency to the client project and introduce our "how-to" module

```xml
        <dependency>
            <groupId>io.nuls</groupId>
            <artifactId>how-to</artifactId>
            <version>1.0.0</version>
        </dependency>
```

Open the client-module/client/src/main/resources/modules.ini module configuration file

Add a new section to describe our module and configure the entry classpath

```ini
# ...

[client]
server.ip=127.0.0.1
server.port=6001
request.white.sheet=127.0.0.1
version.root.url=https://raw.githubusercontent.com/nuls-io/nuls-wallet-release/master/main/release/

# Add a custom module section
# At least you need to set bootstrap to specify the entry class for the module.
[how-to]
bootstrap=com.daviyang35.nuls.howto.module.Bootstrap

```

Now you can compile and start the client.
In order to facilitate the confirmation, through the IDE breakpoints, the view module callback method is executed correctly.

