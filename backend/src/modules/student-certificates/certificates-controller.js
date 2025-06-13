const asyncHandler = require("express-async-handler");
const { getAllCertificates } = require("./certificates-service");

const handleGetAllCertificates = asyncHandler(async (req, res) => {
    const students = await getAllCertificates(req.query);
    res.json({ students });
});

module.exports = {
    handleGetAllCertificates,
};