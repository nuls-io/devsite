# Account Module
## Module Overview
The account is the basic carrier of user account data. The account module provides information about an account's various aspects. It supports account generation, security, custody, and information acquisition. Other modules can use the functions of the account module, obtaining account information via account module interface. Users and/or applications can be rpc based. The account module interface makes account interaction possible.
## Interface functions
- Create an account.
- Import an account.
- Account security and custody.
- Backup account, set account password, modify account password, remove account.
- Query/acquire account information.
- Obtain multiple account information, obtain account address, check account balance, query account alias.
- Other features to set account aliases and notes, verify account encryption and signature, verify account address format, verify account password, etc.


## Interface List
### ac\_removeAccount
Remove specified account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | success |

### ac\_getAccountList
Get or query all account collections.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ------------------------------------------------------------------ |:---------------:| ------ |
| list | list&lt;object> | account collection|
| address | string | account address|
| alias | string | alias|
| pubkeyHex | string | public key |
| encryptedPrikeyHex | string | encrypted private key |

### ac\_signDigest
Data digest signature.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ----- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |
| data | string | to be signed data | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| --------- |:------:| ----- |
| signature | string | post-signature data |

### ac\_getAccountByAddress
Get account information by address.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ------------------ |:------:| ----- |
| address | string | account address|
| alias | string | alias |
| pubkeyHex | string | public Key |
| encryptedPrikeyHex | string | encrypted private Key |

### ac\_signBlockDigest
Block data digest signature.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ----- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |
| data | string | to be signed data | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| --------- |:------:| ----- |
| signature | string | post-signature data |

### ac\_setRemark
Set up a remark or note for the account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| remark | string | notes | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | success |

### ac\_importAccountByPriKey
Import account via private key.
#### scope: public
#### version:1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:-------:| ------------ |:----:|
| chainId | int | chain id | yes |
| password | string | set new password | yes |
| priKey | string | account private key | yes |
| overwrite | boolean | if account exists, overwrite | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ------- |:------:| ------- |
| address | string | imported account address|

### ac\_createOfflineAccount
Create an offline account. The account will not be saved to the database, and returns all information about the account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| count | int | number of accounts to be created | yes |
| password | string | account password | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| --------------------------------------------------------------- |:---------------:| ------ |
| list | list&lt;object> | offline account collection |
| address | string | account address|
| pubKey | string | public Key |
| priKey | string | private Key |
| encryptedPriKey | string | encrypted private key |
| extend | string | other information|
| createTime | long | create time|
| encrypted | boolean | account encryption|
| remark | string | account notes |

### ac\_createContractAccount
Create a smart contract account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ------- |:------:| ------ |
| address | string | smart contract address |

### ac\_getEncryptedaddressList
Get a list of locally encrypted accounts.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ---- |:---------------:| -------- |
| list | list&lt;string> | account address collection|

### ac\_getAddressList
Get the account address list by paging query.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:----:| ------ |:----:|
| chainId | int | chain id | yes |
| pageNumber | int | page Number | yes |
| pageSize | int | Number of records per page | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| --- |:---------------:| --------------- |
| return value | list&lt;string> | page object, account collection|

### ac\_getPriKeyByAddress
Get the account's private key via the address and password.
#### scope :public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---- |
| priKey | string | private key |
| pubKey | string | public key |

### ac\_getAllPriKey
Get all local account private keys. Ensure that all account passwords are correct and consistent.

#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| password | string | account password | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ---- |:---------------:| ---- |
| list | list&lt;string> | private key Collection |

### ac\_importAccountByKeystore
Import account/accounts by accountKeyStore according to accountKeyStore.
#### scope :public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:-------:| ------------ |:----:|
| chainId | int | chain id | yes |
| password | string | set new password | yes |
| keyStore | string | keyStore string | yes |
| overwrite | boolean | if account exists, overwrite | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ------- |:------:| ------- |
| address | string | imported account address|

### ac\_exportKeyStoreJson
Export AccountKeyStore string or json.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| -------- |:------:| ----------- |
| keyStore | string | keyStore string |

### ac\_exportAccountKeyStore
Export/backup AccountKeyStore string.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |
| filePath | string | backup address | no |

#### return values:
| Field Name | Field Type | Parameter Description |
| ---- |:------:| --------- |
| path | string | backup file address|

### ac\_updatePassword
Modify the account password via the original password.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ----- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | old password | yes |
| newPassword | string | account new password | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------ |
| value | boolean | whether to set success |

### ac\_updateOfflineAccountPassword
Offline account change password.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ----- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | old password | yes |
| newPassword | string | account new password | yes |
| priKey | string | account private Key | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| --------------- |:------:| ---------- |
| encryptedPriKey | string | modified private key |

### ac\_validationPassword
Verify that the account password is correct.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |

#### return values:
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
| pubKey | string | account public key | yes |
| sig | string | signature | yes |
| data | string | to be signed data | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------ |
| signature | boolean | signature is correct |

### ac\_createAccount
Create a specified number of accounts.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| count | int | number of accounts to be created | yes |
| password | string | account password | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ---- |:---------------:| --------- |
| list | list&lt;string> | created account address collection|

### ac\_getPubKey
Using the account address and password, get the account's public key.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---- |
| pubKey | string | public key |

### ac\_getAliasByAddress
Get the alias using the address.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ----- |:------:| ---- |
| alias | string | alias |

### ac\_setAlias
Set the alias of account
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| address | string | account address | yes |
| password | string | account password | yes |
| alias | string | alias | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---------- |
| txHash | string | set alias transaction hash |

### ac\_isAliasUsable
Check if the alias is available and usable.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | chain id | yes |
| alias | string | alias | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| -------- |
| value | boolean | Is the alias available?

### ac\_getAllAddressPrefix
Get the address prefix of all chains.
#### scope: public
#### version: 1.0

#### parameter list:
No parameters

#### return values:
| Field Name | Field Type | Parameter Description |
| ------------- |:-------:| ---- |
| chainId | integer | chain id |
| addressPrefix | string | address prefix |

### ac\_getAddressPrefixByChainId
Get the address prefix by chain id.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ------------- |:-------:| ---- |
| chainId | integer | chain id |
| addressPrefix | string | address prefix |

### ac\_addAddressPrefix
Add an address prefix, chain management module will call the interface
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------------------------------------------------------- |:-------:| ------- |:----:|
| prefixList | list | chain address prefix list | yes |
| chainId | integer | chain id | yes |
| addressPrefix | string | address prefix | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | no specific return value, no error if successful |

### ac\_transfer
Create a general transfer transaction.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter type | Parameter Description | Is Not Empty |
| ------------------------------------------------------------- |:----------:| ----------------------------- |:----:|
| chainId | int | chain id | yes |
| inputs | list | transaction payer data | yes |
| address | string | account address| yes |
| assetsChainId | integer | asset chain id | yes |
| assetsId | integer | asset ID | yes |
| amount | biginteger | quantity | yes |
| password | string | password for the outgoing account (from), ignored when assembling recipient (to) data | no |
| locktime | long | unlock time, -1 is always locked, 0 is not locked (default) | no|
| outputs | list | transaction recipient data | yes |
| address | string | account address| yes |
| assetsChainId | integer | asset chain id | yes |
| assetsId | integer | asset ID | yes |
| amount | biginteger | quantity | yes |
| password | string | password for outgoing account (from), ignored when assembling recipient (to) data | no |
| locktime | long | unlock time, -1 is always locked, 0 is not locked (default) | no|
| remark | string | transaction notes | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ----- |:------:| ------ |
| value | string | transaction hash |

### ac\_createMultiSignTransfer
Create a multi-signal address transfer transaction.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is not Empty |
| ------------------------------------------------------------- |:----------:| ------------------------ |:----:|
| chainId | int | chain id | yes |
| inputs | list | transaction payer data | yes |
| address | string | account address| yes |
| assetsChainId | integer | asset chain id | yes |
| assetsId | integer | asset ID | yes |
| amount | biginteger | quantity | yes |
| outputs | list | transaction Recipient Data | yes |
| address | string | account address| yes |
| assetsChainId | integer | asset chain id | yes |
| assetsId | integer | asset ID | yes |
| amount | biginteger | quantity | yes |
| lockTime | long | unlock time, -1 is always locked, 0 is not locked (default) | no|
| remark | string | transaction notes | yes |
| signAddress | string | first signature account address (without filling, only create unsigned transactions) | no |
| signPassword | string | first signature account password (without filling, only create unsigned transactions ) | no |

#### return values:
| Field Name | Field type | Parameter Description |
| --------- |:-------:| ------------------------------------- |
| tx | string | Complete transaction serialization string, continue signature if the transaction does not reach the minimum number of signatures |
| txHash | string | trading hash |
| completed | boolean | true: the transaction is complete (broadcast), false: transaction not complete, minimum number of signatures not attained |

### ac\_signMultiSignTransaction
Sign a signature to a multi-sign transaction.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:------:| ------- |:----:|
| chainId | int | chain id | yes |
| tx | string | transaction Data String | yes |
| signAddress | string | signature account address | yes |
| signPassword | string | signature account password | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------------------------------------- |
| tx | string | Complete transaction serialization string, continue signature if the transaction does not reach the minimum number of signatures |
| txHash | string | trading hash |
| completed | boolean | true: transaction is complete (broadcast), false: transaction not complete, minimum signature count not attained |

### ac\_createMultiSignAccount
Create a multi-sign account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:---------------:| ------------------------------- |:----:|
| chainId | int | chain id | yes |
| pubKeys | list&lt;string> | public key collection (public key of any common address or common account address present in the current node) | yes |
minSigns | int | Minimum Signature | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ------- |:------:| ------ |
| address | string | multi-sign account address|

### ac\_removeMultiSignAccount
Remove a multi-sign account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| address | string | multi-sign account address | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------ |
| value | boolean | removal success or not|

### ac\_setMultiSignAlias
Set the alias of a multi-signature account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:------:| ---------------------- |:----:|
| chainId | int | chain id | yes |
| address | string | multi-sign account address | yes |
| alias | string | alias | yes |
| signAddress | string | first signature account address (without filling, only create unsigned transactions) | no |
| signPassword | string | first signature account password (without filling, only create unsigned transactions) | no |

#### return values:
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------------------------------------- |
| tx | string | complete transaction serialization string, continue signature if transaction does not reach minimum signature count |
| txHash | string | trading hash |
| completed | boolean | true: transaction is complete (broadcast), false: transaction not complete, minimum signature count not reached |

### ac\_getMultiSignAccount
Get a full multi-signature account by searching for a multi-signature account.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| address | string | multi-sign account address | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ----- |:------:| ------------ |
| value | string | multi-sign account serialization data string |

### ac\_isMultiSignAccountBuilder
Verify that one of the creators of the multi-signed account is an account builder.
#### scope: public
#### version: 1.0

#### parameter list:
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ----------------- |:----:|
| chainId | int | chain id | yes |
| address | string | multi-sign account address | yes |
| pubKey | string | creator public key or address already present at the current node | yes |

#### return values:
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------------ |
| value | boolean | whether to sign one of the account creators |

