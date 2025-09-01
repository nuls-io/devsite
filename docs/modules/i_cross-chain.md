Cross link module



## Interface List
### createCrossTx
Create cross-chain transfer transaction/Creating Cross-Chain Transfer
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------------------------------------------------------- |:----------:| ------ |:----:|
| chainId | int | Chain ID | Yes |
| listFrom | list | Roll out information list | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | string | Account Address| Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsChainId | integer | Asset Chain ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsId | integer | Asset ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount | biginteger | Transfer Amount | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password | string | Account Password | Yes |
| listTo | list | Go to information list | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;address | string | Account Address| Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsChainId | integer | Asset Chain ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetsId | integer | Asset ID | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount | biginteger | Transfer Amount | Yes |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password | string | Account Password | Yes |
| remark | string | Notes | No |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| -------- |
| txHash | string | Cross-chain trading HASH |

### newApiModuleCrossTx
Receive API_MODULE assembled cross-chain transactions/Receiving cross-chain transactions assembled by API_MODULE
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| tx | string | Transactions | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ------ |
| txHash | string | Trading Hash |

### getCrossTxState
Query cross-transaction transaction state
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ------ |:----:|
| chainId | int | Chain ID | Yes |
| txHash | string | Trading HASH | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---------- |
| value | boolean | Cross-chain transaction is processed |

### getRegisteredChainInfoList
Query for cross-chain chain information registered on the main network
#### scope:public
#### version:1.0

#### parameter list
No parameters

#### return value
| Field Name | Field Type | Parameter Description |
| ------------------------------------------------------------------------------------------------------------- |:---------------:| --------- |
| list | list&lt;object> | Registered chain information across links |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chainId | int | Chain ID |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chainName | string | Chain Name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minAvailableNodeNum | int | Minimum number of links |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;maxSignatureCount | int | Maximum Signatures|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signatureByzantineRatio | int | Signature Byzantine Proportion|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;addressPrefix | string | Chain Account Prefix|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetInfoList | list&lt;object> | Chain Asset List|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetId | int | Asset ID |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;symbol | string | Asset Symbol|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetName | string | Asset Name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usable | boolean | Availability |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;decimalPlaces | int | Precision |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;verifierList | set | Verifier List |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;registerTime | long | Registration Time|

### getByzantineCount
Query current signature Byzantine minimum pass number / query current signature Byzantium minimum pass number
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:----:| ---------- |
| value | int | Current Byzantine Minimum Signature Number |

### getChains
cancel Cross Chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### registerCrossChain
Chain registration cross-chain / register Cross Chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------------- |:------:| ----- |:----:|
| chainId | int | Chain ID | Yes |
| chainName | string | chain name | yes |
minAvailableNodeNum | int | Minimum number of links | Yes |
| assetInfoList | string | Asset List | Yes |
RegisterTime | long | Chain Registration Time | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | Processing Results |

### cancelCrossChain
Specified chain asset exits cross-chain/Specified Chain Assets Exit Cross Chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| assetId | int | Asset ID | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | Processing Results |

### crossChainRegisterChange
Cross-chain registration information change / Registered Cross Chain change
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ---- |:----:|
| chainId | int | Chain ID | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### recvCirculat
Receiving asset information sent by other chain nodes/Receiving asset information sent by other link nodes
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### registerAsset
Chain registration cross-chain / register Cross Chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------- |:-------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| assetId | int | Asset ID | Yes |
| symbol | string | Asset Symbol | Yes |
| assetName | string | asset name | yes |
| usable | boolean | Available | Yes |
| decimalPlaces | int | Precision | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ----- |:-------:| ---- |
| value | boolean | Processing Results |

### getFriendChainCirculate
Get Friendship Chain Asset Information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ---------------- |:----:|
| chainId | int | Chain ID | Yes |
| assetIds | string | Asset ID, multiple asset IDs separated by commas | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### newBlockHeight
Chain block height change /receive new block height
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| height | string | chain ID | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### recvCtxState
Cross-chain transaction processing status message /receive cross transaction state
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### recvCtx
Receive Transaction Transaction for Receiving Broadcast from Local Chain Nodes
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### recvOtherCtx
Receiving Cross-Chain Node Broadcasting Complete Transaction/Receiving Complete Transactions for Cross-Chain Node Broadcasting
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### getCtxState
Get the state of cross-chain transaction processing
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### recvRegChain
Receiving chain information of registered cross-chain transactions returned from the main network
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### getCirculat
Query the asset information message /get chain circulation
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### recvCtxSign
Transaction signature for broadcasting in receiving chain
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### getCtx
The intra-chain node acquires and completes the cross-chain transaction from its own node
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### getOtherCtx
Cross-chain nodes obtain complete transactions from their own nodes
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

### recvCtxHash
Receive Hash/Transaction Hash receiving cross-link node broadcasting
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:------:| ---- |:----:|
| chainId | int | Chain ID | Yes |
| nodeId | string | node IP | yes |
| messageBody | string | message body | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| -------------- |
| N/A | void | No specific return value, no error is successful |

