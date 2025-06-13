const hre = require("hardhat");

async function main() {
  const CertificateRegistry = await hre.ethers.getContractFactory("CertificateRegistry");
  const contract = await CertificateRegistry.deploy();
  await contract.deployed();
  console.log("CertificateRegistry deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
