# POCM Operation Guide

The SCO platform facilitates the use of smart-contract-based POCM (Proof of Credit Mining) to establish a SCO (Staked Coin Output) node. NULS holders can stake in the projects' SCO nodes and receive the newly-generated project tokens, foregoing their usual NULS staking rewards. The SCO project node continuously earns the NULS staking rewards that would typically go to NULS stakers, allowing projects to bootstrap and fund development. The SCO platform and POCM extend this functionality to any public chain or assets in any blockchain ecosystem.

## Test Environment
POCM is a decentralized product based on smart contracts. Users, especially project issuers, should familiarize themselves with the operational process in the test environment to avoid misuse and potential asset losses.

- POCM Test Environment: [http://beta.pocm.nuls.io/](http://beta.pocm.nuls.io/)
- Explorer Test Environment: [http://beta.nulscan.io/](http://beta.nulscan.io/)

## NULS Holders

NULS holders can stake their NULS in the projects they support and receive project tokens. The staked NULS remains safe, and the participation steps are as follows:

### Participate POCM

1. Visit the [POCM Platform](https://pocm.nuls.io/) and click the **Select Item** menu.
2. Enter the page, select the approved item, and click to view item details.

![image-20190917134751446](./g_pocm/user1.png)

3. On the project details page, enter the staking amount (must meet the project's minimum requirement) and click **Participate POCM**.

![image-20190917135217330](./g_pocm/user2.png)

### Receive Rewards

1. Rewards are issued every 5 blocks.
2. Click **Receive Reward** on the right side of the **User Center** page.
3. After successful receipt, the contract transfers rewards to the participating address in real-time.
4. Tokens become usable after the lockout time (viewable in project details).

![image-20190917143321848](./g_pocm/user3.png)

### Add Stake

Users can continue participating in the POCM of a specific item or add Stake via the **Add** button on the **User Center** page.

## Project Team

Project teams can use POCM to attract NULS community members as initial supporters. The process involves obtaining NULS consensus rewards as the project development fund. The steps are outlined below:

### Submit Basic Information

1. Click the **Select Project** menu on the POCM platform.
2. Enter the page, click **Issue Project**, and submit basic information.

![image-20190917111842631](./g_pocm/project1.png)

### Issue Token

1. Click the **Issue Token** menu on the POCM platform.
2. Fill in the NRC-20 token information.
3. Ensure token details match the submitted basic information.

![image-20190917112104017](./g_pocm/project2.png)

### Issue POCM Contract

1. After submitting basic information, send an email to support@nuls.io with project details and a provided account address for subsequent POCM contract releases.
2. Once approved, import the POCM account to the POCM platform and issue POCM contracts in the **User Center**.

![image-20190917112918386](./g_pocm/project3.png)

3. Fill the form and publish the contract following the project team's POCM distribution rules.

![image-20190917114302953](./g_pocm/project4.png)

### Transfer Token to the Contract

1. Import the token-holding address into the [ Light Wallet](https://github.com/nuls-io/nuls-v2/releases).
2. Go to the **Contract** page, find the token, and click **Call**.

![image-20190917114719872](./g_pocm/project5.png)

3. Select the `transfer` method of the token contract.

![image-20190917114912986](./g_pocm/project6.png)

4. Fill in the POCM contract address, the number of tokens (considering decimals), and click **Call**.

![image-20190917115135644](./g_pocm/project7.png)

5. Stake NULS for new tokens on the POCM platform.

### Add Node

On the POCM platform, click **User Center**, enter the page, and click **Add Node** to input the node's ID.

![image-20190917120103974](./g_pocm/project8.png)

After adding the node, the POCM contract will sequentially stake user-delegated NULS to the added nodes.

### Remove a Node

To delete an added node, enter the [Contract] page, find the POCM contract, click **Call**, select the `removeAgent` method, enter the node's hash value, and click **Call**.

## Consensus Node

As a consensus node on the NULS network, collaboration with project teams involves adding the node as the running node on the POCM platform. This enables users to delegate NULS to the project contract, automatically staking to the node and obtaining rewards.

1. **Receive Tokens Distributed by the Project:**
   - Import the create address of the node on the POCM platform.
   - Enter [User Center], click **Receive Rewards** on the right side of the list.
   - Tokens are visible on the wallet asset page.
