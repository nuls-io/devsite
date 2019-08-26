# NRC-721

## Simple Summary

A standard interface for non-fungible tokens, also known as deeds.

## Abstract

The following standard allows for the implementation of a standard API for NFTs within smart contracts. This standard provides basic functionality to track and transfer NFTs.

We considered use cases of NFTs being owned and transacted by individuals as well as consignment to third party brokers/wallets/auctioneers (“operators”). NFTs can represent ownership over digital or physical assets. We considered a diverse universe of assets, and we know you will dream up many more:

- Physical property — houses, unique artwork
- Virtual collectables — unique pictures of kittens, collectable cards
- “Negative value” assets — loans, burdens and other responsibilities

In general, all houses are distinct and no two kittens are alike. NFTs are distinguishable and you must track the ownership of each one separately.

## Specification

**Every NRC-721 compliant contract must implement the NRC721 and NRC165 interfaces**（(subject to “caveats” below):

```java
package io.nuls.token.interfaces;

import io.nuls.contract.sdk.Address;
import io.nuls.contract.sdk.Event;
import io.nuls.contract.sdk.annotation.View;

import java.math.BigInteger;


public interface INRC721 {
    /**
     * Count all NFTs assigned to an owner
     * @param owner An address for whom to query the balance
     * @return The number of NFTs owned by `owner`, possibly zero
     */
    @View
    int balanceOf(Address owner);

    /**
     * Find the owner of an NFT
     * @param tokenId The identifier for an NFT
     * @return The address of the owner of the NFT
     */
    @View
    Address ownerOf(BigInteger tokenId);

    /**
     * Transfers the ownership of an NFT from one address to another address.
     * When transfer is complete, this function checks if `to` is a smart contract.
     * If so, it calls `onNRC721Received` on `to` and throws if the return value is `false`.
     * @throws revert unless `Msg.sender()` is the current owner, an authorized
     *          operator, or the approved address for this NFT.
     * @throws revert if `from` is not the current owner.
     * @throws revert if `tokenId` is not a valid NFT.
     * @param from The current owner of the NFT
     * @param to The new owner
     * @param tokenId The NFT to transfer
     * @param data Additional data with no specified format, sent in call to `to`
     */
    void safeTransferFrom(Address from, Address to, BigInteger tokenId, String data);

    /**
     * Transfers the ownership of an NFT from one address to another address.
     * This works identically to the other function with an extra data parameter,
     *  except this function just sets data to "".
     * @param from The current owner of the NFT
     * @param to The new owner
     * @param tokenId The NFT to transfer
     */
    void safeTransferFrom(Address from, Address to, BigInteger tokenId);

    /**
     * Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
     *  TO CONFIRM THAT `to` IS CAPABLE OF RECEIVING NFTS OR ELSE
     *  THEY MAY BE PERMANENTLY LOST
     * @throws Revert unless `Msg.sender()` is the current owner, an authorized
     *  operator, or the approved address for this NFT.
     * @throws Revert if `from` is not the current owner.
     * @throws Revert if `tokenId` is not a valid NFT.
     * @param from The current owner of the NFT
     * @param to The new owner
     * @param tokenId The NFT to transfer
     */
    void transferFrom(Address from, Address to, BigInteger tokenId);

    /**
     * Change or reaffirm the approved address for an NFT
     * @throws revert unless `Msg.sender()` is the current NFT owner, or an authorized
     *  operator of the current owner.
     * @param approved The new approved NFT controller
     * @param tokenId The NFT to approve
     */
    void approve(Address to, BigInteger tokenId);

    /**
     * Enable or disable approval for a third party ("operator") to manage
     *  all of `Msg.sender()`'s assets.
     * Emits the ApprovalForAll event. The contract MUST allow multiple operators per owner.
     * @param operator Address to add to the set of authorized operators
     * @param approved True if the operator is approved, false to revoke approval
     */
    void setApprovalForAll(Address operator, boolean approved);

    /**
     * Get the approved address for a single NFT.
     * @throws revert if there is none or if `tokenId` is not a valid NFT.
     * @param tokenId The NFT to find the approved address for
     * @return The approved address for this NFT.
     */
    @View
    Address getApproved(BigInteger tokenId);

    /**
     * Query if an address is an authorized operator for another address
     * @param owner The address that owns the NFTs
     * @param operator The address that acts on behalf of the owner
     * @return True if `operator` is an approved operator for `owner`, false otherwise
     */
    @View
    boolean isApprovedForAll(Address owner, Address operator);

    /**
     * This emits when ownership of any NFT changes by any mechanism.
     *  This event emits when NFTs are created (`from` is NULL) and destroyed.
     *  At the time of any transfer, the approved address for that NFT (if any) is reset to none.
     *  <p>Exception: during contract creation, any number of NFTs may be created and assigned without emitting Transfer.</p>
     */
    class Transfer implements Event {
        private Address from;
        private Address to;
        private BigInteger tokenId;

        public Transfer(Address from, Address to, BigInteger tokenId) {
            this.from = from;
            this.to = to;
            this.tokenId = tokenId;
        }

        public Address getFrom() {
            return from;
        }

        public void setFrom(Address from) {
            this.from = from;
        }

        public Address getTo() {
            return to;
        }

        public void setTo(Address to) {
            this.to = to;
        }

        public BigInteger getTokenId() {
            return tokenId;
        }

        public void setTokenId(BigInteger tokenId) {
            this.tokenId = tokenId;
        }
    }

    /**
     * This emits when the approved address for an NFT is changed or reaffirmed.
     *  When a Transfer event emits, this also indicates that the approved address for that NFT (if any) is reset to none.
     */
    class Approval implements Event {
        private Address owner;
        private Address approved;
        private BigInteger tokenId;

        public Approval(Address owner, Address approved, BigInteger tokenId) {
            this.owner = owner;
            this.approved = approved;
            this.tokenId = tokenId;
        }

        public Address getOwner() {
            return owner;
        }

        public void setOwner(Address owner) {
            this.owner = owner;
        }

        public Address getApproved() {
            return approved;
        }

        public void setApproved(Address approved) {
            this.approved = approved;
        }

        public BigInteger getTokenId() {
            return tokenId;
        }

        public void setTokenId(BigInteger tokenId) {
            this.tokenId = tokenId;
        }
    }

    /**
     * This emits when an operator is enabled or disabled for an owner.
     * The operator can manage all NFTs of the owner.
     */
    class ApprovalForAll implements Event {
        private Address owner;
        private Address operator;
        private Boolean approved;

        public ApprovalForAll(Address owner, Address operator, Boolean approved) {
            this.owner = owner;
            this.operator = operator;
            this.approved = approved;
        }

        public Address getOwner() {
            return owner;
        }

        public void setOwner(Address owner) {
            this.owner = owner;
        }

        public Address getOperator() {
            return operator;
        }

        public void setOperator(Address operator) {
            this.operator = operator;
        }

        public Boolean getApproved() {
            return approved;
        }

        public void setApproved(Boolean approved) {
            this.approved = approved;
        }
    }
}

```
```java
package io.nuls.token.interfaces;


public interface INRC165 {
    /**
     * Query if a contract implements an interface
     * @param interfaceName The interface name, as specified in the implementation class of NRC-165.
     *                      eg. interfaceName: ['INRC165', 'INRC721', 'INRC721Enumerable', 'INRC721Metadata']
     * @return `true` if the contract implements `interfaceName`, `false` otherwise
     */
    @View
    boolean supportsInterface(String interfaceName);
}
```


A wallet/broker/auction application MUST implement the **wallet interface** if it will accept safe transfers.

```java
package io.nuls.token.interfaces;

import io.nuls.contract.sdk.Address;

import java.math.BigInteger;


public interface INRC721TokenReceiver {

    /**
     * Handle the receipt of an NFT.
     * The NRC721 smart contract calls this function on the recipient
     *  after a `transfer`. This function MAY revert and reject the
     *  transfer.
     *  Note: the contract address is always the message sender.
     * @param operator The address which called `safeTransferFrom` function
     * @param from The address which previously owned the token
     * @param tokenId The NFT identifier which is being transferred
     * @param data Additional data with no specified format
     * @return `true` if it accepts NFTs from other contracts, otherwise `false`
     */
    boolean onNRC721Received(Address operator, Address from, BigInteger tokenId, String data);
}
```

The **metadata extension** is OPTIONAL for NRC-721 smart contracts (see “caveats”, below). This allows your smart contract to be interrogated for its name and for details about the assets which your NFTs represent.

```java
package io.nuls.token.interfaces;

import io.nuls.contract.sdk.annotation.View;

import java.math.BigInteger;


public interface INRC721Metadata {
    /**
     * @return A descriptive name for a collection of NFTs in this contract
     */
    @View
    String name() ;

    /**
     * @return An abbreviated name for NFTs in this contract
     */
    @View
    String symbol() ;

    /**
     * @return A distinct Uniform Resource Identifier (URI) for a given asset.
     *         NULL if `tokenId` is not a valid NFT.
     */
    @View
    String tokenURI(BigInteger tokenId) ;
}
```

The **enumeration extension** is OPTIONAL for NRC-721 smart contracts (see “caveats”, below). This allows your contract to publish its full list of NFTs and make them discoverable.

```java
package io.nuls.token.interfaces;

import io.nuls.contract.sdk.Address;
import io.nuls.contract.sdk.annotation.View;

import java.math.BigInteger;


public interface INRC721Enumerable {
    /**
     * Count NFTs tracked by this contract
     * @return A count of valid NFTs tracked by this contract, where each one of
     *         them has an assigned and queryable owner
     */
    @View
    int totalSupply();

    /**
     * Enumerate valid NFTs
     * @param index A counter less than `totalSupply()`
     * @return The token identifier for the `index` NFT,
     *  (sort order not specified), NULL if `index` >= `totalSupply()`.
     */
    @View
    BigInteger tokenByIndex(int index);

    /**
     * Enumerate NFTs assigned to an owner
     * @param owner An address where we are interested in NFTs owned by them
     * @param index A counter less than `balanceOf(_owner)`
     * @return The token identifier for the `index` NFT assigned to `owner`,
     *   (sort order not specified), NULL if `index` >= `balanceOf(owner)` or invalid NFTs.
     */
    @View
    BigInteger tokenOfOwnerByIndex(Address owner, int index);
}
```

## Rationale

There are many proposed uses of Ethereum smart contracts that depend on tracking distinguishable assets. Examples of existing or planned NFTs are LAND in Decentraland, the eponymous punks in CryptoPunks, and in-game items using systems like DMarket or EnjinCoin. Future uses include tracking real-world assets, like real-estate (as envisioned by companies like Ubitquity or Propy. It is critical in each of these cases that these items are not “lumped together” as numbers in a ledger, but instead each asset must have its ownership individually and atomically tracked. Regardless of the nature of these assets, the ecosystem will be stronger if we have a standardized interface that allows for cross-functional asset management and sales platforms.


**NFT Identifiers**
Every NFT is identified by a unique `uint256` ID inside the NRC-721 smart contract. This identifying number SHALL NOT change for the life of the contract. The pair `(contract address, uint256 tokenId)` will then be a globally unique and fully-qualified identifier for a specific asset on an NULS chain. While some NRC-721 smart contracts may find it convenient to start with ID 0 and simply increment by one for each new NFT, callers SHALL NOT assume that ID numbers have any specific pattern to them, and MUST treat the ID as a “black box”. Also note that a NFTs MAY become invalid (be destroyed). Please see the enumerations functions for a supported enumeration interface.


**Transfer Mechanism**
ERC-721 standardizes a safe transfer function `safeTransferFrom` (overloaded with and without a `bytes` parameter) and an unsafe function `transferFrom`. Transfers may be initiated by:

- The owner of an NFT
- The approved address of an NFT
- An authorized operator of the current owner of an NFT
  
Additionally, an authorized operator may set the approved address for an NFT. This provides a powerful set of tools for wallet, broker and auction applications to quickly use a large number of NFTs.

**NRC-165 Interface**

We chose Standard Interface Detection (NRC-165) to expose the interfaces that a NRC-721 smart contract supports.


**Gas and Complexity**（regarding the enumeration extension）

This specification contemplates implementations that manage a few and arbitrarily large numbers of NFTs. If your application is able to grow then avoid using for/while loops in your code (see CryptoKitties bounty issue #4). These indicate your contract may be unable to scale and gas costs will rise over time without bound.

**Privacy**

Wallets/brokers/auctioneers identified in the motivation section have a strong need to identify which NFTs an owner owns.

It may be interesting to consider a use case where NFTs are not enumerable, such as a private registry of property ownership, or a partially-private registry. However, privacy cannot be attained because an attacker can simply (!) call `ownerOf` for every possible `tokenId`.

**Metadata Choices** (metadata extension)

We have required `name` and `symbol` functions in the metadata extension.
We remind implementation authors that the empty string is a valid response to name and symbol if you protest to the usage of this mechanism. We also remind everyone that any smart contract can use the same name and symbol as your contract. How a client may determine which NRC-721 smart contracts are well-known (canonical) is outside the scope of this standard.

A mechanism is provided to associate NFTs with URIs. We expect that many implementations will take advantage of this to provide metadata for each NFT. The image size recommendation is taken from Instagram, they probably know much about image usability. The URI MAY be mutable (i.e. it changes from time to time). We considered an NFT representing ownership of a house, in this case metadata about the house (image, occupants, etc.) can naturally change.


Metadata is returned as a string value. Currently this is only usable as calling from web3, not from other contracts. This is acceptable because we have not considered a use case where an on-blockchain application would query such information.

Alternatives considered: put all metadata for each asset on the blockchain (too expensive), use URL templates to query metadata parts (URL templates do not work with all URL schemes, especially P2P URLs), multiaddr network address (not mature enough)


## NFT implementation

1. Basic Implementaion https://github.com/MIMIEYES/NULS-NRC721-baselib
2. NRC721Metadata function implementation https://github.com/MIMIEYES/NRC721Metadata
3. NRC721Enumerable function implementation  https://github.com/MIMIEYES/NRC721Enumerable
4. NRC721Full function implementation https://github.com/MIMIEYES/NRC721Full
5. NRC721Receiver function implementation https://github.com/MIMIEYES/NRC721Receiver