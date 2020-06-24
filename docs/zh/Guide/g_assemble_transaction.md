# NULS主网进行平行链资产转账交易

## 先决条件

1. 平行链必须在NULS主网完成跨链注册。
2. NULS主网地址上已经拥有从平行链通过跨链转账转过来的资产。

## 转账方式

1. 通过网页钱包手动完成转账。
2. 调用nuls-api的离线组装交易接口，组装好交易，本地签名，然后广播交易完成转账。
3. 调用nuls-api的转账接口完成转账。

## 详细说明通过第2种方式完成转账

- 官方nuls-api地址：https://api.nuls.io/jsonrpc
- 关键接口方法：createTransferTxOffline

具体步骤：
1. 获取NULS主链资产nonce值。组装手续费的fromData。
2. 获取NULS主链上平行链资产的nonce,组装出金地址的fromData。
3. 组装入金地址的toData。
4. 调用createTransferTxOffline 接口，获取交易的txHex。
5. 本地对txHex进行签名。
6. 调用broadcastTx接口广播交易，完成转账。

下面以平行链资产CNVT为例，完成一笔转账交易。CNVT的assetChainId:59999,assetId:1

第4步的请求体为

```
{
    "method": "createTransferTxOffline",
    "id": 1000,
    "jsonrpc": "2.0",
    "params": [
        [
            {
            "address": "NULSd6HgbnxgLBdpfxKCsiG3NdKPMe4GutApi",  #出金地址
            "assetChainId": 59999,         #平行链资产链id
            "assetId": 1,                  #平行链资产id
            "amount": 100000000,           #转出金额 (此处为小单位)
            "nonce": "0000000000000000"    #此资产的nonce
            },
            {
            "address": "NULSd6HgbnxgLBdpfxKCsiG3NdKPMe4GutApi", #手续费资产地址
            "assetChainId": 1,             #nuls资产链id
            "assetId": 1,                  #nuls资产id
            "amount": 100000,              #手续费
            "nonce": "3201342e5bffe49f"    #nuls资产nonce
            }
        ],
        [
            {
            "address": "NULSd6HgXNrFd9NJMF5ExuSnGteKgHSKsfmXX", #入金地址
            "assetChainId": 59999,               
            "assetId": 1,
            "amount": 100000000,
            "lockTime": 0
            }
            # 此处可以组装多个to，to的amount合计必须等于form里面对应资产的合计（注意，如果form里面的资产大于to里的资产，多余资产会丢失
        ],
        "remark"  #备注
    ]
}
```
步骤分解

查询平行链资产nonce, request boy : 
```
{"method":"getAccountBalance","params":[1,59999,1,"NULSd6HgbnxgLBdpfxKCsiG3NdKPMe4GutApi"],"jsonrpc":"2.0","id":1000}
```

result : 
```
{"jsonrpc":"2.0","id":"1000","result":{"totalBalance":"999999700000000","balance":"999999700000000","timeLock":"0","consensusLock":"0","freeze":"0","nonce":"55c0fc32e93a27ca","nonceType":1}}
```

查询主链资产nonce， request boy : 
```
{"method":"getAccountBalance","params":[1,1,1,"NULSd6HgbnxgLBdpfxKCsiG3NdKPMe4GutApi"],"jsonrpc":"2.0","id":1000}
```

result : 
```
{"jsonrpc":"2.0","id":"1000","result":{"totalBalance":"80098700000","balance":"98700000","timeLock":"0","consensusLock":"80000000000","freeze":"80000000000","nonce":"55c0fc32e93a27ca","nonceType":1}}
```

调用离线组装交易接口获取txHex，request boy : 
```
{"method":"createTransferTxOffline","params":[[{"address":"NULSd6HgbnxgLBdpfxKCsiG3NdKPMe4GutApi","assetChainId":59999,"assetId":1,"amount":200000000,"nonce":"55c0fc32e93a27ca"},{"address":"NULSd6HgbnxgLBdpfxKCsiG3NdKPMe4GutApi","assetChainId":1,"assetId":1,"amount":100000,"nonce":"55c0fc32e93a27ca"}],[{"address":"NULSd6HgXNrFd9NJMF5ExuSnGteKgHSKsfmXX","assetChainId":59999,"assetId":1,"amount":100000000,"lockTime":0},{"address":"NULSd6HgewU4xL3B8r25j1t9E8S3eMBjwCcfb","assetChainId":59999,"assetId":1,"amount":100000000,"lockTime":0}],"remark"],"jsonrpc":"2.0","id":1000}
```

result : 
```
{"jsonrpc":"2.0","id":"1000","result":{"txHex":"02000913f35e0672656d61726b00fd1601021701000180deb16cd64980cf06c1e2ca12560142bc6548c15fea010000c2eb0b000000000000000000000000000000000000000000000000000000000855c0fc32e93a27ca001701000180deb16cd64980cf06c1e2ca12560142bc6548c101000100a0860100000000000000000000000000000000000000000000000000000000000855c0fc32e93a27ca000217010001390f5af6e833bf75c7398f2ecb91d181d818cc785fea010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000017010001b40ad0ca4415e9c9c6256ead2144abc6c65b75975fea010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000","hash":"980ec90bb6dc14f97fda334bbbaa2f780603d2070fa535b7e907899602b69c9b"}}
```

签名完成，广播交易：request boy : 
```
{"method":"broadcastTx","params":[1,"02000913f35e0672656d61726b00fd1601021701000180deb16cd64980cf06c1e2ca12560142bc6548c15fea010000c2eb0b000000000000000000000000000000000000000000000000000000000855c0fc32e93a27ca001701000180deb16cd64980cf06c1e2ca12560142bc6548c101000100a0860100000000000000000000000000000000000000000000000000000000000855c0fc32e93a27ca000217010001390f5af6e833bf75c7398f2ecb91d181d818cc785fea010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000017010001b40ad0ca4415e9c9c6256ead2144abc6c65b75975fea010000e1f505000000000000000000000000000000000000000000000000000000000000000000000000692103ff194ce30f219001883681f6937e9076b205cfd7bc8af3b13260f722392422194630440220132b24aafba23ad181078fb1f2bc068f50717fd42e5ce6f6df037e9406bc216802206c295ec3b43e8edff65bcf910462b701996e1d7138e49359daa5beadf2fa54cd"],"jsonrpc":"2.0","id":1000}
```

result ：
```
{"value":true,"hash":"980ec90bb6dc14f97fda334bbbaa2f780603d2070fa535b7e907899602b69c9b"}}
```
