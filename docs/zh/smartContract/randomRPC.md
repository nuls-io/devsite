# 钱包增加随机种子
## 一 、钱包增加随机种子RPC接口

获取的随机种子是大数字，注意，它可能是负数

### 根据高度区间获取随机种子列表：

URL：/random/seeds/height

Method：GET

Prams:

| parameter   | type | Required | remark                                 |
| ----------- | ---- | -------- | -------------------------------------- |
| startHeight | Long | True     | 区间起始高度                           |
| endHeight   | Long | True     | 区间截止高度，不能超过startHeight+1000 |

Returns:

| field   | type    | Remark   |
| ------- | ------- | -------- |
| success | boolean | 是否成功 |
| data    | array   | 种子数组 |

Example：

Request:

```
curl -X GET "http://127.0.0.1:8001/api/random/seeds/height?startHeight=500&endHeight=510" -H "accept: application/json"
```

Response:

```
{
  "success": true,
  "data": [
    "8486473738212806059384942122915964966516544811115122625378589706648696927875",
    "5763677830362183770819418466587054532227472729077319516033962399030101482330",
    "-21576822359476915572374120992682286995340746526938743512234391635989859550499",
    "21657748356022199241379814087980601843534504184851063250908405386419429001546",
    "-31320197741848993348465901825403870475226356831977749494101003161293910010564",
    "16054257794265746474880657765642725318937086559191102027715411501558318980478",
    "39222628335763902261547055653161137231901517785016195993008289217415793052023",
    "28759812140738813907858073405869390691919557824743093132519210315994120629868",
    "26779511442264535228335930919961858598639368721086477781863239801135250744386",
    "-23481782415506504277094909296039579696138464413290902597168011374639343982630"
  ]
}
```

### 根据高度区间获取随机种子列表：

URL：/random/seeds/count

Method：GET

Prams:

| parameter | type | Required | remark                    |
| --------- | ---- | -------- | ------------------------- |
| height    | Long | True     | 获取种子列表的最高高度    |
| count     | Long | True     | 随机种子数量，不能超过128 |

Returns:

| field   | type    | Remark   |
| ------- | ------- | -------- |
| success | boolean | 是否成功 |
| data    | array   | 种子数组 |

Example：

Request:

```
curl -X GET "http://127.0.0.1:8001/api/random/seeds/count?height=500&count=10" -H "accept: application/json"
```

Response:

```
{
  "success": true,
  "data": [
    "8486473738212806059384942122915964966516544811115122625378589706648696927875",
    "5763677830362183770819418466587054532227472729077319516033962399030101482330",
    "-21576822359476915572374120992682286995340746526938743512234391635989859550499",
    "21657748356022199241379814087980601843534504184851063250908405386419429001546",
    "-31320197741848993348465901825403870475226356831977749494101003161293910010564",
    "16054257794265746474880657765642725318937086559191102027715411501558318980478",
    "39222628335763902261547055653161137231901517785016195993008289217415793052023",
    "28759812140738813907858073405869390691919557824743093132519210315994120629868",
    "26779511442264535228335930919961858598639368721086477781863239801135250744386",
    "-23481782415506504277094909296039579696138464413290902597168011374639343982630"
  ]
}
```

### 根据算法计算通过高度区间获取的随机种子列表为一个随机种子，并返回：

URL：/random/seed/height

Method：GET

Prams:

| parameter   | type   | Required | remark                                       |
| ----------- | ------ | -------- | -------------------------------------------- |
| startHeight | Long   | True     | 区间起始高度                                 |
| endHeight   | Long   | True     | 区间截止高度，endHeight-startHeight<=1000    |
| algorithm   | String | false    | 默认为sha3算法，支持sha3、KECCAK、merkle算法 |

Returns:

| field     | type    | Remark             |
| --------- | ------- | ------------------ |
| success   | boolean | 是否成功           |
| data      | Object  | 结果对象           |
| seed      | String  | 计算的随机种子结果 |
| algorithm | String  | 计算的 算法        |
| count     | int     | 原始随机种子个数   |

Example：

Request:

```
curl -X GET "http://192.168.1.123:8001/api/random/seed/height?startHeight=600&endHeight=610&algorithm=sha3" -H "accept: application/json"
```

Response:

```
{
  "success": true,
  "data": {
    "seed": "49349273589710891971526183625401126395677304794754035539210022261211357904457",
    "algorithm": "sha3",
    "count": 10
  }
}
```

### 根据算法计算通过高度和数量获取的随机种子列表为一个随机种子，并返回：

URL：/random/seed/count

Method：GET

Prams:

| parameter | type   | Required | remark                                       |
| --------- | ------ | -------- | -------------------------------------------- |
| height    | Long   | True     | 获取种子列表的最高高度                       |
| count     | Long   | True     | 随机种子数量，不能超过128                    |
| algorithm | String | false    | 默认为sha3算法，支持sha3、KECCAK、merkle算法 |

Returns:

| field     | type    | Remark             |
| --------- | ------- | ------------------ |
| success   | boolean | 是否成功           |
| data      | Object  | 结果对象           |
| seed      | String  | 计算的随机种子结果 |
| algorithm | String  | 计算的 算法        |
| count     | int     | 原始随机种子个数   |

Example：

Request:

```
curl -X GET "http://192.168.1.123:8001/api/random/seed/count?height=600&count=10&algorithm=merkle" -H "accept: application/json"
```

Response:

```
{
  "success": true,
  "data": {
    "seed": "49349273589710891971526183625401126395677304794754035539210022261211357904457",
    "algorithm": "merkle",
    "count": 10
  }
}
```

## 二、智能合约支持底层链随机数

与以上RPC接口相同，在智能合约SDK中支持了相同的方法来获取底层区块链提供的随机数种子，如以下代码。
后面将以其中一个方法`Utils.getRandomSeed(long endHeight, int seedCount, String algorithm)`为例，展示如何使用随机数种子产生随机数。

### 1） io.nuls.contract.sdk.Utils

```java
/**
 * [Testnet]根据截止高度和原始种子数量，用特定的算法生成一个随机种子
 *
 * @param endHeight 截止高度
 * @param seedCount 原始种子数量
 * @param algorithm hash算法标识
 * @return 原始种子字节数组合并后, 使用hash算法得到32位hash字节数组, 再转化为BigInteger(new BigInteger(byte[] bytes))
 */
public static native BigInteger getRandomSeed(long endHeight, int seedCount, String algorithm);

/**
 * [Testnet]根据截止高度和原始种子数量，用`SHA3-256`hash算法生成一个随机种子
 *
 * @param endHeight 截止高度
 * @param seedCount 原始种子数量
 * @return 原始种子字节数组合并后, 使用`SHA3-256`hash算法得到32位hash字节数组, 再转化为BigInteger(new BigInteger(byte[] bytes))
 */
public static BigInteger getRandomSeed(long endHeight, int seedCount) {
    return getRandomSeed(endHeight, seedCount, "SHA3");
}

/**
 * [Testnet]根据高度范围，用特定的算法生成一个随机种子
 *
 * @param startHeight 起始高度
 * @param endHeight   截止高度
 * @param algorithm   hash算法标识
 * @return 原始种子字节数组合并后, 使用hash算法得到32位hash字节数组, 再转化为BigInteger(new BigInteger(byte[] bytes))
 */
public static native BigInteger getRandomSeed(long startHeight, long endHeight, String algorithm);

/**
 * [Testnet]根据高度范围，用`SHA3-256`hash算法生成一个随机种子
 *
 * @param startHeight 起始高度
 * @param endHeight   截止高度
 * @return 原始种子字节数组合并后, 使用`SHA3-256`hash算法得到32位hash字节数组, 再转化为BigInteger(new BigInteger(byte[] bytes))
 */
public static BigInteger getRandomSeed(long startHeight, long endHeight){
    return getRandomSeed(startHeight, endHeight, "SHA3");
}

/**
 * [Testnet]根据截止高度和原始种子数量，获取原始种子的集合
 *
 * @param endHeight 截止高度
 * @param seedCount 原始种子数量
 * @return 返回原始种子的集合，元素是字节数组转化的BigInteger(new BigInteger(byte[] bytes))
 */
public static native List<BigInteger> getRandomSeedList(long endHeight, int seedCount);

/**
 * [Testnet]根据高度范围，获取原始种子的集合
 *
 * @param startHeight 起始高度
 * @param endHeight   截止高度
 * @return 返回原始种子的集合，元素是字节数组转化的BigInteger(new BigInteger(byte[] bytes))
 */
public static native List<BigInteger> getRandomSeedList(long startHeight, long endHeight);
```

### 2） 例子`同时摇N一个骰子`

#### 2.1) 计算方式一

- 获取原始种子`Utils.getRandomSeed(long endHeight, int seedCount, String algorithm)`
- 根据骰子范围求模得到第一个随机数
- 下一个随机数的计算方式
	- 原始种子乘以投掷次数，得到的结果转换成字节数组
	- 把字节数组进行SHA3-256得到32位字节数组的Hash
	- 把此Hash的字节数组转换为BigInteger大数字
	- 将此BigInteger大数字根据骰子范围求模得到下一个随机数
	- 以此类推

**参考以下代码**

```java
public List<Integer> dice(long endHeight, int count, int range, int times) {
    BigInteger orginSeed = getRandomSeed(endHeight, count, "sha3");
    if (orginSeed.equals(BigInteger.ZERO)) {
        return null;
    }
    BigInteger wrapperRange = BigInteger.valueOf((long) range);
    List<Integer> resultList = new ArrayList<Integer>(times);
    for (int i = 0; i < times; i++) {
        if(i == 0) {
            BigInteger mod = orginSeed.mod(wrapperRange);
            resultList.add(mod.intValue());
        } else {
            BigInteger multiply = wrapperRange.multiply(BigInteger.valueOf(i + 1));
            String s = sha3(multiply.toByteArray());
            byte[] decode = decode(s);
            BigInteger bigInteger = new BigInteger(decode);
            BigInteger mod = bigInteger.mod(wrapperRange);
            resultList.add(mod.intValue());
        }
    }
    return resultList;
}

public byte[] decode(String hexString) {
    byte[] bts = new byte[hexString.length() / 2];
    for (int i = 0; i < bts.length; i++) {
        bts[i] = (byte) Integer.parseInt(hexString.substring(2 * i, 2 * i + 2), 16);
    }
    return bts;
}
```

#### 2.2) 计算方式二

- 获取原始种子`Utils.getRandomSeed(long endHeight, int seedCount, String algorithm)`
- 根据骰子范围求模得到第一个随机数
- 下一个随机数的计算方式
	- 获取原始种子大数字的末位数字（根据投掷次数获取倒数第几位），将此末位数字乘以原始种子，得到的结果转换成字节数组
	- 把字节数组进行SHA3-256得到32位字节数组的Hash
	- 把此Hash的字节数组转换为BigInteger大数字
	- 将此BigInteger大数字根据骰子范围求模得到下一个随机数
	- 以此类推

**参考以下代码**

```java
public List<Integer> diceAnother(long endHeight, int count, int range, int times) {
    BigInteger orginSeed = getRandomSeed(endHeight, count, "sha3");
    if (orginSeed.equals(BigInteger.ZERO)) {
        return null;
    }
    BigInteger wrapperRange = BigInteger.valueOf((long) range);
    List<Integer> resultList = new ArrayList<Integer>(times);
    BigInteger mod = orginSeed.mod(wrapperRange);
    resultList.add(mod.intValue());
    String orginStr = orginSeed.toString();
    int length = orginStr.length();
    for (int i = 1; i < times; i++) {
        int c = orginStr.charAt(length - i);
        BigInteger multiply = wrapperRange.multiply(BigInteger.valueOf(c));
        String s = sha3(multiply.toByteArray());
        byte[] decode = decode(s);
        BigInteger bigInteger = new BigInteger(decode);
        mod = bigInteger.mod(wrapperRange);
        resultList.add(mod.intValue());
    }
    return resultList;
}

public byte[] decode(String hexString) {
    byte[] bts = new byte[hexString.length() / 2];
    for (int i = 0; i < bts.length; i++) {
        bts[i] = (byte) Integer.parseInt(hexString.substring(2 * i, 2 * i + 2), 16);
    }
    return bts;
}
```