const { processDBRequest } = require("../../utils");


const findAllCertificates = async () => {
  const query = `
    SELECT
      c.id,
      c.title,
      c.ipfs_hash AS "ipfsHash",
      c.issued_at AS "issuedAt",
      s.id AS "studentId",
      u.name AS "studentName",
      u.email AS "studentEmail",
      s.roll AS "studentRoll"
    FROM certificates c
    LEFT JOIN students s ON c.student_id = s.id
    LEFT JOIN users u ON s.user_id = u.id
    ORDER BY c.id DESC
  `;

  const { rows } = await processDBRequest({ query });
  return rows;
};

module.exports = {
 findAllCertificates
};