title: Get Start
----------------

## What you'll need

* JDK 1.8
* Maven 3.3+
* Git 2.x
* IDE ( Optional )

## Getting Source

```sh
$ git clone https://github.com/nuls-io/nuls.git && cd nuls
```

## Build Source

Make sure the JDK version is 1.8

```sh
$ mvn -v
Apache Maven 3.5.4 (1edded0938998edf8bf061f1ceb3cfdeccf443fe; 2018-06-18T02:33:14+08:00)
Maven home: /usr/local/Cellar/maven/3.5.4/libexec
Java version: 1.8.0_171, vendor: Oracle Corporation, runtime: /Library/Java/JavaVirtualMachines/jdk1.8.0_171.jdk/Contents/Home/jre
Default locale: zh_CN, platform encoding: UTF-8
OS name: "mac os x", version: "10.13.6", arch: "x86_64", family: "mac"
```

If the Java version is not 1.8, it is recommended to install and set it to version 1.8.

Now,we can build the node.

```
$ mvn clean package
```

After the command is successfully executed, you can find the compilation result in the path.

> client-module/client/target/nuls-node.tar.gz

## Run Node

```
$ cd client-module/client/target
$ tar zxvf nuls-node.tar.gz
$ bin/start.sh
```

## Use IDEA

