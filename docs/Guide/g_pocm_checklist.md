# POCM Checklist

The SCO platform allows projects to use smart-contract based POCM (Proof of Credit Mining) to create a SCO (Staked Coin Output) node. NULS holders can stake into the projects' SCO nodes and receive the newly-generated project tokens, instead of their usual NULS staking rewards. The SCO project node continuously earns the NULS staking rewards that would otherwise be rewarded to the NULS stakers, and projects can use the rewards to bootstrap and help fund development. The SCO platform and POCM allow this same functionality to be used with any public chain or assets in any blockchain ecosystem

This is a checklist to insure that all steps are followed.

#####If this is your first time to create an POCM:  NULS strongly recommends creating your POCM for the Test Network first.


## Test environment
POCM is a decentralized product based on smart contracts. Users (especially project issuers) can familiarize it with the operational process in the test environment, avoiding misuse and causing asset losses.

- POCM test environment：[http://beta.pocm.nuls.io/](http://beta.pocm.nuls.io/)
- Light wallet test environment：[https://beta.wallet.nuls.io](https://beta.wallet.nuls.io)
- Explorer test environment:[http://beta.nulscan.io/](http://beta.nulscan.io/)


## Mainnet environment

- POCM mainnet environment：[http://pocm.nuls.io/](http://pocm.nuls.io/)
- Light wallet mainnet environment：[https://wallet.nuls.io](https://wallet.nuls.io)
- Explorer mainnet environment:[http://nulscan.io/](http://nulscan.io/)

# Step 1 -- Setup

POCM can use an existing node or a new node.  Multiple nodes can be associate with your POCM.

If you are creating a new node and a new pocm, you can create your node and pocm in any order.

Your POCM requires one account. Your POCM will have one POCM contract and one token contract.  Your POCM will be the creater of both contracts.
Fund you POCM account with at least 100 nuls for the POCM setup.

Before proceeding, it is recommended that you review the [POCM Tutorial](https://docs.nuls.io/Guide/g_pocm.html).

# Step 2 -- Submit Your Project Information

Prior to submitting your project:
- In order to fully utilize the POCM opportunity, NULS recommends that you discuss with your NULS partnership coordinator.
-Insure that you fully understand the information basic information required,  the token information required, and the token disbursement details.

[Create and submit your Project](https://docs.nuls.io/Guide/g_pocm.html#submit-basic-information).


After submitting the basic information, the project team should send an email to pen@nuls.io, which contains the following contents:
- project name
- provide an account address (please take care of the private key of the address) for subsequent publishing of POCM contracts

Upon confirmation of the reply, proceed to the next step.

# Step 3 -- Setup contract for issuing NRC-20/NRC-721 Token

Login to the POCM platform by importing your POCM account: select the man icon in the top right, select "User Center", and import your account. The POCM platform is: [test POCM platform](http://beta.pocm.nuls.io/) or the [mainnet POCM platform](http://pocm.nuls.io/).   

Setup your token issuance, make sure the Token details, like name, are identical to what you provided in your project.

[Issuing Token details](https://docs.nuls.io/Guide/g_pocm.html#issued-token).

Congradulations! you have created your token contract.



# Step 4 -- Document your Token contract

To get your token contract: 
- import your POCM account in the [test](https://beta.wallet.nuls.io) or  [mainnet](https://wallet.nuls.io) light wallet. 
- Select "Contracts"
- You token contract is identified by the name nrc_20 or nrc_721
- Record your token contract address
- You can view more details about your contract by selecting the contract address.

# Step 5 -- Setup your POCM contract

- Go to  [test](https://beta.pocm.nuls.io/) or  [mainnet](https://pocm.nuls.io/) POCM platform.
- If you are already logged in, you will see a display of your project and  a form to update.  The form requires your Token contract address. If tou are not logged in, login using your POCM account.
- Continue at [Issue POCM Contract](https://docs.nuls.io/Guide/g_pocm.html#issue-pocm-contract).

Congradulations! you have created your POCM contract.  Your project will be viewable via "Select Project".

# Step 6 -- Document your POCM contract

To get your token contract: 
- import your POCM account in the [test](https://beta.wallet.nuls.io) or  [mainnet](https://wallet.nuls.io) light wallet. 
- Select "Contracts"
- You POCM contract is identified by the name that is a concatenation of your token and "pocm".
- Record your pocm contract address
- You can view more details about your contract by selecting the contract address.

# Step 7 -- Transfer YOUR token to your contract

- Follow the directions below.  When you get to the place where you enter a NULS address in the "to" field, the va,ue oyu enter is your POCM contract address.
- Continue at [Transfer the token to the contract](https://docs.nuls.io/Guide/g_pocm.html#transfer-the-token-to-the-contract).

Congradulations! You have completed your POCM creation. 