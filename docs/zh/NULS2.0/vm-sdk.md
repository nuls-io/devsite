# VM-SDK

```java
/**
 * 调用链上其他模块的命令
 *
 * @param cmdName 命令名称
 * @param args 命令参数
 * @return 命令返回值(根据注册命令的返回类型可返回字符串,字符串数组,字符串二维数组)
 */
public static native Object invokeExternalCmd(String cmdName, String[] args);

```

## 1. 生成合约共识交易的功能

### 1.1 创建共识节点

- 命令名称

    **`cs_createContractAgent `**
    
- 交易类型 
  
    **txType = `20`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:--:|:--:|:--:|:--:|:--:|
    |packingAddress    |打包地址     |String     |AddressTool.getStringAddressByBytes(byte[])|略|
    |deposit    |保证金     |String     |BigInteger - toString|略|
    |commissionRate    |佣金比例     |String     |Byte - toString|范围[10,100]|

- 返回值说明
  
    > 返回值类型是 **`String`** 字符串类型
    
    |描述 |字符串转换逻辑    |
    |:--:|:--:|
    |交易hash     |略|

- 示例

    ```java
    // String packingAddress, BigInteger depositNa, String commissionRate
    String[] args = new String[]{packingAddress, depositNa.toString(), commissionRate};
    String txHash = (String) Utils.invokeExternalCmd("cs_createContractAgent", args);        
    ```

### 1.2 合约委托共识节点

- 命令名称

    **`cs_contractDeposit `**

- 交易类型 
  
    **txType = `21`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:--:|:--:|:--:|:--:|:--:|
    |agentHash    |创建合约共识节点交易hash     |String     |略|略|
    |deposit    |委托金额     |String     |BigInteger - toString|略|

- 返回值说明
  
    > 返回值类型是 **`String`** 字符串类型
    
    |描述 |字符串转换逻辑    |
    |:--:|:--:|
    |交易hash     |略|
    
- 示例

    ```java
    // String agentHash, BigInteger depositNa
    String[] args = new String[]{agentHash, depositNa.toString()};
    String txHash = (String) Utils.invokeExternalCmd("cs_contractDeposit", args);       
    ```

### 1.3 合约退出共识节点

- 命令名称

    **`cs_contractWithdraw`**

- 交易类型 
  
    **txType = `22`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:--:|:--:|:--:|:--:|:--:|
    |joinAgentHash    |加入共识时的交易hash     |String     |略|略|

- 返回值说明
  
    > 返回值类型是 **`String`** 字符串类型
    
    |描述 |字符串转换逻辑    |
    |:--:|:--:|
    |交易hash     |略|

- 示例

    ```java
    // String joinAgentHash
    String[] args = new String[]{joinAgentHash};
    String txHash = (String) Utils.invokeExternalCmd("cs_contractWithdraw", args);       
    ```    
    
### 1.4 合约注销共识节点

- 命令名称

    **`cs_stopContractAgent `**

- 交易类型 
  
    **txType = `23`**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    无参数

- 返回值说明
  
    > 返回值类型是 **`String`** 字符串类型
    
    |描述 |字符串转换逻辑    |
    |:--:|:--:|
    |交易hash     |略|

- 示例

    ```java
    String txHash = (String) Utils.invokeExternalCmd("cs_stopContractAgent", null);      
    ```
    
## 2. 查询共识数据

### 2.1 根据_`加入共识时的交易hash`_查询委托共识信息

- 命令名称

    **`cs_getContractDepositInfo `**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:--:|:--:|:--:|:--:|:--:|
    |joinAgentHash    |加入共识时的交易hash     |String     |略|略|

- 返回值说明
  
    > 返回值类型是 **`String[]`** 字符串数组类型
    
    |index  |描述 |字符串转换逻辑    |
    |:--:|:--:|:--:|
    |0    | agentHash     |略|
    |1    | agentAddress     |AddressTool.getStringAddressByBytes(byte[])|
    |2    | joinAddress     |AddressTool.getStringAddressByBytes(byte[])|
    |3    | deposit     |BigInteger - toString|
    |4    | time     |Long - toString|
    |5    | blockHeight     |Long - toString|
    |6    | delHeight     |Long - toString|
    |7    | status(0-待共识 1-共识中) |Integer - toString|

- 示例

    ```java
    // String joinAgentHash
    String[] args = new String[]{joinAgentHash};
    String[] contractDepositInfo = (String[]) Utils.invokeExternalCmd("cs_getContractDepositInfo", args);  
    
    // 委托金额
    BigInteger deposit = new BigInteger(contractDepositInfo[3]);
    // 0-待共识 1-共识中
    String status = contractDepositInfo[7];     
    ```

### 2.2 根据_`创建节点的交易hash`_查询节点信息

- 命令名称

    **`cs_getContractAgentInfo `**
    
- 方法参数规范
  
    > 合约调用此方法时，传递的参数类型都是`String`类型
    
    |名称  |描述     |类型   |合约转换`String`逻辑    |备注|
    |:--:|:--:|:--:|:--:|:--:|
    |agentHash    |创建合约共识节点交易hash     |String     |略|略|

- 返回值说明
  
    > 返回值类型是 **`String[]`** 字符串数组类型
    
    |index  |描述 |中文描述   |字符串转换逻辑    |
    |:--:|:--:|:--:|:--:|
    |0    | agentAddress     |创建节点的地址   |AddressTool.getStringAddressByBytes(byte[])|
    |1    | packingAddress     |打包地址    |AddressTool.getStringAddressByBytes(byte[])|
    |2    | rewardAddress     |奖励地址 |AddressTool.getStringAddressByBytes(byte[])|
    |3    | deposit     |保证金    |BigInteger - toString|
    |4 | totalDeposit |总委托金额 |BigInteger - toString|
    |5    | commissionRate     |佣金比例    |Integer - toString|
    |6    | time     |创建节点时间    |Long - toString|
    |7    | blockHeight     |创建节点的高度    |Long - toString|
    |8    | delHeight     |注销节点的高度      |Long - toString|
    |9    | status     |状态(0-待共识 1-共识中)  |Integer - toString|

- 示例

    ```java
    // String agentHash
    String[] args = new String[]{agentHash};
    String[] contractAgentInfo = (String[]) Utils.invokeExternalCmd("cs_getContractAgentInfo", args);  
    
    // 合约节点已委托金额
    BigInteger totalDepositOfContractAgent = new BigInteger(contractAgentInfo[4]);
    // 0-待共识 1-共识中
    String statusOfContractAgent = contractAgentInfo[9];     
    ```
    
    
