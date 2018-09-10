
# User Document of Wallet Smart Contract

## Deploy contract

1 Start wallet, click [contract] and then click [deploy contract] tab page

![deploy](./smartContractImages/deploy1.jpg)

2 Insert Hex code of contract in textbox

3 Insert contract construction function parameter, and note the required item and value type. If not, it will fail the table verification.

![deploy](./smartContractImages/deploy2.jpg)

4 Click [advanced option] to alter default value of GasLimit and GasPrice. Other additional information can be inserted too. Such filed must be required. (Optional step)

![deploy](./smartContractImages/deploy3.jpg)

5 After filling out, click [test contract]. Wallet will conduct a trial deployment for this contract to verify contract legality.

![deploy](./smartContractImages/deploy4.jpg)

6 After passing this test, click [deploy contract]. In case of password, insert password, and then click [confirm]. If no password, click [confirm]. Then, the system will go to [my contracts] page on which the confirmation progress of deployed contract can be reviewed.


Review the confirmation progress of deployed contract.

![deploy](./smartContractImages/deploy6.jpg)

7 After confirmation completion

- Click [to call] on the right of table to go to [call contract] page

- Click contract address to access to contract overview page


## Review contract

1 Start wallet, click [contract] and click [review contract] tab page

![access](./smartContractImages/access1.jpg)

2 Insert legal contract address in box, and click [access], showing a panel below it

- Click [pull-down list] in the panel to select the contract method to call
- Click star mark beside the contract address to collect this contract to the list of my contracts

![access](./smartContractImages/access2.jpg)

3 Have two cases after selecting a method

- If read-only method, click [call], get the deployment results after network requests met

	![access](./smartContractImages/access3.jpg)

- If readable method (to be linked), click advanced option to alter default value of GasLimit and GasPrice. After clicking [call], generate a transaction, which will consume nuls. Therefore, in case of account password, insert your password. After transaction confirmation, feedback the results.

	Transaction on calling contract under confirmation

	![access](./smartContractImages/access4.jpg)

	Transaction on calling contract confirmed

	![access](./smartContractImages/access5.jpg)

4 If calling linking method, click TxID in panel, to review the details of this transaction to call contract

![access](./smartContractImages/access6.jpg)

Details of this transaction to call contract

![access](./smartContractImages/access7.jpg)

## My contracts

1 List of my contracts displays the created and collected contracts

![access](./smartContractImages/myContract1.jpg)

- Click contract address to access to contract overview page

	![access](./smartContractImages/myContract2.jpg)	

- Click [to call] to access to the [call contract] page

	![access](./smartContractImages/myContract3.jpg)

- Click [cancel collection] to remove this contract from the list of [my contracts]

3 [Transaction records] display the transactions in this contract. Click TxID to review the details about this transaction.

![access](./smartContractImages/myContract4.jpg)

4 [Contract details] display all methods of this contract, corresponding parameters and returned value type.

![access](./smartContractImages/myContract5.jpg)

5 If the contract is created by current account, click [delete] on the top right of contract overview to delete this contract. After that, contract details are also available, but the method of contract cannot be called.

![access](./smartContractImages/myContract6.jpg)

## Account multiple assets

After releasing Token via smart contract or transferring in different kinds of Token from other accounts, the account have multiple assets.

1 Access to wallet, to review all kinds of assets under this account address.

![access](./smartContractImages/assets1.jpg)

2 Click [transfer] to access to transfer interface of this kind of asset, insert payee address and transfer amount, to finish transfer of such asset.

![access](./smartContractImages/assets2.jpg)

3 Click [transaction records] to access to transaction records page of this kind of asset

![access](./smartContractImages/assets3.jpg)

4 Click [pull-down list] on [transaction records] page to switch among transaction records of different kinds of assets.

![access](./smartContractImages/assets4.jpg)

5 Click TxID to review the details of this transaction.

