## Ledger module

### Introduction

* Module name : ledger

* ModuleID : 8

* Description : Provides ledger services for block chain.

### configuration

```
[ledger]
  #Bootstrap class
  bootstrap=io.nuls.ledger.module.impl.UtxoLedgerModuleBootstrap
```

### service

* LedgerService

```java
public interface LedgerService {

    /**
     * 保存交易，自动处理交易自带的coindata
     * 
     * @param tx
     * 
     * @return boolean
     */
    Result saveTx(Transaction tx) throws NulsException;

    /**
     * 回滚交易，同时回滚coindata数据
     * 
     * @param tx
     * 
     * @return boolean
     */
    Result rollbackTx(Transaction tx) throws NulsException;

    /**
     * 根据hash对象查询一笔交易.
     * 
     * @param hash NulsDigestData格式的交易hash.
     * 
     * @return Transaction
     */
    Transaction getTx(NulsDigestData hash);

    /**
     * 根据hash查询一笔交易.
     * 
     * @param txHashBytes byte[]格式的交易hash.
     * 
     * @return Transaction
     */
    Transaction getTx(byte[] txHashBytes);

    /**
      * 验证一笔coindata是否合法，验证拥有者是否合法（是否可动用），验证金额是否正确（输出不能大于输入）
      * 检查coinData里的每一笔from是否存在于txList或者数据库中，如果不存在，则继续检查from中那笔交易是否存在，如果存在，则代表双花，不存在，则是孤儿交易，最后抛出异常
      * 
      * @param transaction
      * @param temporaryToMap
      * @param temporaryFromSet
      * 
      * @return ValidateResult
      */
    public ValidateResult verifyCoinData(Transaction transaction, Map<String, Coin> temporaryToMap, Set<String> temporaryFromSet);

    /**
      * 验证一笔coindata是否合法，验证拥有者是否合法（是否可动用），验证金额是否正确（输出不能大于输入）
      * 检查coinData里的每一笔from是否存在于txList或者数据库中，如果不存在，则继续检查from中那笔交易是否存在，如果存在，则代表双花，不存在，则是孤儿交易，最后抛出异常
      *
      * @param transaction
      * @param temporaryToMap
      * @param temporaryFromSet
      * @param bestHeight
      * 
      * @return ValidateResult
      */
    public ValidateResult verifyCoinData(Transaction transaction, Map<String, Coin> temporaryToMap, Set<String> temporaryFromSet, Long bestHeight);

    /**
     * 验证同一个区块内UTXO是否重复，如果重复，则代表双花，并抛出异常
     * 
     * @param block
     * 
     * @return ValidateResult<List<Transaction>>
     */
    ValidateResult<List<Transaction>> verifyDoubleSpend(Block block);

    /**
     * 验证交易列表内UTXO是否重复，如果重复，则代表双花，并抛出异常
     * 
     * @param txList
     * 
     * @return ValidateResult<List<Transaction>>
     */
    ValidateResult<List<Transaction>> verifyDoubleSpend(List<Transaction> txList);

    /**
     * 获取全网UTXO金额总和
     * 
     * @return long
     */
    long getWholeUTXO();

    /**
     * 根据key查询UTXO
     * 
     * @param owner
     * 
     * @return Coin
     */
    Coin getUtxo(byte[] owner);
}
```


