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
    ['link', { rel: 'icon', href: "/favicon.ico" }]
    ],
    themeConfig : {
        repo: 'nuls-io/devsite/',
        editLinks: true,
        docsDir: 'docs',
        docsBranch: 'master',
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                editLinkText: 'Edit this page on GitHub',
                nav:[
                {text:"Guide",link:"/Guide/"},
                {text:"Develop",link:"/Docs/"}
                ],
                sidebar: {
                    "/Guide/":[
                        {
                            title: 'Guide',
                            collapsable:false,
                            children: [
                            '',
                            'g_quickstart',
                            'g_transaction',
                            'g_contribute',
                            'g_create_node',
                            'g_upgrade_node',
                            'g_deploy_public_service',
                            'g_pocm',
                            'g_governance',
                            'g_factory',
                            'g_docker',
                            'g_linux_tutorial',
                            'g_multi_sign_account'
                            ]
                        }
                    ],
                    "/Docs/":[
                        {   
                            title: 'Module Design',
                            collapsable:false,
                            children: [
                             "d_network",
                             "d_ledger",
                             "d_chain_manager",
                             "d_account",
                             "d_smart_contract",
                             "d_transaction",
                             "d_cross_chain",
                             "d_consensus",
                             "d_public_service",
                             "d_block",
                             "d_protocol_update",
                             'd_address'
                            ]
                        },
                        {   
                            title: 'Interface',
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
                            'c_chain_box',
                            'c_module',
                            'c_message_module',
                            ]
                        },
                        {
                            title: 'Smart Contract',
                            collapsable:false,
                            children: [
                            's_manual',
                            's_tools',
                            's_nrc20',
                            's_nrc721',                            
                            's_offline_assembly',
                            's_advance'
                            ]
                        },  
                        // {   
                        //     title: 'SDK',
                        //     collapsable:false,
                        //     children: [
                        //     ]
                        // },
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
                {text:"开发",link:"/zh/Docs/"}
                ],
                sidebar: {
                    "/zh/Guide/":[
                        {
                            title: '指南',
                            collapsable:false,
                            children: [
                            '',
                            'g_quickstart',
                            'g_transaction',
                            'g_contribute',
                            'g_create_node',
                            'g_upgrade_node',
                            'g_deploy_public_service',
                            'g_integrate_nabox',
                            'g_assemble_transaction',
                            'g_pocm',
                            'g_governance',
                            'g_factory',
                            'g_docker',
                            'g_linux_tutorial',
                            'g_multi_sign_account'
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
                             "d_smart_contract",
                             "d_transaction",
                             "d_cross_chain",
                             "d_consensus",
                             "d_public_service",
                             "d_block",
                             "d_protocol_update",
                             'd_address'
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
                            'c_chain_box',
                            'c_module',
                            'c_message_module',
                            ]
                        },
                        {
                            title: '智能合约',
                            collapsable:false,
                            children: [
                            's_manual',
                            's_tools',
                            's_nrc20',
                            's_nrc20_integrate',
                            's_nrc721',                            
                            's_offline_assembly',
                            's_advance'
                            ]
                        },  
                        // {   
                        //     title: 'SDK',
                        //     collapsable:false,
                        //     children: [
                        //     ]
                        // },
                    ]
                }
            }
        }
    }
}



