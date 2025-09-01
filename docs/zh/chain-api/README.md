# 🔧 链 API

欢迎来到 NULS AI 链 API 文档！本部分为想要与 NULS AI 区块链平台集成的开发者提供全面的 API 文档。

## 🎯 您将找到什么

链 API 文档涵盖了与 NULS AI 区块链交互所需的所有接口和协议，从基础查询到高级智能合约交互。

## 🚀 快速开始

### 新开发者入门
如果您是 NULS AI API 的新手，请从这些基础指南开始：

1. **[JSON-RPC API](./i_nuls-api_JSONRPC.md)** - 学习核心 RPC 接口
2. **[RESTful API](./i_nuls-api_RESTFUL.md)** - 使用基于 HTTP 的 API 端点
3. **[RPC 协议](./i_rpc_protocol.md)** - 了解协议规范

### 有经验的开发者
如果您已经熟悉区块链 API：

1. **[高级 RPC 方法](./i_nuls-api_JSONRPC.md#advanced-methods)** - 高级 API 功能
2. **[WebSocket 集成](./i_nuls-api_RESTFUL.md#websocket)** - 实时数据流
3. **[协议扩展](./i_rpc_protocol.md#extensions)** - 自定义协议扩展

## 📖 API 分类

### 📡 核心 API
基础区块链操作的核心 API：

- **[JSON-RPC API](./i_nuls-api_JSONRPC.md)** - 区块链操作的核心 RPC 接口
- **[RESTful API](./i_nuls-api_RESTFUL.md)** - Web 应用的基于 HTTP 的 API
- **[RPC 协议](./i_rpc_protocol.md)** - 协议规范和标准

### 🔗 集成 API
与外部系统集成的 API：

- **[JSON-RPC API](./i_nuls-api_JSONRPC.md)** - 完整的 JSON-RPC API 文档
- **[RESTful API](./i_nuls-api_RESTFUL.md)** - 完整的 RESTful API 文档
- **[RPC 协议](./i_rpc_protocol.md)** - RPC 协议规范

### 🌐 网络 API
网络和共识操作的 API：

- **[JSON-RPC API](./i_nuls-api_JSONRPC.md)** - 完整的 API 文档
- **[RESTful API](./i_nuls-api_RESTFUL.md)** - 基于 HTTP 的 API 接口
- **[RPC 协议](./i_rpc_protocol.md)** - 协议规范

## 🎯 开发者角色

### 👨‍💻 前端开发者
**重点**: Web 应用集成
- 从 [RESTful API](./i_nuls-api_RESTFUL.md) 开始
- 学习 [JSON-RPC API](./i_nuls-api_JSONRPC.md)
- 掌握 [RPC 协议](./i_rpc_protocol.md)

### 🔧 后端开发者
**重点**: 服务器端集成
- 从 [JSON-RPC API](./i_nuls-api_JSONRPC.md) 开始
- 学习 [RESTful API](./i_nuls-api_RESTFUL.md)
- 探索 [RPC 协议](./i_rpc_protocol.md)

### 🏗️ 系统集成商
**重点**: 企业系统集成
- 学习 [RPC 协议](./i_rpc_protocol.md)
- 了解 [JSON-RPC API](./i_nuls-api_JSONRPC.md)
- 掌握 [RESTful API](./i_nuls-api_RESTFUL.md)

## 🔧 开发工具

### 必备工具
- **NULS SDK** - 多语言官方 SDK
- **API 浏览器** - 交互式 API 测试工具
- **Postman 集合** - 预配置的 API 请求

### 开发资源
- **代码示例** - 多种语言的示例代码
- **API 参考** - 完整的 API 文档
- **测试环境** - API 测试沙盒

## 📚 学习路径

### 初学者路径（1-2周）
1. **第1周**: 基础 API 概念
   - 阅读 [JSON-RPC API](./i_nuls-api_JSONRPC.md)
   - 练习 [RESTful API](./i_nuls-api_RESTFUL.md)
   - 了解 [RPC 协议](./i_rpc_protocol.md)

2. **第2周**: 核心操作
   - 学习 [账户管理](./account-api.md)
   - 掌握 [交易 API](./transaction-api.md)

### 中级路径（2-4周）
1. **第3-4周**: 高级功能
   - 学习 [合约 API](./contract-api.md)
   - 探索 [区块 API](./block-api.md)
   - 了解 [网络 API](./network-api.md)

### 高级路径（1-2个月）
1. **第1-2个月**: 专家级别
   - 深入 [跨链 API](./cross-chain-api.md)
   - 高级协议扩展
   - 自定义 API 开发

## 🛠️ 常见用例

### 快速参考
- **[创建账户](./account-api.md#create)** - 如何创建新账户
- **[发送交易](./transaction-api.md#send)** - 如何发送交易
- **[查询余额](./account-api.md#balance)** - 如何检查账户余额
- **[部署合约](./contract-api.md#deploy)** - 如何部署智能合约

### 集成模式
- **[Web 应用](./integration-patterns.md#web-app)** - Web 应用集成
- **[移动应用](./integration-patterns.md#mobile-app)** - 移动应用集成
- **[企业系统](./integration-patterns.md#enterprise)** - 企业集成

## 🔍 API 参考

### 核心方法
- **账户方法** - 账户创建、余额和管理
- **交易方法** - 交易创建、签名和广播
- **区块方法** - 区块信息和验证
- **合约方法** - 智能合约部署和交互

### 高级功能
- **WebSocket 支持** - 实时数据流
- **批量操作** - 单次请求中的多个操作
- **错误处理** - 全面的错误代码和消息
- **速率限制** - API 使用限制和最佳实践

## 📊 API 性能

### 性能指标
- **响应时间** - 不同操作的典型响应时间
- **吞吐量** - 每秒最大请求数
- **可用性** - API 正常运行时间和可靠性
- **可扩展性** - API 如何随负载扩展

### 最佳实践
- **缓存策略** - 如何缓存 API 响应
- **连接管理** - 高效管理 API 连接
- **错误恢复** - 优雅处理 API 故障
- **安全性** - API 安全最佳实践

## 🔒 安全与认证

### 认证方法
- **API 密钥** - 基础操作的简单认证
- **JWT 令牌** - 安全的基于令牌的认证
- **OAuth 2.0** - 标准 OAuth 认证
- **自定义认证** - 自定义认证方案

### 安全功能
- **仅 HTTPS** - 所有 API 使用安全连接
- **速率限制** - 防止滥用保护
- **输入验证** - 全面的输入验证
- **审计日志** - 所有操作的完整审计跟踪

## 📞 获取帮助

### 开发者支持
- **API 文档**: 完整的参考文档
- **代码示例**: 多种语言的示例代码
- **SDK 文档**: 官方 SDK 指南

### 社区支持
- **开发者论坛**: [https://forum.nuls.io](https://forum.nuls.io)
- **GitHub Issues**: 报告 API 问题
- **Discord**: 实时开发者支持

### 企业支持
- **技术支持**: 企业用户的专用支持
- **自定义集成**: 帮助自定义集成
- **培训**: API 培训和研讨会

## 🔄 API 更新

### 版本控制
- **API 版本控制**: 我们如何对 API 进行版本控制
- **迁移指南**: 如何升级到新版本
- **弃用政策**: 我们的弃用和日落政策

### 最新更新
- **发布说明**: 最新 API 更改和改进
- **新功能**: 最近添加的 API 功能
- **重大更改**: 可能影响您代码的重要更改

---

<div style="text-align: center; margin-top: 3rem; padding: 2rem; background: #f8fafc; border-radius: 1rem;">
  <h3>🚀 准备集成？</h3>
  <p>今天就开始使用 NULS AI API 进行构建！</p>
  <a href="./i_nuls-api_JSONRPC.md" class="btn" style="margin: 1rem;">🔧 开始编码</a>
</div>
