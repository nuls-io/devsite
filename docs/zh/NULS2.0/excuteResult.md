# 执行结果说明

## 执行结果说明

```javascript
{
    "success": true, `合约执行是否成功`,
    "errorMessage": null, `失败原因 - string, eg. not enough gas`,
    "contractAddress": "tNULSeBaN1rhd9k9eqNkvwC9HXBWLQ79dRuy81",
    "result": "multyForAddress: 888634777633",
    "gasLimit": 200000,
    "gasUsed": 20038,
    "price": 25,
    "totalFee": "5100000",
    "txSizeFee": "100000",
    "actualContractFee": "500950",
    "refundFee": "4499050",
    "value": 10000000000, `合约调用者向合约地址转入的NULS，没有此业务时是0`
    "stackTrace": null, `失败的异常堆栈信息 - string, 执行失败也不一定有`,
    "transfers": [
        `这是是指合约地址转出主网币(NULS)的交易信息，与token无关，与token无关，与token无关，正常情况下，token转账的合约交易不会有此类交易，以下是示例`
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
    "events": [
        `合约内发送的事件信息 - 按token合约标准来说，一笔合约token转账会发送相应的一笔名为TransferEvent的事件信息，支持一次合约调用交易内进行多笔token转账`
        `返回的事件内容结构是JSON结构`
        "{\"contractAddress\":\"TTb1LZLo6izPGmXa9dGPmb5D2vpLpNqA\",\"blockNumber\":1343847,\"event\":\"TransferEvent\",\"payload\":{\"from\":\"TTasNs8MGGGaFT9hd9DLmkammYYv69vs\",\"to\":\"TTau7kAxyhc4yMomVJ2QkMVECKKZK1uG\",\"value\":\"1000\"}}"
    ],
    "tokenTransfers": [
        `针对以上token转账事件(TransferEvent)进行的数据加工，补充了发生token转账的合约的基本信息 - name, symbol, decimals`
        `注意1：这里的value是合约token数值转换后的去小数化存储值，同以太坊token方式`
        `注意2: 产生的token转账的合约地址不一定是当前调用的合约，所以在这个数据结构里有contractAddress属性，它不是冗余字段`
        {
            "contractAddress": "TTb1LZLo6izPGmXa9dGPmb5D2vpLpNqA",
            "from": "TTasNs8MGGGaFT9hd9DLmkammYYv69vs",
            "to": "TTau7kAxyhc4yMomVJ2QkMVECKKZK1uG",
            "value": "1000",
            "name": "a",
            "symbol": "a",
            "decimals": 8
        }
    ],
    "invokeRegisterCmds": [
        `合约创建共识，调用的外部命令记录`
        {
            "cmdName": "cs_createContractAgent",
            "args": {
                "contractBalance": "2030000000000",
                "commissionRate": "100",
                "chainId": 2,
                "deposit": "2000000000000",
                "contractAddress": "tNULSeBaMzZedU4D3xym1JcyNa5sqtuFku8AKm",
                "contractNonce": "0000000000000000",
                "blockTime": 1562564381,
                "packingAddress": "tNULSeBaMtEPLXxUgyfnBt9bpb5Xv84dyJV98p",
                "contractSender": "tNULSeBaMvEtDfvZuukDf2mVyfGo3DdiN8KLRG"
            },
            "cmdRegisterMode": "NEW_TX",
            "newTxHash": "a8eae11b52990e39c9d3233ba1d2c8827336d261c0f14aca43dd4f06435dfaba"
        }
    ],
    "contractTxList": [
        `当前执行智能合约后生成的交易`
        "12002fbb225d0037b5473eefecd1c70ac4276f70062a92bdbfe8f779cbe48de2d0315686cc7e678902000253472f4702eb83b71871a4c4e0c71526bb86b8afd0011702000253472f4702eb83b71871a4c4e0c71526bb86b8af0200010000c2eb0b0000000000000000000000000000000000000000000000000000000008000000000000000000021702000194f6239c075d184e265eaea97a67eeced51725160200010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000017020001ce8ffa95606f0bfd2778cff2eff8fe8999e20c440200010000e1f50500000000000000000000000000000000000000000000000000000000000000000000000000",
        "1400bf6b285d006600204aa9d1010000000000000000000000000000000000000000000000000000020002f246b18e8c697f00ed9bd22696998e469d3f824b020001d7424d91c83566eb94233b5416f2aa77709c03e1020002f246b18e8c697f00ed9bd22696998e469d3f824b648c0117020002f246b18e8c697f00ed9bd22696998e469d3f824b0200010000204aa9d1010000000000000000000000000000000000000000000000000000080000000000000000000117020002f246b18e8c697f00ed9bd22696998e469d3f824b0200010000204aa9d1010000000000000000000000000000000000000000000000000000ffffffffffffffff00"
    ],
    "remark": "call"
}
```

