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

const insertCertificate = async ({ title, student_id, ipfsHash, certId }) => {

  const findStudentQuery = `
    SELECT id FROM students WHERE user_id = $1
  `;
  const studentResult = await processDBRequest({
    query: findStudentQuery,
    queryParams: [student_id],
  });

  if (studentResult.rows.length === 0) {
    throw new Error('Student not found for given user_id');
  }

  const actualStudentId = studentResult.rows[0].id;

  const insertQuery = `
    INSERT INTO certificates (title, student_id, ipfs_hash, cert_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id, title, student_id, ipfs_hash, cert_id
  `;
  const queryParams = [title, actualStudentId, ipfsHash, certId];
  const insertResult = await processDBRequest({ query: insertQuery, queryParams });

  return insertResult.rows[0];
};




module.exports = {
  findAllCertificates,
  insertCertificate
};