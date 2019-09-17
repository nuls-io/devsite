# nuls-wallet v2.0.0 docker镜像
> 假定用户熟悉docker使用
## 普通钱包
普通钱包带有主链运行所需的最基础功能，并包括nuls-api（http的开发接口）模块。用户使用此版本只能使用命令行与钱包交互。

运行方法如下：

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
- 8001 主链协议通信端口    （必选）
- 8002 跨链协议通信端口    （必选）
- 8004 http api接口使用端口（可选）
- /nuls/data 数据存储目录   
- /nuls/Logs 日志存储目录

> 务必在防火墙设置开启以上端口，否则会影响区块同步。

### 测试网镜像 
nulsio/nuls-wallet:v2.0.0_beta

## 高级钱包
相比与普通钱包，高级钱包带有public-service、区块浏览器、网页轻钱包几个模块。与普通钱包最大的区别是public-service模块会将链数据冗余存储在mongodb中（镜像中已包含）。好处是使用更方便，不需要依赖nuls基金会提供的浏览器和网页轻钱包。

运行方法如下：

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
- 8001 主链协议通信端口    （必选）
- 8002 跨链协议通信端口    （必选）
- 8003 public-service http接口  （可选）
- 8004 http api接口使用端口（可选）
- 8005 区块浏览器端口      （可选）
- 8006 网页轻钱包端口      （可选）
- /nuls/data 数据存储目录   
- /nuls/Logs 日志存储目录
- /nuls/mongo_data mongodb数据存储目录
- /nuls/mongo_log  mongodb日志目录

启动成功后可通过网页浏览器访问区块浏览器和网页轻钱包

```
http://127.0.0.1:8005
http://127.0.0.1:8006
```
### 测试网镜像
nuls-wallet-pro:v2.0.0_beta3
## 使用钱包
- 进入钱包命令

```
docker exec -it nuls-wallet cmd
```
- 查看模块启动情况

```
docker exec -it nuls-wallet check-status
```
- 停止钱包

```
 docker exec nuls-wallet stop
 docker stop nuls-wallet
```
## 使用外部配置文件
通过`-v nuls.ncf:/nuls/nuls.ncf` 指定外部配置文件