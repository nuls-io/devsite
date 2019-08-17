	
# SDK
 
## Introduction
This document is the user guide for the NULS Java SDK. It describes the usage instructions of the basic functional interfaces such as accounts, transactions, and blocks provided by the NULS service. 
### Convention
- All SDK interfaces uniformly return Result (referring to the data explanation in the appendix part at the end of the article)
- The return object described in each interface refers to the content of the data attribute in the Result
- Unless otherwise noted, NULS in this document is in Na unit, 1NULS = 100,000,000 Na
- Before running the SDK, you need to confirm that the NULS service is started and running normally
- JDK1.8+ is recommended
### Releases History


|   Version    | Release Date |    Release Notes                           |
| :-------: | :--------: | :----------------------------------------------------------: |
| v0.9.11.0 | 2018-06-19 | Provide interfaces for docking basic functions of the NULS service                |
| v0.9.11.1 | 2018-06-22 |    Add interfaces to get the latest block height and hash (3.6, 3.7), and modify 2.1 |
|  v0.9.14  | 2018-07-04 | Modify the initialization method of the SDK to init in Quick Start and the usage of SDK, and alter the name of the returned encapsulated object (removing Dto, etc.) |
|  v0.9.15  | 2018-07-07 |       Add four consensus interfaces (4.1-4.4)|
|  v0.9.16  | 2018-07-11 |           Add interface 4.5                            |
|  v1.0.1   | 2018-07-13 |               Add error code                             |
|  v1.1.0   | 2018-09-28 |  Add multi-account transfer interface                        |



## Quick Start
### 1. Importing files
Import jar files by using build tool  

- Use maven 

```xml
<dependency>
   <groupId>io.nuls.sdk</groupId>
   <artifactId>sdk-all</artifactId>
   <version>1.0.1</version>
</dependency>
```

### 2. Creating SDK instance
First introduce SDK namespace

```java
// introduce the namespace of the SDK boot class 
import io.nuls.sdk.SDKBootstrap;
import io.nuls.sdk.model.Result;
// introduce the namespace of the SDK calls tool   
import io.nuls.sdk.tool.NulsSDKTool;
```

After importing, create a client instance using the following code   

- Initiate SDK
- If no parameters are passed in initialization method, the default PRC IP and Port respectively are ` 127.0.0.1 `, 8001 ` `
```java
//By default 
SDKBootstrap.init();
// Pass in the NULS service’s IP and Port
SDKBootstrap.init("192.168.1.88", "8001");
```

- Call interface methods using the tool class 


```java
Result result = NulsSDKTool.createAccount("nuls123456");
```
 *e.g a complete example of creating an account with password*

```java
import io.nuls.sdk.SDKBootstrap;
import io.nuls.sdk.model.Result;
// introduce the namespace for corresponding modules as required 
import io.nuls.sdk.tool.NulsSDKTool;

public static void main(String[] args) {
	SDKBootstrap.init();
	Result result = NulsSDKTool.createAccount("nuls123456");
}
```
--
### Accounts AccountService
#### 1.1 Creating account
Interface 

**`Result createAccount(int count, String password);`**

Instructions 
> Creates one or more accounts with or without a password depending on the parameters passed in.
>The information about the successfully created account will be persisted to the NULS service local database.
>
> Returns a set of successfully created account addresses
<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center"> required or not </th>
        <th align="center"> note</th>
    </tr>
    <tr>
        <td align="center">count</td>
        <td align="center">int</td>
        <td align="center">optional</td>
        <td align="center"> account count to be created (default 1)</td>
    </tr>
     <tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center"> optional </td>
        <td align="center"> set the password of the account with length between 8 and 20, must containing both letters and digitals, the space not allowed</td>
    </tr>
</table>   

Return

- Return ` Result ` object in the following format:
```json
{
    "success": true,
    "data":{
	    "list": [ // Return a set of the created account addresses
	        "2Cbkwxu34iCjsiHKBjqZDNjoVbLMcJv",
	        "2Cbkwxu34iCjsiHKBjqZDNjoVbLMcJv"
	    ]
    }
}
```


*e.g Sample Code*

```java
//create an account without password
createAccount();
//create an account with password
createAccount("nuls123456");
// create three password-less accounts 
createAccount(3);
// create three accounts with passwords 
createAccount(3, "nuls123456");
```
---

#### 1.2 Creating offline account 
Interface

**`Result createOfflineAccount(int count, String password)`**

Instructions

> Directly create an offline account and return it completely, without underlying interaction with NULS and persistence
> Creates an encrypted off-line account (Not saved to the database)
>
> Result.data <a href="#AccountInfo">`List<AccountInfo>`</a> 

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center"> required or not</th>
        <th align="center"> note</th>
    </tr>
    <tr>
        <td align="center">count</td>
        <td align="center">int</td>
        <td align="center">optional</td>
        <td align="center"> account count to be created (default 1)</td>
    </tr>
     <tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center"> optional </td>
        <td align="center"> set the password of the account with length between 8 and 20, must containing both letters and digitals, the space not allowed </td>
    </tr>
</table>   

Return

- Return ` Result ` object in the following format:

```json
{
	"success": true,
	"data": {
		"list":[
			{
				"address": String, account address
				"alias": String, account alias
				"pubKey": String, public key
				"extend": String, extension
				"createTime": Long, create time
				"encrypted": boolean, encrypted or not
				"priKey": String, private key（not null only if a password-less offline account is created）
				"encryptedPriKey": String, encrypted private key（not null only if an offline account with password is created）
			},
			{
				"address": "2CiBQg72BCLmLqttRpPfp8ECRCBwbdD",
				"alias": null,
				"pubKey": "020159dc5cc74463f346b71c08dd934a823e9e6fe727d8d3c577e7d462e1a364bb",
				"extend": null,
				"createTime": 1529314943624,
				"encrypted": true,
				"priKey": "",
				"encryptedPriKey": "5664f746654fb111e967bb3922910b16340f1e60ff1b281c7a333179d7b82d6220bb12d1c058d9cd06099d4f443a4cb0"
			}
		]
	}
}
```

*e.g Sample Code*

```java
// create an offline account without password
createOfflineAccount();
// create an offline account with password
createOfflineAccount("nuls123456");
// create three password-less offline accounts
createOfflineAccount(3);
// create three offline accounts with passwords
createOfflineAccount(3, "nuls123456");
```

---

#### 1.3 Getting account

Interface

**`Result getAccount(String address)`**  

Instructions

> Gets information about the account by account address
>
> Result.data <a href="#AccountInfo">`AccountInfo`</a>

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{
	"success": true,
	"data": {
				"address": String, account address
				"alias": String, account alias
				"pubKey": String, public key
				"extend": String, extension
				"createTime": Long, create time
				"encrypted": boolean, encrypted or not
				"priKey": String, private key（not null only if when a password-less offline account is created）
				"encryptedPriKey": String, encrypted private key（not null only if an offline account with password is created）
	}
}
```

*e.g Sample Code*

```java
getAccount("2ChqBTvFXttQsghj8zQpcdv76TQU8G5");
```
---

#### 1.4 Getting the fee for setting alias 
Interface

**`Result getAliasFee(String address, String alias)`**  

Instructions

> Gets the fee required to set the alias name based on the account address and the alias name to be set (excluding the fixed cost 1NULS of setting the alias name)>
> Result.data `double`, unit is `NULS`

**Note!** The unit of the fee returned by this interface is `NULS`

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
    </tr>
    <tr>
        <td align="center">alias</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center"> alias name to be set</td>
    </tr></table>

Return  

-  Return ` Result ` object in the following format:

```json
{
	"success": true,
	"data":{
		"value": 0.01 //( unit: NULS)
	} 
}
```

*e.g Sample Code*

```java
getAliasFee("2ChqBTvFXttQsghj8zQpcdv76TQU8G5","factory666");
```
---

#### 1.5 Getting account list

Interface

**`Result getAccountList(int pageNumber, int pageSize)`**

Instructions

> Gets a list of accounts based on the paging parameters
>
> Result.data Page <a href="#AccountInfo">`List<AccountInfo>`</a>

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
        <td align="center">pageNumber</td>
        <td align="center">int</td>
        <td align="center">required</td>
        <td align="center">page number, must be greater than 0 </td>
    </tr>
    <tr>
        <td align="center">pageSize</td>
        <td align="center">int</td>
        <td align="center"> required </td>
        <td align="center"> record size displayed per page, ranging from 1 to 100</td>
</tr>
</table>

Return  

- Return ` Result ` object in the following format:

```json
{
	"success": true,
	"data": {
		"pageNumber": 1,
    	"pageSize": 10,
    	"total": 100,
     	"pages": 10,
		"list": [
			{
				
				"address": String, account address
				"alias": String, account alias
				"pubKey": String, public key
				"extend": String, extension
				"createTime": Long, create time
				"encrypted": boolean, encrypted or not
				"priKey": String, private key（not null only if a password-less offline account is created）
				"encryptedPriKey": String, encrypted private key（not null only if an offline account with password is created）			},
			{
				"address": "2Cid96JrTGA2XaNG6zXrRKh18kLUbLP",
				"alias": null,
				"pubKey": "033da2433ef4ca111bfeefaadd9fe0f5874f3aac5186109f9de10a9eed6f48f184",
				"extend": null,
				"createTime": 1529311250627,
				"encrypted": true,
				"priKey": null,
				"encryptedPriKey": null
			}
			...
			
		]
	}
}
```

*e.g Sample Code*

```java
getAccountList(1, 10);
```
---

#### 1.6 Getting account address by account alias 

Interface

**`Result getAddressByAlias(String alias)`**

Instructions
> Gets the account address by the account alias
>
> Result.data `String`  

<table>
   <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
        <td align="center">alias</td>
        <td align="center">String</td>
        <td align="center"> required </td>
        <td align="center">account alias</td>
    </tr>
    </table>

Return  

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
    	"value": "2ChDcC1nvki521xXhYAUzYXt4RLNULS"
    }
}
```
*e.g Sample Code*

```java
 getAddressByAlias("factory666");
```
---

#### 1.7 Getting account private key 
Interface

**`Result getPrikey(String address, String password)`**

Instructions
> Gets the private key of the account by account address and password, and returns the private key string
>
> Result.data `String`

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
    </tr>
    <tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center">optional</td>
        <td align="center"> account password, leave it blank if the account is not encrypted</td>
    </tr>
    </table>

Return  

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
		"value":"1f9d3ad044e0e1201e117b041f3d2ceedacb44688e57969620f3ad7a4d6e9d24"
    }
}
```
*e.g Sample Code* 

```java
// the way of calling the account with password
getPrikey("2ChqBTvFXttQsghj8zQpcdv76TQU8G5", "nuls123456");
//the way of calling the password-less account
getPrikey("2ChqBTvFXttQsghj8zQpcdv76TQU8G5");
```
---

#### 1.8 Verifying the availability of alias
Interface

**`Result isAliasUsable(String alias)`**

Instructions
> Verifies that the alias is available (if it is not used) by alias name 
>
> Result

<table>
   <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">alias name</td>
    </tr>   
    </table>

Return  

- Return ` Result ` object in the following format:

```json
{	// indicate the alias is available
    "success": true,
    "data": {
		"value":true
    }
}
```
- Return the case where the alias is unavailable

```json
{	// indicate the alias is not available
    "success": true,
     "data"：{
        "value": false
     }
}
```
- Return error cases, such as a parameter error
```json
{	// indicate an error 
    "success": false,
     "data"：{
        "code": "ACT005",
        "msg": "xxxxxx...."
     }
}
```
*e.g Sample Code* 

```java 
isAliasUsable("factory666");
```
---

#### 1.9 Account Backup
Interface

**`Result backupAccount(String address, String path, String password)`**   

Instructions

> Backups the account (exporting .Keystore file) based on the account address, password and output address.  If the account is encrypted, the exported keystore file is encrypted by the current password. The password of the account needs to be verified when importing.
>
> Result: the generated file address

<table>
   <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
</tr>
<tr>
        <td align="center">path</td>
        <td align="center">String</td>
        <td align="center"> required </td>
        <td align="center"> the folder where the backup file will be stored. When null is passed in, it will be backed up to the current directory of the NULS service. </td>
    </tr>
     <tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center">optional</td>
        <td align="center"> account password, leave it blank if the account is not encrypted</td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
	    "value": "/Users/lichao/Downloads/2ChDcC1nvki521xXhYAUzYXt4RLNULS.accountkeystore"
    }
}
```
*e.g Sample Code*

```java
// Backup an password-less account to the current directory
backupAccount("2ChqBTvFXttQsghj8zQpcdv76TQU8G5", null);
// Backup an account with password to the /backup directory
backupAccount("2ChqBTvFXttQsghj8zQpcdv76TQU8G5", "/backup", "nuls123456");
```
---

#### 1.10 Importing account 
Interface

**`Result importAccountByKeystore`**  

Instrucions

> Imports the account using the keystore file. If the keystore file is generated by an encrypted account backup, the password of the account at the time of backup needs to be verified.
>
> Result 

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
        <td align="center">path/fileReader</td>
        <td align="center">String/FileReader</td>
        <td align="center">required</td>
        <td align="center"> the url of the .keystore file to be imported, or the FileReader object generated by the .keystore file </td>
    </tr>
    <tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center">optional</td>
        <td align="center">the password of the account corresponding to the .keystore file, leave it blank if the account is not encrypted when the .keystore is exported</td>
    </tr>
     <tr>
        <td align="center">overwrite</td>
        <td align="center">boolean</td>
        <td align="center">required</td>
        <td align="center"> true: perform overwrite import; false: if the account already exists in the wallet, the import will not be performed and an error prompt will be returned.</td>
    </tr>
    </table>

Return  

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
    	"value":"2ChDcC1nvki521xXhYAUzYXt4RLNULS"
    }
}
```
*e.g Sample Code*

```java
//import an account with password
importAccountByKeystore("/backup/XXXXXX.keystore", "nuls123456", true);
importAccountByKeystore(fileReader, "nuls123456", true);
//import a password-less account
importAccountByKeystore("/backup/XXXXXX.keystore", false);
importAccountByKeystore(fileReader, false);
```
---

#### 1.11 Importing account (private key)
Interface

**`Result importAccountByPriKey(String privateKey, String password, boolean overwrite)`**  

Instructions

> Imports an account by private key
>
> Result

<table>
    <tr>
       <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
        <td align="center">privateKey</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center"> private key of the account</td>
    </tr>
    <tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center">optional</td>
        <td align="center"> set the password of the account with length between 8 and 20, must containing both letters and digitals, the space not allowed</td>
    </tr>
     <tr>
        <td align="center">overwrite</td>
        <td align="center">boolean</td>
        <td align="center"> required </td>
        <td align="center"> true: perform overwrite import; false: if the account already exists in the wallet, the import will not be performed and an error prompt will be returned.</td>
    </tr>
    </table>

Return  

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
    	"value":"2CiU1CmB6c9jmSLDNBe6PouA7NgNULS"
    }
}
```
*e.g Sample Code*

```java
// set a password when importing account
importAccountByPriKey("1f9d3ad044e0e120......", "nuls123456", true);
// no password is set when importing account
importAccountByPriKey("1f9d3ad044e0e120......", true);
```
---

#### 1.12 Verifying account is encrypted  
Interface

**`Result isEncrypted(String address)`**

Instructions

> Verifies the account is encrypted 
>
> Result

<table>
       <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
</tr>
</table>

Return  

- Return ` Result ` object in the following format:

```json
{	// indicate encrypted
    "success": true,
    "data": {
		"value":true
    }
}
```
- Return unencrypted
```json
{
    "success": true,
     "data"：{
        "value": false
     }
}
```
- Return error cases, such as a parameter error

```json
{	//indicate an error
    "success": false,
     "data"：{
        "code": "ACT005",
        "msg": "xxxxxx...."
     }
}
```

*e.g Sample Code*

```java
isEncrypted("2ChqBTvFXttQsghj8zQpcdv76TQU8G5");
```
---

#### 1.13 Removing account 
Interface

**`Result removeAccount(String address, String password)`**

Instructions

> Removes an account
>
> Result

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
</tr>
<tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center">optional</td>
        <td align="center"> account password, leave it blank if the account is not encrypted</td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{	//indicate a success
    "success": true,
    "data": {
		"value":true
    }
}
```

- Return failure and error cases, such as a parameter error
```json
{	// indicate an error
    "success": false,
     "data"：{
        "code": "ACT005",
        "msg": "xxxxxx...."
     }
}
```
*e.g Sample Code*

```java
removeAccount("2ChqBTvFXttQsghj8zQpcdv76TQU8G5");
removeAccount("2ChqBTvFXttQsghj8zQpcdv76TQU8G5", "nuls123456");
```
---

#### 1.13 Setting password
Interface

**`Result setPassword(String address, String password）`**

Instructions

> Sets a password for an unencrypted account. Encrypted account cannot call this interface.
>
> Result

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
</tr>
<tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center"> set the password of the account with length between 8 and 20, must containing both letters and digitals, the space not allowed </td>
    </tr>
    </table>

Return  

- Return ` Result ` object in the following format:

```json
{	//indicate a success
    "success": true,
    "data": {
		"value":true
    }
}
```

- Return failure and error cases, such as a parameter error

```json
{	// indicate an error
    "success": false,
     "data"：{
        "code": "ACT005",
        "msg": "xxxxxx...."
     }
}
```
*e.g Sample Code*

```java
setPassword("2ChqBTvFXttQsghj8zQpcdv76TQU8G5", "nuls123456");
```
---

#### 1.14 Modifying password   
Interface

**`Result resetPassword(String address, String password, String newPassword)`**

Instructions

> Modifys the password for an encrypted account. Unencrypted account cannot call this interface.
>
> Result

<table>
   <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
</tr>
<tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center"> the current password of the account</td>
    </tr>
     <tr>
        <td align="center">newPassword</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center"> set new password of the account with length between 8 and 20, must containing both letters and digitals, the space not allowed.</td>
    </tr>
    </table>

Return  

- Return ` Result ` object in the following format:

```json
{	//indicate a success
    "success": true,
    "data": {
		"value":true
    }
}
```

- Return failure and error cases, such as a parameter error
```json
{	// indicate an error
    "success": false,
     "data"：{
        "code": "ACT005",
        "msg": "xxxxxx...."
     }
}
```
*e.g Sample Code*

```java
resetPassword("2ChqBTvFXttQsghj8zQpcdv76TQU8G5", "nuls123456", "NULS111111");
```
---

#### 1.15 Setting alias 
Interface

**`Result setAlias(String address, String alias, String password)`**

Instructions

> Sets alias name for an account
>
> Result: the hash of the transaction for setting the alias
<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
</tr>
<tr>
        <td align="center">alias</td>
        <td align="center">String</td>
        <td align="center"> required </td>
        <td align="center">alias name to be set </td>
    </tr>
        <tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center"> password </td>
        <td align="center"> account password, leave it blank if the account is not encrypted </td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data":{		
		"value":"0020d7a69747778f6f02e2b0171640bc98aa19c53700988b7765c195ae691f3202c6"
	}
}
```
-  Example for error

```json
{
    "success": false,
     "data"：{
        "code": "ACT007",
        "msg": "The account already set an alias"
     }
}
```
*e.g Sample code*

```java
setAlias("2ChqBTvFXttQsghj8zQpcdv76TQU8G5", "factory666", "NULS111111");
setAlias("2ChqBTvFXttQsghj8zQpcdv76TQU8G5", "factory666");
```
---

#### 1.16 Setting offline-account password 
Interface

**`Result setPasswordOffline(String address, String priKey, String password)`**

Instructions

> Sets the password of the offline account, independently encrypted in SDK, without interaction with NULS service
>
> Result: the encrypted private key（encryptedPriKey）

<table>
   <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
</tr>
<tr>
        <td align="center">priKey</td>
        <td align="center">String</td>
        <td align="center"> required </td>
        <td align="center">account’s private key</td>
    </tr>
        <tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center"> set new password of the account with length between 8 and 20, must containing both letters and digitals, the space not allowed </td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
    	"value":"a770c1886f566c973b6eb99543ef03825a89ed16e20d8dbe320aed64a85d5863ca23df43ef16ce0475424a49e192b6f9"
    }
}
```
*e.g Sample Code*

```java
setPasswordOffline("2CacFwqMwcJiGNNBwiwV7bCL7bjwNBr","00e4bfd347351ea899b5f0ae2c0a3e7a6951b202eaf72432d1a63a2dc85c59c82a","nuls123456");
```
---

#### 1.17 Modifying offline-account password 
Interface

**`Result resetPasswordOffline(String address, String encryptedPriKey, String password, String newPassword)`**

Instructions

> Modifies the password of the offline account independently in SDK, without interaction with NULS service
>
> Result: the encrypted private key generated by the new password (encryptedPriKey）


<table>
   <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
</tr>
     <tr>
        <td align="center">encryptedPriKey</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">encrypted private key</td>
    </tr>
        <tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center"> required </td>
        <td align="center">original password </td>
    </tr>
     <tr>
        <td align="center">newPassword</td>
        <td align="center">String</td>
        <td align="center"> required </td>
        <td align="center">set new password of the account with length between 8 and 20, must containing both letters and digitals, the space not allowed </td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
    	"value":"a770c1886f566c973b6eb99543ef03825a89ed16e20d8dbe320aed64a85d5863ca23df43ef16ce0475424a49e192b6f9"
    }
}
```
*e.g Sample Code*

```java
resetPasswordOffline("2CacFwqMwcJiGNNBwiwV7bCL7bjwNBr","25368dbc0ff7eea4fc6da22bc37e85d7976a3846f8b58d4dc0cf484e740ba1b61f96395fbe1ddf70ece9fd21fcd95e7a","NULS111111", "nuls123456");
```
---

### Transactions AccountLedgerService  

#### 2.1 Creating transfer transaction
Interface

**`Result createTransaction(List<Input> inputs, List<Output> outputs, String remark)`**

Instructions

> Assembles the transaction by the input/output of the transaction passed in by the user. The parameters passed in are json objects, as shown in the e.g. section. **The input and output attributes in the example are mandatory. ** The fee is the difference between the total amount of inputs and outputs. There will be a minimum value for the fee based on the transaction size. When its fee is lower than the minimum value, the transaction will not be packaged. **The calculation of the fee will be explained in detail later**
>
> Result.data `String`: serialized transaction string in hexadecimal
<table>
  <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
  <tr>
  <td align="center">inputs</td>
  <td align="center">List&lt;Input&gt;</td>
  <td align="center">required</td>
  <td align="center"> usable output referred by the transaction </td>
  </tr>
   <tr>
  <td align="center">outputs</td>
  <td align="center">List&lt;Output&gt;</td>
  <td align="center"> required </td>
  <td align="center"> usable output newly generated by the transaction </td>
  </tr>
  <tr>
  <td align="center">remark</td>
  <td align="center">String</td>
  <td align="center">optional</td>
  <td align="center">transaction remarks</td>
  </tr>
</table>

*e.g Sample Code*

```java
String remark = "create transaction demo";
long fee = 100000;
List<Input> inputs = new ArrayList<>();
List<Output> outputs = new ArrayList<>();

// the inputs for assembly transaction, the attribute of the input in the example is mandatory.
Input input = new Input();
input.setFromHash("002023c66d10cf9047dbcca12aee3db3c921a2ec22e0dd63331cb85"); 
input.setFromIndex(1);
input.setAddress("2ejPVMKST7h4Qsd5Dqa8Q9Psr47mj5")
input.setValue(1000000000L);      
input.setLockTime(0);
inputs.add(input);

// the outputs for assembly transaction, the attribute of the output in the example is mandatory.
Output output = new Output();
output.setAddress("2CjPVMKST7h4Q5Dqa8Q9P9CwYSmN7mG");
output.setValue(1000000L);
output.setLockTime(0L);
outputs.add(output);

output = new Output();
output.setAddress("2CXJEuoXZMajeTEgL6TgiSxTRRMwiMM");
output.setValue(1000000000L - 1000000 - fee);
output.setLockTime(0L);
outputs.add(output);

Result result = NulsSDKTool.createTransaction(inputs, outputs, remark);
```
---


> ** Calculation of transaction fee **: unit price of the fee\* transaction size
>
> ** unit price of the fee (min)**：100000 NA/1KB
>
> **Calculation of transaction size**：（124 + 50  * inputs.length + 38 * outputs.length + remark.bytes.length ）/1024 
> 124 is the fixed length of the basic information, 50 is the length of a single input, 38 is the length of a single output, and remark is an optional field, whose byte length is calculated according to the UTF-8 character encoding when needed. The transaction size is in KB, and its maximum value is 300 KB. The part less than 1 KB is calculated as 1 KB.
> When the block-forging node verifies each transaction, the difference between the input and the output is regarded as the fee paid by the user when the transaction is sent, and the minimum value of the fee is calculated based on the transaction size. If the user's fee is less than the minimum value, it will be regarded as an invalid transaction and will not be packaged. Therefore, when creating a transaction, you should calculate the fee with care to avoid transaction failure.


#### 2.2 Transaction Signatures 

Interface

**`Result signTransaction(String txHex, String priKey, String address, String password)`**

Instructions

> Signs the transaction by private key
>
> Result.data `String`: the signed transaction, serialized string in hexadecimal

<table>
  <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
  <td align="center">txHex</td>
  <td align="center">String</td>
  <td align="center">required</td>
  <td align="center">serialized transaction data in hexadecimal </td>
  </tr>
   <tr>
  <td align="center">priKey</td>
  <td align="center">String</td>
  <td align="center">required</td>
  <td align="center">private key of the transaction </td>
  </tr>
   <tr>
  <td align="center">address</td>
  <td align="center">String</td>
  <td align="center">required</td>
  <td align="center"> the address corresponding to the private key, used to verify the validity of the private key. </td>
  </tr>
   <tr>
  <td align="center">password</td>
  <td align="center">String</td>
  <td align="center">optional</td>
  <td align="center"> the password of the private key, leave it blank if the private key is not encrypted </td>
  </tr>
  </table>

*e.g Sample Code*

```java
String txHex ="020197320f96301001a78cb7fb8bb7b1710b4afa390d8341080fba7a47e8d030000000000000000";
String priKey ="252f6d9d55b7ef539ea58df99ebaf71c9929bd9d0054338baf7a59c9b85b4fa631f816907c8";
String address = "2CXJEuoXZMajeTEgL6TgiSxTRRMwiMM";
String password = "NULS6352s!f";
Result result = NulsSDKTool.signTransaction(txHex, priKey, address, password);
```

> 

---

#### 2.3 Querying transaction details by transaction hash
Interface

**`Result getTxByHash(String hash)`**

Instructions

> Queries transaction details by transaction hash
>
> Result.data: <a href="#Transaction">`Transaction`</a>

<table>
   <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
        <td align="center">hash</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">transaction hash </td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
        "hash": "00203a169b42e5e142e20b273ac925e55f773b5a38c5f5c907efdbc43abb7d7a67b2",
        "type": 2,
        "time": 1529323198461,
        "blockHeight": 1884,
        "fee": 100000,
        "value": 99900000000,
        "remark": "transfer",
        "scriptSig": "21036dd27c9fa786a1e83df204e9b31ddc24745c378f1f6b42731d07f05347167c0000473045022100ff3372711d78eb554be331aa40cd7af246641ecd3bc06f2fdca7faefb25f74e50220743a2f2d9d01b5a77a878349b996cbe4953af5d1a946519a5ce4d1129cf99848",
        "status": 1,
        "confirmCount": 14,
        "size": 255,
        "inputs": [
            {
                "fromHash": "0020ab020707282932e6ec701f0b64e22e937fdd03ce9b37aab498aed2e00b6fa8e7",
                "fromIndex": 0,
                "address": "2ChDcC1nvki521xXhYAUzYXt4RLNULS",
                "value": 9999899000000
            }
        ],
        "outputs": [
            {
                "txHash": "00203a169b42e5e142e20b273ac925e55f773b5a38c5f5c907efdbc43abb7d7a67b2",
                "index": 0,
                "address": "2CiVA3n1VoNQobAax4d7qNEBZAfehLN",
                "value": 99900000000,
                "lockTime": 0,
                "status": 0
            },
            {
                "txHash": "00203a169b42e5e142e20b273ac925e55f773b5a38c5f5c907efdbc43abb7d7a67b2",
                "index": 1,
                "address": "2ChDcC1nvki521xXhYAUzYXt4RLNULS",
                "value": 9899998900000,
                "lockTime": 0,
                "status": 0
            }
        ]
    }
}
```
*e.g Sample Code*

```java
getTxByHash("041f3d2ceed........");
```
---

#### 2.4 Transfers
Interface

**`Result transfer(String address, String toAddress, String password, long amount, String remark)`**

Instructions

> Initiates a transfer transaction
>
> Result: the transaction hash

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center"> address of the transferor account </td>
    </tr>
     <tr>
        <td align="center">toAddress</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center"> address of the transferee account </td>
    </tr>
     <tr>
        <td align="center">password</td>
        <td align="center">String</td>
        <td align="center">optional</td>
        <td align="center"> password of the transferor account, leave it blank if the account is not encrypted. </td>
    </tr>
     <tr>
        <td align="center">amount</td>
        <td align="center">long</td>
        <td align="center">required</td>
        <td align="center">transfer amount (unit: Na)</td>
    </tr>
     <tr>
        <td align="center">remark</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">remarks</td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
    	"value":"00203a169b42e5e142e20b273ac925e55f773b5a38c5f5c907efdbc43abb7d7a67b2"
    }
}
```
*e.g Sample Code*

```java
	//account with password
transfer("2ChDcC1nvki521xXhYAUzYXt4RLNULS", "2CiU1CmB6c9jmSLDNBe6PouA7NgXXXX", "nuls123456", 8888800000000, "remarks 1NULS=10000000Na");
//account without password
transfer("2ChDcC1nvki521xXhYAUzYXt4RLNULS", "2CiU1CmB6c9jmSLDNBe6PouA7NgNULS", 8888800000000, " remarks 1NULS=10000000Na");
```
---

#### 2.5 Querying account balance
Interface

**`Result getBalance(String address)`**

Instructions

> Gets the account balance
>
> Result.data <a href="#BalanceInfo">`BalanceInfo `</a>

<table>
     <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">address</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">account address</td>
</tr>
</table>

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
        "balance": 1009899998900000,
        "usable": 1009899998900000,
        "locked": 0
    }
}
```
*e.g Sample Code*

```java
getBalance("2ChDcC1nvki521xXhYAUzYXt4RLNULS");
```
---

#### 2.6 Broadcasting transaction
Interface

**`Result broadcastTransaction(String txHex);`**

Instruction

> Broadcasts a transaction
>
> Result.data String: transaction hash

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
        <td align="center">txHex</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">serialized transaction data in hexadecimal </td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
    	"value": "002023c66d10cf9047dbcca12aee2235ff9dfe0f13db3c921a2ec22e0dd63331cb85"
    }
}

```
*e.g Sample Code*

```java
String txHex = "1f9d3ad044e0e1201e117b041f3d2ceedacb44688e57969620f3ad7a4d6e9d241f9d3ad044e0e1201e117b041f3d2ceedacb44688e57969620f3ad7a4d6e9d24";
Result result = service.broadcastTransaction(txHex);
if(result.isSuccess()) {
   String txHash = (String)result.getData();
}
```
---

#### 2.7 Creating multi-address transfer transaction

Interface

**`Result createMultipleInputAddressTransaction(List<Input> inputs, List<Output> outputs, String remark)`**

Instructions

> Assembles the transaction by the input/output of the transaction passed in by the user. The parameters passed in are json objects, as shown in the e.g. section. **The input and output attributes in the example are mandatory. ** The fee is the difference between the total amount of inputs and outputs. There will be a minimum value for the fee based on the transaction size. When its fee is lower than the minimum value, the transaction will not be packaged. **The calculation of the fee will be explained in detail later**
>
> Result.data `String`: serialized transaction string in hexadecimal

<table>
  <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
  <td align="center">inputs</td>
  <td align="center">List&lt;Input&gt;</td>
  <td align="center">required</td>
  <td align="center"> usable output referred by the transaction</td>
  </tr>
   <tr>
  <td align="center">outputs</td>
  <td align="center">List&lt;Output&gt;</td>
  <td align="center"> required </td>
  <td align="center"> usable output newly generated by the transaction </td>
  </tr>
<tr>
  <td align="center">nInputAccount</td>
  <td align="center">int</td>
  <td align="center">required</td>
  <td align="center">input account number</td>
  </tr>
  <tr>
  <td align="center">remark</td>
  <td align="center">String</td>
  <td align="center">optional</td>
  <td align="center">transaction remarks</td>
  </tr> 
</table>

*e.g Sample Code*

```java
String remark = "create transaction demo";
long fee = 100000;
List<Input> inputs = new ArrayList<>();
List<Output> outputs = new ArrayList<>();
int nInputAccount = 2;

//the inputs for assembly transaction, the attribute of the input in the example is mandatory.
Input input = new Input();
input.setFromHash("002023c66d10cf9047dbcca12aee3db3c921a2ec22e0dd63331cb85"); 
input.setFromIndex(1);
input.setAddress("2ejPVMKST7h4Qsd5Dqa8Q9Psr47mj5")
input.setValue(1000000000L);      
input.setLockTime(0);
inputs.add(input);

//the outputs for assembly transaction, the attribute of the output in the example is mandatory.
 Output output = new Output();
output.setAddress("2CjPVMKST7h4Q5Dqa8Q9P9CwYSmN7mG");
output.setValue(1000000L);
output.setLockTime(0L);
outputs.add(output);

output = new Output();
output.setAddress("2CXJEuoXZMajeTEgL6TgiSxTRRMwiMM");
output.setValue(1000000000L - 1000000 - fee);
output.setLockTime(0L);
outputs.add(output);

Result result = NulsSDKTool.createMultipleInputAddressTransaction(inputs,nInputAccount, outputs, remark);
```

------

> ** Calculation of transaction fee **: unit price of the fee\* transaction size
>
> ** unit price of the fee (min)**：100000 NA/1KB
>
> **Calculation of transaction size**：（124*nInputAccount + 50  * inputs.length + 38 * outputs.length + remark.bytes.length ）/1024
> 124 is the fixed length of the basic information, 50 is the length of a single input, 38 is the length of a single output, and remark is an optional field, whose byte length is calculated according to the UTF-8 character encoding when needed. The transaction size is in KB, and its maximum value is 300 KB. The part less than 1 KB is calculated as 1 KB.
> When the block-forging node verifies each transaction, the difference between the input and the output is regarded as the fee paid by the user when the transaction is sent, and the minimum value of the fee is calculated based on the transaction size. If the user's fee is less than the minimum value, it will be regarded as an invalid transaction and will not be packaged. Therefore, when creating a transaction, you should calculate the fee with care to avoid transaction failure.

#### 2.8 Signing multi-address transfer transaction 

Interface

**`Result signMultipleAddressTransaction(String txHex, List<String> privKeys, List<String> passwords)`**

Instructions

> Signs a transaction by private key
>
> Result.data `String`: signed transaction, serialized string in hexadecimal

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
  <tr>
  <td align="center">txHex</td>
  <td align="center">String</td>
  <td align="center">required</td>
  <td align="center">serialized transaction data in hexadecimal </td>
  </tr>
   <tr>
  <td align="center">privKeys</td>
  <td align="center">List<String></String></td>
  <td align="center">required</td>
  <td align="center"> private key of the transaction</td>
  </tr>
   <tr>
  <td align="center">passwords</td>
  <td align="center">List<String></String></td>
  <td align="center">required</td>
  <td align="center"> password corresponding to the private key (passwords for multiple accounts must be the same)
</td>
  </tr>
  </table>

*e.g Sample Code*

```java
String txHex ="020197320f96301001a78cb7fb8bb7b1710b4afa390d8341080fba7a47e8d030000000000000000";
List<String> priKeys = Arrays.asList("08a605b754bd1be1ba765fabd5cd218a545eb38b54ad26a7eb8a3378f724e5be", "00a710f9679fb6b5953bcfbea67a198e9c0d8888c43bad78a7241258e36aeaf65d");
List<String> passwords = Arrays.asList("123456","123456");
Result result = NulsSDKTool.signMultiTransaction(txHex, priKeys, passwords);
```

>

### Blocks BlockService

#### 3.1 Getting block header by block height
Interface

**`Result getblockHeader(int height)`**

Instructions

> Gets a block header by block height 
>
> Result.data <a href="#BlockHeader">`BlockHeader `</a>

<table>
     <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
    </tr>
    <tr>
        <td align="center">height</td>
        <td align="center">int</td>
        <td align="center">required</td>
        <td align="center">block height</td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
        "hash": "002078656b6e32f4f1e9e881e7b6c4c5de036ae81ec5bf78861bde9480f5ff3a1b33",
        "preHash": "0020ee5d28fde669adb0ad16f3ed426f1ee8df40560bed0ab30bb99cbf95df276d64",
        "merkleHash": "0020cc37658e2d110c1d42f64c7fd3dcb56d9653d4edc4d3a8406cb263a41f9f5488",
        "time": 1529299160000,
        "height": 4,
        "txCount": 4,
        "packingAddress": "2CWsZb9w8XXTE58TUhBGczxf4U6NULS",
        "scriptSig": "2102e18d02154e0f68900898efea7ba72d6d14e37d7d173a62146df2871f40996d7300473045022100d4d92a9518ffd855441c7712f4b31bd003291dc108fa2b455fe26d51e54625f102202ae8375bd69bf1928f9967edac82619ff78f30550c17797cc489d5effd3202bf",
        "roundIndex": 419517,
        "consensusMemberCount": 1,
        "roundStartTime": 1529299150000,
        "packingIndexOfRound": 1,
        "confirmCount": 1909,
        "reward": 0,
        "fee": 0,
        "size": 1
    }
}
```
*e.g Sample Code*

```java
getblockHeader(10);
```
---

#### 3.2 Getting block header by block hash

Interface

**`Result getblockHeader(String hash)`**

Instructions

> Gets a block header by block hash
>
> Result.data <a href="#BlockHeader">`BlockHeader`</a>

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
        <td align="center">hash</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">block hash </td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
        "hash": "002078656b6e32f4f1e9e881e7b6c4c5de036ae81ec5bf78861bde9480f5ff3a1b33",
        "preHash": "0020ee5d28fde669adb0ad16f3ed426f1ee8df40560bed0ab30bb99cbf95df276d64",
        "merkleHash": "0020cc37658e2d110c1d42f64c7fd3dcb56d9653d4edc4d3a8406cb263a41f9f5488",
        "time": 1529299160000,
        "height": 4,
        "txCount": 4,
        "packingAddress": "2CWsZb9w8XXTE58TUhBGczxf4U6NULS",
        "scriptSig": "2102e18d02154e0f68900898efea7ba72d6d14e37d7d173a62146df2871f40996d7300473045022100d4d92a9518ffd855441c7712f4b31bd003291dc108fa2b455fe26d51e54625f102202ae8375bd69bf1928f9967edac82619ff78f30550c17797cc489d5effd3202bf",
        "roundIndex": 419517,
        "consensusMemberCount": 1,
        "roundStartTime": 1529299150000,
        "packingIndexOfRound": 1,
        "confirmCount": 1909,
        "reward": 0,
        "fee": 0,
        "size": 1
    }
}
```
*e.g Sample Code*

```java
getblockHeader("041f3d2ceed........");
```
---

#### 3.3 Getting block by block height

Interface

**`Result getBlock(int height)`**

Instructions

> Gets a block by block height
>
> Result.data <a href="#Block">`Block `</a>

<table>
   <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
        <td align="center">height</td>
        <td align="center">int</td>
        <td align="center">required</td>
        <td align="center">block height</td>
    </tr>
    </table>

Return

- Return ` Result ` object in the following formats:

```json
{
    "success": true,
    "data": {
        "hash": "00209bbcd98110b57f1ecd66c9d94d1a2381e6c03c3b9aa77db25b6eb5955bb658d3",
        "preHash": "00201c0fa53c98595c7f9ba817fca6367aa2da1c1e480f801766b7a4a16b39c54b67",
        "merkleHash": "00200c2dfa0560229ef728cd6bdc858334ef4072d8e25c3b0831c8366f4d4cb0c168",
        "time": 1529323210000,
        "height": 1884,
        "txCount": 1884,
        "packingAddress": "2CWsZb9w8XXTE58TUhBGczxf4U6NULS",
        "scriptSig": "2102e18d02154e0f68900898efea7ba72d6d14e37d7d173a62146df2871f40996d73004730450221009d1015b7cab19ac8099245390ae41ca14da9f47d5c28b3b7780a53bd8adcccd802202bf74bb764f9de248dfb892d98e9ff91bad25daa107cfdf4effd3fb1c266e5ae",
        "roundIndex": 420416,
        "consensusMemberCount": 5,
        "roundStartTime": 1529323170000,
        "packingIndexOfRound": 4,
        "confirmCount": 33,
        "reward": 100000,
        "fee": 100000,
        "size": 5,
        "txList": [
            {
                "hash": "00202b9737b15bf7e4ebc74a58554e461fbed6fedf3e289c6ef41afa80d83f67babc",
                "type": 1,
                "time": 1529323210000,
                "blockHeight": 1884,
                "fee": 0,
                "value": 0,
                "remark": null,
                "scriptSig": null,
                "status": 0,
                "confirmCount": 33,
                "size": 54,
                "inputs": [],
                "outputs": [
                    {
                        "address": "2CWsZb9w8XXTE58TUhBGczxf4U6NULS",
                        "value": 100000,
                        "lockTime": 2884
                    }
                ]
            },
            {
                "hash": "00203a169b42e5e142e20b273ac925e55f773b5a38c5f5c907efdbc43abb7d7a67b2",
                "type": 2,
                "time": 1529323198461,
                "blockHeight": 1884,
                "fee": 100000,
                "value": 0,
                "remark": "transfer",
                "scriptSig": "21036dd27c9fa786a1e83df204e9b31ddc24745c378f1f6b42731d07f05347167c0000473045022100ff3372711d78eb554be331aa40cd7af246641ecd3bc06f2fdca7faefb25f74e50220743a2f2d9d01b5a77a878349b996cbe4953af5d1a946519a5ce4d1129cf99848",
                "status": 0,
                "confirmCount": 33,
                "size": 255,
                "inputs": [
                    {
                        "fromHash": "0020ab020707282932e6ec701f0b64e22e937fdd03ce9b37aab498aed2e00b6fa8e7",
                        "fromIndex": 0,
                        "address": null,
                        "value": 9999899000000
                    }
                ],
                "outputs": [
                    {
                        "address": "2CiVA3n1VoNQobAax4d7qNEBZAfehLN",
                        "value": 99900000000,
                        "lockTime": 0
                    },
                    {
                        "address": "2ChDcC1nvki521xXhYAUzYXt4RLNULS",
                        "value": 9899998900000,
                        "lockTime": 0
                    }
                ]
            },
            {
                "hash": "002040370fcb2ad080abdcd2d91f952826c8f6e55bda7231c1c15f25d9d74dc8ad7f",
                "type": 7,
                "time": 1529323210000,
                "blockHeight": 1884,
                "fee": 0,
                "value": 0,
                "remark": null,
                "scriptSig": null,
                "status": 0,
                "confirmCount": 33,
                "size": 38,
                "inputs": [],
                "outputs": []
            }
        ]
    }
}
```
*e.g Sample Code*

```java
getBlock(10);
```
---

#### 3.4 Getting block by block hash

Interface

**`Result getBlock(String hash)`**

Instructions

> Gets a block by block hash
>
> Result.data <a href="#Block">`Block `</a>

<table>
    <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
        <td align="center">hash</td>
        <td align="center">String</td>
        <td align="center">required</td>
        <td align="center">block hash</td>
    </tr>
    </table>

Return

-Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
        "hash": "00209bbcd98110b57f1ecd66c9d94d1a2381e6c03c3b9aa77db25b6eb5955bb658d3",
        "preHash": "00201c0fa53c98595c7f9ba817fca6367aa2da1c1e480f801766b7a4a16b39c54b67",
        "merkleHash": "00200c2dfa0560229ef728cd6bdc858334ef4072d8e25c3b0831c8366f4d4cb0c168",
        "time": 1529323210000,
        "height": 1884,
        "txCount": 1884,
        "packingAddress": "2CWsZb9w8XXTE58TUhBGczxf4U6NULS",
        "scriptSig": "2102e18d02154e0f68900898efea7ba72d6d14e37d7d173a62146df2871f40996d73004730450221009d1015b7cab19ac8099245390ae41ca14da9f47d5c28b3b7780a53bd8adcccd802202bf74bb764f9de248dfb892d98e9ff91bad25daa107cfdf4effd3fb1c266e5ae",
        "roundIndex": 420416,
        "consensusMemberCount": 5,
        "roundStartTime": 1529323170000,
        "packingIndexOfRound": 4,
        "confirmCount": 33,
        "reward": 100000,
        "fee": 100000,
        "size": 5,
        "txList": [
            {
                "hash": "00202b9737b15bf7e4ebc74a58554e461fbed6fedf3e289c6ef41afa80d83f67babc",
                "type": 1,
                "time": 1529323210000,
                "blockHeight": 1884,
                "fee": 0,
                "value": 0,
                "remark": null,
                "scriptSig": null,
                "status": 0,
                "confirmCount": 33,
                "size": 54,
                "inputs": [],
                "outputs": [
                    {
                        "address": "2CWsZb9w8XXTE58TUhBGczxf4U6NULS",
                        "value": 100000,
                        "lockTime": 2884
                    }
                ]
            },
            {
                "hash": "00203a169b42e5e142e20b273ac925e55f773b5a38c5f5c907efdbc43abb7d7a67b2",
                "type": 2,
                "time": 1529323198461,
                "blockHeight": 1884,
                "fee": 100000,
                "value": 0,
                "remark": "transfer",
                "scriptSig": "21036dd27c9fa786a1e83df204e9b31ddc24745c378f1f6b42731d07f05347167c0000473045022100ff3372711d78eb554be331aa40cd7af246641ecd3bc06f2fdca7faefb25f74e50220743a2f2d9d01b5a77a878349b996cbe4953af5d1a946519a5ce4d1129cf99848",
                "status": 0,
                "confirmCount": 33,
                "size": 255,
                "inputs": [
                    {
                        "fromHash": "0020ab020707282932e6ec701f0b64e22e937fdd03ce9b37aab498aed2e00b6fa8e7",
                        "fromIndex": 0,
                        "address": null,
                        "value": 9999899000000
                    }
                ],
                "outputs": [
                    {
                        "address": "2CiVA3n1VoNQobAax4d7qNEBZAfehLN",
                        "value": 99900000000,
                        "lockTime": 0
                    },
                    {
                        "address": "2ChDcC1nvki521xXhYAUzYXt4RLNULS",
                        "value": 9899998900000,
                        "lockTime": 0
                    }
                ]
            },
            {
                "hash": "002040370fcb2ad080abdcd2d91f952826c8f6e55bda7231c1c15f25d9d74dc8ad7f",
                "type": 7,
                "time": 1529323210000,
                "blockHeight": 1884,
                "fee": 0,
                "value": 0,
                "remark": null,
                "scriptSig": null,
                "status": 0,
                "confirmCount": 33,
                "size": 38,
                "inputs": [],
                "outputs": []
            }
        ]
    }
}
```
*e.g Sample Code*

```java
getBlock("041f3d2ceed........");
```
---

#### 3.5 Getting the latest block header

Interface

**`Result getNewestBlockHash()`**

Instrucntions

> Gets the latest block header
>
> Result.data <a href="#BlockHeader">`BlockHeader`</a>


Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
        "hash": "002078656b6e32f4f1e9e881e7b6c4c5de036ae81ec5bf78861bde9480f5ff3a1b33",
        "preHash": "0020ee5d28fde669adb0ad16f3ed426f1ee8df40560bed0ab30bb99cbf95df276d64",
        "merkleHash": "0020cc37658e2d110c1d42f64c7fd3dcb56d9653d4edc4d3a8406cb263a41f9f5488",
        "time": 1529299160000,
        "height": 4,
        "txCount": 4,
        "packingAddress": "2CWsZb9w8XXTE58TUhBGczxf4U6NULS",
        "scriptSig": "2102e18d02154e0f68900898efea7ba72d6d14e37d7d173a62146df2871f40996d7300473045022100d4d92a9518ffd855441c7712f4b31bd003291dc108fa2b455fe26d51e54625f102202ae8375bd69bf1928f9967edac82619ff78f30550c17797cc489d5effd3202bf",
        "roundIndex": 419517,
        "consensusMemberCount": 1,
        "roundStartTime": 1529299150000,
        "packingIndexOfRound": 1,
        "confirmCount": 1909,
        "reward": 0,
        "fee": 0,
        "size": 1
    }
}

```
*e.g Sample Code*

```java
getNewestBlockHash();
```
---

#### 3.6 Getting the latest block’s height

Interface

**`Result getNewestBlockHight()`**

Instructions

> Gets the height of the latest block
>
> Result.data: height (Long)

Return

-Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
        "value": 5210
    }
}}

```
*e.g Sample Code*

```java
getNewestBlockHight();
```
---

#### 3.7 Getting the latest block’s Hash

Interface

**`Result getNewestBlockHash()`**

Instructions

> Gets the block Hash of the latest block
>
> Result.data: Hash (String)

Return

- Return ` Result ` object in the following format:

```json
{
    "success": true,
    "data": {
        "value": "0020a2e1c99951184700927472c431a5a65847c7974cac0bbb97b242c7adf56ad27b"
    }
}}

```
*e.g Sample Code*

```java
getNewestBlockHash();
```
---



### Consensus ConsensusService

#### 4.1 Offline assembling transaction for creating node

Interface

**` Result createAgentTransaction(AgentInfo agentInfo, List<Input> inputs, Na fee) `**

Instructions

> Assembles transaction for creating node offline
>
> Result.data `String`: serialized transaction string in hexadecimal

<table>
<tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr> 
<tr>
<td align="center">agentInfo</td>
<td align="center">Object</td>
<td align="center">required</td>
<td align="center">the information about the node to be created</td>
</tr>
<tr>
<td align="center">inputs</td>
<td align="center">List</td>
<td align="center">required</td>
<td align="center">input information</td>
</tr>
<tr>
<td align="center">fee</td>
<td align="center">Object</td>
<td align="center">required</td>
<td align="center">transaction fee</td>
</tr>
</table>

*e.g Sample Code*

```java
// the inputs for assembly transaction, the attribute of the input in the example is mandatory.
List<Input> inputs = new ArrayList<>();
Input input = new Input();
input.setFromHash("0020b0a75a26caad17b4ea6cec7f059ac0e426d71696a6096f75bb2e9f30c11c60d6");
input.setFromIndex(1);
input.setAddress("Nse5x9foSzFjuwkwZLSvSjAHHLVf3MKJ");
input.setValue(999998760000000L);
inputs.add(input);

// the information about the node to be created, the attribute of AgentInfo in the example is mandatory.
AgentInfo info = new AgentInfo();
info.setAgentAddress("Nse5x9foSzFjuwkwZLSvSjAHHLVf3MKJ");       // the agent address of the consensus node
info.setPackingAddress("NsdwUo8XU52DtB9Zqjo2YkuLBW8VhGaQ");     // the address of the node actually packing block
info.setDeposit(200000 * 100000000L);// deposit for creating a node, not less than 20000NULS and not more than 200000NULS
info.setCommissionRate(10.0); // commission ratio ranging from 1 to 100

//fee for creating a node
Na fee = Na.valueOf(1000000L);

Result result = NulsSDKTool.createAgentTransaction(info, inputs, fee);
Map<String, Object> map = (Map<String, Object>) result.getData();
String txHex = (String) map.get("value");
```

------
> ** Calculation of transaction fee **: unit price of the fee\* transaction size
>
> ** unit price of the fee (min)**：1000000 NA/1KB
>
> **Calculation of transaction size**：（288 + 50  * inputs.length）/1024
> 210 is the fixed length of the basic information, 50 is the length of a single input, 38 is the length of a single output, and remark is an optional field, whose byte length is calculated according to the UTF-8 character encoding when needed. The transaction size is in KB, and its maximum value is 300 KB. The part less than 1 KB is calculated as 1 KB.
> When the block-forging node verifies each transaction, the difference between the input and the output is regarded as the fee paid by the user when the transaction is sent, and the minimum value of the fee is calculated based on the transaction size. If the user's fee is less than the minimum value, it will be regarded as an invalid transaction and will not be packaged. Therefore, when creating a transaction, you should calculate the fee with care to avoid transaction failure.

#### 4.2 Offline assembling agent consensus transaction

Interface

**` Result createDepositTransaction(DepositInfo depositInfo, List<Input> inputs, Na fee) `**

Instructions

> Assembles an agent consensus transaction offline.
>
> Result.data `String`: serialized transaction data in hexadecimal



<table>
<tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr>
<tr>
<td align="center">depositInfo</td>
<td align="center">Object</td>
<td align="center">required</td>
<td align="center">the information about the node to be created</td>
</tr>
<tr>
<td align="center">inputs</td>
<td align="center">List</td>
<td align="center">required</td>
<td align="center">input information</td>
</tr>
<tr>
<td align="center">fee</td>
<td align="center">Object</td>
<td align="center">required</td>
<td align="center">transaction fee</td>
</tr>
</table>

*e.g Sample Code*

```java
// the inputs for assembly transaction, the attribute of the input in the example is mandatory.
List<Input> inputs = new ArrayList<>();
Input input = new Input();
input.setFromHash("0020b0a75a26caad17b4ea6cec7f059ac0e426d71696a6096f75bb2e9f30c11c60d6");
input.setFromIndex(1);
input.setAddress("Nse5x9foSzFjuwkwZLSvSjAHHLVf3MKJ");
input.setValue(999998760000000L);
inputs.add(input);

// the information about the agent consensus node, the attribute of AgentInfo in the example is mandatory.
DepositInfo info = new DepositInfo();
info.setAddress("Nse5x9foSzFjuwkwZLSvSjAHHLVf3MKJ");            //address of the agent consensus node
info.setDeposit(300000 * 100000000L);// the agent token number ranging from 2000NULS to 500000NULS
info.setAgentHash("0020a467827d5f06feb3e78b4603eb03677711219cb5232d145b3e9d4ab48a3eb366");// the id of the transaction for creating consensus node
 
//fee for creating a node
Na fee = Na.valueOf(1000000L);

Result result = NulsSDKTool.createDepositTransaction(info, inputs, fee);
Map<String, Object> map = (Map<String, Object>) result.getData();
String txHex = (String) map.get("value");
```

------
> ** Calculation of fee for creating an agent transaction**: unit price of the fee\* transaction size
>
> ** unit price of the fee (min)**：1000000 NA/1KB
>
> **Calculation of transaction size**：（288 + 50  * inputs.length）/1024
> 210 is the fixed length of the basic information, 50 is the length of a single input, 38 is the length of a single output, and remark is an optional field, whose byte length is calculated according to the UTF-8 character encoding when needed. The transaction size is in KB, and its maximum value is 300 KB. The part less than 1 KB is calculated as 1 KB.
> When the block-forging node verifies each transaction, the difference between the input and the output is regarded as the fee paid by the user when the transaction is sent, and the minimum value of the fee is calculated based on the transaction size. If the user's fee is less than the minimum value, it will be regarded as an invalid transaction and will not be packaged. Therefore, when creating a transaction, you should calculate the fee with care to avoid transaction failure.

#### 4.3 Offline assembling transaction for canceling agent consensus

Interface

**` Result createCancelDepositTransaction(Output output) `**

Instructions

> Assembles a transaction for canceling agent consensus offline
>
> Result.data `String`: serialized transaction string in hexadecimal

<table>
  <tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr> 
<tr>
<td align="center">output</td>
<td align="center">Object</td>
<td align="center">required</td>
<td align="center"> the output locked when participating in the consensus </td>
</tr>
</table>

*e.g Sample Code*

```java
// after the transaction for participating in agent consensus is packaged, there is an output record of lockTime = -1, which is the agent amount locked after the user delegates the consensus.
/ / use the output as a parameter to generate an transaction for canceling agent consensus
Output output = new Output();
output.setTxHash("0020b0a75a26caad17b4ea6cec7f059ac0e426d71696a6096f75bb2e9f30c11c60d6");
output.setIndex(0);
output.setAddress("Nse5x9foSzFjuwkwZLSvSjAHHLVf3MKJ");
output.setValue(20000000000000L);
output.setLockTime(-1);

Result result = NulsSDKTool.createCancelDepositTransaction(output);
Map<String, Object> map = (Map<String, Object>) result.getData();
String txHex = (String) map.get("value");
```



#### 4.4 Offline assembling transaction for stopping consensus node 

Interface

**` Result createStopAgentTransaction(Output output) `**

Instructions

> Assembles a transaction for stopping consensus node offline
>
> Result.data `String`: serialized transaction string in hexadecimal

<table>
<tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr> 
<tr>
<td align="center">output</td>
<td align="center">Object</td>
<td align="center">required</td>
<td align="center"> the output locked when creating a node </td>
</tr>
</table>

*e.g Sample Code*

```java
// after the transaction for creating a node is packaged, there is an output record of lockTime = -1, which is the deposit amount locked after the user create a node. 
/ / use the output as a parameter to generate a transaction for canceling agent consensus 
Output output = new Output();
output.setTxHash("0020b0a75a26caad17b4ea6cec7f059ac0e426d71696a6096f75bb2e9f30c11c60d6");
output.setIndex(0);
output.setValue(20000000000000L);
output.setAddress("Nse5x9foSzFjuwkwZLSvSjAHHLVf3MKJ");
output.setLockTime(-1);

Result result = NulsSDKTool.createStopAgentTransaction(output);
Map<String, Object> map = (Map<String, Object>) result.getData();
String txHex = (String) map.get("value");
```



#### 4.5 Getting list of agent consensus 

Interface

**` Result getDeposits(String address, int pageNumber, int pageSize) `**

Instructions

> Gets a list of agent consensus by agent address
>
> Result.data List: a list of agent consensus

<table>
<tr>
        <th align="center">parameter</th>
        <th align="center">type</th>
        <th align="center">required or not</th>
        <th align="center">note</th>
</tr> 
<tr>
<td align="center">address</td>
<td align="center">String</td>
<td align="center">required</td>
<td align="center">agent address</td>
</tr>
<tr>
<td align="center">pageNumber</td>
<td align="center">int</td>
<td align="center">required</td>
<td align="center">page number</td>
</tr>
<tr>
<td align="center">pageSize</td>
<td align="center">int</td>
<td align="center"> required </td>
<td align="center"> record size displayed per page ranging from 1 to 100< </td>
</tr>
</table>

Return

- Return ` Result ` object in the following format:

```json
{
  "success":true,
  "data":{
    "pageNumber":1,
    "pageSize":10,
    "total":1,
    "pages":1,
      "list":[
        {
        "deposit":20000010000000,
        "agentHash":"00207654b3371e9c99295a4b3d0371a6cfec48ee31684825dabc04dc5ea314da0a0c",
        "address":"NsdyD94pXWpxZudbtJ4zpkBHhh8XmBQA",
        "txHash":"002029411a2e6797e2d3bec54c48008f73275c8208a240b4835be534a137452bc29e",
        "blockHeight":98,
        "agentAddress":"NsdyD94pXWpxZudbtJ4zpkBHhh8XmBQA"
        }
      ]
  }
}
```

*e.g Sample Code*

```java
Result result = NulsSDKTool.getDeposits(address, 1, 10);
```





### Appendix

#### Example of Result returned by interface
##### Result

- Indicate the normal access to the interface and the specific data returned by the business service.

```json
{	
"success": true,// interface executes correctly
"data": data
}
```
- Indicate the normal access to the interface, and the business service returns true.

```json
{	// indicate the normal access to the interface, and the business service returns true
  "success": true,// interface executes correctly
    "data": {
		"value":true // the result returned by interface business function
    }
}
```
- Indicate the normal access to the interface, and the business service returns false.

```json
{	
    "success": true, // interface executes correctly
    	"data"：{
        "value": false // the result returned by interface business function
     }
}
```
- Return error cases, such as a parameter error, exception, etc.

```json
{	// indicate an error 
    "success": false,
     "data"：{
        "code": "ACT005",
        "msg": "xxxxxx...."
     }
}
```

- This is the full result of creating an offline account with password.

```json
{
    "success": true,
    //data为List<account>
    "data": {
    	"list":[
        	{
	           "address": "2CacFwqMwcJiGNNBwiwV7bCL7bjwNBr",
	            "alias": null,
	            "pubKey": "030d4e752b5aa5d784f19a1fcc73b02afb6f756752fd00ebc2fcaabc8d0979c4f0",
	            "extend": null,
	            "createTime": 1529041525794,
	            "encrypted": false,
	            "priKey": "00e4bfd347351ea899b5f0ae2c0a3e7a6951b202eaf72432d1a63a2dc85c59c82a",
	            "encryptedPriKey": ""
	    	}
	    ]
    }
}
```
---

##### <a name="Account"> Account </a>
```json
{
	"address": String, account address
	"alias": String, account alias
	"pubKey": String, public key
	"extend": String, extension
	"createTime": Long, create time
	"encrypted": boolean, encrypted or not
	"priKey": String, private key（not null only if a password-less offline account is created）
	"encryptedPriKey": String, encrypted private key（not null only if an offline account with password is created）
}
```
---

##### <a name="Input"> Input </a>
```json
 {
	"fromHash": String, txHash of the output         
	"fromIndex": Integer, outIndexof the output
	"address": String, transfer-in address                   
	"value": Long, transfer-in amount
    "lockTime": Long, lock time
}
```
---

##### <a name="Output"> Output </a>
```json
 {
	"txHash": String, transaction hash
	"index": Integer, index
	"address": String, address
	"value": Long, amount
	"lockTime": Long, lock time
	"status": Integer status 0:usable(usable), 1:timeLock(time lock), 2:consensusLock(consensus lock), 3:spent(spent)
}
```
---

##### <a name="Transaction"> Transaction </a>

```json
{
	"hash": String, transaction hash
	"type": Integer, transaction type
	"time": Long, transaction initiation time 
	"blockHeight": Long, block height
	"fee": Long, transaction fee
	"value": Long, transaction amount
	"remark": String, remarks
	"scriptSig": String, signature
	"status": Integer, transaction status 0:unConfirm(to be confirmed), 1:confirm(confirmed)
	"confirmCount": Long, confirmation count
	"size": int, size
	"inputs": [
		{
"fromHash": String, txHash of the output         
			"fromIndex": Integer, outIndexof the output
			"address": String, transfer-in address                   
			"value": Long, transfer-in amount

		}
		],
	"outputs": [
		{
			"txHash": String, transaction hash
			"index": Integer, index
			"address": String, address
			"value": Long, amount
			"lockTime": Long, lock time
			"status": Integer status 0:usable(usable), 1:timeLock(time lock), 2:consensusLock(consensus lock), 3:spent(spent)
		}
	]
}
```
---

##### <a name="BalanceInfo"> BalanceInfo </a>
```json
{
	"balance": long, balance
	"usable": long, available balance
	“locked": long, locked balance
}
```
---

##### <a name="BlockHeader"> BlockHeader</a>

```json
{
	"hash": String, transaction hash
	"preHash": String, hash value of the previous block
	"merkleHash": String, merkle hash
	"time": Long, block generation time
	"height": Long, block height
	"txCount": Long, count of transactions packaged by the block
	"packingAddress": String, packing address
	"scriptSig": String, signature
	"roundIndex": Long, consensus round
	"consensusMemberCount": Integer, count of members participating in the consensus
	"roundStartTime": Long, the start time of the current consensus round
	"packingIndexOfRound": Integer, the packing index of the current round
	"confirmCount": Long, confirmation count
	"reward": Long, consensus reward
	"fee": Long, packing fee obtained
	"size": int, size
}
```
---

##### <a name="Block"> Block</a>

```json
{
	"hash": String, transaction hash
	"preHash": String, hash value of the previous block
	"merkleHash": String, merkle hash
	"time": Long, block generation time
	"height": Long, block height
	"txCount": Long, count of transactions packaged by the block
	"packingAddress": String, packing address
	"scriptSig": String, signature
	"roundIndex": Long, consensus round
	"consensusMemberCount": Integer, count of members participating in the consensus
	"roundStartTime": Long, the start time of the current consensus round
	"packingIndexOfRound": Integer, the packing index of the current round
	"confirmCount": Long, confirmation count
	"reward": Long, consensus reward
	"fee": Long, packing fee obtained
	"size": int, size
	"txList": [
		{
			"hash": String, transaction hash
			"type": Integer, transaction type
			"time": Long, transaction initiation time
			"blockHeight": Long, block time
			"fee": Long, transaction fee
			"value": Long, transaction amount
			"remark": String, remarks
			"scriptSig": String, signature
			"status": Integer, transaction status 0:unConfirm(to be confirmed), 1:confirm(confirmed)
			"confirmCount": Long, confirmation count
			"size": int, size
			"inputs": [inputs
				{
		"fromHash": String, txHash of the output         
					"fromIndex": Integer, outIndexof the output
					"address": String, transfer-in address
					"value": Long transfer-in amount
				}
			],
			"outputs": [ outputs
				{
					"address": String, address
					"value": Long, amount
					"lockTime": Long, lock time
				}
			]
		}
	]
}
```
