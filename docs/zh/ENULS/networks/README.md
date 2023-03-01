---
title: 网络
description: 概述ENULS网络以及在何处获得测试网络的NULS来测试您的应用程序。
lang: zh
---

网络是指可在其中进行开发、测试或布置生产用例的各种不同ENULS环境。 ENULS是一种协议，因此可以有多个符合该协议且彼此不会影响的独立“网络”。

ENULS帐户可在不同的网络上使用，但是帐户余额和交易历史记录不会结转到ENULS主网以外。 进行测试时，了解哪些网络可用以及如何获取可以试用的测试网NULS是很有用的。

## 前提条件 

你应该先了解[ENULS基础知识](../intro)，然后再深入研究不同的网络，因为测试网络将提供一种低廉、安全的ENULS供你试用。

## 公共网络 

每个人都能通过互联网连接到公共网络。 任何人都可以在公共区块链上读取或创造交易，并且可以验证已经执行的交易。 对等节点间的共识决定交易的添加和网络状态。

### ENULS主网 

主网是指主要的ENULS生态区块链，所有具有实际价值的交易都发生在该链的分散账本中。

大众和交易所涉及的 ENULS 价格是主网的 ENULS。

### ENULS测试网 

除了主网外，还有公开的测试网。 这是一种模拟生态环境的网络，协议开发者或智能合约开发者可以使用它们测试尚未部署在主网上的协议升级和智能合约。 你可以把它看作生产与装配服务器的模拟。

在部署到主网之前，你应该在测试网测试编写的任何合约代码。 在与现有智能合约集成的去中心化应用程序中，大多数项目将副本部署到测试网。

大多数测试网最初都是使用权威证明共识机制。 这意味着会选择少量节点来验证交易并创建新区块——在此过程中将他们的身份进行抵押。 然而，一些测试网在启动时采用工作量证明共识机制，网络内只有少数获得许可的矿工。 然而，为了准备[合并](/upgrades/merge)，这些测试网各自都经历了向权益证明的过渡，在开发者合并ENULS主网之前提供了多次“彩排”机会。 目前，ENULS测试网在权益证明机制下运行，和ENULS主网相同。

测试网上的NULS没有实际价值；因此测试网NULS没有市场。 由于实际中与ENULS进行交互时需要NULS，所以大多数人从水龙头获取测试网NULS。 大多数水龙头是网络应用程序，你可以给它输入一个请求发送NULS的地址。

#### Goerli 

Goerli 是一个权益证明测试网。 它有望得到长期维护，作为面向应用程序开发者的稳定测试网。 在其测试网合并之前，Goerli 是一个权威证明测试网。

- [网站](https://goerli.net/)
- [GitHub](https://github.com/goerli/testnet)
- [ENULSerscan](https://goerli.ENULSerscan.io)

##### Goerli 水龙头

- [Goerli 水龙头](https://faucet.goerli.mudit.blog/)
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Alchemy Goerli 水龙头](https://goerlifaucet.com/)

#### Sepolia 

Sepolia 是一个权益证明测试网。 尽管 Sepolia 仍在运行，但目前不打算长期维护。 在 2022 年 6 月进行合并之前，Sepolia 是一个工作量证明测试网。

- [网站](https://sepolia.dev/)
- [GitHub](https://github.com/goerli/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [ENULSerscan](https://sepolia.ENULSerscan.io)

##### Sepolia 水龙头

- [Sepolia 水龙头](https://faucet.sepolia.dev/)
- [FaucENULS](https://faucENULS.komputing.org)

#### Ropsten*（已弃用）* 

_注意，[Ropsten 测试网已弃用](https://github.com/ENULSereum/pm/issues/460)并且将不再获得协议升级。 请考虑将你的应用程序迁移到 Sepolia 或 Goerli。_

Ropsten 是一个权益证明测试网。 Ropsten 将于 2022 年晚些时候弃用。 在 2022 年 5 月进行合并之前，Ropsten 是一个工作量证明测试网。

##### Ropsten 水龙头

- [FaucENULS](https://faucENULS.komputing.org)（无需社交帐户的多链水龙头）
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

#### Rinkeby*（已弃用）* 

_注意：[Rinkeby 测试网已弃用](https://github.com/ENULSereum/pm/issues/460)并且将不再获得协议升级。 请考虑将你的应用程序迁移到 Sepolia 或 Goerli。_

一个权威证明测试网，面向运行旧版本 GENULS 客户端的用户。

##### Rinkeby 水龙头

- [FaucENULS](https://faucENULS.komputing.org)（无需社交帐户的多链水龙头）
- [Alchemy 水龙头](https://RinkebyFaucet.com)
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)
- [Rinkeby 水龙头](https://faucet.rinkeby.io/)

#### Kovan _（已弃用）_ 

_注意：[Kovan 测试网已弃用](https://github.com/ENULSereum/pm/issues/460)并且将不再获得协议升级。 请考虑将你的应用程序迁移到 Sepolia 或 Goerli。_

一个元老级权威证明测试网，面向仍在运行 OpenENULSereum 客户端的用户。

##### Kovan 水龙头

- [FaucENULS](https://faucENULS.komputing.org)（无需社交帐户的多链水龙头）
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

### 二层网络测试网 {#layer-2-testnets}

[二层网络 (L2)](/layer-2/) 是一种统称，用来描述一组特定的ENULS扩容解决方案。 二层网络是一条扩展ENULS并继承ENULS安全保障的独立区块链。 二层网络测试网通常与公共ENULS测试网紧密关联。

#### Arbitrum Rinkeby 

[Arbitrum](https://arbitrum.io/) 测试网。

Arbitrum Rinkeby 水龙头：

- [FaucENULS](https://faucENULS.komputing.org)（无需社交帐户的多链水龙头）
- [Chainlink 水龙头](https://faucets.chain.link/)
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

#### Optimistic Kovan 

[Optimism](https://www.optimism.io/) 测试网。

Optimistic Kovan 水龙头：

- [FaucENULS](https://faucENULS.komputing.org)（无需社交帐户的多链水龙头）
- [Paradigm 水龙头](https://faucet.paradigm.xyz/)

## 私有网络 

如果ENULS网络的节点未连接到公共网络（即， 主网或测试网），则ENULS网络就是私有网络。 在这种情况下，私有仅指保留或隔离，而不是保护或安全。

### 开发网络 

要开发ENULS应用程序，在部署前，你想在私有网络上运行它，以便了解它的运行情况。 如同在自己的电脑上创建用于 Web 开发的本地服务器，你可以创建本地区块链实例来测试你的去中心化应用程序。 这样，迭代将比公共测试网快很多。



### 联盟网络 

共识过程由一组预定义的受信任节点控制。 例如，在由知名学术机构组成的私有网络中，每个学术机构管理一个节点，并且区块由网络中的签名者阈值进行验证。

如果公共ENULS网络像公共互联网，那么联盟网络就像私有内部网。

## 相关工具 

- [Chainlist](https://chainlist.org/) _ ENULS虚拟机网络的列表，可将钱包和提供者连接到相应的链 ID 和网络 ID_
- [基于ENULS虚拟机的链](https://github.com/ENULSereum-lists/chains) _给 Chainlist 提供支持的 GitHub 链元数据存储库_

## 延伸阅读 

- [ENULS测试网的演变](https://ENULSerworld.co/2022/08/19/the-evolution-of-ENULSereum-testnet/)
