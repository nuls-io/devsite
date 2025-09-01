# Node Wallet Upgrade Guide

The node wallet requires manual upgrading as it does not support automatic upgrades. Follow the steps below for upgrading on both Windows and Linux platforms.

## Windows

1. Stop the currently running Windows node wallet by closing the startup window.

   ![Windows 1](./g_upgrade_node/windows1.png)

2. Download the latest Windows package from [GitHub](https://github.com/nuls-io/nuls-v2/releases) and extract it to a specified directory (Note: The directory path should not contain Chinese characters as it may cause issues with the command line).

   ![Windows 2](./g_upgrade_node/windows2.png)

3. Replace the data directory in the decompressed new package with the data directory of the stopped node wallet.

4. Double-click the `start.bat` button to start the node wallet.

5. Double-click the `cmd.bat` button to enter the command line and check the node wall height using the command `network info`.

   ![Windows 3](./g_upgrade_node/windows3.png)

6. When the latest height of the node wallet matches the network height, it indicates that the node wallet is running normally.

7. Verify the node version information in the [Mainnet Explorer](https://nulscan.io). The node version should be displayed as 2, indicating a successful upgrade (the node version number will be updated after the upgrade).

   ![Windows 4](./g_upgrade_node/windows4.png)

## Linux

1. Stop the running node wallet using the command `./stop`.

   ![Linux 1](./g_upgrade_node/linux1.png)

2. Download the latest Linux package from [GitHub](https://github.com/nuls-io/nuls-v2/releases) and unzip it (`tar -xvf NULS_Wallet_linux64_v2.1.0.tar.gz`) to the specified directory.

   ![Linux 2](./g_upgrade_node/linux2.png)

3. Move the data from the stopped node wallet to the newly extracted node wallet directory (`mv data ../NULS-Wallet`).

   ![Linux 3](./g_upgrade_node/linux3.png)

4. Start the node wallet using the command `./start`.

5. Enter the command line (`./cmd`) to check the node wall height using the command `network info`.

   ![Linux 4](./g_upgrade_node/linux4.png)

6. When the latest height of the node wallet matches the network height, it indicates that the node wallet is running normally.

7. Verify the node version information in the [Mainnet Explorer](https://nulscan.io). The node version should be displayed as 2, indicating a successful upgrade (the node version number will be updated after the upgrade).

   ![Linux 5](./g_upgrade_node/linux5.png)
