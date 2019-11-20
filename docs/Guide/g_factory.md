# Chain Factory Tutorial
Welcome to Chain Factory.  We are very proud of Chain Factory, the ability to create a blockchain designed for your application and business needs. The core of our blockchain is Nulstar. The Nulstar design enables us to provide to you a blockchain where only the modules you need are assembled to form your blockchain. Across time, as our modules/services grow,  the variety of blockchains and blockchain characteristics will expand, perhaps, beyond what we can imagine today.  As you use your blockchain, please consult the telegram channel NULS Support (https://t.me/NulsSupport)  for questions or feedback. We look forward to hearing from you. 
## Build blockchain
### Select module
In the chain factory, the modules are divided into the required modules and the optional modules. The system has already helped the user to select all the required modules. The user needs to select the optional modules according to the actual business scenarios.After the selection is completed, click [Submit Module Information]

![image-20191107173132004](./g_factory/1.png)

### Fill in the basic information

Fill in the basic information of the chain, such as name, logo and inflation rules, etc.

![image-20191107173735275](./g_factory/2.png)

### Configuring Genesis Blocks

The system automatically generates a series of Genesis block addresses, and the user needs to fill in the initial number assigned to each address.There are two points in the process of completing this step that require special attention from the user.

- The sum of the number of passes assigned to each address must be equal to the total circulation filled in the basic information
- After filling in, the user needs to click [Backup Address Private Key] to download all address private keys and save them.This part of the information will not be saved, so if the user loses the private key, the system will not be able to retrieve it.

![image-20191107173925575](./g_factory/3.png)

### Configuring the seed node

If the user has prepared the server of the seed node, fill in the seed node ip/domain name and save the private key of the packaged address. After starting the node program on the seed node, import the corresponding package address, and the seed node can start. Maintain the blockchain network. If the server is not ready, you can use the default ip first. After the server is ready, change the seed node ip value in the node program configuration file.

![image-20191107174708180](./g_factory/4.png)

### Confirm Order

The user needs to confirm the correctness of the information in the previous steps. After the order is submitted and the transaction is issued, it cannot be modified. After confirming that the information is correct, click [Submit Order] and enter the password. The system will automatically deduct the corresponding quantity nuls from the account address. Chain fee





![image-20191107182412228](./g_factory/5.png)

### Download Chain Resources

After submitting the order and paying for nuls, the system will start assembling the module and packing the resources. The process may take a few minutes. Please wait patiently. After waiting for a certain period of time, please refresh the page and you will see the packaged resources.

![image-20191107184356196](./g_factory/6.png)

## Deploying blockchain

If the user selects the Public-service module, you need to follow the steps to start the data service node, wallet and browser.

### Installing MongoDB

First, users who need to use the public-service service need to install MongoDB on the server first and download the centos7 version:

```
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel70-4.2.1.tgz
```

After the download is successful, extract and enter the directory:

```
tar -xvf mongodb-linux-x86_64-rhel70-4.2.1.tgz
cd mongodb-linux-x86_64-rhel70-4.2.1
```

After entering the directory, create a new configuration file mongodb.conf

```
vi mongodb.conf
Dbpath=/usr/local/mongodb/data #data file storage directory
Logpath=/usr/local/mongodb/logs/mongodb.log #log storage directory
Port=27017 #port
Fork=true #enabled as a daemon, ie running in the background
logappend=true
maxConns=5000
storageEngine = wiredTiger
bind_ip = 127.0.0.1
```

MongoDB sets the default name, does not set a password, starts by creating a new configuration file mongodb.conf

```
./bin/mongod -f mongodb.conf
```

### Launching the Public-service service node wallet

After the chain factory has successfully built the chain, download the package with the public-service service and upload it to the server where MongoDB is installed. Start MongoDB first, then extract the wallet and enter the directory to start the wallet:

```
tar -xvf pro_linux.tar.gz 
cd NULS_Wallet/
```

After entering the wallet directory, execute the `./start` command to start the wallet, and the `./check-status` command to check the wallet startup status.

After the wallet is successfully launched

- Access to the block's block browser via **ip:8005**

- **ip:8006**Access to the web wallet of the chain. In the web wallet, you can connect to the chain by adding a node service (**http://{ip}:8003/**):

![image-20191107185135316](./g_factory/7.png)

### Launching a normal node wallet

Download the normal wallet from the chain factory and upload it to the server and unzip it (same as above). After entering the directory, start the wallet. After the wallet is successfully launched, enter the command line by pressing the command `./cmd` to import the block address downloaded during the chain creation (password setting). Consistent with the configuration file)

Precautions:

- Multiple outbound addresses need to be imported into the launched wallet (cannot be the same wallet)

- The server must be enabled on the server configured as the ip of the seed node. The newly added wallet will first connect to this ip.

### Cross-chain network waiting

Set up a cross-chain chain, you need to wait for the cross-chain networking, networking takes a period of time, when the cross-chain network of the main network and the new chain is successfully initialized, you can initiate cross-chain transactions, otherwise it will cause asset loss.
