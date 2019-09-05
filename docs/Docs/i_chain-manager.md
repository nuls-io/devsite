Chain management module

## Why should I have the Chain Management module?

In nuls 1.0, there is only one chain (nuls main network), so no chain management module is needed.

In nuls 2.0, the nuls main network can register other friend information, including: 

- Chains in the nuls ecosystem: Derived from the same set of code as the nuls main network.
- Other chains: Bitcoin, Ethereum, etc.

The Chain Management module is used to manage all the friends that join the nuls main network.

Glossary:

- nuls main network: Unlike nuls 1.0, it is another chain that runs independently, also known as nuls 2.0.
  "Chain Management" is one of the modules of the nuls main network.
- Friends of the chain: other chains registered on the nuls main network

Hypothesis 1: Friendship chain a, which owns assets a

Hypothesis 2: Friendship chain b, which owns assets b

- Cross-chain trading:
  - Friend chain a transfers asset a to friend chain b
  - Friends of the chain b internal transfer assets a
  - Friends chain b turns asset a back to friend chain a
  - Friendship b transfers asset a to other friends (c, d, etc.)
- Non-chain trades:
  - Friends of the chain a internal transfer of assets a
  - Friends of the chain b internal transfer assets b

Remarks: Regardless of the assets in the chain or the assets outside the chain, as long as the assets are traded across the chain, the main network needs to be confirmed.

## "Chain Management" What to do

The Chain Management module is used to manage the basic information of the chain that joins the nuls main network, including:

* Register a new friend chain
* Destroy existing friendship chains
* Query friend information
* Increase the asset type for a specific friend chain
* Specific friend chain destruction asset type
* Cross-chain asset verification

## "Chain Management" positioning in the system

The module that Chain Management relies heavily on:

- Core module
- Network module
- Transaction management module
- Account module

"chain management" weakly dependent modules:

- Event bus module



## Interface List
### cm\_chainReg
Chain registration - cross-chain registration for parallel chains
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------------- |:---------------:| ----------------------- |:----:|
| chainId | int | Asset Chain Id, Value Range [3-65535] | Yes |
| chainName | string | chain name | yes |
| addressType | int | 1 Chain ecology built using the NULS framework, 2 ecological outside | Yes |
| addressPrefix | string | chain address prefix, 1-5 characters | yes |
| magicNumber | long | Network Magic Parameters | Yes |
minAvailableNodeNum | int | Minimum number of connections | Yes |
| assetId | int | Asset Id, value range [1-65535] | Yes |
| symbol | string | Asset Symbol | Yes |
| assetName | string | asset name | yes |
| initNumber | string | Asset Initial Value | Yes |
| decimalPlaces | short | Asset Decimal Places | Yes |
| address | string | Create an account address for the transaction | Yes |
| password | string | account password | yes |
| verifierList | list&lt;string> | List of verifiers list | Yes |
| signatureBFTRatio | integer | Byzantine scale, greater than or equal to the value of valid confirmation | Yes |
| maxSignatureCount | integer | Maximum number of signatures, limiting the maximum number of certifier signature lists | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| -------------------- |:------:| -------------- |
| txHash | string | Trading hash value |
| mainNetVerifierList | string | main network certifier list, comma separated |
| mainNetCrossSeedList | string | main network check seed node list, comma separated |

### cm\_chainActive
Chain Update Activation - Cross-chain update activation for parallel chains (activation of previously unregistered chains)
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------------- |:---------------:| ----------------------- |:----:|
| chainId | int | Asset Chain Id, Value Range [1-65535] | Yes |
| chainName | string | chain name | yes |
| addressType | int | 1 Chain ecology built using the NULS framework, 2 ecological outside | Yes |
| addressPrefix | string | chain address prefix, 1-5 characters | yes |
| magicNumber | long | Network Magic Parameters | Yes |
minAvailableNodeNum | int | Minimum number of connections | Yes |
| assetId | int | Asset Id, value range [1-65535] | Yes |
| symbol | string | Asset Symbol | Yes |
| assetName | string | asset name | yes |
| initNumber | string | Asset Initial Value | Yes |
| decimalPlaces | short | Asset Decimal Places | Yes |
| address | string | Create an account address for the transaction | Yes |
| password | string | account password | yes |
| verifierList | list&lt;string> | List of verifiers list | Yes |
| signatureBFTRatio | integer | Byzantine scale, greater than or equal to the value of valid confirmation | Yes |
| maxSignatureCount | integer | Maximum number of signatures, limiting the maximum number of certifier signature lists | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------------------ |:------:| -------------- |
| txHash | string | Trading hash value |
mainNetVerifierSeeds | string | Main Authenticator Seed List, Comma Separated |
| mainNetCrossConnectSeeds | string | main network check seed node list, comma separated |

### cm\_getChainsSimpleInfo
Get a list of cross-chain registered chains
#### scope:public
#### version:1.0

#### parameter list
No parameters

#### return value
| Field Name | Field Type | Parameter Description |
| ---------- |:------------:| ------------- |
| chainInfos | list&lt;map> | List of brief information about chains and assets |

### getCrossChainInfos
Get cross-chain registered asset information
#### scope:public
#### version:1.0

#### parameter list
No parameters

#### return value
| Field Name | Field Type | Parameter Description |
| ------------------------------------------------------------------- |:---------------:| ------------ |
| chainInfos | list&lt;object> | List of Registered Chains and Assets |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chainId | int | chain id |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chainName | string | Chain Name|
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minAvailableNodeNum | int | Minimum number of connections |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;assetInfoList | list | Asset Information List|

### cm\_chain
View chain information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ------------------- |:----:|
| chainId | int | Asset Chain Id, Value Range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------------------ |:-------:| ---------------------------- |
| chainId | int | chain id |
| chainName | string | chain name|
| addressType | string | Address Type (1: Nuls Ecology, 2: Other) |
| addressPrefix | string | address prefix |
| magicNumber | long | Magic Parameters |
| minAvailableNodeNum | int | Minimum Available Nodes |
| txConfirmedBlockNum | int | Number of transaction confirmation blocks |
| isDelete | boolean | Whether it has been logged out |
| createTime | long | creation time |
| regAddress | string | Address used when registering the chain |
| regTxHash | string | Trading hashes when registering chains |
| regAssetId | int | Asset number added when registering the chain |
| selfAssetKeyList | list | All assets created by this chain, Key=chaiId_assetId |
| totalAssetKeyList | list | All assets circulating in the chain, Key=chaiId_assetId |
| verifierList | list | Authenticator List |
| signatureByzantineRatio | int | Byzantine Scale |
| maxSignatureCount | int | Maximum number of signatures |
| mainNetVerifierSeeds | string | main network certifier list, comma separated |
| mainNetCrossConnectSeeds | string | The main network connection seed provided by the chain, separated by commas |
| enable | boolean | Available |

### cm\_getCirculateChainAsset
Query asset information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ---------------- |:------:| -------------------- |:----:|
| circulateChainId | string | Chain ID of the run, value range [1-65535] | Yes |
| assetChainId | string | Asset Chain Id, Value Range [1-65535] | Yes |
| assetId | string | Asset Id, value range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ---------------- |:----------:| ------ |
| circulateChainId | integer | Chain ID of Run |
| assetChainId | integer | Asset Chain ID |
| assetId | integer | Asset ID |
| initNumber | biginteger | Initial Asset Quantity |
| chainAssetAmount | biginteger | Current Assets |

### cm\_assetCirculateCommit
Query asset information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:---------------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| txList | list&lt;string> | Trading Hex Value List | Yes |
| blockHeader | string | Block Header Hex Value | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---------------- |
| N/A | void | No specific return value, submitted without success |

### cm\_assetCirculateRollBack
Query asset information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ----------- |:---------------:| -------------------- |:----:|
| chainId | int | Chain ID of the run, value range [1-65535] | Yes |
| txList | list&lt;string> | Trading Hex Value List | Yes |
| blockHeader | string | Block Header Hex Value | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---------------- |
| N/A | void | No specific return value, no validation is successful |

### updateChainAsset
Query asset information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------------:| ------------------- |:----:|
| chainId | int | Asset Chain ID, Value Range [1-65535] | Yes |
| assets | list&lt;int> | Asset id list | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---------------- |
| N/A | void | No specific return value, no validation is successful |

### cm\_assetCirculateValidator
Query asset information
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:------:| -------------------- |:----:|
| chainId | string | chain ID of the run, value range [1-65535] | Yes |
| tx | string | Trading Hex Value | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:----:| ---------------- |
| N/A | void | No specific return value, no validation is successful |

### cm\_assetReg
Asset registration
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------- |:----------:| ------------------- |:----:|
| chainId | int | Asset Chain Id, Value Range [1-65535] | Yes |
| assetId | int | Asset Id, value range [1-65535] | Yes |
| symbol | string | Asset Symbol | Yes |
| assetName | string | asset name | yes |
| initNumber | biginteger | Asset Initial Value | Yes |
| decimalPlaces | short | Asset Decimal Places | Yes |
| address | string | Create an account address for the transaction | Yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ------- |
| txHash | string | Trading hash value |

### cm\_assetDisable
Asset write-off
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| -------- |:------:| ------------------- |:----:|
| chainId | int | Asset Chain Id, Value Range [1-65535] | Yes |
| assetId | int | Asset Id, value range [1-65535] | Yes |
| address | string | Create an account address for the transaction | Yes |
| password | string | account password | yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------ |:------:| ------- |
| txHash | string | Trading hash value |

### cm\_asset
Asset registration information inquiry
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------- |:----:| ------------------- |:----:|
| chainId | int | Asset Chain Id, Value Range [1-65535] | Yes |
| assetId | int | Asset Id, value range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| --- |:-----------:| ----- |
| | regassetdto | Return chain information|

### cm\_getChainAsset
Asset view
#### scope:public
#### version:1.0

#### parameter list
| Parameter Name | Parameter Type | Parameter Description | Is Not Empty |
| ------------ |:----:| ------------------- |:----:|
| chainId | int | Run Chain Id, Value Range [1-65535] | Yes |
| assetChainId | int | Asset Chain Id, Value Range [1-65535] | Yes |
| assetId | int | Asset Id, value range [1-65535] | Yes |

#### return value
| Field Name | Field Type | Parameter Description |
| ------------ |:----------:| ----- |
| chainId | integer | Run Chain Id |
| assetChainId | integer | Asset Chain id |
| assetId | integer | Asset id |
| asset | biginteger | Asset Value |

