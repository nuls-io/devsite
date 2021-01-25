(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{519:function(a,s,e){"use strict";e.r(s);var t=e(0),r=Object(t.a)({},(function(){var a=this.$createElement;this._self._c;return this._m(0)}),[function(){var a=this,s=a.$createElement,e=a._self._c||s;return e("div",{staticClass:"content"},[e("h1",{attrs:{id:"nuls-protocol-address"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#nuls-protocol-address"}},[a._v("#")]),a._v(" NULS Protocol Address")]),a._v(" "),e("h2",{attrs:{id:"eckey"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#eckey"}},[a._v("#")]),a._v(" ECKey")]),a._v(" "),e("p",[a._v("创建一个NULS地址的第一步，需要获取一个基于椭圆曲线算法的公私钥对。NULS的椭圆曲线参数和比特币一样，使用secp256k1。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("Secp256k1为基于Fp有限域上的椭圆曲线，由于其特殊构造的特殊性，其优化后的实现比其他曲线性能上可以特高30％，有明显以下两个优点：\n1）占用很少的带宽和存储资源，密钥的长度很短。\n2）让所有的用户都可以使用同样的操作完成域运算。\n                                        --引用自网络\n")])])]),e("h2",{attrs:{id:"地址格式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#地址格式"}},[a._v("#")]),a._v(" 地址格式")]),a._v(" "),e("p",[a._v("NULS的地址格式如下：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("address = prefix + Base58Encode(chainId+addressType+pkh+xor)\n")])])]),e("h3",{attrs:{id:"前缀"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#前缀"}},[a._v("#")]),a._v(" 前缀")]),a._v(" "),e("p",[a._v("前缀的存在是为了便于识别、区分不同的链的地址。目前NULS提供了两种prefix的确定方案：")]),a._v(" "),e("ol",[e("li",[a._v("默认设置：NULS保留1为主网chainId，也默认所有chainId为1的地址以NULS开头。保留2为核心测试网的chainId，默认所有chainId为2的地址以tNULS开头。")]),a._v(" "),e("li",[a._v("通过登记跨链设置前缀：在登记跨链时，需要填写此链的前缀，系统会维护chainId和前缀的对应表，根据对应表生成相应的地址。目前Samos项目已沟通确认使用chainId=3，前缀为SMOS的地址格式。")]),a._v(" "),e("li",[a._v("自动计算：其他chainId的地址，NULS提供了统一的算法来计算前缀，具体的计算代码如下：")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("//将chainId转换为字节数组，使用base58算法对字节数组进行计算，计算后全部转为大写字母\nString prefix = Base58.encode(SerializeUtils.int16ToBytes(chainId)).toUpperCase();\n")])])]),e("p",[a._v("在前缀和真实地址之间，用一个小写字母进行分隔，便于从地址中提取chainId和验证地址类型及正确性。\n小写字母的选择方式为，提供一个数组，按照字母表的顺序填充小写字母，根据prefix的长度来选择分隔的字母。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v('//前缀长度是几个字母，就选择第几个元素为分隔字母。\n//如前缀长度为2，则用b分隔，长度为3用c分隔，长度为4用d分隔，……\nString[] LENGTHPREFIX = new String[]{"", "a", "b", "c", "d", "e"};\n')])])]),e("h3",{attrs:{id:"链id"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#链id"}},[a._v("#")]),a._v(" 链id")]),a._v(" "),e("p",[a._v("NULS的目标是建立一个多链并行，价值互通的区块链生态网络，在设计之初就为每一条链定义了一个独一无二的ID，2个字节，取值范围1~65535.ChainId是地址中非常重要的数据，是跨链操作的基础。")]),a._v(" "),e("h3",{attrs:{id:"账户类型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#账户类型"}},[a._v("#")]),a._v(" 账户类型")]),a._v(" "),e("p",[a._v("NULS支持在一个网络内设置不同的账户类型，比如普通地址、合约地址、多签地址等等，开发者可以根据自己的需要进行设计。\n账户类型为1个字节，1~128取值范围")]),a._v(" "),e("h3",{attrs:{id:"公钥摘要pkh"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#公钥摘要pkh"}},[a._v("#")]),a._v(" 公钥摘要PKH")]),a._v(" "),e("p",[a._v("ECKey与地址的关联关系就体现在这一部分，NULS的做法是先用Sha-256对公钥进行一次计算，得到的结果再通过 RIPEMD160进行一次计算得到20个字节的结果，就是PKH。")]),a._v(" "),e("h3",{attrs:{id:"校验位"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#校验位"}},[a._v("#")]),a._v(" 校验位")]),a._v(" "),e("p",[a._v("NULS在生成字符串格式的地址时会增加一个字节的校验位，计算方式是对前面23个字节（chainId+type+pkh）进行异或得到的。\n校验位不参与序列化。")]),a._v(" "),e("h3",{attrs:{id:"生成地址"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#生成地址"}},[a._v("#")]),a._v(" 生成地址")]),a._v(" "),e("ul",[e("li",[a._v("序列化地址")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("address = chainId(2) + type(1) + PKH(20)\n")])])]),e("ul",[e("li",[a._v("固定前缀字符串地址")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("addressString = prefix + 分隔符 + Base58Encode(address+xor)\n")])])]),e("ul",[e("li",[a._v("自动前缀字符串地址")])]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("addressString = Base58Encode(chainId) + 分隔符 + Base58Encode(address+xor)\n")])])]),e("h2",{attrs:{id:"非nuls体系的地址格式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#非nuls体系的地址格式"}},[a._v("#")]),a._v(" 非nuls体系的地址格式")]),a._v(" "),e("p",[a._v("NULS是一个网络，支持所有区块链的接入，对于和NULS完全不同的地址格式，NULS设计了一个地址转换协议，具体内容如下：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("address = Base58Encode(chainId+原始地址长度+原始地址+xor)\n")])])]),e("p",[a._v("例如：比特币地址，在地址之前追加两个字节的chainId，之后跟随比特币的原始地址，地址解析方式根据链配置决定，确保任何一个地址都可以在NULS获得映射的地址。")])])}],!1,null,null,null);s.default=r.exports}}]);