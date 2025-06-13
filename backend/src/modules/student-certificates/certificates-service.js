const { ApiError } = require("../../utils");
const { findAllCertificates, insertCertificate } = require("./certificates-repository");

const getAllCertificates = async (payload) => {
    const certificates = await findAllCertificates(payload);
    if (certificates.length <= 0) {
        throw new ApiError(404, "Certificates not found");
    }

    return certificates;
}
const addCertificate = async ({ title, student_id, ipfsHash, certId }) => {
  const result = await insertCertificate({ title, student_id, ipfsHash, certId });

  if (!result) {
    throw new ApiError(500, "Failed to insert certificate");
  }

  return result;
};
module.exports = {
    getAllCertificates,
    addCertificate
};