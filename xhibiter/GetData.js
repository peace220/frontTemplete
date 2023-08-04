const { ethers } = require('ethers');
const axios = require('axios');
require('dotenv').config();

// Assuming you have an instance of ethers connected to your Ethereum network.
const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/5af30ed60a8b4765a596afccb963efe4');

// Replace 'YourContractAbi' with your NFT contract's ABI (Application Binary Interface).
const contractAbi = require('./ABI.json');
const contractAddress = process.env.CONTRACT_ADDRESS;

// Replace 'YourAccountPrivateKey' with the private key of the account you are using to interact with the contract.
const accountPrivateKey = process.env.PRIVATE_KEY;
// console.log(accountPrivateKey);
// Create a signer with the account's private key.
const signer = new ethers.Wallet(accountPrivateKey, provider);

// Create an instance of the contract using the contract ABI and contract address.
const nftContract = new ethers.Contract(contractAddress, contractAbi, signer);

// Call the 'uri' public variable using the 'uri' method.
async function getNFT() {
  let i = 0;
  const nftUri = [];
  while (true) {
    try {
      const x = await nftContract.tokenURI(i);
      nftUri.push(x);
      i++;
    } catch (error) {
      // Break the loop when there are no more valid token IDs
      break;
    }
  }
  return nftUri;
}

async function getNFTDataFromIPFS() {
  try {
    const nftUris = await getNFT(); // Array of URIs returned by getNFT()

    for (const uri of nftUris) {
      const nftDataUrl = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
      
      // Fetch data from the IPFS URL
      const response = await axios.get(nftDataUrl);

      // Parse the response data as JSON
      const nftData = response.data;

      console.log('NFT Data: ', nftData);

      // Do whatever you want with the nftData here, it contains the fetched NFT data
    }
  } catch (error) {
    console.error('Error fetching NFT data:', error.message);
  }
}

getNFTDataFromIPFS();