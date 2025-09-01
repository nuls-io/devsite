# Design document of ledger module

## Overall description

### 1.1 Module Overview

#### 1.1.1 Why do you have a "book module"?

> The ledger module is the data hub of the blockchain. The balances and transactions of all accounts are saved in the ledger module.
  A network-wide account book is saved on each network node to ensure complete, open and transparent data, while ensuring that data cannot be tampered and traceable.

#### 1.1.2 What should be done in the "book module"

> Provide data support for assembly transactions, mainly accounting and auditing, verify the legality of the transaction, such as: whether there is sufficient balance, whether to repeat payment (double flower)

#### 1.1.3 Positioning of the "book module" in the system

> The ledger module is the data hub, which stores the result data of all existing transactions in the system. It does not depend on any business modules, and other modules depend on it as needed.
#### 1.1.4 Explanation of terms in "book module"
- The random number of the transaction (nonce, a 32-bit hash value)
  - nonce: A scalar value equal to the number of transactions sent at this address, which will be included in every transaction initiated by the user.
  - Each transaction in the account needs to save the nonce (hash) of the previous transaction
  - Strictly speaking, a nonce is an attribute of the originating address (it only makes sense in the context of the sending address).However, the nonce is not explicitly stored in the blockchain as part of the account status.
  - The nonce value is also used to prevent incorrect calculation of account balances.For example, suppose an account has 10 NULS balances and signs two transactions, all of which cost 6 NULS with nonce 1 and nonce 2, respectively.Which of these two transactions is valid? In a blockchain distributed system, nodes may receive transactions out of order.Nonce forces transactions of any address to be processed in order, regardless of the interval, regardless of the order in which the nodes receive.This way, all nodes will calculate the same balance.Payments for 6 Ethereum will be processed successfully and the account balance will be reduced to 4 ether.Whenever it is received, all nodes consider it invalid with a transaction with nonce 2.If a node receives a nonce 2 transaction first, it will hold it, but will not verify it until it receives and processes the nonce 1 transaction.
  - Use nonce to ensure that all nodes calculate the same balance and sort the transactions correctly, which is equivalent to the mechanism used in Bitcoin to prevent "double payment".However, because Ethereum tracks account balances and does not track individual coins separately (called UTXO in Bitcoin), "double payments" only occur when the account balance is incorrectly calculated.The nonce mechanism can prevent this from happening.
  
### 1.2 Architecture
> The core of the books is asset management and bookkeeping management.

![ledger-arch.png](./image/ledger/ledger-arch.png)

## Functional design

### 2.1 Functional Architecture
![ledger-functions.png](./image/ledger/ledger-functions.png)

### 2.2 Module Service
#### 2.2.1 System Service of the Book Module
![ledger-service.png](./image/ledger/ledger-service.png)

> The interface of rpc provided by the ledger module. For detailed interface, please refer to the interface design section.

#### 2.2.2 Modifying system operating parameters

> Only rely on the core system, the core system can start, stop, modify parameters, etc. of the event module system,

### 2.3 Module internal function
#### 2.3.1 Hot (online) transaction processing

> Module internal work mainly includes asset management, obtaining account address balance and nonce, and verifying transaction coinData.

- asset Management
  - Total assets of the account
  - Available assets
  - Freeze assets. For locked assets, separate record and locked asset information, including chain id, asset id, asset amount, lock time, lock height, etc.
  - In the asset unlocking process, when the user's locked asset time or height reaches the unlocking condition, the account will unlock the asset information, accumulate the available balance, and delete the asset lock record of the local data.
  - Multi-asset situation, need to join chainId.
- Get account address balance and nonce
  - Get account address balance
  - Get the account address nonce (the nonce is the last eight digits of a transaction hash value, meaning that the nonce of the first transaction is 0. Each future transaction of the account will contain the nonce value of the previous transaction)
- Verify the transaction
  - Double flower verification (nonce mechanism prevents double payment)
  - Transaction creator verification, verifying that the issuer of the transaction has sufficient balance to verify that the nonce of the transaction creator is legal
  - Continuous transaction verification
- Function Interface Management (rpc)
  - rpc interface for use by other modules
  
#### 2.3.2 Cold (offline) transaction processing
> A cold wallet is an unconnected wallet, also called an offline wallet.A hot wallet is a wallet that keeps online, that is, an online wallet.Cold wallets are not more secure than hot wallets.

> Since the cold wallet only signs the transaction information, the signed hex string is transmitted to the server through the hot wallet, and then the server performs unified transaction processing, so the client needs to perform the offline signature function.
> The offline transaction system maintains the storage information of the nonce. After using a nonce, the nonce is saved in the business system.

> Most offline transactions are handled by the exchange itself, we need to store the account data of the entire network account

### 2.4 Bookkeeping Process
#### 2.4.1 Transfer Transaction Process

  - User enters the address of the transfer and the transferred address and the transferred amount
  - The system signs the transfer information by the private key of the transferred address (used to prove that the transaction was actually initiated by me)
  - The system verifies the transaction information
    - Balance verification
    - Fee verification
    - nonce continuity verification
    - Signature and input account verification
  - Put this transaction into the local TxPool (that is, the account unconfirmed trading pool)
  - Broadcast transaction information to other nodes
  - Packing blocks, verifying blocks
  - Confirm transaction
    - Update the balance of all accounts related to (transfer or transfer)
    - Update the nonce corresponding to the account asset

#### 2.4.2 Ordinary transaction process (reference example)

![eth-transaction-flow.png](./image/ledger/eth-transaction-flow.png)

#### 2.4.3 Transaction Verification Process

![trx-validate-flow.png](./image/ledger/trx-validate-flow.png)

##  Interface Design

### 3.1 Module core interaction interface

#### 3.1.1 Get account balance

> cmd: getBalance

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ------------ | :------: | -------: | ---------------: |
| chainId | Y | int | Chain id of interface call chain |
| address | Y | String | To find the address of the balance |
| assetChainId | Y | int | Asset-initiated chain ID |
| assetId | Y | int | Asset ID |

```json
{
   
    "chainId":5,
    "address":"0x407d73d8a49eeb85d32cf465507dd71d507100c1",
    "assetChainId":34,
    "assetId":5,
}
```

##### Return value description (response)

```json
{ 
       "available": "10000000000",
       "freeze": "200000000",
       "total": "12000000000"
}
```

> Description: 1NULS=10^8Na

| Field | Data Type | Description Information |
| --------- | :--------: | ----------------------------------: |
| available | BigInteger | Available balances |
| freeze | BigInteger | Freeze balance |
| total | BigInteger | Total Asset Balance total = available+freeze |

#### 3.1.2 Get the current account nonce value

> cmd: getNonce
>

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ------------ | :------: | -------: | ---------------: |
| chainId | Y | int | Chain id of interface call chain |
| address | Y | String | To find the address of the balance |
| assetChainId | Y | String | Asset-initiated chain ID |
| assetId | Y | int | Asset ID |

```json
{
   
    "chainId":5,
    "address":"0x407d73d8a49eeb85d32cf465507dd71d507100c1",
    "assetChainId":34,
    "assetId":5,
}
```

##### Return value description (response)

```json
{
   "nonce":"xxxxxxxxxxx"，
   "nonceType":1
}
```



| Field | Data Type | Description Information |
| --------- | :------: | -------------------------------: |
| nonce | String | On the expense trading hash |
| nonceType | int | 1The transaction was confirmed, 0 the transaction was not confirmed |



#### 3.1.3 Obtaining the balance and nonce value

> cmd: getBalanceNonce

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ------------ | :------: | -------: | ---------------: |
| chainId | Y | int | Chain id of interface call chain |
| address | Y | String | To find the address of the balance |
| assetChainId | Y | String | Asset-initiated chain ID |
| assetId | Y | String | Asset ID |

```json
{
   
    "chainId":5,
    "address":"0x407d73d8a49eeb85d32cf465507dd71d507100c1",
    "assetChainId":"34",
    "assetId":"5",
}
```

##### Return value description: (response)

```json
{
    "available": "10000000000",
    "nonce": "xxxxx"
}
```

| Field | Data Type | Description Information |
| --------- | :--------: | ------------------------------------------------: |
| available | BigInteger | User Available Balance |
| nonce | String | The random value of the account, which holds the hash of the hash of the user's previous transaction.|
| nonceType | int | 1 :nonce taken from confirmed transaction, 0 :nonce taken from unconfirmed transaction|

#### 3.1.4 Verifying coinData

> cmd: verifyCoinData

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ------- | :------: | -------: | ---------------: |
| chainId | Y | int | Chain id of interface call chain |
| txHex | Y | String | Trading hex stream |

```json
{
    "chainId": 458,
    "txHex": "xxxxxxxx"
}
```

##### Return value description: (response)

```json
In the case of failure, the fail error code is returned uniformly.
Successfully:
{
    "orphan":true
}
```

| Field | Data Type | Description Information |
| ------ | :------: | :-----------: |
Orphan | boolean | true orphan trading|


#### 3.1.5 Batch verification notice

> cmd: bathValidateBegin

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ------- | :------: | -------: | ---------------: |
| chainId | Y | int | Chain Id of Interface Call Chain |

```json
{
     "chainId": 21
}
```

##### Return value description: (response)

```json
{
    "value":1
}
```

| Field | Data Type | Description Information |
| ----- | :------: | -----------: |
| value | int | 1 successful, 0 failed |

#### 3.1.6 Submitting unconfirmed transactions

> cmd: commitUnconfirmedTx

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ------- | :------: | -------: | ---------------: |
| chainId | Y | int | Chain Id of Interface Call Chain |
| txHex | Y | String | Trading hex stream |

```json
{
     "chainId": 21,
     "txHex": "xxxxxxxx"
}
```

##### Return value description: (response)

```json
In the case of failure, the fail error code is returned uniformly.

Successfully:
{
    "orphan":true
}
```

| Field | Data Type | Description Information |
| ------ | :------: | :-------------: |
Orphan | boolean | true for orphan trading|

#### 3.1.7 Submitting unconfirmed transactions in bulk

> cmd: commitBatchUnconfirmedTxs

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ------- | :------: | -------: | ---------------: |
| chainId | Y | int | Chain Id of Interface Call Chain |
| txList | Y | String | Trading Hex Value List |

```json
{
     "chainId": 21,
     "txList": "[xxxxxxxx，yyyyyyyyy]"
}
```

##### Return value description: (response)

```json
{
    "orphan":"[xxxxxxxx，yyyyyyyyy]"，
    "fail":"[aaaaaaaa，bbbbbbbbb]"
}
```

| Field | Data Type | Description Information |
| ------ | :----------: | :--------------: |
| orphan | List&lt;String> | Return to orphaned transaction list|
| fail | List&lt;String> | Return failed list |



#### 3.1.8 Submitting block transactions

> cmd: commitBlockTxs

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ----------- | :------: | -------: | --------------------: |
| chainId | Y | int | Chain Id of Interface Call Chain |
| txHexList | Y | array | Trading List Transactions hex stream |
| blockHeight | Y | long | Block Height |

```json
{
     "chainId": 21,
     "txHex": "[xxxxxxxx,yyyyyyyy]",
     "blockHeight": 25
}
```

##### Return value description: (response)

```json
{
    "value":true
}
```

| Field | Data Type | Description Information |
| ----- | :------: | ------------------: |
| value | int | true success, false failure |



#### 3.1.9 Rolling back unconfirmed transactions

> cmd: rollBackUnconfirmTx

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ------- | :------: | -------: | ---------------: |
| chainId | Y | int | Chain Id of Interface Call Chain |
| txHex | Y | String | Trading hex stream |

```json
{
     "chainId": 21,
     "txHex": "xxxxxxxx"
}
```

##### Return value description: (response)

```json
{
    "value":1
}
```

| Field | Data Type | Description Information |
| ----- | :------: | -----------: |
| value | int | 1 successful, 0 failed |

#### 3.1.10 Rollback block trading

> cmd: rollBackBlockTxs

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ----------- | :------: | -------: | ---------------: |
| chainId | Y | int | Chain Id of Interface Call Chain |
| blockHeight | Y | long | Block Height |

```json
{
     "chainId": 21,
     "blockHeight": 25
}
```

##### Return value description: (response)

```json
{
    "value":1
}
```

| Field | Data Type | Description Information |
| ----- | :------: | -----------: |
| value | int | 1 successful, 0 failed |

#### 3.1.11 Entire block check

> cmd: blockValidate

##### Parameter Description (request)

| Field | Required | Data Type | Description |
| ----------- | :------: | -------: | ---------------: |
| chainId | Y | int | Chain Id of Interface Call Chain |
| txList | Y | String | Trading Hex Value List |
| blockHeight | Y | long | Block Height |

```json
{
     "chainId": 21,
     "txList": "[xxxxxxxx，yyyyyyyyy]",
     "blockHeight":20
}
```

##### Return value description: (response)

```json
{
    "value":true
}
```

| Field | Data Type | Description Information |
| ----- | :------: | :------------------: |
| value | boolean | true success, false failure |



### 3.2 Other interfaces

#### 3.2.1 Obtain asset information based on asset id
> cmd: getAsset

##### Parameter Description (request)

| Field | Optional | Data Type | Description Information |
|----------|:-------------:|--------:|--------:|
| chainId | Y | int | The chain where the interface is called Id |
| assetChainId | Y | int | Chain ID of the asset origination chain |
| assetId | Y | int | Asset ID |

```json
{
  "chainId": 5,
  "assetChainId": 12,
  "assetId": 41
}
```
##### Return value description (response)

```json
{
    "chainId": 5,
    "assetChainId": 12,
    "assetId": 41,
    "balance" : {
      "available": "10000000000",
      "freeze": "200000000",
      "total": "12000000000"
    }
}
```

| Field | Data Type | Description Information |
|----------|:-------------:|------:|
| chainId | int | Chain ID to initiate the call |
| assetChainId | int | Asset-initiated chain id |
| assetId | int | Asset ID |
| balance.available | BigInteger | Available Balances |
| balance.freeze | BigInteger | Freeze Balance |
| balance.total | BigInteger | Total Asset Balance total = available+freeze |



##  Description of the event

> does not depend on any events

##  Agreement

### 5.1 Network Communication Protocol

no

### 5.2 Trading Agreement

no

##  Module Configuration
### 6.1 Configuration Instructions

### 6.2 Module Dependencies

- Kernel module
  - Module registration

  - Module logout

  - Module status escalation (heartbeat)

  - Service interface data acquisition and timing update
- Network module
  

##  Java-specific design

> Core object class definition, storing data structures, ...

##  Supplementary content

### References Literature
- [Proficient in Ethereum - Chapter 7 Transaction](https://github.com/inoutcode/ethereum_book/blob/master/%E7%AC%AC%E4%B8%83%E7%AB%A0.asciidoc)

