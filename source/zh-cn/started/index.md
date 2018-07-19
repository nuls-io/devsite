title: 如何使用
-----------

## 需要依赖的资源

* JDK 1.8
* Maven 3.3+
* Git 2.x
* IDE ( 可选 )

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
Default locale: zh_CN, platform encoding: UTF-8
OS name: "mac os x", version: "10.13.6", arch: "x86_64", family: "mac"
```

如果你的 JDK 版本不是1.8，建议安装并设置为使用1.8版本。

现在，我们可以执行编译了。

```sh
$ mvn clean package
```

命令成功执行，编译出的钱包核心会保存在如下路径

> client-module/client/target/nuls-node.tar.gz

## 启动

```sh
$ cd client-module/client/target
$ tar zxvf nuls-node.tar.gz
$ bin/start.sh
```

## 导入 IDEA
