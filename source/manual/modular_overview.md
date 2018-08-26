title: NULS module organization structure
---

The NULS system is a combination of multiple modules. The definition of the module has a set of rules: top-level directory -> interface engineering, implementation directory -> implementation project. There are also corresponding naming rules. For example, if a module is A, then the structure of this module is as follows:

- A-module
- A
- base
- A-base
- A-protocol
- A-rpc
- A-sdk
- A-storage

The change is that this module has a very clear implementation of many different ways, then named according to the corresponding implementation, more typical consensus module and ledger module. In this case, for example, if a module is M and its implementation is B, then the structure of this module is as follows:

- M-module
- M
- B
- M-B-base
- M-B-protocol
- M-B-rpc
- M-B-sdk
- M-B-storage

It is worth noting that not all module implementations must include these projects. For example, some modules do not need storage, so there is no need for storage. Some modules do not have a protocol, so no protocl is needed.