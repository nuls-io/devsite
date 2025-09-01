# NULS Multi-Sign DApp Guide

## What is Multi-Sign?

Multi-Signature, also known as Multi-Sign, is a digital signature that allows multiple users to sign a single transaction. In simpler terms, it refers to an account owned, managed, and signed by more than one party.

In traditional cases, a single private key manages a single account, denoted as 1/1. Multi-Sign is different; it's represented as m/n, where "n" is the number of authorized private keys to sign for the account, and transactions are only effective when the number of signatures reaches "m". Here, "m" must be less than or equal to "n".

## How is Multi-Sign Applied?

Multi-Signature finds application in various areas of account authority management. Examples include:

- **Assets Management:** Multi-Sign greatly enhances security by allowing multiple individuals to manage a single account using different private keys, reducing the risk of asset attacks.

- **Account Recovery:** By managing an account with Multi-Signatures, even if one signatory loses their private key, the others can still access the account protected by multi-sig.

- **Department Authorization:** Certain matters require approval and signatures from multiple departments before taking effect, providing transparency and traceability to all parties.

## Supported Assets

Our multi-sig is available as a DApp, compatible with the NULS and NerveNetwork blockchains. The DApp can manage assets on NULS and Nerve mainnets, as well as assets bridged from Ethereum, Polygon, Arbitrum, BSC, Heco, OEC, Cronos, and other blockchains to NULS through NerveBridge (currently excluding NRC20 assets).

## Quick Starter on Multi-Sign DApp

### Connect Wallet

To access [ Multi-Sign DApp](https://sign.nuls.io), connect your wallet through Nabox or Metamask. Click to [Download Nabox Wallet](https://nabox.io/)

![Image](./g_multi/m1.png)

After connecting the wallet successfully, click **Generate multi-chain address** to sign up. This will automatically generate a NULS address and a Nerve address, leading you to the operation UI. The multi-sig DApp includes the following functions:

- Create Multi-Sign account address
- Create Multi-Sign transactions
- Signing

### Create Multi-Sign Account Address

A multi-sig account address is required before using the multi-sig DApp.

- Input public keys in the first box, separating them with dots. The system will automatically identify each public key.
- Input private keys one by one and click “+” to add more.

After submitting public keys, select the minimum number of signatures required. This sets the minimal number of accounts needed to confirm a Multi-Sign transaction. For example, if a Multi-Sign account is managed by 3 people, the minimum signatures number is 2, meaning confirmations from 2 people are required to enable a transaction. Otherwise, the transaction would fail.

![Image](./g_multi/m2.png)

After submitting information, click **Generate address** to create a Multi-Sign account address.

![Image](./g_multi/m3.png)

### Create Multi-Sign Transactions

To create a Multi-Sign transaction, users need to select a Multi-Sign address to initiate the transaction.

![Image](./g_multi/m4.png)

Select the assets you want to transfer, specify the amount, and enter the receiving address. Then, create the transaction.

![Image](./g_multi/m5.png)

After creating the transaction, a Multi-Sign HEX will be generated. Copy the HEX and send it to other signers for confirmation.

![Image](./g_multi/m6.png)

### Signatures

The user will sign the received Multi-Signature transaction HEX, acting as one of the signers. Paste the received HEX into the input box, and the tool will automatically parse the data of the Multi-Signature transaction.

Note: After the first signer completes the signature, a new HEX will be generated. The second signer will copy the new HEX, and so on.

![Image](./g_multi/m7.png)

After parsing the transaction, check the status based on the information of "signed quantity" and "signatures still required."

![Image](./g_multi/m8.png)

If the current signer is the last authorized to sign the transaction, and after all signatures are completed, the transaction will be broadcasted on the blockchain and confirmed in a few minutes.

![Image](./g_multi/m9.png)
