## NULS区块链随机数的几种实现方式

> 参考资料: 
> 
> [Solidity Pitfalls: Random Number Generation for Ethereum](https://www.sitepoint.com/solidity-pitfalls-random-number-generation-for-ethereum/)
> 
> [Predicting Random Numbers in Ethereum Smart Contracts](https://blog.positive.com/predicting-random-numbers-in-ethereum-smart-contracts-e5358c6b8620)

### 1. `线性同余发生器（LCG）`算法获取伪随机数

NULS智能合约的SDK中提供了一种获取随机数的方式，它采用当前块的矿工地址、合约地址、合约调用者地址、当前块的时间戳作为随机因子，使用`线性同余发生器（LCG）`算法获取伪随机数

调用方式如下:

```java
io.nuls.contract.sdk.Utils.pseudoRandom();
/**
 * 增加一个随机因子
 */
io.nuls.contract.sdk.Utils.pseudoRandom(long seed);
```

--

### 2. 使用未来块的`BlockHash`

以彩票为例，抽奖需要调用两次合约交易，第一次，结束彩票，第二次，抽奖

第一次结束彩票后，记录当前块高度H1，并生成一个数字N，在未来区块高度达到`H1+N`的时候，才能抽奖

第二次抽奖时，根据第一次记录的块高度H1再加上(0~80]个块(待定)得到块高度H2，获取H2这个块的`BlockHash`，以它作为随机种子

ETH不能使用这种方式的原因如下：
![](https://cdn-images-1.medium.com/max/1600/1*eyNTfWTkmM-3YuMca-1H0A.png)

--

### 3. 随机种子限定在参与者内

以彩票为例，我们需要更多任意数据来挑选我们的赢家。当我们开奖时，我们可以使用已经进入我们的彩票智能合约的玩家的地址作为随机因子，以此产生随机数。

--

### 4. commit-reveal

同样以彩票为例

* 合约为随机数留出奖励。

* 每个用户生成他们自己的秘密随机数 N。

* 用户通过散列他们N和地址来创建他们的秘密随机数的哈希值：String hash = sha3(N + Msg.sender())。

		注意：步骤2和3应在本地秘密进行，例如用户把N提交到彩票应用中，彩票应用完成hash运算
	
* 用户将其哈希值发送给智能合约。

* 提交的内容将持续一定数量的块，或者直到有足够的参与者加入。

* 一旦提交轮次结束，揭幕轮开始。

* 每个用户将其随机数提交N给智能合约。

* 合约验证sha3(N + Msg.sender())匹配原始提交。

* 如果用户未及时提交有效N，则他的存款将被没收。

* 把所有验证过的N 进行 XOR 异或运算得到随机数。

* 该数字用于确定哪些参与者获得奖励 --->（N % numUsers）。
