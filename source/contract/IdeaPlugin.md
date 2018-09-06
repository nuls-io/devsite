# NULS IDEA plugin manual

#### 1 Install the NULS plugin in IDEA
- Get the NULS plugin ZIP package and store it on disk and 
Click File->Settings->Plugin->Install plugin from disk

![Install](./pluginImages/Install.jpg)

- Select the ZIP package you obtained earlier, then click OK

![Install](./pluginImages/Install2.jpg)

- Check the NULS plugin and click Apply

![Install](./pluginImages/Install3.jpg)

#### 2 Create a NULS project

![create](./pluginImages/createProject.jpg)

Enter the Project name and click finish

![create](./pluginImages/createProject2.jpg)

#### 3 Writing smart contracts

Smart contract code writing can be viewed [developer documentation](http://dev.nuls.io/contract/)

![code](./pluginImages/code.jpg)

#### 4 Set up nodes and accounts for deployment contracts

- Click the NULS plugin on the right to bring up the NULS plugin panel

	![code](./pluginImages/Deploy.jpg)

- The plugin will automatically generate a 127.0.0.1:8001 node, and the developer can add a node to deploy the contract. The recommended method is to start the wallet locally and then add the address of the wallet as the node address.

	Click the + sign in the upper left corner of the panel and select Add Node.

	![code](./pluginImages/Add.jpg)

- Enter the Node address and click OK

	![code](./pluginImages/Add3.jpg)

- Click the + sign in the upper left corner of the panel, select Add Account, enter the Account address, and click OK.

	![code](./pluginImages/Add5.jpg)

#### 5 Package contract

- Click the second button at the top left of the plugin to package the current Project directly. The packaged output has two forms: Jar and Hex

	![code](./pluginImages/package.jpg)

- Click [Copy Coding] to copy the HEX code to the [Deployment Contract] interface of the wallet for contract deployment (optional step)
	![code](./pluginImages/package1.jpg)

- Click the third deployment button above the plugin panel or [Next] at the bottom of the current packaging page to enter the deployment contract interface

	![code](./pluginImages/package3.jpg)

	![code](./pluginImages/package2.jpg)

#### 6 Deployment contract

- On the deployment page, you can select the node and account for the deployment contract from the drop-down list. The default value of JarFilePath is the packaging path of the previous step.

	![code](./pluginImages/package4.jpg)

- The parameter immediately following JarFilePath is the parameter of the contract constructor.
	
	![code](./pluginImages/Deploy2.jpg)

- Click [Advanced] to set the Gas value and the price value. The Gas value range is 1-10000000. It is recommended to set the Gas value to be large to avoid the failure of the Gas to cause the deployment contract to fail.

	![code](./pluginImages/Deploy3.jpg)

- Click [Test Deploy] to deploy the test to the contract. If successful, it will return the Success message.

	![code](./pluginImages/Deploy4.jpg)

- If the test is successful, click [Deploy], after the transaction confirmation of the created contract is successful, the transaction details will be returned, indicating that the contract is successfully deployed.

	![code](./pluginImages/Deploy5.jpg)

- View deployed contracts above the panel

	![code](./pluginImages/Deploy6.jpg)

- Click on the successful deployment contract to view all the methods of the contract

	![code](./pluginImages/Deploy7.jpg)
	
	

