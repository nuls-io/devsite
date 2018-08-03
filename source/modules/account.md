### Account module

### Introduction

* Module name：account

* Module ID：5

* Description：Provides account management.You can create,query,remove,backup&restore accounts by using this module.

### Configuration

```ini
    [account]
    #Bootstrap class
    bootstrap=io.nuls.account.module.AccountModuleBootstrap
```

### service

* AccountService

```java
public interface AccountService {

    /**
     * Create a specified number of accounts,and encrypt the accounts,
     * all the accounts are encrypted by the same password
     * if the password is NULL or "", the accounts will be unencrypted.
     *
     * @param count    the number of account you want to create.
     * @param password the password of the accounts.
     * 
     * @return the account list created.
     */
    Result<List<Account>> createAccount(int count, String password);

    /**
     * Create unencrypted accounts.
     *
     * @param count the number of account you want to create.
     * 
     * @return the account list created.
     */
    Result<List<Account>> createAccount(int count);

    /**
     * Create an account and encrypt it,
     * if the password is NULL or "", the accounts will be unencrypted.
     *
     * @param password the password of the accounts(only one account in the list).
     * 
     * @return the account list created.
     */
    Result<List<Account>> createAccount(String password);

    /**
     * Create an unencrypted account
     *
     * @return the account list created(only one account in the list).
     */
    Result<List<Account>> createAccount();

    /**
     * delete an account by address.
     *
     * @param address  the address of the account you want to delete.
     * @param password the password of the account.
     * 
     * @return the result of the operation.
     */
    Result<Boolean> removeAccount(String address, String password);


    /**
     * Reset password by keyStore.
     *
     * @param keyStore the keyStore of the account.
     * 
     * @return the account.
     */
    Result<Account> updatePasswordByAccountKeyStore(AccountKeyStore keyStore, String password);

    /**
     * import an account form account key store.
     *
     * @param keyStore the keyStore of the account.
     * 
     * @return the account imported.
     */
    Result<Account> importAccountFormKeyStore(AccountKeyStore keyStore, String password);

    /**
     * import an account form account key store.
     *
     * @param keyStore the keyStore of the account.
     * 
     * @return the result of the operation.
     */
    Result<Account> importAccountFormKeyStore(AccountKeyStore keyStore);


    /**
     * import an account from plain private key and encrypt the account.
     * 
     * @param prikey plain private key.
     * @param password password to encrypt the account. 
     * 
     * @return the account imported..
     */
    Result<Account> importAccount(String prikey, String password);

    /**
     * import an unencrypted account by plain private key.
     * 
     * @param prikey plain private key.
     * 
     * @return the account imported..
     */
    Result<Account> importAccount(String prikey);

    /**
     * export an account to an account key store.
     *
     * @param address  the address of the account.
     * @param password the password of the account key store.
     * 
     * @return the account key store object.
     */
    Result<AccountKeyStore> exportAccountToKeyStore(String address, String password);

    /**
     * Query account information by address.
     *
     * @param address the address of the account you want to query.
     * 
     * @return the account.
     */
    Result<Account> getAccount(byte[] address);

    /**
     * Query account by address.
     *
     * @param address the address of the account you want to query.
     * 
     * @return the account.
     */
    Result<Account> getAccount(String address);

    /**
     * 根据账户地址类对象获取完整的账户信息
     * Query account by account address.
     *
     * @param address the address of the account you want to query.
     * 
     * @return the account.
     */
    Result<Account> getAccount(Address address);

    /**
     * Query account address by public key.
     *
     * @param pubKey public key string.
     * 
     * @return the account address.
     */
    Result<Address> getAddress(String pubKey);

    /**
     * Gets the account address object from the account binary public key.
     *
     * @param pubKey public key binary array.
     * 
     * @return the account address.
     */
    Result<Address> getAddress(byte[] pubKey);

    /**
     * Verify whether the account is encrypted.
     *
     * @param account the account to be verified.
     * 
     * @return the result of the operation.
     */
    Result<Boolean> isEncrypted(Account account);

    /**
     * Verify whether the account is encrypted.
     *
     * @param address The address of the account to be verified.
     * 
     * @return the result of the operation.
     */
    Result<Boolean> isEncrypted(Address address);

    /**
     * Verify whether the account is encrypted.
     *
     * @param address The address of the account to be verified.
     * 
     * @return the result of the operation.
     */
    Result<Boolean> isEncrypted(String address);

    /**
     * Verify the account password.
     *
     * @param account
     * @param password
     * 
     * @return
     */
    Result<Boolean> validPassword(Account account, String password);

    /**
     * Verify whether the address is legal.
     *
     * @param address 
     * 
     * @return the result of the operation.
     */
    Result<Boolean> verifyAddressFormat(String address);

    /**
     * Query all account collections.
     *
     * @return account Collection of all accounts.
     */
    Result<Collection<Account>> getAccountList();

    /**
     * Sign data.
     *
     * @param data     data to be signed.
     * @param account  account
     * @param password password
     * 
     * @return The NulsSignData object.
     */
    NulsSignData signData(byte[] data, Account account, String password) throws NulsException;

    /**
     * Sign data.
     *
     * @param data    data to be signed.
     * @param account account
     * 
     * @return The NulsSignData object.
     */
    NulsSignData signData(byte[] data, Account account) throws NulsException;

    /**
     * Sign data.
     *
     * @param data  data to be signed.
     * @param ecKey eckey.
     * 
     * @return The NulsSignData object.
     */
    NulsSignData signData(byte[] data, ECKey ecKey) throws NulsException;

    /**
     * sign data.
     *
     * @param digest   data digest.
     * @param account  account to sign.
     * @param password password of account.
     * 
     * @return the NulsSignData object.
     */
    NulsSignData signDigest(byte[] digest, Account account, String password) throws NulsException;

    /**
     * Sign data digest
     *
     * @param digest digest to be signed.
     * @param ecKey  eckey
     * 
     * @return The NulsSignData object.
     */
    NulsSignData signDigest(byte[] digest, ECKey ecKey);

    /**
     * Verify the signature.
     *
     * @param data     data to be validated.
     * @param signData signature.
     * @param pubKey   dublic key of account.
     * 
     * @return the result of the opration
     */
    Result<Boolean> verifySignData(byte[] data, NulsSignData signData, byte[] pubKey);

    /**
     * Query the balance of all accounts.
     *
     * @return Balance object.
     */
    Result<Balance> getBalance() throws NulsException;

    /**
     * Query the balance of an account.
     *
     * @param account the account.
     * 
     * @return Balance object.
     */
    Result<Balance> getBalance(Account account) throws NulsException;

    /**
     * Query the balance of an account.
     *
     * @param address the address of the account.
     * 
     * @return Balance object.
     */
    Result<Balance> getBalance(Address address) throws NulsException;

    /**
     * Query the balance of an account.
     *
     * @param address the address of the account.
     * @return Balance object.
     */
    Result<Balance> getBalance(String address) throws NulsException;


    /**
     * Query the alias of an account.
     *
     * @param address the address of the account, in bytes format.
     * @return alias string.
     */
    Result<String> getAlias(byte[] address);

    /**
     * Query account alias by address.
     *
     * @param address the address of the account.
     * 
     * @return alias string.
     */
    Result<String> getAlias(String address);

    /**
     * Calculate the fee to set the alias transaction.
     *
     * @param address
     * @param aliasName
     * @return
     */
    Result<Na> getAliasFee(String address, String aliasName);

}
```

### Message

#### Universal protocal of Transaction

| Size | Name       | Type | Remark           |
| ---- | ---------- | -------- | -------------- |
| 2    | type       | uint16   | txType       |
| 6    | time       | uint48   | timestamp         |
| ??   | remark     | VarByte  | remark           |
| ??   | txData     | ??       | txData       |
| ??   | coinData   | ??       | coinData       |
| ??   | scriptSign | VarByte  | P2PKHScriptSig |

#### Alias 

- txData：Alias

#### Alias

| Size | Name       | Type | Remark           |
| ---- | ------- | -------- | ------------------ |
| 2    | address | VarByte  | address |
| ?? | alias   | String   | alias |
