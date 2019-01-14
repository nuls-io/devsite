
# CLI User Manual

### Introduction

​	The User Manual (hereinafter referred to as Manual) is for the full-node wallet of NULS (Linux). Before reading this Manual, please know about the basic operation and usage of Linux system. The Manual includes operations for creating account, importing account, transferring, building nodes, agency and others with NULS wallet. It is recommended to build stable NULS nodes with Linux system server.

### Version Update Records

|  Version  |  Date updated  |        Contents        |
| :----: | :--------: | :----------------: |
| V1.0.0 | 2018-07-12 | All functions of official version |

### Preparation

#### Server hardware

**Server for creating NULS nodes shall be with configurations not lower than the following**

|     CPU   | Memory  |   Hard Disk   |  Broadband   |
|:---------:| :----: | :------: | :---:|
|Quad-core 3.0GHz | 16G  | 128G Hard Disk | 20M Uplink |

**Recommendation**

|     CPU     | Memory  |   Hard Disk   |   Broadband   |
| :---------: | :---: | :------: | :------: |
| 8-core 3.0GHz | 32G  | 256G Hard Disk  | 100M Uplink |

#### Version of system and core

**Linux system**

- CentOS (recommended)

It is recommended to use core of version 2.6.32 or higher.

### Start

#### Download

* NULS official website for downloading the latest full-node wallet:http://nuls.io/wallet
* GitHub：https://github.com/nuls-io/nuls-wallet-release

* Enter [wallet download on NULS website](http://nuls.io/wallet),and select Linux download. MEGA and Baidu Cloud Disk are available and optional for users. 

  The following is for downloading wallet (v1.0.0) in Linux system:

  ```shell
  $ wget https://media.githubusercontent.com/media/nuls-io/nuls-wallet-release/master/NULS-Wallet-linux64-1.0.0.tar.gz
  ```

  Note: the downloading link for the subsequent versions is subject to change.

#### Install

- Extract downloaded files in Linux system

  ```shell
  $ tar -zxf NULS-Wallet-linux64-1.0.0.tar.gz
  ```

#### Operate

- Enter bin catalogue and run startup script to start full-node wallet

  ```shell
  $ cd bin
  $ ./start.sh
  ```

### Use wallet

#### Quick-start

- Upon confirming the wallet is started, start the command line of wallet to run it.

  Enter bin catalogue to execute the following commands:

  ```shell
  $ ./cmd.sh
  ```

  Display NULS naming prompt `nuls>>>  `, and then directly input NULS wallet operation command to run it.

  The following gives an example of account creating:

  ```shell
  nuls>>> create
  Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
  Enter your password:*********
  Please confirm new password:*********
  [ "Nse9EtaRwgVgN42pxURgZjUR33LUx1j1" ]
  nuls>>>
  ```

  Command `create` is to create a single account, insert password, confirm the inserted password, and receive the account address if the account is created successfully.



### Conventions

- For password: it must be 8 to 20 digits, including letters and figures.
- Command parameter description means the required parameter; [parameter] means optional parameter. "|" means alternative parameter, that is, the front or later parameter is required.

### Wallet command

#### Help command

All commands for output and printing

- **Command: help [-a] **

| Parameter | Description             |
| :--- | :------------------- |
| -a   | Formatting printing command, optional |

Return message help 

```json
getaccount <address> --get account information
```

Return message help -a

```json
getaccount <address> --get account information
	OPTIONS:
	<address> the account address - Required
```

Example

```shell
nuls>>> help
nuls>>> help -a
```



#### Create account

Create account and return to account addresses collection

- **Command: create [number] **

| Parameter    | Description                 |
| :------- | :------------------- |
| [number] | Quantity of accounts created, optional |

Upon creating account, receive prompt of password inserting; if the account is not to have a password, ignore it and directly enter;

Return accounts collection

```json
[ "NsdwsD8n3GrW9Sx43eLZ3xv8C858ovE2", "Nse6iqzBZsBtL5c46xaHhAhAqVDv3zQQ" ]
```

Example, to create 2 accounts without password

```shell
nuls>>> create 2
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:
[ "NsdwsD8n3GrW9Sx43eLZ3xv8C858ovE2", "Nse6iqzBZsBtL5c46xaHhAhAqVDv3zQQ" ]
```



#### Backup account

For backup of account, generate a backup file, titled as account address, with .keystore file extension as and file as account

- **Command: backup &lt;address&gt; [path]**

| Parameter       | Description                                          |
| --------------- | ---------------------------------------------------- |
| &lt;address&gt; | Account address, required                                       |
| [path]          | The target folder of backup files, defaults to be the current folder, optional  |

Note: insert current password when backup the encrypted account, and use such password when importing the backup files to generate account. It is permitted but not recommended to backup an unencrypted account, because it is not safe.

Return message

```shell
The path to the backup file is /nuls/bin/NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy.keystore
```

Example: backup of an account with password

```shell
nuls>>> backup NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy
Please enter the password.
Enter your password:**********
The path to the backup file is /nuls/bin/NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy.keystore
```



#### Remove account

Remove local account according to account address; if the account is encrypted, insert password.

- **Command: remove &lt;address&gt; **

| Parameter           | Description            |
| --------------- | ---------------- |
| &lt;address&gt; | Account address, required |

Return message

```json
Success
```

Example

```shell
nuls>>> remove NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy
Please enter the password.
Enter your password:**********
Success
```



#### Set account password

Set password for the unencrypted accounts based on account address. No password setting for the encrypted accounts.

- **Command: setpwd &lt;address&gt; **

| Parameter           | Description             |
| --------------- | ---------------- |
| &lt;address&gt; | Account address, required |

Return message

```json
Success
```

Example

```shell
nuls>>> setpwd Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:**********
Please confirm new password:**********
Success
```



#### Change account password

Change password of the encrypted accounts based on account address. No password changing for the unencrypted accounts. Require original password when replacing it with a new one.

- **Command: resetpwd &lt;address&gt; **

| Parameter             | Description             |
| --------------- | ---------------- |
| &lt;address&gt; | Account address, required |

Return message

```json
Success
```

Example

```shell
nuls>>> resetpwd Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
Enter your old password:**********
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:**********
Please confirm new password:**********
Success
```



#### Set nickname

Set a nickname for account. If the account is used to create nodes, the nickname will be displayed as node source.

- **Command：setalias &lt;address&gt; &lt;alias&gt;**

| Parameter         | Description             |
| --------------- | ---------------- |
| &lt;address&gt; | Account address, required |
| &lt;alias&gt;   | Nickname, required   |

Return message, transaction hash

```json
"0020f94f36aefd59f9cca9bff3c018fc287dc6c0bcd7fbeb047133cadb5747e7d98d"
```

Example

```shell
nuls>>> setalias Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT nuls_alias
"0020f94f36aefd59f9cca9bff3c018fc287dc6c0bcd7fbeb047133cadb5747e7d98d"
```



#### Imported account keystore

Imported account keystore files, and create a local account. Receive failure to import if there is an existing local account.

- **Command: import keystore &lt;path&gt; **

| Parameter         | Description                        |
| ------------ | ------------------------------ |
| &lt;path&gt; | Address of keystore files to be imported, required |

Note: when importing keystore files to create an account, if they are encrypted, the password for backup of keystore files is required.

Return message, imported account address

```json
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```

Example

```shell
nuls>>> importkeystore /home/charlie/bin/NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy.keystore
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:**********
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```



#### Imported account’s private key

Import account’s private key and create a local account. Receive failure to import if there is an existing local account.

- **Command：import &lt;privatekey&gt; **

| Parameter                | Description             |
| ------------------ | ---------------- |
| &lt;privatekey&gt; | Account’s private key, required |

注意：Note: when importing such private key, set a new password. If the account does not need to be encrypted, users do not need to insert a new password.

Return message, imported account address

```json
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```

Example

```shell
nuls>>> import 00a166d10c2cc4cd8f76449ff699ab3eee44fe4f82b4bb866f7bba02751a6fd655
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:**********
Please confirm new password:**********
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```



#### Imported account’s private key (overwritten)

Import account’s private key and create a local account. Receive failure to realize overwritten import if there is an existing local account.

- **Command：import &lt;privatekey&gt; **

| Parameter               | Description             |
| ------------------ | ---------------- |
| &lt;privatekey&gt; | Account’s private key, required |

Note: when importing account’s private key, set a new password. If the account does not need to be encrypted, users do not need to insert a new password.

Overwritten import: if the account exists locally, the password before importing will be replaced with a new password after performing overwritten import; if the account is not encrypted after this import, the account will be unencrypted account (even though the account is encrypted before such import).

Return message, imported account address

```json
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```

Example

```shell
nuls>>> import 00a166d10c2cc4cd8f76449ff699ab3eee44fe4f82b4bb866f7bba02751a6fd655
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:**********
Please confirm new password:**********
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"
```



#### Inquire account information

Inquire account information based on account address

- **Command：getaccount &lt;address&gt;**

| Parameter            | Description           |
| --------------- | :------------- |
| &lt;address&gt; | Account address, required |

Return message

```json
{
  "address" : "NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy",//Account address
  "alias" : null,//Nickname
  "pubKey" : "03f364bae9bb632a9b957522f150cb501dbc950e3700cff7a3679ed8820c486875",//Public key
  "priKey" : "",//Private key (unavailable if the account is encrypted)
  "encryptedPriKey" : "712149fad00350cdfee4d20850a9e5c1e9d7e9c1562dabc593cbc9b5ac57e99f1549748ff2421b3f6830f34bff7c69d8",//Private key after encryption (unavailable if the account is encrypted)
  "extend" : null,
  "createTime" : "2018-07-13 11:39:14",//Creation time
  "encrypted" : true//Encrypted or not (set password or not)
}
```

Example

```shell
nuls>>> getaccount NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy
{
  "address" : "NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy",
  "alias" : null,
  "pubKey" : "03f364bae9bb632a9b957522f150cb501dbc950e3700cff7a3679ed8820c486875",
  "priKey" : "",
  "encryptedPriKey" : "712149fad00350cdfee4d20850a9e5c1e9d7e9c1562dabc593cbc9b5ac57e99f1549748ff2421b3f6830f34bff7c69d8",
  "extend" : null,
  "createTime" : "2018-07-13 11:39:14",
  "encrypted" : true
}
```



#### Inquire list of accounts

Inquire list of accounts as per paging parameter, and output all accounts in reverse sequence of creation time

- **Command：getaccounts &lt;pageNumber&gt; &lt;pageSize&gt;**

| Parameter               | Description                          |
| ------------------ | -------------------------------- |
| &lt;pageNumber&gt; | Page, to get the data on which page, required|
| &lt;pageSize&gt;   | Number of data displayed on each page, required      |

Return message, output accounts collection

```json
[ {
  "address" : "NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy",//Account address
  "alias" : null,//Nickname
  "pubKey" : "03f364bae9bb632a9b957522f150cb501dbc950e3700cff7a3679ed8820c486875",// Public key
  "priKey" : "",//Private key (unavailable if the account is encrypted)
  "encryptedPriKey" : "712149fad00350cdfee4d20850a9e5c1e9d7e9c1562dabc593cbc9b5ac57e99f1549748ff2421b3f6830f34bff7c69d8",// Private key after encryption (unavailable if the account is encrypted)
  "extend" : null,
  "createTime" : "2018-07-13 11:39:14",//Creation time
  "encrypted" : true//Encrypted or not (set password or not)
}, {
  "address" : "NsdwsD8n3GrW9Sx43eLZ3xv8C858ovE2",
  "alias" : null,
  "pubKey" : "035f063012385032d19082a302ba774af4e02abe32e43120d3bfe82ec72dcdeafa",
  "priKey" : "3ba27d6a53fb52f52443d8d895155ca113c632fd8a1bd6e7846933d1fb378ecb",
  "encryptedPriKey" : "",
  "extend" : null,
  "createTime" : "2018-07-13 11:02:23",
  "encrypted" : false
} ]
```



Example: to get list of accounts, showing page 1, 2 items per page

```shell
nuls>>> getaccounts 1 2
[ {
  "address" : "NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy",
  "alias" : null,
  "pubKey" : "03f364bae9bb632a9b957522f150cb501dbc950e3700cff7a3679ed8820c486875",
  "priKey" : "",
  "encryptedPriKey" : "712149fad00350cdfee4d20850a9e5c1e9d7e9c1562dabc593cbc9b5ac57e99f1549748ff2421b3f6830f34bff7c69d8",
  "extend" : null,
  "createTime" : "2018-07-13 11:39:14",
  "encrypted" : true
}, {
  "address" : "NsdwsD8n3GrW9Sx43eLZ3xv8C858ovE2",
  "alias" : null,
  "pubKey" : "035f063012385032d19082a302ba774af4e02abe32e43120d3bfe82ec72dcdeafa",
  "priKey" : "3ba27d6a53fb52f52443d8d895155ca113c632fd8a1bd6e7846933d1fb378ecb",
  "encryptedPriKey" : "",
  "extend" : null,
  "createTime" : "2018-07-13 11:02:23",
  "encrypted" : false
} ]
```



#### Inquire account’s private key

Inquire account’s private key based on account address; if the account is encrypted, insert password.

- **Command：getprikey &lt;address&gt; **

| Parameter            | Description             |
| --------------- | ---------------- |
| &lt;address&gt; | Account address, required |

Return message, imported account address

```json
"00a166d10c2cc4cd8f76449ff699ab3eee44fe4f82b4bb866f7bba02751a6fd655"
```

Example

```shell
nuls>>> getprikey NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy
Please enter the password.
Enter your password:**********
"00a166d10c2cc4cd8f76449ff699ab3eee44fe4f82b4bb866f7bba02751a6fd655"
```



#### Inquire account balance

Inquire account balance based on account address

- **Command：getbalance &lt;address&gt; **

| Parameter            | Description             |
| --------------- | ---------------- |
| &lt;address&gt; |Account address, required |

Return message, imported account address

```json
{
  "balance" : "9999998.99",//Balance
  "locked" : "0",//Locked balance
  "usable" : "9999998.99"//Available balance
}
```

Example

```shell
nuls>>> getbalance Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
{
  "balance" : "9999998.99",
  "locked" : "0",
  "usable" : "9999998.99"
}
```



#### Transfer

Transfer NULS into another account address based on account address. If such account has password, insert password; if it has no password, transfer out directly.

- **Command: transfer &lt;address&gt; &lt;toAddress&gt; &lt;amount&gt; [remark] **

| Parameter            | Description                                           |
| ----------------- | ----------------------------------------------- |
| &lt;address&gt;   | transferring address, required                                  |
| &lt;toAddress&gt; | receiving address, required                                |
| &lt;amount&gt;    | transferred amount, round to 8 decimals in total (in NULS), required |
| [remark]          | Remarks, required                               |

Return message, transfer transaction hash

```json
"00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596"
```
Example

```shell
nuls>>> transfer Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 100 Transfer
Please enter the password.
Enter your password:**********
"00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596"
```



#### Inquire transaction details

Inquire transaction details as per transaction hash

- **Command：gettx &lt;hash&gt;**

| Parameter         | Description          |
| ------------ | -------------- |
| &lt;hash&gt; | Transaction hash, required |

Return message, transaction details

```json
{
  "hash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",//Transaction hash
  "type" : "transfer",//Transaction type (transfer transaction as an example)
  "time" : "2018-07-16 11:21:46",//Transaction time
  "blockHeight" : 26269,//Block height of package transaction
  "fee" : "0.001",//Transaction service charge
  "value" : "100",//(Transfer) transaction amount
  "remark" : "Transfer",//remarks
  "scriptSig" : "2103f68aeb83f3a4fdf9b49259a6e8eae97cf73c7a0a1c52da8a1f9c09312a6d3c530046304402202932ea77976a603b832861c64f868a34e9ad59b728d3a8eeba27269f05b4267c0220217a6e1b97fb3f65e6711434e17e399f43e168f3699edb2aba8618bdd3f410e1",//Signature
  "status" : "confirm",//Status of transaction confirmation (confirmed or unconfirmed)
  "confirmCount" : 46,//Times of confirmation
  "size" : 254,//Size of transaction
  "inputs" : [ {//Input of transaction
    "fromHash" : "002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e",
    "fromIndex" : 1,
    "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",
    "value" : "9979998.98",
    "lockTime" : 0
  } ],
  "outputs" : [ {//Output of transaction
    "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
    "index" : 0,
    "address" : "NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T"// Target address of transaction output (means to transfer 100 to the target address)
    "value" : "100",
    "lockTime" : 0,
    "status" : "usable"
  }, {
    "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",//Transaction hash
    "index" : 1,
    "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",//Target address of transaction output (means to give users changes)
    "value" : "9979898.979",
    "lockTime" : 0,
    "status" : "usable"
  } ]
}
```

Example, to inquire transfer transaction

```shell
nuls>>> gettx 00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596
{
  "hash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
  "type" : "transfer",
  "time" : "2018-07-16 11:21:46",
  "blockHeight" : 26269,
  "fee" : "0.001",
  "value" : "100",
  "remark" : "Transfer",
  "scriptSig" : "2103f68aeb83f3a4fdf9b49259a6e8eae97cf73c7a0a1c52da8a1f9c09312a6d3c530046304402202932ea77976a603b832861c64f868a34e9ad59b728d3a8eeba27269f05b4267c0220217a6e1b97fb3f65e6711434e17e399f43e168f3699edb2aba8618bdd3f410e1",
  "status" : "confirm",
  "confirmCount" : 46,
  "size" : 254,
  "inputs" : [ {
    "fromHash" : "002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e",
    "fromIndex" : 1,
    "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",
    "value" : "9979998.98",
    "lockTime" : 0
  } ],
  "outputs" : [ {
    "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
    "index" : 0,
    "address" : "NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T",
    "value" : "100",
    "lockTime" : 0,
    "status" : "usable"
  }, {
    "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
    "index" : 1,
    "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",
    "value" : "9979898.979",
    "lockTime" : 0,
    "status" : "usable"
  } ]
}
```



#### Inquire list of transactions

Inquire list of transactions in this account based on account address

- **Command：gettxlist &lt;address&gt; &lt;pageNumber&gt; &lt;pageSize&gt;**

| Parameter                | Description                             |
| ------------------ | -------------------------------- |
| &lt;address&gt;    |Account address, required                |
| &lt;pageNumber&gt; | Page, to get the data on which page, required |
| &lt;pageSize&gt;   | Number of data displayed on each page, required       |

Return message, transaction details

```json
[ {
  "txHash" : "0020153f76bec3433676a96ef343d7e432b7de16b3175a9c5f4579338f604989996e",//Transaction hash
  "blockHeight" : 26473,//Block height of transaction
  "time" : "2018-07-16 11:55:43",//Transaction time
  "txType" : "transfer",//Transaction type
  "status" : 1,//Status of confirmation
  "info" : "+100"//Message
},{
  "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
  "blockHeight" : 26269,
  "time" : "2018-07-16 11:21:46",
  "txType" : "transfer",
  "status" : 1,
  "info" : "+100"
} ]
```

Example

```shell
nuls>>> gettxlist NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 1 10
[ {
  "txHash" : "0020153f76bec3433676a96ef343d7e432b7de16b3175a9c5f4579338f604989996e",
  "blockHeight" : 26473,
  "time" : "2018-07-16 11:55:43",
  "txType" : "transfer",
  "status" : 1,
  "info" : "+100"
}, {
  "txHash" : "00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596",
  "blockHeight" : 26269,
  "time" : "2018-07-16 11:21:46",
  "txType" : "transfer",
  "status" : 1,
  "info" : "+100"
} ]
```



#### Create node

Create node based on account address. Need an account package address when creating node (package address shall have no password), and deposit of 2 at least.

- **Command：createagent &lt;agentAddress&gt; &lt;packingAddress&gt; &lt;commissionRate&gt; &lt;deposit&gt; **

| Parameter                   | Description                                                        |
| ---------------------- | ------------------------------------------------------------ |
| &lt;agentAddress&gt;   | Account address of nodes created, required                                    |
| &lt;packingAddress&gt; | Node account package address, required (note: the account shall have no password, otherwise the node cannot package) |
| &lt;commissionRate&gt; | Agent commission proportion, with a range of 10~100, required                           |
| &lt;deposit&gt;        | Node creating deposit of 2 at least, required                    |

Return message, agent hash of return node

```json
"002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e"
```

Example: to create a node, commission proportion of 10%, and deposit of 20000 NULS

```shell
nuls>>> createagent Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT NsdvAnqc8oEiNiGgcp6pEusfiRFZi4vt 10 20000
Please enter the password.
Enter your password:**********
"002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e"
```



#### Include consensus (agency node)

Include consensus of 2000NULS at least based on account address and node agent hash

- **Command：deposit &lt;address&gt; &lt;agentHash&gt; &lt;deposit&gt; **

| Parameter               | Description                                   |
| ----------------- | -------------------------------------- |
| &lt;address&gt;   | Account address, required                        |
| &lt;agentHash&gt; | Node agent hash, required                 |
| &lt;deposit&gt;   | Include consensus deposit, not less than 2000NULS, required |

Return message, transaction hash for including consensus; to exit the consensus, require such hash.

```json
"0020d349b7ad322ff958e3abfa799d9ac76341afa6e1fb4d3857353a5adc74ba3fd0"
```

Example

```shell
nuls>>> deposit NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e 5000
"0020d349b7ad322ff958e3abfa799d9ac76341afa6e1fb4d3857353a5adc74ba3fd0"
```



#### Exit the consensus (agency)

Exit the consensus (agency) based on account address and transaction hash for including consensus. When an account agents several nodes, each agent transaction is independent, so users shall exit the corresponding agent rather than all agents as per the transaction hash of an agent.

- **Command: withdraw &lt;address&gt; &lt;txHash&gt; **

| Parameter            | Description                  |
| --------------- | ---------------------- |
| &lt;address&gt; | Account address, required         |
| &lt;txHash&gt;  | Transaction hash upon agency, required |

Return message, transaction hash upon exiting the consensus

```json
"00201d70ac37b53d41c0e813ad245fc42e1d3a5d174d9148fbbbaed3c18d4d67bdbf"
```

Example

```shell
nuls>>> withdraw NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 0020d349b7ad322ff958e3abfa799d9ac76341afa6e1fb4d3857353a5adc74ba3fd0
"00201d70ac37b53d41c0e813ad245fc42e1d3a5d174d9148fbbbaed3c18d4d67bdbf"
```



#### Stop node

Stop node, all NULS agented to node will be returned, and the deposit in account of node creator will be locked for 72 hours.

- **Command：stopagent &lt;address&gt; **

| Parameter            | Description          |
| --------------- | -------------- |
| &lt;address&gt; | Account address, required |

Return message, transaction hash of stop node

```json
"0020f15eecd7c85be76521ed6af4d58a3810f7df58e536481cff4a96af6d4fddec5f"
```

Example

```shell
nuls>>> stopagent Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
Please enter the password.
Enter your password:**********
"0020f15eecd7c85be76521ed6af4d58a3810f7df58e536481cff4a96af6d4fddec5f"
```



#### Get node details

Get node details as per agent hash of node

- **Command: getagent &lt;agentHash&gt; **

| Parameter               | Description                  |
| ----------------- | --------------------- |
| &lt;agentHash&gt; | Node agent hash, required |

Return message

```json
{
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",//Account address for creating node
  "packingAddress" : "NsdwvEJuPC3hA5ws7VQGwXN77vqsM1PA",//Node package (block) address
  "rewardAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",//Bonus address (default to be address for creating node)
  "deposit" : "20000",//Deposit for creating node
  "commissionRate" : 60.0,//Agent commission proportion
  "agentName" : null,//Node name (source)
  "agentId" : "35024DE6",//Node ID
  "time" : "2018-07-16 16:33:38",//Time for creating node
  "blockHeight" : 28141,// Block height of node creating transaction
  "delHeight" : -1,
  "status" : "consensus",// Status
  "creditVal" : 0.05,//Credit value
  "totalDeposit" : "208000",//Current total agency amount of node
  "txHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "memberCount" : 5//Quantity of participants
}
```

Example

```shell
nuls>>> getagent 0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6
{
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "packingAddress" : "NsdwvEJuPC3hA5ws7VQGwXN77vqsM1PA",
  "rewardAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "deposit" : "20000",
  "commissionRate" : 60.0,
  "agentName" : null,
  "agentId" : "35024DE6",
  "time" : "2018-07-16 16:33:38",
  "blockHeight" : 28141,
  "delHeight" : -1,
  "status" : "consensus",
  "creditVal" : 0.05,
  "totalDeposit" : "208000",
  "txHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "memberCount" : 5
}
```



#### Get list of nodes

As per list of consensus nodes

- **Command：getagents &lt;pageNumber&gt; &lt;pageSize&gt; **

| Parameter               | Description                             |
| ------------------ | -------------------------------- |
| &lt;pageNumber&gt; | Page, to get the data on which page, required |
| &lt;pageSize&gt;   |  Number of data displayed on each page, required      |

Return message

```json
[{
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",//Account address for creating node
  "packingAddress" : "NsdwvEJuPC3hA5ws7VQGwXN77vqsM1PA",//Node package (block) address
  "rewardAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",//Bonus address (default to be address for creating node)
  "deposit" : "20000",//Deposit for creating node
  "commissionRate" : 60.0,//Agent commission proportion
  "agentName" : null,//Node name (source)
  "agentId" : "35024DE6",//Node ID
  "time" : "2018-07-16 16:33:38",//Time for creating node
  "blockHeight" : 28141,//Block height of node creating transaction
  "delHeight" : -1,
  "status" : "consensus",//Status
  "creditVal" : 0.05,//Credit value
  "totalDeposit" : "208000",//Current total agent amount of node
  "txHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "memberCount" : 5//Quantity of participants
}]
```

Example

```shell
nuls>>> getagents 1 2
[ {
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "packingAddress" : "NsdwvEJuPC3hA5ws7VQGwXN77vqsM1PA",
  "rewardAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "deposit" : "20000",
  "commissionRate" : 60.0,
  "agentName" : null,
  "agentId" : "35024DE6",
  "time" : "2018-07-16 16:33:38",
  "blockHeight" : 28141,
  "delHeight" : -1,
  "status" : "consensus",
  "creditVal" : 0.18,
  "totalDeposit" : "208000",
  "txHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "memberCount" : 5
}, {
  "agentHash" : "00202ef1977c1eea6fde8d1bf8d75b6f5650d62933e5fccc2d8d08023dea5ce291d8",
  "agentAddress" : "NsdtEdrY4QWGa8VUGW83hXbZsbKhbrTN",
  "packingAddress" : "NsdwhLzjCLJp9V7zULU9KBerqkW971K7",
  "rewardAddress" : "NsdtEdrY4QWGa8VUGW83hXbZsbKhbrTN",
  "deposit" : "20000",
  "commissionRate" : 10.0,
  "agentName" : null,
  "agentId" : "5CE291D8",
  "time" : "2018-07-16 16:31:12",
  "blockHeight" : 28126,
  "delHeight" : -1,
  "status" : "consensus",
  "creditVal" : -0.16,
  "totalDeposit" : "208000",
  "txHash" : "00202ef1977c1eea6fde8d1bf8d75b6f5650d62933e5fccc2d8d08023dea5ce291d8",
  "memberCount" : 5
} ]
```



#### Get total information of network consensuses

Inquire total information of network consensuses

- **Command：getconsensus **

Return message

```json
{
  "agentCount" : 6,//Quantity of nodes
  "totalDeposit" : "1758000",//Total quantity of agents
  "rewardOfDay" : "0",//Bonus
  "consensusAccountNumber" : 6,//Quantity of consensus accounts
  "packingAgentCount" : 6//Quantity of package addresses
}
```

Example

```shell
nuls>>> getconsensus
{
  "agentCount" : 6,
  "totalDeposit" : "1758000",
  "rewardOfDay" : "0",
  "consensusAccountNumber" : 6,
  "packingAgentCount" : 6
}
```



####  Get general of agents in single account

Get the general of all agents (consensuses) information of the account based on account address

- **Command：getdepositedinfo &lt;address&gt; **

| Parameter           | Description           |
| --------------- | -------------- |
| &lt;address&gt; |Account address, required |

Return message

```json
{
  "agentCount" : 1,//Quantity of nodes created
  "totalDeposit" : "1600000",// Quantity of total agents
  "joinAgentCount" : 6,//Quantity of nodes in agency
  "usableBalance" : "8048998.869",//Available balance
  "reward" : "219.65910271",//Total bonuses gained
  "rewardOfDay" : "219.65910271",//Bonuses gained a day
  "agentHash" : "00202794351e662e53f16fe04dd9217731463c3b24a6ee6cf80c9ba2d3e5e09eb7fd"//Node hash
}
```

Example

```shell
nuls>>> getdepositedinfo Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
{
  "agentCount" : 1,
  "totalDeposit" : "1600000",
  "joinAgentCount" : 6,
  "usableBalance" : "8048998.869",
  "reward" : "219.65910271",
  "rewardOfDay" : "219.65910271",
  "agentHash" : "00202794351e662e53f16fe04dd9217731463c3b24a6ee6cf80c9ba2d3e5e09eb7fd"
}
```



#### Get list of agent information of single account

Get list of agent information of the account as per address (return consensus information list), and review the list of agency information of the account under a node when following the agent hash.

- **Command：getdepositeds &lt;address&gt; &lt;pageNumber&gt; &lt;pageSize&gt; [agentHash] **

| Parameter              | Description                             |
| ------------------ | -------------------------------- |
| &lt;address&gt;    | Account address, required                   |
| &lt;pageNumber&gt; | Page, to get the data on which page, required |
| &lt;pageSize&gt;   | Number of data displayed on each page, required      |
| [agentHash]        | Node hash, optional                   |

Return message

```json
[{
  "deposit" : "2000",//Agency amount
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "address" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",//Address of agent
  "time" : "2018-07-16 16:38:25",//Time
  "txHash" : "0020c93d039b57361a141470b3630c3cf6fa304b1acaeabb7a26a772f434d24de221",//Agency transaction hash
  "blockHeight" : 28148,//Block height of transaction
  "delHeight" : -1,
  "status" : "consensus",//Node status
  "agentName" : "35024DE6",//Node name
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh"//Node address
}]
```

Example

```shell
nuls>>> getdepositeds Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto 1 2
[ {
  "deposit" : "2000",
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "address" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",
  "time" : "2018-07-16 16:38:25",
  "txHash" : "0020c93d039b57361a141470b3630c3cf6fa304b1acaeabb7a26a772f434d24de221",
  "blockHeight" : 28148,
  "delHeight" : -1,
  "status" : "consensus",
  "agentName" : "35024DE6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh"
}, {
  "deposit" : "2000",
  "agentHash" : "00202794351e662e53f16fe04dd9217731463c3b24a6ee6cf80c9ba2d3e5e09eb7fd",
  "address" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",
  "time" : "2018-07-16 16:38:43",
  "txHash" : "00205278ce2eeaf9da7acc13ce81293a01a3f44a1de09e4e0b3ec078884a65700234",
  "blockHeight" : 28149,
  "delHeight" : -1,
  "status" : "consensus",
  "agentName" : "E09EB7FD",
  "agentAddress" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT"
} ]
```



#### Get list of agency nodes of single account

Inquire list of agency nodes asper address (return list of node information)

- **Command：getdepositedagents &lt;address&gt; &lt;pageNumber&gt; &lt;pageSize&gt; **

| Parameter               | Description                            |
| ------------------ | -------------------------------- |
| &lt;address&gt;    |Account address, required                  |
| &lt;pageNumber&gt; | Page, to get the data on which page, required |
| &lt;pageSize&gt;   | Number of data displayed on each page, required      |

Return message

```json
[ {
  "agentHash" : "0020617f9be18306fcdf95917fad80f4d15c51426667825ad5a6968ec0ee0198acaf",//Node hash
  "agentAddress" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",//Account address for creating node
  "packingAddress" : "Nse77VDHtiQ6WnkEhgCA7TbfNkoH9iyr",//Node package (block) address
  "rewardAddress" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",//Bonus address (default to be address for creating node)
  "deposit" : "20000",//Deposit for creating node
  "commissionRate" : 40.0,//Agent commission proportion
  "agentName" : null,//Node name (source)
  "agentId" : "0198ACAF",// Node ID
  "time" : "2018-07-16 16:32:52",//Time for creating node
  "blockHeight" : 28136,//Block height of node creating transaction
  "delHeight" : -1,
  "status" : "consensus",//Status
  "creditVal" : -0.91,//Credit value
  "totalDeposit" : "204000",//Current total agent amount of node
  "txHash" : "0020617f9be18306fcdf95917fad80f4d15c51426667825ad5a6968ec0ee0198acaf",
  "memberCount" : 3// Quantity of participants
}]
```

Example, to get page 1, display 2 items per page

```shell
nuls>>> getdepositedagents Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto 1 2
[ {
  "agentHash" : "0020617f9be18306fcdf95917fad80f4d15c51426667825ad5a6968ec0ee0198acaf",
  "agentAddress" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",
  "packingAddress" : "Nse77VDHtiQ6WnkEhgCA7TbfNkoH9iyr",
  "rewardAddress" : "Nse6UxwHXNEDsySTnZr4hNfGwFZwkDto",
  "deposit" : "20000",
  "commissionRate" : 40.0,
  "agentName" : null,
  "agentId" : "0198ACAF",
  "time" : "2018-07-16 16:32:52",
  "blockHeight" : 28136,
  "delHeight" : -1,
  "status" : "consensus",
  "creditVal" : -0.91,
  "totalDeposit" : "204000",
  "txHash" : "0020617f9be18306fcdf95917fad80f4d15c51426667825ad5a6968ec0ee0198acaf",
  "memberCount" : 3
}, {
  "agentHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "agentAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "packingAddress" : "NsdwvEJuPC3hA5ws7VQGwXN77vqsM1PA",
  "rewardAddress" : "Nsdy5AZmMkYQzQvfuEgVzwdmndnMYNmh",
  "deposit" : "20000",
  "commissionRate" : 60.0,
  "agentName" : null,
  "agentId" : "35024DE6",
  "time" : "2018-07-16 16:33:38",
  "blockHeight" : 28141,
  "delHeight" : -1,
  "status" : "consensus",
  "creditVal" : 0.91,
  "totalDeposit" : "208000",
  "txHash" : "0020d349117a35c3b9c1e64f442d7750aae941162018f9d8d4c1db57565235024de6",
  "memberCount" : 5
} ]
```



#### Get the latest block head information

Get the latest block head information

- **Command：getbestblockheader**

Return message

```json
{
  "hash" : "00206c4ae1d90fdfd875ee3bf84e72615db8bc628f015db089f8a6304ed46a47db5e",//Block hash
  "preHash" : "00207ec8c85a6844899806f55cd9223efa091b548e5cc093ee7833f1c0208254957d",//Former block hash
  "merkleHash" : "002019aff9431c5b409df7af48a64a50e4e9a0af24cc309d6eefa84deada2a438877",//Merkle hash
  "time" : "2018-07-17 10:25:40",//Block generation time
  "height" : 33950,//Block height
  "txCount" : 1,//Quantity of block package transactions
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",//Package address
  "roundIndex" : 668413,//Rounds of consensuses 
  "consensusMemberCount" : 1,//Quantity of participants in consensus
  "roundStartTime" : "2018-07-17 10:25:30",//Start time of current round
  "packingIndexOfRound" : 1,//Rank of package and block in current round
  "reward" : "0",//Consensus bonus 
  "fee" : "0",//Package service charge of block
  "confirmCount" : 0,//Times of confirmation
  "size" : 204,//Size of block
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100ece231eec6765c3d3cd7a4b74ef227eea05c3511e04ea46bc1b518a51a624e48022022208161b3064f261233bfa0c00308bf5b56421401ba7dd02232bac5077935b9"// Signature
}
```

Example

```shell
nuls>>> getbestblockheader
{
  "hash" : "00206c4ae1d90fdfd875ee3bf84e72615db8bc628f015db089f8a6304ed46a47db5e",
  "preHash" : "00207ec8c85a6844899806f55cd9223efa091b548e5cc093ee7833f1c0208254957d",
  "merkleHash" : "002019aff9431c5b409df7af48a64a50e4e9a0af24cc309d6eefa84deada2a438877",
  "time" : "2018-07-17 10:25:40",
  "height" : 33950,
  "txCount" : 1,
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",
  "roundIndex" : 668413,
  "consensusMemberCount" : 1,
  "roundStartTime" : "2018-07-17 10:25:30",
  "packingIndexOfRound" : 1,
  "reward" : "0",
  "fee" : "0",
  "confirmCount" : 0,
  "size" : 204,
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100ece231eec6765c3d3cd7a4b74ef227eea05c3511e04ea46bc1b518a51a624e48022022208161b3064f261233bfa0c00308bf5b56421401ba7dd02232bac5077935b9"
}
```



#### Inquire block information

Inquire block head information as per block height or block hash. Do and only choose one parameter as inquiry condition.

- **Command：getblock &lt;hash&gt; | &lt;height&gt; **

| Parameter            | Description         |
| -------------- | ------------ |
| &lt;hash&gt;   | Block hash |
| &lt;height&gt; | Height of block   |

Return message

```json
{
  "hash" : "0020c40f471756c88e7487fcc0d428545232120071b58f35e450891237d7b41eb817",//Block hash
  "preHash" : "0020fb1fd03cda7e2b6585256f4da85bdac7d8fc8bafa0740b8eb0ed577f3020b954",//Former block hash
  "merkleHash" : "0020474c5a353f235e8e8514328e1e98d6b653d4a5445473d160691e39121cd8b158",//Merkle hash
  "time" : "2018-07-16 16:29:30",//Block generation time
  "height" : 28115,//Block height
  "txCount" : 2,//Quantity of block package transactions
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",//Package address
  "roundIndex" : 662578,//Rounds of consensuses 
  "consensusMemberCount" : 1,//Quantity of participants in consensus
  "roundStartTime" : "2018-07-16 16:29:20",//Start time of current round
  "packingIndexOfRound" : 1,//Rank of package and block in current round
  "reward" : "0.001",//Consensus bonus 
  "fee" : "0.001",//Package service charge of block
  "confirmCount" : 6174,//Times of confirmation
  "size" : 507,//Size of block
  "txList" : [ {//Transaction collection
    "hash" : "0020648f1d25237ba3614237a52c2121e51608f3822ac57a0e67d6a53e84c867e841",//Transaction hash
    "type" : "coinbase",//Transaction type
    "time" : "2018-07-16 16:29:30",//Transaction time
    "blockHeight" : 28115,//Block height of transaction
    "fee" : "0",//Transaction service charge
    "value" : null,
    "remark" : null,
    "scriptSig" : null,
    "status" : "confirm",
    "confirmCount" : 6174,
    "size" : 54,
    "inputs" : [ ],//Transaction input
    "outputs" : [ //Transaction output
        {
          "address" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",
          "value" : 100000,
          "lockTime" : 29115
        }
    ]
  }],
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100d25b815fa30376247692fad856d3984acf45c9b49edd3d222e3afdab3169520c02200565a486e33358301848bf3d704c187ff8b2d1e859c93b704f713abb984584bf"//Signature
}
```

Example: to get block as per height

```shell
nuls>>> getblock 28115
{
  "hash" : "0020c40f471756c88e7487fcc0d428545232120071b58f35e450891237d7b41eb817",
  "preHash" : "0020fb1fd03cda7e2b6585256f4da85bdac7d8fc8bafa0740b8eb0ed577f3020b954",
  "merkleHash" : "0020474c5a353f235e8e8514328e1e98d6b653d4a5445473d160691e39121cd8b158",
  "time" : "2018-07-16 16:29:30",
  "height" : 28115,
  "txCount" : 2,
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",
  "roundIndex" : 662578,
  "consensusMemberCount" : 1,
  "roundStartTime" : "2018-07-16 16:29:20",
  "packingIndexOfRound" : 1,
  "reward" : "0.001",
  "fee" : "0.001",
  "confirmCount" : 6174,
  "size" : 507,
  "txList" : [ {
    "hash" : "0020648f1d25237ba3614237a52c2121e51608f3822ac57a0e67d6a53e84c867e841",
    "type" : "coinbase",
    "time" : "2018-07-16 16:29:30",
    "blockHeight" : 28115,
    "fee" : "0",
    "value" : null,
    "remark" : null,
    "scriptSig" : null,
    "status" : "confirm",
    "confirmCount" : 6174,
    "size" : 54,
    "inputs" : [ ],
    "outputs" : [ {
      "address" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",
      "value" : 100000,
      "lockTime" : 29115
    } ]
  }, {
    "hash" : "0020217945b6804801e0860913d24bf1ca500f9b77518a2be190c1afe63334b3ee2b",
    "type" : "transfer",
    "time" : "2018-07-16 16:29:27",
    "blockHeight" : 28115,
    "fee" : "0.001",
    "value" : null,
    "remark" : null,
    "scriptSig" : "2103f68aeb83f3a4fdf9b49259a6e8eae97cf73c7a0a1c52da8a1f9c09312a6d3c53004730450221008a78bd954ea2f0f5be72217f0858faaf408b2e70f8d4d5aebc9ead9eb6e3aa22022015305c46eab978b08fbc23608c064306ea150be6552bb51cc83badef68217663",
    "status" : "confirm",
    "confirmCount" : 6174,
    "size" : 249,
    "inputs" : [ {
      "fromHash" : "0020f98434eb71e62bfda9a2708689c2f44b58f5b22299490f5956c35d54f2d48459",
      "fromIndex" : 1,
      "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",
      "value" : 972899896100000
    } ],
    "outputs" : [ {
      "address" : "NsdxeBuwQBStXHQ6mcaHyDpnTKijD5ne",
      "value" : 3000000000000,
      "lockTime" : 0
    }, {
      "address" : "Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT",
      "value" : 969899896000000,
      "lockTime" : 0
    } ]
  } ],
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100d25b815fa30376247692fad856d3984acf45c9b49edd3d222e3afdab3169520c02200565a486e33358301848bf3d704c187ff8b2d1e859c93b704f713abb984584bf"
}
```



#### Inquire block head information

Inquire block head information as per block height or block hash. Do and only choose one parameter as inquiry condition.

- **Command：getblockheader &lt;hash&gt; | &lt;height&gt; **

| Parameter           | Description      |
| -------------- | ------------ |
| &lt;hash&gt;   | Block hash |
| &lt;height&gt; | Block height   |

Return message

```json
{
  "hash" : "0020c40f471756c88e7487fcc0d428545232120071b58f35e450891237d7b41eb817",//Block hash
  "preHash" : "0020fb1fd03cda7e2b6585256f4da85bdac7d8fc8bafa0740b8eb0ed577f3020b954",//Former block hash
  "merkleHash" : "0020474c5a353f235e8e8514328e1e98d6b653d4a5445473d160691e39121cd8b158",//Merkle hash
  "time" : "2018-07-16 16:29:30",//Block generation time
  "height" : 28115,//Block height
  "txCount" : 2,//Quantity of block package transactions
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",//Package address
  "roundIndex" : 662578,//Rounds of consensuses
  "consensusMemberCount" : 1,//Quantity of participants in consensus
  "roundStartTime" : "2018-07-16 16:29:20",//Start time of current round
  "packingIndexOfRound" : 1,//Rank of package and block in current round
  "reward" : "0.001",//Consensus bonus 
  "fee" : "0.001",//Package service charge of block
  "confirmCount" : 6174,//Times of confirmation
  "size" : 507,//Size of block
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100d25b815fa30376247692fad856d3984acf45c9b49edd3d222e3afdab3169520c02200565a486e33358301848bf3d704c187ff8b2d1e859c93b704f713abb984584bf"//Signature
}
```

Example: to get block as per height

```shell
nuls>>> getblockheader 28115
{
  "hash" : "0020c40f471756c88e7487fcc0d428545232120071b58f35e450891237d7b41eb817",
  "preHash" : "0020fb1fd03cda7e2b6585256f4da85bdac7d8fc8bafa0740b8eb0ed577f3020b954",
  "merkleHash" : "0020474c5a353f235e8e8514328e1e98d6b653d4a5445473d160691e39121cd8b158",
  "time" : "2018-07-16 16:29:30",
  "height" : 28115,
  "txCount" : 2,
  "packingAddress" : "NsdyF8gBxAfxCyiNbLzsENUvbJZ27mWw",
  "roundIndex" : 662578,
  "consensusMemberCount" : 1,
  "roundStartTime" : "2018-07-16 16:29:20",
  "packingIndexOfRound" : 1,
  "reward" : "0.001",
  "fee" : "0.001",
  "confirmCount" : 6280,
  "size" : 204,
  "scriptSig" : "210381e44e0c2fffadc94603a41514f3e5b1c5fd53166be73eb8f49ce8c297059e5600473045022100d25b815fa30376247692fad856d3984acf45c9b49edd3d222e3afdab3169520c02200565a486e33358301848bf3d704c187ff8b2d1e859c93b704f713abb984584bf"
}
```



####  Inquire network information

Inquire network basic information

- **Command：getnetinfo **

Return message

```json
{
  "localBestHeight" : 35317,//Height of local latest block
  "netBestHeight" : 35317,//Height of latest block online
  "timeOffset" : "0ms",//Offset of network time
  "inCount" : 0,//Quantity of passive connecting nodes
  "outCount" : 1//Quantity of active connecting nodes
}
```

Example

```shell
nuls>>> getnetinfo
{
  "localBestHeight" : 35317,
  "netBestHeight" : 35317,
  "timeOffset" : "0ms",
  "inCount" : 0,
  "outCount" : 1
}
```



#### Inquire network node IP

Inquire network node IP

- **Command: getnetnodes **

Return message

```json
[ "192.168.1.223" ]
```

Example: get block as per height

```shell
nuls>>> getnetnodes
[ "192.168.1.223" ]
```



#### Inquire current version information

Inquire current version number

- **Command：version **

Return message

```json
[ "192.168.1.223" ]
```

Example

```shell
nuls>>> version
{
  "myVersion" : "1.0.0",
  "newestVersion" : "0.9.11",
  "upgradable" : false,
  "infromation" : " Address format modification, node finding logic optimizing, block downloading logic optimizing, property and stability optimizing"
}
```



#### Version update

Inquire current version number

- **Command：upgrade &lt;version&gt; **

Example

```shell
nuls>>> version 1.0.0
```



#### Exit wallet command program

Exiting from wallet command line program does not mean exiting from wallet node started.

- **Command：exit**

Example

```shell
nuls>>> exit
```
