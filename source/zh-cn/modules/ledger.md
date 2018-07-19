## Ledger module

### introduction

* module name : ledger


* moduleID : 8


* description :

  Provide ledger services for block chain. 保存全网交易和UTXO，校验交易合法性.



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
     * Save transactions, automatically handle transactional coin data
     *
     * 保存交易，自动处理交易自带的coindata
     * @param tx
     * @return boolean
     */
    Result saveTx(Transaction tx) throws NulsException;

    /**
     * Roll back transactions while rolling back coindata data
     *
     * 回滚交易，同时回滚coindata数据
     * @param tx
     * @return boolean
     */
    Result rollbackTx(Transaction tx) throws NulsException;

    /**
     * get a transaction
     *
     * 获取一笔交易
     * @param hash
     * @return Transaction
     */
    Transaction getTx(NulsDigestData hash);

    Transaction getTx(byte[] txHashBytes);

    /**
      * Verify that a coindata is valid, the first verification owner is legal (whether it can be used), the second verification amount is correct (output can not be greater than the input)
      * Check whether every from one in the coinData exists in txList database, or if not, is to continue to check the from of the existence of the deal and if it exists, represents a double spend, does not exist, is the orphan transactions, finally throw an exception
      *
      * 验证一笔coindata是否合法，验证拥有者是否合法（是否可动用），验证金额是否正确（输出不能大于输入）
      * 检查coinData里的每一笔from是否存在于txList或者数据库中，如果不存在，则继续检查from中那笔交易是否存在，如果存在，则代表双花，不存在，则是孤儿交易，最后抛出异常
      * @param transaction
      * @param temporaryToMap
      * @param temporaryFromSet
      * @return ValidateResult
      */
    public ValidateResult verifyCoinData(Transaction transaction, Map<String, Coin> temporaryToMap, Set<String> temporaryFromSet);

    /**
      * Verify that a coindata is valid, the first verification owner is legal (whether it can be used), the second verification amount is correct (output can not be greater than the input)
      * Check whether every from one in the coinData exists in txList database, or if not, is to continue to check the from of the existence of the deal and if it exists, represents a double spend, does not exist, is the orphan transactions, finally throw an exception
      *
      * 验证一笔coindata是否合法，验证拥有者是否合法（是否可动用），验证金额是否正确（输出不能大于输入）
      * 检查coinData里的每一笔from是否存在于txList或者数据库中，如果不存在，则继续检查from中那笔交易是否存在，如果存在，则代表双花，不存在，则是孤儿交易，最后抛出异常
      * @param transaction
      * @param temporaryToMap
      * @param temporaryFromSet
      * @param bestHeight
      * @return ValidateResult
      */
    public ValidateResult verifyCoinData(Transaction transaction, Map<String, Coin> temporaryToMap, Set<String> temporaryFromSet, Long bestHeight);

    /**
     * Verify that the from is repeated, and if repeated, it represents a double spend and throws an exception.
     *
     * 验证from是否重复，如果重复，则代表双花，并抛出异常
     * @param block
     * @return ValidateResult<List<Transaction>>
     */
    ValidateResult<List<Transaction>> verifyDoubleSpend(Block block);

    /**
     * Verify that the from is repeated, and if repeated, it represents a double spend and throws an exception.
     *
     * 验证from是否重复，如果重复，则代表双花，并抛出异常
     * @param txList
     * @return ValidateResult<List<Transaction>>
     */
    ValidateResult<List<Transaction>> verifyDoubleSpend(List<Transaction> txList);

    /**
     * Get the entire network of UTXO
     *
     * 获取全网UTXO
     * @return long
     */
    long getWholeUTXO();

    /**
     * get UTXO by key
     *
     * 根据key获取UTXO
     * @param owner
     * @return Coin
     */
    Coin getUtxo(byte[] owner);
}
```


