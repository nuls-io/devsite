# 资产转出

如果从合约地址转走NULS，那么会在合约的执行结果中体现，结果中的`transfers`数组对象中展示了每一笔合约转账，这里展示的数据仅是合约转账交易的概要信息。

`block`中不会包含这类交易，因为它不在节点网络上广播，它是vm生成的数据，每一个得到智能合约交易的节点去执行，把执行结果保存在自己的节点上，当一个区块中所有的合约交易执行完后，会产生一个`stateRoot`，这个`stateRoot`会在`block`里广播出来。

合约NULS资产转出交易没有签名，由每个节点验证区块时生成这类交易，另外，这类交易也不在广播数据的范围内，需要从另外的接口调取，详细数据请通过 **以下接口** 来得到交易的_序列化字符串_数据。

以下是包含合约NULS资产转出交易的执行结果

> 通过`RESTFUL`接口`/api/contract/result/{hash}` 
> 
> 或者 
> 
> 通过`JSONRPC`接口`getContractTxResult `, 请求数据: 

```json
{
"jsonrpc":"2.0",
"method":"getContractTxResult",
"params":[chainId, hash],
"id":1234
}
```
>
> 获取合约的执行结果

以下结果中，`contractTxList`即是本次合约执行后生成的交易，注意：这个结构里不限于合约NULS资产转出交易，根据业务的不同会生成不同的合约NULS资产转出交易，比如合约共识交易 --> [智能合约共识交易说明](http://120.77.241.8:10086/pierre/doc/blob/master/智能合约文档/NULS2.0/智能合约共识交易说明.md)

```javascript
{
    "success": true,
    "data": {
        "flag": true,
        "data": {
            "success": true,
            "errorMessage": null,
            "contractAddress": "tNULSeBaN1rhd9k9eqNkvwC9HXBWLQ79dRuy81",
            "result": "multyForAddress: 888634777633",
            "gasLimit": 200000,
            "gasUsed": 20038,
            "price": 25,
            "totalFee": "5100000",
            "txSizeFee": "100000",
            "actualContractFee": "500950",
            "refundFee": "4499050",
            "value": "0",
            "stackTrace": null,
            "transfers": [
                {
                    "txHash": "4877f6a865dea5b4ac82a8370d73e62da15bc7acb2145a03822dddfdab329d2b",
                    "from": "tNULSeBaN1rhd9k9eqNkvwC9HXBWLQ79dRuy81",
                    "value": "200000000",
                    "outputs": [
                        {
                            "to": "tNULSeBaMp9wC9PcWEcfesY7YmWrPfeQzkN1xL",
                            "value": "100000000"
                        },
                        {
                            "to": "tNULSeBaMshNPEnuqiDhMdSA4iNs6LMgjY6tcL",
                            "value": "100000000"
                        }
                    ],
                    "orginTxHash": "b5473eefecd1c70ac4276f70062a92bdbfe8f779cbe48de2d0315686cc7e6789"
                }
            ],
            "events": [],
            "tokenTransfers": [],
            "invokeRegisterCmds": [],
            "contractTxList": [
                "12002fbb225d0037b5473eefecd1c70ac4276f70062a92bdbfe8f779cbe48de2d0315686cc7e678902000253472f4702eb83b71871a4c4e0c71526bb86b8afd0011702000253472f4702eb83b71871a4c4e0c71526bb86b8af0200010000c2eb0b0000000000000000000000000000000000000000000000000000000008000000000000000000021702000194f6239c075d184e265eaea97a67eeced51725160200010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000017020001ce8ffa95606f0bfd2778cff2eff8fe8999e20c440200010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000"
            ],
            "remark": "call"
        }
    }
}
```













