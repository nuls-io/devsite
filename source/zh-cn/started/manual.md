## NULS-Wallet-Linux64 使用指南

### 介绍

​	本文档为NULS主网Linux版全节点钱包的使用指南，阅读本文档前用户需了解Linux系统的基本操作和使用方式，本文介绍了在Linux系统中如何利用NULS钱包创建账户、导入账户、转账、建立节点、委托等操作。我们建议用户利用Linux系统服务器建立稳定的NULS节点。

### 版本更新记录

|  版本  |  更新日期  |        内容        |
| :----: | :--------: | :----------------: |
| V1.0.0 | 2018-07-12 | 主网正式版全部功能 |

### 准备

#### 服务器硬件配置

- 建立NULS节点的服务器不低于如下配置：

  |     CPU     | 内存 |   硬盘   |  宽带   |
  | :---------: | :---: | :------: | :-----: |
  | 四核 3.0GHz | 16G  | 128G硬盘 | 20M上行 |

- 推荐配置

  |     CPU     | 内存 |   硬盘   |   宽带   |
  | :---------: | :---: | :------: | :------: |
  | 八核 3.0GHz | 32G  | 256G硬盘 | 100M上行 |



#### 系统及内核版本

**Linux系统**

- CentOS (推荐)

Linux内核版本推荐使用 2.6.32及以上

### 开始

#### 下载

- 最新版本的全节点钱包NULS官网下载地址：http://nuls.io/wallet；GitHub地址：https://github.com/nuls-io/nuls-wallet-release

- 进入[NULS官网钱包下载](http://nuls.io/wallet)界面后，选择Linux download，我们提供了MEGA和百度云盘两种下载方式，用户可自行选择。

  Linux系统中下载v1.0.0版的钱包可以使用如下命令：

  ```shell
  $ wget https://media.githubusercontent.com/media/nuls-io/nuls-wallet-release/master/NULS-Wallet-linux64-1.0.0.tar.gz
  ```

  注：如果后续有其他版本，下载地址可能会不同。

#### 安装

- 在Linux中解压已下载的文件

  ```shell
  $ tar -zxf NULS-Wallet-linux64-1.0.0.tar.gz
  ```

#### 运行

- 进入解压后的bin目录，并运行启动脚本，启动全节点钱包

  ```shell
  $ cd bin
  $ ./start.sh
  ```

### 使用钱包

#### 快速入门

- 在确定钱包已经启动后，启动钱包的命令行程序，可对钱包进行操作。

  进入bin目录，执行如下命令：

  ```shell
  $ ./cmd.sh
  ```

  将会出现NULS命名输入提示符`nuls>>>  ` ，然后可直接输入NULS钱包操作命令，来进行操作。

  例如，创建账户的示例如下：

  ```shell
  nuls>>> create
  Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
  Enter your password:*********
  Please confirm new password:*********
  [ "Nse9EtaRwgVgN42pxURgZjUR33LUx1j1" ]
  nuls>>>
  ```

  执行`create`命令表示创建单个账户，然后输入密码，以及再次确认输入的密码，创建成功后将会返回账户的地址。



### 约定

- 设置密码规则：密码长度在8至20位，必须同时包含字母和数字。
- 命令参数说明： &lt;parameter&gt; 表示必填参数；[parameter] 表示选填参数。"|" 在参数中表示或者，表示前后参数只能选其一。

### 钱包命令

#### 帮助命令

输出打印所有的命令，

- **命令： help [-a] **

| 参数 | 说明                 |
| :--- | :------------------- |
| -a   | 格式化打印命令，选填 |

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
```



#### 创建账户

创建账户，返回账户地址集合

- **命令： create [number] **

| 参数     | 说明                 |
| :------- | :------------------- |
| [number] | 创建账户的数量，选填 |

创建账户时，将会提示输入密码，如果账户不需要密码可以不用输入，直接enter；

返回账户集合

```json
[ "NsdwsD8n3GrW9Sx43eLZ3xv8C858ovE2", "Nse6iqzBZsBtL5c46xaHhAhAqVDv3zQQ" ]
```

示例 创建2个没有密码的账户

```shell
nuls>>> create 2
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:
[ "NsdwsD8n3GrW9Sx43eLZ3xv8C858ovE2", "Nse6iqzBZsBtL5c46xaHhAhAqVDv3zQQ" ]
```



#### 备份账户

备份账户，将生成一个名称为账户地址，扩展名为.keystore的文件，该文件为账户的备份文件

- **命令：backup &lt;address&gt; [path]**

| 参数            | 说明                                                 |
| --------------- | ---------------------------------------------------- |
| &lt;address&gt; | 账户地址，必填                                       |
| [path]          | 文件生成备份文件的目标文件夹，默认为当前文件夹，选填 |

注意：备份有密码的账户时需要输入账户当前密码，将来导入此备份文件生成账户时，要验证此密码；备份一个没有密码的账户是允许的，但是是非常不安全的，我们不建议这样做。

返回信息

```shell
The path to the backup file is /nuls/bin/NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy.keystore
```

示例 备份一个有密码的账户

```shell
nuls>>> backup NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy
Please enter the password.
Enter your password:**********
The path to the backup file is /nuls/bin/NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy.keystore
```



#### 移除账户

根据账户地址移除本地账户，如果账户已加密，则需要输入密码

- **命令：remove &lt;address&gt; **

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息

```json
Success
```

示例

```shell
nuls>>> remove NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy
Please enter the password.
Enter your password:**********
Success
```



#### 设置账户密码

根据账户地址对未加密的账户设置密码，不能对已经有密码的账户进行设置密码的操作。

- **命令：setpwd &lt;address&gt; **

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息

```json
Success
```

示例

```shell
nuls>>> setpwd Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:**********
Please confirm new password:**********
Success
```



#### 修改账户密码

根据账户地址对已加密的账户修改密码，不能对未加密的账户进行修改密码的操作；修改密码时将会验证旧密码。

- **命令：resetpwd &lt;address&gt; **

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息

```json
Success
```

示例

```shell
nuls>>> resetpwd Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
Enter your old password:**********
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:**********
Please confirm new password:**********
Success
```



#### 设置别名

给账户设置一个别名，如果用此账户建立节点，别名将作为节点来源显示

- **命令：setalias &lt;address&gt; &lt;alias&gt;**

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |
| &lt;alias&gt;   | 别名名称，必填   |

返回信息 交易hash

```json
"0020f94f36aefd59f9cca9bff3c018fc287dc6c0bcd7fbeb047133cadb5747e7d98d"
```

示例

```shell
nuls>>> setalias Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT nuls_alias
"0020f94f36aefd59f9cca9bff3c018fc287dc6c0bcd7fbeb047133cadb5747e7d98d"
```



#### 导入账户keystore

导入账户keystore文件，生成本地账户，如果本地已有该账户将无法导入。

- **命令：importkeystore &lt;path&gt; **

| 参数         | 说明                           |
| ------------ | ------------------------------ |
| &lt;path&gt; | 待导入的keystore文件地址，必填 |

注意：导入keystore文件生成账户时，如果该keystore是加密的要验证备份keystore时的密码。

返回信息 导入的账户地址

```json
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```

示例

```shell
nuls>>> importkeystore /home/charlie/bin/NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy.keystore
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:**********
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```



#### 导入账户私钥

导入账户私钥，生成本地账户，如果本地已有该账户将无法导入。

- **命令：import &lt;privatekey&gt; **

| 参数               | 说明             |
| ------------------ | ---------------- |
| &lt;privatekey&gt; | 账户的私钥，必填 |

注意：导入私钥时，可以设置新的密码，如果账户不需要加密则不用输入新密码。

返回信息 导入的账户地址

```json
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```

示例

```shell
nuls>>> import 00a166d10c2cc4cd8f76449ff699ab3eee44fe4f82b4bb866f7bba02751a6fd655
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:**********
Please confirm new password:**********
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```



#### 导入账户私钥(覆盖导入)

导入账户私钥，生成本地账户，如果本地已有该账户将执行覆盖导入。

- **命令：import &lt;privatekey&gt; **

| 参数               | 说明             |
| ------------------ | ---------------- |
| &lt;privatekey&gt; | 账户的私钥，必填 |

注意：导入私钥时，可以设置新的密码，如果账户不需要加密则不用输入新密码。

覆盖导入：如果本地已存在该账户，执行覆盖导入后，导入前账户的密码将会被改为新设置的密码，如果本次导入未给账户设置密码，那账户将变成未加密账户(即使导入之前的账户是加密的)。

返回信息 导入的账户地址

```json
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```

示例

```shell
nuls>>> import 00a166d10c2cc4cd8f76449ff699ab3eee44fe4f82b4bb866f7bba02751a6fd655
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:**********
Please confirm new password:**********
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```



#### 查询账户信息

根据账户地址查询账户信息

- **命令：getaccount &lt;address&gt;**

| 参数            | 说明           |
| --------------- | :------------- |
| &lt;address&gt; | 账户地址，必填 |

返回信息

```json
{
  "address" : "NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy",//账户地址
  "alias" : null,//别名
  "pubKey" : "03f364bae9bb632a9b957522f150cb501dbc950e3700cff7a3679ed8820c486875",//公钥
  "priKey" : "",//私钥(如果账户设置了密码，该项为空)
  "encryptedPriKey" : "712149fad00350cdfee4d20850a9e5c1e9d7e9c1562dabc593cbc9b5ac57e99f1549748ff2421b3f6830f34bff7c69d8",//加密后的私钥(如果账户没有设置了密码，该项为空)
  "extend" : null,
  "createTime" : "2018-07-13 11:39:14",//创建时间
  "encrypted" : true//是否加密(是否设置了密码)
}
```

示例

```shell
nuls>>> getaccount NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy
{
  "address" : "NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy",
  "alias" : null,
  "pubKey" : "03f364bae9bb632a9b957522f150cb501dbc950e3700cff7a3679ed8820c486875",
  "priKey" : "",
  "encryptedPriKey" : "712149fad00350cdfee4d20850a9e5c1e9d7e9c1562dabc593cbc9b5ac57e99f1549748ff2421b3f6830f34bff7c69d8",
  "extend" : null,
  "createTime" : "2018-07-13 11:39:14",
  "encrypted" : true
}
```



#### 查询账户列表

根据分页参数查询账户列表，所有账户以创建时间倒序输出。

- **命令：getaccounts &lt;pageNumber&gt; &lt;pageSize&gt;**

| 参数               | 说明                             |
| ------------------ | -------------------------------- |
| &lt;pageNumber&gt; | 页数，需要获取第几页的数据，必填 |
| &lt;pageSize&gt;   | 每一页显示的数据条数，必填       |

返回信息，将输出账户集合

```json
[ {
  "address" : "NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy",//账户地址
  "alias" : null,//别名
  "pubKey" : "03f364bae9bb632a9b957522f150cb501dbc950e3700cff7a3679ed8820c486875",//公钥
  "priKey" : "",//私钥(如果账户设置了密码，该项为空)
  "encryptedPriKey" : "712149fad00350cdfee4d20850a9e5c1e9d7e9c1562dabc593cbc9b5ac57e99f1549748ff2421b3f6830f34bff7c69d8",//加密后的私钥(如果账户没有设置了密码，该项为空)
  "extend" : null,
  "createTime" : "2018-07-13 11:39:14",//创建时间
  "encrypted" : true//是否加密(是否设置了密码)
}, {
  "address" : "NsdwsD8n3GrW9Sx43eLZ3xv8C858ovE2",
  "alias" : null,
  "pubKey" : "035f063012385032d19082a302ba774af4e02abe32e43120d3bfe82ec72dcdeafa",
  "priKey" : "3ba27d6a53fb52f52443d8d895155ca113c632fd8a1bd6e7846933d1fb378ecb",
  "encryptedPriKey" : "",
  "extend" : null,
  "createTime" : "2018-07-13 11:02:23",
  "encrypted" : false
} ]
```



示例 获取账户列表 显示第一页，每页显示2条

```shell
nuls>>> getaccounts 1 2
[ {
  "address" : "NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy",
  "alias" : null,
  "pubKey" : "03f364bae9bb632a9b957522f150cb501dbc950e3700cff7a3679ed8820c486875",
  "priKey" : "",
  "encryptedPriKey" : "712149fad00350cdfee4d20850a9e5c1e9d7e9c1562dabc593cbc9b5ac57e99f1549748ff2421b3f6830f34bff7c69d8",
  "extend" : null,
  "createTime" : "2018-07-13 11:39:14",
  "encrypted" : true
}, {
  "address" : "NsdwsD8n3GrW9Sx43eLZ3xv8C858ovE2",
  "alias" : null,
  "pubKey" : "035f063012385032d19082a302ba774af4e02abe32e43120d3bfe82ec72dcdeafa",
  "priKey" : "3ba27d6a53fb52f52443d8d895155ca113c632fd8a1bd6e7846933d1fb378ecb",
  "encryptedPriKey" : "",
  "extend" : null,
  "createTime" : "2018-07-13 11:02:23",
  "encrypted" : false
} ]
```



#### 查询账户私钥

根据账户地址查询账户私钥，如果账户已加密，则需要输入密码

- **命令：getprikey &lt;address&gt; **

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息 导入的账户地址

```json
"00a166d10c2cc4cd8f76449ff699ab3eee44fe4f82b4bb866f7bba02751a6fd655"
```

示例

```shell
nuls>>> getprikey NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy
Please enter the password.
Enter your password:**********
"00a166d10c2cc4cd8f76449ff699ab3eee44fe4f82b4bb866f7bba02751a6fd655"
```



#### 查询账户余额

根据账户地址查询账户余额

- **命令：getbalance &lt;address&gt; **

| 参数            | 说明             |
| --------------- | ---------------- |
| &lt;address&gt; | 账户的地址，必填 |

返回信息 导入的账户地址

```json
{
  "balance" : "9999998.99",//余额
  "locked" : "0",//已锁定余额
  "usable" : "9999998.99"//可用余额
}
```

示例

```shell
nuls>>> getbalance Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
{
  "balance" : "9999998.99",
  "locked" : "0",
  "usable" : "9999998.99"
}
```



#### 转账

根据账户地址将NULS转入另一账户地址中，如果转出账户有密码则需要验证密码，否则直接转出。

- **命令：transfer &lt;address&gt; &lt;toAddress&gt; &lt;amount&gt; [remark] **

| 参数              | 说明                                            |
| ----------------- | ----------------------------------------------- |
| &lt;address&gt;   | 转出地址，必填                                  |
| &lt;toAddress&gt; | 接收地址，必填                                  |
| &lt;amount&gt;    | 转账数量，最多可以有8位小数（单位：NULS），必填 |
| [remark]          | 备注信息，选填                                  |

返回信息 转账交易hash

```json
"00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596"
```

示例

```shell
nuls>>> transfer Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 100 转账
Please enter the password.
Enter your password:**********
"00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596"
```



#### 查询交易详情

根据交易hash查询交易详细信息

- **命令：gettx &lt;hash&gt;**

| 参数         | 说明           |
| ------------ | -------------- |
| &lt;hash&gt; | 交易hash，必填 |

返回信息 交易详细信息

```json
{
  "hash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",//交易hash
  "type" : "transfer",//交易类型（此示例为转账交易）
  "time" : "2018-07-16 11:21:46",//交易时间
  "blockHeight" : 26269,//打包交易的区块高度
  "fee" : "0.001",//交易手续费
  "value" : "100",//（转账）交易数量
  "remark" : "转账",//备注
  "scriptSig" : "2103f68aeb83f3a4fdf9b49259a6e8eae97cf73c7a0a1c52da8a1f9c09312a6d3c530046304402202932ea77976a603b832861c64f868a34e9ad59b728d3a8eeba27269f05b4267c0220217a6e1b97fb3f65e6711434e17e399f43e168f3699edb2aba8618bdd3f410e1",//签名
  "status" : "confirm",//交易确认状态(已确认或者未确认)
  "confirmCount" : 46,//确认次数
  "size" : 254,//交易大小
  "inputs" : [ {//交易的输入
    "fromHash" : "002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e",
    "fromIndex" : 1,
    "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",
    "value" : "9979998.98",
    "lockTime" : 0
  } ],
  "outputs" : [ {//交易的输出
    "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
    "index" : 0,
    "address" : "NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T"//交易输出的目标地址(此数据相当于转出100给目标地址)
    "value" : "100",
    "lockTime" : 0,
    "status" : "usable"
  }, {
    "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",//交易hash
    "index" : 1,
    "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",//交易输出的目标地址(此数据相当于找零给自己)
    "value" : "9979898.979",
    "lockTime" : 0,
    "status" : "usable"
  } ]
}
```

示例 查询转账交易

```shell
nuls>>> gettx 00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596
{
  "hash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
  "type" : "transfer",
  "time" : "2018-07-16 11:21:46",
  "blockHeight" : 26269,
  "fee" : "0.001",
  "value" : "100",
  "remark" : "转账",
  "scriptSig" : "2103f68aeb83f3a4fdf9b49259a6e8eae97cf73c7a0a1c52da8a1f9c09312a6d3c530046304402202932ea77976a603b832861c64f868a34e9ad59b728d3a8eeba27269f05b4267c0220217a6e1b97fb3f65e6711434e17e399f43e168f3699edb2aba8618bdd3f410e1",
  "status" : "confirm",
  "confirmCount" : 46,
  "size" : 254,
  "inputs" : [ {
    "fromHash" : "002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e",
    "fromIndex" : 1,
    "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",
    "value" : "9979998.98",
    "lockTime" : 0
  } ],
  "outputs" : [ {
    "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
    "index" : 0,
    "address" : "NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T",
    "value" : "100",
    "lockTime" : 0,
    "status" : "usable"
  }, {
    "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
    "index" : 1,
    "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",
    "value" : "9979898.979",
    "lockTime" : 0,
    "status" : "usable"
  } ]
}
```



#### 查询交易列表

根据账户地址，查询该账户的交易列表

- **命令：gettxlist &lt;address&gt; &lt;pageNumber&gt; &lt;pageSize&gt;**

| 参数               | 说明                             |
| ------------------ | -------------------------------- |
| &lt;address&gt;    | 账户地址，必填                   |
| &lt;pageNumber&gt; | 页数，需要获取第几页的数据，必填 |
| &lt;pageSize&gt;   | 每一页显示的数据条数，必填       |

返回信息 交易详细信息

```json
[ {
  "txHash" : "0020153f76bec3433676a96ef343d7e432b7de16b3175a9c5f4579338f604989996e",//交易hash
  "blockHeight" : 26473,//交易的区块高度
  "time" : "2018-07-16 11:55:43",//交易时间
  "txType" : "transfer",//交易类型
  "status" : 1,//确认状态
  "info" : "+100"//信息
},{
  "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
  "blockHeight" : 26269,
  "time" : "2018-07-16 11:21:46",
  "txType" : "transfer",
  "status" : 1,
  "info" : "+100"
} ]
```

示例

```shell
nuls>>> gettxlist NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 1 10
[ {
  "txHash" : "0020153f76bec3433676a96ef343d7e432b7de16b3175a9c5f4579338f604989996e",
  "blockHeight" : 26473,
  "time" : "2018-07-16 11:55:43",
  "txType" : "transfer",
  "status" : 1,
  "info" : "+100"
}, {
  "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
  "blockHeight" : 26269,
  "time" : "2018-07-16 11:21:46",
  "txType" : "transfer",
  "status" : 1,
  "info" : "+100"
} ]
```



#### 创建节点

根据账户地址创建节点，创建节点时需要一个打包账户地址（打包地址不能有密码），同时需要至少20000NULS的保证金。

- **命令：createagent &lt;agentAddress&gt; &lt;packingAddress&gt; &lt;commissionRate&gt; &lt;deposit&gt; **

| 参数                   | 说明                                                         |
| ---------------------- | ------------------------------------------------------------ |
| &lt;agentAddress&gt;   | 创建节点的账户地址，必填                                     |
| &lt;packingAddress&gt; | 节点打包账户地址，必填（注：该账户不能设置密码，否则节点不能打包出块） |
| &lt;commissionRate&gt; | 代理佣金比例，范围：10~100，必填                             |
| &lt;deposit&gt;        | 创建节点的保证金，不能低于20000NULS，必填                    |

返回信息 返回节点的agent hash

```json
"002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e"
```

示例 创建一个节点，佣金比例为10%，押金20000NULS。

```shell
nuls>>> createagent Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT NsdvAnqc8oEiNiGgcp6pEusfiRFZi4vt 10 20000
Please enter the password.
Enter your password:**********
"002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e"
```



#### 加入共识（委托节点）

根据账户地址和节点agentHash，加入共识，至少需要2000NULS

- **命令：deposit &lt;address&gt; &lt;agentHash&gt; &lt;deposit&gt; **

| 参数              | 说明                                   |
| ----------------- | -------------------------------------- |
| &lt;address&gt;   | 账户地址，必填                         |
| &lt;agentHash&gt; | 节点的agentHash，必填                  |
| &lt;deposit&gt;   | 加入共识保证金，不能低于2000NULS，必填 |

返回信息 加入共识的交易hash，如果要退出这笔共识，则需要该hash。

```json
"0020d349b7ad322ff958e3abfa799d9ac76341afa6e1fb4d3857353a5adc74ba3fd0"
```

示例

```shell
nuls>>> deposit NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e 5000
"0020d349b7ad322ff958e3abfa799d9ac76341afa6e1fb4d3857353a5adc74ba3fd0"
```



#### 退出共识（退出委托）

根据账户地址和加入共识时的交易hash来退出共识(委托)，单个账户多次委托节点时，每次委托的交易是独立的，所以退出时也要通过单次委托时的交易hash来退出对应的那一次委托，而不会一次退出所有委托。

- **命令：withdraw &lt;address&gt; &lt;txHash&gt; **

| 参数            | 说明                   |
| --------------- | ---------------------- |
| &lt;address&gt; | 账户地址，必填         |
| &lt;txHash&gt;  | 委托时的交易hash，必填 |

返回信息 退出共识交易hash

```json
"00201d70ac37b53d41c0e813ad245fc42e1d3a5d174d9148fbbbaed3c18d4d67bdbf"
```

示例

```shell
nuls>>> withdraw NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 0020d349b7ad322ff958e3abfa799d9ac76341afa6e1fb4d3857353a5adc74ba3fd0
"00201d70ac37b53d41c0e813ad245fc42e1d3a5d174d9148fbbbaed3c18d4d67bdbf"
```



#### 停止节点

停止节点，所有委托给节点的NULS将被退回，节点创建者账户的保证金将会被锁定72小时。

- **命令：stopagent &lt;address&gt; **

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



#### 获取节点详情

根据节点agentHash获取节点详情

- **命令：getagent &lt;agentHash&gt; **

| 参数              | 说明                  |
| ----------------- | --------------------- |
| &lt;agentHash&gt; | 节点agentHash值，必填 |

返回信息

```json
{
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",//创建节点的账户地址
  "packingAddress" : "NsdwvEJuPC3hA5ws7VQGwXN77vqsM1PA",//节点打包(出块)地址
  "rewardAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",//奖励地址(默认为创建节点地址)
  "deposit" : "20000",//创建节点的保证金
  "commissionRate" : 60.0,//代理佣金比例
  "agentName" : null,//节点名称(来源)
  "agentId" : "35024DE6",//节点ID
  "time" : "2018-07-16 16:33:38",//创建节点时间
  "blockHeight" : 28141,//创建节点交易的块高度
  "delHeight" : -1,
  "status" : "consensus",//状态
  "creditVal" : 0.05,//信用值
  "totalDeposit" : "208000",//节点当前委托总额
  "txHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "memberCount" : 5//参与数
}
```

示例

```shell
nuls>>> getagent 0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6
{
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "packingAddress" : "NsdwvEJuPC3hA5ws7VQGwXN77vqsM1PA",
  "rewardAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "deposit" : "20000",
  "commissionRate" : 60.0,
  "agentName" : null,
  "agentId" : "35024DE6",
  "time" : "2018-07-16 16:33:38",
  "blockHeight" : 28141,
  "delHeight" : -1,
  "status" : "consensus",
  "creditVal" : 0.05,
  "totalDeposit" : "208000",
  "txHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "memberCount" : 5
}
```



#### 获取节点列表

根据共识节点列表

- **命令：getagent &lt;pageNumber&gt; &lt;pageSize&gt; **

| 参数               | 说明                             |
| ------------------ | -------------------------------- |
| &lt;pageNumber&gt; | 页数，需要获取第几页的数据，必填 |
| &lt;pageSize&gt;   | 每一页显示的数据条数，必填       |

返回信息

```json
[{
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",//创建节点的账户地址
  "packingAddress" : "NsdwvEJuPC3hA5ws7VQGwXN77vqsM1PA",//节点打包(出块)地址
  "rewardAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",//奖励地址(默认为创建节点地址)
  "deposit" : "20000",//创建节点的保证金
  "commissionRate" : 60.0,//代理佣金比例
  "agentName" : null,//节点名称(来源)
  "agentId" : "35024DE6",//节点ID
  "time" : "2018-07-16 16:33:38",//创建节点时间
  "blockHeight" : 28141,//创建节点交易的块高度
  "delHeight" : -1,
  "status" : "consensus",//状态
  "creditVal" : 0.05,//信用值
  "totalDeposit" : "208000",//节点当前委托总额
  "txHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "memberCount" : 5//参与数
}]
```

示例

```shell
nuls>>> getagents 1 2
[ {
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "packingAddress" : "NsdwvEJuPC3hA5ws7VQGwXN77vqsM1PA",
  "rewardAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "deposit" : "20000",
  "commissionRate" : 60.0,
  "agentName" : null,
  "agentId" : "35024DE6",
  "time" : "2018-07-16 16:33:38",
  "blockHeight" : 28141,
  "delHeight" : -1,
  "status" : "consensus",
  "creditVal" : 0.18,
  "totalDeposit" : "208000",
  "txHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "memberCount" : 5
}, {
  "agentHash" : "00202ef1977c1eea6fde8d1bf8d75b6f5650d62933e5fccc2d8d08023dea5ce291d8",
  "agentAddress" : "NsdtEdrY4QWGa8VUGW83hXbZsbKhbrTN",
  "packingAddress" : "NsdwhLzjCLJp9V7zULU9KBerqkW971K7",
  "rewardAddress" : "NsdtEdrY4QWGa8VUGW83hXbZsbKhbrTN",
  "deposit" : "20000",
  "commissionRate" : 10.0,
  "agentName" : null,
  "agentId" : "5CE291D8",
  "time" : "2018-07-16 16:31:12",
  "blockHeight" : 28126,
  "delHeight" : -1,
  "status" : "consensus",
  "creditVal" : -0.16,
  "totalDeposit" : "208000",
  "txHash" : "00202ef1977c1eea6fde8d1bf8d75b6f5650d62933e5fccc2d8d08023dea5ce291d8",
  "memberCount" : 5
} ]
```



#### 获取全网共识总体信息

查询全网共识总体信息

- **命令：getconsensus **

返回信息

```json
{
  "agentCount" : 6,//节点数
  "totalDeposit" : "1758000",//总委托数
  "rewardOfDay" : "0",//奖励
  "consensusAccountNumber" : 6,//共识账户数量
  "packingAgentCount" : 6//打包地址数量
}
```

示例

```shell
nuls>>> getconsensus
{
  "agentCount" : 6,
  "totalDeposit" : "1758000",
  "rewardOfDay" : "0",
  "consensusAccountNumber" : 6,
  "packingAgentCount" : 6
}
```



#### 获取单个账户的委托总览

根据账户地址获取该账户参与的所有委托(共识)信息的总览

- **命令：getdepositedinfo &lt;address&gt; **

| 参数            | 说明           |
| --------------- | -------------- |
| &lt;address&gt; | 账户地址，必填 |

返回信息

```json
{
  "agentCount" : 1,//创建的节点数
  "totalDeposit" : "1600000",//总共委托的数量
  "joinAgentCount" : 6,//加入委托的节点数
  "usableBalance" : "8048998.869",//可用余额
  "reward" : "219.65910271",//得到的奖励总数
  "rewardOfDay" : "219.65910271",//一天得到的奖励数
  "agentHash" : "00202794351e662e53f16fe04dd9217731463c3b24a6ee6cf80c9ba2d3e5e09eb7fd"//节点hash
}
```

示例

```shell
nuls>>> getdepositedinfo Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
{
  "agentCount" : 1,
  "totalDeposit" : "1600000",
  "joinAgentCount" : 6,
  "usableBalance" : "8048998.869",
  "reward" : "219.65910271",
  "rewardOfDay" : "219.65910271",
  "agentHash" : "00202794351e662e53f16fe04dd9217731463c3b24a6ee6cf80c9ba2d3e5e09eb7fd"
}
```



#### 获取单个账户的委托信息列表

根据地址获取该账户参与的委托信息列表(返回共识信息列表)，当入参中跟上agentHash可以查看账户在某一个节点下的委托信息列表

- **命令：getdepositeds &lt;address&gt; &lt;pageNumber&gt; &lt;pageSize&gt; [agentHash] **

| 参数               | 说明                             |
| ------------------ | -------------------------------- |
| &lt;address&gt;    | 账户地址，必填                   |
| &lt;pageNumber&gt; | 页数，需要获取第几页的数据，必填 |
| &lt;pageSize&gt;   | 每一页显示的数据条数，必填       |
| [agentHash]        | 节点Hash，选填                   |

返回信息

```json
[{
  "deposit" : "2000",//委托金额
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "address" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",//委托者地址
  "time" : "2018-07-16 16:38:25",//时间
  "txHash" : "0020c93d039b57361a141470b3630c3cf6fa304b1acaeabb7a26a772f434d24de221",//委托交易hash
  "blockHeight" : 28148,//交易的块高度
  "delHeight" : -1,
  "status" : "consensus",//节点状态
  "agentName" : "35024DE6",//节点名
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh"//节点地址
}]
```

示例

```shell
nuls>>> getdepositeds Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto 1 2
[ {
  "deposit" : "2000",
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "address" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",
  "time" : "2018-07-16 16:38:25",
  "txHash" : "0020c93d039b57361a141470b3630c3cf6fa304b1acaeabb7a26a772f434d24de221",
  "blockHeight" : 28148,
  "delHeight" : -1,
  "status" : "consensus",
  "agentName" : "35024DE6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh"
}, {
  "deposit" : "2000",
  "agentHash" : "00202794351e662e53f16fe04dd9217731463c3b24a6ee6cf80c9ba2d3e5e09eb7fd",
  "address" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",
  "time" : "2018-07-16 16:38:43",
  "txHash" : "00205278ce2eeaf9da7acc13ce81293a01a3f44a1de09e4e0b3ec078884a65700234",
  "blockHeight" : 28149,
  "delHeight" : -1,
  "status" : "consensus",
  "agentName" : "E09EB7FD",
  "agentAddress" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT"
} ]
```



#### 获取单个账户的委托节点列表

根据地址查询该账户委托的节点列表(返回节点信息列表)

- **命令：getdepositedagents &lt;address&gt; &lt;pageNumber&gt; &lt;pageSize&gt; **

| 参数               | 说明                             |
| ------------------ | -------------------------------- |
| &lt;address&gt;    | 账户地址，必填                   |
| &lt;pageNumber&gt; | 页数，需要获取第几页的数据，必填 |
| &lt;pageSize&gt;   | 每一页显示的数据条数，必填       |

返回信息

```json
[ {
  "agentHash" : "0020617f9be18306fcdf95917fad80f4d15c51426667825ad5a6968ec0ee0198acaf",//节点hash
  "agentAddress" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",//创建节点的账户地址
  "packingAddress" : "Nse77VDHtiQ6WnkEhgCA7TbfNkoH9iyr",//节点打包(出块)地址
  "rewardAddress" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",//奖励地址(默认为创建节点地址)
  "deposit" : "20000",//创建节点的保证金
  "commissionRate" : 40.0,//代理佣金比例
  "agentName" : null,//节点名称(来源)
  "agentId" : "0198ACAF",//节点ID
  "time" : "2018-07-16 16:32:52",//创建节点时间
  "blockHeight" : 28136,//创建节点交易的块高度
  "delHeight" : -1,
  "status" : "consensus",//状态
  "creditVal" : -0.91,//信用值
  "totalDeposit" : "204000",//节点当前委托总额
  "txHash" : "0020617f9be18306fcdf95917fad80f4d15c51426667825ad5a6968ec0ee0198acaf",
  "memberCount" : 3//参与数
}]
```

示例 获取第一页，每页显示两条

```shell
nuls>>> getdepositedagents Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto 1 2
[ {
  "agentHash" : "0020617f9be18306fcdf95917fad80f4d15c51426667825ad5a6968ec0ee0198acaf",
  "agentAddress" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",
  "packingAddress" : "Nse77VDHtiQ6WnkEhgCA7TbfNkoH9iyr",
  "rewardAddress" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",
  "deposit" : "20000",
  "commissionRate" : 40.0,
  "agentName" : null,
  "agentId" : "0198ACAF",
  "time" : "2018-07-16 16:32:52",
  "blockHeight" : 28136,
  "delHeight" : -1,
  "status" : "consensus",
  "creditVal" : -0.91,
  "totalDeposit" : "204000",
  "txHash" : "0020617f9be18306fcdf95917fad80f4d15c51426667825ad5a6968ec0ee0198acaf",
  "memberCount" : 3
}, {
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "packingAddress" : "NsdwvEJuPC3hA5ws7VQGwXN77vqsM1PA",
  "rewardAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "deposit" : "20000",
  "commissionRate" : 60.0,
  "agentName" : null,
  "agentId" : "35024DE6",
  "time" : "2018-07-16 16:33:38",
  "blockHeight" : 28141,
  "delHeight" : -1,
  "status" : "consensus",
  "creditVal" : 0.91,
  "totalDeposit" : "208000",
  "txHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "memberCount" : 5
} ]
```



#### 获取最新的区块头信息

获取最新的区块头信息

- **命令：getbestblockheader**

返回信息

```json
{
  "hash" : "00206c4ae1d90fdfd875ee3bf84e72615db8bc628f015db089f8a6304ed46a47db5e",//区块hash
  "preHash" : "00207ec8c85a6844899806f55cd9223efa091b548e5cc093ee7833f1c0208254957d",//前一区块hash
  "merkleHash" : "002019aff9431c5b409df7af48a64a50e4e9a0af24cc309d6eefa84deada2a438877",//梅克尔hash
  "time" : "2018-07-17 10:25:40",//区块生成时间
  "height" : 33950,//区块高度
  "txCount" : 1,//区块打包交易数量
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",//打包地址
  "roundIndex" : 668413,//共识轮次
  "consensusMemberCount" : 1,//参与共识成员数量
  "roundStartTime" : "2018-07-17 10:25:30",//当前轮次开始时间
  "packingIndexOfRound" : 1,//当前轮次打包出块的名次
  "reward" : "0",//共识奖励
  "fee" : "0",//区块的打包手续费
  "confirmCount" : 0,//确认次数
  "size" : 204,//区块大小
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100ece231eec6765c3d3cd7a4b74ef227eea05c3511e04ea46bc1b518a51a624e48022022208161b3064f261233bfa0c00308bf5b56421401ba7dd02232bac5077935b9"//签名
}
```

示例

```shell
nuls>>> getbestblockheader
{
  "hash" : "00206c4ae1d90fdfd875ee3bf84e72615db8bc628f015db089f8a6304ed46a47db5e",
  "preHash" : "00207ec8c85a6844899806f55cd9223efa091b548e5cc093ee7833f1c0208254957d",
  "merkleHash" : "002019aff9431c5b409df7af48a64a50e4e9a0af24cc309d6eefa84deada2a438877",
  "time" : "2018-07-17 10:25:40",
  "height" : 33950,
  "txCount" : 1,
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",
  "roundIndex" : 668413,
  "consensusMemberCount" : 1,
  "roundStartTime" : "2018-07-17 10:25:30",
  "packingIndexOfRound" : 1,
  "reward" : "0",
  "fee" : "0",
  "confirmCount" : 0,
  "size" : 204,
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100ece231eec6765c3d3cd7a4b74ef227eea05c3511e04ea46bc1b518a51a624e48022022208161b3064f261233bfa0c00308bf5b56421401ba7dd02232bac5077935b9"
}
```



#### 查询区块信息

根据区块高度或者区块hash，查询区块信息，必须并且只能选择一种参数作为查询条件。

- **命令：getblock &lt;hash&gt; | &lt;height&gt; **

| 参数           | 说明         |
| -------------- | ------------ |
| &lt;hash&gt;   | 区块的hash值 |
| &lt;height&gt; | 区块的高度   |

返回信息

```json
{
  "hash" : "0020c40f471756c88e7487fcc0d428545232120071b58f35e450891237d7b41eb817",//区块hash
  "preHash" : "0020fb1fd03cda7e2b6585256f4da85bdac7d8fc8bafa0740b8eb0ed577f3020b954",//前一区块hash
  "merkleHash" : "0020474c5a353f235e8e8514328e1e98d6b653d4a5445473d160691e39121cd8b158",//梅克尔hash
  "time" : "2018-07-16 16:29:30",//区块生成时间
  "height" : 28115,//区块高度
  "txCount" : 2,//区块打包交易数量
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",//打包地址
  "roundIndex" : 662578,//共识轮次
  "consensusMemberCount" : 1,//参与共识成员数量
  "roundStartTime" : "2018-07-16 16:29:20",//当前轮次开始时间
  "packingIndexOfRound" : 1,//当前轮次打包出块的名次
  "reward" : "0.001",//共识奖励
  "fee" : "0.001",//区块的打包手续费
  "confirmCount" : 6174,//确认次数
  "size" : 507,//区块大小
  "txList" : [ {//交易集合
    "hash" : "0020648f1d25237ba3614237a52c2121e51608f3822ac57a0e67d6a53e84c867e841",//交易hash
    "type" : "coinbase",//交易类型
    "time" : "2018-07-16 16:29:30",//交易时间
    "blockHeight" : 28115,//交易所在区块高度
    "fee" : "0",//交易手续费
    "value" : null,
    "remark" : null,
    "scriptSig" : null,
    "status" : "confirm",
    "confirmCount" : 6174,
    "size" : 54,
    "inputs" : [ ],//交易的输入
    "outputs" : [ //交易的输出
        {
          "address" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",
          "value" : 100000,
          "lockTime" : 29115
        }
    ]
  }],
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100d25b815fa30376247692fad856d3984acf45c9b49edd3d222e3afdab3169520c02200565a486e33358301848bf3d704c187ff8b2d1e859c93b704f713abb984584bf"//签名
}
```

示例 根据高度获取区块

```shell
nuls>>> getblock 28115
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
  "confirmCount" : 6174,
  "size" : 507,
  "txList" : [ {
    "hash" : "0020648f1d25237ba3614237a52c2121e51608f3822ac57a0e67d6a53e84c867e841",
    "type" : "coinbase",
    "time" : "2018-07-16 16:29:30",
    "blockHeight" : 28115,
    "fee" : "0",
    "value" : null,
    "remark" : null,
    "scriptSig" : null,
    "status" : "confirm",
    "confirmCount" : 6174,
    "size" : 54,
    "inputs" : [ ],
    "outputs" : [ {
      "address" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",
      "value" : 100000,
      "lockTime" : 29115
    } ]
  }, {
    "hash" : "0020217945b6804801e0860913d24bf1ca500f9b77518a2be190c1afe63334b3ee2b",
    "type" : "transfer",
    "time" : "2018-07-16 16:29:27",
    "blockHeight" : 28115,
    "fee" : "0.001",
    "value" : null,
    "remark" : null,
    "scriptSig" : "2103f68aeb83f3a4fdf9b49259a6e8eae97cf73c7a0a1c52da8a1f9c09312a6d3c53004730450221008a78bd954ea2f0f5be72217f0858faaf408b2e70f8d4d5aebc9ead9eb6e3aa22022015305c46eab978b08fbc23608c064306ea150be6552bb51cc83badef68217663",
    "status" : "confirm",
    "confirmCount" : 6174,
    "size" : 249,
    "inputs" : [ {
      "fromHash" : "0020f98434eb71e62bfda9a2708689c2f44b58f5b22299490f5956c35d54f2d48459",
      "fromIndex" : 1,
      "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",
      "value" : 972899896100000
    } ],
    "outputs" : [ {
      "address" : "NsdxeBuwQBStXHQ6mcaHyDpnTKijD5ne",
      "value" : 3000000000000,
      "lockTime" : 0
    }, {
      "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",
      "value" : 969899896000000,
      "lockTime" : 0
    } ]
  } ],
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100d25b815fa30376247692fad856d3984acf45c9b49edd3d222e3afdab3169520c02200565a486e33358301848bf3d704c187ff8b2d1e859c93b704f713abb984584bf"
}
```



#### 查询区块头信息

根据区块高度或者区块hash，查询区块头信息，必须并且只能选择一种参数作为查询条件。

- **命令：getblockheader &lt;hash&gt; | &lt;height&gt; **

| 参数           | 说明         |
| -------------- | ------------ |
| &lt;hash&gt;   | 区块的hash值 |
| &lt;height&gt; | 区块的高度   |

返回信息

```json
{
  "hash" : "0020c40f471756c88e7487fcc0d428545232120071b58f35e450891237d7b41eb817",//区块hash
  "preHash" : "0020fb1fd03cda7e2b6585256f4da85bdac7d8fc8bafa0740b8eb0ed577f3020b954",//前一区块hash
  "merkleHash" : "0020474c5a353f235e8e8514328e1e98d6b653d4a5445473d160691e39121cd8b158",//梅克尔hash
  "time" : "2018-07-16 16:29:30",//区块生成时间
  "height" : 28115,//区块高度
  "txCount" : 2,//区块打包交易数量
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",//打包地址
  "roundIndex" : 662578,//共识轮次
  "consensusMemberCount" : 1,//参与共识成员数量
  "roundStartTime" : "2018-07-16 16:29:20",//当前轮次开始时间
  "packingIndexOfRound" : 1,//当前轮次打包出块的名次
  "reward" : "0.001",//共识奖励
  "fee" : "0.001",//区块的打包手续费
  "confirmCount" : 6174,//确认次数
  "size" : 507,//区块大小
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100d25b815fa30376247692fad856d3984acf45c9b49edd3d222e3afdab3169520c02200565a486e33358301848bf3d704c187ff8b2d1e859c93b704f713abb984584bf"//签名
}
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



#### 查询网络信息

查询网络基本信息

- **命令：getnetinfo **

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
nuls>>> getnetinfo
{
  "localBestHeight" : 35317,
  "netBestHeight" : 35317,
  "timeOffset" : "0ms",
  "inCount" : 0,
  "outCount" : 1
}
```



#### 查询网络节点IP

查询网络节点IP

- **命令：getnetnodes **

返回信息

```json
[ "192.168.1.223" ]
```

示例 根据高度获取区块

```shell
nuls>>> getnetnodes
[ "192.168.1.223" ]
```



#### 查询当前版本信息

查询当前版本号

- **命令：version **

返回信息

```json
[ "192.168.1.223" ]
```

示例

```shell
nuls>>> version
{
  "myVersion" : "1.0.0",
  "newestVersion" : "0.9.11",
  "upgradable" : false,
  "infromation" : "地址格式修改,Change the format of address,节点发现逻辑优化,Peer discovery logic optimization,区块下载逻辑优化,Block download logic optimization,性能、稳定性优化,Performance and stability optimization"
}
```



#### 版本更新

查询当前版本号

- **命令：upgrade &lt;version&gt; **

示例

```shell
nuls>>> version 1.0.0
```



#### 退出钱包命令程序

退出操作钱包的命令行程序，不会退出已启动的钱包节点。

- **命令：exit**

示例

```shell
nuls>>> exit
```
