# 快速上手跨链交易

经过近一个月的高强度开发，NULS技术团队突破重重技术障碍，在alpha3版本如期上线跨链交易。跨链交易对区块链技术的重要性不言而喻，NULS从项目发起之初就专注于造链和跨链，现在已成功落地，开始内测。

技术团队提供了两条平行链：NBTC和NETH 内测用户可以链接这两条链相互发送跨链交易，将资产跨链转移。
## 环境准备

- [下载alpha版本节点程序（mykernel版本）](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/pangu/NULS-Wallet-linux64-alpha3-main.tar.gz)

- [下载alpha版本节点程序（Nulstar版本）](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/pangu/NULS-Wallet-linux64-alpha3-main-nulstar.tar.gz)

- [访问alpha版本浏览器](http://alpha.nulscan.io/)

- [访问alpha版本网页钱包](https://alpha.wallet.nuls.io/)

- [下载alpha版本轻钱包](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/pangu/NULS-Wallet2-Alpha-2.0.1.exe)

- [下载NBTC链节点程序](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/pangu/NULS-Wallet-linux64-alpha3-NBTC.tar.gz)

- [下载NETH链节点程序](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/pangu/NULS-Wallet-linux64-alpha3-NETH.tar.gz)



## 主网转入NULS到平行链

平行链发起跨链交易需要消耗NULS作为手续费，因此我们需要先转少量NULS到平行链

命令：**createcrosstx** [chainId] [formAddress] [toAddress] [assetChainId] [assetId] [amount] [remark]

| 参数         | 说明           | 备注                |
| ------------ | -------------- | ------------------- |
| chainId      | 交易发起链链ID | 必填，主网链ID：2   |
| formAddress  | 转出地址       | 必填，主网地址      |
| toAddress    | 转入地址       | 必填，友链地址      |
| assetChainId | 资产链ID       | 必填，主网链ID：2   |
| assetId      | 资产ID         | 必填，主网资产ID：1 |
| amount       | 资产数量       | 必填，需要加上8位0  |
| remark       | 备注           | 选填                |

示例：

```
nuls]]] createcrosstx 2 tNULSeBaMgDEcAUhPSdF3D3C6mT54HPUt81cQ4 M9busmRQB3UTMQsMaJHxKCQxpmvCdQD3QQW 2 1 20000000000
Please enter the password.
Enter your password:********
278104bb76b105fb03e224eccdf71807abf3b5dd84d36907f277f20c0d479098
```

### 查询跨链交易状态

命令： getcrosstxstate [chainId] [txHash]

| 参数    | 说明         | 备注      |
| ------- | ------------ | --------- |
| chainId | 本链链ID     | 必填（2） |
| txHash  | 跨链交易hash | 必填      |

示例

```
nuls]]] getcrosstxstate 2 278104bb76b105fb03e224eccdf71807abf3b5dd84d36907f277f20c0d479098
Confirmed
```



### 平行链查询NULS

命令： **getbalance** [address]、 [chainId]、[assetId]

| 参数     | 说明               | 备注                    |
| -------- | ------------------ | ----------------------- |
| address  | 接收NULS的友链地址 | 必填                    |
| chainId  | 链ID               | 选填，主网链ID为2       |
| assertId | 资产ID             | 选填，主网NULS资产ID为1 |

**PS**: 查询地址NULS余额，链ID=2，资产ID=1

示例：

```
nuls]]] getbalance M9busmRQB3UTMQsMaJHxKCQxpmvCdQD3QQW 2 1
{
  "available" : "200",
  "total" : "200",
  "freeze" : "0"
}
```



## 平行链发起跨链交易

选择一条平行链，发起一笔跨链交易

命令：**createcrosstx** [chainId] [formAddress] [toAddress] [assetChainId] [assetId] [amount] [remark]

| 参数         | 说明           | 备注               |
| ------------ | -------------- | ------------------ |
| chainId      | 交易发起链链ID | 必填               |
| formAddress  | 转出地址       | 必填               |
| toAddress    | 转入地址       | 必填               |
| assetChainId | 资产链ID       | 必填               |
| assetId      | 资产ID         | 必填               |
| amount       | 资产数量       | 必填，需要加上8位0 |
| remark       | 备注           | 选填               |

示例：

```
nuls]]] createcrosstx 11 QZb21ASV7X1pBjUbJVbpjS5Mg3HBcbhKa5Kf M9busmRQB3UTMQsMaJHxKCQxpmvCdQD3QQW 2 1 1100000000
Please enter the password.
Enter your password:********
0d04d8633e04101c89c769e1d03a3a0a77d740f3dd7ff7c1eb09b30fd3f8eac7

nuls]]] createcrosstx 11 QZb21ASV7X1pBjUbJVbpjS5Mg3HBcbhKa5Kf M9busmRQB3UTMQsMaJHxKCQxpmvCdQD3QQW 11 1 11000000000
Please enter the password.
Enter your password:********
b1be7d7d0bf86da84f95853d4541d641342f3a327629b90611e5013856dc9e85
```

### 查询跨链资产

在接收的资产的平行链查询跨链的资产是否到账

命令： **getbalance** [address]、 [chainId]、[assetId]

| 参数     | 说明               | 备注                    |
| -------- | ------------------ | ----------------------- |
| address  | 接收NULS的友链地址 | 必填                    |
| chainId  | 链ID               | 选填，主网链ID为2       |
| assertId | 资产ID             | 选填，主网NULS资产ID为1 |

示例：

```
nuls]]] getbalance M9busmRQB3UTMQsMaJHxKCQxpmvCdQD3QQW 11 1
{
  "available" : "110",
  "total" : "110",
  "freeze" : "0"
}

```

