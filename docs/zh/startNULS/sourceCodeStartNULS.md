# 源码启动NULS

## 下载源码

访问NULS项目github地址：https://github.com/nuls-io/nuls

方式一：直接下载源代码

​	进入github地址后，点击"Clone or download" 按钮，选择Download ZIP 下载源码包。

方式二：通过git命令克隆NULS仓库

​	`$ git clone https://github.com/nuls-io/nuls.git`

方式三(推荐)：通过开发工具，例如IntelliJ IDEA，克隆NULS仓库。

## 环境说明

​	操作系统：macOS、Windows

​	构建工具：maven

​	开发工具：IntelliJ IDEA

​	开发语言：Java  (JDK1.8)

## NULS启动基本介绍

​	由于区块链是去中心化网络，是由多个节点组成，所以单独用NULS源代码启动一个节点是没有意义的，也是不可行的。本文假定一个已经存在的利用NULS源码运行的自定义测试网络，并且搭建该网络时没有修改除网络参数以外的源代码，我们该如何启动NULS源代码，并加入该网络。

1. 首先安装jdk1.8和maven构建工具。

 	2. 运行IntelliJ IDEA
     - 如果下载的源码包，则先解压然后通过IntelliJ IDEA导入NULS项目
     - 如果通过git命令克隆NULS仓库下载的源代码，再通过IntelliJ IDEA导入NULS项目
     - 通过IntelliJ IDEA的Git插件克隆NULS仓库。
 	3. 配置与已存在网络一致的网络环境参数
     - 打开client-module项目中module.ini配置文件文件
     - 建议用已知自定义测试网络中其他节点的module.ini配置文件来将此module.ini文件替换掉，来保证网络环境参数一致。
 	4. 运行client-module项目中NULS启动类Bootstrap.java。位置：`io.nuls.client` 包中。
 	5. 启动过程中将打开NULS网钱包界面，并开始同步该自定义测试网高度，表示启动成功。