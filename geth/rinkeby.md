# Setting up Rinkeby testnet

Note: This is the set up for a full node. Alternate options are here: https://www.rinkeby.io/

#### Step 1: Download Geth
Download the latest geth (1.6.1) to your laptop. https://geth.ethereum.org/downloads/

Extract it and copy the geth binary to somewhere in your path.

#### Step 2: Download genesis block
wget https://www.rinkeby.io/rinkeby.json

#### Step 3: Initialize
To run a full node, download rinkeby.json and start Geth with:

```
geth --datadir=$HOME/.rinkeby init rinkeby.json
geth --networkid=4 --datadir=$HOME/.rinkeby --cache=512 --ethstats='yournode:Respect my authoritah!@stats.rinkeby.io' --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303 --rpc --rpcapi="personal,eth,network"
```

___NOTE:___ the credentials `yournode:Respect my authoritah!` are necessary so don't remove

___SECURITY WARNINGS:___ This enables geth's JSON RPC and also loads the `personal` module to allow testing and participating in smart contracts. This is fine since this is on the testnet. However, if you allowed access to `personal` module on a mainnet node with your unlocked wallet exposed to the internet, you could get hacked. As a general safety rule, when working with mainnet, always remember to exclude the `personal` module.

#### Step 4: Create an account
In a separate terminal completely, create an account and save the password somewhere safe.

First, symlink the IPC file so you can geth attach to the existing geth process.

On Linux:

```
mkdir -p ~/.ethereum
ln -s ~/.rinkeby/geth.ipc ~/.ethereum/
```

On Mac:

```
mkdir -p ~/Library/Ethereum
ln -s ~/.rinkeby/geth.ipc ~/Library/Ethereum
```

After that, attach the console

```
geth attach
```

and create an account (substituting a real password, obviously).

```
Welcome to the Geth JavaScript console!

instance: Geth/v1.6.1-stable-021c3c28/darwin-amd64/go1.8.1
 modules: admin:1.0 clique:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

> eth.accounts
[]
> personal.newAccount("helloWorldNotARealPassword")
"0x8e9aebc1cd7f76ebc092787c1d7075e2ad03c107"
> eth.coinbase
"0x8e9aebc1cd7f76ebc092787c1d7075e2ad03c107"
> eth.getBalance(eth.coinbase)
0
```

You'll see a different address than 0xb2e9fe08ca9a0323103883fe12c9609ed380f475. That one's mine, provided for illustration. Save your password in a secret place, preferrably encrypted. 

Leave that terminal open for now.


#### Step 5: Request ETH
Now time to fill your account with some ETH!

Go to http://gist.github.com and create a public gist which contains a single line with your Rinkeby address. For example: https://gist.github.com/iam-peekay/db683ce532442c552fe9b50e43a78898

Copy the address of the gist, and go to Rinkeby's Crypto Faucet section of https://rinkeby.io and paste it into the blank.

Choose an option from the dropdown which corresponds to how much Ether you need and how frequently (requesting more Ether will take longer between requests). 

You can look for your transaction on https://rinkeby.etherscan.io by pasting your account address into the search field.

Now, back in your geth console, wait for at most 1 minute seconds for the next block to be found and confirmed, and verify your balance again.

```
> eth.getBalance(eth.coinbase)
3000000000000000000
```

Wala! you're done :)


#### Other stuff
Next time you need to run geth again, simply run the command:
```
geth --networkid=4 --datadir=$HOME/.rinkeby --cache=512 --ethstats='yournode:Respect my authoritah!@stats.rinkeby.io' --bootnodes=enode://a24ac7c5484ef4ed0c5eb2d36620ba4e4aa13b8c84684e1b4aab0cebea2ae45cb4d375b77eab56516d34bfbd3c1a833fc51296ff084b770b94fb9028c4d25ccf@52.169.42.101:30303 --rpc --rpcapi="personal,eth,network"
```

and then in a new terminal window, run:

```
ln -s ~/.rinkeby/geth.ipc ~/Library/Ethereum
geth attach
```

and you're all set!

If you're using Metamask to connect to this local node, you'd need to add the below flag when you start up geth:
```--rpccorsdomain="chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn"``` 




