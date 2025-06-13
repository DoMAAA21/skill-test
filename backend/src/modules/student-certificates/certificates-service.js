const { ApiError } = require("../../utils");
const { findAllCertificates } = require("./certificates-repository");

const getAllCertificates = async (payload) => {
    const certificates = await findAllCertificates(payload);
    if (certificates.length <= 0) {
        throw new ApiError(404, "Certificates not found");
    }

    return certificates;
}

module.exports = {
    getAllCertificates
};