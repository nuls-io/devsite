# 以Maven项目打包合约代码

## 1. 新建Maven工程

- ![graph](https://github.com/MIMIEYES/readmd/blob/master/package/1.png?raw=true)
- ![graph](https://github.com/MIMIEYES/readmd/blob/master/package/1.1.png?raw=true)
- ![graph](https://github.com/MIMIEYES/readmd/blob/master/package/2.png?raw=true)
- ![graph](https://github.com/MIMIEYES/readmd/blob/master/package/3.png?raw=true)

## 2. pom.xml文件中加入SDK依赖

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>io.nuls.contract</groupId>
    <artifactId>token</artifactId>
    <version>1.0-SNAPSHOT</version>

    <dependencies>
        <!-- NULS1.0使用1.2.0版本，NULS2.0使用2.0-beta1版本 -->
        <dependency>
            <groupId>io.nuls.sdk</groupId>
            <artifactId>sdk-contract-vm</artifactId>
            <version>2.0-beta1</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.7.0</version>
                <configuration>
                    <source>1.6</source>
                    <target>1.6</target>
                    <encoding>UTF-8</encoding>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

## 3. 编写代码(略，可跳过，以下是示例代码NRC20合约代码)

![graph](https://github.com/MIMIEYES/readmd/blob/master/package/4.png?raw=true)

package目录为io.nuls.contract.token，编写两个java文件，`io.nuls.contract.token.SimpleToken`和`io.nuls.contract.token.Token`

```java
package io.nuls.contract.token;

import io.nuls.contract.sdk.Address;
import io.nuls.contract.sdk.Contract;
import io.nuls.contract.sdk.Msg;
import io.nuls.contract.sdk.annotation.Required;
import io.nuls.contract.sdk.annotation.View;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

import static io.nuls.contract.sdk.Utils.emit;
import static io.nuls.contract.sdk.Utils.require;

public class SimpleToken implements Contract, Token {

    private final String name;
    private final String symbol;
    private final int decimals;
    private BigInteger totalSupply = BigInteger.ZERO;

    private Map<Address, BigInteger> balances = new HashMap<Address, BigInteger>();
    private Map<Address, Map<Address, BigInteger>> allowed = new HashMap<Address, Map<Address, BigInteger>>();

    @Override
    @View
    public String name() {
        return name;
    }

    @Override
    @View
    public String symbol() {
        return symbol;
    }

    @Override
    @View
    public int decimals() {
        return decimals;
    }

    @Override
    @View
    public BigInteger totalSupply() {
        return totalSupply;
    }

    public SimpleToken(@Required String name, @Required String symbol, @Required BigInteger initialAmount, @Required int decimals) {
        this.name = name;
        this.symbol = symbol;
        this.decimals = decimals;
        totalSupply = initialAmount.multiply(BigInteger.TEN.pow(decimals));;
        balances.put(Msg.sender(), totalSupply);
        emit(new TransferEvent(null, Msg.sender(), totalSupply));
    }

    @Override
    @View
    public BigInteger allowance(@Required Address owner, @Required Address spender) {
        Map<Address, BigInteger> ownerAllowed = allowed.get(owner);
        if (ownerAllowed == null) {
            return BigInteger.ZERO;
        }
        BigInteger value = ownerAllowed.get(spender);
        if (value == null) {
            value = BigInteger.ZERO;
        }
        return value;
    }

    @Override
    public boolean transferFrom(@Required Address from, @Required Address to, @Required BigInteger value) {
        subtractAllowed(from, Msg.sender(), value);
        subtractBalance(from, value);
        addBalance(to, value);
        emit(new TransferEvent(from, to, value));
        return true;
    }

    @Override
    @View
    public BigInteger balanceOf(@Required Address owner) {
        require(owner != null);
        BigInteger balance = balances.get(owner);
        if (balance == null) {
            balance = BigInteger.ZERO;
        }
        return balance;
    }

    @Override
    public boolean transfer(@Required Address to, @Required BigInteger value) {
        subtractBalance(Msg.sender(), value);
        addBalance(to, value);
        emit(new TransferEvent(Msg.sender(), to, value));
        return true;
    }

    @Override
    public boolean approve(@Required Address spender, @Required BigInteger value) {
        setAllowed(Msg.sender(), spender, value);
        emit(new ApprovalEvent(Msg.sender(), spender, value));
        return true;
    }

    public boolean increaseApproval(@Required Address spender, @Required BigInteger addedValue) {
        addAllowed(Msg.sender(), spender, addedValue);
        emit(new ApprovalEvent(Msg.sender(), spender, allowance(Msg.sender(), spender)));
        return true;
    }

    public boolean decreaseApproval(@Required Address spender, @Required BigInteger subtractedValue) {
        check(subtractedValue);
        BigInteger oldValue = allowance(Msg.sender(), spender);
        if (subtractedValue.compareTo(oldValue) > 0) {
            setAllowed(Msg.sender(), spender, BigInteger.ZERO);
        } else {
            subtractAllowed(Msg.sender(), spender, subtractedValue);
        }
        emit(new ApprovalEvent(Msg.sender(), spender, allowance(Msg.sender(), spender)));
        return true;
    }

    private void addAllowed(Address address1, Address address2, BigInteger value) {
        BigInteger allowance = allowance(address1, address2);
        check(allowance);
        check(value);
        setAllowed(address1, address2, allowance.add(value));
    }

    private void subtractAllowed(Address address1, Address address2, BigInteger value) {
        BigInteger allowance = allowance(address1, address2);
        check(allowance, value, "Insufficient approved token");
        setAllowed(address1, address2, allowance.subtract(value));
    }

    private void setAllowed(Address address1, Address address2, BigInteger value) {
        check(value);
        Map<Address, BigInteger> address1Allowed = allowed.get(address1);
        if (address1Allowed == null) {
            address1Allowed = new HashMap<Address, BigInteger>();
            allowed.put(address1, address1Allowed);
        }
        address1Allowed.put(address2, value);
    }

    private void addBalance(Address address, BigInteger value) {
        BigInteger balance = balanceOf(address);
        check(value, "The value must be greater than or equal to 0.");
        check(balance);
        balances.put(address, balance.add(value));
    }

    private void subtractBalance(Address address, BigInteger value) {
        BigInteger balance = balanceOf(address);
        check(balance, value, "Insufficient balance of token.");
        balances.put(address, balance.subtract(value));
    }

    private void check(BigInteger value) {
        require(value != null && value.compareTo(BigInteger.ZERO) >= 0);
    }

    private void check(BigInteger value1, BigInteger value2) {
        check(value1);
        check(value2);
        require(value1.compareTo(value2) >= 0);
    }

    private void check(BigInteger value, String msg) {
        require(value != null && value.compareTo(BigInteger.ZERO) >= 0, msg);
    }

    private void check(BigInteger value1, BigInteger value2, String msg) {
        check(value1);
        check(value2);
        require(value1.compareTo(value2) >= 0, msg);
    }



}

```

---

```java
package io.nuls.contract.token;

import io.nuls.contract.sdk.Address;
import io.nuls.contract.sdk.Event;
import io.nuls.contract.sdk.annotation.Required;
import io.nuls.contract.sdk.annotation.View;

import java.math.BigInteger;

public interface Token {

    @View
    String name();

    @View
    String symbol();

    @View
    int decimals();

    @View
    BigInteger totalSupply();

    @View
    BigInteger balanceOf(@Required Address owner);

    boolean transfer(@Required Address to, @Required BigInteger value);

    boolean transferFrom(@Required Address from, @Required Address to, @Required BigInteger value);

    boolean approve(@Required Address spender, @Required BigInteger value);

    @View
    BigInteger allowance(@Required Address owner, @Required Address spender);

    class TransferEvent implements Event {

        private Address from;

        private Address to;

        private BigInteger value;

        public TransferEvent(Address from, @Required Address to, @Required BigInteger value) {
            this.from = from;
            this.to = to;
            this.value = value;
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

        public BigInteger getValue() {
            return value;
        }

        public void setValue(BigInteger value) {
            this.value = value;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            TransferEvent that = (TransferEvent) o;

            if (from != null ? !from.equals(that.from) : that.from != null) return false;
            if (to != null ? !to.equals(that.to) : that.to != null) return false;
            return value != null ? value.equals(that.value) : that.value == null;
        }

        @Override
        public int hashCode() {
            int result = from != null ? from.hashCode() : 0;
            result = 31 * result + (to != null ? to.hashCode() : 0);
            result = 31 * result + (value != null ? value.hashCode() : 0);
            return result;
        }

        @Override
        public String toString() {
            return "TransferEvent{" +
                    "from=" + from +
                    ", to=" + to +
                    ", value=" + value +
                    '}';
        }

    }

    class ApprovalEvent implements Event {

        private Address owner;

        private Address spender;

        private BigInteger value;

        public ApprovalEvent(@Required Address owner, @Required Address spender, @Required BigInteger value) {
            this.owner = owner;
            this.spender = spender;
            this.value = value;
        }

        public Address getOwner() {
            return owner;
        }

        public void setOwner(Address owner) {
            this.owner = owner;
        }

        public Address getSpender() {
            return spender;
        }

        public void setSpender(Address spender) {
            this.spender = spender;
        }

        public BigInteger getValue() {
            return value;
        }

        public void setValue(BigInteger value) {
            this.value = value;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            ApprovalEvent that = (ApprovalEvent) o;

            if (owner != null ? !owner.equals(that.owner) : that.owner != null) return false;
            if (spender != null ? !spender.equals(that.spender) : that.spender != null) return false;
            return value != null ? value.equals(that.value) : that.value == null;
        }

        @Override
        public int hashCode() {
            int result = owner != null ? owner.hashCode() : 0;
            result = 31 * result + (spender != null ? spender.hashCode() : 0);
            result = 31 * result + (value != null ? value.hashCode() : 0);
            return result;
        }

        @Override
        public String toString() {
            return "ApprovalEvent{" +
                    "owner=" + owner +
                    ", spender=" + spender +
                    ", value=" + value +
                    '}';
        }

    }

}

```

## 4. 打包智能合约代码

	mvn clean -DskipTests=true package
	
## 5. jar包输出在项目路径下

	$PROJECT_DIR$/target/token-1.0-SNAPSHOT.jar
	
![graph](https://github.com/MIMIEYES/readmd/blob/master/package/4.png?raw=true)


## 6. 把jar包转换成字节HEX码

```java

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.io.IOUtils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class ContractCodeHexString {
    public static void main(String[] args) throws IOException {
        // 把jar包转成流(把jar包文件放到classpath根路径下)
        InputStream in = new FileInputStream(ContractCodeHexString.class.getResource("/token-1.0-SNAPSHOT.jar").getFile());
        // 把流转成字节数组
        byte[] contractCode = IOUtils.toByteArray(in);
        // 把字节数组转成Hex字符串
        System.out.println(Hex.encodeHexString(contractCode));
    }
}

```

> 此示例需要加入两个依赖来转换HEX码，也可以不使用上述示例，依据自身情况，按上述注释完成jar包转换HEX码

```xml

<dependency>
    <groupId>commons-codec</groupId>
    <artifactId>commons-codec</artifactId>
    <version>1.11</version>
</dependency>

<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.6</version>
</dependency>

```