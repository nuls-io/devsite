## DB module

### Introduction

* Module name : db

* ModuleID : 4

* Description : Provide key-value db services for block chain. db module is responsible for persistent data.

### Module configuration

```
    [db]
    #Bootstrap class
    bootstrap=io.nuls.db.module.impl.LevelDbModuleBootstrap
    
    # File path
    leveldb.datapath=./data
    
    # The maximum limitation to the number of areas
    leveldb.area.max=20
```

### Service

* DBService

```java
public interface DBService {

    /**
     * Create a data area.
     *
     * @param areaName
     
     * @return The result of the operation.
     */
    Result createArea(String areaName);

    /**
     * Create a data area for the custom key comparator.
     *
     * @param areaName
     * @param comparator Customized key comparator.
     *
     * @return the result of the operation
     */
    Result createArea(String areaName, Comparator<byte[]> comparator);

    /**
     * Lists all Area names in the current database
     *
     * @return The result of the operation.
     */
    String[] listArea();

    /**
     * Store key-value in bytes.
     *
     * @param area
     * @param key
     * @param value
     *
     * @return The result of the operation.
     */
    Result put(String area, byte[] key, byte[] value);

    /**
     * Store a object
     *
     * @param area
     * @param key
     * @param value Object to be stored.
     * @param <T>
     * @return
     */
    <T> Result putModel(String area, byte[] key, T value);

    /**
     * Delete value by key.
     *
     * @param area
     * @param key
     *
     * @return  The result of the operation.
     */
    Result delete(String area, byte[] key);

    /**
     * Query value by key.
     *
     * @param area
     * @param key
     *
     * @return The result of the operation.
     */
    byte[] get(String area, byte[] key);

    /**
     * Query the specified object by the key and object class.
     * The precondition is that the key is stored by method putModel, otherwise the value is null.
     *
     * @param area
     * @param key
     * @param clazz The Specified class of the object.
     * @param <T>
     * 
     * @return The object or null.
     */
    <T> T getModel(String area, byte[] key, Class<T> clazz);

    /**
     * Get the Object of Object from the key.
     *
     * param area
     * @param key
     * @return
     */
    Object getModel(String area, byte[] key);

    /**
     * Query the unordered set of all keys in the data area.
     *
     * @param area
     *
     * @return The set of the keys.
     */
    Set<byte[]> keySet(String area);

    /**
     * Query the ordered list of all keys in the data area.
     *
     * @param area
     * @return The list of keys.
     */
    List<byte[]> keyList(String area);

    /**
     * Query the ordered List of all values in the data area.
     *
     * @param area
     *
     * @return The list of values.
     */
    List<byte[]> valueList(String area);

    /**
     * Query the unordered set of all key-value pairs in the data area.
     *
     * @param area
     *
     * @return The set of key-value pairs.
     */
    Set<Entry<byte[], byte[]>> entrySet(String area);

    /**
     * Gets an ordered set of all key-values in the data area.
     *
     * @param area
     *
     * @return The set of key-value pairs.
     */
    List<Entry<byte[], byte[]>> entryList(String area);


    /**
     * Query the ordered list of all key-value pairs in the data area.
     * The precondition is that the objects are stored by the mothod putModel, otherwise value is null.
     *
     * @param area
     * @param clazz The Specified class of the objects.
     * @param <T>
     *
     * @return The list of key-value pairs.
     */
    <T> List<Entry<byte[], T>> entryList(String area, Class<T> clazz);

    /**
     * Query the ordered list of all values in the data area and specifies the returned value object.
     * The precondition is that the objects are stored by the mothod putModel, otherwise value is null.
     *
     * @param area
     * @param clazz The Specified class of the objects.
     * @param <T>
     *
     * @return The list of values.
     */
    <T> List<T> values(String area, Class<T> clazz);

    /**
     * Batch insert, delete, update operations in the data area.
     *
     * @param area
     *
     * @return
     */
    BatchOperation createWriteBatch(String area);

    /**
     * Destroy an area by areaName.
     *
     * @param areaName
     *
     * @return The result of the operation.
     */
    Result destroyArea(String areaName);
}
```

