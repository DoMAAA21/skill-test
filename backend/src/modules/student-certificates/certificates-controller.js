const asyncHandler = require("express-async-handler");
const { getAllCertificates, addCertificate } = require("./certificates-service");
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { uploadToIPFS } = require('../../utils/ipfs-uploader');

const handleGetAllCertificates = asyncHandler(async (req, res) => {
    const certificates = await getAllCertificates(req.query);
    res.json({ certificates });
});

const handleAddCertificate = asyncHandler(async (req, res) => {
  const { title, student_id } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error("Certificate file is required");
  }

  // Ensure temp dir exists
  const tempDir = path.join(__dirname, "..", "..", "temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const tempFilePath = path.join(tempDir, `${Date.now()}_${req.file.originalname}`);
  fs.writeFileSync(tempFilePath, req.file.buffer);

  let ipfsHash;
  try {
    ipfsHash = await uploadToIPFS(tempFilePath);
  } finally {
    fs.unlinkSync(tempFilePath);
  }

  const certId = uuidv4();
  const payload = { title, student_id, ipfsHash, certId };

  const certificate = await addCertificate(payload);

  res.status(201).json({
    message: "Certificate added successfully",
    certificate,
  });
});


module.exports = {
    handleGetAllCertificates,
    handleAddCertificate,
};