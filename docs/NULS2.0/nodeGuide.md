# Node Program Configuration
## Configuration files
Core configuration file of the wallet, in which all modules can be configured.
### Structure of configuration file 
It employs the structure of Windows-like configuration file, which is divided into group and parameter.

```
[network] # group
Port=18001 # Parameter `key` and value
```
The content inside nuls.ncf looks like this.

```
[global]
Encoding=UTF-8
Language=en
. . .
[account]
keystoreFolder=/keystore/backup

[network]
Port=10081
...
```
[global] is a special group, in which all modules inherit configuration items. The global universal configuration can be configured under this group.
[account], [network] are the exclusive configurations of the account module and network module. The name corresponds to the `APP_NAME` in the `Module.ncf` of the module.
When [global] and the module group have the same configuration item, the configuration in the module group has a higher priority and overrides the configuration in the `global`.

### Relationship with configuration files in the module
In the module directory (such as Modules/Nuls/account/1.0.0), there is a configuration file of Module.ncf. The priority of external `nuls.ncf` is higher than that of Module.ncf in the module. So when the configuration item with the same name appears, the item in nuls.ncf will override the item with the same name in the module.

### Generating configuration file
When the wallet program is downloaded or packaged for the first time, the nuls.ncf file does exist. And it will be automatically generated for the first time of executing start or start-dev.

### [Configuration description of nuls.ncf](#nuls.ncf)

## Basic Command
### start
Wallet startup script, it is used in the production environment to launch the wallet

```
./start
```
### stop
Wallet stop script, it is used in production environment to stop wallet

```
./stop
```
### start-dev
Start the NULS2.0 development environment (compatible with macOS system)
```
./start-dev
```
### stop-dev
Stop the NULS2.0 development environment
```
./stop-dev
```
### cmd
Start the command line and perform wallet-related operations.

```
./cmd
```
Specify the log level. ERROR by default, optional log levels are DEBUG, INFO, WARN and ERROR

```
./cmd -l DEBUG # set the log level to DEBUG
```
Specify the path of the configuration file. By default the nuls.ncf is generated in the same directory

```
./cmd -c /home/my.ncf
```
### check-status
Check the startup status of the module. This function allows you to quickly check if each basic module is successfully started. The script logic is to read the log flag bits in the log file.

```
./check-status
```
Execution return
```
==================MODULE PROCESS====================
account PROCESS IS START
block PROCESS IS START
consensus PROCESS IS START
ledger PROCESS IS START
network PROCESS IS START
transaction PROCESS IS START
==================RPC REDAY MODULE==================
account RPC READY
block RPC READY
consensus RPC READY
ledger RPC READY
network RPC READY
transaction RPC READY
======================REDAY MODULE==================
account STATE IS READY
block STATE IS READY
consensus STATE IS READY
ledger STATE IS READY
network STATE IS READY
transaction STATE IS READY
================TRY RUNNING MODULE==================
account TRY RUNNING
block TRY RUNNING
consensus TRY RUNNING
ledger TRY RUNNING
network TRY RUNNING
transaction TRY RUNNING
===================RUNNING MODULE===================
account STATE IS RUNNING
block STATE IS RUNNING
consensus STATE IS RUNNING
ledger STATE IS RUNNING
network STATE IS RUNNING
transaction STATE IS RUNNING
==================NULS WALLET STATE=================
==========================
NULS WALLET IS RUNNING
==========================
```
The message NULS WALLET IS RUNNING indicates the success of the startup.
### create-address
Generate account address and private key. You can run it independently to generate address without relying on the wallet.
```
./create-address
chainId: 2
Number:1
=========================================================== ===========================================================
Address :tNULSeBaMi3UWVb1hMrsoEmv4XPPLW7CKmBVgn
privateKey:e27e3961384bc4749cb5bd535b16c90c4430d4da2cd34e1edd10b50b0d01fa1d
=========================================================== ===========================================================
```
Generate the chainId of the specified address

```
./create-address -c 1 # specify chainId to 1 (by default, reading chainId from nuls.ncf)
```
Generate the specified number of addresses

```
./create-address -n 100 # generate 100 addresses in batches (1 by default)
```
## Appendix
### <span id="nuls.ncf">nuls.ncf Configuration File</span>
#### Global configuration: group
| Item | Value Range | Description |
| --- | --- | --- |
| encoding | character set | UTF-8 by default, not recommended to modify |
| language | en/zh_CHS | language package |
| logPath | relative path of the folder| storage path of log file, configuring the context relative path of file |
logLevel | DEBUG,INFO,WARN,ERROR | log level |
| dataPath | relative path of the folder | storage path of data file, configuring the context relative path of file |
| chainId | positive integer | chain ID of the default running chain |
| assetId | positive integer | main asset ID of the default running chain |
| chainName | string | name of the default running chain |
| symbol | string | main asset symbol of the default running chain |
| decimals | positive integer | number of digits to the right of the decimal point of the default asset |
| blackHolePublicKey | string | public key of the black hole address |

#### Configuration of the network module : network

| Item | Value Range| Description |
| --- | --- | --- |
| port | positive integer | communication port of network |
| CrossPort | positive Integer | communication port of cross-chain transaction |
| packetMagic | positive integer | network magic parameters, network connection happens only if the magic parameter are be the same |
| selfSeedIps | string | network node IP connected to by default, separated by English commas for multiple IPs|
| maxInCount | positive integer | maximum incoming connections to the current node |
| maxOutCount | Positive integer | maximum outgoing connections for the current node  |

#### Configuration of the account module : account

| Item | Value Range | Description |
| --- | --- | --- |
| keystoreFolder | folder path | path of the file storing the account keystore, which is the path in the `dataPath` |

#### Configuration of the block module : block

| Item | Value Range| Description |
| --- | --- | --- |
| blockMaxSize | positive integer | maximum number of bytes a block can store |
| extendMaxSize | positive integer | maximum number of bytes the extension field in a block can store |
| chainSwtichThreshold | positive Integer | height difference threshold for forking chain switching |
| maxRollback | positive integer | local maximum rollback number in case of local block inconsistent with the network block |
|consistencyNodePercent | positive Integer | percentage threshold of the latest block height and hash consistency of nodes on the network |
| minNodeAmount | positive integer | minimum number of connecting nodes, continually waiting in case of the connecting network node less than this value |
| downloadNumber | positive integer | number of blocks downloaded from nodes on the network each time during block synchronization |
|SingleDownloadTimeout | positive integer | timeout for downloading a single block from nodes on the network |
| batchDownloadTimeout | positive integer | timeout for downloading multiple blocks from nodes on the network |
| cachedBlockSizeLimit | positive integer | maximum number of block bytes cached during block synchronization |

#### Configuration of the poc consensus module : consensus

| Item | Value Range| Description |
| --- | --- | --- |
| seedNodes | address list | block address list of seed nodes, separated by English commas for multiple addresses|
| password | string | default password for the seed node's block address. The password set when importing the address must be the same as this configuration item. |
| packingInterval | positive integer | block time in seconds. Configuration of 10 representing generating a new block every 10 seconds |
| agentAssetId | positive integer | asset ID allowed to participate in consensus |
| agentChainId | positive integer | chain ID of the asset allowed to participate in consensus |
| awardAssetId | positive integer | asset ID for consensus awards (must be in the chain where the consensus asset is located, that is, with the same chain ID|
| feeUnit | positive integer | unit price of the fee|

#### Configuration of the smart contract : smart_contract

| Item | Value Range | Description |
| --- | --- | --- |
| maxViewGas | positive integer | maximum consumed Gas for contract attempting to invoke methods |

#### Configuration of API interface module : api-module

| Item | Value Rang | Description |
| --- | --- | --- |
| rpcPort | port number | used by HTTP interface |
| databaseUrl | IP address |  IP address of mongodb database|
| databasePort | port number | used by mongodb database |
| maxAliveConnect | positive integer | maximum number of connections of the database connection pool |
| maxWaitTime | positive integer | maximum waiting time (ms) to get a connection from the database |
| connectTimeOut | positive integer | timeout of database connection (ms) |

#### Configuration of cross-chain module: cross-chain
| Item | Value Range| Description |
| --- | --- | --- |
| minNodeAmount | positive integer | minimum number of cross-chain node connection|
| maxNodeAmount | positive integer | maximum number of cross-chain node connection |
| sendHeight | positive integer | confirmation number of cross-chain transaction inside the chain|
| byzantineRatio | positive integers | Byzantine ratio of cross-chain transaction  |
| CrossSeedIps | IP list | cross-chain seed node list on MainNet|