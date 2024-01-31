# POCM Checklist

The SCO platform enables projects to utilize smart-contract-based POCM (Proof of Credit Mining) for creating a SCO (Staked Coin Output) node. NULS holders can stake into the projects' SCO nodes and receive the newly-generated project tokens instead of their usual NULS staking rewards. The SCO project node continuously earns NULS staking rewards, which would otherwise go to NULS stakers, and projects can leverage these rewards for bootstrapping and funding development. The SCO platform and POCM offer this functionality across any public chain or assets in any blockchain ecosystem.

This checklist ensures all necessary steps are followed.

##### If this is your first time creating a POCM: NULS strongly recommends creating your POCM on the Test Network first.

## Test Environment
POCM is based on smart contracts. Users and POCM Administrators can familiarize themselves with the POCM operational process in the test environment to avoid misuse and confusion in the mainnet environment.

- POCM test environment: [http://beta.pocm.nuls.io/](http://beta.pocm.nuls.io/)
- Explorer test environment: [http://beta.nulscan.io/](http://beta.nulscan.io/)

## Mainnet Environment
- POCM mainnet environment: [http://pocm.nuls.io/](http://pocm.nuls.io/)
- Explorer mainnet environment: [http://nulscan.io/](http://nulscan.io/)

# Step 1 -- Setup

POCM can use an existing node or a new node. Multiple nodes can be associated with your POCM.

If you are creating a new node and a new POCM, you can create your node and POCM in any order.

For setup: create your POCM account.

Your POCM requires one account. Your POCM will have one POCM contract and one token contract. Your POCM account will be the creator of both contracts. Fund your POCM account with at least 100 NULS for the POCM setup.

Before proceeding, it is recommended that you review the [POCM Tutorial](https://docs.nuls.io/Guide/g_pocm.html).

# Step 2 -- Submit Your Project Information

Prior to submitting your project:
- In order to fully utilize the POCM opportunity, NULS recommends discussing project details with your NULS partnership coordinator.
- Ensure that you fully understand the basic information required, the token information required, and the token disbursement details.

Please follow the directions in this link: [Create and submit your Project](https://docs.nuls.io/Guide/g_pocm.html#submit-basic-information).

After submitting the basic information, the project team must send an email to pen@nuls.io, which contains the following contents:
- Project Name
- POCM Account

Upon receipt of the email reply, proceed to the next step.

# Step 3 -- Setup Contract for Issuing NRC20/NRC721 Token

Login to the POCM platform by importing your POCM account: select the man icon in the top right, select "User Center," and import your account. The POCM platform is: [test POCM platform](http://beta.pocm.nuls.io/) or the [mainnet POCM platform](http://pocm.nuls.io/).

Set up your token issuance, ensuring the token details, like name, are identical to what you provided in your project.

Please follow the directions in this link: [Issuing Token Details](https://docs.nuls.io/Guide/g_pocm.html#issued-token).

Congratulations! You have created your token contract.

# Step 4 -- Document Your Token Contract

To get your token contract:
- Import your POCM account into the [Light Wallet](https://github.com/nuls-io/nuls-v2/releases).
- Select "Contracts."
- Your token contract is identified by the name nrc20 or nrc721.
- Record your token contract address.
- You can view more details about your contract by selecting the contract address.

# Step 5 -- Setup Your POCM Contract

- Go to [test](https://beta.pocm.nuls.io/) or [mainnet](https://pocm.nuls.io/) POCM platform.
- If you are already logged in, you will see a display of your project and a form to update. The form requires your token contract address. If you are not logged in, log in using your POCM account.
- Continue at [Issue POCM Contract](https://docs.nuls.io/Guide/g_pocm.html#issue-pocm-contract).

Congratulations! You have created your POCM contract. Your project will be viewable via "Select Project."

# Step 6 -- Document Your POCM Contract

To get your POCM contract:
- Import your POCM account into the [Light Wallet](https://github.com/nuls-io/nuls-v2/releases).
- Select "Contracts."
- Your POCM contract is identified by the name that is a concatenation of your token and "POCM".
- Record your POCM contract address.
- You can view more details about your contract by selecting the contract address.

# Step 7 -- Transfer Token to POCM Contract

- Follow the directions below. When you get to the place where you enter an NULS address in the "to" field, the value you enter is your POCM contract address.
- Please follow the directions in this link: [Transfer the Token to the Contract](https://docs.nuls.io/Guide/g_pocm.html#transfer-the-token-to-the-contract).

Congratulations! You have completed your POCM creation. Now, let's see it in action.

# Step 8 -- Stake on Your POCM

A POCM investor will log in to the POCM platform, using an account that they will use to fund their investment and to receive their investment rewards. Please follow the directions in this link: [Participate POCM](https://docs.nuls.io/Guide/g_pocm.html#participate-pocm).

# Step 9 -- Receive the Rewards

Rewards are available for every 5 blocks that are processed. The investor can select to receive the accumulated rewards at any time. Please follow the directions in this link: [Receiving Awards](https://docs.nuls.io/Guide/g_pocm.html#receiving-rewards).

Note: You can receive all types of NRC-20 and NRC-721 plus NULS tokens with the same account address. You can examine the contents of your rewards account by importing your rewards account into your wallet and selecting assets. You can transfer any of your assets to other NULS accounts.

# Step 9 -- Remove Your Node from POCM
Please follow the directions in this link: [Remove a POCM Node](https://docs.nuls.io/Guide/g_pocm.html#remove-a-node).
