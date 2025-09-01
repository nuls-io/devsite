Cross link module design document


## Overall description

### Module Overview

#### 1 Why do you have a "cross-chain" module?

	In the nuls2.0 ecosystem, multiple parallel links of different protocols are allowed to run at the same time. Because different parallel chain protocols are different, the protocol interaction between them needs to be transferred by the nuls main network. The cross-chain module is used to The link protocol is converted into a nuls main network protocol and a functional module that converts the received nuls main network protocol into the chain protocol.

#### 2What to do with "cross-chain"

- Initiate cross-chain transactions to convert cross-chain transactions into primary network transactions
- Byzantine signature in a cross-chain trading chain
- Broadcast cross-chain related transactions
- Cross-chain trading protocol conversion
- Byzantine verification of out-of-chain cross-chain trading
- Out-of-chain asset management
- Cross-chain certifier maintenance
- Verifier change maintenance

#### 3 "cross-chain" positioning in the system

	In the nuls2.0 ecosystem, the cross-chain module is mainly responsible for the initiation, verification, protocol conversion, out-of-chain asset maintenance, and certifier change maintenance of cross-chain transactions.

Dependent module

* Transaction management module
* Network module
* Consensus module
* Chain management module (main network needs to depend, parallel chain does not need to rely on)
* Account module

## Module Configuration

```
minNodeAmount The number of primary network nodes that need to be connected at least when the parallel chain interacts with the primary network.
maxNodeAmount The maximum number of cross-chain nodes connected to a node
sendHeight How many block confirmations are needed after the cross-chain transaction is packaged
byzantineRatio This chain cross-chain transaction signature Byzantine proportion (this value must be greater than or equal to the time when the main network is registered in the chain							   The chain signature Byzantine ratio)
crossSeedIps main network cross-chain seed node
Verifiers primary network certifier initial list, this value is the primary network seed node outbound address list
mainByzantineRatio main network cross-chain transaction signature Byzantine ratio (this value must be less than or equal to the cross-chain signature Byzantine ratio in the main network distribution chain)
maxSignatureCount The maximum number of Byzantine signatures set by the primary network
```

## feature design

### Functional Architecture

![](design/cross-chain/cross_chain_functions.png)

### Core Process

#### 1.Initialization chain

When the module starts, it needs to read the configuration information of all the existing chains to initialize each chain. The default chain of the configuration will be started for the first time.

- Basic information about the initialization chain

  Load chain configuration information, initialize various logos, status, etc. when running the chain.

- Initialize the chain RocksDB table

  Create a db table for each data store in the chain runtime.

- Initialize the log of the chain

  Create individual print log objects for the chain.

- Register relevant information with the dependency module

  Register the transaction of this module with the transaction module, register the protocol of this module with the network, activate the cross-chain network, and register the chain address prefix with the account module.

- Initialize the chain's cache

  Create a cache and queue for the chain runtime.

- Initialize chain task scheduler and worker thread

  Create various timing tasks and threads for the chain runtime.

#### 2.Registration chain

Parallel chain to achieve cross-chain function, you first need to register the chain information in the nuls main network (this chain magic parameters, certifier list, cross-chain asset information, etc.)

#### 3. Initialize the verifier

After the parallel chain registers the cross-chain transaction on the main network, it needs to synchronize the current certifier list of the main network, and also needs to synchronize the current certifier list of the chain to the main network.

![](./design/cross-chain/VerifireInit.jpg)

##### 3.1 Main network certifier initialization

- The main network creates an initial certifier list transaction
- Initiating seed node signature in the chain Byzantine verification
- Bypassing the transaction to the registration chain after Byzantine verification

##### 3.2 Parallel Chain Verifier Initialization

- Received an initial certifier list transaction sent from the main network
- Sign the transaction with the main network initialization certifier list configured by this chain. Byzantine verification
- Verify that the main chain initialization certifier list is refreshed by the main chain
- Create an initial chain certifier list transaction
- Initiating seed node signature in the chain Byzantine verification
- After the Byzantine verification is passed, the transaction is broadcast to the main network

##### 3.3 Main network update registration chain certifier list

- Received an initial certifier list transaction sent from the registration chain
- Sign the transaction by signing Byzantine verification with the list of initial certifiers filled in when registering with the registration chain
- Verify the registration chain certifier list by verification

#### 4.Verifier change

When a new certifier joins or a certifier exits in the parallel chain, the new and revoked certifier information broadcast needs to be notified to the main network. Similarly, when the new certifier joins or the certifier cancels, the new network needs to be added. Increased and cancelled certifier information broadcasts all flat new chains

##### 4.1 Main network certifier change

![](./design/cross-chain/MainNet-VerifierChange.jpg)

- The main network has a certifier added or the certifier is logged off
- Create a certifier change transaction (including a list of certifiers added and logged out)
- Initiating in-chain Byzantine signature verification
- Byzantine verification pass, broadcast the main network certifier change information to all parallel chains registered on the main network
- After receiving the change transaction of the main network certifier, the parallel chain verifies that the main network certifier changes the transaction, and updates the list of the main network certifier after the verification is passed.

##### 4.2 Parallel Chain Verifier Change

- Parallel chain with certifier added or verified person logged off
- Create a certifier change transaction (including a list of certifiers added and logged out)
- Initiating in-chain Byzantine signature verification
- Byzantine verification passed, broadcast parallel chain certifier change information to the main network
- The main network receives the parallel chain certifier change transaction and verifies the parallel chain certifier change transaction, validates the pass, and updates the Pingxin chain certifier list

#### 5. Create cross-chain transfer transactions

Cross-chain transfer transaction fees consume nuls, so parallel chain accounts need to ensure that the account has enough nuls when initiating cross-chain transfer transactions.

##### 5.1 Main network to parallel chain

![](./design/cross-chain/Main-Parallel-Ctx.jpg)

###### 5.1.1 Main network process

- Initiate cross-chain transfer transactions
- Verify cross-chain transfer transactions, including whether the receiving chain is registered cross-chain, whether the transfer account nuls is sufficient to pay fees, etc.
- After the verification is passed, initiate the in-chain signature Byzantium
- After the Byzantine verification is passed, the cross-chain transfer transaction is broadcast to the receiving chain

###### 5.1.2 Receiving chain process

- Receive the link to receive the cross-chain transfer transaction broadcasted by the main network.
- Signature of cross-chain transfer transactions for main network broadcasts by Byzantine verification
- After the verification is passed, the main network protocol cross-chain transaction is converted into the chain protocol cross-chain transaction, and the transaction module is processed. When the transaction module is processed, the transaction is packaged.

##### 5.2 Parallel chain transfer main network

![](./design/cross-chain/Parallel-Main-Ctx.jpg)

###### 5.2.1 Initiating chain process

- Initiate cross-chain transfer transactions
- Verify cross-chain transfer transactions, including whether the chain is registered cross-chain, receive chain is registered cross-chain, transfer account nuls is enough to pay fees, etc.
- After the verification is passed, initiate the in-chain signature Byzantium
- After the Byzantine verification is passed, the chain link trans-transaction is converted into a main network protocol cross-chain transfer transaction broadcast to the main network

###### 5.2.2 Main network process

- The main network receives the cross-chain transfer transaction of the parallel chain broadcast after the cross-chain transfer transaction broadcasted by the parallel chain, and signs the Byzantine verification.
- After the verification is passed, the transaction module is processed. When the transaction module is processed, the transaction is packaged.

##### 5.3 Parallel chain a to parallel chain b

![](./design/cross-chain/Parallel-Parallel-Ctx.jpg)

###### 5.3.1 Initiating chain process

- Initiate cross-chain transfer transactions
- Verify cross-chain transfer transactions, including whether the chain is registered cross-chain, receive chain is registered cross-chain, transfer account nuls is enough to pay fees, etc.
- After the verification is passed, initiate the in-chain signature Byzantium
- After the Byzantine verification is passed, the chain link trans-transaction is converted into a main network protocol cross-chain transfer transaction broadcast to the main network

###### 5.3.2 Main network process

- The main network receives the cross-chain transfer transaction of the parallel chain broadcast after the cross-chain transfer transaction broadcasted by the parallel chain, and signs the Byzantine verification.
- After the verification is passed, the transaction module is processed. When the transaction module is processed, the transaction is packaged.
- Determine whether the main network is the receiving chain. If the main network is not the receiving chain, clear the existing signature list of the cross-chain transfer transaction and sign the transaction in the main network chain. Byzantium
- The signature in the main network chain is completed by Byzantium, and the cross-chain transaction after Byzantine in the main network chain is broadcast to the receiving chain.

###### 5.3.3 Receiving chain process

- Receive the link to receive the cross-chain transfer transaction broadcasted by the main network.
- Signature of cross-chain transfer transactions for main network broadcasts by Byzantine verification
- After the verification is passed, the main network protocol cross-chain transaction is converted into the chain protocol cross-chain transaction, and the transaction module is processed. When the transaction module is processed, the transaction is packaged.

#### 6. Intra-chain signature Byzantine process

- Create a new cross-chain transaction to determine if the local node is a certifier node
- If the local is a certifier node, sign the cross-chain transaction and broadcast the signature to other nodes in the chain
- Collect signatures of cross-chain transactions by this chain certifier
- When the number of signatures collected >= minimum number of Byzantine signatures (the number of current certifiers in the chain * the signature Byzantine ratio of the current chain configuration), after invalid signatures (not the signature of the current certifier of the chain), if valid signatures >= The minimum number of signatures indicates that the in-chain signature of the cross-chain transaction is completed by Byzantium

#### 7. Receive cross-chain transaction signature Byzantine verification process

- Cross-chain transactions that receive other chain broadcasts
- Verify the correctness of cross-chain transaction signatures
- Query the certifier list of the sending chain and the signature Byzantine ratio information
- Verify the number of cross-chain transaction signatures >= Number of minimum Byzantine signatures in the delivery chain (number of verifiers * Byzantine ratio)
- Verify that the cross-chain transaction signature is a certifier signature
- If the above several are verified, the received cross-chain transaction signature is verified by Byzantium.



## Module Service

Refer to [cross-chain module RPC-API interface documentation](./i_cross-chain.md)


## Agreement

### 1.BroadCtxHashMessage

- Message description: Cross-chain broadcast cross-chain trading Hash

- cmd:recvCtxHash

  | Length | Fields      | Type   | Remark               |
  | ------ | ----------- | ------ | -------------------- |
  | ? | convertHash | byte[] | main network protocol cross-chain transaction hash |

### 2.BroadCtxSignMessage

- Message description: Broadcast cross-chain transaction signature to other nodes in the chain

- cmd:recvCtxSign

  | Length | Fields    | Type   | Remark               |
  | ------ | --------- | ------ | -------------------- |
  | ? | localHash | byte[] | This chain protocol cross-chain trading hash |
  | ? | signature | byte[] | Cross-chain transaction signature|

### 3.GetCtxMessage

- Message description: Get complete cross-chain transactions from other nodes in the chain

- cmd:getCtx

  | Length | Fields      | Type   | Remark               |
  | ------ | ----------- | ------ | -------------------- |
  | ? | requestHash | byte[] | This chain protocol cross-chain trading hash |

### 4.GetOtherCtxMessage

- Message description: Get complete cross-chain transactions from the sending chain

- cmd:getOtherCtx

  | Length | Fields      | Type   | Remark               |
  | ------ | ----------- | ------ | -------------------- |
  | ? | requestHash | byte[] | main network protocol cross-chain transaction hash |

### 5.NewCtxMessage

- Message description: Received a complete cross-chain transaction sent by other nodes in the chain

- cmd:recvCtx

  | Length | Fields      | Data Type | Remark                         |
  | ------ | ----------- | --------- | ------------------------------ |
  | 2 | type | uint16 | Transaction Type |
  | 4 | time | uint32 | Trading Hours |
  | ? | txData | VarByte | Transaction data, store the original cross-chain transaction Hash |
  | ? | coinData | VarByte | Transaction Inputs and Outputs |
  | ? | remark | VarString | Notes |
  | ? | scriptSig | VarByte | Digital Scripting and Transaction Signature |
  | ? | requestHash | byte[] | main network protocol cross-chain transaction hash |

### 6.NewOtherCtxMessage

- Message description: Received a complete cross-chain transaction sent by other chain nodes

- cmd:recvOtherCtx

  | Length | Fields      | Data Type | Remark                         |
  | ------ | ----------- | --------- | ------------------------------ |
  | 2 | type | uint16 | Transaction Type |
  | 4 | time | uint32 | Trading Hours |
  | ? | txData | VarByte | Transaction data, store the original cross-chain transaction Hash |
  | ? | coinData | VarByte | Transaction Inputs and Outputs |
  | ? | remark | VarString | Notes |
  | ? | scriptSig | VarByte | Digital Scripting and Transaction Signature |
  | ? | requestHash | byte[] | main network protocol cross-chain transaction hash |

### 7.GetCtxStateMessage

- Message description: Other chain nodes query the node for cross-chain transaction processing status

- cmd:getCtxState

  | Length | Fields      | Type   | Remark               |
  | ------ | ----------- | ------ | -------------------- |
  | ? | requestHash | byte[] | main network protocol cross-chain transaction hash |

### 8.CtxStateMessage

- Message description: Received cross-chain transaction processing result return value

- cmd:recvCtxState

  | Length | Fields       | Type   | Remark                                            |
  | ------ | ------------ | ------ | ------------------------------------------------- |
  | ? | requestHash | byte[] | main network protocol cross-chain transaction hash |
  | 1 | handleResult | byte | Cross-chain transaction processing result 0 unconfirmed 1 main network confirmed 2 receiving chain confirmed |

### 9.GetCirculationMessage

- Message description: The parallel chain node receives the query attribute information message sent by the primary network node.

- cmd:getCirculat

  | Length | Fields   | Type   | Remark                                         |
  | ------ | -------- | ------ | ---------------------------------------------- |
  | ? | assetIds | String | Parallel chain asset IDs that need to be queried (multiple asset IDs separated by commas) |

### 10.CirculationMessage

- Message description: The main network receives the parallel chain asset message

- cmd:recvCirculat

  | Length | Fields          |  Type   | Remark                          |
  | ------ | --------------- | :-----: | ------------------------------- |
  | ? | circulationList | VarByte | Parallel Chain Asset List List&lt;Circulation> |

- Circulation

  | Length | Fields          | Type       | Remark   |
  | ------ | --------------- | ---------- | -------- |
  | 2 | assetId | uint16 | Asset ID |
  | ? | availableAmount | BigInteger | Available Assets |
  | ? | freeze | BigInteger | Freeze assets |

### 11.GetRegisteredChainMessage

- Message description: Parallel chain queries the main network for all registered chain links
- cmd:getChains



### 12.RegisteredChainMessage

- Message description: Parallel link receives the information of the registered cross-chain chain returned by the main network

- cmd:recvRegChain

  | Length | Fields        |  Type   | Remark                            |
  | ------ | ------------- | :-----: | --------------------------------- |
  | ? | chainInfoList | VarByte | List of registered cross-chain chains List&lt;ChainInfo> |

- ChainInfo

  | Length |         Fields          |   Type    |         Remark          |
  | :----: | :---------------------: | :-------: | :---------------------: |
  | 2 | chainId | uint16 | Chain ID |
  | ? | chainName | VarString | Chain Name|
  | 2 | minAvailableNodeNum | uint16 | Cross-chain minimum link count |
  | 2 | maxSignatureCount | uint16 | Signature Byzantium Maximum Signatures |
  | 2 | signatureByzantineRatio | uint16 | Signature Byzantine Scale |
  | ? | addressPrefix | VarString | Address Prefix |
  | 4 | registerTime | uint32 | Registration Time |
  | ? | assetInfoList | VarByte | Asset List List&lt;AssetInfo> |
  | ? | verifierList | VarByte | Validator List Set&lt;String> |

- AssetInfo

  | Length |    Fields     |  Type   |  Remark  |
  | :----: | :-----------: | :-----: | :------: |
  | 2 | assetId | uint16 | Asset id |
  | ? | symbol | String | Asset Symbol |
  | ? | assetName | String | Asset Name|
  | 2 | usable | boolean | Available |
  | 2 | decimalPlaces | uint16 | Asset Precision |

