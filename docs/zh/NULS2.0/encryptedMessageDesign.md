# 加密信息模块示例
## 功能设计
模块实现的核心业务是两个地址直接进行文本消息的收发，将会把加密后的消息内容存储在链上和节点文件系统中。
### 核心功能点
1. 为地址绑定全链唯一的昵称地址。
2. 给指定昵称地址发送信息。
3. 接收信息。
4. 查看信息详情。

### 次要功能点
1. 查看收件箱和发件箱信息列表。
2. 绑定昵称地址和发送信息额外支付手续费

## 概要设计
### 绑定昵称地址
创建申请昵称地址交易类型（type_200)，业务数据（txData）包括申请地址、昵称地址、地址公钥。验证交易时，需要验证昵称地址是否已经被占用、申请地址是否已经绑定或昵称、申请地址的账户余额是否足够支付申请手续费和交易手续费。当交易确认后，节点将把申请地址、昵称地址、公钥3个数据建立联系并存储到文件系统中。

绑定昵称地址功能的作用有两点
1. 提供比账户地址更利于人类记忆和书写的格式。
2. 通过账户发生交易获取到账户地址的公钥，在发送信息时需要通过公钥对信息内容进行非对称加密。

### 发送信息
创建发送信息交易类型（type_201),业务数据（txData)中存储发件人地址（非昵称地址）、收件人地址（非昵称地址）、发送时间、加密后的信息标题、加密后的信息内容、发件人阅读权限key，收件人阅读权限key。
#### 组装交易
发送信息的参数为发件人昵称地址、账户密码、收件人昵称地址、信息标题、信息内容。处理步骤如下：
1. 通过收件人昵称地址查询到收件人昵称信息，获取到收件人账户地址、收件人账户公钥。
2. 生成一对加密信息的钥匙对（KEY)，通过公钥对信息标题和信息内容进行加密处理；通过收件人和发件人的公钥对KEY的私钥进行加密分别获得收件人阅读权限key和发件人阅读权限key。在查看信息内容时首先通过自己的私钥解密对应的阅读权限key，然后用阅读权限key解密信息标题和信息内容。从而达到数据公开存储，但只能发件人和收件人才能查看内容的目的。

#### 验证交易
1. 验证发件人账户地址绑定昵称地址。
2. 验证收件昵称地址是否有效。
3. 验证是否转入指定数量资产到手续费账户。

#### 保存信息数据
因为是演示模块，避免不必要的复杂度，存储没有采用数据库存储，而使用文件系统存储。信息存储主要存储信息与收件人、发件人的关系，以及信息内容。
1. 创建sender和recipient两个文件夹存储账户地址与信息所在交易hash的关系。文件夹中以地址为文件名创建文件，文件中每一行存储一条此账户地址有关的信息交易hash。sender文件夹存储发件人与信息交易hash的关系，recipient文件夹存储收件人与信息交易hash的关系。
2. 创建mail-data文件夹存储信息，使用信息交易hash值作为文件名创建存储文件，文件内容为信息内容byte数组的16进制字符串。

### 读取信息
#### <span id="解密信息信息">解密信息信息</span>
信息内容是加密后存储，读取时需要进行解密操作。解密失败抛出异常。解密流程如下：
1. 通过信息hash值获取信息内容。
2. 反序列化信息内容，首先将16进制转换成byte数组，然后按照以下顺序规则解析byte数组

    > 1. 变长类型存储收件人账户地址
    > 2. 变成类型存储发件人账户地址
    > 3. 变长类型存储收件人阅读权限key
    > 4. 变长类型存储发件人阅读权限key
    > 5. 变长类型存储信息标题
    > 6. 变长类型存储信息内容
    > 7. 4个byte存储64位int时间戳（1970年1月1日到当前毫秒数）
1. 通过地址比较判断当前账户是收件人还是发件人，通过私钥解密对应的阅读权限key。
2. 通过解密后的阅读权限key解密信息标题和信息内容。

#### 读取收件列表或发件列表
在sender和recipient文件夹下找到账户地址同名的文件，按行读取hash值，然后使用hash值通过[解密信息信息](#解密信息信息)获取信息详情，最后组装成列表。
### 收取手续费
通过验证绑定昵称交易和发送信息交易的CoinData里是否包含向指定的黑洞地址(手续费地址）转入指定数量资产来实现手续费收取。

## 详细设计
### 源代码包结构
```
.
└── io
    └── nuls
        ├── Config.java
        ├── Constant.java
        ├── MyModule.java
        ├── NulsModuleBootstrap.java
        ├── Utils.java
        ├── controller
        │   ├── CreateMailAddressController.java
        │   ├── GetMailController.java
        │   ├── SendMailController.java
        │   ├── core
        │   │   ├── BaseController.java
        │   │   ├── NulsResourceConfig.java
        │   │   ├── Result.java
        │   │   └── WebServerManager.java
        │   └── vo
        │       ├── CreateMailAddressReq.java
        │       ├── GetMailListReq.java
        │       ├── MailAddressData.java
        │       ├── MailContentData.java
        │       ├── SendMailReq.java
        │       └── ViewMailReq.java
        ├── rpc
        │   ├── AccountTools.java
        │   ├── CallRpc.java
        │   ├── LegderTools.java
        │   ├── TransactionTools.java
        │   └── vo
        │       ├── Account.java
        │       ├── AccountBalance.java
        │       └── TxRegisterDetail.java
        ├── service
        │   ├── MailAddressService.java
        │   ├── SendMailService.java
        │   └── dto
        │       ├── MailAddress.java
        │       └── MailContent.java
        └── txhander
            ├── MailAddressProcessor.java
            ├── SendMailProcessor.java
            ├── TransactionDispatcher.java
            └── TransactionProcessor.java
```
#### Config.java
配置文件，通过nuls-core包的配置文件系统将外部NULS2.0通用配置读取到类中，本模块中需要使用chainId(链id）、assetId（资产id）、dataPath(数据存储路径），这3个配置属于全局通用配置，直接读取即可。另外定义了mailAddressFee（绑定昵称手续费）、sendMailFee（发送信息手续费）两个业务配置项，需要在module.ncf中配置。

#### Constant.java
常量定义类，定义了绑定昵称交易类型(200)、发送信息交易类型（201）、手续费黑洞地址。

#### MyModule.java
模块启动类，申明当前模块依赖account(账户）、ledger（账本）、transaction(交易)3个模块。nuls-core-rpc程序包将自动与这3个模块建立websocket长连接。
完成模块初始化工作：
1. 创建存储数据的文件夹。
2. 向交易模块注册交易类型。
3. 初始化Restful WebServer服务（用户操作接口使用http协议提供）。

#### controller包
controller包提供用户操作接口
##### CreateMailAddressController.java
绑定账户昵称地址相关接口。
##### GetMailController.java
获取昵称信息相关接口。
##### SendMailController.java
发送信息相关接口
##### core和vo包
HTTP接口框架及接口协议相关。
#### rpc包
访问其他模块的RPC接口相关工具类。
#### service包
数据存储逻辑相关包。
##### MailAddressService.java
存储账户绑定的昵称地址信息相关服务。
##### SendMailService.java
发送信息及查询信息信息相关服务。
#### dto包
定义数据存储对象
#### txhander包
交易回调函数包
##### TransactionDispatcher.java
定义回调函数的RPC接口，根据交易类型分发到具体的处理类。
##### MailAddressProcessor.java
定义处理绑定昵称地址交易类型（type_200）的回调函数。
##### SendMailProcessor.java
定义处理发送信息交易类型（type_201）的回调函数。

### 用户操作接口列表
用户操作接口使用http方式提供，Request和Response的Content type为application/json，端口为9999。
#### 返回值通用协议

```
{
    "success": true,  //成功状态
    "data": null,     //返回的数据
    "msg": null       //失败的原因
}
```
#### 绑定昵称地址
##### 访问路径：/mail/createMailAddress
##### 请求方式: POST
##### 参数列表

| 参数名 | 参数类型 | 说明 |
| --- | --- | --- |
| address | string | 申请账户地址 |
| mailAddress | string | 申请绑定的昵称地址 |
| password | string | 账户密码 |
##### 返回值 string
交易的txHash值。
#### 查询指定账户地址绑定的昵称地址
##### 访问路径：/mail/getMailAddress/{address}
##### 请求方式：GET
##### 参数列表

| 参数名 | 参数类型 | 说明 |
| --- | --- | --- |
| address | string | 账户地址 |
##### 返回值 string
昵称地址
#### 发送信息
##### 访问路径：/mail/sendMail
##### 请求方式：POST
##### 参数列表

| 参数名 | 参数类型 | 说明 |
| --- | --- | --- |
| mailAddress | string | 收件人昵称地址 |
| senderAddress | string | 发件人账户地址 |
| password | string | 发件人账户密码 |
| title | string | 信息标题 |
| content | string | 信息内容 |
##### 返回值 string
交易txHash
#### 获取指定信息详情
##### 访问路径：/mail/viewMail
##### 请求方式：POST
##### 参数列表

| 参数名 | 参数类型 | 说明 |
| --- | --- | --- |
| address | string | 账户地址 |
| password | string | 账户密码 |
| hash | string | 信息交易hash|

##### 返回值 object

| 参数名 | 说明 |
| --- | --- |
| hash | 信息交易hash |
| senderMailAddress | 发件人昵称地址 |
| receiverMailAddress | 收件人昵称地址 |
| title | 信息标题 |
| content | 信息内容 |
| sender | 发件人账户地址 |
| date | 发件日期 |


#### 获取收件箱列表、获取发件箱列表

##### 访问路径：/mail/getSendList、/mail/getReceiveList

##### 请求方式：POST

##### 参数列表

| 参数名 | 参数类型 | 说明 |
| --- | --- | --- |
| address | string | 账户地址 |
| password | string | 账户密码 |

##### 返回值 list

| 参数名 | 说明 |
| --- | --- |
| hash | 信息交易hash |
| senderMailAddress | 发件人昵称地址 |
| receiverMailAddress | 收件人昵称地址 |
| title | 信息标题 |
| content | 信息内容 |
| sender | 发件人账户地址 |
| date | 发件日期 |

