# Transaction module
## Module Overview
In the nuls2.0 ecosystem, trades flow between chains or chains, and the nodes of each chain not only deal with transactions within the chain, but also deal with cross-chain transactions, so each node needs to be processed. The trades are more and more complex and more complex, so we need a single but separate module to handle the various transactions.From the architectural design of nuls2.0, we need a separate module to handle transaction collection, verification, secure transaction data, storage and other functions for block assembly. For all transactions, these functions have commonality. Uniformity, so we run transaction management as a separate module.

## Transaction Processing Logic

- Collecting transactions
- Local verification
- Broadcast forwarding transactions to other nodes
- Extract packageable transactions
- Submit, rollback transactions
- Save unconfirmed, packageable and confirmed transactions
- Provide data for the transaction

## Interface List
### tx\_register
Register module transactions / Register module transactions
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------------------------------------------------------- |:----------------:| ----------- |:----:|
| chainId | int | chain id | yes |
| moduleCode | string | module code for registering transactions | yes |
| list | list | Data for pending transactions | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txType | int | Transaction Type | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;systemTx | boolean | Is it a system transaction | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unlockTx | boolean | Whether it is an unlock transaction | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;verifySignature | boolean | Does the transaction require a signature | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;verifyFee | boolean | Does the transaction require a verification fee | Yes |
| delList | list&lt;integer> | Pending registered transaction data | No|

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------ |
| value | boolean | Whether registration is successful |

### tx\_getTx
According to the hash to get the transaction, first check the unconfirmed, can not find the reconfirmed / Get transaction by tx hash
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| txHash | string | To-be-traded hash | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| ---------------- |
| tx | string | Get the string of the serialized data of the transaction |

### tx\_newTx
Receive local new transaction /receive a new transaction
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---------- |:----:|
| chainId | int | chain id | yes |
| tx | string | Transaction Serialized Data String | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------ |
| value | boolean | success |
| hash | string | transaction hash |

### tx\_batchVerify
Verify all transactions in the block / Verify all transactions in the block
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:---------------:| --------------- |:----:|
| chainId | int | chain id | yes |
| txList | list&lt;string> | To-be-verified transaction serialized data string collection | Yes |
| blockHeader | string | Corresponding block header | Yes |
| preStateRoot | string | previous block state root | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------ |:---------------:| ---------- |
| value | boolean | Whether verification succeeds |
| contractList | list&lt;string> | Smart Contract New Deal |

### tx\_rollback
Rollback block transaction / transaction rollback
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:---------------:| ------- |:----:|
| chainId | int | chain id | yes |
| txHashList | list&lt;string> | To-be-rolled transaction collection | Yes |
| blockHeader | string | Block Head | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | success |

### tx\_cs\_state
Set the node packing status (set by the consensus module) / Set the node packaging state
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:-------:| ------ |:----:|
| chainId | int | chain id | yes |
| packaging | boolean | Whether it is being packaged | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---------------- |
| N/A | void | No specific return value, set without success |

### tx\_packableTxs
Get a packageable transaction set/returns a list of packaged transactions
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
EndTimestamp | long | Deadline | Yes |
| maxTxDataSize | int | Maximum transaction set capacity | Yes |
| blockTime | long | This block time | Yes |
| packingAddress | string | current block address | yes |
| preStateRoot | string | The status root of the previous block | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------- |:---------------:| --------- |
| list | list&lt;string> | packageable transaction set |
| stateRoot | string | The current state of the current block |
| packageHeight | long | The height of this packaging block |

### tx\_backPackableTxs
The consensus module returns the unpackable transaction and rejoins the package to be packaged/back packaged transactions
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:---------------:| ------------ |:----:|
| chainId | int | chain id | yes |
| txList | list&lt;string> | Transaction Serialization Data String Collection | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | success |

### tx\_save
Save the new block transaction / Save the confirmed transaction
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:---------------:| -------- |:----:|
| chainId | int | chain id | yes |
| txList | list&lt;string> | The set of transactions to be saved | Yes |
| contractList | list&lt;string> | Smart Contract Trading | Yes |
| blockHeader | string | Block Head | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | success |

### tx\_gengsisSave
Save the transactions of the Genesis block 
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:---------------:| -------- |:----:|
| chainId | int | chain id | yes |
| txList | list&lt;string> | The set of transactions to be saved | Yes |
| blockHeader | string | Block Head | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | success |

### tx\_getSystemTypes
Get all system transaction types / Get system transaction types
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ---- |:----------------:| -------- |
| list | list&lt;integer> | System Transaction Type Collection |

### tx\_getConfirmedTx
Get confirmed transactions based on hash (check only confirmed) / Get confirmed transaction by tx hash
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| txHash | string | To-be-traded hash | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:------:| ---------------- |
| tx | string | Get the string of the serialized data of the transaction |

### tx\_getBlockTxs
Get the complete transaction of the block, if there is no query, or if the query is not the complete transaction data of the block, then return the empty set / Get block transactions
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:---------------:| ----------- |:----:|
| chainId | int | chain id | yes |
| txHashList | list&lt;string> | To-be-reported hash collection | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:---------------:| -------------- |
| txList | list&lt;string> | Returns a collection of transaction serialized data strings |

### tx\_getBlockTxsExtend
According to the hash list, get the transaction, first check the unconfirmed, then check the confirmed / Get transactions by hashs
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:---------------:| ------------------------------------------ |:----:|
| chainId | int | chain id | yes |
| txHashList | list&lt;string> | To-be-reported hash collection | Yes |
| allHits | boolean | true: must be found to return data, otherwise return empty list; false: check several returns a few | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:---------------:| -------------- |
| txList | list&lt;string> | Returns a collection of transaction serialized data strings |

### tx\_getNonexistentUnconfirmedHashs
Query the incoming transaction hash, the transaction in the unconfirmed library hash/Get nonexistent unconfirmed transaction hashs
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:---------------:| ----------- |:----:|
| chainId | int | chain id | yes |
| txHashList | list&lt;string> | To-be-reported hash collection | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:---------------:| -------------- |
| txList | list&lt;string> | Returns a collection of transaction serialized data strings |

### tx\_bl\_state
Set node block synchronization status (set by block module) / Set the node block state
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ------------- |:----:|
| chainId | int | chain id | yes |
| status | int | Whether to wait, not to process transactions | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---------------- |
| N/A | void | No specific return value, set without success |

### tx\_blockHeight
Receive the latest block height/Receive the latest block height
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | chain id | yes |
| height | long | block height | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | success |

### tx\_getTxClient
Get the transaction according to the hash, first check the unconfirmed, check and check the confirmed / Get transaction by tx hash
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| txHash | string | To-be-traded hash | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---------------------- |
| tx | string | Get the string of the serialized data of the transaction |
| height | string | Get the confirmed height of the transaction, the unconfirmed transaction height is -1 |
| status | string | Get the status of the confirmed transaction |

### tx\_verifyTx
Verify transaction interface, including basic verification, validator, account verification/Verify transation
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---------- |:----:|
| chainId | int | chain id | yes |
| tx | string | Full string to be verified | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:------:| ------ |
| value | string | transaction hash |

### transferCMDTest

#### scope:public
#### version:1.0

#### parameter list
No parameters

#### return value
No return value

### tx\_getConfirmedTxClient
Get confirmed transactions based on hash (check only confirmed) / Get confirmed transaction by tx hash
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| txHash | string | To-be-traded hash | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ---------------- |
| tx | string | Get the string of the serialized data of the transaction |
| height | string | Get the confirmed height of the transaction |
| status | string | Get the status of the confirmed transaction |

