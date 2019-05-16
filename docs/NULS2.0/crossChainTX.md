# Quick Start of Cross-chain transaction

After nearly a month of high-intensity development, NULS technical team broke through technical obstacles and released Alpha v.3.0 of NULS 2.0 as scheduled.The importance of cross-chain transaction to blockchain technology is self-evident. NULS has focused on chain-building and cross-chain trading since its initiation, and has now successfully implemented and started alpha version.

The technical team provides two parallel chains: NBTC and NETH.Developers can link the two chains to send cross-chain transactions and transfer assets to each other.
## Environment Preparation

- [Download the main network v.2.0 node program link (mykernel version)](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/pangu/NULS-Wallet-linux64-alpha3-main.tar.gz)

- [Download the main network v.2.0 node program download link (Nulstar version)](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/pangu/NULS-Wallet-linux64-alpha3-main-nulstar.tar.gz)

- [Access the main web browser](http://alpha.nulscan.io/)

- [Access the main network v.2.0 web wallet](https://alpha.wallet.nuls.io/)

- [Download the main network v.2.0 light wallet]()

- [Download NBTC chain node program](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/pangu/NULS-Wallet-linux64-alpha3-NBTC.tar.gz)

- [Download NETH chain node program](https://nuls-usa-west.oss-us-west-1.aliyuncs.com/pangu/NULS-Wallet-linux64-alpha3-NETH.tar.gz)

The NULS alpha version node program requires the server to open two port Numbers
- Default port：18001
- cross-chain port：18002

> If a developer wants to run multiple chain programs on the same server, they need to change the port number configuration in :nuls.ncf. The principle is to ensure that the port number is not the same

## Main Network Transfers NULS to Parallel Chain

Command：**createcrosstx** [chainId] [formAddress] [toAddress] [assetChainId] [assetId] [amount] [remark]

| Parameter    | Specification                 | Remark                             |
| ------------ | ----------------------------- | ---------------------------------- |
| chainId      | transaction initiation chain ID | required, main network chain ID: 2 |
| formAddress  | from address          | required, main network address     |
| toAddress    | to address           | required，friend chain address     |
| assetChainId | asset chain ID                | required，main network ID：2       |
| assetId      | asset ID                      | required，main network asset ID：1 |
| amount       | asset amount                  | required，need to add 8 bit 0      |
| remark       | remark                        | optional                           |

Example：

```
nuls]]] createcrosstx 2 tNULSeBaMgDEcAUhPSdF3D3C6mT54HPUt81cQ4 M9busmRQB3UTMQsMaJHxKCQxpmvCdQD3QQW 2 1 20000000000
Please enter the password.
Enter your password:********
278104bb76b105fb03e224eccdf71807abf3b5dd84d36907f277f20c0d479098
```

### Query Cross-chain transaction Status

Command： getcrosstxstate [chainId] [txHash]

| Parameter | Specification            | Remark        |
| --------- | ------------------------ | ------------- |
| chainId   | chain ID                 | required（2） |
| txHash    | cross-chain trading hash | required      |

Example

```
nuls]]] getcrosstxstate 2 278104bb76b105fb03e224eccdf71807abf3b5dd84d36907f277f20c0d479098
Confirmed
```



### Parallel Chain Querys NULS

Parallel chain requires NULS as  fee for sending cross-chain transaction, so we need to transfer a small number of NULS to parallel chain first

Command: **getbalance** [address] [chainId] [assetId]

| Parameter | Specification                        | Remark                                    |
| --------- | ------------------------------------ | ----------------------------------------- |
| address   | friend chain address to receive NULS | required                                  |
| chainId   | chain ID                             | optional, chain ID : 2                    |
| assertId  | asset ID                             | optional，main network NULS asset ID :1 |

**PS**: Query address NULS balance, chain ID=2, asset ID=1

Example

```
nuls]]] getbalance M9busmRQB3UTMQsMaJHxKCQxpmvCdQD3QQW 2 1
{
  "available" : "200",
  "total" : "200",
  "freeze" : "0"
}
```



## Parallel Chain send Cross-chain transaction

Select a parallel chain to send a cross-chain transaction

Command: **createcrosstx** [chainId] [formAddress] [toAddress] [assetChainId] [assetId] [amount] [remark]

| Parameter    | Specification                 | Remark                        |
| ------------ | ----------------------------- | ----------------------------- |
| chainId      | transaction initiation chain ID | required                      |
| formAddress  | from address          | required                      |
| toAddress    | to address           | required                      |
| assetChainId | asset chain ID                | required                      |
| assetId      | asset ID                      | required                      |
| amount       | asset amount                  | required，need to add 8 bit 0 |
| remark       | remark                        | optional                      |

Example

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

### Query Cross-chain Assets

Check whether the cross-chain assets are received

Command: **getbalance** [address]  [chainId] [assetId]

| Parameter | Specification                        | Remark                            |
| --------- | ------------------------------------ | --------------------------------- |
| address   | friend chain address to receive NULS | required                          |
| chainId   | chain ID                             | optional,main network ID：2      |
| assertId  | asset ID                             | optional,main network asset ID：1 |

Example：

```
nuls]]] getbalance M9busmRQB3UTMQsMaJHxKCQxpmvCdQD3QQW 11 1
{
  "available" : "110",
  "total" : "110",
  "freeze" : "0"
}

```

