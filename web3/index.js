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


const contractAbi = /* Add contract ABI here */

const contractAddress = /* Add contract Address here */

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Estimate gas for a method
const gas = contract.methods.myMethod().estimateGas({ gas: 5000000 }, (error, gasUsed) => {
    if (error) console.log('ERROR: ', error);

    if(gasUsed > 5000000) console.log('Method exceeded provided gas limit: ', gasUsed);

    console.log('Gas used: ', gasUsed);
});


