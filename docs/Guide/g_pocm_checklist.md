# POCM Checklist

The SCO platform allows projects to use smart-contract based POCM (Proof of Credit Mining) to create a SCO (Staked Coin Output) node. NULS holders can stake into the projects' SCO nodes and receive the newly-generated project tokens, instead of their usual NULS staking rewards. The SCO project node continuously earns the NULS staking rewards that would otherwise be rewarded to the NULS stakers, and projects can use the rewards to bootstrap and help fund development. The SCO platform and POCM allow this same functionality to be used with any public chain or assets in any blockchain ecosystem

This is a checklist to insure that all steps are followed.

##### If this is your first time to create an POCM:  NULS strongly recommends creating your POCM for the Test Network first.


## Test environment
POCM is based on smart contracts. Users and POCM Administrator(s) can familiarize themselves with the POCM operational process in the test environment, avoiding misuse and confusion in the mainnet environment.

- POCM test environment：[http://beta.pocm.nuls.io/](http://beta.pocm.nuls.io/)
- Light wallet test environment：[https://beta.wallet.nuls.io](https://beta.wallet.nuls.io)
- Explorer test environment: [http://beta.nulscan.io/](http://beta.nulscan.io/)


## Mainnet environment

- POCM mainnet environment：[http://pocm.nuls.io/](http://pocm.nuls.io/)
- Light wallet mainnet environment：[https://wallet.nuls.io](https://wallet.nuls.io)
- Explorer mainnet environment: [http://nulscan.io/](http://nulscan.io/)

# Step 1 -- Setup

POCM can use an existing node or a new node.  Multiple nodes can be associate with your POCM.

If you are creating a new node and a new pocm, you can create your node and pocm in any order.

For setup: create your POCM account.

Your POCM requires one account. Your POCM will have one POCM contract and one token contract.  Your POCM account will be the creater of both contracts.
Fund your POCM account with at least 100 nuls for the POCM setup.

Before proceeding, it is recommended that you review the [POCM Tutorial](https://docs.nuls.io/Guide/g_pocm.html).

# Step 2 -- Submit Your Project Information

Prior to submitting your project:
- In order to fully utilize the POCM opportunity, NULS recommends that you discuss project details with your NULS partnership coordinator.
- Insure that you fully understand the basic information required,  the token information required, and the token disbursement details.

Please following the directions in this link: [Create and submit your Project](https://docs.nuls.io/Guide/g_pocm.html#submit-basic-information).


After submitting the basic information, the project team must send an email to pen@nuls.io, which contains the following contents:
- project name
- POCM account 

Upon receipt of the email reply, proceed to the next step.

# Step 3 -- Setup contract for issuing NRC-20/NRC-721 Token

Login to the POCM platform by importing your POCM account: select the man icon in the top right, select "User Center", and import your account. The POCM platform is: [test POCM platform](http://beta.pocm.nuls.io/) or the [mainnet POCM platform](http://pocm.nuls.io/).   

Setup your token issuance, make sure the token details, like name, are identical to what you provided in your project.

Please following the directions in this link: [Issuing Token details](https://docs.nuls.io/Guide/g_pocm.html#issued-token).

Congratulations! you have created your token contract.



# Step 4 -- Document your token contract

To get your token contract: 
- Import your POCM account in the [test wallet](https://beta.wallet.nuls.io) or  [mainnet wallet](https://wallet.nuls.io). 
- Select "Contracts".
- Your token contract is identified by the name nrc_20 or nrc_721.
- Record your token contract address.
- You can view more details about your contract by selecting the contract address.

# Step 5 -- Setup your POCM contract

- Go to [test](https://beta.pocm.nuls.io/) or  [mainnet](https://pocm.nuls.io/) POCM platform.
- If you are already logged in, you will see a display of your project and  a form to update.  The form requires your token contract address. If you are not logged in, login using your POCM account.
- Continue at [Issue POCM Contract](https://docs.nuls.io/Guide/g_pocm.html#issue-pocm-contract).

Congradulations! You have created your POCM contract.  Your project will be viewable via "Select Project".

# Step 6 -- Document your POCM contract

To get your pocm contract: 
- Import your POCM account in the [test wallet](https://beta.wallet.nuls.io) or  [mainnet wallet](https://wallet.nuls.io). 
- Select "Contracts"
- You POCM contract is identified by the name that is a concatenation of your token and "pocm".
- Record your pocm contract address
- You can view more details about your contract by selecting the contract address.

# Step 7 -- Transfer YOUR token to your contract

- Follow the directions below.  When you get to the place where you enter a NULS address in the "to" field, the value you enter is your POCM contract address.
- Please following the directions in this link: [Transfer the token to the contract](https://docs.nuls.io/Guide/g_pocm.html#transfer-the-token-to-the-contract).

Congratulations! You have completed your POCM creation. Now, lets see it in action.

# Step 8 -- Stake/Invest in your POCM

A POCM investor will login to the POCM platform, using an account that they will to use to fund their investment and to receive their investment rewards.
Please following the directions in this link:  [Participate POCM](https://docs.nuls.io/Guide/g_pocm.html#participate-pocm).

# Step 9 -- Receive the Rewards of your Investment

Rewards are available for every 5 blocks that are processed. The investor can select to receive the accumulated rewards at any time.
Please following the directions in this link: [Receiving Awards](https://docs.nuls.io/Guide/g_pocm.html#receiving-rewards).

Note: you can receive all types of nrc-20 and nrc-721 plus NULS tokens with the same account address.  You can examine the contents of your rewards account by importing your rewards account into your wallet and selecting assets. You can transfer any of your assets to other NULS accounts.

# Step 9 -- Remove your node from POCM
Please following the directions in this link: [Remove a pocm node](https://docs.nuls.io/Guide/g_pocm.html#remove-a-node).