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
        docsDir: '/docs',
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
                                '/startNULS/3-1sourceCodeStartNULS'
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
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
                            ]
                        },
                        {
                            title: '7.Developer tools',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
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
                            title: '1.总览',
                            children: [
                                '/overview/1-1introduction',
                                '/overview/1-2structure',
                            ]
                        },
                        {
                            title: '2.如何做贡献',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
                            ]
                        },
                        {
                            title: '3.如何启动NULS',
                            children: [
                                '/startNULS/3-1sourceCodeStartNULS'
                            ]
                        },
                        {
                            title: '4.搭建私链',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
                            ]
                        },
                        {
                            title: '5.NULS底层',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
                            ]
                        },
                        {
                            title: '6.智能合约',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
                            ]
                        },
                        {
                            title: '7.开发者工具',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
                            ]
                        },
                        {
                            title: '8.NULS 导航',
                            children: [
                                '/contribution/2-1mainNetworkDevelopment',
                                '/contribution/2-2reportError',
                                '/contribution/2-3translateDocuments',
                                '/contribution/2-4writingDocument'
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