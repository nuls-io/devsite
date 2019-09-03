module.exports = {
    base : '/',
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            title:"NULS",
            lang: 'en-US',
            description: 'Make Blockchain Easy'
        },   
        '/zh/': {
            title:"NULS",
            lang: 'zh-CN',
            description: '让区块链更简单'
        }
    },
    head:[
    ['link', { rel: 'icon', href: "/icon.png" }]
    ],
    themeConfig : {
        repo: 'nuls-io/devsite/tree/dev',
        editLinks: true,
        docsDir: 'docs',
        docsBranch: 'dev',
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                editLinkText: 'Edit this page on GitHub',
                nav:[
                {text:"Guide",link:"/Guide/"},
                {text:"Docs",link:"/Docs/"}
                ],
                sidebar: {
                    "/Guide/":[
                        {
                            title: 'Guide',
                            collapsable:false,
                            children: [
                            '',
                            'howToContribute'
                            ]
                        }
                    ],
                    "/Docs/":[
                        {
                            title: 'Design',
                            collapsable:false,
                            children: [
                            'quickStart'
                            ]
                        },
                        {
                            title: 'API',
                            collapsable:false,
                            children: [
                            'quickStart'
                            ]
                        },
                        {
                            title: 'ChainBox',
                            collapsable:false,
                            children: [
                            
                            'developeModule',
                            'encryptedMessageDesign',
                            'chainBoxGuide',
                            
                            ]
                        },
                        {
                            title: 'Smart Contract',
                            collapsable:false,
                            children: [
                            'smartContractManual',
                            'mavenPackage',
                            'NRC-20TokenStandard',
                            'NRC-721',
                            'smartContractFee',
                            ]
                        }, 
                        {
                            title: 'SDK',
                            collapsable:false,
                            children: [
                            'quickStart'
                            ]
                        },
                    ]
                }
            },
            '/zh/': {
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                // Service Worker 的配置
                nav:[
                {text:"指南",link:"/zh/Guide/"},
                {text:"文档",link:"/zh/Docs/"}
                ],
                sidebar: {
                    "/zh/Guide/":[
                        {
                            title: 'Guide',
                            collapsable:false,
                            children: [
                            '',
                            'howToContribute',
                            'NULSExplorerGuide',
                            'joinCCC',
                            'NULSTransaction'
                            ]
                        }
                    ],
                   "/zh/Docs/":[
                        {   
                            title: '设计文档',
                            collapsable:false,
                            children: [
                             "d_network",
                             "d_ledger",
                             "d_chain_manager",
                             "d_account",
                             "d_transaction",
                             "d_cross_chain",
                             "d_consensus",
                             "d_public_service",
                             "d_block",
                             "d_protocol_update",
                            'quickStart',
                            'nulsProtocolAddress'
                            ]
                        },
                        {   
                            title: '接口文档',
                            collapsable:false,
                            children: [
                            'i_rpc_protocol',
                            "i_public_service",
                            "i_nuls-api_JSONRPC",
                            "i_nuls-api_RESTFUL",
                            "i_account",
                            "i_chain-manager",
                            "i_cross-chain",
                            "i_network",
                            "i_block",
                            "i_transaction",
                             "i_consensus",
                            "i_smart-contract",
                            "i_ledger"
                            ]
                        },
                        {
                            title: 'ChainBox',
                            collapsable:false,
                            children: [
                            'chainBoxGuide',
                            'developeModule',
                            'encryptedMessageDesign',
                            
                            
                            ]
                        },
                        {
                            title: '智能合约',
                            collapsable:false,
                            children: [
                            'smartContractManual',
                            'mavenPackage',
                            'NRC-20TokenStandard',
                            'NRC-721',
                            'offlineAssembly',
                            'assetsOff',
                            'vm-sdk',
                            'consensusTransaction',
                            'excuteResult',
                            'triggerPayable',
                            'smartContractFee',
                            ]
                        },  
                        {   
                            title: 'SDK',
                            collapsable:false,
                            children: [
                            'quickStart'
                            ]
                        },
                    ]
                }
            }
        }
    }
}



