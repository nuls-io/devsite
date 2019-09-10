# Encrypted Message Module Demo
## Functional design

The core business of the module is to directly send and receive text messages between two addresses and the encrypted message content will be stored on the chain and in the node file system.

### Core functions

1. Bind the address to a unique messagebox address on the entire blockchain.
2. Send message to the specified messagebox address.
3. Receive message.
4. View the message details.

### Secondary functions

1. View the Inbox and Outbox messageing lists.
2. Pay additional fees for binding messagebox address and sending messages



## General design
### Binding messagebox address

Create the transaction type of applying for messagebox address (type_200) and business data (txData) includes the application address, messagebox address, address public key. When verifying the transaction, it is necessary to verify whether the messagebox address has been occupied, whether the application address has been bound to a messagebox, and whether the account balance of the application address is sufficient to pay the application fee and transaction fee. When the transaction is confirmed, the node will establish links between the application address, messagebox address and public key, and store them in the file system.

There are two functions for binding the messagebox address.
1. Provide a format that is more easy to memorize and write for human beings than account addresses.
2. Acquire the public key of the account address through transaction of the account, and asymmetrically encrypt the message content with the public key when sending the message.

### Sending message

Create the transaction type of sending message (type_201) and business data (txData) includes sender address (not messagebox address), recipient address (not messagebox address), sending time, encrypted message title, encrypted message content, sender's reading permission `key` and recipient's reading permission `key`.

#### Assembling transaction

The parameters of the message to be sent are sender's account address, account password, recipient's messagebox address, message title and message content. The processing steps are as follows:

1. Query the recipient's messagebox information through the recipient's messagebox address, and obtain the recipient's account address and public key.
2. Generate a pair of keys (KEY) for the encrypted message, encrypt the title and content of message with public key, and encrypt KEY's private key with public keys of recipient and sender to obtain their reading permission `keys` respectively. When viewing the message content, they need to decrypt the reading permission `key` with their own private keys, and then decrypt the message title and content  with the reading permission `key`. In this way, data can be stored publicly, but only the sender and the recipient can view the content.

#### Verifying transaction

1. Verify the messagebox address bound to the sender’s account address
2. Verify the validity of the recipient’s messagebox address
3. Verify that the specified amount of assets is transferred to the fee account.



#### Storing message data

Because it is a demo module, data is not stored in the database but in the file system to avoid unnecessary complexity. message storage mainly involves in the relationship between message, recipient, and sender, as well as message content.

1. Create two folders, `sender` and `recipient`, to store the relationship between the account address and the transaction hash related to the message. A file is created in the folder with the address as the file name, and each line in the file stores a transaction hash of message related to the account address. `Sender` folder stores the relationship between the sender and the message transaction hash, and `recipient` folder stores the relationship between the recipient and the message transaction hash.
2. Create `message-data` folder to store messages and use message transaction hash as the file name to create a storage file. which stores hexadecimal string of the byte array of the message content.

### Reading message
#### <span id="Decrypt message information">Decrypt message information</span>
The message content is stored after encryption, so decryption is required for reading. The decryption failure throws an exception. The decryption process is as follows:
1. Get the message content by message hash.
2. Deserialize the message content. First convert the hexadecimal string to a byte array, and then parse the byte array following the below rules orderly.
> 1. Store the recipient’s account address in variable-length type
> 2. Store the sender’s account address in variable-length type
> 3. Store the recipient’s reading permission `key` in variable-length type
> 4. Store the sender’s reading permission `key` in variable-length type
> 5. Store the message title in variable-length type
> 6. Store the message content in variable-length type
>7. Store 64-bit integer timestamp with 4 bytes (milliseconds from January 1, 1970 to the current time)

1. Determine whether the current account is the recipient or the sender by the address, and decrypt the corresponding reading permission `key` by the private key.
2. Decrypt the message title and content with the decrypted reading permission `key`.

#### Reading the Inbox or Outbox messageing list
Find the file with the same name as the account address in the `sender` and `recipient` folders, read the hash by line, and then use the hash to get the message details through [Decrypt message information](#Decrypt message information), and finally assemble the list.

### Charging fees
The fee payment is achieved by verifying that the CoinData of the transaction of binding messagebox and sending message contains the specified amount of assets transferred to the specified black hole address (fee address).

## Detailed design
### Package structure of source code 
```
.
└── io
    └── nuls
        ├── Config.java
        ├── Constant.java
        ├── MyModule.java
        ├── NulsModuleBootstrap.java
        ├── Utils.java
        ├──controller
        │ ├── CreatemessageAddressController.java
        │ ├── GetmessageController.java
        │ ├── SendmessageController.java
        │ ├── core
        │ │ ├── BaseController.java
        │ │ ├── NulsResourceConfig.java
        │ │ ├── Result.java
        │ │ └── WebServerManager.java
        │ └── vo
        │ ├── CreatemessageAddressReq.java
        │ ├── GetmessageListReq.java
        │ ├── messageAddressData.java
        │ ├── messageContentData.java
        │ ├── SendmessageReq.java
        │ └── ViewmessageReq.java
        ├── rpc
        │ ├── AccountTools.java
        │ ├── CallRpc.java
        │ ├── LegderTools.java
        │ ├── TransactionTools.java
        │ └── vo
        │ ├── Account.java
        │ ├── AccountBalance.java
        │ └── TxRegisterDetail.java
        ├── service
        │ ├── messageAddressService.java
        │ ├── SendmessageService.java
        │ └── dto
        │ ├── messageAddress.java
        │ └── messageContent.java
        └── txhander
            ├── messageAddressProcessor.java
            ├── SendmessageProcessor.java
            ├── TransactionDispatcher.java
            └── TransactionProcessor.java
```
#### Config.java
A configuration file, it reads the external NULS2.0 general configuration into the class through the configuration file system of the nuls-core. In this module, we need chainId (chain ID), assetId (asset ID), and dataPath (data storage path). These three items belong to the global general configuration and can be read directly. In addition, two business configuration items, messageAddressFee (fee of binding messagebox) and sendmessageFee (fee od sending message), are defined and need to be configured in module.ncf.

#### Constant.java
A class defining constants, it defines the transaction type pf binding messagebox (200), transaction type pf sending message (201), and the black hole address for fee collection.

#### MyModule.java
A bootstrap class, it declares that the current module depends on three modules, namely,  account, ledger, and transaction. The nuls-core-rpc package will automatically establish a websocket long connection with these 3 modules.
Complete the module initialization:
1. Create a folder to store data.
2. Register the transaction type to the transaction module.
3. Initialize the Restful WebServer service (the user interface is provided using the HTTP protocol).

#### controller package
`controller` package provides user interface

##### CreatemessageAddressController.java
The interface for binding account to messagebox address

##### GetmessageController.java
The interface for obtaining messagebox information.

##### SendmessageController.java
The interface for sending message

##### core and vo package
Related to HTTP interface framework and interface protocol.

#### rpc package
Utility class for accessing the RPC interface of other modules.

#### service package
Related to data storage logic

##### messageAddressService.java
Service for storing the information of messagebox address bound to the account

##### SendmessageService.java
Service for sending message and querying emessage information.

#### dto package
Defining data storage objects

#### txhander package
Package of transaction callback functions 

##### TransactionDispatcher.java
Defining the RPC interface of the callback function, dispatching transactions to the specific handling class based on the transaction type.

##### messageAddressProcessor.java
Defining callback functions that handle the transaction of binding messagebox address (type_200).

##### SendmessageProcessor.java
Defining callback functions that handle the transaction of sending message (type_201).

### User interface list
The user interface is provided using HTTP protocol. The `Content type` of Request and Response is `application/json`, and the port is `9999`.

#### Universal protocol of return 

```
{
    "success": true, // success status
    "data": null, //returned data
    "msg": null // the reason for the failure
}
```
#### Binding messagebox address
##### Access path: /message/createmessageAddress
##### Request mode: POST
##### parameter list

| Name | Type | Description |
| --- | --- | --- |
| address | string | apply for an account address |
| messageAddress | string | apply for a bound messagebox address |
| password | string | account password |

##### Return in string format
txHash of the transaction.

#### Querying the messagebox address bound to the specified account address
##### Access path: /message/getmessageAddress/{address}
##### Request mode: GET
##### parameter list

| Name | Type | Description |
| --- | --- | --- |
| address | string | account address |
##### Return in string format
emessage address

#### sending message
##### Access path: /message/sendmessage
##### Request mode: POST
##### parameter list

| Name | Type | Description |
| --- | --- | --- |
| messageAddress | string | recipient’s messagebox address |
| senderAddress | string | sender’s account address |
| password | string | sender’s account password |
| title | string | message title |
| content | string | message content |

##### Return in string format
txHash of the transaction
#### Getting the specified message details
##### Access path: /message/viewmessage
##### Request mode: POST
##### parameter list

| Name | Type | Description |
| --- | --- | --- |
| address | string | account address |
| password | string | account password |
| hash | string | hash of the message transaction |

##### Return as an object

| Name | Description |
| --- | --- |
| hash | hash of the message transaction |
| sendermessageAddress | sender’s messagebox address |
| recipientmessageAddress | recipient’s messagebox address |
| title | message title|
| content | message content|
| sender | sender’s account address |
| date | date of sending message|


#### Getting Inbox and Box messageing lists

##### Access path: /message/getSendList, /message/getReceiveList

##### Request mode: POST

##### parameter list

| Name | Type | Description |
| --- | --- | --- |
| address | string | account address |
| password | string | account password |

##### Return as a list

| Name | Description |
| --- | --- |
| hash | hash of the message transaction|
| sendermessageAddress | sender’s messagebox address |
| recipientmessageAddress | recipient’s messagebox address|
| title | message title |
| content | message content |
| sender | sender’s account address |
| date | date of sending message |
