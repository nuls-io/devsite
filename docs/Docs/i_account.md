# account module
## Module Overview
The Account Module is the basic module that provides information about the various functions of the account. It mainly supports the functions of account generation, security and custody, and information acquisition. Other modules can use various functions of the account and obtain account information according to the interface provided by the account module. Users or other applications can be based on rpc. The interface makes the account more practical and personalized. The account is the basic module and the carrier of the user data.
## Interface functions
- Account generation
- Import an account
- Account security and custody
- Backup account, set account password, modify account password, remove account
- Query and acquire account information
- Obtain multiple account information, obtain account address, check account balance, and query account alias
- Other useful and personalized features to set account aliases, set account notes, verify account encryption, sign, verify account address format, verify account password is correct, etc.


## Interface List
### ac\_removeAccount
Remove specified account.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | success |

### ac\_getAccountList
Get or query all account collections and put them in the cache.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------------------------------------------------------------ |:---------------:| ------ |
| list | list&lt;object> | Return to account collection|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | string | Account Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alias | string | Alias|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pubkeyHex | string | Public Key |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;encryptedPrikeyHex | string | Encrypted Private Key |

### ac\_signDigest
Data digest signature.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ----- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |
| data | string | to be signed data | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:------:| ----- |
| signature | string | Post-Signature Data |

### ac\_getAccountByAddress
Get account information by address.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------------ |:------:| ----- |
| address | string | Account Address|
| alias | string | alias |
| pubkeyHex | string | Public Key |
| encryptedPrikeyHex | string | Encrypted Private Key |

### ac\_signBlockDigest
Block data digest signature.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ----- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |
| data | string | to be signed data | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:------:| ----- |
| signature | string | Post-Signature Data |

### ac\_setRemark
Set up a note for the account / Set remark for accounts
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| remark | string | Notes | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | success |

### ac\_importAccountByPriKey
Import account via private key.
#### scope: public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:-------:| ------------ |:----:|
| chainId | int | chain id | yes |
| password | string | set new password | yes |
| priKey | string | Account Private Key | Yes |
| overwrite | boolean | If the account already exists, overwrite | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------- |:------:| ------- |
| address | string | Imported account address|

### ac\_createOfflineAccount
Create an offline account. The account will not be saved to the database, and will return all information to the account.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| count | int | The number of accounts that need to be created | Yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------------------------------------------------------- |:---------------:| ------ |
| list | list&lt;object> | Offline Account Collection |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | string | Account Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pubKey | string | Public Key |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;priKey | string | Private Key |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;encryptedPriKey | string | Encrypted Private Key |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;extend | string | Other Information|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;createTime | long | Create Time|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;encrypted | boolean | Account Encryption|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remark | string | Account Notes |

### ac\_createContractAccount
Create smart contract account.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------- |:------:| ------ |
| address | string | Smart Contract Address |

### ac\_getEncryptedAddressList
Get a list of locally encrypted accounts.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ---- |:---------------:| -------- |
| list | list&lt;string> | Return to account address collection|

### ac\_getAddressList
Get the account address list by paging query.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:----:| ------ |:----:|
| chainId | int | chain id | yes |
| pageNumber | int | Page Number | Yes |
| pageSize | int | Number of records per page | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| --------------- |
| Return value | list&lt;string> | Returns a Page object, account collection|

### ac\_getPriKeyByAddress
Get the account's private key via the address and password.
#### scope :public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---- |
| priKey | string | Private Key |
| pubKey | string | public key |

### ac\_getAllPriKey
Get all local account private keys. You must ensure that all account passwords are consistent. If the passwords in the local accounts are inconsistent, an error message will be returned.

#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ---- |:---------------:| ---- |
| list | list&lt;string> | Private Key Collection |

### ac\_importAccountByKeystore
Import account/accounts by AccountKeyStore according to AccountKeyStore.
#### scope :public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:-------:| ------------ |:----:|
| chainId | int | chain id | yes |
| password | string | set new password | yes |
| keyStore | string | keyStore string | yes |
| overwrite | boolean | If the account already exists, overwrite | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------- |:------:| ------- |
| address | string | Imported account address|

### ac\_exportKeyStoreJson
Export AccountKeyStore string, export account KeyStore json
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| -------- |:------:| ----------- |
| keyStore | string | keyStore string |

### ac\_exportAccountKeyStore
Account backup, export AccountKeyStore string /export account KeyStore
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |
| filePath | string | backup address | no |

#### return value
| Field Name | Field Type | Parameter Description |
| ---- |:------:| --------- |
| path | string | The address of the actual backup file |

### ac\_updatePassword
Modify the account password by using the original password.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ----- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | old password | yes |
| newPassword | string | Account New Password | Yes |

#### return value:
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------ |
| value | boolean | Whether to set success |

### ac\_updateOfflineAccountPassword
Offline account change password
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ----- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | old password | yes |
| newPassword | string | Account New Password | Yes |
| priKey | string | Account Private Key | Yes |

#### return value:
| Field Name | Field Type | Parameter Description |
| --------------- |:------:| ---------- |
| encryptedPriKey | string | Returns the modified private key |

### ac\_validationPassword
Verify that the account password is correct.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |

#### return value:
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| -------- |
| value | boolean | Is the account password correct?

### ac\_verifySignData
Verify Data Signature.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------ |:------:| ----- |:----:|
| pubKey | string | Account Public Key | Yes |
| sig | string | Signature | Yes |
| data | string | to be signed data | yes |

#### return value:
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------ |
| signature | boolean | Signature is correct |

### ac\_createAccount
Create a specified number of accounts.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| count | int | The number of accounts that need to be created | Yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ---- |:---------------:| --------- |
| list | list&lt;string> | Created account address collection|

### ac\_getPubKey
Using the account address and password, get the account's public key.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---- |
| pubKey | string | public key |

### ac\_getAliasByAddress
Get the alias using the address.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:------:| ---- |
| alias | string | alias |

### ac\_setAlias
Set the alias of account
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |
| alias | string | alias | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---------- |
| txHash | string | set alias transaction hash |

### ac\_isAliasUsable
Check if the alias is available and usable.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| alias | string | alias | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| -------- |
| value | boolean | Is the alias available?

### ac\_getAllAddressPrefix
Get the address prefix of all chains.
#### scope: public
#### version: 1.0

#### parameter list
No parameters

#### return value
| Field Name | Field Type | Parameter Description |
| ------------- |:-------:| ---- |
| chainId | integer | chain id |
| addressPrefix | string | address prefix |

### ac\_getAddressPrefixByChainId
Get the address prefix by chain id.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------- |:-------:| ---- |
| chainId | integer | chain id |
| addressPrefix | string | address prefix |

### ac\_addAddressPrefix
Add an address prefix, the chain management module will call the interface
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------------------------------------------------------- |:-------:| ------- |:----:|
| prefixList | list | Chain Address Prefix List | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chainId | integer | chain id | yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addressPrefix | string | address prefix | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### ac\_transfer
Create a general transfer transaction.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------------------------------------------------------- |:----------:| ----------------------------- |:----:|
| chainId | int | chain id | yes |
| inputs | list | Transaction payer data | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | string | Account Address| Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsChainId | integer | Asset Chain ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsId | integer | Asset ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount | biginteger | Quantity | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password | string | The password for the outgoing account (from), ignored when assembling the recipient (to) data | No |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lockTime | long | unlock time, -1 is always locked, 0 is not locked (default) | no|
| outputs | list | Transaction Recipient Data | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | string | Account Address| Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsChainId | integer | Asset Chain ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsId | integer | Asset ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount | biginteger | Quantity | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password | string | The password for the outgoing account (from), ignored when assembling the recipient (to) data | No |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lockTime | long | unlock time, -1 is always locked, 0 is not locked (default) | no|
| remark | string | Transaction Notes | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:------:| ------ |
| value | string | transaction hash |

### ac\_createMultiSignTransfer
Create a multi-signal address transfer transaction.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------------------------------------------------------- |:----------:| ------------------------ |:----:|
| chainId | int | chain id | yes |
| inputs | list | Transaction payer data | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | string | Account Address| Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsChainId | integer | Asset Chain ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsId | integer | Asset ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount | biginteger | Quantity | Yes |
| outputs | list | Transaction Recipient Data | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | string | Account Address| Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsChainId | integer | Asset Chain ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsId | integer | Asset ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount | biginteger | Quantity | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lockTime | long | unlock time, -1 is always locked, 0 is not locked (default) | no|
| remark | string | Transaction Notes | Yes |
| signAddress | string | The first signature account address (without filling, only create transactions are not signed) | No |
| signPassword | string | The first signature account password (without filling, only create transactions are not signed) | No |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------------------------------------- |
| tx | string | Complete transaction serialization string, continue signature if the transaction does not reach the minimum number of signatures |
| txHash | string | Trading hash |
| completed | boolean | true: the transaction is complete (broadcast), false: the transaction is not completed, the minimum number of signatures has not been reached |

### ac\_signMultiSignTransaction
Sign a signature to a MultiSign Transaction.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:------:| ------- |:----:|
| chainId | int | chain id | yes |
| tx | string | Transaction Data String | Yes |
| signAddress | string | Signature Account Address | Yes |
| signPassword | string | Signature Account Password | Yes |

#### return value:
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------------------------------------- |
| tx | string | Complete transaction serialization string, continue signature if the transaction does not reach the minimum number of signatures |
| txHash | string | Trading hash |
| completed | boolean | true: the transaction is complete (broadcast), false: the transaction is not completed, the minimum number of signatures has not been reached |

### ac\_createMultiSignAccount
Create a multi-sign account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:---------------:| ------------------------------- |:----:|
| chainId | int | chain id | yes |
| pubKeys | list&lt;string> | Public key collection (public key of any common address or common account address present in the current node) | Yes |
minSigns | int | Minimum Signature | Yes |

#### return value:
| Field Name | Field Type | Parameter Description |
| ------- |:------:| ------ |
| address | string | Multi-Sign Account Address|

### ac\_removeMultiSignAccount
Remove a multi-sign account.
#### scope: public
#### version: 1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| address | string | Multi-Sign Account Address | Yes |

#### return value:
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------ |
| value | boolean | Whether to remove success|

### ac\_setMultiSignAlias
Set the alias of a multi-signature account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:------:| ---------------------- |:----:|
| chainId | int | chain id | yes |
| address | string | Multi-Sign Account Address | Yes |
| alias | string | alias | yes |
| signAddress | string | The first signature account address (without filling, only create transactions are not signed) | No |
| signPassword | string | The first signature account password (without filling, only create transactions are not signed) | No |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------------------------------------- |
| tx | string | Complete transaction serialization string, continue signature if the transaction does not reach the minimum number of signatures |
| txHash | string | Trading hash |
| completed | boolean | true: the transaction is complete (broadcast), false: the transaction is not completed, the minimum number of signatures has not been reached |

### ac\_getMultiSignAccount
Get a full multi-signature account by searching for a multi-signature account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| address | string | Multi-Sign Account Address | Yes |

#### return value:
| Field Name | Field Type | Parameter Description |
| ----- |:------:| ------------ |
| value | string | Multi-Sign Account Serialization Data String |

### ac\_isMultiSignAccountBuilder
Verify that one of the creators of the multi-signed account is an account Builder.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ----------------- |:----:|
| chainId | int | chain id | yes |
| address | string | Multi-Sign Account Address | Yes |
| pubKey | string | creator public key or address already present at the current node | Yes |

#### return value:
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------------ |
| value | boolean | Whether to sign one of the creators of the account |

