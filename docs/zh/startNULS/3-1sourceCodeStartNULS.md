title: 如何使用
-----------

## 需要依赖的资源

- JDK 1.8
- Maven 3.3+
- Git 2.x
- IDE ( 可选 )
- 运行环境: 64 位系统，4G 及以上可用内存

## 获取源码

```sh
$ git clone https://github.com/nuls-io/nuls.git && cd nuls
```

## 编译

首先，请确保 maven 版本大于3.3，JDK 版本是 1.8。

```sh
$ mvn -v
Apache Maven 3.5.4 (1edded0938998edf8bf061f1ceb3cfdeccf443fe; 2018-06-18T02:33:14+08:00)
Maven home: /usr/local/Cellar/maven/3.5.4/libexec
Java version: 1.8.0_171, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk1.8.0_171.jdk/Contents/Home/jre
```

如果你的 JDK 版本不是1.8，建议安装并设置为使用1.8版本。

现在，我们可以执行编译了。

```sh
$ mvn clean package
```

命令成功执行，编译出的钱包核心会保存在如下路径

> client-module/client/target/nuls-node.tar.gz

## 启动

```shell
$ mvn clean package
$ cd client-module/client/target
$ mkdir nuls-node
$ tar -zxvf nuls-node.tar.gz -C nuls-node
$ cd nuls-node/bin
```

- start.sh 启动 NULS 钱包。  
- stop.sh 停止 NULS 钱包.
- cmd.sh 启动 NULS Shell.


## 导入 IDEA

导入工程目录到 IDEA，并设置好启动入口，即可调试运行。

![图片](assert/launcher.jpg)

