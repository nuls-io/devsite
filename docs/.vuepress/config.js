module.exports = {
    base : '/',
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'en-US',
            title: 'NULS',
            description: 'Vue-powered Static Site Generator'
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'NULS',
            description: 'Vue 驱动的静态网站生成器'
        }
    },
    themeConfig : {
        repo: 'nuls-io/devsite',
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
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                algolia: {},
                sidebar: {
                    '/': [
                        {
                            title: 'Overview',
                            children: [
                                '/overview/1-1introduction',
                                '/overview/1-2structure',
                            ]
                        },
                        // {
                        //     title: '2.How to contribute',
                        //     children: [
                        //         '/contribution/mainNetworkDevelopment',
                        //         '/contribution/reportError',
                        //         '/contribution/2-3translateDocuments',
                        //         '/contribution/2-4writingDocument'
                        //     ]
                        // },
                        // {
                        //     title: '3.How to start NULS',
                        //     children: [
                        //         '/startNULS/sourceCodeStartNULS',
                        //         '/startNULS/3-howToConnectMainnet',
                        //         '/startNULS/3-3howToConnectTestnet',
                        //         '/startNULS/3-4clientGUI',
                        //         '/startNULS/3-5clientCLI',
                        //     ]
                        // },
                        // {
                        //     title: '4.Build a private chain',
                        //     children: [
                        //         '/contribution/2-1mainNetworkDevelopment',
                        //         '/contribution/2-2reportError',
                        //         '/contribution/2-3translateDocuments',
                        //         '/contribution/2-4writingDocument'
                        //     ]
                        // },
            
                        // {
                        //     title: '6.Smart Contract',
                        //     children: [
                        //         '/smartContract/6-1developerManual',
                        //         '/smartContract/6-2GUIForSmartContract',
                                
                        //     ]
                        // },
                        // {
                        //     title: '7.Developer tools',
                        //     children: [
                        //         '/developerTools/7-1sdk',
                        //     ]
                        // },
                        // {
                        //     title: '8.NULS navigation',
                        //     children: [
                        //         '/contribution/2-1mainNetworkDevelopment',
                        //         '/contribution/2-2reportError',
                        //         '/contribution/2-3translateDocuments',
                        //         '/contribution/2-4writingDocument'
                        //     ]
                        // },
                    ]
                },
            },
            '/zh/': {
                // 多语言下拉菜单的标题
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                // Service Worker 的配置
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用.",
                        buttonText: "刷新"
                    }
                },
                sidebar: {
                    '/zh/': [
                        {
                            title: '总览',
                            children: [
                                '/zh/overview/introduction',
                                '/zh/overview/structure',
                                '/zh/overview/howToContribute',
                            ]
                        },
                        {
                            title: '用户操作指南',
                            children: [
                                '/zh/guide/GUIGuide',
                                '/zh/guide/webGuide',
                                '/zh/guide/NULSTransaction',
                            ]
                        },
                        {
                            title: '社区',
                            children: [
                                '/zh/community/toolsGuide',
                                '/zh/community/ambassadorRules',
                                '/zh/community/communityConstitution',
                                '/zh/community/communityFund',
                            ]
                        },
                        {
                            title: '启动NULS',
                            children: [
                                '/zh/startNULS/sourceCodeStartNULS',
                                '/zh/startNULS/connectMainnet',
                                '/zh/startNULS/connectTestnet',
                            ]
                        },
                        {
                            title: '快速搭链',
                            children: [
                                '/zh/buildChain/buildPrivateChain',
                            ]
                        },
                        {
                            title: 'NULS底层',
                            children: [
                                '/zh/NULSInfrastructure/NULS2.0Introduction',
                                '/zh/NULSInfrastructure/networkModuleDesign',
                                '/zh/NULSInfrastructure/eventBusModuleDesign',
                                '/zh/NULSInfrastructure/generalProtocol',
                                '/zh/NULSInfrastructure/accountModuleDesign',
                                '/zh/NULSInfrastructure/ledgerModuleDesign',
                                '/zh/NULSInfrastructure/blockModuleDesign',
                                '/zh/NULSInfrastructure/transactionModuleDesign',
                                '/zh/NULSInfrastructure/chainModuleDesign',
                                '/zh/NULSInfrastructure/consensusModuleDesign',
                                '/zh/NULSInfrastructure/rpcToolWebsocketDesign',
                                '/zh/NULSInfrastructure/interfaceStandard',
                                '/zh/NULSInfrastructure/randomImplementations',
                            ]
                        },
                        {
                            title: '智能合约',
                            children: [
                                '/zh/smartContract/startSmartContract',
                                '/zh/smartContract/developerManual',
                                '/zh/smartContract/GUIForSmartContract',
                                '/zh/smartContract/ideaPlugin',
                                '/zh/smartContract/NRC-20TokenStandard',
                                '/zh/smartContract/smartContractDemo',
                                // '/zh/smartContract/6-6communityVote',
                                '/zh/smartContract/smartContractFee'
                               
                            ]
                        },
                        {
                            title: '开发者工具',
                            children: [
                                '/zh/developerTools/sdk',
                                '/zh/developerTools/APIManual',
                                '/zh/developerTools/smartContractIDEAPlugin',
                            ]
                        },
                        {
                            title: 'NIPs',
                            children: [
                                '/zh/nips/NIPIntroduction',
                                '/zh/nips/NIP-1',
                                '/zh/nips/NIP-2',
                                '/zh/nips/NIP-3',
                                '/zh/nips/NIP-4',
                            ]
                        },
                        {
                            title: 'NULS 导航',
                            children: [
                                '/zh/nulsNav/NULSNav',
                            ]
                        },
                    ]
                },
            }
        },
    }
}



function getGuideSidebar (groupA, groupB) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '/overview/1-1Introduction',
                '/overview/1-2structure',
            ]
        },
        {
            title: groupB,
            collapsable: false,
            children: [
                '/contribution/2-1mainNetworkDevelopment',
                '/contribution/2-2reportError',
                '/contribution/2-3translateDocuments',
                '/contribution/2-4writingDocument'
            ]
        }
    ]
}