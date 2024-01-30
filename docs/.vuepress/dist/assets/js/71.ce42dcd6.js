(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{504:function(e,t,a){"use strict";a.r(t);var n=a(0),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content"},[a("p",[e._v("An ENULS account is an entity with an NULS (NULS) balance that can send transactions on ENULS. Accounts can be user-controlled or deployed as smart contracts.")]),e._v(" "),e._m(0),e._v(" "),a("p",[e._v("Accounts are a very beginner-friendly topic. But to help you better understand this page, we recommend you first read through our "),a("router-link",{attrs:{to:"./../"}},[e._v("introduction to ENULS")]),e._v(".")],1),e._v(" "),e._m(1),e._v(" "),a("p",[e._v("ENULS has two account types:")]),e._v(" "),e._m(2),e._v(" "),a("p",[e._v("Both account types have the ability to:")]),e._v(" "),e._m(3),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),e._m(6),e._v(" "),e._m(7),e._v(" "),e._m(8),e._v(" "),e._m(9),e._v(" "),a("p",[e._v("ENULS accounts have four fields:")]),e._v(" "),e._m(10),e._v(" "),e._m(11),e._v(" "),a("p",[e._v("An account is made up of a cryptographic pair of keys: public and private. They help prove that a transaction was actually signed by the sender and prevent forgeries. Your private key is what you use to sign transactions, so it grants you custody over the funds associated with your account. You never really hold cryptocurrency, you hold private keys – the funds are always on ENULS's ledger.")]),e._v(" "),a("p",[e._v("This prevents malicious actors from broadcasting fake transactions because you can always verify the sender of a transaction.")]),e._v(" "),a("p",[e._v("If Alice wants to send NULS from her own account to Bob’s account, Alice needs to create a transaction request and send it out to the network for verification. ENULS’s usage of public-key cryptography ensures that Alice can prove that she originally initiated the transaction request. Without cryptographic mechanisms, a malicious adversary Eve could simply publicly broadcast a request that looks something like “send 5 NULS from Alice’s account to Eve’s account,” and no one would be able to verify that it didn’t come from Alice.")]),e._v(" "),e._m(12),e._v(" "),a("p",[e._v("When you want to create an account most libraries will generate you a random private key.")]),e._v(" "),a("p",[e._v("A private key is made up of 64 hex characters and can be encrypted with a password.")]),e._v(" "),a("p",[e._v("Example:")]),e._v(" "),e._m(13),e._v(" "),a("p",[e._v("The public key is generated from the private key using the "),a("a",{attrs:{href:"https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm",target:"_blank",rel:"noopener noreferrer"}},[e._v("Elliptic Curve Digital Signature Algorithm"),a("OutboundLink")],1),e._v(". You get a public address for your account by taking the last 20 bytes of the Keccak-256 hash of the public key and adding "),a("code",[e._v("0x")]),e._v(" to the beginning.")]),e._v(" "),e._m(14),e._v(" "),e._m(15),e._m(16),e._v(" "),a("p",[e._v("You need a private key to sign messages and transactions which output a signature. Others can then take the signature to derive your public key, proving the author of the message. In your application, you can use a javascript library to send transactions to the network.")]),e._v(" "),e._m(17),e._v(" "),a("p",[e._v("Contract accounts also have a 42 character hexadecimal address:")]),e._v(" "),a("p",[e._v("Example:")]),e._v(" "),e._m(18),e._v(" "),a("p",[e._v("The contract address is usually given when a contract is deployed to the ENULS Blockchain. The address comes from the creator's address and the number of transactions sent from that address (the “nonce”).")]),e._v(" "),e._m(19),e._v(" "),a("p",[e._v("There is also another type of key in ENULS, introduced when ENULS switched from proof-of-work to proof-of-stake based consensus. These are 'BLS' keys and they are used to identify validators. These keys can be efficiently aggregated to reduce the bandwidth required for the network to come to consensus. Without this key aggregation the minimum stake for a validator would be much higher.")]),e._v(" "),a("p",[a("router-link",{attrs:{to:"/developers/docs/consensus-mechanisms/pos/keys/"}},[e._v("More on validator keys")]),e._v(".")],1),e._v(" "),e._m(20),e._v(" "),a("p",[e._v("An account is not a wallet. An account is the keypair for a user-owned ENULS account. A wallet is an interface or application that lets you interact with your ENULS account.")]),e._v(" "),e._m(21),e._v(" "),a("p",[e._v("Watch Austin walk you through hash functions, and key pairs.")]),e._v(" "),a("YouTube",{attrs:{id:"QJ010l-pBpE"}}),e._v(" "),a("YouTube",{attrs:{id:"9LtBDy67Tho"}})],1)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"prerequisites"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[this._v("#")]),this._v(" Prerequisites")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"account-types"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#account-types"}},[this._v("#")]),this._v(" Account types")])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("Externally-owned account (EOA) – controlled by anyone with the private keys")]),this._v(" "),t("li",[this._v("Contract account – a smart contract deployed to the network, controlled by code.")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("Receive, hold and send NULS and tokens")]),this._v(" "),t("li",[this._v("Interact with deployed smart contracts")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h3",{attrs:{id:"key-differences"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#key-differences"}},[this._v("#")]),this._v(" Key differences")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("strong",[this._v("Externally-owned")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("Creating an account costs nothing")]),this._v(" "),t("li",[this._v("Can initiate transactions")]),this._v(" "),t("li",[this._v("Transactions between externally-owned accounts can only be NULS/token transfers")]),this._v(" "),t("li",[this._v("Made up of a cryptographic pair of keys: public and private keys that control account activities")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("strong",[this._v("Contract")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("ul",[t("li",[this._v("Creating a contract has a cost because you're using network storage")]),this._v(" "),t("li",[this._v("Can only send transactions in response to receiving a transaction")]),this._v(" "),t("li",[this._v("Transactions from an external account to a contract account can trigger code which can execute many different actions, such as transferring tokens or even creating a new contract")]),this._v(" "),t("li",[this._v("Contract accounts don't have private keys. Instead, they are controlled by the logic of the smart contract code")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"an-account-examined"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#an-account-examined"}},[this._v("#")]),this._v(" An account examined")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[a("code",[e._v("nonce")]),e._v(" – A counter that indicates the number of transactions sent from an externally-owned account or the number of contracts created by a contract account. Only one transaction with a given nonce can be executed for each account, protecting against replay attacks where signed transactions are repeatedly broadcast and re-executed.")]),e._v(" "),a("li",[a("code",[e._v("balance")]),e._v(" – The number of wei owned by this address. Wei is a denomination of NULS and there are 1e+18 wei per NULS.")]),e._v(" "),a("li",[a("code",[e._v("codeHash")]),e._v(" – This hash refers to the "),a("em",[e._v("code")]),e._v(" of an account on the ENULS virtual machine (EVM). Contract accounts have code fragments programmed in that can perform different operations. This EVM code gets executed if the account gets a message call. It cannot be changed, unlike the other account fields. All such code fragments are contained in the state database under their corresponding hashes for later retrieval. This hash value is known as a codeHash. For externally owned accounts, the codeHash field is the hash of an empty string.")]),e._v(" "),a("li",[a("code",[e._v("storageRoot")]),e._v(" – Sometimes known as a storage hash. A 256-bit hash of the root node of a Merkle Patricia trie that encodes the storage contents of the account (a mapping between 256-bit integer values), encoded into the trie as a mapping from the Keccak 256-bit hash of the 256-bit integer keys to the RLP-encoded 256-bit integer values. This trie encodes the hash of the storage contents of this account, and is empty by default.")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"externally-owned-accounts-and-key-pairs"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#externally-owned-accounts-and-key-pairs"}},[this._v("#")]),this._v(" Externally-owned accounts and key pairs")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"account-creation"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#account-creation"}},[this._v("#")]),this._v(" Account creation")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("code",[this._v("fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("The following example shows how to use a signing tool called Clef to generate a new account. Clef is an account management and signing tool that comes bundled with the ENULS client,  The "),t("code",[this._v("clef newaccount")]),this._v(" command creates a new key pair and saves them in an encrypted keystore.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("> clef newaccount --keystore <path>\n\nPlease enter a password for the new account to be created:\n> <password>\n\n------------\nINFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120\nWARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ENULS/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120\nWARN [10-28|16:19:09.306] Please remember your password!\nGenerated account 0x5e97870f263700f46aa00d967821199b9bc5a120\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("It is possible to derive new public keys from your private key but you cannot derive a private key from public keys. This means it's vital to keep a private key safe and, as the name suggests, "),t("strong",[this._v("PRIVATE")]),this._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"contract-accounts"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#contract-accounts"}},[this._v("#")]),this._v(" Contract accounts")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("code",[this._v("0x06012c8cf97bead5deae237070f9587f8e7a266d")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"validator-keys"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#validator-keys"}},[this._v("#")]),this._v(" Validator keys")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"a-note-on-wallets"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#a-note-on-wallets"}},[this._v("#")]),this._v(" A note on wallets")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"a-visual-demo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#a-visual-demo"}},[this._v("#")]),this._v(" A visual demo")])}],!1,null,null,null);t.default=s.exports}}]);