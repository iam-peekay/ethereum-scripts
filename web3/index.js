const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    /* 
      Set the provider you want from Web3.providers
      NOTE: Ensure you are connected to either Rinkeby testnet or Mainnet :) 
    */
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = /* Add default account here 
                            (used as the default "from" property, if no "from" property is specified) 
                          */

// Get current blockNumber
web3.eth.getBlockNumber()
.then(console.log);
                          
const contractAbi = /* Add contract ABI here */

const contractAddress = /* Add contract Address here */

const byteCode = /* Add contract bytecode here. 
                    NOTE: data string has to start with 0x, rather than just the raw data 
                 */

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Estimate gas for a method
const gas = contract.methods.myMethod().estimateGas({ gas: 5000000 }, (error, gasUsed) => {
  if (error) console.log('ERROR: ', error);

  if(gasUsed > 5000000) console.log('Method exceeded provided gas limit: ', gasUsed);

  console.log('Gas used: ', gasUsed);
});


// Deploy a new contract instance
let newContractInstance;

contract.deploy({
  data: byteCode,
  arguments: [ /* Add args */ ]
})
.send({
  from: web3.eth.defaultAccount,
  gas: 3000000,
  gasPrice: '30000000000000'
}, (error, transactionHash) => { 
  if (error) {
    console.error('ERROR: ', error) 
  } else {
    console.log('Transaction Hash: ', transactionHash);
  }
})
.on('receipt', (receipt) => {
  console.log(receipt.contractAddress) // contains the new contract address
})
.on('confirmation', (confirmationNumber, receipt) => {
  console.log('Confirmation Number: ', confirmationNumber);
  console.log('Receipt: ', receipt);
})
.then(newContractInstance => {
  newContractInstance = newContractInstance;
  console.log(newContractInstance.options.address) // instance with the new contract address
});
    

// Estimate gas cost to deploy contract
contract.deploy({
  data: byteCode,
  arguments: [ /* Add args */ ]
})
.estimateGas((error, gas) => {
  if (error) {
    console.error('ERROR: ', error) 
  } else {
    console.log('Gas used: ', gas);
  }
});