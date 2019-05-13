# 开发业务模块

​	阅读本文之前,请先阅读[生成程序包](/zh/NULS2.0/packageGeneration.html)

​	NULS2.0是基于模块化开发的区块链项目。根据区块链的特点以及NULS特有的POC共识机制，我们已内置账户、账本、网络、区块管理、交易管理、共识、智能合约模块，这些模块已经可以满足NULS2.0区块链节点的正常运行。但基础模块不可能满足所有的业务需求，本文会引导开发者如何添加自己的模块以及如何添加自己的协议。

​	在添加模块之前，我们首先应该对业务做需求分析，需要明确的知道，添加的模块只是对现有协议的封装与加工处理，还是说现有的协议不满足业务的需求，必须要新增加协议与协议的逻辑处理来实现功能。

​	本文用api-module和account两个已开发的模块来举例说明如何添加自己的模块（两个模块均为JAVA开发，可到https://github.com/nuls-io/nuls_2.0上下载源码阅读）。

## 新增模块

​	api-module模块负责对钱包内已存储的区块数据做二次解析，给钱包页面和浏览器提供可展示的信息。因此模块不需要额外增加协议。

### 在ModuleE枚举类里添加新模块

```
public enum ModuleE {
    /**
     * prefix + name
     */
    KE("ke", Constant.KERNEL, "nuls.io"),
    CM("cm", Constant.CHAIN, "nuls.io"),
    AC("ac", Constant.ACCOUNT, "nuls.io"),
    NW("nw", Constant.NETWORK, "nuls.io"),
    CS("cs", Constant.CONSENSUS, "nuls.io"),
    BL("bl", Constant.BLOCK, "nuls.io"),
    LG("lg", Constant.LEDGER, "nuls.io"),
    TX("tx", Constant.TRANSACTION, "nuls.io"),
    EB("eb", Constant.EVENT_BUS, "nuls.io"),
    PU("pu", Constant.PROTOCOL, "nuls.io"),
    CC("cc", Constant.CROSS_CHAIN, "nuls.io"),
    SC("sc", Constant.SMART_CONTRACT, "nuls.io"),
    AP("ap", Constant.API_MODULE, "nuls.io");           //新增api_module模块
}
```

### 创建模块的Bootstrap启动类

启动类需继承RpcModule类，便于mykernel核心模块管理。继承之后需要实现特有方法，如下示例：

**（以下代码示例来自api-module模块源码）**

```
@Component
public class ApiModuleBootstrap extends RpcModule {
    /**
     *模块启动main函数
     */
	public static void main(String[] args) {
        if (args == null || args.length == 0) {
            args = new String[]{"ws://" + HostInfo.getLocalIP() + ":8887/ws"};
        }
        //运行模块扫描程序
        NulsRpcModuleBootstrap.run("io.nuls", args);
    }
    
    /**
     *返回当前模块的描述信息
     *注：当前模块名称不能和其他模块重名
     */
    @Override
    public Module moduleInfo() {
        return new Module(ModuleE.AP.abbr, "1.0");
    }
    
	/**
     *添加依赖模块：如果你的模块需要调用其他模块的接口，或是需要其他模块运行之后才能正常运行,
     *就需要在这里添加所依赖的模块
     */
	@Override
    public Module[] declareDependent() {
          return new Module[]{
                new Module(ModuleE.CS.abbr, "1.0"),
                new Module(ModuleE.BL.abbr, "1.0"),
                new Module(ModuleE.AC.abbr, "1.0"),
                new Module(ModuleE.TX.abbr, "1.0"),
                new Module(ModuleE.LG.abbr, "1.0"),
                new Module(ModuleE.SC.abbr, "1.0")
        };
    }
    
    /**
     *模块初始化方法：可在此添加模块初始化相关实现
     */
    @Override
    public void init() {
        try {
        	//首先调用父类的初始化方法
            super.init();
            //初始化api-modlue模块配置项
            initCfg();
        } catch (Exception e) {
            Log.error(e);
        }
    }
    
    /**
     *模块的启动方法：可以在此启动模块不依赖其他模块便可直接启动的服务，
     *启动成功返回true,启动失败返回false
     */
    @Override
    public boolean doStart() {
    	//api-module模块没有不依赖其他模块启动的服务
    	return true;
    }
    
    /**
     *所依赖模块均启动成功后执行的方法：
     *走到这一步表面你所依赖的模块都已经成功启动，这个时候就可以调用其他模块的接口了。
     *一般模块的主要的主要服务实现，都会在所依赖的模块都启动成功后
     *api-module模块主要功能就是查询其他模块的接口，然后解析数据返回给钱包页面展示，
     *因此模块真正的运行是在scheduleManager.start()这一步做的，内部的实现详见源码
     */
    @Override
    public RpcModuleState onDependenciesReady() {
            ScheduleManager.start();
    }
    
    /**
     *某个依赖模块失去连接后执行的方法：
     *返回Ready,则表明模块退化到Ready状态,当依赖重新准备完毕后，将重新触发onDependenciesReady方法
     */
    @Override
    public RpcModuleState onDependenciesLoss(Module dependenciesModule) {
        return RpcModuleState.Ready;
    }
}
```

到此为止，api-module模块已经成功加入nusl2.0。由于没有新增的协议，模块内部只需要编写模块本身的业务功能即可。



## 新增协议

​	协议包含交易（Transaction）或消息(Message)。我们用账户模块的别名交易来举例说明如何新增协议。别名交易顾名思义就是账户发送一个交易，交易里带有账户想要设置的别名信息，一旦交易被共识节点成功打包到区块中，就表明账户设置别名成功。页面在显示该账户信息的时候都会显示账户别名。

### 添加交易类型

​	 每一种交易都需要单独设置自己的交易类型。交易类型不能与其他模块的交易类型重复。有关其他模块的交易类型，详见RPC文档。

### 创建交易逻辑对象

​	交易逻辑对象属于交易里存储的业务逻辑数据，例如别名交易里就存的别名信息，对象需继承TransactionLogicData类。如下示例：

```
public class Alias extends TransactionLogicData {
	//账户地址的字节数组
	private byte[] address;
	//账户别名
    private String alias;
    
    /**
     *获取逻辑对象包含的地址信息
     *不同的逻辑对象可能包含零到多个地址信息，例如转账交易就包含发送者和接收者地址
     */
    @Override
    public Set<byte[]> getAddresses() {
        Set<byte[]> addressSet = new HashSet<>();
        addressSet.add(this.address);
        return addressSet;
    }
    
    /**
     *由于逻辑数据最终会序列化为byte数组在网络中广播，因此需要实现序列化和反序列化的方法
     */
     
    /**
     *序列化后的byte字节长度
     */ 
    @Override
    public int size() {
        int s = 0;
        s += SerializeUtils.sizeOfBytes(address);
        s += SerializeUtils.sizeOfString(alias);
        return s;
    }
   
    /**
     *序列化方法
     */
    @Override
    protected void serializeToStream(NulsOutputStreamBuffer stream) throws IOException {
        stream.writeBytesWithLength(address);
        stream.writeString(alias);
    }
    
    /**
    *反序列化方法
    */
    @Override
    public void parse(NulsByteBuffer byteBuffer) throws NulsException {
        this.address = byteBuffer.readByLengthByte();
        this.alias = byteBuffer.readString();
    }
}
```



### 新增交易创建方式和交易处理器

添加创建交易的接口，用户通过创建交易接口能顺利组装交易并广播到全网；

添加交易的处理器，处理器需包含交易的验证接口，交易打包的处理接口，交易的回滚接口。

验证接口会由交易管理模块验证新收到的交易时调用，验证失败的交易会丢弃；

验证通过的交易会由交易模块统一调用处理交易接口，存储到本地数据库中;

当有区块回滚时，由交易模块统一调用回滚交易接口，将存储在本地的交易相关数据清除；

**有关代码的实现详见：**

```
io.nuls.account.rpc.cmd.AliasCmd
io.nuls.account.rpc.cmd.AccountTransactionHandler
```



### 新增协议配置文件

​每个模块新增协议时，都需要添加对应的协议配置文件（protocol-config.json），系统会根据协议配置文件统一管理各个子模块的协议。配置文件的添加方式和规则如下

每个涉及到网络消息收发、交易处理的模块都需要在项目resources目录下新建一个protocol-config.json文件。文件的加载、解析不需要各模块自己写代码,最后会融合到RpcModule中。

#### 文件格式

```json
[
  //协议版本1的配置
  {
    "version": "1",
    "extend": "",
    "moduleValidator": "ac_accountTxValidate",
    "moduleCommit": "ac_commitTx",
    "moduleRollback": "ac_rollbackTx",
    "validTransactions": [
	  {
        "type": "2",
        "systemTx": false,
        "unlockTx": false,
        "verifySignature": true,
        "handler": "io.nuls.account.rpc.cmd.AccountTransactionHandler",
        "validate": "transferTxValidate",
        "commit": "",
        "rollback": ""
      },
      {
        "type": "3",
        "systemTx": false,
        "unlockTx": false,
        "verifySignature": true,
        "handler": "io.nuls.account.rpc.cmd.AccountTransactionHandler",
        "validate": "aliasTxValidate",
        "commit": "aliasTxCommit",
        "rollback": "aliasTxRollback"
      }
	],
    "validMessages": [
      {
        "name": "io.nuls.block.message.HashListMessage",
        "protocolCmd": "getBlock,forward,getsBlock",
        "handlers": "io.nuls.block.message.handler.GetTxGroupHandler#process"
      },
      {
        "name": "io.nuls.block.message.HashMessage",
        "protocolCmd": "getBlock,forward,getsBlock",
        "handlers": "io.nuls.block.message.handler.ForwardSmallBlockHandler#process,io.nuls.block.message.handler.GetBlockHandler#process,io.nuls.block.message.handler.GetSmallBlockHandler#process"
      }
    ],
    "invalidTransactions": "",
    "invalidMessages":""
  },
    
  //协议版本2的配置
  {
    "version": "2",
    "extend": "1",
    "moduleValidator": "",
    "moduleCommit": "",
    "moduleRollback": "",
    "validTransactions": [],
    "validMessages": [],
    "invalidTransactions": "2",
    "invalidMessages": "io.nuls.block.message.HashListMessage,io.nuls.block.message.HashListMessage"
  }
]
```

#### 主要字段说明

**version**：版本号，必选填数字。新增协议时，新协议的版本号必选大于老协议版本号

**extend**：继承哪个版本的配置。例如上面示例代码中版本2继承至版本1，继承后版本1已有的相关配置，版本2无				需重写。 若没有继承时，字段可为空。

**moduleValidator**：处理完整区块时的交易批量验证接口

**moduleCommit**：处理完整区块时的交易批量逻辑处理接口

**moduleRollback**：回滚完整区块时的交易批量逻辑处理接口

**validTransactions**：该版本有效的交易配置

    type:交易类型
    systemTx:是否系统交易，系统交易是指不会由某个账户主动发起，而是由系统根据规则自动生成的交易，例如				 coinbase交易、红黄牌交易
    unlockTx:是否解锁交易，解锁交易指该交易是否支持将共识锁定的代币解锁。例如：取消委托交易，注销共识节点交易
    verifySignature:是否验证签名
    handler:交易处理类
    validate:交易验证方法名
    commit:交易提交方法名
    rollback:交易回滚方法名

**validMessages**：该版本有效的网络消息配置

    name:消息类名
    protocolCmd:消息对应的网络处理接口(向网络模块注册消息时使用)
    handlers:消息对应的处理方法(类名#方法名)

**invalidTransactions**：该版本失效的交易配置(只需要填写需要作废的交易类型，用逗号分隔)

**invalidMessages**：该版本无效的网络消息配置(填入要废弃的消息类名)



#### 协议升级统计原理

区块头中有四个字段跟协议升级有关
```java
public class BlockExtendsData extends BaseNulsData {

    /**
     * 主网当前生效的版本
     */
    private short mainVersion;

    /**
     * 区块的版本,可以理解为本地钱包的版本
     */
    private short blockVersion;

    /**
     * 每个统计区间内的最小生效比例(60-100)
     */
    private byte effectiveRatio;

    /**
     * 协议生效要满足的连续区间数(50-1000)
     */
    private short continuousIntervalCount;
}
```
收到新区块时，区块模块会通知协议升级模块,协议升级模块会解析上面四个字段，每隔1000[^1]个区块统计一次该区间内的协议版本比例，新的协议版本比例大于effectiveRatio时，新协议的生效区间数+1，累计够continuousIntervalCount时新协议生效；中途若有一个区间新协议版本比例低于effectiveRatio，累计计数清零。



#### 协议升级改造实例

增加MessageHandler和TransactionProcessor两个注解,MessageHandler用于网络消息处理方法上，TransactionProcessor用于交易的验证、提交、回滚方法上，使用方式如下：

```java
@Service
public class ForwardSmallBlockHandler extends BaseCmd {

    @CmdAnnotation(cmd = FORWARD_SMALL_BLOCK_MESSAGE, version = 1.0, scope = Constants.PUBLIC, description = "")
    @MessageHandler(message = HashMessage.class)
    public Response process(Map map) {
        return success();
    }
}
```

```java
@Service
public class TransactionHandler extends BaseCmd {

    /**
     * 转账交易验证
     */
    @CmdAnnotation(cmd = "ac_transferTxValidate", version = 1.0, description = "create transfer transaction validate 1.0")
    @ResisterTx(txType = TxProperty.TRANSFER, methodType = TxMethodType.VALID, methodName = "ac_transferTxValidate")
    @Parameter(parameterName = RpcParameterNameConstant.CHAIN_ID, parameterType = "int")
    @Parameter(parameterName = RpcParameterNameConstant.TX, parameterType = "String")
    @TransactionProcessor(txType = TxType.TRANSFER, methodType = TxMethodType.VALID)
    public Response transferTxValidate(Map<String, Object> params) {
        return success(resultMap);
    }
}
```

注意几个地方

- 要使用@Service注解,否则拦截失效
- 方法名与protocol-config.json中保持一致
- 一个交易的验证、提交、回滚方法写在一个类里


### 启动模块注册交易

​	模块在启动的时候，需要在onDependenciesReady()里向交易管理模块注册自己模块新增的交易，以及对应的验证器和处理器，如下示例：

```

    @Override
    public void onDependenciesReady(Module module) {
        if (ModuleE.TX.abbr.equals(module.getName())) {
            //注册账户模块相关交易到交易模块
            chainManager.registerTx();
            LoggerUtil.logger.info("register tx ...");
        }
        if (ModuleE.PU.abbr.equals(module.getName())) {
            //注册账户模块相关交易到协议模块            chainManager.getChainMap().keySet().forEach(RegisterHelper::registerProtocol);
            LoggerUtil.logger.info("register protocol ...");
        }
    }
```



### 新增module.ncf配置文件

到此为止，协议增加完成。最后，记得在模块的项目路径下添加module.ncf配置文件，如下所示：

![1553680677761](./developModule/11.png)

```
[JAVA]
APP_NAME=account 
MAIN_CLASS=io.nuls.account.AccountBootstrap     //模块启动类
VERSION=1.0.0                                   //模块当前版本                             
JOPT_XMS=256									//java虚拟机启动参数
JOPT_XMX=256                                    //java虚拟机启动参数

[Core]
Managed=1     //nulstar启动时，是否启动当前模块 0：不启动 ，1：启动，默认为1
```



























