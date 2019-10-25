# Create a node

## NULS recommends creating your node for the Test Network first.

You have the option to install and run your node in the Nuls test network or the Nuls production network, Mainnet.  Nuls strongly recommends that FIRST you run your node in test. After you experience the installation and management of your node in test, you are ready to re-install for the mainnet.

For the test network, make sure to open the server ports 18001 and 18002.
For the Mainnet, make sure to open the server ports  8001 and 8002. 
If these ports are not open, your node will not successfully communicate with the blockchain.

## Download Install Node Wallet

The user downloads the node wallet compression package (linux version, windows version) from [GitHub](https://github.com/nuls-io/nuls-v2/releases) and uploads it to the server for decompression (the Chinese language is not included in the path).

![20190912110813](./g_create_node/20190912110813.png)

The linux user starts the wallet with the **./start** command. After each module starts successfully, the command line is entered through the **./cmd** command. After the block is synchronized to the latest height, other operations can be performed.

![20190912103446](./g_create_node/20190912103446.png)

![20190912103641](./g_create_node/20190912103641.png)

Windows users double-click **start.bat** in the folder to start the wallet. After the module is successfully started, double-click **cmd.bat** to enter the command line. After the block is synchronized to the latest height, other operations can be performed.

![20190912103945](./g_create_node/20190912103945.png)

![20190912104042](./g_create_node/20190912104042.png)

## Download Light Wallet Installation

Users download and open the light wallet (windows version, mac version) from [GitHub](https://github.com/nuls-io/nuls-v2/releases) and connect to the node service.

![20190912110930](./g_create_node/20190912110930.png)

## Creating a consensus node

The user creates a consensus node on the light wallet (the reward address can be the same as the creation address, or it can be another address, the package address cannot be the creation address and reward address, the deposit is 20000-200000, the commission ratio is 10-100 integer)

![20190912105332](./g_create_node/20190912105332.png)

Import the block node into the node wallet (the password is set to: nuls123456)

![20190912105518](./g_create_node/20190912105518.png)

You can also create a node by using the createagent command on the command line (omitted)

## Participation

The user opens the light wallet or [web wallet](wallet.nuls.io), imports the 1.0 private key or keystore file, enters the consensus page, selects the node to commission

![20190912110124](./g_create_node/20190912110124.png)

The same can be done on the command line through the deposit command (omitted)
