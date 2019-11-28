# Development Tool

## NULS smart contract Maven-archetype usage documentation

### Introduction to NULS Smart Contract Maven-archetype

The NULS smart contract Maven-archetype is a smart contract Maven project template defined for developers. Adding the Maven archetype to IntelliJ IDEA and selecting this archetype can quickly generate a NULS smart contract development project. The smart contract project is a maven project with a sample contract class and all required NULS smart contract dependencies are automatically added to the project. Developers only need to focus on code development for smart contract business logic.

The maven archetype also integrates an smart contract client. After the smart contract is packaged through maven, the smart contract client is automatically launched, and the developer deploys the smart contract and the contract method call on the client.

### Development Environment

1. Install JDK8

2. Install IntelliJ IDEA

3. JDK operating environment for project
    
       JDK please select JDK8 when creating a new project

4. IntelliJ IDEA's Maven plugin JDK runtime environment

       Open IntelliJ IDEA Settings -> Build, Execution, Deployment -> Build Tools -> Maven -> Runner
       JRE please choose JDK8

### New NULS Smart Contract Maven Project

1、In order to solve the problem of Intellij IDEA creating a Maven project through archetype slowly, increase the maven run parameters: 
-DarchetypeCatalog=internal，The operation steps are as follows:

![](./mavenPackage/jG8M6dR.png)
![](./mavenPackage/axexko4.png)

2、Select the new maven project in IntelliJ IDEA and add the NULS smart contract Maven archetype to IDEA in the order shown below (Figure 1). The parameters when adding archetype are as follows:

     GroupId：io.nuls.v2
     ArtifactId: nuls-smartcontract-archetype
     Version: 1.0.0

![图1](./mavenPackage/create_archetype.png)

3、Select "io.nuls.v2:nuls-smartcontract-archetype" and click Next to create a Maven project as shown below (Figure 2).

> When you first create it, you may wait 2~3 minutes, please be patient

![图2](./mavenPackage/roCyIZD.png)

4、The resulting maven project is shown in the following figure (Figure 3). The pom.xml file has been added to the dependency jar required by the NULS smart contract. The developer does not need to modify this file.

![图3](./mavenPackage/dev_contract_pom_setting.png)

The configuration parameters in the pom file are as follows:

![](./mavenPackage/WkoKvbV.png)

```
The first parameter indicates that the smart contract client obtains the path of the contract JAR package by default;
The second parameter indicates the port number used when the smart contract client starts;
The third parameter indicates whether to start the smart contract client when packaging with Maven;
```

5、Start the business code development of the NULS smart contract, examples are as follows
                                                                  
[Getting Started Example `NRC20-Token`Click to enter](https://github.com/CCC-NULS/NRC20-Token)

[Advanced example `POCM`click to enter](https://github.com/CCC-NULS/pocm-contract)

### Packing NULS Smart Contracts

After completing the development of the smart contract, the smart contract is packaged through the “mvn clean package” command or IDEA's maven plugin. After the package is completed, the smart contract client will be launched, and the developer can deploy and invoke the smart contract on this client.

### Deployment contract

On the "Deployment Contracts" page, the jar package under the target directory of the current smart contract project is automatically loaded, which is the default path for maven packaging. If the developer needs to deploy other jar packages, you can choose another jar package to upload and deploy.

![](./mavenPackage/O7uEJyE.png)

### Call contract

After the contract is successfully deployed, it will be displayed in the list of the “My Contracts” page. The developer clicks the “call” button of the corresponding contract to enter the calling contract page, select the contract method to be called, fill in the parameters related to the contract method, and click “ Call "to complete the call of the contract method. As shown below.

![](./mavenPackage/XpWvyXg.png)

### Smart contract client Introduction

The main function of the smart contract client is to deploy and publish smart contracts. It also provides functions such as account creation and import, and maintenance of the NULS API module service node address. The main page of the client includes my contract, deployment contract, account management, and service node.

The main advantage of the smart contract client is that the developer does not need to deploy the NULS wallet locally, and only runs the client to deploy smart contracts and legal method calls.

#### My contract

On the "My Contracts" page, you can view the list of contracts that have been deployed under the selected account address. Click the "Call" button to enter the calling page of the contract method.

![](./mavenPackage/dfKpxeU.png)

#### Deployment contract

To deploy the contract on the “Deployment Contract” page, you can select the “jar package” or “HEX code” to deploy the contract.

![](./mavenPackage/qLBQsfK.png)


#### Account management

Before the smart contract is deployed and released, the account address must be selected through the “Enter” button. If there is no account information, it can be realized by creating an account or importing an account. The operation page is shown below.

![](./mavenPackage/9ydbY9o.png)

#### Service List

All service nodes are displayed in the service list. The service node refers to the URL address of the NULS Public-Service module. When the service address is not selected, by default, the officially provided test network's Public-Service service `http://beta.public1.nuls.io`. The operation page is as shown in the following figure.

![](./mavenPackage/vdz2UUE.png)
![](./mavenPackage/7cxoYNz.png)