### Account 模块

### 介绍

- 模块名称：account

- 模块ID：5

- 说明： 

  为区块链提供账户功能的基础服务，包含账户的创建，信息查询，移除，导入，备份等。

### 配置

```ini
    [account]
    #Bootstrap class
    bootstrap=io.nuls.account.module.AccountModuleBootstrap
```

### 服务

* AccountService

public interface AccountService {

    /**
     * 创建指定个数的账户
     * 
     * @param count    账户数量
     * @param password 账户密码，如果账户密码null或者"",账户将不被加密
     * 
     * @return 新建的账户列表
     */
    Result<List<Account>> createAccount(int count, String password);

    /**
     * 创建指定个数的账户
     *
     * @param count 账户数量
     * 
     * @return 新建的账户列表.
     */
    Result<List<Account>> createAccount(int count);

    /**
     * 创建一个的账户
     *
     * @password 账户密码
     *
     * @return 新建的账户列表(列表只有一个账户)
     */
    Result<List<Account>> createAccount(String password);

    /**
     * 创建一个不加密账户
     *
     * @return 新建的账户列表(列表只有一个账户)
     */
    Result<List<Account>> createAccount();

    /**
     * 根据地址删除对应的账户
     *
     * @param address  账户地址.
     * @param password 账户密码.
     *
     * @return 操作结果
     */
    Result<Boolean> removeAccount(String address, String password);


    /**
     * 根据keyStore重置密码
     *
     * @param keyStore 文件
     *
     * @return 操作结果
     */
    Result<Account> updatePasswordByAccountKeyStore(AccountKeyStore keyStore, String password);

    /**
     * 从keyStore导入账户
     *
     * @param keyStore keyStore 文件.
     
     * @return 操作结果
     */
    Result<Account> importAccountFormKeyStore(AccountKeyStore keyStore, String password);

    /**
     * 从keyStore导入账户
     *
     * @param keyStore keyStore 文件.
     *
     * @return 操作结果
     */
    Result<Account> importAccountFormKeyStore(AccountKeyStore keyStore);


    /**
     * 根据私钥和密码导入账户
     *
     * @param prikey  账户私钥
     * @param password 账户密码
     *
     * @return 被导入的账户
     */
    Result<Account> importAccount(String prikey, String password);

    /**
     * 根据私钥明文导入账户
     *
     * @param prikey  账户明文私钥
     *
     * @return 被导入的账户
     */
    Result<Account> importAccount(String prikey);
    

    /**
     * 导出账户到keyStore
     * 
     * @param address  账户地址
     * @param password 账户密码
     *
     * @return keyStore文件对象
     */
    Result<AccountKeyStore> exportAccountToKeyStore(String address, String password);

    /**
     * 根据字节格式账户地址查询完整的账户信息
     * 
     * @param address  账户地址
     *
     * @return 账户.
     */
    Result<Account> getAccount(byte[] address);

    /**
     * 根据账户地址查询完整的账户信息
     * 
     * @param address  账户地址
     *
     * @return 账户.
     */
    Result<Account> getAccount(String address);

    /**
     * 根据账户地址对象查询完整的账户信息
     * 
     * @param address  账户地址对象
     *
     * @return 账户.
     */
    Result<Account> getAccount(Address address);

    /**
     * 根据账户公钥获取账户地址对象
     * 
     * @param pubKey  账户公钥
     *
     * @return 账户
     */
    Result<Address> getAddress(String pubKey);

    /**
     * 根据账户二进制公钥获取账户地址对象
     *
     * @param pubKey 账户公钥
     *
     * @return 账户
     */
    Result<Address> getAddress(byte[] pubKey);

    /**
     * 根据账户验证账户是否加密
     * Verify weather the account is encrypted according to the account.
     *
     * @param account the account to be verified.
     * @return the result of the operation.
     */
    Result isEncrypted(Account account);

    /**
     * 根据账户的地址对象验证账户是否加密
     * Verify weather the account is encrypted according to the account's address object.
     *
     * @param address The address of the account to be verified.
     * @return the result of the operation.
     */
    Result isEncrypted(Address address);

    /**
     * 根据账户的地址字符串验证账户是否加密
     * Verify weather the account is encrypted according to the account's address string.
     *
     * @param address The address of the account to be verified.
     * @return the result of the operation.
     */
    Result isEncrypted(String address);

    /**
     * Verify the account password.
     *
     * @param account
     * @param password
     * @return
     */
    Result validPassword(Account account, String password);

    /**
     * 验证地址字符串的格式
     * Verify the format of the address string.
     *
     * @param address To verify the address string.
     * @return the result of the operation.
     */
    Result verifyAddressFormat(String address);

    /**
     * 获取所有账户集合
     * Query all account collections.
     *
     * @return account list of all accounts.
     */
    Result<Collection<Account>> getAccountList();

    /**
     * 数据签名
     * Sign data.
     *
     * @param data     Data to be signed.
     * @param account  Signed account
     * @param password Account password
     * @return The NulsSignData object.
     */
    NulsSignData signData(byte[] data, Account account, String password) throws NulsException;

    /**
     * 数据签名(无密码)
     * Sign data.(no password)
     *
     * @param data    Data to be signed.
     * @param account Signed account
     * @return The NulsSignData object.
     */
    NulsSignData signData(byte[] data, Account account) throws NulsException;

    /**
     * 数据签名
     * Sign data.
     *
     * @param data  Data to be signed.
     * @param ecKey eckey.
     * @return The NulsSignData object.
     */
    NulsSignData signData(byte[] data, ECKey ecKey) throws NulsException;

    /**
     * 数据签名
     * Sign data.
     *
     * @param digest   data digest.
     * @param account  account to sign.
     * @param password password of account.
     * @return the NulsSignData object.
     */
    NulsSignData signDigest(byte[] digest, Account account, String password) throws NulsException;

    /**
     * 数据签名
     * Sign data digest
     *
     * @param digest to be signed.
     * @param ecKey  eckey
     * @return The NulsSignData object.
     */
    NulsSignData signDigest(byte[] digest, ECKey ecKey);

    /**
     * 验证签名
     * Verify the signature.
     *
     * @param data     data to be validated.
     * @param signData signature.
     * @param pubKey   dublic key of account.
     * @return the result of the opration
     */
    Result verifySignData(byte[] data, NulsSignData signData, byte[] pubKey);

    /**
     * 获取所有的账户的余额
     * Query the balance of all accounts.
     *
     * @return Balance object.
     */
    Result<Balance> getBalance() throws NulsException;

    /**
     * 根据账户获取账户余额
     * Query the balance of an account.
     *
     * @param account the account.
     * @return Balance object.
     */
    Result<Balance> getBalance(Account account) throws NulsException;

    /**
     * 根据账户地址对象获取账户余额
     * Query the balance of an account.
     *
     * @param address the address of the account.
     * @return Balance object.
     */
    Result<Balance> getBalance(Address address) throws NulsException;

    /**
     * 根据账户地址字符串获取账户余额
     * Query the balance of an account.
     *
     * @param address the address of the account.
     * @return Balance object.
     */
    Result<Balance> getBalance(String address) throws NulsException;


    /**
     * 根据账户地址字节数组获取账户别名
     * Get an account alias based on the array of account address bytes
     *
     * @param address
     * @return alias string
     */
    Result<String> getAlias(byte[] address);

    /**
     * 根据账户地址获取账户别名
     * Get account alias according to account address
     *
     * @param address
     * @return alias string
     */
    Result<String> getAlias(String address);

    /**
     * 获取设置别名交易手续费
     * Gets to set the alias transaction fee
     *
     * @param address
     * @param aliasName
     * @return
     */
    Result<Na> getAliasFee(String address, String aliasName);

}


### 模块交易

#### 通用交易数据结构

| 尺寸 | 字段       | 数据类型 | 说明           |
| ---- | ---------- | -------- | -------------- |
| 2    | type       | uint16   | 交易类型       |
| 6    | time       | uint48   | 时间戳         |
| ??   | remark     | VarByte  | 备注           |
| ??   | txData     | ??       | 交易数据       |
| ??   | coinData   | ??       | 代币数据       |
| ??   | scriptSign | VarByte  | P2PKHScriptSig |

#### 别名交易

- txData：Alias

#### Alias

| 尺寸 | 字段    | 数据类型 | 说明               |
| ---- | ------- | -------- | ------------------ |
| 2    | address | VarByte  | 设置别名的账户地址 |
| ？？ | alias   | String   | 别名名称           |
