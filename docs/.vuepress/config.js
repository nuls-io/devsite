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
                            title: 'Introduction',
                            collapsable:false,
                            children: [
                            ''
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
                            'howToContribute'
                            // 'linuxTutorial',
                            // 'multiSignAccount'
                            ]
                        }
                    ],
                   "/zh/Docs/":[
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
                            title: '设计文档',
                            collapsable:false,
                            children: [
                            'quickStart'
                            ]
                        },
                        {   
                            title: '接口文档',
                            collapsable:false,
                            children: [
                            'quickStart'
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



