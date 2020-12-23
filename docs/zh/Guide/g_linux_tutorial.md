# 节点程序手册
## 介绍

本文档为NULS2.0 beta1版本测试网Linux版全节点钱包的使用指南，阅读本文档前用户需了解Linux系统的基本操作和使用方式，本文介绍了在Linux系统中如何利用NULS钱包创建账户、导入账户、转账、建立节点、委托等操作。我们建议用户利用Linux系统服务器建立稳定的NULS节点。

## 版本更新记录

|  版本  |  更新日期  |        内容        |
| :----: | :--------: | :----------------: |
|  V0.9.0  | 2018-03-18 |  alpha   |
|  V0.9.1  | 2019-07-08 |   Beta   |
|  V1.0.0  | 2019-09-08 |   Mainnet|

## 准备

### 服务器硬件配置


**建立NULS节点的服务器不低于如下配置：**

|     CPU     | 内存 |   硬盘   |  宽带   |
| :---------: | :---: | :------: | :-----: |
| 四核 3.0GHz | 16G  | 128G硬盘 | 20M上行 |


**推荐配置：**

|     CPU     | 内存 |   硬盘   |   宽带   |
| :---------: | :---: | :------: | :------: |
| 八核 3.0GHz | 32G  | 256G硬盘 | 100M上行 |



### 系统及内核版本

**Linux系统**

- CentOS 6,7
- Ubuntu 14 +

Linux内核版本推荐使用 2.6.32及以上

## 开始                 

### 下载

- NULS2.0 beta1版本GitHub地址：<https://github.com/nuls-io/nuls-v2/releases>

- Linux系统中下载beta1版的钱包可以使用如下命令：

  ```shell
  $ wget http://nuls-usa-west.oss-us-west-1.aliyuncs.com/2.0/NULS-Wallet-linux64-beta1-main.tar.gz
  ```

  注：如果后续有其他版本，下载地址可能会不同。

### 安装

- 在Linux中解压已下载的文件

  ```shell
  $ tar -zxf NULS-Wallet-linux64-beta1-main.tar.gz
  ```

### 运行

- 进入解压后的目录，并运行启动脚本，启动节点钱包

  ```shell
  $ cd NULS-Wallet-linux64-beta1
  $ ./start
  ```

## 使用钱包

### 快速入门

- 在确定钱包已经启动后，启动钱包的命令行程序，可对钱包进行操作。

  进入钱包根目录，执行如下命令：

  ```shell
  $ ./cmd
  ```

  将会出现NULS命名输入提示符`nuls>>>  ` ，然后可直接输入NULS钱包操作命令，来进行操作。

  例如，创建账户的示例如下：

  ```shell
  nuls>>> create
  Please enter the new password(8-20 characters, the combination of letters and numbers).
  Enter your new password:********
  Please confirm new password:********
  [ "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8" ]
  ```

  执行`create`命令表示创建单个账户，然后输入密码，以及再次确认输入的密码，创建成功后将会返回账户的地址。



## 约定

- 设置密码规则：密码长度在8至20位，必须同时包含字母和数字。
- 命令参数说明： &lt;parameter&gt; 表示必填参数；[parameter] 表示选填参数。"|" 在参数中表示或者，表示前后参数只能选其一。

## 钱包命令

### 帮助命令

输出打印所有的命令，

- **命令： help [-a]|[group]|[command]**

| 参数 | 说明                 |
| :--- | :------------------- |
| -a   | 格式化打印命令，选填 |
| command|查看指定命令使用说明|
| group|查看指定命令组的所有命令使用说明|

返回信息 help

```json
getaccount <address> --get account information
```

返回信息 help -a

```json
getaccount <address> --get account information
	OPTIONS:
	<address> the account address - Required
```

示例

```shell
nuls>>> help
nuls>>> help -a
nuls>>> help account
nuls>>> help create
```



### 创建账户

创建账户，返回账户地址集合

- **命令： create [number]**

| 参数     | 说明                 |
| :------- | :------------------- |
| [number] | 创建账户的数量，选填 |

创建账户时，将会提示输入密码，为了保证资产安全，必须给账户设置密码；

返回账户集合

```json
[ "tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm", "tNULSeBaMhUKHmueWB1h87vpWr62vrAjPshwTs", "tNULSeBaMvXiStrcQc4SF3rWGS8fyPqhUQXoS4" ]
```

示例 

创建1个账户


```shell
nuls>>> create
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:********
Please confirm new password:********
[ "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8" ]
```
一次创建多个账户

```
nuls>>> create 3
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:********
Please confirm new password:********
[ "tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm", "tNULSeBaMhUKHmueWB1h87vpWr62vrAjPshwTs", "tNULSeBaMvXiStrcQc4SF3rWGS8fyPqhUQXoS4" ]
```




### 备份账户

备份账户，将生成一个名称为账户地址，扩展名为.keystore的文件，该文件为账户的备份文件

- **命令：backup &lt;address&gt; [path]**

| 参数            | 说明                                                 |
| --------------- | ---------------------------------------------------- |
| &lt;address&gt; | 账户地址，必填                                       |
| [path]          | 文件生成备份文件的目标文件夹，默认为当前文件夹，选填 |

返回信息

```shell
The path to the backup file is /home/nuls2/nuls-v2/tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm.keystore
```

示例 备份一个有密码的账户

```shell
nuls>>> backup tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm /home/nuls2/nuls-v2/NULS-Wallet-linux64-beta1
Please enter the password.
Enter your password:********
The path to the backup file is /home/nuls2/nuls-v2/tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm.keystore
```

### 移除账户

根据账户地址移除本地账户，需要输入密码

- **命令：remove &lt;address&gt;**

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息

```json
Success
```

示例

```shell
nuls>>> remove tNULSeBaMhUKHmueWB1h87vpWr62vrAjPshwTs
Please enter the password.
Enter your password:********
Success
```


### 修改账户密码

根据账户地址和账户密码重新设置新密码。

- **命令：resetpwd &lt;address&gt;**

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息

```json
Success
```

示例

```shell
nuls>>> resetpwd tNULSeBaMvXiStrcQc4SF3rWGS8fyPqhUQXoS4
Enter your old password:********
Enter new password*********
Please confirm new password:*********
Success
```



### 设置别名

给账户设置一个别名，如果用此账户建立节点，别名将作为节点来源显示

- **命令：setalias &lt;address&gt; &lt;alias&gt;**

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |
| &lt;alias&gt;   | 别名名称，必填   |

返回信息 交易hash

```json
txHash:0020f94f36aefd59f9cca9bff3c018fc287dc6c0bcd7fbeb047133cadb5747e7d98d"
```

示例

```shell
nuls>>> setalias tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8 nuls
Enter your account password**********
txHash:0020830971e02527f18f8f9e32f974d8c73ce6bd249de859cae170476b87d0ec9582
```



### 导入账户keystore

导入账户keystore文件，生成本地账户，如果本地已有该账户将无法导入。

- **命令：importkeystore &lt;path&gt;**

| 参数         | 说明                           |
| ------------ | ------------------------------ |
| &lt;path&gt; | 待导入的keystore文件地址，必填 |

注意：导入keystore文件生成账户时，需要原始密码

返回信息 导入的账户地址

```json
"tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8"
```

示例

```shell
nuls>>> importkeystore /home/nuls2/nuls-v2/tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8.keystore
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:********
tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8
```



### 导入账户私钥

导入账户私钥，生成本地账户，如果本地已有该账户将覆盖,导入时需要给账户设置密码。此功能可以用于忘记账户密码后，通过私钥重新找回账户。

- **命令：import &lt;privatekey&gt;**

| 参数               | 说明             |
| ------------------ | ---------------- |
| &lt;privatekey&gt; | 账户的私钥，必填 |


```json
"tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8"
```

示例

```shell
nuls>>> import 74ca3facb66e5e9f2b78e86507d1f36cf601bc3de1d5f5e5b515c4f995d53873
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:********
Please confirm new password:********
tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8
```

### 查询账户信息

根据账户地址查询账户信息

- **命令：getaccount &lt;address&gt;**

| 参数            | 说明           |
| --------------- | :------------- |
| &lt;address&gt; | 账户地址，必填 |

返回信息

```json
{
  "encryptedPrikeyHex" : "4026dc6c3b92fb18b4e87c8aac1efedf1bb6a1cd8f623d163f45209b07911dcf6cbd4141f5294035b8f6739a3dce299c", //加密后私钥
  "alias" : null,//别名
  "baglance" : {
    "available" : "5000000",//可用资产数量
    "total" : "5000000",//总资产数量
    "freeze" : "0"//冻结的资产数量
  },
  "address" : "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8",//地址
  "pubkeyHex" : "02f2df94a1197f7bce4ea78f28fa7be8e8067377fcd13daef9c548e1a0402fb4de" //加密后公钥
}
```

示例

```shell
nuls>>> getaccount tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8
{
  "encryptedPrikeyHex" : "4026dc6c3b92fb18b4e87c8aac1efedf1bb6a1cd8f623d163f45209b07911dcf6cbd4141f5294035b8f6739a3dce299c", //加密后私钥
  "alias" : null,//别名
  "baglance" : {
    "available" : "5000000",//可用资产数量
    "total" : "5000000",//总资产数量
    "freeze" : "0"//冻结的资产数量
  },
  "address" : "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8",//地址
  "pubkeyHex" : "02f2df94a1197f7bce4ea78f28fa7be8e8067377fcd13daef9c548e1a0402fb4de" //加密后公钥
}

```



### 查询账户列表

根据分页参数查询账户列表，所有账户以创建时间倒序输出。

- **命令：getaccounts &lt;pageNumber&gt; &lt;pageSize&gt;**

| 参数               | 说明                             |
| ------------------ | -------------------------------- |
| &lt;pageNumber&gt; | 页数，需要获取第几页的数据，必填 |
| &lt;pageSize&gt;   | 每一页显示的数据条数，必填       |

返回信息，将输出账户集合

```json
[ {
  "address" : "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8",
  "alias" : null,
  "pubkeyHex" : "02f2df94a1197f7bce4ea78f28fa7be8e8067377fcd13daef9c548e1a0402fb4de",
  "encryptedPrikeyHex" : "4026dc6c3b92fb18b4e87c8aac1efedf1bb6a1cd8f623d163f45209b07911dcf6cbd4141f5294035b8f6739a3dce299c"
}, {
  "address" : "tNULSeBaMvXiStrcQc4SF3rWGS8fyPqhUQXoS4",
  "alias" : null,
  "pubkeyHex" : "03ad08ca4f73178c4e3e6d7126cb61e3a4c9b4dec95e4077112f085797eadc808a",
  "encryptedPrikeyHex" : "e97dedb7697a6d37a8dfe9e2aa41543161f63d0740c4b5a72a0e1df2cc85ef99949e6f8ce41667587225df8cff0aae17"
}, {
  "address" : "tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm",
  "alias" : null,
  "pubkeyHex" : "039abe58d5a20bac72ebb1fd80cac6a1012d17ad04a131a8a2350ea4df9ea4416e",
  "encryptedPrikeyHex" : "fee6f590fc900aee4f3aa84437701d406d00c3045b1d0ce074efa1b42a6db8d5925e3a10272041b5f3c0c2d2572c0f42"
}, {
  "address" : "tNULSeBaMt7c7sybfvP7iAC2p9d1ickHZvH9Sc",
  "alias" : null,
  "pubkeyHex" : "023b8834bceb1228711ed6301322f5617e1b2d2e5197bc9832744af41191096c39",
  "encryptedPrikeyHex" : "d9b4704c5b6470b51ca09c8cca888a4c9e7abea32aad17cc91f1c20c74a30632cb38d759129abea1d3c3f8080fc11f01"
} ]
```



示例 获取账户列表

```shell
nuls>>> getaccounts
[ {
  "address" : "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8",
  "alias" : null,
  "pubkeyHex" : "02f2df94a1197f7bce4ea78f28fa7be8e8067377fcd13daef9c548e1a0402fb4de",
  "encryptedPrikeyHex" : "4026dc6c3b92fb18b4e87c8aac1efedf1bb6a1cd8f623d163f45209b07911dcf6cbd4141f5294035b8f6739a3dce299c"
}, {
  "address" : "tNULSeBaMvXiStrcQc4SF3rWGS8fyPqhUQXoS4",
  "alias" : null,
  "pubkeyHex" : "03ad08ca4f73178c4e3e6d7126cb61e3a4c9b4dec95e4077112f085797eadc808a",
  "encryptedPrikeyHex" : "e97dedb7697a6d37a8dfe9e2aa41543161f63d0740c4b5a72a0e1df2cc85ef99949e6f8ce41667587225df8cff0aae17"
}, {
  "address" : "tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm",
  "alias" : null,
  "pubkeyHex" : "039abe58d5a20bac72ebb1fd80cac6a1012d17ad04a131a8a2350ea4df9ea4416e",
  "encryptedPrikeyHex" : "fee6f590fc900aee4f3aa84437701d406d00c3045b1d0ce074efa1b42a6db8d5925e3a10272041b5f3c0c2d2572c0f42"
}, {
  "address" : "tNULSeBaMt7c7sybfvP7iAC2p9d1ickHZvH9Sc",
  "alias" : null,
  "pubkeyHex" : "023b8834bceb1228711ed6301322f5617e1b2d2e5197bc9832744af41191096c39",
  "encryptedPrikeyHex" : "d9b4704c5b6470b51ca09c8cca888a4c9e7abea32aad17cc91f1c20c74a30632cb38d759129abea1d3c3f8080fc11f01"
} ]
```



### 查询账户私钥

根据账户地址个密码查询账户私钥

- **命令：getprikey &lt;address&gt;**

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息 导入的账户的私钥（未加密）

```json
74ca3facb66e5e9f2b78e86507d1f36cf601bc3de1d5f5e5b515c4f995d53873
```

示例

```shell
nuls>>> getprikey tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8
Enter your account password********
74ca3facb66e5e9f2b78e86507d1f36cf601bc3de1d5f5e5b515c4f995d53873
```



### 查询账户余额

根据账户地址查询账户余额

- **命令：getbalance &lt;address&gt;**

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息 导入的账户地址

```json
nuls>>> getbalance tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8
{
  "available" : "4999998.999",
  "total" : "4999998.999",
  "freeze" : "0"
}
```

示例

```shell
nuls>>> getbalance tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8
{
  "available" : "4999998.999",
  "total" : "4999998.999",
  "freeze" : "0"
}
```



### 转账

根据账户地址或别名将NULS转入另一账户地址或别名中

- **命令：transfer &lt;formAddress&gt;|&lt;formAlias&gt; &lt;toAddress&gt;|&lt;toAlias&gt; &lt;amount&gt; [remark] **

| 参数              | 说明                                            |
| ----------------- | ----------------------------------------------- |
| &lt;formAddress&gt; | 转出地址(与formAlias任选一项）                                |
|&lt;formAlias>|转出地址别名(与formAddress任选一项）|
| &lt;toAddress&gt; | 接收地址(与toAlias任选一项）                               |
|&lt;toAlias>|接收地址别名(与toAddress任选一项）|
| &lt;amount&gt;    | 转账数量，必填 |
| [remark]          | 备注信息，选填                                  |

返回信息 转账交易hash

```json
"41d8b78214ad9e34beba420248dfc4f282d5d46166fe6d67e3c7006f2990de0e"
```

示例

```shell
nuls>>> transfer tNULSeBaMoodYW7AqyJrgYdWiJ6nfwfVHHHyXm tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8 5000000
Enter your account password********
41d8b78214ad9e34beba420248dfc4f282d5d46166fe6d67e3c7006f2990de0e
```



### 查询交易详情

根据交易hash查询交易详细信息

- **命令：gettx &lt;hash&gt;**

| 参数         | 说明           |
| ------------ | -------------- |
| &lt;hash&gt; | 交易hash，必填 |

返回信息 交易详细信息

```json
{
  "type" : 3,//交易类型（枚举说明见下表【type 枚举类型说明】）
  "time" : "2019-07-11 11:34:24.024",
  "transactionSignature" : "2102f2df94a1197f7bce4ea78f28fa7be8e8067377fcd13daef9c548e1a0402fb4de4730450221008def105209cf7b32da777686a98a06359f80baf2887e8b1c2d5258feac3a70880220538e9fc2fc2a239d1fdced4de3239b762a1decf67f026fc5a93f59d6e281c5c8",
  "remark" : null,
  "hash" : "1a12a2499ec805956ce074e42ce29c64ea1194addc65a68cb186d519d3ed4f43",
  "blockHeight" : 3806, //交易高度
  "status" : "CONFIRMED", //确认状态
  "size" : 285,
  "inBlockIndex" : 0,
  "form" : [ {
    "address" : "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8",
    "assetsChainId" : 2,
    "assetsId" : 1,
    "amount" : 100100000,
    "nonce" : "0000000000000000"
  } ],
  "to" : [ {
    "address" : "tNULSeBaMtx5Dex2BNURMXdA2HkMZy9uXNf5cZ",
    "assetsChainId" : 2,
    "assetsId" : 1,
    "amount" : 100000000,
    "nonce" : null
  } ]
}
```

示例 查询转账交易

```shell
nuls>>> gettx 1a12a2499ec805956ce074e42ce29c64ea1194addc65a68cb186d519d3ed4f43
{
  "type" : 3,//交易类型（枚举说明见下表【type 枚举类型说明】）
  "time" : "2019-07-11 11:34:24.024",
  "transactionSignature" : "2102f2df94a1197f7bce4ea78f28fa7be8e8067377fcd13daef9c548e1a0402fb4de4730450221008def105209cf7b32da777686a98a06359f80baf2887e8b1c2d5258feac3a70880220538e9fc2fc2a239d1fdced4de3239b762a1decf67f026fc5a93f59d6e281c5c8",
  "remark" : null,
  "hash" : "1a12a2499ec805956ce074e42ce29c64ea1194addc65a68cb186d519d3ed4f43",
  "blockHeight" : 3806, //交易高度
  "status" : "CONFIRMED", //确认状态
  "size" : 285,
  "inBlockIndex" : 0,
  "form" : [ {
    "address" : "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8",
    "assetsChainId" : 2,
    "assetsId" : 1,
    "amount" : 100100000,
    "nonce" : "0000000000000000"
  } ],
  "to" : [ {
    "address" : "tNULSeBaMtx5Dex2BNURMXdA2HkMZy9uXNf5cZ",
    "assetsChainId" : 2,
    "assetsId" : 1,
    "amount" : 100000000,
    "nonce" : null
  } ]
}
```
#### type 枚举类型说明

| 交易类型           | 枚举值 |
| ------------------ | ------ |
| 全部交易           | 0      |
| 共识奖励           | 1      |
| 转账交易           | 2      |
| 设置别名           | 3      |
| 创建节点           | 4      |
| 加入共识           | 5      |
| 退出共识           | 6      |
| 黄牌               | 7      |
| 红牌               | 8      |
| 注销节点           | 9      |
| 跨链               | 10     |
| 注册跨链           | 11     |
| 注销链             | 12     |
| 为链新增资产       | 13     |
| 删除链资产         | 14     |
| 创建合约           | 15     |
| 调用合约           | 16     |
| 删除合约           | 17     |
| 合约内部转账       | 18     |
| 合约执行手续费返还 | 19     |
| 合约创建共识节点   | 20     |
| 合约加入共识       | 21     |
| 合约退出共识       | 22     |
| 合约注销节点       | 23     |

### 创建节点

根据账户地址创建节点,创建节点时需要提供两个地址，第一个地址为节点地址，需要输入节点地址账户密码。同时需要至少20000NULS的保证金。

- **命令：createagent &lt;agentAddress&gt; &lt;packingAddress&gt; &lt;commissionRate&gt; &lt;deposit&gt;** [RewardAddress]

| 参数                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| &lt;agentAddress&gt;   | 创建节点的账户地址，必填                                     |
| &lt;packingAddress&gt; | 节点打包账户地址，必填（注：该账户默认密码：nuls123456，可以通过配置文件设置，否则节点不能打包出块） |
| &lt;commissionRate&gt; | 代理佣金比例，范围：10~100之间的整数，必填                   |
| &lt;deposit&gt;        | 创建节点的保证金，不能低于20000NULS，必填                    |
| [RewardAddress]        | 奖励地址，默认为节点创建地址（选填）                         |

返回信息 返回节点的agent hash

```json
"33aeffd4e55203d91183939ad35a9f0a2b0dc80cf1d63c93d4237102d1308a35"
```

示例 创建一个节点，佣金比例为10%，押金20000NULS。

```shell
nuls>>> createagent tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8 tNULSeBaMotNcjQ8E72uh6XituC8CFV2UBBAHo 10 20000
Enter agent address password********
"33aeffd4e55203d91183939ad35a9f0a2b0dc80cf1d63c93d4237102d1308a35"
```
### 查询共识节点信息
根据agentHash查询指定节点信息

-**命令：getagent &lt;agentHash&gt;**
| 参数              | 说明                                   |
| ----------------- | -------------------------------------- |
| &lt;agentHash&gt;   | 节点hash                        |
返回值

```
略 见示例
```
示例

```
nuls>>> getagent 33aeffd4e55203d91183939ad35a9f0a2b0dc80cf1d63c93d4237102d1308a35
{
  "agentAddress" : "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8",
  "agentId" : "D1308A35",
  "commissionRate" : 10.0,
  "delHeight" : -1,
  "agentHash" : "33aeffd4e55203d91183939ad35a9f0a2b0dc80cf1d63c93d4237102d1308a35",
  "totalDeposit" : "0",
  "memberCount" : 0,
  "agentName" : null,
  "packingAddress" : "tNULSeBaMotNcjQ8E72uh6XituC8CFV2UBBAHo",
  "version" : null,
  "blockHeight" : 4262,
  "rewardAddress" : "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8",
  "deposit" : "20000",
  "time" : "1970-01-19 10:07:05.005",
  "creditVal" : 0.0,
  "txHash" : "33aeffd4e55203d91183939ad35a9f0a2b0dc80cf1d63c93d4237102d1308a35",
  "status" : "unconsensus"
}
```

### 查询共识节点列表
查询共识节点列表
-**命令：getagents [pageNumber] [pageSize] [keyWord]**
| 参数              | 说明                                   |
| ----------------- | -------------------------------------- |
| [pageNumber];   | 列表页号位置                      |
| [pageSize]; | 每页显示条数                  |
| [keyWord];   | 匹配节点别名关键字 |
返回值

```
略 见示例
```
示例 获取第1页，共10条的节点列表
```
nuls>>> getagents 1 10
[ {
  "agentAddress" : "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8",
  "agentId" : "D1308A35",
  "commissionRate" : 10.0,
  "delHeight" : -1,
  "agentHash" : "33aeffd4e55203d91183939ad35a9f0a2b0dc80cf1d63c93d4237102d1308a35",
  "totalDeposit" : "0",
  "memberCount" : 0,
  "agentName" : null,
  "packingAddress" : "tNULSeBaMotNcjQ8E72uh6XituC8CFV2UBBAHo",
  "version" : null,
  "blockHeight" : 4262,
  "rewardAddress" : "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8",
  "deposit" : "20000",
  "time" : "1970-01-19 10:07:05.005",
  "creditVal" : 0.0,
  "txHash" : "33aeffd4e55203d91183939ad35a9f0a2b0dc80cf1d63c93d4237102d1308a35",
  "status" : "unconsensus"
} ]
```



### 加入共识（委托节点）

根据账户地址和节点agentHash，加入共识，至少需要2000NULS

- **命令：deposit &lt;address&gt; &lt;agentHash&gt; &lt;deposit&gt;**

| 参数              | 说明                                   |
| ----------------- | -------------------------------------- |
| &lt;address&gt;   | 账户地址，必填                         |
| &lt;agentHash&gt; | 节点的agentHash，必填                  |
| &lt;deposit&gt;   | 加入共识保证金，不能低于2000NULS，必填 |

返回信息 加入共识的交易hash，如果要退出这笔共识，则需要该hash。

```json
"f5b2622a2ca23710a0a1f28bd0cb9c054220ba0719275abca5e4a7750dcf933a"
```

示例

```shell
nuls>>> deposit tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8 33aeffd4e55203d91183939ad35a9f0a2b0dc80cf1d63c93d4237102d1308a35 200000
Please enter the password.
Enter your password:********
"f5b2622a2ca23710a0a1f28bd0cb9c054220ba0719275abca5e4a7750dcf933a"
```



### 退出共识（退出委托）

根据账户地址和加入共识时的交易hash来退出共识(委托)，单个账户多次委托节点时，每次委托的交易是独立的，所以退出时也要通过单次委托时的交易hash来退出对应的那一次委托，而不会一次退出所有委托。

- **命令：withdraw &lt;address&gt; &lt;txHash&gt;**

| 参数            | 说明                   |
| --------------- | ---------------------- |
| &lt;address&gt; | 账户地址，必填         |
| &lt;txHash&gt;  | 委托时的交易hash，必填 |

返回信息 退出共识交易hash

```json
"d8e1784239d73e064e83e448adcf0feec9ba8e56a4b55280d7a0a8149d9da545"
```

示例

```shell
nuls>>> withdraw tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8 f5b2622a2ca23710a0a1f28bd0cb9c054220ba0719275abca5e4a7750dcf933a 
Please enter the password.
Enter your password:********
"d8e1784239d73e064e83e448adcf0feec9ba8e56a4b55280d7a0a8149d9da545"
```



### 停止节点

停止节点，所有委托给节点的NULS将被退回，节点创建者账户的保证金将会被锁定72小时。

- **命令：stopagent &lt;address&gt;**

| 参数            | 说明           |
| --------------- | -------------- |
| &lt;address&gt; | 账户地址，必填 |

返回信息 停止节点交易hash

```json
"0020f15eecd7c85be76521ed6af4d58a3810f7df58e536481cff4a96af6d4fddec5f"
```

示例

```shell
nuls>>> stopagent Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
Please enter the password.
Enter your password:**********
"0020f15eecd7c85be76521ed6af4d58a3810f7df58e536481cff4a96af6d4fddec5f"
```


### 获取最新的区块头信息

获取最新的区块头信息

- **命令：getlatestblockheader**

返回信息

```json
{
  "hash" : "c244a7936821a58eff6daf117a6acf398d1c959c1b11edbb2abf01d753f01a45",//区块hash
  "preHash" : "3c775846e93468119aa73c9a84b712875d0730f8e9579cc2535be4662d415b46",//上一个区块hash
  "merkleHash" : "00edec12b2382d47829e3685b04c109aeac651ee7d2dbda40c1ea1245b8bb953",//merkle hash
  "time" : "1970-01-19 10:07:05.005", //打包时间
  "height" : 4295,//区块高度
  "txCount" : 1, //包含的交易数
  "blockSignature" : "463044022027db8f20882d0b37be2981587213f15fdd49110ad9e80c15b90485ad487372c902201e3eae9eca8fb6fde7424ab656300c42185923f0bae10120b58019e3bfb79456", //区块签名
  "size" : 246, //区块大小
  "packingAddress" : "tNULSeBaMt7c7sybfvP7iAC2p9d1ickHZvH9Sc",//打包地址
  "roundIndex" : 78141245,
  "consensusMemberCount" : 2,
  "roundStartTime" : "1970-01-19 10:07:05.005",
  "packingIndexOfRound" : 2,
  "mainVersion" : 1,
  "blockVersion" : 1,
  "stateRoot" : "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```

示例

```shell
nuls>>> getlatestblockheader
{
  "hash" : "c244a7936821a58eff6daf117a6acf398d1c959c1b11edbb2abf01d753f01a45",//区块hash
  "preHash" : "3c775846e93468119aa73c9a84b712875d0730f8e9579cc2535be4662d415b46",//上一个区块hash
  "merkleHash" : "00edec12b2382d47829e3685b04c109aeac651ee7d2dbda40c1ea1245b8bb953",//merkle hash
  "time" : "1970-01-19 10:07:05.005", //打包时间
  "height" : 4295,//区块高度
  "txCount" : 1, //包含的交易数
  "blockSignature" : "463044022027db8f20882d0b37be2981587213f15fdd49110ad9e80c15b90485ad487372c902201e3eae9eca8fb6fde7424ab656300c42185923f0bae10120b58019e3bfb79456", //区块签名
  "size" : 246, //区块大小
  "packingAddress" : "tNULSeBaMt7c7sybfvP7iAC2p9d1ickHZvH9Sc",//打包地址
  "roundIndex" : 78141245,
  "consensusMemberCount" : 2,
  "roundStartTime" : "1970-01-19 10:07:05.005",
  "packingIndexOfRound" : 2,
  "mainVersion" : 1,
  "blockVersion" : 1,
  "stateRoot" : "56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421"
}
```





### 查询区块头信息

根据区块高度或者区块hash，查询区块头信息，必须并且只能选择一种参数作为查询条件。

- **命令：getblockheader &lt;hash&gt; | &lt;height&gt;**

| 参数           | 说明         |
| -------------- | ------------ |
| &lt;hash&gt;   | 区块的hash值 |
| &lt;height&gt; | 区块的高度   |

返回信息

```json
见示例
```

示例 根据高度获取区块头

```shell
nuls>>> getblockheader 28115
{
  "hash" : "0020c40f471756c88e7487fcc0d428545232120071b58f35e450891237d7b41eb817",
  "preHash" : "0020fb1fd03cda7e2b6585256f4da85bdac7d8fc8bafa0740b8eb0ed577f3020b954",
  "merkleHash" : "0020474c5a353f235e8e8514328e1e98d6b653d4a5445473d160691e39121cd8b158",
  "time" : "2018-07-16 16:29:30",
  "height" : 28115,
  "txCount" : 2,
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",
  "roundIndex" : 662578,
  "consensusMemberCount" : 1,
  "roundStartTime" : "2018-07-16 16:29:20",
  "packingIndexOfRound" : 1,
  "reward" : "0.001",
  "fee" : "0.001",
  "confirmCount" : 6280,
  "size" : 204,
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100d25b815fa30376247692fad856d3984acf45c9b49edd3d222e3afdab3169520c02200565a486e33358301848bf3d704c187ff8b2d1e859c93b704f713abb984584bf"
}
```

### 创建智能合约
调用此接口在链上创建一个智能合约

- **命令：createcontract &lt;sender> &lt;gaslimt> &lt;price> &lt;contractCode>&lt;alias>  [remark]**

| 参数           | 说明         |
| -------------- | ------------ |
| &lt;sender&gt;   | 创建智能合约的账户地址 |
| &lt;gaslimt&gt; | 本次创建合约最大消耗的Gas   |
| &lt;price&gt; | 单价，每一个Gas值多少Na，Na是NULS的最小单位，1Nuls=1亿Na，系统最小单价是25Na/Gas   |
| &lt;contractCode&lt; | 合约代码的hex编码 |
| &lt;alias&lt; | 合约别名 |
| [remark]|备注|


返回信息 创建合约的交易hash和合约的地址

```
{
  "txHash" : "00205fb44fd0924a57857e71d06ec0549366b5d879b2cbd68488ed88a2dbf96c130f",  //交易hash
  "contractAddress" : "tNULSeBaN6ofkEqsPJmWVaeMpENTgmC5ifWtz9" //合约地址
}
```
示例 创建一个合约（contractCode 省略中间部分）

```
nuls>>> createcontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD 200000 25 504b03040a........000000800080051020000b31600000000 remarkdemo
The arguments structure: 
[ {
  "type" : "String",
  "name" : "name",
  "required" : true
}, {
  "type" : "String",
  "name" : "symbol",
  "required" : true
}, {
  "type" : "BigInteger",
  "name" : "initialAmount",
  "required" : true
}, {
  "type" : "int",
  "name" : "decimals",
  "required" : true
} ]
Please enter the arguments you want to fill in according to the arguments structure(eg. "a",2,["c",4],"","e" or "'a',2,['c',4],'','e'").
Enter the arguments:"KQB","KQB",10000,2
{
  "txHash" : "0020ec1d68eaed63e2db8649b0a39f16b7c5af24f86b787233f6ba6d577d7d090587",
  "contractAddress" : "tNULSeBaNBYK9MQcWWbfgFTHj2U4j8KQGDzzuK"
}
```
### 获取合约基本信息
获取智能合约的描述信息以及构造函数、调用方法的参数列表

- **命令：getcontractinfo &lt;contract address>**

| 参数           | 说明         |
| -------------- | ------------ |
| &lt;contract address&gt;   | 合约地址 |


返回信息

```
略 ，见示例
```
示例

```

nuls>>> getcontractinfo tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L
getcontractinfo tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L
{
  "createTxHash" : "00203a48dcfc26426152805be49830c72005b4648d0182bbf6c2e8980380364eb59f",
  "address" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
  "creater" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
  "createTime" : 1553563706022,
  "blockHeight" : 46,
  "isNrc20" : true,
  "nrc20TokenName" : "QKB",
  "nrc20TokenSymbol" : "QKB",
  "decimals" : 2,
  "totalSupply" : "200000000",
  "status" : "normal",
  "method" : [ {
    "name" : "<init>",
    "desc" : "(String name, String symbol, BigInteger initialAmount, int decimals) return void",
    "args" : [ {
      "type" : "String",
      "name" : "name",
      "required" : true
    }, {
      "type" : "String",
      "name" : "symbol",
      "required" : true
    }, {
      "type" : "BigInteger",
      "name" : "initialAmount",
      "required" : true
    }, {
      "type" : "int",
      "name" : "decimals",
      "required" : true
    } ],
    "returnArg" : "void",
    "view" : false,
    "event" : false,
    "payable" : false
  }，{
    "name" : "transfer",
    "desc" : "(Address to, BigInteger value) return boolean",
    "args" : [ {
      "type" : "Address",
      "name" : "to",
      "required" : true
    }, {
      "type" : "BigInteger",
      "name" : "value",
      "required" : true
    } ],
    "returnArg" : "boolean",
    "view" : false,
    "event" : false,
    "payable" : false
  }]
}

```

### 调用智能合约
调用智能合约提供的函数

- **命令：callcontract &lt;sender> &lt;gasLimit> &lt;price> &lt;contractAddress> &lt;methodName> &lt;value> [-d methodDesc] [-r remark]**

| 参数           | 说明         |
| -------------- | ------------ |
|&lt;senderAddress&gt;   | 调动合约的账户地址 |
|&lt;gasLimit>|本次合约执行最大消耗的Gas|
|&lt;price>|单价，每一个Gas值多少Na，Na是NULS的最小单位，1Nuls=1亿Na，系统最小单价是25Na/Gas|
|&lt;contractAddress|调用的合约地址|
|&lt;methodName>|合约的方法名|
|&lt;value>|如果要向合约转账，转账的数量|
|[-d methodDesc]|如果合约中有同名方法时，使用此方法来描述参数列表|
|[-r remark]|备注信息|

返回信息 本次调用的交易hash

```
"0020c9079e0f0454103adceed798d40171c41a8db04586dba966fbe7f2ab722583ad" //交易hash
```
示例 调用一个指定合约的NRC20-Token转账函数, 示例中`tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L`为NRC20合约地址，输入的参数为 接收地址和转账数量

```
nuls>>> callcontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD 200000 25 tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L transfer 0 -r call
callcontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD 200000 25 tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L transfer 0 -r call
Please Enter your account passwordzhoujun172
**********
Please enter the arguments according to the arguments structure(eg. "a",2,["c",4],"","e" or "'a',2,['c',4],'','e'"),
If this method has no arguments(Refer to the command named "getcontractinfo" for the arguments structure of the method.), return directly.
Enter the arguments:"tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG",2
"0020c9079e0f0454103adceed798d40171c41a8db04586dba966fbe7f2ab722583ad"
```

### 删除智能合约
停止一个可用的智能合约

- **命令：deletecontract &lt;senderAddress> &lt;contractAddress>**

| 参数           | 说明         |
| -------------- | ------------ |
| &lt;senderAddress&gt;   | 调用合约的账户地址 |
| &lt;contractAddress>|调用的合约地址|
返回值 交易hash

```
"0020c55e885dd910dad0b2c49f5b71b62691b57884ca21fd47668f1f5cadc84daad6" //交易hash
```
示例

```
nuls>>> deletecontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L
deletecontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L
Please enter your account passwordzhoujun172
**********
"0020c55e885dd910dad0b2c49f5b71b62691b57884ca21fd47668f1f5cadc84daad6"
```

### 调用合约视图方法
调用合约的视图方法，会立即返回结果，不会产生交易

- **命令：deletecontractviewcontract &lt;contractAddress> &lt;methodName> [-d methodDesc] --view contract**

| 参数           | 说明         |
| -------------- | ------------ |
|&lt;contractAddress>|调用的合约地址|
|&lt;methodName>|调用的方法|
|[-d methodDesc]|如果合约中有同名方法时，使用此方法来描述参数列表|
返回值

```
根据具体调用函数返回值不同
```
示例 调用NRC20-Token合约的查询Token余额函数查询指定地址的Token余额

```
nuls>>> viewcontract tNULSeBaN6pwyVwXjfpm5BMH5eiirvthoZDVEc balanceOf
viewcontract tNULSeBaN6pwyVwXjfpm5BMH5eiirvthoZDVEc balanceOf
Please enter the arguments according to the arguments structure(eg. "a",2,["c",4],"","e" or "'a',2,['c',4],'','e'"),
If this method has no arguments(Refer to the command named "getcontractinfo" for the arguments structure of the method.), return directly.
Enter the arguments:"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD"
"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD"
{
  "result" : "20000000"
}
```

### 向合约地址转账

向指定的合约地址转入主网币

- **命令：transfertocontract &lt;senderAddress> &lt;contractAddress> &lt;amount> [remark]**

| 参数           | 说明         |
| -------------- | ------------ |
|&lt;senderAddress>|转出账户地址|
|&lt;contractAddress|转入的合约地址|
|&lt;amount>|转入数量|
|[remark]|备注|
返回值 交易hash

```
"0020f5d6b87c246595d1b060a3fa8bac6a2992490e38fdfcad40db2a3908297e7979"
```
示例 向指定合约转入2个NULS

```
nuls>>> transfertocontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD tNULSeBaN1NRtaj1ZPAmEmTqcpkyCLqv64PR7U 2 remark
Please enter your account password
**********
"0020f5d6b87c246595d1b060a3fa8bac6a2992490e38fdfcad40db2a3908297e7979"
```

### token转账

NRC20 token转账

- **命令：tokentransfer &lt;formAddress> &lt;toAddress> &lt;contractAddress> &lt;amount> [remark]**

| 参数           | 说明         |
| -------------- | ------------ |
|&lt;formAddress>|转出账户地址|
|&lt;toAddress|转入的账户地址|
|&lt;contractAddress>|合约地址|
|&lt;amount>|转入数量|
|[remark]|备注|
返回值 交易hash

```
"002022dffd96026b493945d2cf9ad276c4bc9655c735b72e6fcc85a2d19f6cbe25e8"
```
示例 token转账:

```
nuls>>> tokentransfer tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD  tNULSeBaNBh9RUsVrVmMy8NHcZJ2BhNVsM1Vta  tNULSeBaN6pwyVwXjfpm5BMH5eiirvthoZDVEc 200000 25 10000
Please enter your account password
**********
"002022dffd96026b493945d2cf9ad276c4bc9655c735b72e6fcc85a2d19f6cbe25e8"
```


### 获取合约交易

获取合约的交易信息, 包含交易详情，合约调用参数，合约执行结果

- **命令：getcontracttx &lt;hash>**

| 参数           | 说明         |
| -------------- | ------------ |
| &lt;hash>|交易hash|

返回值

```
略 见示例
```
示例

```
nuls>>> getcontracttx 00203a48dcfc26426152805be49830c72005b4648d0182bbf6c2e8980380364eb59f
getcontracttx 00203a48dcfc26426152805be49830c72005b4648d0182bbf6c2e8980380364eb59f
{
  "hash" : "00203a48dcfc26426152805be49830c72005b4648d0182bbf6c2e8980380364eb59f",
  "type" : "100",
  "time" : "2019-03-26 09:28:26",
  "blockHeight" : 46,
  "fee" : 0.0,
  "value" : 0.0,
  "remark" : null,
  "scriptSig" : "210318f683066b45e7a5225779061512e270044cc40a45c924afcf78bb7587758ca0004630440220112a446b2a684510b4016fa97b92d2f3fead03128f0f658c99a6a8d230d05d4e02201e23a2f6e68aacdff2d117bd5bbe7ce2440babfe4211168eafbae41acad5d505",
  "status" : "confirm",
  "confirmCount" : 0,
  "size" : 6686,
  "inputs" : [ {
    "address" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
    "assetsChainId" : 2,
    "assetId" : 1,
    "amount" : "5700000",
    "nonce" : "ffffffff",
    "locked" : 0,
    "value" : 0.0
  } ],
  "outputs" : [ ],
  "txData" : {
    "data" : {
      "sender" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
      "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
      "value" : 0.0,
      "hexCode" : "504b03040a0000080...........31600000000",
      "gasLimit" : 200000,
      "price" : "0.00000025",
      "args" : [ [ "QKB" ], [ "QKB" ], [ "2000000" ], [ "2" ] ]
    }
  },
  "contractResult" : {
    "success" : true,
    "errorMessage" : null,
    "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
    "result" : null,
    "gasLimit" : 200000,
    "gasUsed" : 14029,
    "price" : "0.00000025",
    "totalFee" : 0.0,
    "txSizeFee" : 0.0,
    "actualContractFee" : 0.0,
    "refundFee" : 0.0,
    "stateRoot" : "be76399c41a8cb4be5ecf80e04dab36830b124cb1c43fea6ca69ae62259899ba",
    "value" : 0.0,
    "stackTrace" : null,
    "balance" : 0.0,
    "transfers" : [ ],
    "events" : [ "{\"contractAddress\":\"tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L\",\"blockNumber\":46,\"event\":\"TransferEvent\",\"payload\":{\"from\":null,\"to\":\"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD\",\"value\":\"200000000\"}}" ],
    "tokenTransfers" : [ {
      "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
      "from" : null,
      "to" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
      "value" : "200000000",
      "name" : "QKB",
      "symbol" : "QKB",
      "decimals" : 2
    } ],
    "remark" : "create"
  }
}


```


### 获取合约执行结果

获取一个合约的执行结果

- **命令:getcontractresult &lt;hash>**

| 参数           | 说明         |
| -------------- | ------------ |
|&lt;hash>|交易hash|

返回值

```
略 见示例
```
示例

```
nuls>>> getcontractresult 00203a48dcfc26426152805be49830c72005b4648d0182bbf6c2e8980380364eb59f
{
  "success" : true,
  "errorMessage" : null,
  "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
  "result" : null,
  "gasLimit" : 200000,
  "gasUsed" : 14029,
  "price" : "0.00000025",
  "totalFee" : 0.0,
  "txSizeFee" : 0.0,
  "actualContractFee" : 0.0,
  "refundFee" : 0.0,
  "stateRoot" : "be76399c41a8cb4be5ecf80e04dab36830b124cb1c43fea6ca69ae62259899ba",
  "value" : 0.0,
  "stackTrace" : null,
  "balance" : 0.0,
  "transfers" : [ ],
  "events" : [ "{\"contractAddress\":\"tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L\",\"blockNumber\":46,\"event\":\"TransferEvent\",\"payload\":{\"from\":null,\"to\":\"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD\",\"value\":\"200000000\"}}" ],
  "tokenTransfers" : [ {
    "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
    "from" : null,
    "to" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
    "value" : "200000000",
    "name" : "QKB",
    "symbol" : "QKB",
    "decimals" : 2
  } ],
  "remark" : "create"
}

```


### 获取合约构造函数

获取创建指定合约时需要传入的参数列表

- **命令：getcontractcontructor &lt;contractCode>**

| 参数           | 说明         |
| -------------- | ------------ |
|&lt;contractCode>|合约代码的hex编码|

返回值

```
略 见示例
```
示例

```
nuls>>> getcontractcontructor 504b03040a000008000.........20000b31600000000
{
  "constructor" : {
    "name" : "<init>",
    "desc" : "(String name, String symbol, BigInteger initialAmount, int decimals) return void",
    "args" : [ {
      "type" : "String",
      "name" : "name",
      "required" : true
    }, {
      "type" : "String",
      "name" : "symbol",
      "required" : true
    }, {
      "type" : "BigInteger",
      "name" : "initialAmount",
      "required" : true
    }, {
      "type" : "int",
      "name" : "decimals",
      "required" : true
    } ],
    "returnArg" : "void",
    "view" : false,
    "event" : false,
    "payable" : false
  },
  "isNrc20" : true
}

```


### 获取指定账户创建的合约列表

获取指定账户地址所创建的合约列表

- **命令：getaccountcontracts &lt;createAddress>**

| 参数           | 说明         |
| -------------- | ------------ |
|&lt;createAddress>|账户地址|

返回值

```
{
  "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
  "createTime" : "2019-03-26 09:28:26.026",
  "height" : 46,
  "confirmCount" : 402,
  "remarkName" : null,
  "status" : 2,
  "msg" : null,
  "create" : true
}
```
示例

```
nuls>>> getaccountcontracts tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD
[ {
  "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
  "createTime" : "2019-03-26 09:28:26.026",
  "height" : 46,
  "confirmCount" : 402,
  "remarkName" : null,
  "status" : 2,
  "msg" : null,
  "create" : true
}, {
  "contractAddress" : "tNULSeBaMzsHrbMy2VK23RzwjkXS1qo2ycG5Cg",
  "createTime" : "2019-03-25 16:08:25.025",
  "height" : 253,
  "confirmCount" : 195,
  "remarkName" : null,
  "status" : 0,
  "msg" : null,
  "create" : true
}, {
  "contractAddress" : "tNULSeBaNBYK9MQcWWbfgFTHj2U4j8KQGDzzuK",
  "createTime" : "2019-03-25 15:33:54.054",
  "height" : 46,
  "confirmCount" : 402,
  "remarkName" : null,
  "status" : 0,
  "msg" : null,
  "create" : true
} ]
```

### 查询网络信息

查询网络基本信息

- **命令：network info**

返回信息

```json
{
  "localBestHeight" : 35317,//本地最新区块高度
  "netBestHeight" : 35317,//网络最新区块高度
  "timeOffset" : "0ms",//网络时间偏移值
  "inCount" : 0,//被动连接节点数量
  "outCount" : 1//主动连接节点数量
}
```

示例

```shell
nuls>>> network info
{
  "localBestHeight" : 35317,
  "netBestHeight" : 35317,
  "timeOffset" : "0ms",
  "inCount" : 0,
  "outCount" : 1
}
```



### 查询网络节点IP

查询网络节点IP

- **命令：network nodes**

返回信息

```json
见示例
```

示例 根据高度获取区块

```shell
nuls>>> network nodes
[ {
  "blockHash" : "8c3a57eeda7ed74926eba6e007b11fca9363dc22019da19415e0a7731a9b1bdf",
  "blockHeight" : 4401,
  "peer" : "192.168.1.191:18001"
}, {
  "blockHash" : "8c3a57eeda7ed74926eba6e007b11fca9363dc22019da19415e0a7731a9b1bdf",
  "blockHeight" : 4401,
  "peer" : "192.168.1.143:18001"
} ]
```



### 在主链注册侧链

侧链需要进行跨链交易，需要先在主链完成注册，此命令需要在主网节点运行

- **命令： registercrosschain &lt;address> &lt;chainId> &lt;chainName> &lt;addressPrefix> &lt;magicNumber> &lt;maxSignatureCount> &lt;signatureBFTRatio>&lt;verifierList>&lt;assetId> &lt;symbol> &lt;assetName> &lt;initNumber> [decimalPlaces] [minAvailableNodeNum] [txConfirmedBlockNum]**

| 参数                   | 说明                                      |
| ---------------------- | ----------------------------------------- |
| &lt;address>           | 注册跨链费用支付账户                      |
| &lt;chainId>           | 注册的链id                                |
| &lt;chainName>         | 注册的链名称                              |
| &lt;addressPrefix>     | 地址前缀                                  |
| &lt;magicNumber>       | 注册链的运行的网络魔法参数                |
| &lt;maxSignatureCount> | 注册链最大签名数量                        |
| &lt;signatureBFTRatio> | 拜占庭比例 [67-100]                       |
| &lt;verifierList>      | 注册链的初始验证人列表                    |
| &lt;assetId>           | 注册的资产id                              |
| &lt;symbol>            | 资产简称 e.g. BTC                         |
| &lt;assetName>         | 资产名称                                  |
| &lt;initNumber>        | 资产发现总量                              |
| [decimalPlaces]        | 资产小数位数 默认8                        |
| [minAvailableNodeNum]  | 跨链交易可用条件：最小可用节点数量，默认5 |

返回值

```
{
  "mainNetVerifierSeeds" : "tNULSeBaMkrt4z9FYEkkR9D6choPVvQr94oYZp",#主网验证人列表
  "txHash" : "25b3a57507086d5d895895b41ef744a160f3251f4e5db118b7ca833eb6c9fff3",#交易hash
  "mainNetCrossConnectSeeds" : "192.168.1.192:8088"#主网跨链种子连接节点
}

```

示例

```
nuls>>>registercrosschain tNULSeBaMqywZjfSrKNQKBfuQtVxAHBQ8rB2Zn 12 nbtc btc 20197777 12  67 LJScusmPf5EfdEwbA8nRZEYqMbRXKp6y3oCb 1 btc bt 100000000 8 1

Please enter the password.
Enter your password:**********
{
  "mainNetVerifierSeeds" : "tNULSeBaMkrt4z9FYEkkR9D6choPVvQr94oYZp",
  "txHash" : "25b3a57507086d5d895895b41ef744a160f3251f4e5db118b7ca833eb6c9fff3",
  "mainNetCrossConnectSeeds" : "192.168.1.192:8088"
}

```



### 在主链添加需要跨链交易的侧链资产

侧链是多资产的，需要在已存在的链上进行跨链资产的添加，此命令需要在主网节点运行

- **命令： addcrossasset &lt;address> &lt;chainId> &lt;assetId> &lt;symbol> &lt;assetName> &lt;initNumber> [decimalPlaces] **

| 参数            | 说明                     |
| --------------- | ------------------------ |
| &lt;address>    | 添加资产指令费用支付账户 |
| &lt;chainId>    | 注册的链id               |
| &lt;assetId>    | 注册的资产id             |
| &lt;symbol>     | 资产简称 e.g. BTC        |
| &lt;assetName>  | 资产名称                 |
| &lt;initNumber> | 资产发现总量             |
| [decimalPlaces] | 资产小数位数 默认8       |

返回值

```
  "txHash" : "25b3a57507086d5d895895b41ef744a160f3251f4e5db118b7ca833eb6c9fff3",#交易hash
```

示例

```
nuls>>>addcrossasset tNULSeBaMqywZjfSrKNQKBfuQtVxAHBQ8rB2Zn  10 2 yuer CCY 300000000 8

Please enter the password.
Enter your password:**********
 "25b3a57507086d5d895895b41ef744a160f3251f4e5db118b7ca833eb6c9fff3"
  

```



### 在主链移除跨链交易的侧链资产

侧链是多资产的，在主网上要停止该资产的跨链交易时，使用移除指令，如果剩下最后一个资产，则该指令执行后，对应的链也将停止工作。此命令需要在主网节点运行

- **命令： disablecrossasset &lt;address> &lt;chainId> &lt;assetId>**

| 参数         | 说明                   |
| ------------ | ---------------------- |
| &lt;address> | 添加资产时候使用的地址 |
| &lt;chainId> | 移除注册的链id         |
| &lt;assetId> | 移除注册的资产id       |

返回值

```
  "txHash" : "25b3a57507086d5d895895b41ef744a160f3251f4e5db118b7ca833eb6c9fff3",#交易hash
```

示例

```
nuls>>>disablecrossasset tNULSeBaMqywZjfSrKNQKBfuQtVxAHBQ8rB2Zn  10 3
Please enter the password.
Enter your password:**********
 "25b3a57507086d5d895895b41ef744a160f3251f4e5db118b7ca833eb6c9fff3"
  

```



### 在主链恢复侧链

侧链在主网注册并且删除后，需要恢复，则可以通过如下命令进行恢复并更新信息，此命令需要在主网节点运行

- **命令： updatecrosschain &lt;address> &lt;chainId> &lt;chainName> &lt;addressPrefix> &lt;magicNumber> &lt;maxSignatureCount> &lt;signatureBFTRatio>&lt;verifierList>&lt;assetId> &lt;symbol> &lt;assetName> &lt;initNumber> [decimalPlaces] [minAvailableNodeNum] **

| 参数                   | 说明                                      |
| ---------------------- | ----------------------------------------- |
| &lt;address>           | 注册跨链费用支付账户                      |
| &lt;chainId>           | 注册的链id                                |
| &lt;chainName>         | 注册的链名称                              |
| &lt;addressPrefix>     | 地址前缀                                  |
| &lt;magicNumber>       | 注册链的运行的网络魔法参数                |
| &lt;maxSignatureCount> | 注册链最大签名数量                        |
| &lt;signatureBFTRatio> | 拜占庭比例 [67-100]                       |
| &lt;verifierList>      | 注册链的初始验证人列表                    |
| &lt;assetId>           | 注册的资产id                              |
| &lt;symbol>            | 资产简称 e.g. BTC                         |
| &lt;assetName>         | 资产名称                                  |
| &lt;initNumber>        | 资产发现总量                              |
| [decimalPlaces]        | 资产小数位数 默认8                        |
| [minAvailableNodeNum]  | 跨链交易可用条件：最小可用节点数量，默认5 |

返回值

```
{
  "mainNetVerifierSeeds" : "tNULSeBaMkrt4z9FYEkkR9D6choPVvQr94oYZp",#主网验证人列表
  "txHash" : "25b3a57507086d5d895895b41ef744a160f3251f4e5db118b7ca833eb6c9fff3",#交易hash
  "mainNetCrossConnectSeeds" : "192.168.1.192:8088"#主网跨链种子连接节点
}

```

示例

```
nuls>>>registercrosschain tNULSeBaMqywZjfSrKNQKBfuQtVxAHBQ8rB2Zn 12 nbtc btc 20197777 12  67 LJScusmPf5EfdEwbA8nRZEYqMbRXKp6y3oCb 1 btc bt 100000000 8 1

Please enter the password.
Enter your password:**********
{
  "mainNetVerifierSeeds" : "tNULSeBaMkrt4z9FYEkkR9D6choPVvQr94oYZp",
  "txHash" : "25b3a57507086d5d895895b41ef744a160f3251f4e5db118b7ca833eb6c9fff3",
  "mainNetCrossConnectSeeds" : "192.168.1.192:8088"
}

```



### 查询侧链注册信息

在主网查询某条侧链的注册信息

- **命令：crosschaininfo &lt;chainId>**

| 参数         | 说明       |
| ------------ | ---------- |
| &lt;chainId> | 注册链的id |

返回值

```{
 {
  "chainId" : 3,
  "chainName" : "testchain",
  "addressType" : "1",
  "addressPrefix" : "TBTC",
  "magicNumber" : 123456,
  "minAvailableNodeNum" : 5,
  "regAddress" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
  "regTxHash" : "6c29d99c2b02cfc766ef25bee2ea619610a5fce1d778c3038885111f590ae312",
  "createTime" : 1557739548367,
  "verifierList" : [ "TBTCdusmPf5EfdEwbA8nRZEYqMbRXKp6y3oCb" ],
  "signatureByzantineRatio" : 67,
  "maxSignatureCount" : 12,
  "selfAssetKeyList" : [ "3-10" ],
  "totalAssetKeyList" : [ "3-10" ]，
  "mainNetVerifierSeeds" : "tNULSeBaMkrt4z9FYEkkR9D6choPVvQr94oYZp",
  "mainNetCrossConnectSeeds" : "192.168.1.192:8088",
  "enable" : true
}
```

返回参数说明

| parameter                | required | type   | description                                |
| ------------------------ | -------- | ------ | ------------------------------------------ |
| chainId                  | true     | int    | 链标识                                     |
| assetId                  | true     | int    | 资产id                                     |
| chainName                | true     | string | 链名称                                     |
| addressType              | true     | int    | 链上创建的账户的地址类型：1生态内2非生态内 |
| addressPrefix            | true     | string | 地址前缀 1-5个 大写字母或数字              |
| magicNumber              | true     | string | 网络魔法参数                               |
| minAvailableNodeNum      | true     | int    | 最小可用节点数量                           |
| regAddress               | true     | string | 注册支付地址                               |
| regTxHash                | true     | string | 交易hash                                   |
| createTime               | true     | long   | 交易提交时间 ，1970相差的秒数              |
| verifierList             | true     | string | 验证人列表                                 |
| signatureByzantineRatio  | true     | int    | 拜占庭比例 [67-100]                        |
| maxSignatureCount        | true     | int    | 最大签名数                                 |
| symbol                   | true     | string | 资产符号                                   |
| assetName                | true     | string | 资产名称                                   |
| initNumber               | true     | string | 资产初始值                                 |
| decimalPlaces            | true     | int    | 最小资产可分割位数                         |
| mainNetVerifierSeeds     | true     | string | 主网种子验证人地址                         |
| mainNetCrossConnectSeeds | true     | string | 主网种子连接节点地址                       |
| enable                   | true     | string | 是否使用中                                 |

示例

```
nuls>>> crosschaininfo 10
{
  "chainId" : 10,
  "chainName" : "nuls10",
  "addressType" : "1",
  "addressPrefix" : "LJS2",
  "magicNumber" : 2019888,
  "minAvailableNodeNum" : 1,
  "regAddress" : "tNULSeBaMqywZjfSrKNQKBfuQtVxAHBQ8rB2Zn",
  "regTxHash" : "14539bbcb00b26e545168aa241c4484cf8aff42f373a2019959681e73f0acea8",
  "createTime" : 1565229647,
  "verifierList" : [ "LJS2dusmPf5EfdEwbA8nRZEYqMbRXKp6y3oCb" ],
  "signatureByzantineRatio" : 67,
  "maxSignatureCount" : 12,
  "selfAssetKeyList" : [ "10-1" ],
  "totalAssetKeyList" : [ "10-1" ],
  "mainNetVerifierSeeds" : "tNULSeBaMkrt4z9FYEkkR9D6choPVvQr94oYZp",
  "mainNetCrossConnectSeeds" : "192.168.1.192:8088",
  "enable" : true
}
```



### 查询侧链注册资产信息

在主网查询某条侧链资产的注册信息

- **命令：crossassetinfo&lt;chainId>&lt;assetId>**

| 参数         | 说明       |
| ------------ | ---------- |
| &lt;chainId> | 注册链的id |
| &lt;assetId> | 资产id     |

返回值

```{
 {
  "chainId" : 10,
  "assetId" : 2,
  "symbol" : "CCY",
  "assetName" : "yuer",
  "depositNuls" : "100000000000",
  "destroyNuls" : "20000000000",
  "initNumber" : "30000000000",
  "decimalPlaces" : 2,
  "enable" : false,
  "createTime" : 1565229428,
  "address" : "tNULSeBaMqywZjfSrKNQKBfuQtVxAHBQ8rB2Zn",
  "txHash" : "612eda872c6ca16c5a5f63cce70a64ac15852e2b3a403309b0d963d22d6391bc"
}
```

返回参数说明

| parameter     | required | type    | description                  |
| ------------- | -------- | ------- | ---------------------------- |
| chainId       | true     | int     | 链标识                       |
| assetId       | true     | int     | 资产id                       |
| &lt;symbol>   | true     | string  | 资产简称 e.g. BTC            |
| assetName     | true     | string  | 资产名称                     |
| depositNuls   | true     | long    | 抵押的主网资产数量           |
| destroyNuls   | true     | long    | 销毁的主网资产数量           |
| initNumber    | true     | string  | 资产初始值                   |
| decimalPlaces | true     | int     | 资产可切割位数               |
| enable        | true     | boolean | 是否可用 true可用,false 停用 |
| createTime    | true     | long    | 交易产生时间                 |
| address       | true     | String  | 交易支付地址                 |
| txHash        | true     | String  | 交易hash                     |

示例

```
nuls>>> crossassetinfo 10 2
{
  "chainId" : 10,
  "assetId" : 2,
  "symbol" : "CCY",
  "assetName" : "yuer",
  "depositNuls" : "100000000000",
  "destroyNuls" : "20000000000",
  "initNumber" : "30000000000",
  "decimalPlaces" : 2,
  "enable" : false,
  "createTime" : 1565229429,
  "address" : "tNULSeBaMqywZjfSrKNQKBfuQtVxAHBQ8rB2Zn",
  "txHash" : "612eda872c6ca16c5a5f63cce70a64ac15852e2b3a403309b0d963d22d6391bc"
}

```

### 创建跨链交易
- **命令：createcrosstx &lt;formAddress> &lt;toAddress> &lt;assetChainId> &lt;assetId> &lt;amount> [remark]**


| 参数           | 说明         |
| -------------- | ------------ |
|&lt;formAddress>|转出地址|
|&lt;toAddress>|转入地址|
|&lt;assetChainId>|转账资产的chainId|
|&lt;assetId>|转账资产id|
|&lt;amount>|转账资产数量|
|&lt;remark>|转账备注|
返回值:交易hash
```
529bb34c0f4760fa55dd98b92d3e913ed2306b7ac1f93c4491007e266bb04ef5
```
示例

```
nuls>>> createcrosstx tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD M9busmFhQeu1Efn6rDyeQkFjHxv2dSzkuH8 2 1 1
Please enter the password.
Enter your password:**********
529bb34c0f4760fa55dd98b92d3e913ed2306b7ac1f93c4491007e266bb04ef5
```
### 查询跨链交易确认状态
- **命令：getcrosstxstate  &lt;txHash>**

| 参数           | 说明         |
| -------------- | ------------ |
|&lt;txHash>|交易hash|

返回值

```
Confirmed | Unconfirmed
```
示例

```
nuls>>> getcrosstxstate 529bb34c0f4760fa55dd98b92d3e913ed2306b7ac1f93c4491007e266bb04ef5
Unconfirmed
```


### 退出钱包命令程序

退出操作钱包的命令行程序，不会退出已启动的钱包节点。

- **命令：exit**

示例

```shell
nuls>>> exit
```
