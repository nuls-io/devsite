# Ledger Module

## Why do you have a "book module"?

> The ledger module is the data hub of the blockchain. The balances and transactions of all accounts are saved in the ledger module.
  A network-wide account book is saved on each network node to ensure complete, open and transparent data, while ensuring that data cannot be tampered and traceable.

## What does the "book module" do?

> Provide data support for assembly transactions, mainly accounting and auditing, verify the legality of the transaction, such as: whether there is sufficient balance, whether to repeat payment (double flower)

## "Book Module" positioning in the system

> The ledger module is the data hub, which stores the result data of all existing transactions in the system. It does not depend on any business modules, and other modules depend on it as needed.
Explanation of nouns in ##《本本模块》

- The random number of the transaction (nonce, the last 8 bytes of the transaction hash value)
  - nonce: A scalar value equal to the number of transactions sent at this address, which will be included in every transaction initiated by the user.
  - Each transaction in the account needs to save the previous nonce of the transaction.
  - Strictly speaking, a nonce is an attribute of the originating address (it only makes sense in the context of the sending address).However, the nonce is not explicitly stored in the blockchain as part of the account status.
  - The nonce value is also used to prevent incorrect calculation of account balances.For example, suppose an account has 10 NULS balances and signs two transactions, all of which cost 6 NULS with nonce 1 and nonce 2, respectively.Which of these two transactions is valid? In a blockchain distributed system, nodes may receive transactions out of order.Nonce forces transactions of any address to be processed in order, regardless of the interval, regardless of the order in which the nodes receive.This way, all nodes will calculate the same balance.Payments for 6 Ethereum will be processed successfully and the account balance will be reduced to 4 ether.Whenever it is received, all nodes consider it invalid with a transaction with nonce 2.If a node receives a nonce 2 transaction first, it will hold it, but will not commit it until it receives and processes the nonce 1 transaction.
  - Use nonce to ensure that all nodes calculate the same balance and sort the transactions correctly, which is equivalent to the mechanism used in Bitcoin to prevent "double payment".However, because Ethereum tracks account balances and does not track individual coins separately (called UTXO in Bitcoin), "double payments" only occur when the account balance is incorrectly calculated.The nonce mechanism can prevent this from happening.
  


## Interface List
### blockValidate
Whole block accounting verification
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:---------------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| txList | list&lt;string> | []Trade Hex Value List | Yes |
| blockHeight | long | Block Height | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------------------ |
| value | boolean | true processed successfully, false processing failed |

### verifyCoinData
Unconfirmed transaction check
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| tx | string | Trading Hex Value | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:-------:| --------------- |
Orphan | boolean | true orphan, false non-orphan |

### rollbackTxValidateStatus
Rollback package check status
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| tx | string | Trading Hex Value | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------------------ |
| value | boolean | true rollback success, false rollback failure |

### verifyCoinDataBatchPackaged
Package transaction check
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:---------------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| txList | list&lt;string> | []Transaction List (HEX Value List) | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------- |:---------------:| ------------- |
Fail | list&lt;string> | Verify failed Hash value list|
| orphan | list&lt;string> | Check the list of hash values for orphans|
| success | list&lt;string> | Verify the list of successful hash values|

### batchValidateBegin
Start bulk packaging: status notification
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ------------------ |
| value | boolean | true processed successfully, false processing failed |

### commitUnconfirmedTx
Unconfirmed transaction submitted to the ledger (check and update the nonce value)
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| -------------------- |:----:|
| chainId | string | chain Id of operation, value range [1-65535] | Yes |
| tx | string | Trading Hex Value | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:-------:| --------------------- |
Orphan | boolean | true orphan trading, false non-orphan trading |

### commitBatchUnconfirmedTxs
Unconfirmed transaction batch submission of bills (check and update nonce value)
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| -------------------- |:----:|
| chainId | string | chain Id of operation, value range [1-65535] | Yes |
| txList | string | []Trade Hex Value List | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:---------------:| ------------ |
Orphan | list&lt;string> | Orphan Trading Hash List|
| fail | list&lt;string> | Verify failed transaction Hash list|

### rollBackUnconfirmTx
Roll back the submitted unconfirmed transaction
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| tx | string | Trading Hex Value | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---------------- |
| value | boolean | true success, false failure |

### clearUnconfirmTxs
Clear all account unconfirmed transactions
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---------------- |
| value | boolean | true success, false failure |

### commitBlockTxs
Submit block
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:---------------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| txList | list&lt;string> | Trading Hex Value List | Yes |
| blockHeight | long | Block Height | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---------------- |
| value | boolean | true success, false failure |

### rollBackBlockTxs
Block rollback
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:---------------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| txList | list&lt;string> | []Trade Hex Value List | Yes |
| blockHeight | string | Block Height | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---------------- |
| value | boolean | true success, false failure |

### getNonce
Get the account asset nonce value
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| assetChainId | int | Asset Chain Id, Value Range [1-65535] | Yes |
| assetId | int | Asset Id, value range [1-65535] | Yes |
| address | string | address of the asset | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:-------:| ------------------------- |
| nonce | string | account asset nonce value |
| nonceType | integer | 1: confirmed nonce value, 0: unconfirmed nonce value |

### getBalance
Get account assets (into the block)
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:------:| ------------------- |:----:|
| chainId | int | Run Chain Id, Value Range [1-65535] | Yes |
| assetChainId | int | Asset Chain Id, Value Range [1-65535] | Yes |
| assetId | int | Asset Id, value range [1-65535] | Yes |
| address | string | address of the asset | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------- |:----------:| ---- |
| total | biginteger | Total Amount |
| freeze | biginteger | Freeze amount |
| available | string | Available Amount |

### getBalanceNonce
Get account asset balance and nonce value
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| assetChainId | int | Asset Chain Id, Value Range [1-65535] | Yes |
| assetId | int | Asset Id, value range [1-65535] | Yes |
| address | string | address of the asset | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ---------------- |:----------:| ------------------------- |
| nonce | string | account asset nonce value |
| nonceType | integer | 1: confirmed nonce value, 0: unconfirmed nonce value |
| available | biginteger | Available Amount |
| permanentLocked | biginteger | Permanent Locked Amount |
| timeHeightLocked | biginteger | Height or Time Locked Amount |

### getFreezeList
Paging to get a list of account lock assets
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:------:| ------------------- |:----:|
| chainId | int | Run Chain Id, Value Range [1-65535] | Yes |
| assetChainId | int | Asset Chain Id, Value Range [1-65535] | Yes |
| assetId | int | Asset Id, value range [1-65535] | Yes |
| address | string | address of the asset | yes |
| pageNumber | int | Number of Starts | Yes |
| pageSize | int | Number of pages per page | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----------------------------------------------------------- |:---------------:| --------------- |
| totalCount | integer | Total Records |
| pageNumber | integer | Number of Starts |
| pageSize | integer | Number of pages per page |
| list | list&lt;object> | Locked Money List |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txHash | string | Trading hash |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount | biginteger | Locked Amount |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lockedValue | long | Lock time or height, -1 is permanent lock |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;time | long | Transaction time, seconds |

### getAssetsById
Amount information of the specified asset collection under the query chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| assetIds | string | asset id, comma separated | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --------------- |:----------:| ---- |
| assetId | integer | Asset id |
| availableAmount | biginteger | Available Amount |
| freeze | biginteger | Freeze amount |

