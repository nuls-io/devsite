# 开发业务模块
> 该文档为Java版本的业务模块开发指南


nuls-module-java-template可配合NULS ChainBox帮助你快速构建基于java实现的区块链业务模块。模板中引用了io.nuls.v2下nuls-core-rpc、nuls-base两个核心程序包，前者实现了与模块的基础通信协议，后者包含了区块的基础数据结构及工具类。
## 文件结构

```
.
├── README.md   
├── build          # 构建相关脚本   
├── init.sh        # 初始化项目脚本
├── module.ncf     # 模块配置文件
├── package        # 构建脚本
├── pom.xml        # maven pom.xml
└── src            # java源代码
```
## 使用模板
使用NULS ChainBox项目tools脚本下载此模板。

```
tools -t java demo #demo为自定义的模块名称
```
下载完成后，tools将自动将pom.xml、module.ncf里面定义的模块名称替换成demo，使用常用的java开发工具通过导入maven工程的方式导入项目。

## 源码结构

```
.
└── io
    └── nuls
        ├── MyModule.java                 #需要实现的模块启动类，在类中实现模块准备工作，包括注册交易、初始化数据表、web服务等。
        ├── NulsModuleBootstrap.java      #模块启动类，通常不用修改
        ├── Utils.java                    #工具类，实现了交易签名功能
        ├── rpctools                      #rpc工具包
        │   ├── AccountTools.java         #账户模块相关工具函数
        │   ├── CallRpc.java              
        │   ├── LegderTools.java          #账本模块相关工具函数
        │   ├── TransactionTools.java     #交易模块相关工具函数 
        │   └── vo                        #数据对象包     
        │       ├── Account.java
        │       ├── AccountBalance.java
        │       └── TxRegisterDetail.java
        └── txhandler                      #交易回调函数包
            ├── TransactionDispatcher.java #交易回调函数分发器
            ├── TransactionProcessor.java  #交易回调函数接口定义 
            └── TxProcessorImpl.java       #交易回调函数接口实现，需要开发人员实现
```
## 实现业务模块
1. 定义交易类型，在模块启动时（MyModule.startModule)调用TransactionTools.registerTx方法完成交易注册。
2. 实现创建交易入口，组装交易，并在txData中存储业务数据，调用TransactionTools.registerTx.newTx方法在交易模块创建交易。
3. 实现TxProcessorImpl.validate方法，完成交易业务验证代码。
4. 实现TxProcessorImpl.commit方法，完成交易业务数据保存代码。
5. 实现TxProcessorImpl.rollback方法，完成交易业务数据回滚代码。
6. 实现业务数据消费场景代码。

## 构建模块
执行package脚本，会把模块按照NULS2.0的运行要求进行构建，将把打包好的jar包、启动脚本、停止脚本、Module.ncf构建到outer文件夹下。

```
./package
============ PACKAGE FINISH 🍺🍺🍺🎉🎉🎉 ===============
```

