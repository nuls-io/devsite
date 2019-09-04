---
title: NULS Protocol Address
categories:
  - nuls
tags:
  - Protocol
date: 2019-06-16 15:21:14
---
# NULS Protocol Address
## ECKey
创建一个NULS地址的第一步，需要获取一个基于椭圆曲线算法的公私钥对。NULS的椭圆曲线参数和比特币一样，使用secp256k1。
```
Secp256k1为基于Fp有限域上的椭圆曲线，由于其特殊构造的特殊性，其优化后的实现比其他曲线性能上可以特高30％，有明显以下两个优点：
1）占用很少的带宽和存储资源，密钥的长度很短。
2）让所有的用户都可以使用同样的操作完成域运算。
                                        --引用自网络
```
## 地址格式
NULS的地址格式如下：
```
address = prefix + Base58Encode(chainId+addressType+pkh+xor)
```
### 前缀
前缀的存在是为了便于识别、区分不同的链的地址。目前NULS提供了两种prefix的确定方案：
1. 默认设置：NULS保留1为主网chainId，也默认所有chainId为1的地址以NULS开头。保留2为核心测试网的chainId，默认所有chainId为2的地址以tNULS开头。
2. 通过登记跨链设置前缀：在登记跨链时，需要填写此链的前缀，系统会维护chainId和前缀的对应表，根据对应表生成相应的地址。目前Samos项目已沟通确认使用chainId=3，前缀为SMOS的地址格式。
3. 自动计算：其他chainId的地址，NULS提供了统一的算法来计算前缀，具体的计算代码如下：
```
//将chainId转换为字节数组，使用base58算法对字节数组进行计算，计算后全部转为大写字母
String prefix = Base58.encode(SerializeUtils.int16ToBytes(chainId)).toUpperCase();
```
在前缀和真实地址之间，用一个小写字母进行分隔，便于从地址中提取chainId和验证地址类型及正确性。
小写字母的选择方式为，提供一个数组，安装字母表的顺序填充小写字母，根据prefix的长度来选择分隔的字母。
```
//前缀长度是几个字母，就选择第几个元素为分隔字母。
//如前缀长度为2，则用b分隔，长度为3用c分隔，长度为4用d分隔，……
String[] LENGTHPREFIX = new String[]{"", "a", "b", "c", "d", "e"};
```
### 链id
NULS的目标是建立一个多链并行，价值互通的区块链生态网络，在设计之初就为每一条链定义了一个独一无二的ID，2个字节，取值范围1~65535.ChainId是地址中非常重要的数据，是跨链操作的基础。
### 账户类型
NULS支持在一个网络内设置不同的账户类型，比如普通地址、合约地址、多签地址等等，开发者可以根据自己的需要进行设计。
账户类型为1个字节，1~128取值范围
### 公钥摘要PKH
ECKey与地址的关联关系就体现在这一部分，NULS的做法是先用Sha-256对公钥进行一次计算，得到的结果再通过 RIPEMD160进行一次计算得到20个字节的结果，就是PKH。
### 校验位
NULS在生成字符串格式的地址时会增加一个字节的校验位，计算方式是对前面23个字节（chainId+type+pkh）进行异或得到的。
校验位不参与序列化。
### 生成地址
* 序列化地址
```
address = chainId(2) + type(1) + PKH(20)
```
* 固定前缀字符串地址
```
addressString = prefix + 分隔符 + Base58Encode(address+xor)
```
* 自动前缀字符串地址
```
addressString = Base58Encode(chainId) + 分隔符 + Base58Encode(address+xor)
```
## 非nuls体系的地址格式
NULS是一个网络，支持所有区块链的接入，对于和NULS完全不同的地址格式，NULS设计了一个地址转换协议，具体内容如下：

```
address = Base58Encode(chainId+原始地址长度+原始地址+xor)
```
例如：比特币地址，在地址之前追加两个字节的chainId，之后跟随比特币的原始地址，地址解析方式根据链配置决定，确保任何一个地址都可以在NULS获得映射的地址。

