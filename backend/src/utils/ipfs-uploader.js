const PinataSDK = require('@pinata/sdk');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const pinata = new PinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

async function uploadToIPFS(filePath) {
  const readableStream = fs.createReadStream(filePath);
  const fileName = path.basename(filePath);

  try {
    const result = await pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: {
        name: fileName,
      },
    });
    return result.IpfsHash;
  } catch (error) {
    console.error('IPFS Upload Error:', error);
    throw error;
  }
}

module.exports = {
  uploadToIPFS,
};
