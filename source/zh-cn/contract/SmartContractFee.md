## 智能合约手续费

### 1. 智能合约费用收取的规则，如何计费？接口调用方付多少钱？都是由谁收到了这些费用？

> `背景:`由于NULS主网采用的是UTXO模型，因此交易大小也作为收费标准之一

在主链上，多出三个类型的交易，`创建智能合约`, `调用智能合约`, `删除智能合约`

三个交易与其他交易如`转账`不同的地方就在于多出一个智能合约的执行，因此智能合约的执行也是收费标准之一 

* 智能合约收费计算方式

```java
public static final int COMPARISON = 1;//比较字节码
public static final int CONSTANT = 1;//简单数值类型字节码
public static final int LDC = 1;//数值常量，字符串常量（长度 * LDC）
public static final int CONTROL = 5;//控制字节码
public static final int TABLESWITCH = 2;//switch字节码（大小 * TABLESWITCH）
public static final int LOOKUPSWITCH = 2;//switch字节码（大小 * LOOKUPSWITCH）
public static final int CONVERSION = 1;//数值转换
public static final int EXTENDED = 1;//null判断
public static final int MULTIANEWARRAY = 1;//多维数组（大小 * MULTIANEWARRAY）
public static final int LOAD = 1;//把本地变量送到栈顶
public static final int ARRAYLOAD = 5;//把数组的某项送到栈顶
public static final int MATH = 1;//数学操作及移位操作
public static final int REFERENCE = 10;//对象相关操作
public static final int NEWARRAY = 1;//一维数组（大小 * NEWARRAY）
public static final int STACK = 2;//栈操作
public static final int STORE = 1;//把栈顶的值存入本地变量
public static final int ARRAYSTORE = 5;//把栈项的值存到数组里
public static final int TRANSFER = 1000;//转账交易

```
	
* 一次智能合约总手续费

	一次合约交易的总手续费由三部分构成
	- 第一部分是交易大小产生的手续费，根据字节大小计算 -> 0.001NULS/KB，既是每1000个字节收取0.001个NULS，交易大小不足1000个字节的，按0.001个NULS收费
	
	- 第二部分是合约执行消耗的GAS*Price，Price是单价，意思是每一个Gas值多少Na，Na是NULS的最小单位，1Nuls=1亿Na
	> 举例说明，某次合约执行消耗了20000Gas，设定的单价是20Na/Gas, 那么这次消耗的Na就是`20000 * 20 = 400000`，既是0.004NULS
	
	- 第三部分是调用者设定的GasLimit没有被当次合约执行消耗完，剩余的Gas，这部分Gas会以共识奖励返还
	> 举例说明，延续上个栗子，当次合约设置的GasLimit是30000Gas，而合约执行消耗了20000Gas，那么剩余了10000Gas，这10000Gas换算成Na就是`10000 * 20 = 200000`，既是0.002NULS，那么这0.002NULS会在当前打包区块的CoinBase交易(共识奖励)中返还给合约调用方
	
* 合约调用方付多少钱？

	在合约交易中合约调用方付了第一、二、三部分，实际上合约调用方付了第一、二部分，因为第三部分会在当前打包区块的CoinBase交易(共识奖励)中返还给合约调用方

* 由谁收到了这些费用？

	> `前提:`这部分费用都体现在区块的CoinBase交易(共识奖励)中
	
	区块打包者收到了第一、二部分费用，合约调用方收到第三部分费用