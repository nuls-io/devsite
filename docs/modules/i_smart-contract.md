# Smart contract module
## Module Overview
- The nuls smart contract adopts the innovative concept of modular design and adds it to the nuls module warehouse. Developers can directly select the nuls smart contract module when they are connected, and then complete the relevant configuration.
- The nuls smart contract implements a minute-level deployment that can be quickly deployed on the chain after the developer has written the smart contract.
- Nuls smart contract nvm is based on jvm implementation, nuls smart contract interpreter will seamlessly support jvm system programming language, and will continue to support other mainstream programming languages, application developers can use their familiar language to design nuls smart contract.
- Through such innovative design thinking, Nuls hopes to make the development, deployment and invocation of smart contracts more convenient. In a short timeframe a developer can build a rich, intelligent contract library.

## Interface List
### sc\_batch\_begin
Execute the start notification of a batch of the contract, generate the information of the current batch /batch begin.
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------------- |:------:| ------------ |:----:|
| chainId | string | chain id | yes |
| blockHeight | string | The current packaged block height | Yes |
| blockTime | string | Current packed block time | Yes |
| packingAddress | string | currently packaged block packed address | Yes |
| preStateRoot | string | previous stateRoot | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### sc\_batch\_before\_end
The transaction module packages the transaction, notifies the contract module before doing the unified verification, the contract module stops receiving the transaction, and starts to process the result of the batch asynchronously/batch before end
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| --------- |:----:|
| chainId | string | chain id | yes |
| blockHeight | string | The current packaged block height | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---------------------------------------------------- |
N/A | void | No specific return value, no error is successful, if an error is returned, the batch is discarded, and the executed contract transaction in the batch is returned to the queue to be packaged |

### sc\_batch\_end
Notify the current batch to end and return the result /batch end
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| --------- |:----:|
| chainId | string | chain id | yes |
| blockHeight | string | The current packaged block height | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:---------------:| -------------------------------------- |
| stateRoot | string | current stateRoot |
| txList | list&lt;string> | List of newly generated transaction serialization strings for contracts (may have contract transfers, contractual consensus, contract returns to GAS) |

### sc\_package\_batch\_end
End of packaging - notify the current batch to end and return the result /batch end
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| --------- |:----:|
| chainId | string | chain id | yes |
| blockHeight | string | The current packaged block height | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:---------------:| -------------------------------------- |
| stateRoot | string | current stateRoot |
| txList | list&lt;string> | List of newly generated transaction serialization strings for contracts (may have contract transfers, contractual consensus, contract returns to GAS) |

### sc\_contract\_offline\_tx\_hash\_list
Returns the hash list of the contract generation transaction (except the contract return GAS transaction) in the specified block (the newly generated transaction of the contract is not saved in the block except the contract returns to the GAS transaction, and the contract module saves the relationship between these transactions and the specified block. )/contract offline tx hash list
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:------:| ------ |:----:|
| chainId | string | chain id | yes |
| blockHash | string | block hash | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ---- |:---------------:| -------------------------- |
| list | list&lt;string> | List of contract transaction serialization strings (possibly contract transfer, contract consensus) |

### sc\_initial\_account\_token
Initialize the account token information, and call /initial account token when the node imports the account.
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | string | chain id | yes |
| address | string | account address | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### sc\_register\_cmd\_for\_contract
Other modules register the contract module with commands that can be called by the contract. After registration, the registered command /register cmd for contract can be called within the contract code.
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| ------ |:----:|
| chainId | string | chain id | yes |
| moduleCode | string | module code | yes |
| cmdRegisterList | string | Registration Information List | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### sc\_trigger\_payable\_for\_consensus\_contract
When the consensus reward income address is the contract address, the contract's _payable(String[][] args) method is triggered. The parameter is the node revenue address detail<br>args[0] = new String[]{address, amount}<br >...<br>/trigger payable for consensus contract
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| ------------------------ |:----:|
| chainId | string | chain id | yes |
| stateRoot | string | current stateRoot | yes |
| blockHeight | string | The current packaged block height | Yes |
| contractAddress | string | contract address | yes |
| tx | string | CoinBase transaction serialization string in the current packaging block | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:------:| ------------- |
| value | string | changed stateRoot |

### sc\_invoke\_contract
After the batch notification begins, an execution contract /invoke contract one by one
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| -------------- |:----:|
| chainId | string | chain id | yes |
| tx | string | Transaction serialized HEX encoded string | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ----------------------------- |
N/A | void | No specific return value, no error is successful, if an error is returned, the transaction is discarded |

### sc\_constructor
contract code constructor
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:------:| -------------------- |:----:|
| chainId | int | Chain ID | Yes |
ContractCode | string | Smart Contract Code (Hex encoded string of bytecode) | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| -------------------------------------------------------------------------------------------------------- |:---------------:| ------------------ |
Constructor | object | contract constructor details|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name | string | method name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;desc | string | Method Description|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args | list&lt;object> | Method parameter list|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type | string | Parameter Type|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name | string | Parameter Name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;required | boolean | Required |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;returnArg | string | Return value type|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;view | boolean | Whether view method (calling this method data is not on the chain) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;event | boolean | Whether it is an event|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;payable | boolean | Is it acceptable to transfer the main chain asset |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jsonSerializable | boolean | Method Returns whether JSON is serialized |
| nrc20 | boolean | Is it a NRC20 contract|

### sc\_delete
delete contract
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| sender | string | Transaction Creator Account Address | Yes |
| password | string | Trading Account Password | Yes |
| contractAddress | string | contract address | yes |
| remark | string | Transaction Notes | No|

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ----------- |
| txHash | string | delete contract transaction hash |

### sc\_create
Release contract
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:--------:| -------------------- |:----:|
| chainId | int | chain id | yes |
| sender | string | Transaction Creator Account Address | Yes |
| password | string | account password | yes |
| alias | string | contract alias | yes |
| gasLimit | long | GAS Limit | Yes |
| price | long | GAS unit price | Yes |
ContractCode | string | Smart Contract Code (Hex encoded string of bytecode) | Yes |
| args | object[] | List of parameters | No |
| remark | string | Transaction Notes | No|

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:------:| ----------- |
| txHash | string | publish contract trading hash |
| contractAddress | string | generated contract address |

### sc\_transfer
Transfer from account address to contract address (main chain asset) /transfer NULS from sender to contract address
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------- |:----------:| --------- |:----:|
| chainId | int | chain id | yes |
| address | string | Transferring Account Address | Yes |
| toAddress | string | Transferred contract address | Yes |
| password | string | Transferring Account Password | Yes |
| amount | biginteger | Transferred main chain asset amount | Yes |
| remark | string | Transaction Notes | No|

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ------ |
| txHash | string | Trading hash |

### sc\_validate\_create
Verify release contract /validate create contract
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:--------:| -------------------- |:----:|
| chainId | int | chain id | yes |
| sender | string | Transaction Creator Account Address | Yes |
| gasLimit | long | GAS Limit | Yes |
| price | long | GAS unit price | Yes |
ContractCode | string | Smart Contract Code (Hex encoded string of bytecode) | Yes |
| args | object[] | List of parameters | No |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---------------- |
| N/A | void | No specific return value, no validation is successful |

### sc\_validate\_call
validate call contract
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:----------:| ---------------------------------------- |:----:|
| chainId | int | chain id | yes |
| sender | string | Transaction Creator Account Address | Yes |
| value | biginteger | The amount of the primary network asset that the caller transferred to the contract address. If there is no such service, fill BigInteger.ZERO | Yes |
| gasLimit | long | GAS Limit | Yes |
| price | long | GAS unit price | Yes |
| contractAddress | string | contract address | yes |
| methodName | string | contract method | yes |
| methodDesc | string | Contract method description, if the method in the contract is not overloaded, this parameter can be empty | No |
| args | object[] | List of parameters | No |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---------------- |
| N/A | void | No specific return value, no validation is successful |

### sc\_validate\_delete
validate delete contract
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| --------- |:----:|
| chainId | int | chain id | yes |
| sender | string | Transaction Creator Account Address | Yes |
| contractAddress | string | contract address | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---------------- |
| N/A | void | No specific return value, no validation is successful |

### sc\_contract\_result
contract result
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| hash | string | transaction hash | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----------------------------------------------------------------------------------------------------- |:---------------:| ------------------------------------------- |
| success | boolean | Successful contract execution |
| errorMessage | string | Execution failure information |
| contractAddress | string | contract address|
| result | string | Contract execution result |
| gasLimit | long | GAS Limit |
| gasUsed | long | GAS has been used |
| price | long | GAS unit price|
| totalFee | string | Total transaction fee |
| txSizeFee | string | Transaction Size Fee |
| actualContractFee | string | Actual execution contract fee |
| refundFee | string | Contract return fee |
| value | string | The amount of the primary network asset that the caller transferred to the contract address. If there is no such service, it is 0 |
| stackTrace | string | Exception Stack Trace |
| transfers | list&lt;object> | Contract Transfer List (from contract) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txHash | string | Contract Generation Transaction: Contract Transfer Transaction hash |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from | string | Transferred contract address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | Transfer amount |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;outputs | list&lt;object> | Transferred Address List|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to | string |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orginTxHash | string | Call contract transaction hash (source transaction hash, contract transaction derived from calling contract transaction) |
| events | list&lt;string> | Contract Event List|
| tokenTransfers | list&lt;object> | Contract Token Transfer List |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractAddress | string | Contract Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from | string | Payment Party|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to | string | Payee |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | Transfer amount |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name | string | token name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;symbol | string | token symbol|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decimals | long | Number of decimal places supported by token|
| invokeRegisterCmds | list&lt;object> | Contract Call List of Calls to External Commands |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cmdName | string | command name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args | map | Command parameters, parameters are not fixed, according to different commands, so not described here, the structure is {parameter name=parameter value} |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cmdRegisterMode | string | Registered Command Mode (QUERY\_DATA or NEW\_TX) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newTxHash | string | generated transaction hash (when the command mode called is NEW\_TX, the transaction is generated) |
| contractTxList | list&lt;string> | List of serialized strings for contract generation transactions |
| remark | string | Notes |

### sc\_contract\_result\_list
contract result list
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:---------------:| -------- |:----:|
| chainId | int | chain id | yes |
| hashList | list&lt;string> | Trading hash list | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |:---------------:| ------------------------------------------- |
| hash1 or hash2 or hash3... | object | Use the hash value in the transaction hash list as the key, where the key name is dynamic |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;success | boolean | Successful contract execution |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;errorMessage | string | Execution Failure Information |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractAddress | string | Contract Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result | string | Contract execution results|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gasLimit | long | GAS Limit |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gasUsed | long | GAS has been used |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;price | long | GAS unit price|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;totalFee | string | Total Transaction Fees |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txSizeFee | string | Transaction Size Fees |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;actualContractFee | string | Actual Execution Contract Fee |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;refundFee | string | Fees returned by the contract|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | The amount of the primary network asset that the caller transferred to the contract address, or 0 if there is no such service |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stackTrace | string | Exception Stack Trace |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transfers | list&lt;object> | Contract Transfer List (from contract) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txHash | string | Contract Generation Transaction: Contract Transfer Transaction hash |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from | string | Transferred contract address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | Transfer amount|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;outputs | list&lt;object> | Transferred Address List|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to | string | transfer address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | Transfer amount |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orginTxHash | string | Call contract transaction hash (source transaction hash, contract transaction is called Contract trading is derived) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;events | list&lt;string> | Contract Event List|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tokenTransfers | list&lt;object> | Contract Token Transfer List|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractAddress | string | contract address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from|string|payment |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to | string | Payee |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | Transfer amount|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name | string | token name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;symbol | string | token symbol|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decimals | long | Number of decimal places supported by token |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;invokeRegisterCmds | list&lt;object> | Contract Call List of Calls for External Commands |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cmdName | string | command name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args | map | command parameters, parameters are not fixed, depending on different commands Therefore, it is not described here, and the structure is {parameter name=parameter value} |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cmdRegisterMode | string | Registered Command Mode (QUERY\_DATA or NEW\_TX) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newTxHash | string | generated transaction hash (when the command mode is called NEW\ When _TX, a transaction will be generated) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractTxList | list&lt;string> | Serialized String List for Contract Generation Transactions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remark | string | Notes |

### sc\_imputed\_create\_gas
Estimated GAS/imputed create gas consumed by the release contract
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:--------:| -------------------- |:----:|
| chainId | int | chain id | yes |
| sender | string | Transaction Creator Account Address | Yes |
ContractCode | string | Smart Contract Code (Hex encoded string of bytecode) | Yes |
| args | object[] | List of parameters | No |

#### return value
| Field Name | Field Type | Parameter Description |
| -------- |:----:| ----------------- |
| gasLimit | long | The consumed gas value, the execution failed to return the value 1 |

### sc\_imputed\_call\_gas
imputed call gas
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:----------:| ---------------------------------------- |:----:|
| chainId | int | chain id | yes |
| sender | string | Transaction Creator Account Address | Yes |
| value | biginteger | The amount of the primary network asset that the caller transferred to the contract address. If there is no such service, fill BigInteger.ZERO | Yes |
| contractAddress | string | contract address | yes |
| methodName | string | contract method | yes |
| methodDesc | string | Contract method description, if the method in the contract is not overloaded, this parameter can be empty | No |
| args | object[] | List of parameters | No |

#### return value
| Field Name | Field Type | Parameter Description |
| -------- |:----:| ----------------- |
| gasLimit | long | The consumed gas value, the execution failed to return the value 1 |

### sc\_token\_transfer
NRC20-token transfer/transfer NRC20-token from address to toAddress
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:----------:| ------------ |:----:|
| chainId | int | chain id | yes |
| address | string | Transferring Account Address | Yes |
| toAddress | string | Transfer to address | Yes |
| contractAddress | string | token contract address | Yes |
| password | string | Transferring Account Password | Yes |
| amount | biginteger | Amount of transferred token assets | Yes |
| remark | string | Transaction Notes | No|

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ------ |
| txHash | string | Trading hash |

### sc\_token\_balance
NRC20 token balance details / NRC20-token balance
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| contractAddress | string | contract address | yes |
| address | string | account address | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:------:| ----------------------- |
| contractAddress | string | contract address|
| name | string | token name|
| symbol | string | token symbol|
| amount | string | token quantity|
| decimals | long | Number of decimal places supported by token |
| blockHeight | long | Block Height at Contract Creation |
| status | int | Contract Status (0-None, 1-Normal, 2-End) |

### sc\_invoke\_view
invoke view contract
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:--------:| -------------------------- |:----:|
| chainId | int | chain id | yes |
| contractAddress | string | contract address | yes |
| methodName | string | contract method | yes |
| methodDesc | string | Contract method description, if the method in the contract is not overloaded, this parameter can be empty | No |
| args | object[] | List of parameters | No |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| --------- |
| result | string | Call result of view method |

### sc\_contract\_info
Contract information details / contract info
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| contractAddress | string | contract address | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| -------------------------------------------------------------------------------------------------------- |:---------------:| ------------------------------------------ |
| createTxHash | string | publish contract trading hash |
| address | string | contract address|
| creater | string | contract creator address |
| alias | string | contract alias |
| createTime | long | contract creation time (unit: second) |
| blockHeight | long | Block Height at Contract Creation |
| directPayable | boolean | Accept direct transfer |
| tokenType | int | token type, 0 - non-token, 1 - NRC20, 2 - NRC721 |
| nrc20 | boolean | Is it a NRC20 contract|
| nrc20TokenName | string | NRC20-token name|
| nrc20TokenSymbol | string | NRC20-token symbol|
| decimals | long | Number of decimal places supported by NRC20-token |
| totalSupply | string | NRC20-token Distribution Total |
| status | string | contract status (not_found, normal, stop) |
| method | list&lt;object> | Contract Method List |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name | string | method name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;desc | string | Method Description|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args | list&lt;object> | Method parameter list|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type | string | Parameter Type|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name | string | Parameter Name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;required | boolean | Required |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;returnArg | string | Return value type|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;view | boolean | Whether view method (calling this method data is not on the chain) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;event | boolean | Whether it is an event|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;payable | boolean | Is it acceptable to transfer the main chain asset |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jsonSerializable | boolean | Method Returns whether JSON is serialized |

### sc\_contract\_tx
Contract transaction / contract tx
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------ |:----:|
| chainId | int | chain id | yes |
| hash | string | transaction hash | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- |:---------------:| ------------------------------------------------------- |
| hash | string | transaction hash |
| type | integer | Transaction Type |
| time | long | Trading Hours |
| blockHeight | long | Block Height |
| fee | string | transaction fee |
| value | string | transaction amount |
| remark | string | Notes |
| scriptSig | string | Signature Information |
| status | integer | Transaction Status (0 - Confirmation, 1 - Confirmed) |
| confirmCount | long | Transaction Confirmation Times |
| size | int | Transactions Size|
| inputs | list&lt;object> | Transaction Input Collection |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | string | Enter address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsChainId | int | Asset Chain ID |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsId | int | Asset ID |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount | string | Spend Amount |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nonce | string | address book's nonce value|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;locked | byte | Unlock the deal's tag (0 - non-unlocked deal, 1 - unlock deal) |
|outputs | list&lt;object> | Trade Output Collection |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | string | output address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsChainId | int | Asset Chain ID |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsId | int | Asset ID |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount | string | Output Amount |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lockTime | long | Lock Time |
| txData | map | Contract Trading Business Data |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data | object | Reflect different business data according to the contract transaction type (here, in order to describe the four cases, the four services are described together, in fact not at the same time) Exist, there is only one) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;create | object | Publish business data for contract transactions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sender | string | Transaction Creator Address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractAddress | string | created contract address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;alias | string | contract alias |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hexCode | string | Smart Contract Code (Hex encoded string of bytecode) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gasLimit | long | GAS Limit |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;price | long | GAS unit price|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args | string[][] | Parameter List|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;call | object | Calling Business Data for Contract Transactions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sender | string | Transaction Creator Address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractAddress | string | contract address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | The amount of the primary network asset that the caller transferred to the contract address. If there is no such service, fill in BigInteger.ZERO |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gasLimit | long | GAS Limit |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;price | long | GAS unit price|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;methodName | string | contract method|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;methodDesc | string | Contract method description, if the method in the contract is not overloaded, this parameter can be empty |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args | string[][] | Parameter List|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;delete | object | Delete business data for contract transactions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sender | string | Transaction Creator Address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractAddress | string | contract address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transfer | object | Business Data for Contract Transfer Transactions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orginTxHash | string | call contract transaction hash (source transaction hash, contract transaction is derived from calling contract transaction) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractAddress | string | contract address|
| contractResult | object | Contract execution results |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;success | boolean | Successful contract execution |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;errorMessage | string | Execution Failure Information |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractAddress | string | Contract Address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result | string | Contract execution results|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gasLimit | long | GAS Limit |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;gasUsed | long | GAS has been used |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;price | long | GAS unit price|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;totalFee | string | Total Transaction Fees |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txSizeFee | string | Transaction Size Fees |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;actualContractFee | string | Actual Execution Contract Fee |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;refundFee | string | Fees returned by the contract|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | The amount of the primary network asset that the caller transferred to the contract address, or 0 if there is no such service |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;stackTrace | string | Exception Stack Trace |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;transfers | list&lt;object> | Contract Transfer List (from contract) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txHash | string | Contract Generation Transaction: Contract Transfer Transaction hash |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from | string | Transferred contract address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | Transfer amount|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;outputs | list&lt;object> | Transferred Address List|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to | string | transfer address |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | Transfer amount |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orginTxHash | string | Call contract transaction hash (source transaction hash, contract transaction is called Contract trading is derived) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;events | list&lt;string> | Contract Event List|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;tokenTransfers | list&lt;object> | Contract Token Transfer List|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractAddress | string | contract address|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from|string|payment |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to | string | Payee |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value | string | Transfer amount|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name | string | token name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;symbol | string | token symbol|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decimals | long | Number of decimal places supported by token |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;invokeRegisterCmds | list&lt;object> | Contract Call List of Calls for External Commands |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cmdName | string | command name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args | map | command parameters, parameters are not fixed, depending on different commands Therefore, it is not described here, and the structure is {parameter name=parameter value} |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cmdRegisterMode | string | Registered Command Mode (QUERY\_DATA or NEW\_TX) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;newTxHash | string | generated transaction hash (when the command mode is called NEW\ When _TX, a transaction will be generated) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contractTxList | list&lt;string> | Serialized String List for Contract Generation Transactions |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remark | string | Notes |

### sc\_token\_assets\_list
Token asset collection/token assets list
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| address | string | account address | yes |
| pageNumber | int | Page Number | No |
| pageSize | int | per page size | no |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:------:| ----------------------- |
| contractAddress | string | contract address|
| name | string | token name|
| symbol | string | token symbol|
| amount | string | token quantity|
| decimals | long | Number of decimal places supported by token |
| blockHeight | long | Block Height at Contract Creation |
| status | int | Contract Status (0-None, 1-Normal, 2-End) |

### sc\_token\_transfer\_list
Token transfer transaction list/token transfer list
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| address | string | account address | yes |
| pageNumber | int | Page Number | No |
| pageSize | int | per page size | no |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:------:| ------------------------------ |
| contractAddress | string | contract address|
| from | string | Payment Party|
| to | string | Receiver |
| value | string | Transfer amount |
| time | long | Trading Hours |
| status | byte | Transaction Status (0 - Confirmation, 1 - Confirmed, 2 - Failed) |
| txHash | string | Trading hash |
| blockHeight | long | Block Height |
| name | string | token name|
| symbol | string | token symbol|
| decimals | long | Number of decimal places supported by token |
| info | string | token asset change information|

### sc\_account\_contracts
Account's contract address list / account contract list
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| address | string | account address | yes |
| pageNumber | int | Page Number | No |
| pageSize | int | per page size | no |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:------:| ------------------------------------------------------ |
| contractAddress | string | contract address|
| createTime | long | contract creation time |
| height | long | block height at contract creation |
| confirmCount | long | Contract Creation Confirmation Times |
| alias | string | contract alias |
| status | int | Contract Status (0 - does not exist or is created, 1 - normal, 2 - deleted, 3 - failed to create, 4 - locked) |
| msg | string | Error message for contract creation failure |

### sc\_upload
Contract code jar package upload /upload
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| -------------------------------------------- |:----:|
| chainId | int | chain id | yes |
| jarFileData | string | File description and file byte stream conversion Base64 encoded string (file description and Base64 string separated by commas) | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| -------------------------------------------------------------------------------------------------------- |:---------------:| -------------------- |
Constructor | object | contract constructor details|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name | string | method name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;desc | string | Method Description|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;args | list&lt;object> | Method parameter list|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type | string | Parameter Type|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name | string | Parameter Name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;required | boolean | Required |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;returnArg | string | Return value type|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;view | boolean | Whether view method (calling this method data is not on the chain) |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;event | boolean | Whether it is an event|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;payable | boolean | Is it acceptable to transfer the main chain asset |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;jsonSerializable | boolean | Method Returns whether JSON is serialized |
| isNrc20 | boolean | Is it a NRC20 contract|
| code | string | Smart Contract Code (Hex encoded string of bytecode) |

### sc\_call
call contract
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| --------------- |:----------:| ---------------------------------------- |:----:|
| chainId | int | chain id | yes |
| sender | string | Transaction Creator Account Address | Yes |
| password | string | caller account password | yes |
| value | biginteger | The amount of the primary network asset that the caller transferred to the contract address. If there is no such service, fill BigInteger.ZERO | Yes |
| gasLimit | long | GAS Limit | Yes |
| price | long | GAS unit price | Yes |
| contractAddress | string | contract address | yes |
| methodName | string | contract method | yes |
| methodDesc | string | Contract method description, if the method in the contract is not overloaded, this parameter can be empty | No |
| args | object[] | List of parameters | No |
| remark | string | Transaction Notes | No|

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ----------- |
| txHash | string | Call contract trading hash |

