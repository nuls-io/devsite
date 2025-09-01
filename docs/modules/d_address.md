
# NULS Protocol Address
## ECKey
The first step in creating a NULS address is to obtain a public-private key pair based on the elliptic curve algorithm. The elliptic curve parameters of NULS are the same as bitcoin, using secp256k1.
```
Secp256k1 is based on the elliptic curve on the Fp finite field. Due to the special construction of its special structure, its optimized implementation can be 30% higher than other curves. It has the following two advantages:
1) Occupy a small amount of bandwidth and storage resources, the length of the key is very short.
2) Let all users use the same operation to complete the domain operation.
                                        -- Quoted from the network
```
## address format
The address format of NULS is as follows:
```
Address = prefix + Base58Encode(chainId+addressType+pkh+xor)
```
### prefix
The prefix exists to facilitate identification and to distinguish the addresses of different chains. Currently NULS provides two kinds of prefix determination solutions:
1. Default setting: NULS retains 1 as the primary network chainId, and also defaults all addresses with chainId 1 to start with NULS. Reserved 2 is the chainId of the core test network. By default, all addresses with a chainId of 2 start with tNULS.
2. Set the prefix by registering the cross-chain: When registering the cross-chain, you need to fill in the prefix of the chain. The system maintains the correspondence table between the chainId and the prefix, and generates the corresponding address according to the corresponding table. At present, the Samos project has communicated to confirm the use of chainId=3, prefixed with SMOS address format.
3. Automatic calculation: The address of other chainId, NULS provides a unified algorithm to calculate the prefix, the specific calculation code is as follows:
```
/ / Convert the chainId to a byte array, use the base58 algorithm to calculate the byte array, all converted to uppercase letters after calculation
String prefix = Base58.encode(SerializeUtils.int16ToBytes(chainId)).toUpperCase();
```
Between the prefix and the real address, separated by a lowercase letter, it is convenient to extract the chainId and verify the address type and correctness from the address.
The lowercase letters are selected by providing an array, the lowercase letters are filled in the order in which the alphabet is installed, and the separated letters are selected according to the length of the prefix.
```
// The prefix length is a few letters, and the first few elements are selected as the separated letters.
/ / If the prefix length is 2, then separated by b, the length is 3 separated by c, the length is 4 separated by d, ...
String[] LENGTHPREFIX = new String[]{"", "a", "b", "c", "d", "e"};
```
### chain id
The goal of NULS is to establish a multi-chain parallel, value-interoperable blockchain ecosystem. At the beginning of the design, a unique ID, 2 bytes, is defined for each chain, ranging from 1 to 65535. The ChainId is the address. Very important data is the basis for cross-chain operations.
### account type
NULS supports setting different account types in a network, such as common addresses, contract addresses, multi-sign addresses, etc. Developers can design according to their needs.
The account type is 1 byte, and the value range is 1~128.
### Public Key Summary PKH
The relationship between the ECKey and the address is reflected in this part. The NULS method uses the Sha-256 to calculate the public key first, and the result is calculated by RIPEMD160 to obtain a result of 20 bytes, which is PKH.
### Check Digit
NULS adds a one-byte check digit when generating an address in string format, which is obtained by XORing the first 23 bytes (chainId+type+pkh).
The check digit does not participate in serialization.
### Generate Address
* Serialized address
```
Address = chainId(2) + type(1) + PKH(20)
```
* Fixed prefix string address
```
addressString = prefix + separator + Base58Encode(address+xor)
```
* Automatic prefix string address
```
addressString = Base58Encode(chainId) + separator + Base58Encode(address+xor)
```
## Non-nuls system address format
NULS is a network that supports access to all blockchains. For a completely different address format from NULS, NULS has designed an address translation protocol, as follows:

```
Address = Base58Encode (chainId + original address length + original address + xor)
```
For example: Bitcoin address, the two-byte chainId is appended before the address, followed by the original address of the bitcoin. The address resolution mode is determined according to the chain configuration, ensuring that any address can obtain the mapped address in NULS.