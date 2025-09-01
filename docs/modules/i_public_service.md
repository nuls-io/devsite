# Public Service

## Introduction

Each NULS 2.0 node can optionally provide a set of API interfaces for obtaining blockchain data from nodes. The interface is provided through [JSON-RPC](https://www.jsonrpc.org/specification), and the underlying layer communicates using HTTP protocol.
Blockchain data is data collected from each completed block since the node was started. This interface does not update blockchain data.  (nuls-api updates blockchain data.)

For more information about public-service consult the [Public-Service Module Design Document](https://docs.nuls.io/Docs/d_public_service.html).


## Installation
To begin development with Public Service select one of the following two options:

1. Get a wallet: Download the full-node (non-light) [wallet for linux](https://github.com/nuls-io/nuls-v2).
2. Install [ChainBox](https://docs.nuls.io/Docs/c_chain_box.html).

#Option 1: Wallet for Linux

Installation instructions:

1.enter: git clone https://github.com/nuls-io/nuls-v2 wallet

2.enter: cd wallet

3.Add the public-service module


```

./package -a public-service  
./package

```
4.Install the mongoDB database. Public-service will not start if the database is not running. There is an option in the code to use a different database.

5.enter: cd NULS_Wallet

6.enter: ./start

7.The file nuls.ncf has been created.  Locate the "[public-service]" section in the file nuls.ncf, and add any information that is missing from the example below.  At the time of writing this document, the only entry to be modified is the rpcPort entry. Note, the content of nuls.ncf is not case sensitive.

```

[public-service]
# database URL address
DatabaseUrl = 127.0.0.1
# Database port 
DatabasePort = 27017
#public-service module external rpc port number 
rpcPort=18003
```

8.Start the wallet: ./start

9.Ensure that all processes have started: ./check-status

After the node has successfully started, the node will parse the current block and store the collected data in the mongo database. You can confirm that mongo and public-service are working by checking: Logs/public-service/public-service.log.  

List the public-service log to confirm that the database daemon mongo is receiving information from public-service. The log will report the connection and display information to confirm that public-service is processing the blocks.
 

```
cd Logs/public-service
# you are now located at: /.../NULS_WALLET/Logs/public-service

head -5 public-service.log
2019-10-04 02:37:50,345 INFO [public-service-main] - io.nuls.api.db.mongo.MongoDBService.afterPropertiesSet(MongoDBService.java:82):------connect mongodb use time:2916
2019-10-04 02:38:28,130 INFO [pool-3-thread-3] - io.nuls.api.service.SyncService.syncNewBlock(SyncService.java:107):-----height finish:2483-----txCount:1-----use:1735-----
2019-10-04 02:38:28,152 INFO [pool-3-thread-3] - io.nuls.api.service.SyncService.syncNewBlock(SyncService.java:107):-----height finish:2484-----txCount:1-----use:11-----
2019-10-04 02:38:46,383 INFO [pool-3-thread-3] - io.nuls.api.service.SyncService.syncNewBlock(SyncService.java:107):-----height finish:2485-----txCount:1-----use:8-----
2019-10-04 02:38:56,381 INFO [pool-3-thread-3] - io.nuls.api.service.SyncService.syncNewBlock(SyncService.java:107):-----height finish:2486-----txCount:1-----use:9-----
```    


# Option 2: Chainbox

Installation instructions:

1.Follow steps 1 and 2 of ChainBox instructions.  

2.Add public-service

```

./tools -a public-service  

```

3.Install the mongoDB database. Public-service will not start if the database is not running. There is an option in the code to use a differnt database.

4.Do steps 3 and 4 of ChainBox installation.

5.Append the file default-config.ncf with the following lines:

```

[public-service]
# database URL address
DatabaseUrl = 127.0.0.1
# Database port 
DatabasePort = 27017
#public-service module external rpc port number 
rpcPort=18003
```

6.Complete steps 5, 6, 7 of the ChainBox installation

7.After step 7 the ChainBox installation is complete, and the node is running successfully.   The node has begun to parse the synchronized blocks and store the collected data in the mongo database. You can confirm that mongo and public-service are working by checking: Logs/public-service/public-service.log.  

List the public-service log to confirm that the database daemon mongo is receiving information from public-service. The log will report the connection and display information to confirm that public-service is processing the blocks.
 

```
cd Logs/public-service
# you are now located at: /.../NULS_WALLET/Logs/public-service

head -5 public-service.log
2019-10-04 02:37:50,345 INFO [public-service-main] - io.nuls.api.db.mongo.MongoDBService.afterPropertiesSet(MongoDBService.java:82):------connect mongodb use time:2916
2019-10-04 02:38:28,130 INFO [pool-3-thread-3] - io.nuls.api.service.SyncService.syncNewBlock(SyncService.java:107):-----height finish:2483-----txCount:1-----use:1735-----
2019-10-04 02:38:28,152 INFO [pool-3-thread-3] - io.nuls.api.service.SyncService.syncNewBlock(SyncService.java:107):-----height finish:2484-----txCount:1-----use:11-----
2019-10-04 02:38:46,383 INFO [pool-3-thread-3] - io.nuls.api.service.SyncService.syncNewBlock(SyncService.java:107):-----height finish:2485-----txCount:1-----use:8-----
2019-10-04 02:38:56,381 INFO [pool-3-thread-3] - io.nuls.api.service.SyncService.syncNewBlock(SyncService.java:107):-----height finish:2486-----txCount:1-----use:9-----
```    

## Listening Port
5. The default port for public-service is 18003. 



## Interface Description

### Charset Encoding

UTF-8

## interview method -- JSON call details

- **`json-rpc` access method**

     Add request header Content-Type: application/json;charset=UTF-8
     
     HttpMethod: POST
     
     URL: http://{ip}:{port} 
     
        Example: http://127.0.0.1:18003
        
        
Example json data request: 
     
```json
{
  "jsonrpc":"2.0",
  "method": "methodCMD", //interface name
  "params":[], //All interface parameters are passed as arrays, and the order of the parameters cannot be changed. If the parameters are not required, they must also be filled in null placeholders.
  "id":1234
}
```
        
Usage example using linux command curl, issued to a chainbox instance.:   
 
 ```

\> curl -s -X POST -H 'Content-Type: application/json' --data '{"jsonrpc":"2.0","method":"getChainInfo","params”:[], “id":1234}' http://127.0.0.1:18003

{"jsonrpc":"2.0","id":"null","result":{"chainId":2,"chainName":"nuls2","defaultAsset":{"key":"2-1","chainId":2,"assetId":1,"symbol":"NULS","decimals":8,"initCoins":0,"address":null,"status":1},"assets":[{"key":"2-1","chainId":2,"assetId":1,"symbol":"NULS","decimals":8,"initCoins":0,"address":null,"status":1}],"seeds":["tNULSeBaMkrt4z9FYEkkR9D6choPVvQr94oYZp"],"status":1,"new":false}}


```

When using Postman:
1. type the URL of the API (http://127.0.0.1:18003)
2. Change method to POST. 
3. In the parameter section click on "raw" and select format as "JSON" and add the json request in the testarea provided.
4. In the headers section add "Content-Type" as header and "application/json;charset=UTF-8" as the value.
5. Test by comparing the output to the curl output.     
     



### Remote Procedure Call Examples

JSON-RPC

```
{
	"jsonrpc":"2.0",
	"method":"getChainInfo",		//interface name
	"params":[],					//all interface parameters are passed in array mode, and the order of parameters cannot be changed.
	"id":1234
}
```

### Return Format

```
Normal return
//example
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
         "networkHeight": 4936,
         "localHeight": 4936
     }
}
Abnormal return
//example
{
     "jsonrpc": "2.0",
     "id": 1234,
     "error": {
          "code": 1000,
          "message": "Parameters is wrong!",
          "data": "Incorrect number of parameters"
     }
}
```

## Sample Calls
### Token Swap

It involves the interface with tokens. To avoid losing decimal precision, the NULS token value is stored in JAVA BigInteger format. The interface layer shifts the token value 8 bits, to take advantage of the extra precision, such that 1 NULS = 100,000,000.

### Return Definition

#### Transaction Type (txType)

```
    int COIN_BASE = 1;						//coinBase reward
    int TRANSFER = 2;						//transfer
 	int ACCOUNT_ALIAS = 3;					//set account alias
   	int REGISTER_AGENT = 4;					//register consensus node
   	int DEPOSIT = 5;						//stake to join consensus
    int CANCEL_DEPOSIT = 6;					//cancel staking
    int YELLOW_PUNISH = 7;					//yellow card punishment
    int RED_PUNISH = 8;						//red card punishment
    int STOP_AGENT = 9;						//unregister consensus node
    int CROSS_CHAIN = 10;					//cross-chain transfer
	int REGISTER_CHAIN_AND_ASSET = 11;		//register chain
    int DESTROY_CHAIN_AND_ASSET = 12;		//destroy chain
    int ADD_ASSET_TO_CHAIN = 13;			//add asset to chain
   	int REMOVE_ASSET_FROM_CHAIN = 14;		//remove asset from chain
    int CREATE_CONTRACT = 15;				//create contract
    int CALL_CONTRACT = 16;					//call contract
    int DELETE_CONTRACT = 17;				//delete contract
    int CONTRACT_TRANSFER = 18;				//contract transfer
    int CONTRACT_RETURN_GAS = 19;			//contract for returning fee
    int CONTRACT_CREATE_AGENT = 20;			//contract for registering consensus node
	int CONTRACT_DEPOSIT = 21;				//contract for staking to join consensus
 	int CONTRACT_CANCEL_DEPOSIT = 22;		//contract for canceling staking
 	int CONTRACT_STOP_AGENT = 23;			//contract for unregistering consensus node
```



#### Asset Information (assetInfo)

```
assetInfo：{
    "key": "100-1",						//string	primary key
    "chainId": 100,						//int		chain id of this asset
    "assetId": 1,						//int		asset id
    "symbol": "NULS",					//string	symbol
    "decimals":8						//int		decimals
    "initCoins": 100000000000000,		//bigInt	initial amount
    "address": "tNULSeBaMoodYW7A……",	//string	creator address
    "status": 1							//int		status， 0：removed	1：enabled
}


```

#### Block Header Information (blockHeaderInfo)

```
blockHeaderInfo: {
    "hash": "c31d198b6fb5a……",					//string	block hash
    "height": 304,								//long		block height
    "preHash": "d7596990d508……",				//string	previous block hash
    "merkleHash": "85c661b36aa3fdc……",			//string	merkle hash
    "createTime": 1559725301,					//long		create time
    "agentHash": null,							//string	packing node hash
    "agentId": "8CPcA7kaXSHbWb3GHP7……",			//string	packing node id
    "packingAddress": "8CPcA7kaXSH……",			//string	packing address of the packing node
    "agentAlias": null,							//string	agent alias of the packing node
    "txCount": 1,								//int		transaction count included in the block
    "roundIndex": 155972530,					//long		blocking round index
    "totalFee": 0,								//bigInt	total fees for packing transactions
    "reward": 0,								//bigInt	rewards for producing a block
    "size": 235,								//long		block size
    "packingIndexOfRound": 1,					//int		packing index of this round
    "scriptSign": "210e2ab7a219bca2a……",		//string	block signature
    "txHashList": [								//[string]	hash list of transactions packed
        "85c661b36aa3fdc93b9bc27bb8fdf1……"
    ],
    "roundStartTime": 1559725291,				//long		start time of this round
    "agentVersion": 1,							//int		protocol version of packing node
    "seedPacked": true							//boolean	whether this block is packed by seed node
}
```

#### Transaction Information (txInfo)

```
txInfo: {
    "hash": "0020b15e564……",				//string	transaction hash
    "type": 2,								//int 		transaction type (txType)
    "height": -1,							//long		block height where transaction is confirmed,-1 means unconfirmed
    "size": 228,							//int		transaction size
    "createTime": 1552300674920,			//long		create time
    "remark": "transfer test",				//string	remark
    "txData": null,							//object	transaction business data distinguished by transaction type. Refer to the following data definition for details
    "txDataHex": null,						//string	hexadecimal string of business data after serialization
    "txDataList": null,						//[object]	list of transaction business objects distinguished by transaction type
    "fee": { 								//bigInt	fee
        "chainId": 100,						//chain id of the fee
        "assetId": 1,						//asset id of the fee
        "symbol": "ATOM",					//asset symbol of the fee
        "value": 100000						//fee value
    },
    "coinFroms": [
    {
        "address": "5MR_2CbSSboa……",			//string	sender address
        "chainId": 12345,						//int		chain id of the output asset
        "assetsId": 1,							//int		output asset id
        "amount": 1870000000000,				//bigInt	output amount
        "locked": 0,							//long		locked time
        "nonce": "ffffffff"						//string	latest nonce of the output asset 
        "symbol":"nuls"							//string	asset symbol
    }
    ],
    "coinTos": [
    {
        "address": "5MR_2CbSSboa……",			//string	receiver address
        "chainId": 12345,						//int		chain id of the input asset
        "assetsId": 1,							//int		input asset id
        "amount": 1870000000000,				//bigInt	input amount
        "locked": 0,							//long		locked time
        "symbol":"nuls"							//string	asset symbol
    }
    ],
    "value": 1860000000000						//bigInt	amount of change in assets involved in the transaction
}
```

#### Account Information (accountInfo)

```
accountInfo: {
    "address": "5MR_2ChNj……",					//string	address
    "alias": null,								//string	alias
    "type": 1,									//int		account type
                                                //1：general address	2：contract address	3：multi-sig address
    "txCount": 8,								//int		transaction amount
    "totalOut": 0,								//bigInt	total expenditure 
    "totalIn": 1000000000000000,				//bigInt	total income
    "consensusLock": 0,							//bigInt	consensus locking of this chain's default asset
    "timeLock": 0,								//bigInt	time locking of of this chain's default asset
    "balance": 1000000000000000,				//bigInt	usable balance of this chain's default asset
    "totalBalance": 1000000000000000,			//bigInt	total balance of this chain's default asset 
    "totalReward": 0,							//bigInt	total consensus rewards
    "tokens": []								//[string]	symbol list of nrc20 assets owned
}
```

#### Asset Information (accountLedgerInfo)

```
accountLedgerInfo: {
    "address": "tNULSeBaMrbMRiFAUeeAt……",			//string	account address
    "chainId": 2,									//int		chain id of the asset
    "assetId": 1,									//int		asset id
    "symbol": "NULS",								//string	asset symbol
    "totalBalance": 1000000000000000,				//bigInt	total amount
    "balance": 1000000000000000,					//bigInt	usable balance
    "timeLock": 0,									//bigInt	time locking
    "consensusLock": 0								//bigInt	consensus locking
}
```

#### Consensus Node Information (consensusInfo)

```
 {
     "txHash": "0020c734c7ec……",				//string	hash of the transaction for registering node
     "agentId": "e4ae68a2",						//string	node id
     "agentAddress": "5MR_2CfWGwnfh……",			//string	address of agent account for registering node
     "packingAddress": "5MR_2CeXYdnth……",		//string	packing address
     "rewardAddress": "5MR_2CeXYdnt……",			//string	reward address
     "agentAlias": null,						//string	agent alias
     "deposit": 2000000000000,					//bigInt	deposit of agent node for registering node
     "commissionRate": 10,						//int		commission of packing node (%)
     "createTime": 1552300674920,				//long		create time
     "status": 0,								//int		status
     											//0:wait for consensus, 1:in consensus, 2:unregistered
     "totalDeposit": 20000000000000,			//bigInt	total stake
     "depositCount": 0,							//int		stake count
     "creditValue": 0,							//double	credit ranging from -1 to 1
     "totalPackingCount": 3966,					//int		total blocks
     "lostRate": 0,								//double	lost rate
     "lastRewardHeight": 8000,					//long		block height of last packing reward
     "deleteHash": null,						//string	hash of the transaction for unregistering node
     "blockHeight": 67,							//long		block height where node is registered
     "deleteHeight": 0,							//long		block height where node is unregistered
     "totalReward": 1256976254880,				//bigInt	total consensus rewards, totalReward=commissionReward+agentReward
     "commissionReward": 1256976254880,			//bigInt	commission rewards
     "agentReward": 0,							//bigInt	agent rewards
     "roundPackingTime": 0,						//long		packing time of this round
     "version": 1,								//int		protocol version of packing node
     "type": 1,									//int		1:general nodes,2:develop nodes,3:ambassadors nodes
 }
```

#### Stake Information (depositInfo)

```
depositInfo:{
    "txHash": "0020dd1b606191068566c……",			//string	hash of transaction for staking
    "amount": 20000000000000,						//bigint	stake amount
    "agentHash": "0020c734c7ecf447……",				//string	transaction hash of the agent node
    "address": "5MR_2CfWGwnfhPcdnho……",				//string	stake address
    "createTime": 1552292357109,					//long		stake time
    "blockHeight": 69,								//long		block height where the stake begins
    "deleteHeight": 0,								//long		block height where the stake stops
    "type": 0										//int		0:stake, 1:cancel stake
    "fee": { 										//bigInt	fee for stake transaction
        "chainId": 100,								//chain id of the fee
        "assetId": 1,								//asset id of the fee
        "symbol": "ATOM",							//asset symbol of the fee
        "value": 100000								//fee value
    },
}
```



## Calls Categorized by Blockchain Function

### Chain Related [chain]

#### Get chain information

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getChainInfo",
    "params":[],
    "id":1234
}
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "chainId": 100,								//chain id
          "chainName": "nuls",							//chain name
          "defaultAsset": {assetInfo},					//default asset of this chain
          "assets": [									//all assets of this chain
               {assetInfo}
          ],
          "seeds": [									//seed node addresses of this chain
               "8CPcA7kaXSHbWb3GHP7bd5hRLFu8RZv57rY9w"	
          ],
          "inflationCoins": 500000000000000,			//inflation tokens per year for default asset of this chain
          "status": 1									//status：0 destroyed，1 enabled
     }
}
```

#### Get general information after running the chain

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getInfo",
    "params":[2],
    "id":1234
}
//parameter description is the value of chainId (value is 2 i standard ChainBox installation)
chainId: int	//chain id
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "networkHeight": 278,							//latest height of the network
          "localHeight": 278							//local height of this node
          "defaultAsset": {								//default asset of this chain
               "symbol": "NULS",						//asset symbol
               "chainId": 2,							//chain ID of the asset
               "assetId": 1,							//asset ID
               "decimals": 8							//decimals
          },
          "agentAsset": {								//asset for staking of this chain 
               "symbol": "NULS",
               "chainId": 2,
               "assetId": 1,
               "decimals": 8
          },
          "isRunCrossChain": true,						//whether to support cross chain
          "isRunSmartContract": true					//whether to enable smart contracts
     }
}
```

#### Get information about chain registering cross chain

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getOtherChainList",
    "params":[chainId],
    "id":1234
}
//parameter description is the value of chainId (value is 2 in standard ChainBox installation)
chainId: int	//chain id
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": [
          {
               "chainName": "nuls2",					//chain name
               "chainId": 2								//chain id
          }
     ]
}
```

### Block Related [block]

#### Get latest block header

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getBestBlockHeader",
    "params":[chainId],
    "id":1234
}
//parameter description is the value of chainId (value is 2 in standard ChainBox installation)
chainId: int	//chain id
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {blockHeaderInfo}						//block header information
}
```

#### Get block header by height

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getHeaderByHeight",
    "params":[chainId, blockHeight],
    "id":1234
}
//parameter description is the value of chainId (value is 2 in standard ChainBox installation)
chainId: int	//chain id
blockHeight：lonbg  //block height   note, you can use the height listed in the previous command

for example "params": [2,18869]
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {blockHeaderInfo}						//block header information
}
```

#### Get block header with block hash

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getHeaderByHash",
    "params":[chainId, blockHash],
    "id":1234
}
chainId: int									 //chain id
blockHash：string								//block hash
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {blockHeaderInfo}						//block header information
}
```

#### Get block by height

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getBlockByHeight",
    "params":[chainId, blockHeight],
    "id":1234
}
//parameter description
chainId: int									 //chain id
blockHeight：long								//block height
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
     	"header":{blockHeaderInfo},						//block header information
     	"txList":[										//transactions packed
     		{txInfo}
     	]
     }						
}
```

#### Get block by block hash

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getBlockByHash",
    "params":[chainId, blockHash],
    "id":1234
}
//parameter description
chainId: int									 //chain id
blockHash：string								//block hash
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
     	"header":{blockHeaderInfo},						//block header information
     	"txList":[										//transactions packed
     		{txInfo}
     	]
     }						
}
```

#### Get block header list

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getBlockHeaderList",
    "params":[chainId,pageNumber,pageSize, isHidden, packedAddress],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
isHidden:boolean								//whether to hide consensus blocks
packedAddress:string							//filter according to the packing address, optional
```

Return:

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 7,
          "list": [
               {blockHeaderInfo}
          ]
     }
}
```

### Account Related [account]

#### Get account information

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccount",
    "params":[chainId,address],
    "id":1234
}
//parameter description
chainId: int									//chain id
address: string									//account address
For example:  "params": [2,"tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD"]
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {accountInfo}					//account information
}
```

#### Get account information by alias

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountByAlias",
    "params":[chainId,alias],
    "id":1234
}
//parameter description
chainId: int									//chain id
alias: string									//account alias
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {accountInfo}					//account information
}
```

#### Get ranking of accounts holding tokens 

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getCoinRanking",
    "params":[chainId,pageNumber,pageSize,sortType],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
sortType:int									//sorting type 0：by total balance desc	1：by total balance asc
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
               {
                    "address": "tNULSeBaMmTNYqywL5ZSHbyAQ662uE3wibrgD1",
                    "alias": null,
                    "type": 1,
                    "totalBalance": 1000000000000000,				//balance
                    "totalOut": 0,									//total out
                    "totalIn": 1000000000000000						//total in
               }
               ……
          ]
     }
}
```

#### Get account ledger list

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountLedgerList",
    "params":[chainId,address],
    "id":1234
}
//parameter description
chainId: int									//chain id
address: string									//account address
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": [
          {accountLedgerInfo}
     ]
}
```

#### Get account cross-chain ledger list

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountCrossLedgerList",
    "params":[chainId,address],
    "id":1234
}
//parameter description
chainId: int									//chain id
address: string									//account address
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": [
          {accountLedgerInfo}
     ]
}
```

#### Get single asset balance of the account

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountBalance",
    "params":[chainId,assetChainId,assetId,address],
    "id":1234
}
//parameter description
chainId: int									//chain id
assetChainId: int								//chain id of the asset
assetId: int									//asset id
address: string									//account address
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "totalBalance": 1000000000000000,					//bigInt	total balance
          "balance": 1000000000000000,						//bigInt	usable balance
          "timeLock": 0,									//bigInt	time locking amount
          "consensusLock": 0,								//bigInt	consensus locking amount
          "freeze": 0,										//bigInt	frozen amount 
          "nonce": "0000000000000000",						//string	asset nonce
          "nonceType": 1									//int		whether nonce is confirmed
          													// 0:unconfirmed, 1:confirmed
     }
}
```

#### Get account freezes list

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountFreezes",
    "params":[chainId,pageNumber,pageSize,address],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
address: string									//account address
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "txHash":"d3ks2x9bAl38bfsl……" 		//transaction hash
          "type":1								//locking type
          										//1：time locking, 2:height locking, 3:consensus locking
          "time":1552300674920					//create time
          "lockedValue":155650000000			//locked value
          "amount":100000000					//locked amount
          "reason":"共识奖励"					 //locked reason
     }
}
```

#### Query whether the alias is usable

Request：

```
{
    "jsonrpc":"2.0",
    "method":"isAliasUsable",
    "params":[chainId,alias],
    "id":1234
}
//parameter description
chainId: int									//chain id
alias:string									//alias
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "value": true							//boolean	true: usable, false: unusable
     }
}
```

### Transaction Related [transaction]

#### Get transaction details

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getTx",
    "params":[chainId,txHash],
    "id":1234
}
//oarameter description
chainId: int									//chain id
txHash: string									//transaction hash	
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {txInfo}
}
```

#### Get transaction list

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountTxs",
    "params":[chainId,pageNumber,pageSize,address,txType,isHidden],                       
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
txType:int										//transaction type (txType),type=0 means to query all transactions
isHidden:boolean								//whether to hide consensus reward transactions (namely, transaction type is 1)
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
               {
                    "txHash": "a8611112f2b35385ee84f85……",		//transaction hash
                    "address": "tNULSeBaMrbMRiFA……",			//account address
                    "type": 1,									//transaction type
                    "createTime": 1531152,						//create time (second)
                    "height": 0,								//height of packing transaction
                    "chainId": 2,								//chain id of the asset
                    "assetId": 1,								//asset id
                    "symbol": "NULS",							//asset symbol
                    "values": 1000000000000000,					//transaction amount
                    "fee": { 									//bigInt	fee
                        "chainId": 100,							//chain id of the fee
                        "assetId": 1,							//asset id of the fee
                        "symbol": "ATOM",						//asset symbol of the fee
                        "value": 100000							//fee value
                    },
                    "balance": 1000000000000000,				//account balance after the transaction
                    "transferType": 1,							// -1:in, 1:out
                    "status": 1									//transaction status 0:unconfirmed,1:confirmed
               }
          ]
     }
}
```

#### Get transactions included in block

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getBlockTxList",
    "params":[chainId,pageNumber,pageSize,blockHeight,txType], 
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
blockHeight:long								//block height
txType:int										//transaction type (txType),type=0 means to query all transactions
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
               {
                     "txHash": "a8611112f2b35385ee84f85……",		//transaction hash
                    "address": "tNULSeBaMrbMRiFA……",			//account address
                    "type": 1,									//transaction type
                    "createTime": 1531152,						//create time (second)
                    "height": 0,								//height of packing transaction
                    "chainId": 2,								//chain id of the asset
                    "assetId": 1,								//asset id
                    "symbol": "NULS",							//asset symbol
                    "values": 1000000000000000,					//transaction amount
                    "fee": { 									//bigInt	fee
                        "chainId": 100,							//chain id of the fee
                        "assetId": 1,							//asset id of the fee
                        "symbol": "ATOM",						//asset symbol of the fee
                        "value": 100000							//fee value
                    },
                    "balance": 1000000000000000,				//account balance after the transaction
                    "transferType": 1,							// -1:in, 1:out
                    "status": 1									//transaction status 0:unconfirmed,1:confirmed
               }
          ]
     }
}
```

#### Get transaction list of an account

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountTxs",
    "params":[chainId,pageNumber,pageSize,address,txType,isHidden],                       
    "id":1234
}
//parameter descripiton
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
address: string									//account address
txType:int										//transaction type (txType),type=0 means to query all transactions
isHidden:boolean								//whether to hide consensus reward transactions (namely, transaction type is 1)
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
               {
                     "txHash": "a8611112f2b35385ee84f85……",		//transaction hash
                    "address": "tNULSeBaMrbMRiFA……",			//account address
                    "type": 1,									//transaction type
                    "createTime": 1531152,						//create time (second)
                    "height": 0,								//height of packing transaction
                    "chainId": 2,								//chain id of the asset
                    "assetId": 1,								//asset id
                    "symbol": "NULS",							//asset symbol
                    "values": 1000000000000000,					//transaction amount
                    "fee": { 									//bigInt	fee
                        "chainId": 100,							//chain id of the fee
                        "assetId": 1,							//asset id of the fee
                        "symbol": "ATOM",						//asset symbol of the fee
                        "value": 100000							//fee value
                    },
                    "balance": 1000000000000000,				//account balance after the transaction
                    "transferType": 1,							// -1:in, 1:out
                    "status": 1									//transaction status 0:unconfirmed,1:confirmed
               }
          ]
     }
}
```

#### Query whether transaction assembled offline is valid

Request：

```
{
    "jsonrpc":"2.0",
    "method":"validateTx",
    "params":[chainId, txHex], 
    "id":1234
}
//parameter description
chainId: int									//chain id
txHex: string									//hexadecimal string of assembled transaction after serialization
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "value": "46b90763901898c0c250bd749……"				//transaction hash
     }
}
```

#### Broadcast transaction assembled offline

Request：

```
{
    "jsonrpc":"2.0",
    "method":"broadcastTx",
    "params":[chainId, txHex], 
    "id":1234
}
//parameter description
chainId: int									//chain id
txHex: string									//hexadecimal string of assembled transaction after serialization
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "value": true							//true: broadcast successfully，false: fail to broadcast
     }
}
```

### Consensus Related [consensus]

#### Get available consensus nodes

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getConsensusNodes",
    "params":[chainId,pageNumber,pageSize,type],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page，ranging from 1 to 1000
type:int										//node type, 0:all nodes,1:general nodes,2:developer nodes,3:ambassador nodes
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
               {consensusInfo}
          ]
     }
}
```

#### Get all consensus nodes（including those that have quit or have been fined by red card）

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAllConsensusNodes",
    "params":[chainId,pageNumber,pageSize],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
               {consensusInfo}
          ]
     }
}
```

#### Get nodes staked by account

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountConsensus",
    "params":[chainId,pageNumber,pageSize, address],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
address:string									//account address
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
           		{conesnsusInfo}
          ]
     }
}
```

#### Get consensus node information

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getConsensusNode",
    "params":[chainId,txHash],
    "id":1234
}
//parameter description
chainId: int									//chain id
txHash:string									//hash of the transaction registering node
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {consensusInfo}
}
```

#### Get consensus nodes created by account

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountConsensusNode",
    "params":[chainId,address],
    "id":1234
}
//parameter description
chainId: int									//chain id
address:string									//account address
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {conesnsusInfo}
}
```

#### Get node staking information

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getConsensusDeposit",
    "params":[chainId,pageNumber,pageSize,txHash],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
txHash:string									//hash of the transaction registering node
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
           		{depositInfo}
          ]
     }
}
```

#### Get node's stake history

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAllConsensusDeposit",
    "params":[chainId,pageNumber,pageSize,txHash,type],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
txHash:string									//hash of the transaction registering node
type:int										//0:stake,1:cancel consensus,2:all   
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
           		{depositInfo}
          ]
     }
}
```

#### Query account's stake list

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountDeposit",
    "params":[chainId,pageNumber,pageSize,address,agentHash],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
address:string									//account address
txHash:string									//hash of the transaction registering node. return all stakes if null
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
           		{depositInfo}
          ]
     }
}
```

#### Get account's stake amount

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAccountDepositValue",
    "params":[chainId,address,agentHash],
    "id":1234
}
//parameter description
chainId: int									//chain id
address:string									//account address	
txHash:string									//hash of the transaction registeringnode. return all stakes if null
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": 10000000000						//deposit amount
}
```

#### Get punishment list

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getPunishList",
    "params":[chainId,pageNumber,pageSize,0,agentAddress],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
type:int							 			//punishment type  0:all,1:yellow card,2:red card
agentAddress:string								//agent address of the consensus node
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
           		{
           			"txHash":				//string	punishment transaction hash
           			"type":					//int		punishment type 1:yellow card,2:red card
           			"address":				//string	agent address of the punished account
           			"time":					//long		punished time
           			"blockHeight":			//long		height of the punishment transaction
           			"roundIndex":			//long		round index
           			"packageIndex":			//long		package index
           			"reason":				//string    reason for the punishment
           		}
          ]
     }
}
```

#### Get round list

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getRoundList",
    "params":[chainId,pageNumber,pageSize],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 1,
          "totalCount": 4036,
          "list": [
               {
                    "index": 155233203,				//long	consensus round
                    "startTime": 1552371670001,		//long	start time of this round
                    "memberCount": 2,				//int	packing node amount of this round
                    "endTime": 1552371690001,		//long	end time of this round
                    "redCardCount": 0,				//int	red cards of this round
                    "yellowCardCount": 0,			//int	yellow cards of this round
                    "producedBlockCount": 1,		//int	blocks produced in this round
                    "startHeight": 8000,			//long	start height of this round
                    "endHeight": 0,					//long	end height of this round
                    "lostRate": 0					//double lost rate
               }
          ]
     }
}
```



### Contract Related [contract]

#### Get contract details

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getContract",
    "params":[chainId, contractAddress],
    "id":1234
}
chainId: int									//chain id
contractAddress:string							//contract address
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "contractAddress": "tNULSeBaNC46Z66DgU……",		//string	contract address
          "creater": "tNULSeBaMvEtDfvZuu……",				//string	contract creater address
          "createTxHash": "00209d28833258b192493……",		//string	hash of transaction creating contract
          "blockHeight": 15,								//long		height where the contract is created
          "success": true,									//boolean	whether the contract is created successfully
          "balance": 0,										//bigInt	NULS balance of the contract
          "errorMsg": null,									//string	error message for creation failure
          "status": 0,										//int		contract status
          									-1:execution failure,0: uncertified,1:under review,2:certified,3:deleted
          "certificationTime": 0,							//long		certification time
          "createTime": 1553336525059,						//long		create time
          "remark": "create contract test",					//string	remark
          "txCount": 2,										//int		transactions related to the contract
          "deleteHash": null,								//string	hash of the transaction deleting contract
          "methods": [										//[object]	methods included in the contract
               {
                    "name": "name",							//string	interface name
                    "returnType": "String",					//string	return type
                    "params": []							//[object]	parameters
               }
          ],
          "nrc20": true,									//boolean	whether is the nrc20 contract
          "tokenName": "KQB",								//string	token name		
          "symbol": "KQB",									//string	token symbol
          "decimals": 2,									//string	decimals
          "totalSupply": "1000000000000",					//bigInt	total supply
          "transferCount": 2,								//int		token transferred count
          "owners": [										//[string]	token owners
               "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG",
               "tNULSeBaMnrs6JKrCy6TQdzYJZkMZJDng7QAsD"
          ]
     }
}
```

#### Get contract list

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getContractList",
    "params":[chainId,pageNumber,pageSize,onlyNrc20,isHidden],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
onlyNrc20:boolean 								//get nrc20 contracts only
isHidden: boolean 								//whether to hide nrc20 contracts, effective only if onlyNrc20 is false
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
           		{
           			"contractAddress":				//string	contract address
           			"remark":						//string	remark
           			"txCount":						//int		transactions related to the contract
           			"status":						//int		contract status
           									-1:execution failure,0: uncertified,1:under review,2:certified,3:deleted
           			"createTime":					//long		create time
           			"balance":						//bigInt	NULS balance of the contract
           			"tokenName":					//string	token name
           		    "symbol": "KQB",				//string	token symbol
                    "decimals": 2,					//string	decimals
        			"totalSupply": "1000000000000", //bigInt	total supply
           		}
          ]
     }
}

```

#### Get contract-related transaction list

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getContractTxList",
    "params":[chainId,pageNumber,pageSize,txType,contractAddress],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
txType:int										//transaction type, the default value 0 means to get all transactions
contractAddress:string							//contract address
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 3,
          "list": [
               {
                    "contractAddress": "tNULSeBaN32a2h……",		//string contract address
                    "txHash": "0020658e3edc61196e73be0……		//string transaction hash
                    "blockHeight": 12,							//long	 height where the transaction is confirmed
                    "time": 1553336503846,						//long 	 create time
                    "type": 20									//int    transaction type
                    "fee": "5100000"							//bigint transaction fees
               }
          ]
     }
}
```

#### Get nrc20-contract transfers

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getContractTokens",
    "params":[chainId,pageNumber,pageSize,contractAddress],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
contractAddress:string							//contract address
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 3,
          "list": [
              {
                 "address": "tNULSeBaMvEt……",				//string	account address
                 "tokenName": "KQB",						//string	token name
                 "tokenSymbol": "KQB",						//string	token symbol
                 "contractAddress": "tNULSeBaNC46Z……",		//string	contract address
                 "balance": 999900000000,					//bigint	balance after the transfer
                 "decimals": 2								//int		decimals
              }
          ]
     }
}
```

#### Get account's nrc20 transfers 

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getTokenTransfers",
    "params":[chainId,pageNumber,pageSize,address,contractAddress],
    "id":1234
}
//parameter description
chainId: int									//chain id
pageNumber:int									//page index
pageSize:int									//item count displayed in each page, ranging from 1 to 1000
address:string									//account address
contractAddress:string							//contract address
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": {
          "pageNumber": 1,
          "pageSize": 10,
          "totalCount": 1,
          "list": [
               {
                    "txHash": "002016f5a811b939535……",		//string	transction hash
                    "height": 19,							//long		height where the transaction is confirmed
                    "contractAddress": "tNULSeBaNC……",		//string	contract address
                    "name": "KQB",							//string	token name
                    "symbol": "KQB",						//string	token symbol
                    "decimals": 2,							//int		decimals
                    "fromAddress": "tNULSeBaMvE……",			//string	sender address
                    "toAddress": "tNULSeBaMnrs6……",			//string	receiver address
                    "value": "100000000",					//bigInt	transfer amount
                    "time": 1553336574791,					//long		transaction time
                    "fromBalance": "999900000000",			//bigInt	sender balance
                    "toBalance": "100000000"				//bigInt    receiver balance
               }
          ]
     }
}
```

### Statistics Related [statistical]

#### Get statistics on transaction count

Request：

```
{
"jsonrpc":"2.0",
"method":"getTxStatistical",
"params":[chainId,type],
"id":1234
}
//parameter description
chainId: int								//chain id
type: int							 		//0:14 days, 1:week, 2:month, 3:year
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": [
          {
               "key": "2018-6",						//string	date
               "value": 265234						//long		count
          },
          {
               "key": "2018-7",
               "value": 425327
          }
     ]
}
```

#### Get statistics on consensus node count

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getConsensusNodeCount",
    "params":[chainId],
    "id":1234
}
//parameter description
chainId: int								//chain id
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result":{
          "consensusCount":78,						//int	consensus node count
          "seedsCount":5,							//int	seed node count
          "totalCount":83							//int	total count
     }
}
```

#### Get statistics on consensus rewards

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getConsensusStatistical",
    "params":[chainId,type],
    "id":1234
}
//parameter description
chainId: int								//chain id
type: int							 		//0:14 days，1:week，2：month，3：year，4：all
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": [
          {
               "key": "6/5",							//string	date
               "value": 556572872229264					//bigInt	total consensus rewards
          },
          {
               "key": "6/6",
               "value": 608939272229264
          },
          {
               "key": "6/7",
               "value": 628717072229264
          },
          {
               "key": "6/8",
               "value": 632738172229264
          },
          {
               "key": "6/9",
               "value": 629865972229264
          },
          {
               "key": "6/10",
               "value": 671865972229264
          }
     ]
}
```

#### Get statistics on annualized reward rate

Request：

```
{
    "jsonrpc":"2.0",
    "method":"getAnnulizedRewardStatistical",
    "params":[chainId,type],
    "id":1234
}
//parameter description
chainId: int								//chain id
type: int							 	    //0:14 days，1:week，2：month，3：year，4：all
```

Return：

```
{
     "jsonrpc": "2.0",
     "id": 1234,
     "result": [
          {
               "key": "5/29",						//string	date
               "value": 116.17						//dobule	annualized return (%)
          },
          {
               "key": "5/30",
               "value": 121.61
          },
          {
               "key": "5/31",
               "value": 106.16
          },
          {
               "key": "6/1",
               "value": 112.27
          },
          {
               "key": "6/2",
               "value": 112.27
          }
     ]
}     
```