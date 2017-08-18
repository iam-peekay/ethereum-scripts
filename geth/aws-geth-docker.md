# Running a node using Geth Docker image

One of the quickest ways to get Ethereum up and running is by using Docker:

```
docker run -it -p 8545:8545 -p 30303:30303 ethereum/client-go --rpc --rpcaddr "0.0.0.0" --rpcapi "web3,eth,net" --txpool.accountslots=256 --txpool.globalslots=20000 --txpool.accountqueue=256 --txpool.globalqueue=20000 --cache 512 
```

Make sure to expose ports `8545` and `30303`. 

If on AWS, make sure the security profile has port `30303` open on both TCP / UDP, and has port `8545` open on TCP. If the node is going to be open to the public, you might want to consider limiting the IPs that can access the api through `rpcaddr`.


___SECURITY WARNINGS___: I purposely did not enable the `personal` module for JSON RPC since we are working with mainnet. You never want to export the `personal` module on mainnet to the public, or else you could get hacked and all your money stolen :( ... As a general safety rule, when working with mainnet, always remember to exclude the `personal` module.
