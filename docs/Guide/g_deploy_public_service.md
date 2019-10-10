# Deploy the mainnet wallet containing public-service

## docker deployment

Compared with ordinary wallets, the advanced wallet has several modules: **public-service**, block browser, and web light wallet.The biggest difference from a regular wallet is that the public-service module will store the chain data redundantly in mongodb (included in the image).The advantage is that it is more convenient to use and does not need to rely on the browser and web light wallet provided by the Nuls Foundation.

The operation method is as follows:

```text
        docker run \
        --name nuls-wallet \
        -d \
        -p 8001:8001 \      
        -p 8002:8002 \
        -p 8003:8003 \      
        -p 8005:1999  \
        -p 8004:8004 \
        -p 8006:8006 \
        -v `pwd`/mongo_data:/nuls/mongo_data \
        -v `pwd`/mongo_log:/nuls/mongo_log \
        -v `pwd`/data:/nuls/data \
        -v `pwd`/logs:/nuls/Logs \
        nuls-wallet-pro:v2.0.0
```

- 8001 main chain protocol communication port (required)
- 8002 cross-chain protocol communication port (required)
- 8003 public-service http interface (optional)
- 8004 http api interface use port (optional)
- 8005 block browser port (optional)
- 8006 web light wallet port (optional)
- /nuls/data data storage directory
- /nuls/Logs log storage directory
- /nuls/mongo_data mongodb data storage directory
- /nuls/mongo_log mongodb log directory

After successful startup, you can access the block browser and web light wallet through a web browser.

```text
http://127.0.0.1:8005
http://127.0.0.1:8006
```

## Linux Deployment

### Starting MongoDB

Download the archive from MongoDB's official website, upload it to the server and extract it to the directory (/usr/local), and start it.

![20191008161020](./g_deploy_public_service/20191008161020.png)

### Starter wallet

Download the compressed package containing the public-service (nuls_wallet_pro.tar.gz) from [GitHub] (https://github.com/nuls-io/nuls-v2/releases), upload it to the server, and start it after decompression (starting Before, the server needs to open ports: 8001, 8002, 8003). After the wallet is started, you can access public-service through (ip:8003), and you can add your own node service in the node service of web wallet and light wallet.

![20191009145014](./g_deploy_public_service/20191009145014.png)

![20191009114708](./g_deploy_public_service/20191009114708.png)

Note: Start MongoDB and start the node wallet!
