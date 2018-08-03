## db module

### 基本信息

* 模块名称：db

* 模块编号：4

* 功能简介：提供key-value存储服务。

### 模块配置

```ini
    [db]
    #Bootstrap class
    bootstrap=io.nuls.db.module.impl.LevelDbModuleBootstrap
    
    # file path
    leveldb.datapath=./data
    
    # 能够创建的最大的area数目
    leveldb.area.max=20
```

### 服务

* DBService

```java
public interface DBService {

    /**
     * 创建一个数据区域
     *
     * @param areaName
     * 
     * @return
     */
    Result<Boolean> createArea(String areaName);

    /**
     * 创建一个自定义key比较器的数据区域
     *
     * @param areaName
     * @param comparator 自定义key比较器.
     * 
     * @return
     */
    Result<Boolean> createArea(String areaName, Comparator<byte[]> comparator);

    /**
     * 列出当前数据库中所有Area名称
     *
     * @return
     */
    String[] listArea();

    /**
     * 按字节存储key-value
     *
     * @param area
     * @param key
     * @param value
     * 
     * @return
     */
    Result put(String area, byte[] key, byte[] value);

    /**
     * 存储对象
     *
     * @param area
     * @param key
     * @param value 需要存储的对象.
     * @param <T>
     *     
     * @return
     */
    <T> Result putModel(String area, byte[] key, T value);

    /**
     * 根据key删除value
     *
     * @param area
     * @param key
     * 
     * @return
     */
    Result delete(String area, byte[] key);

    /**
     * 根据key查询value
     *
     * @param area
     * @param key
     * 
     * @return
     */
    byte[] get(String area, byte[] key);

    /**
     * 根据key和对象class获取指定对象
     * 前提是这个key的存储方式是putModel，否则value为null
     *
     * @param area
     * @param key
     * @param clazz 指定对象的class.
     * @param <T>
     *     
     * @return
     */
    <T> T getModel(String area, byte[] key, Class<T> clazz);

    /**
     * 根据key获取Object对象
     *
     * param area
     * @param key
     * 
     * @return
     */
    Object getModel(String area, byte[] key);

    /**
     * 获取数据区域的所有key的无序集合
     *
     * @param area
     * 
     * @return
     */
    Set<byte[]> keySet(String area);

    /**
     * 获取数据区域的所有key的有序集合
     * Gets an ordered collection of all keys in the data area.
     *
     * @param area
     * @return
     */
    List<byte[]> keyList(String area);

    /**
     * 获取数据区域的所有value的有序集合
     *
     * @param area
     * 
     * @return
     */
    List<byte[]> valueList(String area);

    /**
     * 获取数据区域的所有key-value的无序集合
     *
     * @param area
     * 
     * @return
     */
    Set<Entry<byte[], byte[]>> entrySet(String area);

    /**
     * 获取数据区域的所有key-value的有序集合
     *
     * @param area
     * 
     * @return
     */
    List<Entry<byte[], byte[]>> entryList(String area);


    /**
     * 获取数据区域的所有key-value的有序集合，并指定返回的value对象
     * 前提是这个数据区域的存储方式是putModel，否则value为null
     * 
     * @param area
     * @param clazz 指定对象的class.
     * @param <T>
     *     
     * @return
     */
    <T> List<Entry<byte[], T>> entryList(String area, Class<T> clazz);

    /**
     * 获取数据区域的所有value的有序集合，并指定返回的value对象
     * 前提是这个数据区域的存储方式是putModel，否则value为null
     *
     * @param area
     * @param clazz 指定对象的class.
     * @param <T>
     *     
     * @return
     */
    <T> List<T> values(String area, Class<T> clazz);

    /**
     * 指定数据区域的批量增删改操作
     *
     * @param area
     * 
     * @return
     */
    BatchOperation createWriteBatch(String area);

    /**
     * 删除Area
     *
     * @param areaName
     * 
     * @return
     */
    Result destroyArea(String areaName);
}
```
