# NULS AI 合作伙伴对接指南

## 简介

本文定义了 NULS AI 提供给合作伙伴和交易所的对接指南。

NULS 1.0（以下简称 1.0）公链于 2018-07-11 上线正式运行，先后对接了若干交易所和合作伙伴。为了更好地提升 NULS 公链质量，更好地扩展 NULS 生态，NULS 团队决定升级 NULS 2.0（以下简称 2.0）。

2.0 相较于 1.0 在业务上有了更多的扩展，在底层实现上有了根本的变化。因此 2.0 不能兼容 1.0 的数据，包括启动方式、接口调用等都有调整。

NULS AI 在2.0的基础上，在业务层封装了NULS资产，将NULS资产更名为NAI，并且将NULS资产的decimals=8设置为NAI资产的decimals=4. 即 1 NULS = 10000 NAI。
 
### NULS AI 对接的特殊性
由于NULS链底层接口没有进行NULS AI化处理，所以要在所有用到NAI资产的地方，进行特殊处理。
NULS节点接口，依然是基于NULS资产的版本，所以对于NAI资产的一些操作需要进行处理：
- 显示处理： 将NULS替换为NAI，并设置NAI资产的decimals=4
- 交易处理： 转账一个NAI时，实际的转账金额是 10000，（代表0.0001 NULS / 1 NAI,底层是整数形式处理的）
- 所有涉及到NULS展示时，资产为NAI，链命令为NULS AI
- 调用接口进行查询操作时，所有NAI查询，都以查询NULS为基准，在显示层，进行用户化处理

### NULS AI 钱包说明

源码地址：https://github.com/nuls-io/nuls-v2

钱包下载地址：https://github.com/nuls-io/nuls-v2/releases

#### 钱包配置

钱包配置文件：nuls.ncf

网络模块配置：

```
#本链P2P节点端口号
port=18001
#跨链P2P节点端口号
crossPort=18002
#最大连入节点数
maxInCount=100
#最大连出节点数
maxOutCount=20
```

RPC配置：

```
#httpServer的启动ip
server_ip=0.0.0.0
#httpServer的启动port
server_port=18004
```

#### 钱包启动

以Linux系统钱包版本为例

运行start文件启动钱包，再运行check-status文件查看各个模块进程的运行状况，当所有模块都启动完毕，且最后显示NULS AI WALLET IS RUNNING时，表示钱包已启动成功。启动成功后，会成功data文件夹和logs文件夹。data文件夹存储数据，logs存储钱包运行日志。

成功启动后，可运行cmd文件启动钱包命令行，通过network info命令查看节点信息，当本地高度在升高时，说明已经开始同步区块。具体cmd命令详见：https://github.com/nuls-io/nuls-v2/blob/master/module/nuls-cmd-client/document/cli-gude.md

### RPC接口说明

访问方式：http协议，支持Restful风格和Json-rpc风格，默认RPC端口号为18004。

接口文档详见：https://github.com/nuls-io/nuls-v2/tree/release/module/nuls-api/documents

java版api对接工具：https://github.com/nuls-io/nuls-v2-sdk4j/blob/master/README.md

### 对接说明

#### 地址的创建与备份

**钱包模式：**

钱包启动后，会生成data文件夹，用于存储数据。

调用1.1接口，传入密码创建地址，生成的地址会存储在钱包里。地址创建好后，可调用1.3接口导出明文私钥备份，也可以调用1.6接口备份账户keystore文件。

**冷钱包模式：**

调用1.10接口，传入密码创建离线账户，接口会返回账户的keystore，账户信息不会存储在钱包里。若需要获取离线账户的明文私钥，可调用1.11接口，传入keystore相关信息获取。

#### 充值与提现

**充值处理：**

交易所需要写代码监控每个区块，获取的区块信息中包含了交易输入(from)和交易输出(to)，如果发现交易输出中有属于交易所的地址，需记录下相关信息，作为用户的充值记录。

**提现流程：**

1. 发起转账交易

   **钱包模式：**

   调用3.4接口，创建并广播转账交易， 记录接口返回的交易hash。

   **冷钱包模式：**

   调用1.7接口，获取账户的代币余额，与代币的当前nonce值

   调用3.6接口，计算离线组装交易所需手续费

   调用3.5接口，离线组装转账交易

   调用3.2接口，验证离线组装的交易

   调用3.3接口，广播交易，记录交易hash

2. 确认转账交易

监控每个区块，若发现区块中的某个交易 hash 与提现记录中的交易 hash 相等，即提现成功。

注：NULS区块链是每10秒出一个新块，建议交易所在收到新区块的时候，只存储数据，待30个高度确认后，再做相应处理。
