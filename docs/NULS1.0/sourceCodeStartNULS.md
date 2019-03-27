# Launching NULS with source code

## Downloading source code

Visit the NULS project on github: https://github.com/nuls-io/nuls

Option 1: downloading the source code directly

 	After accessing the github, click the "Clone or download" button and select Download ZIP to download the source-code package.

Option 2: running the git command to clone the NULS repository 

 	` git clone https://github.com/nuls-io/nuls.git`

Option 3: (recommended): cloning the NULS repository with development tools such as IntelliJ IDEA.

## Environment description

 	Operating Systems: macOS, Windows

 	Building Tools: maven

 	Development Tools: IntelliJ IDEA

 	Development Language: Java (JDK1.8)

## Basic introduction of launching NULS 

 	Since blockchain is a decentralized network composed of multiple nodes, it makes no sense to launch a node with NULS source code alone, and it is also not feasible. This tutorial assumes an existing custom test-net running with NULS source code, and the source code other than the network parameters is not modified when building the network. How can we run the NULS source code and join the network 

1. First install jdk1.8 and the build tool - maven.

 2. Run IntelliJ IDEA
     - If you download the source code package, extract it and import the NULS project via IntelliJ IDEA
     - If you download the source code by running git command to clone the NULS repository, import the NULS project via IntelliJ IDEA.
     - Clone the NULS repository via IntelliJ IDEA’s Git plugin.
 3. Configure network environment parameters consistent with the existing network.
     - Open the module.ini configuration file in the client-module project
     - It is recommended to replace the module.ini file with that of other nodes in the known custom test-net to ensure the consistency of the network environment parameters.
 4. Run the NULS boot class Bootstrap.java in the client-module project, located in `io.nuls.client` package.
 5. The NULS wallet interface will be opened during start-up process and the block height of the custom test-net will be synchronized, indicating that the startup is successful.