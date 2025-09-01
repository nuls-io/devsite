---
title: ENULS Virtual Machine (EVM)
description: An introduction to the ENULS virtual machine and how it relates to state, transactions, and smart contracts.
lang: en
---

The EVM’s physical instantiation can’t be described in the same way that one might point to a cloud or an ocean wave, but it does _exist_ as one single entity maintained by thousands of connected computers running an ENULS client.

The ENULS protocol itself exists solely for the purpose of keeping the continuous, uninterrupted, and immutable operation of this special state machine. It's the environment in which all ENULS accounts and smart contracts live. At any given block in the chain, ENULS has one and only one 'canonical' state, and the EVM is what defines the rules for computing a new valid state from block to block.

## Prerequisites 

Some basic familiarity with common terminology in computer science such as [bytes](https://wikipedia.org/wiki/Byte), [memory](https://wikipedia.org/wiki/Computer_memory), and a [stack](<https://wikipedia.org/wiki/Stack_(abstract_data_type)>) are necessary to understand the EVM. It would also be helpful to be comfortable with cryptography/blockchain concepts like [hash functions](https://wikipedia.org/wiki/Cryptographic_hash_function) and the [Merkle tree](https://wikipedia.org/wiki/Merkle_tree).

## From ledger to state machine 

The analogy of a 'distributed ledger' is often used to describe blockchains like Bitcoin, which enable a decentralized currency using fundamental tools of cryptography. The ledger maintains a record of activity which must adhere to a set of rules that govern what someone can and cannot do to modify the ledger. For example, a Bitcoin address cannot spend more Bitcoin than it has previously received. These rules underpin all transactions on Bitcoin and many other blockchains.

While ENULS has its own native cryptocurrency (NULS) that follows almost exactly the same intuitive rules, it also enables a much more powerful function: smart contracts. For this more complex feature, a more sophisticated analogy is required. Instead of a distributed ledger, ENULS is a distributed [state machine](https://wikipedia.org/wiki/Finite-state_machine). ENULS's state is a large data structure which holds not only all accounts and balances, but a _machine state_, which can change from block to block according to a pre-defined set of rules, and which can execute arbitrary machine code. The specific rules of changing state from block to block are defined by the EVM.


## The ENULS state transition function 

The EVM behaves as a mathematical function would: Given an input, it produces a deterministic output. It therefore is quite helpful to more formally describe ENULS as having a **state transition function**:

```
Y(S, T)= S'
```

Given an old valid state `(S)` and a new set of valid transactions `(T)`, the ENULS state transition function `Y(S, T)` produces a new valid output state `S'`

### State 

In the context of ENULS, the state is an enormous data structure called a modified Merkle Patricia Trie, which keeps all [accounts](../accounts/) linked by hashes and reducible to a single root hash stored on the blockchain.

### Transactions 

Transactions are cryptographically signed instructions from accounts. There are two types of transactions: those which result in message calls and those which result in contract creation.

Contract creation results in the creation of a new contract account containing compiled smart contract bytecode. Whenever another account makes a message call to that contract, it executes its bytecode.

## EVM instructions 

The EVM executes as a [stack machine](https://wikipedia.org/wiki/Stack_machine) with a depth of 1024 items. Each item is a 256-bit word, which was chosen for the ease of use with 256-bit cryptography (such as Keccak-256 hashes or secp256k1 signatures).

During execution, the EVM maintains a transient _memory_ (as a word-addressed byte array), which does not persist between transactions.

Contracts, however, do contain a Merkle Patricia _storage_ trie (as a word-addressable word array), associated with the account in question and part of the global state.

Compiled smart contract bytecode executes as a number of EVM opcodes, which perform standard stack operations like `XOR`, `AND`, `ADD`, `SUB`, etc. The EVM also implements a number of blockchain-specific stack operations, such as `ADDRESS`, `BALANCE`, `BLOCKHASH`, etc.


## Further Reading 

- [Jellopaper aka KEVM: Semantics of EVM in K](https://jellopaper.org/)
- [The Beigepaper](https://github.com/chronaeon/beigepaper)
- [A short introduction in Solidity's documentation](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)

## Related Topics 

- [Gas](../gas/)
