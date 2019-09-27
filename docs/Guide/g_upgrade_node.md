# Node Wallet Upgrade Guide

Currently, the node wallet does not support automatic upgrade, so manual operation is required. The following are the upgrade methods for Windows and Linux.

## Windows

* Stop the currently running Windows node wallet (close the startup window);

  ![Image](./g_upgrade_node/windows1.png)

* Download the latest Windows package on [GitHub](https://github.com/nuls-io/nuls-v2/releases) and extract it to the specified directory (the directory path cannot contain Chinese: Chinese path will cause the command line to fail to open) );

  ![Image](./g_upgrade_node/windows1.png)

* Replace the data directory of the decompressed new package with the data directory of the node wallet that has stopped running;
* Double-click the start.bat button to start the node wallet;
* Double-click the cmd.bat button to enter the command line to view the node wall height (network info);

  ![Image](./g_upgrade_node/windows1.png)

* When the latest height of the node wallet is consistent with the network height, it proves that the node wallet is running normally;
* View the version information of the node in the [Mainnet Explorer](https://nulscan.io), the node version is displayed as 2, normal upgrade (the node version number will be updated after the node is upgraded and re-exported) ).

  ![Image](./g_upgrade_node/windows1.png)

## Linux

* Stop the running node wallet (./stop);

  ![Image](./g_upgrade_node/linux1.png)

* Download the latest Linux package on [GitHub](https://github.com/nuls-io/nuls-v2/releases) and unzip (tar -xvf NULS_Wallet_linux64_v2.1.0.tar.gz) to the specified directory.

  ![Image](./g_upgrade_node/linux2.png)

* Move the data in the stopped node wallet to the newly extracted node wallet directory (mv data ../NULS-Wllet);

  ![Image](./g_upgrade_node/linux3.png)

* Start the node wallet (./start);
* Enter the command line (./cmd) to check the node wall height (network info);

  ![Image](./g_upgrade_node/linux4.png)

* When the latest height of the node wallet is consistent with the network height, it proves that the node wallet is running normally;
* View the version information of the node in the [MainNet Explorer](https://nulscan.io), the node version is displayed as 2, normal upgrade (the node version number will be updated after the node is upgraded and re-exported) ).

  ![Image](./g_upgrade_node/linux5.png)

