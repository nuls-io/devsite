# 生成程序包

## 必备知识
Nuls2基础模块使用java11开发，使用分布式多模块的微服务架构，模块间使用websocket进行通信。但模块间并无语言要求，能支持websocket协议进行网络编程的语言理论上都可以成为NULS2的模块，所以需要对websocket协议有一定的了解。
## 获取程序源代码
NULS2的源代码托管在github.com上，任何人可免费获取。项目地址[nuls_2.0](https://github.com/nuls-io/nuls_2.0)，获取方法参见[git](https://git-scm.com/book/en/v2)
## 调试程序
如果想要开发或者调试NULS2的源代码，需要先准备开发环境，依次安装JDK11.0.2、apache maven 3.3，以及一个趁手的开发工具，我们推荐IntelliJ IDEA。开发环境和源代码准备好后，在IDEA中用导入maven项目的方式导入程序模块。

![modules](./start/modules.png)

模块根目录存在module.ncf文件的模块定义为nuls2子模块，其中mykernel为核心调度模块，此模块负责其他子模块注册服务。每个模块的启动类的命名方式为XXXXBootstrap,运行启动类的main函数启动模块。

![](./start/module.png)

在开发环境中，首先需要启动mykernel模块，再启动其他模块，模块间的依赖关系由框架自动控制。在日志中打印"MYKELNEL STARTED. PORT:8887"时，mykernel模块启动成功。

![](./start/mykernelstarted.png)

启动其他模块（以ledger模块为例），找到LedgerBootstrap类，运行main函数。

![](./start/ledger.png)

日志打印"RMB:module state : Running"时，模块启动成功。

![](./start/ledgerstart.png)

## 生成可执行程序包
获取到源代码后，可以自己通过源代码生成可使用的脚本程序。在nuls2.0根目录运行脚本package.sh执行自动打包程序(脚本需要依赖jdk11,maven3.3,git).

执行打包程序，将/usr/local/java/jdk11.0.2目录下的JDK作为运行环境复制到钱包目录中。钱包可运行程序输出到../NULS2这个相对目录中。
```
./package.sh -J /usr/local/java/jdk11.0.2 -o ../NULS2
```
日志输出XXXX PACKAGE FINISH时，打包程序生成成功。

![](./start/package.png)

更多的package.sh脚本参数可通过-h查看帮助。
```
lijunzhou:nuls_2.0 zhoulijun$ ./package.sh -h
    Desc: 使用此脚本将生成符合NULSTAR规范的可执行子模块，
    	  所有子模块按照module.ncf配置，使用mvn命令进行打包，并生成启动、停止脚本
    Usage: ./package.sh 
    		-b <branch> 打包前同步最新代码 参数为同步的远程分支名称
    		-p 打包前同步最新代码 从master分支拉取
    		-o <目录>  指定输出目录
    		-h 查看帮助
    		-j JAVA_HOME
    		-J 输出的jvm虚拟机目录，脚本将会把这个目录复制到程序依赖中
    		-i 跳过mvn打包
    		-z 生成压缩包
    Author: zlj
```
钱包使用方法请参见[命令行使用手册](/zh/NULS2.0/linuxTutorial.html)。