# Omni X Gasless ONFT standard

Implemented gasless minting with stable token.
On the client side, you need to use gelato sdk to call gasless mint function.

***
Deploy the contract with same address to all chains.
***

# Deploy 

With a valid .env file in place, first deploy your contract.


```
npx hardhat xdeploy
```

# Verify
```
npx hardhat verifyAll --e testnet --addr [deployed_address]
```

