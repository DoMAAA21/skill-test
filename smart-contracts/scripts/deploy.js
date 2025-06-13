// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const CertificateRegistry = await hre.ethers.getContractFactory("CertificateRegistry");
  const contract = await CertificateRegistry.deploy();

  // Wait for deployment to be mined
  await contract.waitForDeployment();

  // Get contract address
  const contractAddress = await contract.getAddress();

  console.log("Contract deployed to:", contractAddress);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
