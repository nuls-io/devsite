
## Wallet adds a random seed RPC interface

The random seed you get is a big number, and notice, it could be a negative number

### Get a random seed list based on the height interval

URL：/random/seeds/height

Method：GET

Prams:

| parameter   | type | Required | remark                                 |
| ----------- | ---- | -------- | -------------------------------------- |
| startHeight | Long | True     | Initial height of interval                           |
| endHeight   | Long | True     | Interval cutoff height, cannot exceed startHeight+1000 |

Returns:

| field   | type    | Remark   |
| ------- | ------- | -------- |
| success | boolean | Successful or not |
| data    | array   | The seed array |

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

### Get random seed list according to height interval

URL：/random/seeds/count

Method：GET

Prams:

| parameter | type | Required | remark                    |
| --------- | ---- | -------- | ------------------------- |
| height    | Long | True     | Gets the maximum height of the seed list    |
| count     | Long | True     | Random seed count, no more than 128 |

Returns:

| field   | type    | Remark   |
| ------- | ------- | -------- |
| success | boolean | Successful or not |
| data    | array   | The seed array |

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

### According to the algorithm, the list of random seeds obtained through height interval is calculated as a random seed, and the following is returned

URL：/random/seed/height

Method：GET

Prams:

| parameter   | type   | Required | remark                                       |
| ----------- | ------ | -------- | -------------------------------------------- |
| startHeight | Long   | True     | Initial height of interval                                 |
| endHeight   | Long   | True     | Interval cut-off height,endHeight-startHeight<=1000    |
| algorithm   | String | false    | The default is sha3 algorithm, supporting sha3, KECCAK, merkle algorithm |

Returns:

| field     | type    | Remark             |
| --------- | ------- | ------------------ |
| success   | boolean | Successful or not           |
| data      | Object  | The result object           |
| seed      | String  | Calculate the random seed result |
| algorithm | String  | Computational algorithm        |
| count     | int     | Number of original random seeds   |

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

### According to the algorithm, the list of random seeds obtained by height and quantity is calculated as a random seed, and the following is returned

URL：/random/seed/count

Method：GET

Prams:

| parameter | type   | Required | remark                                       |
| --------- | ------ | -------- | -------------------------------------------- |
| height    | Long   | True     | Gets the maximum height of the seed list                       |
| count     | Long   | True     | Random seed count, no more than 128                   |
| algorithm | String | false    | The default is sha3 algorithm, supporting sha3, KECCAK, merkle algorithm |

Returns:

| field     | type    | Remark             |
| --------- | ------- | ------------------ |
| success   | boolean | Successful or not           |
| data      | Object  | The result object           |
| seed      | String  | Calculate the random seed result |
| algorithm | String  | Computational algorithm        |
| count     | int     | Number of original random seeds   |

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

## 二、Smart contracts support random Numbers in the underlying chain

Similar to the above RPC interface, the smart contract SDK supports the same method to obtain the random number seed provided by the underlying blockchain, such as the following code.
Take one of these methods as an example`Utils.getRandomSeed(long endHeight, int seedCount, String algorithm)` Shows how to generate random Numbers using random number seeds.

### 1） io.nuls.contract.sdk.Utils

```java
/**
 * [Testnet]According to the cutoff height and the number of original seeds, a specific algorithm is used to generate a random seed
 *
 * @param endHeight End height
 * @param seedCount Number of original seeds
 * @param algorithm Hash algorithm identification
 * @return After the original seed byte array is merged, the 32-bit hash byte array is obtained using the hash algorithm and converted to BigInteger(new BigInteger(byte[] bytes))
 */
public static native BigInteger getRandomSeed(long endHeight, int seedCount, String algorithm);

/**
 * [Testnet]According to the height and the original seed number, use the ` SHA3-256 ` hash algorithm to generate a random seed
 *
 * @param endHeight End height
 * @param seedCount Number of original seeds
 * @return After the original seed byte array is merged, the 32-bit hash byte array is obtained using the hash algorithm and converted to BigInteger(new BigInteger(byte[] bytes))
 */
public static BigInteger getRandomSeed(long endHeight, int seedCount) {
    return getRandomSeed(endHeight, seedCount, "SHA3");
}

/**
 * [Testnet]According to the height range, a specific algorithm is used to generate a random seed
 *
 * @param startHeight Start height
 * @param endHeight   Number of original seeds
 * @param algorithm   Hash algorithm identification
 * @return After the original seed byte array is merged, the 32-bit hash byte array is obtained using the hash algorithm and converted to BigInteger(new BigInteger(byte[] bytes))
 */
public static native BigInteger getRandomSeed(long startHeight, long endHeight, String algorithm);

/**
 * [Testnet]According to height, use ` SHA3-256 ` hash algorithm to generate a random seed
 *
 * @param startHeight Start height
 * @param endHeight   End height
 * @return After the original seed byte array is merged, the 32-bit hash byte array is obtained using the hash algorithm and converted to BigInteger(new BigInteger(byte[] bytes))
 */
public static BigInteger getRandomSeed(long startHeight, long endHeight){
    return getRandomSeed(startHeight, endHeight, "SHA3");
}

/**
 * [Testnet]According to the cutoff height and the number of original seeds, the collection of original seeds was obtained
 *
 * @param endHeight End height
 * @param seedCount Number of original seeds
 * @return Returns a collection of original seeds, whose elements are BigInteger converted from byte arrays(new BigInteger(byte[] bytes))
 */
public static native List<BigInteger> getRandomSeedList(long endHeight, int seedCount);

/**
 * [Testnet]Get the set of original seeds according to the height range
 *
 * @param startHeight Start height
 * @param endHeight   End height
 * @return Returns a collection of original seeds, whose elements are BigInteger converted from byte arrays(new BigInteger(byte[] bytes))
 */
public static native List<BigInteger> getRandomSeedList(long startHeight, long endHeight);
```

### 2） A dice ` example ` shaking at the same time N

#### 2.1) Calculation method 1

- Get the original seed`Utils.getRandomSeed(long endHeight, int seedCount, String algorithm)`
- The first random number is modeled according to the range of the dice
- The next random number
	- The original seed is multiplied by the number of tosses, resulting in an array of bytes
	- The byte array is hashed with sha3-256 to get a 32-bit byte array
	- Converts the byte array of this Hash to BigInteger
	- Use this BigInteger to model the next random number based on the range of the dice
	- And so on

**Refer to the following code**

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

#### 2.2) Calculation method 2

- Get the original seed`Utils.getRandomSeed(long endHeight, int seedCount, String algorithm)`
- The first random number is modeled according to the range of the dice
- The next random number
	- Get the last digit of the large number of the original seed (the last digit is obtained according to the number of tosses), multiply this last digit by the original seed, and the result is converted into a byte array
	- The byte array is hashed with sha3-256 to get a 32-bit byte array
	- Converts the byte array of this Hash to BigInteger
	- Use this BigInteger to model the next random number based on the range of the dice
	- And so on

**Refer to the following code**

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