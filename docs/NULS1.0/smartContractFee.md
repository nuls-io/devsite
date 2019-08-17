# Service charge

## 1. Standards of service charge for smart contracts: How is the service fee charged? How much does it cost an interface invoker? Who will receive the service charge?

> `Background:` Since the NULS Main-Net uses the UTXO model, the transaction size is also used as one of the charging standards.

In the main-net, there are now three more types of transactions: `creating a smart contract`, `invoking a smart contract`, `deleting a smart contract`

The difference between those three transactions and other transactions such as `transfer` is that the execution of smart contracts will be added. So, execution of smart contracts will also be applied to the charging standards.

* Calculation of smart contract service charge 

```java
public static final int COMPARISON = 1 ; //Compare bytecode 
public static final int CONSTANT = 1 ; //Simple numeric type bytecode 
public static final int LDC = 1 ; //Numeric constant, string constant (length * LDC) 
public static final int CONTROL = .5 ; //Control bytecode 
public static final int TABLESWITCH = 2 ; //Switch bytecode (size * TABLESWITCH) 
public static final int LOOKUPSWITCH = 2 ; //Switch bytecode (size * LOOKUPSWITCH) 
public static final int CONVERSION = 1 ; //Value conversion 
public static final int EXTENDED = 1 ; //Null determine 
public static final int MULTIANEWARRAY = 1 ; //Multidimensional Array (size * MULTIANEWARRAY) 
public static final int LOAD = 1 ; / /Send the local variable to the top of the stack 
public static final int ARRAYLOAD = 5 ; / /Send an item of the array to the top of the stack
public static final int MATH = 1 ; //Mathematical operations and shift operations 
public static final int REFERENCE = 10 ; //Object related operations 
public static final int NEWARRAY = 1 ; //One-dimensional array (size * NEWARRAY) 
public static final int STACK = 2 ; //Stack operation 
public static final int STORE = 1 ; // Save the value in the top of the stack to a local variable 
public static final int ARRAYSTORE = 5; //Save the value of the stack to an array 
public static final int TRANSFER = 1000 ; //Transfer transaction

```

* Total service charge for invoking a smart contract 
The total service charge for a contract transaction consists of three parts
- The first part is the transaction fee based on the transaction size, calculated according to the byte size -> 0.001NULS/KB, which is 0.001 NULS per 1000 bytes. If the transaction size is less than 1000 bytes, the transaction fee is set as 0.001 NULS.

- The second part is the ‘Gas*Price’ consumed by executing the contract. The ‘Price’ is the unit cost, which means how much ‘Na’ there is for each Gas. ‘Na’ is the smallest unit of NULS, and 1 NULS = 100 million Na.
> For example, if executing a contract consumes 20,000 Gas and the set Price is 20 Na/Gas, then the Na consumed this time would be 20,000 * 20 = 400,000 Na, which is 0.004 NULS.

- The third part refers to the remaining part of the GasLimit. GasLimit is set by the contract invoker. If it is not fully consumed by executing the current contract, the remaining Gas will be returned as the consensus reward.
> Still using the previous example, if the GasLimit set for the contract is 30,000 Gas and executing the contract consumes 20,000 Gas, then 10,000 Gas will be left. The 10,000 Gas has: 10,000 * 20 = 200,000 Na, which is 0.002 NULS. This will be returned to the contract invoker in the CoinBase transaction (consensus reward) of the current packing block.

* How much does a contract invoker pay?

To start the contract transaction, the contract invoker pays the first, second and third part. In practical, the third part will be returned to the contract invoker in the CoinBase transaction (consensus reward) of the current packing block.

* Who receives the service charge?

> `Precondition:`This part of the cost is reflected in the CoinBase transaction (consensus reward) of the block.

The block packer receives the first and second parts of the service charge, and the contract invoker receives the third part.