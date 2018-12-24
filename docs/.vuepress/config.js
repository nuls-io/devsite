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
                            title: '1.Overview',
                            children: [
                                '/overview/1-1introduction',
                                '/overview/1-2structure',
                            ]
                        },
                        {
                            title: '2.How to contribute',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
                            ]
                        },
                        {
                            title: '3.How to start NULS',
                            children: [
                                '/startNULS/3-1sourceCodeStartNULS',
                                '/startNULS/3-2howToConnectMainnet',
                                '/startNULS/3-3howToConnectTestnet',
                                '/startNULS/3-4clientGUI',
                                '/startNULS/3-5clientCLI',
                            ]
                        },
                        {
                            title: '4.Build a private chain',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
                            ]
                        },
                        {
                            title: '5.NULS infrastructure',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
                            ]
                        },
                        {
                            title: '6.Smart Contract',
                            children: [
                                '/smartContract/6-1developerManual',
                                '/smartContract/6-2GUIForSmartContract',
                                
                            ]
                        },
                        {
                            title: '7.Developer tools',
                            children: [
                                '/developerTools/7-1sdk',
                            ]
                        },
                        {
                            title: '8.NULS navigation',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
                            ]
                        },
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
                                '/zh/overview/1-1introduction',
                                '/zh/overview/1-2structure',
                            ]
                        },
                        {
                            title: '如何做贡献',
                            children: [
                                '/zh/contribution/2-1mainNetworkDevelopment',
                                '/zh/contribution/2-2reportError',
                                '/zh/contribution/2-3translateDocuments',
                                '/zh/contribution/2-4writingDocument'
                            ]
                        },
                        {
                            title: '如何启动NULS',
                            children: [
                                '/zh/startNULS/3-1sourceCodeStartNULS',
                                '/zh/startNULS/3-2howToConnectMainnet',
                                '/zh/startNULS/3-3howToConnectTestnet',
                                '/zh/startNULS/3-4clientGUI',
                                '/zh/startNULS/3-5clientCLI',
                            ]
                        },
                        {
                            title: '搭建私链',
                            children: [
                            ]
                        },
                        {
                            title: 'NULS底层',
                            children: [
                                '/zh/NULSInfrastructure/5-1NULS2.0Introduction',
                                '/zh/NULSInfrastructure/5-4networkModuleDesign',
                                '/zh/NULSInfrastructure/5-5eventBusModuleDesign',
                                '/zh/NULSInfrastructure/5-6generalProtocol',
                                '/zh/NULSInfrastructure/5-7accountModuleDesign',
                                '/zh/NULSInfrastructure/5-8ledgerModuleDesign',
                                // '/zh/NULSInfrastructure/5-9blockManagement',
                                '/zh/NULSInfrastructure/5-10transactionModuleDesign',
                                '/zh/NULSInfrastructure/5-11chainManagementDesign',
                                '/zh/NULSInfrastructure/5-12consensusModuleDesign',
                                '/zh/NULSInfrastructure/5-13rpcToolWebsocketDesign',
                                '/zh/NULSInfrastructure/5-14interfaceStandard',
                                '/zh/NULSInfrastructure/5-15randomImplementations',
                                '/zh/NULSInfrastructure/5-16buildNewChainBasedOnInfrastructure',
                            ]
                        },
                        {
                            title: '智能合约',
                            children: [
                                '/zh/smartContract/6-8startSmartContract',
                                '/zh/smartContract/6-1developerManual',
                                '/zh/smartContract/6-2GUIForSmartContract',
                                '/zh/smartContract/6-3ideaPlugin',
                                '/zh/smartContract/6-4NRC-20TokenStandard',
                                '/zh/smartContract/6-5smartContractDemo',
                                '/zh/smartContract/6-6communityVote',
                                '/zh/smartContract/6-7smartContractFee'
                               
                            ]
                        },
                        {
                            title: '开发者工具',
                            children: [
                                '/zh/developerTools/7-1sdk',
                                '/zh/developerTools/7-2APIManual',
                                '/zh/developerTools/7-3smartContractIDEAPlugin',
                            ]
                        },
                        {
                            title: 'NULS 导航',
                            children: [
                                
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