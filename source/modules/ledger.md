## Ledger module

### Basic information

* Module name: ledger

* ModuleID: 8

* Description: Provides ledger services for block chain.

### Configuration

```ini
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
     * @param tx
     * 
     * @return boolean
     */
    Result saveTx(Transaction tx) throws NulsException;

    /**
     * Roll back transactions,including rolling back coindata data
     *
     * @param tx
     * 
     * @return boolean
     */
    Result rollbackTx(Transaction tx) throws NulsException;

    /**
     * Query a transaction by hash, which is in NulsDigestData format
     *
     * @param hash
     * 
     * @return Transaction
     */
    Transaction getTx(NulsDigestData hash);

    /**
     * Query a transaction by hash, which is in byte[] format.
     *
     * @param txHashBytes
     * 
     * @return Transaction
     */
    Transaction getTx(byte[] txHashBytes);

    /**
      * Verify wheather a coindata is valid:
      * Verify the existence of every UTXO,
      * Verify the owner is the signer,
      * Verify the amount of every UTXO.
      * Verify the status of every UTXO to avoid double spent,
      * Verify the existence of TXs which create the UTXOs,
      * Check wheather it is an orphan TX.
      * 
      * @param transaction
      * @param temporaryToMap
      * @param temporaryFromSet
      * 
      * @return ValidateResult
      */
    public ValidateResult verifyCoinData(Transaction transaction, Map<String, Coin> temporaryToMap, Set<String> temporaryFromSet);

    /**
      * Verify wheather a coindata is valid:
      * Verify the existence of every UTXO,
      * Verify the owner is the signer,
      * Verify the amount of every UTXO.
      * Verify the status of every UTXO to avoid double spent,
      * Verify the existence of TXs which create the UTXOs,
      * Check wheather it is an orphan TX.
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
     * Verify double spent of UTXO in the same block.
     *
     * @param block
     * 
     * @return ValidateResult<List<Transaction>>
     */
    ValidateResult<List<Transaction>> verifyDoubleSpend(Block block);

    /**
     * Verify double spent of UTXO may happen is a list of TXs.
     *
     * @param txList
     * 
     * @return ValidateResult<List<Transaction>>
     */
    ValidateResult<List<Transaction>> verifyDoubleSpend(List<Transaction> txList);

    /**
     * Query the total amount of token of all UTXOs in the ledger.
     *
     * @return long
     */
    long getWholeUTXO();

    /**
     * get UTXO by key
     *
     * @param owner
     * 
     * @return Coin
     */
    Coin getUtxo(byte[] owner);
}
```



