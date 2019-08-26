# NRC-721非同质资产标准

## 简单摘要

用于不可替代的令牌的标准接口，也称为行为。

## 抽象

以下标准允许在智能合约中实施NFT的标准API。该标准提供了跟踪和传输NFT的基本功能。

我们认为NFT的使用案例由个人拥有和交易，以及托运给第三方经纪人/钱包/拍卖商（“运营商”）。NFT可以代表对数字或实物资产的所有权。我们考虑了各种各样的资产，我们知道你会想到更多：

- 物理财产 - 房屋，独特的艺术品
- 虚拟收藏品 - 小猫，可收集卡片的独特图片
- “负值”资产 - 贷款，负担和其他责任

一般来说，所有房屋都是独特的，没有两只小猫是相同的。NFT是*可区分的*，您必须分别跟踪每个NFT 的所有权。

## 规格

**每个符合NRC-721标准的合同都必须实施NRC721和NRC165接口**（以下“注意事项”）：

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


钱包/经纪/拍卖应用程序必须实现**钱包接口，** 如果它将接受安全转移。

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

对于NRC-721智能合约，**元数据扩展**是可选的（参见下面的“警告”）。这样可以查询您的智能合约的名称以及您的NFT所代表的资产的详细信息。

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

对于NRC-721智能合约，**枚举扩展**是可选的（参见下面的“警告”）。这允许您的合同发布其完整的NFT列表并使其可被发现。

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

## 合理性

此智能合约的许多建议用途依赖于跟踪可区分的资产。现有或计划的NFT的示例是Decentraland中的LAND，CryptoPunks中的同名朋友，以及使用DMarket或EnjinCoin等系统的游戏内物品。未来的用途包括跟踪现实世界的资产，如房地产（如Ubitquity或Propy等公司所设想的那样。在这些情况中，这些项目在分类账中不是“集中在一起”，而是每个资产，这一点至关重要。必须拥有单独和原子跟踪的所有权。无论这些资产的性质如何，如果我们拥有允许跨功能资产管理和销售平台的标准化界面，生态系统将更加强大。


**NFT标识符**

每个NFT都由`BigInteger`NRC-721智能合约中的唯一ID标识。该识别号码在合同期限内不得更改。该对`(Address contractAddress, BigInteger tokenId)`然后将用于在链上特定资产的全局唯一和完全合格的标识符。虽然一些NRC-721智能合约可能会发现从ID 0开始并且每个新NFT只增加一个是方便的，但是呼叫者不应该假设ID号具有任何特定模式，并且必须将ID视为“黑匣子” ”。另请注意，NFT可能无效（被销毁）。请参阅支持的枚举接口的枚举函数。


**转移机制**

NRC-721标准化了安全传递函数`safeTransferFrom`（带有和不带`String`参数的重载方法）和不安全的功能`transferFrom`。转移可以通过以下方式启动：

- NFT的所有者
- NFT当前经批准的地址
- NFT当前所有者的授权操作者

另外，授权操作者可以设置NFT的批准地址。这为钱包，经纪人和拍卖应用程序提供了一套强大的工具，可以快速使用*大量*的NFT。

创建NFT（“铸造”）和销毁NFT（“燃烧”）不包括在规范中。您的合同可以通过其他方式实现。

**NRC-165接口**

我们选择标准接口检测（NRC-165）来公开NRC-721智能合约支持的接口。


**气体和复杂性**（关于枚举扩展）

该规范设想了管理少量和*任意大量* NFT的实现。如果您的应用程序能够增长，那么请避免在代码中使用for / while循环。这些表明您的合同可能无法扩展，燃气成本将随着时间的推移不断增加。

**隐私**

在激励部分中确定的钱包/经纪人/拍卖者非常需要确定所有者拥有哪些NFT。

考虑一个NFT不可枚举的用例可能很有意思，例如财产所有权的私人注册表或部分私有注册表。但是，无法获得隐私，因为攻击者可以为所有可能的`tokenId`简单地调用`ownerOf`。

**元数据选择**（元数据扩展）

我们在元数据扩展中需要`name`和`symbol`功能。
我们提醒实现作者，空字符串是一个有效的响应`name`，`symbol`，如果你抗议使用这种机制。我们也提醒大家，任何智能合同可以使用相同的名称和符号作为*你的*合同。客户如何确定哪些NRC-721智能合约是众所周知的（规范的）超出了本标准的范围。

提供了一种将NFT与URI相关联的机制。我们希望许多实现将利用此功能为每个NFT提供元数据，URI可能是可变的（即它会不时变化）。我们考虑了代表房屋所有权的NFT，在这种情况下，关于房屋的元数据（图像，居住者等）可以自然地改变。

元数据作为字符串值返回。

*考虑的替代方案：将每个资产的所有元数据放在区块链上（太贵），使用URL模板查询元数据部分*


## NFT实现

1. 最基本实现 https://github.com/MIMIEYES/NULS-NRC721-baselib
2. NRC721Metadata基本功能实现 https://github.com/MIMIEYES/NRC721Metadata
3. NRC721Enumerable基本功能实现 https://github.com/MIMIEYES/NRC721Enumerable
4. NRC721Full基本功能实现 https://github.com/MIMIEYES/NRC721Full
5. NRC721Receiver基本功能实现 https://github.com/MIMIEYES/NRC721Receiver