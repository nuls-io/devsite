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
            description: 'NULS'
        },   
        '/zh/': {
            title:"NULS",
            lang: 'zh-CN',
            description: 'NULS'
        }
    },
    head:[
        ['link', { rel: 'icon', href: "/icon.png" }]
    ],
    themeConfig : {
        repo: 'nuls-io/devsite',
        editLinks: true,
        docsDir: 'docs',
        docsBranch: 'dev',
        sidebarDepth: 1,
        lastUpdated: 'Last Updated',
        nav:[
            {text:"Guide",link:"/learn/"},
            {text:"NULS1.0",link:"/NULS1.0/"},
            {text:"NULS2.0",link:"/NULS2.0/"}
        ],
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                editLinkText: 'Edit this page on GitHub',
                sidebar: {
                    '/learn/': [
                        {
                            title: 'Overview',
                            children: [
                                'introduction',
                                'howToContribute',
                            ]
                        },
                        {
                            title: 'Users Guide',
                            children: [
                                'NULSTransaction',
                                'toolsGuide'
                            ]
                        },
                        {
                            title: 'NIPs',
                            children: [
                                'NIPIntroduction',
                                'NIP-1',
                                'NIP-2',
                                'NIP-3',
                                'NIP-4',
                            ]
                        },
                        {
                            title: 'NULS Portal',
                            children: [
                                'NULSNav'
                            ]
                        },
                    ],
                    '/NULS1.0/':[
                        {
                            title: 'Launch NULS',
                            children: [
                                'sourceCodeStartNULS',
                                'connectMainnet',
                                'connectTestnet',
                            ]
                        },
                        {
                            title: 'Underlying',
                            children: [
                                'buildPrivateChain',
                            ]
                        },
                        {
                            title: 'Smart Contracts',
                            children: [
                                'startSmartContract',
                                'developerManual',
                                'GUIForSmartContract',
                                'ideaPlugin',
                                'NRC-20TokenStandard',
                                'smartContractFee',
                                'randomImplementations',
                                'randomRPC'
                            ]
                        },
                        {
                            title: 'Developer Tools',
                            children: [
                                'sdk',
                                'clientCLI'
                            ]
                        },
                    ],
                    '/NULS2.0/': [
                        {   
                            title: 'Introduction',
                            collapsable:false,
                            children: [
                                'NULS2.0Introduction'
                            ]
                        },
                        {
                            title: 'Tutorial',
                            collapsable:false,
                            children: [
                                'quickStart',
                                'developeModule',
                                'encryptedMessageDesign',
                                'chainBoxGuide',
                                'linuxTutorial',
                                'nodeGuide'
                            ]
                        },
                        {
                            title: 'Smart Contract',
                            collapsable:false,
                            children: [
                                'startSmartContract',
                                'developerManual',
                                'ideaPlugin',
                                'NRC-20TokenStandard',
                                'NRC-721',
                                'smartContractFee',
                            ]
                        },
                    ]
                },
            },
            '/zh/': {
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                // Service Worker 的配置
                nav:[
                    {text:"了解NULS",link:"/zh/learn/"},
                    {text:"NULS1.0",link:"/zh/NULS1.0/"},
                    {text:"NULS2.0",link:"/zh/NULS2.0/"}
                ],
                sidebar: {
                    '/zh/learn/': [
                        {
                            title: '总览',
                            children: [
                                'introduction',
                                'howToContribute',
                            ]
                        },
                        {
                            title: '用户操作指南',
                            children: [
                                'clientWalletGuide',
                                'lightWalletGuide',
                                'NULSTransaction',
                                'NULSExplorerGuide',                             
                            ]
                        },
                        {
                            title: 'NIPs',
                            children: [
                                'NIPIntroduction',
                                'NIP-1',
                                'NIP-2',
                                'NIP-3',
                                'NIP-4',
                            ]
                        },
                        {
                            title: 'NULS 导航',
                            children: [
                                'NULSNav',
                            ]
                        },
                    ],
                    '/zh/NULS1.0/':[
                        {
                            title: '启动NULS',
                            children: [
                                'sourceCodeStartNULS',
                                'connectMainnet',
                                'connectTestnet',
                            ]
                        },
                        {
                            title: '底层',
                            children: [
                                'buildPrivateChain'
                            ]
                        },
                        {
                            title: '智能合约',
                            children: [
                                'startSmartContract',
                                'developerManual',
                                'GUIForSmartContract',
                                'ideaPlugin',
                                'NRC-20TokenStandard',
                                'smartContractFee',
                                'randomImplementations',
                                'randomRPC',
                                'guessTheSize',
                               
                            ]
                        },
                         {
                            title: '开发者工具',
                            children: [
                                'sdk',
                                'clientCLI'
                            ]
                        },
                    ],
                    '/zh/NULS2.0/': [
                        {   
                            title: '介绍',
                            collapsable:false,
                            children: [
                                'NULS2.0Introduction'
                            ]
                        },
                        {
                            title: '教程',
                            collapsable:false,
                            children: [
                                'quickStart',
                                'developeModule',
                                'encryptedMessageDesign',
                                'chainBoxGuide',
                                'linuxTutorial',
                                'nodeGuide'
                            ]
                        },
                        {
                            title: '智能合约',
                            collapsable:false,
                            children: [
                                'smartContractManual',
                                'ideaPlugin',
                                'NRC-20TokenStandard',
                                'NRC-721',
                                'smartContractFee',
                            ]
                        },
                    ]
                },
            }
        },
    }
}



