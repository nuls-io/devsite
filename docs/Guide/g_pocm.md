# POCM Tutorial

The SCO platform allows projects to use smart-contract based POCM (Proof of Credit Mining) to create a SCO (Staked Coin Output) node. NULS holders can stake into the projects' SCO nodes and receive the newly-generated project tokens, instead of their usual NULS staking rewards. The SCO project node continuously earns the NULS staking rewards that would otherwise be rewarded to the NULS stakers, and projects can use the rewards to bootstrap and help fund development. The SCO platform and POCM allow this same functionality to be used with any public chain or assets in any blockchain ecosystem

## NULS holders

You can stake your NULS to the project you like, and then you can get Token from the project, and the NULS used for staking will not be lost. The steps of NULS holder participation on the POCM platform are as follows:

### Participate POCM

On the pocm platform, click the [Select Item] menu, enter the page and select the approved item, click to enter the item details page.

![image-20190917134751446](./g_pocm/user1.png)

On the project details page, enter the number of NULS you want to stake (the amount of staking cannot be lower than the minimum value set by the project team, the value can be viewed in the project details), click [Participate POCM]

![image-20190917135217330](./g_pocm/user2.png)

### Receiving rewards

The contract will be awarded once every 5 blocks.After the reward is issued, the user needs to click the [Receive reward] on the right side of the [User Center] page. After the successful receiving, the contract will transfer the rewards to the participating address in real time. After the lockout time is over, the Token can be used (the specific unlock time can be viewed in Project details)

> Receiving a reward is an operation that calls a contract, so you need to consume a small amount of NULS

![image-20190917143321848](./g_pocm/user3.png)

### Add rewards

The user can continue to participate in the pocm of a certain item in the project details, or add it via the [ Add ] button on the right side of the participating item list on the [User Center] page.

## Project team

You can use POCM (SCO distribution platform) to attract NULS community members as the first group of supporters, continue to obtain NULS consensus reward as the project development fund, and get full empowerment of NULS community and ecology.The steps to participate are as follows:

### Submit basic information

Click the [Select Item] menu on the pocm platform, enter the page, click the [Issue Project] button and fill in the basic information and submit

![image-20190917111842631](./g_pocm/project1.png)

### Issued Token

Click the [Issue Token] menu on the POCM platform, enter the page, fill in the form with the token information to issue your own nrc-20 Token (please note the exact name and symbol of the token are consistent with the basic information)

![image-20190917112104017](./g_pocm/project2.png)

### Issue pocm contract

After the basic information is approved, the project team needs to provide an account address (please keep the address private key) to the platform, the account address will be authorized, then import the account into the POCM platform, and then go to the [User Center] page to issue POCM contract

![image-20190917112918386](./g_pocm/project3.png)

Fill the form and publish the contract according to the project team's own POCM distribution rules

![image-20190917114302953](./g_pocm/project4.png)

### Transfer the token to the contract

 Import the address holding the token into the wallet, go to the [ Contract ] page, find the token and click [ call ]

![image-20190917114719872](./g_pocm/project5.png)

Go to the calling page and select the `transfer` method of the token contract.

![image-20190917114912986](./g_pocm/project6.png)

Fill in the POCM contract address that has been successfully issued, and then fill in the number of Tokens transferred (because of the calculation unit, you need to add 8 zero after the actual number  and finally click [ call ]

![image-20190917115135644](./g_pocm/project7.png)

At this point, the user can already see the project information on the pocm platform and stake NULS for new tokens

### Add node

On the pocm platform, click [User Center], enter the page and click [Add Node] to enter the id of the node.

![image-20190917120103974](./g_pocm/project8.png)

After the node is successfully added, the POCM contract will stake NULS to the added nodes.
