const pinataSDK = require('@pinata/sdk');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

async function uploadToIPFS(filePath) {
  const readableStream = fs.createReadStream(filePath);

  try {
    const result = await pinata.pinFileToIPFS(readableStream);
    return result.IpfsHash;
  } catch (error) {
    console.error('IPFS Upload Error:', error);
    throw error;
  }
}

module.exports = {
  uploadToIPFS,
};
