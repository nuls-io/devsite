# Node Wallet Upgrade Guide

Currently, the node wallet does not support automatic upgrade, so manual operation is required. The following are the upgrade methods for Windows and Linux.

## Windows

* Stop the currently running Windows node wallet (close the startup window);

  ![Image](https://uploader.shimo.im/f/P7V2KIWpLl4IHzrr.png!thumbnail)

* Download the latest Windows package on [GitHub](https://github.com/nuls-io/nuls-v2/releases) and extract it to the specified directory (the directory path cannot contain Chinese: Chinese path will cause the command line to fail to open) );

  ![Image](https://uploader.shimo.im/f/y5B2cPBCqLQJv6PZ.png!thumbnail)

* Replace the data directory of the decompressed new package with the data directory of the node wallet that has stopped running;
* Double-click the start.bat button to start the node wallet;
* Double-click the cmd.bat button to enter the command line to view the node wall height (network info);

  ![Image](https://uploader.shimo.im/f/q8AODNMysvorNC7o.png!thumbnail)

* When the latest height of the node wallet is consistent with the network height, it proves that the node wallet is running normally;
* View the version information of the node in the [Mainnet Explorer](https://nulscan.io), the node version is displayed as 2, normal upgrade (the node version number will be updated after the node is upgraded and re-exported) ).

  ![Image](https://uploader.shimo.im/f/tW8cyJvMEO0iPlPV.png!thumbnail)

## Linux

* Stop the running node wallet (./stop);

  ![Image](https://uploader.shimo.im/f/Xn87t205ToYtxAKv.png!thumbnail)

* Download the latest Linux package on [GitHub](https://github.com/nuls-io/nuls-v2/releases) and unzip (tar -xvf NULS_Wallet_linux64_v2.1.0.tar.gz) to the specified directory.

  ![Image](https://uploader.shimo.im/f/FvA6rINxIskc0Hg3.png!thumbnail)

* Move the data in the stopped node wallet to the newly extracted node wallet directory (mv data ../NULS-Wllet);

  ![Image](https://uploader.shimo.im/f/MPmsc5Xn9MEAYLy3.png!thumbnail)

* Start the node wallet (./start);
* Enter the command line (./cmd) to check the node wall height (network info);

  ![Image](https://uploader.shimo.im/f/tsLxHsYlxK8x8qf9.png!thumbnail)

* When the latest height of the node wallet is consistent with the network height, it proves that the node wallet is running normally;
* View the version information of the node in the [MainNet Explorer](https://nulscan.io), the node version is displayed as 2, normal upgrade (the node version number will be updated after the node is upgraded and re-exported) ).

  ![Image](https://uploader.shimo.im/f/tW8cyJvMEO0iPlPV.png!thumbnail)

