# nuls-wallet v2.0.0 docker image
> Assume that the user is familiar with docker use
Ordinary Wallet
Ordinary wallets come with the most basic functions required for the main chain to run, and include the nuls-api (http development interface) module.Users using this version can only interact with the wallet using the command line.

The operation method is as follows:

```
docker run \
       --name nuls-wallet \
       -d \
       -p 8001:8001 \
       -p 8002:8002 \
       -p 8004:8004 \
       -v `pwd`/data:/nuls/data \
       -v `pwd`/logs:/nuls/Logs \
       nulsio/nuls-wallet:v2.0.0
```
- 8001 main chain protocol communication port (required)
- 8002 cross-chain protocol communication port (required)
- 8004 http api interface use port (optional)
- /nuls/data data storage directory 
- /nuls/Logs log storage directory

> Be sure to enable the above port in the firewall settings, otherwise it will affect block synchronization.

## Premium Wallet
Compared with ordinary wallets, the advanced wallet has several modules of public-service, block browser, and web light wallet.The biggest difference from a regular wallet is that the public-service module will store the chain data redundantly in mongodb (included in the image).The advantage is that it is more convenient to use and does not need to rely on the browser and web light wallet provided by the Nuls Foundation.

The operation method is as follows:

```
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

```
http://127.0.0.1:8005
http://127.0.0.1:8006
```

## Using a wallet
- Enter the wallet command

```
docker exec -it nuls-wallet cmd
```
- View module startup status

```
docker exec -it nuls-wallet check-status
```
- Stop the wallet

```
 docker exec nuls-wallet stop
 docker stop nuls-wallet
```
## Using an external profile
Specify an external configuration file with `-v nuls.ncf:/nuls/nuls.ncf`
