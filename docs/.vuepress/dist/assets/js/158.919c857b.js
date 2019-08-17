(window.webpackJsonp=window.webpackJsonp||[]).push([[158],{876:function(a,t,s){"use strict";s.r(t);var e=s(0),n=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"nrc-20合约标准"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nrc-20合约标准","aria-hidden":"true"}},[a._v("#")]),a._v(" NRC-20合约标准")]),a._v(" "),s("h2",{attrs:{id:"简述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#简述","aria-hidden":"true"}},[a._v("#")]),a._v(" 简述")]),a._v(" "),s("p",[a._v("token的接口标准")]),a._v(" "),s("h2",{attrs:{id:"摘要"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#摘要","aria-hidden":"true"}},[a._v("#")]),a._v(" 摘要")]),a._v(" "),s("p",[a._v("以下标准允许在智能合约中实施标记的标记API。 该标准提供了转移token的基本功能，并允许token被批准，以便他们可以由另一个在线第三方使用。")]),a._v(" "),s("h2",{attrs:{id:"动机"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动机","aria-hidden":"true"}},[a._v("#")]),a._v(" 动机")]),a._v(" "),s("p",[a._v("标准接口可以让Nuls上的任何令牌被其他应用程序重新使用：从钱包到分散式交换。")]),a._v(" "),s("h2",{attrs:{id:"规则"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#规则","aria-hidden":"true"}},[a._v("#")]),a._v(" 规则")]),a._v(" "),s("h2",{attrs:{id:"token"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#token","aria-hidden":"true"}},[a._v("#")]),a._v(" Token")]),a._v(" "),s("h3",{attrs:{id:"方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#方法","aria-hidden":"true"}},[a._v("#")]),a._v(" 方法")]),a._v(" "),s("p",[s("strong",[a._v("注意")]),a._v(": 调用者必须处理返回"),s("code",[a._v("false")]),a._v("的"),s("code",[a._v("return boolean")]),a._v(".调用者绝对不能假设返回"),s("code",[a._v("false")]),a._v("的情况不存在。")]),a._v(" "),s("h4",{attrs:{id:"name"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#name","aria-hidden":"true"}},[a._v("#")]),a._v(" name")]),a._v(" "),s("p",[a._v("返回令牌的名称 - 例如 "),s("code",[a._v('"MyToken"')]),a._v(".")]),a._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@View")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" String "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("h4",{attrs:{id:"symbol"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#symbol","aria-hidden":"true"}},[a._v("#")]),a._v(" symbol")]),a._v(" "),s("p",[a._v('返回令牌的符号 - 例如 "MT".')]),a._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@View")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" String "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("symbol")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("h4",{attrs:{id:"decimals"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#decimals","aria-hidden":"true"}},[a._v("#")]),a._v(" decimals")]),a._v(" "),s("p",[a._v("返回令牌使用的小数位数 - 例如“8”表示将令牌数量除以“100000000”以获得其用户表示。")]),a._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@View")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("decimals")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("h4",{attrs:{id:"totalsupply"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#totalsupply","aria-hidden":"true"}},[a._v("#")]),a._v(" totalSupply")]),a._v(" "),s("p",[a._v("返回总令牌供应量。")]),a._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[a._v("@View\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" BigInteger "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("totalSupply")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("h4",{attrs:{id:"balanceof"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#balanceof","aria-hidden":"true"}},[a._v("#")]),a._v(" balanceOf")]),a._v(" "),s("p",[a._v("返回地址为“owner”的帐户余额。")]),a._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@View")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" BigInteger "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("balanceOf")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" Address owner"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("h4",{attrs:{id:"transfer"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#transfer","aria-hidden":"true"}},[a._v("#")]),a._v(" transfer")]),a._v(" "),s("p",[a._v("转移"),s("code",[a._v("value")]),a._v("的token数量到的地址"),s("code",[a._v("to")]),a._v("，并且必须触发"),s("code",[a._v("TransferEvent")]),a._v("事件。 如果"),s("code",[a._v("from")]),a._v("帐户余额没有足够的令牌来支出，该函数应该被revert。")]),a._v(" "),s("p",[a._v("创建新令牌的令牌合同应该在创建令牌时将"),s("code",[a._v("from")]),a._v("地址设置为"),s("code",[a._v("null")]),a._v("触发"),s("code",[a._v("TransferEvent")]),a._v("事件。")]),a._v(" "),s("p",[a._v("注意 0值的传输必须被视为正常传输并触发"),s("code",[a._v("TransferEvent")]),a._v("事件。")]),a._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("boolean")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("transfer")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" Address to"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" BigInteger value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("h4",{attrs:{id:"transferfrom"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#transferfrom","aria-hidden":"true"}},[a._v("#")]),a._v(" transferFrom")]),a._v(" "),s("p",[a._v("从地址"),s("code",[a._v("from")]),a._v("发送数量为"),s("code",[a._v("value")]),a._v("的token到地址"),s("code",[a._v("to")]),a._v(",必须触发"),s("code",[a._v("TransferEvent")]),a._v("事件。")]),a._v(" "),s("p",[s("code",[a._v("transferFrom")]),a._v("方法用于提取工作流，允许合同代您转移token。这可以用于例如允许合约代您转让代币和/或以子货币收取费用。除了"),s("code",[a._v("from")]),a._v("帐户已经通过某种机制(比如调用"),s("code",[a._v("approve(@Required Address spender, @Required BigInteger value)")]),a._v(")故意地授权消息的发送者之外，否则该函数应该"),s("code",[a._v("revert")]),a._v("。")]),a._v(" "),s("p",[a._v("注意 0值的传输必须被视为正常传输并触发传输事件。")]),a._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("boolean")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("transferFrom")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" Address from"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" Address to"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" BigInteger value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("h4",{attrs:{id:"approve"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#approve","aria-hidden":"true"}},[a._v("#")]),a._v(" approve")]),a._v(" "),s("p",[a._v("允许"),s("code",[a._v("spender")]),a._v("多次支配您的帐户，最高达"),s("code",[a._v("value")]),a._v("金额。 如果再次调用此函数，它将以"),s("code",[a._v("value")]),a._v("覆盖当前的余量。")]),a._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("boolean")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("approve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" Address spender"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" BigInteger value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("h4",{attrs:{id:"allowance"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#allowance","aria-hidden":"true"}},[a._v("#")]),a._v(" allowance")]),a._v(" "),s("p",[a._v("返回"),s("code",[a._v("spender")]),a._v("仍然被允许从"),s("code",[a._v("owner")]),a._v("提取的金额。\nReturns the amount which "),s("code",[a._v("spender")]),a._v(" is still allowed to withdraw from "),s("code",[a._v("owner")]),a._v(".")]),a._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@View")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" BigInteger "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("allowance")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" Address owner"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" Address spender"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])])]),s("h3",{attrs:{id:"events"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#events","aria-hidden":"true"}},[a._v("#")]),a._v(" Events")]),a._v(" "),s("h4",{attrs:{id:"transferevent"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#transferevent","aria-hidden":"true"}},[a._v("#")]),a._v(" TransferEvent")]),a._v(" "),s("p",[a._v("当token被转移(包括0值)，必须被触发。")]),a._v(" "),s("p",[a._v("创建新令牌的令牌合同应该在创建令牌时将"),s("code",[a._v("from")]),a._v("地址设置为"),s("code",[a._v("null")]),a._v("触发"),s("code",[a._v("TransferEvent")]),a._v("事件。")]),a._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("TransferEvent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("Address from"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" Address to"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" BigInteger value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("h4",{attrs:{id:"approvalevent"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#approvalevent","aria-hidden":"true"}},[a._v("#")]),a._v(" ApprovalEvent")]),a._v(" "),s("p",[a._v("当任何成功调用"),s("code",[a._v("approve(@Required Address spender, @Required BigInteger value)")]),a._v("后，必须被触发。")]),a._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ApprovalEvent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" Address owner"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" Address spender"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@Required")]),a._v(" BigInteger value"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("h2",{attrs:{id:"implementation"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#implementation","aria-hidden":"true"}},[a._v("#")]),a._v(" Implementation")]),a._v(" "),s("h4",{attrs:{id:"example-implementations-are-available-at"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example-implementations-are-available-at","aria-hidden":"true"}},[a._v("#")]),a._v(" Example implementations are available at")]),a._v(" "),s("ul",[s("li",[a._v("https://github.com/nuls-io/nuls-nrc20")])])])}],!1,null,null,null);n.options.__file="NRC-20TokenStandard.md";t.default=n.exports}}]);