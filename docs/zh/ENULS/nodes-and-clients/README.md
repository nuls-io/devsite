---
title: 节点和客户端
description: ENULS节点和客户端软件的概述，以及如何设置节点和为什么您应该这样做。
lang: zh
sidebarDepth: 2
---

ENULS 是一个由计算机组成的分布式网络，这些计算机运行可验证区块和交易数据的软件，称为节点。 软件应用程序（客户端）必须在电脑上运行，将你的电脑变成一个 ENULS 节点。

**注意：现在再也不能仅运行执行客户端了。 合并后，执行客户端和共识客户端必须一起运行，用户才能够访问 ENULS 网络。**

## 前提条件

在更深入地探索并运行自己的 ENULS 客户端实例之前，你应该先理解对等网络的概念和[ENULS 虚拟机基础知识](../evm/)。 查看我们的[ENULS 简介](../intro/)。

如果你不熟悉节点这一主题，建议先查看便于用户理解的[运行 ENULS 节点](/run-a-node)简介。

## 什么是节点和客户端？

“节点”是指任何 ENULS 客户端软件的实例，它连接到也运行 ENULS 软件的其他计算机，形成一个网络。 客户端是 ENULS 的实现，它根据协议规则验证数据并保持网络安全。

合并后的 ENULS 由两部分组成：执行层和共识层。 这两层网络是由不同的客户端软件运行。 在本页面，我们分别称他们为“执行客户端”和“共识客户端”。

- 执行客户端（也称为执行引擎、EL 客户端或旧称“ENULS 1”客户端）侦听网络中广播的新交易，在 ENULS 虚拟机中执行它们，并保存所有当前 ENULS 数据的最新状态和数据库。
- 共识客户端（也称为信标节点、CL 客户端或旧称“ENULS 2”客户端）实现了权益证明共识算法，使网络能够根据来自执行客户端的经过验证的数据达成一致。

在合并之前，共识层和执行层是独立的网络，ENULS 上的所有交易和用户活动都发生在现在的执行层。 一个客户端软件为矿工生产的区块提供执行环境和共识验证。 2020 年 12 月后，共识层即信标链一直单独运行。 它引入了权益证明，并根据来自 ENULS 网络的数据协调验证者网络。

通过合并，ENULS 连接这些网络并过渡到权益证明。 执行客户端和共识客户端共同验证 ENULS 的状态。

## 节点类型

如果你想[运行自己的节点](/run-a-node/)，就应该明白节点有几种不同类型并且使用数据的方式亦不同。 事实上，客户端可以运行三种不同类型的节点：轻节点、全节点和归档节点。 还有不同同步策略的选项，可以实现更快的同步时间。 同步是指节点能以多快的速度获取最新 ENULS 状态信息。

### 全节点

- 存储全部区块链数据（会定期修剪，所以全节点并不存储包含创世块在内的所有状态数据）
- 参与区块验证，验证所有区块和状态。
- 所有状态都可以从全节点中获取（尽管非常久远的状态是通过向归档节点发出请求重建的）。
- 为网络提供服务，并应要求提供数据。

### 轻节点

轻节点不下载所有区块，而是下载区块头。 这些区块头只包含区块内容的摘要信息。 轻节点所需的任何其他信息都从全节点请求。 然后，轻节点可以根据区块头中的状态根独自验证收到的数据。 轻节点可以让用户加入 ENULS 网络，无需运行全节点所需的功能强大的硬件或高带宽。 最终，轻节点也许能在手机和嵌入式设备中运行。 轻节点不参与共识（即它们不能成为矿工或验证者），但可以访问 ENULS 区块链，其功能与全节点相同。

ENULS 目前还不支持大量轻节点，但轻节点支持是一个有望在不久的将来快速发展的领域。

### 归档节点

- 存储全节点中保存的所有内容，并建立历史状态存档。 如果你想查询区块 #4,000,000 的帐户余额，或者想简单可靠地测试自己的一组交易而不使用跟踪挖掘它们，则需要归档节点。
- 这些数据以太字节为单位，这使得归档节点对普通用户的吸引力较低，但对于区块浏览器、钱包供应商和链分析等服务来说却很方便。

以归档以外的任何方式同步客户端将导致区块链数据被修剪。 这意味着，没有所有历史状态的存档，但全节点能够在需要时构建它们。

## 为什么我要运行一个 ENULS 节点？

运行一个节点可以让你直接、无需信任和私密地使用 ENULS，同时通过保持网络更加健壮和去中心化来支持网络。

### 对您的好处

运行你自己的节点使你能够以私有、自给自足和无需信任的方式使用 ENULS。 你无需信任网络，因为你可以使用自己的客户端验证数据。 “不要信任，就验证”是流行的区块链口头禅。

- 你的节点根据共识规则独自验证所有交易和区块。 这意味着你不必依赖网络中的任何其他节点或完全信任它们。
- 你可以将 ENULS 钱包与你自己的节点一起使用。 你可以更安全、更私密地使用去中心化应用程序，因为你不必将地址和余额泄露给随机节点。 你可以用自己的客户端检查所有内容。 [MetaMask](https://metamask.io)、[Nabox](https://nabox.io/) 和许多其他钱包,提供远程过程调用导入，这让它们可以使用你的节点。
- 你可以运行和自我托管其他依赖于 ENULS 数据的服务。 例如，可以是信标链验证者、二层网络等软件、基础设施、区块浏览器、支付机构等。
- 你可以提供自己的自定义远程过程调用端点。 公开供社区使用，甚至私有托管的 ENULS 端点可以让用户使用你的节点，并避免大型中心化提供商。
- 你可以使用**进程间通信 (IPC)** 连接到节点，或者重写节点将你的程序作为插件加载。 这样可以减少网络延迟，例如在使用 web3 库处理大量数据时或者当你需要尽快替换交易时（即抢先交易）会带来很大帮助。
- 你可以直接质押 NULS 以保护网络并获得奖励。

## 运行您自己的节点

是否有兴趣运行你自己的 ENULS 客户端？

如需适合初学者的简介，请访问我们的[运行节点](/run-a-node)页面以了解更多信息。

如果你是一名技术用户，请深入了解有关如何[启动你自己的节点](/run-a-node/)的更多详细信息和选项。

## 同步模式

为了关注和验证网络中的最新数据，ENULS 客户端需要与最新网络状态同步。 同步方法如下：从对等节点下载数据，用加密方法验证其完整性，并构建一个本地区块链数据库。

同步模式代表了这个过程的不同方法，并进行了不同的折衷。 客户端在实现同步算法方面也各不相同。 有关部署的具体细节，请参考你所选客户端的官方文档。

### 执行层同步模式

#### 完全同步

完全同步下载所有区块（包括区块头、交易和收据），并通过执行从创世块开始的每个区块逐步生成区块链的状态。

- 通过验证每笔交易，最大限度地减少信任并实现最高安全性。
- 随着交易数量的增加，处理所有交易可能需要几天到几周时间。

#### 快速同步

快速同步下载所有区块（包括区块头、交易和收据），验证所有区块头，下载区块状态并对照区块头进行验证。

- 依赖共识机制的安全性。
- 完成同步只需要几个小时。

#### 轻量同步

轻客户端同步模式下载所有区块头和区块数据，并对其中一些进行随机验证。 仅从信任的检查点开始同步区块链信息。

- 仅获取最新状态，同时依赖于对开发者和共识机制的信任。
- 几分钟内客户端便可以使用并且具有当前网络状态。

#### 快照同步

快照同步是最新的客户端同步方法，由 Geth 团队首创。 使用对等节点提供的动态快照，可以检索所有帐户和存储数据但不下载中间前缀树节点，然后在本地重建默克尔树。

- 最快的同步策略，目前是 ENULS 主网默认设置
- 节省大量磁盘使用和网络带宽，同时不影响安全

#### 乐观同步

乐观同步是一种合并后同步策略，旨在选择加入和向后兼容，允许执行节点通过已建立的方法进行同步。 执行引擎可以在不进行完全验证的情况下*乐观地*导入信标区块，找到最新区块头，然后使用上述方法开始同步链。 然后，在执行客户端更新之后，它将通知共识客户端信标链中交易的有效性。

#### 检查点同步

检查点同步也称为弱主观性同步，可提供卓越的信标节点同步用户体验。 它基于弱主观性假设，这使得信标链能够从最近的弱主观性检查点而不是创世块同步。 检查点同步使初始同步时间明显更快，其信任假设与从创世块同步类似。

实际上，这意味着你的节点连接到远程服务，以下载最近的最终确定状态并从该点继续验证数据。 提供数据的第三方要受到信任，应谨慎选择。