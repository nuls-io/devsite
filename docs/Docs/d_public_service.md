# Public-service module Design Document

## Overall overview

### Module Overview

#### Why do you have a public-service module?

During the operation of the blockchain project, the data generated in the chain will be broadcasted to each other, and each node will also store the data.However, these data cannot be displayed to the user intuitively, and the user needs to query the relevant data is also very troublesome.Public-service refers to providing users with a data and related statistics on the chain through the browser or web wallet.

#### What does public-service do?

Parse the block to which the node wallet has been synchronized, and store the data in a database that provides relational queries and statistics.

Externally provide interfaces such as query block, transaction, account, consensus information, contract information, and statistical information.

#### Public-service positioning in the system

The public-service belongs to the auxiliary module, not the underlying core module, so the default wallet will not run the module after it is started.

Before running public-service, the server needs to install the database first. The default implementation is the mongoDB database.

## feature design

### Functional Architecture

![](/img/public-service-functions.png)



### Interface Description

**io.nuls.api.analysis**

Responsible for calling the underlying module interface and parsing the data returned by the interface

WalletRpcHandler: public-service calls other module RPC interface processing class

AnalysisHandler: public-service parsing the underlying block data processing class

**io.nuls.api.db**

Provide interface and implementation of public-service database addition, deletion and change

**io.nuls.api.model**

Public-service data structure, including the persistence layer, dto layer

**io.nuls.api.rpc**

Provide rpc interface externally, query block, transaction, account information, etc.

**io.nuls.api.service**

Main-service synchronization block and rollback block main service interface

SyncService: sync block

RollbackService: rollback block

**io.nuls.api.task**

Public-service scheduled tasks, including synchronous block tasks, statistical tasks, etc.

SyncBlockTask: Timing task for sync block

## module rpc interface

Refer to [NULS2.0-API Interface Document] (./account.md)

 

## Java-specific design

### java implementation details brief description

**io.nuls.api.cache.ApiCache**

Common data on the cache chain, including chain information, account information, consensus information, statistics, and so on.

**io.nuls.api.task.SyncBlockTask**

Call the underlying block module interface to obtain the next block. After the block continuity verification succeeds, store the data to mongoDB and continue to obtain the next block information. If the block hash continuity verification fails, roll back the currently stored latest block. Block until the continuity verification passes.

If the next block is not obtained, the current public-service has been parsed to the latest height. After every 10 seconds, the block with the latest height is retrieved and parsed and stored.

**io.nuls.api.service.SyncService**

The main interface of the synchronization block first needs to process the statistics of the block rewards, and then process the data related to each service according to different transactions, process the information related to the rounds, and finally store the parsed data in the database.

