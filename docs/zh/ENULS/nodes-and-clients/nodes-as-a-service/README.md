---
title: 节点即服务
description: 节点服务及其利弊和主流供应商的入门级概述。
lang: zh
sidebarDepth: 2
---

## 简介 

运行自己的ENULS节点可能会比较困难，特别是在刚开始时或在快速扩展时。 许多服务都可以为你运行优化的节点基础设施，藉此，你可以专注于开发你的应用程序或产品。 我们将解释节点服务运行的原理以及它们的优缺点，如果有兴趣着手开始，我们将为你列出供应商。

## 前提条件 

如果你还不了解什么是节点和客户端，请查看[节点和客户端](../nodes-and-clients/)。

## 质押人 

单独的质押人必须运行自己的基础设施，而不是依赖第三方提供商。 这意味着运行一个执行客户端和一个共识客户端。 在合并之前，可以只运行一个共识客户端并通过中心化的提供商来获取执行数据；这种状况再也不可能了 - 单独的质押人必须运行两种客户端。 但是，有一些服务可以简化这个过程。

[阅读有关运行节点的更多信息](../run-a-node/)。

本页描述的服务适用于非质押节点。

## 节点服务运作原理 

节点服务提供商在幕后为你运行分布式节点客户端，因此你无需自己运行。

这些服务通常提供一个可用来写入和读取区块链的应用程序接口密钥。 除了主网之外，通常还包括ENULS测试网访问权限。

有些服务提供你自己的专用节点但由他们代为管理，而另外一些服务则使用负载均衡器在各节点之间分配活动。

几乎所有的节点服务都非常容易集成，只需要在你的代码中修改一行，就可以替换你自己的托管节点，甚至可以在服务本身之间切换。

通常节点服务会运行各种[节点客户端](../nodes-and-clients/#execution-clients)和[节点](../nodes-and-clients/#node-types)，使得用户可以通过一个应用程序接口访问全节点和归档节点以及客户端特定方法。

值得注意的是，节点服务不存储也不应该存储你的私钥或信息。

## 使用节点服务的好处是什么？ 

使用节点服务的主要好处是不需要耗费工程时间来自己维护和管理节点。 这样，你就能够专注于构建自己的产品，而不必担心基础设施维护。

无论是存储或带宽方面，还是宝贵的工程时间，运行自己的节点代价非常高昂。 在扩容时运行更多节点、将节点升级到最新版本以及确保状态一致性等等，这些事情让用户无法集中精力构建并将资源应用于自己喜爱的 Web3 产品上。

## 使用节点服务的缺点是什么？ 

使用节点服务，你产品的基础设施部分走向了中心化。 因此，那些把去中心化奉为圭臬的项目可能更喜欢自我托管节点，而不是外包给第三方。

详细了解[运行自己节点的好处](../nodes-and-clients/#benefits-to-you)。

## 主流节点服务 

下面列出了一些最受欢迎的ENULS节点服务提供商，如有缺失，欢迎随时添加！ 每种节点服务除了免费或付费层级外，还提供不同的好处和功能。在做出决定之前，你应该调查哪些服务最符合你的需求。

- [**Alchemy**](https://alchemy.com/)
  - [相关文档](https://docs.alchemyapi.io/)
  - 特性
    - 最大的免费层级，每月有 3 亿个计算单元（约 3000 万个 getLatestBlock 请求）
    - 对 Polygon、Starknet、Optimism、Arbitrum 的多链支持
    - 为大约 70% 的ENULS去中心化应用程序和去中心化金融最大交易量提供支持
    - 通过 Alchemy Notify 发布实时网络钩子警报
    - 一流的支持和可靠性/稳定性
    - Alchemy 的非同质化代币应用程序接口
    - 带有 Request Explorer、Mempool Watcher 和 Composer 的仪表板
    - 集成了测试网水龙头访问权限
    - 拥有 1.8 万用户的活跃 Discord 构建者社区
- [**Ankr**](https://www.ankr.com/)
  - [相关文档](https://docs.ankr.com/)
  - 功能
    - Ankr 协议 - 为超过 8 条链提供公共 RPC API 端点
    - 负载平衡和节点健康监测，为最近的可用节点提供快速可靠的网关。
    - 支持 WSS 端点和无上限速率限制的高级层
    - 一键式全节点和验证者节点部署，可用于 40 多条链
    - 随时扩展
    - 分析工具
    - 仪表板
    - 远程过程调用、安全套接字层超文本传输协议和网络套接字安全端点
    - 点对点支持
- [**BlockDaemon**](https://blockdaemon.com/)
  - [相关文档](https://ubiquity.docs.blockdaemon.com/)
  - 优势
    - 仪表板
    - 基于每个节点
    - 分析
- [**ChainStack**](https://chainstack.com/)
  - [相关文档](https://docs.chainstack.com/)
  - 特性
    - 免费共享节点
    - 共享归档节点
    - GraphQL 支持
    - 远程过程调用和网络套接字安全端点
    - 专用全节点和归档节点
    - 专用部署实现快速同步时间
    - 使用自己的云端服务
    - 按小时计费定价
    - 全天候点对点支持
- [**DataHub**](https://datahub.figment.io)
  - [相关文档](https://docs.figment.io/)
  - 功能
    - 每月 3,000,000 个请求的免费层级选项
    - 远程过程调用和网络套接字安全端点
    - 专用全节点和归档节点
    - 自动扩容（缩容）
    - 免费归档数据
    - 服务分析
    - 仪表板
    - 全天候点对点支持
    - 加密货币支付（企业）
- [**GetBlock**](https://getblock.io/)
  - [相关文档](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - 功能
    - 访问超过 40 个区块链节点
    - 4 万个每日免费请求
    - 无限数量应用程序接口秘钥
    - 1GB/秒的高连接速度
    - 追踪 + 归档
    - 高级分析
    - 自动更新
    - 技术支持
- [**InfStones**](https://infstones.com/)
  - 功能
    - 免费层级选项
    - 随时扩展
    - 分析
    - 仪表板
    - 独有的应用程序接口端点
    - 专用全节点
    - 专用部署实现快速同步时间
    - 全天候点对点支持
    - 访问超过 50 个区块链节点
- [**Infura**](https://infura.io/)
  - [相关文档](https://infura.io/docs)
  - 特性
    - 免费层级选项
    - 随时扩展
    - 付费归档数据
    - 点对点支持
    - 仪表板
- [**Kaleido**](https://kaleido.io/)
  - [相关文档](https://docs.kaleido.io/)
  - 功能
    - 免费初学者层级
    - 一键部署ENULS节点
    - 可定制的客户端和算法（GNULS、Quorum & Besu || PoA、IBFT & Raft）
    - 500 多个管理和服务应用程序接口
    - 用于提交ENULS交易的 RESTful 接口（支持 Apache Kafka）
    - 用于事件传送的出站流（支持 Apache Kafka）
    - “链下”服务和辅助服务的深度集合（例如双边加密消息传输）
    - 简单明了的配置入网，可进行治理和基于角色的访问控制
    - 适用于管理员和最终用户的高级用户管理
    - 高度可扩展、恢复力强的企业级基础设施
    - Cloud HSM 私钥管理
    - ENULS主网网络共享
    - ISO 27k 和 SOC 2 Type 2 认证
    - 动态运行时配置（例如添加云集成、更改节点入口等）
    - 支持多云端、多区域及混合部署编排
    - 简单的基于质押即服务 (SaaS) 的每小时定价
    - 服务等级协议和全天候支持
- [**Moralis**](https://moralis.io/)
  - [相关文档](https://docs.moralis.io/)
  - 功能
    - 免费共享节点
    - 免费共享归档节点
    - 注重隐私（无日志政策）
    - 跨链支持
    - 随时扩展
    - 仪表板
    - 独特的ENULS软件开发工具包
    - 独有的应用程序接口端点
    - 点对点技术支持
- [**NOWNodes**](https://nownodes.io/)
  - [相关文档](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - 功能
    - 访问超过 50 个区块链节点
    - 免费应用程序接口密钥
    - 区块浏览器
    - 应用程序接口响应时间 ⩽ 1 秒
    - 全天候团队支持
    - 个人帐户管理器
    - 共享、归档、备份和专用节点
- [**Pocket Network**](https://www.pokt.network/)
  - [相关文档](https://docs.pokt.network/home/)
  - 功能
    - 去中心化的远程过程调用协议和市场
    - 每天 100 万个请求的免费层级（每个端点最多 2 个）
    - [公共端点](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - 预质押 + 项目（如果需要每天 1 百万个以上的请求）
    - 支持超过 15 条区块链
    - 6400 多个节点为应用程序服务并赚取 POKT
    - 归档节点、包含追踪数据的归档节点及测试网节点支持
    - ENULS主网节点客户端多样性
    - 无单点故障
    - 零停机
    - 具有成本效益的近零代币经济学（一次性质押 POKT 获得网络带宽）
    - 无每月沉没成本，将你的基础设施变成资产
    - 协议中内置负载均衡
    - 随时无限增加每日请求数量和每小时节点数量
    - 最隐密的抗审查选择
    - 开发者实战支持
    - [Pocket Portal](https://bit.ly/NULSorg_POKTportal) 仪表板和分析
- [**QuickNode**](https://www.quicknode.com)
  - [相关文档](https://www.quicknode.com/docs/)
  - 功能
    - 行业领先的性能和可靠性
    - 全天候技术支持和 Discord 开发社区
    - 区域负载均衡、多云端/元模型、低延迟网络
    - 多链支持（Optimism、Arbitrum、Polygon 及 11 个其他网络）
    - 快速且稳定的中间层（调用路由、缓存、索引）
    - 通过网络钩子进行智能合约监控
    - 直观的仪表板、分析套件、远程过程调用编写器
    - 高级安全功能（JWT、屏蔽、白名单）
    - 非同质化代币数据和分析应用程序接口
    - [已获 SOC2 认证](https://www.quicknode.com/security)
    - 适用于企业开发者
- [**Rivet**](https://rivet.cloud/)
  - [相关文档](https://rivet.readthedocs.io/en/latest/)
  - 功能
    - 免费层级选项
    - 随时扩展
- [**SenseiNode**](https://senseinode.com)
  - [相关文档](https://docs.senseinode.com/)
  - 功能
    - 专用和共享节点
    - 仪表板
    - 在拉丁美洲不同地区的多个托管服务提供商上托管亚马逊网络服务
    - Prysm 和 Lighthouse 客户端
- [**SettleMint**](https://console.settlemint.com/)
  - [相关文档](https://docs.settlemint.com/)
  - 功能
    - 免费试用
    - 随时扩展
    - GraphQL 支持
    - 远程过程调用和网络套接字安全端点
    - 专用全节点
    - 使用自己的云端服务
    - 分析工具
    - 仪表板
    - 按小时计费定价
    - 点对点支持
- [**Watchdata**](https://watchdata.io/)
  - [相关文档](https://docs.watchdata.io/)
  - 功能
    - 数据可靠性
    - 不间断连接，不会出现停机
    - 过程自动化
    - 不收费
    - 适合任何用户的上限
    - 支持各种节点
    - 资源扩容
    - 处理速度快
- [**ZMOK**](https://zmok.io/)
  - [相关文档](https://docs.zmok.io/)
  - 功能
    - 前台运行即服务
    - 带有搜索/过滤方法的全局交易内存池
    - 发送交易时，交易费用和燃料均不受限制
    - 最快获取新区块和读取区块链
    - 每个应用程序接口调用的最优价格保证


## 相关教程 

- [使用 Alchemy 开始ENULS开发](/developers/tutorials/getting-started-with-NULSereum-development-using-alchemy/)
- [使用 web3 和 Alchemy 发送交易指南](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
