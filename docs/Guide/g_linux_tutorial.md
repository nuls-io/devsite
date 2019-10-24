# Linux CLI Manual

## Introduction

This section is a guide for the use of the full node wallet for the Linux version, it will show how to create accounts, import accounts, transfer, and create nodes or stake, etc. It's assumed you have at least basic skills administering Linux operating systems which is the recommended system to create stable NULS nodes.

## Version history

| Versions |    Date    | Contents |
| :------: | :--------: | :------: |
|  V0.9.0  | 2018-03-18 |  alpha   |
|  V0.9.1  | 2019-07-08 |   Beta   |
|  V1.0.0  | 2019-09-08 |  Mainnet |

## Preparation

### Server hardware configuration

**Minimum requirements:**

|      CPU       | Memory | Disk space |   Bandwidth   |
| :------------: | :----: | :--------: | :-----------: |
| 4-Core 3.0 GHz |  16GB  |   128GB    | 20Mbps uplink |

**Recommended requirements:**

|      CPU       | Memory | Disk space |   Bandwidth    |
| :------------: | :----: | :--------: | :------------: |
| 8-core 3.0 GHz |  32GB  |   256GB    | 100Mbps uplink |

### System and kernel version

**Linux system**

- CentOS 6, 7

The Linux kernel version is recommended to use 2.6.32 and above

## Get started

### Download

- Access NULS official website for the latest version of full node wallet: http://nuls.io/wallet.com; GitHub link: https://github.com/nuls-io/nuls-wallet-release
- After entering the interface of [NULS official wallet download](http://nuls.io/wallet), select Linux version. MEGA and Baidu Cloud Disk are available for your choice.

To download Beta wallet using a Linux system, you can type the following command:

```shell
  $wget http://nuls-usa-west.oss-us-west-1.aliyuncs.com/2.0/NULS-Wallet-linux64-beta1-main.tar.gz
```

Note: the download address may be different if there are subsequent versions.

### Installation

- Extract the downloaded file in Linux:

```shell
  $ tar -zxf NULS-Wallet-linux64-beta1-main.tar.gz
```

### Run

- Enter the extracted directory and run the boot script to start the full node wallet

```shell
  $ cd NULS-Wallet-linux64-beta1
  $ ./start
```

## Use wallet

### Quick start

- After confirming that the wallet has been started, execute the command line program to operate the wallet.

Enter the cmdclient/1.0.0 directory and execute the following command:

```shell
  $ cd cmdclient/1.0.0
  $ ./cmd.sh
```

At this point, you can see the input prompt `nuls>>>  `, now you can directly type NULS commands to operate the wallet.
For example, to create an account you should type the following command:

```shell
  nuls>>> create
  Please enter the new password(8-20 characters, the combination of letters and numbers).
  Enter your password:*********
  Please confirm new password:*********      
  [ "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8" ]
```

Command ` create ` generates a single account, next enter your password and confirm the new password. If successful, the address of the account will be returned.

## Conventions

- Password rules: password length varies from 8 to 20 and must contain both letters and digits.
- Command parameter description: 
  < Parameter> required parameter.
  [parameter] optional parameter.
  " |" means 'or' logical operator, namely you can choose either the previous parameter or the latter.

## Wallet commands

### Help command

Print all valid commands,

- **command: help [-a]|[group]|[command]**

| Parameter | Description                                                  |
| :-------- | :----------------------------------------------------------- |
| -a        | format the printed command, optional                         |
| command   | view instructions for the specific command                   |
| group     | view all instructions for the commands in the specific command group |

Return: help

```json
getaccount <address> --get account information
```

Return: help -a

```json
getaccount <address> --get account information
    OPTIONS:
    <address> the account address - Required
```

Example

```shell
nuls>>> help
nuls>>> help -a
nuls>>> help account
nuls>>> help create
```

### Create an account

Create an account and return the set of account addresses

- **command: create [number]**

| Parameter                                                    | Description |
| :----------------------------------------------------------- | :---------- |
| [number] the number of accounts you want to create, optional |             |

When creating an account, you are required to enter the password for the account. A password must be set to ensure the security of the assets.

Return: accounts set

```json
[ "tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm", "tNULSeBaMhUKHmueWB1h87vpWr62vrAjPshwTs", "tNULSeBaMvXiStrcQc4SF3rWGS8fyPqhUQXoS4" ]

```

Example

Create a single account

```shell
nuls>>> create 
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:**********
Please confirm new password:**********
[ "tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8" ]

```

Create multiple accounts at once

```
nuls>>> create 3
Please enter the new password(8-20 characters, the combination of letters and numbers).
Enter your new password:**********
Please confirm new password:**********
[ "tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm", "tNULSeBaMhUKHmueWB1h87vpWr62vrAjPshwTs", "tNULSeBaMvXiStrcQc4SF3rWGS8fyPqhUQXoS4" ]

```

### Back up account

To back up an account, a file named as the account address with the extension .keystore is generated, which is the backup file for the account

- **command: backup &lt;address&gt; [path]** 

| Parameter       | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| &lt;address&gt; | account address, required                                    |
| [path]          | the directory where the generated backup file is included, current directory by default, optional |

Return 

```shell
The path to the backup file is /home/nuls2/nuls-v2/tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm.keystore

```

Example: backup an account with a password

```
  shell
  nuls>>> backup tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm /home/nuls2/nuls-v2/NULS-Wallet-linux64-beta1
  Please enter the password.
  Enter your password:********
  The path to the backup file is /home/nuls2/nuls-v2/tNULSeBaMmhBVJnJqcB7S7gKsPEoikZo2W89pm.keystore

```

### Remove account

Enter the password to remove a local account based on the account address

- **command: remove &lt;address&gt;**

| Parameter       | Description               |
| --------------- | ------------------------- |
| &lt;address&gt; | account address, required |

Return

```json
Success

```

Example

```shell
nuls>>> remove tNULSeBaMhUKHmueWB1h87vpWr62vrAjPshwTs
Please enter the password.
Enter your password:********
Success

```

### Modify account password

Set a new password according to the account address and password.

- **command：resetpwd &lt;address&gt;**

| Parameter       | Description               |
| --------------- | ------------------------- |
| &lt;address&gt; | account address, required |

Return

```json
Success

```

Example

```shell
nuls>>> resetpwd tNULSeBaMvXiStrcQc4SF3rWGS8fyPqhUQXoS4
Enter your old password:********
Enter new password*********
Please confirm new password:*********

```

### Set alias

Set an alias to the account. If a node is created with this account, its alias will be displayed as the node source

- **command: setalias &lt;address&gt; &lt;alias&gt;**

| Parameter       | Description               |
| --------------- | ------------------------- |
| &lt;address&gt; | account address, required |
| &lt;alias&gt;   | alias name, required      |

Return: transaction hash

```json
txHash:0020f94f36aefd59f9cca9bff3c018fc287dc6c0bcd7fbeb047133cadb5747e7d98d"

```

Example

```shell
nuls>>> setalias tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8 nuls
Enter your account password**********
txHash:0020830971e02527f18f8f9e32f974d8c73ce6bd249de859cae170476b87d0ec9582

```

### Import account keystore

Import the account keystore file to recover a local account. The operation is not executed if the local account already exists locally.

- **command: importkeystore &lt;path&gt;**

| Parameter    | Description                                        |
| ------------ | -------------------------------------------------- |
| &lt;path&gt; | path of the keystore file to be imported, required |

Note: the original password is required to import the keystore file and recover the account

Return: address of the imported account

```json
"tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8"

```

Example

```shell
nuls>>>importkeystore /home/nuls2/nuls-v2/tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8.keystore
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:**********
tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8

```

### Import account private key

Import the account private key to generate a local account, overwritten if the local account already exists. You are required to set a password for the account when importing. This function can be used to retrieve the account through the private key if you forget the account password.

- **command: import &lt;privatekey&gt;**

| Parameter          | Description                     |
| ------------------ | ------------------------------- |
| &lt;privatekey&gt; | account's private key, required |

```json
"NsdyM1Ls5qw8wutvAQsr93jxgq8qYAZy"

```

Example

```shell
nuls>>> import 74ca3facb66e5e9f2b78e86507d1f36cf601bc3de1d5f5e5b515c4f995d53873
Please enter the password (password is between 8 and 20 inclusive of numbers and letters), If you do not want to set a password, return directly.
Enter your password:********
Please confirm new password:********
tNULSeBaMjxVA6QijNXjEf3RYxwTbTLSqXvpa8

```

### Query account information

Query account information with the account address

- **command: getaccount &lt;address&gt;**

| Parameter       | Description               |
| --------------- | :------------------------ |
| &lt;address&gt; | account address, required |

Return

```json
{
  "encryptedPrikeyHex" : "724d68268849f3680d480c9257f33229c0fac88890d5355c0e4d9c457af5c6e8b8f9f7ca9fd52fbd8079fbce1782052d",  // the encrypted private key
  "alias" : "zlj",  // alias
  "balance" : {  
    "freeze" : 0,   // frozen assets 
    "total" : 997999999800000,     // total assets
    "available" : 997999999800000  // usable assets 
  },
  "address" : "5MR_2CeG11nRqx7nGNeh8hTXADibqfSYeNu",  // account address
  "pubkeyHex" : "0211c45f28710cd26a2c45fb790895a0ff2e095a290f1825b31d80ebc30913c486" //public key
}

```

Example

```shell
nuls>>> getaccount 5MR_2CeG11nRqx7nGNeh8hTXADibqfSYeNu
{
  "encryptedPrikeyHex" : "724d68268849f3680d480c9257f33229c0fac88890d5355c0e4d9c457af5c6e8b8f9f7ca9fd52fbd8079fbce1782052d",  //encrypted private key 
  "alias" : "zlj",  //alias
  "balance" : {  
    "freeze" : 0,   // frozen assets
    "total" : 997999999800000,     // total assets
    "available" : 997999999800000  // usable assets
  },
  "address" : "5MR_2CeG11nRqx7nGNeh8hTXADibqfSYeNu",  // account address
  "pubkeyHex" : "0211c45f28710cd26a2c45fb790895a0ff2e095a290f1825b31d80ebc30913c486" // encrypted public key 
}

```

### Query account list

Query the account list with the paging parameters and return all accounts in descending order by creation time.

- **command: getaccounts &lt;pageNumber&gt; &lt;pageSize&gt;**

| Parameter          | Description                                        |
| ------------------ | -------------------------------------------------- |
| &lt;pageNumber&gt; | page number indicating the page to query, required |
| &lt;pageSize&gt;   | number of rows displayed per page, required        |

Return: accounts set

```json
[ {
  "address" : "5MR_2CeG11nRqx7nGNeh8hTXADibqfSYeNu",  //address
  "alias" : null,  //alias
  "pubkeyHex" : "0211c45f28710cd26a2c45fb790895a0ff2e095a290f1825b31d80ebc30913c486",  //public key
  "encryptedPrikeyHex" : "724d68268849f3680d480c9257f33229c0fac88890d5355c0e4d9c457af5c6e8b8f9f7ca9fd52fbd8079fbce1782052d"  //private key
}, {
  "address" : "5MR_2CetN1KeWAVsaUsqD7JwMBwjGuRGpGW",
  "alias" : null,
  "pubkeyHex" : "0205a70731e7653eca328ba7d71f0a789f8cfb1ced32f5a00d4fc3fb2ad8b9f7c1",
  "encryptedPrikeyHex" : "e38d2dd08154a0eedf8298f5fe50b86723e521522f38aba5c68072bad365c3e8c57d7ac3ae83f8d646a17f845a38bc57"
}, {
  "address" : "5MR_2CXrzwoCoP4vnUxHJ5gdUUXZJhCpjq9",
  "alias" : "zlj",
  "pubkeyHex" : "03021a46a7e5ea59ae8884340568e9e79511fbd352b4ba28db39f15856918cdbeb",
  "encryptedPrikeyHex" : "bfbfdad874f74215e241ad15152d8648925c497b6a826965f5c06c46fd9b008313e6918ebcfcb56f2cdf8d1b9f088f77"
} ]

```

Example: get all accounts list

```shell
nuls>>> getaccounts
[ {
  "address" : "5MR_2CeG11nRqx7nGNeh8hTXADibqfSYeNu",  //address
  "alias" : null,  //alias
  "pubkeyHex" : "0211c45f28710cd26a2c45fb790895a0ff2e095a290f1825b31d80ebc30913c486",  //encrypted public key
  "encryptedPrikeyHex" : "724d68268849f3680d480c9257f33229c0fac88890d5355c0e4d9c457af5c6e8b8f9f7ca9fd52fbd8079fbce1782052d"  //encrypted private key
}, {
  "address" : "5MR_2CetN1KeWAVsaUsqD7JwMBwjGuRGpGW",
  "alias" : null,
  "pubkeyHex" : "0205a70731e7653eca328ba7d71f0a789f8cfb1ced32f5a00d4fc3fb2ad8b9f7c1",
  "encryptedPrikeyHex" : "e38d2dd08154a0eedf8298f5fe50b86723e521522f38aba5c68072bad365c3e8c57d7ac3ae83f8d646a17f845a38bc57"
}, {
  "address" : "5MR_2CXrzwoCoP4vnUxHJ5gdUUXZJhCpjq9",
  "alias" : "zlj",
  "pubkeyHex" : "03021a46a7e5ea59ae8884340568e9e79511fbd352b4ba28db39f15856918cdbeb",
  "encryptedPrikeyHex" : "bfbfdad874f74215e241ad15152d8648925c497b6a826965f5c06c46fd9b008313e6918ebcfcb56f2cdf8d1b9f088f77"
} ]

```

### Query account's private key

Query the account’s private key with the account address and password

- **command: getprikey &lt;address&gt;** 

| Parameter       | Description               |
| --------------- | ------------------------- |
| &lt;address&gt; | account address, required |

Return: the private key of the imported account (unencrypted)

```json
00a166d10c2cc4cd8f76449ff699ab3eee44fe4f82b4bb866f7bba02751a6fd655

```

Example

```shell
nuls>>> getprikey 5MR_2CXrzwoCoP4vnUxHJ5gdUUXZJhCpjq9
Enter your account password**********
7b4d3ec971fc01ea813b52f6c35091d43beac4a68550bae2db63975149244678

```

### Query account balance

Query account balance with the account address

- **command: getbalance &lt;address&gt;**

| Parameter       | Description               |
| --------------- | ------------------------- |
| &lt;address&gt; | account address, required |

Return: the address of the imported account

```json
{
"total": "9999998.99",// balance
"freeze": "0", // locked balance
"available": "9999998.99"// usable balance
}

```

Example

```shell
nuls>>> getbalance Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT
{
  "total" : "9999998.99",
  "freeze" : "0",
  "available" : "9999998.99"
}

```

### Transfer

Transfer NULS to the specific account with the account address

- **command：transfer &lt;formAddress&gt;|&lt;formAlias&gt; &lt;toAddress&gt;|&lt;toAlias&gt; &lt;amount&gt; [remark]**

| Parameter           | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| &lt;fromAddress&gt; | sender address(Select any item with the fromAlias)         |
| &lt;fromAlias&gt;   | sender address alias(Select any item with the fromAddress) |
| &lt;toAddress&gt;   | receiver address(Select any item with the toAlias)         |
| &lt;toAlias&gt;     | receiver address(Select any item with the toAddress)       |
| &lt;amount&gt;      | transfer amount, required                                  |
| [remark]            | remark, optional                                           |

Return: transfer transaction hash

```json
"00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596"

```

Example

```shell
nuls>>> transfer Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 100 transfer
Please enter the password.
Enter your password: *********
"00200bef73ad728c48146c8a5eb0d76fe7325b85803c61d8357c16dba09ea33b3596"

```

### Query transaction details

Query the transaction details with the transaction hash

- **command: gettx &lt;hash&gt;**

| Parameter    | Description                |
| ------------ | -------------------------- |
| &lt;hash&gt; | transaction hash, optional |

Return: transaction details

```json
{
  "type" : 2,  //transaction type (refer to the table below for Enumeration type description [Enumeration type])
  "coinData" : "ARc5MAGYBT3XNVp+BIuhGvGcejuTev8DODkwAQCgZ/cFAAAAAAAAAAAAAAAACO/WnDT4pvmsAAEXOTABL/80LO1f8vxvfNXc5l9eeIDTGKM5MAEAAOH1BQAAAAAAAAAAAAAAAAA=",
  "txData" : null,
  "time" : 1552979783918,
  "transactionSignature" : "IQIRxF8ocQzSaixF+3kIlaD/LglaKQ8YJbMdgOvDCRPEhgBGMEQCICdnNr3HqEg/UZZ6RLBHyGuPChoLdMtcOHXT3Xlb5SC3AiBGAWSPGH3yjtEkaVbLsI5n9UcqDvOfG3Ui1jf672IDCg==",
  "remark" : "6L2s6LSm",
  "hash" : {
    "digestAlgType" : 0,
    "digestBytes" : "CivAIHpVyqNr/h87/FWk7vXsXqBekHJ+3kQc5mZp+H8=", 
    "digestHex" : "00200a2bc0207a55caa36bfe1f3bfc55a4eef5ec5ea05e90727ede441ce66669f87f" 
  },
  "blockHeight" : 341,   //block height
  "status" : "CONFIRMED",  //confirmation state
  "size" : 225,
  "inBlockIndex" : 0,
  "coinDataInstance" : {  
    "from" : [ {
      "address" : "OTABmAU91zVafgSLoRrxnHo7k3r/Azg=",
      "assetsChainId" : 12345,
      "assetsId" : 1,
      "amount" : 100100000,
      "nonce" : "79acNPim+aw=",
      "locked" : 0
    } ],
    "to" : [ {
      "address" : "OTABL/80LO1f8vxvfNXc5l9eeIDTGKM=",
      "assetsChainId" : 12345,
      "assetsId" : 1,
      "amount" : 100000000,
      "lockTime" : 0
    } ]
  },
  "fee" : 100000,  //fee
  "multiSignTx" : false
}

```

Example: query transfer transaction

```shell
nuls>>> gettx 00200a2bc0207a55caa36bfe1f3bfc55a4eef5ec5ea05e90727ede441ce66669f87f
{
  "type" : 2,  //transaction type (refer to the table below for Enumeration type description [Enumeration type])
  "coinData" : "ARc5MAGYBT3XNVp+BIuhGvGcejuTev8DODkwAQCgZ/cFAAAAAAAAAAAAAAAACO/WnDT4pvmsAAEXOTABL/80LO1f8vxvfNXc5l9eeIDTGKM5MAEAAOH1BQAAAAAAAAAAAAAAAAA=",
  "txData" : null,
  "time" : 1552979783918,
  "transactionSignature" : "IQIRxF8ocQzSaixF+3kIlaD/LglaKQ8YJbMdgOvDCRPEhgBGMEQCICdnNr3HqEg/UZZ6RLBHyGuPChoLdMtcOHXT3Xlb5SC3AiBGAWSPGH3yjtEkaVbLsI5n9UcqDvOfG3Ui1jf672IDCg==",
  "remark" : "6L2s6LSm",
  "hash" : {
    "digestAlgType" : 0,
    "digestBytes" : "CivAIHpVyqNr/h87/FWk7vXsXqBekHJ+3kQc5mZp+H8=", 
    "digestHex" : "00200a2bc0207a55caa36bfe1f3bfc55a4eef5ec5ea05e90727ede441ce66669f87f" 
  },
  "blockHeight" : 341,   //block height
  "status" : "CONFIRMED",  //confirmation state
  "size" : 225,
  "inBlockIndex" : 0,
  "coinDataInstance" : {  
    "from" : [ {
      "address" : "OTABmAU91zVafgSLoRrxnHo7k3r/Azg=",
      "assetsChainId" : 12345,
      "assetsId" : 1,
      "amount" : 100100000,
      "nonce" : "79acNPim+aw=",
      "locked" : 0
    } ],
    "to" : [ {
      "address" : "OTABL/80LO1f8vxvfNXc5l9eeIDTGKM=",
      "assetsChainId" : 12345,
      "assetsId" : 1,
      "amount" : 100000000,
      "lockTime" : 0
    } ]
  },
  "fee" : 100000,  //fee
  "multiSignTx" : false
}

```

#### Enumeration type description

```
/** coinbase transaction*/
    int TX_TYPE_COINBASE = 1;
    /** transfer */
    int TX_TYPE_TRANSFER = 2;
    /** set alias */
    int TX_TYPE_ALIAS = 3;
    /** create consensus node */
    int TX_TYPE_REGISTER_AGENT = 4;
    /** agent (join consensus) */
    int TX_TYPE_JOIN_CONSENSUS = 5;
    /** cancel agent (cancel consensus)*/
    int TX_TYPE_CANCEL_DEPOSIT = 6;
    /** yellow punish */
    int TX_TYPE_YELLOW_PUNISH = 7;
    /** red punish */
    int TX_TYPE_RED_PUNISH = 8;
    /** stop node (stop consensus node)*/
    int TX_TYPE_STOP_AGENT = 9;
    /** cross-chain transfer */
    int TX_TYPE_CROSS_CHAIN_TRANSFER = 10;
    /** register chain */
    int TX_TYPE_REGISTER_CHAIN_AND_ASSET = 11;
    /** destroy chain*/
    int TX_TYPE_DESTROY_CHAIN_AND_ASSET = 12;
    /** add asset to chain*/
    int TX_TYPE_ADD_ASSET_TO_CHAIN = 13;
    /** remove asset from chain*/
    int TX_TYPE_REMOVE_ASSET_FROM_CHAIN = 14;
    /** create contract */
    int TX_TYPE_CREATE_CONTRACT = 100;
    /** call contract */
    int TX_TYPE_CALL_CONTRACT = 101;
    /** delete contract*/
    int TX_TYPE_DELETE_CONTRACT = 102;

```

### Transfer using account alias

Transfer to an external address with an account alias

- **command: transfer &lt;address&gt; &lt;toAddress&gt; &lt;amount&gt; [remark]**

| Parameter         | Description                |
| ----------------- | -------------------------- |
| &lt;address&gt;   | sender address, required   |
| &lt;toAddress&gt; | receiver address, required |
| &lt;amount&gt;    | transfer amount, required  |
| [remark]          | remark, optional           |

Return: transaction hash

```
00205315329f62824b3fae1675ef9419ae7dd097d6609d61df4b1345f9481f7c8be3

```

Example: transfer 10,000 NULS to external address through alias "zlj"

```
nuls>>> transfer zlj 5MR_2CeG11nRqx7nGNeh8hTXADibqfSYeNu 10000
Enter your account password**********
00205315329f62824b3fae1675ef9419ae7dd097d6609d61df4b1345f9481f7c8be3

```

### Create agent node

To create an agent node, two addresses are required, the first one is the node address, on which you need to provide the password for the node account, the other is the package address, and no password is required. Meanwhile, you’re required to offer no less than 20,000 NULS as a deposit. 

- **command: createagent &lt;agentAddress&gt; &lt;packingAddress&gt; &lt;commissionRate&gt; &lt;deposit&gt;**

| Parameter              | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| &lt;agentAddress&gt;   | account address to create a node, required                   |
| &lt;packingAddress&gt; | account address of the packaging node, required (note: the account should be password-less, otherwise the node cannot package to generate blocks) |
| &lt;commissionRate&gt; | agent commission ratio with a range from 10 to 100, required |
| &lt;deposit&gt;        | deposit to create a node, no less than 20000 NULS, required  |

Return: agent hash of the node

```json
"002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e"

```

Example: create a node with a commission rate of 10% and a deposit of 20,000 NULS.

```shell
nuls>>> createagent Nse2TpVsJd4gLoj79MAY8NHwEsYuXwtT NsdvAnqc8oEiNiGgcp6pEusfiRFZi4vt 10 20000
Please enter the password.
Enter your password: **********
"002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e"

```

### Join consensus (agent node)

Join consensus by account address and node agentHash, which requires at least 2,000NULS

- **command: deposit &lt;address&gt; &lt;agentHash&gt; &lt;deposit&gt;**

| Parameter         | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| &lt;address&gt;   | account address, required                                    |
| &lt;agentHash&gt; | agentHash of the node, optional                              |
| &lt;deposit&gt;   | deposit required to join consensus, no less than 2000NULS, required |

Return: the hash of the transaction to join consensus, which is needed to cancel the consensus.

```json
"0020d349b7ad322ff958e3abfa799d9ac76341afa6e1fb4d3857353a5adc74ba3fd0"

```

Example

```shell
nuls>>> deposit NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 002006a5b7eb1d32ed6d7d54e24e219b112d4fdb8530db5506ee953b6f65a0fdb55e 5000
"0020d349b7ad322ff958e3abfa799d9ac76341afa6e1fb4d3857353a5adc74ba3fd0"

```

### Cancel consensus (cancel agent)

Cancel consensus (agent) according to the account address and the hash of the transaction generated when joining the consensus. When a single account joins consensus on agent nodes multiple times, each agent transaction is independent, so to cancel consensus, the agent can only be canceled by the corresponding transaction hash of the single agent, rather than cancel all the agents at one time.

- **command: withdraw &lt;address&gt; &lt;txHash&gt;**

| Parameter       | Description                             |
| --------------- | --------------------------------------- |
| &lt;address&gt; | account address, required               |
| &lt;txHash&gt;  | hash of the agent transaction, required |

Return: transaction hash used to cancel consensus

```json
"00201d70ac37b53d41c0e813ad245fc42e1d3a5d174d9148fbbbaed3c18d4d67bdbf"

```

Example

```shell
nuls>>> withdraw NsdtmV5XkgSdpBXi65ueTsrv2W5beV2T 0020d349b7ad322ff958e3abfa799d9ac76341afa6e1fb4d3857353a5adc74ba3fd0
"00201d70ac37b53d41c0e813ad245fc42e1d3a5d174d9148fbbbaed3c18d4d67bdbf"

```

### Stop agent

Stop the node, all NULS delegated to the node will be refunded, and the deposit of the node creator will be locked for 72 hours.

- **command: stopagent &lt;address&gt;**

| Parameter       | Description               |
| --------------- | ------------------------- |
| &lt;address&gt; | account address, required |

Return: transaction hash to stop a node 

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

### Get header information of the latest block

Get the latest block header’s information

- **command: getbestblockheader**

Return 

```json
{
  "hash" : "0020b446a0244e4e46f8736f1ab56c33616facb836bc8344367f2f048b703f0c8f57",  //block hash
  "preHash" : "0020c0dcf9209f66ee7e7778c817ba7c04d67b5e6a056b42dec7fbfe44eb5f91bdfc",  //previous block hash 
  "merkleHash" : "00200511ced5779c54aa2170b941a1f9a7ae08dfd009b1dfaacc3679d15da9fb9c3e",  //merkle hash
  "time" : "2019-03-19 18:26:20.020",  //packing time
  "height" : 1479, //block height 
  "txCount" : 1,   // number of transactions included in the block 
  "blockSignature" : "00473045022100b1a07f6da3d4ce46cab278967d76875483527e3fc749a460afdf0c375f2ec2ae022053e40e8b4d8bf4e571284e45f18c46c31163ed640a2328f3ba90ac7708808365", //block singnature 
  "size" : 0, //block size 
  "packingAddress" : null,  // packing address
  "roundIndex" : 155299118, 
  "consensusMemberCount" : 100,
  "roundStartTime" : "2019-03-19 18:26:10.010",
  "packingIndexOfRound" : 1, 
  "mainVersion" : 1,
  "blockVersion" : 0,
  "stateRoot" : null
}

```

Example

```shell
nuls>>> getbestblockheader
{
  "hash" : "0020b446a0244e4e46f8736f1ab56c33616facb836bc8344367f2f048b703f0c8f57",
  "preHash" : "0020c0dcf9209f66ee7e7778c817ba7c04d67b5e6a056b42dec7fbfe44eb5f91bdfc",
  "merkleHash" : "00200511ced5779c54aa2170b941a1f9a7ae08dfd009b1dfaacc3679d15da9fb9c3e",
  "time" : "2019-03-19 18:26:20.020",
  "height" : 1479,
  "txCount" : 0,
  "blockSignature" : "00473045022100b1a07f6da3d4ce46cab278967d76875483527e3fc749a460afdf0c375f2ec2ae022053e40e8b4d8bf4e571284e45f18c46c31163ed640a2328f3ba90ac7708808365",
  "size" : 0,
  "packingAddress" : null,
  "roundIndex" : 155299118,
  "consensusMemberCount" : 100,
  "roundStartTime" : "2019-03-19 18:26:10.010",
  "packingIndexOfRound" : 1,
  "mainVersion" : 1,
  "blockVersion" : 0,
  "stateRoot" : null
}

```

### Query block header information

Query block information with either a block height or a block hash.

- **command: getblock &lt;hash&gt; | &lt;height&gt;** 

| Parameter      | Description  |
| -------------- | ------------ |
| &lt;hash&gt;   | block hash   |
| &lt;height&gt; | block height |

Return 

```json
{
  "hash" : "0020b446a0244e4e46f8736f1ab56c33616facb836bc8344367f2f048b703f0c8f57",  //block hash
  "preHash" : "0020c0dcf9209f66ee7e7778c817ba7c04d67b5e6a056b42dec7fbfe44eb5f91bdfc",  //previous block hash
  "merkleHash" : "00200511ced5779c54aa2170b941a1f9a7ae08dfd009b1dfaacc3679d15da9fb9c3e",  //merkle hash
  "time" : "2019-03-19 18:26:20.020",  //packing time 
  "height" : 1479, //block height 
  "txCount" : 1,   // number of transactions included in the block
  "blockSignature" : "00473045022100b1a07f6da3d4ce46cab278967d76875483527e3fc749a460afdf0c375f2ec2ae022053e40e8b4d8bf4e571284e45f18c46c31163ed640a2328f3ba90ac7708808365", //block signature 
  "size" : 0, //block size 
  "packingAddress" : null,  //packing address 
  "roundIndex" : 155299118, 
  "consensusMemberCount" : 100,
  "roundStartTime" : "2019-03-19 18:26:10.010",
  "packingIndexOfRound" : 1, 
  "mainVersion" : 1,
  "blockVersion" : 0,
  "stateRoot" : null
}

```

Example: get block with block height

```shell
nuls>>> getblock 28115
{
  "hash" : "0020b446a0244e4e46f8736f1ab56c33616facb836bc8344367f2f048b703f0c8f57",  //block hash
  "preHash" : "0020c0dcf9209f66ee7e7778c817ba7c04d67b5e6a056b42dec7fbfe44eb5f91bdfc",  //previous block hash
  "merkleHash" : "00200511ced5779c54aa2170b941a1f9a7ae08dfd009b1dfaacc3679d15da9fb9c3e",  //merkle hash
  "time" : "2019-03-19 18:26:20.020",  //packing time 
  "height" : 1479, //block height 
  "txCount" : 1,   // number of transactions included in the block
  "blockSignature" : "00473045022100b1a07f6da3d4ce46cab278967d76875483527e3fc749a460afdf0c375f2ec2ae022053e40e8b4d8bf4e571284e45f18c46c31163ed640a2328f3ba90ac7708808365", //block signature 
  "size" : 0, //block size 
  "packingAddress" : null,  //packing address 
  "roundIndex" : 155299118, 
  "consensusMemberCount" : 100,
  "roundStartTime" : "2019-03-19 18:26:10.010",
  "packingIndexOfRound" : 1, 
  "mainVersion" : 1,
  "blockVersion" : 0,
  "stateRoot" : null
}

```

### Create smart contracts

This interface is called to create a smart contract on the chain

- **command：createcontract &lt;sender> &lt;gaslimt> &lt;price> &lt;contractCode> [remark]**

| Parameter         | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| &lt;sender&gt;    | Create the account address for the smart contract            |
| &lt;gaslimt&gt;   | Consumes of the gas for creating the contract                |
| &lt;price&gt;     | Unit price, how much Na is each Gas value.Na is the minimum unit for NULS, 1 NULS = 100 million Na, and the minimum unit price of the system is 25Na/Gas |
| &lt;contractCode> | Hex code of the contract code                                |
| [remark]          | remark                                                       |

Returns the transaction hash for which the contract was created and the address of the contract

```
{
  "txHash" : "00205fb44fd0924a57857e71d06ec0549366b5d879b2cbd68488ed88a2dbf96c130f",  //transaction hash
  "contractAddress" : "tNULSeBaN6ofkEqsPJmWVaeMpENTgmC5ifWtz9" //contract address
}

```

The example creates a contract (contractCode omits the middle)

```
nuls>>> createcontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD 200000 25 504b03040a........000000800080051020000b31600000000 remarkdemo
The arguments structure: 
[ {
  "type" : "String",
  "name" : "name",
  "required" : true
}, {
  "type" : "String",
  "name" : "symbol",
  "required" : true
}, {
  "type" : "BigInteger",
  "name" : "initialAmount",
  "required" : true
}, {
  "type" : "int",
  "name" : "decimals",
  "required" : true
} ]
Please enter the arguments you want to fill in according to the arguments structure(eg. "a",2,["c",4],"","e" or "'a',2,['c',4],'','e'").
Enter the arguments:"KQB","KQB",10000,2
{
  "txHash" : "0020ec1d68eaed63e2db8649b0a39f16b7c5af24f86b787233f6ba6d577d7d090587",
  "contractAddress" : "tNULSeBaNBYK9MQcWWbfgFTHj2U4j8KQGDzzuK"
}

```

### Get contract basic information

Gets the description of the smart contract and the argument list of the constructor and the calling method

- **command：getcontractinfo &lt;contract address>**

| Parameter                | Description      |
| ------------------------ | ---------------- |
| &lt;contract address&gt; | contract address |

Return 

```
Skip

```

example

```
nuls>>> getcontractinfo tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L
getcontractinfo tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L
{
  "createTxHash" : "00203a48dcfc26426152805be49830c72005b4648d0182bbf6c2e8980380364eb59f",
  "address" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
  "creater" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
  "createTime" : 1553563706022,
  "blockHeight" : 46,
  "isNrc20" : true,
  "nrc20TokenName" : "QKB",
  "nrc20TokenSymbol" : "QKB",
  "decimals" : 2,
  "totalSupply" : "200000000",
  "status" : "normal",
  "method" : [ {
    "name" : "<init>",
    "desc" : "(String name, String symbol, BigInteger initialAmount, int decimals) return void",
    "args" : [ {
      "type" : "String",
      "name" : "name",
      "required" : true
    }, {
      "type" : "String",
      "name" : "symbol",
      "required" : true
    }, {
      "type" : "BigInteger",
      "name" : "initialAmount",
      "required" : true
    }, {
      "type" : "int",
      "name" : "decimals",
      "required" : true
    } ],
    "returnArg" : "void",
    "view" : false,
    "event" : false,
    "payable" : false
  }，{
    "name" : "transfer",
    "desc" : "(Address to, BigInteger value) return boolean",
    "args" : [ {
      "type" : "Address",
      "name" : "to",
      "required" : true
    }, {
      "type" : "BigInteger",
      "name" : "value",
      "required" : true
    } ],
    "returnArg" : "boolean",
    "view" : false,
    "event" : false,
    "payable" : false
  }]
}


```

### Invoke smart contracts

Call the functions provided by the smart contract

- **command：callcontract &lt;sender> &lt;gasLimit> &lt;price> &lt;contractAddress> &lt;methodName> &lt;value> [-d methodDesc] [-r remark]**

| Parameter             | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| &lt;senderAddress&gt; | The account address invoking the contract                    |
| &lt;gasLimit&gt;      | The maximum amount of Gas that the contract is allowed to consume |
| &lt;price>            | Unit price, how much Na is each Gas value.Na is the minimum unit for NULS, 1 NULS = 100 million Na, and the minimum unit price of the system is 25Na/Gas |
| &lt;contractAddress>  | The contract address of the call                             |
| &lt;methodName>       | The method name of the contract                              |
| &lt;value>            | If a transfer is to be made to the contract, the amount of the transfer |
| [-d methodDesc]       | Use this method to describe the parameter list if there is a method with the same name in the contract |
| [-r remark]           | remark                                                       |

Returns: transaction hash 

```
"0020c9079e0f0454103adceed798d40171c41a8db04586dba966fbe7f2ab722583ad" //transaction hash

```

The example calls the nrc20-token transfer function for a specified contract, Example ` tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L ` NRC20 contract address, number of input parameters for receiving address and account transfer

```
nuls>>> callcontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD 200000 25 tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L transfer 0 -r call
callcontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD 200000 25 tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L transfer 0 -r call
Please Enter your account passwordzhoujun172
**********
Please enter the arguments according to the arguments structure(eg. "a",2,["c",4],"","e" or "'a',2,['c',4],'','e'"),
If this method has no arguments(Refer to the command named "getcontractinfo" for the arguments structure of the method.), return directly.
Enter the arguments:"tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG",2
"0020c9079e0f0454103adceed798d40171c41a8db04586dba966fbe7f2ab722583ad"

```

### Delete smart contract

Stop an available smart contract

- **commmand：deletecontract &lt;senderAddress> &lt;contractAddress>**

| Parameter             | Description                               |
| --------------------- | ----------------------------------------- |
| &lt;senderAddress&gt; | The account address invoking the contract |
| &lt;contractAddress>  | The contract address of the call          |

Returns: transaction hash

```
"0020c55e885dd910dad0b2c49f5b71b62691b57884ca21fd47668f1f5cadc84daad6" //交易hash

```

example

```
nuls>>> deletecontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L
deletecontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L
Please enter your account passwordzhoujun172
**********
"0020c55e885dd910dad0b2c49f5b71b62691b57884ca21fd47668f1f5cadc84daad6"

```

### Call the contract view method

Calling the contract view method immediately returns the result, no transaction is generated

- **commmand：viewcontract &lt;contractAddress> &lt;methodName> [-d methodDesc] --view contract**

| Parameter            | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| &lt;contractAddress> | The contract address of the call                             |
| &lt;methodName>      | Method called                                                |
| [-d methodDesc]      | Use this method to describe the parameter list if there is a method with the same name in the contract |

The return value

```
The return value varies depending on the function being called

```

The example calls the nrc20-token contract's query Token balance function to query the Token balance of the specified address

```
nuls>>> viewcontract tNULSeBaN6pwyVwXjfpm5BMH5eiirvthoZDVEc balanceOf
viewcontract tNULSeBaN6pwyVwXjfpm5BMH5eiirvthoZDVEc balanceOf
Please enter the arguments according to the arguments structure(eg. "a",2,["c",4],"","e" or "'a',2,['c',4],'','e'"),
If this method has no arguments(Refer to the command named "getcontractinfo" for the arguments structure of the method.), return directly.
Enter the arguments:"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD"
"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD"
{
  "result" : "20000000"
}

```

### Transfer money to the contract address

To the specified contract address into the main network currency

- **command：transfertocontract &lt;senderAddress> &lt;contractAddress> &lt;amount> [remark]**

| Parameter           | Description                        |
| ------------------- | ---------------------------------- |
| &lt;senderAddress>  | Transfer out account address       |
| &lt;contractAddress | transfer into the contract address |
| &lt;amount>         | transfer amount                    |
| [remark]            | remark                             |

Returns: transaction hash

```
"0020f5d6b87c246595d1b060a3fa8bac6a2992490e38fdfcad40db2a3908297e7979"

```

The example transfers two NULS to the specified contract

```
nuls>>> transfertocontract tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD tNULSeBaN1NRtaj1ZPAmEmTqcpkyCLqv64PR7U 2 remark
Please enter your account password
**********
"0020f5d6b87c246595d1b060a3fa8bac6a2992490e38fdfcad40db2a3908297e7979"

```

### token transfer

NRC20 token transfer

- **command：tokentransfer &lt;formAddress> &lt;toAddress> &lt;contractAddress> &lt;amount> [remark]**

| Parameter            | Description      |
| -------------------- | ---------------- |
| &lt;fromAddress>     | sender address   |
| &lt;toAddress        | receiver address |
| &lt;contractAddress> | contract address |
| &lt;amount>          | transfer amount  |
| [remark]             | remark           |

Returns： transaction hash

```
"002022dffd96026b493945d2cf9ad276c4bc9655c735b72e6fcc85a2d19f6cbe25e8"

```

Token transfer example :

```
nuls>>> tokentransfer tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD  tNULSeBaNBh9RUsVrVmMy8NHcZJ2BhNVsM1Vta  tNULSeBaN6pwyVwXjfpm5BMH5eiirvthoZDVEc 200000 25 10000
Please enter your account password
**********
"002022dffd96026b493945d2cf9ad276c4bc9655c735b72e6fcc85a2d19f6cbe25e8"

```

### Get contract transaction

Gets the transaction information of the contract, including the transaction details, the contract invocation parameters, and the contract execution results

- **command：getcontracttx &lt;hash>**

| Parameter | Description      |
| --------- | ---------------- |
| &lt;hash> | transaction hash |

return value

```
skip 

```

example

```
nuls>>> getcontracttx 00203a48dcfc26426152805be49830c72005b4648d0182bbf6c2e8980380364eb59f
getcontracttx 00203a48dcfc26426152805be49830c72005b4648d0182bbf6c2e8980380364eb59f
{
  "hash" : "00203a48dcfc26426152805be49830c72005b4648d0182bbf6c2e8980380364eb59f",
  "type" : "100",
  "time" : "2019-03-26 09:28:26",
  "blockHeight" : 46,
  "fee" : 0.0,
  "value" : 0.0,
  "remark" : null,
  "scriptSig" : "210318f683066b45e7a5225779061512e270044cc40a45c924afcf78bb7587758ca0004630440220112a446b2a684510b4016fa97b92d2f3fead03128f0f658c99a6a8d230d05d4e02201e23a2f6e68aacdff2d117bd5bbe7ce2440babfe4211168eafbae41acad5d505",
  "status" : "confirm",
  "confirmCount" : 0,
  "size" : 6686,
  "inputs" : [ {
    "address" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
    "assetsChainId" : 2,
    "assetsId" : 1,
    "amount" : "5700000",
    "nonce" : "ffffffff",
    "locked" : 0,
    "value" : 0.0
  } ],
  "outputs" : [ ],
  "txData" : {
    "data" : {
      "sender" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
      "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
      "value" : 0.0,
      "hexCode" : "504b03040a0000080...........31600000000",
      "gasLimit" : 200000,
      "price" : "0.00000025",
      "args" : [ [ "QKB" ], [ "QKB" ], [ "2000000" ], [ "2" ] ]
    }
  },
  "contractResult" : {
    "success" : true,
    "errorMessage" : null,
    "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
    "result" : null,
    "gasLimit" : 200000,
    "gasUsed" : 14029,
    "price" : "0.00000025",
    "totalFee" : 0.0,
    "txSizeFee" : 0.0,
    "actualContractFee" : 0.0,
    "refundFee" : 0.0,
    "stateRoot" : "be76399c41a8cb4be5ecf80e04dab36830b124cb1c43fea6ca69ae62259899ba",
    "value" : 0.0,
    "stackTrace" : null,
    "balance" : 0.0,
    "transfers" : [ ],
    "events" : [ "{\"contractAddress\":\"tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L\",\"blockNumber\":46,\"event\":\"TransferEvent\",\"payload\":{\"from\":null,\"to\":\"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD\",\"value\":\"200000000\"}}" ],
    "tokenTransfers" : [ {
      "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
      "from" : null,
      "to" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
      "value" : "200000000",
      "name" : "QKB",
      "symbol" : "QKB",
      "decimals" : 2
    } ],
    "remark" : "create"
  }
}



```

### Get the contract execution result

Gets the execution result of a contract

- **command:getcontractresult &lt;hash>**

| Parameter | Description      |
| --------- | ---------------- |
| &lt;hash> | transaction hash |

return value

```
skip

```

example

```
nuls>>> getcontractresult 00203a48dcfc26426152805be49830c72005b4648d0182bbf6c2e8980380364eb59f
{
  "success" : true,
  "errorMessage" : null,
  "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
  "result" : null,
  "gasLimit" : 200000,
  "gasUsed" : 14029,
  "price" : "0.00000025",
  "totalFee" : 0.0,
  "txSizeFee" : 0.0,
  "actualContractFee" : 0.0,
  "refundFee" : 0.0,
  "stateRoot" : "be76399c41a8cb4be5ecf80e04dab36830b124cb1c43fea6ca69ae62259899ba",
  "value" : 0.0,
  "stackTrace" : null,
  "balance" : 0.0,
  "transfers" : [ ],
  "events" : [ "{\"contractAddress\":\"tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L\",\"blockNumber\":46,\"event\":\"TransferEvent\",\"payload\":{\"from\":null,\"to\":\"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD\",\"value\":\"200000000\"}}" ],
  "tokenTransfers" : [ {
    "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
    "from" : null,
    "to" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
    "value" : "200000000",
    "name" : "QKB",
    "symbol" : "QKB",
    "decimals" : 2
  } ],
  "remark" : "create"
}


```

### Get the contract constructor

Gets the list of parameters that need to be passed in to create the specified contract

- **command：getcontractcontructor &lt;contractCode>**

| Parameter         | Description                   |
| ----------------- | ----------------------------- |
| &lt;contractCode> | Hex code of the contract code |

return value

```
skip

```

example

```
nuls>>> getcontractcontructor 504b03040a000008000.........20000b31600000000
{
  "constructor" : {
    "name" : "<init>",
    "desc" : "(String name, String symbol, BigInteger initialAmount, int decimals) return void",
    "args" : [ {
      "type" : "String",
      "name" : "name",
      "required" : true
    }, {
      "type" : "String",
      "name" : "symbol",
      "required" : true
    }, {
      "type" : "BigInteger",
      "name" : "initialAmount",
      "required" : true
    }, {
      "type" : "int",
      "name" : "decimals",
      "required" : true
    } ],
    "returnArg" : "void",
    "view" : false,
    "event" : false,
    "payable" : false
  },
  "isNrc20" : true
}


```

### Gets the list of contracts created for the specified account

Gets the list of contracts created by the specified account address

- **command：getaccountcontracts &lt;createAddress>**

| Parameter          | Description     |
| ------------------ | --------------- |
| &lt;createAddress> | account address |

return value

```
{
  "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
  "createTime" : "2019-03-26 09:28:26.026",
  "height" : 46,
  "confirmCount" : 402,
  "remarkName" : null,
  "status" : 2,
  "msg" : null,
  "create" : true
}

```

example

```
nuls>>> getaccountcontracts tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD
[ {
  "contractAddress" : "tNULSeBaMz7vkyhgqLXVdcT75dC5udULVs1D2L",
  "createTime" : "2019-03-26 09:28:26.026",
  "height" : 46,
  "confirmCount" : 402,
  "remarkName" : null,
  "status" : 2,
  "msg" : null,
  "create" : true
}, {
  "contractAddress" : "tNULSeBaMzsHrbMy2VK23RzwjkXS1qo2ycG5Cg",
  "createTime" : "2019-03-25 16:08:25.025",
  "height" : 253,
  "confirmCount" : 195,
  "remarkName" : null,
  "status" : 0,
  "msg" : null,
  "create" : true
}, {
  "contractAddress" : "tNULSeBaNBYK9MQcWWbfgFTHj2U4j8KQGDzzuK",
  "createTime" : "2019-03-25 15:33:54.054",
  "height" : 46,
  "confirmCount" : 402,
  "remarkName" : null,
  "status" : 0,
  "msg" : null,
  "create" : true
} ]

```

### Query network information

Query network basic information

- **command: network info**

Return 

```json
{
  "localBestHeight" : 35317,//latest block height locally 
  "netBestHeight" : 35317,//latest block height of the network 
  "timeOffset" : "0ms",//network time offset 
  "inCount" : 0,//number of in-nodes 
  "outCount" : 1//number of out-nodes 
}

```

Example

```shell
nuls>>> network info
{
  "localBestHeight" : 35317,
  "netBestHeight" : 35317,
  "timeOffset" : "0ms",
  "inCount" : 0,
  "outCount" : 1
}

```

### Query IP's of network nodes

Query IP's of network nodes

- **command: network nodes**

Return information

```json
[" 192.168.1.223 "]

```

Example: get a block with the block height

```shell
nuls>>> network nodes
[ "192.168.1.223" ]

```

### Register the Parallel Chain in the Main Chain

Parallel chains need to complete registration in the main chain when sending cross-chain transactions, this command needs to run on the main network node

- **command: registercrosschain &lt;address> &lt;chainId> &lt;chainName> &lt;magicNumber> &lt;assetId> &lt;symbol> &lt;assetName> &lt;initNumber> [decimalPlaces] [minAvailableNodeNum] [txConfirmedBlockNum]**

| Parameter             | Specification                                                |
| --------------------- | ------------------------------------------------------------ |
| &lt;address>          | registered cross-chain fee payment account                   |
| &lt;chainId>          | registered chain id                                          |
| &lt;chainName>        | registered chain name                                        |
| &lt;magicNumber>      | magic number parameter of the registered running chain       |
| &lt;assetId>          | registered asset id                                          |
| &lt;symbol>           | asset abbreviation e.g. BTC                                  |
| &lt;assetName>        | asset name                                                   |
| &lt;initNumber>       | initiated asset amount                                       |
| [decimalPlaces]       | asset decimal places default 8                               |
| [minAvailableNodeNum] | cross-chain transaction available conditions: minimum number of available nodes, default 5 |
| [txConfirmedBlockNum] | the number of confirmed blocks for the registered transaction, default 30 |

Return

```
6c29d99c2b02cfc766ef25bee2ea619610a5fce1d778c3038885111f590ae312  #registered transaction hash

```

Example

```nuls>>> registercrosschain tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD 3 testchain 123456 10 TB tb 1000
Please enter the password.
Enter your password:**********
6c29d99c2b02cfc766ef25bee2ea619610a5fce1d778c3038885111f590ae312

```

### Query Parallel Chain Registration Information

Query the registration information of a test on the main network

- **Command: crosschaininfo     &lt;chainId>**

| Parameter    | Specification       |
| ------------ | ------------------- |
| &lt;chainId> | registered chain id |

Return

```{
  "chainId" : 3,
  "chainName" : "testchain",
  "addressType" : "1",
  "magicNumber" : 123456,
  "minAvailableNodeNum" : 5,
  "txConfirmedBlockNum" : 0,
  "regAddress" : "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD",
  "regTxHash" : "6c29d99c2b02cfc766ef25bee2ea619610a5fce1d778c3038885111f590ae312",
  "createTime" : 1557739548367,
  "seeds" : "192.168.1.192:8088",
  "selfAssetKeyList" : [ "3-10" ],
  "totalAssetKeyList" : [ "3-10" ]
}

```

Return chain specification

| parameter           | required | type   | description                                                  |
| ------------------- | -------- | ------ | ------------------------------------------------------------ |
| chainId             | true     | int    | chain symbol                                                 |
| assetId             | true     | int    | asset id                                                     |
| chainName           | true     | string | chain name                                                   |
| addressType         | true     | int    | the address type of the account created on the chain: 1 within the ecological 2 non-ecological |
| magicNumber         | true     | string | magic number                                                 |
| minAvailableNodeNum | true     | int    | minimum number of available nodes                            |
| txConfirmBlockNum   | true     | int    | transaction confirmation block number                        |
| symbol              | true     | string | asset symbol                                                 |
| assetName           | true     | string | asset name                                                   |
| initNumber          | true     | string | asset initial number                                         |
| decimalPlaces       | true     | int    | minimum asset separable digits                               |
| address             | true     | string | the main network address of created chain                    |
| password            | true     | string | private key password                                         |

Example

```
nuls>>> crosschaininfo 11
{
  "chainId" : 11,
  "chainName" : "Neth",
  "addressType" : "1",
  "magicNumber" : 20190303,
  "minAvailableNodeNum" : 5,
  "txConfirmedBlockNum" : 0,
  "regAddress" : "tNULSeBaMgDEcAUhPSdF3D3C6mT54HPUt81cQ4",
  "regTxHash" : "7a672b093b274b93bc145dda0e598eddf1f1cf0ccb9aba3e67b3899a5b4ad7a1",
  "createTime" : 1557921296460,
  "seeds" : "192.168.1.192:8088",
  "selfAssetKeyList" : [ "11-1" ],
  "totalAssetKeyList" : [ "11-1", "2-1" ]
}

```

### Send Cross-chain Transaction

- **Command: getecrosstx &lt;chainId> &lt;formAddress> &lt;toAddress> &lt;assetChainId> &lt;assetId> &lt;amount> [remark]**

| Parameter         | Specification                   |
| ----------------- | ------------------------------- |
| &lt;chainId>      | chain id of running transaction |
| &lt;formAddress>  | from address                    |
| &lt;toAddress>    | to address                      |
| &lt;assetChainId> | chain Id of the transfer asset  |
| &lt;assetId>      | transfer asset id               |
| &lt;amount>       | transfer amount of assets       |
| &lt;remark>       | transfer remark                 |

Return :transaction hash

```
529bb34c0f4760fa55dd98b92d3e913ed2306b7ac1f93c4491007e266bb04ef5

```

Example

```
nuls>>> createcrosstx 2 tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD M9busmFhQeu1Efn6rDyeQkFjHxv2dSzkuH8 2 1 1
Please enter the password.
Enter your password:**********
529bb34c0f4760fa55dd98b92d3e913ed2306b7ac1f93c4491007e266bb04ef5

```

### Query Cross-chain Transaction Confirmation Status

- **Command：getcrosstxstate  &lt;chainId> &lt;txHash>**

| Parameter    | Specification              |
| ------------ | -------------------------- |
| &lt;chainId> | currently running chain id |
| &lt;txHash>  | transaction hash           |

Return

```
Confirmed | Unconfirmed

```

Example

```
nuls>>> getcrosstxstate 2 529bb34c0f4760fa55dd98b92d3e913ed2306b7ac1f93c4491007e266bb04ef5
Unconfirmed

```

### Exit the wallet CLI

Exit the command line, it won’t stop the wallet.

- **command: exit**

Example

```shell
nuls>>> exit

```

