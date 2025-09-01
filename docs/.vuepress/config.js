module.exports = {
  title: "NULS AI Documentation",
  description: "The Global AI Consumer Layer - NULS AI Blockchain Documentation",
  base: "/",
  markdown: {
    lineNumbers: false,
  },
  locales: {
    "/": {
      lang: "en-US",
      title: "Documentation",
      description: "The Global AI Consumer Layer - NULS AI Blockchain Documentation",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "文档",
      description: "全球AI消费层 - NULS AI 区块链文档",
    },
  },
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#A8D5FF" }],
  ],
  themeConfig: {
    repo: "nuls-io/devsite/",
    editLinks: true,
    docsDir: "docs",
    docsBranch: "master",
    sidebarDepth: 3,
    lastUpdated: "Last Updated",
    smoothScroll: true,
    logo: '/logo.svg',
    locales: {
      "/": {
        selectText: "Languages",
        label: "English",
        editLinkText: "Edit this page on GitHub",
        lastUpdated: "Last Updated",
        nav: [
          { text: "User Guide", link: "/user-guide/" },
          { text: "API", link: "/chain-api/" },
          { text: "DApp Development", link: "/dapp-builder/" },
          { text: "Chain Builder", link: "/chain-builder/" },
          { text: "Modules", link: "/modules/" },
        ],
        sidebar: {
          "/user-guide/": [
            {
              title: "📚 User Guide",
              collapsable: false,
              children: [
                "",
                {
                  title: "🚀 Getting Started",
                  collapsable: true,
                  children: [
                    "quickstart",
                    "transaction",
                  ]
                },
                {
                  title: "⚙️ Node Management",
                  collapsable: true,
                  children: [
                    "node",
                    "upgrade",
                    "docker",
                    "linux-tutorial",
                  ]
                },
                {
                  title: "🏛️ Governance & Consensus",
                  collapsable: true,
                  children: [
                    "pocm",
                    "governance",
                    "multi-sign",
                  ]
                },
              ],
            },
          ],
          "/chain-api/": [
            {
              title: "🔧 API Reference",
              collapsable: false,
              children: [
                "",
                {
                  title: "📡 API Interfaces",
                  collapsable: true,
                  children: [
                    "i_nuls-api_JSONRPC",
                    "i_nuls-api_RESTFUL",
                    "i_rpc_protocol",
                  ]
                },
              ],
            },
          ],
          "/dapp-builder/": [
            {
              title: "🚀 DApp Development",
              collapsable: false,
              children: [
                "",
                {
                  title: "📖 Smart Contracts",
                  collapsable: true,
                  children: [
                    "s_manual",
                    "s_advance",
                    "s_tools",
                  ]
                },
                {
                  title: "🪙 Token Standards",
                  collapsable: true,
                  children: [
                    "s_nrc20",
                    "s_nrc721",
                  ]
                },
              ],
            },
          ],
          "/chain-builder/": [
            {
              title: "🏗️ Chain Builder",
              collapsable: false,
              children: [
                "",
                {
                  title: "🔧 ChainBox Tools",
                  collapsable: true,
                  children: [
                    "c_chain_box",
                    "c_message_module",
                    "c_module",
                  ]
                },
              ],
            },
          ],
          "/modules/": [
            {
              title: "⚙️ Core Modules",
              collapsable: false,
              children: [
                "",
                {
                  title: "🏗️ Design Documents",
                  collapsable: true,
                  children: [
                    "d_account",
                    "d_address",
                    "d_block",
                    "d_chain_manager",
                    "d_consensus",
                    "d_cross_chain",
                    "d_ledger",
                    "d_network",
                    "d_protocol_update",
                    "d_public_service",
                    "d_smart_contract",
                    "d_transaction",
                  ]
                },
                {
                  title: "📋 Implementation Guides",
                  collapsable: true,
                  children: [
                    "i_account",
                    "i_block",
                    "i_chain-manager",
                    "i_consensus",
                    "i_cross-chain",
                    "i_ledger",
                    "i_network",
                    "i_public_service",
                    "i_smart-contract",
                    "i_transaction",
                  ]
                },
                {
                  title: "🔧 System Tools",
                  collapsable: true,
                  children: [
                    "s_offline_assembly",
                  ]
                },
              ],
            },
          ],
        },
      },
      "/zh/": {
        selectText: "选择语言",
        label: "中文",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "最后更新",
        nav: [
          { text: "用户指南", link: "/zh/user-guide/" },
          { text: "API接口", link: "/zh/chain-api/" },
          { text: "DApp开发", link: "/zh/dapp-builder/" },
          { text: "构建链", link: "/zh/chain-builder/" },
          { text: "模块", link: "/zh/modules/" },
        ],
        sidebar: {
          "/zh/user-guide/": [
            {
              title: "📚 用户指南",
              collapsable: false,
              children: [
                "",
                {
                  title: "🚀 快速开始",
                  collapsable: true,
                  children: [
                    "quickstart",
                    "transaction",
                  ]
                },
                {
                  title: "⚙️ 节点管理",
                  collapsable: true,
                  children: [
                    "node",
                    "upgrade",
                    "docker",
                    "linux-tutorial",
                  ]
                },
                {
                  title: "🏛️ 治理共识",
                  collapsable: true,
                  children: [
                    "pocm",
                    "governance",
                    "multi-sign",
                  ]
                },
              ],
            },
          ],
          "/zh/chain-api/": [
            {
              title: "🔧 API 参考",
              collapsable: false,
              children: [
                "",
                {
                  title: "📡 API 接口",
                  collapsable: true,
                  children: [
                    "i_nuls-api_JSONRPC",
                    "i_nuls-api_RESTFUL",
                    "i_rpc_protocol",
                  ]
                },
              ],
            },
          ],
          "/zh/dapp-builder/": [
            {
              title: "🚀 DApp 开发",
              collapsable: false,
              children: [
                "",
                {
                  title: "📖 智能合约",
                  collapsable: true,
                  children: [
                    "s_manual",
                    "s_advance",
                    "s_tools",
                  ]
                },
                {
                  title: "🪙 代币标准",
                  collapsable: true,
                  children: [
                    "s_nrc20",
                    "s_nrc721",
                  ]
                },
              ],
            },
          ],
          "/zh/chain-builder/": [
            {
              title: "🏗️ 构建链",
              collapsable: false,
              children: [
                "",
                {
                  title: "🔧 ChainBox 工具",
                  collapsable: true,
                  children: [
                    "c_chain_box",
                    "c_message_module",
                    "c_module",
                  ]
                },
              ],
            },
          ],
          "/zh/modules/": [
            {
              title: "⚙️ 核心模块",
              collapsable: false,
              children: [
                "",
                {
                  title: "🏗️ 设计文档",
                  collapsable: true,
                  children: [
                    "d_account",
                    "d_address",
                    "d_block",
                    "d_chain_manager",
                    "d_consensus",
                    "d_cross_chain",
                    "d_ledger",
                    "d_network",
                    "d_protocol_update",
                    "d_public_service",
                    "d_smart_contract",
                    "d_transaction",
                  ]
                },
                {
                  title: "📋 实现指南",
                  collapsable: true,
                  children: [
                    "i_account",
                    "i_block",
                    "i_chain-manager",
                    "i_consensus",
                    "i_cross-chain",
                    "i_ledger",
                    "i_network",
                    "i_public_service",
                    "i_smart-contract",
                    "i_transaction",
                  ]
                },
                {
                  title: "🔧 系统工具",
                  collapsable: true,
                  children: [
                    "s_offline_assembly",
                  ]
                },
              ],
            },
          ],
        },
      },
    },
  },
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search Documentation'
          },
          '/zh/': {
            placeholder: '搜索文档'
          }
        }
      }
    ]
  ]
};
