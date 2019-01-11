# Ways of creating random numbers for NULS

> References:
>
> [Solidity Pitfalls: Random Number Generation for Ethereum] 
(https://www.sitepoint.com/solidity-pitfalls-random-number-generation-for-ethereum/)
>
> [Predicting Random Numbers in Ethereum Smart Contracts] 
(https://blog.positive.com/predicting-random-numbers-in-ethereum-smart-contracts-e5358c6b8620)

### 1. ` Linear Congruential Generator (LCG)`: algorithm to generate pseudorandom numbers

The NULS smart contract SDK provides a way to create random numbers. It takes the current block's miner address, contract address, contract invoker address, and current block’s timestamp as random factors, and uses the algorithm `linear congruential generator (LCG)` to generate pseudorandom numbers

Invoking like this:

```java
io.nuls.contract.sdk.Utils.pseudoRandom();
/**
 * add a random factor
 */
io.nuls.contract.sdk.Utils.pseudoRandom(long seed);
```

--

### 2. Using the `BlockHash` of the future block

Taking lottery as an example, it needs to invoke contract transactions twice - close the lottery and pick the winner.

Once the lottery is closed, record the current block height H1 and generate a number N. Pick the winner when the height of the future block reaches `H1+N`。

When picking the winner, add up the recorded block height H1 and block number in interval (0~80] (to be determined) to the block height H2, and take the `BlockHash` of the block H2 as a random seed.

ETH cannot use this way for the following reasons:
![](https://cdn-images-1.medium.com/max/1600/1*eyNTfWTkmM-3YuMca-1H0A.png)

--

### 3. Random seeds limited to participants

In the case of lottery, we need more arbitrary data for picking our winner. When we determine the winner, we can use the addresses of the players that have entered our lottery smart contract as random factors to generate random numbers.

--

### 4. commit-reveal

Also take the lottery as an example.

* The contract sets aside awards for the random number.

* Each user generates own secret random number N.

* Users can hash their N and address to generate the hash value of their secret random numbers: String hash = sha3(N + Msg.sender()).

Note: step 2 and 3 should be performed locally, for instance, the user submits N to the lottery application, which performs the hash operation.

* Users submit their hash to the smart contract.

* Submission is open until the number of blocks reaches a certain value, or until enough participants join.

* Once the submission is closed, it’s time to pick the winner.

* Each user submits their random number N to the smart contract.

* The contract verifies sha3 (N + Msg.sender()) to match the original submission.

* If the user fails to submit a valid N in time, his deposit will be forfeited.

* Perform XOR operation on all-verified N to get random numbers.

* These numbers are used to determine the winners --> (N % numUsers).