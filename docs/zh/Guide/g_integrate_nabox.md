# JS集成Nabox指南

## 简介


该文档提供给Dapp接入Nabox钱包使用，Nabox提供支付、离线组装合约调用、查询钱包信息等接口能力。


```
安卓实例对象：NaboxPay
已有方法：
-naboxPay  （发起钱包支付）
-getDefaultAddress （获取当前默认钱包地址）
-getAddressBalance （获取钱包余额）
-transferOffline（离线组装转账交易）
-contractCallOffline（离线组装合约交易）
-switchingUsers（APP底部唤起当前钱包列表）
-authorization（APP底部唤起当前钱包列表,进行输入密码授权，返回keystore-加密私钥）

```
```
JS代码：
/**
 * NaboxJSBridge方法必须在H5作为一个全局方法暴露出去
 * app处理完事物后会通过调用NaboxJSBridge方法的appPayResponse函数将处理后的数据传给H5
 * 所以在H5端要将NaboxJSBridge方法作为全局方法挂在window下面
 *
 * 返回值	描述
 *  requestCode:
 *     ok	成功
 *     notfound	 未找到NaboxApp
 *     cancel	支付过程中用户取消
 *     fail	失败
 */
var NaboxJSBridge = {
	_callBack : null,

	/**
	 * 返回callBack{
	 *     requestCode:ok
	 *     txHash:  当返回成功时，有txHash值
	 *     payAddress: 支付人
	 * }
	 * @param params
	 * @param callBack
	 */
	appRequest : function(method, params,callBack) {
		var paramStr =  JSON.stringify(params);
		if (NaboxPay == undefined) {
			callBack({"request_code":"notfound"})
		}
		this._callBack = callBack;
		if ("naboxPay" == method){
			NaboxPay.naboxPay(paramStr);
		}
		if ("transferOffline" == method) {
			NaboxPay.transferOffline(paramStr);
		}
		if ("contractCallOffline" == method) {
			NaboxPay.contractCallOffline(paramStr);
		}
		if ("switchingUsers" == method){
			NaboxPay.switchingUsers();
		}
        if ("getDefaultAddress" == method){
            NaboxPay.getDefaultAddress(); 
        }
        if ("getAddressBalance" == method){
            NaboxPay.getAddressBalance(paramStr); 
        }
        if("authorization" == method){
            NaboxPay.authorization();
        }
	},
	/**
	 * 返回callBack{
	 *     requestCode:ok
	 *     address: Nabox当前默认钱包地址
	 * }
	 * @param params
	 * @param callBack
	 */
	getDefaultAddress : function(callBack) {
		if (NaboxPay == undefined) {
			callBack({"request_code":"notfound"})
		}
		this._callBack = callBack;
		NaboxPay.getDefaultAddress();
	},

	appPayResponse : function(data) {
		if (this._callBack != undefined) {
			this._callBack(data)
		}
	},

	invoke : function(method,params,callBack) {
		if (method == undefined) {
			return ;
		}
		if ("appPayResponse" == method) {
			this.appPayResponse(params);
		} else {
            this.appRequest(method,params, callBack);
        }
	}

};
```


## 接口说明


### naboxPay 
唤起Nabox钱包向商户发起转账,由Nabox直接广播交易

```
NaboxJSBridge.invoke(
    "naboxPay",//调用方法
    //业务数据
    {
        "shopId":"15669589240005", //商户id，由nabox分配，对应商户地址
        "payAmount":10000,//转账金额,单位Na
        "remark":"{'orderNo':'asdasdasdasd'}"//转账备注
    },
    function(data){
    });
```
### 接口返回格式

```
正常返回
//example
{      
     requestCode:ok
     txHash:  当返回成功时，有txHash值
     payAddress: 支付人
}
异常返回
//example
{
     requestCode:fail
}
```
### getDefaultAddress 

获取Nabox钱包当前默认钱包地址
```
NaboxJSBridge.invoke(
    "getDefaultAddress",//调用方法
    //业务数据
    null,
    function(data){
    });
```
### 接口返回格式

```
正常返回
//example
{      
     requestCode:ok
     address:  //nabox钱包当前默认钱包地址
}
异常返回
//example
{
     requestCode:fail
}
```
### getAddressBalance 

获取钱包余额信息，默认查询NULS资产
```
NaboxJSBridge.invoke(
    "getAddressBalance",//调用方法
    //业务数据
    {
       address: //查询钱包地址，必填
       contractAddress:// 合约地址，如果需要查询TOKEN资产填写资产合约地址，非必填
    },
    function(data){
    }); //回调函数
```
### 接口返回格式

```
正常返回
//example
{      
     requestCode:ok
     address:  //钱包地址
     symbol：  //资产单位缩写如NULS、CB
     decimals: //支持的小数位数
     totalBalance://资产总额，返回最小单位number，例如地址有1NULS，NULS的decimals=8则该参数返回100000000
     balance://可用资产,同上
}
异常返回
//example
{
     requestCode:fail
}
```

### transferOffline

离线组装转账并进行签名
```
NaboxJSBridge.invoke(
    "transferOffline",//调用方法
    //业务数据
    {
        "shopId":"15669589240005", //商户id，由nabox分配，对应商户地址
        "payAmount":10000,//转账金额转，单位是Na(1NULS=100000000Na)
        "remark":"{'orderNo':'asdasdasdasd'}"//转账备注
    },
    function(data){
    });
```
### 接口返回格式

```
正常返回
//example
{      
     requestCode:ok
     txHex: "",// 交易完整序列化16进制字符串数据，可以由游戏自行广播
     txHash:""//交易的hash值
}
异常返回
//example
{
     requestCode:fail
}
```



### contractCallOffline

离线组装调用合约方法并进行签名
```
NaboxJSBridge.invoke(
    "contractCallOffline",//调用方法
    //业务数据
    {
        "shopId":"15669589240005", //商户id，由nabox分配，对应合约地址，必填
        "value":10000,//转给合约的金额，单位NULS，没有填0
        "methodName":"buy",//合约方法名称，必填
        "methodDesc":"",//合约方法描述，若合约内方法没有重载，则此参数可以为空
        "args":[1,"tNULSeBaMvw2QtYPhLjgCFuBQefpXDczAdd49C"], //参数列表，必填
        "argsType":["Long","String"],// 参数类型列表，必填
        "sender":"tNULSeBaMvw2QtYPhLjgCFuBQefpXDczAdd49C"//调用人地址，，必填
    },
    function(data){
    });
```
### 接口返回格式

```
正常返回
//example
{      
     requestCode:ok
     txHex: "",// 合约交易完整序列化16进制字符串数据，可以由游戏自行广播
     txHash:""//合约交易的hash值
}
异常返回
//example
{
     requestCode:fail
}
```


### switchingUsers

唤起APP当前钱包列表进行选择
```
NaboxJSBridge.invoke(
    "switchingUsers",//调用方法
    //业务数据
    null,
    function(data){
    });
```
### 接口返回格式

```
正常返回
//example
{      
     requestCode:ok,
     address: "" //选中钱包地址
    
}
异常返回
//example
{
     requestCode:fail
}
```

### authorization

唤起APP当前钱包列表进行选择
```
NaboxJSBridge.invoke(
    "authorization",//调用方法
    //业务数据
    null,
    function(data){
    });
```
### 接口返回格式

```
正常返回
//example
{      
     requestCode:ok,
     address:, //选中地址
     alias:,   //钱包名称
     encryptedPrivateKey://加密后的私钥
     pubKey:  //公钥
}
异常返回
//example
{
     requestCode:fail
}
```