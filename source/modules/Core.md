### Core 模块

#### Basic information

- 模块名称：core

- 模块ID：1

- 说明： 

  为区块链提供系统级的工具，功能，配置等。

#### 服务

- KernelService

```java

@Service
public class KernelService {

    public Result<NulsVersion> getVersion() {
        return Result.getSuccess().setData(NulsConfig.VERSION);
    }

    public Result<Boolean> setLanguage(String lang) {
        try {
            I18nUtils.setLanguage(lang);
        } catch (NulsException e) {
            Result.getFailed(e.getErrorCode());
        }
        return Result.getSuccess();
    }
}
```

