# Develope Module

> This docs is Java version

Nuls-module-java-template combined with NULS-ChainBox can help you quickly build blockchain business modules implemented in Java. Two core packages of nuls-core-rpc and nuls-base under io.nuls.v2 are imported in the template. The former implements the basic communication protocol with the module, and the latter includes the basic data structure and utility class of the block.

## Template file structure

``` 
.
├── README.md   
├── build          # build related scripts   
├── init.sh        # initialize project scripts
├── module.ncf     # configuration file of the module
├── package        # build scripts
├── pom.xml        # maven pom.xml
└── src            # java source code
``` 
## Using templates
Download this template using the `tools` script in the NULS-ChainBox project.

``` 
Tool-t Java demo  # demo is a custom module name
```  
When the download is complete, `tools` will automatically replace the module names defined in pom.xml and module.ncf with `demo`. Import the project in the way of importing Maven projects using common Java development tools.

## Introduction to source code structure
```
.
└── io
    └── nuls
        ├── MyModule.java    # the bootstrap class of the module that needs to be implemented, including transaction registration, data table initialization, web service and other preparation work.
        ├── NulsModuleBootstrap.java  # the bootstrap class of the module, usually without modification
        ├── Utils.java  # utility class with the function of transaction signature
        ├── rpctools # rpc toolkit
        │ ├── AccountTools.java  # utility functions related to account module
        │ ├── CallRpc.java
        │ ├── LegderTools.java  # utility functions related to ledger module
        │ ├── TransactionTools.java # utility functions related to transaction module
        │ └── vo # data object package
        │ ├── Account.java
        │ ├── AccountBalance.java
        │ └── TxRegisterDetail.java
        └── txhandler # package of transaction callback functions
            ├── TransactionDispatcher.java # dispatcher of transaction callback functions
            ├── TransactionProcessor.java # interface definition of transaction callback functions
            └── TxProcessorImpl.java # interface implementation of transaction callback functions, requiring developers to implement
```
## Implementation ideas of business modules
1. Define the transaction type and invoke the TransactionTools.registerTx method to complete the transaction registration upon module starting (MyModule.startModule).
2. Implement the entry point of transaction creation, assemble the transaction, and store the business data in txData. Invoke the TransactionTools.registerTx.newTx method to create the transaction in the transaction module.
3. Implement the TxProcessorImpl.validate method to complete the verification code of transaction business.
4. Implement the TxProcessorImpl.commit method to complete the data storage code of transaction business.
5. Implement the TxProcessorImpl.rollback method to complete the data rollback code of transaction business.
6. Implement the application scenario code of business data.

## Building module program
The `package` script will help you build the code, and the `package` fulfills the requirements of the NULS-ChainBox integrating modules to the NULS2.0 runtime environment. The packaged jar file, startup script, stop script, and Module.ncf will be built into the `outer` folder.

```
./package
============ PACKAGE FINISH 🍺🍺🍺🎉🎉🎉 ===============
```
### Contribution

Contributions to NULS are welcomed! We sincerely invite developers who experienced in blockchain field to join in NULS technology community. Details: s: https://nuls.communimunity/d/9-recruitment-of-community-developers To be a great community, Nuls needs to welcome developers from all walks of life, with different backgrounds, and with a wide range of experience.

### License

Nuls is released under the [MIT](http://opensource.org/licenses/MIT) license.
Modules added in the future may be release under different license, will specified in the module library path.

### Community

- [nuls.io](https://nuls.io/)
- [@twitter](https://twitter.com/nulsservice)
- [facebook](https://www.facebook.com/nulscommunity/)
- [YouTube channel](https://www.youtube.com/channel/UC8FkLeF4QW6Undm4B3InN1Q?view_as=subscriber)
- Telegram [NULS Community](https://t.me/Nulsio)
- Telegram [NULS Chinese Community](https://t.me/Nulscn)

####  
