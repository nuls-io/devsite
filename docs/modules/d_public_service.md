# Public-Service Module Design Document

## Overall overview

### Module Overview

#### Why do you have a public-service module?

Public-Service provides users an easy method to query and obtain historical blockchain data and related statistics via JSON Remote Procedure Call. Generated blockchain data will be broadcasted to all the nodes, and each node will store the data. Accessing blockchain data without public_service is difficult.

#### What does public-service do?

Public-Service parses the block to which the node wallet has been synchronized, and stores the data in a database that accomodates relational queries.

Public-Service provides external interfaces for data query of block, transaction, account, consensus information, contract information, and statistical information.

#### Public-service positioning in the system

The public-service belongs to the auxiliary module, not the underlying core module, so the default wallet will not run the module after it is started.

Public-service requires a database. The default implementation is the mongoDB database. Install the database before running public-service.

For usage information about public-service, consult the [Public-Service Interface Document](https://docs.nuls.io/Docs/i_public_service.html#introduction).


## Feature Design

### Functional Architecture

Here is the four services provided by public-service via the [api-module]( *** address required/img/public-service-functions.png).  The value of this diagram is to give the reader an idea of the services provided and what can be requested within each service.







### Interface Description

**io.nuls.api.analysis**

Responsible for calling the underlying module interface and parsing the returned data.

WalletRpcHandler: public-service calls other module RPC interface processing class.

AnalysisHandler: public-service parses the underlying block data processing class.

**io.nuls.api.db**

Provides the interface and implementation of public-service database addition, deletion, and change.

**io.nuls.api.model**

Provides the public-service data structure, including the persistence layer, dto layer.

**io.nuls.api.rpc**


Provides the external rpc interface to query information about block, transaction, account, etc.

**io.nuls.api.service**

Main-service synchronization block and rollback block main service interface.

SyncService: sync block.

RollbackService: rollback block.

**io.nuls.api.task**

Schedules public-service tasks, including synchronous block tasks, statistical tasks, etc.

SyncBlockTask: Timing task for sync block.

## Module Rpc Interface

Refer to [NULS2.0-API Interface Document](https://docs.nuls.io/Docs/i_account.html)
Refer to [Public-Service Interface Document](https://docs.nuls.io/Docs/i_public_service.html#introduction).
 

## Java-specific design

### java implementation details -- a brief description

**io.nuls.api.cache.ApiCache**

Access cached blockchain data including chain information, account information, consensus information, statistics.

**io.nuls.api.task.SyncBlockTask**

1. Get the next block.
2. "block continuity verification" -- Verify that the returned block is the next block. If yes, parse the data and store it in mongoDB, and get the next block.
3. If continuity verfication fails: roll back the current block. Get the next block.

If the next block is not obtained, the current block is the latest block. After every 10 seconds the latest block is retrieved, parsed and stored.

**io.nuls.api.service.SyncService**

1. Store the latest block header information
2. Store transaction and address relationship information
3. Store transactions
4. Update the balance of each address according to the transaction
5. Process and store business data for transaction selected, and then store the parsed data in the database.

